#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var EF=Object.create;var Lg=Object.defineProperty;var RF=Object.getOwnPropertyDescriptor;var CF=Object.getOwnPropertyNames;var kF=Object.getPrototypeOf,TF=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var W=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},St=(e,t)=>{for(var r in t)Lg(e,r,{get:t[r],enumerable:!0})},xF=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of CF(t))!TF.call(e,n)&&n!==r&&Lg(e,n,{get:()=>t[n],enumerable:!(o=RF(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?EF(kF(e)):{},xF(t||!e||!e.__esModule?Lg(r,"default",{value:e,enumerable:!0}):r,e));var tn=W(Eg=>{"use strict";Object.defineProperty(Eg,"__esModule",{value:!0});Eg.stringify=IF;function IF(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=W(Rg=>{"use strict";Object.defineProperty(Rg,"__esModule",{value:!0});Rg.generateTypeGuardError=OF;var Rv=tn();function OF(e,t,r){return(0,Rv.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,Rv.stringify)(e)}) to be "${r}"`}});var ur=W(ac=>{"use strict";Object.defineProperty(ac,"__esModule",{value:!0});ac.isNonNullObject=void 0;var MF=O(),NF=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,MF.generateTypeGuardError)(e,t.identifier,"non-null object")),r};ac.isNonNullObject=NF});var At=W(ge=>{"use strict";Object.defineProperty(ge,"__esModule",{value:!0});ge.attachTypeGuardMeta=ge.isArrayTypeGuard=ge.isNestedObjectTypeGuard=ge.getTypeGuardWrapperKind=ge.getTypeGuardInnerGuard=ge.getTypeGuardItemGuard=ge.getTypeGuardSchema=void 0;var jF=e=>e.schema;ge.getTypeGuardSchema=jF;var DF=e=>e.itemGuard;ge.getTypeGuardItemGuard=DF;var HF=e=>e.innerGuard;ge.getTypeGuardInnerGuard=HF;var $F=e=>e.wrapperKind;ge.getTypeGuardWrapperKind=$F;var zF=e=>{if((0,ge.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};ge.isNestedObjectTypeGuard=zF;var FF=e=>{if((0,ge.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};ge.isArrayTypeGuard=FF;var UF=(e,t)=>Object.assign(e,t);ge.attachTypeGuardMeta=UF});var Ts=W(Fr=>{"use strict";Object.defineProperty(Fr,"__esModule",{value:!0});Fr.getExpectedTypeName=Fr.getTypeGuardDisplayName=void 0;var Cv=At(),BF=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Fr.getTypeGuardDisplayName=BF;var GF=e=>{let t=(0,Cv.getTypeGuardWrapperKind)(e),r=(0,Cv.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,Fr.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};Fr.getExpectedTypeName=GF});var Ur=W(lc=>{"use strict";Object.defineProperty(lc,"__esModule",{value:!0});lc.createValidationResult=void 0;var VF=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});lc.createValidationResult=VF});var rn=W(cc=>{"use strict";Object.defineProperty(cc,"__esModule",{value:!0});cc.createValidationError=void 0;var qF=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});cc.createValidationError=qF});var on=W(dc=>{"use strict";Object.defineProperty(dc,"__esModule",{value:!0});dc.createTreeNode=void 0;var KF=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});dc.createTreeNode=KF});var xs=W(uc=>{"use strict";Object.defineProperty(uc,"__esModule",{value:!0});uc.combineResults=void 0;var JF=Ur(),YF=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,JF.createValidationResult)(r,o,n)};uc.combineResults=YF});var mc=W(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.createSimplifiedTree=void 0;var kv=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=kv(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},XF=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=kv(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};pc.createSimplifiedTree=XF});var Os=W(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.validateObject=void 0;var ZF=ur(),Is=Ur(),QF=rn(),gc=on(),e1=xs(),Tv=hc(),t1=(e,t,r)=>{let o=()=>{let i=(0,QF.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,gc.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Is.createValidationResult)(!1,[],a):(0,Is.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Is.createValidationResult)(!0,[],(0,gc.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,S=t[g],h=e[g],y=(0,Tv.validateProperty)(g,h,S,r);return y.valid?p.length===0?(0,Is.createValidationResult)(!0,[],(0,gc.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,Tv.validateProperty)(d,e[d],p,r)}),a=(0,e1.combineResults)(i,r.path),c=(0,gc.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,Is.createValidationResult)(a.valid,a.errors,c)};return(0,ZF.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};fc.validateObject=t1});var Iv=W(Ac=>{"use strict";Object.defineProperty(Ac,"__esModule",{value:!0});Ac.validateArray=void 0;var r1=tn(),yc=Ur(),xv=rn(),Sc=on(),o1=xs(),n1=Os(),s1=Ts(),i1=At(),a1=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,xv.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Sc.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,yc.createValidationResult)(!1,[c],d)}let n=(0,i1.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,g={path:p,config:r.config||null};if(n)return(0,n1.validateObject)(c,n,g);let S=t(c,null),h=(0,s1.getExpectedTypeName)(t),y=(0,r1.stringify)(c);if(S)return(0,yc.createValidationResult)(!0,[],(0,Sc.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,A=(0,xv.createValidationError)(p,h,c,u),b=(0,Sc.createTreeNode)(p,!1,h,c);return b.errors=[A],(0,yc.createValidationResult)(!1,[A],b)}),i=(0,o1.combineResults)(s,o),a=(0,Sc.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,yc.createValidationResult)(i.valid,i.errors,a)};Ac.validateArray=a1});var hc=W(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.validateProperty=void 0;var Ov=Ur(),l1=rn(),Mv=on(),c1=Ts(),bc=At(),d1=Os(),u1=Iv(),p1=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,bc.getTypeGuardSchema)(r),c=(0,bc.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,d1.validateObject)(t,a,s);if(c&&(0,bc.isArrayTypeGuard)(r))return(0,u1.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),S=(0,c1.getExpectedTypeName)(r);return g?(0,Ov.createValidationResult)(!0,[],(0,Mv.createTreeNode)(n,!0,S,t)):(()=>{let h=(0,l1.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,Mv.createTreeNode)(n,!1,S,t);return y.errors=[h],(0,Ov.createValidationResult)(!1,[h],y)})()};if((0,bc.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};Pc.validateProperty=p1});var _c=W(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.isNil=void 0;var m1=O(),g1=function(e,t){return e!=null?(t&&t.callbackOnError((0,m1.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};wc.isNil=g1});var Cg=W(vc=>{"use strict";Object.defineProperty(vc,"__esModule",{value:!0});vc.isDefined=void 0;var f1=O(),h1=_c(),y1=function(e,t){return(0,h1.isNil)(e,null)?(t&&t.callbackOnError((0,f1.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};vc.isDefined=y1});var kg=W(Wc=>{"use strict";Object.defineProperty(Wc,"__esModule",{value:!0});Wc.reportValidationResults=void 0;var S1=mc(),Nv=Cg(),A1=_c(),b1=(e,t)=>{if(e.valid===!0||(0,A1.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,Nv.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,S1.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,Nv.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Wc.reportValidationResults=b1});var Tg=W(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.Validation=Q.reportValidationResults=Q.validateObject=Q.validateProperty=Q.createSimplifiedTree=Q.combineResults=Q.createTreeNode=Q.createValidationError=Q.createValidationResult=Q.getExpectedTypeName=void 0;var P1=Ts();Object.defineProperty(Q,"getExpectedTypeName",{enumerable:!0,get:function(){return P1.getExpectedTypeName}});var w1=Ur();Object.defineProperty(Q,"createValidationResult",{enumerable:!0,get:function(){return w1.createValidationResult}});var _1=rn();Object.defineProperty(Q,"createValidationError",{enumerable:!0,get:function(){return _1.createValidationError}});var v1=on();Object.defineProperty(Q,"createTreeNode",{enumerable:!0,get:function(){return v1.createTreeNode}});var W1=xs();Object.defineProperty(Q,"combineResults",{enumerable:!0,get:function(){return W1.combineResults}});var L1=mc();Object.defineProperty(Q,"createSimplifiedTree",{enumerable:!0,get:function(){return L1.createSimplifiedTree}});var E1=hc();Object.defineProperty(Q,"validateProperty",{enumerable:!0,get:function(){return E1.validateProperty}});var R1=Os();Object.defineProperty(Q,"validateObject",{enumerable:!0,get:function(){return R1.validateObject}});var C1=kg();Object.defineProperty(Q,"reportValidationResults",{enumerable:!0,get:function(){return C1.reportValidationResults}});var k1=Ur(),T1=xs(),x1=rn(),I1=on(),O1=hc(),M1=Os(),N1=kg(),j1=mc();Q.Validation={result:k1.createValidationResult,combine:T1.combineResults,error:x1.createValidationError,treeNode:I1.createTreeNode,property:O1.validateProperty,object:M1.validateObject,report:N1.reportValidationResults,createSimplifiedTree:j1.createSimplifiedTree}});var Lc=W(xg=>{"use strict";Object.defineProperty(xg,"__esModule",{value:!0});xg.isType=H1;var jv=ur(),Dv=Tg(),D1=At();function H1(e){if(!(0,jv.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,Dv.validateObject)(r,e,s);return(0,Dv.reportValidationResults)(i,o||null),i.valid}return(0,jv.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,D1.attachTypeGuardMeta)(t,{schema:e})}});var Fv=W(Br=>{"use strict";Object.defineProperty(Br,"__esModule",{value:!0});Br.isNestedType=Br.isShape=void 0;Br.isSchema=Ms;var Hv=ur(),$v=Tg(),zv=At();function Ms(e){if(!(0,Hv.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=z1(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,$v.validateObject)(o,t,i);return(0,$v.reportValidationResults)(a,n||null),a.valid}return(0,Hv.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,zv.attachTypeGuardMeta)(r,{schema:t})}function $1(e){return typeof e=="function"?e:Array.isArray(e)?F1(e):typeof e=="object"&&e!==null?Ms(e):e}function z1(e){let t={};for(let[r,o]of Object.entries(e))t[r]=$1(o);return t}function F1(e){let t=e[0],r=Ms(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,zv.attachTypeGuardMeta)(o,{itemGuard:r})}Br.isShape=Ms;Br.isNestedType=Ms});var Uv=W(Ig=>{"use strict";Object.defineProperty(Ig,"__esModule",{value:!0});Ig.isObjectWith=B1;var U1=Lc();function B1(e){return(0,U1.isType)(e)}});var Bv=W(Og=>{"use strict";Object.defineProperty(Og,"__esModule",{value:!0});Og.isObject=V1;var G1=Lc();function V1(e){return(0,G1.isType)(e)}});var Gv=W(Mg=>{"use strict";Object.defineProperty(Mg,"__esModule",{value:!0});Mg.guardWithTolerance=q1;function q1(e,t,r){return t(e,r),e}});var Vv=W(Ng=>{"use strict";Object.defineProperty(Ng,"__esModule",{value:!0});Ng.isBranded=J1;var K1=O();function J1(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,K1.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var qv=W(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.BrandSymbols=void 0;Ec.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var Kv=W(Rc=>{"use strict";Object.defineProperty(Rc,"__esModule",{value:!0});Rc.isAny=void 0;var Y1=function(e){return!0};Rc.isAny=Y1});var Ns=W(jg=>{"use strict";Object.defineProperty(jg,"__esModule",{value:!0});jg.reportTypeGuardError=Z1;var X1=O();function Z1(e,t,r){e&&e.callbackOnError((0,X1.generateTypeGuardError)(t,e.identifier,r))}});var Jv=W(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.isBoolean=void 0;var Q1=Ns(),eU=function(t,r){return typeof t!="boolean"?((0,Q1.reportTypeGuardError)(r,t,"boolean"),!1):!0};Cc.isBoolean=eU});var Yv=W(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.isDate=void 0;var tU=O(),rU=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,tU.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};kc.isDate=rU});var Dg=W(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.isNumber=void 0;var oU=Ns(),nU=function(t,r){return typeof t!="number"||isNaN(t)?((0,oU.reportTypeGuardError)(r,t,"number"),!1):!0};Tc.isNumber=nU});var Xv=W(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.isString=void 0;var sU=Ns(),iU=function(t,r){return typeof t!="string"?((0,sU.reportTypeGuardError)(r,t,"string"),!1):!0};xc.isString=iU});var Zv=W(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.isUnknown=void 0;var aU=function(e){return!0};Ic.isUnknown=aU});var Qv=W(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.isFunction=void 0;var lU=O(),cU=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,lU.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Oc.isFunction=cU});var tW=W(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.isFile=void 0;var eW=O(),dU=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,eW.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,eW.generateTypeGuardError)(e,t.identifier,"File")),!1)};Mc.isFile=dU});var oW=W(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.isFileList=void 0;var rW=O(),uU=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,rW.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,rW.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Nc.isFileList=uU});var sW=W(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.isBlob=void 0;var nW=O(),pU=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,nW.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,nW.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};jc.isBlob=pU});var aW=W(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.isFormData=void 0;var iW=O(),mU=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,iW.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,iW.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Dc.isFormData=mU});var cW=W(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.isURL=void 0;var lW=O(),gU=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,lW.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,lW.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Hc.isURL=gU});var uW=W($c=>{"use strict";Object.defineProperty($c,"__esModule",{value:!0});$c.isURLSearchParams=void 0;var dW=O(),fU=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,dW.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,dW.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};$c.isURLSearchParams=fU});var pW=W(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.isMap=void 0;var hU=O(),yU=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,hU.generateTypeGuardError)(e,t.identifier,"Map")),!1)};zc.isMap=yU});var mW=W(Fc=>{"use strict";Object.defineProperty(Fc,"__esModule",{value:!0});Fc.isSet=void 0;var SU=O(),AU=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,SU.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Fc.isSet=AU});var gW=W(Hg=>{"use strict";Object.defineProperty(Hg,"__esModule",{value:!0});Hg.isIndexSignature=PU;var bU=O();function PU(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,bU.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),h=t(g,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return S&&h})}}});var fW=W(Uc=>{"use strict";Object.defineProperty(Uc,"__esModule",{value:!0});Uc.isError=void 0;var wU=Ns(),_U=function(t,r){return t instanceof Error?!0:((0,wU.reportTypeGuardError)(r,t,"Error"),!1)};Uc.isError=_U});var zg=W($g=>{"use strict";Object.defineProperty($g,"__esModule",{value:!0});$g.isArrayWithEachItem=LU;var vU=O(),WU=At();function LU(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,vU.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,WU.attachTypeGuardMeta)(t,{itemGuard:e})}});var Fg=W(Bc=>{"use strict";Object.defineProperty(Bc,"__esModule",{value:!0});Bc.isNonEmptyArray=void 0;var EU=O(),RU=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,EU.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Bc.isNonEmptyArray=RU});var hW=W(Ug=>{"use strict";Object.defineProperty(Ug,"__esModule",{value:!0});Ug.isNonEmptyArrayWithEachItem=TU;var CU=zg(),kU=Fg();function TU(e){return function(t,r){return(0,CU.isArrayWithEachItem)(e)(t,r)&&(0,kU.isNonEmptyArray)(t,r)}}});var SW=W(Bg=>{"use strict";Object.defineProperty(Bg,"__esModule",{value:!0});Bg.isTuple=xU;var yW=O();function xU(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,yW.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,yW.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var AW=W(Gg=>{"use strict";Object.defineProperty(Gg,"__esModule",{value:!0});Gg.isObjectWithEachItem=OU;var IU=O();function OU(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,IU.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var bW=W(Vg=>{"use strict";Object.defineProperty(Vg,"__esModule",{value:!0});Vg.isPartialOf=NU;var MU=ur();function NU(e){return function(t,r){if(!(0,MU.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var PW=W(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.isPick=DU;var jU=ur();function DU(e,...t){return function(r,o){if(!(0,jU.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var wW=W(Kg=>{"use strict";Object.defineProperty(Kg,"__esModule",{value:!0});Kg.isOmit=$U;var HU=ur();function $U(e,...t){return function(r,o){if(!(0,HU.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),S=g>=0?p.slice(0,g):p;if(a.has(S))return!1;let h=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var _W=W(Gc=>{"use strict";Object.defineProperty(Gc,"__esModule",{value:!0});Gc.isNonEmptyString=void 0;var zU=O(),FU=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,zU.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Gc.isNonEmptyString=FU});var vW=W(Vc=>{"use strict";Object.defineProperty(Vc,"__esModule",{value:!0});Vc.isNonNegativeNumber=void 0;var UU=O(),BU=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,UU.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Vc.isNonNegativeNumber=BU});var WW=W(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.isPositiveNumber=void 0;var GU=O(),VU=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,GU.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};qc.isPositiveNumber=VU});var LW=W(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.isNonPositiveNumber=void 0;var qU=O(),KU=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,qU.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Kc.isNonPositiveNumber=KU});var EW=W(Jc=>{"use strict";Object.defineProperty(Jc,"__esModule",{value:!0});Jc.isNegativeNumber=void 0;var JU=O(),YU=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,JU.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Jc.isNegativeNumber=YU});var RW=W(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.isInteger=void 0;var XU=O(),ZU=Dg(),QU=function(e,t){return!(0,ZU.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,XU.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Yc.isInteger=QU});var CW=W(Xc=>{"use strict";Object.defineProperty(Xc,"__esModule",{value:!0});Xc.isPositiveInteger=void 0;var eB=O(),tB=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,eB.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Xc.isPositiveInteger=tB});var kW=W(Zc=>{"use strict";Object.defineProperty(Zc,"__esModule",{value:!0});Zc.isNegativeInteger=void 0;var rB=O(),oB=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,rB.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Zc.isNegativeInteger=oB});var TW=W(Qc=>{"use strict";Object.defineProperty(Qc,"__esModule",{value:!0});Qc.isNonNegativeInteger=void 0;var nB=O(),sB=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,nB.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Qc.isNonNegativeInteger=sB});var xW=W(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});ed.isNonPositiveInteger=void 0;var iB=O(),aB=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,iB.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};ed.isNonPositiveInteger=aB});var IW=W(rd=>{"use strict";Object.defineProperty(rd,"__esModule",{value:!0});rd.isNumeric=void 0;var td=O(),lB=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,td.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,td.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,td.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,td.generateTypeGuardError)(e,t.identifier,"number key")),!1};rd.isNumeric=lB});var OW=W(od=>{"use strict";Object.defineProperty(od,"__esModule",{value:!0});od.isBooleanLike=void 0;var Jg=O(),cB=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Jg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Jg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};od.isBooleanLike=cB});var MW=W(nd=>{"use strict";Object.defineProperty(nd,"__esModule",{value:!0});nd.isDateLike=void 0;var js=O(),dB=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,js.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,js.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,js.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,js.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,js.generateTypeGuardError)(e,t.identifier,"date-like")),!1};nd.isDateLike=dB});var NW=W(sd=>{"use strict";Object.defineProperty(sd,"__esModule",{value:!0});sd.isBigInt=void 0;var uB=O(),pB=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,uB.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};sd.isBigInt=pB});var Xg=W(Yg=>{"use strict";Object.defineProperty(Yg,"__esModule",{value:!0});Yg.isOneOf=mB;var jW=tn();function mB(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,jW.stringify)(t)}) must be one of following values ${e.map(jW.stringify).join(" | ")}`),o}}});var DW=W(Zg=>{"use strict";Object.defineProperty(Zg,"__esModule",{value:!0});Zg.isOneOfTypes=hB;var gB=tn(),fB=Ts();function hB(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,gB.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,fB.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var HW=W(Qg=>{"use strict";Object.defineProperty(Qg,"__esModule",{value:!0});Qg.isIntersectionOf=yB;function yB(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var $W=W(ef=>{"use strict";Object.defineProperty(ef,"__esModule",{value:!0});ef.isExtensionOf=SB;function SB(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var zW=W(tf=>{"use strict";Object.defineProperty(tf,"__esModule",{value:!0});tf.isNullOr=bB;var AB=At();function bB(e){function t(r,o){return r===null?!0:e(r,o)}return(0,AB.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var FW=W(rf=>{"use strict";Object.defineProperty(rf,"__esModule",{value:!0});rf.isUndefinedOr=wB;var PB=At();function wB(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,PB.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var UW=W(of=>{"use strict";Object.defineProperty(of,"__esModule",{value:!0});of.isNilOr=vB;var _B=At();function vB(e){function t(r,o){return r==null?!0:e(r,o)}return(0,_B.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var BW=W(nf=>{"use strict";Object.defineProperty(nf,"__esModule",{value:!0});nf.isAsserted=WB;function WB(e){return!0}});var GW=W(sf=>{"use strict";Object.defineProperty(sf,"__esModule",{value:!0});sf.isEnum=EB;var LB=Xg();function EB(e){return function(t,r){return(0,LB.isOneOf)(...Object.values(e))(t,r)}}});var VW=W(af=>{"use strict";Object.defineProperty(af,"__esModule",{value:!0});af.isEqualTo=kB;var RB=O(),CB=tn();function kB(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,RB.generateTypeGuardError)(t,r.identifier,`equal to ${(0,CB.stringify)(e)}`)),!1):!0}}});var qW=W(id=>{"use strict";Object.defineProperty(id,"__esModule",{value:!0});id.isRegex=void 0;var TB=O(),xB=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,TB.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};id.isRegex=xB});var JW=W(lf=>{"use strict";Object.defineProperty(lf,"__esModule",{value:!0});lf.isPattern=IB;var KW=O();function IB(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,KW.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,KW.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var YW=W(cf=>{"use strict";Object.defineProperty(cf,"__esModule",{value:!0});cf.by=OB;function OB(e){return function(t){return e(t,null)}}});var XW=W(df=>{"use strict";Object.defineProperty(df,"__esModule",{value:!0});df.toNumber=MB;function MB(e){return typeof e=="number"?e:Number(e)}});var ZW=W(uf=>{"use strict";Object.defineProperty(uf,"__esModule",{value:!0});uf.toDate=NB;function NB(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var QW=W(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.toBoolean=jB;function jB(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var eL=W(ad=>{"use strict";Object.defineProperty(ad,"__esModule",{value:!0});ad.isSymbol=void 0;var DB=O(),HB=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,DB.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};ad.isSymbol=HB});var Ds=W(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var $B=Lc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return $B.isType}});var mf=Fv();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return mf.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return mf.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return mf.isNestedType}});var zB=Uv();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return zB.isObjectWith}});var FB=Bv();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return FB.isObject}});var UB=Gv();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return UB.guardWithTolerance}});var BB=Vv();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return BB.isBranded}});var GB=qv();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return GB.BrandSymbols}});var VB=Kv();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return VB.isAny}});var qB=Jv();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return qB.isBoolean}});var KB=Yv();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return KB.isDate}});var JB=Cg();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return JB.isDefined}});var YB=_c();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return YB.isNil}});var XB=Dg();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return XB.isNumber}});var ZB=Xv();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return ZB.isString}});var QB=Zv();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return QB.isUnknown}});var eG=Qv();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return eG.isFunction}});var tG=tW();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return tG.isFile}});var rG=oW();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return rG.isFileList}});var oG=sW();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return oG.isBlob}});var nG=aW();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return nG.isFormData}});var sG=cW();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return sG.isURL}});var iG=uW();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return iG.isURLSearchParams}});var aG=pW();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return aG.isMap}});var lG=mW();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return lG.isSet}});var cG=gW();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return cG.isIndexSignature}});var dG=fW();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return dG.isError}});var uG=zg();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return uG.isArrayWithEachItem}});var pG=Fg();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return pG.isNonEmptyArray}});var mG=hW();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return mG.isNonEmptyArrayWithEachItem}});var gG=SW();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return gG.isTuple}});var fG=ur();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return fG.isNonNullObject}});var hG=AW();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return hG.isObjectWithEachItem}});var yG=bW();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return yG.isPartialOf}});var SG=PW();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return SG.isPick}});var AG=wW();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return AG.isOmit}});var bG=_W();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return bG.isNonEmptyString}});var PG=vW();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return PG.isNonNegativeNumber}});var wG=WW();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return wG.isPositiveNumber}});var _G=LW();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return _G.isNonPositiveNumber}});var vG=EW();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return vG.isNegativeNumber}});var WG=RW();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return WG.isInteger}});var LG=CW();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return LG.isPositiveInteger}});var EG=kW();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return EG.isNegativeInteger}});var RG=TW();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return RG.isNonNegativeInteger}});var CG=xW();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return CG.isNonPositiveInteger}});var kG=IW();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return kG.isNumeric}});var TG=OW();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return TG.isBooleanLike}});var xG=MW();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return xG.isDateLike}});var IG=NW();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return IG.isBigInt}});var OG=Xg();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return OG.isOneOf}});var MG=DW();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return MG.isOneOfTypes}});var NG=HW();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return NG.isIntersectionOf}});var jG=$W();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return jG.isExtensionOf}});var DG=zW();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return DG.isNullOr}});var HG=FW();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return HG.isUndefinedOr}});var $G=UW();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return $G.isNilOr}});var zG=BW();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return zG.isAsserted}});var FG=GW();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return FG.isEnum}});var UG=VW();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return UG.isEqualTo}});var BG=qW();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return BG.isRegex}});var GG=JW();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return GG.isPattern}});var VG=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return VG.generateTypeGuardError}});var qG=YW();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return qG.by}});var KG=XW();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return KG.toNumber}});var JG=ZW();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return JG.toDate}});var YG=QW();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return YG.toBoolean}});var XG=eL();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return XG.isSymbol}})});var Hs,tL,rL,Gr,gf,v9,oL,ld,Vr,$s,ff,hf,yf,Sf,Nt,Af,cd,dd,ud,zs,ot,nn,sn,pd,pr,bf,nL,bt=l(()=>{"use strict";Hs={production:".agent-witch",localhost:".local-agent-witch"},tL={production:47892,localhost:47893},rL={production:"com.agent-witch",localhost:"com.local-agent-witch"},Gr={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},gf="app",v9=`${gf}/agent-witch.js`,oL=`${gf}/command`,ld={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Vr=Hs.production,$s=Hs.localhost,ff=tL.production,hf=tL.localhost,yf=rL.production,Sf=rL.localhost,Nt="profiles",Af=Gr.activeProfile,cd="harness",dd="sets",ud="manifest.json",zs=ld.projectsDir,ot=ld.logsDir,nn="agent-witch.log",sn="agent-witch.error.log",pd=ld.reportsDir,pr=ld.deviceKeypairJson,bf=gf,nL="agent-witch.js"});var an,sL,ZG,iL,aL=l(()=>{"use strict";an=m(require("node:path")),sL=require("node:url"),ZG=()=>!0,iL=()=>{if(ZG()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?an.default.dirname(an.default.resolve(e)):an.default.dirname(an.default.resolve(__filename))}return an.default.dirname((0,sL.fileURLToPath)(__agentWitchImportMetaUrl))}});var Pf,lL,N,cL,QG,mr,E,md,jt,dL,gd,ln,fd,hd,oe,nt,wf,st,_f,M,vf=l(()=>{"use strict";Pf=m(require("node:fs")),lL=m(require("node:os")),N=m(require("node:path")),cL=m(Ds());bt();aL();QG=iL(),mr=e=>e.trim().toLowerCase(),E=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return N.default.resolve(e);let t=N.default.resolve(QG),r=N.default.basename(t),o=N.default.basename(N.default.dirname(t));return r===bf&&(o===Vr||o===$s)?N.default.dirname(t):r===Vr||r===$s?t:N.default.join(lL.default.homedir(),Vr)},md=(e=E())=>N.default.join(e,bf),jt=(e=E())=>N.default.join(md(e),nL),dL=(e,t,r)=>t!==null?N.default.join(e,Nt,t,r):N.default.join(e,r),gd=e=>dL(e.installDir,e.profileEmail,zs),ln=e=>dL(e.installDir,e.profileEmail,ot),fd=e=>e.profileEmail!==null?N.default.join(e.installDir,Nt,e.profileEmail,pr):N.default.join(e.installDir,pr),hd=e=>N.default.basename(e)===$s,oe=(e=E())=>hd(e)?Sf:yf,nt=(e=E())=>hd(e)?hf:ff,wf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return mr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?mr(t):null},st=(e=E())=>{let t=N.default.join(e,Af);if(!Pf.default.existsSync(t))return null;try{let r=JSON.parse(Pf.default.readFileSync(t,"utf8"));if((0,cL.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return mr(r.email)}catch{return null}return null},_f=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?mr(r):null}let t=wf();return t!==null?t:st()},M=e=>{let t=E(),r=md(t),o=jt(t),n=_f(e);if(n!==null){let S=N.default.join(t,Nt,n),h=N.default.join(S,cd),y=N.default.join(S,zs),u=N.default.join(S,ot),A=N.default.join(S,pd),b=N.default.join(S,pr),f=N.default.join(S,ot,nn),w=N.default.join(S,ot,sn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:u,mainLogPath:f,errorLogPath:w,reportsDir:A,deviceKeypairPath:b,configPath:N.default.join(S,"config.json"),harnessRootDir:h,harnessManifestPath:N.default.join(h,ud),harnessSetsDir:N.default.join(h,dd)}}let s=N.default.join(t,cd),i=N.default.join(t,zs),a=N.default.join(t,ot),c=N.default.join(t,pd),d=N.default.join(t,pr),p=N.default.join(t,ot,nn),g=N.default.join(t,ot,sn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:g,reportsDir:c,deviceKeypairPath:d,configPath:N.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:N.default.join(s,ud),harnessSetsDir:N.default.join(s,dd)}}});var Wf,uL,e2,t2,pL,Lf,mL=l(()=>{"use strict";Wf=m(require("node:fs")),uL=m(require("node:path"));bt();vf();e2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),t2=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,pL=e=>{let t=uL.default.join(e,Gr.wakePort);if(!Wf.default.existsSync(t))return null;try{let r=JSON.parse(Wf.default.readFileSync(t,"utf8"));if(e2(r)&&t2(r.wakePort))return r.wakePort}catch{return null}return null},Lf=(e=E())=>pL(e)??nt(e)});var V=l(()=>{"use strict";vf();mL()});var Fs,i2,a2,gL,l2,c2,fL=l(()=>{"use strict";V();Fs=oe(),i2=`${Fs}-wake`,a2=`${Fs}-live`,gL=`${Fs}-watchdog`,l2=`${Fs}-automation-scheduler`,c2=`${Fs}-updater`});var Ef,Rf,yd=l(()=>{"use strict";Ef=new Set(["","loginwindow","_mbsetupuser","root"]),Rf=5e3});var hL,d2,yL,Cf,kf=l(()=>{"use strict";hL=require("node:child_process");yd();d2=e=>e.trim().toLowerCase(),yL=e=>e==null?!1:!Ef.has(d2(e)),Cf=()=>{if(process.platform!=="darwin")return null;try{let t=(0,hL.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return yL(t)?t:null}catch{return null}}});var AL,SL,it,Us=l(()=>{"use strict";AL=m(require("node:os"));kf();SL=e=>e.trim().toLowerCase(),it=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Cf():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??AL.default.userInfo().username;return SL(r)===SL(o)}});var bL,PL,qr,wL=l(()=>{"use strict";bL=require("node:child_process"),PL=m(require("node:fs"));V();Us();qr=(e=E())=>{let t=jt(e);if(!PL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!it())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=st(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,bL.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var _L,Bs,Sd=l(()=>{"use strict";_L=require("node:child_process"),Bs=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,_L.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Ad,Tf,vL,ee,bd,Gs=l(()=>{"use strict";Ad=m(require("node:fs")),Tf=m(require("node:path"));V();bt();vL=e=>{let t=Tf.default.join(e,Nt);return Ad.default.existsSync(t)?Ad.default.readdirSync(t).filter(r=>Ad.default.statSync(Tf.default.join(t,r)).isDirectory()).map(r=>mr(r)).toSorted():[]},ee=(e=E())=>{let t=oe(e);return[{profileEmail:vL(e)[0]??null,launchAgentLabel:t}]},bd=(e=E())=>vL(e)});var xf,WL,LL,u2,Dt,Pd=l(()=>{"use strict";xf=m(require("node:fs")),WL=m(require("node:os")),LL=m(require("node:path"));V();Gs();u2=()=>LL.default.join(WL.default.homedir(),"Library","LaunchAgents"),Dt=(e=E())=>{let t=oe(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ee(e))r.add(n.launchAgentLabel);let o=u2();if(xf.default.existsSync(o))for(let n of xf.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var EL,Vs,RL=l(()=>{"use strict";V();Sd();Pd();Gs();EL=(e=E())=>{let t=new Set(ee(e).map(r=>r.launchAgentLabel));return Dt(e).filter(r=>!t.has(r))},Vs=(e=E())=>{for(let t of EL(e))Bs(t)}});var qs,If=l(()=>{"use strict";V();Sd();Pd();qs=(e=E())=>{for(let t of Dt(e))Bs(t)}});var CL,kL,p2,Kr,TL=l(()=>{"use strict";CL=require("node:child_process"),kL=require("node:util"),p2=(0,kL.promisify)(CL.execFile),Kr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await p2("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Jr,m2,Of,Mf=l(()=>{"use strict";Jr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),m2=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,Of=e=>{let t=e.pathValue??m2(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${Jr(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${Jr(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${Jr(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${Jr(e.homeDir)}</string>
    <key>PATH</key>
    <string>${Jr(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${Jr(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${Jr(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var wd,Nf=l(()=>{"use strict";wd=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Yr,jf,Ks,g2,f2,h2,xL,Ht,Df=l(()=>{"use strict";Yr=m(require("node:fs")),jf=m(require("node:os")),Ks=m(require("node:path"));bt();V();Mf();Nf();g2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),f2=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,h2=e=>{let t=Ks.default.join(e,Gr.wakePort);if(!Yr.default.existsSync(t))return nt(e);try{let r=JSON.parse(Yr.default.readFileSync(t,"utf8"));if(g2(r)&&f2(r.wakePort))return r.wakePort}catch{return nt(e)}return nt(e)},xL=(e,t=jf.default.homedir())=>Ks.default.join(t,"Library","LaunchAgents",`${e}.plist`),Ht=e=>{let t=e.installDir??E(),r=e.homeDir??jf.default.homedir(),o=xL(e.launchAgentLabel,r),n=Yr.default.existsSync(o)?Yr.default.readFileSync(o,"utf8"):null;if(n!==null&&wd(n))return{ok:!0,rewritten:!1,plistPath:o};let s=Of({launchAgentLabel:e.launchAgentLabel,runPath:Ks.default.join(t,oL,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??h2(t)});if(!wd(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Yr.default.mkdirSync(Ks.default.dirname(o),{recursive:!0}),Yr.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var OL,ML,NL,Js,y2,S2,IL,ve,Hf=l(()=>{"use strict";OL=require("node:child_process"),ML=m(require("node:fs")),NL=require("node:util");V();Df();Us();Js=(0,NL.promisify)(OL.execFile),y2=async e=>{try{return await Js("launchctl",["print",e]),!0}catch{return!1}},S2=async(e,t,r)=>{await y2(t)&&await Js("launchctl",["bootout",t]).catch(()=>{}),await Js("launchctl",["bootstrap",e,r]),await Js("launchctl",["enable",t])},IL=async e=>{try{return await Js("launchctl",["kickstart","-k",e]),!0}catch{return!1}},ve=async(e,t=E())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!it())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Ht({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await IL(n))return{ok:!0};let i=s.plistPath;if(!ML.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await S2(o,n,i),await IL(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Xr,jL=l(()=>{"use strict";V();Hf();Gs();Xr=async(e=E())=>{let t=[];for(let r of ee(e))(await ve(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var ze,$t,DL=l(()=>{"use strict";If();Us();yd();ze=e=>{it()||(qs(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},$t=(e,t=Rf)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{it()||e()},t);return()=>{clearInterval(r)}}});var te=l(()=>{"use strict";fL();wL();Sd();RL();If();Pd();Us();TL();jL();Hf();Df();Nf();Mf();Gs();kf();yd();DL()});var $f=l(()=>{"use strict";te()});var HL,$L,_d,zL,cn,FL,UL,Zr=l(()=>{"use strict";HL=".agent-witch",$L="memory",_d="project.json",zL="chunks.ndjson",cn="runs.ndjson",FL="reports",UL=".json"});var BL=l(()=>{"use strict";Zr()});var GL,vd,zf=l(()=>{"use strict";GL=m(require("node:path"));BL();vd=(e,t)=>GL.default.join(e.trim(),`${t.trim()}${UL}`)});var Ys,VL,qL=l(()=>{"use strict";Ys="agent-witch.js",VL="command"});var Wd=l(()=>{"use strict";qL()});var Qr,KL,JL=l(()=>{"use strict";Wd();Qr=e=>`'${e.replace(/'/g,"'\\''")}'`,KL=e=>{let t=`${e.installDir.trim()}/${"app"}/${Ys}`,r=[Qr("node"),Qr(t),"report","write","--key",Qr(e.reportKey.trim()),"--agent-run-id",Qr(e.agentRunId.trim()),"--status",Qr(e.status),"--summary",Qr(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Qr(e.details.trim())),r.join(" ")}});var Pt,YL,A2,Ff,Ld=l(()=>{"use strict";zf();JL();Pt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},YL=e=>e===Pt.COMPLETED||e===Pt.FAILED,A2=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Ff=(e,t)=>{let r=vd(t.reportsDir,t.reportKey),o=KL({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Pt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${A2({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var We=l(()=>{"use strict";bt();V()});var Zs,ZL,XL,QL,b2,dn,P2,eE,Qs,ei,Uf,tE,rE,ti=l(()=>{"use strict";Zs=m(require("node:fs")),ZL=m(require("node:path"));Ld();zf();We();XL=50,QL=e=>{let t=M(),r=vd(t.reportsDir,e);return Zs.default.mkdirSync(ZL.default.dirname(r),{recursive:!0}),r},b2=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},dn=e=>{let t=QL(e);if(!Zs.default.existsSync(t))return null;try{let r=JSON.parse(Zs.default.readFileSync(t,"utf8"));return b2(r)?r:null}catch{return null}},P2=(e,t)=>{let r=[...e,t];return r.length>XL?r.slice(r.length-XL):r},eE=e=>{let t=QL(e.reportKey);Zs.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Qs=e=>{let t=dn(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:P2(t?.history??[],o)};return eE(n),n},ei=e=>{let t=dn(e.reportKey);return t!==null?t:Qs({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Pt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Uf=(e,t)=>{let r=t.trim();if(r.length===0)return dn(e);let o=dn(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return eE(s),s},tE=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},rE=e=>{if(e===null||!YL(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Pt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var w2,_2,ri,oE,Ed,Bf=l(()=>{"use strict";Ld();ti();w2=new Set(Object.values(Pt)),_2=e=>w2.has(e),ri=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},oE=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Ed=e=>{if(e[0]!=="write")return oE(),1;let r=ri(e,"--key"),o=ri(e,"--agent-run-id"),n=ri(e,"--status"),s=ri(e,"--summary"),i=ri(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!_2(n)?(oE(),1):(Qs({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Fe,eo=l(()=>{"use strict";Fe=()=>!0});var Gf,nE,to,Rd=l(()=>{"use strict";Gf=m(require("node:path")),nE=require("node:url");eo();to=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Gf.default.resolve(t);return Fe()?r===Gf.default.resolve(__filename):e===void 0?!1:r===(0,nE.fileURLToPath)(e)}});var Cd,un,L2,WX,pn=l(()=>{"use strict";Cd="agent-witch.js",un="deps.tar.gz",L2="install.sh",WX={mainScript:`app/${Cd}`,depsArchive:`app/${un}`,installShell:L2}});var lE=l(()=>{"use strict";pn()});var cE=l(()=>{"use strict";pn();lE()});var oi,qf,kd,E2,ni,Le,gn,si,ii,ro,Kf=l(()=>{"use strict";oi=m(require("node:fs")),qf=m(require("node:path"));cE();V();kd="install-version.json",E2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ni=(e=E())=>qf.default.join(e,kd),Le=(e=E())=>{let t=ni(e);if(!oi.default.existsSync(t))return null;try{let r=JSON.parse(oi.default.readFileSync(t,"utf8"));return!E2(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},gn=(e,t=E())=>{let r=ni(t);oi.default.mkdirSync(qf.default.dirname(r),{recursive:!0}),oi.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},si=(e=E())=>Le(e)?.bundleVersion??"216",ii=(e,t)=>{let r=Le(e);if(r!==null)return r;let o={bundleVersion:"216",appOrigin:t,updatedAt:new Date().toISOString()};return gn(o,e),o},ro=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var dE,oo,Jf,Yf,Xf,Td,wt,no,Zf=l(()=>{"use strict";dE=require("node:crypto"),oo=m(require("node:fs")),Jf=m(require("node:path"));V();Yf="self-update-log.ndjson",Xf=100,Td=(e=E())=>{let t=M(),r=t.installDir===e?t.logsDir:ln({installDir:e,profileEmail:t.profileEmail});return Jf.default.join(r,Yf)},wt=(e,t=E())=>{let r={id:(0,dE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Td(t);oo.default.mkdirSync(Jf.default.dirname(o),{recursive:!0});let n=oo.default.existsSync(o)?oo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Xf+1)),JSON.stringify(r)];return oo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},no=(e=20,t=E())=>{let r=Td(t);if(!oo.default.existsSync(r))return[];let o=oo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var Qf,FX,eh=l(()=>{"use strict";pn();Qf="deps",FX=`${"app"}/${un}`});var uE=l(()=>{"use strict";eh()});var pE,gr,so,mE,th,rh,gE=l(()=>{"use strict";pE=require("node:child_process"),gr=m(require("node:fs")),so=m(require("node:path"));pn();eh();mE=e=>so.default.join(e,"app",Qf),th=e=>{let t=so.default.join(e,"app"),r=so.default.join(t,un);gr.default.existsSync(r)&&(gr.default.rmSync(mE(e),{recursive:!0,force:!0}),gr.default.mkdirSync(t,{recursive:!0}),(0,pE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),gr.default.rmSync(r,{force:!0}))},rh=e=>{gr.default.rmSync(so.default.join(e,"node_modules"),{recursive:!0,force:!0}),gr.default.rmSync(so.default.join(e,"package.json"),{force:!0}),gr.default.rmSync(so.default.join(e,"package-lock.json"),{force:!0})}});var fE=l(()=>{"use strict";uE();gE()});var zt,xd,hE=l(()=>{"use strict";zt="https://www.agentwitch.com",xd="wss://www.agentwitch.com/api/agent-witch/ws"});var ai,Ft,yE=l(()=>{"use strict";ai="127.0.0.1",Ft=`http://${ai}:43347`});var Ut=l(()=>{"use strict";hE();yE()});var li,Id,SE,nh,R2,AE,ah,bE,at,ci,di,lh,sh,ih,ui,ch,dh,uh,fn=l(()=>{"use strict";li=m(require("node:fs")),Id=m(require("node:path")),SE="active-writer-work.json",nh=new Set,R2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),AE=e=>e.profileEmail===null?Id.default.join(e.installDir,SE):Id.default.join(e.installDir,"profiles",e.profileEmail,SE),ah=e=>{let t=AE(e);if(!li.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(li.default.readFileSync(t,"utf8"));return!R2(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},bE=(e,t)=>{let r=AE(e);li.default.mkdirSync(Id.default.dirname(r),{recursive:!0}),li.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},at=e=>ah(e).activeCount>0,ci=e=>{let t=ah(e);bE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},di=e=>{let t=ah(e),r=Math.max(0,t.activeCount-1);if(bE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of nh)o()},lh=e=>(nh.add(e),()=>{nh.delete(e)}),sh=null,ih=null,ui=e=>{sh=e},ch=e=>{ih=e},dh=()=>{let e=sh;return sh=null,e},uh=()=>{let e=ih;return ih=null,e}});var Ee,ph=l(()=>{"use strict";Ee=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var hn,Od,pi,mh=l(()=>{"use strict";hn="qwen2.5:7b",Od="nomic-embed-text",pi="Install Ollama from https://ollama.com/download"});var mi,PE,gh=l(()=>{"use strict";mh();mi=()=>`
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
    echo "Ollama is missing. ${pi}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${pi}" >&2
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
  agent_witch_ensure_ollama_model "${hn}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Od}" "\${pull_log}"
}
`,PE=()=>`
${mi()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var wE,C2,Md,fh=l(()=>{"use strict";wE=require("node:child_process");V();gh();C2=e=>new Promise(t=>{let r=(0,wE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:E()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Md=async(e=C2)=>{let t=`${mi()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var fr,Nd,_E,k2,vE,Sn,T2,x2,I2,yn,io,ao,WE=l(()=>{"use strict";fr=m(require("node:fs")),Nd=m(require("node:path"));fE();te();V();pn();Ut();Kf();fn();ph();Zf();fh();_E=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),k2=e=>{let t=st(e),r=t===null?M():M(t);if(!fr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(fr.default.readFileSync(r.configPath,"utf8"));return!_E(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},vE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!_E(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Sn=async e=>(await vE(e))?.bundleVersion??null,T2=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Nd.default.join(t,r);fr.default.mkdirSync(Nd.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());fr.default.writeFileSync(n,s),r.endsWith(".js")&&fr.default.chmodSync(n,493)},x2=async()=>{Vs(),await Xr()},I2=(e,t)=>e!==null?Ee(e):t??zt,yn=(e,t)=>({localBundleVersion:t,...e}),io=async e=>{let t=E(),r=Le(t),o=r?.bundleVersion??null,n=await Md();wt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=k2(t),i=I2(s,r?.appOrigin);if(i===null){let d=yn({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return wt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await vE(i);if(a===null){let d=yn({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return wt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||ro(o,a.bundleVersion))){let d=yn({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return wt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await T2(i,t,S);let d=Nd.default.join(t,Cd);fr.default.existsSync(d)&&fr.default.rmSync(d,{force:!0}),th(t),rh(t),gn({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=M(st(t));if(at(p)){let S=yn({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return wt({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await x2();let g=yn({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return wt({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=yn({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return wt({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},ao=()=>{let e=E();return{local:Le(e),logs:no(20,e)}}});var LE={};St(LE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>kd,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>pi,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Od,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>hn,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Yf,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Xf,appendAgentWitchSelfUpdateLog:()=>wt,buildAgentWitchEnsureOllamaShell:()=>mi,buildAgentWitchInstallScriptOllama:()=>PE,buildAgentWitchSelfUpdateStatus:()=>ao,ensureAgentWitchInstallVersionRecorded:()=>ii,ensureAgentWitchOllamaInstalled:()=>Md,fetchAgentWitchRemoteInstallBundleVersion:()=>Sn,isRemoteAgentWitchBundleVersionNewer:()=>ro,readAgentWitchInstallVersion:()=>Le,readAgentWitchSelfUpdateLogs:()=>no,resolveAgentWitchAppOriginFromWsUrl:()=>Ee,resolveAgentWitchHeartbeatInstallBundleVersion:()=>si,resolveAgentWitchInstallVersionPath:()=>ni,resolveAgentWitchSelfUpdateLogPath:()=>Td,runAgentWitchSelfUpdate:()=>io,writeAgentWitchInstallVersion:()=>gn});var Ke=l(()=>{"use strict";Kf();Zf();WE();ph();mh();gh();fh()});var hh={};St(hh,{buildAgentWitchSelfUpdateStatus:()=>ao,fetchAgentWitchRemoteInstallBundleVersion:()=>Sn,runAgentWitchSelfUpdate:()=>io});var yh=l(()=>{"use strict";Ke()});function An(e){return(0,EE.createHash)("sha256").update(e.trim()).digest("hex")}var EE,Sh=l(()=>{"use strict";EE=require("node:crypto")});var bn,gi,O2,RE,Ah,CE=l(()=>{"use strict";bn=m(require("node:fs")),gi=m(require("node:path"));Sh();We();O2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RE=e=>{if(!bn.default.existsSync(e))return null;try{let t=JSON.parse(bn.default.readFileSync(e,"utf8"));return!O2(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:An(t.pairingToken.trim())}catch{return null}},Ah=(e=E())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(RE(gi.default.join(e,"config.json")));let n=gi.default.join(e,Nt);if(!bn.default.existsSync(n))return t;for(let s of bn.default.readdirSync(n)){let i=gi.default.join(n,s);bn.default.statSync(i).isDirectory()&&o(RE(gi.default.join(i,"config.json")))}return t}});var bh,kE,jd,fi,hi,M2,N2,j2,TE,ae,le,Dd,_t,lt=l(()=>{"use strict";bh=m(require("node:fs")),kE=m(require("node:os")),jd=m(require("node:path")),fi={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},hi=e=>e.trim().length>0,M2=e=>{let t=jd.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},N2=()=>{let e=kE.default.homedir(),t=jd.default.join(e,".local","bin","agent");if(bh.default.existsSync(t))return t;let r=jd.default.join(e,".local","bin","cursor-agent");return bh.default.existsSync(r)?r:fi.cursorCommand},j2=e=>{let t=e.trim();return!hi(t)||t===fi.cursorCommand?N2():t},TE=(e,t)=>M2(e)?t:["agent",...t],ae=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",le=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:hi(t)?t.trim():fi.claudeCommand,codexCommand:hi(r)?r.trim():fi.codexCommand,cursorCommand:j2(o),antigravityCommand:hi(n)?n.trim():fi.antigravityCommand}},Dd=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:TE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},_t=(e,t,r,o)=>{let n=t.trim();if(!hi(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:TE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var hr,D2,Pn,H2,wn,Hd=l(()=>{"use strict";hr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,D2=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:hr(s.inputTokens)+hr(s.outputTokens)+hr(s.cacheReadInputTokens)+hr(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Pn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=hr(a.input_tokens)+hr(a.cache_creation_input_tokens)+hr(a.cache_read_input_tokens),d=hr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:D2(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},H2=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),wn=(e,t)=>{let r=Pn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??H2(r)}}});var Ph,$2,z2,wh,_h=l(()=>{"use strict";Ph=e=>e.toLocaleString("en-US"),$2=e=>e<.01?e.toFixed(4):e.toFixed(3),z2=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${$2(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Ph(e.inputTokens)} in / ${Ph(e.outputTokens)} out (${Ph(e.totalTokens)} total)`,t].join(`
`)},wh=(e,t)=>{if(t===void 0)return e;let r=z2(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var $d,vh=l(()=>{"use strict";$d={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var lo,Wh,zd,Lh=l(()=>{"use strict";vh();lo="auto",Wh=e=>({value:lo,label:`Auto (${$d[e]})`}),zd={anthropic:[Wh("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[Wh("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[Wh("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var _n,yi,Eh,Si=l(()=>{"use strict";vh();Lh();_n=e=>{let t=e?.trim()??"";if(!(t.length===0||t===lo))return t},yi=(e,t)=>{let r=_n(t);return r===void 0?$d[e]:r},Eh=e=>{let t=_n(e);return t===void 0?lo:t}});var Fd,F2,U2,Ud,xE=l(()=>{"use strict";Fd={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},F2=e=>{let t=Fd[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Fd["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Fd["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Fd["gemini-2.0-flash"]:null},U2=(e,t,r)=>{let o=F2(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Ud=e=>{let t=U2(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var vn,B2,G2,V2,Bd,IE=l(()=>{"use strict";xE();vn=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),B2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=vn(r.input_tokens),n=vn(r.output_tokens);return o===0&&n===0?null:Ud({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},G2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=vn(r.prompt_tokens),n=vn(r.completion_tokens);return o===0&&n===0?null:Ud({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},V2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=vn(r.promptTokenCount),n=vn(r.candidatesTokenCount);return o===0&&n===0?null:Ud({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Bd=(e,t,r)=>e==="anthropic"?B2(t,r):e==="openai"?G2(t,r):V2(t,r)});var q2,Rh,K2,J2,Y2,X2,Z2,Ch,kh=l(()=>{"use strict";Si();IE();q2=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},Rh=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:yi(e,t.model)},K2=async e=>{let t=Rh("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=q2(o);n.length>0&&e.onChunk?.(n);let s=Bd("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},J2=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},Y2=async e=>{let t=Rh("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=J2(o);n.length>0&&e.onChunk?.(n);let s=Bd("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},X2=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},Z2=async e=>{let t=Rh("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=X2(n);s.length>0&&e.onChunk?.(s);let i=Bd("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Ch=async e=>{try{return e.provider==="anthropic"?await K2(e):e.provider==="openai"?await Y2(e):await Z2(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Ue,Ai=l(()=>{"use strict";Ue=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var OE,Q2,Gd,Th=l(()=>{"use strict";OE=m(require("node:path")),Q2="writer-api-secrets.json",Gd=e=>OE.default.join(e,Q2)});var xh,ME,e5,yr,je,Sr=l(()=>{"use strict";xh=m(require("node:fs"));Si();Th();ME=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),e5=e=>{if(!ME(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=_n(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},yr=e=>{let t=Gd(e);if(!xh.default.existsSync(t))return{};try{let r=JSON.parse(xh.default.readFileSync(t,"utf8"));if(!ME(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=e5(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},je=(e,t)=>yr(e)[t]??null});var Re,bi=l(()=>{"use strict";Re=e=>e==="api"?"api":"cli"});var NE,ye,co,Bt=l(()=>{"use strict";NE=m(require("node:path"));Ai();Sr();bi();ye=e=>NE.default.dirname(e),co=(e,t)=>{if(Re(e.writerExecutionBackend)!=="api")return!1;let r=Ue(t);if(r===null)return!1;let o=ye(e.layout.configPath),n=je(o,r);return n!==null&&n.apiKey.length>0}});var Pi,Ih=l(()=>{"use strict";_h();kh();Ai();Sr();Bt();Pi=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Ue(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=ye(e.layout.configPath),a=je(i,s);if(a===null){let d=Object.keys(yr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Ch({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:wh(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var jE,Wn,Oh=l(()=>{"use strict";jE=require("node:child_process");lt();Hd();Ih();Bt();Wn=(e,t,r)=>new Promise(o=>{if(!ae(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(co(e,t)){Pi(e,t,r).then(o);return}let n=_t(t,r,le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,jE.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=wn(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var DE=l(()=>{"use strict"});var HE=l(()=>{"use strict";_h();Oh();kh();DE();Sr();Bt()});var $E,zE,FE,UE=l(()=>{"use strict";$E="claude",zE="codex",FE="cursor"});var BE,t5,Mh,wi,Vd=l(()=>{"use strict";BE=m(require("node:path"));Ut();bt();t5="ws://localhost:3000/api/agent-witch/ws",Mh=e=>e.replace(/\/$/,""),wi=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Mh(t);let r=BE.default.basename(e.installDir);if(r===Hs.production)return xd;let o=e.configWsUrl?.trim()??"";return r===Hs.localhost?o.length>0?Mh(o):t5:o.length>0?Mh(o):xd}});var o5,Nh,jh=l(()=>{"use strict";UE();Vd();bi();o5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nh=e=>{if(!o5(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=wi({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??$E,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??zE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??FE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Re(t.writerExecutionBackend),layout:e.layout}}}});var Dh,Hh,$h=l(()=>{"use strict";Dh=m(require("node:fs"));V();jh();Hh=e=>{let t=M(e);if(!Dh.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Dh.default.readFileSync(t.configPath,"utf8")),o=Nh({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var _i,GE=l(()=>{"use strict";_i=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var zh,n5,Fh,VE=l(()=>{"use strict";zh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),n5=e=>{if(!zh(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!zh(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!zh(g))return[];let S=typeof g.itemKey=="string"?g.itemKey.trim():"",h=typeof g.relativePath=="string"?g.relativePath:"",y=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},Fh=n5});var qE,s5,qd,Uh=l(()=>{"use strict";qE=m(require("node:path")),s5=(e,t)=>{let r=t.trim();return qE.default.join(e,"components","store",r.slice(0,2),r)},qd=s5});var KE,i5,Bh,JE=l(()=>{"use strict";KE=m(require("node:fs"));Uh();i5=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=qd(e.installDir,n.contentSha256);KE.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},Bh=i5});var vi,Ln,a5,Gh,l5,Vh,qh=l(()=>{"use strict";vi=m(require("node:fs")),Ln=m(require("node:path"));Uh();a5=(e,t)=>Ln.default.join(e.installDir,"runs",t,"overlay"),Gh=(e,t)=>Ln.default.join(a5(e,t),".cursor"),l5=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=Gh(e,t);vi.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=qd(e.installDir,i.contentSha256);if(!vi.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Ln.default.join(n,c):Ln.default.join(n,i.itemKey);vi.default.mkdirSync(Ln.default.dirname(d),{recursive:!0}),vi.default.copyFileSync(a,d)}return{ok:!0}},Vh=l5});var Kh,YE,c5,Wi,XE=l(()=>{"use strict";Kh=m(require("node:fs")),YE=m(require("node:path")),c5=(e,t)=>{let r=YE.default.join(e.installDir,"runs",t);Kh.default.existsSync(r)&&Kh.default.rmSync(r,{recursive:!0,force:!0})},Wi=c5});var d5,Jh,ZE=l(()=>{"use strict";qh();d5=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=Gh(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},Jh=d5});var Yh,u5,p5,m5,g5,f5,z,QE=l(()=>{"use strict";Yh=m(require("node:fs"));Vd();V();bi();u5="claude",p5="codex",m5="cursor",g5="agy",f5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),z=()=>{let e=M();if(!Yh.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Yh.default.readFileSync(e.configPath,"utf8"));if(!f5(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=wi({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Re(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:u5,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:p5,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:m5,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:g5,pairingToken:s,layout:e}}catch{return null}}});var Kd,eR,tR=l(()=>{"use strict";Kd=m(require("node:fs"));Th();eR=(e,t)=>{let r=Gd(e);Kd.default.mkdirSync(e,{recursive:!0}),Kd.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Kd.default.chmodSync(r,384)}catch{}}});var Jd,rR,Xh=l(()=>{"use strict";Jd=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},rR=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Jd(t)}});var Li,h5,Zh,Qh,oR=l(()=>{"use strict";Li=m(require("node:fs"));Sr();tR();Xh();Si();Bt();h5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zh=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=rR(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?_n(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Qh=e=>{let t=ye(e.configPath),r={};if(Li.default.existsSync(e.configPath))try{let n=JSON.parse(Li.default.readFileSync(e.configPath,"utf8"));h5(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Li.default.mkdirSync(t,{recursive:!0}),Li.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=Zh(Zh(Zh(yr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);eR(t,o)}});var ey,nR=l(()=>{"use strict";ey={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var ty,sR=l(()=>{"use strict";Ai();Sr();Bt();Bt();ty=(e,t)=>{if(co(e,t))return!1;let r=Ue(t);if(r===null)return!1;let o=ye(e.layout.configPath),n=je(o,r);return n===null||n.apiKey.trim().length===0}});var iR,ry,oy=l(()=>{"use strict";iR=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},ry=async e=>{let t=iR(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=iR(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var y5,ny,aR=l(()=>{"use strict";te();$h();oy();y5=1e4,ny=()=>ry({listProfileEmails:bd,readConfig:Hh,pollIntervalMs:y5,logWaiting:e=>{console.error(e)}})});var ce=l(()=>{"use strict";Oh();HE();$h();Vd();GE();VE();JE();qh();XE();ZE();bi();QE();oR();Sr();Bt();Xh();Si();nR();Ih();Bt();sR();Ai();Sr();aR();jh();oy()});var Yd,lR,S5,A5,cR,Xd,Ei,Zd,Ri=l(()=>{"use strict";Yd=m(require("node:fs")),lR=m(require("node:path")),S5="wake-port.json",A5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cR=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Xd=e=>lR.default.join(e,S5),Ei=e=>{let t=Xd(e);if(!Yd.default.existsSync(t))return null;try{let r=JSON.parse(Yd.default.readFileSync(t,"utf8"));if(A5(r)&&cR(r.wakePort))return r.wakePort}catch{return null}return null},Zd=(e,t)=>{if(!cR(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Xd(e);Yd.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var rte,ote,nte,ct,dR,Ci=l(()=>{"use strict";Ri();We();Ri();rte=nt(),ote=`${oe()}-wake`,nte=oe(),ct=()=>{let e=E(),t=Ei(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return nt()},dR=e=>{let t=E();Ei(t)===null&&Zd(t,e)}});var uR=l(()=>{"use strict";Sh();te();CE();ce();Ci()});var sy,ki,Ti,pR=l(()=>{"use strict";sy=m(require("node:os"));uR();ki=()=>{let e=ee();return{ok:!0,port:ct(),hostname:sy.default.hostname(),profileCount:e.length}},Ti=()=>{let e=ee(),t=z()?.pairingToken.trim()??"",r=t.length>0?An(t):null,o=Ah();return{hostname:sy.default.hostname(),port:ct(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var iy=l(()=>{"use strict";pR()});var mR,gR,fR,Qd,En=l(()=>{"use strict";mR="materialization.json",gR="backups",fR=".gitignore",Qd=e=>`harness-set:${e.trim()}`});var hR,yR,eu,SR=l(()=>{"use strict";hR=m(require("node:crypto")),yR=m(require("node:fs")),eu=e=>{try{let t=yR.default.readFileSync(e);return hR.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Ar,uo,b5,AR,ay,bR=l(()=>{"use strict";Ar=m(require("node:fs")),uo=m(require("node:path"));SR();b5=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=uo.default.join(t,n,o);return Ar.default.mkdirSync(uo.default.dirname(s),{recursive:!0}),Ar.default.copyFileSync(r,s),uo.default.relative(e,s).replaceAll("\\","/")},AR=e=>{let t=uo.default.join(e.repoRoot,e.repoRelativeDestination),r=eu(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Ar.default.existsSync(t)){let n=eu(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=b5(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Ar.default.mkdirSync(uo.default.dirname(t),{recursive:!0}),Ar.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Ar.default.mkdirSync(uo.default.dirname(t),{recursive:!0}),Ar.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},ay=e=>{let t=eu(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var ly,PR,tu,cy=l(()=>{"use strict";ly=m(require("node:fs"));En();PR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tu=e=>{if(!ly.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(ly.default.readFileSync(e,"utf8"));if(PR(t)&&t.version===1&&PR(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var br,ru,wR,_R=l(()=>{"use strict";br=m(require("node:fs")),ru=m(require("node:path"));En();wR=e=>{let t=new Set(e.setSlugs.map(s=>Qd(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=ru.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=ru.default.join(e.repoRoot,i.backupPath);br.default.existsSync(c)?(br.default.mkdirSync(ru.default.dirname(a),{recursive:!0}),br.default.copyFileSync(c,a),o.push(s)):br.default.existsSync(a)&&br.default.rmSync(a,{force:!0})}else br.default.existsSync(a)&&br.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var dy,ou,uy=l(()=>{"use strict";dy=m(require("node:path"));En();ou=e=>({ledgerFilePath:dy.default.join(e.metaDirPath,mR),backupsDirPath:dy.default.join(e.metaDirPath,gR)})});var py,vR,WR=l(()=>{"use strict";py=m(require("node:path")),vR=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return py.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return py.default.posix.join(s,e,n)}});var my,LR,gy,ER=l(()=>{"use strict";my=m(require("node:fs")),LR=m(require("node:path")),gy=(e,t)=>{my.default.mkdirSync(LR.default.dirname(e),{recursive:!0}),my.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var fy,P5,Je,Ii=l(()=>{"use strict";fy=m(require("node:os")),P5=e=>{let t=e.trim();return t.startsWith("~/")?`${fy.default.homedir()}${t.slice(1)}`:t==="~"?fy.default.homedir():t},Je=P5});var nu,RR,w5,CR,kR=l(()=>{"use strict";nu=m(require("node:fs")),RR=m(require("node:path"));En();Zr();w5=`*
!${_d}
`,CR=e=>{let t=RR.default.join(e,fR);nu.default.existsSync(t)||(nu.default.mkdirSync(e,{recursive:!0}),nu.default.writeFileSync(t,w5))}});var po,Ye,mo=l(()=>{"use strict";po=m(require("node:path"));Zr();Ii();Ye=e=>{let t=Je(e),r=po.default.join(t,HL);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:po.default.join(r,"rag"),memoryDirPath:po.default.join(r,$L),reportsDirPath:po.default.join(r,FL),metaFilePath:po.default.join(r,_d),ragChunksFilePath:po.default.join(r,"rag",zL)}}});var vt,xR,_5,v5,Be,hy=l(()=>{"use strict";vt=m(require("node:fs")),xR=m(require("node:path"));Zr();kR();mo();_5=(e,t)=>{if(vt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};vt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},v5=e=>{vt.default.existsSync(e.ragChunksFilePath)||vt.default.writeFileSync(e.ragChunksFilePath,"");let t=xR.default.join(e.memoryDirPath,cn);vt.default.existsSync(t)||vt.default.writeFileSync(t,"")},Be=e=>{let t=Ye(e.projectFolderPath);return vt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),vt.default.mkdirSync(t.ragDirPath,{recursive:!0}),vt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),CR(t.metaDirPath),_5(t,e),v5(t),{ok:!0,layout:t}}});var IR,OR,MR,NR,su,iu=l(()=>{"use strict";IR="components",OR="store",MR="versions",NR="installed.json",su=e=>`harness-set:${e.trim()}`});var yy,jR,au,Sy=l(()=>{"use strict";yy=m(require("node:fs")),jR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),au=e=>{if(!yy.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(yy.default.readFileSync(e,"utf8"));if(jR(t)&&t.version===1&&jR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var Oi,Rn,lu=l(()=>{"use strict";Oi=m(require("node:path"));iu();Rn=e=>{let t=Oi.default.join(e,IR);return{componentsRootDir:t,storeDir:Oi.default.join(t,OR),versionsDir:Oi.default.join(t,MR),installedFilePath:Oi.default.join(t,NR)}}});var Ay,DR,cu,du,uu=l(()=>{"use strict";Ay=m(require("node:crypto")),DR=m(require("node:fs")),cu=e=>Ay.default.createHash("sha256").update(e,"utf8").digest("hex"),du=e=>{try{let t=DR.default.readFileSync(e);return Ay.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var by,HR,$R,zR=l(()=>{"use strict";by=m(require("node:fs")),HR=m(require("node:path")),$R=(e,t)=>{by.default.mkdirSync(HR.default.dirname(e),{recursive:!0}),by.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Py,wy,FR,UR=l(()=>{"use strict";Py=m(require("node:fs")),wy=m(require("node:path")),FR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=wy.default.join(e,r),n=wy.default.join(o,`${t.versionId}.json`);Py.default.mkdirSync(o,{recursive:!0}),Py.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var pu,BR,GR,VR=l(()=>{"use strict";pu=m(require("node:fs")),BR=m(require("node:path"));uu();GR=e=>{let t=cu(e.content),r=BR.default.join(e.storeDir,t);return pu.default.existsSync(r)||(pu.default.mkdirSync(e.storeDir,{recursive:!0}),pu.default.writeFileSync(r,e.content)),t}});var _y,qR,W5,mu,vy=l(()=>{"use strict";_y=m(require("node:fs")),qR=m(require("node:path"));iu();Sy();lu();uu();zR();UR();VR();W5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mu=e=>{let t=Rn(e.installDir),r=su(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!W5(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=qR.default.join(e.harnessRootDir,a);if(!_y.default.existsSync(c))continue;let d=_y.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:du(c);if(p!==null){if(cu(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);GR({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;FR(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=au(t.installedFilePath);$R(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var Ly,Wy,KR,JR=l(()=>{"use strict";Ly=m(require("node:fs"));vy();Sy();lu();Wy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),KR=e=>{if(!Ly.default.existsSync(e.harnessManifestPath))return;let t=Rn(e.installDir),r=au(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(Ly.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!Wy(o)||o.version!==1||!Wy(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!Wy(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];mu({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var Ey,YR,XR,ZR=l(()=>{"use strict";Ey=m(require("node:fs")),YR=m(require("node:path")),XR=e=>{let t=e.componentId.replaceAll("/","_"),r=YR.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!Ey.default.existsSync(r))return null;try{let o=JSON.parse(Ey.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var gu,fu,QR,eC=l(()=>{"use strict";gu=m(require("node:fs")),fu=m(require("node:path"));iu();JR();ZR();lu();uu();QR=e=>{KR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Rn(e.layout.installDir),r=su(e.setSlug),o=XR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=fu.default.join(t.storeDir,i.contentSha256);if(gu.default.existsSync(a)&&du(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?fu.default.join(e.layout.harnessRootDir,n):fu.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!gu.default.existsSync(s))return null;try{if(!gu.default.statSync(s).isFile())return null}catch{return null}return s}});var tC,L5,E5,Pr,hu=l(()=>{"use strict";cy();uy();mo();tC="harness-set:",L5=e=>{let t=e.trim();if(!t.startsWith(tC))return null;let r=t.slice(tC.length).trim();return r.length>0?r:null},E5=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=L5(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Pr=e=>{let t=Ye(e),{ledgerFilePath:r}=ou(t),o=tu(r);return E5(o)}});var yu,Ry,Mi,R5,Gt,Ni,Cn=l(()=>{"use strict";yu=m(require("node:fs")),Ry=m(require("node:os")),Mi=m(require("node:path")),R5=()=>yu.default.realpathSync(Mi.default.resolve(Ry.default.homedir())),Gt=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Mi.default.join(Ry.default.homedir(),t.slice(1)):t,o;try{o=yu.default.realpathSync(Mi.default.resolve(r))}catch{return null}let n=R5();return o===n||o.startsWith(`${n}${Mi.default.sep}`)?o:null},Ni=e=>{let t=Gt(e);if(t===null)return null;try{if(!yu.default.statSync(t).isFile())return null}catch{return null}return t}});var Cy,ky=l(()=>{"use strict";Cy=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Au,rC,Su,C5,ji,Ty=l(()=>{"use strict";Au=m(require("node:fs")),rC=m(require("node:path"));En();bR();cy();_R();uy();WR();ER();Ii();hy();eC();hu();Cn();ky();Su=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),C5=e=>{if(!Au.default.existsSync(e))return null;try{let t=JSON.parse(Au.default.readFileSync(e,"utf8"));if(Su(t)&&t.version===1)return t}catch{return null}return null},ji=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=Je(e.projectFolderPath),o=Gt(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Au.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Be({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=ou(s.layout),d=Pr(o).filter(b=>!t.includes(b)),p=tu(i),g=0;if(d.length>0){let b=wR({repoRoot:o,setSlugs:d,ledger:p});p=b.ledger,g=b.summary.removedPaths.length}if(t.length===0)return gy(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let S=C5(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Su(S.sets)?S.sets:{},y=0,u=0,A=0;for(let b of t){let f=h[b];if(!Su(f))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",_=Qd(b),v=Array.isArray(f.items)?f.items:[];for(let L of v){if(!Su(L))continue;let R=typeof L.path=="string"?L.path.trim():"";if(R.length===0)continue;let T=Cy(R);if(T===null)continue;let I=vR(b,T),D=rC.default.posix.join(".cursor",I).replaceAll("\\","/"),re=typeof L.id=="string"?L.id.trim():"",B=QR({layout:e.layout,setSlug:b,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:R,manifestItemId:re});if(B===null)continue;let q=AR({repoRoot:o,backupsDir:a,repoRelativeDestination:D,sourceAbsolutePath:B,componentId:_,versionId:w,ledger:p});if(q.kind==="skipped_unchanged"){u+=1;continue}if(q.kind==="backed_up_user_file"){A+=1,y+=1,p={version:1,entries:{...p.entries,[D]:ay({componentId:_,versionId:w,sourceAbsolutePath:B,backupPath:q.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[D]:ay({componentId:_,versionId:w,sourceAbsolutePath:B})}}}}return y===0&&u===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(gy(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:A,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var oC,bu,k5,T5,x5,I5,O5,M5,N5,j5,D5,Di,Pu=l(()=>{"use strict";oC=m(require("node:crypto")),bu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},k5=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},T5=(e,t)=>{let r=k5(t),o=bu(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},x5=(e,t,r)=>{let o=T5(t,r);return`shared/items/${e}/${o}`},I5=["rules","skills","commands","instructions","agents"],O5=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),M5=(e,t)=>[...e.filter(o=>o.id!==t.id),t],N5=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},j5=e=>oC.default.createHash("sha256").update(e,"utf8").digest("hex"),D5=e=>({id:e.id,kind:e.kind,title:e.title,path:x5(e.id,e.kind,e.title),contentSha256:j5(e.content)}),Di=e=>{let t=new Date().toISOString(),r=e.existingManifest??O5(e.hostname,t),o=bu(e.bundle.slug),n=N5(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...I5.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=D5(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:M5(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var wr,nC,wu,H5,go,xy=l(()=>{"use strict";wr=m(require("node:fs")),nC=m(require("node:os")),wu=m(require("node:path"));Pu();H5=e=>{if(!wr.default.existsSync(e))return null;try{let t=JSON.parse(wr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},go=e=>{try{let t=H5(e.layout.harnessManifestPath),r=Di({bundle:e.bundle,hostname:nC.default.hostname(),existingManifest:t});wr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)wr.default.mkdirSync(wu.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=wu.default.join(e.layout.harnessRootDir,o.relativePath);wr.default.mkdirSync(wu.default.dirname(n),{recursive:!0}),wr.default.writeFileSync(n,o.content)}return wr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var Iy,sC=l(()=>{"use strict";xy();Ty();Iy=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=go({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return ji({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var iC,aC=l(()=>{"use strict";iC=["rule","skill","command","instruction","agent"]});var lC,$5,z5,Wt,Oy=l(()=>{"use strict";aC();lC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$5=e=>typeof e=="string"&&iC.includes(e),z5=e=>{if(!lC(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!$5(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Wt=e=>{if(!lC(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=z5(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var cC,F5,My,dC=l(()=>{"use strict";cC=require("node:zlib");Oy();F5="x-agent-witch-token",My=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[F5]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,cC.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Wt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var jy,Ny,_r,uC=l(()=>{"use strict";jy=m(require("node:fs")),Ny=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_r=e=>{if(!jy.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(jy.default.readFileSync(e.harnessManifestPath,"utf8"));if(!Ny(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=Ny(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!Ny(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var _u,pC=l(()=>{"use strict";_u=()=>"~"});var mC,gC,fC=l(()=>{"use strict";mC=require("node:crypto"),gC=e=>`local-${(0,mC.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Dy,hC=l(()=>{"use strict";Dy=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Hi,vu,Hy=l(()=>{"use strict";Hi=m(require("node:path")),vu=e=>{let t=Hi.default.dirname(e),r=Hi.default.basename(t);return r==="agents"?Hi.default.basename(Hi.default.dirname(t)):r}});var $i,Vt,yC,U5,B5,G5,Wu,SC,$y=l(()=>{"use strict";$i=m(require("node:fs")),Vt=m(require("node:path"));fC();hC();Hy();yC=new Set(["node_modules",".git","dist","build",".next","coverage"]),U5=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},B5=(e,t)=>{let r=Vt.default.basename(t);if(e==="skill"){let o=t.split(Vt.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},G5=e=>{let t=[],r=(n,s)=>{let i;try{i=$i.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&yC.has(a.name))continue;let c=Vt.default.join(n,a.name),d=s?Vt.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;Dy(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Vt.default.join(e,n);$i.default.existsSync(s)&&r(s,n)}let o=Vt.default.join(e,"skills");return $i.default.existsSync(o)&&r(o,"skills"),t},Wu=e=>{let t=G5(e);if(t.length===0)return null;let r=Vt.default.dirname(e),o=vu(e),n=U5(o),s=t.map(i=>{let a=Dy(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:gC(i.absolutePath),kind:a,title:B5(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},SC=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=$i.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||yC.has(a.name))continue;let c=Vt.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var AC,zy,V5,Fy,bC=l(()=>{"use strict";AC=m(require("node:fs")),zy=m(require("node:path"));$y();Cn();V5=e=>{let t=Gt(e.trim());if(t===null)return null;if(zy.default.basename(t)===".cursor")return t;let r=zy.default.join(t,".cursor");try{if(AC.default.statSync(r).isDirectory())return Gt(r)}catch{return null}return null},Fy=e=>{let t=V5(e.projectPath);if(t===null)return null;let r=Wu(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var PC,q5,Lu,Uy,wC=l(()=>{"use strict";PC=m(require("node:path"));$y();Cn();Hy();q5=5,Lu=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Uy=e=>{let t=Gt(e.scanRoot.trim());if(t===null)return Lu(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of SC(t,q5,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Gt(s);if(i===null)continue;let a=vu(i);Lu(e.response,"folder",{cursorDir:i,groupName:a,repoPath:PC.default.dirname(i)});let c=Wu(i);c!==null&&(r.push(c),Lu(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Lu(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var _C,vC,WC=l(()=>{"use strict";_C=m(require("node:path")),vC=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:_C.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Ie,LC,By,K5,Gy,Vy,Eu,qy,zi,EC=l(()=>{"use strict";Ie=m(require("node:fs")),LC=m(require("node:os")),By=m(require("node:path"));Pu();vy();Cn();WC();K5=e=>{if(!Ie.default.existsSync(e))return null;try{let t=JSON.parse(Ie.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Gy=e=>{let t=e.hostname??LC.default.hostname(),r=K5(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=Ni(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let S=Ie.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:S,setSlugs:[i.slug]})}let d=Di({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Ie.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Ie.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=By.default.join(e.layout.harnessRootDir,i.relativePath);Ie.default.mkdirSync(By.default.dirname(a),{recursive:!0}),Ie.default.writeFileSync(a,i.content)}Ie.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=bu(i.slug),d=r.sets[c];d!==void 0&&mu({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},Vy="reveal-cache.json",Eu=(e,t)=>{Ie.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Ie.default.writeFileSync(`${e.harnessRootDir}/${Vy}`,`${JSON.stringify(t,null,2)}
`)},qy=e=>{let t=`${e.harnessRootDir}/${Vy}`;Ie.default.existsSync(t)&&Ie.default.unlinkSync(t)},zi=e=>{let t=`${e.harnessRootDir}/${Vy}`;if(!Ie.default.existsSync(t))return null;try{let r=JSON.parse(Ie.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return vC(r)}catch{return null}return null}});var fo=l(()=>{"use strict";Ty();sC();ky();xy();dC();Oy();Pu();uC();pC();bC();Cn();wC();EC()});var Ky,RC=l(()=>{"use strict";fo();We();Ky=e=>{let t=M(e.profileEmail);return go({bundle:e.bundle,layout:t})}});var CC=l(()=>{"use strict";RC();fo()});var J5,kC,Y5,TC,ho,Ru,xC=l(()=>{"use strict";J5=["agentwitch.com","www.agentwitch.com"],kC=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,Y5=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},TC=e=>{let t=Y5(e);return!!(J5.includes(t)||kC.test(e.trim().toLowerCase()))},ho=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return TC(r)?kC.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Ru=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:ho(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Fi=l(()=>{"use strict";xC()});var qt,Ui=l(()=>{"use strict";qt=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Bi,IC=l(()=>{"use strict";CC();Fi();Ui();Bi=e=>{if(!qt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Wt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!ho(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=Ky({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var Jy=l(()=>{"use strict";IC()});var X5,kn,Yy=l(()=>{"use strict";X5=e=>e==="hourly"||e==="daily"||e==="weekdays",kn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!X5(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Gi,Cu,OC,MC,Xy,dt,ku,Tu,xu,Iu,Ou=l(()=>{"use strict";Gi=m(require("node:fs")),Cu=m(require("node:path"));Yy();OC="automations.json",MC=e=>e.profileEmail!==null?Cu.default.join(e.installDir,"profiles",e.profileEmail,OC):Cu.default.join(e.installDir,OC),Xy=()=>({version:1,automations:[]}),dt=e=>{let t=MC(e);if(!Gi.default.existsSync(t))return Xy();try{let r=JSON.parse(Gi.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?Xy():{version:1,automations:r.automations.flatMap(n=>{let s=kn(n);return s!==null?[s]:[]})}}catch{return Xy()}},ku=(e,t)=>{let r=MC(e);Gi.default.mkdirSync(Cu.default.dirname(r),{recursive:!0}),Gi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Tu=(e,t)=>{ku(e,{version:1,automations:t})},xu=(e,t)=>{let o=dt(e).automations.filter(n=>n.id!==t.id);ku(e,{version:1,automations:[...o,t]})},Iu=(e,t)=>dt(e).automations.find(r=>r.id===t)??null});var De,vr=l(()=>{"use strict";De="x-agent-witch-token"});var Z,yo,Zy,Vi,Qy,Z5,eS,qi,Ki,tS,Ji=l(()=>{"use strict";vr();Ke();Z=e=>{let t=Ee(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},yo=e=>({[De]:e,"Content-Type":"application/json"}),Zy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:yo(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Vi=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:yo(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Qy=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:yo(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Z5=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},eS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:yo(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},qi=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:yo(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return Z5(r)}catch{return null}},Ki=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:yo(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},tS=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:yo(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var So,NC,jC,Q5,rS,DC,oS=l(()=>{"use strict";So=m(require("node:fs")),NC=m(require("node:path")),jC=e=>NC.default.join(e.harnessRootDir,"projects-registry.json"),Q5=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),rS=e=>{let t=jC(e);if(!So.default.existsSync(t))return[];try{let r=JSON.parse(So.default.readFileSync(t,"utf8"));return Q5(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},DC=e=>{let t=jC(e);if(!So.default.existsSync(t))return;let r=`${t}.migrated`;if(So.default.existsSync(r)){So.default.unlinkSync(t);return}So.default.renameSync(t,r)}});var HC,eV,tV,$C,zC=l(()=>{"use strict";Ii();HC=e=>Je(e),eV=e=>new Set(e.map(t=>HC(t.folderPath))),tV=e=>new Set(e.map(t=>t.id)),$C=(e,t)=>{let r=eV(t),o=tV(t),n=[],s=new Set;for(let i of e){let a=HC(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var nS,sS=l(()=>{"use strict";Ji();oS();zC();nS=async(e,t)=>{let r=rS(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await qi(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=$C(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await eS(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&DC(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var iS,Ao,Mu=l(()=>{"use strict";iS=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Ao=(e,t)=>e.find(r=>r.id===t)??null});var Tn,Nu=l(()=>{"use strict";Ji();sS();Mu();Tn=async(e,t)=>{t!==void 0&&await nS(t,e);let r=Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await qi(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let n=iS(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Console.`}}});var FC=l(()=>{"use strict"});var Oe,UC,rV,oV,nV,sV,xn,aS=l(()=>{"use strict";Oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UC=(e,t)=>e.length===0?`<p class="empty">${Oe(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Oe(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Oe(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,rV=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,oV=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Oe(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,nV=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?oV(e.project):rV();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Oe(o.slug)}"${t.size===0||t.has(o.slug)?" checked":""} />
            <span><strong>${Oe(o.name)}</strong> <span class="muted mono">(${Oe(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Oe(e.project.id)}" />
        <p class="field-label">Installed</p>
        <p class="lede">Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.</p>
        ${r}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`},sV=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Oe(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Oe(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},xn=e=>{let t=e.flashError?`<div class="alert-error">${Oe(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Oe(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${Oe(c)}</a>`,n=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=nV({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=UC(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=UC(s,"No agents installed for this project yet."):i=sV({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Oe(e.project.name)}</h1>
      <p class="muted mono">${Oe(e.project.projectFolderPath)}</p>
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
    </section>`}});var iV,aV,BC,GC=l(()=>{"use strict";fo();vr();iV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aV=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[De]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!iV(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Wt(n);return s===null?[]:[s]})}catch{return null}},BC=aV});var VC,lS,qC=l(()=>{"use strict";ce();fo();aS();Nu();GC();Mu();hu();Ji();VC=e=>({kind:"page",title:e.project.name,body:xn({project:e.project,installed:_r(e.layout),linkedSetSlugs:Pr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),lS=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=z();if(r===null)return{kind:"not_found"};let o=await Tn(r,e.layout),n=Ao(o.projects,t);if(n===null)return{kind:"not_found"};let s=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await BC(s,n.id);if(i===null)return VC({layout:e.layout,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=Iy({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:i});if(!a.ok)return VC({layout:e.layout,project:n,errorMessage:a.errorMessage});let c=s===null?!1:await Ki(s,n.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${d.toString()}`}}});var lV,cS,KC=l(()=>{"use strict";lV=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,cS=lV});var JC,YC,cV,dV,ju,Du,XC=l(()=>{"use strict";JC=require("node:child_process"),YC=require("node:util"),cV=(0,YC.promisify)(JC.execFile),dV=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},ju=async(e,t)=>{try{let{stdout:r}=await cV("git",t,{cwd:e,env:dV(),maxBuffer:1048576});return r.trim()}catch{return null}},Du=async e=>{let t=await ju(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await ju(e,["rev-parse","--abbrev-ref","HEAD"]),o=await ju(e,["status","--porcelain"]),n=await ju(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var dS,ZC=l(()=>{"use strict";dS=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var uV,uS,QC=l(()=>{"use strict";uV=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},uS=uV});var pV,pS,ek=l(()=>{"use strict";vr();pV=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[De]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},pS=pV});var tk,Wr,rk=l(()=>{"use strict";tk=require("node:child_process"),Wr=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,tk.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var ok=l(()=>{"use strict";Nu()});var Yi,nk=l(()=>{"use strict";vr();Yi=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[De]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var ut=l(()=>{"use strict";Nu();Mu();FC();Ii();hy();qC();hu();KC();XC();ZC();QC();ek();rk();ok();nk();sS();oS();Ji()});var Hu,Xi,sk,mS,bo,gS=l(()=>{"use strict";Hu=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Xi=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Hu(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},sk=e=>e>=1&&e<=5,mS=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Hu(t,"UTC")},bo=e=>{let t=e.from??new Date,r=Hu(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Xi(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Xi(r,e.timeZone,o,0),s=Hu(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Xi(mS(r),e.timeZone,o,0):n;if(!i&&sk(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=mS(a),sk(a.weekday))return Xi(a,e.timeZone,o,0);return Xi(mS(r),e.timeZone,o,0)}});var ik,fS,Kt,hS=l(()=>{"use strict";ik=require("node:crypto");ce();ut();gS();Ou();fS=!1,Kt=async e=>{if(fS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=z();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=Iu(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};fS=!0;let n=(0,ik.randomUUID)();try{let s=await Wn(t,"claude-cli",o.prompt);await tS(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=bo({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return xu(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{fS=!1}}});var $u,ak=l(()=>{"use strict";ce();hS();Ou();$u=async()=>{let e=z();if(e===null)return;let t=dt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Kt(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Zi=l(()=>{"use strict";Ou();ak();hS();gS()});var lk=l(()=>{"use strict";Zi()});var ck=l(()=>{"use strict";Yy()});var dk=l(()=>{"use strict";ck()});var yS=l(()=>{"use strict";Zi()});var mV,gV,Qi,SS=l(()=>{"use strict";lk();dk();yS();We();mV=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),gV=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??bo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??bo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Qi=e=>{let t=mV(e.profileEmail),r=dt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=kn(s);return i!==null?[gV(i,o.get(i.id))]:[]});return Tu(t,n),{ok:!0,writtenCount:n.length}}});var AS=l(()=>{"use strict";Zi()});var uk=l(()=>{"use strict";ce()});var pk=l(()=>{"use strict";SS();AS();yS();uk()});var mk,ea,ta,ra,gk=l(()=>{"use strict";mk=m(require("node:os"));pk();Fi();Ui();ea=e=>{if(!qt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!ho(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=Qi({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},ta=async e=>{if(!qt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:ho(t)?Kt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},ra=()=>{let e=z(),t=e!==null?dt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:mk.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var bS=l(()=>{"use strict";gk()});var zu=l(()=>{"use strict";te()});var Fu=l(()=>{"use strict";te()});var Uu,hk,yk,fk,fV,hV,In,PS=l(()=>{"use strict";Uu=m(require("node:fs")),hk=m(require("node:os")),yk=m(require("node:path"));zu();Fu();Ri();We();fk=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},fV=e=>yk.default.join(hk.default.homedir(),"Library","LaunchAgents",`${e}.plist`),hV=async e=>Uu.default.existsSync(fV(e))?(await ve(e)).ok:!1,In=async(e=E())=>{let t=Uu.default.existsSync(Xd(e)),r=!Uu.default.existsSync(jt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Ei(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await fk(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${oe(e)}-wake`;await hV(i)&&s.push(i);for(let c of ee(e))(await ve(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await fk(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var Sk=l(()=>{"use strict";te()});var On,oa=l(()=>{"use strict";On="connection-health.json"});var Po,Bu,yV,na,Se,wS,Gu,Me,Vu=l(()=>{"use strict";Po=m(require("node:fs")),Bu=m(require("node:path"));oa();yV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),na=e=>e.profileEmail===null?Bu.default.join(e.installDir,On):Bu.default.join(e.installDir,"profiles",e.profileEmail,On),Se=e=>{let t=na(e);if(!Po.default.existsSync(t))return null;try{let r=JSON.parse(Po.default.readFileSync(t,"utf8"));return!yV(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},wS=e=>{let t=na(e);Po.default.existsSync(t)&&Po.default.rmSync(t,{force:!0})},Gu=(e,t)=>{let r=na(e),o=Se(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Po.default.mkdirSync(Bu.default.dirname(r),{recursive:!0}),Po.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Me=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var sa,Ak=l(()=>{"use strict";oa();Vu();sa=(e,t)=>{if(!t.socketOpen)return!1;let r=Se(e);return r===null?!1:!Me(r,t.staleAfterMs??12e4,t.nowMs)}});var _S,bk=l(()=>{"use strict";Vu();_S=(e,t)=>!(e!==null&&!Me(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Mn=l(()=>{"use strict";Vu();Ak();bk();oa()});var vS=l(()=>{"use strict";Mn();te()});var WS=l(()=>{"use strict";Mn()});var LS=l(()=>{"use strict";te()});var wk,Pk,ia,ES=l(()=>{"use strict";wk=m(require("node:fs"));Ut();zu();Fu();We();Pk=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},ia=async(e=E())=>{if(!wk.default.existsSync(jt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await Pk())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ee(e))(await ve(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await Pk();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var _k=l(()=>{"use strict";te()});var vk,wo,RS,SV,AV,bV,Wk,PV,Lk,Nn,qu=l(()=>{"use strict";vk=require("node:crypto"),wo=m(require("node:fs")),RS=m(require("node:path"));We();SV="watchdog-log.ndjson",AV=200,bV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wk=(e=E())=>{let t=M(),r=t.installDir===e?t.logsDir:ln({installDir:e,profileEmail:t.profileEmail});return RS.default.join(r,SV)},PV=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!bV(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},Lk=(e,t=E())=>{let r={id:(0,vk.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=Wk(t);wo.default.mkdirSync(RS.default.dirname(o),{recursive:!0});let n=wo.default.existsSync(o)?wo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-AV+1)),JSON.stringify(r)];return wo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Nn=(e=20,t=E())=>{let r=Wk(t);if(!wo.default.existsSync(r))return[];let o=wo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=PV(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var CS,kS,TS,xS=l(()=>{"use strict";bt();CS=Gr.watchdogReinstallState,kS=900*1e3,TS=3e3});var Ek=l(()=>{"use strict";xS()});var Rk={};St(Rk,{verifyAgentWitchReviveAfterKickstart:()=>_V});var wV,_V,Ck=l(()=>{"use strict";Ek();WS();LS();We();wV=e=>new Promise(t=>{setTimeout(t,e)}),_V=async e=>{if(await wV(e.verifyDelayMs??TS),!await Kr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),o=Se(r);return!Me(o,e.staleAfterMs)}});var aa,IS,vV,kk,Tk,OS,MS,NS=l(()=>{"use strict";aa=m(require("node:fs")),IS=m(require("node:path"));V();xS();vV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kk=e=>IS.default.join(e,CS),Tk=(e=E())=>{let t=kk(e);if(!aa.default.existsSync(t))return null;try{let r=JSON.parse(aa.default.readFileSync(t,"utf8"));return!vV(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},OS=(e=E(),t=Date.now())=>{let r=Tk(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=kS:!0},MS=(e=E(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=kk(e);return aa.default.mkdirSync(IS.default.dirname(o),{recursive:!0}),aa.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var jS,xk=l(()=>{"use strict";te();NS();jS=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!OS())return{attempted:!1,ok:!1,targets:e};MS();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await ve(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var Ik=l(()=>{"use strict";NS();xk()});var DS=l(()=>{"use strict";Ke()});var Ok=l(()=>{"use strict";Ke()});var Mk,jn,Nk,jk,Dk,WV,LV,Hk,EV,RV,$k,zk=l(()=>{"use strict";Mk=require("node:child_process"),jn=m(require("node:fs")),Nk=m(require("node:os")),jk=m(require("node:path")),Dk=require("node:util");DS();Ok();We();WV=(0,Dk.promisify)(Mk.execFile),LV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hk=e=>{let t=st(e),r=t===null?M():M(t);if(!jn.default.existsSync(r.configPath))return null;try{let o=JSON.parse(jn.default.readFileSync(r.configPath,"utf8"));return!LV(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},EV=e=>Hk(e)?.wsUrl??null,RV=e=>{let t=EV(e);return t!==null?Ee(t):Le(e)?.appOrigin??null},$k=async e=>{let t=e?.installDir??E(),r=Hk(t),o=r!==null?Ee(r.wsUrl):RV(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=jk.default.join(Nk.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{jn.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??st(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await WV("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{jn.default.existsSync(i)&&jn.default.unlinkSync(i)}}});var Fk={};St(Fk,{attemptAgentWitchWatchdogReinstall:()=>CV});var CV,Uk=l(()=>{"use strict";Ik();zk();CV=async e=>jS(e,()=>$k())});var Bk,Gk,Vk,kV,TV,xV,la,HS=l(()=>{"use strict";Sk();vS();WS();LS();ES();PS();zu();Fu();We();fn();_k();qu();Bk=e=>e===null?M():M(e),Gk=async(e,t,r)=>{if(!await Kr(e))return"not_running";let n=Bk(t);if(at(n))return"healthy";let s=Se(n);return Me(s,r)?"stale_connection":"healthy"},Vk=async e=>{let t=e?.staleAfterMs??12e4,r=E(),o=ee(r);return Promise.all(o.map(async n=>{let s=await Gk(n.launchAgentLabel,n.profileEmail,t),i=Bk(n.profileEmail),a=Se(i),c=await Kr(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Me(a,t),needsRevive:s!=="healthy",reason:s}}))},kV=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},TV=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",xV=async e=>{let t=await ve(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(Ck(),Rk)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},la=async e=>{if(!it())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=E();await In(r),await ia(r);let o=ee(r),n=[];for(let p of o){let g=await Gk(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}n.push(await xV({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let p=qr();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(Uk(),Fk)),g=await p(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&Lk({event:TV(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:kV(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var qk,Ku,Kk=l(()=>{"use strict";qk=m(require("node:os"));vS();qu();HS();Ku=async()=>{let e=await Vk(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:qk.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Nn(1)[0]??null}}});var $S=l(()=>{"use strict";PS();HS();Kk();qu()});var ca,da,ua,Jk=l(()=>{"use strict";te();$S();ca=async()=>{await In();let e=ee(),t=[];for(let r of e){let o=await ve(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=qr();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},da=la,ua=la});var zS=l(()=>{"use strict";Jk()});var Yu,Ju,Yk,FS,Xk,IV,OV,MV,NV,jV,Xu,Zk=l(()=>{"use strict";Yu=require("node:child_process"),Ju=m(require("node:fs")),Yk=m(require("node:os")),FS=m(require("node:path")),Xk=require("node:util");te();V();IV=(0,Xk.promisify)(Yu.execFile),OV=()=>FS.default.join(Yk.default.homedir(),"Library","LaunchAgents"),MV=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await IV("launchctl",["bootout",r]).catch(()=>{})},NV=e=>{let t=FS.default.join(OV(),`${e}.plist`);Ju.default.existsSync(t)&&Ju.default.unlinkSync(t)},jV=e=>{(0,Yu.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Xu=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=E();if(!Ju.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Dt(e);for(let r of t)await MV(r),NV(r);return jV(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var Qk,Zu,eT,Dn,tT,DV,HV,$V,US,zV,BS,rT=l(()=>{"use strict";Qk=require("node:child_process"),Zu=m(require("node:fs")),eT=m(require("node:os")),Dn=m(require("node:path")),tT=require("node:util");te();DV=(0,tT.promisify)(Qk.execFile),HV=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],$V=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],US=e=>{Zu.default.existsSync(e)&&Zu.default.rmSync(e,{force:!0})},zV=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await DV("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},BS=async e=>{let r=(e.listLaunchAgentLabels??Dt)(e.layout.installDir),o=e.launchAgentsDir??Dn.default.join(eT.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??zV;for(let i of r)await n(i),US(Dn.default.join(o,`${i}.plist`));let s=Dn.default.dirname(e.layout.configPath);for(let i of HV)US(Dn.default.join(s,i));for(let i of $V)US(Dn.default.join(e.layout.installDir,i));return Zu.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var GS,oT=l(()=>{"use strict";GS={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var VS,nT=l(()=>{"use strict";VS="unknown_identity"});var qS=l(()=>{"use strict";oT();nT()});var FV,KS,sT=l(()=>{"use strict";qS();FV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),KS=e=>e.type!=="system.error"||!FV(e.payload)?!1:e.payload.errorCode===VS});var JS=l(()=>{"use strict";Zk();rT();sT()});var Qu=l(()=>{"use strict";te();Ke();JS();$S()});var Hn,ep,tp=l(()=>{"use strict";Qu();Hn=(e=20)=>Nn(e),ep=Ku});var rp,$n,op,np=l(()=>{"use strict";Qu();rp=ao,$n=(e=20)=>no(e),op=e=>io(e)});var sp,YS=l(()=>{"use strict";Qu();sp=()=>Xu()});var iT=l(()=>{"use strict";iy();Jy();bS();zS();tp();np();YS()});var aT={};St(aT,{buildAgentWitchAutomationStatusFromWakeServer:()=>ra,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>rp,buildAgentWitchWakeHealthResponse:()=>ki,buildAgentWitchWakeIdentityResponse:()=>Ti,buildAgentWitchWatchdogStatus:()=>ep,installHarnessFromWakeServer:()=>Bi,readAgentWitchSelfUpdateLogEntries:()=>$n,readAgentWitchWatchdogLogEntries:()=>Hn,restartAgentWitchFromWakeServer:()=>ua,reviveAgentWitchWebSocketFromWakeServer:()=>da,runAgentWitchSelfUpdateFromWakeServer:()=>op,runAgentWitchUninstallLocalFromWakeServer:()=>sp,runAutomationFromWakeServer:()=>ta,syncAutomationsFromWakeServer:()=>ea,wakeAgentWitchLaunchAgents:()=>ca});var lT=l(()=>{"use strict";iT()});var cT,dT,XS,ZS,uT=l(()=>{"use strict";cT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),dT=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?cT(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?cT(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},XS=e=>{let t=e.watchdogLogs.map(dT).join(""),r=e.updateLogs.map(dT).join("");return`<!doctype html>
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
</html>`},ZS=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var pT,mT,gT=l(()=>{"use strict";pT=m(require("node:net")),mT=()=>new Promise((e,t)=>{let r=pT.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var fT,UV,QS,hT=l(()=>{"use strict";fT=m(require("node:net"));gT();Ci();Ri();We();UV=e=>new Promise(t=>{let r=fT.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),QS=async()=>{let e=E(),t=ct();if(await UV(t))return dR(t),t;let r=await mT();return Zd(e,r),r}});var BV,eA,yT=l(()=>{"use strict";BV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eA=e=>({force:BV(e)&&e.force===!0})});var pa=l(()=>{"use strict";Fi();uT();hT();yT();$f();Rd();eo()});var tA,j,rA,oA,ma,ST=l(()=>{"use strict";tA=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},rA=e=>{e.writeHead(403),e.end()},oA=e=>e.url?.split("?")[0]??"/",ma=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var pt=l(()=>{"use strict";ST()});var GV,AT,bT=l(()=>{"use strict";bS();pt();GV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},AT=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,ra(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await GV(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=ea(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await ta(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var VV,wT,PT,_T,nA,vT,sA=l(()=>{"use strict";VV=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],wT=e=>/embed|minilm|^bge-/i.test(e),PT=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),_T=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),nA=e=>e.filter(t=>t.trim().length>0&&!wT(t)),vT=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!wT(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>PT(s,o));if(n!==void 0)return n}for(let n of VV){let s=r.find(i=>PT(i,n));if(s!==void 0)return s}return r[0]??null}});var iA,ET,RT,ip,CT,WT,LT,qV,KV,JV,YV,XV,ZV,mt,ga=l(()=>{"use strict";iA=require("node:child_process"),ET=m(require("node:fs")),RT=m(require("node:os")),ip=m(require("node:path"));Ke();lt();sA();CT=3e3,WT=["claude-cli","codex","cursor","antigravity"],LT={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},qV=(e,t)=>new Promise(r=>{let o=(0,iA.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},CT);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),KV=()=>{let e=RT.default.homedir();return["ollama",ip.default.join(e,".local","bin","ollama"),ip.default.join(e,".agent-witch","ollama","ollama"),ip.default.join(e,".local-agent-witch","ollama","ollama")]},JV=e=>new Promise(t=>{let r=(0,iA.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},CT);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(_T(Buffer.concat(o).toString("utf8")))})}),YV=async()=>{for(let e of KV()){if(e!=="ollama"&&!ET.default.existsSync(e))continue;let t=await JV(e);if(t!==null)return t}return[]},XV=e=>{let t=e.installedWriterIds.map(s=>LT[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=ae(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${LT[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},ZV=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:hn},mt=async e=>{let t=WT.map(i=>{let a=Dd(i,e.commands);return qV(a.command,a.args)}),[r,...o]=await Promise.all([YV(),...t]),n=WT.flatMap((i,a)=>o[a]===!0?[i]:[]),s=vT(r,ZV());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:XV({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var QV,eq,aA,kT=l(()=>{"use strict";QV="http://127.0.0.1:11434",eq=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},aA=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||QV;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?eq(await o.json()):null}catch{return null}}});var lA=l(()=>{"use strict";lt();ga();kT();sA()});var tq,TT,xT=l(()=>{"use strict";lA();tq={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},TT=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:tq[t]})),ollamaModels:nA(e.ollamaModels)})});var rq,IT,OT=l(()=>{"use strict";lA();pt();xT();rq=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},IT=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await mt({commands:le({})});return j(e.response,200,{ok:!0,...TT({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await rq(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await aA({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var oq,MT,NT=l(()=>{"use strict";Jy();pt();oq=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},MT=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await oq(e);if(t===null)return!0;let r=Bi(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var jT=l(()=>{"use strict";ut()});var cA,DT=l(()=>{"use strict";jT();Ui();cA=e=>{if(!qt(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Be({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var HT,dA,uA=l(()=>{"use strict";ce();ut();Ui();HT=e=>{if(!qt(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},dA=async e=>{let t=HT(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Wr("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=z();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Z({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Be({projectFolderPath:r}),await Yi(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var $T=l(()=>{"use strict";DT();uA()});var zT,FT=l(()=>{"use strict";$T();uA();pt();zT=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=cA(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await dA(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var UT,BT=l(()=>{"use strict";pa();np();tp();UT=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Hn(50),r=$n(50);return e.response.writeHead(200,ZS()),e.response.end(XS({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var GT,VT=l(()=>{"use strict";iy();pt();GT=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,ki(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,Ti(),e.cors.headers),!0):!1});var qT,KT=l(()=>{"use strict";YS();pt();qT=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await sp();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var JT,YT=l(()=>{"use strict";zS();pt();JT=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await da();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await ua();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await ca();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var XT,ZT=l(()=>{"use strict";pa();np();pt();XT=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=rp();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=ma(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:$n(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=eA(t),o=await op({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var QT,ex=l(()=>{"use strict";tp();pt();QT=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await ep();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=ma(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:Hn(t)},e.cors.headers),!0}return!1}});var tx,rx=l(()=>{"use strict";bT();OT();NT();FT();BT();VT();KT();YT();ZT();ex();tx=[GT,UT,QT,JT,XT,qT,MT,zT,AT,IT]});var ox,nx=l(()=>{"use strict";rx();ox=async e=>{for(let t of tx)if(await t(e))return!0;return!1}});var nq,sx,ix=l(()=>{"use strict";Fi();pt();nx();nq=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:oA(e),readJsonBody:()=>tA(e)}),sx=async(e,t,r)=>{let o=e.headers.origin,n=Ru(o);try{if(o!==void 0&&o.length>0&&!n.allowed){rA(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=nq(e,t,r,n);if(await ox(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var ax,_o,ap,lp=l(()=>{"use strict";ax=m(require("node:http"));pa();ix();_o=async()=>{let e=await QS(),t=ax.default.createServer((r,o)=>{sx(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},ap=_o});var lx={};St(lx,{runAgentWitchBridgeCli:()=>sq});var sq,cx=l(()=>{"use strict";te();lp();sq=async()=>{ze("agent-witch-bridge");let e=await _o(),t=$t(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var dx=l(()=>{"use strict";Ut()});var zn,pA,ux=l(()=>{"use strict";zn=(e,t,r)=>e===1?t:r,pA=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${zn(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${zn(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${zn(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${zn(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${zn(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${zn(p,"year","years")} ago`}});var vo,mA,iq,aq,gA,Lr,fa,fA,px=l(()=>{"use strict";vo=m(require("node:fs")),mA=m(require("node:path")),iq="local-ws-traffic.ndjson",aq=500,gA=e=>mA.default.join(e.logsDir,iq),Lr=(e,t)=>{let r=gA(e);vo.default.mkdirSync(mA.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});vo.default.appendFileSync(r,`${o}
`,"utf8")},fa=(e,t=aq)=>{let r=gA(e);if(!vo.default.existsSync(r))return[];let n=vo.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},fA=e=>{let t=gA(e);vo.default.existsSync(t)&&vo.default.writeFileSync(t,"","utf8")}});var lq,mx,gx,fx=l(()=>{"use strict";qS();lq=new Set(Object.values(GS)),mx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gx=e=>{if(!mx(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!lq.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!mx(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var hx,yx=l(()=>{"use strict";hx=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var cq,dq,uq,ha,Sx=l(()=>{"use strict";yx();cq=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,dq=e=>cq.test(e),uq=e=>hx(e),ha=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>ha(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&dq(o)){r[o]=uq(n);continue}r[o]=ha(n)}return r}});var Lt,hA,pq,mq,gq,yA,Ax,bx,Px,fq,cp,Wo,dp,SA,wx=l(()=>{"use strict";Lt=m(require("node:fs")),hA=m(require("node:path"));fx();Sx();pq="local-ws-trace.ndjson",mq=1e4,gq=1440*60*1e3,yA=e=>hA.default.join(e.logsDir,pq),Ax=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},bx=e=>{if(!Lt.default.existsSync(e))return;let t=Lt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-gq,n=t.filter(s=>{let i=Ax(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-mq);Lt.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},Px=(e,t)=>{let r=yA(e);Lt.default.mkdirSync(hA.default.dirname(r),{recursive:!0}),Lt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),bx(r)},fq=e=>e.parsed===null?{_empty:!0}:ha(e.parsed),cp=(e,t,r)=>{let o=gx(r);Px(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:fq(o)})},Wo=(e,t)=>{Px(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:ha({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},dp=(e,t=80)=>{let r=yA(e);if(bx(r),!Lt.default.existsSync(r))return[];let o=Lt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=Ax(s);i!==null&&n.push(i)}return n.reverse()},SA=e=>{let t=yA(e);Lt.default.existsSync(t)&&Lt.default.writeFileSync(t,"","utf8")}});var Er,_x,hq,AA,up,vx=l(()=>{"use strict";Er=m(require("node:fs")),_x=m(require("node:path")),hq=256e3,AA=e=>{Er.default.mkdirSync(_x.default.dirname(e),{recursive:!0}),Er.default.writeFileSync(e,"","utf8")},up=(e,t=hq)=>{if(!Er.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Er.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Er.default.openSync(e,"r");try{Er.default.readSync(a,i,0,s,n)}finally{Er.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var ya=l(()=>{"use strict";px();wx();vx()});var bA,PA,Wx=l(()=>{"use strict";bA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),PA=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${bA(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${bA(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${bA(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var Lx=l(()=>{"use strict";Wx()});var wA,_A=l(()=>{"use strict";wA=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var vA=l(()=>{"use strict";oa()});var WA,LA,Ex=l(()=>{"use strict";vA();WA=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},LA=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var Rx=l(()=>{"use strict";_A();Ex()});var Cx,Sa,EA,Aa=l(()=>{"use strict";_A();Cx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Sa=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=Cx(e),r=Cx(wA(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},EA=`(function () {
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
})();`});var Lo,yq,RA,kx=l(()=>{"use strict";Lo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yq=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},RA=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Lo(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Lo(r.direction):Lo(r.kind),i=`trace-body-${o}`,a=Lo(yq(r.body));return`<tr>
        <td title="${Lo(r.at)}">${Lo(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Lo(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var xx,Tx,CA,Ix=l(()=>{"use strict";xx=m(require("node:path"));V();Ut();Tx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),CA=e=>{let t=oe(e.installDir),o=`AW_HOME="$HOME/${xx.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${Tx(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${Tx(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var Ox=l(()=>{"use strict";Aa();kx();Ix();Aa()});var Sq,Jt,ba=l(()=>{"use strict";Sq=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Jt=Sq});var Mx,Nx,jx,Dx,Hx,$x,zx,Fn=l(()=>{"use strict";Mx="projects",Nx="knowledge",jx="chunks.ndjson",Dx="lessons.ndjson",Hx="error-chunks.ndjson",$x="usage-stats.json",zx="knowledge-location.json"});var pp,Aq,mp,kA=l(()=>{"use strict";pp=m(require("node:path"));Fn();Aq=(e,t)=>{let r=t.trim(),o=pp.default.join(e.installDir,Mx,r,Nx);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:pp.default.join(o,jx),memoryRunsFilePath:pp.default.join(o,Dx)}},mp=Aq});var TA,bq,Fx,Ux=l(()=>{"use strict";TA=m(require("node:fs"));Fn();mo();bq=e=>{let t=Ye(e.projectFolderPath),r=`${t.metaDirPath}/${zx}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};TA.default.mkdirSync(t.metaDirPath,{recursive:!0}),TA.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},Fx=bq});var Un,Gx,Bx,Pq,Vx,qx=l(()=>{"use strict";Un=m(require("node:fs")),Gx=m(require("node:path"));Zr();mo();kA();Ux();Bx=(e,t)=>{Un.default.existsSync(e)&&(Un.default.existsSync(t)&&Un.default.statSync(t).size>0||(Un.default.mkdirSync(Gx.default.dirname(t),{recursive:!0}),Un.default.copyFileSync(e,t)))},Pq=e=>{let t=Ye(e.projectFolderPath),r=mp(e.layout,e.projectId),o=`${t.memoryDirPath}/${cn}`;Bx(t.ragChunksFilePath,r.ragChunksFilePath),Bx(o,r.memoryRunsFilePath),Fx({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},Vx=Pq});var xA,wq,Kx,Jx=l(()=>{"use strict";xA=m(require("node:fs"));mo();wq=e=>{let t=Ye(e);if(!xA.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(xA.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Kx=wq});var Yx,_q,Bn,gp=l(()=>{"use strict";Yx=m(require("node:path"));Zr();mo();qx();Jx();kA();_q=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Kx(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){Vx({layout:e.layout,projectFolderPath:t,projectId:o});let s=mp(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=Ye(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:Yx.default.join(n.memoryDirPath,cn),projectId:null}},Bn=_q});var fp,Wq,hp,IA=l(()=>{"use strict";fp=m(require("node:fs"));Fn();Wq=(e,t=500)=>{if(!fp.default.existsSync(e))return;let r=fp.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);fp.default.writeFileSync(e,`${o.join(`
`)}
`)},hp=Wq});var yp,Lq,Eo,OA=l(()=>{"use strict";yp=m(require("node:path"));Fn();gp();Lq=e=>{let t=Bn(e);if(t===null)return null;let r=yp.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:yp.default.join(r,$x),errorChunksFilePath:yp.default.join(r,Hx)}},Eo=Lq});var Zx,Pa,Qx,Xx,MA,e0,Cq,NA,t0,jA,DA,HA,$A=l(()=>{"use strict";Zx=require("node:crypto"),Pa=m(require("node:fs")),Qx=m(require("node:path"));ba();Fn();OA();Xx=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),MA=e=>{if(!Pa.default.existsSync(e))return Xx();try{let t=JSON.parse(Pa.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return Xx()},e0=(e,t)=>{Pa.default.mkdirSync(Qx.default.dirname(e),{recursive:!0}),Pa.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Cq=e=>{let t=Jt(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,Zx.createHash)("sha256").update(o).digest("hex").slice(0,16)},NA=e=>{let t=Eo(e);return t===null?null:MA(t.usageStatsFilePath)},t0=e=>{if(e.chunkIds.length===0)return;let t=Eo(e);if(t===null)return;let r=MA(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;e0(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},jA=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=Eo(e);if(r===null)return null;let o=Cq(t),n=MA(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return e0(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},DA=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,HA=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var wa,r0,kq,Tq,o0,xq,zA,_a,Gn,FA,Vn,UA,BA=l(()=>{"use strict";wa=m(require("node:fs")),r0=m(require("node:path"));ba();gp();IA();$A();kq="http://127.0.0.1:11434",Tq="nomic-embed-text",o0=(e,t,r)=>Bn({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,xq=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},zA=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},_a=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||kq,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||Tq;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Gn=(e,t,r)=>{let o=o0(e,t,r);if(o===null||!wa.default.existsSync(o))return[];let n=wa.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},FA=async e=>{let t=Jt(e.text),r=zA(t);if(r.length===0)return 0;let o=o0(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;wa.default.mkdirSync(r0.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await _a(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};wa.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return hp(o),n},Vn=async e=>{let t=await _a(e.query);if(t===null)return[];let r=e.minScore??0,s=Gn(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:xq(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return t0({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},UA=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var va,n0,Iq,Oq,GA,VA,qA,s0=l(()=>{"use strict";va=m(require("node:fs")),n0=m(require("node:path"));ba();OA();IA();BA();Iq=e=>{if(!va.default.existsSync(e))return[];let t=va.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},Oq=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},GA=async e=>{let t=Eo(e);if(t===null)return 0;let r=Jt(e.text),o=zA(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;va.default.mkdirSync(n0.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await _a(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};va.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return hp(n,200),s},VA=async e=>{let t=Eo(e);if(t===null)return[];let r=await _a(e.query);if(r===null)return[];let o=e.minScore??.3;return Iq(t.errorChunksFilePath).map(s=>({chunk:s,score:Oq(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},qA=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var KA=l(()=>{"use strict";BA();$A();s0()});var JA,i0=l(()=>{"use strict";JA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var a0=l(()=>{"use strict";i0()});var fe,YA,XA=l(()=>{"use strict";a0();fe=JA,YA=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${fe.gray50};
  --aw-zinc-100: ${fe.gray100};
  --aw-zinc-200: ${fe.gray200};
  --aw-zinc-400: ${fe.gray400};
  --aw-zinc-500: ${fe.gray500};
  --aw-zinc-600: ${fe.gray600};
  --aw-zinc-700: ${fe.gray700};
  --aw-zinc-800: ${fe.gray900};
  --aw-zinc-900: ${fe.gray900};
  --aw-brand-600: ${fe.brand600};
  --aw-brand-700: ${fe.brand700};
  --aw-brand-50: ${fe.brand50};
  --aw-emerald-50: ${fe.success50};
  --aw-emerald-700: ${fe.success700};
  --aw-amber-50: ${fe.warning50};
  --aw-amber-900: ${fe.warning900};
  --aw-red-50: ${fe.error50};
  --aw-red-700: ${fe.error700};
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
.sdlc-node-active .sdlc-spin { margin-top: 0.15rem; position: relative; z-index: 1; }
.sdlc-node-label { line-height: 1.4; padding-top: 0.05rem; }
.sdlc-node-reason { display: block; margin-top: 0.25rem; color: var(--aw-zinc-700); font-size: 0.8125rem; }
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
`.trim()});var Mq,Nq,ZA,l0,QA,c0=l(()=>{"use strict";XA();Aa();Mq=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,Nq=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],ZA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),l0=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${Mq}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,QA=e=>{let t=Nq.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=ZA(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=ZA(e.installBundleVersionLabel?.trim()??"unknown"),s=l0("brand brand-in-sidebar",n),i=l0("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${ZA(e.title)} \xB7 Agent Witch Local</title>
  <style>${YA}</style>
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
  <script>${EA}</script>
</body>
</html>`}});var Sp,Wa,Ap=l(()=>{"use strict";Sp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wa=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Sp(e.syncMessage)}</p>`:"",o=Sp(e.manageHref),n=Sp(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Sp(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var eb,tb,rb,d0=l(()=>{"use strict";eb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,tb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,rb=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var u0=l(()=>{"use strict";c0();Ap();d0()});var qn,ob,p0=l(()=>{"use strict";Aa();qn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ob=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${qn(e.wakeError)}</div>`:"",a=Sa(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${qn(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${qn(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${qn(o)}</p>
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
        <p class="home-card-meta">${qn(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${qn(n)}</p>
      </a>
    </div>`}});var m0=l(()=>{"use strict";p0()});var bp,Pp,wp,g0,nb=l(()=>{"use strict";bp="support-reply",Pp="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",wp=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),g0=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var _p,f0,h0=l(()=>{"use strict";nb();_p=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),f0=()=>`<section class="card">
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
      <p>${_p(Pp)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${_p(wp)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${_p(g0)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${_p(bp)}">Run this sample</a>
      </div>
    </section>`});var C,vp=l(()=>{"use strict";C=e=>e==="passed"||e==="stopped"||e==="failed"});var y0,sb,Ro,ib,La=l(()=>{"use strict";y0="Stopped at the round limit. The best prompt is kept.",sb="Stopped because the score stopped rising. The best prompt is kept.",Ro="Finished. The best prompt is the result.",ib="Wizard ended. Progress from finished steps is kept."});var Ea,ab=l(()=>{"use strict";Ea=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var jq,Dq,Ra,S0,Wp=l(()=>{"use strict";jq=/\n+|;\s+/,Dq=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Ra=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(jq).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,Dq(s)]},[]);return[...t,...o]},[]),S0=e=>{let t=Ra(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ne,Kn=l(()=>{"use strict";ne=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Ca,lb=l(()=>{"use strict";Wp();Kn();Ca=e=>{let t=[...e.priorRounds,e.current],r=ne(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:S0(o)}}});var cb,Hq,$q,Lp,db=l(()=>{"use strict";cb={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},Hq=e=>{try{let t=JSON.parse(e.fragment);return{...cb,objects:[...e.objects,t]}}catch{return{...cb,objects:e.objects}}},$q=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:Hq(r)},Lp=e=>[...e].reduce($q,cb).objects});var zq,ub,Fq,A0,pb=l(()=>{"use strict";db();zq=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},ub=e=>{let t=Lp(e).filter(zq),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},Fq=(e,t)=>({...e,passed:e.score>=t}),A0=(e,t)=>{let r=ub(e);return r===null?null:Fq(r,t)}});var mb,gb,Ep=l(()=>{"use strict";mb="The judge reply needs a score and a reason.",gb="The improver reply was empty."});var b0,P0=l(()=>{"use strict";b0=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var w0,_0=l(()=>{"use strict";w0=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var Bq,v0,W0=l(()=>{"use strict";P0();_0();La();Wp();Bq=e=>{let t=Ra(e);return t.length===0?sb:`${sb} Avoid: ${t.join("; ")}.`},v0=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:y0};if(b0(e.scores)>=3){let t=e.scores.map((r,o)=>({score:r,reasons:e.reasons?.[o]??""}));return{type:"stopped",errorMessage:Bq(w0(t))}}return null}});var Rr,Gq,fb,L0,Rp=l(()=>{"use strict";Rr=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},Gq=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,fb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",Gq(e.tokens),`Delay: ${Rr(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},L0=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var Vq,E0,R0=l(()=>{"use strict";pb();Vq=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,E0=e=>{let r=(Vq.exec(e)?.[1]??e).trim();return r.length===0||ub(r)!==null?null:r}});var C0,Cp,k0=l(()=>{"use strict";Rp();R0();Ep();C0=e=>({type:"call",role:"judge",choice:e.choice,prompt:L0({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),Cp=e=>{let t=E0(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:gb}}:{nextPrompt:t,continuation:C0({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var hb,T0=l(()=>{"use strict";ab();lb();pb();Ep();La();W0();Ep();k0();hb=e=>{let t=A0(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:mb}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=v0({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=Ca({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:Ea({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var ka,yb=l(()=>{"use strict";ka=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var x0=l(()=>{"use strict"});var I0=l(()=>{"use strict"});var qq,O0,M0=l(()=>{"use strict";qq=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},O0=e=>[...e].reduce(qq,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var Kq,N0,j0=l(()=>{"use strict";Kq=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},N0=e=>[...e].reduce(Kq,{out:"",inString:!1,escaped:!1}).out});var Jq,Yq,D0,H0=l(()=>{"use strict";M0();j0();Jq=e=>e.charCodeAt(0)===65279?e.slice(1):e,Yq=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},D0=e=>N0(O0(Yq(Jq(e))))});var Xq,Zq,Qq,$0,eK,Ta,kp=l(()=>{"use strict";db();H0();Xq=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},Zq=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},Qq=e=>[...e].reduce(Zq,{out:"",inString:!1,escaped:!1}).out,$0=e=>{let t=Lp(e);return t.length===0?null:t[t.length-1]},eK=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Ta=e=>{let t=D0(Xq(e)),r=$0(t);if(r!==null)return r;let o=Qq(t),n=$0(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw eK(i)}}});var z0=l(()=>{"use strict";La();kp()});var F0=l(()=>{"use strict"});var U0=l(()=>{"use strict";F0()});var Ab,B0=l(()=>{"use strict";Ab=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var tK,bb,G0=l(()=>{"use strict";Rp();tK=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,bb=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",tK(e.tokens),`Delay: ${Rr(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var rK,oK,nK,Pb,V0=l(()=>{"use strict";rK=/[A-Za-z0-9_./~-]{3,180}/g,oK=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,nK=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||oK.test(t)},Pb=(e,t=12)=>{let r=[];for(let o of e.matchAll(rK)){let n=o[0].replace(/\.+$/,"");if(!(!nK(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var xa,q0=l(()=>{"use strict";xa=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var Tp,wb,K0,_b,vb=l(()=>{"use strict";Tp=e=>Math.floor(e/2),wb=e=>Math.max(Tp(e)+1,e-20),K0=(e,t)=>e>=t?"passes":e>=wb(t)?"close":e>=Tp(t)?"weak":"bad",_b=e=>[{band:"bad",label:`0\u2013${Tp(e)-1} bad`},{band:"weak",label:`${Tp(e)}\u2013${wb(e)-1} weak`},{band:"close",label:`${wb(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var xp,Wb=l(()=>{"use strict";vb();xp=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${K0(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Ia,Lb=l(()=>{"use strict";Ia=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var J0,Y0=l(()=>{"use strict";J0=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var sK,iK,X0,Z0=l(()=>{"use strict";vp();Wb();Lb();Y0();sK=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],iK=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",X0=e=>{let t=e.wizard;if(t===void 0)return[];let r=Ia(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=sK.map((p,g)=>{let S=!s&&!n&&g===r?"active":"done";return{id:`wizard-${g+1}`,label:p,state:S,detail:null}}).filter((p,g)=>s?!0:g<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=J0(t)&&(!n||a)?xp(e):[],d=C(e.status)&&!s?[{id:"end",label:iK(e),state:"done",detail:e.errorMessage}]:[];return[...i,...c,...d]}});var aK,Eb,Q0=l(()=>{"use strict";vp();Wb();Z0();aK=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",Eb=e=>{if(e.wizard!==void 0)return X0(e);let t=xp(e),r=C(e.status)?[{id:"end",label:aK(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var eI=l(()=>{"use strict";Ut()});var tI,Oa,Ma,Yn,Ip,Rb,rI=l(()=>{"use strict";eI();tI="/prompt-optimizer/agent",Oa=`${Ft}${tI}`,Ma=`${Ft}/prompt-optimizer`,Yn="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Ip=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Yn}`,Rb="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Yt=l(()=>{"use strict"});var Cb,oI=l(()=>{"use strict";Cb="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var nI,sI=l(()=>{"use strict";nI=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Na,aI=l(()=>{"use strict";sI();Yt();Na=e=>({schemaVersion:3,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:nI(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{}})});var kb,lI=l(()=>{"use strict";kb=e=>({...e,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null}))})});var Tb,cI=l(()=>{"use strict";Yt();Tb=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var dI,xb,uI=l(()=>{"use strict";dI=["generalize","evaluate","separate","optimize_modules"],xb=(e,t)=>{let r=dI.indexOf(t);if(r===-1)return e;let o=dI.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Op,Ib=l(()=>{"use strict";Wp();Op=e=>{let t=Ra(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Ob,pI=l(()=>{"use strict";Ib();Ob=e=>{let t=Op(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var cK,dK,uK,mI,gI=l(()=>{"use strict";cK=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),dK=/^\{\{[a-zA-Z0-9_-]+\}\}$/,uK=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(cK(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},mI=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>dK.test(n)?n:uK(n,r)).join("")}});var Mb,fI=l(()=>{"use strict";gI();Mb=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:mI(o.prompt,t)}))}))});var pK,jb,hI=l(()=>{"use strict";Yt();Ib();pK=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),jb=e=>{let t=Op(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=pK(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Db,yI=l(()=>{"use strict";yb();Db=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return ka({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var ja,Hb=l(()=>{"use strict";Kn();ja=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ne(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var $b,SI=l(()=>{"use strict";Hb();$b=e=>{let t=ja({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Da,AI=l(()=>{"use strict";Da=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var mK,gK,de,zb=l(()=>{"use strict";Yt();mK=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},gK=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,de=e=>{let t=e.modules.map((s,i)=>({moduleId:s.moduleId,title:s.title,bestScore:s.statistics?.bestScore??null,tokens:mK(e,i),status:s.status})),r=t.length,o=t.filter((s,i)=>gK(e.modules[i])).length,n=r>0&&o===r?"passed":"stopped";return{passedModuleCount:o,totalModules:r,terminalStatusSuggestion:n,rows:t}}});var Fb,bI=l(()=>{"use strict";Yt();zb();Fb=e=>{let t=de(e.wizard),r=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${70})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(o=>`| ${o.title.replaceAll("|","\\|")} | ${o.bestScore??"\u2014"} | ${o.tokens??"\u2014"} | ${o.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&r.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((o,n)=>{let s=o.statistics?.bestRunOutput?.trim();s===void 0||s.length===0||r.push("",`## Module ${n+1}: ${o.title}`,"","```",s,"```")}),`${r.join(`
`)}
`}});var Ub,PI=l(()=>{"use strict";Ub=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var gt,fK,Bb,wI=l(()=>{"use strict";gt=m(Ds());kp();fK=(0,gt.isType)({name:gt.isNonEmptyString,description:gt.isString,sampleValue:gt.isString}),Bb=e=>{let t=Ta(e);if(!(0,gt.isType)({templatedPrompt:gt.isNonEmptyString,variables:(0,gt.isArrayWithEachItem)(fK)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var se,hK,yK,Gb,_I=l(()=>{"use strict";se=m(Ds());Yt();kp();hK=(0,se.isType)({id:se.isNonEmptyString,title:se.isNonEmptyString,prompt:se.isNonEmptyString,order:se.isNumber}),yK=(0,se.isType)({id:se.isNonEmptyString,title:se.isNonEmptyString,summary:se.isString,topology:(0,se.isOneOf)("chain","parallel"),modules:(0,se.isArrayWithEachItem)(hK),recommended:se.isBoolean}),Gb=e=>{let t=Ta(e);if(!(0,se.isType)({options:(0,se.isArrayWithEachItem)(yK)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Xn,vI=l(()=>{"use strict";Xn=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var SK,Ha,Vb=l(()=>{"use strict";SK=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ha=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(SK,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var $a,za,WI=l(()=>{"use strict";Kn();Vb();$a=e=>Ha(e.templatedPrompt,e.variables),za=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ne(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??$a(e.wizard)}});var AK,Fa,LI=l(()=>{"use strict";AK=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Fa=(e,t)=>e.replace(AK,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var bK,Co,Mp=l(()=>{"use strict";bK=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Co=e=>{let t=new Set,r=[];for(let o of e.matchAll(bK)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Ua,EI=l(()=>{"use strict";Mp();Ua=e=>e.variables.length>0||Co(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var qb,Kb=l(()=>{"use strict";Yt();qb=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Ba,RI=l(()=>{"use strict";Kn();Kb();Ba=e=>{let t=e.wizard.evaluateSelectedRound??ne(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:qb(r.judgement)}});var Ga,CI=l(()=>{"use strict";Ga=e=>e.length===1&&e[0].modules.length===1});var Jb,kI=l(()=>{"use strict";Jb=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Va,ko,TI=l(()=>{"use strict";Va=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),ko=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var PK,Np,Yb,xI=l(()=>{"use strict";Mp();PK="wizardParam_",Np=e=>`${PK}${e}`,Yb=e=>{let t=Co(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Np(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var To,II=l(()=>{"use strict";To=["generalize","evaluate","separate","optimize_modules"]});var k=l(()=>{"use strict";vp();La();T0();ab();Rp();yb();x0();I0();z0();U0();B0();G0();V0();lb();q0();Kn();Q0();Lb();vb();rI();Yt();oI();aI();lI();cI();uI();pI();fI();hI();yI();Hb();SI();AI();zb();bI();PI();wI();_I();vI();WI();Vb();LI();Mp();EI();RI();CI();Kb();kI();TI();xI();II()});var Xb,jp,wK,jI,DI=l(()=>{"use strict";Xb=m(require("node:fs")),jp=m(require("node:path")),wK=e=>jp.default.join(jp.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),jI=(e,t)=>{let r=wK(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;Xb.default.mkdirSync(jp.default.dirname(r),{recursive:!0}),Xb.default.appendFileSync(r,o,"utf8")}});var Zn,HI,_K,$I,vK,zI,Et,J,FI,F,Ge=l(()=>{"use strict";Zn=m(require("node:fs")),HI=m(require("node:path"));k();DI();_K=e=>e.wizard===void 0?e:{...e,wizard:kb(e.wizard)},$I=new Set,vK=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),zI=(e,t)=>{Zn.default.mkdirSync(HI.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Zn.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Zn.default.renameSync(r,e)},Et=e=>{if(!Zn.default.existsSync(e))return[];try{let t=JSON.parse(Zn.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(vK).map(_K):[]}catch{return[]}},J=(e,t)=>Et(e).find(r=>r.id===t)??null,FI=(e,t)=>{$I.add(t);let r=Et(e).filter(o=>o.id!==t);zI(e,r)},F=(e,t)=>{if($I.has(t.id))return;let r=Et(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];zI(e,o),jI(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var UI,Dp,Zb,Io,Qb,Rt,Oo,Ce,Xe=l(()=>{"use strict";UI=m(require("node:fs")),Dp=m(require("node:os")),Zb=m(require("node:path"));ut();Io="~",Qb=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Rt=e=>{let t=Dp.default.homedir(),r=Qb(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Oo=e=>{let t=e.trim().length===0?"~":e.trim(),r=Je(t),o=Zb.default.isAbsolute(r)?Qb(r):Qb(Zb.default.resolve(Dp.default.homedir(),r));try{if(!UI.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:Rt(o)}},Ce=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Dp.default.homedir()});var qa=l(()=>{"use strict";lt();ga();Hd()});var WK,BI,GI=l(()=>{"use strict";qa();WK=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,BI=e=>{let t=Pn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(WK)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var LK,EK,VI,eP,RK,CK,ft,qI,KI,Mo=l(()=>{"use strict";qa();GI();LK="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",EK="The writer waited on terminal input and did not return a prompt.",VI=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,eP=e=>{let t=e.trim();if(t.length===0||t.length>=500||!VI.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>VI.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},RK=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},CK=e=>eP(e.stdout)??eP(e.stderr)??(RK(e.replyFile)?eP(e.replyFile):null),ft=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return LK;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?EK:null},qI=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],KI=e=>{let t=e.replyFileText?.trim()??"",r=ft([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=CK({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null)return{ok:!1,errorMessage:o};let n=BI([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Pn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply."}}});var Qn,Ct,Ka,JI,Hp,kK,YI,XI,ZI,tP=l(()=>{"use strict";Qn=m(require("node:fs")),Ct=m(require("node:path")),Ka=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},JI=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Hp=(e,t)=>{let r=Ka(e);return r.length>0?r:Ka(t)},kK=e=>{let t=Hp(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${JI(o)}`,...n.length>0?[`description: ${JI(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},YI=e=>`.cursor/skills/${e}/SKILL.md`,XI=(e,t)=>{let r=Ka(t);if(r.length===0)return!1;let o=Ct.default.resolve(e),n=Ct.default.resolve(o,".cursor","skills"),s=Ct.default.resolve(o,YI(r));return s.startsWith(`${n}${Ct.default.sep}`)?Qn.default.existsSync(s):!1},ZI=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Hp(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Ct.default.resolve(e.workingDirectory);try{if(!Qn.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=kK({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=YI(r.slug),n=Ct.default.resolve(t,".cursor","skills"),s=Ct.default.resolve(t,o);if(!s.startsWith(`${n}${Ct.default.sep}`))return{ok:!1,errorCode:"path"};if(Qn.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Qn.default.mkdirSync(Ct.default.dirname(s),{recursive:!0}),Qn.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var TK,QI,eO,tO=l(()=>{"use strict";k();k();Ge();Xe();Mo();tP();TK=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,QI=e=>{let t=e.get("savedSkill");return t!==null&&TK.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},eO=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=J(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!C(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ne(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||ft(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=ZI({workingDirectory:Ce(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Cr,Ja=l(()=>{"use strict";k();Cr=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=Jb(t);return{...e,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Va(r.variables)},updatedAt:new Date().toISOString()}}});var kr,Ya=l(()=>{"use strict";kr=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var x,xK,$p,be,No,oO,rO,nO,sO,Ne=l(()=>{"use strict";x="manual",xK=["claude-cli","codex","cursor","antigravity"],$p={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},be=e=>e===x?"You":e in $p?$p[e]:e,No=e=>xK.filter(t=>e.includes(t)),oO=e=>{let t=No(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},rO=(e,t)=>t===x?x:e.find(r=>r===t)??null,nO=(e,t,r)=>{let o=No(e),n=rO(o,t),s=rO(o,r);return n===null||s===null?null:{judge:n,improver:s}},sO=(e,t,r)=>{let o=No(e);return t===null||t.trim()===""?r!==x?r:o[0]??null:t===x?null:o.find(n=>n===t)??null}});var rP,iO,aO=l(()=>{"use strict";rP={ok:!1,errorMessage:"Stopped.",stopped:!0},iO=(e,t,r)=>{if(t===void 0)return;let o=()=>{e.kill("SIGTERM"),r(rP)};if(t.aborted){o();return}t.addEventListener("abort",o,{once:!0})}});var lO,Xa,cO,oP,IK,OK,MK,Ze,Za=l(()=>{"use strict";lO=require("node:child_process"),Xa=m(require("node:fs")),cO=m(require("node:os")),oP=m(require("node:path"));qa();aO();Mo();IK=["claude-cli","codex","cursor","antigravity"],OK=18e4,MK=e=>IK.includes(e),Ze=e=>new Promise(t=>{if(e.signal?.aborted){t(rP);return}if(!MK(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,o=_t(r,e.prompt,le({}));if(o===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!Xa.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=oP.default.join(Xa.default.mkdtempSync(oP.default.join(cO.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=qI({writerAgent:r,baseArgs:o.args,replyPath:n}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,lO.spawn)(o.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=g=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(g))};iO(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??OK),d.stdout.on("data",g=>{i.push(Buffer.from(g))}),d.stderr.on("data",g=>{a.push(Buffer.from(g))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let g=Xa.default.existsSync(n)?Xa.default.readFileSync(n,"utf8"):null;p(KI({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:g}))})})});var dO,NK,Qa,zp,Fp=l(()=>{"use strict";k();Ne();dO=e=>e===x?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},NK=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Qa=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=hb({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:dO(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:xa(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=NK(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i}},zp=(e,t,r=null)=>{let o=Cp({raw:t,judge:dO(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Up,nP=l(()=>{"use strict";Up=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var mO,Bp,Gp,uO,pO,sP,jK,gO,iP,DK,fO,HK,$K,hO,yO=l(()=>{"use strict";mO=require("node:child_process"),Bp=m(require("node:fs")),Gp=m(require("node:path"));k();uO=4e3,pO=12e3,sP=(e,t)=>{let r=(0,mO.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},jK=e=>sP(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",gO=e=>{let t=sP(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},iP=(e,t)=>{let r=Gp.default.resolve(e,t),o=Gp.default.relative(e,r);if(o.startsWith("..")||Gp.default.isAbsolute(o)||!Bp.default.existsSync(r)||!Bp.default.statSync(r).isFile())return null;let n=Bp.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>uO?`${n.slice(0,uO)}
\u2026truncated`:n},DK=e=>e.length>pO?`${e.slice(0,pO)}
\u2026truncated`:e,fO=e=>{let t=Pb(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,iP(e.workingDirectory,n)])),o=jK(e.workingDirectory);return{git:o,status:o?gO(e.workingDirectory):{},files:r,paths:t}},HK=(e,t)=>{let r=sP(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=iP(e,t);return o===null?`${t} is missing.`:o},$K=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",hO=e=>{let t=e.before.git?gO(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=iP(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>HK(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:$K(e.before.git,e.before.paths.length>0),evidence:DK(i.join(`

`))}}});var cP,U,dP,Pe,SO,zK,FK,AO,es,bO,ts,UK,BK,el,aP,lP,GK,PO,VK,qK,KK,wO,JK,_O,vO,YK,XK,WO,LO=l(()=>{"use strict";cP=require("node:child_process"),U=m(require("node:fs")),dP=m(require("node:os")),Pe=m(require("node:path")),SO=8e6,zK=16e6,FK=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],AO=(e,t)=>{let r=(0,cP.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},es=(e,t)=>(0,cP.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,bO=e=>{let t=AO(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},ts=(e,t)=>{let r=Pe.default.resolve(e,t),o=Pe.default.relative(e,r);return o.startsWith("..")||Pe.default.isAbsolute(o)?null:r},UK=(e,t)=>{let r=ts(e,t);if(r===null||!U.default.existsSync(r))return null;let o=U.default.statSync(r);return!o.isFile()||o.size>SO?null:U.default.readFileSync(r)},BK=(e,t,r)=>{let o=ts(e,t);o!==null&&(U.default.mkdirSync(Pe.default.dirname(o),{recursive:!0}),U.default.writeFileSync(o,r))},el=(e,t)=>{let r=ts(e,t);r===null||!U.default.existsSync(r)||U.default.rmSync(r,{recursive:!0,force:!0})},aP=(e,t)=>es(e,["cat-file","-e",`HEAD:${t}`]),lP=e=>{let t=AO(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},GK=e=>Pe.default.resolve(e)!==Pe.default.resolve(dP.default.homedir()),PO=e=>{if(!U.default.existsSync(e))return 0;let t=U.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?U.default.readdirSync(e).reduce((r,o)=>r+PO(Pe.default.join(e,o)),0):0},VK=(e,t,r)=>{let o=ts(e,r);if(o===null||!U.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(PO(o)>zK)return{relativePath:r,existed:!0,copyDir:null};let n=Pe.default.join(t,"cache",r);return U.default.mkdirSync(Pe.default.dirname(n),{recursive:!0}),U.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},qK=400,KK=32e6,wO=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!U.default.existsSync(s)))for(let i of U.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Pe.default.join(s,i),c=U.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>SO)){if(t.length>=qK||r+c.size>KK){o=!1;return}r+=c.size,t.push(Pe.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},JK=(e,t,r)=>{let o=ts(e,r);if(o===null||!U.default.existsSync(o))return null;let n=UK(e,r);if(n===null)return"skip";let s=Pe.default.join(t,"files",r);return U.default.mkdirSync(Pe.default.dirname(s),{recursive:!0}),U.default.writeFileSync(s,n),s},_O=e=>{let t=U.default.mkdtempSync(Pe.default.join(dP.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?bO(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:wO(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,JK(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?lP(e.workingDirectory):null,isolateCaches:GK(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:FK.map(i=>VK(e.workingDirectory,t,i))}},vO=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){el(e.workingDirectory,t);return}BK(e.workingDirectory,t,U.default.readFileSync(r))}},YK=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?vO(e,t):aP(e.workingDirectory,t)?es(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):el(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&aP(e.workingDirectory,t)&&es(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!aP(e.workingDirectory,t)&&es(e.workingDirectory,["reset","-q","HEAD","--",t])},XK=(e,t)=>{let r=ts(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){el(e.workingDirectory,t.relativePath),U.default.mkdirSync(Pe.default.dirname(r),{recursive:!0}),U.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){el(e.workingDirectory,t.relativePath);return}if(U.default.existsSync(r))for(let o of U.default.readdirSync(r)){let n=Pe.default.join(r,o);U.default.statSync(n).mtimeMs>=e.startedMs-1e3&&U.default.rmSync(n,{recursive:!0,force:!0})}}}},WO=e=>{try{if(e.git){if(lP(e.workingDirectory)!==e.head&&(!(e.head===null?es(e.workingDirectory,["update-ref","-d","HEAD"]):es(e.workingDirectory,["reset","--hard",e.head]))||lP(e.workingDirectory)!==e.head))throw new Error("head");let r=bO(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))YK(e,o)}else{if(e.complete)for(let t of wO(e.workingDirectory).paths)e.files[t]===void 0&&el(e.workingDirectory,t);for(let t of Object.keys(e.files))vO(e,t)}for(let t of e.caches)XK(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{U.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Vp,qp,ZK,QK,e8,t8,r8,EO,o8,RO,CO=l(()=>{"use strict";k();Fp();nP();yO();LO();Ne();Xe();Za();Vp=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),qp=e=>({...e,status:"stopped",errorMessage:Ro,judgePhase:void 0,updatedAt:new Date().toISOString()}),ZK=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),QK=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==x?t:e.improverModel!==x?e.improverModel:null}return e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null},e8=async e=>{let t=Ce(e.cycle),r=fO({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=_O({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Db({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Da(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):ka({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await Ze({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?hO({workingDirectory:t,before:r,writerReply:i.text}):null,c=WO(o);return i.ok?!c.ok||a===null?{ok:!1,cycle:Vp(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-n,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:qp(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Vp(e.cycle,i.errorMessage)})},t8=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:e8({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),r8=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),EO=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Ze({writerAgent:e.reviewer,workingDirectory:Ce(e.cycle),prompt:bb({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:qp(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},o8=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===x)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Ze({writerAgent:t.judgeModel,workingDirectory:Ce(t),prompt:Ab({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Qa(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?qp(o):(e.onWriterFailure?.(t.judgeModel),Vp(o,n.errorMessage))},RO=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return o8(e);let o=QK(t),n=await t8({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?ZK(t,n.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===x){let p=await EO({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...r8(s,p.text),judgePhase:void 0}}let i=await Ze({writerAgent:t.judgeModel,workingDirectory:Ce(t),prompt:fb({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?qp(s):(e.onWriterFailure?.(t.judgeModel),Vp(s,i.errorMessage));let a=await EO({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Qa(s,i.text,c);return Up(d,a.text)}});var Kp,uP=l(()=>{"use strict";k();Kp=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Ca({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:xa(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var Jp,n8,s8,pP,kO=l(()=>{"use strict";k();Fp();CO();uP();Ne();Xe();Za();Jp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),n8=e=>({...e,status:"stopped",errorMessage:Ro,updatedAt:new Date().toISOString()}),s8=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?n8(e):(n?.(r),Jp(e,t.errorMessage)),pP=async(e,t,r,o)=>{let n=e.revisions.find(c=>c.roundNumber===e.currentRound);if(n===void 0)return Jp(e,"This round has no prompt.");if(e.status==="judging")return RO({cycle:e,revision:n,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Jp(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===x)return e;let s=Kp(e);if(s===null)return Jp(e,"The improver needs the score and the reason.");let i=await Ze({writerAgent:e.improverModel,workingDirectory:Ce(e),prompt:Ea({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=s8(e,i,e.improverModel,r,t);return a!==null?a:zp(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var tl,mP=l(()=>{"use strict";tl=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var Zp,Yp,TO,i8,a8,Xp,xO,IO,l8,c8,jo,OO,MO,rl=l(()=>{"use strict";k();Ja();Ya();Ne();Xe();Za();kO();mP();Zp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),Yp=(e,t,r)=>e.wizard===void 0||t===null?Zp(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},TO=e=>{let t=e.wizard;return t===void 0||tl(e).length===0?e:{...e,wizard:Xn({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},i8=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",a8=e=>{let t=e.wizard;if(t===void 0)return e;let r=ja({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Xn({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Xp=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),xO=e=>e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null,IO=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},l8=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=xO(e);if(n===null)return Zp(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??$a(o),i=Ob({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:IO(e,"generalize")}),a=await Ze({writerAgent:n,prompt:i,workingDirectory:Ce(e),signal:t});if(!a.ok)return r?.(n),Yp(e,"generalize",a.errorMessage);try{let c=Bb(a.text),d=Xn({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Va(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return Ua(d)?jo({...p,wizard:{...d,gate:null}}):Xp(p,"generalize")}catch(c){return Yp(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},c8=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=xO(e);if(n===null)return Zp(e,"Choose a writer to suggest splits.");let s=za({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=jb({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:IO(e,"separate")}),a=await Ze({writerAgent:n,prompt:i,workingDirectory:Ce(e),signal:t});if(!a.ok)return r?.(n),Yp(e,"separate",a.errorMessage);try{let c=Gb(a.text),d=Mb(c,o.variables),p=Xn({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:p};return Ga(d)?Cr(g,d[0]):Xp(g,"separate")}catch(c){return Yp(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},jo=e=>{let t=e.wizard;if(t===void 0)return e;let r=$a(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:70,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},OO=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Zp(e,"This module is missing.");let n=ko(r),s=Fa(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==x?e.runnerModel:e.judgeModel!==x?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:70,maxRounds:1,errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},MO=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return pP(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return l8(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return c8(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await pP(e,t,r,o);if(C(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&tl(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=ne(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&Ba({revisions:a.revisions,wizard:a.wizard})){let p=TO(Xp(a,i));return kr(p)}let c=Xp(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=$b({wizard:{...c.wizard,modules:c.wizard.modules.map((g,S)=>S===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:i8(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?TO(d):a8(d)}return s}return n.phase==="complete",e}});var Qp,rs,gP=l(()=>{"use strict";mP();Qp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rs=e=>{let t=tl(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Qp(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let S=g.judgement?.score,h=S==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${S}`,y=g.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${Qp(y)}</span>`;if(e.interactive){let A=e.selectedRound===g.roundNumber?" checked":"";return`<li><label><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${A}> ${Qp(h)}</label>${u}</li>`}return`<li>${Qp(h)}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var fP,NO,em,jO,tm=l(()=>{"use strict";fP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),NO=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${fP(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${fP(t.prompt)}</pre></li>`).join("")}</ol>`,em=e=>NO([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),jO=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${fP(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${NO(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var ue,d8,u8,p8,m8,g8,f8,os,rm=l(()=>{"use strict";k();gP();tm();ue=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),d8=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},u8=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.variables.length===0?'<p class="muted">No variables yet.</p>':`<ul class="sdlc-wizard-vars">${t.variables.map(a=>`<li><strong>{{${ue(a.name)}}}</strong> \u2014 ${ue(a.description)} (sample: ${ue(a.sampleValue)})</li>`).join("")}</ul>`,o=t.templatedPrompt.trim(),n=o.length===0?'<p class="muted">No templated prompt yet.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${ue(o)}</pre>`,s=Ha(t.templatedPrompt,t.variables).trim(),i=s.length===0||s===o?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${ue(s)}</pre>`;return`${r}${n}${i}`},p8=(e,t)=>`<ul class="sdlc-wizard-revisions">${e.map(o=>{let n=o.score===null?`Round ${o.roundNumber} \u2014 not scored`:`Round ${o.roundNumber} \u2014 ${o.score}`,s=t===o.roundNumber?" (selected)":"",i=o.reasons?.trim()??"",a=i.length===0?"":`<br><span class="muted">${ue(i)}</span>`;return`<li>${ue(n)}${s}${a}</li>`}).join("")}</ul>`,m8=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return rs({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=d8(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${p8(o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=za({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${ue(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${ue(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},g8=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${ue(n.title)}</strong> <span class="muted">(${ue(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${ue(o.title)}</strong>${n}${ue(s)}<br><span class="muted">${ue(o.summary)} (${ue(o.topology)})</span>${em(o)}</li>`}).join("")}</ul>`},f8=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${ue(i)}</span> <strong>${ue(n.title)}</strong>${ue(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${ue(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?rs({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},os=(e,t)=>{switch(t){case"wizard-1":return u8(e);case"wizard-2":return m8(e);case"wizard-3":return g8(e);case"wizard-4":return f8(e);default:return""}}});var h8,y8,DO,HO,$O=l(()=>{"use strict";k();Mo();rm();h8=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},y8=e=>{let t=e.goal.trim();return t.length===0?null:t},DO=(e,t,r,o,n)=>{let s=ft(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},HO=(e,t)=>{let r=y8(e);if(t.id.startsWith("wizard-")){let s=os(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=ne(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null})));return s===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:DO(t.label,s.promptText,s.score,s.reasons,r)}let o=t.id==="rewrite"?e.currentRound:h8(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:DO(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var ns,zO,FO=l(()=>{"use strict";ns=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zO=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?'<p class="muted">Not scored yet.</p>':`<p class="muted">${ns(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${ns(e.feedback.trim())}</p>`,n=e.promptNote!==null?`<div class="alert-error">${ns(e.promptNote)}</div>`:e.promptText===null?"":`<h2>Saved prompt</h2><pre class="mono">${ns(e.promptText)}</pre>`,s=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${ns(e.goal)}</dd></div></dl>`;return`<h2>${ns(e.title)}</h2>${s}${t}${r}${o}${n}`}});var hP,UO,BO,ss,GO,ol=l(()=>{"use strict";k();Ge();hP=new Map,UO=e=>{let t=new AbortController;return hP.set(e,t),t.signal},BO=e=>{hP.delete(e)},ss=e=>{hP.get(e)?.abort()},GO=(e,t)=>{let r=J(e,t);return r===null||r.wizard!==void 0?!1:(C(r.status)||(F(e,{...r,status:"stopped",errorMessage:Ro,updatedAt:new Date().toISOString()}),ss(t)),!0)}});var S8,A8,yP,b8,P8,w8,VO,qO,SP=l(()=>{"use strict";k();rl();Ja();Ya();ol();S8=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),A8=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||C(e.status))return null;let r=Ia(t);return r<0||r>3?null:`wizard-${r+1}`},yP=(e,t)=>S8.has(t)?A8(e)===t:!1,b8=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),P8=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ne(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},w8=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null,phase:"complete"},n=de(o);return{...e,status:n.terminalStatusSuggestion,errorMessage:null,wizard:o,updatedAt:new Date().toISOString()}},VO=(e,t)=>{if(!yP(e,t))return e;ss(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return jo({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return kr(P8(r));if(t==="wizard-3"){let n=o.splitOptions[0]??b8(o.templatedPrompt);return Cr(r,n)}return t==="wizard-4"?w8(r):e},qO="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var Do,is,nl=l(()=>{"use strict";Do=e=>e.toLocaleString("en-US"),is=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Ho,_8,KO,JO,YO,XO,AP=l(()=>{"use strict";k();$O();FO();SP();nl();Ho=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_8=(e,t)=>{let r=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',o=/^score-(\d+)$/.exec(e.id),n=e.state==="done"&&o!==null?is(t,Number(o[1])):0,s=n>0?`<span class="sdlc-node-reason">${Do(n)} tokens so far</span>`:"",i=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Ho(e.detail)}</span>`:"",a=zO(HO(t,e)),c=t.wizard!==void 0&&t.wizard.phase==="complete"&&C(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Ho(e.id)}"`:"",d=yP(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Ho(qO)}"><input type="hidden" name="cycleId" value="${Ho(t.id)}"><input type="hidden" name="wizardStepId" value="${Ho(e.id)}"><button class="btn btn-secondary sdlc-node-skip-btn" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"";return`<li class="sdlc-node sdlc-node-${e.state}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${c} data-sdlc-node>${r}<span class="sdlc-node-label">${Ho(e.label)}${i}${s}</span></button>${d}</div><template>${a}</template></li>`},KO=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>_8(r,t)).join("")}</ol>`,JO=e=>`<div class="sdlc-score" aria-label="What the score means">${_b(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Ho(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,YO='<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog"><button class="btn btn-secondary" type="submit">Close</button></form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>',XO=`<script>
(() => {
  const dialog = document.getElementById("sdlc-node-dialog");
  const body = dialog?.querySelector("[data-sdlc-dialog-body]");
  if (!dialog || !body) return;
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const opener = target.closest("[data-sdlc-node]");
    if (!opener) return;
    const template = opener.parentElement?.querySelector("template");
    if (!template) return;
    body.replaceChildren(template.content.cloneNode(true));
    dialog.showModal();
  });
})();
</script>`});var Tr,ZO,v8,QO=l(()=>{"use strict";k();Xe();Mo();tP();Tr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ZO=e=>{if(!C(e.status))return"";let t=ne(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=ft(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Tr(t.reasons.trim())}</p>`,i=n===null?v8({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Ce(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${Tr(n)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${o}${s}${i}</section>`},v8=e=>{let t=e.sourceSkill?.fileName??Ka(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Hp(t,r),s=n.length>0&&XI(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Tr(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Tr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Tr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Tr(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Tr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Tr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var om,bP=l(()=>{"use strict";k();k();Ne();Mo();om=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!C(e.status)){let t=e.judgeModel;return{title:`${be(t)} is suggesting module splits.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!C(e.status)){let t=e.judgeModel;return{title:`${be(t)} is generalizing your prompt.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===x?{title:`Score the prompt text for round ${e.currentRound+1}.`,detail:"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."}:e.judgePhase==="scoring"?{title:`${be(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"No folder run in step 2. This panel keeps updating, so the page is not stuck."}:{title:`${be(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"Wizard evaluate revises prompt wording before the runner executes in step 4."};if(e.status==="judging"&&e.judgeModel===x){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==x?{title:`${be(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"You score the changes after this run."}:{title:`Score the changes from round ${e.currentRound+1}.`,detail:t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt."}}if(e.status==="judging"&&e.judgePhase==="reviewing")return{title:`${be(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,detail:"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck."};if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length;return{title:`${be(r)} is scoring module ${o} of ${n}.`,detail:`Step 4 runs one trial per module (pass \u2265 ${70}). This panel keeps updating.`}}return{title:`${be(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,detail:"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck."}}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length;return{title:`${be(r)} is running module ${o} of ${n}.`,detail:`The runner executes the module prompt; the judge scores output (pass \u2265 ${70}). This panel keeps updating.`}}return{title:`${be(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck."}}if(e.status==="improving"&&e.improverModel===x){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return{title:"Rewrite the prompt.",detail:t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`}}if(e.status==="improving")return{title:`${be(e.improverModel)} is rewriting the prompt.`,detail:"That writer is working on this Mac. This panel keeps updating, so the page is not stuck."};if(e.status==="passed")return{title:"This prompt passed.",detail:""};if(e.status==="stopped"){let t=e.revisions.some(n=>ft(n.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let n=de(e.wizard),s=n.totalModules>0&&(e.wizard.phase==="complete"||n.passedModuleCount>0||C(e.status));return{title:s&&n.totalModules>0?`Wizard finished \u2014 ${n.passedModuleCount}/${n.totalModules} modules passed`:"Wizard stopped before all steps finished",detail:r.length>0?r:s?"":"Progress from finished steps is kept."}}return{title:(e.errorMessage??"").startsWith("Finished")?"Finished.":"Stopped.",detail:r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept."}}return C(e.status)?{title:"This run stopped because a reply could not be used.",detail:""}:{title:"Working on this Mac.",detail:"This panel keeps updating."}}});var kt,sl=l(()=>{"use strict";Ne();kt=e=>{if(e.status==="improving"&&e.improverModel===x)return!0;if(e.status!=="judging"||e.judgeModel!==x)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===x}});var eM,tM=l(()=>{"use strict";eM=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var xr,W8,rM,oM=l(()=>{"use strict";k();xr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),W8=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${xr(r)}</p>`},rM=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${xr(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${xr(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${xr(a)}.</p>`}<pre class="mono">${xr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Rr(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${xr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${xr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${W8(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${xr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var il,L8,nM,sM=l(()=>{"use strict";k();Mo();il=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),L8=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=ft(t.promptText),n=t.judgement?.reasons?`<p class="muted">${il(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${il(i)}.</p>`}<pre class="mono">${il(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Rr(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${il(d)}</pre>`:`<div class="alert-error">${il(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},nM=e=>e.revisions.map(t=>L8(e,t)).join("")});var iM,aM=l(()=>{"use strict";k();iM=e=>{if(C(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Tt,E8,PP,R8,C8,k8,T8,lM,cM,wP=l(()=>{"use strict";aM();Tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),E8="Stop this run? Writers will stop and the best prompt is kept.",PP="End the wizard? Writers will stop and progress from finished steps is kept.",R8="Skip this module and pause at the step gate?",C8=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Tt(E8)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Tt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,k8=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Tt(PP)}"><input type="hidden" name="cycleId" value="${Tt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,T8=e=>{let t=Tt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Tt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Tt(R8)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Tt(PP)}">End wizard</button>
    </form>
  </div>`},lM=e=>{let t=iM(e);return t==="none"?"":t==="classic"?C8(e.id):t==="wizard_end_only"?k8(e.id):T8(e)},cM=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Tt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Tt(PP)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var dM,uM=l(()=>{"use strict";k();nl();dM=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=de(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${Do(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Do(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${70}`}return""}});var pM,x8,mM,gM=l(()=>{"use strict";k();uM();rm();pM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),x8=(e,t,r)=>{let o=os(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=dM(e,t),i=`${pM(n)} <span class="muted sdlc-wizard-outcome-step-hint">${pM(s)}</span>`,a=t==="wizard-4"&&r.phase==="complete"?" open":"",c=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step" id="${c}"${a}><summary aria-controls="${c}-body">${i}</summary><div class="sdlc-wizard-outcome-step-body" id="${c}-body">${o}</div></details>`},mM=e=>{let t=e.wizard;if(t===void 0||!C(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>x8(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var fM,hM,yM=l(()=>{"use strict";fM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hM=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${fM(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${fM(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var _P,SM,vP=l(()=>{"use strict";k();_P=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,SM=e=>{if(_P(e))return"Passed";let t=e.statistics?.bestScore;return t!=null&&t<70?`Below pass (${t})`:e.status}});var AM,bM=l(()=>{"use strict";k();AM=e=>{if(e.terminalStatusSuggestion==="passed")return"";let t=e.rows.filter(r=>r.bestScore!==null&&r.bestScore<70).length;return t>0&&t===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${t} module${t===1?"":"s"} scored below ${70}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${70}.`}});var nm,PM,wM=l(()=>{"use strict";k();vP();vP();bM();nm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),PM=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=de(t),o=r.terminalStatusSuggestion==="passed"?"":AM(r),n=60,s=r.rows.map((a,c)=>{let d=t.modules[c],p=a.bestScore===null?"\u2014":`${a.bestScore} / \u2265${70}`,S=a.bestScore!==null&&a.bestScore>=n&&a.bestScore<70?' class="sdlc-score-near-pass"':"",h=d===void 0?a.status:SM(d),y=d!==void 0&&_P(d)?'<span aria-label="Passed">\u2713</span>':nm(h);return`<tr${S}><td>${nm(a.title)}</td><td>${nm(p)}</td><td>${a.tokens??"\u2014"}</td><td>${y}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${o.length===0?"":`<p class="muted">${nm(o)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${s}</tbody></table></div>`}});var I8,_M,vM=l(()=>{"use strict";k();k();yM();wM();I8=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_M=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!C(e.status)||t.modules.length===0)return"";let r=PM(e),o=hM(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=de(t),i=s.passedModuleCount<s.totalModules?" open":"";return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${I8(n)}</pre></details>`}${r}${o}</section>`}});var Xt,al=l(()=>{"use strict";Xt=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Ir,sm,WP=l(()=>{"use strict";k();AP();QO();bP();sl();tM();uP();oM();sM();wP();gM();vM();nl();Xe();al();Ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sm=e=>{let t=!C(e.status)&&e.status!=="wizard_paused"&&!kt(e),r=om(e),o=KO(Eb(eM(e)),e),n=C(e.status)?"":lM(e),s=mM(e),i=_M(e),a=ZO(e),c=e.errorMessage===null?"":`<div class="alert-error">${Ir(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?de(e.wizard):null,S=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,h=!t&&e.wizard!==void 0&&C(e.status)&&(e.wizard.phase==="complete"||de(e.wizard).passedModuleCount>0),y=h?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ir(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",A=r.detail.length===0&&u.length===0||r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Ir(r.detail)}${p}</p>`,b=e.revisions.find(zr=>zr.roundNumber===e.currentRound),f=e.status==="improving"?Kp(e):null,w=is(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),v=kt(e)?rM({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:f?.promptText??b?.promptText??"",score:f?.score??b?.judgement?.score??null,reasons:f?.reasons??b?.judgement?.reasons??null,avoid:f?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:b?.run??null,minJudgeScore:_?1:0}):"",L=e.wizard!==void 0&&e.wizard.phase==="complete"&&C(e.status),R=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",T=e.wizard!==void 0&&!L?70:e.passScore,I=R?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${JO(T)}</div>`:"",D=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':C(e.status)?L&&g!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",re=t?d:h?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',B=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Ir(Rt(Ce(e)))}</li>`:"",w>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Do(w)} so far</li>`:""].filter(zr=>zr.length>0),q=B.length===0?"":`<ul class="sdlc-run-meta">${B.join("")}</ul>`,$r=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,$=L?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,_e=L?"":I.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${$}</div>`:`<div class="sdlc-run-grid">${$}${I}</div>`,yt=nM(e),ic=e.wizard!==void 0&&C(e.status)&&e.revisions.every(zr=>zr.roundNumber===0&&(zr.judgement===void 0||zr.judgement===null)),wF=yt.length===0||ic?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${yt}</div></section>`,_F=`<p class="sdlc-run-goal" title="${Ir(e.goal.trim())}">${Ir(Xt(e.goal))}</p>`,vF=L?`${c}${i}${s}${v}${a}`:`${c}${_e}${v}${s}${a}`,WF='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',LF=L?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Ir(e.updatedAt)}" aria-busy="${t?"true":"false"}">${WF}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${D}</div>${_F}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${re}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Ir(r.title)}</h2>${A}${u}${LF}</div></div>${q}${$r}</header>${vF}</section>${wF}`}});var WM,LM=l(()=>{"use strict";k();Ya();WM=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Ba({revisions:e.revisions,wizard:t})?e:kr(e)}});var EM,RM=l(()=>{"use strict";k();rl();EM=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Ua(t)?e:jo({...e,wizard:{...t,gate:null}})}});var CM,kM=l(()=>{"use strict";k();Ja();CM=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Ga(t.splitOptions))return e;let r=t.splitOptions[0];return Cr(e,r)}});var O8,$o,im=l(()=>{"use strict";LM();RM();kM();Ge();O8=e=>{let t=EM(e),r=WM(t);return CM(r)},$o=(e,t)=>{let r=O8(t);return r!==t?(F(e,r),r):t}});var TM,zo,am=l(()=>{"use strict";k();TM=e=>To.indexOf(e),zo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||C(e.status)?To.length:t.gate!==null?TM(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?TM(t.phase):null}});var xM,IM=l(()=>{"use strict";xM=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Fo,OM,MM=l(()=>{"use strict";k();IM();Fo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OM=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Da(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Fo(xM(o))}</pre></div>`:"",s=Co(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=ko(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=Np(c),g=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Fo(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Fo(p)}">${Fo(S)}</label>
        ${h}
        <input class="input" type="text" id="${Fo(p)}" name="${Fo(p)}" value="${Fo(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var xt,NM,jM=l(()=>{"use strict";k();MM();gP();tm();wP();xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),NM=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate,n=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=o==="generalize"?`<ul class="sdlc-wizard-vars">${r.variables.map(v=>`<li><strong>{{${xt(v.name)}}}</strong> \u2014 ${xt(v.description)} (sample: ${xt(v.sampleValue)})</li>`).join("")}</ul><pre class="sdlc-pre">${xt(r.templatedPrompt)}</pre>`:"",i=o==="evaluate"?rs({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",c=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(v=>{let L=v.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',R=v.recommended?' <span class="sdlc-badge">Recommended</span>':"",T=r.selectedSplitOptionId===v.id||r.selectedSplitOptionId===null&&v.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${xt(v.id)}" required${T}> <strong>${xt(v.title)}</strong>${L}${R}<br><span class="muted">${xt(v.summary)}</span></label>${em(v)}</li>`}).join("")}</ul>`:"",d=r.modules[r.currentModuleIndex],g=o==="optimize_modules"&&d?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",S=d?.title??"Module",h=d?.prompt??"",y=d?.status==="pending",u=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${xt(S)}</p>${y?OM({cycle:e,modulePrompt:h}):""}<p class="muted">Test run prompt preview: ${xt(Fa(h,ko(r)))}</p>${d?.statistics===null||d?.statistics===void 0?"":`<p class="muted">Module stats: best ${d.statistics.bestScore??"\u2014"} / \u2265${70} (round ${d.statistics.bestRound??"\u2014"}).</p>`}${rs({cycle:e,interactive:!1,caption:y?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${S}\u201D (runner + judge).`})}`:"",A=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":y?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",b=Ub(r),f=b===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${b}</p>`,w=t?.active===!0?" sdlc-wizard-gate-active":"",_=t?.active===!0?' id="prompt-optimizer-wizard-active-step"':"";return`<section class="card sdlc-wizard-gate${w}"${_}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${n}</h2>
    <p class="sdlc-wizard-gate-lede">${A}</p>
    ${f}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${xt(e.id)}">
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
    ${cM(e)}
  </section>`}});var M8,DM,HM=l(()=>{"use strict";k();M8=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DM=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||C(e.status))return"";if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>Suggesting module splits</h2>
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let r=t.currentModuleIndex,n=t.modules[r]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    <h2>Module ${r+1} of ${t.modules.length}: ${M8(n)}</h2>
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
  </section>`:""}});var N8,j8,D8,$M,zM=l(()=>{"use strict";k();am();jM();HM();rm();N8={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},j8=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),D8=(e,t,r)=>`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${j8(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${os(e,t)}</div>
</details>`,$M=e=>{let t=e.wizard;if(t===void 0)return"";let r=zo(e);if(r===null)return"";let o=To.slice(0,r).map((i,a)=>D8(e,`wizard-${a+1}`,N8[i])),n=t.gate!==null?NM(e,{active:!0}):DM(e),s=r>=To.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var lm,LP=l(()=>{"use strict";zM();tm();k();lm=e=>{if(e===null||e.wizard!==void 0&&C(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=$M(e),r=jO(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var ll,cm,FM,EP,UM,BM,GM,VM,RP=l(()=>{"use strict";ll=m(require("node:fs")),cm=m(require("node:path")),FM=e=>cm.default.join(cm.default.dirname(e),"prompt-optimizer-writer-ready.json"),EP=e=>{let t=FM(e);if(!ll.default.existsSync(t))return{};try{let r=JSON.parse(ll.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},UM=(e,t)=>{ll.default.mkdirSync(cm.default.dirname(e),{recursive:!0}),ll.default.writeFileSync(FM(e),`${JSON.stringify(t,null,2)}
`)},BM=(e,t)=>EP(e)[t]?.message??null,GM=(e,t,r)=>{UM(e,{...EP(e),[t]:{message:r}})},VM=(e,t)=>{let r=EP(e);r[t]!==void 0&&UM(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var CP,dm,um,qM,ke,Uo=l(()=>{"use strict";k();qa();rl();sl();ol();RP();im();Ge();CP=new Set,dm={atMs:0,ids:[]},um=async()=>{if(Date.now()-dm.atMs<3e4)return dm.ids;let e=await mt({commands:le({})});return dm.atMs=Date.now(),dm.ids=e.installedWriterIds,e.installedWriterIds},qM=async(e,t,r)=>{let o=J(e,t);if(o===null||r.aborted)return;let n=$o(e,o);if(C(n.status)||n.status==="wizard_paused"||kt(n))return;let s=await MO(n,a=>{VM(e,a)},r,a=>{J(e,t)?.status==="stopped"||r.aborted||F(e,a)});J(e,t)?.status==="stopped"||r.aborted||(F(e,s),C(s.status)||await qM(e,t,r))},ke=(e,t)=>{if(CP.has(t))return;let r=J(e,t);if(r===null)return;let o=$o(e,r);if(C(o.status)||o.status==="wizard_paused"||kt(o))return;CP.add(t);let n=UO(t);qM(e,t,n).finally(()=>{CP.delete(t),BO(t)})}});var Or,cl=l(()=>{"use strict";WP();im();LP();Uo();Or=(e,t)=>{let r=$o(e,t);return ke(e,r.id),`${sm(r)}${lm(r)}`}});var KM,JM,YM=l(()=>{"use strict";KM=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,JM=e=>e!==null&&e>0});var pm,XM,kP=l(()=>{"use strict";k();ol();pm=e=>(ss(e.id),{...e,status:"stopped",errorMessage:ib,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null,phase:"complete"},updatedAt:new Date().toISOString()}),XM=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;ss(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var H8,ZM,QM,eN=l(()=>{"use strict";k();rl();Ja();Ya();cl();Ge();Uo();YM();SP();kP();H8="Pick a revision scored above 0 before continuing to Separate.",ZM=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),QM=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=J(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=J(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Or(e.storePath,d))};if(o==="wizard-stop-all"){let c=pm(s);return F(e.storePath,c),a(n),!0}if(o==="wizard-skip-module"){let c=XM(s);return F(e.storePath,c),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=VO(s,c);return F(e.storePath,d),d.status==="judging"&&ke(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=Tb(s.wizard,d,c);g=xb(g,d),g={...g,pendingStepInstructions:p};let S={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return F(e.storePath,S),ke(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?ZM(s):jo({...s,wizard:{...s.wizard,gate:null}});return F(e.storePath,g),ke(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=KM(s,p??-1);if(!JM(g)){let h={...s,errorMessage:H8,updatedAt:new Date().toISOString()};return F(e.storePath,h),a(n),!0}let S=kr({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return F(e.storePath,S),ke(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=ZM(s);return F(e.storePath,h),ke(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(h=>h.id===p);if(g===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return F(e.storePath,h),a(n),!0}let S=Cr(s,g);return F(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(n),!0;let g=Yb({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!g.ok){let u={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return F(e.storePath,u),a(n),!0}let S={...s.wizard,parameterValues:g.parameterValues};if(p.status==="pending"){let u=OO({...s,wizard:{...S,gate:null}},d);return F(e.storePath,u),ke(e.storePath,n),a(n),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=de(S),A={...s,status:u.terminalStatusSuggestion,wizard:{...S,gate:null,phase:"complete"},updatedAt:new Date().toISOString()};return F(e.storePath,A),a(n),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...S,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return F(e.storePath,y),a(n),!0}}return a(n),!0}});var $8,tN,z8,TP,F8,rN,oN=l(()=>{"use strict";Ne();ol();kP();nP();Fp();sl();Ge();$8="Add a score from 0 to 100 and the reason for it.",tN="Add a score from 1 to 100 and the reason for it.",z8="Write the next prompt.",TP="This step is not waiting for you.",F8=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},rN=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=J(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(F(e.storePath,pm(a)),{kind:"saved",cycleId:i}):GO(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=J(e.storePath,r);if(o===null||!kt(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:TP};if(t==="manual-judge"){if(o.judgeModel!==x)return{kind:"invalid",cycle:o,errorMessage:TP};let i=F8(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?tN:$8};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:tN};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",p=Up(Qa(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return F(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==x)return{kind:"invalid",cycle:o,errorMessage:TP};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:z8};let s=zp(o,n);return F(e.storePath,s),{kind:"saved",cycleId:o.id}}});var nN,sN=l(()=>{"use strict";nN=`<script>
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
</script>`});var iN,aN=l(()=>{"use strict";iN=`<script>
(() => {
  const focusRunPanel = () => {
    const compose = document.getElementById("prompt-optimizer-compose");
    if (
      compose instanceof HTMLElement &&
      !compose.classList.contains("sdlc-compose-viewing-finished")
    ) {
      compose.classList.add("sdlc-compose-run-focus");
    }
    document.getElementById("prompt-optimizer-run")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
    const button = document.querySelector("[data-sdlc-run-wizard]");
    if (button instanceof HTMLButtonElement) {
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      button.innerHTML =
        '<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026';
    }
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
    if (!applied) return;
    lockCompose();
    if (!runApplied) {
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
    if (response === null || !response.ok) return false;
    const html = await response.text();
    if (html.trim().length === 0) return false;
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
</script>`});var lN,cN=l(()=>{"use strict";lN=`<script>
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
</script>`});var dN,uN=l(()=>{"use strict";dN=`<script>
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
    const compose = document.getElementById("prompt-optimizer-compose");
    if (
      compose instanceof HTMLElement &&
      !compose.classList.contains("sdlc-compose-viewing-finished")
    ) {
      compose.classList.add("sdlc-compose-run-focus");
    }
    document.getElementById("prompt-optimizer-run")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
        paintRunButton(true);
        focusRunPanel();
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
</script>`});var pN,mN=l(()=>{"use strict";k();Xe();pN=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Rt(t.workingDirectory),passScore:String(t.passScore),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!C(t.status)}}});var gN,fN=l(()=>{"use strict";k();am();gN=e=>{if(e.wizard===void 0)return C(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=zo(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(C(e.status)){if(e.wizard.phase==="complete"){let r=de(e.wizard),o=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),n=o===null?"":` \xB7 lowest ${o}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${n}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var hN,yN=l(()=>{"use strict";hN=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Zt,U8,B8,SN,AN=l(()=>{"use strict";fN();yN();al();Zt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),U8=e=>e.wizard===void 0?"classic":"wizard",B8=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Zt(t)}">`,o=gN(e),n=hN(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Zt(o.badgeClass)}">${Zt(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Zt(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Zt(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${U8(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Zt(e.id)}">${Zt(Xt(e.goal))}</a><p class="muted">${Zt(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},SN=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>B8(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Zt(s)}</summary>${i}</details>`:i}});var xP,mm,bN,G8,V8,IP,PN,OP=l(()=>{"use strict";xP=m(require("node:fs")),mm=m(require("node:path"));Xe();bN=/^[a-z0-9-]+$/,G8=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},V8=(e,t)=>{if(!bN.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=G8(p[2]??"");p[1]==="name"&&g.length>0&&(o=g),p[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},IP=e=>{let t=Oo(e);if(!t.ok)return[];let r=mm.default.resolve(t.path,".cursor","skills"),o=[];try{o=xP.default.readdirSync(r)}catch{return[]}return o.filter(n=>bN.test(n)).flatMap(n=>{let s=mm.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${mm.default.sep}`))return[];try{let i=V8(xP.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},PN=(e,t)=>IP(e).find(r=>r.fileName===t)??null});var wN,_N=l(()=>{"use strict";wN={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Pass score",practice:"The run passes at this score. 90 is the usual bar. Lower it when a useful prompt is enough.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var dl,q8,K8,Ve,ul=l(()=>{"use strict";_N();dl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),q8='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>',K8=e=>{let t=wN[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${dl(t.title)}" aria-describedby="${r}" aria-expanded="false">${q8}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${dl(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${dl(t.example)}</span></span></button>`},Ve=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${dl(r)}"`}>${dl(e)}</span>${K8(t)}</span>`});var vN,J8,WN,LN,EN=l(()=>{"use strict";ul();vN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),J8=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),WN=e=>{if(e.length===0)return`<div class="field">${Ve("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${vN(r.fileName)}">${vN(r.fileName)}</option>`).join("");return`<div class="field">${Ve("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${J8(e)}</script>`},LN=`<script>
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
</script>`});var Te,RN,CN,Y8,kN,TN,xN,IN=l(()=>{"use strict";k();bP();Ne();al();am();Te=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RN=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",CN=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,Y8=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},kN=e=>e===x?"You":be(e),TN=e=>{let t=Y8(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":be(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Te(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Te(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Te(kN(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Te(kN(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Te(r)}</dd></div>
    </dl>
  </details>`},xN=e=>{let t=e.wizard;if(t===void 0)return"";let r=Xt(e.goal),o=e.status==="wizard_paused",n=!C(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=om(e),g=CN(t),S=g===null?"":RN(g),h=zo(e),y=S.length===0?"":h===null||h>=4?` <strong>${Te(S)}</strong>`:` <strong>${Te(S)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Te(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Te(p.title)}${y}</p>
    <p class="muted">${Te(p.detail)}</p>
    <div class="actions">
      ${TN(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Te(e.id)}">Open this run</a>
    </div>
  </section>`}let s=CN(t),i=s===null?"Wizard":RN(s),a=zo(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Te(r)}</h2>
    <p class="lede">Paused at <strong>${Te(i)}</strong>${Te(c)} (last updated ${Te(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${TN(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Te(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var pl,ON,MN=l(()=>{"use strict";ul();pl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ON=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${pl(n.id)}"${n.id===e.runner?" selected":""}>${pl(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${pl(e.runner)}">Checking ${pl(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Ve("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Ve("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${pl(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var NN,jN=l(()=>{"use strict";NN=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var as,DN,HN,$N,zN,FN=l(()=>{"use strict";ul();as=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DN=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${as(c.id)}"${c.id===r?" selected":""}>${as(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${as(n)}</option>`;return`<div class="field">${Ve(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},HN=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${as(t)}">Checking ${as(o)}\u2026</p>`},$N=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Ve(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${as(r)}</textarea><span class="muted">${o}</span></div></details>`,zN=e=>{let t=`<div class="sdlc-writer">${DN("judge","Judge",e.judge,e.writers,"I'll score it")}${HN("judge",e.judge,e.writers)}${$N("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${DN("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${HN("improver",e.improver,e.writers)}${$N("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var Z8,Bo,UN,BN=l(()=>{"use strict";sl();WP();sN();aN();AP();cN();uN();mN();AN();OP();EN();ul();LP();IN();al();MN();jN();FN();k();Z8=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Bo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UN=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Bo(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Bo(e.skillNotice??"")}</div>`,o=`${YO}${XO}`,n=e.resumableWizardCycle??null,s=n===null?"":xN(n),i=lm(e.cycle),a=e.cycle===null?"":sm(e.cycle),c=e.cycle!==null&&kt(e.cycle),d=pN(e),p=Z8(d.goal,d.prompt,e.canRun),g=zN({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=ON({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=Cb,y=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",u=e.cycle!==null&&C(e.cycle.status),A=d.running&&!u,b=u||A?"":" open",f=A?" sdlc-compose-run-focus":"",_=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${u?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,v=u?(()=>{let B=e.cycle!==null?Xt(e.cycle.goal):Xt(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Bo(B)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${_}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${_}</summary>`,L=u?" sdlc-compose-viewing-finished":"",R=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",T=c?"waiting":d.running?"running":"idle",I=d.running&&!c?' aria-busy="true"':"",D=`<section class="card sdlc-compose${L}${f}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${b}>
        ${v}
        <div class="sdlc-compose-details-body">
      <p class="lede">${h} ${Bo(e.modelNote)}</p>
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
            ${Ve("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Bo(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${WN(IP(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${Ve("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${Bo(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Ve("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Bo(d.prompt)}</textarea>
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
        ${NN()}
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
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${T}" data-can-run="${p?"true":"false"}"${I}${d.running?" disabled":""}>${R}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,re=`${""}${nN}${iN}${dN}${LN}${lN}`;return`${t}${r}${D}${s}${a}${i}${o}${SN(e.history,e.cycle?.id??null)}${re}`}});var ml,MP=l(()=>{"use strict";BN();ml=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:UN(t)}))}});var GN,VN=l(()=>{"use strict";oN();cl();MP();Ge();Uo();GN=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:rN({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=J(e.storePath,o.cycleId);return ke(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Or(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await ml(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Et(e.storePath),resumableWizardCycle:null}),!0)}});var qN,gm,NP=l(()=>{"use strict";qN=m(require("node:os"));k();gm=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??qN.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??90,maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var KN,ls,jP,JN,YN,gl=l(()=>{"use strict";k();Ne();nb();KN=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,ls=e=>{let t=oO(e),r=No(e).map(s=>({id:s,label:$p[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},jP=(e,t,r)=>t===x||t!==null&&e.writers.some(o=>o.id===t)?t:r,JN=(e,t,r,o=null)=>({judge:jP(e,t,e.judge),improver:jP(e,r,e.improver),runner:jP(e,o,e.runner)}),YN=e=>e===bp?{goal:Pp,prompt:wp}:{goal:"",prompt:""}});var fm,DP=l(()=>{"use strict";k();Ne();Xe();gl();fm=e=>{let t=JN(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=String(70),o=String(5),n=e.posted?.get("judgeInstructions")?.trim()??"",s=e.posted?.get("improverInstructions")?.trim()??"",i=e.posted?.get("runnerInstructions")?.trim()??"",a=e.posted?.get("runner")??null,c=(u,A)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:u,passScore:r,maxRounds:o,errorMessage:A,judge:t.judge,improver:t.improver,judgeInstructions:n,improverInstructions:s,runner:t.runner,runnerInstructions:i});if(e.posted===null)return c(e.defaultFolder??Io,null);let d=e.posted.get("folder")??Io;if(e.posted.get("intent")==="choose-folder"){let u=e.pickFolder();return c(u===null?d:Rt(u),null)}if((e.posted.get("intent")??"")!=="run")return c(d,null);let g=KN(e.goal,e.prompt);if(g!==null)return c(d,g);let S=nO(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(S===null)return c(d,"Choose a judge and an improver.");let h=Oo(d);if(!h.ok)return c(d,h.errorMessage);let y=sO(e.installedIds,a,S.judge);return y===null?c(d,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:S.judge,improver:S.improver,workingDirectory:h.path,passScore:70,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:n,improverInstructions:s,runner:y,runnerInstructions:i}}});var cs,ym,Q8,HP,XN,hm,ZN,e3,QN,$P,t3,r3,o3,zP,ej,tj,rj=l(()=>{"use strict";cs=m(require("node:fs")),ym=m(require("node:path"));Ne();Xe();Q8=["remember","choose-folder","run"],HP=()=>({folder:Io,judge:"",improver:"",runner:""}),XN=e=>ym.default.join(ym.default.dirname(e),"prompt-optimizer-preferences.json"),hm=e=>typeof e=="string"?e:"",ZN=e=>{let t=XN(e);if(!cs.default.existsSync(t))return HP();try{let r=JSON.parse(cs.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return HP();let o=r,n=hm(o.folder).trim();return{folder:n.length===0?Io:n,judge:hm(o.judge),improver:hm(o.improver),runner:hm(o.runner)}}catch{return HP()}},e3=(e,t)=>{let r=XN(e);cs.default.mkdirSync(ym.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;cs.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),cs.default.renameSync(o,r)},QN=(e,t)=>e===x||No(t).some(r=>r===e),$P=(e,t,r)=>e===null?t:e.length===0?"":QN(e,r)?e:t,t3=(e,t)=>{if(e===null)return t;let r=Oo(e);return r.ok?r.display:t},r3=e=>{let t=ZN(e.storePath),r={folder:t3(e.folder,t.folder),judge:$P(e.judge,t.judge,e.installedIds),improver:$P(e.improver,t.improver,e.installedIds),runner:$P(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||e3(e.storePath,r)},o3=e=>{let t=Oo(e);return t.ok?t.display:Io},zP=(e,t)=>QN(e,t)?e:"",ej=e=>{let t=ZN(e.storePath);return{selection:{...e.selection,judge:zP(t.judge,e.installedIds)||e.selection.judge,improver:zP(t.improver,e.installedIds)||e.selection.improver,runner:zP(t.runner,e.installedIds)||e.selection.runner},defaultFolder:o3(t.folder)}},tj=e=>{let t=e.posted.get("intent")??"";if(!Q8.includes(t))return;let r=e.posted.get("folder");r3({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var oj,n3,s3,FP,i3,Sm,Am=l(()=>{"use strict";oj=m(require("node:os"));Ne();RP();Za();n3="Reply with the single word ok. Do not use tools.",s3=45e3,FP=async(e,t)=>{if(t===x)return{ok:!0,message:"You will do this step."};let r=BM(e,t);if(r!==null)return{ok:!0,message:r};let o=await Ze({writerAgent:t,prompt:n3,workingDirectory:oj.default.tmpdir(),timeoutMs:s3});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${be(t)} is ready.`;return GM(e,t,n),{ok:!0,message:n}},i3=e=>[...new Set(e.filter(t=>t.length>0))],Sm=async(e,t,r,o)=>{for(let n of i3([t,r,o??""])){let s=await FP(e,n);if(!s.ok)return s.message}return null}});var UP,nj=l(()=>{"use strict";k();UP=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!C(r.status)&&!(t!==null&&r.id===t))return r;return null}});var sj,ij=l(()=>{"use strict";ut();k();cl();NP();DP();MP();Ge();Xe();rj();OP();Am();nj();im();Uo();sj=async e=>{let t=e.posted===null?ej({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=fm({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Wr("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(tj({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Rt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await Sm(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await ml(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Rt(r.workingDirectory),passScore:String(r.passScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Et(e.route.storePath),resumableWizardCycle:UP(Et(e.route.storePath),null)});return}if(r.kind==="start"){let s=PN(r.workingDirectory,r.sourceSkillFile),i=gm({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,wizard:{...Na(r.prompt),runnerInstructions:r.runnerInstructions},runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(F(e.route.storePath,i),ke(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(Or(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:J(e.route.storePath,e.cycleId);n!==null&&(n=$o(e.route.storePath,n),ke(e.route.storePath,n.id)),await ml(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Et(e.route.storePath),resumableWizardCycle:UP(Et(e.route.storePath),n?.id??null)})}});var aj,lj=l(()=>{"use strict";Ge();aj=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";FI(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var cj,dj=l(()=>{"use strict";cj=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var uj,pj=l(()=>{"use strict";tO();eN();VN();ij();lj();gl();dj();Uo();uj=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await um(),o=ls(r),n=e.method==="POST"?cj(e.request.headers["content-type"],await e.readBody(e.request)):null;if(QM({posted:n,storePath:e.storePath,response:e.response})||await GN(e,n,o))return;let s=YN(t.searchParams.get("example")),i=aj({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=eO({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await sj({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:QI(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var a3,mj,gj=l(()=>{"use strict";k();Ge();a3=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",mj=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=J(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!C(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=Fb({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${a3(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var fj,hj=l(()=>{"use strict";cl();Ge();fj=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:J(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Or(e.storePath,o)),!0}});var l3,yj,Sj=l(()=>{"use strict";Ne();Am();l3=["claude-cli","codex","cursor","antigravity"],yj=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===x||l3.includes(t)?await FP(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var Aj,bj=l(()=>{"use strict";k();Aj=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Oa,page:Ma,context:Yn,installedWriters:e,post:{method:"POST",url:Oa,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${Oa}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var BP,Pj=l(()=>{"use strict";k();nl();BP=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ne(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null}))),o=C(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:o,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:is(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:Yn,page:`${Ma}?cycle=${encodeURIComponent(e.id)}`}}});var xe,c3,wj,_j,vj=l(()=>{"use strict";xe=m(Ds());k();c3=(0,xe.isType)({goal:xe.isString,prompt:xe.isString,workingDirectory:xe.isString,judge:(0,xe.isUndefinedOr)(xe.isString),improver:(0,xe.isUndefinedOr)(xe.isString),passScore:(0,xe.isUndefinedOr)(xe.isNumber),maxRounds:(0,xe.isUndefinedOr)(xe.isNumber)}),wj=e=>{let t=e?.trim()??"";return t.length===0?null:t},_j=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return c3(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Ip}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:wj(t.judge),improver:wj(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:Ip}}});var d3,Wj,Lj=l(()=>{"use strict";k();Ne();DP();gl();d3=e=>e.map(t=>t.id).join(", "),Wj=e=>{let t=ls(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===x||n===x)return{ok:!1,error:Rb,installedWriters:t.writers};if(o===null||n===null){let a=d3(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o}),i=fm({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var Ej,Rj=l(()=>{"use strict";k();NP();bj();Pj();gl();vj();Lj();Ge();Ej=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=J(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:BP(c)}}let r=await e.handlers.readInstalledIds(),o=ls(r);if(e.method==="GET")return{status:200,body:Aj(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let n=_j(e.rawBody);if(!n.ok)return{status:400,body:{ok:!1,error:n.error,installedWriters:o.writers}};let s=Wj({body:n.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:o.writers}};let a=gm({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:Na(s.prompt),runnerModel:s.runner});return F(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:BP(a)}}});var Cj,kj=l(()=>{"use strict";Uo();Am();Rj();Cj=async e=>{let t=await Ej({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:um,readWritersReady:Sm,startCycle:ke}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var u3,GP,Tj=l(()=>{"use strict";h0();pj();gj();hj();Sj();kj();u3=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},GP=async e=>{let t=u3(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await Cj(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:f0()})),!0):(await yj({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||mj({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||fj({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await uj(e),!0)}});var xj=l(()=>{"use strict";Tj()});var Go,fl,p3,m3,g3,f3,Ij,Oj=l(()=>{"use strict";Go=m(require("node:fs")),fl=m(require("node:path")),p3="prompt-optimizer-cycles.json",m3="prompt-optimizer-preferences.json",g3="prompt-sdlc-cycles.json",f3="prompt-sdlc-preferences.json",Ij=e=>{let t=fl.default.join(e,p3),r=fl.default.join(e,g3);if(Go.default.existsSync(t)||!Go.default.existsSync(r))return t;try{Go.default.renameSync(r,t)}catch{return r}let o=fl.default.join(e,f3),n=fl.default.join(e,m3);if(Go.default.existsSync(o)&&!Go.default.existsSync(n))try{Go.default.renameSync(o,n)}catch{}return t}});var ds,h3,VP,Mj=l(()=>{"use strict";ds=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),h3=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],VP=e=>{let t=h3.map(i=>`<option value="${ds(i.value)}">${ds(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${ds(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${ds(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${ds(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${ds(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var hl,Dj,y3,Hj,S3,A3,$j,Pm,Nj,jj,b3,P3,Qt,yl,bm,w3,wm,qP,_3,KP,zj,JP,Fj,v3,W3,L3,Uj,Bj,Gj,Sl=l(()=>{"use strict";hl=m(require("node:fs")),Dj=m(require("node:path")),y3="estimate-history.ndjson",Hj=100,S3=500,A3=2e4,$j=e=>Dj.default.join(e,y3),Pm=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,S3),Nj=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,A3),jj=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,b3=e=>({...e,estimateTokens:jj(e.estimateTokens),actualTokens:jj(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),P3=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Qt=e=>{let t=$j(e);return hl.default.existsSync(t)?hl.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return P3(n)?[b3(n)]:[]}catch{return[]}}):[]},yl=(e,t)=>{hl.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;hl.default.writeFileSync($j(e),r,"utf8")},bm=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),w3=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${bm(o.task)} | ${bm(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},wm=e=>{let t=Qt(e.reportsDir),r=Pm(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);yl(e.reportsDir,[...s,n])},qP=e=>{let t=Qt(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?Pm(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);yl(e.reportsDir,[...i,s])},_3=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-Hj),KP=e=>[...Qt(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),zj=e=>{let t=Qt(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=Nj(e.input),n=Nj(e.output),s=Pm(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);yl(e.reportsDir,[...c,a])},JP=(e,t)=>{let r=Qt(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},Fj=e=>({table:w3(_3(Qt(e))),embedding:null}),v3=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},W3=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-Hj),L3=e=>{let t=v3(W3(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${bm(s.task)} | ${bm(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},Uj=e=>{let t=Qt(e.reportsDir),r=Pm(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);yl(e.reportsDir,[...s,n])},Bj=e=>{let t=Qt(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);yl(e.reportsDir,[...s,n])},Gj=e=>L3(Qt(e))});var Vj=l(()=>{"use strict";Sl()});var er,YP,E3,XP,R3,C3,_m,vm,k3,ZP,qj=l(()=>{"use strict";Vj();er=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YP=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},E3=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${YP(-r)} under`:`${YP(r)} over`},XP=e=>e.toLocaleString("en-US"),R3=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${XP(-r)} under`:`${XP(r)} over`},C3=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},_m=e=>e===null?"\u2014":YP(e),vm=e=>e===null?"\u2014":XP(e),k3=`(function () {
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
})();`,ZP=e=>{let r=KP(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":E3(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":R3(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${er(C3(i))}</button></td>
        <td>${er(c)}</td>
        <td>${_m(n.estimateSeconds)}</td>
        <td>${_m(n.actualSeconds)}</td>
        <td>${er(d)}</td>
        <td>${vm(n.estimateTokens)}</td>
        <td>${vm(n.actualTokens)}</td>
        <td>${er(p)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${er(c)}</p>
        <h2>Input</h2>
        <pre>${er(i)}</pre>
        <h2>Output</h2>
        <pre>${er(a)}</pre>
        <p>Time: estimated ${_m(n.estimateSeconds)} \xB7 actual ${_m(n.actualSeconds)} \xB7 ${er(d)}</p>
        <p>Tokens: estimated ${vm(n.estimateTokens)} \xB7 actual ${vm(n.actualTokens)} \xB7 ${er(p)}</p>
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
        <script>${k3}</script>`}
    </section>`}});var Kj=l(()=>{"use strict";Mj();qj()});var us,T3,x3,QP,Jj=l(()=>{"use strict";us=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),T3=(e,t,r)=>{let o=us(t),n=us(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},x3=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${us(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>T3(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${us(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${us(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${us(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},QP=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(x3).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var Yj=l(()=>{"use strict";Jj()});var Al,Xj,Zj,ew,tw,rw,Qj=l(()=>{"use strict";Al=m(require("node:fs")),Xj=m(require("node:path"));ba();gp();Zj=(e,t,r)=>Bn({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,ew=(e,t,r)=>{let o=Zj(e,t,r);if(o===null)return[];if(!Al.default.existsSync(o))return[];let n=Al.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},tw=e=>{let t=Zj(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Jt(e.entry.prompt),output:Jt(e.entry.output)};Al.default.mkdirSync(Xj.default.dirname(t),{recursive:!0}),Al.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},rw=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var I3,O3,bl,Wm,ow=l(()=>{"use strict";I3=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),O3=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,bl=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=I3(i.assistantOutput),d=c.length>0?`Assistant: ${O3(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},Wm=e=>{let t=e.userMessage.trim(),r=bl({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var It,Pl,iw,M3,N3,nw,j3,aw,Lm,eD,tD,D3,ps,lw,sw,rD,H3,oD,ms,Em,wl,$3,_l,cw,Rm,Cm,nD=l(()=>{"use strict";It=m(require("node:fs")),Pl=m(require("node:path")),iw=require("node:crypto");ow();M3="writer-sessions",N3="active-index.json",nw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),j3=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",aw=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},Lm=e=>{let t=Pl.default.join(e.installDir,M3);return It.default.mkdirSync(t,{recursive:!0}),t},eD=e=>Pl.default.join(Lm(e),N3),tD=(e,t)=>Pl.default.join(Lm(e),`${t}.canonical.json`),D3=(e,t)=>Pl.default.join(Lm(e),`${t}.continuation.json`),ps=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,lw=e=>{let t=eD(e);if(!It.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(It.default.readFileSync(t,"utf8"));if(!nw(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!nw(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!j3(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},sw=(e,t)=>{It.default.writeFileSync(eD(e),JSON.stringify(t,null,2))},rD=(e,t)=>{It.default.writeFileSync(tD(e,t.sessionId),JSON.stringify(t,null,2))},H3=(e,t)=>{It.default.writeFileSync(D3(e,t.sessionId),JSON.stringify(t,null,2))},oD=(e,t)=>{let r=bl({turns:t.turns});H3(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},ms=(e,t)=>{let r=tD(e,t);if(!It.default.existsSync(r))return null;try{let o=JSON.parse(It.default.readFileSync(r,"utf8"));return!nw(o)||typeof o.sessionId!="string"?null:o}catch{return null}},Em=(e,t=20)=>{let r=Lm(e),o=It.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=ms(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},wl=(e,t,r)=>{let o=aw(r);return lw(e).entries.find(i=>ps(i)===ps({writerAgent:t,projectFolderPath:o}))?.sessionId??null},$3=(e,t,r,o)=>{let n=lw(e),s=ps({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>ps(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];sw(e,{entries:i})},_l=(e,t,r)=>{let o=(0,iw.randomUUID)(),n=new Date().toISOString(),s=aw(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return rD(e,i),oD(e,i),$3(e,t,s,o),o},cw=(e,t,r)=>{let o=wl(e,t,r);return o!==null?o:_l(e,t,r)},Rm=(e,t,r)=>{let o=aw(r),n=lw(e);if(o===null&&r===void 0){sw(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=ps({writerAgent:t,projectFolderPath:o});sw(e,{entries:n.entries.filter(i=>ps(i)!==s)})},Cm=e=>{let t=cw(e.layout,e.writerAgent,e.projectFolderPath),r=ms(e.layout,t);if(r===null)return;let o={id:(0,iw.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};rD(e.layout,n),oD(e.layout,n)}});var z3,F3,km,dw,sD=l(()=>{"use strict";z3=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",F3=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},km=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",dw=e=>{let t=km(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=z3(r,e.userPromptCharacterCount),n=F3({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var Tm=l(()=>{"use strict";Qj();nD();ow();sD()});var iD=l(()=>{"use strict";Lh()});var He,B3,G3,uw,pw,mw,aD=l(()=>{"use strict";ce();iD();He=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),B3=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},G3=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Jd(o);return`value="${He(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${He(r)}"`},uw=(e,t,r,o,n)=>{let s=ey[t];return`<label class="field">
          <span class="field-label">${He(o)} API key \u2014 ${He(B3(e,t))} \xB7 <a class="field-link" href="${He(s.href)}" target="_blank" rel="noopener noreferrer">${He(s.label)}</a></span>
          <input class="input mono" type="password" name="${He(r)}" autocomplete="off" ${G3(e,t,n)} />
        </label>`},pw=(e,t,r,o)=>{let n=Eh(e[t]?.model),s=new Set(zd[t].map(c=>c.value)),i=zd[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${He(c.value)}"${d}>${He(c.label)}</option>`}).join(""),a=n!==lo&&!s.has(n)?`<option value="${He(n)}" selected>${He(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${He(o)}</span>
          <select class="input mono" name="${He(r)}">${i}${a}</select>
        </label>`},mw=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${He(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${uw(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${pw(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${uw(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${pw(e.secrets,"openai","openaiModel","OpenAI model")}
        ${uw(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${pw(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var lD=l(()=>{"use strict";aD()});var xm,cD,dD=l(()=>{"use strict";xm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cD=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${xm(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Console \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${xm(s.name)}</strong> <span class="muted mono">(${xm(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${xm(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var V3,uD,pD,mD=l(()=>{"use strict";V3=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,uD=e=>e.kind==="folder",pD=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&uD(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(uD(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(V3)};return r(t)}});var gD,gw,fD=l(()=>{"use strict";gD=m(require("node:path")),gw=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${gw(r.children,t)}</ul>
            </details>
          </li>`;let o=gD.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var hD,Mr,q3,K3,vl,J3,fw,yD=l(()=>{"use strict";Ap();hD=m(require("node:path"));dD();mD();fD();Mr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),q3=()=>`(() => {
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

})();`,K3=()=>`(() => {
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
})();`,vl=e=>{let t=Wa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=cD({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Mr(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Mr(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':J3(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Mr(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Mr(s)}" />
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
    <script>${q3()}</script>
    <script>${K3()}</script>`;return`${t}${r}${o}${c}${d}`},J3=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=pD(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:hD.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),p=gw(d,Mr),g=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Mr(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Mr(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Mr(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},fw=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,S=t.sets[i];if(S===void 0)continue;let h=a.length>0?a:S.proposedSlug,y=g.length>0?g:S.proposedName,u=r.has(i),A=S.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:u}));s.push({slug:h,name:y,items:A})}return s}});var SD=l(()=>{"use strict";yD()});var Y3,hw,AD=l(()=>{"use strict";vr();Y3=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[De]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},hw=Y3});var X3,bD,PD=l(()=>{"use strict";vr();X3=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[De]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},bD=X3});var wD=l(()=>{"use strict"});var Wl,Z3,yw,_D=l(()=>{"use strict";Ap();Wl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Z3=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,yw=e=>{let t=e.flashError?`<div class="alert-error">${Wl(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Wl(e.flashMessage)}</div>`:"",r=Wa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Wl(Z3(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Wl(n.name)}</strong>
                  <span class="muted mono">${Wl(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var vD=l(()=>{"use strict";wD();aS();_D()});var Im,WD=l(()=>{"use strict";Im=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var LD,tr,Sw=l(()=>{"use strict";LD=m(require("node:path"));Ut();bt();V();ce();Ke();tr=e=>{let t=z()?.layout.installDir??E();if(LD.default.basename(t)===Vr)return zt;let r=z(),o=r!==null?Ee(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):zt}});var Aw,ED=l(()=>{"use strict";Ke();Sw();Aw=async e=>{let t=Le(e.installDir),r=t?.bundleVersion??null,o=tr(t);try{let n=await Sn(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:ro(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var bw,RD=l(()=>{"use strict";bw=e=>!e});var Pw,gs,ww=l(()=>{"use strict";V();Pw=()=>`http://127.0.0.1:${Lf()}/update/run`,gs=async e=>{try{let t=await fetch(Pw(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Q3,CD,_w,kD=l(()=>{"use strict";V();te();ww();Q3=()=>{Ht({launchAgentLabel:oe(),installDir:E()})},CD=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},_w=async()=>{Q3();let e=await gs({force:!0});if(e.ok)return{ok:!0,message:CD(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:CD(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ke(),LE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var vw=l(()=>{"use strict";XA();WD();Sw();ED();RD();kD();ww()});var TD,xD=l(()=>{"use strict";TD=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var ID,OD,Ww,Lw,MD=l(()=>{"use strict";ID=require("node:crypto"),OD=m(require("node:fs"));ut();ce();ce();xD();Ww=!1,Lw=async e=>{if(Ww)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!TD(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=z();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&OD.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,ID.randomUUID)();Ww=!0;try{if(await Zy(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Wn({...r,workspace:n},e.writerAgent,t);return await Vi(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Ww=!1}}});var ND=l(()=>{"use strict";MD()});var Qe,e4,jD,DD,Ew,Rw,Cw,kw,Tw,xw,Iw=l(()=>{"use strict";Qe=require("node:crypto"),e4=Buffer.from("302a300506032b6570032100","hex"),jD=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},DD=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Qe.createPublicKey)({key:Buffer.concat([e4,t]),format:"der",type:"spki"})},Ew=()=>{let{publicKey:e,privateKey:t}=(0,Qe.generateKeyPairSync)("ed25519");return{publicKeyRaw:jD(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Rw=e=>(0,Qe.createPrivateKey)(e),Cw=(e,t)=>(0,Qe.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),kw=(e,t,r)=>{try{let o=DD(e);return(0,Qe.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Tw=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,xw=()=>(0,Qe.randomBytes)(32).toString("base64url")});var rr,Om,HD,t4,r4,Mm,Ow,Mw,$D=l(()=>{"use strict";rr=m(require("node:fs")),Om=m(require("node:path"));Iw();V();bt();HD=e=>Om.default.join(e.installDir,pr),t4=(e,t)=>{if(e.profileEmail===null||t===HD(e)||rr.default.existsSync(t))return;let r=HD(e);rr.default.existsSync(r)&&(rr.default.mkdirSync(Om.default.dirname(t),{recursive:!0}),rr.default.renameSync(r,t))},r4=e=>{if(!rr.default.existsSync(e))return null;try{let t=rr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Mm=e=>{let t=fd(e);t4(e,t);let r=r4(t);if(r!==null)return r;let o=Ew();return rr.default.mkdirSync(Om.default.dirname(t),{recursive:!0}),rr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},Ow=e=>{let t=Mm(e.layout),r=xw(),o=Tw({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Rw(t.privateKeyPem),s=Cw(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Mw=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return kw(e.serverPublicKey,t,e.serverAttestation)}});var Nw=l(()=>{"use strict";$D();Iw()});var BD,Ll,Hw,$w,zD,o4,jw,Nm,ie,GD,n4,Dw,s4,i4,zw,pe,we,or,a4,FD,UD,El,Rl,VD=l(()=>{"use strict";BD=m(require("node:http")),Ll=m(require("node:fs")),Hw=m(require("node:path"));jm();ya();Lx();Rx();Ox();Mn();vA();KA();u0();m0();xj();Oj();Kj();Yj();Tm();lD();SD();fo();ut();vr();AD();PD();vD();vw();Ke();ND();ce();Nw();$w=e=>pA(e)??"never",zD=48e3,o4=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,jw=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??_u(),reveal:t.reveal,installed:_r(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Nm=async e=>{let t=z();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:Tn(t,e)},ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GD=200,n4=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Dw=e=>{let t=e.trim().slice(0,GD),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},s4=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ie(t)}</div>`,i4=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ie(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',zw={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},pe=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...zw}),e.end(JSON.stringify(r))},we=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},or=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},a4=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=n4(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ie(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=bw(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Sa(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ie(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ie(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ie($w(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ie(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},FD=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},UD=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,GD)},El=e=>{let t=Hw.default.join(e.layout.installDir,"link-code.txt"),r=()=>Le(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:Im(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),u=await i(),A=tb(u),b=h.updateFlash??null,f=rb(b),w=s4(b,h.updateError??null);return QA({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:tr(y),installBundleVersionLabel:Im(y),prependBody:`${f}${w}${A}`,headerUpdateButtonHtml:eb(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await Aw(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:Dw("An update is already running.")}),h.end();return}c=!0;try{let u=await _w(),A=u.ok?"/?update=ok":Dw(u.message);h.writeHead(303,{Location:A}),h.end()}catch(u){let A=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:Dw(A)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${ie(y)}</h1>
      <p>${ie(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(b)},g=()=>{if(Ll.default.existsSync(t))return Ll.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return Ll.default.writeFileSync(t,h,"utf8"),h},S=BD.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",A=h.method??"GET";if(A==="OPTIONS"){y.writeHead(204,zw),y.end();return}if(!await GP({method:A,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:Ij(Hw.default.dirname(e.layout.configPath)),readBody:or,sendHtml:we,renderShell:n})){if(A==="GET"&&u==="/health"){let b=e.controllers.getStatus(),f=o();pe(y,200,{ok:!0,...b,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/status"){let b=o();pe(y,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/traffic"){pe(y,200,{entries:fa(e.layout)});return}if(A==="DELETE"&&u==="/api/traffic"||A==="POST"&&u==="/api/traffic/clear"){if(fA(e.layout),A==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}pe(y,200,{ok:!0});return}if(A==="GET"&&u==="/api/trace"){pe(y,200,{entries:dp(e.layout)});return}if(A==="DELETE"&&u==="/api/trace"||A==="POST"&&u==="/api/trace/clear"){if(SA(e.layout),A==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}pe(y,200,{ok:!0});return}if(A==="POST"&&u==="/api/errors/clear"){AA(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(A==="GET"&&u==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let w=await Vn({layout:e.layout,query:f,limit:20});pe(y,200,{chunks:w,query:f});return}pe(y,200,{chunks:Gn(e.layout).slice(-50).reverse()});return}if(A==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(A==="GET"&&u==="/api/update-status"){let b=await i();pe(y,200,{ok:!0,...b});return}if((A==="GET"||A==="POST")&&u==="/api/update"){await d(y);return}if(A==="GET"&&u==="/"){let b=e.controllers.getStatus(),f=o(),w=_r(e.layout),_=up(e.layout.errorLogPath);we(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:FD(h.url??void 0),updateError:UD(h.url??void 0),body:ob({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:Gn(e.layout).length,trafficEntryCount:fa(e.layout).length,wakeError:b.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(A==="GET"&&u==="/task"){let b=e.controllers.getStatus(),f=o(),w=z(),_=new URL(h.url??"/",`http://127.0.0.1:${43347}`),v=_.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=_.searchParams.get("failed")==="1"?_.searchParams.get("error")?.trim()??"Task failed.":null,R=_.searchParams.get("runId");we(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:VP({defaultWorkspace:w?.workspace??"",wsConnected:b.wsConnected,flashMessage:v,flashError:L,lastRunId:R})}));return}if(A==="POST"&&u==="/task/dispatch"){let b=await or(h),f=new URLSearchParams(b),w=f.get("prompt")?.trim()??"",_=f.get("writerAgent")?.trim()??"claude-cli",v=f.get("projectFolder")?.trim()??"",L=await Lw({prompt:w,writerAgent:_,...v.length>0?{projectFolderPath:v}:{}}),R=new URLSearchParams;L.ok?R.set("ok","1"):(R.set("failed","1"),L.errorMessage!==void 0&&R.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&R.set("runId",L.agentRunId),y.writeHead(303,{Location:`/task?${R.toString()}`}),y.end();return}if(A==="GET"&&u==="/writer-sessions"){let b=o(),f=Em(e.layout,12);we(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:FD(h.url??void 0),updateError:UD(h.url??void 0),body:QP({sessions:f})}));return}if(A==="GET"&&u==="/errors"){let b=o(),f=up(e.layout.errorLogPath);we(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:PA({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&u==="/status"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),w=Se(e.layout),_=w!==null?Me(w,12e4):WA(f.lastHeartbeatAt,12e4),v=LA({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:_}),L=o();we(y,await n({title:"Status",activePath:"/status",installVersion:L.installVersion,body:`${a4({status:f,healthBadge:v,revived:b.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:L.installBundleVersion,installBundleUpdatedAt:L.installBundleUpdatedAt})}${CA({installDir:e.layout.installDir})}${RA({entries:dp(e.layout)})}`}));return}if(A==="GET"&&u==="/traffic"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=fa(e.layout),w=o(),_=f.map(R=>`<tr><td title="${ie(R.at)}">${ie($w(R.at))}</td><td>${ie(R.direction)}</td><td><code>${ie(R.type)}</code></td><td>${ie(R.summary)}</td><td>${ie(R.action??"")}</td></tr>`).join(""),v=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${_}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',L=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";we(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${L}
              ${v}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&u==="/projects"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=tr(f.installVersion),_=await Nm(e.layout),v=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,L=z(),R=L===null?null:Z({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),T=R===null?{}:Object.fromEntries((await Promise.all(_.projects.map(async I=>{let D=await hw(R,I.id);return[I.id,D?.counts??null]}))).filter(I=>I[1]!==null));we(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:yw({projects:_.projects,compositionCountsByProjectId:T,cloudAppOrigin:w,syncMessage:_.message,syncOk:_.ok,flashMessage:null,flashError:v})}));return}if(A==="GET"&&u==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=z(),_=w===null?null:Z({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),v=f.length>0&&_!==null?Wr():null;if(v===null||_===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Be({projectFolderPath:v}),!await Yi(_,f,v)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(A==="GET"&&u==="/project"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=b.searchParams.get("id")?.trim()??"",w=o(),_=await Nm(e.layout),v=Ao(_.projects,f);if(v===null){await p(y,"Project not found");return}let L=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,R=b.searchParams.get("knowledgePromoted"),T=R!==null?`Marked ${R} lesson(s) as promoted in Agent Witch.`:null,I=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,D=b.searchParams.get("tab")?.trim()??"harness",re=D==="workflows"||D==="agents"||D==="knowledge"?D:"harness",B=z(),q=B===null?null:Z({wsUrl:B.wsUrl,pairingToken:B.pairingToken}),$r=q===null?null:await hw(q,v.id),$=0;if(q!==null)try{let _e=await fetch(`${q.appOrigin}/api/agent-witch/projects/${encodeURIComponent(v.id)}/knowledge`,{method:"GET",headers:{[De]:q.pairingToken},signal:AbortSignal.timeout(1e4)});if(_e.ok){let yt=await _e.json();typeof yt=="object"&&yt!==null&&typeof yt.candidateCount=="number"&&($=yt.candidateCount)}}catch{$=0}we(y,await n({title:v.name,activePath:"/projects",installVersion:w.installVersion,body:xn({project:v,installed:_r(e.layout),linkedSetSlugs:Pr(v.projectFolderPath),composition:$r,knowledgeCandidateCount:$,activeTab:re,flashMessage:L??T,flashError:I})}));return}if(A==="POST"&&u==="/projects/pull-bound-harness"){let b=await or(h),f=await lS({rawBody:b,layout:e.layout});if(f.kind==="not_found"){await p(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let w=o();we(y,await n({title:f.title,activePath:"/projects",installVersion:w.installVersion,body:f.body}));return}if(A==="POST"&&u==="/projects/link-harness"){let b=await or(h),f=new URLSearchParams(b),w=f.get("projectId")?.trim()??"",_=await Nm(e.layout),v=Ao(_.projects,w);if(v===null){await p(y,"Project not found");return}let L=f.getAll("applySet").map(B=>String(B)),R=ji({layout:e.layout,projectFolderPath:v.projectFolderPath,setSlugs:L});if(!R.ok){let B=o();we(y,await n({title:v.name,activePath:"/projects",installVersion:B.installVersion,body:xn({project:v,installed:_r(e.layout),linkedSetSlugs:Pr(v.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:R.errorMessage})}));return}let T=z(),I=T===null?null:Z({wsUrl:T.wsUrl,pairingToken:T.pairingToken}),D=I===null?!1:await Ki(I,v.id,R.appliedSetSlugs),re=new URLSearchParams({linked:"1",files:String(R.writtenFileCount),bindingsSynced:D?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${re.toString()}`}),y.end();return}if(A==="POST"&&u==="/project/knowledge/promote-all"){let b=await or(h),w=new URLSearchParams(b).get("projectId")?.trim()??"",_=await Nm(e.layout),v=Ao(_.projects,w);if(v===null){await p(y,"Project not found");return}let L=z(),R=L===null?null:Z({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),T=R===null?{ok:!1,promotedCount:0}:await bD(R,v.id),I=new URLSearchParams({tab:"knowledge",...T.ok?{knowledgePromoted:String(T.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${I.toString()}`}),y.end();return}if(A==="GET"&&u==="/harness"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=zi(e.layout),_=b.searchParams.get("submitted")==="1",v=_?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,L=w?.scanRoots[0]??_u(),R=o4(e.layout,{reveal:w,importQuery:b.searchParams.get("import")==="1",justSubmitted:_}),T=tr(f.installVersion);we(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:vl(jw(e.layout,{cloudAppOrigin:T,reveal:w,scanFolder:L,flashMessage:v,importSectionExpanded:R}))}));return}if(A==="POST"&&u==="/api/harness/pick-folder"){let b=Wr();if(b===null){pe(y,200,{cancelled:!0});return}pe(y,200,{path:b});return}if(A==="GET"&&u==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=Ni(f);if(w===null){pe(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=Ll.default.readFileSync(w,"utf8"),v=_.length>zD?`${_.slice(0,zD)}
\u2026 (truncated)`:_;pe(y,200,{content:v})}catch{pe(y,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&u==="/api/harness/reveal/add-project"){let b=await or(h),f="";try{let v=JSON.parse(b);typeof v=="object"&&v!==null&&typeof v.projectPath=="string"&&(f=v.projectPath.trim())}catch{pe(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){pe(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=zi(e.layout),_=Fy({reveal:w,projectPath:f});if(_===null||_.sets.length===0){pe(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Eu(e.layout,_),pe(y,200,{ok:!0,setCount:_.sets.length});return}if(A==="GET"&&u==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){pe(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...zw});let _=Uy({scanRoot:f,response:y,shouldAbort:()=>w});Eu(e.layout,_),y.end();return}if(A==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&u==="/harness/submit"){let b=zi(e.layout);if(b===null){let T=o(),I=tr(T.installVersion);we(y,await n({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:vl(jw(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await or(h),w=new URLSearchParams(f),_=fw(w,b),v=Gy({layout:e.layout,sets:_});if(!v.ok){let T=o(),I=tr(T.installVersion);we(y,await n({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:vl(jw(e.layout,{cloudAppOrigin:I,reveal:b,flashError:v.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}qy(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${v.writtenItemCount??0}${R}`}),y.end();return}if(A==="GET"&&u==="/writer-api"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=z()?.writerExecutionBackend??Re(void 0),_=ye(e.layout.configPath),v=yr(_),L=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=o();we(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:mw({writerExecutionBackend:w,secrets:v,flashMessage:L})}));return}if(A==="POST"&&u==="/writer-api"){let b=await or(h),f=new URLSearchParams(b),w=f.get("writerExecutionBackend")?.trim()??"cli";Qh({configPath:e.layout.configPath,writerExecutionBackend:Re(w),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(A==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(A==="GET"&&u==="/history"){let b=o();we(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:ZP({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&u==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),_=NA({layout:e.layout}),v=HA(_),L=f.length>0?await Vn({layout:e.layout,query:f,limit:20}):Gn(e.layout).slice(-50).reverse(),R=L.map(I=>{let D=DA(_,I.id),re=D>0?` \xB7 used in ${D} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ie(I.createdAt)}">${ie($w(I.createdAt))}${I.source?` \xB7 ${ie(I.source)}`:""}${re}</div><pre>${ie(I.text)}</pre></article>`}).join(""),T=v.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${v.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ie(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";we(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ie(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${T}${R}${i4(f,L.length)}`}));return}A==="POST"&&await or(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return S.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Ft}`)}),S},Rl=e=>Mm(e).publicKeyRaw});var jm=l(()=>{"use strict";dx();ux();VD()});var KD={};St(KD,{runAgentWitchExternalLiveCli:()=>c4});var Fw,qD,l4,c4,JD=l(()=>{"use strict";Fw=m(require("node:fs")),qD=m(require("node:path"));Mn();V();te();jm();te();l4=e=>{let t=qD.default.join(e,"link-code.txt");if(!Fw.default.existsSync(t))return null;let r=Fw.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},c4=()=>{ze("agent-witch-live");let e=E(),t=M(),r=l4(e),o=Rl(t);El({layout:t,controllers:{getStatus:()=>{let n=Se(t);return{wsConnected:sa(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Xr(e)}}})}});var nr=W((gWe,ZD)=>{"use strict";var YD=["nodebuffer","arraybuffer","fragments"],XD=typeof Blob<"u";XD&&YD.push("blob");ZD.exports={BINARY_TYPES:YD,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:XD,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Cl=W((fWe,Dm)=>{"use strict";var{EMPTY_BUFFER:d4}=nr(),Uw=Buffer[Symbol.species];function u4(e,t){if(e.length===0)return d4;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new Uw(r.buffer,r.byteOffset,o):r}function QD(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function eH(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function p4(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Bw(e){if(Bw.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Uw(e):ArrayBuffer.isView(e)?t=new Uw(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Bw.readOnly=!1),t}Dm.exports={concat:u4,mask:QD,toArrayBuffer:p4,toBuffer:Bw,unmask:eH};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Dm.exports.mask=function(t,r,o,n,s){s<48?QD(t,r,o,n,s):e.mask(t,r,o,n,s)},Dm.exports.unmask=function(t,r){t.length<32?eH(t,r):e.unmask(t,r)}}catch{}});var oH=W((hWe,rH)=>{"use strict";var tH=Symbol("kDone"),Gw=Symbol("kRun"),Vw=class{constructor(t){this[tH]=()=>{this.pending--,this[Gw]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Gw]()}[Gw](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[tH])}}};rH.exports=Vw});var ys=W((yWe,aH)=>{"use strict";var kl=require("zlib"),nH=Cl(),m4=oH(),{kStatusCode:sH}=nr(),g4=Buffer[Symbol.species],f4=Buffer.from([0,0,255,255]),$m=Symbol("permessage-deflate"),sr=Symbol("total-length"),fs=Symbol("callback"),Nr=Symbol("buffers"),hs=Symbol("error"),Hm,qw=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Hm){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Hm=new m4(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[fs];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!n.client_max_window_bits));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){Hm.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){Hm.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?kl.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=kl.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[$m]=this,this._inflate[sr]=0,this._inflate[Nr]=[],this._inflate.on("error",y4),this._inflate.on("data",iH)}this._inflate[fs]=o,this._inflate.write(t),r&&this._inflate.write(f4),this._inflate.flush(()=>{let s=this._inflate[hs];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=nH.concat(this._inflate[Nr],this._inflate[sr]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[sr]=0,this._inflate[Nr]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?kl.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=kl.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[sr]=0,this._deflate[Nr]=[],this._deflate.on("data",h4)}this._deflate[fs]=o,this._deflate.write(t),this._deflate.flush(kl.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=nH.concat(this._deflate[Nr],this._deflate[sr]);r&&(s=new g4(s.buffer,s.byteOffset,s.length-4)),this._deflate[fs]=null,this._deflate[sr]=0,this._deflate[Nr]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};aH.exports=qw;function h4(e){this[Nr].push(e),this[sr]+=e.length}function iH(e){if(this[sr]+=e.length,this[$m]._maxPayload<1||this[sr]<=this[$m]._maxPayload){this[Nr].push(e);return}this[hs]=new RangeError("Max payload size exceeded"),this[hs].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[hs][sH]=1009,this.removeListener("data",iH),this.reset()}function y4(e){if(this[$m]._inflate=null,this[hs]){this[fs](this[hs]);return}e[sH]=1007,this[fs](e)}});var Ss=W((SWe,zm)=>{"use strict";var{isUtf8:lH}=require("buffer"),{hasBlob:S4}=nr(),A4=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function b4(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Kw(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function P4(e){return S4&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}zm.exports={isBlob:P4,isValidStatusCode:b4,isValidUTF8:Kw,tokenChars:A4};if(lH)zm.exports.isValidUTF8=function(e){return e.length<24?Kw(e):lH(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");zm.exports.isValidUTF8=function(t){return t.length<32?Kw(t):e(t)}}catch{}});var Qw=W((AWe,fH)=>{"use strict";var{Writable:w4}=require("stream"),cH=ys(),{BINARY_TYPES:_4,EMPTY_BUFFER:dH,kStatusCode:v4,kWebSocket:W4}=nr(),{concat:Jw,toArrayBuffer:L4,unmask:E4}=Cl(),{isValidStatusCode:R4,isValidUTF8:uH}=Ss(),Fm=Buffer[Symbol.species],et=0,pH=1,mH=2,gH=3,Yw=4,Xw=5,Um=6,Zw=class extends w4{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||_4[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[W4]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=et}_write(t,r,o){if(this._opcode===8&&this._state==et)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Fm(o.buffer,o.byteOffset+t,o.length-t),new Fm(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Fm(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case et:this.getInfo(t);break;case pH:this.getPayloadLength16(t);break;case mH:this.getPayloadLength64(t);break;case gH:this.getMask();break;case Yw:this.getData(t);break;case Xw:case Um:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[cH.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=pH:this._payloadLength===127?this._state=mH:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=gH:this._state=Yw}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Yw}getData(t){let r=dH;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&E4(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=Xw,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[cH.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===et&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=et;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=Jw(o,r):this._binaryType==="arraybuffer"?n=L4(Jw(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=et):(this._state=Um,setImmediate(()=>{this.emit("message",n,!0),this._state=et,this.startLoop(t)}))}else{let n=Jw(o,r);if(!this._skipUTF8Validation&&!uH(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Xw||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=et):(this._state=Um,setImmediate(()=>{this.emit("message",n,!1),this._state=et,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,dH),this.end();else{let o=t.readUInt16BE(0);if(!R4(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Fm(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!uH(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=et;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=et):(this._state=Um,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=et,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[v4]=n,i}};fH.exports=Zw});var r_=W((PWe,SH)=>{"use strict";var{Duplex:bWe}=require("stream"),{randomFillSync:C4}=require("crypto"),{types:{isUint8Array:k4}}=require("util"),hH=ys(),{EMPTY_BUFFER:T4,kWebSocket:x4,NOOP:I4}=nr(),{isBlob:As,isValidStatusCode:O4}=Ss(),{mask:yH,toBuffer:Vo}=Cl(),tt=Symbol("kByteLength"),M4=Buffer.alloc(4),Bm=8*1024,qo,bs=Bm,ht=0,N4=1,j4=2,e_=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=ht,this.onerror=I4,this[x4]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||M4,r.generateMask?r.generateMask(o):(bs===Bm&&(qo===void 0&&(qo=Buffer.alloc(Bm)),C4(qo,0,Bm),bs=0),o[0]=qo[bs++],o[1]=qo[bs++],o[2]=qo[bs++],o[3]=qo[bs++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[tt]!==void 0?a=r[tt]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(yH(t,o,d,s,a),[d]):(yH(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=T4;else{if(typeof t!="number"||!O4(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(k4(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[tt]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==ht?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):As(t)?(n=t.size,s=!1):(t=Vo(t),n=t.length,s=Vo.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[tt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};As(t)?this._state!==ht?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==ht?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):As(t)?(n=t.size,s=!1):(t=Vo(t),n=t.length,s=Vo.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[tt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};As(t)?this._state!==ht?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==ht?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[hH.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):As(t)?(a=t.size,c=!1):(t=Vo(t),a=t.length,c=Vo.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[tt]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};As(t)?this._state!==ht?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==ht?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[tt],this._state=j4,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(t_,this,a,n);return}this._bufferedBytes-=o[tt];let i=Vo(s);r?this.dispatch(i,r,o,n):(this._state=ht,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(D4,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[hH.extensionName];this._bufferedBytes+=o[tt],this._state=N4,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");t_(this,c,n);return}this._bufferedBytes-=o[tt],this._state=ht,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===ht&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][tt],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][tt],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};SH.exports=e_;function t_(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function D4(e,t,r){t_(e,t,r),e.onerror(t)}});var EH=W((wWe,LH)=>{"use strict";var{kForOnEventAttribute:Tl,kListener:o_}=nr(),AH=Symbol("kCode"),bH=Symbol("kData"),PH=Symbol("kError"),wH=Symbol("kMessage"),_H=Symbol("kReason"),Ps=Symbol("kTarget"),vH=Symbol("kType"),WH=Symbol("kWasClean"),ir=class{constructor(t){this[Ps]=null,this[vH]=t}get target(){return this[Ps]}get type(){return this[vH]}};Object.defineProperty(ir.prototype,"target",{enumerable:!0});Object.defineProperty(ir.prototype,"type",{enumerable:!0});var Ko=class extends ir{constructor(t,r={}){super(t),this[AH]=r.code===void 0?0:r.code,this[_H]=r.reason===void 0?"":r.reason,this[WH]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[AH]}get reason(){return this[_H]}get wasClean(){return this[WH]}};Object.defineProperty(Ko.prototype,"code",{enumerable:!0});Object.defineProperty(Ko.prototype,"reason",{enumerable:!0});Object.defineProperty(Ko.prototype,"wasClean",{enumerable:!0});var ws=class extends ir{constructor(t,r={}){super(t),this[PH]=r.error===void 0?null:r.error,this[wH]=r.message===void 0?"":r.message}get error(){return this[PH]}get message(){return this[wH]}};Object.defineProperty(ws.prototype,"error",{enumerable:!0});Object.defineProperty(ws.prototype,"message",{enumerable:!0});var xl=class extends ir{constructor(t,r={}){super(t),this[bH]=r.data===void 0?null:r.data}get data(){return this[bH]}};Object.defineProperty(xl.prototype,"data",{enumerable:!0});var H4={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Tl]&&n[o_]===t&&!n[Tl])return;let o;if(e==="message")o=function(s,i){let a=new xl("message",{data:i?s:s.toString()});a[Ps]=this,Gm(t,this,a)};else if(e==="close")o=function(s,i){let a=new Ko("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Ps]=this,Gm(t,this,a)};else if(e==="error")o=function(s){let i=new ws("error",{error:s,message:s.message});i[Ps]=this,Gm(t,this,i)};else if(e==="open")o=function(){let s=new ir("open");s[Ps]=this,Gm(t,this,s)};else return;o[Tl]=!!r[Tl],o[o_]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[o_]===t&&!r[Tl]){this.removeListener(e,r);break}}};LH.exports={CloseEvent:Ko,ErrorEvent:ws,Event:ir,EventTarget:H4,MessageEvent:xl};function Gm(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Vm=W((_We,RH)=>{"use strict";var{tokenChars:Il}=Ss();function Ot(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function $4(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&Il[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);d===44?(Ot(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&Il[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),Ot(r,e.slice(c,p),!0),d===44&&(Ot(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(Il[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(Il[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&Il[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);o&&(h=h.replace(/\\/g,""),o=!1),Ot(r,a,h),d===44&&(Ot(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let S=e.slice(c,p);return i===void 0?Ot(t,S,r):(a===void 0?Ot(r,S,!0):o?Ot(r,a,S.replace(/\\/g,"")):Ot(r,a,S),Ot(t,i,r)),t}function z4(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}RH.exports={format:z4,parse:$4}});var Ym=W((LWe,$H)=>{"use strict";var F4=require("events"),U4=require("https"),B4=require("http"),TH=require("net"),G4=require("tls"),{randomBytes:V4,createHash:q4}=require("crypto"),{Duplex:vWe,Readable:WWe}=require("stream"),{URL:n_}=require("url"),jr=ys(),K4=Qw(),J4=r_(),{isBlob:Y4}=Ss(),{BINARY_TYPES:CH,CLOSE_TIMEOUT:X4,EMPTY_BUFFER:qm,GUID:Z4,kForOnEventAttribute:s_,kListener:Q4,kStatusCode:eJ,kWebSocket:he,NOOP:xH}=nr(),{EventTarget:{addEventListener:tJ,removeEventListener:rJ}}=EH(),{format:oJ,parse:nJ}=Vm(),{toBuffer:sJ}=Cl(),IH=Symbol("kAborted"),i_=[8,13],ar=["CONNECTING","OPEN","CLOSING","CLOSED"],iJ=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Y=class e extends F4{constructor(t,r,o){super(),this._binaryType=CH[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=qm,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,r=[]):r=[r]),OH(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){CH.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new K4({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new J4(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[he]=this,s[he]=this,t[he]=this,n.on("conclude",cJ),n.on("drain",dJ),n.on("error",uJ),n.on("message",pJ),n.on("ping",mJ),n.on("pong",gJ),s.onerror=fJ,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",jH),t.on("data",Jm),t.on("end",DH),t.on("error",HH),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[jr.extensionName]&&this._extensions[jr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){qe(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),NH(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){a_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||qm,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){a_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||qm,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){a_(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[jr.extensionName]||(n.compress=!1),this._sender.send(t||qm,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){qe(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Y,"CONNECTING",{enumerable:!0,value:ar.indexOf("CONNECTING")});Object.defineProperty(Y.prototype,"CONNECTING",{enumerable:!0,value:ar.indexOf("CONNECTING")});Object.defineProperty(Y,"OPEN",{enumerable:!0,value:ar.indexOf("OPEN")});Object.defineProperty(Y.prototype,"OPEN",{enumerable:!0,value:ar.indexOf("OPEN")});Object.defineProperty(Y,"CLOSING",{enumerable:!0,value:ar.indexOf("CLOSING")});Object.defineProperty(Y.prototype,"CLOSING",{enumerable:!0,value:ar.indexOf("CLOSING")});Object.defineProperty(Y,"CLOSED",{enumerable:!0,value:ar.indexOf("CLOSED")});Object.defineProperty(Y.prototype,"CLOSED",{enumerable:!0,value:ar.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Y.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Y.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[s_])return t[Q4];return null},set(t){for(let r of this.listeners(e))if(r[s_]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[s_]:!0})}})});Y.prototype.addEventListener=tJ;Y.prototype.removeEventListener=rJ;$H.exports=Y;function OH(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:X4,protocolVersion:i_[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!i_.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${i_.join(", ")})`);let s;if(t instanceof n_)s=t;else try{s=new n_(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Km(e,u);return}let d=i?443:80,p=V4(16).toString("base64"),g=i?U4.request:B4.request,S=new Set,h;if(n.createConnection=n.createConnection||(i?lJ:aJ),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new jr({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=oJ({[jr.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!iJ.test(u)||S.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(u)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let u=n.path.split(":");n.socketPath=u[0],n.path=u[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let u=o&&o.headers;if(o={...o,headers:{}},u)for(let[A,b]of Object.entries(u))o.headers[A.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,u||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=g(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=g(n);n.timeout&&y.on("timeout",()=>{qe(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[IH]||(y=e._req=null,Km(e,u))}),y.on("response",u=>{let A=u.headers.location,b=u.statusCode;if(A&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){qe(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new n_(A,t)}catch{let _=new SyntaxError(`Invalid URL: ${A}`);Km(e,_);return}OH(e,f,r,o)}else e.emit("unexpected-response",y,u)||qe(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,A,b)=>{if(e.emit("upgrade",u),e.readyState!==Y.CONNECTING)return;y=e._req=null;let f=u.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){qe(e,A,"Invalid Upgrade header");return}let w=q4("sha1").update(p+Z4).digest("base64");if(u.headers["sec-websocket-accept"]!==w){qe(e,A,"Invalid Sec-WebSocket-Accept header");return}let _=u.headers["sec-websocket-protocol"],v;if(_!==void 0?S.size?S.has(_)||(v="Server sent an invalid subprotocol"):v="Server sent a subprotocol but none was requested":S.size&&(v="Server sent no subprotocol"),v){qe(e,A,v);return}_&&(e._protocol=_);let L=u.headers["sec-websocket-extensions"];if(L!==void 0){if(!h){qe(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=nJ(L)}catch{qe(e,A,"Invalid Sec-WebSocket-Extensions header");return}let T=Object.keys(R);if(T.length!==1||T[0]!==jr.extensionName){qe(e,A,"Server indicated an extension that was not requested");return}try{h.accept(R[jr.extensionName])}catch{qe(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[jr.extensionName]=h}e.setSocket(A,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Km(e,t){e._readyState=Y.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function aJ(e){return e.path=e.socketPath,TH.connect(e)}function lJ(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=TH.isIP(e.host)?"":e.host),G4.connect(e)}function qe(e,t,r){e._readyState=Y.CLOSING;let o=new Error(r);Error.captureStackTrace(o,qe),t.setHeader?(t[IH]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Km,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function a_(e,t,r){if(t){let o=Y4(t)?t.size:sJ(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${ar[e.readyState]})`);process.nextTick(r,o)}}function cJ(e,t){let r=this[he];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[he]!==void 0&&(r._socket.removeListener("data",Jm),process.nextTick(MH,r._socket),e===1005?r.close():r.close(e,t))}function dJ(){let e=this[he];e.isPaused||e._socket.resume()}function uJ(e){let t=this[he];t._socket[he]!==void 0&&(t._socket.removeListener("data",Jm),process.nextTick(MH,t._socket),t.close(e[eJ])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function kH(){this[he].emitClose()}function pJ(e,t){this[he].emit("message",e,t)}function mJ(e){let t=this[he];t._autoPong&&t.pong(e,!this._isServer,xH),t.emit("ping",e)}function gJ(e){this[he].emit("pong",e)}function MH(e){e.resume()}function fJ(e){let t=this[he];t.readyState!==Y.CLOSED&&(t.readyState===Y.OPEN&&(t._readyState=Y.CLOSING,NH(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function NH(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function jH(){let e=this[he];if(this.removeListener("close",jH),this.removeListener("data",Jm),this.removeListener("end",DH),e._readyState=Y.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[he]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",kH),e._receiver.on("finish",kH))}function Jm(e){this[he]._receiver.write(e)||this.pause()}function DH(){let e=this[he];e._readyState=Y.CLOSING,e._receiver.end(),this.end()}function HH(){let e=this[he];this.removeListener("error",HH),this.on("error",xH),e&&(e._readyState=Y.CLOSING,this.destroy())}});var BH=W((RWe,UH)=>{"use strict";var EWe=Ym(),{Duplex:hJ}=require("stream");function zH(e){e.emit("close")}function yJ(){!this.destroyed&&this._writableState.finished&&this.destroy()}function FH(e){this.removeListener("error",FH),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function SJ(e,t){let r=!0,o=new hJ({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(zH,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(zH,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",yJ),o.on("error",FH),o}UH.exports=SJ});var l_=W((CWe,GH)=>{"use strict";var{tokenChars:AJ}=Ss();function bJ(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&AJ[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}GH.exports={parse:bJ}});var ZH=W((TWe,XH)=>{"use strict";var PJ=require("events"),Xm=require("http"),{Duplex:kWe}=require("stream"),{createHash:wJ}=require("crypto"),VH=Vm(),Jo=ys(),_J=l_(),vJ=Ym(),{CLOSE_TIMEOUT:WJ,GUID:LJ,kWebSocket:EJ}=nr(),RJ=/^[+/0-9A-Za-z]{22}==$/,qH=0,KH=1,YH=2,c_=class extends PJ{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:WJ,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:vJ,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Xm.createServer((o,n)=>{let s=Xm.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=CJ(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=qH}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===YH){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Ol,this);return}if(t&&this.once("close",t),this._state!==KH)if(this._state=KH,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Ol,this):process.nextTick(Ol,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Ol(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",JH);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Yo(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Yo(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!RJ.test(s)){Yo(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Yo(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Ml(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=_J.parse(c)}catch{Yo(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let S=new Jo({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=VH.parse(p);h[Jo.extensionName]&&(S.accept(h[Jo.extensionName]),g[Jo.extensionName]=S)}catch{Yo(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(h,y,u,A)=>{if(!h)return Ml(r,y||401,u,A);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return Ml(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[EJ])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>qH)return Ml(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${wJ("sha1").update(r+LJ).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[Jo.extensionName]){let g=t[Jo.extensionName].params,S=VH.format({[Jo.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${S}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",JH),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Ol,this)})),a(p,n)}};XH.exports=c_;function CJ(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Ol(e){e._state=YH,e.emit("close")}function JH(){this.destroy()}function Ml(e,t,r,o){r=r||Xm.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Xm.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Yo(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Yo),e.emit("wsClientError",i,r,t)}else Ml(r,o,n,s)}});var kJ,TJ,xJ,IJ,OJ,MJ,QH,NJ,Nl,e$=l(()=>{kJ=m(BH(),1),TJ=m(Vm(),1),xJ=m(ys(),1),IJ=m(Qw(),1),OJ=m(r_(),1),MJ=m(l_(),1),QH=m(Ym(),1),NJ=m(ZH(),1),Nl=QH.default});var d_,u_,p_=l(()=>{"use strict";d_="AGENT_WITCH_EXTERNAL_BRIDGE",u_="AGENT_WITCH_EXTERNAL_LIVE"});var m_,t$=l(()=>{"use strict";m_=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var jJ,g_,r$=l(()=>{"use strict";p_();t$();jJ=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",g_=(e={})=>{let t=e.env??process.env,r=m_(t[d_]),o=m_(t[u_]);return{mode:jJ(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var o$=l(()=>{"use strict";p_()});var n$=l(()=>{"use strict";r$();o$()});var f_=l(()=>{"use strict"});var lr,jl=l(()=>{"use strict";lr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var _s,Xo,s$,HJ,h_,y_,i$,a$,S_,l$,Dl,A_=l(()=>{"use strict";_s=m(require("node:fs")),Xo=m(require("node:os")),s$=m(require("node:path"));f_();jl();HJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),h_=(e=Xo.default.hostname())=>s$.default.join(Xo.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),y_=e=>{if(!_s.default.existsSync(e))return null;try{let t=JSON.parse(_s.default.readFileSync(e,"utf8"));return!HJ(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},i$=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},a$=(e,t)=>{_s.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},S_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??h_(),o=y_(r);if(o!==null&&o.pid!==process.pid&&lr(o.pid)&&i$(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Xo.default.hostname(),macOsUsername:Xo.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return a$(r,n),{ok:!0}},l$=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??h_(),o=y_(r);return o!==null&&o.pid!==process.pid&&lr(o.pid)&&i$(o)?{ok:!1}:(a$(r,{hostname:Xo.default.hostname(),macOsUsername:Xo.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Dl=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??h_();y_(r)?.pid===process.pid&&_s.default.existsSync(r)&&_s.default.unlinkSync(r)}});var b_,Hl,$J,zJ,FJ,UJ,P_,c$=l(()=>{"use strict";b_=require("node:child_process"),Hl=m(require("node:path"));jl();Wd();$J=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),zJ=(e,t)=>{if($J(e)||!/\bnode\b/.test(e))return!1;let r=Hl.default.resolve(t),o=Hl.default.join(r,"app",Ys),n=Hl.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Ys||i==="agent-witch.ts")return e.includes(r);try{let a=Hl.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},FJ=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,b_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},UJ=(e,t,r)=>{let o=FJ(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||zJ(d,t)&&n.push(c)}return n},P_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,b_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=UJ(r,e.installDir,t),n=[];for(let s of o)if(lr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var $l,zl,d$,BJ,w_,u$=l(()=>{"use strict";$l=m(require("node:fs")),zl=m(require("node:path"));We();d$=(e,t)=>{!$l.default.existsSync(e)||$l.default.existsSync(t)||($l.default.mkdirSync(zl.default.dirname(t),{recursive:!0}),$l.default.renameSync(e,t))},BJ=e=>{if(e.profileEmail===null)return;let t=zl.default.join(e.installDir,ot);d$(zl.default.join(t,nn),e.mainLogPath),d$(zl.default.join(t,sn),e.errorLogPath)},w_=e=>{let t=M();e!==void 0&&t.installDir!==e||BJ(t)}});var p$=l(()=>{"use strict";pa();lp();lp();!Fe()&&to(__agentWitchImportMetaUrl)&&(async()=>{ze("agent-witch-wake-server");let e=await _o(),t=$t(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var m$=l(()=>{"use strict";p$()});var g$=l(()=>{"use strict";Zi()});var __,f$=l(()=>{"use strict";f_();m$();A_();g$();__=async(e={})=>{let t=e.skipInProcessBridge?null:await ap();$u();let r=setInterval(()=>{$u()},6e4),o=setInterval(()=>{if(!l$().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Fl,Zm,qJ,h$,y$,Qm,S$,A$,v_,b$,eg,P$=l(()=>{"use strict";Fl=m(require("node:fs")),Zm=m(require("node:path")),qJ="pending-run-inputs.json",h$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),y$=e=>{let t=e.profileEmail?Zm.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Zm.default.join(t,qJ)},Qm=e=>{let t=y$(e);if(!Fl.default.existsSync(t))return{};try{let r=JSON.parse(Fl.default.readFileSync(t,"utf8"));return h$(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!h$(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},S$=(e,t)=>{let r=y$(e);Fl.default.mkdirSync(Zm.default.dirname(r),{recursive:!0}),Fl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},A$=e=>Object.values(Qm(e)),v_=(e,t)=>Qm(e)[t]!==void 0,b$=(e,t)=>{let r=Qm(e);r[t.agentRunId]=t,S$(e,r)},eg=(e,t)=>{let r=Qm(e);delete r[t],S$(e,r)}});var tg=l(()=>{"use strict";ce()});var w$=l(()=>{"use strict";ce()});var rg=l(()=>{"use strict";ce()});var og=l(()=>{"use strict";ce()});var Ul=l(()=>{"use strict";ce()});var KJ,JJ,Bl,W_=l(()=>{"use strict";lt();tg();w$();rg();og();Ul();KJ={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},JJ={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Bl=e=>{if(!ae(e.writerAgent))return"the selected writer";let t=Ue(e.writerAgent);if(Re(e.writerExecutionBackend)==="api"&&t!==null){let r=je(ye(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=yi(t,r.model);return`${JJ[t]} model ${o}`}}return KJ[e.writerAgent]}});var YJ,XJ,_$,v$,W$=l(()=>{"use strict";YJ=/"input_tokens"\s*:\s*(\d+)/,XJ=/"output_tokens"\s*:\s*(\d+)/,_$=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},v$=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=_$(YJ.exec(t)),o=_$(XJ.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var ng=l(()=>{"use strict";ut()});var Gl,sg,ZJ,L_,L$,E$,R$,E_,C$=l(()=>{"use strict";Gl=m(require("node:fs")),sg=m(require("node:path"));ng();ZJ="run-completion-outbox.json",L_=e=>{let t=e.profileEmail?sg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return sg.default.join(t,ZJ)},L$=e=>{let t=L_(e);if(!Gl.default.existsSync(t))return[];try{let r=JSON.parse(Gl.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},E$=(e,t)=>{Gl.default.mkdirSync(sg.default.dirname(L_(e)),{recursive:!0}),Gl.default.writeFileSync(L_(e),JSON.stringify(t,null,2),"utf8")},R$=(e,t)=>{let r=[...L$(e).filter(o=>o.runId!==t.runId),t];E$(e,r)},E_=async e=>{if(e.cloudApi===null)return;let t=L$(e.layout);if(t.length===0)return;let r=[];for(let o of t)await Vi(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);E$(e.layout,r)}});var k$=l(()=>{"use strict"});var R_,Vl,e6,Zo,T$=l(()=>{"use strict";k$();R_=new Map,Vl=e=>{let t=R_.get(e);t!==void 0&&(clearInterval(t),R_.delete(e))},e6=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},Zo=(e,t,r,o={})=>{Vl(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Vl(t);return}let i=o.onTick?.()??{};e6(e,t,n,i)};s(),R_.set(t,setInterval(s,15e3))}});var x$=l(()=>{"use strict";ut()});var I$,O$=l(()=>{"use strict";x$();I$=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Je(t)}});var C_,ql,cr,k_,Mt,M$,ig=l(()=>{"use strict";C_=new Set,ql=new Map,cr=(e,t)=>{if(t.length===0)return;let r=ql.get(e)??[];r.push(t),ql.set(e,r)},k_=e=>{C_.add(e);let t=ql.get(e)??[];return ql.delete(e),t},Mt=e=>C_.has(e),M$=e=>{C_.delete(e),ql.delete(e)}});var vs,N$,j$,D$=l(()=>{"use strict";vs=m(require("node:path")),N$=require("node:url");eo();j$=()=>{if(Fe()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?vs.default.dirname(vs.default.resolve(e)):vs.default.dirname(vs.default.resolve(__filename))}return vs.default.dirname((0,N$.fileURLToPath)(__agentWitchImportMetaUrl))}});var H$,$$,z$,F$,$e,Ws,U$,B$,Ls,T_,x_,I_,G$,O_,V$,ag=l(()=>{"use strict";H$=require("node:crypto"),$$=m(require("node:fs")),z$=m(require("node:path")),F$=require("node:url");jl();eo();D$();$e=new Map,U$=async()=>{if(Ws!==void 0)return Ws;try{if(Fe()){let e=j$(),t=z$.default.join(e,"deps","node-pty","lib","index.js");if($$.default.existsSync(t)){let r=await import((0,F$.pathToFileURL)(t).href);return Ws=r,r}}return Ws=await import("node-pty"),Ws}catch{return Ws=null,null}},B$=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Ls=(e,t,r)=>{let o=$e.get(e);if(o!==void 0){$e.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},T_=(e,t)=>{let r=$e.get(e);return r===void 0?!1:(r.pty.write(t),!0)},x_=(e,t,r)=>{let o=$e.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},I_=e=>{for(let t of $e.values())if(!(t.mode!=="agent"||t.runId!==e))return lr(t.pty.pid);return!1},G$=e=>{for(let[t,r]of $e.entries())if(!(r.mode!=="agent"||r.runId!==e)){$e.delete(t);try{r.pty.kill()}catch{}return!0}return!1},O_=async e=>{let t=await U$();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;$e.get(e.shellSessionId)!==void 0&&Ls(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return $e.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{B$(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{$e.get(e.shellSessionId)?.pty===n&&($e.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},V$=async e=>{let t=e.shellSessionId??(0,H$.randomUUID)(),r=await U$();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return $e.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{B$(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{$e.get(t)?.pty===o&&($e.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var lg,q$,K$=l(()=>{"use strict";lg="[[AWAITING_INPUT]]",q$=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",lg,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Kl,J$,cg=l(()=>{"use strict";K$();Kl=e=>{let t=e.indexOf(lg);if(t<0)return null;let o=e.slice(t+lg.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},J$=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",q$].join(`
`)});var Y$,X$=l(()=>{"use strict";ig();ag();cg();Y$=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Mt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}cr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await V$({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Kl(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var Z$,Q$,ez,dr,dg=l(()=>{"use strict";Z$=require("node:child_process"),Q$=m(require("node:fs")),ez=m(require("node:path"));Wd();dr=(e,t)=>{let r=ez.default.join(e,"app",VL,"ensure-writer.sh");return Q$.default.existsSync(r)?new Promise((o,n)=>{let s=(0,Z$.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var tz,Qo,Yl,ug,M_,Jl,pg,mg,N_,j_,t6,Es,r6,o6,D_,H_=l(()=>{"use strict";tz=require("node:child_process");lt();dg();rg();tg();Ul();og();Qo=new Map,Yl=e=>e==="cursor"||e==="antigravity",ug=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",M_=e=>Qo.get(e)?.warmed===!0,Jl=e=>{let t=Qo.get(e);Qo.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},pg=e=>Qo.get(e)?.conversationStarted===!0,mg=e=>{let t=Qo.get(e);Qo.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},N_=e=>{Qo.delete(e)},j_=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",t6={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Es=e=>`${t6[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,r6=(e,t,r,o)=>new Promise(n=>{let s=Dd(t,r),i=[],a=(0,tz.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),o6=(e,t)=>{let r=Es(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},D_=async e=>{if(!ae(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=Ue(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=ye(e.runConfig.layout.configPath);return je(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Jl(e.writerAgent),{exitCode:0,output:Es(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await dr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Yl(e.writerAgent)&&Jl(e.writerAgent);let t=await r6(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?o6(e.writerAgent,t.output):Es(e.writerAgent)}}});var en,$_=l(()=>{"use strict";en={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var rz,n6,s6,oz,i6,z_,nz=l(()=>{"use strict";$_();rz=/you(?:'|')ve hit your session limit/i,n6=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],s6=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,oz=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},i6=e=>{let t=s6.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},z_=e=>{let t=e.trim();if(t.length===0)return null;if(rz.test(t))return{code:en.SESSION_LIMIT,resetHint:i6(t),matchedLine:oz(t,rz)};for(let r of n6)if(r.test(t))return{code:en.PROVIDER_QUOTA,resetHint:null,matchedLine:oz(t,r)};return null}});var gg,fg,F_,U_=l(()=>{"use strict";gg="[[AGENT_RUN_WRITER_EXECUTION]]",fg="cli-writer-api-key-missing",F_="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var B_=l(()=>{"use strict";U_()});var sz=l(()=>{"use strict";B_()});var hg=l(()=>{"use strict";$_();nz();U_();B_();sz()});var yg,iz=l(()=>{"use strict";yg={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var az,lz=l(()=>{"use strict";az="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var cz,dz=l(()=>{"use strict";hg();lz();cz=e=>e.code===en.SESSION_LIMIT?az:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var uz,pz=l(()=>{"use strict";hg();iz();dz();uz=e=>{let t=z_(e.output);return t!==null?{status:yg.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:cz(t)}:{status:e.exitCode===0?yg.COMPLETED:yg.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var G_,HEe,mz=l(()=>{"use strict";G_={OPEN:"open",APPROVAL:"approval"},HEe=G_.APPROVAL});var Rs,Sg,gz,c6,fz,hz,yz,Xl,V_,q_=l(()=>{"use strict";Rs=m(require("node:fs")),Sg=m(require("node:path")),gz="runs",c6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fz=e=>{let t=e.profileEmail!==null?Sg.default.join(e.installDir,"profiles",e.profileEmail,gz):Sg.default.join(e.installDir,gz);return Rs.default.mkdirSync(t,{recursive:!0}),t},hz=(e,t)=>Sg.default.join(fz(e),`${t}.json`),yz=(e,t)=>{Rs.default.writeFileSync(hz(e,t.id),JSON.stringify(t,null,2))},Xl=(e,t)=>{let r=hz(e,t);if(!Rs.default.existsSync(r))return null;try{let o=JSON.parse(Rs.default.readFileSync(r,"utf8"));return!c6(o)||typeof o.id!="string"?null:o}catch{return null}},V_=e=>{let t=fz(e),r=Rs.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Xl(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var d6,Sz,Az=l(()=>{"use strict";pz();mz();q_();d6=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=uz({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:G_.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},Sz=(e,t)=>{let r=d6(t);return yz(e,r),r}});var bz=l(()=>{"use strict";Tm()});var Pz,wz=l(()=>{"use strict";hg();Pz=()=>[gg,`agentRunWriterExecutionBackend=${fg}`,`agentRunWriterExecutionReasonCode=${F_}`].join(`
`)});var Dr,Ag=l(()=>{"use strict";Dr=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var K_,u6,p6,_z,vz=l(()=>{"use strict";K_=e=>e.toLocaleString("en-US"),u6=e=>e<.01?e.toFixed(4):e.toFixed(3),p6=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${u6(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${K_(e.inputTokens)} in / ${K_(e.outputTokens)} out (${K_(e.totalTokens)} total)`,t].join(`
`)},_z=(e,t)=>{if(t===void 0)return e;let r=p6(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Wz=l(()=>{"use strict";ce()});var Ez,Zl,me,J_,bg,Lz,m6,g6,Rz,Cz,kz,Ql,Y_,X_,Z_,Tz,f6,rt,ec,Hr,xz,h6,y6,Pg,Q_,ev,tv,Iz=l(()=>{"use strict";Ez=require("node:child_process");ce();lt();P$();Sl();W_();W$();Hd();C$();ng();T$();jl();O$();ig();ag();cg();X$();H_();Az();bz();wz();Ag();vz();fn();Wz();Ul();ti();cg();Zl=new Map,me=new Map,J_=new Set,bg=new Map,Lz=e=>{e!==void 0&&!bg.has(e)&&bg.set(e,Date.now())},m6=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Mt(t)){rt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}cr(t,n)},g6=(e,t,r,o,n)=>{if(!ty(e,n))return;let s=`${Pz()}
`;m6(t,r,o,s);let i=me.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},Rz=130,Cz=`

Stopped by user.`,kz=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:Dr(e)},Ql=null,Y_=e=>{Ql=e},X_=(e,t)=>{if(Ql===null)return;let r=JP(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||Qy(Ql,t,r)},Z_=async e=>{await E_({layout:e,cloudApi:Ql})},Tz=e=>{let t=Zl.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:lr(t.pid)},f6=e=>le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),rt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},ec=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=dn(s),c=me.get(r);if(a!==null&&c!==void 0){let d=rE(a),p=Tz(r)||I_(r);d!==null&&!p&&Hr(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return tE(a)}}),Hr=(e,t,r,o,n,s,i,a)=>{let c=wn(s,a),d=n,p=_z(c.output,c.llmUsage);if(r!==void 0){let S=bg.get(r);bg.delete(r),S!==void 0&&qP({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let h=v$(c.llmUsage,p);h!==null&&Bj({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&J_.has(r)&&(J_.delete(r),d=Rz,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${Cz}`:"Stopped by user.");let g=r!==void 0?JP(e.layout.reportsDir,r):null;if(r!==void 0){Vl(r),Wi(e.layout,r),Mt(r)&&(rt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),M$(r));let S=me.get(r);zj({reportsDir:e.layout.reportsDir,agentRunId:r,input:Dr(i),output:p,...S!==void 0?{writerLabel:Bl({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&Cm({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),Sz(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),R$(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),E_({layout:e.layout,cloudApi:Ql}),me.delete(r),Zl.delete(r),eg(e.layout,r)}rt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),di(e.layout)},xz=(e,t,r,o,n,s,i)=>{let a=me.get(r),c=a?.accumulatedOutput??s;b$(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),Zo(t,r,()=>v_(e.layout,r),ec(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),rt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},h6=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(n===void 0||h.length===0)){if(Mt(n)){rt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}cr(n,h)}};if(n!==void 0){let h=me.get(n);Zl.set(n,t),me.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),rt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),Zo(r,n,()=>Tz(n),ec(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let g=a==="claude-cli",S=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(g?S.push(y):(c.push(y),p(y)),d||n===void 0)return;let u=Kl(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let A=me.get(n),b=[A?.accumulatedOutput??"",u.partialOutput].filter(f=>f.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=b),Zl.delete(n),xz(e,r,n,o,u.question,b,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;mg(a);let y=n!==void 0?me.get(n):void 0,u=g?wn(S.join("")):{output:c.join("").trim(),llmUsage:void 0},A=g?c.join("").trim():"",b=[u.output.trim(),A].filter(w=>w.length>0).join(`
`);g&&u.output.trim().length>0&&p(u.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;Hr(e,r,n,o,h??-1,f,s,u.llmUsage)}),t.on("error",h=>{d||Hr(e,r,n,o,-1,h.message,s)})},y6=(e,t,r,o,n,s,i,a,c)=>{let d=kz(r,c);s!==void 0&&(me.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),rt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),Zo(n,s,()=>me.has(s),ec(e,n,s,o,i,a))),Pi(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Mt(s)){rt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}cr(s,g)}}).then(g=>{mg(t),Hr(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let S=g instanceof Error?g.message:String(g);Hr(e,n,s,o,-1,S,r)})},Pg=(e,t,r,o,n,s,i,a,c,d,p,g)=>{let S=kz(r,p);if(ci(e.layout),co(e,t)){Lz(s),y6(e,t,r,o,n,s,c,d,S);return}let h=_t(t,r,f6(e),i);if(h===null){Hr(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}Lz(s);let y=I$({workspace:e.workspace,projectFolderPath:c}),u=()=>{let A=(0,Ez.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:g??process.env});h6(e,A,n,o,s,r,S,t)};if(s===void 0){u();return}me.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:me.get(s)?.accumulatedOutput??""}),g6(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&ei({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Zo(n,s,()=>me.has(s),ec(e,n,s,o,c,d)),Y$({socket:n,sendMessage:rt,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:A=>{a!==void 0&&Ls(a,w=>{rt(n,w)},o);let b=me.get(s),f=[b?.accumulatedOutput??"",A.partialOutput].filter(w=>w.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=f),xz(e,n,s,o,A.question,f,r)},onFinished:(A,b)=>{mg(t);let f=wn(b),w=me.get(s),_=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${f.output}`.trim():f.output;Hr(e,n,s,o,A,_,r,f.llmUsage)}}).then(A=>{if(!A){u();return}Zo(n,s,()=>I_(s),ec(e,n,s,o,c,d))}).catch(A=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",A instanceof Error?A.message:A),u()})},Q_=(e,t,r,o)=>{eg(e.layout,t.agentRunId),t.shellSessionId!==void 0&&rt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=J$(t),s=me.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Pg(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},ev=(e,t)=>{for(let r of A$(e.layout))me.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:Dr(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Zo(t,r.agentRunId,()=>v_(e.layout,r.agentRunId),{awaitingInput:!0}),rt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},tv=(e,t,r,o)=>{let n=me.get(r);if(n===void 0)return!1;J_.add(r),Vl(r);let s=Zl.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(G$(r))return!0;eg(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${Cz}`:"Stopped by user.";return Hr(e,t,r,o,Rz,i,n.originalPrompt),!0}});var S6,rv,Oz=l(()=>{"use strict";Ci();S6=()=>`http://127.0.0.1:${ct()}/restart`,rv=async()=>{try{let e=await fetch(S6(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Mz=l(()=>{"use strict";ya()});var Nz=l(()=>{"use strict";vw()});var jz,Dz=l(()=>{"use strict";jz=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var tc,A6,ov,Hz=l(()=>{"use strict";V();te();Mz();DS();Nz();Dz();fn();tc=(e,t)=>{Lr(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},A6=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(yh(),hh)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},ov=async e=>{let t=Le(e.layout.installDir)?.bundleVersion??null;if(!jz({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(at(e.layout)){ui({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),tc(e.layout,{summary:r,action:"install-bundle-update-start"}),Ht({launchAgentLabel:oe(e.layout.installDir),installDir:e.layout.installDir});let o=await gs({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),tc(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await A6();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),tc(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),tc(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),tc(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var b6,nv,$z=l(()=>{"use strict";b6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nv=e=>{if(!b6(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var sv,iv,zz=l(()=>{"use strict";SS();AS();sv=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Qi({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},iv=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Kt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var Fz,P6,w6,_6,rc,Uz=l(()=>{"use strict";Fz=m(require("node:os"));We();P6="Default",w6=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),_6=e=>{let t=Fz.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},rc=()=>{let e=M(),t=gd(e),r=w6(P6);return`${_6(t)}/${r.length>0?r:"project"}`}});var Bz=l(()=>{"use strict";ya()});var Gz,av,Vz=l(()=>{"use strict";Bz();Gz=!1,av=e=>{Gz||(Gz=!0,process.on("uncaughtException",t=>{Wo(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;Wo(e,{kind:"crash",message:r,stack:o})}))}});var qz,v6,lv,Kz=l(()=>{"use strict";qz=require("node:child_process");dg();lt();rg();tg();Ul();og();v6=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,qz.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},lv=async e=>{if(!ae(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=Ue(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=ye(e.layout.configPath),n=je(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await dr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await v6(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var cv,Jz=l(()=>{"use strict";cv=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var Yz,dv,Xz=l(()=>{"use strict";Yz=require("node:crypto"),dv=()=>(0,Yz.randomUUID)()});var Cs,Zz,wg=l(()=>{"use strict";Cs="[[WORKING_ESTIMATE]]",Zz=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Cs,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var Qz,eF=l(()=>{"use strict";Qz=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var W6,tF,rF=l(()=>{"use strict";wg();W6=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,tF=e=>{if(!e.includes(Cs))return null;let t=null;for(let r of e.matchAll(W6)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var L6,uv,oF=l(()=>{"use strict";rF();L6=/^(\d{1,6})\b/,uv=e=>{let t=tF(e);if(t!==null)return t;let r=L6.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var E6,R6,C6,_g,pv=l(()=>{"use strict";lt();ga();E6="http://127.0.0.1:11434",R6=45e3,C6=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},_g=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||E6,o=t===void 0?(await mt({commands:le({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(R6)});return n.ok?C6(await n.json()):null}catch{return null}}});var mv,gv,fv,nF=l(()=>{"use strict";ti();wg();Ag();eF();oF();Sl();pv();mv=async e=>{let t=Dr(e.wrappedPrompt),r=Fj(e.reportsDir);return{estimateOutput:await _g(Zz(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},gv=e=>{let t=uv(e.estimateOutput);t!==null&&wm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},fv=e=>{let t=uv(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=Qz(t);return Qs({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Pt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),wm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var vg,sF,hv=l(()=>{"use strict";vg="[[WORKING_TOKEN_ESTIMATE]]",sF=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",vg,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var iF,k6,aF,lF=l(()=>{"use strict";hv();iF=/^(\d{1,8})\b/,k6=e=>{let t=e.indexOf(vg);if(t<0)return null;let r=e.slice(t+vg.length).trim(),o=iF.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},aF=e=>{let t=k6(e);if(t!==null)return t;let r=iF.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var yv,Sv,cF=l(()=>{"use strict";hv();Ag();lF();Sl();pv();yv=async e=>{let t=Dr(e.wrappedPrompt),r=Gj(e.reportsDir);return{estimateOutput:await _g(sF(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},Sv=e=>{let t=aF(e.estimateOutput);return t===null?null:(Uj({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var dF=l(()=>{"use strict";A_();c$();u$();f$();Ci();Iz();dg();lt();q_();ig();Oz();ES();Hz();fn();$z();zz();ng();Uz();Vz();Kz();Ld();Jz();Xz();wg();ti();nF();cF();W_();ga();ag();H_()});var uF={};St(uF,{buildContinuationPromptWithContext:()=>I6});var T6,x6,I6,pF=l(()=>{"use strict";T6=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,x6=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),I6=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=x6(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${T6(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var mF={};St(mF,{readHarnessExportSets:()=>M6});var oc,Av,Wg,O6,M6,gF=l(()=>{"use strict";oc=m(require("node:fs")),Av=m(require("node:path"));We();Wg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),O6=e=>{if(!oc.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(oc.default.readFileSync(e.harnessManifestPath,"utf8"));if(Wg(t))return t}catch{return null}return null},M6=(e,t)=>{let r=M(t),o=O6(r);if(o===null)return[];let n=Wg(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!Wg(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!Wg(p))continue;let g=typeof p.path=="string"?p.path:void 0,S=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(g===void 0||S.length===0||h.length===0||y.length===0)continue;let u=g.startsWith("shared/")?Av.default.join(r.harnessRootDir,g):Av.default.join(r.harnessSetsDir,i,g);oc.default.existsSync(u)&&d.push({id:S,kind:h,title:y,content:oc.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var Lv,Pv,ks,fF,N6,hF,yF,bv,SF,wv,_v,vv,X,G,Wv,j6,nc,D6,H6,$6,z6,F6,U6,B6,G6,sc,AF=l(()=>{"use strict";Lv=require("node:child_process"),Pv=m(require("node:fs")),ks=m(require("node:os"));e$();V();te();Mn();Nw();n$();ce();Ke();ya();KA();jm();Tm();ut();fo();JS();Ut();dF();fF=3e4,N6=3e4,hF=new Map,yF=new Map,bv=new Map,SF=new Map,wv=new Map,_v=new Map,vv=new Map,X=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G=(e,t,r)=>{e.readyState===Nl.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Lr(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),cp(r,"out",t)))},Wv=e=>e,j6=e=>{if(!Pv.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Pv.default.readFileSync(e.harnessManifestPath,"utf8"));if(X(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},nc=(e,t)=>{let r=j6(t);r!==null&&G(e,{type:"harness.manifest.report",payload:{hostname:ks.default.hostname(),manifest:r}})},D6=async(e,t,r,o,n,s,i=!1,a,c,d,p,g)=>{let S=g?.trim()??"";if(!ae(t)){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=Bl({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await mt({commands:le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?mv({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=s!==void 0?yv({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=Yl(t)&&!M_(t);if(b){try{await dr(e.layout.installDir,t)}catch($){let _e=$ instanceof Error?$.message:String($);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_e}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Jl(t)}else if(!Yl(t))try{await dr(e.layout.installDir,t)}catch($){let _e=$ instanceof Error?$.message:String($);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_e}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=_i(d,rc,g);if(f===null){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Be({projectFolderPath:f,...S.length>0?{projectId:S}:{}}),i||_l(e.layout,t,f);let w=km({sessionContinuation:i,supportsWriterSessionContinuation:ug(t),isWriterConversationStarted:pg(t)}),_=i&&w==="first"?wl(e.layout,t,f):null,v=_!==null?ms(e.layout,_):null,L=v!==null&&v.turns.length>0,R=dw({sessionContinuation:i,supportsWriterSessionContinuation:ug(t),isWriterConversationStarted:pg(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:L,userPromptCharacterCount:r.length}),T=r;if(R.continuationStrategy==="source_run_seed"){let $=typeof c=="string"&&c.length>0?Xl(e.layout,c):null;if($!==null){let{buildContinuationPromptWithContext:_e}=await Promise.resolve().then(()=>(pF(),uF));T=_e({priorPrompt:$.prompt,priorOutput:$.resultOutput??"",userMessage:r})}}else R.continuationStrategy==="transcript_seed"&&v!==null&&v.turns.length>0&&(T=Wm({priorTurns:v.turns,userMessage:r}));let I=R.ragLimit>0?await Vn({layout:e.layout,query:T,limit:R.ragLimit,minScore:R.ragMinScore,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],D=R.ragLimit>0&&f.trim().length>0?await VA({layout:e.layout,query:T,limit:2,minScore:.32,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],re=R.injectMemory?ew(e.layout,f,S.length>0?S:void 0):[],B=`${rw(re,R.memoryEntryLimit)}${UA(I)}${qA(D)}${T}`,q=p?.trim()??(s!==void 0&&f.trim().length>0?dv():void 0);if(s!==void 0&&q!==void 0&&q.length>0&&f.trim().length>0){ei({reportKey:q,agentRunId:s,userSummary:"Working on your Mac\u2026"});let $=B;u!==null&&u.then(_e=>{if(_e===null)return;let yt=fv({estimateOutput:_e.estimateOutput??"",reportKey:q,agentRunId:s,reportsDir:e.layout.reportsDir,task:_e.task,writerLabel:_e.writerLabel,embedding:_e.embedding});if(yt.estimateSeconds===null)return;X_(e.layout.reportsDir,s);let ic=`${Cs}
${yt.estimateSeconds}
`;if(Mt(s)){G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:ic},requestId:o});return}cr(s,ic)}).catch(()=>{}),B=cv($),B=Ff(B,{agentRunId:s,reportKey:q,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then($=>{$!==null&&gv({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel,embedding:$.embedding})}).catch(()=>{}),s!==void 0&&A!==null&&A.then($=>{$!==null&&Sv({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel})}).catch(()=>{});let $r=s!==void 0&&vv.get(s)===!0;if(s!==void 0&&f.trim().length>0){let $=await Du(f);_v.set(s,$),q!==void 0&&q.length>0&&wv.set(s,q)}Pg(e,t,B,o,Wv(n),s,{sessionTurn:R.sessionTurn},a,f,q,r,Jh(e.layout,s,$r)),b&&s!==void 0&&G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:j_(t)},requestId:o})},H6=async(e,t,r,o,n)=>{let s=(i,a)=>{G(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await D_({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,G(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=ae(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Es(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},$6=(e,t,r)=>new Promise(o=>{if(!ae(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=_t(t,r,le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,Lv.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),z6=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;G(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Wt(t.bundle),s=X(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=Ee(e.wsUrl)??zt,g=await My({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=go({bundle:i,layout:e.layout});return G(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&nc(o,e.layout),!0},F6=async(e,t,r,o)=>{if(await z6(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(G(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!ae(n)){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}ci(e.layout);let i=await(async()=>{try{await dr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return $6(e,n,s)})().finally(()=>{di(e.layout)});G(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),nc(o,e.layout)},U6=e=>{let t=1e3*2**e;return Math.min(N6,t)},B6=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(at(e.layout)){ch(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,rv().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(u,A="system.ack")=>{if(!t.selfUpdateInFlight){if(at(e.layout)){ui({layout:e.layout,remoteBundleVersion:u,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,ov({layout:e.layout,remoteBundleVersion:u,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let u=Se(e.layout);u!==null&&Me(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===Nl.OPEN||u.readyState===Nl.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,fF)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=U6(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},g=u=>{s();let A=()=>{let b=si(e.layout.installDir),f=ct();G(u,{type:"agent.heartbeat",payload:{hostname:ks.default.hostname(),macOsUsername:ks.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,fF)},S=(u,A)=>{if(typeof u.type!="string")return;if(KS(u)){t.stopped=!0,s(),a(),c(),BS({layout:e.layout}).finally(()=>{Dl(),process.exit(0)});return}Lr(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),cp(e.layout,"in",u);let b=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&X(u.payload)){let f=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",_=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",v=typeof u.payload.challenge=="string"?u.payload.challenge:"",L=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!Mw({serverPublicKey:f,origin:w,devicePublicKey:_,challenge:v,serverAttestation:L})){t.wakeError="Server attestation verification failed",Lr(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&X(u.payload)){let f=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Lr(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),lv({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{G(A,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&X(u.payload)){let f=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(u.type==="system.ack"){Gu(e.layout,{wsUrl:e.wsUrl});let f=X(u.payload)?u.payload:null,w=nv(f);w!==null&&o(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&X(u.payload)&&sv(u.payload),u.type==="automations.run"&&X(u.payload)&&iv(u.payload),u.type==="terminal.stream.accepted"&&X(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"";if(f.length>0){let w=k_(f);for(let _ of w)G(A,{type:"terminal.stream.chunk",payload:{runId:f,chunk:_},requestId:b})}}if(u.type==="agent.agentRun.list"&&G(A,{type:"dashboard.agentRun.list.result",payload:{runs:V_(e.layout)},requestId:b}),u.type==="agent.agentRun.get"&&X(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"",w=f.length>0?Xl(e.layout,f):null;G(A,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:b})}if(u.type==="command.claude.run"&&X(u.payload)){let f=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&ae(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",_=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,v=u.payload.sessionContinuation===!0,L=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,R=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,T=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=_i(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,rc,T),D=Fh(u.payload.compositionSnapshot),re=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${v?"continue":"first"})\u2026`),I===null){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(D!==null){let B=Bh(e.layout,D);if(B!==null){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:B,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(_!==void 0){let q=Vh(e.layout,_,D);if(!q.ok){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:q.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}vv.set(_,D.entries.some($r=>$r.scope==="run"))}}_!==void 0&&R!==void 0&&hF.set(_,R),_!==void 0&&(yF.set(_,I),T!==void 0&&T.trim().length>0&&bv.set(_,T.trim()),SF.set(_,f.trim()),Be({projectFolderPath:I,...T!==void 0&&T.trim().length>0?{projectId:T.trim()}:{}})),D6(e,w,f.trim(),b,A,_,v,R,L,I,re,T)}}if(u.type==="shell.session.open"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,_=typeof u.payload.rows=="number"?u.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),O_({shellSessionId:f,cwd:e.workspace,cols:w,rows:_,send:v=>{G(A,v)},requestId:b}))}if(u.type==="shell.session.close"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";f.length>0&&Ls(f,w=>{G(A,w)},b)}if(u.type==="shell.input"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";f.length>0&&w.length>0&&T_(f,w)}if(u.type==="shell.resize"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,_=typeof u.payload.rows=="number"?u.payload.rows:0;f.length>0&&w>0&&_>0&&x_(f,w,_)}if(u.type==="command.writer.session.end"&&X(u.payload)){let f=u.payload.writerAgent;typeof f=="string"&&ae(f)&&(N_(f),Rm(e.layout,f))}if(u.type==="command.writer.session.start"&&X(u.payload)){let f=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof f=="string"&&ae(f)&&w.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),H6(e,f,w,b,A))}if(u.type==="command.claude.stop"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),tv(e,Wv(A),f,b))}if(u.type==="command.claude.input_respond"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",_=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",v=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",L=typeof u.payload.question=="string"?u.payload.question:"";f.length>0&&w.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),Q_(e,{agentRunId:f,originalPrompt:_,partialOutput:v,question:L,response:w,shellSessionId:hF.get(f)},b,Wv(A)))}if(u.type==="dispatch.approval.required"&&X(u.payload)){let f=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${w}`),process.platform==="darwin"&&(0,Lv.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&X(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),F6(e,u.payload,b,A)),u.type==="harness.export.request"&&X(u.payload)){let f=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,_=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(v=>typeof v=="string"):[];f.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:v}=await Promise.resolve().then(()=>(gF(),mF)),L=v(_,e.email);G(A,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:f,...w!==void 0?{targetDeviceId:w}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(u.type==="harness.manifest.request"&&nc(A,e.layout),u.type==="command.claude.result"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",_=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,v=_i(f!==void 0?yF.get(f):void 0,rc),L=f!==void 0?bv.get(f):void 0,R=f!==void 0?SF.get(f)??"":"",T=cS({exitCode:_,output:w});if(T&&v!==null&&FA({layout:e.layout,text:w,source:f??"command.claude.result",projectFolderPath:v,...L!==void 0?{projectId:L}:{}}),_!=null&&_!==0&&w.trim().length>0&&v!==null&&(jA({layout:e.layout,errorText:w,projectFolderPath:v,...L!==void 0?{projectId:L}:{}}),GA({layout:e.layout,text:w,source:f??"command.claude.result.failure",projectFolderPath:v,...L!==void 0?{projectId:L}:{}})),T&&R.trim().length>0&&v!==null&&tw({layout:e.layout,projectFolderPath:v,...L!==void 0?{projectId:L}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:R,output:w,createdAt:new Date().toISOString()}}),f!==void 0&&v!==null){let D=wv.get(f),re=_v.get(f);D!==void 0&&re!==void 0&&Du(v).then(B=>{let q=dS({before:re,after:B});Uf(D,q),_v.delete(f),wv.delete(f)})}if(T&&L!==void 0&&L.trim().length>0){let D=z(),re=D===null?null:Z({wsUrl:D.wsUrl,pairingToken:D.pairingToken});re!==null&&pS(re,L,{...f!==void 0?{sourceRunId:f}:{},lesson:uS({prompt:R,output:w})})}f!==void 0&&(Wi(e.layout,f),vv.delete(f),bv.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let u=new Nl(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Y_(Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Z_(e.layout);let A=Ee(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=Ow({layout:e.layout,origin:A,...b!==void 0&&b.length>0?{claimToken:b}:{}});G(u,{type:"agent.register",payload:{role:"agent",hostname:ks.default.hostname(),macOsUsername:ks.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),nc(u,e.layout),ev(e,u),g(u)}),u.on("message",A=>{let b=typeof A=="string"?A:A.toString("utf8");try{let f=JSON.parse(b);if(!X(f))return;S(f,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(A,b)=>{s(),t.socket=void 0,t.wsConnected=!1,wS(e.layout),t.reconnectAttempt+=1;let f=typeof b=="string"?b:b.toString("utf8");Wo(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:f}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",A=>{t.wakeError=A.message,Wo(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return lh(()=>{let u=dh();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&o(u.remoteBundleVersion,u.trigger);let A=uh();A!==null&&r(A)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:sa(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Rl(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(nc(u,e.layout),{ok:!0})}}},G6=async()=>{ze("agent-witch");let e=g_(),t=E();S_().ok||(process.platform==="darwin"?(await Xr(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),w_(t);let o=P_({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(Ht({launchAgentLabel:oe(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Vs());let n=await ny(),s=n[0];s!==void 0&&av(s.layout);for(let h of n){let y=Ee(h.wsUrl)??zt;ii(h.layout.installDir,y)}let i=n.map(h=>B6(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Dl(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let A=Se(h.layout);_S(A,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(at(h)||ia(h.installDir))},g=await __({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):El({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=$t(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),qs(),d()});d=()=>{S(),g.stop(),Dl(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},sc=G6});var Ev=l(()=>{"use strict";AF()});var bF={};St(bF,{startAgentWitchClient:()=>sc});var PF=l(()=>{"use strict";Ev();Ev();eo();Bf();Rd();if(!Fe()&&to(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Ed(process.argv.slice(e))),sc()}});$f();Bf();eo();Rd();var sE="20.x",iE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var W2=e=>[`Node.js ${sE} or newer is required (found ${e}).`,iE].join(" "),aE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${W2(process.version)}
`),process.exit(1))};var V6=async()=>{ze("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(yh(),hh)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},q6=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(lT(),aT)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},K6=async()=>{if(!to(Fe()?void 0:__agentWitchImportMetaUrl))return;aE();let e=process.argv.indexOf("report");e>=0&&process.exit(Ed(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await V6();return}if(t==="wake"){await q6();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(cx(),lx));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(JD(),KD));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(PF(),bF));await r()};K6();
