#!/usr/bin/env node
"use strict";var rz=Object.create;var hg=Object.defineProperty;var nz=Object.getOwnPropertyDescriptor;var oz=Object.getOwnPropertyNames;var sz=Object.getPrototypeOf,iz=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var W=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},St=(e,t)=>{for(var r in t)hg(e,r,{get:t[r],enumerable:!0})},az=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of oz(t))!iz.call(e,o)&&o!==r&&hg(e,o,{get:()=>t[o],enumerable:!(n=nz(t,o))||n.enumerable});return e};var m=(e,t,r)=>(r=e!=null?rz(sz(e)):{},az(t||!e||!e.__esModule?hg(r,"default",{value:e,enumerable:!0}):r,e));var Kn=W(yg=>{"use strict";Object.defineProperty(yg,"__esModule",{value:!0});yg.stringify=lz;function lz(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=W(Sg=>{"use strict";Object.defineProperty(Sg,"__esModule",{value:!0});Sg.generateTypeGuardError=cz;var uv=Kn();function cz(e,t,r){return(0,uv.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,uv.stringify)(e)}) to be "${r}"`}});var ur=W(ql=>{"use strict";Object.defineProperty(ql,"__esModule",{value:!0});ql.isNonNullObject=void 0;var dz=O(),uz=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,dz.generateTypeGuardError)(e,t.identifier,"non-null object")),r};ql.isNonNullObject=uz});var At=W(pe=>{"use strict";Object.defineProperty(pe,"__esModule",{value:!0});pe.attachTypeGuardMeta=pe.isArrayTypeGuard=pe.isNestedObjectTypeGuard=pe.getTypeGuardWrapperKind=pe.getTypeGuardInnerGuard=pe.getTypeGuardItemGuard=pe.getTypeGuardSchema=void 0;var pz=e=>e.schema;pe.getTypeGuardSchema=pz;var mz=e=>e.itemGuard;pe.getTypeGuardItemGuard=mz;var gz=e=>e.innerGuard;pe.getTypeGuardInnerGuard=gz;var fz=e=>e.wrapperKind;pe.getTypeGuardWrapperKind=fz;var hz=e=>{if((0,pe.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};pe.isNestedObjectTypeGuard=hz;var yz=e=>{if((0,pe.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};pe.isArrayTypeGuard=yz;var Sz=(e,t)=>Object.assign(e,t);pe.attachTypeGuardMeta=Sz});var Ps=W(Fr=>{"use strict";Object.defineProperty(Fr,"__esModule",{value:!0});Fr.getExpectedTypeName=Fr.getTypeGuardDisplayName=void 0;var pv=At(),Az=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Fr.getTypeGuardDisplayName=Az;var bz=e=>{let t=(0,pv.getTypeGuardWrapperKind)(e),r=(0,pv.getTypeGuardInnerGuard)(e);if(t&&r){let o=(0,Fr.getExpectedTypeName)(r);if(t==="undefinedOr")return`${o} | undefined`;if(t==="nullOr")return`${o} | null`;if(t==="nilOr")return`${o} | null | undefined`}let n=e.name;if(n.startsWith("is")){let o=n.slice(2);return o.endsWith("Guard")&&(o=o.slice(0,-5)),o==="Type"||o==="Schema"?"object":o==="Array"?"Array":o.toLowerCase()}return"unknown"};Fr.getExpectedTypeName=bz});var zr=W(Kl=>{"use strict";Object.defineProperty(Kl,"__esModule",{value:!0});Kl.createValidationResult=void 0;var Pz=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Kl.createValidationResult=Pz});var Jn=W(Jl=>{"use strict";Object.defineProperty(Jl,"__esModule",{value:!0});Jl.createValidationError=void 0;var wz=(e,t,r,n)=>({path:e,expectedType:t,actualValue:r,message:n});Jl.createValidationError=wz});var Yn=W(Yl=>{"use strict";Object.defineProperty(Yl,"__esModule",{value:!0});Yl.createTreeNode=void 0;var _z=(e,t,r,n)=>({valid:t,path:e,...r&&{expectedType:r},...n!==void 0&&{actualValue:n},children:{},errors:[]});Yl.createTreeNode=_z});var ws=W(Xl=>{"use strict";Object.defineProperty(Xl,"__esModule",{value:!0});Xl.combineResults=void 0;var vz=zr(),Wz=(e,t)=>{let r=e.every(s=>s.valid),n=e.flatMap(s=>s.errors),o={valid:r,path:t||"root",children:{},errors:n};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";o.children[i]=s.tree}}),(0,vz.createValidationResult)(r,n,o)};Xl.combineResults=Wz});var Ql=W(Zl=>{"use strict";Object.defineProperty(Zl,"__esModule",{value:!0});Zl.createSimplifiedTree=void 0;var mv=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,n])=>{t[r]=mv(n)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},Lz=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let n={};Object.entries(e.children).forEach(([o,s])=>{n[o]=mv(s)}),r[t]={valid:e.valid,value:n}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Zl.createSimplifiedTree=Lz});var vs=W(tc=>{"use strict";Object.defineProperty(tc,"__esModule",{value:!0});tc.validateObject=void 0;var Ez=ur(),_s=zr(),Rz=Jn(),ec=Yn(),kz=ws(),gv=rc(),Cz=(e,t,r)=>{let n=()=>{let i=(0,Rz.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,ec.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,_s.createValidationResult)(!1,[],a):(0,_s.createValidationResult)(!1,[i],a)},o=()=>{let i=Object.keys(t);if(i.length===0)return(0,_s.createValidationResult)(!0,[],(0,ec.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,f=d,b=t[f],h=e[f],y=(0,gv.validateProperty)(f,h,b,r);return y.valid?p.length===0?(0,_s.createValidationResult)(!0,[],(0,ec.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,gv.validateProperty)(d,e[d],p,r)}),a=(0,kz.combineResults)(i,r.path),c=(0,ec.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,_s.createValidationResult)(a.valid,a.errors,c)};return(0,Ez.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?o():s():n()};tc.validateObject=Cz});var hv=W(sc=>{"use strict";Object.defineProperty(sc,"__esModule",{value:!0});sc.validateArray=void 0;var Tz=Kn(),nc=zr(),fv=Jn(),oc=Yn(),xz=ws(),Iz=vs(),Oz=Ps(),Mz=At(),Nz=(e,t,r)=>{let n=r.path;if(!Array.isArray(e)){let c=(0,fv.createValidationError)(n,"Array",e,`Expected ${n} (${JSON.stringify(e)}) to be "Array"`),d=(0,oc.createTreeNode)(n,!1,"Array",e);return d.errors=[c],(0,nc.createValidationResult)(!1,[c],d)}let o=(0,Mz.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${n}[${d}]`,f={path:p,config:r.config||null};if(o)return(0,Iz.validateObject)(c,o,f);let b=t(c,null),h=(0,Oz.getExpectedTypeName)(t),y=(0,Tz.stringify)(c);if(b)return(0,nc.createValidationResult)(!0,[],(0,oc.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,A=(0,fv.createValidationError)(p,h,c,u),S=(0,oc.createTreeNode)(p,!1,h,c);return S.errors=[A],(0,nc.createValidationResult)(!1,[A],S)}),i=(0,xz.combineResults)(s,n),a=(0,oc.createTreeNode)(n,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,nc.createValidationResult)(i.valid,i.errors,a)};sc.validateArray=Nz});var rc=W(ac=>{"use strict";Object.defineProperty(ac,"__esModule",{value:!0});ac.validateProperty=void 0;var yv=zr(),jz=Jn(),Sv=Yn(),Dz=Ps(),ic=At(),Hz=vs(),$z=hv(),Fz=(e,t,r,n)=>{let o=`${n.path}.${e}`,s={path:o,config:n.config||null,...n.parentTree&&{parentTree:n.parentTree}},i=n.config?.errorMode||"multi",a=(0,ic.getTypeGuardSchema)(r),c=(0,ic.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,Hz.validateObject)(t,a,s);if(c&&(0,ic.isArrayTypeGuard)(r))return(0,$z.validateArray)(t,c,s)}let d=p=>{let f=r(t,p),b=(0,Dz.getExpectedTypeName)(r);return f?(0,yv.createValidationResult)(!0,[],(0,Sv.createTreeNode)(o,!0,b,t)):(()=>{let h=(0,jz.createValidationError)(o,b,t,`Expected ${o} (${JSON.stringify(t)}) to be "${b}"`),y=(0,Sv.createTreeNode)(o,!1,b,t);return y.errors=[h],(0,yv.createValidationResult)(!1,[h],y)})()};if((0,ic.isNestedObjectTypeGuard)(r)){let p=n.config?{...n.config,identifier:o}:null;return d(p)}return d(null)};ac.validateProperty=Fz});var cc=W(lc=>{"use strict";Object.defineProperty(lc,"__esModule",{value:!0});lc.isNil=void 0;var zz=O(),Uz=function(e,t){return e!=null?(t&&t.callbackOnError((0,zz.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};lc.isNil=Uz});var Ag=W(dc=>{"use strict";Object.defineProperty(dc,"__esModule",{value:!0});dc.isDefined=void 0;var Bz=O(),Gz=cc(),Vz=function(e,t){return(0,Gz.isNil)(e,null)?(t&&t.callbackOnError((0,Bz.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};dc.isDefined=Vz});var bg=W(uc=>{"use strict";Object.defineProperty(uc,"__esModule",{value:!0});uc.reportValidationResults=void 0;var qz=Ql(),Av=Ag(),Kz=cc(),Jz=(e,t)=>{if(e.valid===!0||(0,Kz.isNil)(t))return;let r=t.errorMode||"multi",n=(i,a)=>{(0,Av.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,qz.createSimplifiedTree)(a),null,2))},o=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,Av.isDefined)(e.tree)?n(t,e.tree):r==="multi"?o(t):s(t)};uc.reportValidationResults=Jz});var Pg=W(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.Validation=Q.reportValidationResults=Q.validateObject=Q.validateProperty=Q.createSimplifiedTree=Q.combineResults=Q.createTreeNode=Q.createValidationError=Q.createValidationResult=Q.getExpectedTypeName=void 0;var Yz=Ps();Object.defineProperty(Q,"getExpectedTypeName",{enumerable:!0,get:function(){return Yz.getExpectedTypeName}});var Xz=zr();Object.defineProperty(Q,"createValidationResult",{enumerable:!0,get:function(){return Xz.createValidationResult}});var Zz=Jn();Object.defineProperty(Q,"createValidationError",{enumerable:!0,get:function(){return Zz.createValidationError}});var Qz=Yn();Object.defineProperty(Q,"createTreeNode",{enumerable:!0,get:function(){return Qz.createTreeNode}});var e1=ws();Object.defineProperty(Q,"combineResults",{enumerable:!0,get:function(){return e1.combineResults}});var t1=Ql();Object.defineProperty(Q,"createSimplifiedTree",{enumerable:!0,get:function(){return t1.createSimplifiedTree}});var r1=rc();Object.defineProperty(Q,"validateProperty",{enumerable:!0,get:function(){return r1.validateProperty}});var n1=vs();Object.defineProperty(Q,"validateObject",{enumerable:!0,get:function(){return n1.validateObject}});var o1=bg();Object.defineProperty(Q,"reportValidationResults",{enumerable:!0,get:function(){return o1.reportValidationResults}});var s1=zr(),i1=ws(),a1=Jn(),l1=Yn(),c1=rc(),d1=vs(),u1=bg(),p1=Ql();Q.Validation={result:s1.createValidationResult,combine:i1.combineResults,error:a1.createValidationError,treeNode:l1.createTreeNode,property:c1.validateProperty,object:d1.validateObject,report:u1.reportValidationResults,createSimplifiedTree:p1.createSimplifiedTree}});var pc=W(wg=>{"use strict";Object.defineProperty(wg,"__esModule",{value:!0});wg.isType=g1;var bv=ur(),Pv=Pg(),m1=At();function g1(e){if(!(0,bv.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,n){let o=n?.errorMode||"multi";if(o==="multi"||o==="json"){let s={path:n?.identifier||"root",config:n||null},i=(0,Pv.validateObject)(r,e,s);return(0,Pv.reportValidationResults)(i,n||null),i.valid}return(0,bv.isNonNullObject)(r,n)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],n?{...n,identifier:`${n.identifier}.${s}`}:null)}):!1}return(0,m1.attachTypeGuardMeta)(t,{schema:e})}});var Wv=W(Ur=>{"use strict";Object.defineProperty(Ur,"__esModule",{value:!0});Ur.isNestedType=Ur.isShape=void 0;Ur.isSchema=Ws;var wv=ur(),_v=Pg(),vv=At();function Ws(e){if(!(0,wv.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=h1(e);function r(n,o){let s=o?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:o?.identifier||"root",config:o||null},a=(0,_v.validateObject)(n,t,i);return(0,_v.reportValidationResults)(a,o||null),a.valid}return(0,wv.isNonNullObject)(n,o)?Object.keys(t).every(function(i){let a=t[i];return a?a(n[i],o?{...o,identifier:`${o.identifier}.${i}`}:null):!1}):!1}return(0,vv.attachTypeGuardMeta)(r,{schema:t})}function f1(e){return typeof e=="function"?e:Array.isArray(e)?y1(e):typeof e=="object"&&e!==null?Ws(e):e}function h1(e){let t={};for(let[r,n]of Object.entries(e))t[r]=f1(n);return t}function y1(e){let t=e[0],r=Ws(t);function n(o,s){return Array.isArray(o)?o.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,vv.attachTypeGuardMeta)(n,{itemGuard:r})}Ur.isShape=Ws;Ur.isNestedType=Ws});var Lv=W(_g=>{"use strict";Object.defineProperty(_g,"__esModule",{value:!0});_g.isObjectWith=A1;var S1=pc();function A1(e){return(0,S1.isType)(e)}});var Ev=W(vg=>{"use strict";Object.defineProperty(vg,"__esModule",{value:!0});vg.isObject=P1;var b1=pc();function P1(e){return(0,b1.isType)(e)}});var Rv=W(Wg=>{"use strict";Object.defineProperty(Wg,"__esModule",{value:!0});Wg.guardWithTolerance=w1;function w1(e,t,r){return t(e,r),e}});var kv=W(Lg=>{"use strict";Object.defineProperty(Lg,"__esModule",{value:!0});Lg.isBranded=v1;var _1=O();function v1(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,_1.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var Cv=W(mc=>{"use strict";Object.defineProperty(mc,"__esModule",{value:!0});mc.BrandSymbols=void 0;mc.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var Tv=W(gc=>{"use strict";Object.defineProperty(gc,"__esModule",{value:!0});gc.isAny=void 0;var W1=function(e){return!0};gc.isAny=W1});var Ls=W(Eg=>{"use strict";Object.defineProperty(Eg,"__esModule",{value:!0});Eg.reportTypeGuardError=E1;var L1=O();function E1(e,t,r){e&&e.callbackOnError((0,L1.generateTypeGuardError)(t,e.identifier,r))}});var xv=W(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.isBoolean=void 0;var R1=Ls(),k1=function(t,r){return typeof t!="boolean"?((0,R1.reportTypeGuardError)(r,t,"boolean"),!1):!0};fc.isBoolean=k1});var Iv=W(hc=>{"use strict";Object.defineProperty(hc,"__esModule",{value:!0});hc.isDate=void 0;var C1=O(),T1=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,C1.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};hc.isDate=T1});var Rg=W(yc=>{"use strict";Object.defineProperty(yc,"__esModule",{value:!0});yc.isNumber=void 0;var x1=Ls(),I1=function(t,r){return typeof t!="number"||isNaN(t)?((0,x1.reportTypeGuardError)(r,t,"number"),!1):!0};yc.isNumber=I1});var Ov=W(Sc=>{"use strict";Object.defineProperty(Sc,"__esModule",{value:!0});Sc.isString=void 0;var O1=Ls(),M1=function(t,r){return typeof t!="string"?((0,O1.reportTypeGuardError)(r,t,"string"),!1):!0};Sc.isString=M1});var Mv=W(Ac=>{"use strict";Object.defineProperty(Ac,"__esModule",{value:!0});Ac.isUnknown=void 0;var N1=function(e){return!0};Ac.isUnknown=N1});var Nv=W(bc=>{"use strict";Object.defineProperty(bc,"__esModule",{value:!0});bc.isFunction=void 0;var j1=O(),D1=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,j1.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};bc.isFunction=D1});var Dv=W(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.isFile=void 0;var jv=O(),H1=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,jv.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,jv.generateTypeGuardError)(e,t.identifier,"File")),!1)};Pc.isFile=H1});var $v=W(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.isFileList=void 0;var Hv=O(),$1=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,Hv.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,Hv.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};wc.isFileList=$1});var zv=W(_c=>{"use strict";Object.defineProperty(_c,"__esModule",{value:!0});_c.isBlob=void 0;var Fv=O(),F1=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,Fv.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,Fv.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};_c.isBlob=F1});var Bv=W(vc=>{"use strict";Object.defineProperty(vc,"__esModule",{value:!0});vc.isFormData=void 0;var Uv=O(),z1=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,Uv.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,Uv.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};vc.isFormData=z1});var Vv=W(Wc=>{"use strict";Object.defineProperty(Wc,"__esModule",{value:!0});Wc.isURL=void 0;var Gv=O(),U1=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,Gv.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,Gv.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Wc.isURL=U1});var Kv=W(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.isURLSearchParams=void 0;var qv=O(),B1=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,qv.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,qv.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Lc.isURLSearchParams=B1});var Jv=W(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.isMap=void 0;var G1=O(),V1=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,G1.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Ec.isMap=V1});var Yv=W(Rc=>{"use strict";Object.defineProperty(Rc,"__esModule",{value:!0});Rc.isSet=void 0;var q1=O(),K1=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,q1.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Rc.isSet=K1});var Xv=W(kg=>{"use strict";Object.defineProperty(kg,"__esModule",{value:!0});kg.isIndexSignature=Y1;var J1=O();function Y1(e,t){return function(r,n){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return n&&n.callbackOnError((0,J1.generateTypeGuardError)(r,n.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let f=s[d],b=e(d,n?{...n,identifier:`${n.identifier}[key:${p}]`}:null),h=t(f,n?{...n,identifier:`${n.identifier}[value:${p}]`}:null);return b&&h})}}});var Zv=W(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.isError=void 0;var X1=Ls(),Z1=function(t,r){return t instanceof Error?!0:((0,X1.reportTypeGuardError)(r,t,"Error"),!1)};kc.isError=Z1});var Tg=W(Cg=>{"use strict";Object.defineProperty(Cg,"__esModule",{value:!0});Cg.isArrayWithEachItem=tU;var Q1=O(),eU=At();function tU(e){let t=function(r,n){return Array.isArray(r)?r.every((o,s)=>e(o,n?{...n,identifier:`${n.identifier}[${s}]`}:null)):(n&&n.callbackOnError((0,Q1.generateTypeGuardError)(r,n.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,eU.attachTypeGuardMeta)(t,{itemGuard:e})}});var xg=W(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.isNonEmptyArray=void 0;var rU=O(),nU=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,rU.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Cc.isNonEmptyArray=nU});var Qv=W(Ig=>{"use strict";Object.defineProperty(Ig,"__esModule",{value:!0});Ig.isNonEmptyArrayWithEachItem=iU;var oU=Tg(),sU=xg();function iU(e){return function(t,r){return(0,oU.isArrayWithEachItem)(e)(t,r)&&(0,sU.isNonEmptyArray)(t,r)}}});var tW=W(Og=>{"use strict";Object.defineProperty(Og,"__esModule",{value:!0});Og.isTuple=aU;var eW=O();function aU(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,eW.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((n,o)=>n(t[o],r?{...r,identifier:`${r.identifier}[${o}]`}:null)):(r&&r.callbackOnError((0,eW.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var rW=W(Mg=>{"use strict";Object.defineProperty(Mg,"__esModule",{value:!0});Mg.isObjectWithEachItem=cU;var lU=O();function cU(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,lU.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var nW=W(Ng=>{"use strict";Object.defineProperty(Ng,"__esModule",{value:!0});Ng.isPartialOf=uU;var dU=ur();function uU(e){return function(t,r){if(!(0,dU.isNonNullObject)(t,r))return!1;for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&Object.prototype.hasOwnProperty.call(t,n)){let o=e[n],s=t[n];if(o&&!o(s,r?{...r,identifier:`${r.identifier}.${n}`}:null))return!1}return!0}}});var oW=W(jg=>{"use strict";Object.defineProperty(jg,"__esModule",{value:!0});jg.isPick=mU;var pU=ur();function mU(e,...t){return function(r,n){if(!(0,pU.isNonNullObject)(r,n))return!1;for(let o of t)if(!Object.prototype.hasOwnProperty.call(r,o))return n&&e(r,n),!1;return!0}}});var sW=W(Dg=>{"use strict";Object.defineProperty(Dg,"__esModule",{value:!0});Dg.isOmit=fU;var gU=ur();function fU(e,...t){return function(r,n){if(!(0,gU.isNonNullObject)(r,n))return!1;let o=[],s=n?.identifier||"root",i=n?{...n,callbackOnError:d=>o.push(d)}:{identifier:s,callbackOnError:d=>o.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=o.filter(d=>{let p=d.slice(9),f=p.indexOf(" ("),b=f>=0?p.slice(0,f):p;if(a.has(b))return!1;let h=b.startsWith(s+".")&&b.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(n&&c.length>0)for(let d of c)n.callbackOnError(d);return c.length===0}}});var iW=W(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.isNonEmptyString=void 0;var hU=O(),yU=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,hU.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Tc.isNonEmptyString=yU});var aW=W(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.isNonNegativeNumber=void 0;var SU=O(),AU=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,SU.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};xc.isNonNegativeNumber=AU});var lW=W(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.isPositiveNumber=void 0;var bU=O(),PU=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,bU.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Ic.isPositiveNumber=PU});var cW=W(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.isNonPositiveNumber=void 0;var wU=O(),_U=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,wU.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Oc.isNonPositiveNumber=_U});var dW=W(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.isNegativeNumber=void 0;var vU=O(),WU=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,vU.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Mc.isNegativeNumber=WU});var uW=W(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.isInteger=void 0;var LU=O(),EU=Rg(),RU=function(e,t){return!(0,EU.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,LU.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Nc.isInteger=RU});var pW=W(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.isPositiveInteger=void 0;var kU=O(),CU=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,kU.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};jc.isPositiveInteger=CU});var mW=W(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.isNegativeInteger=void 0;var TU=O(),xU=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,TU.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Dc.isNegativeInteger=xU});var gW=W(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.isNonNegativeInteger=void 0;var IU=O(),OU=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,IU.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Hc.isNonNegativeInteger=OU});var fW=W($c=>{"use strict";Object.defineProperty($c,"__esModule",{value:!0});$c.isNonPositiveInteger=void 0;var MU=O(),NU=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,MU.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};$c.isNonPositiveInteger=NU});var hW=W(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.isNumeric=void 0;var Fc=O(),jU=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Fc.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Fc.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Fc.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Fc.generateTypeGuardError)(e,t.identifier,"number key")),!1};zc.isNumeric=jU});var yW=W(Uc=>{"use strict";Object.defineProperty(Uc,"__esModule",{value:!0});Uc.isBooleanLike=void 0;var Hg=O(),DU=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Hg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Hg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Uc.isBooleanLike=DU});var SW=W(Bc=>{"use strict";Object.defineProperty(Bc,"__esModule",{value:!0});Bc.isDateLike=void 0;var Es=O(),HU=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Es.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Es.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Es.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Es.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Es.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Bc.isDateLike=HU});var AW=W(Gc=>{"use strict";Object.defineProperty(Gc,"__esModule",{value:!0});Gc.isBigInt=void 0;var $U=O(),FU=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,$U.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Gc.isBigInt=FU});var Fg=W($g=>{"use strict";Object.defineProperty($g,"__esModule",{value:!0});$g.isOneOf=zU;var bW=Kn();function zU(...e){return function(t,r){let n=e.some(function(o){return t===o});return!n&&r&&r.callbackOnError(`${r.identifier} (${(0,bW.stringify)(t)}) must be one of following values ${e.map(bW.stringify).join(" | ")}`),n}}});var PW=W(zg=>{"use strict";Object.defineProperty(zg,"__esModule",{value:!0});zg.isOneOfTypes=GU;var UU=Kn(),BU=Ps();function GU(...e){return function(t,r){let n=e.map(s=>({typeGuard:s,isValid:s(t,null)})),o=n.some(s=>s.isValid);if(!o&&r){let s=(0,UU.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,BU.getTypeGuardDisplayName)(c)).join(" | ")}"`];n.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return o}}});var wW=W(Ug=>{"use strict";Object.defineProperty(Ug,"__esModule",{value:!0});Ug.isIntersectionOf=VU;function VU(...e){return function(t,r){for(let n of e)if(!n(t,r))return!1;return!0}}});var _W=W(Bg=>{"use strict";Object.defineProperty(Bg,"__esModule",{value:!0});Bg.isExtensionOf=qU;function qU(e,t){return function(r,n){return e(r,n)?t(r,n):!1}}});var vW=W(Gg=>{"use strict";Object.defineProperty(Gg,"__esModule",{value:!0});Gg.isNullOr=JU;var KU=At();function JU(e){function t(r,n){return r===null?!0:e(r,n)}return(0,KU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var WW=W(Vg=>{"use strict";Object.defineProperty(Vg,"__esModule",{value:!0});Vg.isUndefinedOr=XU;var YU=At();function XU(e){function t(r,n){return r===void 0?!0:e(r,n)}return(0,YU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var LW=W(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.isNilOr=QU;var ZU=At();function QU(e){function t(r,n){return r==null?!0:e(r,n)}return(0,ZU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var EW=W(Kg=>{"use strict";Object.defineProperty(Kg,"__esModule",{value:!0});Kg.isAsserted=eB;function eB(e){return!0}});var RW=W(Jg=>{"use strict";Object.defineProperty(Jg,"__esModule",{value:!0});Jg.isEnum=rB;var tB=Fg();function rB(e){return function(t,r){return(0,tB.isOneOf)(...Object.values(e))(t,r)}}});var kW=W(Yg=>{"use strict";Object.defineProperty(Yg,"__esModule",{value:!0});Yg.isEqualTo=sB;var nB=O(),oB=Kn();function sB(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,nB.generateTypeGuardError)(t,r.identifier,`equal to ${(0,oB.stringify)(e)}`)),!1):!0}}});var CW=W(Vc=>{"use strict";Object.defineProperty(Vc,"__esModule",{value:!0});Vc.isRegex=void 0;var iB=O(),aB=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,iB.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Vc.isRegex=aB});var xW=W(Xg=>{"use strict";Object.defineProperty(Xg,"__esModule",{value:!0});Xg.isPattern=lB;var TW=O();function lB(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,n){return typeof r!="string"?(n&&n.callbackOnError((0,TW.generateTypeGuardError)(r,n.identifier,"string")),!1):t.test(r)?!0:(n&&n.callbackOnError((0,TW.generateTypeGuardError)(r,n.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var IW=W(Zg=>{"use strict";Object.defineProperty(Zg,"__esModule",{value:!0});Zg.by=cB;function cB(e){return function(t){return e(t,null)}}});var OW=W(Qg=>{"use strict";Object.defineProperty(Qg,"__esModule",{value:!0});Qg.toNumber=dB;function dB(e){return typeof e=="number"?e:Number(e)}});var MW=W(ef=>{"use strict";Object.defineProperty(ef,"__esModule",{value:!0});ef.toDate=uB;function uB(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var NW=W(tf=>{"use strict";Object.defineProperty(tf,"__esModule",{value:!0});tf.toBoolean=pB;function pB(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var jW=W(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.isSymbol=void 0;var mB=O(),gB=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,mB.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};qc.isSymbol=gB});var Rs=W(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var fB=pc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return fB.isType}});var rf=Wv();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return rf.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return rf.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return rf.isNestedType}});var hB=Lv();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return hB.isObjectWith}});var yB=Ev();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return yB.isObject}});var SB=Rv();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return SB.guardWithTolerance}});var AB=kv();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return AB.isBranded}});var bB=Cv();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return bB.BrandSymbols}});var PB=Tv();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return PB.isAny}});var wB=xv();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return wB.isBoolean}});var _B=Iv();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return _B.isDate}});var vB=Ag();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return vB.isDefined}});var WB=cc();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return WB.isNil}});var LB=Rg();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return LB.isNumber}});var EB=Ov();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return EB.isString}});var RB=Mv();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return RB.isUnknown}});var kB=Nv();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return kB.isFunction}});var CB=Dv();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return CB.isFile}});var TB=$v();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return TB.isFileList}});var xB=zv();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return xB.isBlob}});var IB=Bv();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return IB.isFormData}});var OB=Vv();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return OB.isURL}});var MB=Kv();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return MB.isURLSearchParams}});var NB=Jv();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return NB.isMap}});var jB=Yv();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return jB.isSet}});var DB=Xv();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return DB.isIndexSignature}});var HB=Zv();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return HB.isError}});var $B=Tg();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return $B.isArrayWithEachItem}});var FB=xg();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return FB.isNonEmptyArray}});var zB=Qv();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return zB.isNonEmptyArrayWithEachItem}});var UB=tW();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return UB.isTuple}});var BB=ur();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return BB.isNonNullObject}});var GB=rW();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return GB.isObjectWithEachItem}});var VB=nW();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return VB.isPartialOf}});var qB=oW();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return qB.isPick}});var KB=sW();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return KB.isOmit}});var JB=iW();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return JB.isNonEmptyString}});var YB=aW();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return YB.isNonNegativeNumber}});var XB=lW();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return XB.isPositiveNumber}});var ZB=cW();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return ZB.isNonPositiveNumber}});var QB=dW();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return QB.isNegativeNumber}});var eG=uW();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return eG.isInteger}});var tG=pW();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return tG.isPositiveInteger}});var rG=mW();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return rG.isNegativeInteger}});var nG=gW();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return nG.isNonNegativeInteger}});var oG=fW();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return oG.isNonPositiveInteger}});var sG=hW();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return sG.isNumeric}});var iG=yW();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return iG.isBooleanLike}});var aG=SW();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return aG.isDateLike}});var lG=AW();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return lG.isBigInt}});var cG=Fg();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return cG.isOneOf}});var dG=PW();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return dG.isOneOfTypes}});var uG=wW();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return uG.isIntersectionOf}});var pG=_W();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return pG.isExtensionOf}});var mG=vW();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return mG.isNullOr}});var gG=WW();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return gG.isUndefinedOr}});var fG=LW();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return fG.isNilOr}});var hG=EW();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return hG.isAsserted}});var yG=RW();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return yG.isEnum}});var SG=kW();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return SG.isEqualTo}});var AG=CW();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return AG.isRegex}});var bG=xW();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return bG.isPattern}});var PG=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return PG.generateTypeGuardError}});var wG=IW();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return wG.by}});var _G=OW();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return _G.toNumber}});var vG=MW();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return vG.toDate}});var WG=NW();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return WG.toBoolean}});var LG=jW();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return LG.isSymbol}})});var ks,DW,HW,Br,nf,q7,$W,Kc,Gr,Cs,of,sf,af,lf,jt,cf,Jc,Yc,Xc,Ts,rt,Xn,Zn,Zc,pr,df,FW,bt=l(()=>{"use strict";ks={production:".agent-witch",localhost:".local-agent-witch"},DW={production:47892,localhost:47893},HW={production:"com.agent-witch",localhost:"com.local-agent-witch"},Br={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},nf="app",q7=`${nf}/agent-witch.js`,$W=`${nf}/command`,Kc={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Gr=ks.production,Cs=ks.localhost,of=DW.production,sf=DW.localhost,af=HW.production,lf=HW.localhost,jt="profiles",cf=Br.activeProfile,Jc="harness",Yc="sets",Xc="manifest.json",Ts=Kc.projectsDir,rt=Kc.logsDir,Xn="agent-witch.log",Zn="agent-witch.error.log",Zc=Kc.reportsDir,pr=Kc.deviceKeypairJson,df=nf,FW="agent-witch.js"});var Qc,zW,RG,EG,UW,BW=l(()=>{"use strict";Qc=m(require("node:path")),zW=require("node:url"),RG={},EG=()=>!0,UW=()=>{if(EG()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Qc.default.dirname(Qc.default.resolve(e))}return Qc.default.dirname((0,zW.fileURLToPath)(RG.url))}});var uf,GW,N,VW,kG,mr,E,ed,Dt,qW,td,Qn,rd,nd,re,nt,pf,ot,mf,M,gf=l(()=>{"use strict";uf=m(require("node:fs")),GW=m(require("node:os")),N=m(require("node:path")),VW=m(Rs());bt();BW();kG=UW(),mr=e=>e.trim().toLowerCase(),E=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return N.default.resolve(e);let t=N.default.resolve(kG),r=N.default.basename(t),n=N.default.basename(N.default.dirname(t));return r===df&&(n===Gr||n===Cs)?N.default.dirname(t):r===Gr||r===Cs?t:N.default.join(GW.default.homedir(),Gr)},ed=(e=E())=>N.default.join(e,df),Dt=(e=E())=>N.default.join(ed(e),FW),qW=(e,t,r)=>t!==null?N.default.join(e,jt,t,r):N.default.join(e,r),td=e=>qW(e.installDir,e.profileEmail,Ts),Qn=e=>qW(e.installDir,e.profileEmail,rt),rd=e=>e.profileEmail!==null?N.default.join(e.installDir,jt,e.profileEmail,pr):N.default.join(e.installDir,pr),nd=e=>N.default.basename(e)===Cs,re=(e=E())=>nd(e)?lf:af,nt=(e=E())=>nd(e)?sf:of,pf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return mr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?mr(t):null},ot=(e=E())=>{let t=N.default.join(e,cf);if(!uf.default.existsSync(t))return null;try{let r=JSON.parse(uf.default.readFileSync(t,"utf8"));if((0,VW.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return mr(r.email)}catch{return null}return null},mf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?mr(r):null}let t=pf();return t!==null?t:ot()},M=e=>{let t=E(),r=ed(t),n=Dt(t),o=mf(e);if(o!==null){let b=N.default.join(t,jt,o),h=N.default.join(b,Jc),y=N.default.join(b,Ts),u=N.default.join(b,rt),A=N.default.join(b,Zc),S=N.default.join(b,pr),g=N.default.join(b,rt,Xn),w=N.default.join(b,rt,Zn);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:y,logsDir:u,mainLogPath:g,errorLogPath:w,reportsDir:A,deviceKeypairPath:S,configPath:N.default.join(b,"config.json"),harnessRootDir:h,harnessManifestPath:N.default.join(h,Xc),harnessSetsDir:N.default.join(h,Yc)}}let s=N.default.join(t,Jc),i=N.default.join(t,Ts),a=N.default.join(t,rt),c=N.default.join(t,Zc),d=N.default.join(t,pr),p=N.default.join(t,rt,Xn),f=N.default.join(t,rt,Zn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:f,reportsDir:c,deviceKeypairPath:d,configPath:N.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:N.default.join(s,Xc),harnessSetsDir:N.default.join(s,Yc)}}});var ff,KW,CG,TG,JW,hf,YW=l(()=>{"use strict";ff=m(require("node:fs")),KW=m(require("node:path"));bt();gf();CG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),TG=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,JW=e=>{let t=KW.default.join(e,Br.wakePort);if(!ff.default.existsSync(t))return null;try{let r=JSON.parse(ff.default.readFileSync(t,"utf8"));if(CG(r)&&TG(r.wakePort))return r.wakePort}catch{return null}return null},hf=(e=E())=>JW(e)??nt(e)});var B=l(()=>{"use strict";gf();YW()});var xs,NG,jG,XW,DG,HG,ZW=l(()=>{"use strict";B();xs=re(),NG=`${xs}-wake`,jG=`${xs}-live`,XW=`${xs}-watchdog`,DG=`${xs}-automation-scheduler`,HG=`${xs}-updater`});var yf,Sf,od=l(()=>{"use strict";yf=new Set(["","loginwindow","_mbsetupuser","root"]),Sf=5e3});var QW,$G,eL,Af,bf=l(()=>{"use strict";QW=require("node:child_process");od();$G=e=>e.trim().toLowerCase(),eL=e=>e==null?!1:!yf.has($G(e)),Af=()=>{if(process.platform!=="darwin")return null;try{let t=(0,QW.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return eL(t)?t:null}catch{return null}}});var rL,tL,st,Is=l(()=>{"use strict";rL=m(require("node:os"));bf();tL=e=>e.trim().toLowerCase(),st=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Af():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??rL.default.userInfo().username;return tL(r)===tL(n)}});var nL,oL,Vr,sL=l(()=>{"use strict";nL=require("node:child_process"),oL=m(require("node:fs"));B();Is();Vr=(e=E())=>{let t=Dt(e);if(!oL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!st())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=ot(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,nL.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var iL,Os,sd=l(()=>{"use strict";iL=require("node:child_process"),Os=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,iL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var id,Pf,aL,ee,ad,Ms=l(()=>{"use strict";id=m(require("node:fs")),Pf=m(require("node:path"));B();bt();aL=e=>{let t=Pf.default.join(e,jt);return id.default.existsSync(t)?id.default.readdirSync(t).filter(r=>id.default.statSync(Pf.default.join(t,r)).isDirectory()).map(r=>mr(r)).toSorted():[]},ee=(e=E())=>{let t=re(e);return[{profileEmail:aL(e)[0]??null,launchAgentLabel:t}]},ad=(e=E())=>aL(e)});var wf,lL,cL,FG,Ht,ld=l(()=>{"use strict";wf=m(require("node:fs")),lL=m(require("node:os")),cL=m(require("node:path"));B();Ms();FG=()=>cL.default.join(lL.default.homedir(),"Library","LaunchAgents"),Ht=(e=E())=>{let t=re(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of ee(e))r.add(o.launchAgentLabel);let n=FG();if(wf.default.existsSync(n))for(let o of wf.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var dL,Ns,uL=l(()=>{"use strict";B();sd();ld();Ms();dL=(e=E())=>{let t=new Set(ee(e).map(r=>r.launchAgentLabel));return Ht(e).filter(r=>!t.has(r))},Ns=(e=E())=>{for(let t of dL(e))Os(t)}});var js,_f=l(()=>{"use strict";B();sd();ld();js=(e=E())=>{for(let t of Ht(e))Os(t)}});var pL,mL,zG,qr,gL=l(()=>{"use strict";pL=require("node:child_process"),mL=require("node:util"),zG=(0,mL.promisify)(pL.execFile),qr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await zG("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Kr,UG,vf,Wf=l(()=>{"use strict";Kr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UG=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,vf=e=>{let t=e.pathValue??UG(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${Kr(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${Kr(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${Kr(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${Kr(e.homeDir)}</string>
    <key>PATH</key>
    <string>${Kr(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${Kr(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${Kr(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var cd,Lf=l(()=>{"use strict";cd=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Jr,Ef,Ds,BG,GG,VG,fL,$t,Rf=l(()=>{"use strict";Jr=m(require("node:fs")),Ef=m(require("node:os")),Ds=m(require("node:path"));bt();B();Wf();Lf();BG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GG=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,VG=e=>{let t=Ds.default.join(e,Br.wakePort);if(!Jr.default.existsSync(t))return nt(e);try{let r=JSON.parse(Jr.default.readFileSync(t,"utf8"));if(BG(r)&&GG(r.wakePort))return r.wakePort}catch{return nt(e)}return nt(e)},fL=(e,t=Ef.default.homedir())=>Ds.default.join(t,"Library","LaunchAgents",`${e}.plist`),$t=e=>{let t=e.installDir??E(),r=e.homeDir??Ef.default.homedir(),n=fL(e.launchAgentLabel,r),o=Jr.default.existsSync(n)?Jr.default.readFileSync(n,"utf8"):null;if(o!==null&&cd(o))return{ok:!0,rewritten:!1,plistPath:n};let s=vf({launchAgentLabel:e.launchAgentLabel,runPath:Ds.default.join(t,$W,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??VG(t)});if(!cd(s))return{ok:!1,rewritten:!1,plistPath:n,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Jr.default.mkdirSync(Ds.default.dirname(n),{recursive:!0}),Jr.default.writeFileSync(n,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:n,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:n}}});var yL,SL,AL,Hs,qG,KG,hL,ve,kf=l(()=>{"use strict";yL=require("node:child_process"),SL=m(require("node:fs")),AL=require("node:util");B();Rf();Is();Hs=(0,AL.promisify)(yL.execFile),qG=async e=>{try{return await Hs("launchctl",["print",e]),!0}catch{return!1}},KG=async(e,t,r)=>{await qG(t)&&await Hs("launchctl",["bootout",t]).catch(()=>{}),await Hs("launchctl",["bootstrap",e,r]),await Hs("launchctl",["enable",t])},hL=async e=>{try{return await Hs("launchctl",["kickstart","-k",e]),!0}catch{return!1}},ve=async(e,t=E())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!st())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let n=`gui/${r}`,o=`${n}/${e}`,s=$t({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await hL(o))return{ok:!0};let i=s.plistPath;if(!SL.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await KG(n,o,i),await hL(o)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Yr,bL=l(()=>{"use strict";B();kf();Ms();Yr=async(e=E())=>{let t=[];for(let r of ee(e))(await ve(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var ze,Ft,PL=l(()=>{"use strict";_f();Is();od();ze=e=>{st()||(js(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Ft=(e,t=Sf)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{st()||e()},t);return()=>{clearInterval(r)}}});var te=l(()=>{"use strict";ZW();sL();sd();uL();_f();ld();Is();gL();bL();kf();Rf();Lf();Wf();Ms();bf();od();PL()});var Cf=l(()=>{"use strict";te()});var wL,_L,dd,vL,eo,WL,LL,Xr=l(()=>{"use strict";wL=".agent-witch",_L="memory",dd="project.json",vL="chunks.ndjson",eo="runs.ndjson",WL="reports",LL=".json"});var EL=l(()=>{"use strict";Xr()});var RL,ud,Tf=l(()=>{"use strict";RL=m(require("node:path"));EL();ud=(e,t)=>RL.default.join(e.trim(),`${t.trim()}${LL}`)});var $s,kL,CL=l(()=>{"use strict";$s="agent-witch.js",kL="command"});var pd=l(()=>{"use strict";CL()});var Zr,TL,xL=l(()=>{"use strict";pd();Zr=e=>`'${e.replace(/'/g,"'\\''")}'`,TL=e=>{let t=`${e.installDir.trim()}/${"app"}/${$s}`,r=[Zr("node"),Zr(t),"report","write","--key",Zr(e.reportKey.trim()),"--agent-run-id",Zr(e.agentRunId.trim()),"--status",Zr(e.status),"--summary",Zr(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Zr(e.details.trim())),r.join(" ")}});var Pt,IL,JG,xf,md=l(()=>{"use strict";Tf();xL();Pt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},IL=e=>e===Pt.COMPLETED||e===Pt.FAILED,JG=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),xf=(e,t)=>{let r=ud(t.reportsDir,t.reportKey),n=TL({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Pt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${JG({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var We=l(()=>{"use strict";bt();B()});var zs,ML,OL,NL,YG,to,XG,jL,Us,Bs,If,DL,HL,Gs=l(()=>{"use strict";zs=m(require("node:fs")),ML=m(require("node:path"));md();Tf();We();OL=50,NL=e=>{let t=M(),r=ud(t.reportsDir,e);return zs.default.mkdirSync(ML.default.dirname(r),{recursive:!0}),r},YG=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},to=e=>{let t=NL(e);if(!zs.default.existsSync(t))return null;try{let r=JSON.parse(zs.default.readFileSync(t,"utf8"));return YG(r)?r:null}catch{return null}},XG=(e,t)=>{let r=[...e,t];return r.length>OL?r.slice(r.length-OL):r},jL=e=>{let t=NL(e.reportKey);zs.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Us=e=>{let t=to(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:XG(t?.history??[],n)};return jL(o),o},Bs=e=>{let t=to(e.reportKey);return t!==null?t:Us({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Pt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},If=(e,t)=>{let r=t.trim();if(r.length===0)return to(e);let n=to(e);if(n===null)return null;let o=n.details!==void 0&&n.details.trim().length>0?`${n.details.trim()}
${r}`:r,s={...n,updatedAt:new Date().toISOString(),details:o};return jL(s),s},DL=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},HL=e=>{if(e===null||!IL(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Pt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var ZG,QG,Vs,$L,gd,Of=l(()=>{"use strict";md();Gs();ZG=new Set(Object.values(Pt)),QG=e=>ZG.has(e),Vs=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},$L=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},gd=e=>{if(e[0]!=="write")return $L(),1;let r=Vs(e,"--key"),n=Vs(e,"--agent-run-id"),o=Vs(e,"--status"),s=Vs(e,"--summary"),i=Vs(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!QG(o)?($L(),1):(Us({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var it,ro=l(()=>{"use strict";it=()=>!0});var Mf,FL,Qr,fd=l(()=>{"use strict";Mf=m(require("node:path")),FL=require("node:url");ro();Qr=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Mf.default.resolve(t);return it()?r===Mf.default.resolve(__filename):r===(0,FL.fileURLToPath)(e)}});var hd,no,r2,KY,oo=l(()=>{"use strict";hd="agent-witch.js",no="deps.tar.gz",r2="install.sh",KY={mainScript:`app/${hd}`,depsArchive:`app/${no}`,installShell:r2}});var GL=l(()=>{"use strict";oo()});var VL=l(()=>{"use strict";oo();GL()});var qs,jf,yd,n2,Ks,Le,io,Js,Ys,en,Df=l(()=>{"use strict";qs=m(require("node:fs")),jf=m(require("node:path"));VL();B();yd="install-version.json",n2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ks=(e=E())=>jf.default.join(e,yd),Le=(e=E())=>{let t=Ks(e);if(!qs.default.existsSync(t))return null;try{let r=JSON.parse(qs.default.readFileSync(t,"utf8"));return!n2(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},io=(e,t=E())=>{let r=Ks(t);qs.default.mkdirSync(jf.default.dirname(r),{recursive:!0}),qs.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Js=(e=E())=>Le(e)?.bundleVersion??"201",Ys=(e,t)=>{let r=Le(e);if(r!==null)return r;let n={bundleVersion:"201",appOrigin:t,updatedAt:new Date().toISOString()};return io(n,e),n},en=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var qL,tn,Hf,$f,Ff,Sd,wt,rn,zf=l(()=>{"use strict";qL=require("node:crypto"),tn=m(require("node:fs")),Hf=m(require("node:path"));B();$f="self-update-log.ndjson",Ff=100,Sd=(e=E())=>{let t=M(),r=t.installDir===e?t.logsDir:Qn({installDir:e,profileEmail:t.profileEmail});return Hf.default.join(r,$f)},wt=(e,t=E())=>{let r={id:(0,qL.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=Sd(t);tn.default.mkdirSync(Hf.default.dirname(n),{recursive:!0});let o=tn.default.existsSync(n)?tn.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Ff+1)),JSON.stringify(r)];return tn.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},rn=(e=20,t=E())=>{let r=Sd(t);if(!tn.default.existsSync(r))return[];let n=tn.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var Uf,uX,Bf=l(()=>{"use strict";oo();Uf="deps",uX=`${"app"}/${no}`});var KL=l(()=>{"use strict";Bf()});var JL,gr,nn,YL,Gf,Vf,XL=l(()=>{"use strict";JL=require("node:child_process"),gr=m(require("node:fs")),nn=m(require("node:path"));oo();Bf();YL=e=>nn.default.join(e,"app",Uf),Gf=e=>{let t=nn.default.join(e,"app"),r=nn.default.join(t,no);gr.default.existsSync(r)&&(gr.default.rmSync(YL(e),{recursive:!0,force:!0}),gr.default.mkdirSync(t,{recursive:!0}),(0,JL.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),gr.default.rmSync(r,{force:!0}))},Vf=e=>{gr.default.rmSync(nn.default.join(e,"node_modules"),{recursive:!0,force:!0}),gr.default.rmSync(nn.default.join(e,"package.json"),{force:!0}),gr.default.rmSync(nn.default.join(e,"package-lock.json"),{force:!0})}});var ZL=l(()=>{"use strict";KL();XL()});var zt,Ad,QL=l(()=>{"use strict";zt="https://www.agentwitch.com",Ad="wss://www.agentwitch.com/api/agent-witch/ws"});var Xs,Ut,eE=l(()=>{"use strict";Xs="127.0.0.1",Ut=`http://${Xs}:43347`});var Bt=l(()=>{"use strict";QL();eE()});var Zs,bd,tE,Kf,o2,rE,Xf,nE,at,Qs,ei,Zf,Jf,Yf,ti,Qf,eh,th,ao=l(()=>{"use strict";Zs=m(require("node:fs")),bd=m(require("node:path")),tE="active-writer-work.json",Kf=new Set,o2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rE=e=>e.profileEmail===null?bd.default.join(e.installDir,tE):bd.default.join(e.installDir,"profiles",e.profileEmail,tE),Xf=e=>{let t=rE(e);if(!Zs.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Zs.default.readFileSync(t,"utf8"));return!o2(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},nE=(e,t)=>{let r=rE(e);Zs.default.mkdirSync(bd.default.dirname(r),{recursive:!0}),Zs.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},at=e=>Xf(e).activeCount>0,Qs=e=>{let t=Xf(e);nE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},ei=e=>{let t=Xf(e),r=Math.max(0,t.activeCount-1);if(nE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let n of Kf)n()},Zf=e=>(Kf.add(e),()=>{Kf.delete(e)}),Jf=null,Yf=null,ti=e=>{Jf=e},Qf=e=>{Yf=e},eh=()=>{let e=Jf;return Jf=null,e},th=()=>{let e=Yf;return Yf=null,e}});var Ee,rh=l(()=>{"use strict";Ee=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var lo,Pd,ri,nh=l(()=>{"use strict";lo="qwen2.5:7b",Pd="nomic-embed-text",ri="Install Ollama from https://ollama.com/download"});var ni,oE,oh=l(()=>{"use strict";nh();ni=()=>`
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
    echo "Ollama is missing. ${ri}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${ri}" >&2
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
  agent_witch_ensure_ollama_model "${lo}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Pd}" "\${pull_log}"
}
`,oE=()=>`
${ni()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var sE,s2,wd,sh=l(()=>{"use strict";sE=require("node:child_process");B();oh();s2=e=>new Promise(t=>{let r=(0,sE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:E()}}),n=[];r.stdout.on("data",o=>{n.push(o)}),r.stderr.on("data",o=>{n.push(o)}),r.on("error",o=>{t({exitCode:1,output:o.message})}),r.on("close",o=>{t({exitCode:o??1,output:Buffer.concat(n).toString("utf8").trim()})})}),wd=async(e=s2)=>{let t=`${ni()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var fr,_d,iE,i2,aE,uo,a2,l2,c2,co,on,sn,lE=l(()=>{"use strict";fr=m(require("node:fs")),_d=m(require("node:path"));ZL();te();B();oo();Bt();Df();ao();rh();zf();sh();iE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),i2=e=>{let t=ot(e),r=t===null?M():M(t);if(!fr.default.existsSync(r.configPath))return null;try{let n=JSON.parse(fr.default.readFileSync(r.configPath,"utf8"));return!iE(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},aE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!iE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},uo=async e=>(await aE(e))?.bundleVersion??null,a2=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=_d.default.join(t,r);fr.default.mkdirSync(_d.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());fr.default.writeFileSync(o,s),r.endsWith(".js")&&fr.default.chmodSync(o,493)},l2=async()=>{Ns(),await Yr()},c2=(e,t)=>e!==null?Ee(e):t??zt,co=(e,t)=>({localBundleVersion:t,...e}),on=async e=>{let t=E(),r=Le(t),n=r?.bundleVersion??null,o=await wd();wt({event:"check_complete",ok:o.ok,message:o.message,localBundleVersion:n,remoteBundleVersion:null});let s=i2(t),i=c2(s,r?.appOrigin);if(i===null){let d=co({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return wt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}let a=await aE(i);if(a===null){let d=co({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return wt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}if(!(e?.force===!0||en(n,a.bundleVersion))){let d=co({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},n);return wt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),d}try{for(let b of a.scripts)await a2(i,t,b);let d=_d.default.join(t,hd);fr.default.existsSync(d)&&fr.default.rmSync(d,{force:!0}),Gf(t),Vf(t),io({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=M(ot(t));if(at(p)){let b=co({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return wt({event:"update_applied",ok:!0,message:b.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),b}await l2();let f=co({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return wt({event:"update_applied",ok:!0,message:f.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),f}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",f=co({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},n);return wt({event:"update_failed",ok:!1,message:p,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),f}},sn=()=>{let e=E();return{local:Le(e),logs:rn(20,e)}}});var cE={};St(cE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>yd,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>ri,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Pd,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>lo,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>$f,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Ff,appendAgentWitchSelfUpdateLog:()=>wt,buildAgentWitchEnsureOllamaShell:()=>ni,buildAgentWitchInstallScriptOllama:()=>oE,buildAgentWitchSelfUpdateStatus:()=>sn,ensureAgentWitchInstallVersionRecorded:()=>Ys,ensureAgentWitchOllamaInstalled:()=>wd,fetchAgentWitchRemoteInstallBundleVersion:()=>uo,isRemoteAgentWitchBundleVersionNewer:()=>en,readAgentWitchInstallVersion:()=>Le,readAgentWitchSelfUpdateLogs:()=>rn,resolveAgentWitchAppOriginFromWsUrl:()=>Ee,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Js,resolveAgentWitchInstallVersionPath:()=>Ks,resolveAgentWitchSelfUpdateLogPath:()=>Sd,runAgentWitchSelfUpdate:()=>on,writeAgentWitchInstallVersion:()=>io});var Ve=l(()=>{"use strict";Df();zf();lE();rh();nh();oh();sh()});var ih={};St(ih,{buildAgentWitchSelfUpdateStatus:()=>sn,fetchAgentWitchRemoteInstallBundleVersion:()=>uo,runAgentWitchSelfUpdate:()=>on});var ah=l(()=>{"use strict";Ve()});function po(e){return(0,dE.createHash)("sha256").update(e.trim()).digest("hex")}var dE,lh=l(()=>{"use strict";dE=require("node:crypto")});var mo,oi,d2,uE,ch,pE=l(()=>{"use strict";mo=m(require("node:fs")),oi=m(require("node:path"));lh();We();d2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uE=e=>{if(!mo.default.existsSync(e))return null;try{let t=JSON.parse(mo.default.readFileSync(e,"utf8"));return!d2(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:po(t.pairingToken.trim())}catch{return null}},ch=(e=E())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(uE(oi.default.join(e,"config.json")));let o=oi.default.join(e,jt);if(!mo.default.existsSync(o))return t;for(let s of mo.default.readdirSync(o)){let i=oi.default.join(o,s);mo.default.statSync(i).isDirectory()&&n(uE(oi.default.join(i,"config.json")))}return t}});var dh,mE,vd,si,ii,u2,p2,m2,gE,se,ie,Wd,_t,lt=l(()=>{"use strict";dh=m(require("node:fs")),mE=m(require("node:os")),vd=m(require("node:path")),si={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},ii=e=>e.trim().length>0,u2=e=>{let t=vd.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},p2=()=>{let e=mE.default.homedir(),t=vd.default.join(e,".local","bin","agent");if(dh.default.existsSync(t))return t;let r=vd.default.join(e,".local","bin","cursor-agent");return dh.default.existsSync(r)?r:si.cursorCommand},m2=e=>{let t=e.trim();return!ii(t)||t===si.cursorCommand?p2():t},gE=(e,t)=>u2(e)?t:["agent",...t],se=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ie=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:ii(t)?t.trim():si.claudeCommand,codexCommand:ii(r)?r.trim():si.codexCommand,cursorCommand:m2(n),antigravityCommand:ii(o)?o.trim():si.antigravityCommand}},Wd=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:gE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},_t=(e,t,r,n)=>{let o=t.trim();if(!ii(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:gE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",o])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var hr,g2,go,f2,fo,Ld=l(()=>{"use strict";hr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,g2=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([n,o])=>{if(typeof o!="object"||o===null)return{name:n,total:0};let s=o;return{name:n,total:hr(s.inputTokens)+hr(s.outputTokens)+hr(s.cacheReadInputTokens)+hr(s.cacheCreationInputTokens)}})].sort((n,o)=>o.total-n.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},go=e=>{let t=e.trim(),r=t.indexOf("{"),n=t.lastIndexOf("}");if(r<0||n<=r)return null;let o;try{o=JSON.parse(t.slice(r,n+1))}catch{return null}if(typeof o!="object"||o===null)return null;let s=o;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=hr(a.input_tokens)+hr(a.cache_creation_input_tokens)+hr(a.cache_read_input_tokens),d=hr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:g2(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},f2=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),fo=(e,t)=>{let r=go(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??f2(r)}}});var uh,h2,y2,ph,mh=l(()=>{"use strict";uh=e=>e.toLocaleString("en-US"),h2=e=>e<.01?e.toFixed(4):e.toFixed(3),y2=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${h2(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${uh(e.inputTokens)} in / ${uh(e.outputTokens)} out (${uh(e.totalTokens)} total)`,t].join(`
`)},ph=(e,t)=>{if(t===void 0)return e;let r=y2(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var Ed,gh=l(()=>{"use strict";Ed={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var an,fh,Rd,hh=l(()=>{"use strict";gh();an="auto",fh=e=>({value:an,label:`Auto (${Ed[e]})`}),Rd={anthropic:[fh("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[fh("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[fh("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var ho,ai,yh,li=l(()=>{"use strict";gh();hh();ho=e=>{let t=e?.trim()??"";if(!(t.length===0||t===an))return t},ai=(e,t)=>{let r=ho(t);return r===void 0?Ed[e]:r},yh=e=>{let t=ho(e);return t===void 0?an:t}});var kd,S2,A2,Cd,fE=l(()=>{"use strict";kd={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},S2=e=>{let t=kd[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?kd["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?kd["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?kd["gemini-2.0-flash"]:null},A2=(e,t,r)=>{let n=S2(e);if(n===null)return null;let o=t/1e6*n.inputUsd,s=r/1e6*n.outputUsd;return o+s},Cd=e=>{let t=A2(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var yo,b2,P2,w2,Td,hE=l(()=>{"use strict";fE();yo=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),b2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=yo(r.input_tokens),o=yo(r.output_tokens);return n===0&&o===0?null:Cd({provider:"anthropic",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},P2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=yo(r.prompt_tokens),o=yo(r.completion_tokens);return n===0&&o===0?null:Cd({provider:"openai",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},w2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let n=yo(r.promptTokenCount),o=yo(r.candidatesTokenCount);return n===0&&o===0?null:Cd({provider:"google",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},Td=(e,t,r)=>e==="anthropic"?b2(t,r):e==="openai"?P2(t,r):w2(t,r)});var _2,Sh,v2,W2,L2,E2,R2,Ah,bh=l(()=>{"use strict";li();hE();_2=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let n=r;return n.type==="text"&&typeof n.text=="string"?n.text:""}).join(""):""},Sh=(e,t,r)=>{let n=r?.trim()??"";return n.length>0?n:ai(e,t.model)},v2=async e=>{let t=Sh("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Anthropic API error (${String(r.status)})`};let o=_2(n);o.length>0&&e.onChunk?.(o);let s=Td("anthropic",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},W2=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.message;return typeof n?.content=="string"?n.content:""},L2=async e=>{let t=Sh("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`OpenAI API error (${String(r.status)})`};let o=W2(n);o.length>0&&e.onChunk?.(o);let s=Td("openai",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},E2=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.content?.parts;return Array.isArray(n)?n.map(o=>{if(typeof o!="object"||o===null)return"";let s=o.text;return typeof s=="string"?s:""}).join(""):""},R2=async e=>{let t=Sh("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,n=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),o=await n.json().catch(()=>null);if(!n.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Google API error (${String(n.status)})`};let s=E2(o);s.length>0&&e.onChunk?.(s);let i=Td("google",o,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Ah=async e=>{try{return e.provider==="anthropic"?await v2(e):e.provider==="openai"?await L2(e):await R2(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Ue,ci=l(()=>{"use strict";Ue=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var yE,k2,xd,Ph=l(()=>{"use strict";yE=m(require("node:path")),k2="writer-api-secrets.json",xd=e=>yE.default.join(e,k2)});var wh,SE,C2,yr,Ne,Sr=l(()=>{"use strict";wh=m(require("node:fs"));li();Ph();SE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),C2=e=>{if(!SE(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,n=ho(r);return{apiKey:t,...n!==void 0?{model:n}:{}}},yr=e=>{let t=xd(e);if(!wh.default.existsSync(t))return{};try{let r=JSON.parse(wh.default.readFileSync(t,"utf8"));if(!SE(r))return{};let n={},o=["anthropic","openai","google"];for(let s of o){let i=C2(r[s]);i!==null&&(n[s]=i)}return n}catch{return{}}},Ne=(e,t)=>yr(e)[t]??null});var Re,di=l(()=>{"use strict";Re=e=>e==="api"?"api":"cli"});var AE,he,ln,Gt=l(()=>{"use strict";AE=m(require("node:path"));ci();Sr();di();he=e=>AE.default.dirname(e),ln=(e,t)=>{if(Re(e.writerExecutionBackend)!=="api")return!1;let r=Ue(t);if(r===null)return!1;let n=he(e.layout.configPath),o=Ne(n,r);return o!==null&&o.apiKey.length>0}});var ui,_h=l(()=>{"use strict";mh();bh();ci();Sr();Gt();ui=async(e,t,r,n)=>{let o=r.trim();if(o.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Ue(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=he(e.layout.configPath),a=Ne(i,s);if(a===null){let d=Object.keys(yr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Ah({provider:s,secret:a,prompt:o,onChunk:n});return{exitCode:c.exitCode,output:ph(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var bE,So,vh=l(()=>{"use strict";bE=require("node:child_process");lt();Ld();_h();Gt();So=(e,t,r)=>new Promise(n=>{if(!se(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(ln(e,t)){ui(e,t,r).then(n);return}let o=_t(t,r,ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,bE.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=fo(i.join("")),p=a.join("").trim(),f=[d.output.trim(),p].filter(b=>b.length>0).join(`
`);n({exitCode:c??-1,output:f})}),s.on("error",c=>{n({exitCode:-1,output:c.message})})})});var PE=l(()=>{"use strict"});var wE=l(()=>{"use strict";mh();vh();bh();PE();Sr();Gt()});var _E,vE,WE,LE=l(()=>{"use strict";_E="claude",vE="codex",WE="cursor"});var EE,T2,Wh,pi,Id=l(()=>{"use strict";EE=m(require("node:path"));Bt();bt();T2="ws://localhost:3000/api/agent-witch/ws",Wh=e=>e.replace(/\/$/,""),pi=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Wh(t);let r=EE.default.basename(e.installDir);if(r===ks.production)return Ad;let n=e.configWsUrl?.trim()??"";return r===ks.localhost?n.length>0?Wh(n):T2:n.length>0?Wh(n):Ad}});var I2,Lh,Eh=l(()=>{"use strict";LE();Id();di();I2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Lh=e=>{if(!I2(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=pi({installDir:e.layout.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??_E,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??vE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??WE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:n,workspace:o,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Re(t.writerExecutionBackend),layout:e.layout}}}});var Rh,kh,Ch=l(()=>{"use strict";Rh=m(require("node:fs"));B();Eh();kh=e=>{let t=M(e);if(!Rh.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Rh.default.readFileSync(t.configPath,"utf8")),n=Lh({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!n.ok){if(n.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return n.config}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}}});var mi,RE=l(()=>{"use strict";mi=(e,t,r)=>{let n=r?.trim()??"",o=e?.trim()??"";return n.length>0?o.length>0?o:null:o.length>0?o:t()}});var Th,O2,xh,kE=l(()=>{"use strict";Th=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),O2=e=>{if(!Th(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",n=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||n.length===0||!Array.isArray(e.entries))return null;let o=e.entries.flatMap(s=>{if(!Th(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(f=>{if(!Th(f))return[];let b=typeof f.itemKey=="string"?f.itemKey.trim():"",h=typeof f.relativePath=="string"?f.relativePath:"",y=typeof f.contentSha256=="string"?f.contentSha256.trim():"";return b.length===0||y.length===0?[]:[{itemKey:b,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:n,entries:o}},xh=O2});var CE,M2,Od,Ih=l(()=>{"use strict";CE=m(require("node:path")),M2=(e,t)=>{let r=t.trim();return CE.default.join(e,"components","store",r.slice(0,2),r)},Od=M2});var TE,N2,Oh,xE=l(()=>{"use strict";TE=m(require("node:fs"));Ih();N2=(e,t)=>{let r=[];for(let n of t.entries)for(let o of n.items){let s=Od(e.installDir,o.contentSha256);TE.default.existsSync(s)||r.push(o.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},Oh=N2});var gi,Ao,j2,Mh,D2,Nh,jh=l(()=>{"use strict";gi=m(require("node:fs")),Ao=m(require("node:path"));Ih();j2=(e,t)=>Ao.default.join(e.installDir,"runs",t,"overlay"),Mh=(e,t)=>Ao.default.join(j2(e,t),".cursor"),D2=(e,t,r)=>{let n=r.entries.filter(s=>s.scope==="run");if(n.length===0)return{ok:!0};let o=Mh(e,t);gi.default.mkdirSync(o,{recursive:!0});for(let s of n)for(let i of s.items){let a=Od(e.installDir,i.contentSha256);if(!gi.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Ao.default.join(o,c):Ao.default.join(o,i.itemKey);gi.default.mkdirSync(Ao.default.dirname(d),{recursive:!0}),gi.default.copyFileSync(a,d)}return{ok:!0}},Nh=D2});var Dh,IE,H2,fi,OE=l(()=>{"use strict";Dh=m(require("node:fs")),IE=m(require("node:path")),H2=(e,t)=>{let r=IE.default.join(e.installDir,"runs",t);Dh.default.existsSync(r)&&Dh.default.rmSync(r,{recursive:!0,force:!0})},fi=H2});var $2,Hh,ME=l(()=>{"use strict";jh();$2=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let n=Mh(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:n}},Hh=$2});var $h,F2,z2,U2,B2,G2,$,NE=l(()=>{"use strict";$h=m(require("node:fs"));Id();B();di();F2="claude",z2="codex",U2="cursor",B2="agy",G2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=M();if(!$h.default.existsSync(e.configPath))return null;try{let t=JSON.parse($h.default.readFileSync(e.configPath,"utf8"));if(!G2(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=pi({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,writerExecutionBackend:Re(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:F2,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:z2,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:U2,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:B2,pairingToken:s,layout:e}}catch{return null}}});var Md,jE,DE=l(()=>{"use strict";Md=m(require("node:fs"));Ph();jE=(e,t)=>{let r=xd(e);Md.default.mkdirSync(e,{recursive:!0}),Md.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Md.default.chmodSync(r,384)}catch{}}});var Nd,HE,Fh=l(()=>{"use strict";Nd=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),n=t.slice(-4);return`${r}${"\u2022".repeat(12)}${n}`},HE=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Nd(t)}});var hi,V2,zh,Uh,$E=l(()=>{"use strict";hi=m(require("node:fs"));Sr();DE();Fh();li();Gt();V2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zh=(e,t,r,n)=>{let o=e[t],s=r?.trim()??"",i=HE(s,o?.apiKey)?"":s,a=i.length>0?i:o?.apiKey;if(a===void 0||a.length===0)return e;let c=n!==void 0?ho(n):o?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Uh=e=>{let t=he(e.configPath),r={};if(hi.default.existsSync(e.configPath))try{let o=JSON.parse(hi.default.readFileSync(e.configPath,"utf8"));V2(o)&&(r={...o})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,hi.default.mkdirSync(t,{recursive:!0}),hi.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let n=zh(zh(zh(yr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);jE(t,n)}});var Bh,FE=l(()=>{"use strict";Bh={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var Gh,zE=l(()=>{"use strict";ci();Sr();Gt();Gt();Gh=(e,t)=>{if(ln(e,t))return!1;let r=Ue(t);if(r===null)return!1;let n=he(e.layout.configPath),o=Ne(n,r);return o===null||o.apiKey.trim().length===0}});var UE,Vh,qh=l(()=>{"use strict";UE=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let n=e.readConfig(r);return n===null?[]:[n]})},Vh=async e=>{let t=UE(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=UE(e);if(o.length>0){r(o);return}setTimeout(n,e.pollIntervalMs)};n()}))}});var q2,Kh,BE=l(()=>{"use strict";te();Ch();qh();q2=1e4,Kh=()=>Vh({listProfileEmails:ad,readConfig:kh,pollIntervalMs:q2,logWaiting:e=>{console.error(e)}})});var ae=l(()=>{"use strict";vh();wE();Ch();Id();RE();kE();xE();jh();OE();ME();di();NE();$E();Sr();Gt();Fh();li();FE();_h();Gt();zE();ci();Sr();BE();Eh();qh()});var jd,GE,K2,J2,VE,Dd,yi,Hd,Si=l(()=>{"use strict";jd=m(require("node:fs")),GE=m(require("node:path")),K2="wake-port.json",J2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VE=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Dd=e=>GE.default.join(e,K2),yi=e=>{let t=Dd(e);if(!jd.default.existsSync(t))return null;try{let r=JSON.parse(jd.default.readFileSync(t,"utf8"));if(J2(r)&&VE(r.wakePort))return r.wakePort}catch{return null}return null},Hd=(e,t)=>{if(!VE(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Dd(e);jd.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Wee,Lee,Eee,ct,qE,Ai=l(()=>{"use strict";Si();We();Si();Wee=nt(),Lee=`${re()}-wake`,Eee=re(),ct=()=>{let e=E(),t=yi(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return nt()},qE=e=>{let t=E();yi(t)===null&&Hd(t,e)}});var KE=l(()=>{"use strict";lh();te();pE();ae();Ai()});var Jh,bi,Pi,JE=l(()=>{"use strict";Jh=m(require("node:os"));KE();bi=()=>{let e=ee();return{ok:!0,port:ct(),hostname:Jh.default.hostname(),profileCount:e.length}},Pi=()=>{let e=ee(),t=$()?.pairingToken.trim()??"",r=t.length>0?po(t):null,n=ch();return{hostname:Jh.default.hostname(),port:ct(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var Yh=l(()=>{"use strict";JE()});var YE,XE,ZE,$d,bo=l(()=>{"use strict";YE="materialization.json",XE="backups",ZE=".gitignore",$d=e=>`harness-set:${e.trim()}`});var QE,eR,Fd,tR=l(()=>{"use strict";QE=m(require("node:crypto")),eR=m(require("node:fs")),Fd=e=>{try{let t=eR.default.readFileSync(e);return QE.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Ar,cn,Y2,rR,Xh,nR=l(()=>{"use strict";Ar=m(require("node:fs")),cn=m(require("node:path"));tR();Y2=(e,t,r,n)=>{let o=new Date().toISOString().replaceAll(":","-"),s=cn.default.join(t,o,n);return Ar.default.mkdirSync(cn.default.dirname(s),{recursive:!0}),Ar.default.copyFileSync(r,s),cn.default.relative(e,s).replaceAll("\\","/")},rR=e=>{let t=cn.default.join(e.repoRoot,e.repoRelativeDestination),r=Fd(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let n=e.ledger.entries[e.repoRelativeDestination];if(Ar.default.existsSync(t)){let o=Fd(t);if(o===r)return{kind:"skipped_unchanged"};if(!(n!==void 0&&n.componentId===e.componentId)&&o!==null){let i=Y2(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Ar.default.mkdirSync(cn.default.dirname(t),{recursive:!0}),Ar.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Ar.default.mkdirSync(cn.default.dirname(t),{recursive:!0}),Ar.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},Xh=e=>{let t=Fd(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var Zh,oR,zd,Qh=l(()=>{"use strict";Zh=m(require("node:fs"));bo();oR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zd=e=>{if(!Zh.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(Zh.default.readFileSync(e,"utf8"));if(oR(t)&&t.version===1&&oR(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var br,Ud,sR,iR=l(()=>{"use strict";br=m(require("node:fs")),Ud=m(require("node:path"));bo();sR=e=>{let t=new Set(e.setSlugs.map(s=>$d(s))),r=[],n=[],o={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){o[s]=i;continue}let a=Ud.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Ud.default.join(e.repoRoot,i.backupPath);br.default.existsSync(c)?(br.default.mkdirSync(Ud.default.dirname(a),{recursive:!0}),br.default.copyFileSync(c,a),n.push(s)):br.default.existsSync(a)&&br.default.rmSync(a,{force:!0})}else br.default.existsSync(a)&&br.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:o},summary:{removedPaths:r,restoredPaths:n}}}});var ey,Bd,ty=l(()=>{"use strict";ey=m(require("node:path"));bo();Bd=e=>({ledgerFilePath:ey.default.join(e.metaDirPath,YE),backupsDirPath:ey.default.join(e.metaDirPath,XE)})});var ry,aR,lR=l(()=>{"use strict";ry=m(require("node:path")),aR=(e,t)=>{let n=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(n.length===0)return ry.default.posix.join("rules",e,"file");let o=n[n.length-1]??"file",s=n[0]??"rules";return ry.default.posix.join(s,e,o)}});var ny,cR,oy,dR=l(()=>{"use strict";ny=m(require("node:fs")),cR=m(require("node:path")),oy=(e,t)=>{ny.default.mkdirSync(cR.default.dirname(e),{recursive:!0}),ny.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var sy,X2,qe,_i=l(()=>{"use strict";sy=m(require("node:os")),X2=e=>{let t=e.trim();return t.startsWith("~/")?`${sy.default.homedir()}${t.slice(1)}`:t==="~"?sy.default.homedir():t},qe=X2});var Gd,uR,Z2,pR,mR=l(()=>{"use strict";Gd=m(require("node:fs")),uR=m(require("node:path"));bo();Xr();Z2=`*
!${dd}
`,pR=e=>{let t=uR.default.join(e,ZE);Gd.default.existsSync(t)||(Gd.default.mkdirSync(e,{recursive:!0}),Gd.default.writeFileSync(t,Z2))}});var dn,Ke,un=l(()=>{"use strict";dn=m(require("node:path"));Xr();_i();Ke=e=>{let t=qe(e),r=dn.default.join(t,wL);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:dn.default.join(r,"rag"),memoryDirPath:dn.default.join(r,_L),reportsDirPath:dn.default.join(r,WL),metaFilePath:dn.default.join(r,dd),ragChunksFilePath:dn.default.join(r,"rag",vL)}}});var vt,fR,Q2,e5,Be,iy=l(()=>{"use strict";vt=m(require("node:fs")),fR=m(require("node:path"));Xr();mR();un();Q2=(e,t)=>{if(vt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};vt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},e5=e=>{vt.default.existsSync(e.ragChunksFilePath)||vt.default.writeFileSync(e.ragChunksFilePath,"");let t=fR.default.join(e.memoryDirPath,eo);vt.default.existsSync(t)||vt.default.writeFileSync(t,"")},Be=e=>{let t=Ke(e.projectFolderPath);return vt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),vt.default.mkdirSync(t.ragDirPath,{recursive:!0}),vt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),pR(t.metaDirPath),Q2(t,e),e5(t),{ok:!0,layout:t}}});var hR,yR,SR,AR,Vd,qd=l(()=>{"use strict";hR="components",yR="store",SR="versions",AR="installed.json",Vd=e=>`harness-set:${e.trim()}`});var ay,bR,Kd,ly=l(()=>{"use strict";ay=m(require("node:fs")),bR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Kd=e=>{if(!ay.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(ay.default.readFileSync(e,"utf8"));if(bR(t)&&t.version===1&&bR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var vi,Po,Jd=l(()=>{"use strict";vi=m(require("node:path"));qd();Po=e=>{let t=vi.default.join(e,hR);return{componentsRootDir:t,storeDir:vi.default.join(t,yR),versionsDir:vi.default.join(t,SR),installedFilePath:vi.default.join(t,AR)}}});var cy,PR,Yd,Xd,Zd=l(()=>{"use strict";cy=m(require("node:crypto")),PR=m(require("node:fs")),Yd=e=>cy.default.createHash("sha256").update(e,"utf8").digest("hex"),Xd=e=>{try{let t=PR.default.readFileSync(e);return cy.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var dy,wR,_R,vR=l(()=>{"use strict";dy=m(require("node:fs")),wR=m(require("node:path")),_R=(e,t)=>{dy.default.mkdirSync(wR.default.dirname(e),{recursive:!0}),dy.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var uy,py,WR,LR=l(()=>{"use strict";uy=m(require("node:fs")),py=m(require("node:path")),WR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),n=py.default.join(e,r),o=py.default.join(n,`${t.versionId}.json`);uy.default.mkdirSync(n,{recursive:!0}),uy.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`)}});var Qd,ER,RR,kR=l(()=>{"use strict";Qd=m(require("node:fs")),ER=m(require("node:path"));Zd();RR=e=>{let t=Yd(e.content),r=ER.default.join(e.storeDir,t);return Qd.default.existsSync(r)||(Qd.default.mkdirSync(e.storeDir,{recursive:!0}),Qd.default.writeFileSync(r,e.content)),t}});var my,CR,t5,eu,gy=l(()=>{"use strict";my=m(require("node:fs")),CR=m(require("node:path"));qd();ly();Jd();Zd();vR();LR();kR();t5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eu=e=>{let t=Po(e.installDir),r=Vd(e.setSlug),n=String(e.setEntry.version),o=[];for(let i of e.setEntry.items){if(!t5(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=CR.default.join(e.harnessRootDir,a);if(!my.default.existsSync(c))continue;let d=my.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Xd(c);if(p!==null){if(Yd(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);RR({storeDir:t.storeDir,content:d}),o.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(o.length===0)return;WR(t.versionsDir,{version:1,componentId:r,versionId:n,items:o,createdAt:new Date().toISOString()});let s=Kd(t.installedFilePath);_R(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:n,installedAt:new Date().toISOString()}}})}});var hy,fy,TR,xR=l(()=>{"use strict";hy=m(require("node:fs"));gy();ly();Jd();fy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),TR=e=>{if(!hy.default.existsSync(e.harnessManifestPath))return;let t=Po(e.installDir),r=Kd(t.installedFilePath);if(Object.keys(r.components).length>0)return;let n;try{n=JSON.parse(hy.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!fy(n)||n.version!==1||!fy(n.sets)))for(let[o,s]of Object.entries(n.sets)){if(!fy(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];eu({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:o,setEntry:{version:i,items:a}})}}});var yy,IR,OR,MR=l(()=>{"use strict";yy=m(require("node:fs")),IR=m(require("node:path")),OR=e=>{let t=e.componentId.replaceAll("/","_"),r=IR.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!yy.default.existsSync(r))return null;try{let n=JSON.parse(yy.default.readFileSync(r,"utf8"));if(typeof n=="object"&&n!==null&&n.version===1)return n}catch{return null}return null}});var tu,ru,NR,jR=l(()=>{"use strict";tu=m(require("node:fs")),ru=m(require("node:path"));qd();xR();MR();Jd();Zd();NR=e=>{TR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Po(e.layout.installDir),r=Vd(e.setSlug),n=OR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(n!==null){let i=n.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=ru.default.join(t.storeDir,i.contentSha256);if(tu.default.existsSync(a)&&Xd(a)===i.contentSha256)return a}}let o=e.manifestItemPath.trim();if(o.length===0)return null;let s=o.startsWith("shared/")?ru.default.join(e.layout.harnessRootDir,o):ru.default.join(e.layout.harnessSetsDir,e.setSlug,o);if(!tu.default.existsSync(s))return null;try{if(!tu.default.statSync(s).isFile())return null}catch{return null}return s}});var DR,r5,n5,Pr,nu=l(()=>{"use strict";Qh();ty();un();DR="harness-set:",r5=e=>{let t=e.trim();if(!t.startsWith(DR))return null;let r=t.slice(DR.length).trim();return r.length>0?r:null},n5=e=>{let t=new Set;for(let r of Object.values(e.entries)){let n=r5(r.componentId);n!==null&&t.add(n)}return[...t].sort((r,n)=>r.localeCompare(n))},Pr=e=>{let t=Ke(e),{ledgerFilePath:r}=Bd(t),n=zd(r);return n5(n)}});var ou,Sy,Wi,o5,Vt,Li,wo=l(()=>{"use strict";ou=m(require("node:fs")),Sy=m(require("node:os")),Wi=m(require("node:path")),o5=()=>ou.default.realpathSync(Wi.default.resolve(Sy.default.homedir())),Vt=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Wi.default.join(Sy.default.homedir(),t.slice(1)):t,n;try{n=ou.default.realpathSync(Wi.default.resolve(r))}catch{return null}let o=o5();return n===o||n.startsWith(`${o}${Wi.default.sep}`)?n:null},Li=e=>{let t=Vt(e);if(t===null)return null;try{if(!ou.default.statSync(t).isFile())return null}catch{return null}return t}});var Ay,by=l(()=>{"use strict";Ay=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var iu,HR,su,s5,Ei,Py=l(()=>{"use strict";iu=m(require("node:fs")),HR=m(require("node:path"));bo();nR();Qh();iR();ty();lR();dR();_i();iy();jR();nu();wo();by();su=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),s5=e=>{if(!iu.default.existsSync(e))return null;try{let t=JSON.parse(iu.default.readFileSync(e,"utf8"));if(su(t)&&t.version===1)return t}catch{return null}return null},Ei=e=>{let t=[...new Set(e.setSlugs.map(S=>S.trim()).filter(S=>S.length>0))],r=qe(e.projectFolderPath),n=Vt(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=iu.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Be({projectFolderPath:n}),{ledgerFilePath:i,backupsDirPath:a}=Bd(s.layout),d=Pr(n).filter(S=>!t.includes(S)),p=zd(i),f=0;if(d.length>0){let S=sR({repoRoot:n,setSlugs:d,ledger:p});p=S.ledger,f=S.summary.removedPaths.length}if(t.length===0)return oy(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:f,projectFolderPath:n,appliedSetSlugs:[]};let b=s5(e.layout.harnessManifestPath);if(b===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=su(b.sets)?b.sets:{},y=0,u=0,A=0;for(let S of t){let g=h[S];if(!su(g))return{ok:!1,errorMessage:`Harness set "${S}" is not installed locally.`};let w=typeof g.version=="number"?String(g.version):"1",_=$d(S),v=Array.isArray(g.items)?g.items:[];for(let L of v){if(!su(L))continue;let R=typeof L.path=="string"?L.path.trim():"";if(R.length===0)continue;let T=Ay(R);if(T===null)continue;let I=aR(S,T),D=HR.default.posix.join(".cursor",I).replaceAll("\\","/"),le=typeof L.id=="string"?L.id.trim():"",V=NR({layout:e.layout,setSlug:S,setVersion:typeof g.version=="number"?g.version:1,manifestItemPath:R,manifestItemId:le});if(V===null)continue;let q=rR({repoRoot:n,backupsDir:a,repoRelativeDestination:D,sourceAbsolutePath:V,componentId:_,versionId:w,ledger:p});if(q.kind==="skipped_unchanged"){u+=1;continue}if(q.kind==="backed_up_user_file"){A+=1,y+=1,p={version:1,entries:{...p.entries,[D]:Xh({componentId:_,versionId:w,sourceAbsolutePath:V,backupPath:q.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[D]:Xh({componentId:_,versionId:w,sourceAbsolutePath:V})}}}}return y===0&&u===0&&f===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(oy(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:A,removedLedgerPathCount:f,projectFolderPath:n,appliedSetSlugs:t})}});var $R,au,i5,a5,l5,c5,d5,u5,p5,m5,g5,Ri,lu=l(()=>{"use strict";$R=m(require("node:crypto")),au=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},i5=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},a5=(e,t)=>{let r=i5(t),n=au(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},l5=(e,t,r)=>{let n=a5(t,r);return`shared/items/${e}/${n}`},c5=["rules","skills","commands","instructions","agents"],d5=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),u5=(e,t)=>[...e.filter(n=>n.id!==t.id),t],p5=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},m5=e=>$R.default.createHash("sha256").update(e,"utf8").digest("hex"),g5=e=>({id:e.id,kind:e.kind,title:e.title,path:l5(e.id,e.kind,e.title),contentSha256:m5(e.content)}),Ri=e=>{let t=new Date().toISOString(),r=e.existingManifest??d5(e.hostname,t),n=au(e.bundle.slug),o=p5(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...c5.map(d=>`sets/${n}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let f=g5(p);return{files:[...d.files,{relativePath:f.path,content:p.content}],nextItems:u5(d.nextItems,f)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var wr,FR,cu,f5,pn,wy=l(()=>{"use strict";wr=m(require("node:fs")),FR=m(require("node:os")),cu=m(require("node:path"));lu();f5=e=>{if(!wr.default.existsSync(e))return null;try{let t=JSON.parse(wr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},pn=e=>{try{let t=f5(e.layout.harnessManifestPath),r=Ri({bundle:e.bundle,hostname:FR.default.hostname(),existingManifest:t});wr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let n of r.directories)wr.default.mkdirSync(cu.default.join(e.layout.harnessRootDir,n),{recursive:!0});for(let n of r.files){let o=cu.default.join(e.layout.harnessRootDir,n.relativePath);wr.default.mkdirSync(cu.default.dirname(o),{recursive:!0}),wr.default.writeFileSync(o,n.content)}return wr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var _y,zR=l(()=>{"use strict";wy();Py();_y=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=pn({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Ei({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var UR,BR=l(()=>{"use strict";UR=["rule","skill","command","instruction","agent"]});var GR,h5,y5,Wt,vy=l(()=>{"use strict";BR();GR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),h5=e=>typeof e=="string"&&UR.includes(e),y5=e=>{if(!GR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!h5(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Wt=e=>{if(!GR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=y5(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var VR,S5,Wy,qR=l(()=>{"use strict";VR=require("node:zlib");vy();S5="x-agent-witch-token",Wy=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[S5]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let n=r.headers.get("x-content-sha256")?.trim()??"";if(n.length>0&&n!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let o=Buffer.from(await r.arrayBuffer()),s=(0,VR.gunzipSync)(o).toString("utf8"),i=JSON.parse(s),a=Wt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var Ey,Ly,_r,KR=l(()=>{"use strict";Ey=m(require("node:fs")),Ly=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_r=e=>{if(!Ey.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Ey.default.readFileSync(e.harnessManifestPath,"utf8"));if(!Ly(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=Ly(t.sets)?t.sets:{},o=Object.entries(n).map(([s,i])=>{if(!Ly(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var du,JR=l(()=>{"use strict";du=()=>"~"});var YR,XR,ZR=l(()=>{"use strict";YR=require("node:crypto"),XR=e=>`local-${(0,YR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Ry,QR=l(()=>{"use strict";Ry=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var ki,uu,ky=l(()=>{"use strict";ki=m(require("node:path")),uu=e=>{let t=ki.default.dirname(e),r=ki.default.basename(t);return r==="agents"?ki.default.basename(ki.default.dirname(t)):r}});var Ci,qt,ek,A5,b5,P5,pu,tk,Cy=l(()=>{"use strict";Ci=m(require("node:fs")),qt=m(require("node:path"));ZR();QR();ky();ek=new Set(["node_modules",".git","dist","build",".next","coverage"]),A5=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},b5=(e,t)=>{let r=qt.default.basename(t);if(e==="skill"){let n=t.split(qt.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},P5=e=>{let t=[],r=(o,s)=>{let i;try{i=Ci.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&ek.has(a.name))continue;let c=qt.default.join(o,a.name),d=s?qt.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;Ry(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=qt.default.join(e,o);Ci.default.existsSync(s)&&r(s,o)}let n=qt.default.join(e,"skills");return Ci.default.existsSync(n)&&r(n,"skills"),t},pu=e=>{let t=P5(e);if(t.length===0)return null;let r=qt.default.dirname(e),n=uu(e),o=A5(n),s=t.map(i=>{let a=Ry(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:XR(i.absolutePath),kind:a,title:b5(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},tk=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=Ci.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||ek.has(a.name))continue;let c=qt.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var rk,Ty,w5,xy,nk=l(()=>{"use strict";rk=m(require("node:fs")),Ty=m(require("node:path"));Cy();wo();w5=e=>{let t=Vt(e.trim());if(t===null)return null;if(Ty.default.basename(t)===".cursor")return t;let r=Ty.default.join(t,".cursor");try{if(rk.default.statSync(r).isDirectory())return Vt(r)}catch{return null}return null},xy=e=>{let t=w5(e.projectPath);if(t===null)return null;let r=pu(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var ok,_5,mu,Iy,sk=l(()=>{"use strict";ok=m(require("node:path"));Cy();wo();ky();_5=5,mu=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Iy=e=>{let t=Vt(e.scanRoot.trim());if(t===null)return mu(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of tk(t,_5,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=Vt(s);if(i===null)continue;let a=uu(i);mu(e.response,"folder",{cursorDir:i,groupName:a,repoPath:ok.default.dirname(i)});let c=pu(i);c!==null&&(r.push(c),mu(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return mu(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var ik,ak,lk=l(()=>{"use strict";ik=m(require("node:path")),ak=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:ik.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var Te,ck,Oy,v5,My,Ny,gu,jy,Ti,dk=l(()=>{"use strict";Te=m(require("node:fs")),ck=m(require("node:os")),Oy=m(require("node:path"));lu();gy();wo();lk();v5=e=>{if(!Te.default.existsSync(e))return null;try{let t=JSON.parse(Te.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},My=e=>{let t=e.hostname??ck.default.hostname(),r=v5(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let f=Li(p.sourcePath);if(f===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let b=Te.default.readFileSync(f,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:b,setSlugs:[i.slug]})}let d=Ri({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)o.add(p);for(let p of d.files)s.push(p),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Te.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)Te.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=Oy.default.join(e.layout.harnessRootDir,i.relativePath);Te.default.mkdirSync(Oy.default.dirname(a),{recursive:!0}),Te.default.writeFileSync(a,i.content)}Te.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=au(i.slug),d=r.sets[c];d!==void 0&&eu({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},Ny="reveal-cache.json",gu=(e,t)=>{Te.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Te.default.writeFileSync(`${e.harnessRootDir}/${Ny}`,`${JSON.stringify(t,null,2)}
`)},jy=e=>{let t=`${e.harnessRootDir}/${Ny}`;Te.default.existsSync(t)&&Te.default.unlinkSync(t)},Ti=e=>{let t=`${e.harnessRootDir}/${Ny}`;if(!Te.default.existsSync(t))return null;try{let r=JSON.parse(Te.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return ak(r)}catch{return null}return null}});var mn=l(()=>{"use strict";Py();zR();by();wy();qR();vy();lu();KR();JR();nk();wo();sk();dk()});var Dy,uk=l(()=>{"use strict";mn();We();Dy=e=>{let t=M(e.profileEmail);return pn({bundle:e.bundle,layout:t})}});var pk=l(()=>{"use strict";uk();mn()});var W5,mk,L5,gk,gn,fu,fk=l(()=>{"use strict";W5=["agentwitch.com","www.agentwitch.com"],mk=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,L5=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},gk=e=>{let t=L5(e);return!!(W5.includes(t)||mk.test(e.trim().toLowerCase()))},gn=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return gk(r)?mk.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},fu=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:gn(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var xi=l(()=>{"use strict";fk()});var Kt,Ii=l(()=>{"use strict";Kt=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Oi,hk=l(()=>{"use strict";pk();xi();Ii();Oi=e=>{if(!Kt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Wt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!gn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=Dy({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}}});var Hy=l(()=>{"use strict";hk()});var E5,_o,$y=l(()=>{"use strict";E5=e=>e==="hourly"||e==="daily"||e==="weekdays",_o=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!E5(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Mi,hu,yk,Sk,Fy,dt,yu,Su,Au,bu,Pu=l(()=>{"use strict";Mi=m(require("node:fs")),hu=m(require("node:path"));$y();yk="automations.json",Sk=e=>e.profileEmail!==null?hu.default.join(e.installDir,"profiles",e.profileEmail,yk):hu.default.join(e.installDir,yk),Fy=()=>({version:1,automations:[]}),dt=e=>{let t=Sk(e);if(!Mi.default.existsSync(t))return Fy();try{let r=JSON.parse(Mi.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?Fy():{version:1,automations:r.automations.flatMap(o=>{let s=_o(o);return s!==null?[s]:[]})}}catch{return Fy()}},yu=(e,t)=>{let r=Sk(e);Mi.default.mkdirSync(hu.default.dirname(r),{recursive:!0}),Mi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Su=(e,t)=>{yu(e,{version:1,automations:t})},Au=(e,t)=>{let n=dt(e).automations.filter(o=>o.id!==t.id);yu(e,{version:1,automations:[...n,t]})},bu=(e,t)=>dt(e).automations.find(r=>r.id===t)??null});var je,vr=l(()=>{"use strict";je="x-agent-witch-token"});var Z,fn,zy,Ni,Uy,R5,By,ji,Di,Gy,Hi=l(()=>{"use strict";vr();Ve();Z=e=>{let t=Ee(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},fn=e=>({[je]:e,"Content-Type":"application/json"}),zy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:fn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Ni=async(e,t,r,n,o)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:fn(e.pairingToken),body:JSON.stringify({exitCode:r,output:n,...typeof o?.estimateSeconds=="number"?{estimateSeconds:o.estimateSeconds}:{},...typeof o?.actualSeconds=="number"?{actualSeconds:o.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Uy=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:fn(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},R5=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let n of t.projects){if(typeof n!="object"||n===null)continue;let o=n,s=typeof o.id=="string"?o.id.trim():"",i=typeof o.name=="string"?o.name.trim():"",a=typeof o.folderPath=="string"?o.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},By=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:fn(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n;if(o.ok!==!0||typeof o.project!="object")return null;let s=o.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},ji=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:fn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return R5(r)}catch{return null}},Di=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:fn(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},Gy=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:fn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var hn,Ak,bk,k5,Vy,Pk,qy=l(()=>{"use strict";hn=m(require("node:fs")),Ak=m(require("node:path")),bk=e=>Ak.default.join(e.harnessRootDir,"projects-registry.json"),k5=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),Vy=e=>{let t=bk(e);if(!hn.default.existsSync(t))return[];try{let r=JSON.parse(hn.default.readFileSync(t,"utf8"));return k5(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string").map(n=>({id:n.id,name:n.name,projectFolderPath:n.projectFolderPath,addedAt:typeof n.addedAt=="string"?n.addedAt:new Date().toISOString(),...typeof n.cloudProjectId=="string"&&n.cloudProjectId.length>0?{cloudProjectId:n.cloudProjectId}:{}})):[]}catch{return[]}},Pk=e=>{let t=bk(e);if(!hn.default.existsSync(t))return;let r=`${t}.migrated`;if(hn.default.existsSync(r)){hn.default.unlinkSync(t);return}hn.default.renameSync(t,r)}});var wk,C5,T5,_k,vk=l(()=>{"use strict";_i();wk=e=>qe(e),C5=e=>new Set(e.map(t=>wk(t.folderPath))),T5=e=>new Set(e.map(t=>t.id)),_k=(e,t)=>{let r=C5(t),n=T5(t),o=[],s=new Set;for(let i of e){let a=wk(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&n.has(i.cloudProjectId)||(s.add(a),o.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return o}});var Ky,Jy=l(()=>{"use strict";Hi();qy();vk();Ky=async(e,t)=>{let r=Vy(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let n=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let o=await ji(n);if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=_k(r,o),i=r.length-s.length,a=0,c=0;for(let d of s)await By(n,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&Pk(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var Yy,yn,wu=l(()=>{"use strict";Yy=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),yn=(e,t)=>e.find(r=>r.id===t)??null});var vo,_u=l(()=>{"use strict";Hi();Jy();wu();vo=async(e,t)=>{t!==void 0&&await Ky(t,e);let r=Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let n=await ji(r);if(n===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let o=Yy(n);return{ok:!0,projects:o,message:o.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${o.length} project${o.length===1?"":"s"} from Agent Witch Console.`}}});var Wk=l(()=>{"use strict"});var xe,Lk,x5,I5,O5,M5,Wo,Xy=l(()=>{"use strict";xe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lk=(e,t)=>e.length===0?`<p class="empty">${xe(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${xe(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${xe(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,x5=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,I5=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${xe(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,O5=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?I5(e.project):x5();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(n=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${xe(n.slug)}"${t.size===0||t.has(n.slug)?" checked":""} />
            <span><strong>${xe(n.name)}</strong> <span class="muted mono">(${xe(n.slug)})</span></span>
          </label>
          <p class="muted">${n.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${xe(e.project.id)}" />
        <p class="field-label">Installed</p>
        <p class="lede">Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.</p>
        ${r}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`},M5=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${xe(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${xe(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Wo=e=>{let t=e.flashError?`<div class="alert-error">${xe(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${xe(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},n=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${xe(c)}</a>`,o=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=O5({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=Lk(o,"No workflows installed for this project yet."):e.activeTab==="agents"?i=Lk(s,"No agents installed for this project yet."):i=M5({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${xe(e.project.name)}</h1>
      <p class="muted mono">${xe(e.project.projectFolderPath)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(e.project.id)}">Change folder\u2026</a></div>
      <nav class="project-tabs" aria-label="Project composition">
        ${n("harness",`Harness (${r.harness})`)}
        ${n("workflows",`Workflows (${r.workflow})`)}
        ${n("agents",`Agents (${r.agent})`)}
        ${n("knowledge",`Knowledge (${e.knowledgeCandidateCount})`)}
      </nav>
      <div class="project-tab-panel">
        ${i}
      </div>
    </section>`}});var N5,j5,Ek,Rk=l(()=>{"use strict";mn();vr();N5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),j5=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[je]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();return!N5(n)||n.ok!==!0||!Array.isArray(n.bundles)?null:n.bundles.flatMap(o=>{let s=Wt(o);return s===null?[]:[s]})}catch{return null}},Ek=j5});var kk,Zy,Ck=l(()=>{"use strict";ae();mn();Xy();_u();Rk();wu();nu();Hi();kk=e=>({kind:"page",title:e.project.name,body:Wo({project:e.project,installed:_r(e.layout),linkedSetSlugs:Pr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),Zy=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let n=await vo(r,e.layout),o=yn(n.projects,t);if(o===null)return{kind:"not_found"};let s=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await Ek(s,o.id);if(i===null)return kk({layout:e.layout,project:o,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=_y({layout:e.layout,projectFolderPath:o.projectFolderPath,bundles:i});if(!a.ok)return kk({layout:e.layout,project:o,errorMessage:a.errorMessage});let c=s===null?!1:await Di(s,o.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(o.id)}&${d.toString()}`}}});var D5,Qy,Tk=l(()=>{"use strict";D5=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,Qy=D5});var xk,Ik,H5,$5,vu,Wu,Ok=l(()=>{"use strict";xk=require("node:child_process"),Ik=require("node:util"),H5=(0,Ik.promisify)(xk.execFile),$5=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},vu=async(e,t)=>{try{let{stdout:r}=await H5("git",t,{cwd:e,env:$5(),maxBuffer:1048576});return r.trim()}catch{return null}},Wu=async e=>{let t=await vu(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await vu(e,["rev-parse","--abbrev-ref","HEAD"]),n=await vu(e,["status","--porcelain"]),o=await vu(e,["diff","--shortstat","HEAD"]),s=n===null||n.length===0?0:n.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:o===null||o.length===0?null:o}}});var eS,Mk=l(()=>{"use strict";eS=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",n=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,o=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${n}; ${o}; ${s}; ${i.join("; ")}.`}});var F5,tS,Nk=l(()=>{"use strict";F5=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",n=r.length>0?r:t.length>0?t:"Lesson from completed run";return n.length<=280?n:`${n.slice(0,277)}\u2026`},tS=F5});var z5,rS,jk=l(()=>{"use strict";vr();z5=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[je]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},rS=z5});var Dk,Wr,Hk=l(()=>{"use strict";Dk=require("node:child_process"),Wr=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,n=(0,Dk.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return n.length>0?n:null}catch{return null}}});var $k=l(()=>{"use strict";_u()});var $i,Fk=l(()=>{"use strict";vr();$i=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[je]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var ut=l(()=>{"use strict";_u();wu();Wk();_i();iy();Ck();nu();Tk();Ok();Mk();Nk();jk();Hk();$k();Fk();Jy();qy();Hi()});var Lu,Fi,zk,nS,Sn,oS=l(()=>{"use strict";Lu=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},Fi=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=Lu(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},zk=e=>e>=1&&e<=5,nS=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Lu(t,"UTC")},Sn=e=>{let t=e.from??new Date,r=Lu(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Fi(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=Fi(r,e.timeZone,n,0),s=Lu(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?Fi(nS(r),e.timeZone,n,0):o;if(!i&&zk(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=nS(a),zk(a.weekday))return Fi(a,e.timeZone,n,0);return Fi(nS(r),e.timeZone,n,0)}});var Uk,sS,Jt,iS=l(()=>{"use strict";Uk=require("node:crypto");ae();ut();oS();Pu();sS=!1,Jt=async e=>{if(sS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=bu(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};sS=!0;let o=(0,Uk.randomUUID)();try{let s=await So(t,"claude-cli",n.prompt);await Gy(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=Sn({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return Au(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{sS=!1}}});var Eu,Bk=l(()=>{"use strict";ae();iS();Pu();Eu=async()=>{let e=$();if(e===null)return;let t=dt(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await Jt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var zi=l(()=>{"use strict";Pu();Bk();iS();oS()});var Gk=l(()=>{"use strict";zi()});var Vk=l(()=>{"use strict";$y()});var qk=l(()=>{"use strict";Vk()});var aS=l(()=>{"use strict";zi()});var U5,B5,Ui,lS=l(()=>{"use strict";Gk();qk();aS();We();U5=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),B5=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Sn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Sn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Ui=e=>{let t=U5(e.profileEmail),r=dt(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=_o(s);return i!==null?[B5(i,n.get(i.id))]:[]});return Su(t,o),{ok:!0,writtenCount:o.length}}});var cS=l(()=>{"use strict";zi()});var Kk=l(()=>{"use strict";ae()});var Jk=l(()=>{"use strict";lS();cS();aS();Kk()});var Yk,Bi,Gi,Vi,Xk=l(()=>{"use strict";Yk=m(require("node:os"));Jk();xi();Ii();Bi=e=>{if(!Kt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!gn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=Ui({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},Gi=async e=>{if(!Kt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:gn(t)?Jt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Vi=()=>{let e=$(),t=e!==null?dt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Yk.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var dS=l(()=>{"use strict";Xk()});var Ru=l(()=>{"use strict";te()});var ku=l(()=>{"use strict";te()});var Cu,Qk,eC,Zk,G5,V5,Lo,uS=l(()=>{"use strict";Cu=m(require("node:fs")),Qk=m(require("node:os")),eC=m(require("node:path"));Ru();ku();Si();We();Zk=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},G5=e=>eC.default.join(Qk.default.homedir(),"Library","LaunchAgents",`${e}.plist`),V5=async e=>Cu.default.existsSync(G5(e))?(await ve(e)).ok:!1,Lo=async(e=E())=>{let t=Cu.default.existsSync(Dd(e)),r=!Cu.default.existsSync(Dt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let n=yi(e);if(n===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await Zk(n))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${re(e)}-wake`;await V5(i)&&s.push(i);for(let c of ee(e))(await ve(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await Zk(n);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var tC=l(()=>{"use strict";te()});var Eo,qi=l(()=>{"use strict";Eo="connection-health.json"});var An,Tu,q5,Ki,ye,pS,xu,Ie,Iu=l(()=>{"use strict";An=m(require("node:fs")),Tu=m(require("node:path"));qi();q5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ki=e=>e.profileEmail===null?Tu.default.join(e.installDir,Eo):Tu.default.join(e.installDir,"profiles",e.profileEmail,Eo),ye=e=>{let t=Ki(e);if(!An.default.existsSync(t))return null;try{let r=JSON.parse(An.default.readFileSync(t,"utf8"));return!q5(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},pS=e=>{let t=Ki(e);An.default.existsSync(t)&&An.default.rmSync(t,{force:!0})},xu=(e,t)=>{let r=Ki(e),n=ye(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};An.default.mkdirSync(Tu.default.dirname(r),{recursive:!0}),An.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Ie=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var Ji,rC=l(()=>{"use strict";qi();Iu();Ji=(e,t)=>{if(!t.socketOpen)return!1;let r=ye(e);return r===null?!1:!Ie(r,t.staleAfterMs??12e4,t.nowMs)}});var mS,nC=l(()=>{"use strict";Iu();mS=(e,t)=>!(e!==null&&!Ie(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Ro=l(()=>{"use strict";Iu();rC();nC();qi()});var gS=l(()=>{"use strict";Ro();te()});var fS=l(()=>{"use strict";Ro()});var hS=l(()=>{"use strict";te()});var sC,oC,Yi,yS=l(()=>{"use strict";sC=m(require("node:fs"));Bt();Ru();ku();We();oC=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Yi=async(e=E())=>{if(!sC.default.existsSync(Dt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await oC())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let n=[];for(let s of ee(e))(await ve(s.launchAgentLabel)).ok&&n.push(s.launchAgentLabel);let o=await oC();return{ok:o||n.length>0,liveReachable:o,hollowInstall:!1,kickstartedLabels:n}}});var iC=l(()=>{"use strict";te()});var aC,bn,SS,K5,J5,Y5,lC,X5,cC,ko,Ou=l(()=>{"use strict";aC=require("node:crypto"),bn=m(require("node:fs")),SS=m(require("node:path"));We();K5="watchdog-log.ndjson",J5=200,Y5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lC=(e=E())=>{let t=M(),r=t.installDir===e?t.logsDir:Qn({installDir:e,profileEmail:t.profileEmail});return SS.default.join(r,K5)},X5=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Y5(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},cC=(e,t=E())=>{let r={id:(0,aC.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=lC(t);bn.default.mkdirSync(SS.default.dirname(n),{recursive:!0});let o=bn.default.existsSync(n)?bn.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-J5+1)),JSON.stringify(r)];return bn.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},ko=(e=20,t=E())=>{let r=lC(t);if(!bn.default.existsSync(r))return[];let n=bn.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=X5(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var AS,bS,PS,wS=l(()=>{"use strict";bt();AS=Br.watchdogReinstallState,bS=900*1e3,PS=3e3});var dC=l(()=>{"use strict";wS()});var uC={};St(uC,{verifyAgentWitchReviveAfterKickstart:()=>Q5});var Z5,Q5,pC=l(()=>{"use strict";dC();fS();hS();We();Z5=e=>new Promise(t=>{setTimeout(t,e)}),Q5=async e=>{if(await Z5(e.verifyDelayMs??PS),!await qr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),n=ye(r);return!Ie(n,e.staleAfterMs)}});var Xi,_S,eV,mC,gC,vS,WS,LS=l(()=>{"use strict";Xi=m(require("node:fs")),_S=m(require("node:path"));B();wS();eV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mC=e=>_S.default.join(e,AS),gC=(e=E())=>{let t=mC(e);if(!Xi.default.existsSync(t))return null;try{let r=JSON.parse(Xi.default.readFileSync(t,"utf8"));return!eV(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},vS=(e=E(),t=Date.now())=>{let r=gC(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=bS:!0},WS=(e=E(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=mC(e);return Xi.default.mkdirSync(_S.default.dirname(n),{recursive:!0}),Xi.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var ES,fC=l(()=>{"use strict";te();LS();ES=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!vS())return{attempted:!1,ok:!1,targets:e};WS();let n=await t();if(!n.ok)return{attempted:!0,ok:!1,errorMessage:n.errorMessage,targets:e};let o=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await ve(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:o.some(s=>s.revived||s.reason==="healthy"),targets:o}}});var hC=l(()=>{"use strict";LS();fC()});var RS=l(()=>{"use strict";Ve()});var yC=l(()=>{"use strict";Ve()});var SC,Co,AC,bC,PC,tV,rV,wC,nV,oV,_C,vC=l(()=>{"use strict";SC=require("node:child_process"),Co=m(require("node:fs")),AC=m(require("node:os")),bC=m(require("node:path")),PC=require("node:util");RS();yC();We();tV=(0,PC.promisify)(SC.execFile),rV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wC=e=>{let t=ot(e),r=t===null?M():M(t);if(!Co.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Co.default.readFileSync(r.configPath,"utf8"));return!rV(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},nV=e=>wC(e)?.wsUrl??null,oV=e=>{let t=nV(e);return t!==null?Ee(t):Le(e)?.appOrigin??null},_C=async e=>{let t=e?.installDir??E(),r=wC(t),n=r!==null?Ee(r.wsUrl):oV(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=bC.default.join(AC.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Co.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??ot(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await tV("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Co.default.existsSync(i)&&Co.default.unlinkSync(i)}}});var WC={};St(WC,{attemptAgentWitchWatchdogReinstall:()=>sV});var sV,LC=l(()=>{"use strict";hC();vC();sV=async e=>ES(e,()=>_C())});var EC,RC,kC,iV,aV,lV,Zi,kS=l(()=>{"use strict";tC();gS();fS();hS();yS();uS();Ru();ku();We();ao();iC();Ou();EC=e=>e===null?M():M(e),RC=async(e,t,r)=>{if(!await qr(e))return"not_running";let o=EC(t);if(at(o))return"healthy";let s=ye(o);return Ie(s,r)?"stale_connection":"healthy"},kC=async e=>{let t=e?.staleAfterMs??12e4,r=E(),n=ee(r);return Promise.all(n.map(async o=>{let s=await RC(o.launchAgentLabel,o.profileEmail,t),i=EC(o.profileEmail),a=ye(i),c=await qr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Ie(a,t),needsRevive:s!=="healthy",reason:s}}))},iV=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},aV=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",lV=async e=>{let t=await ve(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(pC(),uC)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Zi=async e=>{if(!st())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=E();await Lo(r),await Yi(r);let n=ee(r),o=[];for(let p of n){let f=await RC(p.launchAgentLabel,p.profileEmail,t);if(f==="healthy"){o.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:f});continue}o.push(await lV({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:f,staleAfterMs:t}))}if(o.length===0){let p=Vr();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(LC(),WC)),f=await p(o);s=f.attempted,i=f.ok,a=f.errorMessage,c=[...f.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&cC({event:aV(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:iV(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var CC,Mu,TC=l(()=>{"use strict";CC=m(require("node:os"));gS();Ou();kS();Mu=async()=>{let e=await kC(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:CC.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:ko(1)[0]??null}}});var CS=l(()=>{"use strict";uS();kS();TC();Ou()});var Qi,ea,ta,xC=l(()=>{"use strict";te();CS();Qi=async()=>{await Lo();let e=ee(),t=[];for(let r of e){let n=await ve(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Vr();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},ea=Zi,ta=Zi});var TS=l(()=>{"use strict";xC()});var ju,Nu,IC,xS,OC,cV,dV,uV,pV,mV,Du,MC=l(()=>{"use strict";ju=require("node:child_process"),Nu=m(require("node:fs")),IC=m(require("node:os")),xS=m(require("node:path")),OC=require("node:util");te();B();cV=(0,OC.promisify)(ju.execFile),dV=()=>xS.default.join(IC.default.homedir(),"Library","LaunchAgents"),uV=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await cV("launchctl",["bootout",r]).catch(()=>{})},pV=e=>{let t=xS.default.join(dV(),`${e}.plist`);Nu.default.existsSync(t)&&Nu.default.unlinkSync(t)},mV=e=>{(0,ju.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Du=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=E();if(!Nu.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Ht(e);for(let r of t)await uV(r),pV(r);return mV(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var NC,Hu,jC,To,DC,gV,fV,hV,IS,yV,OS,HC=l(()=>{"use strict";NC=require("node:child_process"),Hu=m(require("node:fs")),jC=m(require("node:os")),To=m(require("node:path")),DC=require("node:util");te();gV=(0,DC.promisify)(NC.execFile),fV=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],hV=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],IS=e=>{Hu.default.existsSync(e)&&Hu.default.rmSync(e,{force:!0})},yV=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await gV("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},OS=async e=>{let r=(e.listLaunchAgentLabels??Ht)(e.layout.installDir),n=e.launchAgentsDir??To.default.join(jC.default.homedir(),"Library","LaunchAgents"),o=e.bootoutLaunchAgent??yV;for(let i of r)await o(i),IS(To.default.join(n,`${i}.plist`));let s=To.default.dirname(e.layout.configPath);for(let i of fV)IS(To.default.join(s,i));for(let i of hV)IS(To.default.join(e.layout.installDir,i));return Hu.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var MS,$C=l(()=>{"use strict";MS={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var NS,FC=l(()=>{"use strict";NS="unknown_identity"});var jS=l(()=>{"use strict";$C();FC()});var SV,DS,zC=l(()=>{"use strict";jS();SV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),DS=e=>e.type!=="system.error"||!SV(e.payload)?!1:e.payload.errorCode===NS});var HS=l(()=>{"use strict";MC();HC();zC()});var $u=l(()=>{"use strict";te();Ve();HS();CS()});var xo,Fu,zu=l(()=>{"use strict";$u();xo=(e=20)=>ko(e),Fu=Mu});var Uu,Io,Bu,Gu=l(()=>{"use strict";$u();Uu=sn,Io=(e=20)=>rn(e),Bu=e=>on(e)});var Vu,$S=l(()=>{"use strict";$u();Vu=()=>Du()});var UC=l(()=>{"use strict";Yh();Hy();dS();TS();zu();Gu();$S()});var BC={};St(BC,{buildAgentWitchAutomationStatusFromWakeServer:()=>Vi,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Uu,buildAgentWitchWakeHealthResponse:()=>bi,buildAgentWitchWakeIdentityResponse:()=>Pi,buildAgentWitchWatchdogStatus:()=>Fu,installHarnessFromWakeServer:()=>Oi,readAgentWitchSelfUpdateLogEntries:()=>Io,readAgentWitchWatchdogLogEntries:()=>xo,restartAgentWitchFromWakeServer:()=>ta,reviveAgentWitchWebSocketFromWakeServer:()=>ea,runAgentWitchSelfUpdateFromWakeServer:()=>Bu,runAgentWitchUninstallLocalFromWakeServer:()=>Vu,runAutomationFromWakeServer:()=>Gi,syncAutomationsFromWakeServer:()=>Bi,wakeAgentWitchLaunchAgents:()=>Qi});var GC=l(()=>{"use strict";UC()});var VC,qC,FS,zS,KC=l(()=>{"use strict";VC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),qC=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?VC(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?VC(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},FS=e=>{let t=e.watchdogLogs.map(qC).join(""),r=e.updateLogs.map(qC).join("");return`<!doctype html>
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
</html>`},zS=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var JC,YC,XC=l(()=>{"use strict";JC=m(require("node:net")),YC=()=>new Promise((e,t)=>{let r=JC.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var ZC,AV,US,QC=l(()=>{"use strict";ZC=m(require("node:net"));XC();Ai();Si();We();AV=e=>new Promise(t=>{let r=ZC.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),US=async()=>{let e=E(),t=ct();if(await AV(t))return qE(t),t;let r=await YC();return Hd(e,r),r}});var bV,BS,eT=l(()=>{"use strict";bV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BS=e=>({force:bV(e)&&e.force===!0})});var ra=l(()=>{"use strict";xi();KC();QC();eT();Cf();fd();ro()});var GS,j,VS,qS,na,tT=l(()=>{"use strict";GS=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},VS=e=>{e.writeHead(403),e.end()},qS=e=>e.url?.split("?")[0]??"/",na=(e,t,r=20,n=200)=>{let o=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(o.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,n):r}});var pt=l(()=>{"use strict";tT()});var PV,rT,nT=l(()=>{"use strict";dS();pt();PV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},rT=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,Vi(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await PV(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let n=Bi(t);return j(e.response,n.ok?200:400,n,e.cors.headers),!0}let r=await Gi(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var wV,sT,oT,iT,KS,aT,JS=l(()=>{"use strict";wV=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],sT=e=>/embed|minilm|^bge-/i.test(e),oT=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),iT=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),KS=e=>e.filter(t=>t.trim().length>0&&!sT(t)),aT=(e,t)=>{let r=e.filter(o=>o.trim().length>0&&!sT(o)),n=t?.trim()??"";if(n.length>0){let o=r.find(s=>oT(s,n));if(o!==void 0)return o}for(let o of wV){let s=r.find(i=>oT(i,o));if(s!==void 0)return s}return r[0]??null}});var YS,dT,uT,qu,pT,lT,cT,_V,vV,WV,LV,EV,RV,mt,oa=l(()=>{"use strict";YS=require("node:child_process"),dT=m(require("node:fs")),uT=m(require("node:os")),qu=m(require("node:path"));Ve();lt();JS();pT=3e3,lT=["claude-cli","codex","cursor","antigravity"],cT={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},_V=(e,t)=>new Promise(r=>{let n=(0,YS.spawn)(e,[...t],{stdio:"ignore"}),o=setTimeout(()=>{n.kill("SIGTERM"),r(!1)},pT);n.on("error",()=>{clearTimeout(o),r(!1)}),n.on("close",s=>{clearTimeout(o),r(s===0)})}),vV=()=>{let e=uT.default.homedir();return["ollama",qu.default.join(e,".local","bin","ollama"),qu.default.join(e,".agent-witch","ollama","ollama"),qu.default.join(e,".local-agent-witch","ollama","ollama")]},WV=e=>new Promise(t=>{let r=(0,YS.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),n=[],o=setTimeout(()=>{r.kill("SIGTERM"),t(null)},pT);r.stdout.on("data",s=>{n.push(s)}),r.on("error",()=>{clearTimeout(o),t(null)}),r.on("close",s=>{if(clearTimeout(o),s!==0){t(null);return}t(iT(Buffer.concat(n).toString("utf8")))})}),LV=async()=>{for(let e of vV()){if(e!=="ollama"&&!dT.default.existsSync(e))continue;let t=await WV(e);if(t!==null)return t}return[]},EV=e=>{let t=e.installedWriterIds.map(s=>cT[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,n=se(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${cT[e.writerAgent]} is not installed.`:"",o=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[n,r,o].filter(s=>s.length>0).join(" ")},RV=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:lo},mt=async e=>{let t=lT.map(i=>{let a=Wd(i,e.commands);return _V(a.command,a.args)}),[r,...n]=await Promise.all([LV(),...t]),o=lT.flatMap((i,a)=>n[a]===!0?[i]:[]),s=aT(r,RV());return{ollamaModels:r,estimateModel:s,installedWriterIds:o,capabilityNote:EV({writerAgent:e.writerAgent??"",installedWriterIds:o,estimateModel:s})}}});var kV,CV,XS,mT=l(()=>{"use strict";kV="http://127.0.0.1:11434",CV=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},XS=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||kV;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return n.ok?CV(await n.json()):null}catch{return null}}});var ZS=l(()=>{"use strict";lt();oa();mT();JS()});var TV,gT,fT=l(()=>{"use strict";ZS();TV={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},gT=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:TV[t]})),ollamaModels:KS(e.ollamaModels)})});var xV,hT,yT=l(()=>{"use strict";ZS();pt();fT();xV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},hT=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await mt({commands:ie({})});return j(e.response,200,{ok:!0,...gT({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await xV(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",n=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",o=await XS({model:r,prompt:n});return o===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:o},e.cors.headers),!0)}return!1}});var IV,ST,AT=l(()=>{"use strict";Hy();pt();IV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},ST=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await IV(e);if(t===null)return!0;let r=Oi(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var bT=l(()=>{"use strict";ut()});var QS,PT=l(()=>{"use strict";bT();Ii();QS=e=>{if(!Kt(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Be({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var wT,eA,tA=l(()=>{"use strict";ae();ut();Ii();wT=e=>{if(!Kt(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},eA=async e=>{let t=wT(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Wr("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let n=$();if(n===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let o=Z({wsUrl:n.wsUrl,pairingToken:n.pairingToken});return o===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Be({projectFolderPath:r}),await $i(o,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var _T=l(()=>{"use strict";PT();tA()});var vT,WT=l(()=>{"use strict";_T();tA();pt();vT=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=QS(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await eA(t),n=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,n,r,e.cors.headers),!0}return!1}});var LT,ET=l(()=>{"use strict";ra();Gu();zu();LT=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=xo(50),r=Io(50);return e.response.writeHead(200,zS()),e.response.end(FS({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var RT,kT=l(()=>{"use strict";Yh();pt();RT=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,bi(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,Pi(),e.cors.headers),!0):!1});var CT,TT=l(()=>{"use strict";$S();pt();CT=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Vu();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var xT,IT=l(()=>{"use strict";TS();pt();xT=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await ea();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await ta();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Qi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var OT,MT=l(()=>{"use strict";ra();Gu();pt();OT=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Uu();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=na(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:Io(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=BS(t),n=await Bu({force:r});return j(e.response,n.ok?200:503,n,e.cors.headers),!0}return!1}});var NT,jT=l(()=>{"use strict";zu();pt();NT=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Fu();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=na(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:xo(t)},e.cors.headers),!0}return!1}});var DT,HT=l(()=>{"use strict";nT();yT();AT();WT();ET();kT();TT();IT();MT();jT();DT=[RT,LT,NT,xT,OT,CT,ST,vT,rT,hT]});var $T,FT=l(()=>{"use strict";HT();$T=async e=>{for(let t of DT)if(await t(e))return!0;return!1}});var OV,zT,UT=l(()=>{"use strict";xi();pt();FT();OV=(e,t,r,n)=>({request:e,response:t,wakePort:r,cors:n,pathname:qS(e),readJsonBody:()=>GS(e)}),zT=async(e,t,r)=>{let n=e.headers.origin,o=fu(n);try{if(n!==void 0&&n.length>0&&!o.allowed){VS(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=OV(e,t,r,o);if(await $T(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}}});var BT,Pn,Ku,Ju=l(()=>{"use strict";BT=m(require("node:http"));ra();UT();Pn=async()=>{let e=await US(),t=BT.default.createServer((r,n)=>{zT(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Ku=Pn});var GT={};St(GT,{runAgentWitchBridgeCli:()=>MV});var MV,VT=l(()=>{"use strict";te();Ju();MV=async()=>{ze("agent-witch-bridge");let e=await Pn(),t=Ft(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var qT=l(()=>{"use strict";Bt()});var Oo,rA,KT=l(()=>{"use strict";Oo=(e,t,r)=>e===1?t:r,rA=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${Oo(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Oo(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${Oo(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Oo(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Oo(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${Oo(p,"year","years")} ago`}});var wn,nA,NV,jV,oA,Lr,sa,sA,JT=l(()=>{"use strict";wn=m(require("node:fs")),nA=m(require("node:path")),NV="local-ws-traffic.ndjson",jV=500,oA=e=>nA.default.join(e.logsDir,NV),Lr=(e,t)=>{let r=oA(e);wn.default.mkdirSync(nA.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});wn.default.appendFileSync(r,`${n}
`,"utf8")},sa=(e,t=jV)=>{let r=oA(e);if(!wn.default.existsSync(r))return[];let o=wn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},sA=e=>{let t=oA(e);wn.default.existsSync(t)&&wn.default.writeFileSync(t,"","utf8")}});var DV,YT,XT,ZT=l(()=>{"use strict";jS();DV=new Set(Object.values(MS)),YT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),XT=e=>{if(!YT(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!DV.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!YT(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var QT,ex=l(()=>{"use strict";QT=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var HV,$V,FV,ia,tx=l(()=>{"use strict";ex();HV=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,$V=e=>HV.test(e),FV=e=>QT(e),ia=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>ia(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&$V(n)){r[n]=FV(o);continue}r[n]=ia(o)}return r}});var Lt,iA,zV,UV,BV,aA,rx,nx,ox,GV,Yu,_n,Xu,lA,sx=l(()=>{"use strict";Lt=m(require("node:fs")),iA=m(require("node:path"));ZT();tx();zV="local-ws-trace.ndjson",UV=1e4,BV=1440*60*1e3,aA=e=>iA.default.join(e.logsDir,zV),rx=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},nx=e=>{if(!Lt.default.existsSync(e))return;let t=Lt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-BV,o=t.filter(s=>{let i=rx(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-UV);Lt.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},ox=(e,t)=>{let r=aA(e);Lt.default.mkdirSync(iA.default.dirname(r),{recursive:!0}),Lt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),nx(r)},GV=e=>e.parsed===null?{_empty:!0}:ia(e.parsed),Yu=(e,t,r)=>{let n=XT(r);ox(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:GV(n)})},_n=(e,t)=>{ox(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:ia({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Xu=(e,t=80)=>{let r=aA(e);if(nx(r),!Lt.default.existsSync(r))return[];let n=Lt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let i=rx(s);i!==null&&o.push(i)}return o.reverse()},lA=e=>{let t=aA(e);Lt.default.existsSync(t)&&Lt.default.writeFileSync(t,"","utf8")}});var Er,ix,VV,cA,Zu,ax=l(()=>{"use strict";Er=m(require("node:fs")),ix=m(require("node:path")),VV=256e3,cA=e=>{Er.default.mkdirSync(ix.default.dirname(e),{recursive:!0}),Er.default.writeFileSync(e,"","utf8")},Zu=(e,t=VV)=>{if(!Er.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Er.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=Er.default.openSync(e,"r");try{Er.default.readSync(a,i,0,s,o)}finally{Er.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var aa=l(()=>{"use strict";JT();sx();ax()});var dA,uA,lx=l(()=>{"use strict";dA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uA=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",n=e.exists&&e.content.length>0?`<pre class="error-log-view">${dA(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${dA(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${dA(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${n}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var cx=l(()=>{"use strict";lx()});var pA,mA=l(()=>{"use strict";pA=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var gA=l(()=>{"use strict";qi()});var fA,hA,dx=l(()=>{"use strict";gA();fA=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e);return Number.isNaN(n)?!0:r-n>t},hA=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var ux=l(()=>{"use strict";mA();dx()});var px,la,yA,ca=l(()=>{"use strict";mA();px=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),la=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=px(e),r=px(pA(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},yA=`(function () {
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
})();`});var vn,qV,SA,mx=l(()=>{"use strict";vn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qV=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},SA=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${vn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?vn(r.direction):vn(r.kind),i=`trace-body-${n}`,a=vn(qV(r.body));return`<tr>
        <td title="${vn(r.at)}">${vn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${vn(r.command)}</code></td>
        <td>${o}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var fx,gx,AA,hx=l(()=>{"use strict";fx=m(require("node:path"));B();Bt();gx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AA=e=>{let t=re(e.installDir),n=`AW_HOME="$HOME/${fx.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${gx(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${gx(n)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var yx=l(()=>{"use strict";ca();mx();hx();ca()});var KV,Yt,da=l(()=>{"use strict";KV=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Yt=KV});var Sx,Ax,bx,Px,wx,_x,vx,Mo=l(()=>{"use strict";Sx="projects",Ax="knowledge",bx="chunks.ndjson",Px="lessons.ndjson",wx="error-chunks.ndjson",_x="usage-stats.json",vx="knowledge-location.json"});var Qu,JV,ep,bA=l(()=>{"use strict";Qu=m(require("node:path"));Mo();JV=(e,t)=>{let r=t.trim(),n=Qu.default.join(e.installDir,Sx,r,Ax);return{projectId:r,knowledgeDirPath:n,ragChunksFilePath:Qu.default.join(n,bx),memoryRunsFilePath:Qu.default.join(n,Px)}},ep=JV});var PA,YV,Wx,Lx=l(()=>{"use strict";PA=m(require("node:fs"));Mo();un();YV=e=>{let t=Ke(e.projectFolderPath),r=`${t.metaDirPath}/${vx}`,n={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};PA.default.mkdirSync(t.metaDirPath,{recursive:!0}),PA.default.writeFileSync(r,`${JSON.stringify(n,null,2)}
`)},Wx=YV});var No,Rx,Ex,XV,kx,Cx=l(()=>{"use strict";No=m(require("node:fs")),Rx=m(require("node:path"));Xr();un();bA();Lx();Ex=(e,t)=>{No.default.existsSync(e)&&(No.default.existsSync(t)&&No.default.statSync(t).size>0||(No.default.mkdirSync(Rx.default.dirname(t),{recursive:!0}),No.default.copyFileSync(e,t)))},XV=e=>{let t=Ke(e.projectFolderPath),r=ep(e.layout,e.projectId),n=`${t.memoryDirPath}/${eo}`;Ex(t.ragChunksFilePath,r.ragChunksFilePath),Ex(n,r.memoryRunsFilePath),Wx({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},kx=XV});var wA,ZV,Tx,xx=l(()=>{"use strict";wA=m(require("node:fs"));un();ZV=e=>{let t=Ke(e);if(!wA.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(wA.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let n=r;return{projectId:typeof n.projectId=="string"&&n.projectId.trim().length>0?n.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Tx=ZV});var Ix,QV,jo,tp=l(()=>{"use strict";Ix=m(require("node:path"));Xr();un();Cx();xx();bA();QV=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Tx(t),n=e.projectId?.trim()||r.projectId?.trim()||"";if(n.length>0){kx({layout:e.layout,projectFolderPath:t,projectId:n});let s=ep(e.layout,n);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:n}}let o=Ke(t);return{ragChunksFilePath:o.ragChunksFilePath,memoryRunsFilePath:Ix.default.join(o.memoryDirPath,eo),projectId:null}},jo=QV});var rp,tq,np,_A=l(()=>{"use strict";rp=m(require("node:fs"));Mo();tq=(e,t=500)=>{if(!rp.default.existsSync(e))return;let r=rp.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let n=r.slice(r.length-t);rp.default.writeFileSync(e,`${n.join(`
`)}
`)},np=tq});var op,rq,Wn,vA=l(()=>{"use strict";op=m(require("node:path"));Mo();tp();rq=e=>{let t=jo(e);if(t===null)return null;let r=op.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:op.default.join(r,_x),errorChunksFilePath:op.default.join(r,wx)}},Wn=rq});var Mx,ua,Nx,Ox,WA,jx,sq,LA,Dx,EA,RA,kA,CA=l(()=>{"use strict";Mx=require("node:crypto"),ua=m(require("node:fs")),Nx=m(require("node:path"));da();Mo();vA();Ox=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),WA=e=>{if(!ua.default.existsSync(e))return Ox();try{let t=JSON.parse(ua.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return Ox()},jx=(e,t)=>{ua.default.mkdirSync(Nx.default.dirname(e),{recursive:!0}),ua.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},sq=e=>{let t=Yt(e).trim(),n=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,Mx.createHash)("sha256").update(n).digest("hex").slice(0,16)},LA=e=>{let t=Wn(e);return t===null?null:WA(t.usageStatsFilePath)},Dx=e=>{if(e.chunkIds.length===0)return;let t=Wn(e);if(t===null)return;let r=WA(t.usageStatsFilePath),n={...r.chunkRetrievalCounts};for(let o of e.chunkIds)n[o]=(n[o]??0)+1;jx(t.usageStatsFilePath,{...r,chunkRetrievalCounts:n})},EA=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=Wn(e);if(r===null)return null;let n=sq(t),o=WA(r.usageStatsFilePath),s=o.errorOccurrences[n],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return jx(r.usageStatsFilePath,{...o,errorOccurrences:{...o.errorOccurrences,[n]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),n},RA=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,kA=e=>{if(e===null)return[];let t=[];for(let[r,n]of Object.entries(e.chunkRetrievalCounts))n<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:n,chunkId:r,message:`Knowledge chunk "${r}" was injected ${n} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,n]of Object.entries(e.errorOccurrences))n.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:n.count,errorFingerprint:r,message:`Error "${n.preview}" occurred ${n.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:n.count,errorFingerprint:r,message:`Same error (${n.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,n)=>r.priority-n.priority||n.hitCount-r.hitCount)}});var pa,Hx,iq,aq,$x,lq,TA,ma,Do,xA,Ho,IA,OA=l(()=>{"use strict";pa=m(require("node:fs")),Hx=m(require("node:path"));da();tp();_A();CA();iq="http://127.0.0.1:11434",aq="nomic-embed-text",$x=(e,t,r)=>jo({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,lq=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},TA=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},ma=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||iq,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||aq;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},Do=(e,t,r)=>{let n=$x(e,t,r);if(n===null||!pa.default.existsSync(n))return[];let o=pa.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},xA=async e=>{let t=Yt(e.text),r=TA(t);if(r.length===0)return 0;let n=$x(e.layout,e.projectFolderPath,e.projectId);if(n===null)return 0;pa.default.mkdirSync(Hx.default.dirname(n),{recursive:!0});let o=0;for(let s of r){let i=await ma(s);if(i===null)continue;let a={id:`${Date.now()}-${o}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};pa.default.appendFileSync(n,`${JSON.stringify(a)}
`,"utf8"),o+=1}return np(n),o},Ho=async e=>{let t=await ma(e.query);if(t===null)return[];let r=e.minScore??0,s=Do(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:lq(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return Dx({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},IA=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var ga,Fx,cq,dq,MA,NA,jA,zx=l(()=>{"use strict";ga=m(require("node:fs")),Fx=m(require("node:path"));da();vA();_A();OA();cq=e=>{if(!ga.default.existsSync(e))return[];let t=ga.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let n of t)try{r.push(JSON.parse(n))}catch{}return r},dq=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},MA=async e=>{let t=Wn(e);if(t===null)return 0;let r=Yt(e.text),n=TA(r,600);if(n.length===0)return 0;let o=t.errorChunksFilePath;ga.default.mkdirSync(Fx.default.dirname(o),{recursive:!0});let s=0;for(let i of n.slice(0,3)){let a=await ma(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};ga.default.appendFileSync(o,`${JSON.stringify(c)}
`,"utf8"),s+=1}return np(o,200),s},NA=async e=>{let t=Wn(e);if(t===null)return[];let r=await ma(e.query);if(r===null)return[];let n=e.minScore??.3;return cq(t.errorChunksFilePath).map(s=>({chunk:s,score:dq(r,s.embedding)})).filter(s=>s.score>=n).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},jA=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var DA=l(()=>{"use strict";OA();CA();zx()});var HA,Ux=l(()=>{"use strict";HA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var Bx=l(()=>{"use strict";Ux()});var me,$A,FA=l(()=>{"use strict";Bx();me=HA,$A=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${me.gray50};
  --aw-zinc-100: ${me.gray100};
  --aw-zinc-200: ${me.gray200};
  --aw-zinc-400: ${me.gray400};
  --aw-zinc-500: ${me.gray500};
  --aw-zinc-600: ${me.gray600};
  --aw-zinc-700: ${me.gray700};
  --aw-zinc-800: ${me.gray900};
  --aw-zinc-900: ${me.gray900};
  --aw-brand-600: ${me.brand600};
  --aw-brand-700: ${me.brand700};
  --aw-brand-50: ${me.brand50};
  --aw-emerald-50: ${me.success50};
  --aw-emerald-700: ${me.success700};
  --aw-amber-50: ${me.warning50};
  --aw-amber-900: ${me.warning900};
  --aw-red-50: ${me.error50};
  --aw-red-700: ${me.error700};
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
.sdlc-compose-mode { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-right: auto; }
.sdlc-compose-mode [aria-pressed="true"] {
  background: var(--aw-zinc-100);
  outline: 2px solid var(--accent, #2563eb);
}
.sdlc-compose-viewing-result [data-writer-status] { display: none; }
.sdlc-compose-viewing-finished .sdlc-compose-mode { display: none; }
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
.sdlc-compose-summary::-webkit-details-marker { display: none; }
.sdlc-compose-summary .eyebrow { margin: 0; }
.sdlc-form-head { display: flex; justify-content: flex-end; align-items: flex-start; gap: 1rem; margin-bottom: 0.5rem; }
.sdlc-form-head .btn { flex: none; margin-top: 0.15rem; }
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
  position: sticky;
  bottom: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.85rem 0 0.25rem;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.92) 28%,
    #fff 55%
  );
  border-top: 1px solid var(--aw-zinc-200);
  box-shadow: 0 -10px 28px rgba(15, 23, 42, 0.06);
}
.sdlc-submit-bar .sdlc-writer-summary { margin: 0; }
.sdlc-submit-bar .sdlc-run-hint { margin: 0; }
.sdlc-submit {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
}
.sdlc-submit .btn-primary { min-width: 8.5rem; }
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
.sdlc-form-head { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem; }
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
`.trim()});var uq,pq,zA,Gx,UA,Vx=l(()=>{"use strict";FA();ca();uq=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,pq=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],zA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gx=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${uq}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,UA=e=>{let t=pq.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=zA(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"",o=zA(e.installBundleVersionLabel?.trim()??"unknown"),s=Gx("brand brand-in-sidebar",o),i=Gx("brand brand-in-header",o);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${zA(e.title)} \xB7 Agent Witch Local</title>
  <style>${$A}</style>
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
        ${n}
        <a class="btn btn-secondary cloud-open-link" href="${r}" target="_blank" rel="noopener noreferrer" aria-label="Open Agent Witch cloud at ${r}">Open cloud \u2197</a>
      </div>
    </div>
  </header>
  <main class="site-main">${e.prependBody??""}${e.body}</main>
  <script>${yA}</script>
</body>
</html>`}});var sp,fa,ip=l(()=>{"use strict";sp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fa=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${sp(e.syncMessage)}</p>`:"",n=sp(e.manageHref),o=sp(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${sp(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${n}" target="_blank" rel="noopener noreferrer">${o} \u2197</a></p>
    </div>`}});var BA,GA,VA,qx=l(()=>{"use strict";BA=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,GA=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,VA=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Kx=l(()=>{"use strict";Vx();ip();qx()});var $o,qA,Jx=l(()=>{"use strict";ca();$o=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qA=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${$o(e.wakeError)}</div>`:"",a=la(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${$o(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${$o(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${$o(n)}</p>
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
        <p class="home-card-meta">${$o(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${$o(o)}</p>
      </a>
    </div>`}});var Yx=l(()=>{"use strict";Jx()});var k,ap=l(()=>{"use strict";k=e=>e==="passed"||e==="stopped"||e==="failed"});var Xx,KA,Ln,JA,ha=l(()=>{"use strict";Xx="Stopped at the round limit. The best prompt is kept.",KA="Stopped because the score stopped rising. The best prompt is kept.",Ln="Finished. The best prompt is the result.",JA="Wizard ended. Progress from finished steps is kept."});var ya,YA=l(()=>{"use strict";ya=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],n=e.instructions?.trim()??"",o=n.length===0?[]:["","Instructions:",n];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...o,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",n.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var mq,gq,Sa,Zx,lp=l(()=>{"use strict";mq=/\n+|;\s+/,gq=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Sa=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let n=r.split(mq).map(o=>o.replace(/^[-*]\s*/,"").trim()).filter(o=>o.length>0).reduce((o,s)=>{if(t.length+o.length>=12)return o;let i=s.toLowerCase();return[...t,...o].some(c=>c.toLowerCase()===i)?o:[...o,gq(s)]},[]);return[...t,...n]},[]),Zx=e=>{let t=Sa(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var Ae,Aa=l(()=>{"use strict";Ae=e=>{let t=e.flatMap(o=>o.score===null?[]:[{roundNumber:o.roundNumber,promptText:o.promptText,score:o.score,reasons:o.reasons}]),[r,...n]=t;return r===void 0?null:n.reduce((o,s)=>s.score>o.score||s.score===o.score&&s.roundNumber>o.roundNumber?s:o,r)}});var ba,XA=l(()=>{"use strict";lp();Aa();ba=e=>{let t=[...e.priorRounds,e.current],r=Ae(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},n=[...t].filter(o=>o.score<r.score).sort((o,s)=>s.roundNumber-o.roundNumber).map(o=>o.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:Zx(n)}}});var ZA,fq,hq,Qx,e0=l(()=>{"use strict";ZA={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},fq=e=>{try{let t=JSON.parse(e.fragment);return{...ZA,objects:[...e.objects,t]}}catch{return{...ZA,objects:e.objects}}},hq=(e,t)=>{if(e.inString){let n=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:n}:t==="\\"?{...e,escaped:!0,fragment:n}:t==='"'?{...e,inString:!1,fragment:n}:{...e,fragment:n}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:fq(r)},Qx=e=>[...e].reduce(hq,ZA).objects});var yq,QA,Sq,t0,eb=l(()=>{"use strict";e0();yq=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},QA=e=>{let t=Qx(e).filter(yq),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},Sq=(e,t)=>({...e,passed:e.score>=t}),t0=(e,t)=>{let r=QA(e);return r===null?null:Sq(r,t)}});var tb,rb,cp=l(()=>{"use strict";tb="The judge reply needs a score and a reason.",rb="The improver reply was empty."});var r0,n0=l(()=>{"use strict";r0=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((n,o)=>o>n.best?{best:o,stall:0}:{best:n.best,stall:n.stall+1},{best:t,stall:0}).stall}});var o0,s0=l(()=>{"use strict";o0=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((n,o)=>o.score>n.best?{best:o.score,reasons:[]}:{best:n.best,reasons:[...n.reasons,o.reasons]},{best:t.score,reasons:[]}).reasons}});var bq,i0,a0=l(()=>{"use strict";n0();s0();ha();lp();bq=e=>{let t=Sa(e);return t.length===0?KA:`${KA} Avoid: ${t.join("; ")}.`},i0=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:Xx};if(r0(e.scores)>=3){let t=e.scores.map((r,n)=>({score:r,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:bq(o0(t))}}return null}});var Rr,Pq,nb,l0,dp=l(()=>{"use strict";Rr=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},Pq=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,nb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",Pq(e.tokens),`Delay: ${Rr(e.delayMs)}`,"",n,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},l0=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var wq,c0,d0=l(()=>{"use strict";eb();wq=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,c0=e=>{let r=(wq.exec(e)?.[1]??e).trim();return r.length===0||QA(r)!==null?null:r}});var u0,up,p0=l(()=>{"use strict";dp();d0();cp();u0=e=>({type:"call",role:"judge",choice:e.choice,prompt:l0({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),up=e=>{let t=c0(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:rb}}:{nextPrompt:t,continuation:u0({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var ob,m0=l(()=>{"use strict";YA();XA();eb();cp();ha();a0();cp();p0();ob=e=>{let t=t0(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:tb}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],n=e.round??r.length,o=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=i0({scores:o.map(a=>a.score),reasons:o.map(a=>a.reasons),round:n,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=ba({current:{roundNumber:n,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:ya({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Pa,sb=l(()=>{"use strict";Pa=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var g0=l(()=>{"use strict"});var f0=l(()=>{"use strict"});var wa,pp=l(()=>{"use strict";wa=e=>{let t=e.trim(),n=t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t,o=n.indexOf("{"),s=n.lastIndexOf("}");if(o===-1||s<=o)throw new Error("No JSON object in reply.");return JSON.parse(n.slice(o,s+1))}});var h0=l(()=>{"use strict";ha();pp()});var y0=l(()=>{"use strict"});var S0=l(()=>{"use strict";y0()});var ab,A0=l(()=>{"use strict";ab=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",n,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var _q,lb,b0=l(()=>{"use strict";dp();_q=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,lb=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",_q(e.tokens),`Delay: ${Rr(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var vq,Wq,Lq,cb,P0=l(()=>{"use strict";vq=/[A-Za-z0-9_./~-]{3,180}/g,Wq=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,Lq=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||Wq.test(t)},cb=(e,t=12)=>{let r=[];for(let n of e.matchAll(vq)){let o=n[0].replace(/\.+$/,"");if(!(!Lq(o)||r.includes(o))&&(r.push(o),r.length>=t))break}return r}});var _a,w0=l(()=>{"use strict";_a=(e,t)=>e.flatMap(r=>{let n=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||n.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:n}]}).sort((r,n)=>r.roundNumber-n.roundNumber)});var mp,db,_0,va,ub=l(()=>{"use strict";mp=e=>Math.floor(e/2),db=e=>Math.max(mp(e)+1,e-20),_0=(e,t)=>e>=t?"passes":e>=db(t)?"close":e>=mp(t)?"weak":"bad",va=e=>[{band:"bad",label:`0\u2013${mp(e)-1} bad`},{band:"weak",label:`${mp(e)}\u2013${db(e)-1} weak`},{band:"close",label:`${db(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var gp,pb=l(()=>{"use strict";ub();gp=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",n=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${_0(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),o=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...n,...o]}});var v0,W0=l(()=>{"use strict";v0=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var L0,E0=l(()=>{"use strict";L0=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var Eq,Rq,R0,k0=l(()=>{"use strict";ap();pb();W0();E0();Eq=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],Rq=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",R0=e=>{let t=e.wizard;if(t===void 0)return[];let r=v0(t),n=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),o=e.status==="wizard_paused",s=t.phase==="complete",i=Eq.map((p,f)=>{let b=!s&&!o&&f===r?"active":"done";return{id:`wizard-${f+1}`,label:p,state:b,detail:null}}).filter((p,f)=>s?!0:f<=n),a=o&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=L0(t)&&(!o||a)?gp(e):[],d=k(e.status)&&!s?[{id:"end",label:Rq(e),state:"done",detail:e.errorMessage}]:[];return[...i,...c,...d]}});var kq,mb,C0=l(()=>{"use strict";ap();pb();k0();kq=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",mb=e=>{if(e.wizard!==void 0)return R0(e);let t=gp(e),r=k(e.status)?[{id:"end",label:kq(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var T0=l(()=>{"use strict";Bt()});var x0,Wa,La,Fo,fp,gb,I0=l(()=>{"use strict";T0();x0="/prompt-optimizer/agent",Wa=`${Ut}${x0}`,La=`${Ut}/prompt-optimizer`,Fo="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",fp=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Fo}`,gb="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var kr=l(()=>{"use strict"});var O0,M0=l(()=>{"use strict";O0=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var fb,j0=l(()=>{"use strict";M0();kr();fb=e=>({schemaVersion:3,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:O0(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{}})});var hb,D0=l(()=>{"use strict";hb=e=>({...e,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null}))})});var yb,H0=l(()=>{"use strict";kr();yb=(e,t,r)=>{let n=r.trim();if(n.length===0)return e;let o=e.avoidByStep[t]??[],s=[n,...o].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var $0,Sb,F0=l(()=>{"use strict";$0=["generalize","evaluate","separate","optimize_modules"],Sb=(e,t)=>{let r=$0.indexOf(t);if(r===-1)return e;let n=$0.slice(r+1);return n.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:n.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:n.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:n.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:n.includes("separate")?null:e.selectedSplitTopology,modules:n.includes("optimize_modules")?[]:e.modules,currentModuleIndex:n.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:n.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var hp,Ab=l(()=>{"use strict";lp();hp=e=>{let t=Sa(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var bb,z0=l(()=>{"use strict";Ab();bb=e=>{let t=hp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,n,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(o=>o.length>0).join(`
`)}});var Tq,xq,Iq,U0,B0=l(()=>{"use strict";Tq=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),xq=/^\{\{[a-zA-Z0-9_-]+\}\}$/,Iq=(e,t)=>{let{masked:r,tokens:n}=t.reduce((o,s)=>{let i=s.sampleValue.trim();if(i.length===0)return o;let a=new RegExp(Tq(i),"g"),c=[...o.tokens];return{masked:o.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return n.reduce((o,s,i)=>o.replace(`\0PO${i}\0`,s),r)},U0=(e,t)=>{let r=[...t].sort((o,s)=>s.sampleValue.length-o.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(o=>xq.test(o)?o:Iq(o,r)).join("")}});var Pb,G0=l(()=>{"use strict";B0();Pb=(e,t)=>e.map(r=>({...r,modules:r.modules.map(n=>({...n,prompt:U0(n.prompt,t)}))}))});var Oq,_b,V0=l(()=>{"use strict";kr();Ab();Oq=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),_b=e=>{let t=hp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,o=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=Oq(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",o,r,n,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var vb,q0=l(()=>{"use strict";sb();vb=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",n=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),o=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...n,s].filter(a=>a.length>0).join(`
`);return Pa({promptText:e.promptText,instructions:`${i}${o.join(`
`)}`})}});var Ea,Wb=l(()=>{"use strict";Aa();Ea=e=>{let t=e.revisions.map(o=>({roundNumber:o.roundNumber,score:o.judgement?.score??null,passed:o.judgement?.passed??null,runOutput:o.run?.output??null,tokens:o.run?.tokens??null})),r=Ae(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null}))),n=r===null?null:e.revisions.find(o=>o.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:n?.run?.output??null,rounds:t}}});var Lb,K0=l(()=>{"use strict";Wb();Lb=e=>{let t=Ea({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((n,o)=>o===e.moduleIndex?{...n,status:r,selectedRevisionRound:t.bestRound,statistics:t}:n)}}});var Ra,J0=l(()=>{"use strict";Ra=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let n=r.statistics?.bestRunOutput?.trim()??"";return n.length>0?{output:n,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var Mq,Nq,ge,Eb=l(()=>{"use strict";kr();Mq=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let n=r.rounds.reduce((o,s)=>o+(s.tokens??0),0);return n>0?n:null},Nq=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,ge=e=>{let t=e.modules.map((s,i)=>({moduleId:s.moduleId,title:s.title,bestScore:s.statistics?.bestScore??null,tokens:Mq(e,i),status:s.status})),r=t.length,n=t.filter((s,i)=>Nq(e.modules[i])).length,o=r>0&&n===r?"passed":"stopped";return{passedModuleCount:n,totalModules:r,terminalStatusSuggestion:o,rows:t}}});var Rb,Y0=l(()=>{"use strict";kr();Eb();Rb=e=>{let t=ge(e.wizard),r=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${70})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&r.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,o)=>{let s=n.statistics?.bestRunOutput?.trim();s===void 0||s.length===0||r.push("",`## Module ${o+1}: ${n.title}`,"","```",s,"```")}),`${r.join(`
`)}
`}});var kb,X0=l(()=>{"use strict";kb=e=>{let t=e.modules.reduce((r,n)=>{let o=n.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+o},0);return t>0?t:null}});var gt,jq,Cb,Z0=l(()=>{"use strict";gt=m(Rs());pp();jq=(0,gt.isType)({name:gt.isNonEmptyString,description:gt.isString,sampleValue:gt.isString}),Cb=e=>{let t=wa(e);if(!(0,gt.isType)({templatedPrompt:gt.isNonEmptyString,variables:(0,gt.isArrayWithEachItem)(jq)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ne,Dq,Hq,Tb,Q0=l(()=>{"use strict";ne=m(Rs());kr();pp();Dq=(0,ne.isType)({id:ne.isNonEmptyString,title:ne.isNonEmptyString,prompt:ne.isNonEmptyString,order:ne.isNumber}),Hq=(0,ne.isType)({id:ne.isNonEmptyString,title:ne.isNonEmptyString,summary:ne.isString,topology:(0,ne.isOneOf)("chain","parallel"),modules:(0,ne.isArrayWithEachItem)(Dq),recommended:ne.isBoolean}),Tb=e=>{let t=wa(e);if(!(0,ne.isType)({options:(0,ne.isArrayWithEachItem)(Hq)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),n=r.filter(o=>o.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return n!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var zo,eI=l(()=>{"use strict";zo=e=>{let t=e.wizard.attempts.filter(n=>n.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var $q,ka,xb=l(()=>{"use strict";$q=/\{\{([a-zA-Z0-9_-]+)\}\}/g,ka=(e,t)=>{let r=new Map(t.map(n=>[n.name,n.sampleValue]));return e.replace($q,(n,o)=>{let s=r.get(o);return s===void 0?n:s})}});var Ca,Ta,tI=l(()=>{"use strict";Aa();xb();Ca=e=>ka(e.templatedPrompt,e.variables),Ta=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(n=>n.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return Ae(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Ca(e.wizard)}});var Fq,xa,rI=l(()=>{"use strict";Fq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,xa=(e,t)=>e.replace(Fq,(r,n)=>{let o=t[n];return o===void 0||o.trim()===""?r:o})});var zq,Ia,Ib=l(()=>{"use strict";zq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ia=e=>{let t=new Set,r=[];for(let n of e.matchAll(zq)){let o=n[1];t.has(o)||(t.add(o),r.push(o))}return r}});var Oa,En,nI=l(()=>{"use strict";Oa=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),En=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var Uq,yp,Ob,oI=l(()=>{"use strict";Ib();Uq="wizardParam_",yp=e=>`${Uq}${e}`,Ob=e=>{let t=Ia(e.modulePrompt),r={...e.wizard.parameterValues},n=new Set(e.wizard.variables.map(o=>o.name));for(let o of t){let s=yp(o),i=e.posted.get(s),a=i!==null?i.trim():r[o]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:n.has(o)?`Fill in {{${o}}} before running this module.`:`Fill in {{${o}}} (not listed in Step 1) before running this module.`};r[o]=a}return{ok:!0,parameterValues:r}}});var Rn,sI=l(()=>{"use strict";Rn=["generalize","evaluate","separate","optimize_modules"]});var C=l(()=>{"use strict";ap();ha();m0();YA();dp();sb();g0();f0();h0();S0();A0();b0();P0();XA();w0();Aa();C0();ub();I0();kr();j0();D0();H0();F0();z0();G0();V0();q0();Wb();K0();J0();Eb();Y0();X0();Z0();Q0();eI();tI();xb();rI();Ib();nI();oI();sI()});var Na=l(()=>{"use strict";lt();oa();Ld()});var Bq,lI,cI=l(()=>{"use strict";Na();Bq=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,lI=e=>{let t=go(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(Bq)],n=r[r.length-1];if(n===void 0)return null;let o=Number(n[1])+Number(n[2]);return Number.isFinite(o)&&o>=1?o:null}});var Gq,Vq,dI,Mb,qq,Kq,ft,uI,pI,kn=l(()=>{"use strict";Na();cI();Gq="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",Vq="The writer waited on terminal input and did not return a prompt.",dI=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Mb=e=>{let t=e.trim();if(t.length===0||t.length>=500||!dI.test(t))return null;let r=t.split(`
`).map(n=>n.trim()).find(n=>dI.test(n))??t;return r.length>280?`${r.slice(0,277)}...`:r},qq=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},Kq=e=>Mb(e.stdout)??Mb(e.stderr)??(qq(e.replyFile)?Mb(e.replyFile):null),ft=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return Gq;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?Vq:null},uI=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],pI=e=>{let t=e.replyFileText?.trim()??"",r=ft([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let n=Kq({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(n!==null)return{ok:!1,errorMessage:n};let o=lI([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:o};if(e.writerAgent==="claude-cli"){let i=go(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:o}:{ok:!1,errorMessage:"The writer did not reply."}}});var ja,Nb=l(()=>{"use strict";ja=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var Sp,Bo,jb=l(()=>{"use strict";Nb();Sp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bo=e=>{let t=ja(e.cycle),r=e.cycle.wizard,o=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=o!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Sp(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=f=>c&&f===0?"Trial run":`Round ${f}`,p=e.cycle.revisions.map(f=>{let b=f.judgement?.score,h=b==null?`${d(f.roundNumber)} \u2014 not scored`:`${d(f.roundNumber)} \u2014 ${b}`,y=f.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${Sp(y)}</span>`;if(e.interactive){let A=e.selectedRound===f.roundNumber?" checked":"";return`<li><label><input type="radio" name="wizardRevisionRound" value="${f.roundNumber}"${A}> ${Sp(h)}</label>${u}</li>`}return`<li>${Sp(h)}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var Db,mI,Ap,gI,bp=l(()=>{"use strict";Db=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mI=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Db(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Db(t.prompt)}</pre></li>`).join("")}</ol>`,Ap=e=>mI([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),gI=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(o=>o.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Db(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${mI(t.modules.map(o=>({title:o.title,prompt:o.prompt})))}
  </section>`}});var ce,Jq,Yq,Xq,Zq,Qq,eK,Go,Pp=l(()=>{"use strict";C();jb();bp();ce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Jq=e=>{let t=e.wizard;if(t===void 0)return null;let n=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(n===void 0||typeof n.output!="object"||n.output===null)return null;let o=n.output.revisions;if(!Array.isArray(o))return null;let s=[];for(let i of o){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},Yq=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.variables.length===0?'<p class="muted">No variables yet.</p>':`<ul class="sdlc-wizard-vars">${t.variables.map(a=>`<li><strong>{{${ce(a.name)}}}</strong> \u2014 ${ce(a.description)} (sample: ${ce(a.sampleValue)})</li>`).join("")}</ul>`,n=t.templatedPrompt.trim(),o=n.length===0?'<p class="muted">No templated prompt yet.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${ce(n)}</pre>`,s=ka(t.templatedPrompt,t.variables).trim(),i=s.length===0||s===n?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${ce(s)}</pre>`;return`${r}${o}${i}`},Xq=(e,t)=>`<ul class="sdlc-wizard-revisions">${e.map(n=>{let o=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,s=t===n.roundNumber?" (selected)":"",i=n.reasons?.trim()??"",a=i.length===0?"":`<br><span class="muted">${ce(i)}</span>`;return`<li>${ce(o)}${s}${a}</li>`}).join("")}</ul>`,Zq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Bo({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let n=Jq(e);if(n!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${Xq(n,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Ta({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${ce(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${ce(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},Qq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let n=t.modules.map(o=>`<li><strong>${ce(o.title)}</strong> <span class="muted">(${ce(o.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${n}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(n=>{let o=n.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===n.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${ce(n.title)}</strong>${o}${ce(s)}<br><span class="muted">${ce(n.summary)} (${ce(n.topology)})</span>${Ap(n)}</li>`}).join("")}</ul>`},eK=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((o,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${ce(i)}</span> <strong>${ce(o.title)}</strong>${ce(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${ce(o.prompt)}</pre></li>`}).join(""),n=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Bo({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${n}`},Go=(e,t)=>{switch(t){case"wizard-1":return Yq(e);case"wizard-2":return Zq(e);case"wizard-3":return Qq(e);case"wizard-4":return eK(e);default:return""}}});var tK,fI,hI,yI=l(()=>{"use strict";C();kn();Pp();tK=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},fI=(e,t,r,n)=>{let o=ft(t);return{title:e,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:n,promptText:o===null?t:null,promptNote:o,bodyHtml:null}},hI=(e,t)=>{if(t.id.startsWith("wizard-")){let o=Go(e,t.id);return{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:o.trim().length===0?null:o}}if(t.id==="end"){let o=Ae(e.revisions.map(s=>({roundNumber:s.roundNumber,promptText:s.promptText,score:s.judgement?.score??null,reasons:s.judgement?.reasons??null})));return o===null?{title:t.label,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:fI(t.label,o.promptText,o.score,o.reasons)}let r=t.id==="rewrite"?e.currentRound:tK(t.id),n=r===null?void 0:e.revisions.find(o=>o.roundNumber===r);return n===void 0?{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:fI(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail)}});var Da,SI,AI=l(()=>{"use strict";Da=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SI=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?'<p class="muted">Not scored yet.</p>':`<p class="muted">${Da(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,n=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Da(e.feedback.trim())}</p>`,o=e.promptNote!==null?`<div class="alert-error">${Da(e.promptNote)}</div>`:e.promptText===null?"":`<h2>Saved prompt</h2><pre class="mono">${Da(e.promptText)}</pre>`;return`<h2>${Da(e.title)}</h2>${t}${r}${n}${o}`}});var Cn,Vo,Ha=l(()=>{"use strict";Cn=e=>e.toLocaleString("en-US"),Vo=(e,t)=>e.revisions.reduce((r,n)=>t!==void 0&&n.roundNumber>t?r:r+(n.writerTokens??0)+(n.run?.tokens??0)+(n.judgement?.tokens??0),0)});var wp,rK,bI,_p,PI,wI,vp=l(()=>{"use strict";C();yI();AI();Ha();wp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rK=(e,t)=>{let r=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',n=/^score-(\d+)$/.exec(e.id),o=e.state==="done"&&n!==null?Vo(t,Number(n[1])):0,s=o>0?`<span class="sdlc-node-reason">${Cn(o)} tokens so far</span>`:"",i=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${wp(e.detail)}</span>`:"",a=SI(hI(t,e)),c=t.wizard!==void 0&&t.wizard.phase==="complete"&&k(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${wp(e.id)}"`:"";return`<li class="sdlc-node sdlc-node-${e.state}"><button type="button" class="sdlc-node-open"${c} data-sdlc-node>${r}<span class="sdlc-node-label">${wp(e.label)}${i}${s}</span></button><template>${a}</template></li>`},bI=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>rK(r,t)).join("")}</ol>`,_p=e=>`<div class="sdlc-score" aria-label="What the score means">${va(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${wp(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,PI='<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog"><button class="btn btn-secondary" type="submit">Close</button></form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>',wI=`<script>
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
</script>`});var Wp,Lp,Ep,_I,Hb=l(()=>{"use strict";Wp="support-reply",Lp="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Ep=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),_I=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Rp,vI,WI=l(()=>{"use strict";C();vp();Hb();Rp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vI=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. <strong>Classic loop (90 / 10 rounds)</strong> skips the wizard: a judge scores the prompt in your folder, an improver rewrites under the pass score, and the loop stops when the score passes, you press Stop run, the round limit is hit, or the score has not risen for 3 rounds. After each scored round the page shows tokens spent. The next rewrite starts from the highest scoring prompt; lower scores become an avoid list. The round limit starts at 10 on classic runs (wizard evaluate defaults differ). Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field. The pass score slider defaults to ${90} on classic runs.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>You set the pass score with the slider. The bar fades from a weak score to a pass. The mark is the usual ${90}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${_p(90)}
      <h2>Writers and folder</h2>
      <p>You choose the judge and the improver. Each one has an optional instructions field, used with the goal. Each round the judge runs the prompt in the folder you chose. If the prompt needs an input, put that input in the judge instructions. The judge then reads the git changes, or the files the prompt names, and scores those changes. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder. It does not guess a printed reply, and it does not score the prompt wording. A separate pass checks the tokens and suggests what to cut before the improver runs. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, and improver you last chose. The first visit uses your home directory and leaves the judge and improver blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot runs this loop itself before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a run in that folder. maxRounds is optional and defaults to 10. When only one writer is installed, that writer scores and rewrites. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${Rp(Lp)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Rp(Ep)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Rp(_I)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Rp(Wp)}">Run this sample</a>
      </div>
    </section>`});var $b,kp,nK,LI,EI=l(()=>{"use strict";$b=m(require("node:fs")),kp=m(require("node:path")),nK=e=>kp.default.join(kp.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),LI=(e,t)=>{let r=nK(e),n=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;$b.default.mkdirSync(kp.default.dirname(r),{recursive:!0}),$b.default.appendFileSync(r,n,"utf8")}});var qo,RI,oK,kI,sK,CI,Rt,J,TI,G,Je=l(()=>{"use strict";qo=m(require("node:fs")),RI=m(require("node:path"));C();EI();oK=e=>e.wizard===void 0?e:{...e,wizard:hb(e.wizard)},kI=new Set,sK=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),CI=(e,t)=>{qo.default.mkdirSync(RI.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;qo.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),qo.default.renameSync(r,e)},Rt=e=>{if(!qo.default.existsSync(e))return[];try{let t=JSON.parse(qo.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(sK).map(oK):[]}catch{return[]}},J=(e,t)=>Rt(e).find(r=>r.id===t)??null,TI=(e,t)=>{kI.add(t);let r=Rt(e).filter(n=>n.id!==t);CI(e,r)},G=(e,t)=>{if(kI.has(t.id))return;let r=Rt(e),n=r.some(o=>o.id===t.id)?r.map(o=>o.id===t.id?t:o):[t,...r];CI(e,n),LI(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var xI,Cp,Fb,Tn,zb,kt,xn,ke,Ye=l(()=>{"use strict";xI=m(require("node:fs")),Cp=m(require("node:os")),Fb=m(require("node:path"));ut();Tn="~",zb=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,kt=e=>{let t=Cp.default.homedir(),r=zb(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},xn=e=>{let t=e.trim().length===0?"~":e.trim(),r=qe(t),n=Fb.default.isAbsolute(r)?zb(r):zb(Fb.default.resolve(Cp.default.homedir(),r));try{if(!xI.default.statSync(n).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:n,display:kt(n)}},ke=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Cp.default.homedir()});var Ko,Ct,$a,II,Tp,iK,OI,MI,NI,Ub=l(()=>{"use strict";Ko=m(require("node:fs")),Ct=m(require("node:path")),$a=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},II=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Tp=(e,t)=>{let r=$a(e);return r.length>0?r:$a(t)},iK=e=>{let t=Tp(e.fileName,e.name),r=e.promptText.trim(),n=e.name.trim();if(t.length===0||r.length===0||n.length===0)return null;let o=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${II(n)}`,...o.length>0?[`description: ${II(o)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},OI=e=>`.cursor/skills/${e}/SKILL.md`,MI=(e,t)=>{let r=$a(t);if(r.length===0)return!1;let n=Ct.default.resolve(e),o=Ct.default.resolve(n,".cursor","skills"),s=Ct.default.resolve(n,OI(r));return s.startsWith(`${o}${Ct.default.sep}`)?Ko.default.existsSync(s):!1},NI=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Tp(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Ct.default.resolve(e.workingDirectory);try{if(!Ko.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=iK({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let n=OI(r.slug),o=Ct.default.resolve(t,".cursor","skills"),s=Ct.default.resolve(t,n);if(!s.startsWith(`${o}${Ct.default.sep}`))return{ok:!1,errorCode:"path"};if(Ko.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Ko.default.mkdirSync(Ct.default.dirname(s),{recursive:!0}),Ko.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:n}}});var aK,jI,DI,HI=l(()=>{"use strict";C();C();Je();Ye();kn();Ub();aK=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,jI=e=>{let t=e.get("savedSkill");return t!==null&&aK.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},DI=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=J(e.storePath,t),n=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!k(r.status))return{kind:"redirect",location:n("skillError=working")};let o=Ae(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(o===null||ft(o.promptText)!==null)return{kind:"redirect",location:n("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=NI({workingDirectory:ke(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:o.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:n(`skillError=${a}`)}}return{kind:"redirect",location:n(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var x,lK,xp,De,In,FI,$I,zI,UI,He=l(()=>{"use strict";x="manual",lK=["claude-cli","codex","cursor","antigravity"],xp={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},De=e=>e===x?"You":e in xp?xp[e]:e,In=e=>lK.filter(t=>e.includes(t)),FI=e=>{let t=In(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},$I=(e,t)=>t===x?x:e.find(r=>r===t)??null,zI=(e,t,r)=>{let n=In(e),o=$I(n,t),s=$I(n,r);return o===null||s===null?null:{judge:o,improver:s}},UI=(e,t,r)=>{let n=In(e);return t===null||t.trim()===""?r!==x?r:n[0]??null:t===x?null:n.find(o=>o===t)??null}});var Bb,BI,GI=l(()=>{"use strict";Bb={ok:!1,errorMessage:"Stopped.",stopped:!0},BI=(e,t,r)=>{if(t===void 0)return;let n=()=>{e.kill("SIGTERM"),r(Bb)};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var VI,Fa,qI,Gb,cK,dK,uK,Xe,za=l(()=>{"use strict";VI=require("node:child_process"),Fa=m(require("node:fs")),qI=m(require("node:os")),Gb=m(require("node:path"));Na();GI();kn();cK=["claude-cli","codex","cursor","antigravity"],dK=18e4,uK=e=>cK.includes(e),Xe=e=>new Promise(t=>{if(e.signal?.aborted){t(Bb);return}if(!uK(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,n=_t(r,e.prompt,ie({}));if(n===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!Fa.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let o=Gb.default.join(Fa.default.mkdtempSync(Gb.default.join(qI.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=uI({writerAgent:r,baseArgs:n.args,replyPath:o}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,VI.spawn)(n.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=f=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(f))};BI(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??dK),d.stdout.on("data",f=>{i.push(Buffer.from(f))}),d.stderr.on("data",f=>{a.push(Buffer.from(f))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let f=Fa.default.existsSync(o)?Fa.default.readFileSync(o,"utf8"):null;p(pI({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:f}))})})});var KI,pK,Ua,Ip,Op=l(()=>{"use strict";C();He();KI=e=>e===x?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},pK=(e,t,r,n,o,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:n,reasons:o,rawReply:t,tokens:s}}:i),Ua=(e,t,r=null)=>{let n=e.revisions.find(a=>a.roundNumber===e.currentRound),o=ob({raw:t,passScore:e.passScore,goal:e.goal,promptText:n?.promptText??"",improver:KI(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:_a(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=pK(e,t,o.verdict?.score??null,o.verdict?.passed??null,o.verdict?.reasons??null,r),i=new Date().toISOString();return o.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:o.continuation.type,errorMessage:o.continuation.type==="passed"?null:o.continuation.errorMessage,updatedAt:i}},Ip=(e,t,r=null)=>{let n=up({raw:t,judge:KI(e.judgeModel),goal:e.goal,passScore:e.passScore}),o=new Date().toISOString();return n.nextPrompt===null?{...e,status:"failed",errorMessage:n.continuation.type==="failed"?n.continuation.errorMessage:"The improver reply was empty.",updatedAt:o}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:n.nextPrompt,judgement:null,writerTokens:r}],updatedAt:o}}});var Mp,Vb=l(()=>{"use strict";Mp=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let n=`Token review: ${r}`;return{...e,revisions:e.revisions.map(o=>{if(o.roundNumber!==e.currentRound)return o;let s=o.judgement?.reasons?.trim()??"";return{...o,run:o.run===void 0?o.run:{...o.run,tokenReview:r},judgement:o.judgement===null?o.judgement:{...o.judgement,reasons:s.length===0?n:`${s}

${n}`}}})}}});var XI,Np,jp,JI,YI,qb,mK,ZI,Kb,gK,QI,fK,hK,eO,tO=l(()=>{"use strict";XI=require("node:child_process"),Np=m(require("node:fs")),jp=m(require("node:path"));C();JI=4e3,YI=12e3,qb=(e,t)=>{let r=(0,XI.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},mK=e=>qb(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",ZI=e=>{let t=qb(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(n=>{if(n.length<4)return[];let o=n.slice(3).trim();return[[(o.includes(" -> ")?o.split(" -> ").at(-1)??o:o).replaceAll('"',""),n]]});return Object.fromEntries(r)},Kb=(e,t)=>{let r=jp.default.resolve(e,t),n=jp.default.relative(e,r);if(n.startsWith("..")||jp.default.isAbsolute(n)||!Np.default.existsSync(r)||!Np.default.statSync(r).isFile())return null;let o=Np.default.readFileSync(r,"utf8");return o.includes("\0")?"(binary file)":o.length>JI?`${o.slice(0,JI)}
\u2026truncated`:o},gK=e=>e.length>YI?`${e.slice(0,YI)}
\u2026truncated`:e,QI=e=>{let t=cb(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(o=>[o,Kb(e.workingDirectory,o)])),n=mK(e.workingDirectory);return{git:n,status:n?ZI(e.workingDirectory):{},files:r,paths:t}},fK=(e,t)=>{let r=qb(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let n=Kb(e,t);return n===null?`${t} is missing.`:n},hK=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",eO=e=>{let t=e.before.git?ZI(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),n=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Kb(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),o=r.map(a=>fK(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",o.length>0?`Changes since the run started:
${o.join(`
`)}`:"",n.length>0?`Files named in the prompt:
${n.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:hK(e.before.git,e.before.paths.length>0),evidence:gK(i.join(`

`))}}});var Xb,z,Zb,be,rO,yK,SK,nO,Jo,oO,Yo,AK,bK,Ba,Jb,Yb,PK,sO,wK,_K,vK,iO,WK,aO,lO,LK,EK,cO,dO=l(()=>{"use strict";Xb=require("node:child_process"),z=m(require("node:fs")),Zb=m(require("node:os")),be=m(require("node:path")),rO=8e6,yK=16e6,SK=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],nO=(e,t)=>{let r=(0,Xb.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Jo=(e,t)=>(0,Xb.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,oO=e=>{let t=nO(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let n=r.slice(3).trim().replaceAll('"',"");return(n.includes(" -> ")?n.split(" -> "):[n]).map(s=>[s.trim(),r])}))},Yo=(e,t)=>{let r=be.default.resolve(e,t),n=be.default.relative(e,r);return n.startsWith("..")||be.default.isAbsolute(n)?null:r},AK=(e,t)=>{let r=Yo(e,t);if(r===null||!z.default.existsSync(r))return null;let n=z.default.statSync(r);return!n.isFile()||n.size>rO?null:z.default.readFileSync(r)},bK=(e,t,r)=>{let n=Yo(e,t);n!==null&&(z.default.mkdirSync(be.default.dirname(n),{recursive:!0}),z.default.writeFileSync(n,r))},Ba=(e,t)=>{let r=Yo(e,t);r===null||!z.default.existsSync(r)||z.default.rmSync(r,{recursive:!0,force:!0})},Jb=(e,t)=>Jo(e,["cat-file","-e",`HEAD:${t}`]),Yb=e=>{let t=nO(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},PK=e=>be.default.resolve(e)!==be.default.resolve(Zb.default.homedir()),sO=e=>{if(!z.default.existsSync(e))return 0;let t=z.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?z.default.readdirSync(e).reduce((r,n)=>r+sO(be.default.join(e,n)),0):0},wK=(e,t,r)=>{let n=Yo(e,r);if(n===null||!z.default.existsSync(n))return{relativePath:r,existed:!1,copyDir:null};if(sO(n)>yK)return{relativePath:r,existed:!0,copyDir:null};let o=be.default.join(t,"cache",r);return z.default.mkdirSync(be.default.dirname(o),{recursive:!0}),z.default.cpSync(n,o,{recursive:!0}),{relativePath:r,existed:!0,copyDir:o}},_K=400,vK=32e6,iO=e=>{let t=[],r=0,n=!0,o=s=>{if(!(!n||!z.default.existsSync(s)))for(let i of z.default.readdirSync(s)){if(!n||i===".git"||i==="node_modules")continue;let a=be.default.join(s,i),c=z.default.statSync(a);if(c.isDirectory()){o(a);continue}if(!(!c.isFile()||c.size>rO)){if(t.length>=_K||r+c.size>vK){n=!1;return}r+=c.size,t.push(be.default.relative(e,a))}}};return o(e),{paths:t,complete:n}},WK=(e,t,r)=>{let n=Yo(e,r);if(n===null||!z.default.existsSync(n))return null;let o=AK(e,r);if(o===null)return"skip";let s=be.default.join(t,"files",r);return z.default.mkdirSync(be.default.dirname(s),{recursive:!0}),z.default.writeFileSync(s,o),s},aO=e=>{let t=z.default.mkdtempSync(be.default.join(Zb.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?oO(e.workingDirectory):{},n=e.git?{paths:[],complete:!0}:iO(e.workingDirectory),o=e.git?[...Object.keys(r),...e.namedPaths]:[...n.paths,...e.namedPaths],s=Object.fromEntries([...new Set(o)].map(i=>[i,WK(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?Yb(e.workingDirectory):null,isolateCaches:PK(e.workingDirectory),complete:n.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:SK.map(i=>wK(e.workingDirectory,t,i))}},lO=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Ba(e.workingDirectory,t);return}bK(e.workingDirectory,t,z.default.readFileSync(r))}},LK=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?lO(e,t):Jb(e.workingDirectory,t)?Jo(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Ba(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",n=r.startsWith(" ")||r.startsWith("?");n&&Jb(e.workingDirectory,t)&&Jo(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),n&&!Jb(e.workingDirectory,t)&&Jo(e.workingDirectory,["reset","-q","HEAD","--",t])},EK=(e,t)=>{let r=Yo(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Ba(e.workingDirectory,t.relativePath),z.default.mkdirSync(be.default.dirname(r),{recursive:!0}),z.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Ba(e.workingDirectory,t.relativePath);return}if(z.default.existsSync(r))for(let n of z.default.readdirSync(r)){let o=be.default.join(r,n);z.default.statSync(o).mtimeMs>=e.startedMs-1e3&&z.default.rmSync(o,{recursive:!0,force:!0})}}}},cO=e=>{try{if(e.git){if(Yb(e.workingDirectory)!==e.head&&(!(e.head===null?Jo(e.workingDirectory,["update-ref","-d","HEAD"]):Jo(e.workingDirectory,["reset","--hard",e.head]))||Yb(e.workingDirectory)!==e.head))throw new Error("head");let r=oO(e.workingDirectory);for(let n of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))LK(e,n)}else{if(e.complete)for(let t of iO(e.workingDirectory).paths)e.files[t]===void 0&&Ba(e.workingDirectory,t);for(let t of Object.keys(e.files))lO(e,t)}for(let t of e.caches)EK(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{z.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Dp,Hp,RK,kK,CK,TK,xK,uO,IK,pO,mO=l(()=>{"use strict";C();Op();Vb();tO();dO();He();Ye();za();Dp=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),Hp=e=>({...e,status:"stopped",errorMessage:Ln,judgePhase:void 0,updatedAt:new Date().toISOString()}),RK=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),kK=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==x?t:e.improverModel!==x?e.improverModel:null}return e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null},CK=async e=>{let t=ke(e.cycle),r=QI({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),n=aO({workingDirectory:t,git:r.git,namedPaths:r.paths}),o=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?vb({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Ra(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Pa({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await Xe({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?eO({workingDirectory:t,before:r,writerReply:i.text}):null,c=cO(n);return i.ok?!c.ok||a===null?{ok:!1,cycle:Dp(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-o,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Hp(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Dp(e.cycle,i.errorMessage)})},TK=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:CK({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),xK=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),uO=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let n=await Xe({writerAgent:e.reviewer,workingDirectory:ke(e.cycle),prompt:lb({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return n.ok?{kind:"suggestion",text:n.text.trim(),tokens:n.tokens}:n.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Hp(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},IK=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===x)return t;let n={...t,judgePhase:"scoring"};e.onProgress?.(n);let o=await Xe({writerAgent:t.judgeModel,workingDirectory:ke(t),prompt:ab({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return o.ok?{...Ua(n,o.text,o.tokens),judgePhase:void 0}:o.stopped===!0||e.signal?.aborted===!0?Hp(n):(e.onWriterFailure?.(t.judgeModel),Dp(n,o.errorMessage))},pO=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return IK(e);let n=kK(t),o=await TK({cycle:t,revision:r,runner:n,signal:e.signal,onWriterFailure:e.onWriterFailure});if(o===null)return t;if(!o.ok)return o.cycle;let s=r.run===void 0?RK(t,o.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===x){let p=await uO({cycle:s,run:o.run,promptText:r.promptText,reviewer:n,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...xK(s,p.text),judgePhase:void 0}}let i=await Xe({writerAgent:t.judgeModel,workingDirectory:ke(t),prompt:nb({goal:t.goal,lookedAt:o.run.lookedAt??"the writer reply",evidence:o.run.evidence??o.run.output,tokens:o.run.tokens,delayMs:o.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Hp(s):(e.onWriterFailure?.(t.judgeModel),Dp(s,i.errorMessage));let a=await uO({cycle:s,run:o.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Ua(s,i.text,c);return Mp(d,a.text)}});var $p,Qb=l(()=>{"use strict";C();$p=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t?.judgement?.score,n=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||n.length===0?null:ba({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:n},priorRounds:_a(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null})),e.currentRound)})}});var Fp,OK,MK,eP,gO=l(()=>{"use strict";C();Op();mO();Qb();He();Ye();za();Fp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),OK=e=>({...e,status:"stopped",errorMessage:Ln,updatedAt:new Date().toISOString()}),MK=(e,t,r,n,o)=>t.ok?null:t.stopped===!0||n?.aborted===!0?OK(e):(o?.(r),Fp(e,t.errorMessage)),eP=async(e,t,r,n)=>{let o=e.revisions.find(c=>c.roundNumber===e.currentRound);if(o===void 0)return Fp(e,"This round has no prompt.");if(e.status==="judging")return pO({cycle:e,revision:o,onWriterFailure:t,signal:r,onProgress:n});if(e.status!=="improving")return Fp(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===x)return e;let s=$p(e);if(s===null)return Fp(e,"The improver needs the score and the reason.");let i=await Xe({writerAgent:e.improverModel,workingDirectory:ke(e),prompt:ya({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=MK(e,i,e.improverModel,r,t);return a!==null?a:Ip(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var Bp,zp,fO,NK,jK,Up,hO,yO,DK,HK,SO,AO,bO,tP=l(()=>{"use strict";C();He();Ye();za();gO();Nb();Bp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),zp=(e,t,r)=>e.wizard===void 0||t===null?Bp(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},fO=e=>{let t=e.wizard;return t===void 0||ja(e).length===0?e:{...e,wizard:zo({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},NK=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",jK=e=>{let t=e.wizard;if(t===void 0)return e;let r=Ea({revisions:e.revisions});if(r.rounds.length===0)return e;let n=t.modules[t.currentModuleIndex];return{...e,wizard:zo({wizard:t,step:"optimize_modules",output:{moduleId:n?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Up=(e,t)=>({...e,status:"wizard_paused",errorMessage:e.errorMessage,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),hO=e=>e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null,yO=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let o=r.attempts.filter(s=>s.step===t).at(-1);return o===void 0?"":JSON.stringify(o.output)},DK=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=hO(e);if(o===null)return Bp(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Ca(n),i=bb({goal:e.goal,sourcePrompt:s,avoid:n.avoidByStep.generalize,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:yO(e,"generalize")}),a=await Xe({writerAgent:o,prompt:i,workingDirectory:ke(e),signal:t});if(!a.ok)return r?.(o),zp(e,"generalize",a.errorMessage);try{let c=Cb(a.text),d=zo({wizard:{...n,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Oa(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return Up({...e,wizard:d},"generalize")}catch(c){return zp(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},HK=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=hO(e);if(o===null)return Bp(e,"Choose a writer to suggest splits.");let s=Ta({wizard:n,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=_b({goal:e.goal,templatedPrompt:n.templatedPrompt,variables:n.variables,evaluatedPromptReference:s,avoid:n.avoidByStep.separate,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:yO(e,"separate")}),a=await Xe({writerAgent:o,prompt:i,workingDirectory:ke(e),signal:t});if(!a.ok)return r?.(o),zp(e,"separate",a.errorMessage);try{let c=Tb(a.text),d=Pb(c,n.variables),p=zo({wizard:{...n,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return Up({...e,wizard:p},"separate")}catch(c){return zp(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},SO=e=>{let t=e.wizard;if(t===void 0)return e;let r=Ca(t),n=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:70,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:n}},AO=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let n=r.modules[t];if(n===void 0)return Bp(e,"This module is missing.");let o=En(r),s=xa(n.prompt,o),i=e.runnerModel!==void 0&&e.runnerModel!==x?e.runnerModel:e.judgeModel!==x?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:70,maxRounds:1,errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},bO=async(e,t,r,n)=>{let o=e.wizard;if(o===void 0)return eP(e,t,r,n);if(o.gate!==null||e.status==="wizard_paused")return e;if(o.phase==="generalize")return DK(e,r,t);if(o.phase==="separate"&&o.splitOptions.length===0)return HK(e,r,t);if(o.phase==="evaluate"||o.phase==="optimize_modules"){let s=await eP(e,t,r,n);if(k(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&ja(s).length===0)return s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let p=Ae(s.revisions.map(b=>({roundNumber:b.roundNumber,promptText:b.promptText,score:b.judgement?.score??0,reasons:b.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0,f=Up({...s,wizard:{...s.wizard,evaluateSelectedRound:p}},i);return i==="evaluate"?fO(f):f}let a=Up(s,i),c=i==="optimize_modules"&&a.wizard!==void 0?(()=>{let d=Lb({wizard:{...a.wizard,modules:a.wizard.modules.map((p,f)=>f===a.wizard.currentModuleIndex&&p.status==="running"?{...p,status:"paused"}:p)},moduleIndex:a.wizard.currentModuleIndex,revisions:a.revisions,cycleStatus:NK(s.status)});return{...a,wizard:d}})():a;return i==="evaluate"?fO(c):jK(c)}return s}return o.phase==="complete",e}});var Cr,PO,$K,wO=l(()=>{"use strict";C();Ye();kn();Ub();Cr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),PO=e=>{if(!k(e.status))return"";let t=Ae(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,n=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",o=ft(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Cr(t.reasons.trim())}</p>`,i=o===null?$K({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ke(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${Cr(o)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${n}${s}${i}</section>`},$K=e=>{let t=e.sourceSkill?.fileName??$a(e.goal),r=e.sourceSkill?.name??t,n=e.sourceSkill?.description??e.goal,o=Tp(t,r),s=o.length>0&&MI(e.workingDirectory,o),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Cr(o)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Cr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Cr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Cr(n)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Cr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Cr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var _O,vO=l(()=>{"use strict";C();C();He();kn();_O=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!k(e.status)){let t=e.judgeModel;return{title:`${De(t)} is suggesting module splits.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!k(e.status)){let t=e.judgeModel;return{title:`${De(t)} is generalizing your prompt.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===x?{title:`Score the prompt text for round ${e.currentRound+1}.`,detail:"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."}:e.judgePhase==="scoring"?{title:`${De(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"No folder run in step 2. This panel keeps updating, so the page is not stuck."}:{title:`${De(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"Wizard evaluate revises prompt wording before the runner executes in step 4."};if(e.status==="judging"&&e.judgeModel===x){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==x?{title:`${De(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"You score the changes after this run."}:{title:`Score the changes from round ${e.currentRound+1}.`,detail:t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt."}}if(e.status==="judging"&&e.judgePhase==="reviewing")return{title:`${De(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,detail:"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck."};if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,n=t.currentModuleIndex+1,o=t.modules.length;return{title:`${De(r)} is scoring module ${n} of ${o}.`,detail:`Step 4 runs one trial per module (pass \u2265 ${70}). This panel keeps updating.`}}return{title:`${De(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,detail:"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck."}}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,n=t.currentModuleIndex+1,o=t.modules.length;return{title:`${De(r)} is running module ${n} of ${o}.`,detail:`The runner executes the module prompt; the judge scores output (pass \u2265 ${70}). This panel keeps updating.`}}return{title:`${De(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck."}}if(e.status==="improving"&&e.improverModel===x){let t=e.revisions.find(n=>n.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return{title:"Rewrite the prompt.",detail:t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`}}if(e.status==="improving")return{title:`${De(e.improverModel)} is rewriting the prompt.`,detail:"That writer is working on this Mac. This panel keeps updating, so the page is not stuck."};if(e.status==="passed")return{title:"This prompt passed.",detail:""};if(e.status==="stopped"){let t=e.revisions.some(o=>ft(o.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let o=ge(e.wizard),s=o.totalModules>0&&(e.wizard.phase==="complete"||o.passedModuleCount>0||k(e.status));return{title:s&&o.totalModules>0?`Wizard finished \u2014 ${o.passedModuleCount}/${o.totalModules} modules passed`:"Wizard stopped before all steps finished",detail:r.length>0?r:s?"":"Progress from finished steps is kept."}}return{title:(e.errorMessage??"").startsWith("Finished")?"Finished.":"Stopped.",detail:r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept."}}return k(e.status)?{title:"This run stopped because a reply could not be used.",detail:""}:{title:"Working on this Mac.",detail:"This panel keeps updating."}}});var Tt,Ga=l(()=>{"use strict";He();Tt=e=>{if(e.status==="improving"&&e.improverModel===x)return!0;if(e.status!=="judging"||e.judgeModel!==x)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===x}});var WO,LO=l(()=>{"use strict";WO=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Tr,FK,EO,RO=l(()=>{"use strict";C();Tr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FK=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Tr(r)}</p>`},EO=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Tr(e.cycleId)}">`,n=e.instructions?.trim()??"",o=n.length===0?"":`<p class="muted">Instructions</p><p>${Tr(n)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Tr(a)}.</p>`}<pre class="mono">${Tr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Rr(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Tr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${o}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",f=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Tr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${o}${FK(e.score,e.reasons)}${f}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Tr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Va,zK,kO,CO=l(()=>{"use strict";C();kn();Va=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zK=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,n=ft(t.promptText),o=t.judgement?.reasons?`<p class="muted">${Va(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Va(i)}.</p>`}<pre class="mono">${Va(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Rr(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=n===null?`<pre class="mono">${Va(d)}</pre>`:`<div class="alert-error">${Va(n)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${o}${a}${p}</article>`},kO=e=>e.revisions.map(t=>zK(e,t)).join("")});var TO,xO=l(()=>{"use strict";C();TO=e=>{if(k(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var xt,UK,rP,BK,GK,VK,qK,IO,OO,nP=l(()=>{"use strict";xO();xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UK="Stop this run? Writers will stop and the best prompt is kept.",rP="End the wizard? Writers will stop and progress from finished steps is kept.",BK="Skip this module and pause at the step gate?",GK=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${xt(UK)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${xt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,VK=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${xt(rP)}"><input type="hidden" name="cycleId" value="${xt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,qK=e=>{let t=xt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${xt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${xt(BK)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${xt(rP)}">End wizard</button>
    </form>
  </div>`},IO=e=>{let t=TO(e);return t==="none"?"":t==="classic"?GK(e.id):t==="wizard_end_only"?VK(e.id):qK(e)},OO=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=xt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${xt(rP)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var MO,NO=l(()=>{"use strict";C();Ha();MO=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let n=r.variables.length;return r.templatedPrompt.trim().length>0?n>0?`Templated prompt \xB7 ${n} variable${n===1?"":"s"}`:"Templated prompt ready":n>0?`${n} variable${n===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let n=e.revisions.filter(o=>o.judgement!==null&&o.judgement!==void 0).length;if(n>0){let o=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return o===null?`${n} scored revision${n===1?"":"s"}`:`Best score ${o} \xB7 ${n} revision${n===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let n=r.modules.length>0?r.modules.length:r.splitOptions.length;return n>0?`${n} module${n===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let n=ge(r);if(n.terminalStatusSuggestion==="passed"&&n.passedModuleCount===n.totalModules){let o=n.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=n.rows.reduce((i,a)=>i+(a.tokens??0),0);return o===null||o.bestScore===null?`${Cn(s)} tokens total`:`Lowest: ${o.title} (${o.bestScore}) \xB7 ${Cn(s)} tokens`}return`${n.passedModuleCount}/${n.totalModules} passed \xB7 \u2265 ${70}`}return""}});var jO,KK,DO,HO=l(()=>{"use strict";C();NO();Pp();jO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),KK=(e,t,r)=>{let n=Go(e,t);if(n.trim().length===0)return"";let o=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=MO(e,t),i=`${jO(o)} <span class="muted sdlc-wizard-outcome-step-hint">${jO(s)}</span>`,a=t==="wizard-4"&&r.phase==="complete"?" open":"",c=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step" id="${c}"${a}><summary aria-controls="${c}-body">${i}</summary><div class="sdlc-wizard-outcome-step-body" id="${c}-body">${n}</div></details>`},DO=e=>{let t=e.wizard;if(t===void 0||!k(e.status))return"";let r=t.phase==="complete",o=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>KK(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${o}</div>`:o;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var $O,FO,zO=l(()=>{"use strict";$O=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FO=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(n=>`<li class="sdlc-wizard-module-prompt"><strong>${$O(n.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${$O(n.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var oP,UO,sP=l(()=>{"use strict";C();oP=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,UO=e=>{if(oP(e))return"Passed";let t=e.statistics?.bestScore;return t!=null&&t<70?`Below pass (${t})`:e.status}});var BO,GO=l(()=>{"use strict";C();BO=e=>{if(e.terminalStatusSuggestion==="passed")return"";let t=e.rows.filter(r=>r.bestScore!==null&&r.bestScore<70).length;return t>0&&t===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${t} module${t===1?"":"s"} scored below ${70}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${70}.`}});var Gp,VO,qO=l(()=>{"use strict";C();sP();sP();GO();Gp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VO=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=ge(t),n=r.terminalStatusSuggestion==="passed"?"":BO(r),o=60,s=r.rows.map((a,c)=>{let d=t.modules[c],p=a.bestScore===null?"\u2014":`${a.bestScore} / \u2265${70}`,b=a.bestScore!==null&&a.bestScore>=o&&a.bestScore<70?' class="sdlc-score-near-pass"':"",h=d===void 0?a.status:UO(d),y=d!==void 0&&oP(d)?'<span aria-label="Passed">\u2713</span>':Gp(h);return`<tr${b}><td>${Gp(a.title)}</td><td>${Gp(p)}</td><td>${a.tokens??"\u2014"}</td><td>${y}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${Gp(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${s}</tbody></table></div>`}});var JK,KO,JO=l(()=>{"use strict";C();C();zO();qO();JK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),KO=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!k(e.status)||t.modules.length===0)return"";let r=VO(e),n=FO(e);if(r.length===0&&n.length===0)return"";let o=(e.revisions[0]?.promptText??"").trim(),s=ge(t),i=s.passedModuleCount<s.totalModules?" open":"";return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${o.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${JK(o)}</pre></details>`}${r}${n}</section>`}});var Xt,qa=l(()=>{"use strict";Xt=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",n=r.length>0?r:"Untitled run";return n.length<=72?n:`${n.slice(0,71).trimEnd()}\u2026`}});var xr,Vp,iP=l(()=>{"use strict";C();vp();wO();vO();Ga();LO();Qb();RO();CO();nP();HO();JO();Ha();Ye();qa();xr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vp=e=>{let t=!k(e.status)&&e.status!=="wizard_paused"&&!Tt(e),r=_O(e),n=bI(mb(WO(e)),e),o=k(e.status)?"":IO(e),s=DO(e),i=KO(e),a=PO(e),c=e.errorMessage===null?"":`<div class="alert-error">${xr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",f=e.wizard!==void 0&&e.wizard.phase==="complete"?ge(e.wizard):null,b=f!==null&&f.totalModules>0&&f.passedModuleCount===f.totalModules,h=!t&&e.wizard!==void 0&&k(e.status)&&(e.wizard.phase==="complete"||ge(e.wizard).passedModuleCount>0),y=h?b?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${xr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",A=r.detail.length===0&&u.length===0||r.detail.length===0?"":`<p class="sdlc-run-detail muted">${xr(r.detail)}${p}</p>`,S=e.revisions.find($r=>$r.roundNumber===e.currentRound),g=e.status==="improving"?$p(e):null,w=Vo(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),v=Tt(e)?EO({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:g?.promptText??S?.promptText??"",score:g?.score??S?.judgement?.score??null,reasons:g?.reasons??S?.judgement?.reasons??null,avoid:g?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:S?.run??null,minJudgeScore:_?1:0}):"",L=e.wizard!==void 0&&e.wizard.phase==="complete"&&k(e.status),R=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",T=e.wizard!==void 0&&!L?70:e.passScore,I=R?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${_p(T)}</div>`:"",D=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':k(e.status)?L&&f!==null&&!b?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",le=t?d:h?b?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',V=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${xr(kt(ke(e)))}</li>`:"",w>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Cn(w)} so far</li>`:""].filter($r=>$r.length>0),q=V.length===0?"":`<ul class="sdlc-run-meta">${V.join("")}</ul>`,Hr=o.length===0?"":`<div class="sdlc-run-actions">${o}</div>`,H=L?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${n}</div>`,_e=L?"":I.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${H}</div>`:`<div class="sdlc-run-grid">${H}${I}</div>`,yt=kO(e),Vl=e.wizard!==void 0&&k(e.status)&&e.revisions.every($r=>$r.roundNumber===0&&($r.judgement===void 0||$r.judgement===null)),XF=yt.length===0||Vl?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${yt}</div></section>`,ZF=`<p class="sdlc-run-goal" title="${xr(e.goal.trim())}">${xr(Xt(e.goal))}</p>`,QF=L?`${c}${i}${s}${v}${a}`:`${c}${_e}${v}${s}${a}`,ez='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',tz=L?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${xr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${ez}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${D}</div>${ZF}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${le}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${xr(r.title)}</h2>${A}${u}${tz}</div></div>${q}${Hr}</header>${QF}</section>${XF}`}});var YO,Xo,qp=l(()=>{"use strict";C();YO=e=>Rn.indexOf(e),Xo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||k(e.status)?Rn.length:t.gate!==null?YO(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?YO(t.phase):null}});var XO,ZO=l(()=>{"use strict";XO=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var On,QO,eM=l(()=>{"use strict";C();ZO();On=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QO=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,n=Ra(t,r),o=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${On(XO(n))}</pre></div>`:"",s=Ia(e.modulePrompt);if(s.length===0)return o.length>0?`<div class="sdlc-wizard-module-params">${o}</div>`:"";let i=En(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=yp(c),f=i[c]??"",b=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${On(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${On(p)}">${On(b)}</label>
        ${h}
        <input class="input" type="text" id="${On(p)}" name="${On(p)}" value="${On(f)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${o}${a}</div>`}});var It,tM,rM=l(()=>{"use strict";C();eM();jb();bp();nP();It=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tM=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let n=r.gate,o=n==="generalize"?"Step 1 \u2014 Generalize":n==="evaluate"?"Step 2 \u2014 Evaluate":n==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=n==="generalize"?`<ul class="sdlc-wizard-vars">${r.variables.map(v=>`<li><strong>{{${It(v.name)}}}</strong> \u2014 ${It(v.description)} (sample: ${It(v.sampleValue)})</li>`).join("")}</ul><pre class="sdlc-pre">${It(r.templatedPrompt)}</pre>`:"",i=n==="evaluate"?Bo({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",c=n==="separate"?`${n==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(v=>{let L=v.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',R=v.recommended?' <span class="sdlc-badge">Recommended</span>':"",T=r.selectedSplitOptionId===v.id||r.selectedSplitOptionId===null&&v.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${It(v.id)}" required${T}> <strong>${It(v.title)}</strong>${L}${R}<br><span class="muted">${It(v.summary)}</span></label>${Ap(v)}</li>`}).join("")}</ul>`:"",d=r.modules[r.currentModuleIndex],f=n==="optimize_modules"&&d?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",b=d?.title??"Module",h=d?.prompt??"",y=d?.status==="pending",u=n==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${It(b)}</p>${y?QO({cycle:e,modulePrompt:h}):""}<p class="muted">Test run prompt preview: ${It(xa(h,En(r)))}</p>${d?.statistics===null||d?.statistics===void 0?"":`<p class="muted">Module stats: best ${d.statistics.bestScore??"\u2014"} / \u2265${70} (round ${d.statistics.bestRound??"\u2014"}).</p>`}${Bo({cycle:e,interactive:!1,caption:y?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${b}\u201D (runner + judge).`})}`:"",A=n==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":n==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":n==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":y?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",S=kb(r),g=S===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${S}</p>`,w=t?.active===!0?" sdlc-wizard-gate-active":"",_=t?.active===!0?' id="prompt-optimizer-wizard-active-step"':"";return`<section class="card sdlc-wizard-gate${w}"${_}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${o}</h2>
    <p class="sdlc-wizard-gate-lede">${A}</p>
    ${g}
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
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue"${f}>Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${OO(e)}
  </section>`}});var YK,nM,oM=l(()=>{"use strict";C();YK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nM=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||k(e.status))return"";if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>Suggesting module splits</h2>
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let r=t.currentModuleIndex,o=t.modules[r]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    <h2>Module ${r+1} of ${t.modules.length}: ${YK(o)}</h2>
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
  </section>`:""}});var XK,ZK,QK,sM,iM=l(()=>{"use strict";C();qp();rM();oM();Pp();XK={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},ZK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QK=(e,t,r)=>`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${ZK(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${Go(e,t)}</div>
</details>`,sM=e=>{let t=e.wizard;if(t===void 0)return"";let r=Xo(e);if(r===null)return"";let n=Rn.slice(0,r).map((i,a)=>QK(e,`wizard-${a+1}`,XK[i])),o=t.gate!==null?tM(e,{active:!0}):nM(e),s=r>=Rn.length?"":o;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${n.join("")}${s}</div>`}});var Kp,aP=l(()=>{"use strict";iM();bp();C();Kp=e=>{if(e===null||e.wizard!==void 0&&k(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=sM(e),r=gI(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var lP,aM,lM,Jp,cM,Yp=l(()=>{"use strict";C();Je();lP=new Map,aM=e=>{let t=new AbortController;return lP.set(e,t),t.signal},lM=e=>{lP.delete(e)},Jp=e=>{lP.get(e)?.abort()},cM=(e,t)=>{let r=J(e,t);return r===null||r.wizard!==void 0?!1:(k(r.status)||(G(e,{...r,status:"stopped",errorMessage:Ln,updatedAt:new Date().toISOString()}),Jp(t)),!0)}});var Ka,Xp,dM,cP,uM,pM,mM,gM,dP=l(()=>{"use strict";Ka=m(require("node:fs")),Xp=m(require("node:path")),dM=e=>Xp.default.join(Xp.default.dirname(e),"prompt-optimizer-writer-ready.json"),cP=e=>{let t=dM(e);if(!Ka.default.existsSync(t))return{};try{let r=JSON.parse(Ka.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},uM=(e,t)=>{Ka.default.mkdirSync(Xp.default.dirname(e),{recursive:!0}),Ka.default.writeFileSync(dM(e),`${JSON.stringify(t,null,2)}
`)},pM=(e,t)=>cP(e)[t]?.message??null,mM=(e,t,r)=>{uM(e,{...cP(e),[t]:{message:r}})},gM=(e,t)=>{let r=cP(e);r[t]!==void 0&&uM(e,Object.fromEntries(Object.entries(r).filter(([n])=>n!==t)))}});var uP,Zp,Qp,fM,Me,Mn=l(()=>{"use strict";C();Na();tP();Ga();Yp();dP();Je();uP=new Set,Zp={atMs:0,ids:[]},Qp=async()=>{if(Date.now()-Zp.atMs<3e4)return Zp.ids;let e=await mt({commands:ie({})});return Zp.atMs=Date.now(),Zp.ids=e.installedWriterIds,e.installedWriterIds},fM=async(e,t,r)=>{let n=J(e,t);if(n===null||k(n.status)||n.status==="wizard_paused"||Tt(n)||r.aborted)return;let o=await bO(n,i=>{gM(e,i)},r,i=>{J(e,t)?.status==="stopped"||r.aborted||G(e,i)});J(e,t)?.status==="stopped"||r.aborted||(G(e,o),k(o.status)||await fM(e,t,r))},Me=(e,t)=>{if(uP.has(t))return;let r=J(e,t);if(r===null||k(r.status)||r.status==="wizard_paused"||Tt(r))return;uP.add(t);let n=aM(t);fM(e,t,n).finally(()=>{uP.delete(t),lM(t)})}});var Ir,Ja=l(()=>{"use strict";iP();aP();Mn();Ir=(e,t)=>(Me(e,t.id),`${Vp(t)}${Kp(t)}`)});var hM,yM,SM=l(()=>{"use strict";hM=(e,t)=>e.revisions.find(n=>n.roundNumber===t)?.judgement?.score??null,yM=e=>e!==null&&e>0});var em,AM,pP=l(()=>{"use strict";C();Yp();em=e=>(Jp(e.id),{...e,status:"stopped",errorMessage:JA,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null,phase:"complete"},updatedAt:new Date().toISOString()}),AM=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;Jp(e.id);let r=t.currentModuleIndex,n=t.modules.map((o,s)=>s===r?{...o,status:"stopped"}:o);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:n,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var e8,bM,t8,PM,wM=l(()=>{"use strict";C();tP();Ja();Je();Mn();SM();pP();e8="Pick a revision scored above 0 before continuing to Separate.",bM=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),t8=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null})),PM=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",n=t.get("intent")??"";if(!n.startsWith("wizard-"))return!1;let o=t.get("cycleId")?.trim()??"",s=J(e.storePath,o);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=J(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Ir(e.storePath,d))};if(n==="wizard-stop-all"){let c=em(s);return G(e.storePath,c),a(o),!0}if(n==="wizard-skip-module"){let c=AM(s);return G(e.storePath,c),a(o),!0}if(n==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(o),!0;let p=t.get("wizardStepInstructions")?.trim()??"",f=yb(s.wizard,d,c);f=Sb(f,d),f={...f,pendingStepInstructions:p};let b={...s,status:"judging",wizard:{...f,gate:null},updatedAt:new Date().toISOString()};return G(e.storePath,b),Me(e.storePath,o),a(o),!0}if(n==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(o),!0;if(c==="generalize"){let p=(s.errorMessage?.trim().length??0)>0?bM(s):SO({...s,wizard:{...s.wizard,gate:null}});return G(e.storePath,p),Me(e.storePath,o),a(o),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),f=hM(s,p??-1);if(!yM(f)){let y={...s,errorMessage:e8,updatedAt:new Date().toISOString()};return G(e.storePath,y),a(o),!0}let b={...s.wizard,evaluateSelectedRound:p},h={...s,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...b,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()};return G(e.storePath,h),Me(e.storePath,o),a(o),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0){let y=bM(s);return G(e.storePath,y),Me(e.storePath,o),a(o),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",f=s.wizard.splitOptions.find(y=>y.id===p);if(f===void 0){let y={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return G(e.storePath,y),a(o),!0}let b=t8(f),h={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...s.wizard,gate:"optimize_modules",selectedSplitOptionId:p,selectedSplitTopology:f.topology,modules:b,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(s.wizard.parameterValues??{}).length>0?s.wizard.parameterValues??{}:Oa(s.wizard.variables)},updatedAt:new Date().toISOString()};return G(e.storePath,h),a(o),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(o),!0;let f=Ob({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!f.ok){let u={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return G(e.storePath,u),a(o),!0}let b={...s.wizard,parameterValues:f.parameterValues};if(p.status==="pending"){let u=AO({...s,wizard:{...b,gate:null}},d);return G(e.storePath,u),Me(e.storePath,o),a(o),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=ge(b),A={...s,status:u.terminalStatusSuggestion,wizard:{...b,gate:null,phase:"complete"},updatedAt:new Date().toISOString()};return G(e.storePath,A),a(o),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...b,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return G(e.storePath,y),a(o),!0}}return a(o),!0}});var r8,_M,n8,mP,o8,vM,WM=l(()=>{"use strict";He();Yp();pP();Vb();Op();Ga();Je();r8="Add a score from 0 to 100 and the reason for it.",_M="Add a score from 1 to 100 and the reason for it.",n8="Write the next prompt.",mP="This step is not waiting for you.",o8=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},vM=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=J(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(G(e.storePath,em(a)),{kind:"saved",cycleId:i}):cM(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",n=J(e.storePath,r);if(n===null||!Tt(n))return n===null?{kind:"missing"}:{kind:"invalid",cycle:n,errorMessage:mP};if(t==="manual-judge"){if(n.judgeModel!==x)return{kind:"invalid",cycle:n,errorMessage:mP};let i=o8(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=n.wizard!==void 0&&(n.wizard.phase==="evaluate"||n.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:n,errorMessage:c?_M:r8};if(c&&i===0)return{kind:"invalid",cycle:n,errorMessage:_M};let d=n.revisions.find(f=>f.roundNumber===n.currentRound)?.run?.tokenReview??"",p=Mp(Ua(n,JSON.stringify({score:i,passed:i>=n.passScore,reasons:a})),d);return G(e.storePath,p),{kind:"saved",cycleId:n.id}}if(n.improverModel!==x)return{kind:"invalid",cycle:n,errorMessage:mP};let o=(e.posted.get("prompt")??"").trim();if(o.length===0)return{kind:"invalid",cycle:n,errorMessage:n8};let s=Ip(n,o);return G(e.storePath,s),{kind:"saved",cycleId:n.id}}});var LM,EM=l(()=>{"use strict";LM=`<script>
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
</script>`});var RM,kM=l(()=>{"use strict";RM=`<script>
(() => {
  const lockCompose = () => {
    const fields = document.querySelector(".sdlc-fields");
    if (fields instanceof HTMLFieldSetElement) fields.disabled = true;
    const details = document.getElementById("prompt-optimizer-compose-details");
    if (details instanceof HTMLDetailsElement) details.open = true;
    document.querySelector("[data-sdlc-locked]")?.remove();
    const compose = document.getElementById("prompt-optimizer-compose");
    if (compose) {
      const locked = document.createElement("p");
      locked.className = "sdlc-locked";
      locked.dataset.sdlcLocked = "true";
      locked.textContent = "This run is using these choices.";
      fields?.prepend(locked);
    }
    const button = document.querySelector("[data-sdlc-run]");
    if (button instanceof HTMLButtonElement) {
      button.textContent = "Running\u2026";
    }
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
    if (runApplied) {
      document.getElementById("prompt-optimizer-run")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
    event.preventDefault();
    void postLiveFragment(formDataFromSubmit(form, submitter));
  });

  if (document.querySelector(".sdlc-fields[disabled]")) {
    const details = document.getElementById("prompt-optimizer-compose-details");
    const viewingFinished = document
      .getElementById("prompt-optimizer-compose")
      ?.classList.contains("sdlc-compose-viewing-finished");
    if (details instanceof HTMLDetailsElement) {
      details.open = viewingFinished !== true;
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
</script>`});var CM,TM=l(()=>{"use strict";CM=`<script>
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
</script>`});var xM,IM=l(()=>{"use strict";xM=`<script>
(() => {
  const fit = (area) => {
    area.style.height = "auto";
    area.style.height = area.scrollHeight + "px";
  };
  document.querySelectorAll("form.sdlc-form textarea").forEach((area) => {
    fit(area);
    area.addEventListener("input", () => fit(area));
  });
  const runButtons = [...document.querySelectorAll("[data-sdlc-run]")];
  const hint = document.querySelector("[data-sdlc-run-hint]");
  const slots = [...document.querySelectorAll("[data-writer-status]")];
  const viewingFinishedRun =
    document.querySelector("#prompt-optimizer-run .sdlc-run-badge-done") !== null ||
    document.querySelector("#prompt-optimizer-run .sdlc-run-badge-finished") !== null;
  const staticPreview = window.location.protocol === "file:";
  const paintRunHint = () => {
    if (!(hint instanceof HTMLElement)) return;
    if (runButtons.length === 0) {
      hint.textContent = "";
      hint.hidden = true;
      hint.className = "muted sdlc-run-hint";
      return;
    }
    const reason = readRunBlockReason();
    if (reason === null) {
      hint.textContent = "";
      hint.hidden = true;
      hint.className = "muted sdlc-run-hint";
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
  const readComposeFields = () => {
    const form = document.querySelector("form.sdlc-form");
    if (!(form instanceof HTMLFormElement)) {
      return { hasGoal: false, hasPrompt: false, prompt: "", folder: "", judge: "" };
    }
    const goal = form.querySelector('[name="goal"]');
    const prompt = form.querySelector('[name="prompt"]');
    const folder = form.querySelector('[name="folder"]');
    const judgeSelect = form.querySelector('[data-writer-select="judge"]');
    const goalText = goal instanceof HTMLTextAreaElement ? goal.value.trim() : "";
    const promptText = prompt instanceof HTMLTextAreaElement ? prompt.value.trim() : "";
    const folderText = folder instanceof HTMLInputElement ? folder.value.trim() : "";
    const judgeText =
      judgeSelect instanceof HTMLSelectElement ? judgeSelect.value.trim() : "";
    return {
      hasGoal: goalText.length > 0,
      hasPrompt: promptText.length > 0,
      prompt: promptText,
      folder: folderText,
      judge: judgeText,
    };
  };
  const paintReady = () => {
    const fields = document.querySelector(".sdlc-fields");
    const fieldsDisabled =
      fields instanceof HTMLFieldSetElement && fields.disabled;
    const compose = readComposeFields();
    runButtons.forEach((btn) => {
      if (!(btn instanceof HTMLButtonElement)) return;
      btn.disabled = false;
      const writersReady = slots.every((slot) => slot.dataset.ready === "true");
      const canRun =
        !fieldsDisabled &&
        compose.hasGoal &&
        compose.hasPrompt &&
        writersReady;
      btn.dataset.canRun = canRun ? "true" : "false";
    });
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
    folderInput.addEventListener("input", paintReady);
  }
  const goalInput = document.querySelector('form.sdlc-form [name="goal"]');
  const promptInput = document.querySelector('form.sdlc-form [name="prompt"]');
  if (goalInput instanceof HTMLTextAreaElement) {
    goalInput.addEventListener("input", paintReady);
  }
  if (promptInput instanceof HTMLTextAreaElement) {
    promptInput.addEventListener("input", paintReady);
  }
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
  const setComposeMode = (mode) => {
    const form = document.querySelector("form.sdlc-form");
    if (!(form instanceof HTMLFormElement)) return;
    form.dataset.sdlcComposeMode = mode;
    document.querySelectorAll("[data-sdlc-compose-mode]").forEach((btn) => {
      if (!(btn instanceof HTMLButtonElement)) return;
      const active = btn.dataset.sdlcComposeMode === mode;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    const classicOptions = document.querySelector(".sdlc-classic-loop-options");
    if (classicOptions instanceof HTMLDetailsElement) {
      classicOptions.open = mode === "classic";
    }
    const wizardLimits = document.querySelector("[data-sdlc-wizard-limits-callout]");
    const classicLimits = document.querySelector("[data-sdlc-classic-limits-callout]");
    if (wizardLimits instanceof HTMLElement) {
      wizardLimits.hidden = mode !== "wizard";
    }
    if (classicLimits instanceof HTMLElement) {
      classicLimits.hidden = mode !== "classic";
    }
    document.querySelectorAll("[data-sdlc-wizard-only]").forEach((node) => {
      if (node instanceof HTMLElement) node.hidden = mode !== "wizard";
    });
    const wizardBtn = runButtons.find(
      (btn) => btn instanceof HTMLButtonElement && btn.value === "run",
    );
    const classicBtn = runButtons.find(
      (btn) => btn instanceof HTMLButtonElement && btn.value === "run-classic",
    );
    if (wizardBtn instanceof HTMLButtonElement) {
      wizardBtn.classList.toggle("btn-primary", mode === "wizard");
      wizardBtn.classList.toggle("btn-secondary", mode !== "wizard");
    }
    if (classicBtn instanceof HTMLButtonElement) {
      classicBtn.classList.toggle("btn-primary", mode === "classic");
      classicBtn.classList.toggle("btn-secondary", mode !== "classic");
      classicBtn.hidden = mode !== "classic";
    }
    if (wizardBtn instanceof HTMLButtonElement) {
      wizardBtn.hidden = mode !== "wizard";
    }
  };
  document.querySelectorAll("[data-sdlc-compose-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!(btn instanceof HTMLButtonElement)) return;
      const mode = btn.dataset.sdlcComposeMode;
      if (mode === "wizard" || mode === "classic") setComposeMode(mode);
    });
  });
  setComposeMode("wizard");
  document.querySelectorAll("[data-sdlc-start-new-run], [data-sdlc-rerun-same]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const details = document.getElementById("prompt-optimizer-compose-details");
      if (details instanceof HTMLDetailsElement) details.open = true;
      document.getElementById("prompt-optimizer-compose")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
  const form = document.querySelector("form.sdlc-form");
  if (form instanceof HTMLFormElement) {
    form.addEventListener("submit", (event) => {
      const submitter = event.submitter;
      if (!(submitter instanceof HTMLButtonElement)) return;
      if (!submitter.hasAttribute("data-sdlc-run")) return;
      const reason = readRunBlockReason();
      if (reason !== null) {
        event.preventDefault();
        paintRunHint();
        paintWriterSummary();
        document.querySelector("[data-sdlc-submit-bar]")?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
        submitter.focus({ preventScroll: true });
      }
    });
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
      const details = document.getElementById("prompt-optimizer-compose-details");
      if (details instanceof HTMLDetailsElement) {
        details.open = document.getElementById("prompt-optimizer-run") === null;
      }
      runButtons.forEach((btn) => {
        if (!(btn instanceof HTMLButtonElement)) return;
        if (btn.value === "run-classic") {
          btn.textContent = "Classic loop (90 / 10 rounds)";
        } else {
          btn.textContent = "Run";
        }
      });
      paintReady();
    }
  });
})();
</script>`});var OM,MM=l(()=>{"use strict";C();Ye();OM=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),n=t.wizard?.templatedPrompt.trim()??"",o=n.length>0?n:r?.promptText??e.prompt;return{goal:t.goal,prompt:o,folder:t.workingDirectory===void 0?e.folder:kt(t.workingDirectory),passScore:String(t.passScore),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!k(t.status)}}});var NM,jM=l(()=>{"use strict";C();qp();NM=e=>{if(e.wizard===void 0)return k(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=Xo(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(k(e.status)){if(e.wizard.phase==="complete"){let r=ge(e.wizard),n=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),o=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${o}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var DM,HM=l(()=>{"use strict";DM=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return"Just now";let o=Math.floor(n/60);if(o<60)return`${o} min ago`;let s=Math.floor(o/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Zt,s8,i8,$M,FM=l(()=>{"use strict";jM();HM();qa();Zt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),s8=e=>e.wizard===void 0?"classic":"wizard",i8=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Zt(t)}">`,n=NM(e),o=DM(e.updatedAt),s=t!==null&&e.id===t,i=s?`${n.subtitle} \xB7 Shown above`:n.subtitle,a=o.length===0?i:`${i} \xB7 ${o}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Zt(n.badgeClass)}">${Zt(n.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Zt(e.id)}">Resume</a>`:"",f=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Zt(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${s8(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Zt(e.id)}">${Zt(Xt(e.goal))}</a><p class="muted">${Zt(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${f}</div></li>`},$M=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>i8(a,t)).join(""),n=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="classic" aria-pressed="false">Classic</button>
  </div>`,o=Math.min(e.length,20),s=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${n}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Zt(s)}</summary>${i}</details>`:i}});var gP,tm,zM,a8,l8,fP,UM,hP=l(()=>{"use strict";gP=m(require("node:fs")),tm=m(require("node:path"));Ye();zM=/^[a-z0-9-]+$/,a8=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},l8=(e,t)=>{if(!zM.test(t))return null;let r=e.replace(/^\uFEFF/,""),n=t,o="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let f=a8(p[2]??"");p[1]==="name"&&f.length>0&&(n=f),p[1]==="description"&&(o=f)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:n,description:o,promptText:i}},fP=e=>{let t=xn(e);if(!t.ok)return[];let r=tm.default.resolve(t.path,".cursor","skills"),n=[];try{n=gP.default.readdirSync(r)}catch{return[]}return n.filter(o=>zM.test(o)).flatMap(o=>{let s=tm.default.resolve(r,o,"SKILL.md");if(!s.startsWith(`${r}${tm.default.sep}`))return[];try{let i=l8(gP.default.readFileSync(s,"utf8"),o);return i===null?[]:[i]}catch{return[]}}).toSorted((o,s)=>o.fileName.localeCompare(s.fileName))},UM=(e,t)=>fP(e).find(r=>r.fileName===t)??null});var BM,rm,yP=l(()=>{"use strict";C();BM=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,2}$/.test(t)||r<1||r>30?{ok:!1,errorMessage:`Round limit must be a whole number from 1 to ${30}.`}:{ok:!0,maxRounds:r}},rm=e=>e?.trim()||String(10)});var GM,VM=l(()=>{"use strict";GM={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Pass score",practice:"The run passes at this score. 90 is the usual bar. Lower it when a useful prompt is enough.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var Ya,c8,d8,Pe,Nn=l(()=>{"use strict";VM();Ya=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),c8='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>',d8=e=>{let t=GM[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Ya(t.title)}" aria-describedby="${r}" aria-expanded="false">${c8}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Ya(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Ya(t.example)}</span></span></button>`},Pe=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Ya(r)}"`}>${Ya(e)}</span>${d8(t)}</span>`});var qM,KM=l(()=>{"use strict";C();yP();Nn();qM=e=>{let t=rm(e);return`<div class="field">${Pe("Round limit","roundLimit")}<input class="input" type="number" name="maxRounds" min="1" max="${30}" step="1" value="${t}"><span class="muted">Stops after this many scored rounds. The usual limit is 10. The run also stops when the score has not risen for 3 rounds.</span></div>`}});var u8,p8,m8,JM,YM=l(()=>{"use strict";C();Nn();u8=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p8=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=1&&t<=100?t:90},m8=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,JM=e=>{let t=p8(e),r=Math.floor(t/2),n=Math.max(r+1,t-20),o=va(t).map(i=>i.label).join(" \xB7 "),s=`--sdlc-weak:${r}%;--sdlc-close:${n}%;--sdlc-pass:${t}%`;return`<div class="field sdlc-pass"><div class="sdlc-pass-head">${Pe("Pass score","passScore","sdlc-pass-label")}<output class="sdlc-pass-value" data-sdlc-pass-value for="sdlc-pass">${t}</output></div><div class="sdlc-pass-scale" style="${s}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="sdlc-pass" class="sdlc-pass-range" type="range" name="passScore" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="sdlc-pass-label"><span class="sdlc-pass-mark" style="left:${m8(90)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${90}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${u8(o)}</p><p class="muted">The bar fades from a weak score to a pass. The mark is the usual ${90}.</p></div>`}});var XM,g8,ZM,QM,eN=l(()=>{"use strict";Nn();XM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g8=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),ZM=e=>{if(e.length===0)return`<div class="field">${Pe("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${XM(r.fileName)}">${XM(r.fileName)}</option>`).join("");return`<div class="field">${Pe("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${g8(e)}</script>`},QM=`<script>
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
</script>`});var Xa,f8,tN,rN=l(()=>{"use strict";qa();qp();Xa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),f8=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",tN=e=>{let t=e.wizard;if(t===void 0||t.gate===null)return"";let r=Xt(e.goal),n=f8(t.gate),o=Xo(e),s=o===null||o>=4?"":` (step ${o+1} of 4)`,i=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Xa(r)}</h2>
    <p class="lede">Paused at <strong>${Xa(n)}</strong>${Xa(s)} (last updated ${Xa(i)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Xa(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Za,nN,oN=l(()=>{"use strict";Nn();Za=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nN=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(o=>`<option value="${Za(o.id)}"${o.id===e.runner?" selected":""}>${Za(o.label)}</option>`).join(""),n=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Za(e.runner)}">Checking ${Za(e.writers.find(o=>o.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Pe("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${n}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Pe("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Za(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var sN,iN=l(()=>{"use strict";sN=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard</th><th>Classic loop</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td><td>Every round</td></tr><tr><td>Improver</td><td>\u2014</td><td>Rewrites after each score</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td><td>\u2014</td></tr></tbody></table>'});var Zo,aN,lN,cN,dN,uN=l(()=>{"use strict";Nn();Zo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aN=(e,t,r,n,o)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=n.map(c=>`<option value="${Zo(c.id)}"${c.id===r?" selected":""}>${Zo(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Zo(o)}</option>`;return`<div class="field">${Pe(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},lN=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let n=r.find(o=>o.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Zo(t)}">Checking ${Zo(n)}\u2026</p>`},cN=(e,t,r,n,o)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Pe(t,o)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Zo(r)}</textarea><span class="muted">${n}</span></div></details>`,dN=e=>{let t=`<div class="sdlc-writer">${aN("judge","Judge",e.judge,e.writers,"I'll score it")}${lN("judge",e.judge,e.writers)}${cN("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${aN("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${lN("improver",e.improver,e.writers)}${cN("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var y8,jn,pN,mN=l(()=>{"use strict";Ga();iP();EM();kM();vp();TM();IM();MM();FM();hP();KM();YM();eN();Nn();aP();rN();qa();oN();iN();uN();C();y8=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,jn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pN=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${jn(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${jn(e.skillNotice??"")}</div>`,n=`${PI}${wI}`,o=e.resumableWizardCycle??null,s=o===null?"":tN(o),i=Kp(e.cycle),a=e.cycle===null?"":Vp(e.cycle),c=e.cycle!==null&&Tt(e.cycle),d=OM(e),p=y8(d.goal,d.prompt,e.canRun),f=c?"Waiting for you":d.running?"Running\u2026":"Run",b=dN({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),h=nN({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),y="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Classic loop skips the wizard. Instructions are optional.",u=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",A=e.cycle!==null&&k(e.cycle.status),S=A?"":" open",g=`<div class="sdlc-compose-mode" role="group" aria-label="Run mode">
        <button type="button" class="btn btn-secondary" data-sdlc-compose-mode="wizard" aria-pressed="true">Wizard</button>
        <button type="button" class="btn btn-secondary" data-sdlc-compose-mode="classic" aria-pressed="false">Classic loop</button>
      </div>`,w=A?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':`<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>
        <a class="btn btn-secondary" href="/prompt-optimizer?example=wizard-verification">Load wizard verification example</a>`,_=A?(()=>{let T=e.cycle!==null?Xt(e.cycle.goal):Xt(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${jn(T)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></summary>`})():'<summary class="sdlc-compose-summary"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</summary>',L=`<section class="card sdlc-compose${A?" sdlc-compose-viewing-finished":""}" id="prompt-optimizer-compose">
      <div class="sdlc-form-head">
        ${g}
        ${w}
      </div>
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${S}>
        ${_}
        <div class="sdlc-compose-details-body">
      <p class="lede">${y} ${jn(e.modelNote)}</p>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${u}
        <div class="sdlc-block">
          <p class="sdlc-block-title">Prompt and goal</p>
          <div class="field">
            ${Pe("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${jn(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Pe("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${jn(d.prompt)}</textarea>
          </div>
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Folder</p>
          <div class="sdlc-folder">
          <div class="field">
            ${Pe("Folder","folder")}
            <input class="input" type="text" name="folder" value="${jn(d.folder)}" onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${ZM(fP(d.folder))}
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Judge and improver</p>
          ${b}
        </div>
        ${h}
        <div data-sdlc-wizard-only>${sN()}</div>
        <details class="sdlc-classic-loop-options">
          <summary class="sdlc-block-title">Classic loop options</summary>
          <div class="sdlc-limits">
            ${JM(d.passScore)}
            ${qM(d.maxRounds)}
          </div>
        </details>
        </fieldset>
        </div>
      </details>
        <div class="sdlc-submit-bar" data-sdlc-submit-bar>
          <p class="sdlc-writer-summary" data-sdlc-writer-summary hidden></p>
          <p class="muted sdlc-run-hint" data-sdlc-run-hint role="status"></p>
          <div class="sdlc-submit">
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: pass score ${70}, up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <p class="muted sdlc-classic-limits-callout" data-sdlc-classic-limits-callout hidden>Classic loop uses the pass score and max rounds above.</p>
          <button class="btn btn-primary" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-can-run="${p?"true":"false"}">${f}</button>
          <button class="btn btn-secondary" type="submit" name="intent" value="run-classic" formnovalidate data-sdlc-run data-sdlc-run-classic data-can-run="${p?"true":"false"}">Classic loop (90 / 10 rounds)</button>
          </div>
        </div>
      </form>
    </section>`,R=`${""}${LM}${RM}${xM}${QM}${CM}`;return`${t}${r}${L}${s}${a}${i}${n}${$M(e.history,e.cycle?.id??null)}${R}`}});var Qa,SP=l(()=>{"use strict";mN();Qa=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:pN(t)}))}});var gN,fN=l(()=>{"use strict";WM();Ja();SP();Je();Mn();gN=async(e,t,r)=>{let n=t===null?{kind:"ignored"}:vM({posted:t,storePath:e.storePath});if(n.kind==="ignored")return!1;if(n.kind==="saved"){let o=J(e.storePath,n.cycleId);return Me(e.storePath,n.cycleId),t?.get("liveFragment")==="1"&&o!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":o.id}),e.response.end(Ir(e.storePath,o)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(n.cycleId)}`}),e.response.end(),!0)}return n.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Qa(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:n.cycle.judgeModel,improver:n.cycle.improverModel,folder:"~",passScore:String(n.cycle.passScore),maxRounds:String(n.cycle.maxRounds),canRun:r.canRun,errorMessage:n.errorMessage,skillNotice:null,cycle:n.cycle,history:Rt(e.storePath),resumableWizardCycle:null}),!0)}});var hN,nm,AP=l(()=>{"use strict";hN=m(require("node:os"));C();nm=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??hN.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??90,maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var yN,SN=l(()=>{"use strict";yN=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var AN,bN,PN,wN=l(()=>{"use strict";AN="wizard-verification",bN="Produce a reusable skill template that teaches how to verify Prompt SDLC wizard steps 1\u20134 on Agent Witch Live (bundle 172+): generalize with {{variables}}, evaluate scored revisions (no score 0 continue), separate into module chunks, optimize each module with runner+judge round logs visible at step 4.",PN=`You help users test the prompt optimizer wizard on Agent Witch Live.
Explain the four steps when asked. Sometimes skip evaluate or separate.
Mention round scores at step 4 only if you remember.
Use placeholders like {{thing}} without defining them.
Do not describe install bundle self-update or production bundle version checks.`});var _N,Qo,bP,vN,WN,el=l(()=>{"use strict";C();He();Hb();wN();_N=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Qo=e=>{let t=FI(e),r=In(e).map(s=>({id:s,label:xp[s]})),n=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,o=t?.judge??"";return{note:n,canRun:!0,models:t,writers:r,judge:o,improver:t?.improver??o,runner:o}},bP=(e,t,r)=>t===x||t!==null&&e.writers.some(n=>n.id===t)?t:r,vN=(e,t,r,n=null)=>({judge:bP(e,t,e.judge),improver:bP(e,r,e.improver),runner:bP(e,n,e.runner)}),WN=e=>e===AN?{goal:bN,prompt:PN}:e===Wp?{goal:Lp,prompt:Ep}:{goal:"",prompt:""}});var om,PP=l(()=>{"use strict";C();He();yP();SN();Ye();el();om=e=>{let t=vN(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=e.posted?.get("passScore")??String(90),n=rm(e.posted?.get("maxRounds")??null),o=e.posted?.get("judgeInstructions")?.trim()??"",s=e.posted?.get("improverInstructions")?.trim()??"",i=e.posted?.get("runnerInstructions")?.trim()??"",a=e.posted?.get("runner")??null,c=(S,g)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:S,passScore:r,maxRounds:n,errorMessage:g,judge:t.judge,improver:t.improver,judgeInstructions:o,improverInstructions:s,runner:t.runner,runnerInstructions:i});if(e.posted===null)return c(e.defaultFolder??Tn,null);let d=e.posted.get("folder")??Tn;if(e.posted.get("intent")==="choose-folder"){let S=e.pickFolder();return c(S===null?d:kt(S),null)}let p=e.posted.get("intent")??"";if(p!=="run"&&p!=="run-classic")return c(d,null);let f=_N(e.goal,e.prompt);if(f!==null)return c(d,f);let b=zI(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(b===null)return c(d,"Choose a judge and an improver.");let h=xn(d);if(!h.ok)return c(d,h.errorMessage);let y=p!=="run-classic",u=y?{ok:!0,passScore:70}:yN(r);if(!u.ok)return c(d,u.errorMessage);let A=y?{ok:!0,maxRounds:5}:BM(n);if(!A.ok)return c(d,A.errorMessage);if(y){let S=UI(e.installedIds,a,b.judge);return S===null?c(d,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:h.path,passScore:u.passScore,maxRounds:A.maxRounds,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:o,improverInstructions:s,useWizard:!0,runner:S,runnerInstructions:i}}return{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:h.path,passScore:u.passScore,maxRounds:A.maxRounds,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:o,improverInstructions:s,useWizard:!1}}});var es,im,S8,wP,LN,sm,EN,A8,RN,_P,b8,P8,w8,vP,kN,CN,TN=l(()=>{"use strict";es=m(require("node:fs")),im=m(require("node:path"));He();Ye();S8=["remember","choose-folder","run","run-classic"],wP=()=>({folder:Tn,judge:"",improver:"",runner:""}),LN=e=>im.default.join(im.default.dirname(e),"prompt-optimizer-preferences.json"),sm=e=>typeof e=="string"?e:"",EN=e=>{let t=LN(e);if(!es.default.existsSync(t))return wP();try{let r=JSON.parse(es.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return wP();let n=r,o=sm(n.folder).trim();return{folder:o.length===0?Tn:o,judge:sm(n.judge),improver:sm(n.improver),runner:sm(n.runner)}}catch{return wP()}},A8=(e,t)=>{let r=LN(e);es.default.mkdirSync(im.default.dirname(e),{recursive:!0});let n=`${r}.tmp`;es.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`),es.default.renameSync(n,r)},RN=(e,t)=>e===x||In(t).some(r=>r===e),_P=(e,t,r)=>e===null?t:e.length===0?"":RN(e,r)?e:t,b8=(e,t)=>{if(e===null)return t;let r=xn(e);return r.ok?r.display:t},P8=e=>{let t=EN(e.storePath),r={folder:b8(e.folder,t.folder),judge:_P(e.judge,t.judge,e.installedIds),improver:_P(e.improver,t.improver,e.installedIds),runner:_P(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||A8(e.storePath,r)},w8=e=>{let t=xn(e);return t.ok?t.display:Tn},vP=(e,t)=>RN(e,t)?e:"",kN=e=>{let t=EN(e.storePath);return{selection:{...e.selection,judge:vP(t.judge,e.installedIds)||e.selection.judge,improver:vP(t.improver,e.installedIds)||e.selection.improver,runner:vP(t.runner,e.installedIds)||e.selection.runner},defaultFolder:w8(t.folder)}},CN=e=>{let t=e.posted.get("intent")??"";if(!S8.includes(t))return;let r=e.posted.get("folder");P8({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var xN,_8,v8,WP,W8,am,lm=l(()=>{"use strict";xN=m(require("node:os"));He();dP();za();_8="Reply with the single word ok. Do not use tools.",v8=45e3,WP=async(e,t)=>{if(t===x)return{ok:!0,message:"You will do this step."};let r=pM(e,t);if(r!==null)return{ok:!0,message:r};let n=await Xe({writerAgent:t,prompt:_8,workingDirectory:xN.default.tmpdir(),timeoutMs:v8});if(!n.ok)return{ok:!1,message:n.errorMessage};let o=`${De(t)} is ready.`;return mM(e,t,o),{ok:!0,message:o}},W8=e=>[...new Set(e.filter(t=>t.length>0))],am=async(e,t,r,n)=>{for(let o of W8([t,r,n??""])){let s=await WP(e,o);if(!s.ok)return s.message}return null}});var LP,IN=l(()=>{"use strict";LP=(e,t)=>{for(let r of e)if(!(r.wizard===void 0||r.status!=="wizard_paused")&&!(t!==null&&r.id===t))return r;return null}});var ON,MN=l(()=>{"use strict";ut();C();Ja();AP();PP();SP();Je();Ye();TN();hP();lm();IN();Mn();ON=async e=>{let t=e.posted===null?kN({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=om({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Wr("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(CN({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?kt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let n=r.kind==="start"?await am(e.route.storePath,r.judge,r.improver,r.useWizard?r.runner:void 0):null;if(r.kind==="start"&&n!==null){await Qa(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:kt(r.workingDirectory),passScore:String(r.passScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:n,skillNotice:e.skillNotice,cycle:null,history:Rt(e.route.storePath),resumableWizardCycle:LP(Rt(e.route.storePath),null)});return}if(r.kind==="start"){let s=UM(r.workingDirectory,r.sourceSkillFile),i=nm({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,...r.useWizard?{wizard:{...fb(r.prompt),runnerInstructions:r.runnerInstructions},runnerModel:r.runner}:{},...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(G(e.route.storePath,i),Me(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"&&r.useWizard){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(Ir(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let o=e.cycleId===null?null:J(e.route.storePath,e.cycleId);o!==null&&Me(e.route.storePath,o.id),await Qa(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:o,history:Rt(e.route.storePath),resumableWizardCycle:LP(Rt(e.route.storePath),o?.id??null)})}});var NN,jN=l(()=>{"use strict";Je();NN=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";TI(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var DN,HN=l(()=>{"use strict";DN=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let n=r[1].replace(/^"|"$/g,""),o=new URLSearchParams,s=t.split(`--${n}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),o.append(a[1],d)}return o}return new URLSearchParams(t)}});var $N,FN=l(()=>{"use strict";HI();wM();fN();MN();jN();el();HN();Mn();$N=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Qp(),n=Qo(r),o=e.method==="POST"?DN(e.request.headers["content-type"],await e.readBody(e.request)):null;if(PM({posted:o,storePath:e.storePath,response:e.response})||await gN(e,o,n))return;let s=WN(t.searchParams.get("example")),i=NN({posted:o,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=DI({posted:o,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await ON({route:e,posted:o,installedIds:r,selection:n,goal:o?.get("goal")??s.goal,prompt:o?.get("prompt")??s.prompt,skillNotice:jI(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var L8,zN,UN=l(()=>{"use strict";C();Je();L8=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",zN=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let n=J(e.storePath,r);if(n===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(n.wizard===void 0||!k(n.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let o=Rb({goal:n.goal,cycleStatus:n.status,wizard:n.wizard}),s=`prompt-optimizer-wizard-${L8(n.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(o),!0}});var BN,GN=l(()=>{"use strict";Ja();Je();BN=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),n=r===null?null:J(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(n===null?"":Ir(e.storePath,n)),!0}});var E8,VN,qN=l(()=>{"use strict";He();lm();E8=["claude-cli","codex","cursor","antigravity"],VN=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let n=t===x||E8.includes(t)?await WP(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(n)),!0}});var KN,JN=l(()=>{"use strict";C();KN=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Wa,page:La,context:Fo,installedWriters:e,post:{method:"POST",url:Wa,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${Wa}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var EP,YN=l(()=>{"use strict";C();Ha();EP=e=>{let t=e.revisions[e.revisions.length-1]??null,r=Ae(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null}))),n=k(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:n,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:Vo(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:Fo,page:`${La}?cycle=${encodeURIComponent(e.id)}`}}});var Ce,R8,XN,ZN,QN=l(()=>{"use strict";Ce=m(Rs());C();R8=(0,Ce.isType)({goal:Ce.isString,prompt:Ce.isString,workingDirectory:Ce.isString,judge:(0,Ce.isUndefinedOr)(Ce.isString),improver:(0,Ce.isUndefinedOr)(Ce.isString),passScore:(0,Ce.isUndefinedOr)(Ce.isNumber),maxRounds:(0,Ce.isUndefinedOr)(Ce.isNumber)}),XN=e=>{let t=e?.trim()??"";return t.length===0?null:t},ZN=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return R8(t)?t.workingDirectory.trim().length===0?{ok:!1,error:fp}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:XN(t.judge),improver:XN(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:fp}}});var k8,ej,tj=l(()=>{"use strict";C();He();PP();el();k8=e=>e.map(t=>t.id).join(", "),ej=e=>{let t=Qo(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,n=e.body.judge??r,o=e.body.improver??r;if(n===x||o===x)return{ok:!1,error:gb,installedWriters:t.writers};if(n===null||o===null){let a=k8(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run-classic",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,passScore:e.body.passScore??String(90),maxRounds:e.body.maxRounds??String(10),judge:n,improver:o}),i=om({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var rj,nj=l(()=>{"use strict";AP();JN();YN();el();QN();tj();Je();rj=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=J(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:EP(c)}}let r=await e.handlers.readInstalledIds(),n=Qo(r);if(e.method==="GET")return{status:200,body:KN(n.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let o=ZN(e.rawBody);if(!o.ok)return{status:400,body:{ok:!1,error:o.error,installedWriters:n.writers}};let s=ej({body:o.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:n.writers}};let a=nm({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds});return G(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:EP(a)}}});var oj,sj=l(()=>{"use strict";Mn();lm();nj();oj=async e=>{let t=await rj({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Qp,readWritersReady:am,startCycle:Me}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var C8,RP,ij=l(()=>{"use strict";WI();FN();UN();GN();qN();sj();C8=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},RP=async e=>{let t=C8(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await oj(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:vI()})),!0):(await VN({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||zN({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||BN({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await $N(e),!0)}});var aj=l(()=>{"use strict";ij()});var Dn,tl,T8,x8,I8,O8,lj,cj=l(()=>{"use strict";Dn=m(require("node:fs")),tl=m(require("node:path")),T8="prompt-optimizer-cycles.json",x8="prompt-optimizer-preferences.json",I8="prompt-sdlc-cycles.json",O8="prompt-sdlc-preferences.json",lj=e=>{let t=tl.default.join(e,T8),r=tl.default.join(e,I8);if(Dn.default.existsSync(t)||!Dn.default.existsSync(r))return t;try{Dn.default.renameSync(r,t)}catch{return r}let n=tl.default.join(e,O8),o=tl.default.join(e,x8);if(Dn.default.existsSync(n)&&!Dn.default.existsSync(o))try{Dn.default.renameSync(n,o)}catch{}return t}});var ts,M8,kP,dj=l(()=>{"use strict";ts=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),M8=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],kP=e=>{let t=M8.map(i=>`<option value="${ts(i.value)}">${ts(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${ts(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${ts(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${ts(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${ts(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var rl,mj,N8,gj,j8,D8,fj,dm,uj,pj,H8,$8,Qt,nl,cm,F8,um,CP,z8,TP,hj,xP,yj,U8,B8,G8,Sj,Aj,bj,ol=l(()=>{"use strict";rl=m(require("node:fs")),mj=m(require("node:path")),N8="estimate-history.ndjson",gj=100,j8=500,D8=2e4,fj=e=>mj.default.join(e,N8),dm=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,j8),uj=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,D8),pj=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,H8=e=>({...e,estimateTokens:pj(e.estimateTokens),actualTokens:pj(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),$8=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Qt=e=>{let t=fj(e);return rl.default.existsSync(t)?rl.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let n=r.trim();if(n.length===0)return[];try{let o=JSON.parse(n);return $8(o)?[H8(o)]:[]}catch{return[]}}):[]},nl=(e,t)=>{rl.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(n=>JSON.stringify(n)).join(`
`)}
`;rl.default.writeFileSync(fj(e),r,"utf8")},cm=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),F8=e=>{let t=e.filter(n=>n.actualSeconds!==null&&n.estimateSeconds!==null&&n.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(n=>`| ${cm(n.task)} | ${cm(n.writerLabel)} | ${n.estimateSeconds} | ${n.actualSeconds} |`)].join(`
`)},um=e=>{let t=Qt(e.reportsDir),r=dm(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:n?.actualSeconds??null,estimateTokens:n?.estimateTokens??null,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);nl(e.reportsDir,[...s,o])},CP=e=>{let t=Qt(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),n=new Date().toISOString(),o=e.task!==void 0?dm(e.task):"",s={id:e.agentRunId,task:o.length>0?o:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:n,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);nl(e.reportsDir,[...i,s])},z8=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-gj),TP=e=>[...Qt(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),hj=e=>{let t=Qt(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),n=uj(e.input),o=uj(e.output),s=dm(n),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:n.length>0?n:r?.input??"",output:o.length>0?o:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);nl(e.reportsDir,[...c,a])},xP=(e,t)=>{let r=Qt(e).find(n=>n.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},yj=e=>({table:F8(z8(Qt(e))),embedding:null}),U8=e=>{let t=new Map;for(let n of e){if(n.actualTokens===null)continue;let o=n.writerLabel.trim()||"Writer",s=t.get(o)??[];s.push(n.actualTokens),t.set(o,s)}let r=new Set;for(let[n,o]of t){let s=[...o].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${n}:${i}`)}return e.filter(n=>{let o=n.writerLabel.trim()||"Writer";return!r.has(`${o}:${n.actualTokens}`)})},B8=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-gj),G8=e=>{let t=U8(B8(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let n=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",n.join(". ")+(n.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${cm(s.task)} | ${cm(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},Sj=e=>{let t=Qt(e.reportsDir),r=dm(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:n?.writerLabel??"",estimateSeconds:n?.estimateSeconds??null,actualSeconds:n?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);nl(e.reportsDir,[...s,o])},Aj=e=>{let t=Qt(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),n=new Date().toISOString(),o={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:r?.completedAt??n,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);nl(e.reportsDir,[...s,o])},bj=e=>G8(Qt(e))});var Pj=l(()=>{"use strict";ol()});var er,IP,V8,OP,q8,K8,pm,mm,J8,MP,wj=l(()=>{"use strict";Pj();er=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IP=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let n=Math.floor(t/60),o=t%60;return o===0?`${n} hr`:`${n} hr ${o} min`},V8=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${IP(-r)} under`:`${IP(r)} over`},OP=e=>e.toLocaleString("en-US"),q8=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${OP(-r)} under`:`${OP(r)} over`},K8=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},pm=e=>e===null?"\u2014":IP(e),mm=e=>e===null?"\u2014":OP(e),J8=`(function () {
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
})();`,MP=e=>{let r=TP(e.reportsDir).map((o,s)=>{let i=o.input.trim().length>0?o.input:o.task,a=o.output.trim().length>0?o.output:"\u2014",c=o.writerLabel.trim().length>0?o.writerLabel:"Writer",d=o.estimateSeconds===null||o.actualSeconds===null?"no estimate":V8(o.estimateSeconds,o.actualSeconds),p=o.estimateTokens===null||o.actualTokens===null?"no estimate":q8(o.estimateTokens,o.actualTokens),f=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${f}">
        <td><button type="button" class="history-open">${er(K8(i))}</button></td>
        <td>${er(c)}</td>
        <td>${pm(o.estimateSeconds)}</td>
        <td>${pm(o.actualSeconds)}</td>
        <td>${er(d)}</td>
        <td>${mm(o.estimateTokens)}</td>
        <td>${mm(o.actualTokens)}</td>
        <td>${er(p)}</td>
      </tr>`,template:`<template id="${f}">
        <p class="eyebrow">${er(c)}</p>
        <h2>Input</h2>
        <pre>${er(i)}</pre>
        <h2>Output</h2>
        <pre>${er(a)}</pre>
        <p>Time: estimated ${pm(o.estimateSeconds)} \xB7 actual ${pm(o.actualSeconds)} \xB7 ${er(d)}</p>
        <p>Tokens: estimated ${mm(o.estimateTokens)} \xB7 actual ${mm(o.actualTokens)} \xB7 ${er(p)}</p>
      </template>`}});return`<section class="card">
      <p class="eyebrow">This Mac</p>
      <h1>History</h1>
      <p class="lede">Every prompt on this Mac. Select a row to read the input, output, and estimate.</p>
      ${r.length===0?'<p class="empty">No prompt history yet.</p>':`<div class="table-wrap history-table-wrap"><table id="history-table">
          <thead><tr><th>Prompt</th><th>Writer</th><th>Estimated</th><th>Actual</th><th>Comparison</th><th>Estimated tokens</th><th>Actual tokens</th><th>Token comparison</th></tr></thead>
          <tbody>${r.map(o=>o.row).join("")}</tbody>
        </table></div>
        ${r.map(o=>o.template).join("")}
        <dialog id="history-detail" class="history-dialog" aria-label="Prompt detail">
          <div class="history-dialog-bar">
            <button type="button" class="btn btn-secondary btn-compact" id="history-detail-close">Close</button>
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${J8}</script>`}
    </section>`}});var _j=l(()=>{"use strict";dj();wj()});var rs,Y8,X8,NP,vj=l(()=>{"use strict";rs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y8=(e,t,r)=>{let n=rs(t),o=rs(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${n}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${o}</pre>
</article>`},X8=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${rs(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((n,o)=>Y8(o,n.userPrompt,n.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${rs(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${rs(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${rs(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},NP=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(X8).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var Wj=l(()=>{"use strict";vj()});var sl,Lj,Ej,jP,DP,HP,Rj=l(()=>{"use strict";sl=m(require("node:fs")),Lj=m(require("node:path"));da();tp();Ej=(e,t,r)=>jo({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,jP=(e,t,r)=>{let n=Ej(e,t,r);if(n===null)return[];if(!sl.default.existsSync(n))return[];let o=sl.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},DP=e=>{let t=Ej(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Yt(e.entry.prompt),output:Yt(e.entry.output)};sl.default.mkdirSync(Lj.default.dirname(t),{recursive:!0}),sl.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},HP=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var Z8,Q8,il,gm,$P=l(()=>{"use strict";Z8=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Q8=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,il=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let n=[],o=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=Z8(i.assistantOutput),d=c.length>0?`Assistant: ${Q8(c,t)}`:null,p=[a,d].filter(f=>f!==null).join(`

`);if(p.length!==0){if(o+p.length>r&&n.length>0)break;n.unshift(p),o+=p.length}}return n.join(`

`)},gm=e=>{let t=e.userMessage.trim(),r=il({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Ot,al,UP,e3,t3,FP,r3,BP,fm,kj,Cj,n3,ns,GP,zP,Tj,o3,xj,os,hm,ll,s3,cl,VP,ym,Sm,Ij=l(()=>{"use strict";Ot=m(require("node:fs")),al=m(require("node:path")),UP=require("node:crypto");$P();e3="writer-sessions",t3="active-index.json",FP=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),r3=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",BP=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},fm=e=>{let t=al.default.join(e.installDir,e3);return Ot.default.mkdirSync(t,{recursive:!0}),t},kj=e=>al.default.join(fm(e),t3),Cj=(e,t)=>al.default.join(fm(e),`${t}.canonical.json`),n3=(e,t)=>al.default.join(fm(e),`${t}.continuation.json`),ns=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,GP=e=>{let t=kj(e);if(!Ot.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Ot.default.readFileSync(t,"utf8"));if(!FP(r)||!Array.isArray(r.entries))return{entries:[]};let n=[];for(let o of r.entries){if(!FP(o)||typeof o.sessionId!="string")continue;let s=typeof o.writerAgent=="string"?o.writerAgent:"";if(!r3(s))continue;let i=typeof o.projectFolderPath=="string"?o.projectFolderPath:(o.projectFolderPath===null,null);n.push({writerAgent:s,projectFolderPath:i,sessionId:o.sessionId})}return{entries:n}}catch{return{entries:[]}}},zP=(e,t)=>{Ot.default.writeFileSync(kj(e),JSON.stringify(t,null,2))},Tj=(e,t)=>{Ot.default.writeFileSync(Cj(e,t.sessionId),JSON.stringify(t,null,2))},o3=(e,t)=>{Ot.default.writeFileSync(n3(e,t.sessionId),JSON.stringify(t,null,2))},xj=(e,t)=>{let r=il({turns:t.turns});o3(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},os=(e,t)=>{let r=Cj(e,t);if(!Ot.default.existsSync(r))return null;try{let n=JSON.parse(Ot.default.readFileSync(r,"utf8"));return!FP(n)||typeof n.sessionId!="string"?null:n}catch{return null}},hm=(e,t=20)=>{let r=fm(e),n=Ot.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),o=[];for(let s of n){let i=s.name.replace(/\.canonical\.json$/,""),a=os(e,i);a!==null&&o.push(a)}return o.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},ll=(e,t,r)=>{let n=BP(r);return GP(e).entries.find(i=>ns(i)===ns({writerAgent:t,projectFolderPath:n}))?.sessionId??null},s3=(e,t,r,n)=>{let o=GP(e),s=ns({writerAgent:t,projectFolderPath:r}),i=[...o.entries.filter(a=>ns(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:n}];zP(e,{entries:i})},cl=(e,t,r)=>{let n=(0,UP.randomUUID)(),o=new Date().toISOString(),s=BP(r),i={sessionId:n,writerAgent:t,projectFolderPath:s,turns:[],createdAt:o,updatedAt:o};return Tj(e,i),xj(e,i),s3(e,t,s,n),n},VP=(e,t,r)=>{let n=ll(e,t,r);return n!==null?n:cl(e,t,r)},ym=(e,t,r)=>{let n=BP(r),o=GP(e);if(n===null&&r===void 0){zP(e,{entries:o.entries.filter(i=>i.writerAgent!==t)});return}let s=ns({writerAgent:t,projectFolderPath:n});zP(e,{entries:o.entries.filter(i=>ns(i)!==s)})},Sm=e=>{let t=VP(e.layout,e.writerAgent,e.projectFolderPath),r=os(e.layout,t);if(r===null)return;let n={id:(0,UP.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},o={...r,turns:[...r.turns,n],updatedAt:n.createdAt};Tj(e.layout,o),xj(e.layout,o)}});var i3,a3,Am,qP,Oj=l(()=>{"use strict";i3=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",a3=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},Am=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",qP=e=>{let t=Am(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",n=i3(r,e.userPromptCharacterCount),o=a3({contextBudget:n,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:n,...o}}});var bm=l(()=>{"use strict";Rj();Ij();$P();Oj()});var Mj=l(()=>{"use strict";hh()});var $e,c3,d3,KP,JP,YP,Nj=l(()=>{"use strict";ae();Mj();$e=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),c3=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},d3=(e,t,r)=>{let n=e[t]?.apiKey;if(n!==void 0&&n.length>0){let o=Nd(n);return`value="${$e(o)}" placeholder="Paste a new key to replace"`}return`placeholder="${$e(r)}"`},KP=(e,t,r,n,o)=>{let s=Bh[t];return`<label class="field">
          <span class="field-label">${$e(n)} API key \u2014 ${$e(c3(e,t))} \xB7 <a class="field-link" href="${$e(s.href)}" target="_blank" rel="noopener noreferrer">${$e(s.label)}</a></span>
          <input class="input mono" type="password" name="${$e(r)}" autocomplete="off" ${d3(e,t,o)} />
        </label>`},JP=(e,t,r,n)=>{let o=yh(e[t]?.model),s=new Set(Rd[t].map(c=>c.value)),i=Rd[t].map(c=>{let d=c.value===o?" selected":"";return`<option value="${$e(c.value)}"${d}>${$e(c.label)}</option>`}).join(""),a=o!==an&&!s.has(o)?`<option value="${$e(o)}" selected>${$e(o)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${$e(n)}</span>
          <select class="input mono" name="${$e(r)}">${i}${a}</select>
        </label>`},YP=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${$e(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",n=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
      <p class="eyebrow">Writer</p>
      <h1>API keys (optional)</h1>
      <p class="lede">Run Claude, Codex, or Antigravity tasks with provider HTTP APIs instead of installing their CLIs on this Mac. Keys stay in <span class="mono">writer-api-secrets.json</span> on this machine only.</p>
      <form class="task-form" method="POST" action="/writer-api">
        <fieldset class="field">
          <span class="field-label">Execution</span>
          <label><input type="radio" name="writerExecutionBackend" value="cli"${r} /> Local CLI (default)</label>
          <label><input type="radio" name="writerExecutionBackend" value="api"${n} /> API key + Agent Witch script</label>
        </fieldset>
        <p class="muted">Maps: Claude \u2192 Anthropic, Codex \u2192 OpenAI, Antigravity \u2192 Google Gemini. Cursor still requires CLI or Cursor Cloud on the website.</p>
        ${KP(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${JP(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${KP(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${JP(e.secrets,"openai","openaiModel","OpenAI model")}
        ${KP(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${JP(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var jj=l(()=>{"use strict";Nj()});var Pm,Dj,Hj=l(()=>{"use strict";Pm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dj=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${Pm(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Console \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let n=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${Pm(s.name)}</strong> <span class="muted mono">(${Pm(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),o=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Pm(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${o}
      <ul class="harness-installed-set-list">${n}</ul>
    </section>`}});var u3,$j,Fj,zj=l(()=>{"use strict";u3=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,$j=e=>e.kind==="folder",Fj=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let d=s.children.get(a);if(d!==void 0&&$j(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=n=>{let o=[];for(let s of n.children.values()){if($j(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(u3)};return r(t)}});var Uj,XP,Bj=l(()=>{"use strict";Uj=m(require("node:path")),XP=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${XP(r.children,t)}</ul>
            </details>
          </li>`;let n=Uj.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
          <button
            type="button"
            class="harness-tree-preview"
            data-source-path="${t(r.item.sourcePath)}"
            title="${t(r.item.relativePath)}"
          >
            <span class="harness-tree-file-name">${t(n)}</span>
            <span class="muted harness-tree-file-kind">${t(r.item.kind)}</span>
          </button>
          <pre class="harness-tree-preview-body" hidden></pre>
        </li>`}).join("")});var Gj,Or,p3,m3,dl,g3,ZP,Vj=l(()=>{"use strict";ip();Gj=m(require("node:path"));Hj();zj();Bj();Or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p3=()=>`(() => {
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

})();`,m3=()=>`(() => {
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
})();`,dl=e=>{let t=fa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=Dj({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),n=e.flashError?`<div class="alert-error">${Or(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Or(e.flashMessage)}</div>`:"",o=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':g3(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Or(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Or(s)}" />
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
    ${o}
    <script>${p3()}</script>
    <script>${m3()}</script>`;return`${t}${r}${n}${c}${d}`},g3=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let d=Fj(a.items.map(b=>({...b,relativePath:typeof b.relativePath=="string"&&b.relativePath.length>0?b.relativePath:Gj.default.relative(a.sourceRoot,b.sourcePath).replaceAll("\\","/")}))),p=XP(d,Or),f=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Or(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Or(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${f} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Or(n)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},ZP=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&o.set(d,p)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?o.get(d):void 0,f=e.get(`setName-${i}`)?.trim()??p??a,b=t.sets[i];if(b===void 0)continue;let h=a.length>0?a:b.proposedSlug,y=f.length>0?f:b.proposedName,u=r.has(i),A=b.items.map(S=>({id:S.id,kind:S.kind,title:S.title,sourcePath:S.sourcePath,include:u}));s.push({slug:h,name:y,items:A})}return s}});var qj=l(()=>{"use strict";Vj()});var f3,QP,Kj=l(()=>{"use strict";vr();f3=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[je]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null||n.ok!==!0)return null;let o=n;return{counts:{harness:Number(o.counts?.harness??0),workflow:Number(o.counts?.workflow??0),agent:Number(o.counts?.agent??0)},items:Array.isArray(o.items)?o.items:[]}}catch{return null}},QP=f3});var h3,Jj,Yj=l(()=>{"use strict";vr();h3=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[je]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let n=await r.json();return typeof n!="object"||n===null||n.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof n.promotedCount=="number"?n.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},Jj=h3});var Xj=l(()=>{"use strict"});var ul,y3,ew,Zj=l(()=>{"use strict";ip();ul=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),y3=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,ew=e=>{let t=e.flashError?`<div class="alert-error">${ul(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ul(e.flashMessage)}</div>`:"",r=fa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),n=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(o=>{let s=e.compositionCountsByProjectId?.[o.id],i=s!==void 0?`<span class="muted">${ul(y3(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(o.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(o.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(o.id)}">
                  <strong>${ul(o.name)}</strong>
                  <span class="muted mono">${ul(o.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${n}
    </section>`}});var Qj=l(()=>{"use strict";Xj();Xy();Zj()});var wm,eD=l(()=>{"use strict";wm=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var tD,tr,tw=l(()=>{"use strict";tD=m(require("node:path"));Bt();bt();B();ae();Ve();tr=e=>{let t=$()?.layout.installDir??E();if(tD.default.basename(t)===Gr)return zt;let r=$(),n=r!==null?Ee(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):zt}});var rw,rD=l(()=>{"use strict";Ve();tw();rw=async e=>{let t=Le(e.installDir),r=t?.bundleVersion??null,n=tr(t);try{let o=await uo(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:en(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var nw,nD=l(()=>{"use strict";nw=e=>!e});var ow,ss,sw=l(()=>{"use strict";B();ow=()=>`http://127.0.0.1:${hf()}/update/run`,ss=async e=>{try{let t=await fetch(ow(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var S3,oD,iw,sD=l(()=>{"use strict";B();te();sw();S3=()=>{$t({launchAgentLabel:re(),installDir:E()})},oD=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},iw=async()=>{S3();let e=await ss({force:!0});if(e.ok)return{ok:!0,message:oD(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:oD(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ve(),cE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var aw=l(()=>{"use strict";FA();eD();tw();rD();nD();sD();sw()});var iD,aD=l(()=>{"use strict";iD=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var lD,cD,lw,cw,dD=l(()=>{"use strict";lD=require("node:crypto"),cD=m(require("node:fs"));ut();ae();ae();aD();lw=!1,cw=async e=>{if(lw)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!iD(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&cD.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,lD.randomUUID)();lw=!0;try{if(await zy(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await So({...r,workspace:o},e.writerAgent,t);return await Ni(n,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{lw=!1}}});var uD=l(()=>{"use strict";dD()});var Ze,A3,pD,mD,dw,uw,pw,mw,gw,fw,hw=l(()=>{"use strict";Ze=require("node:crypto"),A3=Buffer.from("302a300506032b6570032100","hex"),pD=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},mD=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Ze.createPublicKey)({key:Buffer.concat([A3,t]),format:"der",type:"spki"})},dw=()=>{let{publicKey:e,privateKey:t}=(0,Ze.generateKeyPairSync)("ed25519");return{publicKeyRaw:pD(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},uw=e=>(0,Ze.createPrivateKey)(e),pw=(e,t)=>(0,Ze.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),mw=(e,t,r)=>{try{let n=mD(e);return(0,Ze.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},gw=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,fw=()=>(0,Ze.randomBytes)(32).toString("base64url")});var rr,_m,gD,b3,P3,vm,yw,Sw,fD=l(()=>{"use strict";rr=m(require("node:fs")),_m=m(require("node:path"));hw();B();bt();gD=e=>_m.default.join(e.installDir,pr),b3=(e,t)=>{if(e.profileEmail===null||t===gD(e)||rr.default.existsSync(t))return;let r=gD(e);rr.default.existsSync(r)&&(rr.default.mkdirSync(_m.default.dirname(t),{recursive:!0}),rr.default.renameSync(r,t))},P3=e=>{if(!rr.default.existsSync(e))return null;try{let t=rr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},vm=e=>{let t=rd(e);b3(e,t);let r=P3(t);if(r!==null)return r;let n=dw();return rr.default.mkdirSync(_m.default.dirname(t),{recursive:!0}),rr.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},yw=e=>{let t=vm(e.layout),r=fw(),n=gw({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=uw(t.privateKeyPem),s=pw(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Sw=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return mw(e.serverPublicKey,t,e.serverAttestation)}});var Aw=l(()=>{"use strict";fD();hw()});var AD,pl,ww,_w,hD,w3,bw,Wm,oe,bD,_3,Pw,v3,W3,vw,de,we,nr,L3,yD,SD,ml,gl,PD=l(()=>{"use strict";AD=m(require("node:http")),pl=m(require("node:fs")),ww=m(require("node:path"));Lm();aa();cx();ux();yx();Ro();gA();DA();Kx();Yx();aj();cj();_j();Wj();bm();jj();qj();mn();ut();vr();Kj();Yj();Qj();aw();Ve();uD();ae();Aw();_w=e=>rA(e)??"never",hD=48e3,w3=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,bw=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??du(),reveal:t.reveal,installed:_r(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Wm=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:vo(t,e)},oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bD=200,_3=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Pw=e=>{let t=e.trim().slice(0,bD),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},v3=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${oe(t)}</div>`,W3=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${oe(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',vw={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},de=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...vw}),e.end(JSON.stringify(r))},we=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},nr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},L3=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=_3(e.healthBadge),n=e.status.wakeError?`<div class="alert-error">${oe(e.status.wakeError)}</div>`:"",o=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=nw(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for Agent Witch on this Mac.</p>
      ${o}
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${la(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${oe(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${oe(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${oe(_w(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${oe(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${s}
    </section>`},yD=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},SD=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,bD)},ml=e=>{let t=ww.default.join(e.layout.installDir,"link-code.txt"),r=()=>Le(e.layout.installDir),n=()=>{let h=r();return{installBundleVersion:wm(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},o=async h=>{let y=h.installVersion??r(),u=await i(),A=GA(u),S=h.updateFlash??null,g=VA(S),w=v3(S,h.updateError??null);return UA({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:tr(y),installBundleVersionLabel:wm(y),prependBody:`${g}${w}${A}`,headerUpdateButtonHtml:BA(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await rw(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:Pw("An update is already running.")}),h.end();return}c=!0;try{let u=await iw(),A=u.ok?"/?update=ok":Pw(u.message);h.writeHead(303,{Location:A}),h.end()}catch(u){let A=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:Pw(A)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=n(),S=await o({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${oe(y)}</h1>
      <p>${oe(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(S)},f=()=>{if(pl.default.existsSync(t))return pl.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return pl.default.writeFileSync(t,h,"utf8"),h},b=AD.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",A=h.method??"GET";if(A==="OPTIONS"){y.writeHead(204,vw),y.end();return}if(!await RP({method:A,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:lj(ww.default.dirname(e.layout.configPath)),readBody:nr,sendHtml:we,renderShell:o})){if(A==="GET"&&u==="/health"){let S=e.controllers.getStatus(),g=n();de(y,200,{ok:!0,...S,installBundleVersion:g.installBundleVersion,installBundleUpdatedAt:g.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/status"){let S=n();de(y,200,{...e.controllers.getStatus(),linkCode:f(),installBundleVersion:S.installBundleVersion,installBundleUpdatedAt:S.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/traffic"){de(y,200,{entries:sa(e.layout)});return}if(A==="DELETE"&&u==="/api/traffic"||A==="POST"&&u==="/api/traffic/clear"){if(sA(e.layout),A==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}de(y,200,{ok:!0});return}if(A==="GET"&&u==="/api/trace"){de(y,200,{entries:Xu(e.layout)});return}if(A==="DELETE"&&u==="/api/trace"||A==="POST"&&u==="/api/trace/clear"){if(lA(e.layout),A==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}de(y,200,{ok:!0});return}if(A==="POST"&&u==="/api/errors/clear"){cA(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(A==="GET"&&u==="/api/knowledge"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(g.length>0){let w=await Ho({layout:e.layout,query:g,limit:20});de(y,200,{chunks:w,query:g});return}de(y,200,{chunks:Do(e.layout).slice(-50).reverse()});return}if(A==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(A==="GET"&&u==="/api/update-status"){let S=await i();de(y,200,{ok:!0,...S});return}if((A==="GET"||A==="POST")&&u==="/api/update"){await d(y);return}if(A==="GET"&&u==="/"){let S=e.controllers.getStatus(),g=n(),w=_r(e.layout),_=Zu(e.layout.errorLogPath);we(y,await o({title:"Home",activePath:"/",installVersion:g.installVersion,updateFlash:yD(h.url??void 0),updateError:SD(h.url??void 0),body:qA({wsConnected:S.wsConnected,lastHeartbeatAt:S.lastHeartbeatAt,installBundleVersion:g.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:Do(e.layout).length,trafficEntryCount:sa(e.layout).length,wakeError:S.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(A==="GET"&&u==="/task"){let S=e.controllers.getStatus(),g=n(),w=$(),_=new URL(h.url??"/",`http://127.0.0.1:${43347}`),v=_.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=_.searchParams.get("failed")==="1"?_.searchParams.get("error")?.trim()??"Task failed.":null,R=_.searchParams.get("runId");we(y,await o({title:"Task",activePath:"/task",installVersion:g.installVersion,body:kP({defaultWorkspace:w?.workspace??"",wsConnected:S.wsConnected,flashMessage:v,flashError:L,lastRunId:R})}));return}if(A==="POST"&&u==="/task/dispatch"){let S=await nr(h),g=new URLSearchParams(S),w=g.get("prompt")?.trim()??"",_=g.get("writerAgent")?.trim()??"claude-cli",v=g.get("projectFolder")?.trim()??"",L=await cw({prompt:w,writerAgent:_,...v.length>0?{projectFolderPath:v}:{}}),R=new URLSearchParams;L.ok?R.set("ok","1"):(R.set("failed","1"),L.errorMessage!==void 0&&R.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&R.set("runId",L.agentRunId),y.writeHead(303,{Location:`/task?${R.toString()}`}),y.end();return}if(A==="GET"&&u==="/writer-sessions"){let S=n(),g=hm(e.layout,12);we(y,await o({title:"Writer sessions",activePath:"/writer-sessions",installVersion:S.installVersion,updateFlash:yD(h.url??void 0),updateError:SD(h.url??void 0),body:NP({sessions:g})}));return}if(A==="GET"&&u==="/errors"){let S=n(),g=Zu(e.layout.errorLogPath);we(y,await o({title:"Errors",activePath:"/errors",installVersion:S.installVersion,body:uA({errorLogPath:e.layout.errorLogPath,content:g.content,exists:g.exists,truncated:g.truncated,byteSize:g.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&u==="/status"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=e.controllers.getStatus(),w=ye(e.layout),_=w!==null?Ie(w,12e4):fA(g.lastHeartbeatAt,12e4),v=hA({lastHeartbeatAt:g.lastHeartbeatAt,heartbeatIsStale:_}),L=n();we(y,await o({title:"Status",activePath:"/status",installVersion:L.installVersion,body:`${L3({status:g,healthBadge:v,revived:S.searchParams.get("revived")==="1",linkCode:f(),installBundleVersion:L.installBundleVersion,installBundleUpdatedAt:L.installBundleUpdatedAt})}${AA({installDir:e.layout.installDir})}${SA({entries:Xu(e.layout)})}`}));return}if(A==="GET"&&u==="/traffic"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=sa(e.layout),w=n(),_=g.map(R=>`<tr><td title="${oe(R.at)}">${oe(_w(R.at))}</td><td>${oe(R.direction)}</td><td><code>${oe(R.type)}</code></td><td>${oe(R.summary)}</td><td>${oe(R.action??"")}</td></tr>`).join(""),v=g.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${_}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',L=S.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";we(y,await o({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${L}
              ${v}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&u==="/projects"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=n(),w=tr(g.installVersion),_=await Wm(e.layout),v=S.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,L=$(),R=L===null?null:Z({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),T=R===null?{}:Object.fromEntries((await Promise.all(_.projects.map(async I=>{let D=await QP(R,I.id);return[I.id,D?.counts??null]}))).filter(I=>I[1]!==null));we(y,await o({title:"Projects",activePath:"/projects",installVersion:g.installVersion,body:ew({projects:_.projects,compositionCountsByProjectId:T,cloudAppOrigin:w,syncMessage:_.message,syncOk:_.ok,flashMessage:null,flashError:v})}));return}if(A==="GET"&&u==="/projects/select-folder"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=$(),_=w===null?null:Z({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),v=g.length>0&&_!==null?Wr():null;if(v===null||_===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Be({projectFolderPath:v}),!await $i(_,g,v)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(g)}&folderUpdated=1`}),y.end();return}if(A==="GET"&&u==="/project"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=S.searchParams.get("id")?.trim()??"",w=n(),_=await Wm(e.layout),v=yn(_.projects,g);if(v===null){await p(y,"Project not found");return}let L=S.searchParams.get("linked")==="1"?S.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${S.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${S.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:S.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,R=S.searchParams.get("knowledgePromoted"),T=R!==null?`Marked ${R} lesson(s) as promoted in Agent Witch.`:null,I=S.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,D=S.searchParams.get("tab")?.trim()??"harness",le=D==="workflows"||D==="agents"||D==="knowledge"?D:"harness",V=$(),q=V===null?null:Z({wsUrl:V.wsUrl,pairingToken:V.pairingToken}),Hr=q===null?null:await QP(q,v.id),H=0;if(q!==null)try{let _e=await fetch(`${q.appOrigin}/api/agent-witch/projects/${encodeURIComponent(v.id)}/knowledge`,{method:"GET",headers:{[je]:q.pairingToken},signal:AbortSignal.timeout(1e4)});if(_e.ok){let yt=await _e.json();typeof yt=="object"&&yt!==null&&typeof yt.candidateCount=="number"&&(H=yt.candidateCount)}}catch{H=0}we(y,await o({title:v.name,activePath:"/projects",installVersion:w.installVersion,body:Wo({project:v,installed:_r(e.layout),linkedSetSlugs:Pr(v.projectFolderPath),composition:Hr,knowledgeCandidateCount:H,activeTab:le,flashMessage:L??T,flashError:I})}));return}if(A==="POST"&&u==="/projects/pull-bound-harness"){let S=await nr(h),g=await Zy({rawBody:S,layout:e.layout});if(g.kind==="not_found"){await p(y,"Project not found");return}if(g.kind==="redirect"){y.writeHead(303,{Location:g.location}),y.end();return}let w=n();we(y,await o({title:g.title,activePath:"/projects",installVersion:w.installVersion,body:g.body}));return}if(A==="POST"&&u==="/projects/link-harness"){let S=await nr(h),g=new URLSearchParams(S),w=g.get("projectId")?.trim()??"",_=await Wm(e.layout),v=yn(_.projects,w);if(v===null){await p(y,"Project not found");return}let L=g.getAll("applySet").map(V=>String(V)),R=Ei({layout:e.layout,projectFolderPath:v.projectFolderPath,setSlugs:L});if(!R.ok){let V=n();we(y,await o({title:v.name,activePath:"/projects",installVersion:V.installVersion,body:Wo({project:v,installed:_r(e.layout),linkedSetSlugs:Pr(v.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:R.errorMessage})}));return}let T=$(),I=T===null?null:Z({wsUrl:T.wsUrl,pairingToken:T.pairingToken}),D=I===null?!1:await Di(I,v.id,R.appliedSetSlugs),le=new URLSearchParams({linked:"1",files:String(R.writtenFileCount),bindingsSynced:D?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${le.toString()}`}),y.end();return}if(A==="POST"&&u==="/project/knowledge/promote-all"){let S=await nr(h),w=new URLSearchParams(S).get("projectId")?.trim()??"",_=await Wm(e.layout),v=yn(_.projects,w);if(v===null){await p(y,"Project not found");return}let L=$(),R=L===null?null:Z({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),T=R===null?{ok:!1,promotedCount:0}:await Jj(R,v.id),I=new URLSearchParams({tab:"knowledge",...T.ok?{knowledgePromoted:String(T.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${I.toString()}`}),y.end();return}if(A==="GET"&&u==="/harness"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=n(),w=Ti(e.layout),_=S.searchParams.get("submitted")==="1",v=_?S.searchParams.get("syncFailed")==="1"?`Local harness updated (${S.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:S.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${S.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":S.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:S.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,L=w?.scanRoots[0]??du(),R=w3(e.layout,{reveal:w,importQuery:S.searchParams.get("import")==="1",justSubmitted:_}),T=tr(g.installVersion);we(y,await o({title:"Harness",activePath:"/harness",installVersion:g.installVersion,body:dl(bw(e.layout,{cloudAppOrigin:T,reveal:w,scanFolder:L,flashMessage:v,importSectionExpanded:R}))}));return}if(A==="POST"&&u==="/api/harness/pick-folder"){let S=Wr();if(S===null){de(y,200,{cancelled:!0});return}de(y,200,{path:S});return}if(A==="GET"&&u==="/api/harness/file-content"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=Li(g);if(w===null){de(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=pl.default.readFileSync(w,"utf8"),v=_.length>hD?`${_.slice(0,hD)}
\u2026 (truncated)`:_;de(y,200,{content:v})}catch{de(y,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&u==="/api/harness/reveal/add-project"){let S=await nr(h),g="";try{let v=JSON.parse(S);typeof v=="object"&&v!==null&&typeof v.projectPath=="string"&&(g=v.projectPath.trim())}catch{de(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(g.length===0){de(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=Ti(e.layout),_=xy({reveal:w,projectPath:g});if(_===null||_.sets.length===0){de(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}gu(e.layout,_),de(y,200,{ok:!0,setCount:_.sets.length});return}if(A==="GET"&&u==="/api/harness/reveal/stream"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(g.length===0){de(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...vw});let _=Iy({scanRoot:g,response:y,shouldAbort:()=>w});gu(e.layout,_),y.end();return}if(A==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&u==="/harness/submit"){let S=Ti(e.layout);if(S===null){let T=n(),I=tr(T.installVersion);we(y,await o({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:dl(bw(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let g=await nr(h),w=new URLSearchParams(g),_=ZP(w,S),v=My({layout:e.layout,sets:_});if(!v.ok){let T=n(),I=tr(T.installVersion);we(y,await o({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:dl(bw(e.layout,{cloudAppOrigin:I,reveal:S,flashError:v.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}jy(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${v.writtenItemCount??0}${R}`}),y.end();return}if(A==="GET"&&u==="/writer-api"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=$()?.writerExecutionBackend??Re(void 0),_=he(e.layout.configPath),v=yr(_),L=S.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=n();we(y,await o({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:YP({writerExecutionBackend:w,secrets:v,flashMessage:L})}));return}if(A==="POST"&&u==="/writer-api"){let S=await nr(h),g=new URLSearchParams(S),w=g.get("writerExecutionBackend")?.trim()??"cli";Uh({configPath:e.layout.configPath,writerExecutionBackend:Re(w),anthropicApiKey:g.get("anthropicApiKey")??void 0,anthropicModel:g.get("anthropicModel")??void 0,openaiApiKey:g.get("openaiApiKey")??void 0,openaiModel:g.get("openaiModel")??void 0,googleApiKey:g.get("googleApiKey")??void 0,googleModel:g.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(A==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(A==="GET"&&u==="/history"){let S=n();we(y,await o({title:"History",activePath:"/history",installVersion:S.installVersion,body:MP({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&u==="/knowledge"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=n(),_=LA({layout:e.layout}),v=kA(_),L=g.length>0?await Ho({layout:e.layout,query:g,limit:20}):Do(e.layout).slice(-50).reverse(),R=L.map(I=>{let D=RA(_,I.id),le=D>0?` \xB7 used in ${D} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${oe(I.createdAt)}">${oe(_w(I.createdAt))}${I.source?` \xB7 ${oe(I.source)}`:""}${le}</div><pre>${oe(I.text)}</pre></article>`}).join(""),T=v.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${v.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${oe(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";we(y,await o({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${oe(g)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${T}${R}${W3(g,L.length)}`}));return}A==="POST"&&await nr(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return b.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),b.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Ut}`)}),b},gl=e=>vm(e).publicKeyRaw});var Lm=l(()=>{"use strict";qT();KT();PD()});var _D={};St(_D,{runAgentWitchExternalLiveCli:()=>R3});var Ww,wD,E3,R3,vD=l(()=>{"use strict";Ww=m(require("node:fs")),wD=m(require("node:path"));Ro();B();te();Lm();te();E3=e=>{let t=wD.default.join(e,"link-code.txt");if(!Ww.default.existsSync(t))return null;let r=Ww.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},R3=()=>{ze("agent-witch-live");let e=E(),t=M(),r=E3(e),n=gl(t);ml({layout:t,controllers:{getStatus:()=>{let o=ye(t);return{wsConnected:Ji(t,{socketOpen:!0}),lastHeartbeatAt:o?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:n}},reviveWebSocket:()=>{Yr(e)}}})}});var or=W((q_e,ED)=>{"use strict";var WD=["nodebuffer","arraybuffer","fragments"],LD=typeof Blob<"u";LD&&WD.push("blob");ED.exports={BINARY_TYPES:WD,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:LD,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var fl=W((K_e,Em)=>{"use strict";var{EMPTY_BUFFER:k3}=or(),Lw=Buffer[Symbol.species];function C3(e,t){if(e.length===0)return k3;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new Lw(r.buffer,r.byteOffset,n):r}function RD(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function kD(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function T3(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Ew(e){if(Ew.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Lw(e):ArrayBuffer.isView(e)?t=new Lw(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Ew.readOnly=!1),t}Em.exports={concat:C3,mask:RD,toArrayBuffer:T3,toBuffer:Ew,unmask:kD};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Em.exports.mask=function(t,r,n,o,s){s<48?RD(t,r,n,o,s):e.mask(t,r,n,o,s)},Em.exports.unmask=function(t,r){t.length<32?kD(t,r):e.unmask(t,r)}}catch{}});var xD=W((J_e,TD)=>{"use strict";var CD=Symbol("kDone"),Rw=Symbol("kRun"),kw=class{constructor(t){this[CD]=()=>{this.pending--,this[Rw]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Rw]()}[Rw](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[CD])}}};TD.exports=kw});var ls=W((Y_e,ND)=>{"use strict";var hl=require("zlib"),ID=fl(),x3=xD(),{kStatusCode:OD}=or(),I3=Buffer[Symbol.species],O3=Buffer.from([0,0,255,255]),km=Symbol("permessage-deflate"),sr=Symbol("total-length"),is=Symbol("callback"),Mr=Symbol("buffers"),as=Symbol("error"),Rm,Cw=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Rm){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Rm=new x3(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[is];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){Rm.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){Rm.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?hl.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=hl.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[km]=this,this._inflate[sr]=0,this._inflate[Mr]=[],this._inflate.on("error",N3),this._inflate.on("data",MD)}this._inflate[is]=n,this._inflate.write(t),r&&this._inflate.write(O3),this._inflate.flush(()=>{let s=this._inflate[as];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=ID.concat(this._inflate[Mr],this._inflate[sr]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[sr]=0,this._inflate[Mr]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?hl.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=hl.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[sr]=0,this._deflate[Mr]=[],this._deflate.on("data",M3)}this._deflate[is]=n,this._deflate.write(t),this._deflate.flush(hl.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=ID.concat(this._deflate[Mr],this._deflate[sr]);r&&(s=new I3(s.buffer,s.byteOffset,s.length-4)),this._deflate[is]=null,this._deflate[sr]=0,this._deflate[Mr]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};ND.exports=Cw;function M3(e){this[Mr].push(e),this[sr]+=e.length}function MD(e){if(this[sr]+=e.length,this[km]._maxPayload<1||this[sr]<=this[km]._maxPayload){this[Mr].push(e);return}this[as]=new RangeError("Max payload size exceeded"),this[as].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[as][OD]=1009,this.removeListener("data",MD),this.reset()}function N3(e){if(this[km]._inflate=null,this[as]){this[is](this[as]);return}e[OD]=1007,this[is](e)}});var cs=W((X_e,Cm)=>{"use strict";var{isUtf8:jD}=require("buffer"),{hasBlob:j3}=or(),D3=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function H3(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Tw(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function $3(e){return j3&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Cm.exports={isBlob:$3,isValidStatusCode:H3,isValidUTF8:Tw,tokenChars:D3};if(jD)Cm.exports.isValidUTF8=function(e){return e.length<24?Tw(e):jD(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Cm.exports.isValidUTF8=function(t){return t.length<32?Tw(t):e(t)}}catch{}});var Nw=W((Z_e,BD)=>{"use strict";var{Writable:F3}=require("stream"),DD=ls(),{BINARY_TYPES:z3,EMPTY_BUFFER:HD,kStatusCode:U3,kWebSocket:B3}=or(),{concat:xw,toArrayBuffer:G3,unmask:V3}=fl(),{isValidStatusCode:q3,isValidUTF8:$D}=cs(),Tm=Buffer[Symbol.species],Qe=0,FD=1,zD=2,UD=3,Iw=4,Ow=5,xm=6,Mw=class extends F3{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||z3[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[B3]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Qe}_write(t,r,n){if(this._opcode===8&&this._state==Qe)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Tm(n.buffer,n.byteOffset+t,n.length-t),new Tm(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new Tm(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Qe:this.getInfo(t);break;case FD:this.getPayloadLength16(t);break;case zD:this.getPayloadLength64(t);break;case UD:this.getMask();break;case Iw:this.getData(t);break;case Ow:case xm:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[DD.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=FD:this._payloadLength===127?this._state=zD:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=UD:this._state=Iw}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Iw}getData(t){let r=HD;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&V3(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=Ow,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[DD.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Qe&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Qe;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=xw(n,r):this._binaryType==="arraybuffer"?o=G3(xw(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=Qe):(this._state=xm,setImmediate(()=>{this.emit("message",o,!0),this._state=Qe,this.startLoop(t)}))}else{let o=xw(n,r);if(!this._skipUTF8Validation&&!$D(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Ow||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=Qe):(this._state=xm,setImmediate(()=>{this.emit("message",o,!1),this._state=Qe,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,HD),this.end();else{let n=t.readUInt16BE(0);if(!q3(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new Tm(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!$D(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=Qe;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Qe):(this._state=xm,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Qe,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[U3]=o,i}};BD.exports=Mw});var Hw=W((eve,qD)=>{"use strict";var{Duplex:Q_e}=require("stream"),{randomFillSync:K3}=require("crypto"),{types:{isUint8Array:J3}}=require("util"),GD=ls(),{EMPTY_BUFFER:Y3,kWebSocket:X3,NOOP:Z3}=or(),{isBlob:ds,isValidStatusCode:Q3}=cs(),{mask:VD,toBuffer:Hn}=fl(),et=Symbol("kByteLength"),e4=Buffer.alloc(4),Im=8*1024,$n,us=Im,ht=0,t4=1,r4=2,jw=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=ht,this.onerror=Z3,this[X3]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||e4,r.generateMask?r.generateMask(n):(us===Im&&($n===void 0&&($n=Buffer.alloc(Im)),K3($n,0,Im),us=0),n[0]=$n[us++],n[1]=$n[us++],n[2]=$n[us++],n[3]=$n[us++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[et]!==void 0?a=r[et]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(o?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=n[0],d[s-3]=n[1],d[s-2]=n[2],d[s-1]=n[3],i?[d,t]:o?(VD(t,n,d,s,a),[d]):(VD(t,n,t,0,a),[d,t])):[d,t]}close(t,r,n,o){let s;if(t===void 0)s=Y3;else{if(typeof t!="number"||!Q3(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(J3(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[et]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==ht?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):ds(t)?(o=t.size,s=!1):(t=Hn(t),o=t.length,s=Hn.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[et]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};ds(t)?this._state!==ht?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ht?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):ds(t)?(o=t.size,s=!1):(t=Hn(t),o=t.length,s=Hn.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[et]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};ds(t)?this._state!==ht?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ht?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[GD.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):ds(t)?(a=t.size,c=!1):(t=Hn(t),a=t.length,c=Hn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[et]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};ds(t)?this._state!==ht?this.enqueue([this.getBlobData,t,this._compress,d,n]):this.getBlobData(t,this._compress,d,n):this._state!==ht?this.enqueue([this.dispatch,t,this._compress,d,n]):this.dispatch(t,this._compress,d,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[et],this._state=r4,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(Dw,this,a,o);return}this._bufferedBytes-=n[et];let i=Hn(s);r?this.dispatch(i,r,n,o):(this._state=ht,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(n4,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[GD.extensionName];this._bufferedBytes+=n[et],this._state=t4,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");Dw(this,c,o);return}this._bufferedBytes-=n[et],this._state=ht,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===ht&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][et],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][et],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};qD.exports=jw;function Dw(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function n4(e,t,r){Dw(e,t,r),e.onerror(t)}});var rH=W((tve,tH)=>{"use strict";var{kForOnEventAttribute:yl,kListener:$w}=or(),KD=Symbol("kCode"),JD=Symbol("kData"),YD=Symbol("kError"),XD=Symbol("kMessage"),ZD=Symbol("kReason"),ps=Symbol("kTarget"),QD=Symbol("kType"),eH=Symbol("kWasClean"),ir=class{constructor(t){this[ps]=null,this[QD]=t}get target(){return this[ps]}get type(){return this[QD]}};Object.defineProperty(ir.prototype,"target",{enumerable:!0});Object.defineProperty(ir.prototype,"type",{enumerable:!0});var Fn=class extends ir{constructor(t,r={}){super(t),this[KD]=r.code===void 0?0:r.code,this[ZD]=r.reason===void 0?"":r.reason,this[eH]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[KD]}get reason(){return this[ZD]}get wasClean(){return this[eH]}};Object.defineProperty(Fn.prototype,"code",{enumerable:!0});Object.defineProperty(Fn.prototype,"reason",{enumerable:!0});Object.defineProperty(Fn.prototype,"wasClean",{enumerable:!0});var ms=class extends ir{constructor(t,r={}){super(t),this[YD]=r.error===void 0?null:r.error,this[XD]=r.message===void 0?"":r.message}get error(){return this[YD]}get message(){return this[XD]}};Object.defineProperty(ms.prototype,"error",{enumerable:!0});Object.defineProperty(ms.prototype,"message",{enumerable:!0});var Sl=class extends ir{constructor(t,r={}){super(t),this[JD]=r.data===void 0?null:r.data}get data(){return this[JD]}};Object.defineProperty(Sl.prototype,"data",{enumerable:!0});var o4={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[yl]&&o[$w]===t&&!o[yl])return;let n;if(e==="message")n=function(s,i){let a=new Sl("message",{data:i?s:s.toString()});a[ps]=this,Om(t,this,a)};else if(e==="close")n=function(s,i){let a=new Fn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[ps]=this,Om(t,this,a)};else if(e==="error")n=function(s){let i=new ms("error",{error:s,message:s.message});i[ps]=this,Om(t,this,i)};else if(e==="open")n=function(){let s=new ir("open");s[ps]=this,Om(t,this,s)};else return;n[yl]=!!r[yl],n[$w]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[$w]===t&&!r[yl]){this.removeListener(e,r);break}}};tH.exports={CloseEvent:Fn,ErrorEvent:ms,Event:ir,EventTarget:o4,MessageEvent:Sl};function Om(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Mm=W((rve,nH)=>{"use strict";var{tokenChars:Al}=cs();function Mt(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function s4(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,d=-1,p=-1,f=0;for(;f<e.length;f++)if(d=e.charCodeAt(f),i===void 0)if(p===-1&&Al[d]===1)c===-1&&(c=f);else if(f!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f);let h=e.slice(c,p);d===44?(Mt(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${f}`);else if(a===void 0)if(p===-1&&Al[d]===1)c===-1&&(c=f);else if(d===32||d===9)p===-1&&c!==-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f),Mt(r,e.slice(c,p),!0),d===44&&(Mt(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,f),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${f}`);else if(o){if(Al[d]!==1)throw new SyntaxError(`Unexpected character at index ${f}`);c===-1?c=f:n||(n=!0),o=!1}else if(s)if(Al[d]===1)c===-1&&(c=f);else if(d===34&&c!==-1)s=!1,p=f;else if(d===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${f}`);else if(d===34&&e.charCodeAt(f-1)===61)s=!0;else if(p===-1&&Al[d]===1)c===-1&&(c=f);else if(c!==-1&&(d===32||d===9))p===-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f);let h=e.slice(c,p);n&&(h=h.replace(/\\/g,""),n=!1),Mt(r,a,h),d===44&&(Mt(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${f}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=f);let b=e.slice(c,p);return i===void 0?Mt(t,b,r):(a===void 0?Mt(r,b,!0):n?Mt(r,a,b.replace(/\\/g,"")):Mt(r,a,b),Mt(t,i,r)),t}function i4(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}nH.exports={format:i4,parse:s4}});var Hm=W((sve,fH)=>{"use strict";var a4=require("events"),l4=require("https"),c4=require("http"),iH=require("net"),d4=require("tls"),{randomBytes:u4,createHash:p4}=require("crypto"),{Duplex:nve,Readable:ove}=require("stream"),{URL:Fw}=require("url"),Nr=ls(),m4=Nw(),g4=Hw(),{isBlob:f4}=cs(),{BINARY_TYPES:oH,CLOSE_TIMEOUT:h4,EMPTY_BUFFER:Nm,GUID:y4,kForOnEventAttribute:zw,kListener:S4,kStatusCode:A4,kWebSocket:fe,NOOP:aH}=or(),{EventTarget:{addEventListener:b4,removeEventListener:P4}}=rH(),{format:w4,parse:_4}=Mm(),{toBuffer:v4}=fl(),lH=Symbol("kAborted"),Uw=[8,13],ar=["CONNECTING","OPEN","CLOSING","CLOSED"],W4=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Y=class e extends a4{constructor(t,r,n){super(),this._binaryType=oH[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Nm,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),cH(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){oH.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new m4({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new g4(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[fe]=this,s[fe]=this,t[fe]=this,o.on("conclude",R4),o.on("drain",k4),o.on("error",C4),o.on("message",T4),o.on("ping",x4),o.on("pong",I4),s.onerror=O4,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",pH),t.on("data",Dm),t.on("end",mH),t.on("error",gH),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Nr.extensionName]&&this._extensions[Nr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ge(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),uH(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Bw(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Nm,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Bw(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Nm,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Bw(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Nr.extensionName]||(o.compress=!1),this._sender.send(t||Nm,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ge(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Y,"CONNECTING",{enumerable:!0,value:ar.indexOf("CONNECTING")});Object.defineProperty(Y.prototype,"CONNECTING",{enumerable:!0,value:ar.indexOf("CONNECTING")});Object.defineProperty(Y,"OPEN",{enumerable:!0,value:ar.indexOf("OPEN")});Object.defineProperty(Y.prototype,"OPEN",{enumerable:!0,value:ar.indexOf("OPEN")});Object.defineProperty(Y,"CLOSING",{enumerable:!0,value:ar.indexOf("CLOSING")});Object.defineProperty(Y.prototype,"CLOSING",{enumerable:!0,value:ar.indexOf("CLOSING")});Object.defineProperty(Y,"CLOSED",{enumerable:!0,value:ar.indexOf("CLOSED")});Object.defineProperty(Y.prototype,"CLOSED",{enumerable:!0,value:ar.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Y.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Y.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[zw])return t[S4];return null},set(t){for(let r of this.listeners(e))if(r[zw]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[zw]:!0})}})});Y.prototype.addEventListener=b4;Y.prototype.removeEventListener=P4;fH.exports=Y;function cH(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:h4,protocolVersion:Uw[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!Uw.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${Uw.join(", ")})`);let s;if(t instanceof Fw)s=t;else try{s=new Fw(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;jm(e,u);return}let d=i?443:80,p=u4(16).toString("base64"),f=i?l4.request:c4.request,b=new Set,h;if(o.createConnection=o.createConnection||(i?E4:L4),o.defaultPort=o.defaultPort||d,o.port=s.port||d,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(h=new Nr({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=w4({[Nr.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!W4.test(u)||b.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");b.add(u)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let u=o.path.split(":");o.socketPath=u[0],o.path=u[1]}let y;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let u=n&&n.headers;if(n={...n,headers:{}},u)for(let[A,S]of Object.entries(u))n.headers[A.toLowerCase()]=S}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,u||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),y=e._req=f(o),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=f(o);o.timeout&&y.on("timeout",()=>{Ge(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[lH]||(y=e._req=null,jm(e,u))}),y.on("response",u=>{let A=u.headers.location,S=u.statusCode;if(A&&o.followRedirects&&S>=300&&S<400){if(++e._redirects>o.maxRedirects){Ge(e,y,"Maximum redirects exceeded");return}y.abort();let g;try{g=new Fw(A,t)}catch{let _=new SyntaxError(`Invalid URL: ${A}`);jm(e,_);return}cH(e,g,r,n)}else e.emit("unexpected-response",y,u)||Ge(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,A,S)=>{if(e.emit("upgrade",u),e.readyState!==Y.CONNECTING)return;y=e._req=null;let g=u.headers.upgrade;if(g===void 0||g.toLowerCase()!=="websocket"){Ge(e,A,"Invalid Upgrade header");return}let w=p4("sha1").update(p+y4).digest("base64");if(u.headers["sec-websocket-accept"]!==w){Ge(e,A,"Invalid Sec-WebSocket-Accept header");return}let _=u.headers["sec-websocket-protocol"],v;if(_!==void 0?b.size?b.has(_)||(v="Server sent an invalid subprotocol"):v="Server sent a subprotocol but none was requested":b.size&&(v="Server sent no subprotocol"),v){Ge(e,A,v);return}_&&(e._protocol=_);let L=u.headers["sec-websocket-extensions"];if(L!==void 0){if(!h){Ge(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=_4(L)}catch{Ge(e,A,"Invalid Sec-WebSocket-Extensions header");return}let T=Object.keys(R);if(T.length!==1||T[0]!==Nr.extensionName){Ge(e,A,"Server indicated an extension that was not requested");return}try{h.accept(R[Nr.extensionName])}catch{Ge(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Nr.extensionName]=h}e.setSocket(A,S,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(y,e):y.end()}function jm(e,t){e._readyState=Y.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function L4(e){return e.path=e.socketPath,iH.connect(e)}function E4(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=iH.isIP(e.host)?"":e.host),d4.connect(e)}function Ge(e,t,r){e._readyState=Y.CLOSING;let n=new Error(r);Error.captureStackTrace(n,Ge),t.setHeader?(t[lH]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(jm,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function Bw(e,t,r){if(t){let n=f4(t)?t.size:v4(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${ar[e.readyState]})`);process.nextTick(r,n)}}function R4(e,t){let r=this[fe];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[fe]!==void 0&&(r._socket.removeListener("data",Dm),process.nextTick(dH,r._socket),e===1005?r.close():r.close(e,t))}function k4(){let e=this[fe];e.isPaused||e._socket.resume()}function C4(e){let t=this[fe];t._socket[fe]!==void 0&&(t._socket.removeListener("data",Dm),process.nextTick(dH,t._socket),t.close(e[A4])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function sH(){this[fe].emitClose()}function T4(e,t){this[fe].emit("message",e,t)}function x4(e){let t=this[fe];t._autoPong&&t.pong(e,!this._isServer,aH),t.emit("ping",e)}function I4(e){this[fe].emit("pong",e)}function dH(e){e.resume()}function O4(e){let t=this[fe];t.readyState!==Y.CLOSED&&(t.readyState===Y.OPEN&&(t._readyState=Y.CLOSING,uH(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function uH(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function pH(){let e=this[fe];if(this.removeListener("close",pH),this.removeListener("data",Dm),this.removeListener("end",mH),e._readyState=Y.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[fe]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",sH),e._receiver.on("finish",sH))}function Dm(e){this[fe]._receiver.write(e)||this.pause()}function mH(){let e=this[fe];e._readyState=Y.CLOSING,e._receiver.end(),this.end()}function gH(){let e=this[fe];this.removeListener("error",gH),this.on("error",aH),e&&(e._readyState=Y.CLOSING,this.destroy())}});var AH=W((ave,SH)=>{"use strict";var ive=Hm(),{Duplex:M4}=require("stream");function hH(e){e.emit("close")}function N4(){!this.destroyed&&this._writableState.finished&&this.destroy()}function yH(e){this.removeListener("error",yH),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function j4(e,t){let r=!0,n=new M4({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(hH,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(hH,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",N4),n.on("error",yH),n}SH.exports=j4});var Gw=W((lve,bH)=>{"use strict";var{tokenChars:D4}=cs();function H4(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&D4[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}bH.exports={parse:H4}});var EH=W((dve,LH)=>{"use strict";var $4=require("events"),$m=require("http"),{Duplex:cve}=require("stream"),{createHash:F4}=require("crypto"),PH=Mm(),zn=ls(),z4=Gw(),U4=Hm(),{CLOSE_TIMEOUT:B4,GUID:G4,kWebSocket:V4}=or(),q4=/^[+/0-9A-Za-z]{22}==$/,wH=0,_H=1,WH=2,Vw=class extends $4{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:B4,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:U4,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=$m.createServer((n,o)=>{let s=$m.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=K4(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=wH}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===WH){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(bl,this);return}if(t&&this.once("close",t),this._state!==_H)if(this._state=_H,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(bl,this):process.nextTick(bl,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{bl(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",vH);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Un(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Un(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!q4.test(s)){Un(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Un(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Pl(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=z4.parse(c)}catch{Un(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],f={};if(this.options.perMessageDeflate&&p!==void 0){let b=new zn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=PH.parse(p);h[zn.extensionName]&&(b.accept(h[zn.extensionName]),f[zn.extensionName]=b)}catch{Un(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let b={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(b,(h,y,u,A)=>{if(!h)return Pl(r,y||401,u,A);this.completeUpgrade(f,s,d,t,r,n,o)});return}if(!this.options.verifyClient(b))return Pl(r,401)}this.completeUpgrade(f,s,d,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[V4])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>wH)return Pl(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${F4("sha1").update(r+G4).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(n.size){let f=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;f&&(d.push(`Sec-WebSocket-Protocol: ${f}`),p._protocol=f)}if(t[zn.extensionName]){let f=t[zn.extensionName].params,b=PH.format({[zn.extensionName]:[f]});d.push(`Sec-WebSocket-Extensions: ${b}`),p._extensions=t}this.emit("headers",d,o),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",vH),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(bl,this)})),a(p,o)}};LH.exports=Vw;function K4(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function bl(e){e._state=WH,e.emit("close")}function vH(){this.destroy()}function Pl(e,t,r,n){r=r||$m.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${$m.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function Un(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,Un),e.emit("wsClientError",i,r,t)}else Pl(r,n,o,s)}});var J4,Y4,X4,Z4,Q4,eJ,RH,tJ,wl,kH=l(()=>{J4=m(AH(),1),Y4=m(Mm(),1),X4=m(ls(),1),Z4=m(Nw(),1),Q4=m(Hw(),1),eJ=m(Gw(),1),RH=m(Hm(),1),tJ=m(EH(),1),wl=RH.default});var qw,Kw,Jw=l(()=>{"use strict";qw="AGENT_WITCH_EXTERNAL_BRIDGE",Kw="AGENT_WITCH_EXTERNAL_LIVE"});var Yw,CH=l(()=>{"use strict";Yw=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var rJ,Xw,TH=l(()=>{"use strict";Jw();CH();rJ=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",Xw=(e={})=>{let t=e.env??process.env,r=Yw(t[qw]),n=Yw(t[Kw]);return{mode:rJ(r,n),skipInProcessBridge:r,skipInProcessLive:n}}});var xH=l(()=>{"use strict";Jw()});var IH=l(()=>{"use strict";TH();xH()});var Zw=l(()=>{"use strict"});var lr,_l=l(()=>{"use strict";lr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var gs,Bn,OH,oJ,Qw,e_,MH,NH,t_,jH,vl,r_=l(()=>{"use strict";gs=m(require("node:fs")),Bn=m(require("node:os")),OH=m(require("node:path"));Zw();_l();oJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qw=(e=Bn.default.hostname())=>OH.default.join(Bn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),e_=e=>{if(!gs.default.existsSync(e))return null;try{let t=JSON.parse(gs.default.readFileSync(e,"utf8"));return!oJ(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},MH=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},NH=(e,t)=>{gs.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},t_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Qw(),n=e_(r);if(n!==null&&n.pid!==process.pid&&lr(n.pid)&&MH(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:Bn.default.hostname(),macOsUsername:Bn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return NH(r,o),{ok:!0}},jH=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Qw(),n=e_(r);return n!==null&&n.pid!==process.pid&&lr(n.pid)&&MH(n)?{ok:!1}:(NH(r,{hostname:Bn.default.hostname(),macOsUsername:Bn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},vl=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Qw();e_(r)?.pid===process.pid&&gs.default.existsSync(r)&&gs.default.unlinkSync(r)}});var n_,Wl,sJ,iJ,aJ,lJ,o_,DH=l(()=>{"use strict";n_=require("node:child_process"),Wl=m(require("node:path"));_l();pd();sJ=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),iJ=(e,t)=>{if(sJ(e)||!/\bnode\b/.test(e))return!1;let r=Wl.default.resolve(t),n=Wl.default.join(r,"app",$s),o=Wl.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===$s||i==="agent-witch.ts")return e.includes(r);try{let a=Wl.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},aJ=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,n_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},lJ=(e,t,r)=>{let n=aJ(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||iJ(d,t)&&o.push(c)}return o},o_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,n_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=lJ(r,e.installDir,t),o=[];for(let s of n)if(lr(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var Ll,El,HH,cJ,s_,$H=l(()=>{"use strict";Ll=m(require("node:fs")),El=m(require("node:path"));We();HH=(e,t)=>{!Ll.default.existsSync(e)||Ll.default.existsSync(t)||(Ll.default.mkdirSync(El.default.dirname(t),{recursive:!0}),Ll.default.renameSync(e,t))},cJ=e=>{if(e.profileEmail===null)return;let t=El.default.join(e.installDir,rt);HH(El.default.join(t,Xn),e.mainLogPath),HH(El.default.join(t,Zn),e.errorLogPath)},s_=e=>{let t=M();e!==void 0&&t.installDir!==e||cJ(t)}});var dJ,FH=l(()=>{"use strict";ra();Ju();Ju();dJ={};!it()&&Qr(dJ.url)&&(async()=>{ze("agent-witch-wake-server");let e=await Pn(),t=Ft(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var zH=l(()=>{"use strict";FH()});var UH=l(()=>{"use strict";zi()});var i_,BH=l(()=>{"use strict";Zw();zH();r_();UH();i_=async(e={})=>{let t=e.skipInProcessBridge?null:await Ku();Eu();let r=setInterval(()=>{Eu()},6e4),n=setInterval(()=>{if(!jH().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t?.close()}}}});var Rl,Fm,mJ,GH,VH,zm,qH,KH,a_,JH,Um,YH=l(()=>{"use strict";Rl=m(require("node:fs")),Fm=m(require("node:path")),mJ="pending-run-inputs.json",GH=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VH=e=>{let t=e.profileEmail?Fm.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Fm.default.join(t,mJ)},zm=e=>{let t=VH(e);if(!Rl.default.existsSync(t))return{};try{let r=JSON.parse(Rl.default.readFileSync(t,"utf8"));return GH(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!GH(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},qH=(e,t)=>{let r=VH(e);Rl.default.mkdirSync(Fm.default.dirname(r),{recursive:!0}),Rl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},KH=e=>Object.values(zm(e)),a_=(e,t)=>zm(e)[t]!==void 0,JH=(e,t)=>{let r=zm(e);r[t.agentRunId]=t,qH(e,r)},Um=(e,t)=>{let r=zm(e);delete r[t],qH(e,r)}});var Bm=l(()=>{"use strict";ae()});var XH=l(()=>{"use strict";ae()});var Gm=l(()=>{"use strict";ae()});var Vm=l(()=>{"use strict";ae()});var kl=l(()=>{"use strict";ae()});var gJ,fJ,Cl,l_=l(()=>{"use strict";lt();Bm();XH();Gm();Vm();kl();gJ={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},fJ={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Cl=e=>{if(!se(e.writerAgent))return"the selected writer";let t=Ue(e.writerAgent);if(Re(e.writerExecutionBackend)==="api"&&t!==null){let r=Ne(he(e.configPath),t);if(r!==null&&r.apiKey.length>0){let n=ai(t,r.model);return`${fJ[t]} model ${n}`}}return gJ[e.writerAgent]}});var hJ,yJ,ZH,QH,e$=l(()=>{"use strict";hJ=/"input_tokens"\s*:\s*(\d+)/,yJ=/"output_tokens"\s*:\s*(\d+)/,ZH=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},QH=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=ZH(hJ.exec(t)),n=ZH(yJ.exec(t));if(r===null||n===null)return null;let o=r+n;return o>=1?o:null}});var qm=l(()=>{"use strict";ut()});var Tl,Km,SJ,c_,t$,r$,n$,d_,o$=l(()=>{"use strict";Tl=m(require("node:fs")),Km=m(require("node:path"));qm();SJ="run-completion-outbox.json",c_=e=>{let t=e.profileEmail?Km.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Km.default.join(t,SJ)},t$=e=>{let t=c_(e);if(!Tl.default.existsSync(t))return[];try{let r=JSON.parse(Tl.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},r$=(e,t)=>{Tl.default.mkdirSync(Km.default.dirname(c_(e)),{recursive:!0}),Tl.default.writeFileSync(c_(e),JSON.stringify(t,null,2),"utf8")},n$=(e,t)=>{let r=[...t$(e).filter(n=>n.runId!==t.runId),t];r$(e,r)},d_=async e=>{if(e.cloudApi===null)return;let t=t$(e.layout);if(t.length===0)return;let r=[];for(let n of t)await Ni(e.cloudApi,n.runId,n.exitCode,n.output,{estimateSeconds:n.estimateSeconds,actualSeconds:n.actualSeconds})||r.push(n);r$(e.layout,r)}});var s$=l(()=>{"use strict"});var u_,xl,bJ,Gn,i$=l(()=>{"use strict";s$();u_=new Map,xl=e=>{let t=u_.get(e);t!==void 0&&(clearInterval(t),u_.delete(e))},bJ=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},Gn=(e,t,r,n={})=>{xl(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){xl(t);return}let i=n.onTick?.()??{};bJ(e,t,o,i)};s(),u_.set(t,setInterval(s,15e3))}});var a$=l(()=>{"use strict";ut()});var l$,c$=l(()=>{"use strict";a$();l$=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:qe(t)}});var p_,Il,cr,m_,Nt,d$,Jm=l(()=>{"use strict";p_=new Set,Il=new Map,cr=(e,t)=>{if(t.length===0)return;let r=Il.get(e)??[];r.push(t),Il.set(e,r)},m_=e=>{p_.add(e);let t=Il.get(e)??[];return Il.delete(e),t},Nt=e=>p_.has(e),d$=e=>{p_.delete(e),Il.delete(e)}});var Ym,u$,PJ,p$,m$=l(()=>{"use strict";Ym=m(require("node:path")),u$=require("node:url");ro();PJ={},p$=()=>{if(it()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Ym.default.dirname(Ym.default.resolve(e))}return Ym.default.dirname((0,u$.fileURLToPath)(PJ.url))}});var g$,f$,h$,y$,Fe,fs,S$,A$,hs,g_,f_,h_,b$,y_,P$,Xm=l(()=>{"use strict";g$=require("node:crypto"),f$=m(require("node:fs")),h$=m(require("node:path")),y$=require("node:url");_l();ro();m$();Fe=new Map,S$=async()=>{if(fs!==void 0)return fs;try{if(it()){let e=p$(),t=h$.default.join(e,"deps","node-pty","lib","index.js");if(f$.default.existsSync(t)){let r=await import((0,y$.pathToFileURL)(t).href);return fs=r,r}}return fs=await import("node-pty"),fs}catch{return fs=null,null}},A$=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},hs=(e,t,r)=>{let n=Fe.get(e);if(n!==void 0){Fe.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},g_=(e,t)=>{let r=Fe.get(e);return r===void 0?!1:(r.pty.write(t),!0)},f_=(e,t,r)=>{let n=Fe.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},h_=e=>{for(let t of Fe.values())if(!(t.mode!=="agent"||t.runId!==e))return lr(t.pty.pid);return!1},b$=e=>{for(let[t,r]of Fe.entries())if(!(r.mode!=="agent"||r.runId!==e)){Fe.delete(t);try{r.pty.kill()}catch{}return!0}return!1},y_=async e=>{let t=await S$();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;Fe.get(e.shellSessionId)!==void 0&&hs(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Fe.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{A$(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{Fe.get(e.shellSessionId)?.pty===o&&(Fe.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},P$=async e=>{let t=e.shellSessionId??(0,g$.randomUUID)(),r=await S$();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return Fe.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{A$(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{Fe.get(t)?.pty===n&&(Fe.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var Zm,w$,_$=l(()=>{"use strict";Zm="[[AWAITING_INPUT]]",w$=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Zm,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Ol,v$,Qm=l(()=>{"use strict";_$();Ol=e=>{let t=e.indexOf(Zm);if(t<0)return null;let n=e.slice(t+Zm.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},v$=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",w$].join(`
`)});var W$,L$=l(()=>{"use strict";Jm();Xm();Qm();W$=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(Nt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}cr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await P$({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=Ol(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var E$,R$,k$,dr,eg=l(()=>{"use strict";E$=require("node:child_process"),R$=m(require("node:fs")),k$=m(require("node:path"));pd();dr=(e,t)=>{let r=k$.default.join(e,"app",kL,"ensure-writer.sh");return R$.default.existsSync(r)?new Promise((n,o)=>{let s=(0,E$.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var C$,Vn,Nl,tg,S_,Ml,rg,ng,A_,b_,wJ,ys,_J,vJ,P_,w_=l(()=>{"use strict";C$=require("node:child_process");lt();eg();Gm();Bm();kl();Vm();Vn=new Map,Nl=e=>e==="cursor"||e==="antigravity",tg=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",S_=e=>Vn.get(e)?.warmed===!0,Ml=e=>{let t=Vn.get(e);Vn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},rg=e=>Vn.get(e)?.conversationStarted===!0,ng=e=>{let t=Vn.get(e);Vn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},A_=e=>{Vn.delete(e)},b_=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",wJ={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ys=e=>`${wJ[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,_J=(e,t,r,n)=>new Promise(o=>{let s=Wd(t,r),i=[],a=(0,C$.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),n?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{o({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{o({exitCode:-1,output:d.message})})}),vJ=(e,t)=>{let r=ys(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},P_=async e=>{if(!se(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=Ue(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let n=he(e.runConfig.layout.configPath);return Ne(n,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Ml(e.writerAgent),{exitCode:0,output:ys(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await dr(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}Nl(e.writerAgent)&&Ml(e.writerAgent);let t=await _J(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?vJ(e.writerAgent,t.output):ys(e.writerAgent)}}});var qn,__=l(()=>{"use strict";qn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var T$,WJ,LJ,x$,EJ,v_,I$=l(()=>{"use strict";__();T$=/you(?:'|')ve hit your session limit/i,WJ=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],LJ=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,x$=(e,t)=>{for(let r of e.split(/\r?\n/)){let n=r.trim();if(n.length>0&&t.test(n))return n}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},EJ=e=>{let t=LJ.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},v_=e=>{let t=e.trim();if(t.length===0)return null;if(T$.test(t))return{code:qn.SESSION_LIMIT,resetHint:EJ(t),matchedLine:x$(t,T$)};for(let r of WJ)if(r.test(t))return{code:qn.PROVIDER_QUOTA,resetHint:null,matchedLine:x$(t,r)};return null}});var og,sg,W_,L_=l(()=>{"use strict";og="[[AGENT_RUN_WRITER_EXECUTION]]",sg="cli-writer-api-key-missing",W_="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var E_=l(()=>{"use strict";L_()});var O$=l(()=>{"use strict";E_()});var ig=l(()=>{"use strict";__();I$();L_();E_();O$()});var ag,M$=l(()=>{"use strict";ag={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var N$,j$=l(()=>{"use strict";N$="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var D$,H$=l(()=>{"use strict";ig();j$();D$=e=>e.code===qn.SESSION_LIMIT?N$:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var $$,F$=l(()=>{"use strict";ig();M$();H$();$$=e=>{let t=v_(e.output);return t!==null?{status:ag.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:D$(t)}:{status:e.exitCode===0?ag.COMPLETED:ag.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var R_,SLe,z$=l(()=>{"use strict";R_={OPEN:"open",APPROVAL:"approval"},SLe=R_.APPROVAL});var Ss,lg,U$,CJ,B$,G$,V$,jl,k_,C_=l(()=>{"use strict";Ss=m(require("node:fs")),lg=m(require("node:path")),U$="runs",CJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B$=e=>{let t=e.profileEmail!==null?lg.default.join(e.installDir,"profiles",e.profileEmail,U$):lg.default.join(e.installDir,U$);return Ss.default.mkdirSync(t,{recursive:!0}),t},G$=(e,t)=>lg.default.join(B$(e),`${t}.json`),V$=(e,t)=>{Ss.default.writeFileSync(G$(e,t.id),JSON.stringify(t,null,2))},jl=(e,t)=>{let r=G$(e,t);if(!Ss.default.existsSync(r))return null;try{let n=JSON.parse(Ss.default.readFileSync(r,"utf8"));return!CJ(n)||typeof n.id!="string"?null:n}catch{return null}},k_=e=>{let t=B$(e),r=Ss.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=jl(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var TJ,q$,K$=l(()=>{"use strict";F$();z$();C_();TJ=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",n=$$({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:n.status,dispatchPolicy:R_.OPEN,resultOutput:e.output,resultExitCode:n.resultExitCode,resultOutcomeCode:n.resultOutcomeCode,denialReason:n.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},q$=(e,t)=>{let r=TJ(t);return V$(e,r),r}});var J$=l(()=>{"use strict";bm()});var Y$,X$=l(()=>{"use strict";ig();Y$=()=>[og,`agentRunWriterExecutionBackend=${sg}`,`agentRunWriterExecutionReasonCode=${W_}`].join(`
`)});var jr,cg=l(()=>{"use strict";jr=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var T_,xJ,IJ,Z$,Q$=l(()=>{"use strict";T_=e=>e.toLocaleString("en-US"),xJ=e=>e<.01?e.toFixed(4):e.toFixed(3),IJ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${xJ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${T_(e.inputTokens)} in / ${T_(e.outputTokens)} out (${T_(e.totalTokens)} total)`,t].join(`
`)},Z$=(e,t)=>{if(t===void 0)return e;let r=IJ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var eF=l(()=>{"use strict";ae()});var rF,Dl,ue,x_,dg,tF,OJ,MJ,nF,oF,sF,Hl,I_,O_,M_,iF,NJ,tt,$l,Dr,aF,jJ,DJ,ug,N_,j_,D_,lF=l(()=>{"use strict";rF=require("node:child_process");ae();lt();YH();ol();l_();e$();Ld();o$();qm();i$();_l();c$();Jm();Xm();Qm();L$();w_();K$();J$();X$();cg();Q$();ao();eF();kl();Gs();Qm();Dl=new Map,ue=new Map,x_=new Set,dg=new Map,tF=e=>{e!==void 0&&!dg.has(e)&&dg.set(e,Date.now())},OJ=(e,t,r,n)=>{let o=n.endsWith(`
`)?n:`${n}
`;if(Nt(t)){tt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:o},requestId:r});return}cr(t,o)},MJ=(e,t,r,n,o)=>{if(!Gh(e,o))return;let s=`${Y$()}
`;OJ(t,r,n,s);let i=ue.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},nF=130,oF=`

Stopped by user.`,sF=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:jr(e)},Hl=null,I_=e=>{Hl=e},O_=(e,t)=>{if(Hl===null)return;let r=xP(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||Uy(Hl,t,r)},M_=async e=>{await d_({layout:e,cloudApi:Hl})},iF=e=>{let t=Dl.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:lr(t.pid)},NJ=e=>ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),tt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},$l=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=to(s),c=ue.get(r);if(a!==null&&c!==void 0){let d=HL(a),p=iF(r)||h_(r);d!==null&&!p&&Dr(e,t,r,n,d.exitCode,d.output,c.originalPrompt)}return DL(a)}}),Dr=(e,t,r,n,o,s,i,a)=>{let c=fo(s,a),d=o,p=Z$(c.output,c.llmUsage);if(r!==void 0){let b=dg.get(r);dg.delete(r),b!==void 0&&CP({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-b)/1e3))});let h=QH(c.llmUsage,p);h!==null&&Aj({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&x_.has(r)&&(x_.delete(r),d=nF,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${oF}`:"Stopped by user.");let f=r!==void 0?xP(e.layout.reportsDir,r):null;if(r!==void 0){xl(r),fi(e.layout,r),Nt(r)&&(tt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),d$(r));let b=ue.get(r);hj({reportsDir:e.layout.reportsDir,agentRunId:r,input:jr(i),output:p,...b!==void 0?{writerLabel:Cl({writerAgent:b.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),b!==void 0&&Sm({layout:e.layout,writerAgent:b.writerAgent,projectFolderPath:b.projectFolderPath,userPrompt:b.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),q$(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),n$(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{}}),d_({layout:e.layout,cloudApi:Hl}),ue.delete(r),Dl.delete(r),Um(e.layout,r)}tt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:n}),ei(e.layout)},aF=(e,t,r,n,o,s,i)=>{let a=ue.get(r),c=a?.accumulatedOutput??s;JH(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),Gn(t,r,()=>a_(e.layout,r),$l(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),tt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},jJ=(e,t,r,n,o,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(o===void 0||h.length===0)){if(Nt(o)){tt(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:h},requestId:n});return}cr(o,h)}};if(o!==void 0){let h=ue.get(o);Dl.set(o,t),ue.set(o,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),tt(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),Gn(r,o,()=>iF(o),$l(e,r,o,n,h?.projectFolderPath,h?.reportKey))}let f=a==="claude-cli",b=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(f?b.push(y):(c.push(y),p(y)),d||o===void 0)return;let u=Ol(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let A=ue.get(o),S=[A?.accumulatedOutput??"",u.partialOutput].filter(g=>g.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=S),Dl.delete(o),aF(e,r,o,n,u.question,S,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;ng(a);let y=o!==void 0?ue.get(o):void 0,u=f?fo(b.join("")):{output:c.join("").trim(),llmUsage:void 0},A=f?c.join("").trim():"",S=[u.output.trim(),A].filter(w=>w.length>0).join(`
`);f&&u.output.trim().length>0&&p(u.output);let g=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${S}`.trim():S;Dr(e,r,o,n,h??-1,g,s,u.llmUsage)}),t.on("error",h=>{d||Dr(e,r,o,n,-1,h.message,s)})},DJ=(e,t,r,n,o,s,i,a,c)=>{let d=sF(r,c);s!==void 0&&(ue.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),tt(o,{type:"terminal.stream.start",payload:{runId:s},requestId:n}),Gn(o,s,()=>ue.has(s),$l(e,o,s,n,i,a))),ui(e,t,r,f=>{if(!(s===void 0||f.length===0)){if(Nt(s)){tt(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:f},requestId:n});return}cr(s,f)}}).then(f=>{ng(t),Dr(e,o,s,n,f.exitCode,f.output,r,f.llmUsage)}).catch(f=>{let b=f instanceof Error?f.message:String(f);Dr(e,o,s,n,-1,b,r)})},ug=(e,t,r,n,o,s,i,a,c,d,p,f)=>{let b=sF(r,p);if(Qs(e.layout),ln(e,t)){tF(s),DJ(e,t,r,n,o,s,c,d,b);return}let h=_t(t,r,NJ(e),i);if(h===null){Dr(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}tF(s);let y=l$({workspace:e.workspace,projectFolderPath:c}),u=()=>{let A=(0,rF.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:f??process.env});jJ(e,A,o,n,s,r,b,t)};if(s===void 0){u();return}ue.set(s,{originalPrompt:r,userTranscriptPrompt:b,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:ue.get(s)?.accumulatedOutput??""}),MJ(e,o,s,n,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Bs({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Gn(o,s,()=>ue.has(s),$l(e,o,s,n,c,d)),W$({socket:o,sendMessage:tt,requestId:n,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:f,originalPrompt:r,writerAgent:t,onInputRequired:A=>{a!==void 0&&hs(a,w=>{tt(o,w)},n);let S=ue.get(s),g=[S?.accumulatedOutput??"",A.partialOutput].filter(w=>w.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=g),aF(e,o,s,n,A.question,g,r)},onFinished:(A,S)=>{ng(t);let g=fo(S),w=ue.get(s),_=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${g.output}`.trim():g.output;Dr(e,o,s,n,A,_,r,g.llmUsage)}}).then(A=>{if(!A){u();return}Gn(o,s,()=>h_(s),$l(e,o,s,n,c,d))}).catch(A=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",A instanceof Error?A.message:A),u()})},N_=(e,t,r,n)=>{Um(e.layout,t.agentRunId),t.shellSessionId!==void 0&&tt(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=v$(t),s=ue.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;ug(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},j_=(e,t)=>{for(let r of KH(e.layout))ue.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:jr(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Gn(t,r.agentRunId,()=>a_(e.layout,r.agentRunId),{awaitingInput:!0}),tt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},D_=(e,t,r,n)=>{let o=ue.get(r);if(o===void 0)return!1;x_.add(r),xl(r);let s=Dl.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(b$(r))return!0;Um(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${oF}`:"Stopped by user.";return Dr(e,t,r,n,nF,i,o.originalPrompt),!0}});var HJ,H_,cF=l(()=>{"use strict";Ai();HJ=()=>`http://127.0.0.1:${ct()}/restart`,H_=async()=>{try{let e=await fetch(HJ(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var dF=l(()=>{"use strict";aa()});var uF=l(()=>{"use strict";aw()});var pF,mF=l(()=>{"use strict";pF=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Fl,$J,$_,gF=l(()=>{"use strict";B();te();dF();RS();uF();mF();ao();Fl=(e,t)=>{Lr(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},$J=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ah(),ih)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},$_=async e=>{let t=Le(e.layout.installDir)?.bundleVersion??null;if(!pF({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(at(e.layout)){ti({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Fl(e.layout,{summary:r,action:"install-bundle-update-start"}),$t({launchAgentLabel:re(e.layout.installDir),installDir:e.layout.installDir});let n=await ss({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),Fl(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await $J();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Fl(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),Fl(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),Fl(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var FJ,F_,fF=l(()=>{"use strict";FJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F_=e=>{if(!FJ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var z_,U_,hF=l(()=>{"use strict";lS();cS();z_=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Ui({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},U_=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Jt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var yF,zJ,UJ,BJ,zl,SF=l(()=>{"use strict";yF=m(require("node:os"));We();zJ="Default",UJ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),BJ=e=>{let t=yF.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},zl=()=>{let e=M(),t=td(e),r=UJ(zJ);return`${BJ(t)}/${r.length>0?r:"project"}`}});var AF=l(()=>{"use strict";aa()});var bF,B_,PF=l(()=>{"use strict";AF();bF=!1,B_=e=>{bF||(bF=!0,process.on("uncaughtException",t=>{_n(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;_n(e,{kind:"crash",message:r,stack:n})}))}});var wF,GJ,G_,_F=l(()=>{"use strict";wF=require("node:child_process");eg();lt();Gm();Bm();kl();Vm();GJ=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,wF.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},G_=async e=>{if(!se(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=Ue(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let n=he(e.layout.configPath),o=Ne(n,r),s=o!==null&&o.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await dr(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await GJ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var V_,vF=l(()=>{"use strict";V_=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var WF,q_,LF=l(()=>{"use strict";WF=require("node:crypto"),q_=()=>(0,WF.randomUUID)()});var As,EF,pg=l(()=>{"use strict";As="[[WORKING_ESTIMATE]]",EF=(e,t,r,n="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",As,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var RF,kF=l(()=>{"use strict";RF=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var VJ,CF,TF=l(()=>{"use strict";pg();VJ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,CF=e=>{if(!e.includes(As))return null;let t=null;for(let r of e.matchAll(VJ)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var qJ,K_,xF=l(()=>{"use strict";TF();qJ=/^(\d{1,6})\b/,K_=e=>{let t=CF(e);if(t!==null)return t;let r=qJ.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return!Number.isFinite(n)||n<=0?null:n}});var KJ,JJ,YJ,mg,J_=l(()=>{"use strict";lt();oa();KJ="http://127.0.0.1:11434",JJ=45e3,YJ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},mg=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||KJ,n=t===void 0?(await mt({commands:ie({})})).estimateModel:t;if(n===null||n.trim().length===0)return null;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:n,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(JJ)});return o.ok?YJ(await o.json()):null}catch{return null}}});var Y_,X_,Z_,IF=l(()=>{"use strict";Gs();pg();cg();kF();xF();ol();J_();Y_=async e=>{let t=jr(e.wrappedPrompt),r=yj(e.reportsDir);return{estimateOutput:await mg(EF(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},X_=e=>{let t=K_(e.estimateOutput);t!==null&&um({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},Z_=e=>{let t=K_(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=RF(t);return Us({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Pt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),um({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var gg,OF,Q_=l(()=>{"use strict";gg="[[WORKING_TOKEN_ESTIMATE]]",OF=(e,t,r,n="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",gg,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var MF,XJ,NF,jF=l(()=>{"use strict";Q_();MF=/^(\d{1,8})\b/,XJ=e=>{let t=e.indexOf(gg);if(t<0)return null;let r=e.slice(t+gg.length).trim(),n=MF.exec(r);if(n===null)return null;let o=Number.parseInt(n[1]??"",10);return Number.isFinite(o)&&o>=1?o:null},NF=e=>{let t=XJ(e);if(t!==null)return t;let r=MF.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return Number.isFinite(n)&&n>=1?n:null}});var ev,tv,DF=l(()=>{"use strict";Q_();cg();jF();ol();J_();ev=async e=>{let t=jr(e.wrappedPrompt),r=bj(e.reportsDir);return{estimateOutput:await mg(OF(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},tv=e=>{let t=NF(e.estimateOutput);return t===null?null:(Sj({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var HF=l(()=>{"use strict";r_();DH();$H();BH();Ai();lF();eg();lt();C_();Jm();cF();yS();gF();ao();fF();hF();qm();SF();PF();_F();md();vF();LF();pg();Gs();IF();DF();l_();oa();Xm();w_()});var $F={};St($F,{buildContinuationPromptWithContext:()=>e6});var ZJ,QJ,e6,FF=l(()=>{"use strict";ZJ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,QJ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),e6=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=QJ(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${ZJ(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var zF={};St(zF,{readHarnessExportSets:()=>r6});var Ul,rv,fg,t6,r6,UF=l(()=>{"use strict";Ul=m(require("node:fs")),rv=m(require("node:path"));We();fg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),t6=e=>{if(!Ul.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Ul.default.readFileSync(e.harnessManifestPath,"utf8"));if(fg(t))return t}catch{return null}return null},r6=(e,t)=>{let r=M(t),n=t6(r);if(n===null)return[];let o=fg(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!fg(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!fg(p))continue;let f=typeof p.path=="string"?p.path:void 0,b=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(f===void 0||b.length===0||h.length===0||y.length===0)continue;let u=f.startsWith("shared/")?rv.default.join(r.harnessRootDir,f):rv.default.join(r.harnessSetsDir,i,f);Ul.default.existsSync(u)&&d.push({id:b,kind:h,title:y,content:Ul.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var cv,ov,bs,BF,n6,GF,VF,nv,qF,sv,iv,av,X,U,lv,o6,Bl,s6,i6,a6,l6,c6,d6,u6,p6,Gl,KF=l(()=>{"use strict";cv=require("node:child_process"),ov=m(require("node:fs")),bs=m(require("node:os"));kH();B();te();Ro();Aw();IH();ae();Ve();aa();DA();Lm();bm();ut();mn();HS();Bt();HF();BF=3e4,n6=3e4,GF=new Map,VF=new Map,nv=new Map,qF=new Map,sv=new Map,iv=new Map,av=new Map,X=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),U=(e,t,r)=>{e.readyState===wl.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Lr(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Yu(r,"out",t)))},lv=e=>e,o6=e=>{if(!ov.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(ov.default.readFileSync(e.harnessManifestPath,"utf8"));if(X(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Bl=(e,t)=>{let r=o6(t);r!==null&&U(e,{type:"harness.manifest.report",payload:{hostname:bs.default.hostname(),manifest:r}})},s6=async(e,t,r,n,o,s,i=!1,a,c,d,p,f)=>{let b=f?.trim()??"";if(!se(t)){U(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let h=Cl({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await mt({commands:ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?Y_({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=s!==void 0?ev({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,S=Nl(t)&&!S_(t);if(S){try{await dr(e.layout.installDir,t)}catch(H){let _e=H instanceof Error?H.message:String(H);U(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_e}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Ml(t)}else if(!Nl(t))try{await dr(e.layout.installDir,t)}catch(H){let _e=H instanceof Error?H.message:String(H);U(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_e}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let g=mi(d,zl,f);if(g===null){U(o,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Be({projectFolderPath:g,...b.length>0?{projectId:b}:{}}),i||cl(e.layout,t,g);let w=Am({sessionContinuation:i,supportsWriterSessionContinuation:tg(t),isWriterConversationStarted:rg(t)}),_=i&&w==="first"?ll(e.layout,t,g):null,v=_!==null?os(e.layout,_):null,L=v!==null&&v.turns.length>0,R=qP({sessionContinuation:i,supportsWriterSessionContinuation:tg(t),isWriterConversationStarted:rg(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:L,userPromptCharacterCount:r.length}),T=r;if(R.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?jl(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:_e}=await Promise.resolve().then(()=>(FF(),$F));T=_e({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else R.continuationStrategy==="transcript_seed"&&v!==null&&v.turns.length>0&&(T=gm({priorTurns:v.turns,userMessage:r}));let I=R.ragLimit>0?await Ho({layout:e.layout,query:T,limit:R.ragLimit,minScore:R.ragMinScore,projectFolderPath:g,...b.length>0?{projectId:b}:{}}):[],D=R.ragLimit>0&&g.trim().length>0?await NA({layout:e.layout,query:T,limit:2,minScore:.32,projectFolderPath:g,...b.length>0?{projectId:b}:{}}):[],le=R.injectMemory?jP(e.layout,g,b.length>0?b:void 0):[],V=`${HP(le,R.memoryEntryLimit)}${IA(I)}${jA(D)}${T}`,q=p?.trim()??(s!==void 0&&g.trim().length>0?q_():void 0);if(s!==void 0&&q!==void 0&&q.length>0&&g.trim().length>0){Bs({reportKey:q,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=V;u!==null&&u.then(_e=>{if(_e===null)return;let yt=Z_({estimateOutput:_e.estimateOutput??"",reportKey:q,agentRunId:s,reportsDir:e.layout.reportsDir,task:_e.task,writerLabel:_e.writerLabel,embedding:_e.embedding});if(yt.estimateSeconds===null)return;O_(e.layout.reportsDir,s);let Vl=`${As}
${yt.estimateSeconds}
`;if(Nt(s)){U(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Vl},requestId:n});return}cr(s,Vl)}).catch(()=>{}),V=V_(H),V=xf(V,{agentRunId:s,reportKey:q,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then(H=>{H!==null&&X_({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&A!==null&&A.then(H=>{H!==null&&tv({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let Hr=s!==void 0&&av.get(s)===!0;if(s!==void 0&&g.trim().length>0){let H=await Wu(g);iv.set(s,H),q!==void 0&&q.length>0&&sv.set(s,q)}ug(e,t,V,n,lv(o),s,{sessionTurn:R.sessionTurn},a,g,q,r,Hh(e.layout,s,Hr)),S&&s!==void 0&&U(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:b_(t)},requestId:n})},i6=async(e,t,r,n,o)=>{let s=(i,a)=>{U(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await P_({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,U(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:n})}}),c=se(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?ys(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},a6=(e,t,r)=>new Promise(n=>{if(!se(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=_t(t,r,ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,cv.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),l6=async(e,t,r,n)=>{if(t.installMethod!=="deterministic-bundle")return!1;U(n,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let o=Wt(t.bundle),s=X(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(o!==null)return o;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=Ee(e.wsUrl)??zt,f=await Wy({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return f.ok?f.bundle:null})();if(i===null)return U(n,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=pn({bundle:i,layout:e.layout});return U(n,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Bl(n,e.layout),!0},c6=async(e,t,r,n)=>{if(await l6(e,t,r,n))return;let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(U(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){U(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!se(o)){U(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}Qs(e.layout);let i=await(async()=>{try{await dr(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return a6(e,o,s)})().finally(()=>{ei(e.layout)});U(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),Bl(n,e.layout)},d6=e=>{let t=1e3*2**e;return Math.min(n6,t)},u6=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(at(e.layout)){Qf(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,H_().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1})}},n=(u,A="system.ack")=>{if(!t.selfUpdateInFlight){if(at(e.layout)){ti({layout:e.layout,remoteBundleVersion:u,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,$_({layout:e.layout,remoteBundleVersion:u,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},o=()=>{let u=ye(e.layout);u!==null&&Ie(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===wl.OPEN||u.readyState===wl.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(o,BF)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=d6(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},f=u=>{s();let A=()=>{let S=Js(e.layout.installDir),g=ct();U(u,{type:"agent.heartbeat",payload:{hostname:bs.default.hostname(),macOsUsername:bs.default.userInfo().username,wakeError:t.wakeError,wakePort:g,...e.email!==null?{email:e.email}:{},installBundleVersion:S}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,BF)},b=(u,A)=>{if(typeof u.type!="string")return;if(DS(u)){t.stopped=!0,s(),a(),c(),OS({layout:e.layout}).finally(()=>{vl(),process.exit(0)});return}Lr(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),Yu(e.layout,"in",u);let S=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&X(u.payload)){let g=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",_=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",v=typeof u.payload.challenge=="string"?u.payload.challenge:"",L=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!Sw({serverPublicKey:g,origin:w,devicePublicKey:_,challenge:v,serverAttestation:L})){t.wakeError="Server attestation verification failed",Lr(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&X(u.payload)){let g=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Lr(e.layout,{direction:"local",type:"writer.ensure",summary:g,action:"ensure-writer"}),G_({layout:e.layout,writerAgent:g,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{U(A,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&X(u.payload)){let g=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";g.length>0&&n(g,"install.bundle.update")}if(u.type==="system.ack"){xu(e.layout,{wsUrl:e.wsUrl});let g=X(u.payload)?u.payload:null,w=F_(g);w!==null&&n(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&X(u.payload)&&z_(u.payload),u.type==="automations.run"&&X(u.payload)&&U_(u.payload),u.type==="terminal.stream.accepted"&&X(u.payload)){let g=typeof u.payload.runId=="string"?u.payload.runId:"";if(g.length>0){let w=m_(g);for(let _ of w)U(A,{type:"terminal.stream.chunk",payload:{runId:g,chunk:_},requestId:S})}}if(u.type==="agent.agentRun.list"&&U(A,{type:"dashboard.agentRun.list.result",payload:{runs:k_(e.layout)},requestId:S}),u.type==="agent.agentRun.get"&&X(u.payload)){let g=typeof u.payload.runId=="string"?u.payload.runId:"",w=g.length>0?jl(e.layout,g):null;U(A,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:S})}if(u.type==="command.claude.run"&&X(u.payload)){let g=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&se(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",_=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,v=u.payload.sessionContinuation===!0,L=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,R=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,T=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=mi(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,zl,T),D=xh(u.payload.compositionSnapshot),le=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof g=="string"&&g.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${v?"continue":"first"})\u2026`),I===null){U(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:S});return}if(D!==null){let V=Oh(e.layout,D);if(V!==null){U(A,{type:"command.claude.result",payload:{exitCode:-1,output:V,..._!==void 0?{agentRunId:_}:{}},requestId:S});return}if(_!==void 0){let q=Nh(e.layout,_,D);if(!q.ok){U(A,{type:"command.claude.result",payload:{exitCode:-1,output:q.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:S});return}av.set(_,D.entries.some(Hr=>Hr.scope==="run"))}}_!==void 0&&R!==void 0&&GF.set(_,R),_!==void 0&&(VF.set(_,I),T!==void 0&&T.trim().length>0&&nv.set(_,T.trim()),qF.set(_,g.trim()),Be({projectFolderPath:I,...T!==void 0&&T.trim().length>0?{projectId:T.trim()}:{}})),s6(e,w,g.trim(),S,A,_,v,R,L,I,le,T)}}if(u.type==="shell.session.open"&&X(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,_=typeof u.payload.rows=="number"?u.payload.rows:32;g.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),y_({shellSessionId:g,cwd:e.workspace,cols:w,rows:_,send:v=>{U(A,v)},requestId:S}))}if(u.type==="shell.session.close"&&X(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";g.length>0&&hs(g,w=>{U(A,w)},S)}if(u.type==="shell.input"&&X(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";g.length>0&&w.length>0&&g_(g,w)}if(u.type==="shell.resize"&&X(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,_=typeof u.payload.rows=="number"?u.payload.rows:0;g.length>0&&w>0&&_>0&&f_(g,w,_)}if(u.type==="command.writer.session.end"&&X(u.payload)){let g=u.payload.writerAgent;typeof g=="string"&&se(g)&&(A_(g),ym(e.layout,g))}if(u.type==="command.writer.session.start"&&X(u.payload)){let g=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof g=="string"&&se(g)&&w.length>0&&(console.log(`[agent-witch] Starting ${g} session\u2026`),i6(e,g,w,S,A))}if(u.type==="command.claude.stop"&&X(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";g.length>0&&(console.log(`[agent-witch] Stopping run ${g}\u2026`),D_(e,lv(A),g,S))}if(u.type==="command.claude.input_respond"&&X(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",_=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",v=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",L=typeof u.payload.question=="string"?u.payload.question:"";g.length>0&&w.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),N_(e,{agentRunId:g,originalPrompt:_,partialOutput:v,question:L,response:w,shellSessionId:GF.get(g)},S,lv(A)))}if(u.type==="dispatch.approval.required"&&X(u.payload)){let g=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${g}: ${w}`),process.platform==="darwin"&&(0,cv.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${g.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&X(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),c6(e,u.payload,S,A)),u.type==="harness.export.request"&&X(u.payload)){let g=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,_=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(v=>typeof v=="string"):[];g.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:v}=await Promise.resolve().then(()=>(UF(),zF)),L=v(_,e.email);U(A,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:g,...w!==void 0?{targetDeviceId:w}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:S})})()}if(u.type==="harness.manifest.request"&&Bl(A,e.layout),u.type==="command.claude.result"&&X(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",_=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,v=mi(g!==void 0?VF.get(g):void 0,zl),L=g!==void 0?nv.get(g):void 0,R=g!==void 0?qF.get(g)??"":"",T=Qy({exitCode:_,output:w});if(T&&v!==null&&xA({layout:e.layout,text:w,source:g??"command.claude.result",projectFolderPath:v,...L!==void 0?{projectId:L}:{}}),_!=null&&_!==0&&w.trim().length>0&&v!==null&&(EA({layout:e.layout,errorText:w,projectFolderPath:v,...L!==void 0?{projectId:L}:{}}),MA({layout:e.layout,text:w,source:g??"command.claude.result.failure",projectFolderPath:v,...L!==void 0?{projectId:L}:{}})),T&&R.trim().length>0&&v!==null&&DP({layout:e.layout,projectFolderPath:v,...L!==void 0?{projectId:L}:{},entry:{id:`${Date.now()}-${g??"run"}`,...g!==void 0?{agentRunId:g}:{},prompt:R,output:w,createdAt:new Date().toISOString()}}),g!==void 0&&v!==null){let D=sv.get(g),le=iv.get(g);D!==void 0&&le!==void 0&&Wu(v).then(V=>{let q=eS({before:le,after:V});If(D,q),iv.delete(g),sv.delete(g)})}if(T&&L!==void 0&&L.trim().length>0){let D=$(),le=D===null?null:Z({wsUrl:D.wsUrl,pairingToken:D.pairingToken});le!==null&&rS(le,L,{...g!==void 0?{sourceRunId:g}:{},lesson:tS({prompt:R,output:w})})}g!==void 0&&(fi(e.layout,g),av.delete(g),nv.delete(g))}},h=()=>{if(t.stopped)return;a(),c();let u=new wl(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),I_(Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),M_(e.layout);let A=Ee(e.wsUrl)??"http://localhost:3000",S=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),g=yw({layout:e.layout,origin:A,...S!==void 0&&S.length>0?{claimToken:S}:{}});U(u,{type:"agent.register",payload:{role:"agent",hostname:bs.default.hostname(),macOsUsername:bs.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...g}},e.layout),Bl(u,e.layout),j_(e,u),f(u)}),u.on("message",A=>{let S=typeof A=="string"?A:A.toString("utf8");try{let g=JSON.parse(S);if(!X(g))return;b(g,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(A,S)=>{s(),t.socket=void 0,t.wsConnected=!1,pS(e.layout),t.reconnectAttempt+=1;let g=typeof S=="string"?S:S.toString("utf8");_n(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:g}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",A=>{t.wakeError=A.message,_n(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return Zf(()=>{let u=eh();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&n(u.remoteBundleVersion,u.trigger);let A=th();A!==null&&r(A)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Ji(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:gl(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Bl(u,e.layout),{ok:!0})}}},p6=async()=>{ze("agent-witch");let e=Xw(),t=E();t_().ok||(process.platform==="darwin"?(await Yr(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),s_(t);let n=o_({installDir:t});n.length>0&&console.log(`[agent-witch] Stopped ${n.length} sibling process(es): ${n.join(", ")}`),process.platform==="darwin"&&($t({launchAgentLabel:re(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Ns());let o=await Kh(),s=o[0];s!==void 0&&B_(s.layout);for(let h of o){let y=Ee(h.wsUrl)??zt;Ys(h.layout.installDir,y)}let i=o.map(h=>u6(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),vl(),process.exit(0));let c=()=>{o.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let A=ye(h.layout);mS(A,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=o[0]?.layout;h!==void 0&&(at(h)||Yi(h.installDir))},f=await i_({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):ml({layout:o[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let b=Ft(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),js(),d()});d=()=>{b(),f.stop(),vl(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Gl=p6});var dv=l(()=>{"use strict";KF()});var JF={};St(JF,{startAgentWitchClient:()=>Gl});var m6,YF=l(()=>{"use strict";dv();dv();ro();Of();fd();m6={};if(Qr(m6.url)&&!it()){let e=process.argv.indexOf("report");e>=0&&process.exit(gd(process.argv.slice(e))),Gl()}});Cf();Of();fd();var zL="20.x",UL="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var t2=e=>[`Node.js ${zL} or newer is required (found ${e}).`,UL].join(" "),BL=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${t2(process.version)}
`),process.exit(1))};var y6={},g6=async()=>{ze("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ah(),ih)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},f6=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(GC(),BC)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},h6=async()=>{if(!Qr(y6.url))return;BL();let e=process.argv.indexOf("report");e>=0&&process.exit(gd(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await g6();return}if(t==="wake"){await f6();return}if(t==="bridge"){let{runAgentWitchBridgeCli:n}=await Promise.resolve().then(()=>(VT(),GT));await n();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:n}=await Promise.resolve().then(()=>(vD(),_D));n();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(YF(),JF));await r()};h6();
