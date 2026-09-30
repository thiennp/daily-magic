#!/usr/bin/env node
"use strict";var IF=Object.create;var gg=Object.defineProperty;var OF=Object.getOwnPropertyDescriptor;var NF=Object.getOwnPropertyNames;var MF=Object.getPrototypeOf,jF=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},St=(e,t)=>{for(var r in t)gg(e,r,{get:t[r],enumerable:!0})},DF=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of NF(t))!jF.call(e,o)&&o!==r&&gg(e,o,{get:()=>t[o],enumerable:!(n=OF(t,o))||n.enumerable});return e};var m=(e,t,r)=>(r=e!=null?IF(MF(e)):{},DF(t||!e||!e.__esModule?gg(r,"default",{value:e,enumerable:!0}):r,e));var Kn=v(fg=>{"use strict";Object.defineProperty(fg,"__esModule",{value:!0});fg.stringify=HF;function HF(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=v(hg=>{"use strict";Object.defineProperty(hg,"__esModule",{value:!0});hg.generateTypeGuardError=$F;var av=Kn();function $F(e,t,r){return(0,av.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,av.stringify)(e)}) to be "${r}"`}});var pr=v(Bl=>{"use strict";Object.defineProperty(Bl,"__esModule",{value:!0});Bl.isNonNullObject=void 0;var FF=O(),zF=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,FF.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Bl.isNonNullObject=zF});var At=v(ue=>{"use strict";Object.defineProperty(ue,"__esModule",{value:!0});ue.attachTypeGuardMeta=ue.isArrayTypeGuard=ue.isNestedObjectTypeGuard=ue.getTypeGuardWrapperKind=ue.getTypeGuardInnerGuard=ue.getTypeGuardItemGuard=ue.getTypeGuardSchema=void 0;var UF=e=>e.schema;ue.getTypeGuardSchema=UF;var BF=e=>e.itemGuard;ue.getTypeGuardItemGuard=BF;var GF=e=>e.innerGuard;ue.getTypeGuardInnerGuard=GF;var VF=e=>e.wrapperKind;ue.getTypeGuardWrapperKind=VF;var qF=e=>{if((0,ue.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};ue.isNestedObjectTypeGuard=qF;var KF=e=>{if((0,ue.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};ue.isArrayTypeGuard=KF;var JF=(e,t)=>Object.assign(e,t);ue.attachTypeGuardMeta=JF});var Ps=v(Fr=>{"use strict";Object.defineProperty(Fr,"__esModule",{value:!0});Fr.getExpectedTypeName=Fr.getTypeGuardDisplayName=void 0;var lv=At(),YF=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Fr.getTypeGuardDisplayName=YF;var XF=e=>{let t=(0,lv.getTypeGuardWrapperKind)(e),r=(0,lv.getTypeGuardInnerGuard)(e);if(t&&r){let o=(0,Fr.getExpectedTypeName)(r);if(t==="undefinedOr")return`${o} | undefined`;if(t==="nullOr")return`${o} | null`;if(t==="nilOr")return`${o} | null | undefined`}let n=e.name;if(n.startsWith("is")){let o=n.slice(2);return o.endsWith("Guard")&&(o=o.slice(0,-5)),o==="Type"||o==="Schema"?"object":o==="Array"?"Array":o.toLowerCase()}return"unknown"};Fr.getExpectedTypeName=XF});var zr=v(Gl=>{"use strict";Object.defineProperty(Gl,"__esModule",{value:!0});Gl.createValidationResult=void 0;var ZF=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Gl.createValidationResult=ZF});var Jn=v(Vl=>{"use strict";Object.defineProperty(Vl,"__esModule",{value:!0});Vl.createValidationError=void 0;var QF=(e,t,r,n)=>({path:e,expectedType:t,actualValue:r,message:n});Vl.createValidationError=QF});var Yn=v(ql=>{"use strict";Object.defineProperty(ql,"__esModule",{value:!0});ql.createTreeNode=void 0;var e1=(e,t,r,n)=>({valid:t,path:e,...r&&{expectedType:r},...n!==void 0&&{actualValue:n},children:{},errors:[]});ql.createTreeNode=e1});var _s=v(Kl=>{"use strict";Object.defineProperty(Kl,"__esModule",{value:!0});Kl.combineResults=void 0;var t1=zr(),r1=(e,t)=>{let r=e.every(s=>s.valid),n=e.flatMap(s=>s.errors),o={valid:r,path:t||"root",children:{},errors:n};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";o.children[i]=s.tree}}),(0,t1.createValidationResult)(r,n,o)};Kl.combineResults=r1});var Yl=v(Jl=>{"use strict";Object.defineProperty(Jl,"__esModule",{value:!0});Jl.createSimplifiedTree=void 0;var cv=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,n])=>{t[r]=cv(n)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},n1=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let n={};Object.entries(e.children).forEach(([o,s])=>{n[o]=cv(s)}),r[t]={valid:e.valid,value:n}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Jl.createSimplifiedTree=n1});var vs=v(Zl=>{"use strict";Object.defineProperty(Zl,"__esModule",{value:!0});Zl.validateObject=void 0;var o1=pr(),ws=zr(),s1=Jn(),Xl=Yn(),i1=_s(),dv=Ql(),a1=(e,t,r)=>{let n=()=>{let i=(0,s1.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Xl.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,ws.createValidationResult)(!1,[],a):(0,ws.createValidationResult)(!1,[i],a)},o=()=>{let i=Object.keys(t);if(i.length===0)return(0,ws.createValidationResult)(!0,[],(0,Xl.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,f=d,b=t[f],y=e[f],h=(0,dv.validateProperty)(f,y,b,r);return h.valid?p.length===0?(0,ws.createValidationResult)(!0,[],(0,Xl.createTreeNode)(r.path,!0,"object",e)):a(p):h};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,dv.validateProperty)(d,e[d],p,r)}),a=(0,i1.combineResults)(i,r.path),c=(0,Xl.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,ws.createValidationResult)(a.valid,a.errors,c)};return(0,o1.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?o():s():n()};Zl.validateObject=a1});var pv=v(rc=>{"use strict";Object.defineProperty(rc,"__esModule",{value:!0});rc.validateArray=void 0;var l1=Kn(),ec=zr(),uv=Jn(),tc=Yn(),c1=_s(),d1=vs(),u1=Ps(),p1=At(),m1=(e,t,r)=>{let n=r.path;if(!Array.isArray(e)){let c=(0,uv.createValidationError)(n,"Array",e,`Expected ${n} (${JSON.stringify(e)}) to be "Array"`),d=(0,tc.createTreeNode)(n,!1,"Array",e);return d.errors=[c],(0,ec.createValidationResult)(!1,[c],d)}let o=(0,p1.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${n}[${d}]`,f={path:p,config:r.config||null};if(o)return(0,d1.validateObject)(c,o,f);let b=t(c,null),y=(0,u1.getExpectedTypeName)(t),h=(0,l1.stringify)(c);if(b)return(0,ec.createValidationResult)(!0,[],(0,tc.createTreeNode)(p,!0,y,c));let u=h.length>200?`Expected ${p} to be "${y}"`:`Expected ${p} (${h}) to be "${y}"`,S=(0,uv.createValidationError)(p,y,c,u),A=(0,tc.createTreeNode)(p,!1,y,c);return A.errors=[S],(0,ec.createValidationResult)(!1,[S],A)}),i=(0,c1.combineResults)(s,n),a=(0,tc.createTreeNode)(n,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,ec.createValidationResult)(i.valid,i.errors,a)};rc.validateArray=m1});var Ql=v(oc=>{"use strict";Object.defineProperty(oc,"__esModule",{value:!0});oc.validateProperty=void 0;var mv=zr(),g1=Jn(),gv=Yn(),f1=Ps(),nc=At(),h1=vs(),y1=pv(),S1=(e,t,r,n)=>{let o=`${n.path}.${e}`,s={path:o,config:n.config||null,...n.parentTree&&{parentTree:n.parentTree}},i=n.config?.errorMode||"multi",a=(0,nc.getTypeGuardSchema)(r),c=(0,nc.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,h1.validateObject)(t,a,s);if(c&&(0,nc.isArrayTypeGuard)(r))return(0,y1.validateArray)(t,c,s)}let d=p=>{let f=r(t,p),b=(0,f1.getExpectedTypeName)(r);return f?(0,mv.createValidationResult)(!0,[],(0,gv.createTreeNode)(o,!0,b,t)):(()=>{let y=(0,g1.createValidationError)(o,b,t,`Expected ${o} (${JSON.stringify(t)}) to be "${b}"`),h=(0,gv.createTreeNode)(o,!1,b,t);return h.errors=[y],(0,mv.createValidationResult)(!1,[y],h)})()};if((0,nc.isNestedObjectTypeGuard)(r)){let p=n.config?{...n.config,identifier:o}:null;return d(p)}return d(null)};oc.validateProperty=S1});var ic=v(sc=>{"use strict";Object.defineProperty(sc,"__esModule",{value:!0});sc.isNil=void 0;var A1=O(),b1=function(e,t){return e!=null?(t&&t.callbackOnError((0,A1.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};sc.isNil=b1});var yg=v(ac=>{"use strict";Object.defineProperty(ac,"__esModule",{value:!0});ac.isDefined=void 0;var P1=O(),_1=ic(),w1=function(e,t){return(0,_1.isNil)(e,null)?(t&&t.callbackOnError((0,P1.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};ac.isDefined=w1});var Sg=v(lc=>{"use strict";Object.defineProperty(lc,"__esModule",{value:!0});lc.reportValidationResults=void 0;var v1=Yl(),fv=yg(),W1=ic(),L1=(e,t)=>{if(e.valid===!0||(0,W1.isNil)(t))return;let r=t.errorMode||"multi",n=(i,a)=>{(0,fv.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,v1.createSimplifiedTree)(a),null,2))},o=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,fv.isDefined)(e.tree)?n(t,e.tree):r==="multi"?o(t):s(t)};lc.reportValidationResults=L1});var Ag=v(Z=>{"use strict";Object.defineProperty(Z,"__esModule",{value:!0});Z.Validation=Z.reportValidationResults=Z.validateObject=Z.validateProperty=Z.createSimplifiedTree=Z.combineResults=Z.createTreeNode=Z.createValidationError=Z.createValidationResult=Z.getExpectedTypeName=void 0;var E1=Ps();Object.defineProperty(Z,"getExpectedTypeName",{enumerable:!0,get:function(){return E1.getExpectedTypeName}});var R1=zr();Object.defineProperty(Z,"createValidationResult",{enumerable:!0,get:function(){return R1.createValidationResult}});var k1=Jn();Object.defineProperty(Z,"createValidationError",{enumerable:!0,get:function(){return k1.createValidationError}});var C1=Yn();Object.defineProperty(Z,"createTreeNode",{enumerable:!0,get:function(){return C1.createTreeNode}});var T1=_s();Object.defineProperty(Z,"combineResults",{enumerable:!0,get:function(){return T1.combineResults}});var x1=Yl();Object.defineProperty(Z,"createSimplifiedTree",{enumerable:!0,get:function(){return x1.createSimplifiedTree}});var I1=Ql();Object.defineProperty(Z,"validateProperty",{enumerable:!0,get:function(){return I1.validateProperty}});var O1=vs();Object.defineProperty(Z,"validateObject",{enumerable:!0,get:function(){return O1.validateObject}});var N1=Sg();Object.defineProperty(Z,"reportValidationResults",{enumerable:!0,get:function(){return N1.reportValidationResults}});var M1=zr(),j1=_s(),D1=Jn(),H1=Yn(),$1=Ql(),F1=vs(),z1=Sg(),U1=Yl();Z.Validation={result:M1.createValidationResult,combine:j1.combineResults,error:D1.createValidationError,treeNode:H1.createTreeNode,property:$1.validateProperty,object:F1.validateObject,report:z1.reportValidationResults,createSimplifiedTree:U1.createSimplifiedTree}});var cc=v(bg=>{"use strict";Object.defineProperty(bg,"__esModule",{value:!0});bg.isType=G1;var hv=pr(),yv=Ag(),B1=At();function G1(e){if(!(0,hv.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,n){let o=n?.errorMode||"multi";if(o==="multi"||o==="json"){let s={path:n?.identifier||"root",config:n||null},i=(0,yv.validateObject)(r,e,s);return(0,yv.reportValidationResults)(i,n||null),i.valid}return(0,hv.isNonNullObject)(r,n)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],n?{...n,identifier:`${n.identifier}.${s}`}:null)}):!1}return(0,B1.attachTypeGuardMeta)(t,{schema:e})}});var Pv=v(Ur=>{"use strict";Object.defineProperty(Ur,"__esModule",{value:!0});Ur.isNestedType=Ur.isShape=void 0;Ur.isSchema=Ws;var Sv=pr(),Av=Ag(),bv=At();function Ws(e){if(!(0,Sv.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=q1(e);function r(n,o){let s=o?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:o?.identifier||"root",config:o||null},a=(0,Av.validateObject)(n,t,i);return(0,Av.reportValidationResults)(a,o||null),a.valid}return(0,Sv.isNonNullObject)(n,o)?Object.keys(t).every(function(i){let a=t[i];return a?a(n[i],o?{...o,identifier:`${o.identifier}.${i}`}:null):!1}):!1}return(0,bv.attachTypeGuardMeta)(r,{schema:t})}function V1(e){return typeof e=="function"?e:Array.isArray(e)?K1(e):typeof e=="object"&&e!==null?Ws(e):e}function q1(e){let t={};for(let[r,n]of Object.entries(e))t[r]=V1(n);return t}function K1(e){let t=e[0],r=Ws(t);function n(o,s){return Array.isArray(o)?o.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,bv.attachTypeGuardMeta)(n,{itemGuard:r})}Ur.isShape=Ws;Ur.isNestedType=Ws});var _v=v(Pg=>{"use strict";Object.defineProperty(Pg,"__esModule",{value:!0});Pg.isObjectWith=Y1;var J1=cc();function Y1(e){return(0,J1.isType)(e)}});var wv=v(_g=>{"use strict";Object.defineProperty(_g,"__esModule",{value:!0});_g.isObject=Z1;var X1=cc();function Z1(e){return(0,X1.isType)(e)}});var vv=v(wg=>{"use strict";Object.defineProperty(wg,"__esModule",{value:!0});wg.guardWithTolerance=Q1;function Q1(e,t,r){return t(e,r),e}});var Wv=v(vg=>{"use strict";Object.defineProperty(vg,"__esModule",{value:!0});vg.isBranded=tz;var ez=O();function tz(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,ez.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var Lv=v(dc=>{"use strict";Object.defineProperty(dc,"__esModule",{value:!0});dc.BrandSymbols=void 0;dc.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var Ev=v(uc=>{"use strict";Object.defineProperty(uc,"__esModule",{value:!0});uc.isAny=void 0;var rz=function(e){return!0};uc.isAny=rz});var Ls=v(Wg=>{"use strict";Object.defineProperty(Wg,"__esModule",{value:!0});Wg.reportTypeGuardError=oz;var nz=O();function oz(e,t,r){e&&e.callbackOnError((0,nz.generateTypeGuardError)(t,e.identifier,r))}});var Rv=v(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.isBoolean=void 0;var sz=Ls(),iz=function(t,r){return typeof t!="boolean"?((0,sz.reportTypeGuardError)(r,t,"boolean"),!1):!0};pc.isBoolean=iz});var kv=v(mc=>{"use strict";Object.defineProperty(mc,"__esModule",{value:!0});mc.isDate=void 0;var az=O(),lz=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,az.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};mc.isDate=lz});var Lg=v(gc=>{"use strict";Object.defineProperty(gc,"__esModule",{value:!0});gc.isNumber=void 0;var cz=Ls(),dz=function(t,r){return typeof t!="number"||isNaN(t)?((0,cz.reportTypeGuardError)(r,t,"number"),!1):!0};gc.isNumber=dz});var Cv=v(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.isString=void 0;var uz=Ls(),pz=function(t,r){return typeof t!="string"?((0,uz.reportTypeGuardError)(r,t,"string"),!1):!0};fc.isString=pz});var Tv=v(hc=>{"use strict";Object.defineProperty(hc,"__esModule",{value:!0});hc.isUnknown=void 0;var mz=function(e){return!0};hc.isUnknown=mz});var xv=v(yc=>{"use strict";Object.defineProperty(yc,"__esModule",{value:!0});yc.isFunction=void 0;var gz=O(),fz=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,gz.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};yc.isFunction=fz});var Ov=v(Sc=>{"use strict";Object.defineProperty(Sc,"__esModule",{value:!0});Sc.isFile=void 0;var Iv=O(),hz=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,Iv.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,Iv.generateTypeGuardError)(e,t.identifier,"File")),!1)};Sc.isFile=hz});var Mv=v(Ac=>{"use strict";Object.defineProperty(Ac,"__esModule",{value:!0});Ac.isFileList=void 0;var Nv=O(),yz=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,Nv.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,Nv.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Ac.isFileList=yz});var Dv=v(bc=>{"use strict";Object.defineProperty(bc,"__esModule",{value:!0});bc.isBlob=void 0;var jv=O(),Sz=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,jv.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,jv.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};bc.isBlob=Sz});var $v=v(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.isFormData=void 0;var Hv=O(),Az=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,Hv.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,Hv.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Pc.isFormData=Az});var zv=v(_c=>{"use strict";Object.defineProperty(_c,"__esModule",{value:!0});_c.isURL=void 0;var Fv=O(),bz=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,Fv.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,Fv.generateTypeGuardError)(e,t.identifier,"URL")),!1)};_c.isURL=bz});var Bv=v(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.isURLSearchParams=void 0;var Uv=O(),Pz=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,Uv.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,Uv.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};wc.isURLSearchParams=Pz});var Gv=v(vc=>{"use strict";Object.defineProperty(vc,"__esModule",{value:!0});vc.isMap=void 0;var _z=O(),wz=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,_z.generateTypeGuardError)(e,t.identifier,"Map")),!1)};vc.isMap=wz});var Vv=v(Wc=>{"use strict";Object.defineProperty(Wc,"__esModule",{value:!0});Wc.isSet=void 0;var vz=O(),Wz=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,vz.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Wc.isSet=Wz});var qv=v(Eg=>{"use strict";Object.defineProperty(Eg,"__esModule",{value:!0});Eg.isIndexSignature=Ez;var Lz=O();function Ez(e,t){return function(r,n){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return n&&n.callbackOnError((0,Lz.generateTypeGuardError)(r,n.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let f=s[d],b=e(d,n?{...n,identifier:`${n.identifier}[key:${p}]`}:null),y=t(f,n?{...n,identifier:`${n.identifier}[value:${p}]`}:null);return b&&y})}}});var Kv=v(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.isError=void 0;var Rz=Ls(),kz=function(t,r){return t instanceof Error?!0:((0,Rz.reportTypeGuardError)(r,t,"Error"),!1)};Lc.isError=kz});var kg=v(Rg=>{"use strict";Object.defineProperty(Rg,"__esModule",{value:!0});Rg.isArrayWithEachItem=xz;var Cz=O(),Tz=At();function xz(e){let t=function(r,n){return Array.isArray(r)?r.every((o,s)=>e(o,n?{...n,identifier:`${n.identifier}[${s}]`}:null)):(n&&n.callbackOnError((0,Cz.generateTypeGuardError)(r,n.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,Tz.attachTypeGuardMeta)(t,{itemGuard:e})}});var Cg=v(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.isNonEmptyArray=void 0;var Iz=O(),Oz=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,Iz.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Ec.isNonEmptyArray=Oz});var Jv=v(Tg=>{"use strict";Object.defineProperty(Tg,"__esModule",{value:!0});Tg.isNonEmptyArrayWithEachItem=jz;var Nz=kg(),Mz=Cg();function jz(e){return function(t,r){return(0,Nz.isArrayWithEachItem)(e)(t,r)&&(0,Mz.isNonEmptyArray)(t,r)}}});var Xv=v(xg=>{"use strict";Object.defineProperty(xg,"__esModule",{value:!0});xg.isTuple=Dz;var Yv=O();function Dz(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,Yv.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((n,o)=>n(t[o],r?{...r,identifier:`${r.identifier}[${o}]`}:null)):(r&&r.callbackOnError((0,Yv.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var Zv=v(Ig=>{"use strict";Object.defineProperty(Ig,"__esModule",{value:!0});Ig.isObjectWithEachItem=$z;var Hz=O();function $z(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,Hz.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var Qv=v(Og=>{"use strict";Object.defineProperty(Og,"__esModule",{value:!0});Og.isPartialOf=zz;var Fz=pr();function zz(e){return function(t,r){if(!(0,Fz.isNonNullObject)(t,r))return!1;for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&Object.prototype.hasOwnProperty.call(t,n)){let o=e[n],s=t[n];if(o&&!o(s,r?{...r,identifier:`${r.identifier}.${n}`}:null))return!1}return!0}}});var eW=v(Ng=>{"use strict";Object.defineProperty(Ng,"__esModule",{value:!0});Ng.isPick=Bz;var Uz=pr();function Bz(e,...t){return function(r,n){if(!(0,Uz.isNonNullObject)(r,n))return!1;for(let o of t)if(!Object.prototype.hasOwnProperty.call(r,o))return n&&e(r,n),!1;return!0}}});var tW=v(Mg=>{"use strict";Object.defineProperty(Mg,"__esModule",{value:!0});Mg.isOmit=Vz;var Gz=pr();function Vz(e,...t){return function(r,n){if(!(0,Gz.isNonNullObject)(r,n))return!1;let o=[],s=n?.identifier||"root",i=n?{...n,callbackOnError:d=>o.push(d)}:{identifier:s,callbackOnError:d=>o.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=o.filter(d=>{let p=d.slice(9),f=p.indexOf(" ("),b=f>=0?p.slice(0,f):p;if(a.has(b))return!1;let y=b.startsWith(s+".")&&b.slice(s.length+1).split(".")[0]||"";return!(y&&!Object.prototype.hasOwnProperty.call(r,y))});if(n&&c.length>0)for(let d of c)n.callbackOnError(d);return c.length===0}}});var rW=v(Rc=>{"use strict";Object.defineProperty(Rc,"__esModule",{value:!0});Rc.isNonEmptyString=void 0;var qz=O(),Kz=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,qz.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Rc.isNonEmptyString=Kz});var nW=v(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.isNonNegativeNumber=void 0;var Jz=O(),Yz=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,Jz.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};kc.isNonNegativeNumber=Yz});var oW=v(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.isPositiveNumber=void 0;var Xz=O(),Zz=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,Xz.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Cc.isPositiveNumber=Zz});var sW=v(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.isNonPositiveNumber=void 0;var Qz=O(),eU=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,Qz.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Tc.isNonPositiveNumber=eU});var iW=v(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.isNegativeNumber=void 0;var tU=O(),rU=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,tU.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};xc.isNegativeNumber=rU});var aW=v(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.isInteger=void 0;var nU=O(),oU=Lg(),sU=function(e,t){return!(0,oU.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,nU.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Ic.isInteger=sU});var lW=v(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.isPositiveInteger=void 0;var iU=O(),aU=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,iU.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Oc.isPositiveInteger=aU});var cW=v(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.isNegativeInteger=void 0;var lU=O(),cU=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,lU.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Nc.isNegativeInteger=cU});var dW=v(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.isNonNegativeInteger=void 0;var dU=O(),uU=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,dU.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Mc.isNonNegativeInteger=uU});var uW=v(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.isNonPositiveInteger=void 0;var pU=O(),mU=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,pU.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};jc.isNonPositiveInteger=mU});var pW=v(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.isNumeric=void 0;var Dc=O(),gU=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Dc.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Dc.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Dc.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Dc.generateTypeGuardError)(e,t.identifier,"number key")),!1};Hc.isNumeric=gU});var mW=v($c=>{"use strict";Object.defineProperty($c,"__esModule",{value:!0});$c.isBooleanLike=void 0;var jg=O(),fU=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,jg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,jg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};$c.isBooleanLike=fU});var gW=v(Fc=>{"use strict";Object.defineProperty(Fc,"__esModule",{value:!0});Fc.isDateLike=void 0;var Es=O(),hU=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Es.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Es.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Es.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Es.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Es.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Fc.isDateLike=hU});var fW=v(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.isBigInt=void 0;var yU=O(),SU=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,yU.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};zc.isBigInt=SU});var Hg=v(Dg=>{"use strict";Object.defineProperty(Dg,"__esModule",{value:!0});Dg.isOneOf=AU;var hW=Kn();function AU(...e){return function(t,r){let n=e.some(function(o){return t===o});return!n&&r&&r.callbackOnError(`${r.identifier} (${(0,hW.stringify)(t)}) must be one of following values ${e.map(hW.stringify).join(" | ")}`),n}}});var yW=v($g=>{"use strict";Object.defineProperty($g,"__esModule",{value:!0});$g.isOneOfTypes=_U;var bU=Kn(),PU=Ps();function _U(...e){return function(t,r){let n=e.map(s=>({typeGuard:s,isValid:s(t,null)})),o=n.some(s=>s.isValid);if(!o&&r){let s=(0,bU.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,PU.getTypeGuardDisplayName)(c)).join(" | ")}"`];n.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return o}}});var SW=v(Fg=>{"use strict";Object.defineProperty(Fg,"__esModule",{value:!0});Fg.isIntersectionOf=wU;function wU(...e){return function(t,r){for(let n of e)if(!n(t,r))return!1;return!0}}});var AW=v(zg=>{"use strict";Object.defineProperty(zg,"__esModule",{value:!0});zg.isExtensionOf=vU;function vU(e,t){return function(r,n){return e(r,n)?t(r,n):!1}}});var bW=v(Ug=>{"use strict";Object.defineProperty(Ug,"__esModule",{value:!0});Ug.isNullOr=LU;var WU=At();function LU(e){function t(r,n){return r===null?!0:e(r,n)}return(0,WU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var PW=v(Bg=>{"use strict";Object.defineProperty(Bg,"__esModule",{value:!0});Bg.isUndefinedOr=RU;var EU=At();function RU(e){function t(r,n){return r===void 0?!0:e(r,n)}return(0,EU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var _W=v(Gg=>{"use strict";Object.defineProperty(Gg,"__esModule",{value:!0});Gg.isNilOr=CU;var kU=At();function CU(e){function t(r,n){return r==null?!0:e(r,n)}return(0,kU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var wW=v(Vg=>{"use strict";Object.defineProperty(Vg,"__esModule",{value:!0});Vg.isAsserted=TU;function TU(e){return!0}});var vW=v(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.isEnum=IU;var xU=Hg();function IU(e){return function(t,r){return(0,xU.isOneOf)(...Object.values(e))(t,r)}}});var WW=v(Kg=>{"use strict";Object.defineProperty(Kg,"__esModule",{value:!0});Kg.isEqualTo=MU;var OU=O(),NU=Kn();function MU(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,OU.generateTypeGuardError)(t,r.identifier,`equal to ${(0,NU.stringify)(e)}`)),!1):!0}}});var LW=v(Uc=>{"use strict";Object.defineProperty(Uc,"__esModule",{value:!0});Uc.isRegex=void 0;var jU=O(),DU=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,jU.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Uc.isRegex=DU});var RW=v(Jg=>{"use strict";Object.defineProperty(Jg,"__esModule",{value:!0});Jg.isPattern=HU;var EW=O();function HU(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,n){return typeof r!="string"?(n&&n.callbackOnError((0,EW.generateTypeGuardError)(r,n.identifier,"string")),!1):t.test(r)?!0:(n&&n.callbackOnError((0,EW.generateTypeGuardError)(r,n.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var kW=v(Yg=>{"use strict";Object.defineProperty(Yg,"__esModule",{value:!0});Yg.by=$U;function $U(e){return function(t){return e(t,null)}}});var CW=v(Xg=>{"use strict";Object.defineProperty(Xg,"__esModule",{value:!0});Xg.toNumber=FU;function FU(e){return typeof e=="number"?e:Number(e)}});var TW=v(Zg=>{"use strict";Object.defineProperty(Zg,"__esModule",{value:!0});Zg.toDate=zU;function zU(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var xW=v(Qg=>{"use strict";Object.defineProperty(Qg,"__esModule",{value:!0});Qg.toBoolean=UU;function UU(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var IW=v(Bc=>{"use strict";Object.defineProperty(Bc,"__esModule",{value:!0});Bc.isSymbol=void 0;var BU=O(),GU=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,BU.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Bc.isSymbol=GU});var Rs=v(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var VU=cc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return VU.isType}});var ef=Pv();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return ef.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return ef.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return ef.isNestedType}});var qU=_v();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return qU.isObjectWith}});var KU=wv();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return KU.isObject}});var JU=vv();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return JU.guardWithTolerance}});var YU=Wv();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return YU.isBranded}});var XU=Lv();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return XU.BrandSymbols}});var ZU=Ev();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return ZU.isAny}});var QU=Rv();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return QU.isBoolean}});var eB=kv();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return eB.isDate}});var tB=yg();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return tB.isDefined}});var rB=ic();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return rB.isNil}});var nB=Lg();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return nB.isNumber}});var oB=Cv();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return oB.isString}});var sB=Tv();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return sB.isUnknown}});var iB=xv();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return iB.isFunction}});var aB=Ov();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return aB.isFile}});var lB=Mv();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return lB.isFileList}});var cB=Dv();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return cB.isBlob}});var dB=$v();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return dB.isFormData}});var uB=zv();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return uB.isURL}});var pB=Bv();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return pB.isURLSearchParams}});var mB=Gv();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return mB.isMap}});var gB=Vv();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return gB.isSet}});var fB=qv();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return fB.isIndexSignature}});var hB=Kv();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return hB.isError}});var yB=kg();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return yB.isArrayWithEachItem}});var SB=Cg();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return SB.isNonEmptyArray}});var AB=Jv();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return AB.isNonEmptyArrayWithEachItem}});var bB=Xv();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return bB.isTuple}});var PB=pr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return PB.isNonNullObject}});var _B=Zv();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return _B.isObjectWithEachItem}});var wB=Qv();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return wB.isPartialOf}});var vB=eW();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return vB.isPick}});var WB=tW();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return WB.isOmit}});var LB=rW();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return LB.isNonEmptyString}});var EB=nW();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return EB.isNonNegativeNumber}});var RB=oW();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return RB.isPositiveNumber}});var kB=sW();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return kB.isNonPositiveNumber}});var CB=iW();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return CB.isNegativeNumber}});var TB=aW();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return TB.isInteger}});var xB=lW();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return xB.isPositiveInteger}});var IB=cW();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return IB.isNegativeInteger}});var OB=dW();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return OB.isNonNegativeInteger}});var NB=uW();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return NB.isNonPositiveInteger}});var MB=pW();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return MB.isNumeric}});var jB=mW();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return jB.isBooleanLike}});var DB=gW();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return DB.isDateLike}});var HB=fW();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return HB.isBigInt}});var $B=Hg();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return $B.isOneOf}});var FB=yW();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return FB.isOneOfTypes}});var zB=SW();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return zB.isIntersectionOf}});var UB=AW();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return UB.isExtensionOf}});var BB=bW();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return BB.isNullOr}});var GB=PW();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return GB.isUndefinedOr}});var VB=_W();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return VB.isNilOr}});var qB=wW();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return qB.isAsserted}});var KB=vW();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return KB.isEnum}});var JB=WW();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return JB.isEqualTo}});var YB=LW();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return YB.isRegex}});var XB=RW();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return XB.isPattern}});var ZB=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return ZB.generateTypeGuardError}});var QB=kW();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return QB.by}});var eG=CW();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return eG.toNumber}});var tG=TW();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return tG.toDate}});var rG=xW();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return rG.toBoolean}});var nG=IW();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return nG.isSymbol}})});var ks,OW,NW,Br,tf,P7,MW,Gc,Gr,Cs,rf,nf,of,sf,Dt,af,Vc,qc,Kc,Ts,rt,Xn,Zn,Jc,mr,lf,jW,bt=l(()=>{"use strict";ks={production:".agent-witch",localhost:".local-agent-witch"},OW={production:47892,localhost:47893},NW={production:"com.agent-witch",localhost:"com.local-agent-witch"},Br={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},tf="app",P7=`${tf}/agent-witch.js`,MW=`${tf}/command`,Gc={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Gr=ks.production,Cs=ks.localhost,rf=OW.production,nf=OW.localhost,of=NW.production,sf=NW.localhost,Dt="profiles",af=Br.activeProfile,Vc="harness",qc="sets",Kc="manifest.json",Ts=Gc.projectsDir,rt=Gc.logsDir,Xn="agent-witch.log",Zn="agent-witch.error.log",Jc=Gc.reportsDir,mr=Gc.deviceKeypairJson,lf=tf,jW="agent-witch.js"});var Yc,DW,sG,oG,HW,$W=l(()=>{"use strict";Yc=m(require("node:path")),DW=require("node:url"),sG={},oG=()=>!0,HW=()=>{if(oG()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Yc.default.dirname(Yc.default.resolve(e))}return Yc.default.dirname((0,DW.fileURLToPath)(sG.url))}});var cf,FW,M,zW,iG,gr,L,Xc,Ht,UW,Zc,Qn,Qc,ed,te,nt,df,ot,uf,N,pf=l(()=>{"use strict";cf=m(require("node:fs")),FW=m(require("node:os")),M=m(require("node:path")),zW=m(Rs());bt();$W();iG=HW(),gr=e=>e.trim().toLowerCase(),L=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return M.default.resolve(e);let t=M.default.resolve(iG),r=M.default.basename(t),n=M.default.basename(M.default.dirname(t));return r===lf&&(n===Gr||n===Cs)?M.default.dirname(t):r===Gr||r===Cs?t:M.default.join(FW.default.homedir(),Gr)},Xc=(e=L())=>M.default.join(e,lf),Ht=(e=L())=>M.default.join(Xc(e),jW),UW=(e,t,r)=>t!==null?M.default.join(e,Dt,t,r):M.default.join(e,r),Zc=e=>UW(e.installDir,e.profileEmail,Ts),Qn=e=>UW(e.installDir,e.profileEmail,rt),Qc=e=>e.profileEmail!==null?M.default.join(e.installDir,Dt,e.profileEmail,mr):M.default.join(e.installDir,mr),ed=e=>M.default.basename(e)===Cs,te=(e=L())=>ed(e)?sf:of,nt=(e=L())=>ed(e)?nf:rf,df=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return gr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?gr(t):null},ot=(e=L())=>{let t=M.default.join(e,af);if(!cf.default.existsSync(t))return null;try{let r=JSON.parse(cf.default.readFileSync(t,"utf8"));if((0,zW.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return gr(r.email)}catch{return null}return null},uf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?gr(r):null}let t=df();return t!==null?t:ot()},N=e=>{let t=L(),r=Xc(t),n=Ht(t),o=uf(e);if(o!==null){let b=M.default.join(t,Dt,o),y=M.default.join(b,Vc),h=M.default.join(b,Ts),u=M.default.join(b,rt),S=M.default.join(b,Jc),A=M.default.join(b,mr),g=M.default.join(b,rt,Xn),_=M.default.join(b,rt,Zn);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:h,logsDir:u,mainLogPath:g,errorLogPath:_,reportsDir:S,deviceKeypairPath:A,configPath:M.default.join(b,"config.json"),harnessRootDir:y,harnessManifestPath:M.default.join(y,Kc),harnessSetsDir:M.default.join(y,qc)}}let s=M.default.join(t,Vc),i=M.default.join(t,Ts),a=M.default.join(t,rt),c=M.default.join(t,Jc),d=M.default.join(t,mr),p=M.default.join(t,rt,Xn),f=M.default.join(t,rt,Zn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:f,reportsDir:c,deviceKeypairPath:d,configPath:M.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:M.default.join(s,Kc),harnessSetsDir:M.default.join(s,qc)}}});var mf,BW,aG,lG,GW,gf,VW=l(()=>{"use strict";mf=m(require("node:fs")),BW=m(require("node:path"));bt();pf();aG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lG=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,GW=e=>{let t=BW.default.join(e,Br.wakePort);if(!mf.default.existsSync(t))return null;try{let r=JSON.parse(mf.default.readFileSync(t,"utf8"));if(aG(r)&&lG(r.wakePort))return r.wakePort}catch{return null}return null},gf=(e=L())=>GW(e)??nt(e)});var B=l(()=>{"use strict";pf();VW()});var xs,mG,gG,qW,fG,hG,KW=l(()=>{"use strict";B();xs=te(),mG=`${xs}-wake`,gG=`${xs}-live`,qW=`${xs}-watchdog`,fG=`${xs}-automation-scheduler`,hG=`${xs}-updater`});var ff,hf,td=l(()=>{"use strict";ff=new Set(["","loginwindow","_mbsetupuser","root"]),hf=5e3});var JW,yG,YW,yf,Sf=l(()=>{"use strict";JW=require("node:child_process");td();yG=e=>e.trim().toLowerCase(),YW=e=>e==null?!1:!ff.has(yG(e)),yf=()=>{if(process.platform!=="darwin")return null;try{let t=(0,JW.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return YW(t)?t:null}catch{return null}}});var ZW,XW,st,Is=l(()=>{"use strict";ZW=m(require("node:os"));Sf();XW=e=>e.trim().toLowerCase(),st=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?yf():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??ZW.default.userInfo().username;return XW(r)===XW(n)}});var QW,eL,Vr,tL=l(()=>{"use strict";QW=require("node:child_process"),eL=m(require("node:fs"));B();Is();Vr=(e=L())=>{let t=Ht(e);if(!eL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!st())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=ot(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,QW.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var rL,Os,rd=l(()=>{"use strict";rL=require("node:child_process"),Os=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,rL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var nd,Af,nL,Q,od,Ns=l(()=>{"use strict";nd=m(require("node:fs")),Af=m(require("node:path"));B();bt();nL=e=>{let t=Af.default.join(e,Dt);return nd.default.existsSync(t)?nd.default.readdirSync(t).filter(r=>nd.default.statSync(Af.default.join(t,r)).isDirectory()).map(r=>gr(r)).toSorted():[]},Q=(e=L())=>{let t=te(e);return[{profileEmail:nL(e)[0]??null,launchAgentLabel:t}]},od=(e=L())=>nL(e)});var bf,oL,sL,SG,$t,sd=l(()=>{"use strict";bf=m(require("node:fs")),oL=m(require("node:os")),sL=m(require("node:path"));B();Ns();SG=()=>sL.default.join(oL.default.homedir(),"Library","LaunchAgents"),$t=(e=L())=>{let t=te(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of Q(e))r.add(o.launchAgentLabel);let n=SG();if(bf.default.existsSync(n))for(let o of bf.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var iL,Ms,aL=l(()=>{"use strict";B();rd();sd();Ns();iL=(e=L())=>{let t=new Set(Q(e).map(r=>r.launchAgentLabel));return $t(e).filter(r=>!t.has(r))},Ms=(e=L())=>{for(let t of iL(e))Os(t)}});var js,Pf=l(()=>{"use strict";B();rd();sd();js=(e=L())=>{for(let t of $t(e))Os(t)}});var lL,cL,AG,qr,dL=l(()=>{"use strict";lL=require("node:child_process"),cL=require("node:util"),AG=(0,cL.promisify)(lL.execFile),qr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await AG("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Kr,bG,_f,wf=l(()=>{"use strict";Kr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bG=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,_f=e=>{let t=e.pathValue??bG(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
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
`}});var id,vf=l(()=>{"use strict";id=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Jr,Wf,Ds,PG,_G,wG,uL,Ft,Lf=l(()=>{"use strict";Jr=m(require("node:fs")),Wf=m(require("node:os")),Ds=m(require("node:path"));bt();B();wf();vf();PG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_G=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,wG=e=>{let t=Ds.default.join(e,Br.wakePort);if(!Jr.default.existsSync(t))return nt(e);try{let r=JSON.parse(Jr.default.readFileSync(t,"utf8"));if(PG(r)&&_G(r.wakePort))return r.wakePort}catch{return nt(e)}return nt(e)},uL=(e,t=Wf.default.homedir())=>Ds.default.join(t,"Library","LaunchAgents",`${e}.plist`),Ft=e=>{let t=e.installDir??L(),r=e.homeDir??Wf.default.homedir(),n=uL(e.launchAgentLabel,r),o=Jr.default.existsSync(n)?Jr.default.readFileSync(n,"utf8"):null;if(o!==null&&id(o))return{ok:!0,rewritten:!1,plistPath:n};let s=_f({launchAgentLabel:e.launchAgentLabel,runPath:Ds.default.join(t,MW,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??wG(t)});if(!id(s))return{ok:!1,rewritten:!1,plistPath:n,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Jr.default.mkdirSync(Ds.default.dirname(n),{recursive:!0}),Jr.default.writeFileSync(n,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:n,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:n}}});var mL,gL,fL,Hs,vG,WG,pL,_e,Ef=l(()=>{"use strict";mL=require("node:child_process"),gL=m(require("node:fs")),fL=require("node:util");B();Lf();Is();Hs=(0,fL.promisify)(mL.execFile),vG=async e=>{try{return await Hs("launchctl",["print",e]),!0}catch{return!1}},WG=async(e,t,r)=>{await vG(t)&&await Hs("launchctl",["bootout",t]).catch(()=>{}),await Hs("launchctl",["bootstrap",e,r]),await Hs("launchctl",["enable",t])},pL=async e=>{try{return await Hs("launchctl",["kickstart","-k",e]),!0}catch{return!1}},_e=async(e,t=L())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!st())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let n=`gui/${r}`,o=`${n}/${e}`,s=Ft({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await pL(o))return{ok:!0};let i=s.plistPath;if(!gL.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await WG(n,o,i),await pL(o)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Yr,hL=l(()=>{"use strict";B();Ef();Ns();Yr=async(e=L())=>{let t=[];for(let r of Q(e))(await _e(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var $e,zt,yL=l(()=>{"use strict";Pf();Is();td();$e=e=>{st()||(js(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},zt=(e,t=hf)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{st()||e()},t);return()=>{clearInterval(r)}}});var ee=l(()=>{"use strict";KW();tL();rd();aL();Pf();sd();Is();dL();hL();Ef();Lf();vf();wf();Ns();Sf();td();yL()});var Rf=l(()=>{"use strict";ee()});var SL,AL,ad,bL,eo,PL,_L,Xr=l(()=>{"use strict";SL=".agent-witch",AL="memory",ad="project.json",bL="chunks.ndjson",eo="runs.ndjson",PL="reports",_L=".json"});var wL=l(()=>{"use strict";Xr()});var vL,ld,kf=l(()=>{"use strict";vL=m(require("node:path"));wL();ld=(e,t)=>vL.default.join(e.trim(),`${t.trim()}${_L}`)});var $s,WL,LL=l(()=>{"use strict";$s="agent-witch.js",WL="command"});var cd=l(()=>{"use strict";LL()});var Zr,EL,RL=l(()=>{"use strict";cd();Zr=e=>`'${e.replace(/'/g,"'\\''")}'`,EL=e=>{let t=`${e.installDir.trim()}/${"app"}/${$s}`,r=[Zr("node"),Zr(t),"report","write","--key",Zr(e.reportKey.trim()),"--agent-run-id",Zr(e.agentRunId.trim()),"--status",Zr(e.status),"--summary",Zr(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Zr(e.details.trim())),r.join(" ")}});var Pt,kL,LG,Cf,dd=l(()=>{"use strict";kf();RL();Pt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},kL=e=>e===Pt.COMPLETED||e===Pt.FAILED,LG=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Cf=(e,t)=>{let r=ld(t.reportsDir,t.reportKey),n=EL({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Pt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${LG({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var we=l(()=>{"use strict";bt();B()});var zs,TL,CL,xL,EG,to,RG,IL,Us,Bs,Tf,OL,NL,Gs=l(()=>{"use strict";zs=m(require("node:fs")),TL=m(require("node:path"));dd();kf();we();CL=50,xL=e=>{let t=N(),r=ld(t.reportsDir,e);return zs.default.mkdirSync(TL.default.dirname(r),{recursive:!0}),r},EG=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},to=e=>{let t=xL(e);if(!zs.default.existsSync(t))return null;try{let r=JSON.parse(zs.default.readFileSync(t,"utf8"));return EG(r)?r:null}catch{return null}},RG=(e,t)=>{let r=[...e,t];return r.length>CL?r.slice(r.length-CL):r},IL=e=>{let t=xL(e.reportKey);zs.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Us=e=>{let t=to(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:RG(t?.history??[],n)};return IL(o),o},Bs=e=>{let t=to(e.reportKey);return t!==null?t:Us({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Pt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Tf=(e,t)=>{let r=t.trim();if(r.length===0)return to(e);let n=to(e);if(n===null)return null;let o=n.details!==void 0&&n.details.trim().length>0?`${n.details.trim()}
${r}`:r,s={...n,updatedAt:new Date().toISOString(),details:o};return IL(s),s},OL=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},NL=e=>{if(e===null||!kL(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Pt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var kG,CG,Vs,ML,ud,xf=l(()=>{"use strict";dd();Gs();kG=new Set(Object.values(Pt)),CG=e=>kG.has(e),Vs=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},ML=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},ud=e=>{if(e[0]!=="write")return ML(),1;let r=Vs(e,"--key"),n=Vs(e,"--agent-run-id"),o=Vs(e,"--status"),s=Vs(e,"--summary"),i=Vs(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!CG(o)?(ML(),1):(Us({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var it,ro=l(()=>{"use strict";it=()=>!0});var If,jL,Qr,pd=l(()=>{"use strict";If=m(require("node:path")),jL=require("node:url");ro();Qr=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=If.default.resolve(t);return it()?r===If.default.resolve(__filename):r===(0,jL.fileURLToPath)(e)}});var md,no,IG,_Y,oo=l(()=>{"use strict";md="agent-witch.js",no="deps.tar.gz",IG="install.sh",_Y={mainScript:`app/${md}`,depsArchive:`app/${no}`,installShell:IG}});var FL=l(()=>{"use strict";oo()});var zL=l(()=>{"use strict";oo();FL()});var qs,Nf,gd,OG,Ks,ve,io,Js,Ys,en,Mf=l(()=>{"use strict";qs=m(require("node:fs")),Nf=m(require("node:path"));zL();B();gd="install-version.json",OG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ks=(e=L())=>Nf.default.join(e,gd),ve=(e=L())=>{let t=Ks(e);if(!qs.default.existsSync(t))return null;try{let r=JSON.parse(qs.default.readFileSync(t,"utf8"));return!OG(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},io=(e,t=L())=>{let r=Ks(t);qs.default.mkdirSync(Nf.default.dirname(r),{recursive:!0}),qs.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Js=(e=L())=>ve(e)?.bundleVersion??"194",Ys=(e,t)=>{let r=ve(e);if(r!==null)return r;let n={bundleVersion:"194",appOrigin:t,updatedAt:new Date().toISOString()};return io(n,e),n},en=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var UL,tn,jf,Df,Hf,fd,_t,rn,$f=l(()=>{"use strict";UL=require("node:crypto"),tn=m(require("node:fs")),jf=m(require("node:path"));B();Df="self-update-log.ndjson",Hf=100,fd=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Qn({installDir:e,profileEmail:t.profileEmail});return jf.default.join(r,Df)},_t=(e,t=L())=>{let r={id:(0,UL.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=fd(t);tn.default.mkdirSync(jf.default.dirname(n),{recursive:!0});let o=tn.default.existsSync(n)?tn.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Hf+1)),JSON.stringify(r)];return tn.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},rn=(e=20,t=L())=>{let r=fd(t);if(!tn.default.existsSync(r))return[];let n=tn.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var Ff,HY,zf=l(()=>{"use strict";oo();Ff="deps",HY=`${"app"}/${no}`});var BL=l(()=>{"use strict";zf()});var GL,fr,nn,VL,Uf,Bf,qL=l(()=>{"use strict";GL=require("node:child_process"),fr=m(require("node:fs")),nn=m(require("node:path"));oo();zf();VL=e=>nn.default.join(e,"app",Ff),Uf=e=>{let t=nn.default.join(e,"app"),r=nn.default.join(t,no);fr.default.existsSync(r)&&(fr.default.rmSync(VL(e),{recursive:!0,force:!0}),fr.default.mkdirSync(t,{recursive:!0}),(0,GL.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),fr.default.rmSync(r,{force:!0}))},Bf=e=>{fr.default.rmSync(nn.default.join(e,"node_modules"),{recursive:!0,force:!0}),fr.default.rmSync(nn.default.join(e,"package.json"),{force:!0}),fr.default.rmSync(nn.default.join(e,"package-lock.json"),{force:!0})}});var KL=l(()=>{"use strict";BL();qL()});var Ut,hd,JL=l(()=>{"use strict";Ut="https://www.agentwitch.com",hd="wss://www.agentwitch.com/api/agent-witch/ws"});var Xs,Bt,YL=l(()=>{"use strict";Xs="127.0.0.1",Bt=`http://${Xs}:43347`});var Gt=l(()=>{"use strict";JL();YL()});var Zs,yd,XL,Vf,NG,ZL,Jf,QL,at,Qs,ei,Yf,qf,Kf,ti,Xf,Zf,Qf,ao=l(()=>{"use strict";Zs=m(require("node:fs")),yd=m(require("node:path")),XL="active-writer-work.json",Vf=new Set,NG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ZL=e=>e.profileEmail===null?yd.default.join(e.installDir,XL):yd.default.join(e.installDir,"profiles",e.profileEmail,XL),Jf=e=>{let t=ZL(e);if(!Zs.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Zs.default.readFileSync(t,"utf8"));return!NG(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},QL=(e,t)=>{let r=ZL(e);Zs.default.mkdirSync(yd.default.dirname(r),{recursive:!0}),Zs.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},at=e=>Jf(e).activeCount>0,Qs=e=>{let t=Jf(e);QL(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},ei=e=>{let t=Jf(e),r=Math.max(0,t.activeCount-1);if(QL(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let n of Vf)n()},Yf=e=>(Vf.add(e),()=>{Vf.delete(e)}),qf=null,Kf=null,ti=e=>{qf=e},Xf=e=>{Kf=e},Zf=()=>{let e=qf;return qf=null,e},Qf=()=>{let e=Kf;return Kf=null,e}});var We,eh=l(()=>{"use strict";We=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var lo,Sd,ri,th=l(()=>{"use strict";lo="qwen2.5:7b",Sd="nomic-embed-text",ri="Install Ollama from https://ollama.com/download"});var ni,eE,rh=l(()=>{"use strict";th();ni=()=>`
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
  agent_witch_ensure_ollama_model "${Sd}" "\${pull_log}"
}
`,eE=()=>`
${ni()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var tE,MG,Ad,nh=l(()=>{"use strict";tE=require("node:child_process");B();rh();MG=e=>new Promise(t=>{let r=(0,tE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:L()}}),n=[];r.stdout.on("data",o=>{n.push(o)}),r.stderr.on("data",o=>{n.push(o)}),r.on("error",o=>{t({exitCode:1,output:o.message})}),r.on("close",o=>{t({exitCode:o??1,output:Buffer.concat(n).toString("utf8").trim()})})}),Ad=async(e=MG)=>{let t=`${ni()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var hr,bd,rE,jG,nE,uo,DG,HG,$G,co,on,sn,oE=l(()=>{"use strict";hr=m(require("node:fs")),bd=m(require("node:path"));KL();ee();B();oo();Gt();Mf();ao();eh();$f();nh();rE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jG=e=>{let t=ot(e),r=t===null?N():N(t);if(!hr.default.existsSync(r.configPath))return null;try{let n=JSON.parse(hr.default.readFileSync(r.configPath,"utf8"));return!rE(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},nE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!rE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},uo=async e=>(await nE(e))?.bundleVersion??null,DG=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=bd.default.join(t,r);hr.default.mkdirSync(bd.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());hr.default.writeFileSync(o,s),r.endsWith(".js")&&hr.default.chmodSync(o,493)},HG=async()=>{Ms(),await Yr()},$G=(e,t)=>e!==null?We(e):t??Ut,co=(e,t)=>({localBundleVersion:t,...e}),on=async e=>{let t=L(),r=ve(t),n=r?.bundleVersion??null,o=await Ad();_t({event:"check_complete",ok:o.ok,message:o.message,localBundleVersion:n,remoteBundleVersion:null});let s=jG(t),i=$G(s,r?.appOrigin);if(i===null){let d=co({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return _t({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}let a=await nE(i);if(a===null){let d=co({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return _t({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}if(!(e?.force===!0||en(n,a.bundleVersion))){let d=co({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},n);return _t({event:"check_complete",ok:!0,message:d.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),d}try{for(let b of a.scripts)await DG(i,t,b);let d=bd.default.join(t,md);hr.default.existsSync(d)&&hr.default.rmSync(d,{force:!0}),Uf(t),Bf(t),io({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=N(ot(t));if(at(p)){let b=co({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return _t({event:"update_applied",ok:!0,message:b.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),b}await HG();let f=co({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return _t({event:"update_applied",ok:!0,message:f.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),f}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",f=co({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},n);return _t({event:"update_failed",ok:!1,message:p,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),f}},sn=()=>{let e=L();return{local:ve(e),logs:rn(20,e)}}});var sE={};St(sE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>gd,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>ri,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Sd,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>lo,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Df,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Hf,appendAgentWitchSelfUpdateLog:()=>_t,buildAgentWitchEnsureOllamaShell:()=>ni,buildAgentWitchInstallScriptOllama:()=>eE,buildAgentWitchSelfUpdateStatus:()=>sn,ensureAgentWitchInstallVersionRecorded:()=>Ys,ensureAgentWitchOllamaInstalled:()=>Ad,fetchAgentWitchRemoteInstallBundleVersion:()=>uo,isRemoteAgentWitchBundleVersionNewer:()=>en,readAgentWitchInstallVersion:()=>ve,readAgentWitchSelfUpdateLogs:()=>rn,resolveAgentWitchAppOriginFromWsUrl:()=>We,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Js,resolveAgentWitchInstallVersionPath:()=>Ks,resolveAgentWitchSelfUpdateLogPath:()=>fd,runAgentWitchSelfUpdate:()=>on,writeAgentWitchInstallVersion:()=>io});var Ge=l(()=>{"use strict";Mf();$f();oE();eh();th();rh();nh()});var oh={};St(oh,{buildAgentWitchSelfUpdateStatus:()=>sn,fetchAgentWitchRemoteInstallBundleVersion:()=>uo,runAgentWitchSelfUpdate:()=>on});var sh=l(()=>{"use strict";Ge()});function po(e){return(0,iE.createHash)("sha256").update(e.trim()).digest("hex")}var iE,ih=l(()=>{"use strict";iE=require("node:crypto")});var mo,oi,FG,aE,ah,lE=l(()=>{"use strict";mo=m(require("node:fs")),oi=m(require("node:path"));ih();we();FG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aE=e=>{if(!mo.default.existsSync(e))return null;try{let t=JSON.parse(mo.default.readFileSync(e,"utf8"));return!FG(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:po(t.pairingToken.trim())}catch{return null}},ah=(e=L())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(aE(oi.default.join(e,"config.json")));let o=oi.default.join(e,Dt);if(!mo.default.existsSync(o))return t;for(let s of mo.default.readdirSync(o)){let i=oi.default.join(o,s);mo.default.statSync(i).isDirectory()&&n(aE(oi.default.join(i,"config.json")))}return t}});var lh,cE,Pd,si,ii,zG,UG,BG,dE,se,ie,_d,wt,lt=l(()=>{"use strict";lh=m(require("node:fs")),cE=m(require("node:os")),Pd=m(require("node:path")),si={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},ii=e=>e.trim().length>0,zG=e=>{let t=Pd.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},UG=()=>{let e=cE.default.homedir(),t=Pd.default.join(e,".local","bin","agent");if(lh.default.existsSync(t))return t;let r=Pd.default.join(e,".local","bin","cursor-agent");return lh.default.existsSync(r)?r:si.cursorCommand},BG=e=>{let t=e.trim();return!ii(t)||t===si.cursorCommand?UG():t},dE=(e,t)=>zG(e)?t:["agent",...t],se=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ie=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:ii(t)?t.trim():si.claudeCommand,codexCommand:ii(r)?r.trim():si.codexCommand,cursorCommand:BG(n),antigravityCommand:ii(o)?o.trim():si.antigravityCommand}},_d=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:dE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},wt=(e,t,r,n)=>{let o=t.trim();if(!ii(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:dE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",o])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var yr,GG,go,VG,fo,wd=l(()=>{"use strict";yr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,GG=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([n,o])=>{if(typeof o!="object"||o===null)return{name:n,total:0};let s=o;return{name:n,total:yr(s.inputTokens)+yr(s.outputTokens)+yr(s.cacheReadInputTokens)+yr(s.cacheCreationInputTokens)}})].sort((n,o)=>o.total-n.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},go=e=>{let t=e.trim(),r=t.indexOf("{"),n=t.lastIndexOf("}");if(r<0||n<=r)return null;let o;try{o=JSON.parse(t.slice(r,n+1))}catch{return null}if(typeof o!="object"||o===null)return null;let s=o;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=yr(a.input_tokens)+yr(a.cache_creation_input_tokens)+yr(a.cache_read_input_tokens),d=yr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:GG(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},VG=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),fo=(e,t)=>{let r=go(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??VG(r)}}});var ch,qG,KG,dh,uh=l(()=>{"use strict";ch=e=>e.toLocaleString("en-US"),qG=e=>e<.01?e.toFixed(4):e.toFixed(3),KG=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${qG(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${ch(e.inputTokens)} in / ${ch(e.outputTokens)} out (${ch(e.totalTokens)} total)`,t].join(`
`)},dh=(e,t)=>{if(t===void 0)return e;let r=KG(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var vd,ph=l(()=>{"use strict";vd={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var an,mh,Wd,gh=l(()=>{"use strict";ph();an="auto",mh=e=>({value:an,label:`Auto (${vd[e]})`}),Wd={anthropic:[mh("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[mh("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[mh("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var ho,ai,fh,li=l(()=>{"use strict";ph();gh();ho=e=>{let t=e?.trim()??"";if(!(t.length===0||t===an))return t},ai=(e,t)=>{let r=ho(t);return r===void 0?vd[e]:r},fh=e=>{let t=ho(e);return t===void 0?an:t}});var Ld,JG,YG,Ed,uE=l(()=>{"use strict";Ld={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},JG=e=>{let t=Ld[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Ld["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Ld["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Ld["gemini-2.0-flash"]:null},YG=(e,t,r)=>{let n=JG(e);if(n===null)return null;let o=t/1e6*n.inputUsd,s=r/1e6*n.outputUsd;return o+s},Ed=e=>{let t=YG(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var yo,XG,ZG,QG,Rd,pE=l(()=>{"use strict";uE();yo=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),XG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=yo(r.input_tokens),o=yo(r.output_tokens);return n===0&&o===0?null:Ed({provider:"anthropic",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},ZG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=yo(r.prompt_tokens),o=yo(r.completion_tokens);return n===0&&o===0?null:Ed({provider:"openai",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},QG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let n=yo(r.promptTokenCount),o=yo(r.candidatesTokenCount);return n===0&&o===0?null:Ed({provider:"google",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},Rd=(e,t,r)=>e==="anthropic"?XG(t,r):e==="openai"?ZG(t,r):QG(t,r)});var e2,hh,t2,r2,n2,o2,s2,yh,Sh=l(()=>{"use strict";li();pE();e2=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let n=r;return n.type==="text"&&typeof n.text=="string"?n.text:""}).join(""):""},hh=(e,t,r)=>{let n=r?.trim()??"";return n.length>0?n:ai(e,t.model)},t2=async e=>{let t=hh("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Anthropic API error (${String(r.status)})`};let o=e2(n);o.length>0&&e.onChunk?.(o);let s=Rd("anthropic",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},r2=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.message;return typeof n?.content=="string"?n.content:""},n2=async e=>{let t=hh("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`OpenAI API error (${String(r.status)})`};let o=r2(n);o.length>0&&e.onChunk?.(o);let s=Rd("openai",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},o2=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.content?.parts;return Array.isArray(n)?n.map(o=>{if(typeof o!="object"||o===null)return"";let s=o.text;return typeof s=="string"?s:""}).join(""):""},s2=async e=>{let t=hh("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,n=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),o=await n.json().catch(()=>null);if(!n.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Google API error (${String(n.status)})`};let s=o2(o);s.length>0&&e.onChunk?.(s);let i=Rd("google",o,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},yh=async e=>{try{return e.provider==="anthropic"?await t2(e):e.provider==="openai"?await n2(e):await s2(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Fe,ci=l(()=>{"use strict";Fe=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var mE,i2,kd,Ah=l(()=>{"use strict";mE=m(require("node:path")),i2="writer-api-secrets.json",kd=e=>mE.default.join(e,i2)});var bh,gE,a2,Sr,Ne,Ar=l(()=>{"use strict";bh=m(require("node:fs"));li();Ah();gE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),a2=e=>{if(!gE(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,n=ho(r);return{apiKey:t,...n!==void 0?{model:n}:{}}},Sr=e=>{let t=kd(e);if(!bh.default.existsSync(t))return{};try{let r=JSON.parse(bh.default.readFileSync(t,"utf8"));if(!gE(r))return{};let n={},o=["anthropic","openai","google"];for(let s of o){let i=a2(r[s]);i!==null&&(n[s]=i)}return n}catch{return{}}},Ne=(e,t)=>Sr(e)[t]??null});var Le,di=l(()=>{"use strict";Le=e=>e==="api"?"api":"cli"});var fE,ge,ln,Vt=l(()=>{"use strict";fE=m(require("node:path"));ci();Ar();di();ge=e=>fE.default.dirname(e),ln=(e,t)=>{if(Le(e.writerExecutionBackend)!=="api")return!1;let r=Fe(t);if(r===null)return!1;let n=ge(e.layout.configPath),o=Ne(n,r);return o!==null&&o.apiKey.length>0}});var ui,Ph=l(()=>{"use strict";uh();Sh();ci();Ar();Vt();ui=async(e,t,r,n)=>{let o=r.trim();if(o.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Fe(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=ge(e.layout.configPath),a=Ne(i,s);if(a===null){let d=Object.keys(Sr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await yh({provider:s,secret:a,prompt:o,onChunk:n});return{exitCode:c.exitCode,output:dh(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var hE,So,_h=l(()=>{"use strict";hE=require("node:child_process");lt();wd();Ph();Vt();So=(e,t,r)=>new Promise(n=>{if(!se(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(ln(e,t)){ui(e,t,r).then(n);return}let o=wt(t,r,ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,hE.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=fo(i.join("")),p=a.join("").trim(),f=[d.output.trim(),p].filter(b=>b.length>0).join(`
`);n({exitCode:c??-1,output:f})}),s.on("error",c=>{n({exitCode:-1,output:c.message})})})});var yE=l(()=>{"use strict"});var SE=l(()=>{"use strict";uh();_h();Sh();yE();Ar();Vt()});var AE,bE,PE,_E=l(()=>{"use strict";AE="claude",bE="codex",PE="cursor"});var wE,l2,wh,pi,Cd=l(()=>{"use strict";wE=m(require("node:path"));Gt();bt();l2="ws://localhost:3000/api/agent-witch/ws",wh=e=>e.replace(/\/$/,""),pi=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return wh(t);let r=wE.default.basename(e.installDir);if(r===ks.production)return hd;let n=e.configWsUrl?.trim()??"";return r===ks.localhost?n.length>0?wh(n):l2:n.length>0?wh(n):hd}});var d2,vh,Wh=l(()=>{"use strict";_E();Cd();di();d2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vh=e=>{if(!d2(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=pi({installDir:e.layout.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??AE,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??bE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??PE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:n,workspace:o,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Le(t.writerExecutionBackend),layout:e.layout}}}});var Lh,Eh,Rh=l(()=>{"use strict";Lh=m(require("node:fs"));B();Wh();Eh=e=>{let t=N(e);if(!Lh.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Lh.default.readFileSync(t.configPath,"utf8")),n=vh({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!n.ok){if(n.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return n.config}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}}});var mi,vE=l(()=>{"use strict";mi=(e,t,r)=>{let n=r?.trim()??"",o=e?.trim()??"";return n.length>0?o.length>0?o:null:o.length>0?o:t()}});var kh,u2,Ch,WE=l(()=>{"use strict";kh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),u2=e=>{if(!kh(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",n=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||n.length===0||!Array.isArray(e.entries))return null;let o=e.entries.flatMap(s=>{if(!kh(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(f=>{if(!kh(f))return[];let b=typeof f.itemKey=="string"?f.itemKey.trim():"",y=typeof f.relativePath=="string"?f.relativePath:"",h=typeof f.contentSha256=="string"?f.contentSha256.trim():"";return b.length===0||h.length===0?[]:[{itemKey:b,relativePath:y,contentSha256:h}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:n,entries:o}},Ch=u2});var LE,p2,Td,Th=l(()=>{"use strict";LE=m(require("node:path")),p2=(e,t)=>{let r=t.trim();return LE.default.join(e,"components","store",r.slice(0,2),r)},Td=p2});var EE,m2,xh,RE=l(()=>{"use strict";EE=m(require("node:fs"));Th();m2=(e,t)=>{let r=[];for(let n of t.entries)for(let o of n.items){let s=Td(e.installDir,o.contentSha256);EE.default.existsSync(s)||r.push(o.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},xh=m2});var gi,Ao,g2,Ih,f2,Oh,Nh=l(()=>{"use strict";gi=m(require("node:fs")),Ao=m(require("node:path"));Th();g2=(e,t)=>Ao.default.join(e.installDir,"runs",t,"overlay"),Ih=(e,t)=>Ao.default.join(g2(e,t),".cursor"),f2=(e,t,r)=>{let n=r.entries.filter(s=>s.scope==="run");if(n.length===0)return{ok:!0};let o=Ih(e,t);gi.default.mkdirSync(o,{recursive:!0});for(let s of n)for(let i of s.items){let a=Td(e.installDir,i.contentSha256);if(!gi.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Ao.default.join(o,c):Ao.default.join(o,i.itemKey);gi.default.mkdirSync(Ao.default.dirname(d),{recursive:!0}),gi.default.copyFileSync(a,d)}return{ok:!0}},Oh=f2});var Mh,kE,h2,fi,CE=l(()=>{"use strict";Mh=m(require("node:fs")),kE=m(require("node:path")),h2=(e,t)=>{let r=kE.default.join(e.installDir,"runs",t);Mh.default.existsSync(r)&&Mh.default.rmSync(r,{recursive:!0,force:!0})},fi=h2});var y2,jh,TE=l(()=>{"use strict";Nh();y2=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let n=Ih(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:n}},jh=y2});var Dh,S2,A2,b2,P2,_2,$,xE=l(()=>{"use strict";Dh=m(require("node:fs"));Cd();B();di();S2="claude",A2="codex",b2="cursor",P2="agy",_2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=N();if(!Dh.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Dh.default.readFileSync(e.configPath,"utf8"));if(!_2(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=pi({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,writerExecutionBackend:Le(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:S2,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:A2,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:b2,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:P2,pairingToken:s,layout:e}}catch{return null}}});var xd,IE,OE=l(()=>{"use strict";xd=m(require("node:fs"));Ah();IE=(e,t)=>{let r=kd(e);xd.default.mkdirSync(e,{recursive:!0}),xd.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{xd.default.chmodSync(r,384)}catch{}}});var Id,NE,Hh=l(()=>{"use strict";Id=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),n=t.slice(-4);return`${r}${"\u2022".repeat(12)}${n}`},NE=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Id(t)}});var hi,w2,$h,Fh,ME=l(()=>{"use strict";hi=m(require("node:fs"));Ar();OE();Hh();li();Vt();w2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$h=(e,t,r,n)=>{let o=e[t],s=r?.trim()??"",i=NE(s,o?.apiKey)?"":s,a=i.length>0?i:o?.apiKey;if(a===void 0||a.length===0)return e;let c=n!==void 0?ho(n):o?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Fh=e=>{let t=ge(e.configPath),r={};if(hi.default.existsSync(e.configPath))try{let o=JSON.parse(hi.default.readFileSync(e.configPath,"utf8"));w2(o)&&(r={...o})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,hi.default.mkdirSync(t,{recursive:!0}),hi.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let n=$h($h($h(Sr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);IE(t,n)}});var zh,jE=l(()=>{"use strict";zh={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var Uh,DE=l(()=>{"use strict";ci();Ar();Vt();Vt();Uh=(e,t)=>{if(ln(e,t))return!1;let r=Fe(t);if(r===null)return!1;let n=ge(e.layout.configPath),o=Ne(n,r);return o===null||o.apiKey.trim().length===0}});var HE,Bh,Gh=l(()=>{"use strict";HE=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let n=e.readConfig(r);return n===null?[]:[n]})},Bh=async e=>{let t=HE(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=HE(e);if(o.length>0){r(o);return}setTimeout(n,e.pollIntervalMs)};n()}))}});var v2,Vh,$E=l(()=>{"use strict";ee();Rh();Gh();v2=1e4,Vh=()=>Bh({listProfileEmails:od,readConfig:Eh,pollIntervalMs:v2,logWaiting:e=>{console.error(e)}})});var ae=l(()=>{"use strict";_h();SE();Rh();Cd();vE();WE();RE();Nh();CE();TE();di();xE();ME();Ar();Vt();Hh();li();jE();Ph();Vt();DE();ci();Ar();$E();Wh();Gh()});var Od,FE,W2,L2,zE,Nd,yi,Md,Si=l(()=>{"use strict";Od=m(require("node:fs")),FE=m(require("node:path")),W2="wake-port.json",L2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zE=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Nd=e=>FE.default.join(e,W2),yi=e=>{let t=Nd(e);if(!Od.default.existsSync(t))return null;try{let r=JSON.parse(Od.default.readFileSync(t,"utf8"));if(L2(r)&&zE(r.wakePort))return r.wakePort}catch{return null}return null},Md=(e,t)=>{if(!zE(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Nd(e);Od.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var QQ,eee,tee,ct,UE,Ai=l(()=>{"use strict";Si();we();Si();QQ=nt(),eee=`${te()}-wake`,tee=te(),ct=()=>{let e=L(),t=yi(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return nt()},UE=e=>{let t=L();yi(t)===null&&Md(t,e)}});var BE=l(()=>{"use strict";ih();ee();lE();ae();Ai()});var qh,bi,Pi,GE=l(()=>{"use strict";qh=m(require("node:os"));BE();bi=()=>{let e=Q();return{ok:!0,port:ct(),hostname:qh.default.hostname(),profileCount:e.length}},Pi=()=>{let e=Q(),t=$()?.pairingToken.trim()??"",r=t.length>0?po(t):null,n=ah();return{hostname:qh.default.hostname(),port:ct(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var Kh=l(()=>{"use strict";GE()});var VE,qE,KE,jd,bo=l(()=>{"use strict";VE="materialization.json",qE="backups",KE=".gitignore",jd=e=>`harness-set:${e.trim()}`});var JE,YE,Dd,XE=l(()=>{"use strict";JE=m(require("node:crypto")),YE=m(require("node:fs")),Dd=e=>{try{let t=YE.default.readFileSync(e);return JE.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var br,cn,E2,ZE,Jh,QE=l(()=>{"use strict";br=m(require("node:fs")),cn=m(require("node:path"));XE();E2=(e,t,r,n)=>{let o=new Date().toISOString().replaceAll(":","-"),s=cn.default.join(t,o,n);return br.default.mkdirSync(cn.default.dirname(s),{recursive:!0}),br.default.copyFileSync(r,s),cn.default.relative(e,s).replaceAll("\\","/")},ZE=e=>{let t=cn.default.join(e.repoRoot,e.repoRelativeDestination),r=Dd(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let n=e.ledger.entries[e.repoRelativeDestination];if(br.default.existsSync(t)){let o=Dd(t);if(o===r)return{kind:"skipped_unchanged"};if(!(n!==void 0&&n.componentId===e.componentId)&&o!==null){let i=E2(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return br.default.mkdirSync(cn.default.dirname(t),{recursive:!0}),br.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return br.default.mkdirSync(cn.default.dirname(t),{recursive:!0}),br.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},Jh=e=>{let t=Dd(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var Yh,eR,Hd,Xh=l(()=>{"use strict";Yh=m(require("node:fs"));bo();eR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hd=e=>{if(!Yh.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(Yh.default.readFileSync(e,"utf8"));if(eR(t)&&t.version===1&&eR(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Pr,$d,tR,rR=l(()=>{"use strict";Pr=m(require("node:fs")),$d=m(require("node:path"));bo();tR=e=>{let t=new Set(e.setSlugs.map(s=>jd(s))),r=[],n=[],o={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){o[s]=i;continue}let a=$d.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=$d.default.join(e.repoRoot,i.backupPath);Pr.default.existsSync(c)?(Pr.default.mkdirSync($d.default.dirname(a),{recursive:!0}),Pr.default.copyFileSync(c,a),n.push(s)):Pr.default.existsSync(a)&&Pr.default.rmSync(a,{force:!0})}else Pr.default.existsSync(a)&&Pr.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:o},summary:{removedPaths:r,restoredPaths:n}}}});var Zh,Fd,Qh=l(()=>{"use strict";Zh=m(require("node:path"));bo();Fd=e=>({ledgerFilePath:Zh.default.join(e.metaDirPath,VE),backupsDirPath:Zh.default.join(e.metaDirPath,qE)})});var ey,nR,oR=l(()=>{"use strict";ey=m(require("node:path")),nR=(e,t)=>{let n=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(n.length===0)return ey.default.posix.join("rules",e,"file");let o=n[n.length-1]??"file",s=n[0]??"rules";return ey.default.posix.join(s,e,o)}});var ty,sR,ry,iR=l(()=>{"use strict";ty=m(require("node:fs")),sR=m(require("node:path")),ry=(e,t)=>{ty.default.mkdirSync(sR.default.dirname(e),{recursive:!0}),ty.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var ny,R2,Ve,wi=l(()=>{"use strict";ny=m(require("node:os")),R2=e=>{let t=e.trim();return t.startsWith("~/")?`${ny.default.homedir()}${t.slice(1)}`:t==="~"?ny.default.homedir():t},Ve=R2});var zd,aR,k2,lR,cR=l(()=>{"use strict";zd=m(require("node:fs")),aR=m(require("node:path"));bo();Xr();k2=`*
!${ad}
`,lR=e=>{let t=aR.default.join(e,KE);zd.default.existsSync(t)||(zd.default.mkdirSync(e,{recursive:!0}),zd.default.writeFileSync(t,k2))}});var dn,qe,un=l(()=>{"use strict";dn=m(require("node:path"));Xr();wi();qe=e=>{let t=Ve(e),r=dn.default.join(t,SL);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:dn.default.join(r,"rag"),memoryDirPath:dn.default.join(r,AL),reportsDirPath:dn.default.join(r,PL),metaFilePath:dn.default.join(r,ad),ragChunksFilePath:dn.default.join(r,"rag",bL)}}});var vt,uR,C2,T2,ze,oy=l(()=>{"use strict";vt=m(require("node:fs")),uR=m(require("node:path"));Xr();cR();un();C2=(e,t)=>{if(vt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};vt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},T2=e=>{vt.default.existsSync(e.ragChunksFilePath)||vt.default.writeFileSync(e.ragChunksFilePath,"");let t=uR.default.join(e.memoryDirPath,eo);vt.default.existsSync(t)||vt.default.writeFileSync(t,"")},ze=e=>{let t=qe(e.projectFolderPath);return vt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),vt.default.mkdirSync(t.ragDirPath,{recursive:!0}),vt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),lR(t.metaDirPath),C2(t,e),T2(t),{ok:!0,layout:t}}});var pR,mR,gR,fR,Ud,Bd=l(()=>{"use strict";pR="components",mR="store",gR="versions",fR="installed.json",Ud=e=>`harness-set:${e.trim()}`});var sy,hR,Gd,iy=l(()=>{"use strict";sy=m(require("node:fs")),hR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Gd=e=>{if(!sy.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(sy.default.readFileSync(e,"utf8"));if(hR(t)&&t.version===1&&hR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var vi,Po,Vd=l(()=>{"use strict";vi=m(require("node:path"));Bd();Po=e=>{let t=vi.default.join(e,pR);return{componentsRootDir:t,storeDir:vi.default.join(t,mR),versionsDir:vi.default.join(t,gR),installedFilePath:vi.default.join(t,fR)}}});var ay,yR,qd,Kd,Jd=l(()=>{"use strict";ay=m(require("node:crypto")),yR=m(require("node:fs")),qd=e=>ay.default.createHash("sha256").update(e,"utf8").digest("hex"),Kd=e=>{try{let t=yR.default.readFileSync(e);return ay.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var ly,SR,AR,bR=l(()=>{"use strict";ly=m(require("node:fs")),SR=m(require("node:path")),AR=(e,t)=>{ly.default.mkdirSync(SR.default.dirname(e),{recursive:!0}),ly.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var cy,dy,PR,_R=l(()=>{"use strict";cy=m(require("node:fs")),dy=m(require("node:path")),PR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),n=dy.default.join(e,r),o=dy.default.join(n,`${t.versionId}.json`);cy.default.mkdirSync(n,{recursive:!0}),cy.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`)}});var Yd,wR,vR,WR=l(()=>{"use strict";Yd=m(require("node:fs")),wR=m(require("node:path"));Jd();vR=e=>{let t=qd(e.content),r=wR.default.join(e.storeDir,t);return Yd.default.existsSync(r)||(Yd.default.mkdirSync(e.storeDir,{recursive:!0}),Yd.default.writeFileSync(r,e.content)),t}});var uy,LR,x2,Xd,py=l(()=>{"use strict";uy=m(require("node:fs")),LR=m(require("node:path"));Bd();iy();Vd();Jd();bR();_R();WR();x2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Xd=e=>{let t=Po(e.installDir),r=Ud(e.setSlug),n=String(e.setEntry.version),o=[];for(let i of e.setEntry.items){if(!x2(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=LR.default.join(e.harnessRootDir,a);if(!uy.default.existsSync(c))continue;let d=uy.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Kd(c);if(p!==null){if(qd(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);vR({storeDir:t.storeDir,content:d}),o.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(o.length===0)return;PR(t.versionsDir,{version:1,componentId:r,versionId:n,items:o,createdAt:new Date().toISOString()});let s=Gd(t.installedFilePath);AR(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:n,installedAt:new Date().toISOString()}}})}});var gy,my,ER,RR=l(()=>{"use strict";gy=m(require("node:fs"));py();iy();Vd();my=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ER=e=>{if(!gy.default.existsSync(e.harnessManifestPath))return;let t=Po(e.installDir),r=Gd(t.installedFilePath);if(Object.keys(r.components).length>0)return;let n;try{n=JSON.parse(gy.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!my(n)||n.version!==1||!my(n.sets)))for(let[o,s]of Object.entries(n.sets)){if(!my(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Xd({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:o,setEntry:{version:i,items:a}})}}});var fy,kR,CR,TR=l(()=>{"use strict";fy=m(require("node:fs")),kR=m(require("node:path")),CR=e=>{let t=e.componentId.replaceAll("/","_"),r=kR.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!fy.default.existsSync(r))return null;try{let n=JSON.parse(fy.default.readFileSync(r,"utf8"));if(typeof n=="object"&&n!==null&&n.version===1)return n}catch{return null}return null}});var Zd,Qd,xR,IR=l(()=>{"use strict";Zd=m(require("node:fs")),Qd=m(require("node:path"));Bd();RR();TR();Vd();Jd();xR=e=>{ER({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Po(e.layout.installDir),r=Ud(e.setSlug),n=CR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(n!==null){let i=n.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Qd.default.join(t.storeDir,i.contentSha256);if(Zd.default.existsSync(a)&&Kd(a)===i.contentSha256)return a}}let o=e.manifestItemPath.trim();if(o.length===0)return null;let s=o.startsWith("shared/")?Qd.default.join(e.layout.harnessRootDir,o):Qd.default.join(e.layout.harnessSetsDir,e.setSlug,o);if(!Zd.default.existsSync(s))return null;try{if(!Zd.default.statSync(s).isFile())return null}catch{return null}return s}});var OR,I2,O2,_r,eu=l(()=>{"use strict";Xh();Qh();un();OR="harness-set:",I2=e=>{let t=e.trim();if(!t.startsWith(OR))return null;let r=t.slice(OR.length).trim();return r.length>0?r:null},O2=e=>{let t=new Set;for(let r of Object.values(e.entries)){let n=I2(r.componentId);n!==null&&t.add(n)}return[...t].sort((r,n)=>r.localeCompare(n))},_r=e=>{let t=qe(e),{ledgerFilePath:r}=Fd(t),n=Hd(r);return O2(n)}});var tu,hy,Wi,N2,qt,Li,_o=l(()=>{"use strict";tu=m(require("node:fs")),hy=m(require("node:os")),Wi=m(require("node:path")),N2=()=>tu.default.realpathSync(Wi.default.resolve(hy.default.homedir())),qt=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Wi.default.join(hy.default.homedir(),t.slice(1)):t,n;try{n=tu.default.realpathSync(Wi.default.resolve(r))}catch{return null}let o=N2();return n===o||n.startsWith(`${o}${Wi.default.sep}`)?n:null},Li=e=>{let t=qt(e);if(t===null)return null;try{if(!tu.default.statSync(t).isFile())return null}catch{return null}return t}});var yy,Sy=l(()=>{"use strict";yy=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var nu,NR,ru,M2,Ei,Ay=l(()=>{"use strict";nu=m(require("node:fs")),NR=m(require("node:path"));bo();QE();Xh();rR();Qh();oR();iR();wi();oy();IR();eu();_o();Sy();ru=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),M2=e=>{if(!nu.default.existsSync(e))return null;try{let t=JSON.parse(nu.default.readFileSync(e,"utf8"));if(ru(t)&&t.version===1)return t}catch{return null}return null},Ei=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=Ve(e.projectFolderPath),n=qt(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=nu.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=ze({projectFolderPath:n}),{ledgerFilePath:i,backupsDirPath:a}=Fd(s.layout),d=_r(n).filter(A=>!t.includes(A)),p=Hd(i),f=0;if(d.length>0){let A=tR({repoRoot:n,setSlugs:d,ledger:p});p=A.ledger,f=A.summary.removedPaths.length}if(t.length===0)return ry(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:f,projectFolderPath:n,appliedSetSlugs:[]};let b=M2(e.layout.harnessManifestPath);if(b===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let y=ru(b.sets)?b.sets:{},h=0,u=0,S=0;for(let A of t){let g=y[A];if(!ru(g))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let _=typeof g.version=="number"?String(g.version):"1",w=jd(A),W=Array.isArray(g.items)?g.items:[];for(let E of W){if(!ru(E))continue;let R=typeof E.path=="string"?E.path.trim():"";if(R.length===0)continue;let T=yy(R);if(T===null)continue;let I=nR(A,T),D=NR.default.posix.join(".cursor",I).replaceAll("\\","/"),oe=typeof E.id=="string"?E.id.trim():"",V=xR({layout:e.layout,setSlug:A,setVersion:typeof g.version=="number"?g.version:1,manifestItemPath:R,manifestItemId:oe});if(V===null)continue;let U=ZE({repoRoot:n,backupsDir:a,repoRelativeDestination:D,sourceAbsolutePath:V,componentId:w,versionId:_,ledger:p});if(U.kind==="skipped_unchanged"){u+=1;continue}if(U.kind==="backed_up_user_file"){S+=1,h+=1,p={version:1,entries:{...p.entries,[D]:Jh({componentId:w,versionId:_,sourceAbsolutePath:V,backupPath:U.backupPath})}};continue}h+=1,p={version:1,entries:{...p.entries,[D]:Jh({componentId:w,versionId:_,sourceAbsolutePath:V})}}}}return h===0&&u===0&&f===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(ry(i,p),{ok:!0,writtenFileCount:h,skippedFileCount:u,backedUpFileCount:S,removedLedgerPathCount:f,projectFolderPath:n,appliedSetSlugs:t})}});var MR,ou,j2,D2,H2,$2,F2,z2,U2,B2,G2,Ri,su=l(()=>{"use strict";MR=m(require("node:crypto")),ou=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},j2=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},D2=(e,t)=>{let r=j2(t),n=ou(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},H2=(e,t,r)=>{let n=D2(t,r);return`shared/items/${e}/${n}`},$2=["rules","skills","commands","instructions","agents"],F2=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),z2=(e,t)=>[...e.filter(n=>n.id!==t.id),t],U2=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},B2=e=>MR.default.createHash("sha256").update(e,"utf8").digest("hex"),G2=e=>({id:e.id,kind:e.kind,title:e.title,path:H2(e.id,e.kind,e.title),contentSha256:B2(e.content)}),Ri=e=>{let t=new Date().toISOString(),r=e.existingManifest??F2(e.hostname,t),n=ou(e.bundle.slug),o=U2(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...$2.map(d=>`sets/${n}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let f=G2(p);return{files:[...d.files,{relativePath:f.path,content:p.content}],nextItems:z2(d.nextItems,f)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var wr,jR,iu,V2,pn,by=l(()=>{"use strict";wr=m(require("node:fs")),jR=m(require("node:os")),iu=m(require("node:path"));su();V2=e=>{if(!wr.default.existsSync(e))return null;try{let t=JSON.parse(wr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},pn=e=>{try{let t=V2(e.layout.harnessManifestPath),r=Ri({bundle:e.bundle,hostname:jR.default.hostname(),existingManifest:t});wr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let n of r.directories)wr.default.mkdirSync(iu.default.join(e.layout.harnessRootDir,n),{recursive:!0});for(let n of r.files){let o=iu.default.join(e.layout.harnessRootDir,n.relativePath);wr.default.mkdirSync(iu.default.dirname(o),{recursive:!0}),wr.default.writeFileSync(o,n.content)}return wr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var Py,DR=l(()=>{"use strict";by();Ay();Py=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=pn({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Ei({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var HR,$R=l(()=>{"use strict";HR=["rule","skill","command","instruction","agent"]});var FR,q2,K2,Wt,_y=l(()=>{"use strict";$R();FR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),q2=e=>typeof e=="string"&&HR.includes(e),K2=e=>{if(!FR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!q2(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Wt=e=>{if(!FR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=K2(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var zR,J2,wy,UR=l(()=>{"use strict";zR=require("node:zlib");_y();J2="x-agent-witch-token",wy=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[J2]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let n=r.headers.get("x-content-sha256")?.trim()??"";if(n.length>0&&n!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let o=Buffer.from(await r.arrayBuffer()),s=(0,zR.gunzipSync)(o).toString("utf8"),i=JSON.parse(s),a=Wt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var Wy,vy,vr,BR=l(()=>{"use strict";Wy=m(require("node:fs")),vy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vr=e=>{if(!Wy.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Wy.default.readFileSync(e.harnessManifestPath,"utf8"));if(!vy(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=vy(t.sets)?t.sets:{},o=Object.entries(n).map(([s,i])=>{if(!vy(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var au,GR=l(()=>{"use strict";au=()=>"~"});var VR,qR,KR=l(()=>{"use strict";VR=require("node:crypto"),qR=e=>`local-${(0,VR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Ly,JR=l(()=>{"use strict";Ly=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var ki,lu,Ey=l(()=>{"use strict";ki=m(require("node:path")),lu=e=>{let t=ki.default.dirname(e),r=ki.default.basename(t);return r==="agents"?ki.default.basename(ki.default.dirname(t)):r}});var Ci,Kt,YR,Y2,X2,Z2,cu,XR,Ry=l(()=>{"use strict";Ci=m(require("node:fs")),Kt=m(require("node:path"));KR();JR();Ey();YR=new Set(["node_modules",".git","dist","build",".next","coverage"]),Y2=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},X2=(e,t)=>{let r=Kt.default.basename(t);if(e==="skill"){let n=t.split(Kt.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},Z2=e=>{let t=[],r=(o,s)=>{let i;try{i=Ci.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&YR.has(a.name))continue;let c=Kt.default.join(o,a.name),d=s?Kt.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;Ly(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=Kt.default.join(e,o);Ci.default.existsSync(s)&&r(s,o)}let n=Kt.default.join(e,"skills");return Ci.default.existsSync(n)&&r(n,"skills"),t},cu=e=>{let t=Z2(e);if(t.length===0)return null;let r=Kt.default.dirname(e),n=lu(e),o=Y2(n),s=t.map(i=>{let a=Ly(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:qR(i.absolutePath),kind:a,title:X2(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},XR=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=Ci.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||YR.has(a.name))continue;let c=Kt.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var ZR,ky,Q2,Cy,QR=l(()=>{"use strict";ZR=m(require("node:fs")),ky=m(require("node:path"));Ry();_o();Q2=e=>{let t=qt(e.trim());if(t===null)return null;if(ky.default.basename(t)===".cursor")return t;let r=ky.default.join(t,".cursor");try{if(ZR.default.statSync(r).isDirectory())return qt(r)}catch{return null}return null},Cy=e=>{let t=Q2(e.projectPath);if(t===null)return null;let r=cu(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var ek,e5,du,Ty,tk=l(()=>{"use strict";ek=m(require("node:path"));Ry();_o();Ey();e5=5,du=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Ty=e=>{let t=qt(e.scanRoot.trim());if(t===null)return du(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of XR(t,e5,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=qt(s);if(i===null)continue;let a=lu(i);du(e.response,"folder",{cursorDir:i,groupName:a,repoPath:ek.default.dirname(i)});let c=cu(i);c!==null&&(r.push(c),du(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return du(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var rk,nk,ok=l(()=>{"use strict";rk=m(require("node:path")),nk=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:rk.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var Ce,sk,xy,t5,Iy,Oy,uu,Ny,Ti,ik=l(()=>{"use strict";Ce=m(require("node:fs")),sk=m(require("node:os")),xy=m(require("node:path"));su();py();_o();ok();t5=e=>{if(!Ce.default.existsSync(e))return null;try{let t=JSON.parse(Ce.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Iy=e=>{let t=e.hostname??sk.default.hostname(),r=t5(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let f=Li(p.sourcePath);if(f===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let b=Ce.default.readFileSync(f,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:b,setSlugs:[i.slug]})}let d=Ri({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)o.add(p);for(let p of d.files)s.push(p),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Ce.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)Ce.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=xy.default.join(e.layout.harnessRootDir,i.relativePath);Ce.default.mkdirSync(xy.default.dirname(a),{recursive:!0}),Ce.default.writeFileSync(a,i.content)}Ce.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=ou(i.slug),d=r.sets[c];d!==void 0&&Xd({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},Oy="reveal-cache.json",uu=(e,t)=>{Ce.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Ce.default.writeFileSync(`${e.harnessRootDir}/${Oy}`,`${JSON.stringify(t,null,2)}
`)},Ny=e=>{let t=`${e.harnessRootDir}/${Oy}`;Ce.default.existsSync(t)&&Ce.default.unlinkSync(t)},Ti=e=>{let t=`${e.harnessRootDir}/${Oy}`;if(!Ce.default.existsSync(t))return null;try{let r=JSON.parse(Ce.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return nk(r)}catch{return null}return null}});var mn=l(()=>{"use strict";Ay();DR();Sy();by();UR();_y();su();BR();GR();QR();_o();tk();ik()});var My,ak=l(()=>{"use strict";mn();we();My=e=>{let t=N(e.profileEmail);return pn({bundle:e.bundle,layout:t})}});var lk=l(()=>{"use strict";ak();mn()});var r5,ck,n5,dk,gn,pu,uk=l(()=>{"use strict";r5=["agentwitch.com","www.agentwitch.com"],ck=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,n5=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},dk=e=>{let t=n5(e);return!!(r5.includes(t)||ck.test(e.trim().toLowerCase()))},gn=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return dk(r)?ck.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},pu=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:gn(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var xi=l(()=>{"use strict";uk()});var Jt,Ii=l(()=>{"use strict";Jt=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Oi,pk=l(()=>{"use strict";lk();xi();Ii();Oi=e=>{if(!Jt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Wt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!gn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=My({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}}});var jy=l(()=>{"use strict";pk()});var o5,wo,Dy=l(()=>{"use strict";o5=e=>e==="hourly"||e==="daily"||e==="weekdays",wo=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!o5(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Ni,mu,mk,gk,Hy,dt,gu,fu,hu,yu,Su=l(()=>{"use strict";Ni=m(require("node:fs")),mu=m(require("node:path"));Dy();mk="automations.json",gk=e=>e.profileEmail!==null?mu.default.join(e.installDir,"profiles",e.profileEmail,mk):mu.default.join(e.installDir,mk),Hy=()=>({version:1,automations:[]}),dt=e=>{let t=gk(e);if(!Ni.default.existsSync(t))return Hy();try{let r=JSON.parse(Ni.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?Hy():{version:1,automations:r.automations.flatMap(o=>{let s=wo(o);return s!==null?[s]:[]})}}catch{return Hy()}},gu=(e,t)=>{let r=gk(e);Ni.default.mkdirSync(mu.default.dirname(r),{recursive:!0}),Ni.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},fu=(e,t)=>{gu(e,{version:1,automations:t})},hu=(e,t)=>{let n=dt(e).automations.filter(o=>o.id!==t.id);gu(e,{version:1,automations:[...n,t]})},yu=(e,t)=>dt(e).automations.find(r=>r.id===t)??null});var Me,Wr=l(()=>{"use strict";Me="x-agent-witch-token"});var X,fn,$y,Mi,Fy,s5,zy,ji,Di,Uy,Hi=l(()=>{"use strict";Wr();Ge();X=e=>{let t=We(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},fn=e=>({[Me]:e,"Content-Type":"application/json"}),$y=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:fn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Mi=async(e,t,r,n,o)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:fn(e.pairingToken),body:JSON.stringify({exitCode:r,output:n,...typeof o?.estimateSeconds=="number"?{estimateSeconds:o.estimateSeconds}:{},...typeof o?.actualSeconds=="number"?{actualSeconds:o.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Fy=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:fn(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},s5=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let n of t.projects){if(typeof n!="object"||n===null)continue;let o=n,s=typeof o.id=="string"?o.id.trim():"",i=typeof o.name=="string"?o.name.trim():"",a=typeof o.folderPath=="string"?o.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},zy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:fn(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n;if(o.ok!==!0||typeof o.project!="object")return null;let s=o.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},ji=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:fn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return s5(r)}catch{return null}},Di=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:fn(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},Uy=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:fn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var hn,fk,hk,i5,By,yk,Gy=l(()=>{"use strict";hn=m(require("node:fs")),fk=m(require("node:path")),hk=e=>fk.default.join(e.harnessRootDir,"projects-registry.json"),i5=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),By=e=>{let t=hk(e);if(!hn.default.existsSync(t))return[];try{let r=JSON.parse(hn.default.readFileSync(t,"utf8"));return i5(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string").map(n=>({id:n.id,name:n.name,projectFolderPath:n.projectFolderPath,addedAt:typeof n.addedAt=="string"?n.addedAt:new Date().toISOString(),...typeof n.cloudProjectId=="string"&&n.cloudProjectId.length>0?{cloudProjectId:n.cloudProjectId}:{}})):[]}catch{return[]}},yk=e=>{let t=hk(e);if(!hn.default.existsSync(t))return;let r=`${t}.migrated`;if(hn.default.existsSync(r)){hn.default.unlinkSync(t);return}hn.default.renameSync(t,r)}});var Sk,a5,l5,Ak,bk=l(()=>{"use strict";wi();Sk=e=>Ve(e),a5=e=>new Set(e.map(t=>Sk(t.folderPath))),l5=e=>new Set(e.map(t=>t.id)),Ak=(e,t)=>{let r=a5(t),n=l5(t),o=[],s=new Set;for(let i of e){let a=Sk(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&n.has(i.cloudProjectId)||(s.add(a),o.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return o}});var Vy,qy=l(()=>{"use strict";Hi();Gy();bk();Vy=async(e,t)=>{let r=By(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let n=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let o=await ji(n);if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=Ak(r,o),i=r.length-s.length,a=0,c=0;for(let d of s)await zy(n,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&yk(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var Ky,yn,Au=l(()=>{"use strict";Ky=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),yn=(e,t)=>e.find(r=>r.id===t)??null});var vo,bu=l(()=>{"use strict";Hi();qy();Au();vo=async(e,t)=>{t!==void 0&&await Vy(t,e);let r=X({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let n=await ji(r);if(n===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let o=Ky(n);return{ok:!0,projects:o,message:o.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${o.length} project${o.length===1?"":"s"} from Agent Witch Console.`}}});var Pk=l(()=>{"use strict"});var Te,_k,c5,d5,u5,p5,Wo,Jy=l(()=>{"use strict";Te=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_k=(e,t)=>e.length===0?`<p class="empty">${Te(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Te(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Te(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,c5=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,d5=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Te(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,u5=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?d5(e.project):c5();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(n=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Te(n.slug)}"${t.size===0||t.has(n.slug)?" checked":""} />
            <span><strong>${Te(n.name)}</strong> <span class="muted mono">(${Te(n.slug)})</span></span>
          </label>
          <p class="muted">${n.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Te(e.project.id)}" />
        <p class="field-label">Installed</p>
        <p class="lede">Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.</p>
        ${r}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`},p5=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Te(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Te(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Wo=e=>{let t=e.flashError?`<div class="alert-error">${Te(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Te(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},n=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${Te(c)}</a>`,o=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=u5({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=_k(o,"No workflows installed for this project yet."):e.activeTab==="agents"?i=_k(s,"No agents installed for this project yet."):i=p5({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Te(e.project.name)}</h1>
      <p class="muted mono">${Te(e.project.projectFolderPath)}</p>
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
    </section>`}});var m5,g5,wk,vk=l(()=>{"use strict";mn();Wr();m5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),g5=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();return!m5(n)||n.ok!==!0||!Array.isArray(n.bundles)?null:n.bundles.flatMap(o=>{let s=Wt(o);return s===null?[]:[s]})}catch{return null}},wk=g5});var Wk,Yy,Lk=l(()=>{"use strict";ae();mn();Jy();bu();vk();Au();eu();Hi();Wk=e=>({kind:"page",title:e.project.name,body:Wo({project:e.project,installed:vr(e.layout),linkedSetSlugs:_r(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),Yy=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let n=await vo(r,e.layout),o=yn(n.projects,t);if(o===null)return{kind:"not_found"};let s=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await wk(s,o.id);if(i===null)return Wk({layout:e.layout,project:o,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=Py({layout:e.layout,projectFolderPath:o.projectFolderPath,bundles:i});if(!a.ok)return Wk({layout:e.layout,project:o,errorMessage:a.errorMessage});let c=s===null?!1:await Di(s,o.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(o.id)}&${d.toString()}`}}});var f5,Xy,Ek=l(()=>{"use strict";f5=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,Xy=f5});var Rk,kk,h5,y5,Pu,_u,Ck=l(()=>{"use strict";Rk=require("node:child_process"),kk=require("node:util"),h5=(0,kk.promisify)(Rk.execFile),y5=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},Pu=async(e,t)=>{try{let{stdout:r}=await h5("git",t,{cwd:e,env:y5(),maxBuffer:1048576});return r.trim()}catch{return null}},_u=async e=>{let t=await Pu(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Pu(e,["rev-parse","--abbrev-ref","HEAD"]),n=await Pu(e,["status","--porcelain"]),o=await Pu(e,["diff","--shortstat","HEAD"]),s=n===null||n.length===0?0:n.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:o===null||o.length===0?null:o}}});var Zy,Tk=l(()=>{"use strict";Zy=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",n=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,o=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${n}; ${o}; ${s}; ${i.join("; ")}.`}});var S5,Qy,xk=l(()=>{"use strict";S5=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",n=r.length>0?r:t.length>0?t:"Lesson from completed run";return n.length<=280?n:`${n.slice(0,277)}\u2026`},Qy=S5});var A5,eS,Ik=l(()=>{"use strict";Wr();A5=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Me]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},eS=A5});var Ok,Lr,Nk=l(()=>{"use strict";Ok=require("node:child_process"),Lr=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,n=(0,Ok.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return n.length>0?n:null}catch{return null}}});var Mk=l(()=>{"use strict";bu()});var $i,jk=l(()=>{"use strict";Wr();$i=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Me]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var ut=l(()=>{"use strict";bu();Au();Pk();wi();oy();Lk();eu();Ek();Ck();Tk();xk();Ik();Nk();Mk();jk();qy();Gy();Hi()});var wu,Fi,Dk,tS,Sn,rS=l(()=>{"use strict";wu=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},Fi=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=wu(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},Dk=e=>e>=1&&e<=5,tS=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return wu(t,"UTC")},Sn=e=>{let t=e.from??new Date,r=wu(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Fi(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=Fi(r,e.timeZone,n,0),s=wu(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?Fi(tS(r),e.timeZone,n,0):o;if(!i&&Dk(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=tS(a),Dk(a.weekday))return Fi(a,e.timeZone,n,0);return Fi(tS(r),e.timeZone,n,0)}});var Hk,nS,Yt,oS=l(()=>{"use strict";Hk=require("node:crypto");ae();ut();rS();Su();nS=!1,Yt=async e=>{if(nS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=yu(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};nS=!0;let o=(0,Hk.randomUUID)();try{let s=await So(t,"claude-cli",n.prompt);await Uy(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=Sn({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return hu(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{nS=!1}}});var vu,$k=l(()=>{"use strict";ae();oS();Su();vu=async()=>{let e=$();if(e===null)return;let t=dt(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await Yt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var zi=l(()=>{"use strict";Su();$k();oS();rS()});var Fk=l(()=>{"use strict";zi()});var zk=l(()=>{"use strict";Dy()});var Uk=l(()=>{"use strict";zk()});var sS=l(()=>{"use strict";zi()});var b5,P5,Ui,iS=l(()=>{"use strict";Fk();Uk();sS();we();b5=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),P5=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Sn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Sn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Ui=e=>{let t=b5(e.profileEmail),r=dt(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=wo(s);return i!==null?[P5(i,n.get(i.id))]:[]});return fu(t,o),{ok:!0,writtenCount:o.length}}});var aS=l(()=>{"use strict";zi()});var Bk=l(()=>{"use strict";ae()});var Gk=l(()=>{"use strict";iS();aS();sS();Bk()});var Vk,Bi,Gi,Vi,qk=l(()=>{"use strict";Vk=m(require("node:os"));Gk();xi();Ii();Bi=e=>{if(!Jt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!gn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=Ui({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},Gi=async e=>{if(!Jt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:gn(t)?Yt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Vi=()=>{let e=$(),t=e!==null?dt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Vk.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var lS=l(()=>{"use strict";qk()});var Wu=l(()=>{"use strict";ee()});var Lu=l(()=>{"use strict";ee()});var Eu,Jk,Yk,Kk,_5,w5,Lo,cS=l(()=>{"use strict";Eu=m(require("node:fs")),Jk=m(require("node:os")),Yk=m(require("node:path"));Wu();Lu();Si();we();Kk=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},_5=e=>Yk.default.join(Jk.default.homedir(),"Library","LaunchAgents",`${e}.plist`),w5=async e=>Eu.default.existsSync(_5(e))?(await _e(e)).ok:!1,Lo=async(e=L())=>{let t=Eu.default.existsSync(Nd(e)),r=!Eu.default.existsSync(Ht(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let n=yi(e);if(n===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await Kk(n))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${te(e)}-wake`;await w5(i)&&s.push(i);for(let c of Q(e))(await _e(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await Kk(n);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var Xk=l(()=>{"use strict";ee()});var Eo,qi=l(()=>{"use strict";Eo="connection-health.json"});var An,Ru,v5,Ki,fe,dS,ku,xe,Cu=l(()=>{"use strict";An=m(require("node:fs")),Ru=m(require("node:path"));qi();v5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ki=e=>e.profileEmail===null?Ru.default.join(e.installDir,Eo):Ru.default.join(e.installDir,"profiles",e.profileEmail,Eo),fe=e=>{let t=Ki(e);if(!An.default.existsSync(t))return null;try{let r=JSON.parse(An.default.readFileSync(t,"utf8"));return!v5(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},dS=e=>{let t=Ki(e);An.default.existsSync(t)&&An.default.rmSync(t,{force:!0})},ku=(e,t)=>{let r=Ki(e),n=fe(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};An.default.mkdirSync(Ru.default.dirname(r),{recursive:!0}),An.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},xe=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var Ji,Zk=l(()=>{"use strict";qi();Cu();Ji=(e,t)=>{if(!t.socketOpen)return!1;let r=fe(e);return r===null?!1:!xe(r,t.staleAfterMs??12e4,t.nowMs)}});var uS,Qk=l(()=>{"use strict";Cu();uS=(e,t)=>!(e!==null&&!xe(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Ro=l(()=>{"use strict";Cu();Zk();Qk();qi()});var pS=l(()=>{"use strict";Ro();ee()});var mS=l(()=>{"use strict";Ro()});var gS=l(()=>{"use strict";ee()});var tC,eC,Yi,fS=l(()=>{"use strict";tC=m(require("node:fs"));Gt();Wu();Lu();we();eC=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Yi=async(e=L())=>{if(!tC.default.existsSync(Ht(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await eC())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let n=[];for(let s of Q(e))(await _e(s.launchAgentLabel)).ok&&n.push(s.launchAgentLabel);let o=await eC();return{ok:o||n.length>0,liveReachable:o,hollowInstall:!1,kickstartedLabels:n}}});var rC=l(()=>{"use strict";ee()});var nC,bn,hS,W5,L5,E5,oC,R5,sC,ko,Tu=l(()=>{"use strict";nC=require("node:crypto"),bn=m(require("node:fs")),hS=m(require("node:path"));we();W5="watchdog-log.ndjson",L5=200,E5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),oC=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Qn({installDir:e,profileEmail:t.profileEmail});return hS.default.join(r,W5)},R5=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!E5(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},sC=(e,t=L())=>{let r={id:(0,nC.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=oC(t);bn.default.mkdirSync(hS.default.dirname(n),{recursive:!0});let o=bn.default.existsSync(n)?bn.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-L5+1)),JSON.stringify(r)];return bn.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},ko=(e=20,t=L())=>{let r=oC(t);if(!bn.default.existsSync(r))return[];let n=bn.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=R5(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var yS,SS,AS,bS=l(()=>{"use strict";bt();yS=Br.watchdogReinstallState,SS=900*1e3,AS=3e3});var iC=l(()=>{"use strict";bS()});var aC={};St(aC,{verifyAgentWitchReviveAfterKickstart:()=>C5});var k5,C5,lC=l(()=>{"use strict";iC();mS();gS();we();k5=e=>new Promise(t=>{setTimeout(t,e)}),C5=async e=>{if(await k5(e.verifyDelayMs??AS),!await qr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),n=fe(r);return!xe(n,e.staleAfterMs)}});var Xi,PS,T5,cC,dC,_S,wS,vS=l(()=>{"use strict";Xi=m(require("node:fs")),PS=m(require("node:path"));B();bS();T5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cC=e=>PS.default.join(e,yS),dC=(e=L())=>{let t=cC(e);if(!Xi.default.existsSync(t))return null;try{let r=JSON.parse(Xi.default.readFileSync(t,"utf8"));return!T5(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},_S=(e=L(),t=Date.now())=>{let r=dC(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=SS:!0},wS=(e=L(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=cC(e);return Xi.default.mkdirSync(PS.default.dirname(n),{recursive:!0}),Xi.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var WS,uC=l(()=>{"use strict";ee();vS();WS=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!_S())return{attempted:!1,ok:!1,targets:e};wS();let n=await t();if(!n.ok)return{attempted:!0,ok:!1,errorMessage:n.errorMessage,targets:e};let o=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await _e(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:o.some(s=>s.revived||s.reason==="healthy"),targets:o}}});var pC=l(()=>{"use strict";vS();uC()});var LS=l(()=>{"use strict";Ge()});var mC=l(()=>{"use strict";Ge()});var gC,Co,fC,hC,yC,x5,I5,SC,O5,N5,AC,bC=l(()=>{"use strict";gC=require("node:child_process"),Co=m(require("node:fs")),fC=m(require("node:os")),hC=m(require("node:path")),yC=require("node:util");LS();mC();we();x5=(0,yC.promisify)(gC.execFile),I5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),SC=e=>{let t=ot(e),r=t===null?N():N(t);if(!Co.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Co.default.readFileSync(r.configPath,"utf8"));return!I5(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},O5=e=>SC(e)?.wsUrl??null,N5=e=>{let t=O5(e);return t!==null?We(t):ve(e)?.appOrigin??null},AC=async e=>{let t=e?.installDir??L(),r=SC(t),n=r!==null?We(r.wsUrl):N5(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=hC.default.join(fC.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Co.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??ot(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await x5("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Co.default.existsSync(i)&&Co.default.unlinkSync(i)}}});var PC={};St(PC,{attemptAgentWitchWatchdogReinstall:()=>M5});var M5,_C=l(()=>{"use strict";pC();bC();M5=async e=>WS(e,()=>AC())});var wC,vC,WC,j5,D5,H5,Zi,ES=l(()=>{"use strict";Xk();pS();mS();gS();fS();cS();Wu();Lu();we();ao();rC();Tu();wC=e=>e===null?N():N(e),vC=async(e,t,r)=>{if(!await qr(e))return"not_running";let o=wC(t);if(at(o))return"healthy";let s=fe(o);return xe(s,r)?"stale_connection":"healthy"},WC=async e=>{let t=e?.staleAfterMs??12e4,r=L(),n=Q(r);return Promise.all(n.map(async o=>{let s=await vC(o.launchAgentLabel,o.profileEmail,t),i=wC(o.profileEmail),a=fe(i),c=await qr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:xe(a,t),needsRevive:s!=="healthy",reason:s}}))},j5=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},D5=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",H5=async e=>{let t=await _e(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(lC(),aC)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Zi=async e=>{if(!st())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=L();await Lo(r),await Yi(r);let n=Q(r),o=[];for(let p of n){let f=await vC(p.launchAgentLabel,p.profileEmail,t);if(f==="healthy"){o.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:f});continue}o.push(await H5({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:f,staleAfterMs:t}))}if(o.length===0){let p=Vr();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(_C(),PC)),f=await p(o);s=f.attempted,i=f.ok,a=f.errorMessage,c=[...f.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&sC({event:D5(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:j5(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var LC,xu,EC=l(()=>{"use strict";LC=m(require("node:os"));pS();Tu();ES();xu=async()=>{let e=await WC(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:LC.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:ko(1)[0]??null}}});var RS=l(()=>{"use strict";cS();ES();EC();Tu()});var Qi,ea,ta,RC=l(()=>{"use strict";ee();RS();Qi=async()=>{await Lo();let e=Q(),t=[];for(let r of e){let n=await _e(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Vr();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},ea=Zi,ta=Zi});var kS=l(()=>{"use strict";RC()});var Ou,Iu,kC,CS,CC,$5,F5,z5,U5,B5,Nu,TC=l(()=>{"use strict";Ou=require("node:child_process"),Iu=m(require("node:fs")),kC=m(require("node:os")),CS=m(require("node:path")),CC=require("node:util");ee();B();$5=(0,CC.promisify)(Ou.execFile),F5=()=>CS.default.join(kC.default.homedir(),"Library","LaunchAgents"),z5=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await $5("launchctl",["bootout",r]).catch(()=>{})},U5=e=>{let t=CS.default.join(F5(),`${e}.plist`);Iu.default.existsSync(t)&&Iu.default.unlinkSync(t)},B5=e=>{(0,Ou.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Nu=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=L();if(!Iu.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=$t(e);for(let r of t)await z5(r),U5(r);return B5(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var xC,Mu,IC,To,OC,G5,V5,q5,TS,K5,xS,NC=l(()=>{"use strict";xC=require("node:child_process"),Mu=m(require("node:fs")),IC=m(require("node:os")),To=m(require("node:path")),OC=require("node:util");ee();G5=(0,OC.promisify)(xC.execFile),V5=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],q5=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],TS=e=>{Mu.default.existsSync(e)&&Mu.default.rmSync(e,{force:!0})},K5=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await G5("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},xS=async e=>{let r=(e.listLaunchAgentLabels??$t)(e.layout.installDir),n=e.launchAgentsDir??To.default.join(IC.default.homedir(),"Library","LaunchAgents"),o=e.bootoutLaunchAgent??K5;for(let i of r)await o(i),TS(To.default.join(n,`${i}.plist`));let s=To.default.dirname(e.layout.configPath);for(let i of V5)TS(To.default.join(s,i));for(let i of q5)TS(To.default.join(e.layout.installDir,i));return Mu.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var IS,MC=l(()=>{"use strict";IS={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var OS,jC=l(()=>{"use strict";OS="unknown_identity"});var NS=l(()=>{"use strict";MC();jC()});var J5,MS,DC=l(()=>{"use strict";NS();J5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),MS=e=>e.type!=="system.error"||!J5(e.payload)?!1:e.payload.errorCode===OS});var jS=l(()=>{"use strict";TC();NC();DC()});var ju=l(()=>{"use strict";ee();Ge();jS();RS()});var xo,Du,Hu=l(()=>{"use strict";ju();xo=(e=20)=>ko(e),Du=xu});var $u,Io,Fu,zu=l(()=>{"use strict";ju();$u=sn,Io=(e=20)=>rn(e),Fu=e=>on(e)});var Uu,DS=l(()=>{"use strict";ju();Uu=()=>Nu()});var HC=l(()=>{"use strict";Kh();jy();lS();kS();Hu();zu();DS()});var $C={};St($C,{buildAgentWitchAutomationStatusFromWakeServer:()=>Vi,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>$u,buildAgentWitchWakeHealthResponse:()=>bi,buildAgentWitchWakeIdentityResponse:()=>Pi,buildAgentWitchWatchdogStatus:()=>Du,installHarnessFromWakeServer:()=>Oi,readAgentWitchSelfUpdateLogEntries:()=>Io,readAgentWitchWatchdogLogEntries:()=>xo,restartAgentWitchFromWakeServer:()=>ta,reviveAgentWitchWebSocketFromWakeServer:()=>ea,runAgentWitchSelfUpdateFromWakeServer:()=>Fu,runAgentWitchUninstallLocalFromWakeServer:()=>Uu,runAutomationFromWakeServer:()=>Gi,syncAutomationsFromWakeServer:()=>Bi,wakeAgentWitchLaunchAgents:()=>Qi});var FC=l(()=>{"use strict";HC()});var zC,UC,HS,$S,BC=l(()=>{"use strict";zC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),UC=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?zC(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?zC(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},HS=e=>{let t=e.watchdogLogs.map(UC).join(""),r=e.updateLogs.map(UC).join("");return`<!doctype html>
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
</html>`},$S=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var GC,VC,qC=l(()=>{"use strict";GC=m(require("node:net")),VC=()=>new Promise((e,t)=>{let r=GC.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var KC,Y5,FS,JC=l(()=>{"use strict";KC=m(require("node:net"));qC();Ai();Si();we();Y5=e=>new Promise(t=>{let r=KC.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),FS=async()=>{let e=L(),t=ct();if(await Y5(t))return UE(t),t;let r=await VC();return Md(e,r),r}});var X5,zS,YC=l(()=>{"use strict";X5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zS=e=>({force:X5(e)&&e.force===!0})});var ra=l(()=>{"use strict";xi();BC();JC();YC();Rf();pd();ro()});var US,j,BS,GS,na,XC=l(()=>{"use strict";US=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},BS=e=>{e.writeHead(403),e.end()},GS=e=>e.url?.split("?")[0]??"/",na=(e,t,r=20,n=200)=>{let o=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(o.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,n):r}});var pt=l(()=>{"use strict";XC()});var Z5,ZC,QC=l(()=>{"use strict";lS();pt();Z5=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},ZC=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,Vi(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await Z5(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let n=Bi(t);return j(e.response,n.ok?200:400,n,e.cors.headers),!0}let r=await Gi(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var Q5,tT,eT,rT,VS,nT,qS=l(()=>{"use strict";Q5=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],tT=e=>/embed|minilm|^bge-/i.test(e),eT=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),rT=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),VS=e=>e.filter(t=>t.trim().length>0&&!tT(t)),nT=(e,t)=>{let r=e.filter(o=>o.trim().length>0&&!tT(o)),n=t?.trim()??"";if(n.length>0){let o=r.find(s=>eT(s,n));if(o!==void 0)return o}for(let o of Q5){let s=r.find(i=>eT(i,o));if(s!==void 0)return s}return r[0]??null}});var KS,iT,aT,Bu,lT,oT,sT,eV,tV,rV,nV,oV,sV,mt,oa=l(()=>{"use strict";KS=require("node:child_process"),iT=m(require("node:fs")),aT=m(require("node:os")),Bu=m(require("node:path"));Ge();lt();qS();lT=3e3,oT=["claude-cli","codex","cursor","antigravity"],sT={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},eV=(e,t)=>new Promise(r=>{let n=(0,KS.spawn)(e,[...t],{stdio:"ignore"}),o=setTimeout(()=>{n.kill("SIGTERM"),r(!1)},lT);n.on("error",()=>{clearTimeout(o),r(!1)}),n.on("close",s=>{clearTimeout(o),r(s===0)})}),tV=()=>{let e=aT.default.homedir();return["ollama",Bu.default.join(e,".local","bin","ollama"),Bu.default.join(e,".agent-witch","ollama","ollama"),Bu.default.join(e,".local-agent-witch","ollama","ollama")]},rV=e=>new Promise(t=>{let r=(0,KS.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),n=[],o=setTimeout(()=>{r.kill("SIGTERM"),t(null)},lT);r.stdout.on("data",s=>{n.push(s)}),r.on("error",()=>{clearTimeout(o),t(null)}),r.on("close",s=>{if(clearTimeout(o),s!==0){t(null);return}t(rT(Buffer.concat(n).toString("utf8")))})}),nV=async()=>{for(let e of tV()){if(e!=="ollama"&&!iT.default.existsSync(e))continue;let t=await rV(e);if(t!==null)return t}return[]},oV=e=>{let t=e.installedWriterIds.map(s=>sT[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,n=se(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${sT[e.writerAgent]} is not installed.`:"",o=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[n,r,o].filter(s=>s.length>0).join(" ")},sV=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:lo},mt=async e=>{let t=oT.map(i=>{let a=_d(i,e.commands);return eV(a.command,a.args)}),[r,...n]=await Promise.all([nV(),...t]),o=oT.flatMap((i,a)=>n[a]===!0?[i]:[]),s=nT(r,sV());return{ollamaModels:r,estimateModel:s,installedWriterIds:o,capabilityNote:oV({writerAgent:e.writerAgent??"",installedWriterIds:o,estimateModel:s})}}});var iV,aV,JS,cT=l(()=>{"use strict";iV="http://127.0.0.1:11434",aV=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},JS=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||iV;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return n.ok?aV(await n.json()):null}catch{return null}}});var YS=l(()=>{"use strict";lt();oa();cT();qS()});var lV,dT,uT=l(()=>{"use strict";YS();lV={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},dT=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:lV[t]})),ollamaModels:VS(e.ollamaModels)})});var cV,pT,mT=l(()=>{"use strict";YS();pt();uT();cV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},pT=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await mt({commands:ie({})});return j(e.response,200,{ok:!0,...dT({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await cV(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",n=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",o=await JS({model:r,prompt:n});return o===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:o},e.cors.headers),!0)}return!1}});var dV,gT,fT=l(()=>{"use strict";jy();pt();dV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},gT=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await dV(e);if(t===null)return!0;let r=Oi(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var hT=l(()=>{"use strict";ut()});var XS,yT=l(()=>{"use strict";hT();Ii();XS=e=>{if(!Jt(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:ze({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var ST,ZS,QS=l(()=>{"use strict";ae();ut();Ii();ST=e=>{if(!Jt(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},ZS=async e=>{let t=ST(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Lr("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let n=$();if(n===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let o=X({wsUrl:n.wsUrl,pairingToken:n.pairingToken});return o===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(ze({projectFolderPath:r}),await $i(o,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var AT=l(()=>{"use strict";yT();QS()});var bT,PT=l(()=>{"use strict";AT();QS();pt();bT=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=XS(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await ZS(t),n=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,n,r,e.cors.headers),!0}return!1}});var _T,wT=l(()=>{"use strict";ra();zu();Hu();_T=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=xo(50),r=Io(50);return e.response.writeHead(200,$S()),e.response.end(HS({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var vT,WT=l(()=>{"use strict";Kh();pt();vT=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,bi(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,Pi(),e.cors.headers),!0):!1});var LT,ET=l(()=>{"use strict";DS();pt();LT=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Uu();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var RT,kT=l(()=>{"use strict";kS();pt();RT=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await ea();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await ta();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Qi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var CT,TT=l(()=>{"use strict";ra();zu();pt();CT=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=$u();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=na(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:Io(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=zS(t),n=await Fu({force:r});return j(e.response,n.ok?200:503,n,e.cors.headers),!0}return!1}});var xT,IT=l(()=>{"use strict";Hu();pt();xT=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Du();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=na(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:xo(t)},e.cors.headers),!0}return!1}});var OT,NT=l(()=>{"use strict";QC();mT();fT();PT();wT();WT();ET();kT();TT();IT();OT=[vT,_T,xT,RT,CT,LT,gT,bT,ZC,pT]});var MT,jT=l(()=>{"use strict";NT();MT=async e=>{for(let t of OT)if(await t(e))return!0;return!1}});var uV,DT,HT=l(()=>{"use strict";xi();pt();jT();uV=(e,t,r,n)=>({request:e,response:t,wakePort:r,cors:n,pathname:GS(e),readJsonBody:()=>US(e)}),DT=async(e,t,r)=>{let n=e.headers.origin,o=pu(n);try{if(n!==void 0&&n.length>0&&!o.allowed){BS(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=uV(e,t,r,o);if(await MT(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}}});var $T,Pn,Gu,Vu=l(()=>{"use strict";$T=m(require("node:http"));ra();HT();Pn=async()=>{let e=await FS(),t=$T.default.createServer((r,n)=>{DT(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Gu=Pn});var FT={};St(FT,{runAgentWitchBridgeCli:()=>pV});var pV,zT=l(()=>{"use strict";ee();Vu();pV=async()=>{$e("agent-witch-bridge");let e=await Pn(),t=zt(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var UT=l(()=>{"use strict";Gt()});var Oo,eA,BT=l(()=>{"use strict";Oo=(e,t,r)=>e===1?t:r,eA=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${Oo(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Oo(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${Oo(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Oo(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Oo(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${Oo(p,"year","years")} ago`}});var _n,tA,mV,gV,rA,Er,sa,nA,GT=l(()=>{"use strict";_n=m(require("node:fs")),tA=m(require("node:path")),mV="local-ws-traffic.ndjson",gV=500,rA=e=>tA.default.join(e.logsDir,mV),Er=(e,t)=>{let r=rA(e);_n.default.mkdirSync(tA.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});_n.default.appendFileSync(r,`${n}
`,"utf8")},sa=(e,t=gV)=>{let r=rA(e);if(!_n.default.existsSync(r))return[];let o=_n.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},nA=e=>{let t=rA(e);_n.default.existsSync(t)&&_n.default.writeFileSync(t,"","utf8")}});var fV,VT,qT,KT=l(()=>{"use strict";NS();fV=new Set(Object.values(IS)),VT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qT=e=>{if(!VT(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!fV.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!VT(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var JT,YT=l(()=>{"use strict";JT=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var hV,yV,SV,ia,XT=l(()=>{"use strict";YT();hV=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,yV=e=>hV.test(e),SV=e=>JT(e),ia=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>ia(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&yV(n)){r[n]=SV(o);continue}r[n]=ia(o)}return r}});var Lt,oA,AV,bV,PV,sA,ZT,QT,ex,_V,qu,wn,Ku,iA,tx=l(()=>{"use strict";Lt=m(require("node:fs")),oA=m(require("node:path"));KT();XT();AV="local-ws-trace.ndjson",bV=1e4,PV=1440*60*1e3,sA=e=>oA.default.join(e.logsDir,AV),ZT=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},QT=e=>{if(!Lt.default.existsSync(e))return;let t=Lt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-PV,o=t.filter(s=>{let i=ZT(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-bV);Lt.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},ex=(e,t)=>{let r=sA(e);Lt.default.mkdirSync(oA.default.dirname(r),{recursive:!0}),Lt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),QT(r)},_V=e=>e.parsed===null?{_empty:!0}:ia(e.parsed),qu=(e,t,r)=>{let n=qT(r);ex(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:_V(n)})},wn=(e,t)=>{ex(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:ia({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Ku=(e,t=80)=>{let r=sA(e);if(QT(r),!Lt.default.existsSync(r))return[];let n=Lt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let i=ZT(s);i!==null&&o.push(i)}return o.reverse()},iA=e=>{let t=sA(e);Lt.default.existsSync(t)&&Lt.default.writeFileSync(t,"","utf8")}});var Rr,rx,wV,aA,Ju,nx=l(()=>{"use strict";Rr=m(require("node:fs")),rx=m(require("node:path")),wV=256e3,aA=e=>{Rr.default.mkdirSync(rx.default.dirname(e),{recursive:!0}),Rr.default.writeFileSync(e,"","utf8")},Ju=(e,t=wV)=>{if(!Rr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Rr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=Rr.default.openSync(e,"r");try{Rr.default.readSync(a,i,0,s,o)}finally{Rr.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var aa=l(()=>{"use strict";GT();tx();nx()});var lA,cA,ox=l(()=>{"use strict";lA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cA=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",n=e.exists&&e.content.length>0?`<pre class="error-log-view">${lA(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${lA(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${lA(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${n}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var sx=l(()=>{"use strict";ox()});var dA,uA=l(()=>{"use strict";dA=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var pA=l(()=>{"use strict";qi()});var mA,gA,ix=l(()=>{"use strict";pA();mA=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e);return Number.isNaN(n)?!0:r-n>t},gA=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var ax=l(()=>{"use strict";uA();ix()});var lx,la,fA,ca=l(()=>{"use strict";uA();lx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),la=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=lx(e),r=lx(dA(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},fA=`(function () {
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
})();`});var vn,vV,hA,cx=l(()=>{"use strict";vn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vV=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},hA=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${vn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?vn(r.direction):vn(r.kind),i=`trace-body-${n}`,a=vn(vV(r.body));return`<tr>
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
    </section>`});var ux,dx,yA,px=l(()=>{"use strict";ux=m(require("node:path"));B();Gt();dx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yA=e=>{let t=te(e.installDir),n=`AW_HOME="$HOME/${ux.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${dx(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${dx(n)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var mx=l(()=>{"use strict";ca();cx();px();ca()});var WV,Xt,da=l(()=>{"use strict";WV=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Xt=WV});var gx,fx,hx,yx,Sx,Ax,bx,No=l(()=>{"use strict";gx="projects",fx="knowledge",hx="chunks.ndjson",yx="lessons.ndjson",Sx="error-chunks.ndjson",Ax="usage-stats.json",bx="knowledge-location.json"});var Yu,LV,Xu,SA=l(()=>{"use strict";Yu=m(require("node:path"));No();LV=(e,t)=>{let r=t.trim(),n=Yu.default.join(e.installDir,gx,r,fx);return{projectId:r,knowledgeDirPath:n,ragChunksFilePath:Yu.default.join(n,hx),memoryRunsFilePath:Yu.default.join(n,yx)}},Xu=LV});var AA,EV,Px,_x=l(()=>{"use strict";AA=m(require("node:fs"));No();un();EV=e=>{let t=qe(e.projectFolderPath),r=`${t.metaDirPath}/${bx}`,n={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};AA.default.mkdirSync(t.metaDirPath,{recursive:!0}),AA.default.writeFileSync(r,`${JSON.stringify(n,null,2)}
`)},Px=EV});var Mo,vx,wx,RV,Wx,Lx=l(()=>{"use strict";Mo=m(require("node:fs")),vx=m(require("node:path"));Xr();un();SA();_x();wx=(e,t)=>{Mo.default.existsSync(e)&&(Mo.default.existsSync(t)&&Mo.default.statSync(t).size>0||(Mo.default.mkdirSync(vx.default.dirname(t),{recursive:!0}),Mo.default.copyFileSync(e,t)))},RV=e=>{let t=qe(e.projectFolderPath),r=Xu(e.layout,e.projectId),n=`${t.memoryDirPath}/${eo}`;wx(t.ragChunksFilePath,r.ragChunksFilePath),wx(n,r.memoryRunsFilePath),Px({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},Wx=RV});var bA,kV,Ex,Rx=l(()=>{"use strict";bA=m(require("node:fs"));un();kV=e=>{let t=qe(e);if(!bA.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(bA.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let n=r;return{projectId:typeof n.projectId=="string"&&n.projectId.trim().length>0?n.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Ex=kV});var kx,CV,jo,Zu=l(()=>{"use strict";kx=m(require("node:path"));Xr();un();Lx();Rx();SA();CV=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Ex(t),n=e.projectId?.trim()||r.projectId?.trim()||"";if(n.length>0){Wx({layout:e.layout,projectFolderPath:t,projectId:n});let s=Xu(e.layout,n);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:n}}let o=qe(t);return{ragChunksFilePath:o.ragChunksFilePath,memoryRunsFilePath:kx.default.join(o.memoryDirPath,eo),projectId:null}},jo=CV});var Qu,xV,ep,PA=l(()=>{"use strict";Qu=m(require("node:fs"));No();xV=(e,t=500)=>{if(!Qu.default.existsSync(e))return;let r=Qu.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let n=r.slice(r.length-t);Qu.default.writeFileSync(e,`${n.join(`
`)}
`)},ep=xV});var tp,IV,Wn,_A=l(()=>{"use strict";tp=m(require("node:path"));No();Zu();IV=e=>{let t=jo(e);if(t===null)return null;let r=tp.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:tp.default.join(r,Ax),errorChunksFilePath:tp.default.join(r,Sx)}},Wn=IV});var Tx,ua,xx,Cx,wA,Ix,MV,vA,Ox,WA,LA,EA,RA=l(()=>{"use strict";Tx=require("node:crypto"),ua=m(require("node:fs")),xx=m(require("node:path"));da();No();_A();Cx=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),wA=e=>{if(!ua.default.existsSync(e))return Cx();try{let t=JSON.parse(ua.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return Cx()},Ix=(e,t)=>{ua.default.mkdirSync(xx.default.dirname(e),{recursive:!0}),ua.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},MV=e=>{let t=Xt(e).trim(),n=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,Tx.createHash)("sha256").update(n).digest("hex").slice(0,16)},vA=e=>{let t=Wn(e);return t===null?null:wA(t.usageStatsFilePath)},Ox=e=>{if(e.chunkIds.length===0)return;let t=Wn(e);if(t===null)return;let r=wA(t.usageStatsFilePath),n={...r.chunkRetrievalCounts};for(let o of e.chunkIds)n[o]=(n[o]??0)+1;Ix(t.usageStatsFilePath,{...r,chunkRetrievalCounts:n})},WA=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=Wn(e);if(r===null)return null;let n=MV(t),o=wA(r.usageStatsFilePath),s=o.errorOccurrences[n],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return Ix(r.usageStatsFilePath,{...o,errorOccurrences:{...o.errorOccurrences,[n]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),n},LA=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,EA=e=>{if(e===null)return[];let t=[];for(let[r,n]of Object.entries(e.chunkRetrievalCounts))n<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:n,chunkId:r,message:`Knowledge chunk "${r}" was injected ${n} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,n]of Object.entries(e.errorOccurrences))n.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:n.count,errorFingerprint:r,message:`Error "${n.preview}" occurred ${n.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:n.count,errorFingerprint:r,message:`Same error (${n.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,n)=>r.priority-n.priority||n.hitCount-r.hitCount)}});var pa,Nx,jV,DV,Mx,HV,kA,ma,Do,CA,Ho,TA,xA=l(()=>{"use strict";pa=m(require("node:fs")),Nx=m(require("node:path"));da();Zu();PA();RA();jV="http://127.0.0.1:11434",DV="nomic-embed-text",Mx=(e,t,r)=>jo({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,HV=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},kA=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},ma=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||jV,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||DV;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},Do=(e,t,r)=>{let n=Mx(e,t,r);if(n===null||!pa.default.existsSync(n))return[];let o=pa.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},CA=async e=>{let t=Xt(e.text),r=kA(t);if(r.length===0)return 0;let n=Mx(e.layout,e.projectFolderPath,e.projectId);if(n===null)return 0;pa.default.mkdirSync(Nx.default.dirname(n),{recursive:!0});let o=0;for(let s of r){let i=await ma(s);if(i===null)continue;let a={id:`${Date.now()}-${o}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};pa.default.appendFileSync(n,`${JSON.stringify(a)}
`,"utf8"),o+=1}return ep(n),o},Ho=async e=>{let t=await ma(e.query);if(t===null)return[];let r=e.minScore??0,s=Do(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:HV(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return Ox({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},TA=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var ga,jx,$V,FV,IA,OA,NA,Dx=l(()=>{"use strict";ga=m(require("node:fs")),jx=m(require("node:path"));da();_A();PA();xA();$V=e=>{if(!ga.default.existsSync(e))return[];let t=ga.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let n of t)try{r.push(JSON.parse(n))}catch{}return r},FV=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},IA=async e=>{let t=Wn(e);if(t===null)return 0;let r=Xt(e.text),n=kA(r,600);if(n.length===0)return 0;let o=t.errorChunksFilePath;ga.default.mkdirSync(jx.default.dirname(o),{recursive:!0});let s=0;for(let i of n.slice(0,3)){let a=await ma(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};ga.default.appendFileSync(o,`${JSON.stringify(c)}
`,"utf8"),s+=1}return ep(o,200),s},OA=async e=>{let t=Wn(e);if(t===null)return[];let r=await ma(e.query);if(r===null)return[];let n=e.minScore??.3;return $V(t.errorChunksFilePath).map(s=>({chunk:s,score:FV(r,s.embedding)})).filter(s=>s.score>=n).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},NA=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var MA=l(()=>{"use strict";xA();RA();Dx()});var jA,Hx=l(()=>{"use strict";jA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var $x=l(()=>{"use strict";Hx()});var pe,DA,HA=l(()=>{"use strict";$x();pe=jA,DA=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${pe.gray50};
  --aw-zinc-100: ${pe.gray100};
  --aw-zinc-200: ${pe.gray200};
  --aw-zinc-400: ${pe.gray400};
  --aw-zinc-500: ${pe.gray500};
  --aw-zinc-600: ${pe.gray600};
  --aw-zinc-700: ${pe.gray700};
  --aw-zinc-800: ${pe.gray900};
  --aw-zinc-900: ${pe.gray900};
  --aw-brand-600: ${pe.brand600};
  --aw-brand-700: ${pe.brand700};
  --aw-brand-50: ${pe.brand50};
  --aw-emerald-50: ${pe.success50};
  --aw-emerald-700: ${pe.success700};
  --aw-amber-50: ${pe.warning50};
  --aw-amber-900: ${pe.warning900};
  --aw-red-50: ${pe.error50};
  --aw-red-700: ${pe.error700};
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
.sdlc-run-result-shortcuts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 0;
}
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
.sdlc-compose-details { display: flex; flex-direction: column; gap: 1rem; }
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
.sdlc-submit {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
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
.sdlc-run-status-dot-success {
  background: #22c55e;
  box-shadow: 0 0 0 3px #dcfce7;
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
`.trim()});var zV,UV,$A,Fx,FA,zx=l(()=>{"use strict";HA();ca();zV=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,UV=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],$A=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Fx=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${zV}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,FA=e=>{let t=UV.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=$A(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"",o=$A(e.installBundleVersionLabel?.trim()??"unknown"),s=Fx("brand brand-in-sidebar",o),i=Fx("brand brand-in-header",o);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${$A(e.title)} \xB7 Agent Witch Local</title>
  <style>${DA}</style>
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
  <script>${fA}</script>
</body>
</html>`}});var rp,fa,np=l(()=>{"use strict";rp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fa=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${rp(e.syncMessage)}</p>`:"",n=rp(e.manageHref),o=rp(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${rp(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${n}" target="_blank" rel="noopener noreferrer">${o} \u2197</a></p>
    </div>`}});var zA,UA,BA,Ux=l(()=>{"use strict";zA=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,UA=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,BA=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Bx=l(()=>{"use strict";zx();np();Ux()});var $o,GA,Gx=l(()=>{"use strict";ca();$o=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GA=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${$o(e.wakeError)}</div>`:"",a=la(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
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
    </div>`}});var Vx=l(()=>{"use strict";Gx()});var k,op=l(()=>{"use strict";k=e=>e==="passed"||e==="stopped"||e==="failed"});var qx,VA,Ln,qA,sp=l(()=>{"use strict";qx="Stopped at the round limit. The best prompt is kept.",VA="Stopped because the score stopped rising. The best prompt is kept.",Ln="Finished. The best prompt is the result.",qA="Wizard ended. Progress from finished steps is kept."});var ha,KA=l(()=>{"use strict";ha=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],n=e.instructions?.trim()??"",o=n.length===0?[]:["","Instructions:",n];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...o,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",n.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var BV,GV,ya,Kx,ip=l(()=>{"use strict";BV=/\n+|;\s+/,GV=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,ya=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let n=r.split(BV).map(o=>o.replace(/^[-*]\s*/,"").trim()).filter(o=>o.length>0).reduce((o,s)=>{if(t.length+o.length>=12)return o;let i=s.toLowerCase();return[...t,...o].some(c=>c.toLowerCase()===i)?o:[...o,GV(s)]},[]);return[...t,...n]},[]),Kx=e=>{let t=ya(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ye,Sa=l(()=>{"use strict";ye=e=>{let t=e.flatMap(o=>o.score===null?[]:[{roundNumber:o.roundNumber,promptText:o.promptText,score:o.score,reasons:o.reasons}]),[r,...n]=t;return r===void 0?null:n.reduce((o,s)=>s.score>o.score||s.score===o.score&&s.roundNumber>o.roundNumber?s:o,r)}});var Aa,JA=l(()=>{"use strict";ip();Sa();Aa=e=>{let t=[...e.priorRounds,e.current],r=ye(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},n=[...t].filter(o=>o.score<r.score).sort((o,s)=>s.roundNumber-o.roundNumber).map(o=>o.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:Kx(n)}}});var YA,VV,qV,Jx,Yx=l(()=>{"use strict";YA={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},VV=e=>{try{let t=JSON.parse(e.fragment);return{...YA,objects:[...e.objects,t]}}catch{return{...YA,objects:e.objects}}},qV=(e,t)=>{if(e.inString){let n=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:n}:t==="\\"?{...e,escaped:!0,fragment:n}:t==='"'?{...e,inString:!1,fragment:n}:{...e,fragment:n}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:VV(r)},Jx=e=>[...e].reduce(qV,YA).objects});var KV,XA,JV,Xx,ZA=l(()=>{"use strict";Yx();KV=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},XA=e=>{let t=Jx(e).filter(KV),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},JV=(e,t)=>({...e,passed:e.score>=t}),Xx=(e,t)=>{let r=XA(e);return r===null?null:JV(r,t)}});var QA,eb,ap=l(()=>{"use strict";QA="The judge reply needs a score and a reason.",eb="The improver reply was empty."});var Zx,Qx=l(()=>{"use strict";Zx=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((n,o)=>o>n.best?{best:o,stall:0}:{best:n.best,stall:n.stall+1},{best:t,stall:0}).stall}});var e0,t0=l(()=>{"use strict";e0=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((n,o)=>o.score>n.best?{best:o.score,reasons:[]}:{best:n.best,reasons:[...n.reasons,o.reasons]},{best:t.score,reasons:[]}).reasons}});var XV,r0,n0=l(()=>{"use strict";Qx();t0();sp();ip();XV=e=>{let t=ya(e);return t.length===0?VA:`${VA} Avoid: ${t.join("; ")}.`},r0=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:qx};if(Zx(e.scores)>=3){let t=e.scores.map((r,n)=>({score:r,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:XV(e0(t))}}return null}});var kr,ZV,tb,o0,lp=l(()=>{"use strict";kr=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},ZV=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,tb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",ZV(e.tokens),`Delay: ${kr(e.delayMs)}`,"",n,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},o0=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var QV,s0,i0=l(()=>{"use strict";ZA();QV=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,s0=e=>{let r=(QV.exec(e)?.[1]??e).trim();return r.length===0||XA(r)!==null?null:r}});var a0,cp,l0=l(()=>{"use strict";lp();i0();ap();a0=e=>({type:"call",role:"judge",choice:e.choice,prompt:o0({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),cp=e=>{let t=s0(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:eb}}:{nextPrompt:t,continuation:a0({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var rb,c0=l(()=>{"use strict";KA();JA();ZA();ap();sp();n0();ap();l0();rb=e=>{let t=Xx(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:QA}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],n=e.round??r.length,o=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=r0({scores:o.map(a=>a.score),reasons:o.map(a=>a.reasons),round:n,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=Aa({current:{roundNumber:n,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:ha({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var ba,nb=l(()=>{"use strict";ba=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var ob,d0=l(()=>{"use strict";ob=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",n,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var eq,sb,u0=l(()=>{"use strict";lp();eq=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,sb=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",eq(e.tokens),`Delay: ${kr(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var tq,rq,nq,ib,p0=l(()=>{"use strict";tq=/[A-Za-z0-9_./~-]{3,180}/g,rq=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,nq=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||rq.test(t)},ib=(e,t=12)=>{let r=[];for(let n of e.matchAll(tq)){let o=n[0].replace(/\.+$/,"");if(!(!nq(o)||r.includes(o))&&(r.push(o),r.length>=t))break}return r}});var Pa,m0=l(()=>{"use strict";Pa=(e,t)=>e.flatMap(r=>{let n=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||n.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:n}]}).sort((r,n)=>r.roundNumber-n.roundNumber)});var dp,ab,g0,_a,lb=l(()=>{"use strict";dp=e=>Math.floor(e/2),ab=e=>Math.max(dp(e)+1,e-20),g0=(e,t)=>e>=t?"passes":e>=ab(t)?"close":e>=dp(t)?"weak":"bad",_a=e=>[{band:"bad",label:`0\u2013${dp(e)-1} bad`},{band:"weak",label:`${dp(e)}\u2013${ab(e)-1} weak`},{band:"close",label:`${ab(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var up,cb=l(()=>{"use strict";lb();up=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",n=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${g0(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),o=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...n,...o]}});var f0,h0=l(()=>{"use strict";f0=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var y0,S0=l(()=>{"use strict";y0=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var oq,sq,A0,b0=l(()=>{"use strict";op();cb();h0();S0();oq=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],sq=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",A0=e=>{let t=e.wizard;if(t===void 0)return[];let r=f0(t),n=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),o=e.status==="wizard_paused",s=t.phase==="complete",i=oq.map((p,f)=>{let b=!s&&!o&&f===r?"active":"done";return{id:`wizard-${f+1}`,label:p,state:b,detail:null}}).filter((p,f)=>s?!0:f<=n),a=o&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=y0(t)&&(!o||a)?up(e):[],d=k(e.status)&&!s?[{id:"end",label:sq(e),state:"done",detail:e.errorMessage}]:[];return[...i,...c,...d]}});var iq,db,P0=l(()=>{"use strict";op();cb();b0();iq=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",db=e=>{if(e.wizard!==void 0)return A0(e);let t=up(e),r=k(e.status)?[{id:"end",label:iq(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var _0=l(()=>{"use strict";Gt()});var w0,wa,va,Fo,pp,ub,v0=l(()=>{"use strict";_0();w0="/prompt-optimizer/agent",wa=`${Bt}${w0}`,va=`${Bt}/prompt-optimizer`,Fo="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",pp=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Fo}`,ub="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Cr=l(()=>{"use strict"});var W0,L0=l(()=>{"use strict";W0=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var pb,R0=l(()=>{"use strict";L0();Cr();pb=e=>({schemaVersion:3,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:W0(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{}})});var mb,k0=l(()=>{"use strict";mb=e=>({...e,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null}))})});var gb,C0=l(()=>{"use strict";Cr();gb=(e,t,r)=>{let n=r.trim();if(n.length===0)return e;let o=e.avoidByStep[t]??[],s=[n,...o].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var T0,fb,x0=l(()=>{"use strict";T0=["generalize","evaluate","separate","optimize_modules"],fb=(e,t)=>{let r=T0.indexOf(t);if(r===-1)return e;let n=T0.slice(r+1);return n.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:n.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:n.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:n.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:n.includes("separate")?null:e.selectedSplitTopology,modules:n.includes("optimize_modules")?[]:e.modules,currentModuleIndex:n.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:n.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var mp,hb=l(()=>{"use strict";ip();mp=e=>{let t=ya(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var yb,I0=l(()=>{"use strict";hb();yb=e=>{let t=mp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,n,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(o=>o.length>0).join(`
`)}});var lq,cq,dq,O0,N0=l(()=>{"use strict";lq=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),cq=/^\{\{[a-zA-Z0-9_-]+\}\}$/,dq=(e,t)=>{let{masked:r,tokens:n}=t.reduce((o,s)=>{let i=s.sampleValue.trim();if(i.length===0)return o;let a=new RegExp(lq(i),"g"),c=[...o.tokens];return{masked:o.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return n.reduce((o,s,i)=>o.replace(`\0PO${i}\0`,s),r)},O0=(e,t)=>{let r=[...t].sort((o,s)=>s.sampleValue.length-o.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(o=>cq.test(o)?o:dq(o,r)).join("")}});var Sb,M0=l(()=>{"use strict";N0();Sb=(e,t)=>e.map(r=>({...r,modules:r.modules.map(n=>({...n,prompt:O0(n.prompt,t)}))}))});var uq,bb,j0=l(()=>{"use strict";Cr();hb();uq=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),bb=e=>{let t=mp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,o=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=uq(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",o,r,n,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Pb,D0=l(()=>{"use strict";nb();Pb=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",n=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),o=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...n,s].filter(a=>a.length>0).join(`
`);return ba({promptText:e.promptText,instructions:`${i}${o.join(`
`)}`})}});var Wa,_b=l(()=>{"use strict";Sa();Wa=e=>{let t=e.revisions.map(o=>({roundNumber:o.roundNumber,score:o.judgement?.score??null,passed:o.judgement?.passed??null,runOutput:o.run?.output??null,tokens:o.run?.tokens??null})),r=ye(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null}))),n=r===null?null:e.revisions.find(o=>o.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:n?.run?.output??null,rounds:t}}});var wb,H0=l(()=>{"use strict";_b();wb=e=>{let t=Wa({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((n,o)=>o===e.moduleIndex?{...n,status:r,selectedRevisionRound:t.bestRound,statistics:t}:n)}}});var La,$0=l(()=>{"use strict";La=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let n=r.statistics?.bestRunOutput?.trim()??"";return n.length>0?{output:n,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var pq,mq,Ue,vb=l(()=>{"use strict";Cr();pq=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let n=r.rounds.reduce((o,s)=>o+(s.tokens??0),0);return n>0?n:null},mq=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,Ue=e=>{let t=e.modules.map((s,i)=>({moduleId:s.moduleId,title:s.title,bestScore:s.statistics?.bestScore??null,tokens:pq(e,i),status:s.status})),r=t.length,n=t.filter((s,i)=>mq(e.modules[i])).length,o=r>0&&n===r?"passed":"stopped";return{passedModuleCount:n,totalModules:r,terminalStatusSuggestion:o,rows:t}}});var Wb,F0=l(()=>{"use strict";Cr();vb();Wb=e=>{let t=Ue(e.wizard),r=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${70})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&r.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,o)=>{let s=n.statistics?.bestRunOutput?.trim();s===void 0||s.length===0||r.push("",`## Module ${o+1}: ${n.title}`,"","```",s,"```")}),`${r.join(`
`)}
`}});var Lb,z0=l(()=>{"use strict";Lb=e=>{let t=e.modules.reduce((r,n)=>{let o=n.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+o},0);return t>0?t:null}});var gp,Eb=l(()=>{"use strict";gp=e=>{let t=e.trim(),n=t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t,o=n.indexOf("{"),s=n.lastIndexOf("}");if(o===-1||s<=o)throw new Error("No JSON object in reply.");return JSON.parse(n.slice(o,s+1))}});var gt,gq,Rb,U0=l(()=>{"use strict";gt=m(Rs());Eb();gq=(0,gt.isType)({name:gt.isNonEmptyString,description:gt.isString,sampleValue:gt.isString}),Rb=e=>{let t=gp(e);if(!(0,gt.isType)({templatedPrompt:gt.isNonEmptyString,variables:(0,gt.isArrayWithEachItem)(gq)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var re,fq,hq,kb,B0=l(()=>{"use strict";re=m(Rs());Cr();Eb();fq=(0,re.isType)({id:re.isNonEmptyString,title:re.isNonEmptyString,prompt:re.isNonEmptyString,order:re.isNumber}),hq=(0,re.isType)({id:re.isNonEmptyString,title:re.isNonEmptyString,summary:re.isString,topology:(0,re.isOneOf)("chain","parallel"),modules:(0,re.isArrayWithEachItem)(fq),recommended:re.isBoolean}),kb=e=>{let t=gp(e);if(!(0,re.isType)({options:(0,re.isArrayWithEachItem)(hq)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),n=r.filter(o=>o.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return n!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var zo,G0=l(()=>{"use strict";zo=e=>{let t=e.wizard.attempts.filter(n=>n.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var yq,Ea,Cb=l(()=>{"use strict";yq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ea=(e,t)=>{let r=new Map(t.map(n=>[n.name,n.sampleValue]));return e.replace(yq,(n,o)=>{let s=r.get(o);return s===void 0?n:s})}});var Ra,ka,V0=l(()=>{"use strict";Sa();Cb();Ra=e=>Ea(e.templatedPrompt,e.variables),ka=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(n=>n.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ye(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Ra(e.wizard)}});var Sq,Ca,q0=l(()=>{"use strict";Sq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ca=(e,t)=>e.replace(Sq,(r,n)=>{let o=t[n];return o===void 0||o.trim()===""?r:o})});var Aq,Ta,Tb=l(()=>{"use strict";Aq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ta=e=>{let t=new Set,r=[];for(let n of e.matchAll(Aq)){let o=n[1];t.has(o)||(t.add(o),r.push(o))}return r}});var xa,En,K0=l(()=>{"use strict";xa=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),En=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var bq,fp,xb,J0=l(()=>{"use strict";Tb();bq="wizardParam_",fp=e=>`${bq}${e}`,xb=e=>{let t=Ta(e.modulePrompt),r={...e.wizard.parameterValues},n=new Set(e.wizard.variables.map(o=>o.name));for(let o of t){let s=fp(o),i=e.posted.get(s),a=i!==null?i.trim():r[o]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:n.has(o)?`Fill in {{${o}}} before running this module.`:`Fill in {{${o}}} (not listed in Step 1) before running this module.`};r[o]=a}return{ok:!0,parameterValues:r}}});var Rn,Y0=l(()=>{"use strict";Rn=["generalize","evaluate","separate","optimize_modules"]});var C=l(()=>{"use strict";op();sp();c0();KA();lp();nb();d0();u0();p0();JA();m0();Sa();P0();lb();v0();Cr();R0();k0();C0();x0();I0();M0();j0();D0();_b();H0();$0();vb();F0();z0();U0();B0();G0();V0();Cb();q0();Tb();K0();J0();Y0()});var Oa=l(()=>{"use strict";lt();oa();wd()});var Pq,eI,tI=l(()=>{"use strict";Oa();Pq=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,eI=e=>{let t=go(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(Pq)],n=r[r.length-1];if(n===void 0)return null;let o=Number(n[1])+Number(n[2]);return Number.isFinite(o)&&o>=1?o:null}});var _q,wq,rI,Ib,vq,Wq,ft,nI,oI,kn=l(()=>{"use strict";Oa();tI();_q="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",wq="The writer waited on terminal input and did not return a prompt.",rI=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Ib=e=>{let t=e.trim();if(t.length===0||t.length>=500||!rI.test(t))return null;let r=t.split(`
`).map(n=>n.trim()).find(n=>rI.test(n))??t;return r.length>280?`${r.slice(0,277)}...`:r},vq=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},Wq=e=>Ib(e.stdout)??Ib(e.stderr)??(vq(e.replyFile)?Ib(e.replyFile):null),ft=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return _q;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?wq:null},nI=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],oI=e=>{let t=e.replyFileText?.trim()??"",r=ft([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let n=Wq({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(n!==null)return{ok:!1,errorMessage:n};let o=eI([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:o};if(e.writerAgent==="claude-cli"){let i=go(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:o}:{ok:!1,errorMessage:"The writer did not reply."}}});var Na,Ob=l(()=>{"use strict";Na=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var hp,Bo,Nb=l(()=>{"use strict";Ob();hp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bo=e=>{let t=Na(e.cycle);if(t.length===0&&e.cycle.revisions.length===0)return"";let r=t.length===0?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",n=e.caption===void 0?"":`<p class="muted">${hp(e.caption)}</p>`,o=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",s=a=>o&&a===0?"Trial run":`Round ${a}`,i=e.cycle.revisions.map(a=>{let c=a.judgement?.score,d=c==null?`${s(a.roundNumber)} \u2014 not scored`:`${s(a.roundNumber)} \u2014 ${c}`,p=a.judgement?.reasons?.trim()??"",f=p.length===0?"":`<br><span class="muted">${hp(p)}</span>`;if(e.interactive){let b=e.selectedRound===a.roundNumber?" checked":"";return`<li><label><input type="radio" name="wizardRevisionRound" value="${a.roundNumber}"${b}> ${hp(d)}</label>${f}</li>`}return`<li>${hp(d)}${f}</li>`}).join("");return`${r}${n}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${i}</ul>`}});var Mb,sI,yp,iI,Sp=l(()=>{"use strict";Mb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sI=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Mb(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Mb(t.prompt)}</pre></li>`).join("")}</ol>`,yp=e=>sI([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),iI=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(o=>o.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Mb(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${sI(t.modules.map(o=>({title:o.title,prompt:o.prompt})))}
  </section>`}});var le,Lq,Eq,Rq,kq,Cq,Tq,Go,Ap=l(()=>{"use strict";C();Nb();Sp();le=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lq=e=>{let t=e.wizard;if(t===void 0)return null;let n=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(n===void 0||typeof n.output!="object"||n.output===null)return null;let o=n.output.revisions;if(!Array.isArray(o))return null;let s=[];for(let i of o){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},Eq=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.variables.length===0?'<p class="muted">No variables yet.</p>':`<ul class="sdlc-wizard-vars">${t.variables.map(a=>`<li><strong>{{${le(a.name)}}}</strong> \u2014 ${le(a.description)} (sample: ${le(a.sampleValue)})</li>`).join("")}</ul>`,n=t.templatedPrompt.trim(),o=n.length===0?'<p class="muted">No templated prompt yet.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${le(n)}</pre>`,s=Ea(t.templatedPrompt,t.variables).trim(),i=s.length===0||s===n?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${le(s)}</pre>`;return`${r}${o}${i}`},Rq=(e,t)=>`<ul class="sdlc-wizard-revisions">${e.map(n=>{let o=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,s=t===n.roundNumber?" (selected)":"",i=n.reasons?.trim()??"",a=i.length===0?"":`<br><span class="muted">${le(i)}</span>`;return`<li>${le(o)}${s}${a}</li>`}).join("")}</ul>`,kq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Bo({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let n=Lq(e);if(n!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${Rq(n,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=ka({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${le(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${le(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},Cq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let n=t.modules.map(o=>`<li><strong>${le(o.title)}</strong> <span class="muted">(${le(o.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${n}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(n=>{let o=n.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===n.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${le(n.title)}</strong>${o}${le(s)}<br><span class="muted">${le(n.summary)} (${le(n.topology)})</span>${yp(n)}</li>`}).join("")}</ul>`},Tq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((o,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${le(i)}</span> <strong>${le(o.title)}</strong>${le(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${le(o.prompt)}</pre></li>`}).join(""),n=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Bo({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${n}`},Go=(e,t)=>{switch(t){case"wizard-1":return Eq(e);case"wizard-2":return kq(e);case"wizard-3":return Cq(e);case"wizard-4":return Tq(e);default:return""}}});var xq,aI,lI,cI=l(()=>{"use strict";C();kn();Ap();xq=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},aI=(e,t,r,n)=>{let o=ft(t);return{title:e,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:n,promptText:o===null?t:null,promptNote:o,bodyHtml:null}},lI=(e,t)=>{if(t.id.startsWith("wizard-")){let o=Go(e,t.id);return{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:o.trim().length===0?null:o}}if(t.id==="end"){let o=ye(e.revisions.map(s=>({roundNumber:s.roundNumber,promptText:s.promptText,score:s.judgement?.score??null,reasons:s.judgement?.reasons??null})));return o===null?{title:t.label,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:aI(t.label,o.promptText,o.score,o.reasons)}let r=t.id==="rewrite"?e.currentRound:xq(t.id),n=r===null?void 0:e.revisions.find(o=>o.roundNumber===r);return n===void 0?{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:aI(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail)}});var Ma,dI,uI=l(()=>{"use strict";Ma=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dI=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?'<p class="muted">Not scored yet.</p>':`<p class="muted">${Ma(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,n=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Ma(e.feedback.trim())}</p>`,o=e.promptNote!==null?`<div class="alert-error">${Ma(e.promptNote)}</div>`:e.promptText===null?"":`<h2>Saved prompt</h2><pre class="mono">${Ma(e.promptText)}</pre>`;return`<h2>${Ma(e.title)}</h2>${t}${r}${n}${o}`}});var Cn,Vo,ja=l(()=>{"use strict";Cn=e=>e.toLocaleString("en-US"),Vo=(e,t)=>e.revisions.reduce((r,n)=>t!==void 0&&n.roundNumber>t?r:r+(n.writerTokens??0)+(n.run?.tokens??0)+(n.judgement?.tokens??0),0)});var bp,Iq,pI,Pp,mI,gI,_p=l(()=>{"use strict";C();cI();uI();ja();bp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Iq=(e,t)=>{let r=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',n=/^score-(\d+)$/.exec(e.id),o=e.state==="done"&&n!==null?Vo(t,Number(n[1])):0,s=o>0?`<span class="sdlc-node-reason">${Cn(o)} tokens so far</span>`:"",i=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${bp(e.detail)}</span>`:"",a=dI(lI(t,e)),c=t.wizard!==void 0&&t.wizard.phase==="complete"&&k(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${bp(e.id)}"`:"";return`<li class="sdlc-node sdlc-node-${e.state}"><button type="button" class="sdlc-node-open"${c} data-sdlc-node>${r}<span class="sdlc-node-label">${bp(e.label)}${i}${s}</span></button><template>${a}</template></li>`},pI=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>Iq(r,t)).join("")}</ol>`,Pp=e=>`<div class="sdlc-score" aria-label="What the score means">${_a(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${bp(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,mI='<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog"><button class="btn btn-secondary" type="submit">Close</button></form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>',gI=`<script>
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
</script>`});var wp,vp,Wp,fI,jb=l(()=>{"use strict";wp="support-reply",vp="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Wp=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),fI=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Lp,hI,yI=l(()=>{"use strict";C();_p();jb();Lp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hI=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. <strong>Classic loop (90 / 10 rounds)</strong> skips the wizard: a judge scores the prompt in your folder, an improver rewrites under the pass score, and the loop stops when the score passes, you press Stop run, the round limit is hit, or the score has not risen for 3 rounds. After each scored round the page shows tokens spent. The next rewrite starts from the highest scoring prompt; lower scores become an avoid list. The round limit starts at 10 on classic runs (wizard evaluate defaults differ). Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field. The pass score slider defaults to ${90} on classic runs.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>You set the pass score with the slider. The bar fades from a weak score to a pass. The mark is the usual ${90}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${Pp(90)}
      <h2>Writers and folder</h2>
      <p>You choose the judge and the improver. Each one has an optional instructions field, used with the goal. Each round the judge runs the prompt in the folder you chose. If the prompt needs an input, put that input in the judge instructions. The judge then reads the git changes, or the files the prompt names, and scores those changes. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder. It does not guess a printed reply, and it does not score the prompt wording. A separate pass checks the tokens and suggests what to cut before the improver runs. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, and improver you last chose. The first visit uses your home directory and leaves the judge and improver blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot runs this loop itself before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a run in that folder. maxRounds is optional and defaults to 10. When only one writer is installed, that writer scores and rewrites. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${Lp(vp)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Lp(Wp)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Lp(fI)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Lp(wp)}">Run this sample</a>
      </div>
    </section>`});var Db,Ep,Oq,SI,AI=l(()=>{"use strict";Db=m(require("node:fs")),Ep=m(require("node:path")),Oq=e=>Ep.default.join(Ep.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),SI=(e,t)=>{let r=Oq(e),n=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;Db.default.mkdirSync(Ep.default.dirname(r),{recursive:!0}),Db.default.appendFileSync(r,n,"utf8")}});var qo,bI,Nq,PI,Mq,_I,Rt,K,wI,G,Ke=l(()=>{"use strict";qo=m(require("node:fs")),bI=m(require("node:path"));C();AI();Nq=e=>e.wizard===void 0?e:{...e,wizard:mb(e.wizard)},PI=new Set,Mq=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),_I=(e,t)=>{qo.default.mkdirSync(bI.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;qo.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),qo.default.renameSync(r,e)},Rt=e=>{if(!qo.default.existsSync(e))return[];try{let t=JSON.parse(qo.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(Mq).map(Nq):[]}catch{return[]}},K=(e,t)=>Rt(e).find(r=>r.id===t)??null,wI=(e,t)=>{PI.add(t);let r=Rt(e).filter(n=>n.id!==t);_I(e,r)},G=(e,t)=>{if(PI.has(t.id))return;let r=Rt(e),n=r.some(o=>o.id===t.id)?r.map(o=>o.id===t.id?t:o):[t,...r];_I(e,n),SI(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var vI,Rp,Hb,Tn,$b,kt,xn,Re,Je=l(()=>{"use strict";vI=m(require("node:fs")),Rp=m(require("node:os")),Hb=m(require("node:path"));ut();Tn="~",$b=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,kt=e=>{let t=Rp.default.homedir(),r=$b(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},xn=e=>{let t=e.trim().length===0?"~":e.trim(),r=Ve(t),n=Hb.default.isAbsolute(r)?$b(r):$b(Hb.default.resolve(Rp.default.homedir(),r));try{if(!vI.default.statSync(n).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:n,display:kt(n)}},Re=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Rp.default.homedir()});var Ko,Ct,Da,WI,kp,jq,LI,EI,RI,Fb=l(()=>{"use strict";Ko=m(require("node:fs")),Ct=m(require("node:path")),Da=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},WI=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),kp=(e,t)=>{let r=Da(e);return r.length>0?r:Da(t)},jq=e=>{let t=kp(e.fileName,e.name),r=e.promptText.trim(),n=e.name.trim();if(t.length===0||r.length===0||n.length===0)return null;let o=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${WI(n)}`,...o.length>0?[`description: ${WI(o)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},LI=e=>`.cursor/skills/${e}/SKILL.md`,EI=(e,t)=>{let r=Da(t);if(r.length===0)return!1;let n=Ct.default.resolve(e),o=Ct.default.resolve(n,".cursor","skills"),s=Ct.default.resolve(n,LI(r));return s.startsWith(`${o}${Ct.default.sep}`)?Ko.default.existsSync(s):!1},RI=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(kp(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Ct.default.resolve(e.workingDirectory);try{if(!Ko.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=jq({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let n=LI(r.slug),o=Ct.default.resolve(t,".cursor","skills"),s=Ct.default.resolve(t,n);if(!s.startsWith(`${o}${Ct.default.sep}`))return{ok:!1,errorCode:"path"};if(Ko.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Ko.default.mkdirSync(Ct.default.dirname(s),{recursive:!0}),Ko.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:n}}});var Dq,kI,CI,TI=l(()=>{"use strict";C();C();Ke();Je();kn();Fb();Dq=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,kI=e=>{let t=e.get("savedSkill");return t!==null&&Dq.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},CI=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=K(e.storePath,t),n=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!k(r.status))return{kind:"redirect",location:n("skillError=working")};let o=ye(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(o===null||ft(o.promptText)!==null)return{kind:"redirect",location:n("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=RI({workingDirectory:Re(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:o.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:n(`skillError=${a}`)}}return{kind:"redirect",location:n(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var x,Hq,Cp,Ye,In,II,xI,OI,NI,je=l(()=>{"use strict";x="manual",Hq=["claude-cli","codex","cursor","antigravity"],Cp={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Ye=e=>e===x?"You":e in Cp?Cp[e]:e,In=e=>Hq.filter(t=>e.includes(t)),II=e=>{let t=In(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},xI=(e,t)=>t===x?x:e.find(r=>r===t)??null,OI=(e,t,r)=>{let n=In(e),o=xI(n,t),s=xI(n,r);return o===null||s===null?null:{judge:o,improver:s}},NI=(e,t,r)=>{let n=In(e);return t===null||t.trim()===""?r!==x?r:n[0]??null:t===x?null:n.find(o=>o===t)??null}});var zb,MI,jI=l(()=>{"use strict";zb={ok:!1,errorMessage:"Stopped.",stopped:!0},MI=(e,t,r)=>{if(t===void 0)return;let n=()=>{e.kill("SIGTERM"),r(zb)};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var DI,Ha,HI,Ub,$q,Fq,zq,Xe,$a=l(()=>{"use strict";DI=require("node:child_process"),Ha=m(require("node:fs")),HI=m(require("node:os")),Ub=m(require("node:path"));Oa();jI();kn();$q=["claude-cli","codex","cursor","antigravity"],Fq=18e4,zq=e=>$q.includes(e),Xe=e=>new Promise(t=>{if(e.signal?.aborted){t(zb);return}if(!zq(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,n=wt(r,e.prompt,ie({}));if(n===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!Ha.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let o=Ub.default.join(Ha.default.mkdtempSync(Ub.default.join(HI.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=nI({writerAgent:r,baseArgs:n.args,replyPath:o}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,DI.spawn)(n.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=f=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(f))};MI(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??Fq),d.stdout.on("data",f=>{i.push(Buffer.from(f))}),d.stderr.on("data",f=>{a.push(Buffer.from(f))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let f=Ha.default.existsSync(o)?Ha.default.readFileSync(o,"utf8"):null;p(oI({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:f}))})})});var $I,Uq,Fa,Tp,xp=l(()=>{"use strict";C();je();$I=e=>e===x?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},Uq=(e,t,r,n,o,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:n,reasons:o,rawReply:t,tokens:s}}:i),Fa=(e,t,r=null)=>{let n=e.revisions.find(a=>a.roundNumber===e.currentRound),o=rb({raw:t,passScore:e.passScore,goal:e.goal,promptText:n?.promptText??"",improver:$I(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:Pa(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=Uq(e,t,o.verdict?.score??null,o.verdict?.passed??null,o.verdict?.reasons??null,r),i=new Date().toISOString();return o.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:o.continuation.type,errorMessage:o.continuation.type==="passed"?null:o.continuation.errorMessage,updatedAt:i}},Tp=(e,t,r=null)=>{let n=cp({raw:t,judge:$I(e.judgeModel),goal:e.goal,passScore:e.passScore}),o=new Date().toISOString();return n.nextPrompt===null?{...e,status:"failed",errorMessage:n.continuation.type==="failed"?n.continuation.errorMessage:"The improver reply was empty.",updatedAt:o}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:n.nextPrompt,judgement:null,writerTokens:r}],updatedAt:o}}});var Ip,Bb=l(()=>{"use strict";Ip=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let n=`Token review: ${r}`;return{...e,revisions:e.revisions.map(o=>{if(o.roundNumber!==e.currentRound)return o;let s=o.judgement?.reasons?.trim()??"";return{...o,run:o.run===void 0?o.run:{...o.run,tokenReview:r},judgement:o.judgement===null?o.judgement:{...o.judgement,reasons:s.length===0?n:`${s}

${n}`}}})}}});var UI,Op,Np,FI,zI,Gb,Bq,BI,Vb,Gq,GI,Vq,qq,VI,qI=l(()=>{"use strict";UI=require("node:child_process"),Op=m(require("node:fs")),Np=m(require("node:path"));C();FI=4e3,zI=12e3,Gb=(e,t)=>{let r=(0,UI.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Bq=e=>Gb(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",BI=e=>{let t=Gb(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(n=>{if(n.length<4)return[];let o=n.slice(3).trim();return[[(o.includes(" -> ")?o.split(" -> ").at(-1)??o:o).replaceAll('"',""),n]]});return Object.fromEntries(r)},Vb=(e,t)=>{let r=Np.default.resolve(e,t),n=Np.default.relative(e,r);if(n.startsWith("..")||Np.default.isAbsolute(n)||!Op.default.existsSync(r)||!Op.default.statSync(r).isFile())return null;let o=Op.default.readFileSync(r,"utf8");return o.includes("\0")?"(binary file)":o.length>FI?`${o.slice(0,FI)}
\u2026truncated`:o},Gq=e=>e.length>zI?`${e.slice(0,zI)}
\u2026truncated`:e,GI=e=>{let t=ib(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(o=>[o,Vb(e.workingDirectory,o)])),n=Bq(e.workingDirectory);return{git:n,status:n?BI(e.workingDirectory):{},files:r,paths:t}},Vq=(e,t)=>{let r=Gb(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let n=Vb(e,t);return n===null?`${t} is missing.`:n},qq=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",VI=e=>{let t=e.before.git?BI(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),n=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Vb(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),o=r.map(a=>Vq(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",o.length>0?`Changes since the run started:
${o.join(`
`)}`:"",n.length>0?`Files named in the prompt:
${n.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:qq(e.before.git,e.before.paths.length>0),evidence:Gq(i.join(`

`))}}});var Jb,F,Yb,Se,KI,Kq,Jq,JI,Jo,YI,Yo,Yq,Xq,za,qb,Kb,Zq,XI,Qq,eK,tK,ZI,rK,QI,eO,nK,oK,tO,rO=l(()=>{"use strict";Jb=require("node:child_process"),F=m(require("node:fs")),Yb=m(require("node:os")),Se=m(require("node:path")),KI=8e6,Kq=16e6,Jq=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],JI=(e,t)=>{let r=(0,Jb.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Jo=(e,t)=>(0,Jb.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,YI=e=>{let t=JI(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let n=r.slice(3).trim().replaceAll('"',"");return(n.includes(" -> ")?n.split(" -> "):[n]).map(s=>[s.trim(),r])}))},Yo=(e,t)=>{let r=Se.default.resolve(e,t),n=Se.default.relative(e,r);return n.startsWith("..")||Se.default.isAbsolute(n)?null:r},Yq=(e,t)=>{let r=Yo(e,t);if(r===null||!F.default.existsSync(r))return null;let n=F.default.statSync(r);return!n.isFile()||n.size>KI?null:F.default.readFileSync(r)},Xq=(e,t,r)=>{let n=Yo(e,t);n!==null&&(F.default.mkdirSync(Se.default.dirname(n),{recursive:!0}),F.default.writeFileSync(n,r))},za=(e,t)=>{let r=Yo(e,t);r===null||!F.default.existsSync(r)||F.default.rmSync(r,{recursive:!0,force:!0})},qb=(e,t)=>Jo(e,["cat-file","-e",`HEAD:${t}`]),Kb=e=>{let t=JI(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},Zq=e=>Se.default.resolve(e)!==Se.default.resolve(Yb.default.homedir()),XI=e=>{if(!F.default.existsSync(e))return 0;let t=F.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?F.default.readdirSync(e).reduce((r,n)=>r+XI(Se.default.join(e,n)),0):0},Qq=(e,t,r)=>{let n=Yo(e,r);if(n===null||!F.default.existsSync(n))return{relativePath:r,existed:!1,copyDir:null};if(XI(n)>Kq)return{relativePath:r,existed:!0,copyDir:null};let o=Se.default.join(t,"cache",r);return F.default.mkdirSync(Se.default.dirname(o),{recursive:!0}),F.default.cpSync(n,o,{recursive:!0}),{relativePath:r,existed:!0,copyDir:o}},eK=400,tK=32e6,ZI=e=>{let t=[],r=0,n=!0,o=s=>{if(!(!n||!F.default.existsSync(s)))for(let i of F.default.readdirSync(s)){if(!n||i===".git"||i==="node_modules")continue;let a=Se.default.join(s,i),c=F.default.statSync(a);if(c.isDirectory()){o(a);continue}if(!(!c.isFile()||c.size>KI)){if(t.length>=eK||r+c.size>tK){n=!1;return}r+=c.size,t.push(Se.default.relative(e,a))}}};return o(e),{paths:t,complete:n}},rK=(e,t,r)=>{let n=Yo(e,r);if(n===null||!F.default.existsSync(n))return null;let o=Yq(e,r);if(o===null)return"skip";let s=Se.default.join(t,"files",r);return F.default.mkdirSync(Se.default.dirname(s),{recursive:!0}),F.default.writeFileSync(s,o),s},QI=e=>{let t=F.default.mkdtempSync(Se.default.join(Yb.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?YI(e.workingDirectory):{},n=e.git?{paths:[],complete:!0}:ZI(e.workingDirectory),o=e.git?[...Object.keys(r),...e.namedPaths]:[...n.paths,...e.namedPaths],s=Object.fromEntries([...new Set(o)].map(i=>[i,rK(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?Kb(e.workingDirectory):null,isolateCaches:Zq(e.workingDirectory),complete:n.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:Jq.map(i=>Qq(e.workingDirectory,t,i))}},eO=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){za(e.workingDirectory,t);return}Xq(e.workingDirectory,t,F.default.readFileSync(r))}},nK=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?eO(e,t):qb(e.workingDirectory,t)?Jo(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):za(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",n=r.startsWith(" ")||r.startsWith("?");n&&qb(e.workingDirectory,t)&&Jo(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),n&&!qb(e.workingDirectory,t)&&Jo(e.workingDirectory,["reset","-q","HEAD","--",t])},oK=(e,t)=>{let r=Yo(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){za(e.workingDirectory,t.relativePath),F.default.mkdirSync(Se.default.dirname(r),{recursive:!0}),F.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){za(e.workingDirectory,t.relativePath);return}if(F.default.existsSync(r))for(let n of F.default.readdirSync(r)){let o=Se.default.join(r,n);F.default.statSync(o).mtimeMs>=e.startedMs-1e3&&F.default.rmSync(o,{recursive:!0,force:!0})}}}},tO=e=>{try{if(e.git){if(Kb(e.workingDirectory)!==e.head&&(!(e.head===null?Jo(e.workingDirectory,["update-ref","-d","HEAD"]):Jo(e.workingDirectory,["reset","--hard",e.head]))||Kb(e.workingDirectory)!==e.head))throw new Error("head");let r=YI(e.workingDirectory);for(let n of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))nK(e,n)}else{if(e.complete)for(let t of ZI(e.workingDirectory).paths)e.files[t]===void 0&&za(e.workingDirectory,t);for(let t of Object.keys(e.files))eO(e,t)}for(let t of e.caches)oK(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{F.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Mp,jp,sK,iK,aK,lK,cK,nO,dK,oO,sO=l(()=>{"use strict";C();xp();Bb();qI();rO();je();Je();$a();Mp=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),jp=e=>({...e,status:"stopped",errorMessage:Ln,judgePhase:void 0,updatedAt:new Date().toISOString()}),sK=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),iK=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==x?t:e.improverModel!==x?e.improverModel:null}return e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null},aK=async e=>{let t=Re(e.cycle),r=GI({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),n=QI({workingDirectory:t,git:r.git,namedPaths:r.paths}),o=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Pb({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:La(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):ba({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await Xe({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?VI({workingDirectory:t,before:r,writerReply:i.text}):null,c=tO(n);return i.ok?!c.ok||a===null?{ok:!1,cycle:Mp(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-o,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:jp(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Mp(e.cycle,i.errorMessage)})},lK=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:aK({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),cK=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),nO=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let n=await Xe({writerAgent:e.reviewer,workingDirectory:Re(e.cycle),prompt:sb({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return n.ok?{kind:"suggestion",text:n.text.trim(),tokens:n.tokens}:n.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:jp(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},dK=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===x)return t;let n={...t,judgePhase:"scoring"};e.onProgress?.(n);let o=await Xe({writerAgent:t.judgeModel,workingDirectory:Re(t),prompt:ob({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return o.ok?{...Fa(n,o.text,o.tokens),judgePhase:void 0}:o.stopped===!0||e.signal?.aborted===!0?jp(n):(e.onWriterFailure?.(t.judgeModel),Mp(n,o.errorMessage))},oO=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return dK(e);let n=iK(t),o=await lK({cycle:t,revision:r,runner:n,signal:e.signal,onWriterFailure:e.onWriterFailure});if(o===null)return t;if(!o.ok)return o.cycle;let s=r.run===void 0?sK(t,o.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===x){let p=await nO({cycle:s,run:o.run,promptText:r.promptText,reviewer:n,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...cK(s,p.text),judgePhase:void 0}}let i=await Xe({writerAgent:t.judgeModel,workingDirectory:Re(t),prompt:tb({goal:t.goal,lookedAt:o.run.lookedAt??"the writer reply",evidence:o.run.evidence??o.run.output,tokens:o.run.tokens,delayMs:o.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?jp(s):(e.onWriterFailure?.(t.judgeModel),Mp(s,i.errorMessage));let a=await nO({cycle:s,run:o.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Fa(s,i.text,c);return Ip(d,a.text)}});var Dp,Xb=l(()=>{"use strict";C();Dp=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t?.judgement?.score,n=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||n.length===0?null:Aa({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:n},priorRounds:Pa(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null})),e.currentRound)})}});var Hp,uK,pK,Zb,iO=l(()=>{"use strict";C();xp();sO();Xb();je();Je();$a();Hp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),uK=e=>({...e,status:"stopped",errorMessage:Ln,updatedAt:new Date().toISOString()}),pK=(e,t,r,n,o)=>t.ok?null:t.stopped===!0||n?.aborted===!0?uK(e):(o?.(r),Hp(e,t.errorMessage)),Zb=async(e,t,r,n)=>{let o=e.revisions.find(c=>c.roundNumber===e.currentRound);if(o===void 0)return Hp(e,"This round has no prompt.");if(e.status==="judging")return oO({cycle:e,revision:o,onWriterFailure:t,signal:r,onProgress:n});if(e.status!=="improving")return Hp(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===x)return e;let s=Dp(e);if(s===null)return Hp(e,"The improver needs the score and the reason.");let i=await Xe({writerAgent:e.improverModel,workingDirectory:Re(e),prompt:ha({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=pK(e,i,e.improverModel,r,t);return a!==null?a:Tp(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var zp,$p,aO,mK,gK,Fp,lO,cO,fK,hK,dO,uO,pO,Qb=l(()=>{"use strict";C();je();Je();$a();iO();Ob();zp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),$p=(e,t,r)=>e.wizard===void 0||t===null?zp(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},aO=e=>{let t=e.wizard;return t===void 0||Na(e).length===0?e:{...e,wizard:zo({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},mK=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",gK=e=>{let t=e.wizard;if(t===void 0)return e;let r=Wa({revisions:e.revisions});if(r.rounds.length===0)return e;let n=t.modules[t.currentModuleIndex];return{...e,wizard:zo({wizard:t,step:"optimize_modules",output:{moduleId:n?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Fp=(e,t)=>({...e,status:"wizard_paused",errorMessage:e.errorMessage,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),lO=e=>e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null,cO=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let o=r.attempts.filter(s=>s.step===t).at(-1);return o===void 0?"":JSON.stringify(o.output)},fK=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=lO(e);if(o===null)return zp(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Ra(n),i=yb({goal:e.goal,sourcePrompt:s,avoid:n.avoidByStep.generalize,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:cO(e,"generalize")}),a=await Xe({writerAgent:o,prompt:i,workingDirectory:Re(e),signal:t});if(!a.ok)return r?.(o),$p(e,"generalize",a.errorMessage);try{let c=Rb(a.text),d=zo({wizard:{...n,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:xa(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return Fp({...e,wizard:d},"generalize")}catch(c){return $p(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},hK=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=lO(e);if(o===null)return zp(e,"Choose a writer to suggest splits.");let s=ka({wizard:n,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=bb({goal:e.goal,templatedPrompt:n.templatedPrompt,variables:n.variables,evaluatedPromptReference:s,avoid:n.avoidByStep.separate,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:cO(e,"separate")}),a=await Xe({writerAgent:o,prompt:i,workingDirectory:Re(e),signal:t});if(!a.ok)return r?.(o),$p(e,"separate",a.errorMessage);try{let c=kb(a.text),d=Sb(c,n.variables),p=zo({wizard:{...n,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return Fp({...e,wizard:p},"separate")}catch(c){return $p(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},dO=e=>{let t=e.wizard;if(t===void 0)return e;let r=Ra(t),n=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:70,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:n}},uO=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let n=r.modules[t];if(n===void 0)return zp(e,"This module is missing.");let o=En(r),s=Ca(n.prompt,o),i=e.runnerModel!==void 0&&e.runnerModel!==x?e.runnerModel:e.judgeModel!==x?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:70,maxRounds:1,errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},pO=async(e,t,r,n)=>{let o=e.wizard;if(o===void 0)return Zb(e,t,r,n);if(o.gate!==null||e.status==="wizard_paused")return e;if(o.phase==="generalize")return fK(e,r,t);if(o.phase==="separate"&&o.splitOptions.length===0)return hK(e,r,t);if(o.phase==="evaluate"||o.phase==="optimize_modules"){let s=await Zb(e,t,r,n);if(k(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Na(s).length===0)return s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let p=ye(s.revisions.map(b=>({roundNumber:b.roundNumber,promptText:b.promptText,score:b.judgement?.score??0,reasons:b.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0,f=Fp({...s,wizard:{...s.wizard,evaluateSelectedRound:p}},i);return i==="evaluate"?aO(f):f}let a=Fp(s,i),c=i==="optimize_modules"&&a.wizard!==void 0?(()=>{let d=wb({wizard:{...a.wizard,modules:a.wizard.modules.map((p,f)=>f===a.wizard.currentModuleIndex&&p.status==="running"?{...p,status:"paused"}:p)},moduleIndex:a.wizard.currentModuleIndex,revisions:a.revisions,cycleStatus:mK(s.status)});return{...a,wizard:d}})():a;return i==="evaluate"?aO(c):gK(c)}return s}return o.phase==="complete",e}});var Tr,mO,yK,gO=l(()=>{"use strict";C();Je();kn();Fb();Tr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mO=e=>{if(!k(e.status))return"";let t=ye(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,n=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",o=ft(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Tr(t.reasons.trim())}</p>`,i=o===null?yK({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Re(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${Tr(o)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${n}${s}${i}</section>`},yK=e=>{let t=e.sourceSkill?.fileName??Da(e.goal),r=e.sourceSkill?.name??t,n=e.sourceSkill?.description??e.goal,o=kp(t,r),s=o.length>0&&EI(e.workingDirectory,o),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Tr(o)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Tr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Tr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Tr(n)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Tr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Tr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var fO,hO=l(()=>{"use strict";C();je();kn();fO=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!k(e.status)){let t=e.judgeModel;return{title:`${Ye(t)} is suggesting module splits.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!k(e.status)){let t=e.judgeModel;return{title:`${Ye(t)} is generalizing your prompt.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===x?{title:`Score the prompt text for round ${e.currentRound+1}.`,detail:"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."}:e.judgePhase==="scoring"?{title:`${Ye(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"No folder run in step 2. This panel keeps updating, so the page is not stuck."}:{title:`${Ye(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"Wizard evaluate revises prompt wording before the runner executes in step 4."};if(e.status==="judging"&&e.judgeModel===x){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==x?{title:`${Ye(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"You score the changes after this run."}:{title:`Score the changes from round ${e.currentRound+1}.`,detail:t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt."}}if(e.status==="judging"&&e.judgePhase==="reviewing")return{title:`${Ye(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,detail:"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck."};if(e.status==="judging"&&e.judgePhase==="scoring")return{title:`${Ye(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,detail:"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck."};if(e.status==="judging")return{title:`${Ye(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck."};if(e.status==="improving"&&e.improverModel===x){let t=e.revisions.find(n=>n.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return{title:"Rewrite the prompt.",detail:t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`}}if(e.status==="improving")return{title:`${Ye(e.improverModel)} is rewriting the prompt.`,detail:"That writer is working on this Mac. This panel keeps updating, so the page is not stuck."};if(e.status==="passed")return{title:"This prompt passed.",detail:""};if(e.status==="stopped"){let t=e.revisions.some(o=>ft(o.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let o=Ue(e.wizard),s=o.totalModules>0&&(e.wizard.phase==="complete"||o.passedModuleCount>0||k(e.status));return{title:s&&o.totalModules>0?`Wizard finished \u2014 ${o.passedModuleCount}/${o.totalModules} modules passed`:"Wizard stopped before all steps finished",detail:r.length>0?r:s?"":"Progress from finished steps is kept."}}return{title:(e.errorMessage??"").startsWith("Finished")?"Finished.":"Stopped.",detail:r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept."}}return k(e.status)?{title:"This run stopped because a reply could not be used.",detail:""}:{title:"Working on this Mac.",detail:"This panel keeps updating."}}});var Tt,Ua=l(()=>{"use strict";je();Tt=e=>{if(e.status==="improving"&&e.improverModel===x)return!0;if(e.status!=="judging"||e.judgeModel!==x)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===x}});var yO,SO=l(()=>{"use strict";yO=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var xr,SK,AO,bO=l(()=>{"use strict";C();xr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SK=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${xr(r)}</p>`},AO=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${xr(e.cycleId)}">`,n=e.instructions?.trim()??"",o=n.length===0?"":`<p class="muted">Instructions</p><p>${xr(n)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${xr(a)}.</p>`}<pre class="mono">${xr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${kr(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${xr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${o}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",f=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${xr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${o}${SK(e.score,e.reasons)}${f}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${xr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Ba,AK,PO,_O=l(()=>{"use strict";C();kn();Ba=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AK=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,n=ft(t.promptText),o=t.judgement?.reasons?`<p class="muted">${Ba(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Ba(i)}.</p>`}<pre class="mono">${Ba(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${kr(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=n===null?`<pre class="mono">${Ba(d)}</pre>`:`<div class="alert-error">${Ba(n)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${o}${a}${p}</article>`},PO=e=>e.revisions.map(t=>AK(e,t)).join("")});var wO,vO=l(()=>{"use strict";C();wO=e=>{if(k(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var xt,bK,eP,PK,_K,wK,vK,WO,LO,tP=l(()=>{"use strict";vO();xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bK="Stop this run? Writers will stop and the best prompt is kept.",eP="End the wizard? Writers will stop and progress from finished steps is kept.",PK="Skip this module and pause at the step gate?",_K=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${xt(bK)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${xt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,wK=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${xt(eP)}"><input type="hidden" name="cycleId" value="${xt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,vK=e=>{let t=xt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${xt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${xt(PK)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${xt(eP)}">End wizard</button>
    </form>
  </div>`},WO=e=>{let t=wO(e);return t==="none"?"":t==="classic"?_K(e.id):t==="wizard_end_only"?wK(e.id):vK(e)},LO=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=xt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${xt(eP)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var EO,RO=l(()=>{"use strict";C();ja();EO=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let n=r.variables.length;return r.templatedPrompt.trim().length>0?n>0?`Templated prompt \xB7 ${n} variable${n===1?"":"s"}`:"Templated prompt ready":n>0?`${n} variable${n===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let n=e.revisions.filter(o=>o.judgement!==null&&o.judgement!==void 0).length;if(n>0){let o=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return o===null?`${n} scored revision${n===1?"":"s"}`:`Best score ${o} \xB7 ${n} revision${n===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let n=r.modules.length>0?r.modules.length:r.splitOptions.length;return n>0?`${n} module${n===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let n=Ue(r);if(n.terminalStatusSuggestion==="passed"&&n.passedModuleCount===n.totalModules){let o=n.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n.rows.reduce((i,a)=>i+(a.tokens??0),0);return o===null?`${Cn(s)} tokens total`:`Lowest score ${o} \xB7 ${Cn(s)} tokens total`}return`${n.passedModuleCount}/${n.totalModules} passed \xB7 \u2265 ${70}`}return""}});var Up,kO,CO=l(()=>{"use strict";C();Up=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kO=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=Ue(t),n=r.terminalStatusSuggestion==="passed"?"":`${r.passedModuleCount} of ${r.totalModules} modules passed. Some modules were skipped, stopped, or below ${70}.`,o=r.rows.map(i=>{let a=i.bestScore===null?"\u2014":r.terminalStatusSuggestion==="passed"?`${i.bestScore} / \u2265${70}`:String(i.bestScore);return`<tr><td>${Up(i.title)}</td><td>${Up(a)}</td><td>${i.tokens??"\u2014"}</td><td>${Up(i.status)}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${Up(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${o}</tbody></table></div>`}});var TO,xO,IO=l(()=>{"use strict";C();RO();CO();Ap();TO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xO=e=>{let t=e.wizard;if(t===void 0||!k(e.status))return"";let r=kO(e);return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">Step details</h3><div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-jump-wizard-results>Go to results</button></div></div>${["wizard-1","wizard-2","wizard-3","wizard-4"].map(s=>{let i=Go(e,s);if(i.trim().length===0)return"";s==="wizard-4"&&r.length>0&&(i=`${r}${i}`);let a=s==="wizard-1"?"Step 1 \u2014 Generalize":s==="wizard-2"?"Step 2 \u2014 Evaluate":s==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",c=EO(e,s),d=`${TO(a)} <span class="muted sdlc-wizard-outcome-step-hint">${TO(c)}</span>`,p=s==="wizard-4"&&t.phase==="complete"?" open":"",f=`prompt-optimizer-wizard-outcome-${s}`;return`<details class="sdlc-wizard-outcome-step" id="${f}"${p}><summary aria-controls="${f}-body">${d}</summary><div class="sdlc-wizard-outcome-step-body" id="${f}-body">${i}</div></details>`}).join("")}</div>`}});var Zt,Ga=l(()=>{"use strict";Zt=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",n=r.length>0?r:"Untitled run";return n.length<=72?n:`${n.slice(0,71).trimEnd()}\u2026`}});var Ir,Bp,rP=l(()=>{"use strict";C();_p();gO();hO();Ua();SO();Xb();bO();_O();tP();IO();ja();Je();Ga();Ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bp=e=>{let t=!k(e.status)&&e.status!=="wizard_paused"&&!Tt(e),r=fO(e),n=pI(db(yO(e)),e),o=k(e.status)?"":WO(e),s=xO(e),i=mO(e),a=e.errorMessage===null?"":`<div class="alert-error">${Ir(e.errorMessage)}</div>`,c=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",d=t?" Working for <span data-elapsed>0s</span>.":"",p=!t&&e.wizard!==void 0&&k(e.status)&&(e.wizard.phase==="complete"||Ue(e.wizard).passedModuleCount>0),f=p&&e.wizard!==void 0&&e.wizard.phase==="complete"?'<p class="sdlc-run-result-shortcuts"><button type="button" class="btn btn-secondary" data-sdlc-jump-wizard-results>Jump to module results</button><button type="button" class="btn btn-secondary" data-sdlc-copy-wizard-modules>Copy module prompts</button></p>':"",b=p&&e.wizard!==void 0?`${f}<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ir(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run opens compose with your last folder, models, and pass score. New prompt clears the form for a different goal.</p>`:"",y=r.detail.length===0&&b.length===0&&f.length===0||r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Ir(r.detail)}${d}</p>`,h=e.revisions.find(yt=>yt.roundNumber===e.currentRound),u=e.status==="improving"?Dp(e):null,S=Vo(e),A=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),g=Tt(e)?AO({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:u?.promptText??h?.promptText??"",score:u?.score??h?.judgement?.score??null,reasons:u?.reasons??h?.judgement?.reasons??null,avoid:u?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:h?.run??null,minJudgeScore:A?1:0}):"",w=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules"?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${Pp(e.passScore)}</div>`:"",W=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':k(e.status)?'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",E=t?c:p?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',R=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Ir(kt(Re(e)))}</li>`:"",S>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Cn(S)} so far</li>`:""].filter(yt=>yt.length>0),T=R.length===0?"":`<ul class="sdlc-run-meta">${R.join("")}</ul>`,I=o.length===0?"":`<div class="sdlc-run-actions">${o}</div>`,D=e.wizard!==void 0&&e.wizard.phase==="complete"&&k(e.status),oe=D?'<div class="sdlc-run-panel sdlc-run-panel-timeline sdlc-run-panel-timeline-compact"><p class="sdlc-run-progress-compact"><span class="sdlc-run-panel-title sdlc-run-progress-compact-title">Progress</span> <span class="muted">4/4 wizard steps complete.</span></p></div>':`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${n}</div>`,V=w.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${oe}</div>`:`<div class="sdlc-run-grid">${oe}${w}</div>`,U=PO(e),$r=e.wizard!==void 0&&k(e.status)&&e.revisions.every(yt=>yt.roundNumber===0&&(yt.judgement===void 0||yt.judgement===null)),H=U.length===0||$r?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${U}</div></section>`,Pe=`<p class="sdlc-run-goal" title="${Ir(e.goal.trim())}">${Ir(Zt(e.goal))}</p>`,jt=D?`${a}${s}${V}${g}${i}`:`${a}${V}${g}${s}${i}`;return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Ir(e.updatedAt)}" aria-busy="${t?"true":"false"}"><header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${W}</div>${Pe}<div class="sdlc-run-activity${p?" sdlc-run-activity-success":""}"${p?' role="status"':""}><div class="sdlc-run-activity-icon">${E}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Ir(r.title)}</h2>${y}${b}</div></div>${T}${I}</header>${jt}</section>${H}`}});var OO,Xo,Gp=l(()=>{"use strict";C();OO=e=>Rn.indexOf(e),Xo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||k(e.status)?Rn.length:t.gate!==null?OO(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?OO(t.phase):null}});var NO,MO=l(()=>{"use strict";NO=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var On,jO,DO=l(()=>{"use strict";C();MO();On=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jO=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,n=La(t,r),o=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${On(NO(n))}</pre></div>`:"",s=Ta(e.modulePrompt);if(s.length===0)return o.length>0?`<div class="sdlc-wizard-module-params">${o}</div>`:"";let i=En(t),a=s.map(c=>{let d=t.variables.find(h=>h.name===c),p=fp(c),f=i[c]??"",b=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,y=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${On(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${On(p)}">${On(b)}</label>
        ${y}
        <input class="input" type="text" id="${On(p)}" name="${On(p)}" value="${On(f)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${o}${a}</div>`}});var It,HO,$O=l(()=>{"use strict";C();DO();Nb();Sp();tP();It=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HO=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let n=r.gate,o=n==="generalize"?"Step 1 \u2014 Generalize":n==="evaluate"?"Step 2 \u2014 Evaluate":n==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=n==="generalize"?`<ul class="sdlc-wizard-vars">${r.variables.map(_=>`<li><strong>{{${It(_.name)}}}</strong> \u2014 ${It(_.description)} (sample: ${It(_.sampleValue)})</li>`).join("")}</ul><pre class="sdlc-pre">${It(r.templatedPrompt)}</pre>`:"",i=n==="evaluate"?Bo({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",c=n==="separate"?`${n==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(_=>{let w=_.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',W=_.recommended?' <span class="sdlc-badge">Recommended</span>':"",E=r.selectedSplitOptionId===_.id||r.selectedSplitOptionId===null&&_.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${It(_.id)}" required${E}> <strong>${It(_.title)}</strong>${w}${W}<br><span class="muted">${It(_.summary)}</span></label>${yp(_)}</li>`}).join("")}</ul>`:"",d=r.modules[r.currentModuleIndex],p=d?.title??"Module",f=d?.prompt??"",b=d?.status==="pending",y=n==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${It(p)}</p>${b?jO({cycle:e,modulePrompt:f}):""}<p class="muted">Test run prompt preview: ${It(Ca(f,En(r)))}</p>${d?.statistics===null||d?.statistics===void 0?"":`<p class="muted">Module stats: best ${d.statistics.bestScore??"\u2014"} / ${e.passScore} (round ${d.statistics.bestRound??"\u2014"}).</p>`}${Bo({cycle:e,interactive:!1,caption:b?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${p}\u201D (runner + judge).`})}`:"",h=n==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":n==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":n==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":b?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",u=Lb(r),S=u===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${u}</p>`,A=t?.active===!0?" sdlc-wizard-gate-active":"",g=t?.active===!0?' id="prompt-optimizer-wizard-active-step"':"";return`<section class="card sdlc-wizard-gate${A}"${g}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${o}</h2>
    <p class="sdlc-wizard-gate-lede">${h}</p>
    ${S}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${It(e.id)}">
    ${s}
    ${i}
    ${c}
    ${y}
      <div class="field">
        <label class="field-label" for="wizardFeedback">Feedback to rerun this step</label>
        <textarea class="input textarea" id="wizardFeedback" name="wizardFeedback" rows="3" placeholder="What should change?"></textarea>
      </div>
      <div class="field">
        <label class="field-label" for="wizardStepInstructions">Extra instructions (optional)</label>
        <textarea class="input textarea" id="wizardStepInstructions" name="wizardStepInstructions" rows="2" placeholder="Added to this step only when you rerun with feedback."></textarea>
      </div>
      <div class="sdlc-wizard-actions">
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue">Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${LO(e)}
  </section>`}});var WK,FO,zO=l(()=>{"use strict";C();WK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FO=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||k(e.status))return"";if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>Suggesting module splits</h2>
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let r=t.currentModuleIndex,o=t.modules[r]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    <h2>Module ${r+1} of ${t.modules.length}: ${WK(o)}</h2>
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
  </section>`:""}});var LK,EK,RK,UO,BO=l(()=>{"use strict";C();Gp();$O();zO();Ap();LK={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},EK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RK=(e,t,r)=>`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${EK(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${Go(e,t)}</div>
</details>`,UO=e=>{let t=e.wizard;if(t===void 0)return"";let r=Xo(e);if(r===null)return"";let n=Rn.slice(0,r).map((i,a)=>RK(e,`wizard-${a+1}`,LK[i])),o=t.gate!==null?HO(e,{active:!0}):FO(e),s=r>=Rn.length?"":o;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${n.join("")}${s}</div>`}});var Vp,nP=l(()=>{"use strict";BO();Sp();C();Vp=e=>{if(e===null||e.wizard!==void 0&&k(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=UO(e),r=iI(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var oP,GO,VO,qp,qO,Kp=l(()=>{"use strict";C();Ke();oP=new Map,GO=e=>{let t=new AbortController;return oP.set(e,t),t.signal},VO=e=>{oP.delete(e)},qp=e=>{oP.get(e)?.abort()},qO=(e,t)=>{let r=K(e,t);return r===null||r.wizard!==void 0?!1:(k(r.status)||(G(e,{...r,status:"stopped",errorMessage:Ln,updatedAt:new Date().toISOString()}),qp(t)),!0)}});var Va,Jp,KO,sP,JO,YO,XO,ZO,iP=l(()=>{"use strict";Va=m(require("node:fs")),Jp=m(require("node:path")),KO=e=>Jp.default.join(Jp.default.dirname(e),"prompt-optimizer-writer-ready.json"),sP=e=>{let t=KO(e);if(!Va.default.existsSync(t))return{};try{let r=JSON.parse(Va.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},JO=(e,t)=>{Va.default.mkdirSync(Jp.default.dirname(e),{recursive:!0}),Va.default.writeFileSync(KO(e),`${JSON.stringify(t,null,2)}
`)},YO=(e,t)=>sP(e)[t]?.message??null,XO=(e,t,r)=>{JO(e,{...sP(e),[t]:{message:r}})},ZO=(e,t)=>{let r=sP(e);r[t]!==void 0&&JO(e,Object.fromEntries(Object.entries(r).filter(([n])=>n!==t)))}});var aP,Yp,Xp,QO,Oe,Nn=l(()=>{"use strict";C();Oa();Qb();Ua();Kp();iP();Ke();aP=new Set,Yp={atMs:0,ids:[]},Xp=async()=>{if(Date.now()-Yp.atMs<3e4)return Yp.ids;let e=await mt({commands:ie({})});return Yp.atMs=Date.now(),Yp.ids=e.installedWriterIds,e.installedWriterIds},QO=async(e,t,r)=>{let n=K(e,t);if(n===null||k(n.status)||n.status==="wizard_paused"||Tt(n)||r.aborted)return;let o=await pO(n,i=>{ZO(e,i)},r,i=>{K(e,t)?.status==="stopped"||r.aborted||G(e,i)});K(e,t)?.status==="stopped"||r.aborted||(G(e,o),k(o.status)||await QO(e,t,r))},Oe=(e,t)=>{if(aP.has(t))return;let r=K(e,t);if(r===null||k(r.status)||r.status==="wizard_paused"||Tt(r))return;aP.add(t);let n=GO(t);QO(e,t,n).finally(()=>{aP.delete(t),VO(t)})}});var Or,qa=l(()=>{"use strict";rP();nP();Nn();Or=(e,t)=>(Oe(e,t.id),`${Bp(t)}${Vp(t)}`)});var eN,tN,rN=l(()=>{"use strict";eN=(e,t)=>e.revisions.find(n=>n.roundNumber===t)?.judgement?.score??null,tN=e=>e!==null&&e>0});var Zp,nN,lP=l(()=>{"use strict";C();Kp();Zp=e=>(qp(e.id),{...e,status:"stopped",errorMessage:qA,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null,phase:"complete"},updatedAt:new Date().toISOString()}),nN=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;qp(e.id);let r=t.currentModuleIndex,n=t.modules.map((o,s)=>s===r?{...o,status:"stopped"}:o);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:n,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var kK,oN,CK,sN,iN=l(()=>{"use strict";C();Qb();qa();Ke();Nn();rN();lP();kK="Pick a revision scored above 0 before continuing to Separate.",oN=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),CK=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null})),sN=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",n=t.get("intent")??"";if(!n.startsWith("wizard-"))return!1;let o=t.get("cycleId")?.trim()??"",s=K(e.storePath,o);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=K(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Or(e.storePath,d))};if(n==="wizard-stop-all"){let c=Zp(s);return G(e.storePath,c),a(o),!0}if(n==="wizard-skip-module"){let c=nN(s);return G(e.storePath,c),a(o),!0}if(n==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(o),!0;let p=t.get("wizardStepInstructions")?.trim()??"",f=gb(s.wizard,d,c);f=fb(f,d),f={...f,pendingStepInstructions:p};let b={...s,status:"judging",wizard:{...f,gate:null},updatedAt:new Date().toISOString()};return G(e.storePath,b),Oe(e.storePath,o),a(o),!0}if(n==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(o),!0;if(c==="generalize"){let p=(s.errorMessage?.trim().length??0)>0?oN(s):dO({...s,wizard:{...s.wizard,gate:null}});return G(e.storePath,p),Oe(e.storePath,o),a(o),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),f=eN(s,p??-1);if(!tN(f)){let h={...s,errorMessage:kK,updatedAt:new Date().toISOString()};return G(e.storePath,h),a(o),!0}let b={...s.wizard,evaluateSelectedRound:p},y={...s,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...b,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()};return G(e.storePath,y),Oe(e.storePath,o),a(o),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0){let h=oN(s);return G(e.storePath,h),Oe(e.storePath,o),a(o),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",f=s.wizard.splitOptions.find(h=>h.id===p);if(f===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return G(e.storePath,h),a(o),!0}let b=CK(f),y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...s.wizard,gate:"optimize_modules",selectedSplitOptionId:p,selectedSplitTopology:f.topology,modules:b,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(s.wizard.parameterValues??{}).length>0?s.wizard.parameterValues??{}:xa(s.wizard.variables)},updatedAt:new Date().toISOString()};return G(e.storePath,y),a(o),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(o),!0;let f=xb({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!f.ok){let u={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return G(e.storePath,u),a(o),!0}let b={...s.wizard,parameterValues:f.parameterValues};if(p.status==="pending"){let u=uO({...s,wizard:{...b,gate:null}},d);return G(e.storePath,u),Oe(e.storePath,o),a(o),!0}let y=d+1;if(y>=s.wizard.modules.length){let u=Ue(b),S={...s,status:u.terminalStatusSuggestion,wizard:{...b,gate:null,phase:"complete"},updatedAt:new Date().toISOString()};return G(e.storePath,S),a(o),!0}let h={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...b,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return G(e.storePath,h),a(o),!0}}return a(o),!0}});var TK,aN,xK,cP,IK,lN,cN=l(()=>{"use strict";je();Kp();lP();Bb();xp();Ua();Ke();TK="Add a score from 0 to 100 and the reason for it.",aN="Add a score from 1 to 100 and the reason for it.",xK="Write the next prompt.",cP="This step is not waiting for you.",IK=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},lN=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=K(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(G(e.storePath,Zp(a)),{kind:"saved",cycleId:i}):qO(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",n=K(e.storePath,r);if(n===null||!Tt(n))return n===null?{kind:"missing"}:{kind:"invalid",cycle:n,errorMessage:cP};if(t==="manual-judge"){if(n.judgeModel!==x)return{kind:"invalid",cycle:n,errorMessage:cP};let i=IK(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=n.wizard!==void 0&&(n.wizard.phase==="evaluate"||n.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:n,errorMessage:c?aN:TK};if(c&&i===0)return{kind:"invalid",cycle:n,errorMessage:aN};let d=n.revisions.find(f=>f.roundNumber===n.currentRound)?.run?.tokenReview??"",p=Ip(Fa(n,JSON.stringify({score:i,passed:i>=n.passScore,reasons:a})),d);return G(e.storePath,p),{kind:"saved",cycleId:n.id}}if(n.improverModel!==x)return{kind:"invalid",cycle:n,errorMessage:cP};let o=(e.posted.get("prompt")??"").trim();if(o.length===0)return{kind:"invalid",cycle:n,errorMessage:xK};let s=Tp(n,o);return G(e.storePath,s),{kind:"saved",cycleId:n.id}}});var dN,uN=l(()=>{"use strict";dN=`<script>
(() => {
  let root = document.getElementById("prompt-optimizer-run");
  if (!root) return;
  const paintElapsed = () => {
    const slot = root.querySelector("[data-elapsed]");
    const since = root.dataset.since;
    if (!slot || !since) return;
    const seconds = Math.max(0, Math.floor((Date.now() - Date.parse(since)) / 1000));
    const minutes = Math.floor(seconds / 60);
    const rest = String(seconds % 60).padStart(2, "0");
    slot.textContent = minutes > 0 ? minutes + "m " + rest + "s" : seconds + "s";
  };
  const applyIncomingRun = (incoming) => {
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
  let pollTimer = null;
  const poll = async () => {
    if (root.dataset.live !== "true") return;
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
    if (root.dataset.live === "true") pollTimer = setTimeout(poll, 2000);
  };
  paintElapsed();
  setInterval(paintElapsed, 1000);
  startPoll();
  document.addEventListener("sdlc-live-restart", () => {
    root = document.getElementById("prompt-optimizer-run");
    if (!root) return;
    startPoll();
  });
})();
</script>`});var pN,mN=l(()=>{"use strict";pN=`<script>
(() => {
  const lockCompose = () => {
    const fields = document.querySelector(".sdlc-fields");
    if (fields instanceof HTMLFieldSetElement) fields.disabled = true;
    const details = document.getElementById("prompt-optimizer-compose-details");
    if (details instanceof HTMLDetailsElement) details.open = false;
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
      button.disabled = true;
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
    const incomingGateSlot = holder.querySelector("#prompt-optimizer-wizard-gate-slot");
    const gateSlot = document.getElementById("prompt-optimizer-wizard-gate-slot");
    if (incomingGateSlot !== null && gateSlot !== null) {
      gateSlot.replaceWith(incomingGateSlot);
    } else if (incomingGateSlot !== null && gateSlot === null) {
      const runAnchor = document.getElementById("prompt-optimizer-run");
      const resume = document.querySelector(".sdlc-wizard-resume");
      const compose = document.getElementById("prompt-optimizer-compose");
      const insertAfter =
        runAnchor ?? resume ?? compose;
      insertAfter?.insertAdjacentElement("afterend", incomingGateSlot);
    }
    const incomingRun = holder.querySelector("#prompt-optimizer-run");
    const run = document.getElementById("prompt-optimizer-run");
    if (incomingRun !== null && run !== null) {
      run.replaceWith(incomingRun);
    } else if (incomingRun !== null && run === null) {
      const resume = document.querySelector(".sdlc-wizard-resume");
      const compose = document.getElementById("prompt-optimizer-compose");
      const insertAfter = resume ?? compose;
      insertAfter?.insertAdjacentElement("afterend", incomingRun);
    }
    const incomingDialog = holder.querySelector("#sdlc-node-dialog");
    if (incomingDialog !== null && document.getElementById("sdlc-node-dialog") === null) {
      document.body.appendChild(incomingDialog);
    }
    lockCompose();
    focusActiveWizardStep();
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
    if (details instanceof HTMLDetailsElement) details.open = false;
  }

  const jumpToWizardModuleResults = () => {
    const target = document.getElementById("prompt-optimizer-wizard-outcome-wizard-4");
    if (target instanceof HTMLDetailsElement) {
      target.open = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  document.querySelectorAll("[data-sdlc-jump-wizard-results]").forEach((btn) => {
    btn.addEventListener("click", jumpToWizardModuleResults);
  });

  document.querySelector("[data-sdlc-copy-wizard-modules]")?.addEventListener("click", () => {
    const root = document.getElementById("prompt-optimizer-wizard-outcome-wizard-4");
    if (root === null) return;
    const chunks = [...root.querySelectorAll(".sdlc-wizard-chunk-prompt")]
      .map((node) => node.textContent?.trim() ?? "")
      .filter((text) => text.length > 0);
    if (chunks.length === 0) return;
    const text = chunks
      .map((prompt, index) => \`## Module \${index + 1}\\n\\n\${prompt}\`)
      .join("\\n\\n");
    void navigator.clipboard.writeText(text).catch(() => undefined);
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

  focusActiveWizardStep();
})();
</script>`});var gN,fN=l(()=>{"use strict";gN=`<script>
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
</script>`});var hN,yN=l(()=>{"use strict";hN=`<script>
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
    document.querySelector("#prompt-optimizer-run .sdlc-run-badge-done") !== null;
  const paintRunHint = () => {
    if (!(hint instanceof HTMLElement)) return;
    if (runButtons.length === 0) {
      hint.textContent = "";
      hint.hidden = true;
      return;
    }
    const fields = document.querySelector(".sdlc-fields");
    if (fields instanceof HTMLFieldSetElement && fields.disabled) {
      hint.textContent = "This run is in progress. Use the gate or This run panel above.";
      hint.hidden = false;
      return;
    }
    const blocked = runButtons.some((btn) => btn instanceof HTMLButtonElement && btn.disabled);
    if (!blocked) {
      hint.textContent = "";
      hint.hidden = true;
      return;
    }
    if (runButtons.some((btn) => btn instanceof HTMLButtonElement && btn.dataset.canRun !== "true")) {
      hint.textContent = "Fill in the goal and prompt before you run.";
      hint.hidden = false;
      return;
    }
    const pending = slots.find((slot) => slot.dataset.ready !== "true");
    if (pending) {
      const writer = pending.dataset.writer ?? "writer";
      if (writer.length === 0) {
        hint.textContent = "Choose who scores and who rewrites the prompt.";
      } else if (writer === "manual") {
        hint.textContent = "You chose a manual step. Run will pause when that step is due.";
      } else if (pending.textContent === "Checking\u2026") {
        hint.textContent = "Checking that the chosen writer is ready\u2026";
      } else {
        hint.textContent = pending.textContent.trim().length > 0 ? pending.textContent : "Fix the writer error above, then run again.";
      }
      hint.hidden = false;
      return;
    }
    hint.textContent = "Run is not available yet.";
    hint.hidden = false;
  };
  const paintReady = () => {
    const fields = document.querySelector(".sdlc-fields");
    const fieldsDisabled =
      fields instanceof HTMLFieldSetElement && fields.disabled;
    runButtons.forEach((btn) => {
      if (!(btn instanceof HTMLButtonElement)) return;
      if (fieldsDisabled) {
        btn.disabled = true;
        return;
      }
      btn.disabled =
        btn.dataset.canRun !== "true" ||
        slots.some((slot) => slot.dataset.ready !== "true");
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
</script>`});var SN,AN=l(()=>{"use strict";C();Je();SN=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),n=t.wizard?.templatedPrompt.trim()??"",o=n.length>0?n:r?.promptText??e.prompt;return{goal:t.goal,prompt:o,folder:t.workingDirectory===void 0?e.folder:kt(t.workingDirectory),passScore:String(t.passScore),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!k(t.status)}}});var bN,PN=l(()=>{"use strict";C();Gp();bN=e=>{if(e.wizard===void 0)return k(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=Xo(e);return e.status==="wizard_paused"&&t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`}:k(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var _N,wN=l(()=>{"use strict";_N=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return"Just now";let o=Math.floor(n/60);if(o<60)return`${o} min ago`;let s=Math.floor(o/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Qt,OK,NK,vN,WN=l(()=>{"use strict";PN();wN();Ga();Qt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OK=e=>e.wizard===void 0?"classic":"wizard",NK=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Qt(t)}">`,n=bN(e),o=_N(e.updatedAt),s=t!==null&&e.id===t,i=s?`${n.subtitle} \xB7 Shown above`:n.subtitle,a=o.length===0?i:`${i} \xB7 ${o}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Qt(n.badgeClass)}">${Qt(n.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Qt(e.id)}">Resume</a>`:"";return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${OK(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Qt(e.id)}">${Qt(Zt(e.goal))}</a><p class="muted">${Qt(a)}</p></div></div><div class="sdlc-history-row-actions">${p}<form method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Qt(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form></div></li>`},vN=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>NK(a,t)).join(""),n=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="classic" aria-pressed="false">Classic</button>
  </div>`,o=Math.min(e.length,20),s=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${n}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Qt(s)}</summary>${i}</details>`:i}});var dP,Qp,LN,MK,jK,uP,EN,pP=l(()=>{"use strict";dP=m(require("node:fs")),Qp=m(require("node:path"));Je();LN=/^[a-z0-9-]+$/,MK=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},jK=(e,t)=>{if(!LN.test(t))return null;let r=e.replace(/^\uFEFF/,""),n=t,o="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let f=MK(p[2]??"");p[1]==="name"&&f.length>0&&(n=f),p[1]==="description"&&(o=f)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:n,description:o,promptText:i}},uP=e=>{let t=xn(e);if(!t.ok)return[];let r=Qp.default.resolve(t.path,".cursor","skills"),n=[];try{n=dP.default.readdirSync(r)}catch{return[]}return n.filter(o=>LN.test(o)).flatMap(o=>{let s=Qp.default.resolve(r,o,"SKILL.md");if(!s.startsWith(`${r}${Qp.default.sep}`))return[];try{let i=jK(dP.default.readFileSync(s,"utf8"),o);return i===null?[]:[i]}catch{return[]}}).toSorted((o,s)=>o.fileName.localeCompare(s.fileName))},EN=(e,t)=>uP(e).find(r=>r.fileName===t)??null});var RN,em,mP=l(()=>{"use strict";C();RN=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,2}$/.test(t)||r<1||r>30?{ok:!1,errorMessage:`Round limit must be a whole number from 1 to ${30}.`}:{ok:!0,maxRounds:r}},em=e=>e?.trim()||String(10)});var kN,CN=l(()=>{"use strict";kN={goal:{title:"Goal",practice:"Write the outcome a reader can check. Name who it is for and what must stay true.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Pass score",practice:"The run passes at this score. 90 is the usual bar. Lower it when a useful prompt is enough.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var Ka,DK,HK,Ae,Mn=l(()=>{"use strict";CN();Ka=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DK='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>',HK=e=>{let t=kN[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Ka(t.title)}" aria-describedby="${r}" aria-expanded="false">${DK}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Ka(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Ka(t.example)}</span></span></button>`},Ae=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Ka(r)}"`}>${Ka(e)}</span>${HK(t)}</span>`});var TN,xN=l(()=>{"use strict";C();mP();Mn();TN=e=>{let t=em(e);return`<div class="field">${Ae("Round limit","roundLimit")}<input class="input" type="number" name="maxRounds" min="1" max="${30}" step="1" value="${t}"><span class="muted">Stops after this many scored rounds. The usual limit is 10. The run also stops when the score has not risen for 3 rounds.</span></div>`}});var $K,FK,zK,IN,ON=l(()=>{"use strict";C();Mn();$K=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FK=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=1&&t<=100?t:90},zK=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,IN=e=>{let t=FK(e),r=Math.floor(t/2),n=Math.max(r+1,t-20),o=_a(t).map(i=>i.label).join(" \xB7 "),s=`--sdlc-weak:${r}%;--sdlc-close:${n}%;--sdlc-pass:${t}%`;return`<div class="field sdlc-pass"><div class="sdlc-pass-head">${Ae("Pass score","passScore","sdlc-pass-label")}<output class="sdlc-pass-value" data-sdlc-pass-value for="sdlc-pass">${t}</output></div><div class="sdlc-pass-scale" style="${s}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="sdlc-pass" class="sdlc-pass-range" type="range" name="passScore" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="sdlc-pass-label"><span class="sdlc-pass-mark" style="left:${zK(90)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${90}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${$K(o)}</p><p class="muted">The bar fades from a weak score to a pass. The mark is the usual ${90}.</p></div>`}});var NN,UK,MN,jN,DN=l(()=>{"use strict";Mn();NN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UK=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),MN=e=>{if(e.length===0)return`<div class="field">${Ae("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${NN(r.fileName)}">${NN(r.fileName)}</option>`).join("");return`<div class="field">${Ae("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${UK(e)}</script>`},jN=`<script>
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
</script>`});var Ja,BK,HN,$N=l(()=>{"use strict";Ga();Gp();Ja=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BK=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",HN=e=>{let t=e.wizard;if(t===void 0||t.gate===null)return"";let r=Zt(e.goal),n=BK(t.gate),o=Xo(e),s=o===null||o>=4?"":` (step ${o+1} of 4)`,i=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ja(r)}</h2>
    <p class="lede">Paused at <strong>${Ja(n)}</strong>${Ja(s)} (last updated ${Ja(i)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ja(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Ya,FN,zN=l(()=>{"use strict";Mn();Ya=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FN=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(o=>`<option value="${Ya(o.id)}"${o.id===e.runner?" selected":""}>${Ya(o.label)}</option>`).join(""),n=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Ya(e.runner)}">Checking ${Ya(e.writers.find(o=>o.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Ae("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${n}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Ae("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Ya(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var UN,BN=l(()=>{"use strict";UN=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard</th><th>Classic loop</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td><td>Every round</td></tr><tr><td>Improver</td><td>\u2014</td><td>Rewrites after each score</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td><td>\u2014</td></tr></tbody></table>'});var Zo,GN,VN,qN,KN,JN=l(()=>{"use strict";Mn();Zo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GN=(e,t,r,n,o)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=n.map(c=>`<option value="${Zo(c.id)}"${c.id===r?" selected":""}>${Zo(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Zo(o)}</option>`;return`<div class="field">${Ae(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},VN=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let n=r.find(o=>o.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Zo(t)}">Checking ${Zo(n)}\u2026</p>`},qN=(e,t,r,n,o)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Ae(t,o)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Zo(r)}</textarea><span class="muted">${n}</span></div></details>`,KN=e=>{let t=`<div class="sdlc-writer">${GN("judge","Judge",e.judge,e.writers,"I'll score it")}${VN("judge",e.judge,e.writers)}${qN("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${GN("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${VN("improver",e.improver,e.writers)}${qN("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var jn,YN,XN=l(()=>{"use strict";Ua();rP();uN();mN();_p();fN();yN();AN();WN();pP();xN();ON();DN();Mn();nP();$N();Ga();zN();BN();JN();C();jn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YN=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${jn(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${jn(e.skillNotice??"")}</div>`,n=`${mI}${gI}`,o=e.resumableWizardCycle??null,s=o===null?"":HN(o),i=Vp(e.cycle),a=e.cycle===null?"":Bp(e.cycle),c=e.cycle!==null&&Tt(e.cycle),d=SN(e),p=c?"Waiting for you":d.running?"Running\u2026":"Run",f=KN({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),b=FN({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),y="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Classic loop skips the wizard. Instructions are optional.",h=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",u=e.cycle!==null||d.running?"":" open",S=e.cycle!==null&&k(e.cycle.status),A=`<div class="sdlc-compose-mode" role="group" aria-label="Run mode">
        <button type="button" class="btn btn-secondary" data-sdlc-compose-mode="wizard" aria-pressed="true">Wizard</button>
        <button type="button" class="btn btn-secondary" data-sdlc-compose-mode="classic" aria-pressed="false">Classic loop</button>
      </div>`,g=S?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':`<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>
        <a class="btn btn-secondary" href="/prompt-optimizer?example=wizard-verification">Load wizard verification example</a>`,_=S?(()=>{let R=e.cycle!==null?Zt(e.cycle.goal):Zt(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${jn(R)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></summary>`})():'<summary class="sdlc-compose-summary"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</summary>',W=`<section class="card sdlc-compose${S?" sdlc-compose-viewing-finished":""}" id="prompt-optimizer-compose">
      <div class="sdlc-form-head">
        ${A}
        ${g}
      </div>
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${u}>
        ${_}
      <p class="lede">${y} ${jn(e.modelNote)}</p>
      <form class="sdlc-form" method="POST" action="/prompt-optimizer">
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${h}
        <div class="sdlc-block">
          <p class="sdlc-block-title">Prompt and goal</p>
          <div class="field">
            ${Ae("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${jn(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Ae("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${jn(d.prompt)}</textarea>
          </div>
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Folder</p>
          <div class="sdlc-folder">
          <div class="field">
            ${Ae("Folder","folder")}
            <input class="input" type="text" name="folder" value="${jn(d.folder)}" onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${MN(uP(d.folder))}
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Judge and improver</p>
          ${f}
        </div>
        ${b}
        <div data-sdlc-wizard-only>${UN()}</div>
        <details class="sdlc-classic-loop-options">
          <summary class="sdlc-block-title">Classic loop options</summary>
          <div class="sdlc-limits">
            ${IN(d.passScore)}
            ${TN(d.maxRounds)}
          </div>
        </details>
        <div class="sdlc-submit">
          <p class="sdlc-writer-summary" data-sdlc-writer-summary hidden></p>
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: pass score ${70}, up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <p class="muted sdlc-classic-limits-callout" data-sdlc-classic-limits-callout hidden>Classic loop uses the pass score and max rounds above.</p>
          <button class="btn btn-primary" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-can-run="${e.canRun?"true":"false"}" disabled>${p}</button>
          <button class="btn btn-secondary" type="submit" name="intent" value="run-classic" formnovalidate data-sdlc-run data-sdlc-run-classic data-can-run="${e.canRun?"true":"false"}" disabled>Classic loop (90 / 10 rounds)</button>
          <p class="muted sdlc-run-hint" data-sdlc-run-hint hidden></p>
        </div>
        </fieldset>
      </form>
      </details>
    </section>`,E=`${""}${dN}${pN}${hN}${jN}${gN}`;return`${t}${r}${W}${s}${a}${i}${n}${vN(e.history,e.cycle?.id??null)}${E}`}});var Xa,gP=l(()=>{"use strict";XN();Xa=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:YN(t)}))}});var ZN,QN=l(()=>{"use strict";cN();qa();gP();Ke();Nn();ZN=async(e,t,r)=>{let n=t===null?{kind:"ignored"}:lN({posted:t,storePath:e.storePath});if(n.kind==="ignored")return!1;if(n.kind==="saved"){let o=K(e.storePath,n.cycleId);return Oe(e.storePath,n.cycleId),t?.get("liveFragment")==="1"&&o!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":o.id}),e.response.end(Or(e.storePath,o)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(n.cycleId)}`}),e.response.end(),!0)}return n.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Xa(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:n.cycle.judgeModel,improver:n.cycle.improverModel,folder:"~",passScore:String(n.cycle.passScore),maxRounds:String(n.cycle.maxRounds),canRun:r.canRun,errorMessage:n.errorMessage,skillNotice:null,cycle:n.cycle,history:Rt(e.storePath),resumableWizardCycle:null}),!0)}});var eM,tm,fP=l(()=>{"use strict";eM=m(require("node:os"));C();tm=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??eM.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??90,maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var tM,rM=l(()=>{"use strict";tM=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var nM,oM,sM,iM=l(()=>{"use strict";nM="wizard-verification",oM="Produce a reusable skill template that teaches how to verify Prompt SDLC wizard steps 1\u20134 on Agent Witch Live (bundle 172+): generalize with {{variables}}, evaluate scored revisions (no score 0 continue), separate into module chunks, optimize each module with runner+judge round logs visible at step 4.",sM=`You help users test the prompt optimizer wizard on Agent Witch Live.
Explain the four steps when asked. Sometimes skip evaluate or separate.
Mention round scores at step 4 only if you remember.
Use placeholders like {{thing}} without defining them.
Do not describe install bundle self-update or production bundle version checks.`});var aM,Qo,hP,lM,cM,Za=l(()=>{"use strict";C();je();jb();iM();aM=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Qo=e=>{let t=II(e),r=In(e).map(o=>({id:o,label:Cp[o]}));return{note:r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(o=>o.label).join(", ")}.`,canRun:!0,models:t,writers:r,judge:"",improver:"",runner:""}},hP=(e,t,r)=>t===x||t!==null&&e.writers.some(n=>n.id===t)?t:r,lM=(e,t,r,n=null)=>({judge:hP(e,t,e.judge),improver:hP(e,r,e.improver),runner:hP(e,n,e.runner)}),cM=e=>e===nM?{goal:oM,prompt:sM}:e===wp?{goal:vp,prompt:Wp}:{goal:"",prompt:""}});var rm,yP=l(()=>{"use strict";C();je();mP();rM();Je();Za();rm=e=>{let t=lM(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=e.posted?.get("passScore")??String(90),n=em(e.posted?.get("maxRounds")??null),o=e.posted?.get("judgeInstructions")?.trim()??"",s=e.posted?.get("improverInstructions")?.trim()??"",i=e.posted?.get("runnerInstructions")?.trim()??"",a=e.posted?.get("runner")??null,c=(A,g)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:A,passScore:r,maxRounds:n,errorMessage:g,judge:t.judge,improver:t.improver,judgeInstructions:o,improverInstructions:s,runner:t.runner,runnerInstructions:i});if(e.posted===null)return c(e.defaultFolder??Tn,null);let d=e.posted.get("folder")??Tn;if(e.posted.get("intent")==="choose-folder"){let A=e.pickFolder();return c(A===null?d:kt(A),null)}let p=e.posted.get("intent")??"";if(p!=="run"&&p!=="run-classic")return c(d,null);let f=aM(e.goal,e.prompt);if(f!==null)return c(d,f);let b=OI(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(b===null)return c(d,"Choose a judge and an improver.");let y=xn(d);if(!y.ok)return c(d,y.errorMessage);let h=p!=="run-classic",u=h?{ok:!0,passScore:70}:tM(r);if(!u.ok)return c(d,u.errorMessage);let S=h?{ok:!0,maxRounds:5}:RN(n);if(!S.ok)return c(d,S.errorMessage);if(h){let A=NI(e.installedIds,a,b.judge);return A===null?c(d,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:y.path,passScore:u.passScore,maxRounds:S.maxRounds,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:o,improverInstructions:s,useWizard:!0,runner:A,runnerInstructions:i}}return{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:y.path,passScore:u.passScore,maxRounds:S.maxRounds,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:o,improverInstructions:s,useWizard:!1}}});var es,om,VK,SP,dM,nm,uM,qK,pM,AP,KK,JK,YK,bP,mM,gM,fM=l(()=>{"use strict";es=m(require("node:fs")),om=m(require("node:path"));je();Je();VK=["remember","choose-folder","run","run-classic"],SP=()=>({folder:Tn,judge:"",improver:"",runner:""}),dM=e=>om.default.join(om.default.dirname(e),"prompt-optimizer-preferences.json"),nm=e=>typeof e=="string"?e:"",uM=e=>{let t=dM(e);if(!es.default.existsSync(t))return SP();try{let r=JSON.parse(es.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return SP();let n=r,o=nm(n.folder).trim();return{folder:o.length===0?Tn:o,judge:nm(n.judge),improver:nm(n.improver),runner:nm(n.runner)}}catch{return SP()}},qK=(e,t)=>{let r=dM(e);es.default.mkdirSync(om.default.dirname(e),{recursive:!0});let n=`${r}.tmp`;es.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`),es.default.renameSync(n,r)},pM=(e,t)=>e===x||In(t).some(r=>r===e),AP=(e,t,r)=>e===null?t:e.length===0?"":pM(e,r)?e:t,KK=(e,t)=>{if(e===null)return t;let r=xn(e);return r.ok?r.display:t},JK=e=>{let t=uM(e.storePath),r={folder:KK(e.folder,t.folder),judge:AP(e.judge,t.judge,e.installedIds),improver:AP(e.improver,t.improver,e.installedIds),runner:AP(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||qK(e.storePath,r)},YK=e=>{let t=xn(e);return t.ok?t.display:Tn},bP=(e,t)=>pM(e,t)?e:"",mM=e=>{let t=uM(e.storePath);return{selection:{...e.selection,judge:bP(t.judge,e.installedIds),improver:bP(t.improver,e.installedIds),runner:bP(t.runner,e.installedIds)},defaultFolder:YK(t.folder)}},gM=e=>{let t=e.posted.get("intent")??"";if(!VK.includes(t))return;let r=e.posted.get("folder");JK({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var hM,XK,ZK,PP,QK,sm,im=l(()=>{"use strict";hM=m(require("node:os"));je();iP();$a();XK="Reply with the single word ok. Do not use tools.",ZK=45e3,PP=async(e,t)=>{if(t===x)return{ok:!0,message:"You will do this step."};let r=YO(e,t);if(r!==null)return{ok:!0,message:r};let n=await Xe({writerAgent:t,prompt:XK,workingDirectory:hM.default.tmpdir(),timeoutMs:ZK});if(!n.ok)return{ok:!1,message:n.errorMessage};let o=`${Ye(t)} is ready.`;return XO(e,t,o),{ok:!0,message:o}},QK=e=>[...new Set(e.filter(t=>t.length>0))],sm=async(e,t,r,n)=>{for(let o of QK([t,r,n??""])){let s=await PP(e,o);if(!s.ok)return s.message}return null}});var _P,yM=l(()=>{"use strict";_P=(e,t)=>{for(let r of e)if(!(r.wizard===void 0||r.status!=="wizard_paused")&&!(t!==null&&r.id===t))return r;return null}});var SM,AM=l(()=>{"use strict";ut();C();qa();fP();yP();gP();Ke();Je();fM();pP();im();yM();Nn();SM=async e=>{let t=e.posted===null?mM({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=rm({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Lr("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(gM({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?kt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let n=r.kind==="start"?await sm(e.route.storePath,r.judge,r.improver,r.useWizard?r.runner:void 0):null;if(r.kind==="start"&&n!==null){await Xa(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:kt(r.workingDirectory),passScore:String(r.passScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:n,skillNotice:e.skillNotice,cycle:null,history:Rt(e.route.storePath),resumableWizardCycle:_P(Rt(e.route.storePath),null)});return}if(r.kind==="start"){let s=EN(r.workingDirectory,r.sourceSkillFile),i=tm({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,...r.useWizard?{wizard:{...pb(r.prompt),runnerInstructions:r.runnerInstructions},runnerModel:r.runner}:{},...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(G(e.route.storePath,i),Oe(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"&&r.useWizard){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(Or(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let o=e.cycleId===null?null:K(e.route.storePath,e.cycleId);o!==null&&Oe(e.route.storePath,o.id),await Xa(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:o,history:Rt(e.route.storePath),resumableWizardCycle:_P(Rt(e.route.storePath),o?.id??null)})}});var bM,PM=l(()=>{"use strict";Ke();bM=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";wI(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var _M,wM=l(()=>{"use strict";TI();iN();QN();AM();PM();Za();Nn();_M=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Xp(),n=Qo(r),o=e.method==="POST"?new URLSearchParams(await e.readBody(e.request)):null;if(sN({posted:o,storePath:e.storePath,response:e.response})||await ZN(e,o,n))return;let s=cM(t.searchParams.get("example")),i=bM({posted:o,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=CI({posted:o,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await SM({route:e,posted:o,installedIds:r,selection:n,goal:o?.get("goal")??s.goal,prompt:o?.get("prompt")??s.prompt,skillNotice:kI(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var e8,vM,WM=l(()=>{"use strict";C();Ke();e8=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",vM=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let n=K(e.storePath,r);if(n===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(n.wizard===void 0||!k(n.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let o=Wb({goal:n.goal,cycleStatus:n.status,wizard:n.wizard}),s=`prompt-optimizer-wizard-${e8(n.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(o),!0}});var LM,EM=l(()=>{"use strict";qa();Ke();LM=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),n=r===null?null:K(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(n===null?"":Or(e.storePath,n)),!0}});var t8,RM,kM=l(()=>{"use strict";je();im();t8=["claude-cli","codex","cursor","antigravity"],RM=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let n=t===x||t8.includes(t)?await PP(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(n)),!0}});var CM,TM=l(()=>{"use strict";C();CM=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:wa,page:va,context:Fo,installedWriters:e,post:{method:"POST",url:wa,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${wa}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var wP,xM=l(()=>{"use strict";C();ja();wP=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ye(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null}))),n=k(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:n,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:Vo(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:Fo,page:`${va}?cycle=${encodeURIComponent(e.id)}`}}});var ke,r8,IM,OM,NM=l(()=>{"use strict";ke=m(Rs());C();r8=(0,ke.isType)({goal:ke.isString,prompt:ke.isString,workingDirectory:ke.isString,judge:(0,ke.isUndefinedOr)(ke.isString),improver:(0,ke.isUndefinedOr)(ke.isString),passScore:(0,ke.isUndefinedOr)(ke.isNumber),maxRounds:(0,ke.isUndefinedOr)(ke.isNumber)}),IM=e=>{let t=e?.trim()??"";return t.length===0?null:t},OM=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return r8(t)?t.workingDirectory.trim().length===0?{ok:!1,error:pp}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:IM(t.judge),improver:IM(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:pp}}});var n8,MM,jM=l(()=>{"use strict";C();je();yP();Za();n8=e=>e.map(t=>t.id).join(", "),MM=e=>{let t=Qo(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,n=e.body.judge??r,o=e.body.improver??r;if(n===x||o===x)return{ok:!1,error:ub,installedWriters:t.writers};if(n===null||o===null){let a=n8(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run-classic",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,passScore:e.body.passScore??String(90),maxRounds:e.body.maxRounds??String(10),judge:n,improver:o}),i=rm({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var DM,HM=l(()=>{"use strict";fP();TM();xM();Za();NM();jM();Ke();DM=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=K(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:wP(c)}}let r=await e.handlers.readInstalledIds(),n=Qo(r);if(e.method==="GET")return{status:200,body:CM(n.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let o=OM(e.rawBody);if(!o.ok)return{status:400,body:{ok:!1,error:o.error,installedWriters:n.writers}};let s=MM({body:o.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:n.writers}};let a=tm({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds});return G(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:wP(a)}}});var $M,FM=l(()=>{"use strict";Nn();im();HM();$M=async e=>{let t=await DM({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Xp,readWritersReady:sm,startCycle:Oe}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var o8,vP,zM=l(()=>{"use strict";yI();wM();WM();EM();kM();FM();o8=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},vP=async e=>{let t=o8(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await $M(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:hI()})),!0):(await RM({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||vM({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||LM({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await _M(e),!0)}});var UM=l(()=>{"use strict";zM()});var Dn,Qa,s8,i8,a8,l8,BM,GM=l(()=>{"use strict";Dn=m(require("node:fs")),Qa=m(require("node:path")),s8="prompt-optimizer-cycles.json",i8="prompt-optimizer-preferences.json",a8="prompt-sdlc-cycles.json",l8="prompt-sdlc-preferences.json",BM=e=>{let t=Qa.default.join(e,s8),r=Qa.default.join(e,a8);if(Dn.default.existsSync(t)||!Dn.default.existsSync(r))return t;try{Dn.default.renameSync(r,t)}catch{return r}let n=Qa.default.join(e,l8),o=Qa.default.join(e,i8);if(Dn.default.existsSync(n)&&!Dn.default.existsSync(o))try{Dn.default.renameSync(n,o)}catch{}return t}});var ts,c8,WP,VM=l(()=>{"use strict";ts=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),c8=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],WP=e=>{let t=c8.map(i=>`<option value="${ts(i.value)}">${ts(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${ts(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${ts(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${ts(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
    </section>`}});var el,JM,d8,YM,u8,p8,XM,lm,qM,KM,m8,g8,er,tl,am,f8,cm,LP,h8,EP,ZM,RP,QM,y8,S8,A8,ej,tj,rj,rl=l(()=>{"use strict";el=m(require("node:fs")),JM=m(require("node:path")),d8="estimate-history.ndjson",YM=100,u8=500,p8=2e4,XM=e=>JM.default.join(e,d8),lm=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,u8),qM=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,p8),KM=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,m8=e=>({...e,estimateTokens:KM(e.estimateTokens),actualTokens:KM(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),g8=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},er=e=>{let t=XM(e);return el.default.existsSync(t)?el.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let n=r.trim();if(n.length===0)return[];try{let o=JSON.parse(n);return g8(o)?[m8(o)]:[]}catch{return[]}}):[]},tl=(e,t)=>{el.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(n=>JSON.stringify(n)).join(`
`)}
`;el.default.writeFileSync(XM(e),r,"utf8")},am=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),f8=e=>{let t=e.filter(n=>n.actualSeconds!==null&&n.estimateSeconds!==null&&n.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(n=>`| ${am(n.task)} | ${am(n.writerLabel)} | ${n.estimateSeconds} | ${n.actualSeconds} |`)].join(`
`)},cm=e=>{let t=er(e.reportsDir),r=lm(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:n?.actualSeconds??null,estimateTokens:n?.estimateTokens??null,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);tl(e.reportsDir,[...s,o])},LP=e=>{let t=er(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),n=new Date().toISOString(),o=e.task!==void 0?lm(e.task):"",s={id:e.agentRunId,task:o.length>0?o:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:n,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);tl(e.reportsDir,[...i,s])},h8=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-YM),EP=e=>[...er(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),ZM=e=>{let t=er(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),n=qM(e.input),o=qM(e.output),s=lm(n),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:n.length>0?n:r?.input??"",output:o.length>0?o:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);tl(e.reportsDir,[...c,a])},RP=(e,t)=>{let r=er(e).find(n=>n.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},QM=e=>({table:f8(h8(er(e))),embedding:null}),y8=e=>{let t=new Map;for(let n of e){if(n.actualTokens===null)continue;let o=n.writerLabel.trim()||"Writer",s=t.get(o)??[];s.push(n.actualTokens),t.set(o,s)}let r=new Set;for(let[n,o]of t){let s=[...o].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${n}:${i}`)}return e.filter(n=>{let o=n.writerLabel.trim()||"Writer";return!r.has(`${o}:${n.actualTokens}`)})},S8=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-YM),A8=e=>{let t=y8(S8(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let n=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",n.join(". ")+(n.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${am(s.task)} | ${am(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},ej=e=>{let t=er(e.reportsDir),r=lm(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:n?.writerLabel??"",estimateSeconds:n?.estimateSeconds??null,actualSeconds:n?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);tl(e.reportsDir,[...s,o])},tj=e=>{let t=er(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),n=new Date().toISOString(),o={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:r?.completedAt??n,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);tl(e.reportsDir,[...s,o])},rj=e=>A8(er(e))});var nj=l(()=>{"use strict";rl()});var tr,kP,b8,CP,P8,_8,dm,um,w8,TP,oj=l(()=>{"use strict";nj();tr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kP=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let n=Math.floor(t/60),o=t%60;return o===0?`${n} hr`:`${n} hr ${o} min`},b8=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${kP(-r)} under`:`${kP(r)} over`},CP=e=>e.toLocaleString("en-US"),P8=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${CP(-r)} under`:`${CP(r)} over`},_8=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},dm=e=>e===null?"\u2014":kP(e),um=e=>e===null?"\u2014":CP(e),w8=`(function () {
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
})();`,TP=e=>{let r=EP(e.reportsDir).map((o,s)=>{let i=o.input.trim().length>0?o.input:o.task,a=o.output.trim().length>0?o.output:"\u2014",c=o.writerLabel.trim().length>0?o.writerLabel:"Writer",d=o.estimateSeconds===null||o.actualSeconds===null?"no estimate":b8(o.estimateSeconds,o.actualSeconds),p=o.estimateTokens===null||o.actualTokens===null?"no estimate":P8(o.estimateTokens,o.actualTokens),f=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${f}">
        <td><button type="button" class="history-open">${tr(_8(i))}</button></td>
        <td>${tr(c)}</td>
        <td>${dm(o.estimateSeconds)}</td>
        <td>${dm(o.actualSeconds)}</td>
        <td>${tr(d)}</td>
        <td>${um(o.estimateTokens)}</td>
        <td>${um(o.actualTokens)}</td>
        <td>${tr(p)}</td>
      </tr>`,template:`<template id="${f}">
        <p class="eyebrow">${tr(c)}</p>
        <h2>Input</h2>
        <pre>${tr(i)}</pre>
        <h2>Output</h2>
        <pre>${tr(a)}</pre>
        <p>Time: estimated ${dm(o.estimateSeconds)} \xB7 actual ${dm(o.actualSeconds)} \xB7 ${tr(d)}</p>
        <p>Tokens: estimated ${um(o.estimateTokens)} \xB7 actual ${um(o.actualTokens)} \xB7 ${tr(p)}</p>
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
        <script>${w8}</script>`}
    </section>`}});var sj=l(()=>{"use strict";VM();oj()});var rs,v8,W8,xP,ij=l(()=>{"use strict";rs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),v8=(e,t,r)=>{let n=rs(t),o=rs(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${n}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${o}</pre>
</article>`},W8=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${rs(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((n,o)=>v8(o,n.userPrompt,n.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${rs(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${rs(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${rs(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},xP=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(W8).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var aj=l(()=>{"use strict";ij()});var nl,lj,cj,IP,OP,NP,dj=l(()=>{"use strict";nl=m(require("node:fs")),lj=m(require("node:path"));da();Zu();cj=(e,t,r)=>jo({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,IP=(e,t,r)=>{let n=cj(e,t,r);if(n===null)return[];if(!nl.default.existsSync(n))return[];let o=nl.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},OP=e=>{let t=cj(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Xt(e.entry.prompt),output:Xt(e.entry.output)};nl.default.mkdirSync(lj.default.dirname(t),{recursive:!0}),nl.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},NP=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var L8,E8,ol,pm,MP=l(()=>{"use strict";L8=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),E8=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,ol=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let n=[],o=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=L8(i.assistantOutput),d=c.length>0?`Assistant: ${E8(c,t)}`:null,p=[a,d].filter(f=>f!==null).join(`

`);if(p.length!==0){if(o+p.length>r&&n.length>0)break;n.unshift(p),o+=p.length}}return n.join(`

`)},pm=e=>{let t=e.userMessage.trim(),r=ol({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Ot,sl,HP,R8,k8,jP,C8,$P,mm,uj,pj,T8,ns,FP,DP,mj,x8,gj,os,gm,il,I8,al,zP,fm,hm,fj=l(()=>{"use strict";Ot=m(require("node:fs")),sl=m(require("node:path")),HP=require("node:crypto");MP();R8="writer-sessions",k8="active-index.json",jP=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),C8=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",$P=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},mm=e=>{let t=sl.default.join(e.installDir,R8);return Ot.default.mkdirSync(t,{recursive:!0}),t},uj=e=>sl.default.join(mm(e),k8),pj=(e,t)=>sl.default.join(mm(e),`${t}.canonical.json`),T8=(e,t)=>sl.default.join(mm(e),`${t}.continuation.json`),ns=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,FP=e=>{let t=uj(e);if(!Ot.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Ot.default.readFileSync(t,"utf8"));if(!jP(r)||!Array.isArray(r.entries))return{entries:[]};let n=[];for(let o of r.entries){if(!jP(o)||typeof o.sessionId!="string")continue;let s=typeof o.writerAgent=="string"?o.writerAgent:"";if(!C8(s))continue;let i=typeof o.projectFolderPath=="string"?o.projectFolderPath:(o.projectFolderPath===null,null);n.push({writerAgent:s,projectFolderPath:i,sessionId:o.sessionId})}return{entries:n}}catch{return{entries:[]}}},DP=(e,t)=>{Ot.default.writeFileSync(uj(e),JSON.stringify(t,null,2))},mj=(e,t)=>{Ot.default.writeFileSync(pj(e,t.sessionId),JSON.stringify(t,null,2))},x8=(e,t)=>{Ot.default.writeFileSync(T8(e,t.sessionId),JSON.stringify(t,null,2))},gj=(e,t)=>{let r=ol({turns:t.turns});x8(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},os=(e,t)=>{let r=pj(e,t);if(!Ot.default.existsSync(r))return null;try{let n=JSON.parse(Ot.default.readFileSync(r,"utf8"));return!jP(n)||typeof n.sessionId!="string"?null:n}catch{return null}},gm=(e,t=20)=>{let r=mm(e),n=Ot.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),o=[];for(let s of n){let i=s.name.replace(/\.canonical\.json$/,""),a=os(e,i);a!==null&&o.push(a)}return o.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},il=(e,t,r)=>{let n=$P(r);return FP(e).entries.find(i=>ns(i)===ns({writerAgent:t,projectFolderPath:n}))?.sessionId??null},I8=(e,t,r,n)=>{let o=FP(e),s=ns({writerAgent:t,projectFolderPath:r}),i=[...o.entries.filter(a=>ns(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:n}];DP(e,{entries:i})},al=(e,t,r)=>{let n=(0,HP.randomUUID)(),o=new Date().toISOString(),s=$P(r),i={sessionId:n,writerAgent:t,projectFolderPath:s,turns:[],createdAt:o,updatedAt:o};return mj(e,i),gj(e,i),I8(e,t,s,n),n},zP=(e,t,r)=>{let n=il(e,t,r);return n!==null?n:al(e,t,r)},fm=(e,t,r)=>{let n=$P(r),o=FP(e);if(n===null&&r===void 0){DP(e,{entries:o.entries.filter(i=>i.writerAgent!==t)});return}let s=ns({writerAgent:t,projectFolderPath:n});DP(e,{entries:o.entries.filter(i=>ns(i)!==s)})},hm=e=>{let t=zP(e.layout,e.writerAgent,e.projectFolderPath),r=os(e.layout,t);if(r===null)return;let n={id:(0,HP.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},o={...r,turns:[...r.turns,n],updatedAt:n.createdAt};mj(e.layout,o),gj(e.layout,o)}});var O8,N8,ym,UP,hj=l(()=>{"use strict";O8=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",N8=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},ym=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",UP=e=>{let t=ym(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",n=O8(r,e.userPromptCharacterCount),o=N8({contextBudget:n,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:n,...o}}});var Sm=l(()=>{"use strict";dj();fj();MP();hj()});var yj=l(()=>{"use strict";gh()});var De,j8,D8,BP,GP,VP,Sj=l(()=>{"use strict";ae();yj();De=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),j8=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},D8=(e,t,r)=>{let n=e[t]?.apiKey;if(n!==void 0&&n.length>0){let o=Id(n);return`value="${De(o)}" placeholder="Paste a new key to replace"`}return`placeholder="${De(r)}"`},BP=(e,t,r,n,o)=>{let s=zh[t];return`<label class="field">
          <span class="field-label">${De(n)} API key \u2014 ${De(j8(e,t))} \xB7 <a class="field-link" href="${De(s.href)}" target="_blank" rel="noopener noreferrer">${De(s.label)}</a></span>
          <input class="input mono" type="password" name="${De(r)}" autocomplete="off" ${D8(e,t,o)} />
        </label>`},GP=(e,t,r,n)=>{let o=fh(e[t]?.model),s=new Set(Wd[t].map(c=>c.value)),i=Wd[t].map(c=>{let d=c.value===o?" selected":"";return`<option value="${De(c.value)}"${d}>${De(c.label)}</option>`}).join(""),a=o!==an&&!s.has(o)?`<option value="${De(o)}" selected>${De(o)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${De(n)}</span>
          <select class="input mono" name="${De(r)}">${i}${a}</select>
        </label>`},VP=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${De(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",n=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${BP(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${GP(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${BP(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${GP(e.secrets,"openai","openaiModel","OpenAI model")}
        ${BP(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${GP(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var Aj=l(()=>{"use strict";Sj()});var Am,bj,Pj=l(()=>{"use strict";Am=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bj=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${Am(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Console \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let n=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${Am(s.name)}</strong> <span class="muted mono">(${Am(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),o=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Am(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${o}
      <ul class="harness-installed-set-list">${n}</ul>
    </section>`}});var H8,_j,wj,vj=l(()=>{"use strict";H8=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,_j=e=>e.kind==="folder",wj=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let d=s.children.get(a);if(d!==void 0&&_j(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=n=>{let o=[];for(let s of n.children.values()){if(_j(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(H8)};return r(t)}});var Wj,qP,Lj=l(()=>{"use strict";Wj=m(require("node:path")),qP=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${qP(r.children,t)}</ul>
            </details>
          </li>`;let n=Wj.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var Ej,Nr,$8,F8,ll,z8,KP,Rj=l(()=>{"use strict";np();Ej=m(require("node:path"));Pj();vj();Lj();Nr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$8=()=>`(() => {
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

})();`,F8=()=>`(() => {
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
})();`,ll=e=>{let t=fa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=bj({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),n=e.flashError?`<div class="alert-error">${Nr(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Nr(e.flashMessage)}</div>`:"",o=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':z8(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Nr(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Nr(s)}" />
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
    <script>${$8()}</script>
    <script>${F8()}</script>`;return`${t}${r}${n}${c}${d}`},z8=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let d=wj(a.items.map(b=>({...b,relativePath:typeof b.relativePath=="string"&&b.relativePath.length>0?b.relativePath:Ej.default.relative(a.sourceRoot,b.sourcePath).replaceAll("\\","/")}))),p=qP(d,Nr),f=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Nr(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Nr(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${f} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Nr(n)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},KP=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&o.set(d,p)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?o.get(d):void 0,f=e.get(`setName-${i}`)?.trim()??p??a,b=t.sets[i];if(b===void 0)continue;let y=a.length>0?a:b.proposedSlug,h=f.length>0?f:b.proposedName,u=r.has(i),S=b.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:u}));s.push({slug:y,name:h,items:S})}return s}});var kj=l(()=>{"use strict";Rj()});var U8,JP,Cj=l(()=>{"use strict";Wr();U8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null||n.ok!==!0)return null;let o=n;return{counts:{harness:Number(o.counts?.harness??0),workflow:Number(o.counts?.workflow??0),agent:Number(o.counts?.agent??0)},items:Array.isArray(o.items)?o.items:[]}}catch{return null}},JP=U8});var B8,Tj,xj=l(()=>{"use strict";Wr();B8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let n=await r.json();return typeof n!="object"||n===null||n.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof n.promotedCount=="number"?n.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},Tj=B8});var Ij=l(()=>{"use strict"});var cl,G8,YP,Oj=l(()=>{"use strict";np();cl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),G8=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,YP=e=>{let t=e.flashError?`<div class="alert-error">${cl(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${cl(e.flashMessage)}</div>`:"",r=fa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),n=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(o=>{let s=e.compositionCountsByProjectId?.[o.id],i=s!==void 0?`<span class="muted">${cl(G8(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(o.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(o.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(o.id)}">
                  <strong>${cl(o.name)}</strong>
                  <span class="muted mono">${cl(o.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${n}
    </section>`}});var Nj=l(()=>{"use strict";Ij();Jy();Oj()});var bm,Mj=l(()=>{"use strict";bm=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var jj,rr,XP=l(()=>{"use strict";jj=m(require("node:path"));Gt();bt();B();ae();Ge();rr=e=>{let t=$()?.layout.installDir??L();if(jj.default.basename(t)===Gr)return Ut;let r=$(),n=r!==null?We(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):Ut}});var ZP,Dj=l(()=>{"use strict";Ge();XP();ZP=async e=>{let t=ve(e.installDir),r=t?.bundleVersion??null,n=rr(t);try{let o=await uo(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:en(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var QP,Hj=l(()=>{"use strict";QP=e=>!e});var e_,ss,t_=l(()=>{"use strict";B();e_=()=>`http://127.0.0.1:${gf()}/update/run`,ss=async e=>{try{let t=await fetch(e_(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var V8,$j,r_,Fj=l(()=>{"use strict";B();ee();t_();V8=()=>{Ft({launchAgentLabel:te(),installDir:L()})},$j=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},r_=async()=>{V8();let e=await ss({force:!0});if(e.ok)return{ok:!0,message:$j(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:$j(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ge(),sE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var n_=l(()=>{"use strict";HA();Mj();XP();Dj();Hj();Fj();t_()});var zj,Uj=l(()=>{"use strict";zj=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var Bj,Gj,o_,s_,Vj=l(()=>{"use strict";Bj=require("node:crypto"),Gj=m(require("node:fs"));ut();ae();ae();Uj();o_=!1,s_=async e=>{if(o_)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!zj(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&Gj.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,Bj.randomUUID)();o_=!0;try{if(await $y(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await So({...r,workspace:o},e.writerAgent,t);return await Mi(n,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{o_=!1}}});var qj=l(()=>{"use strict";Vj()});var Ze,q8,Kj,Jj,i_,a_,l_,c_,d_,u_,p_=l(()=>{"use strict";Ze=require("node:crypto"),q8=Buffer.from("302a300506032b6570032100","hex"),Kj=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},Jj=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Ze.createPublicKey)({key:Buffer.concat([q8,t]),format:"der",type:"spki"})},i_=()=>{let{publicKey:e,privateKey:t}=(0,Ze.generateKeyPairSync)("ed25519");return{publicKeyRaw:Kj(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},a_=e=>(0,Ze.createPrivateKey)(e),l_=(e,t)=>(0,Ze.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),c_=(e,t,r)=>{try{let n=Jj(e);return(0,Ze.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},d_=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,u_=()=>(0,Ze.randomBytes)(32).toString("base64url")});var nr,Pm,Yj,K8,J8,_m,m_,g_,Xj=l(()=>{"use strict";nr=m(require("node:fs")),Pm=m(require("node:path"));p_();B();bt();Yj=e=>Pm.default.join(e.installDir,mr),K8=(e,t)=>{if(e.profileEmail===null||t===Yj(e)||nr.default.existsSync(t))return;let r=Yj(e);nr.default.existsSync(r)&&(nr.default.mkdirSync(Pm.default.dirname(t),{recursive:!0}),nr.default.renameSync(r,t))},J8=e=>{if(!nr.default.existsSync(e))return null;try{let t=nr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},_m=e=>{let t=Qc(e);K8(e,t);let r=J8(t);if(r!==null)return r;let n=i_();return nr.default.mkdirSync(Pm.default.dirname(t),{recursive:!0}),nr.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},m_=e=>{let t=_m(e.layout),r=u_(),n=d_({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=a_(t.privateKeyPem),s=l_(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},g_=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return c_(e.serverPublicKey,t,e.serverAttestation)}});var f_=l(()=>{"use strict";Xj();p_()});var tD,dl,S_,A_,Zj,Y8,h_,wm,ne,rD,X8,y_,Z8,Q8,b_,ce,be,or,e3,Qj,eD,ul,pl,nD=l(()=>{"use strict";tD=m(require("node:http")),dl=m(require("node:fs")),S_=m(require("node:path"));vm();aa();sx();ax();mx();Ro();pA();MA();Bx();Vx();UM();GM();sj();aj();Sm();Aj();kj();mn();ut();Wr();Cj();xj();Nj();n_();Ge();qj();ae();f_();A_=e=>eA(e)??"never",Zj=48e3,Y8=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,h_=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??au(),reveal:t.reveal,installed:vr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),wm=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:vo(t,e)},ne=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rD=200,X8=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',y_=e=>{let t=e.trim().slice(0,rD),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},Z8=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ne(t)}</div>`,Q8=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ne(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',b_={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},ce=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...b_}),e.end(JSON.stringify(r))},be=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},or=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},e3=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=X8(e.healthBadge),n=e.status.wakeError?`<div class="alert-error">${ne(e.status.wakeError)}</div>`:"",o=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=QP(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ne(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ne(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ne(A_(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ne(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${s}
    </section>`},Qj=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},eD=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,rD)},ul=e=>{let t=S_.default.join(e.layout.installDir,"link-code.txt"),r=()=>ve(e.layout.installDir),n=()=>{let y=r();return{installBundleVersion:bm(y),installBundleUpdatedAt:y?.updatedAt??null,installVersion:y}},o=async y=>{let h=y.installVersion??r(),u=await i(),S=UA(u),A=y.updateFlash??null,g=BA(A),_=Z8(A,y.updateError??null);return FA({title:y.title,activePath:y.activePath,body:y.body,cloudAppOrigin:rr(h),installBundleVersionLabel:bm(h),prependBody:`${g}${_}${S}`,headerUpdateButtonHtml:zA(u)})},s=null,i=async()=>{let y=Date.now();if(s!==null&&y-s.cachedAtMs<6e4)return s.offer;let h=await ZP(e.layout);return s={cachedAtMs:y,offer:h},h},a=()=>{s=null},c=!1,d=async y=>{if(a(),!(await i()).updateAvailable){y.writeHead(303,{Location:"/?update=ok"}),y.end();return}if(c){y.writeHead(303,{Location:y_("An update is already running.")}),y.end();return}c=!0;try{let u=await r_(),S=u.ok?"/?update=ok":y_(u.message);y.writeHead(303,{Location:S}),y.end()}catch(u){let S=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";y.writeHead(303,{Location:y_(S)}),y.end()}finally{c=!1,a()}},p=async(y,h)=>{let u=h==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",S=n(),A=await o({title:h,activePath:h==="Project not found"?"/projects":"/",installVersion:S.installVersion,body:`<section class="card">
      <h1>${ne(h)}</h1>
      <p>${ne(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});y.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),y.end(A)},f=()=>{if(dl.default.existsSync(t))return dl.default.readFileSync(t,"utf8").trim();let y=Math.random().toString(36).slice(2,8).toUpperCase();return dl.default.writeFileSync(t,y,"utf8"),y},b=tD.default.createServer((y,h)=>{(async()=>{let u=y.url?.split("?")[0]??"/",S=y.method??"GET";if(S==="OPTIONS"){h.writeHead(204,b_),h.end();return}if(!await vP({method:S,pathname:u,request:y,response:h,requestUrl:y.url??"/",storePath:BM(S_.default.dirname(e.layout.configPath)),readBody:or,sendHtml:be,renderShell:o})){if(S==="GET"&&u==="/health"){let A=e.controllers.getStatus(),g=n();ce(h,200,{ok:!0,...A,installBundleVersion:g.installBundleVersion,installBundleUpdatedAt:g.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/status"){let A=n();ce(h,200,{...e.controllers.getStatus(),linkCode:f(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/traffic"){ce(h,200,{entries:sa(e.layout)});return}if(S==="DELETE"&&u==="/api/traffic"||S==="POST"&&u==="/api/traffic/clear"){if(nA(e.layout),S==="POST"){h.writeHead(303,{Location:"/traffic?cleared=1"}),h.end();return}ce(h,200,{ok:!0});return}if(S==="GET"&&u==="/api/trace"){ce(h,200,{entries:Ku(e.layout)});return}if(S==="DELETE"&&u==="/api/trace"||S==="POST"&&u==="/api/trace/clear"){if(iA(e.layout),S==="POST"){h.writeHead(303,{Location:"/status"}),h.end();return}ce(h,200,{ok:!0});return}if(S==="POST"&&u==="/api/errors/clear"){aA(e.layout.errorLogPath),h.writeHead(303,{Location:"/errors?cleared=1"}),h.end();return}if(S==="GET"&&u==="/api/knowledge"){let g=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(g.length>0){let _=await Ho({layout:e.layout,query:g,limit:20});ce(h,200,{chunks:_,query:g});return}ce(h,200,{chunks:Do(e.layout).slice(-50).reverse()});return}if(S==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),h.writeHead(303,{Location:"/status?revived=1"}),h.end();return}if(S==="GET"&&u==="/api/update-status"){let A=await i();ce(h,200,{ok:!0,...A});return}if((S==="GET"||S==="POST")&&u==="/api/update"){await d(h);return}if(S==="GET"&&u==="/"){let A=e.controllers.getStatus(),g=n(),_=vr(e.layout),w=Ju(e.layout.errorLogPath);be(h,await o({title:"Home",activePath:"/",installVersion:g.installVersion,updateFlash:Qj(y.url??void 0),updateError:eD(y.url??void 0),body:GA({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:g.installBundleVersion,harnessSetCount:_.sets.length,knowledgeChunkCount:Do(e.layout).length,trafficEntryCount:sa(e.layout).length,wakeError:A.wakeError,errorLogByteSize:w.byteSize,errorLogExists:w.exists})}));return}if(S==="GET"&&u==="/task"){let A=e.controllers.getStatus(),g=n(),_=$(),w=new URL(y.url??"/",`http://127.0.0.1:${43347}`),W=w.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,E=w.searchParams.get("failed")==="1"?w.searchParams.get("error")?.trim()??"Task failed.":null,R=w.searchParams.get("runId");be(h,await o({title:"Task",activePath:"/task",installVersion:g.installVersion,body:WP({defaultWorkspace:_?.workspace??"",wsConnected:A.wsConnected,flashMessage:W,flashError:E,lastRunId:R})}));return}if(S==="POST"&&u==="/task/dispatch"){let A=await or(y),g=new URLSearchParams(A),_=g.get("prompt")?.trim()??"",w=g.get("writerAgent")?.trim()??"claude-cli",W=g.get("projectFolder")?.trim()??"",E=await s_({prompt:_,writerAgent:w,...W.length>0?{projectFolderPath:W}:{}}),R=new URLSearchParams;E.ok?R.set("ok","1"):(R.set("failed","1"),E.errorMessage!==void 0&&R.set("error",E.errorMessage.slice(0,240))),E.agentRunId!==void 0&&R.set("runId",E.agentRunId),h.writeHead(303,{Location:`/task?${R.toString()}`}),h.end();return}if(S==="GET"&&u==="/writer-sessions"){let A=n(),g=gm(e.layout,12);be(h,await o({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:Qj(y.url??void 0),updateError:eD(y.url??void 0),body:xP({sessions:g})}));return}if(S==="GET"&&u==="/errors"){let A=n(),g=Ju(e.layout.errorLogPath);be(h,await o({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:cA({errorLogPath:e.layout.errorLogPath,content:g.content,exists:g.exists,truncated:g.truncated,byteSize:g.byteSize,cleared:new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(S==="GET"&&u==="/status"){let A=new URL(y.url??"/",`http://127.0.0.1:${43347}`),g=e.controllers.getStatus(),_=fe(e.layout),w=_!==null?xe(_,12e4):mA(g.lastHeartbeatAt,12e4),W=gA({lastHeartbeatAt:g.lastHeartbeatAt,heartbeatIsStale:w}),E=n();be(h,await o({title:"Status",activePath:"/status",installVersion:E.installVersion,body:`${e3({status:g,healthBadge:W,revived:A.searchParams.get("revived")==="1",linkCode:f(),installBundleVersion:E.installBundleVersion,installBundleUpdatedAt:E.installBundleUpdatedAt})}${yA({installDir:e.layout.installDir})}${hA({entries:Ku(e.layout)})}`}));return}if(S==="GET"&&u==="/traffic"){let A=new URL(y.url??"/",`http://127.0.0.1:${43347}`),g=sa(e.layout),_=n(),w=g.map(R=>`<tr><td title="${ne(R.at)}">${ne(A_(R.at))}</td><td>${ne(R.direction)}</td><td><code>${ne(R.type)}</code></td><td>${ne(R.summary)}</td><td>${ne(R.action??"")}</td></tr>`).join(""),W=g.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${w}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',E=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";be(h,await o({title:"Traffic",activePath:"/traffic",installVersion:_.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${E}
              ${W}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(S==="GET"&&u==="/projects"){let A=new URL(y.url??"/",`http://127.0.0.1:${43347}`),g=n(),_=rr(g.installVersion),w=await wm(e.layout),W=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,E=$(),R=E===null?null:X({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),T=R===null?{}:Object.fromEntries((await Promise.all(w.projects.map(async I=>{let D=await JP(R,I.id);return[I.id,D?.counts??null]}))).filter(I=>I[1]!==null));be(h,await o({title:"Projects",activePath:"/projects",installVersion:g.installVersion,body:YP({projects:w.projects,compositionCountsByProjectId:T,cloudAppOrigin:_,syncMessage:w.message,syncOk:w.ok,flashMessage:null,flashError:W})}));return}if(S==="GET"&&u==="/projects/select-folder"){let g=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",_=$(),w=_===null?null:X({wsUrl:_.wsUrl,pairingToken:_.pairingToken}),W=g.length>0&&w!==null?Lr():null;if(W===null||w===null){h.writeHead(303,{Location:"/projects"}),h.end();return}if(ze({projectFolderPath:W}),!await $i(w,g,W)){h.writeHead(303,{Location:"/projects?folderError=1"}),h.end();return}h.writeHead(303,{Location:`/project?id=${encodeURIComponent(g)}&folderUpdated=1`}),h.end();return}if(S==="GET"&&u==="/project"){let A=new URL(y.url??"/",`http://127.0.0.1:${43347}`),g=A.searchParams.get("id")?.trim()??"",_=n(),w=await wm(e.layout),W=yn(w.projects,g);if(W===null){await p(h,"Project not found");return}let E=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,R=A.searchParams.get("knowledgePromoted"),T=R!==null?`Marked ${R} lesson(s) as promoted in Agent Witch.`:null,I=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,D=A.searchParams.get("tab")?.trim()??"harness",oe=D==="workflows"||D==="agents"||D==="knowledge"?D:"harness",V=$(),U=V===null?null:X({wsUrl:V.wsUrl,pairingToken:V.pairingToken}),$r=U===null?null:await JP(U,W.id),H=0;if(U!==null)try{let Pe=await fetch(`${U.appOrigin}/api/agent-witch/projects/${encodeURIComponent(W.id)}/knowledge`,{method:"GET",headers:{[Me]:U.pairingToken},signal:AbortSignal.timeout(1e4)});if(Pe.ok){let jt=await Pe.json();typeof jt=="object"&&jt!==null&&typeof jt.candidateCount=="number"&&(H=jt.candidateCount)}}catch{H=0}be(h,await o({title:W.name,activePath:"/projects",installVersion:_.installVersion,body:Wo({project:W,installed:vr(e.layout),linkedSetSlugs:_r(W.projectFolderPath),composition:$r,knowledgeCandidateCount:H,activeTab:oe,flashMessage:E??T,flashError:I})}));return}if(S==="POST"&&u==="/projects/pull-bound-harness"){let A=await or(y),g=await Yy({rawBody:A,layout:e.layout});if(g.kind==="not_found"){await p(h,"Project not found");return}if(g.kind==="redirect"){h.writeHead(303,{Location:g.location}),h.end();return}let _=n();be(h,await o({title:g.title,activePath:"/projects",installVersion:_.installVersion,body:g.body}));return}if(S==="POST"&&u==="/projects/link-harness"){let A=await or(y),g=new URLSearchParams(A),_=g.get("projectId")?.trim()??"",w=await wm(e.layout),W=yn(w.projects,_);if(W===null){await p(h,"Project not found");return}let E=g.getAll("applySet").map(V=>String(V)),R=Ei({layout:e.layout,projectFolderPath:W.projectFolderPath,setSlugs:E});if(!R.ok){let V=n();be(h,await o({title:W.name,activePath:"/projects",installVersion:V.installVersion,body:Wo({project:W,installed:vr(e.layout),linkedSetSlugs:_r(W.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:R.errorMessage})}));return}let T=$(),I=T===null?null:X({wsUrl:T.wsUrl,pairingToken:T.pairingToken}),D=I===null?!1:await Di(I,W.id,R.appliedSetSlugs),oe=new URLSearchParams({linked:"1",files:String(R.writtenFileCount),bindingsSynced:D?"1":"0"});h.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${oe.toString()}`}),h.end();return}if(S==="POST"&&u==="/project/knowledge/promote-all"){let A=await or(y),_=new URLSearchParams(A).get("projectId")?.trim()??"",w=await wm(e.layout),W=yn(w.projects,_);if(W===null){await p(h,"Project not found");return}let E=$(),R=E===null?null:X({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),T=R===null?{ok:!1,promotedCount:0}:await Tj(R,W.id),I=new URLSearchParams({tab:"knowledge",...T.ok?{knowledgePromoted:String(T.promotedCount)}:{knowledgePromoteFailed:"1"}});h.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${I.toString()}`}),h.end();return}if(S==="GET"&&u==="/harness"){let A=new URL(y.url??"/",`http://127.0.0.1:${43347}`),g=n(),_=Ti(e.layout),w=A.searchParams.get("submitted")==="1",W=w?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${_?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${_?.sets.length??0} set(s).`:null,E=_?.scanRoots[0]??au(),R=Y8(e.layout,{reveal:_,importQuery:A.searchParams.get("import")==="1",justSubmitted:w}),T=rr(g.installVersion);be(h,await o({title:"Harness",activePath:"/harness",installVersion:g.installVersion,body:ll(h_(e.layout,{cloudAppOrigin:T,reveal:_,scanFolder:E,flashMessage:W,importSectionExpanded:R}))}));return}if(S==="POST"&&u==="/api/harness/pick-folder"){let A=Lr();if(A===null){ce(h,200,{cancelled:!0});return}ce(h,200,{path:A});return}if(S==="GET"&&u==="/api/harness/file-content"){let g=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",_=Li(g);if(_===null){ce(h,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let w=dl.default.readFileSync(_,"utf8"),W=w.length>Zj?`${w.slice(0,Zj)}
\u2026 (truncated)`:w;ce(h,200,{content:W})}catch{ce(h,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&u==="/api/harness/reveal/add-project"){let A=await or(y),g="";try{let W=JSON.parse(A);typeof W=="object"&&W!==null&&typeof W.projectPath=="string"&&(g=W.projectPath.trim())}catch{ce(h,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(g.length===0){ce(h,400,{ok:!1,errorMessage:"projectPath is required."});return}let _=Ti(e.layout),w=Cy({reveal:_,projectPath:g});if(w===null||w.sets.length===0){ce(h,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}uu(e.layout,w),ce(h,200,{ok:!0,setCount:w.sets.length});return}if(S==="GET"&&u==="/api/harness/reveal/stream"){let g=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(g.length===0){ce(h,400,{errorMessage:"Choose a folder to scan first."});return}let _=!1;y.on("close",()=>{_=!0}),h.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...b_});let w=Ty({scanRoot:g,response:h,shouldAbort:()=>_});uu(e.layout,w),h.end();return}if(S==="POST"&&u==="/harness/reveal"){h.writeHead(410,{"Content-Type":"text/plain"}),h.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&u==="/harness/submit"){let A=Ti(e.layout);if(A===null){let T=n(),I=rr(T.installVersion);be(h,await o({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:ll(h_(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let g=await or(y),_=new URLSearchParams(g),w=KP(_,A),W=Iy({layout:e.layout,sets:w});if(!W.ok){let T=n(),I=rr(T.installVersion);be(h,await o({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:ll(h_(e.layout,{cloudAppOrigin:I,reveal:A,flashError:W.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}Ny(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";h.writeHead(303,{Location:`/harness?submitted=1&count=${W.writtenItemCount??0}${R}`}),h.end();return}if(S==="GET"&&u==="/writer-api"){let A=new URL(y.url??"/",`http://127.0.0.1:${43347}`),_=$()?.writerExecutionBackend??Le(void 0),w=ge(e.layout.configPath),W=Sr(w),E=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=n();be(h,await o({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:VP({writerExecutionBackend:_,secrets:W,flashMessage:E})}));return}if(S==="POST"&&u==="/writer-api"){let A=await or(y),g=new URLSearchParams(A),_=g.get("writerExecutionBackend")?.trim()??"cli";Fh({configPath:e.layout.configPath,writerExecutionBackend:Le(_),anthropicApiKey:g.get("anthropicApiKey")??void 0,anthropicModel:g.get("anthropicModel")??void 0,openaiApiKey:g.get("openaiApiKey")??void 0,openaiModel:g.get("openaiModel")??void 0,googleApiKey:g.get("googleApiKey")??void 0,googleModel:g.get("googleModel")??void 0}),h.writeHead(303,{Location:"/writer-api?saved=1"}),h.end();return}if(S==="GET"&&u==="/estimates"){h.writeHead(302,{Location:"/history"}),h.end();return}if(S==="GET"&&u==="/history"){let A=n();be(h,await o({title:"History",activePath:"/history",installVersion:A.installVersion,body:TP({reportsDir:e.layout.reportsDir})}));return}if(S==="GET"&&u==="/knowledge"){let g=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",_=n(),w=vA({layout:e.layout}),W=EA(w),E=g.length>0?await Ho({layout:e.layout,query:g,limit:20}):Do(e.layout).slice(-50).reverse(),R=E.map(I=>{let D=LA(w,I.id),oe=D>0?` \xB7 used in ${D} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ne(I.createdAt)}">${ne(A_(I.createdAt))}${I.source?` \xB7 ${ne(I.source)}`:""}${oe}</div><pre>${ne(I.text)}</pre></article>`}).join(""),T=W.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${W.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ne(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";be(h,await o({title:"Knowledge",activePath:"/knowledge",installVersion:_.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ne(g)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${T}${R}${Q8(g,E.length)}`}));return}S==="POST"&&await or(y),await p(h,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),h.writeHead(500),h.end("Internal error")})});return b.on("error",y=>{if(y.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",y)}),b.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Bt}`)}),b},pl=e=>_m(e).publicKeyRaw});var vm=l(()=>{"use strict";UT();BT();nD()});var sD={};St(sD,{runAgentWitchExternalLiveCli:()=>r3});var P_,oD,t3,r3,iD=l(()=>{"use strict";P_=m(require("node:fs")),oD=m(require("node:path"));Ro();B();ee();vm();ee();t3=e=>{let t=oD.default.join(e,"link-code.txt");if(!P_.default.existsSync(t))return null;let r=P_.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},r3=()=>{$e("agent-witch-live");let e=L(),t=N(),r=t3(e),n=pl(t);ul({layout:t,controllers:{getStatus:()=>{let o=fe(t);return{wsConnected:Ji(t,{socketOpen:!0}),lastHeartbeatAt:o?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:n}},reviveWebSocket:()=>{Yr(e)}}})}});var sr=v((z_e,cD)=>{"use strict";var aD=["nodebuffer","arraybuffer","fragments"],lD=typeof Blob<"u";lD&&aD.push("blob");cD.exports={BINARY_TYPES:aD,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:lD,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var ml=v((U_e,Wm)=>{"use strict";var{EMPTY_BUFFER:n3}=sr(),__=Buffer[Symbol.species];function o3(e,t){if(e.length===0)return n3;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new __(r.buffer,r.byteOffset,n):r}function dD(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function uD(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function s3(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function w_(e){if(w_.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new __(e):ArrayBuffer.isView(e)?t=new __(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),w_.readOnly=!1),t}Wm.exports={concat:o3,mask:dD,toArrayBuffer:s3,toBuffer:w_,unmask:uD};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Wm.exports.mask=function(t,r,n,o,s){s<48?dD(t,r,n,o,s):e.mask(t,r,n,o,s)},Wm.exports.unmask=function(t,r){t.length<32?uD(t,r):e.unmask(t,r)}}catch{}});var gD=v((B_e,mD)=>{"use strict";var pD=Symbol("kDone"),v_=Symbol("kRun"),W_=class{constructor(t){this[pD]=()=>{this.pending--,this[v_]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[v_]()}[v_](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[pD])}}};mD.exports=W_});var ls=v((G_e,SD)=>{"use strict";var gl=require("zlib"),fD=ml(),i3=gD(),{kStatusCode:hD}=sr(),a3=Buffer[Symbol.species],l3=Buffer.from([0,0,255,255]),Em=Symbol("permessage-deflate"),ir=Symbol("total-length"),is=Symbol("callback"),Mr=Symbol("buffers"),as=Symbol("error"),Lm,L_=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Lm){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Lm=new i3(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[is];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){Lm.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){Lm.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?gl.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=gl.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Em]=this,this._inflate[ir]=0,this._inflate[Mr]=[],this._inflate.on("error",d3),this._inflate.on("data",yD)}this._inflate[is]=n,this._inflate.write(t),r&&this._inflate.write(l3),this._inflate.flush(()=>{let s=this._inflate[as];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=fD.concat(this._inflate[Mr],this._inflate[ir]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[ir]=0,this._inflate[Mr]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?gl.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=gl.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[ir]=0,this._deflate[Mr]=[],this._deflate.on("data",c3)}this._deflate[is]=n,this._deflate.write(t),this._deflate.flush(gl.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=fD.concat(this._deflate[Mr],this._deflate[ir]);r&&(s=new a3(s.buffer,s.byteOffset,s.length-4)),this._deflate[is]=null,this._deflate[ir]=0,this._deflate[Mr]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};SD.exports=L_;function c3(e){this[Mr].push(e),this[ir]+=e.length}function yD(e){if(this[ir]+=e.length,this[Em]._maxPayload<1||this[ir]<=this[Em]._maxPayload){this[Mr].push(e);return}this[as]=new RangeError("Max payload size exceeded"),this[as].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[as][hD]=1009,this.removeListener("data",yD),this.reset()}function d3(e){if(this[Em]._inflate=null,this[as]){this[is](this[as]);return}e[hD]=1007,this[is](e)}});var cs=v((V_e,Rm)=>{"use strict";var{isUtf8:AD}=require("buffer"),{hasBlob:u3}=sr(),p3=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function m3(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function E_(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function g3(e){return u3&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Rm.exports={isBlob:g3,isValidStatusCode:m3,isValidUTF8:E_,tokenChars:p3};if(AD)Rm.exports.isValidUTF8=function(e){return e.length<24?E_(e):AD(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Rm.exports.isValidUTF8=function(t){return t.length<32?E_(t):e(t)}}catch{}});var x_=v((q_e,LD)=>{"use strict";var{Writable:f3}=require("stream"),bD=ls(),{BINARY_TYPES:h3,EMPTY_BUFFER:PD,kStatusCode:y3,kWebSocket:S3}=sr(),{concat:R_,toArrayBuffer:A3,unmask:b3}=ml(),{isValidStatusCode:P3,isValidUTF8:_D}=cs(),km=Buffer[Symbol.species],Qe=0,wD=1,vD=2,WD=3,k_=4,C_=5,Cm=6,T_=class extends f3{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||h3[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[S3]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Qe}_write(t,r,n){if(this._opcode===8&&this._state==Qe)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new km(n.buffer,n.byteOffset+t,n.length-t),new km(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new km(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Qe:this.getInfo(t);break;case wD:this.getPayloadLength16(t);break;case vD:this.getPayloadLength64(t);break;case WD:this.getMask();break;case k_:this.getData(t);break;case C_:case Cm:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[bD.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=wD:this._payloadLength===127?this._state=vD:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=WD:this._state=k_}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=k_}getData(t){let r=PD;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&b3(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=C_,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[bD.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Qe&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Qe;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=R_(n,r):this._binaryType==="arraybuffer"?o=A3(R_(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=Qe):(this._state=Cm,setImmediate(()=>{this.emit("message",o,!0),this._state=Qe,this.startLoop(t)}))}else{let o=R_(n,r);if(!this._skipUTF8Validation&&!_D(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===C_||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=Qe):(this._state=Cm,setImmediate(()=>{this.emit("message",o,!1),this._state=Qe,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,PD),this.end();else{let n=t.readUInt16BE(0);if(!P3(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new km(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!_D(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=Qe;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Qe):(this._state=Cm,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Qe,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[y3]=o,i}};LD.exports=T_});var N_=v((J_e,kD)=>{"use strict";var{Duplex:K_e}=require("stream"),{randomFillSync:_3}=require("crypto"),{types:{isUint8Array:w3}}=require("util"),ED=ls(),{EMPTY_BUFFER:v3,kWebSocket:W3,NOOP:L3}=sr(),{isBlob:ds,isValidStatusCode:E3}=cs(),{mask:RD,toBuffer:Hn}=ml(),et=Symbol("kByteLength"),R3=Buffer.alloc(4),Tm=8*1024,$n,us=Tm,ht=0,k3=1,C3=2,I_=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=ht,this.onerror=L3,this[W3]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||R3,r.generateMask?r.generateMask(n):(us===Tm&&($n===void 0&&($n=Buffer.alloc(Tm)),_3($n,0,Tm),us=0),n[0]=$n[us++],n[1]=$n[us++],n[2]=$n[us++],n[3]=$n[us++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[et]!==void 0?a=r[et]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(o?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=n[0],d[s-3]=n[1],d[s-2]=n[2],d[s-1]=n[3],i?[d,t]:o?(RD(t,n,d,s,a),[d]):(RD(t,n,t,0,a),[d,t])):[d,t]}close(t,r,n,o){let s;if(t===void 0)s=v3;else{if(typeof t!="number"||!E3(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(w3(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[et]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==ht?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):ds(t)?(o=t.size,s=!1):(t=Hn(t),o=t.length,s=Hn.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[et]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};ds(t)?this._state!==ht?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ht?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):ds(t)?(o=t.size,s=!1):(t=Hn(t),o=t.length,s=Hn.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[et]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};ds(t)?this._state!==ht?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ht?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[ED.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):ds(t)?(a=t.size,c=!1):(t=Hn(t),a=t.length,c=Hn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[et]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};ds(t)?this._state!==ht?this.enqueue([this.getBlobData,t,this._compress,d,n]):this.getBlobData(t,this._compress,d,n):this._state!==ht?this.enqueue([this.dispatch,t,this._compress,d,n]):this.dispatch(t,this._compress,d,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[et],this._state=C3,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(O_,this,a,o);return}this._bufferedBytes-=n[et];let i=Hn(s);r?this.dispatch(i,r,n,o):(this._state=ht,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(T3,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[ED.extensionName];this._bufferedBytes+=n[et],this._state=k3,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");O_(this,c,o);return}this._bufferedBytes-=n[et],this._state=ht,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===ht&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][et],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][et],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};kD.exports=I_;function O_(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function T3(e,t,r){O_(e,t,r),e.onerror(t)}});var DD=v((Y_e,jD)=>{"use strict";var{kForOnEventAttribute:fl,kListener:M_}=sr(),CD=Symbol("kCode"),TD=Symbol("kData"),xD=Symbol("kError"),ID=Symbol("kMessage"),OD=Symbol("kReason"),ps=Symbol("kTarget"),ND=Symbol("kType"),MD=Symbol("kWasClean"),ar=class{constructor(t){this[ps]=null,this[ND]=t}get target(){return this[ps]}get type(){return this[ND]}};Object.defineProperty(ar.prototype,"target",{enumerable:!0});Object.defineProperty(ar.prototype,"type",{enumerable:!0});var Fn=class extends ar{constructor(t,r={}){super(t),this[CD]=r.code===void 0?0:r.code,this[OD]=r.reason===void 0?"":r.reason,this[MD]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[CD]}get reason(){return this[OD]}get wasClean(){return this[MD]}};Object.defineProperty(Fn.prototype,"code",{enumerable:!0});Object.defineProperty(Fn.prototype,"reason",{enumerable:!0});Object.defineProperty(Fn.prototype,"wasClean",{enumerable:!0});var ms=class extends ar{constructor(t,r={}){super(t),this[xD]=r.error===void 0?null:r.error,this[ID]=r.message===void 0?"":r.message}get error(){return this[xD]}get message(){return this[ID]}};Object.defineProperty(ms.prototype,"error",{enumerable:!0});Object.defineProperty(ms.prototype,"message",{enumerable:!0});var hl=class extends ar{constructor(t,r={}){super(t),this[TD]=r.data===void 0?null:r.data}get data(){return this[TD]}};Object.defineProperty(hl.prototype,"data",{enumerable:!0});var x3={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[fl]&&o[M_]===t&&!o[fl])return;let n;if(e==="message")n=function(s,i){let a=new hl("message",{data:i?s:s.toString()});a[ps]=this,xm(t,this,a)};else if(e==="close")n=function(s,i){let a=new Fn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[ps]=this,xm(t,this,a)};else if(e==="error")n=function(s){let i=new ms("error",{error:s,message:s.message});i[ps]=this,xm(t,this,i)};else if(e==="open")n=function(){let s=new ar("open");s[ps]=this,xm(t,this,s)};else return;n[fl]=!!r[fl],n[M_]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[M_]===t&&!r[fl]){this.removeListener(e,r);break}}};jD.exports={CloseEvent:Fn,ErrorEvent:ms,Event:ar,EventTarget:x3,MessageEvent:hl};function xm(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Im=v((X_e,HD)=>{"use strict";var{tokenChars:yl}=cs();function Nt(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function I3(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,d=-1,p=-1,f=0;for(;f<e.length;f++)if(d=e.charCodeAt(f),i===void 0)if(p===-1&&yl[d]===1)c===-1&&(c=f);else if(f!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f);let y=e.slice(c,p);d===44?(Nt(t,y,r),r=Object.create(null)):i=y,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${f}`);else if(a===void 0)if(p===-1&&yl[d]===1)c===-1&&(c=f);else if(d===32||d===9)p===-1&&c!==-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f),Nt(r,e.slice(c,p),!0),d===44&&(Nt(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,f),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${f}`);else if(o){if(yl[d]!==1)throw new SyntaxError(`Unexpected character at index ${f}`);c===-1?c=f:n||(n=!0),o=!1}else if(s)if(yl[d]===1)c===-1&&(c=f);else if(d===34&&c!==-1)s=!1,p=f;else if(d===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${f}`);else if(d===34&&e.charCodeAt(f-1)===61)s=!0;else if(p===-1&&yl[d]===1)c===-1&&(c=f);else if(c!==-1&&(d===32||d===9))p===-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f);let y=e.slice(c,p);n&&(y=y.replace(/\\/g,""),n=!1),Nt(r,a,y),d===44&&(Nt(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${f}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=f);let b=e.slice(c,p);return i===void 0?Nt(t,b,r):(a===void 0?Nt(r,b,!0):n?Nt(r,a,b.replace(/\\/g,"")):Nt(r,a,b),Nt(t,i,r)),t}function O3(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}HD.exports={format:O3,parse:I3}});var jm=v((ewe,XD)=>{"use strict";var N3=require("events"),M3=require("https"),j3=require("http"),zD=require("net"),D3=require("tls"),{randomBytes:H3,createHash:$3}=require("crypto"),{Duplex:Z_e,Readable:Q_e}=require("stream"),{URL:j_}=require("url"),jr=ls(),F3=x_(),z3=N_(),{isBlob:U3}=cs(),{BINARY_TYPES:$D,CLOSE_TIMEOUT:B3,EMPTY_BUFFER:Om,GUID:G3,kForOnEventAttribute:D_,kListener:V3,kStatusCode:q3,kWebSocket:me,NOOP:UD}=sr(),{EventTarget:{addEventListener:K3,removeEventListener:J3}}=DD(),{format:Y3,parse:X3}=Im(),{toBuffer:Z3}=ml(),BD=Symbol("kAborted"),H_=[8,13],lr=["CONNECTING","OPEN","CLOSING","CLOSED"],Q3=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,J=class e extends N3{constructor(t,r,n){super(),this._binaryType=$D[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Om,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),GD(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){$D.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new F3({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new z3(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[me]=this,s[me]=this,t[me]=this,o.on("conclude",r4),o.on("drain",n4),o.on("error",o4),o.on("message",s4),o.on("ping",i4),o.on("pong",a4),s.onerror=l4,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",KD),t.on("data",Mm),t.on("end",JD),t.on("error",YD),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[jr.extensionName]&&this._extensions[jr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Be(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),qD(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){$_(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Om,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){$_(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Om,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){$_(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[jr.extensionName]||(o.compress=!1),this._sender.send(t||Om,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Be(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(J,"CONNECTING",{enumerable:!0,value:lr.indexOf("CONNECTING")});Object.defineProperty(J.prototype,"CONNECTING",{enumerable:!0,value:lr.indexOf("CONNECTING")});Object.defineProperty(J,"OPEN",{enumerable:!0,value:lr.indexOf("OPEN")});Object.defineProperty(J.prototype,"OPEN",{enumerable:!0,value:lr.indexOf("OPEN")});Object.defineProperty(J,"CLOSING",{enumerable:!0,value:lr.indexOf("CLOSING")});Object.defineProperty(J.prototype,"CLOSING",{enumerable:!0,value:lr.indexOf("CLOSING")});Object.defineProperty(J,"CLOSED",{enumerable:!0,value:lr.indexOf("CLOSED")});Object.defineProperty(J.prototype,"CLOSED",{enumerable:!0,value:lr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(J.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(J.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[D_])return t[V3];return null},set(t){for(let r of this.listeners(e))if(r[D_]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[D_]:!0})}})});J.prototype.addEventListener=K3;J.prototype.removeEventListener=J3;XD.exports=J;function GD(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:B3,protocolVersion:H_[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!H_.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${H_.join(", ")})`);let s;if(t instanceof j_)s=t;else try{s=new j_(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Nm(e,u);return}let d=i?443:80,p=H3(16).toString("base64"),f=i?M3.request:j3.request,b=new Set,y;if(o.createConnection=o.createConnection||(i?t4:e4),o.defaultPort=o.defaultPort||d,o.port=s.port||d,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(y=new jr({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=Y3({[jr.extensionName]:y.offer()})),r.length){for(let u of r){if(typeof u!="string"||!Q3.test(u)||b.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");b.add(u)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let u=o.path.split(":");o.socketPath=u[0],o.path=u[1]}let h;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let u=n&&n.headers;if(n={...n,headers:{}},u)for(let[S,A]of Object.entries(u))n.headers[S.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,u||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),h=e._req=f(o),e._redirects&&e.emit("redirect",e.url,h)}else h=e._req=f(o);o.timeout&&h.on("timeout",()=>{Be(e,h,"Opening handshake has timed out")}),h.on("error",u=>{h===null||h[BD]||(h=e._req=null,Nm(e,u))}),h.on("response",u=>{let S=u.headers.location,A=u.statusCode;if(S&&o.followRedirects&&A>=300&&A<400){if(++e._redirects>o.maxRedirects){Be(e,h,"Maximum redirects exceeded");return}h.abort();let g;try{g=new j_(S,t)}catch{let w=new SyntaxError(`Invalid URL: ${S}`);Nm(e,w);return}GD(e,g,r,n)}else e.emit("unexpected-response",h,u)||Be(e,h,`Unexpected server response: ${u.statusCode}`)}),h.on("upgrade",(u,S,A)=>{if(e.emit("upgrade",u),e.readyState!==J.CONNECTING)return;h=e._req=null;let g=u.headers.upgrade;if(g===void 0||g.toLowerCase()!=="websocket"){Be(e,S,"Invalid Upgrade header");return}let _=$3("sha1").update(p+G3).digest("base64");if(u.headers["sec-websocket-accept"]!==_){Be(e,S,"Invalid Sec-WebSocket-Accept header");return}let w=u.headers["sec-websocket-protocol"],W;if(w!==void 0?b.size?b.has(w)||(W="Server sent an invalid subprotocol"):W="Server sent a subprotocol but none was requested":b.size&&(W="Server sent no subprotocol"),W){Be(e,S,W);return}w&&(e._protocol=w);let E=u.headers["sec-websocket-extensions"];if(E!==void 0){if(!y){Be(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=X3(E)}catch{Be(e,S,"Invalid Sec-WebSocket-Extensions header");return}let T=Object.keys(R);if(T.length!==1||T[0]!==jr.extensionName){Be(e,S,"Server indicated an extension that was not requested");return}try{y.accept(R[jr.extensionName])}catch{Be(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[jr.extensionName]=y}e.setSocket(S,A,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(h,e):h.end()}function Nm(e,t){e._readyState=J.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function e4(e){return e.path=e.socketPath,zD.connect(e)}function t4(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=zD.isIP(e.host)?"":e.host),D3.connect(e)}function Be(e,t,r){e._readyState=J.CLOSING;let n=new Error(r);Error.captureStackTrace(n,Be),t.setHeader?(t[BD]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Nm,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function $_(e,t,r){if(t){let n=U3(t)?t.size:Z3(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${lr[e.readyState]})`);process.nextTick(r,n)}}function r4(e,t){let r=this[me];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[me]!==void 0&&(r._socket.removeListener("data",Mm),process.nextTick(VD,r._socket),e===1005?r.close():r.close(e,t))}function n4(){let e=this[me];e.isPaused||e._socket.resume()}function o4(e){let t=this[me];t._socket[me]!==void 0&&(t._socket.removeListener("data",Mm),process.nextTick(VD,t._socket),t.close(e[q3])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function FD(){this[me].emitClose()}function s4(e,t){this[me].emit("message",e,t)}function i4(e){let t=this[me];t._autoPong&&t.pong(e,!this._isServer,UD),t.emit("ping",e)}function a4(e){this[me].emit("pong",e)}function VD(e){e.resume()}function l4(e){let t=this[me];t.readyState!==J.CLOSED&&(t.readyState===J.OPEN&&(t._readyState=J.CLOSING,qD(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function qD(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function KD(){let e=this[me];if(this.removeListener("close",KD),this.removeListener("data",Mm),this.removeListener("end",JD),e._readyState=J.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[me]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",FD),e._receiver.on("finish",FD))}function Mm(e){this[me]._receiver.write(e)||this.pause()}function JD(){let e=this[me];e._readyState=J.CLOSING,e._receiver.end(),this.end()}function YD(){let e=this[me];this.removeListener("error",YD),this.on("error",UD),e&&(e._readyState=J.CLOSING,this.destroy())}});var tH=v((rwe,eH)=>{"use strict";var twe=jm(),{Duplex:c4}=require("stream");function ZD(e){e.emit("close")}function d4(){!this.destroyed&&this._writableState.finished&&this.destroy()}function QD(e){this.removeListener("error",QD),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function u4(e,t){let r=!0,n=new c4({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(ZD,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(ZD,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",d4),n.on("error",QD),n}eH.exports=u4});var F_=v((nwe,rH)=>{"use strict";var{tokenChars:p4}=cs();function m4(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&p4[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}rH.exports={parse:m4}});var cH=v((swe,lH)=>{"use strict";var g4=require("events"),Dm=require("http"),{Duplex:owe}=require("stream"),{createHash:f4}=require("crypto"),nH=Im(),zn=ls(),h4=F_(),y4=jm(),{CLOSE_TIMEOUT:S4,GUID:A4,kWebSocket:b4}=sr(),P4=/^[+/0-9A-Za-z]{22}==$/,oH=0,sH=1,aH=2,z_=class extends g4{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:S4,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:y4,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Dm.createServer((n,o)=>{let s=Dm.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=_4(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=oH}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===aH){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Sl,this);return}if(t&&this.once("close",t),this._state!==sH)if(this._state=sH,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Sl,this):process.nextTick(Sl,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Sl(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",iH);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Un(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Un(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!P4.test(s)){Un(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Un(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Al(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=h4.parse(c)}catch{Un(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],f={};if(this.options.perMessageDeflate&&p!==void 0){let b=new zn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let y=nH.parse(p);y[zn.extensionName]&&(b.accept(y[zn.extensionName]),f[zn.extensionName]=b)}catch{Un(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let b={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(b,(y,h,u,S)=>{if(!y)return Al(r,h||401,u,S);this.completeUpgrade(f,s,d,t,r,n,o)});return}if(!this.options.verifyClient(b))return Al(r,401)}this.completeUpgrade(f,s,d,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[b4])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>oH)return Al(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${f4("sha1").update(r+A4).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(n.size){let f=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;f&&(d.push(`Sec-WebSocket-Protocol: ${f}`),p._protocol=f)}if(t[zn.extensionName]){let f=t[zn.extensionName].params,b=nH.format({[zn.extensionName]:[f]});d.push(`Sec-WebSocket-Extensions: ${b}`),p._extensions=t}this.emit("headers",d,o),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",iH),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Sl,this)})),a(p,o)}};lH.exports=z_;function _4(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function Sl(e){e._state=aH,e.emit("close")}function iH(){this.destroy()}function Al(e,t,r,n){r=r||Dm.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Dm.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function Un(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,Un),e.emit("wsClientError",i,r,t)}else Al(r,n,o,s)}});var w4,v4,W4,L4,E4,R4,dH,k4,bl,uH=l(()=>{w4=m(tH(),1),v4=m(Im(),1),W4=m(ls(),1),L4=m(x_(),1),E4=m(N_(),1),R4=m(F_(),1),dH=m(jm(),1),k4=m(cH(),1),bl=dH.default});var U_,B_,G_=l(()=>{"use strict";U_="AGENT_WITCH_EXTERNAL_BRIDGE",B_="AGENT_WITCH_EXTERNAL_LIVE"});var V_,pH=l(()=>{"use strict";V_=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var C4,q_,mH=l(()=>{"use strict";G_();pH();C4=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",q_=(e={})=>{let t=e.env??process.env,r=V_(t[U_]),n=V_(t[B_]);return{mode:C4(r,n),skipInProcessBridge:r,skipInProcessLive:n}}});var gH=l(()=>{"use strict";G_()});var fH=l(()=>{"use strict";mH();gH()});var K_=l(()=>{"use strict"});var cr,Pl=l(()=>{"use strict";cr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var gs,Bn,hH,x4,J_,Y_,yH,SH,X_,AH,_l,Z_=l(()=>{"use strict";gs=m(require("node:fs")),Bn=m(require("node:os")),hH=m(require("node:path"));K_();Pl();x4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J_=(e=Bn.default.hostname())=>hH.default.join(Bn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),Y_=e=>{if(!gs.default.existsSync(e))return null;try{let t=JSON.parse(gs.default.readFileSync(e,"utf8"));return!x4(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},yH=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},SH=(e,t)=>{gs.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},X_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??J_(),n=Y_(r);if(n!==null&&n.pid!==process.pid&&cr(n.pid)&&yH(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:Bn.default.hostname(),macOsUsername:Bn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return SH(r,o),{ok:!0}},AH=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??J_(),n=Y_(r);return n!==null&&n.pid!==process.pid&&cr(n.pid)&&yH(n)?{ok:!1}:(SH(r,{hostname:Bn.default.hostname(),macOsUsername:Bn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},_l=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??J_();Y_(r)?.pid===process.pid&&gs.default.existsSync(r)&&gs.default.unlinkSync(r)}});var Q_,wl,I4,O4,N4,M4,ew,bH=l(()=>{"use strict";Q_=require("node:child_process"),wl=m(require("node:path"));Pl();cd();I4=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),O4=(e,t)=>{if(I4(e)||!/\bnode\b/.test(e))return!1;let r=wl.default.resolve(t),n=wl.default.join(r,"app",$s),o=wl.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===$s||i==="agent-witch.ts")return e.includes(r);try{let a=wl.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},N4=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,Q_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},M4=(e,t,r)=>{let n=N4(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||O4(d,t)&&o.push(c)}return o},ew=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Q_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=M4(r,e.installDir,t),o=[];for(let s of n)if(cr(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var vl,Wl,PH,j4,tw,_H=l(()=>{"use strict";vl=m(require("node:fs")),Wl=m(require("node:path"));we();PH=(e,t)=>{!vl.default.existsSync(e)||vl.default.existsSync(t)||(vl.default.mkdirSync(Wl.default.dirname(t),{recursive:!0}),vl.default.renameSync(e,t))},j4=e=>{if(e.profileEmail===null)return;let t=Wl.default.join(e.installDir,rt);PH(Wl.default.join(t,Xn),e.mainLogPath),PH(Wl.default.join(t,Zn),e.errorLogPath)},tw=e=>{let t=N();e!==void 0&&t.installDir!==e||j4(t)}});var D4,wH=l(()=>{"use strict";ra();Vu();Vu();D4={};!it()&&Qr(D4.url)&&(async()=>{$e("agent-witch-wake-server");let e=await Pn(),t=zt(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var vH=l(()=>{"use strict";wH()});var WH=l(()=>{"use strict";zi()});var rw,LH=l(()=>{"use strict";K_();vH();Z_();WH();rw=async(e={})=>{let t=e.skipInProcessBridge?null:await Gu();vu();let r=setInterval(()=>{vu()},6e4),n=setInterval(()=>{if(!AH().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t?.close()}}}});var Ll,Hm,F4,EH,RH,$m,kH,CH,nw,TH,Fm,xH=l(()=>{"use strict";Ll=m(require("node:fs")),Hm=m(require("node:path")),F4="pending-run-inputs.json",EH=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RH=e=>{let t=e.profileEmail?Hm.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Hm.default.join(t,F4)},$m=e=>{let t=RH(e);if(!Ll.default.existsSync(t))return{};try{let r=JSON.parse(Ll.default.readFileSync(t,"utf8"));return EH(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!EH(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},kH=(e,t)=>{let r=RH(e);Ll.default.mkdirSync(Hm.default.dirname(r),{recursive:!0}),Ll.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},CH=e=>Object.values($m(e)),nw=(e,t)=>$m(e)[t]!==void 0,TH=(e,t)=>{let r=$m(e);r[t.agentRunId]=t,kH(e,r)},Fm=(e,t)=>{let r=$m(e);delete r[t],kH(e,r)}});var zm=l(()=>{"use strict";ae()});var IH=l(()=>{"use strict";ae()});var Um=l(()=>{"use strict";ae()});var Bm=l(()=>{"use strict";ae()});var El=l(()=>{"use strict";ae()});var z4,U4,Rl,ow=l(()=>{"use strict";lt();zm();IH();Um();Bm();El();z4={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},U4={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Rl=e=>{if(!se(e.writerAgent))return"the selected writer";let t=Fe(e.writerAgent);if(Le(e.writerExecutionBackend)==="api"&&t!==null){let r=Ne(ge(e.configPath),t);if(r!==null&&r.apiKey.length>0){let n=ai(t,r.model);return`${U4[t]} model ${n}`}}return z4[e.writerAgent]}});var B4,G4,OH,NH,MH=l(()=>{"use strict";B4=/"input_tokens"\s*:\s*(\d+)/,G4=/"output_tokens"\s*:\s*(\d+)/,OH=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},NH=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=OH(B4.exec(t)),n=OH(G4.exec(t));if(r===null||n===null)return null;let o=r+n;return o>=1?o:null}});var Gm=l(()=>{"use strict";ut()});var kl,Vm,V4,sw,jH,DH,HH,iw,$H=l(()=>{"use strict";kl=m(require("node:fs")),Vm=m(require("node:path"));Gm();V4="run-completion-outbox.json",sw=e=>{let t=e.profileEmail?Vm.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Vm.default.join(t,V4)},jH=e=>{let t=sw(e);if(!kl.default.existsSync(t))return[];try{let r=JSON.parse(kl.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},DH=(e,t)=>{kl.default.mkdirSync(Vm.default.dirname(sw(e)),{recursive:!0}),kl.default.writeFileSync(sw(e),JSON.stringify(t,null,2),"utf8")},HH=(e,t)=>{let r=[...jH(e).filter(n=>n.runId!==t.runId),t];DH(e,r)},iw=async e=>{if(e.cloudApi===null)return;let t=jH(e.layout);if(t.length===0)return;let r=[];for(let n of t)await Mi(e.cloudApi,n.runId,n.exitCode,n.output,{estimateSeconds:n.estimateSeconds,actualSeconds:n.actualSeconds})||r.push(n);DH(e.layout,r)}});var FH=l(()=>{"use strict"});var aw,Cl,K4,Gn,zH=l(()=>{"use strict";FH();aw=new Map,Cl=e=>{let t=aw.get(e);t!==void 0&&(clearInterval(t),aw.delete(e))},K4=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},Gn=(e,t,r,n={})=>{Cl(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){Cl(t);return}let i=n.onTick?.()??{};K4(e,t,o,i)};s(),aw.set(t,setInterval(s,15e3))}});var UH=l(()=>{"use strict";ut()});var BH,GH=l(()=>{"use strict";UH();BH=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Ve(t)}});var lw,Tl,dr,cw,Mt,VH,qm=l(()=>{"use strict";lw=new Set,Tl=new Map,dr=(e,t)=>{if(t.length===0)return;let r=Tl.get(e)??[];r.push(t),Tl.set(e,r)},cw=e=>{lw.add(e);let t=Tl.get(e)??[];return Tl.delete(e),t},Mt=e=>lw.has(e),VH=e=>{lw.delete(e),Tl.delete(e)}});var Km,qH,J4,KH,JH=l(()=>{"use strict";Km=m(require("node:path")),qH=require("node:url");ro();J4={},KH=()=>{if(it()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Km.default.dirname(Km.default.resolve(e))}return Km.default.dirname((0,qH.fileURLToPath)(J4.url))}});var YH,XH,ZH,QH,He,fs,e$,t$,hs,dw,uw,pw,r$,mw,n$,Jm=l(()=>{"use strict";YH=require("node:crypto"),XH=m(require("node:fs")),ZH=m(require("node:path")),QH=require("node:url");Pl();ro();JH();He=new Map,e$=async()=>{if(fs!==void 0)return fs;try{if(it()){let e=KH(),t=ZH.default.join(e,"deps","node-pty","lib","index.js");if(XH.default.existsSync(t)){let r=await import((0,QH.pathToFileURL)(t).href);return fs=r,r}}return fs=await import("node-pty"),fs}catch{return fs=null,null}},t$=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},hs=(e,t,r)=>{let n=He.get(e);if(n!==void 0){He.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},dw=(e,t)=>{let r=He.get(e);return r===void 0?!1:(r.pty.write(t),!0)},uw=(e,t,r)=>{let n=He.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},pw=e=>{for(let t of He.values())if(!(t.mode!=="agent"||t.runId!==e))return cr(t.pty.pid);return!1},r$=e=>{for(let[t,r]of He.entries())if(!(r.mode!=="agent"||r.runId!==e)){He.delete(t);try{r.pty.kill()}catch{}return!0}return!1},mw=async e=>{let t=await e$();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;He.get(e.shellSessionId)!==void 0&&hs(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return He.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{t$(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{He.get(e.shellSessionId)?.pty===o&&(He.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},n$=async e=>{let t=e.shellSessionId??(0,YH.randomUUID)(),r=await e$();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return He.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{t$(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{He.get(t)?.pty===n&&(He.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var Ym,o$,s$=l(()=>{"use strict";Ym="[[AWAITING_INPUT]]",o$=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Ym,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var xl,i$,Xm=l(()=>{"use strict";s$();xl=e=>{let t=e.indexOf(Ym);if(t<0)return null;let n=e.slice(t+Ym.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},i$=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",o$].join(`
`)});var a$,l$=l(()=>{"use strict";qm();Jm();Xm();a$=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(Mt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}dr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await n$({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=xl(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var c$,d$,u$,ur,Zm=l(()=>{"use strict";c$=require("node:child_process"),d$=m(require("node:fs")),u$=m(require("node:path"));cd();ur=(e,t)=>{let r=u$.default.join(e,"app",WL,"ensure-writer.sh");return d$.default.existsSync(r)?new Promise((n,o)=>{let s=(0,c$.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var p$,Vn,Ol,Qm,gw,Il,eg,tg,fw,hw,Y4,ys,X4,Z4,yw,Sw=l(()=>{"use strict";p$=require("node:child_process");lt();Zm();Um();zm();El();Bm();Vn=new Map,Ol=e=>e==="cursor"||e==="antigravity",Qm=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",gw=e=>Vn.get(e)?.warmed===!0,Il=e=>{let t=Vn.get(e);Vn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},eg=e=>Vn.get(e)?.conversationStarted===!0,tg=e=>{let t=Vn.get(e);Vn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},fw=e=>{Vn.delete(e)},hw=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",Y4={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ys=e=>`${Y4[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,X4=(e,t,r,n)=>new Promise(o=>{let s=_d(t,r),i=[],a=(0,p$.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),n?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{o({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{o({exitCode:-1,output:d.message})})}),Z4=(e,t)=>{let r=ys(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},yw=async e=>{if(!se(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Le(e.runConfig.writerExecutionBackend)==="api"){let r=Fe(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let n=ge(e.runConfig.layout.configPath);return Ne(n,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Il(e.writerAgent),{exitCode:0,output:ys(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await ur(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}Ol(e.writerAgent)&&Il(e.writerAgent);let t=await X4(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?Z4(e.writerAgent,t.output):ys(e.writerAgent)}}});var qn,Aw=l(()=>{"use strict";qn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var m$,Q4,eJ,g$,tJ,bw,f$=l(()=>{"use strict";Aw();m$=/you(?:'|')ve hit your session limit/i,Q4=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],eJ=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,g$=(e,t)=>{for(let r of e.split(/\r?\n/)){let n=r.trim();if(n.length>0&&t.test(n))return n}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},tJ=e=>{let t=eJ.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},bw=e=>{let t=e.trim();if(t.length===0)return null;if(m$.test(t))return{code:qn.SESSION_LIMIT,resetHint:tJ(t),matchedLine:g$(t,m$)};for(let r of Q4)if(r.test(t))return{code:qn.PROVIDER_QUOTA,resetHint:null,matchedLine:g$(t,r)};return null}});var rg,ng,Pw,_w=l(()=>{"use strict";rg="[[AGENT_RUN_WRITER_EXECUTION]]",ng="cli-writer-api-key-missing",Pw="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var ww=l(()=>{"use strict";_w()});var h$=l(()=>{"use strict";ww()});var og=l(()=>{"use strict";Aw();f$();_w();ww();h$()});var sg,y$=l(()=>{"use strict";sg={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var S$,A$=l(()=>{"use strict";S$="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var b$,P$=l(()=>{"use strict";og();A$();b$=e=>e.code===qn.SESSION_LIMIT?S$:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var _$,w$=l(()=>{"use strict";og();y$();P$();_$=e=>{let t=bw(e.output);return t!==null?{status:sg.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:b$(t)}:{status:e.exitCode===0?sg.COMPLETED:sg.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var vw,mWe,v$=l(()=>{"use strict";vw={OPEN:"open",APPROVAL:"approval"},mWe=vw.APPROVAL});var Ss,ig,W$,oJ,L$,E$,R$,Nl,Ww,Lw=l(()=>{"use strict";Ss=m(require("node:fs")),ig=m(require("node:path")),W$="runs",oJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),L$=e=>{let t=e.profileEmail!==null?ig.default.join(e.installDir,"profiles",e.profileEmail,W$):ig.default.join(e.installDir,W$);return Ss.default.mkdirSync(t,{recursive:!0}),t},E$=(e,t)=>ig.default.join(L$(e),`${t}.json`),R$=(e,t)=>{Ss.default.writeFileSync(E$(e,t.id),JSON.stringify(t,null,2))},Nl=(e,t)=>{let r=E$(e,t);if(!Ss.default.existsSync(r))return null;try{let n=JSON.parse(Ss.default.readFileSync(r,"utf8"));return!oJ(n)||typeof n.id!="string"?null:n}catch{return null}},Ww=e=>{let t=L$(e),r=Ss.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=Nl(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var sJ,k$,C$=l(()=>{"use strict";w$();v$();Lw();sJ=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",n=_$({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:n.status,dispatchPolicy:vw.OPEN,resultOutput:e.output,resultExitCode:n.resultExitCode,resultOutcomeCode:n.resultOutcomeCode,denialReason:n.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},k$=(e,t)=>{let r=sJ(t);return R$(e,r),r}});var T$=l(()=>{"use strict";Sm()});var x$,I$=l(()=>{"use strict";og();x$=()=>[rg,`agentRunWriterExecutionBackend=${ng}`,`agentRunWriterExecutionReasonCode=${Pw}`].join(`
`)});var Dr,ag=l(()=>{"use strict";Dr=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Ew,iJ,aJ,O$,N$=l(()=>{"use strict";Ew=e=>e.toLocaleString("en-US"),iJ=e=>e<.01?e.toFixed(4):e.toFixed(3),aJ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${iJ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Ew(e.inputTokens)} in / ${Ew(e.outputTokens)} out (${Ew(e.totalTokens)} total)`,t].join(`
`)},O$=(e,t)=>{if(t===void 0)return e;let r=aJ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var M$=l(()=>{"use strict";ae()});var D$,Ml,de,Rw,lg,j$,lJ,cJ,H$,$$,F$,jl,kw,Cw,Tw,z$,dJ,tt,Dl,Hr,U$,uJ,pJ,cg,xw,Iw,Ow,B$=l(()=>{"use strict";D$=require("node:child_process");ae();lt();xH();rl();ow();MH();wd();$H();Gm();zH();Pl();GH();qm();Jm();Xm();l$();Sw();C$();T$();I$();ag();N$();ao();M$();El();Gs();Xm();Ml=new Map,de=new Map,Rw=new Set,lg=new Map,j$=e=>{e!==void 0&&!lg.has(e)&&lg.set(e,Date.now())},lJ=(e,t,r,n)=>{let o=n.endsWith(`
`)?n:`${n}
`;if(Mt(t)){tt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:o},requestId:r});return}dr(t,o)},cJ=(e,t,r,n,o)=>{if(!Uh(e,o))return;let s=`${x$()}
`;lJ(t,r,n,s);let i=de.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},H$=130,$$=`

Stopped by user.`,F$=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:Dr(e)},jl=null,kw=e=>{jl=e},Cw=(e,t)=>{if(jl===null)return;let r=RP(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||Fy(jl,t,r)},Tw=async e=>{await iw({layout:e,cloudApi:jl})},z$=e=>{let t=Ml.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:cr(t.pid)},dJ=e=>ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),tt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Dl=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=to(s),c=de.get(r);if(a!==null&&c!==void 0){let d=NL(a),p=z$(r)||pw(r);d!==null&&!p&&Hr(e,t,r,n,d.exitCode,d.output,c.originalPrompt)}return OL(a)}}),Hr=(e,t,r,n,o,s,i,a)=>{let c=fo(s,a),d=o,p=O$(c.output,c.llmUsage);if(r!==void 0){let b=lg.get(r);lg.delete(r),b!==void 0&&LP({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-b)/1e3))});let y=NH(c.llmUsage,p);y!==null&&tj({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:y})}r!==void 0&&Rw.has(r)&&(Rw.delete(r),d=H$,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${$$}`:"Stopped by user.");let f=r!==void 0?RP(e.layout.reportsDir,r):null;if(r!==void 0){Cl(r),fi(e.layout,r),Mt(r)&&(tt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),VH(r));let b=de.get(r);ZM({reportsDir:e.layout.reportsDir,agentRunId:r,input:Dr(i),output:p,...b!==void 0?{writerLabel:Rl({writerAgent:b.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),b!==void 0&&hm({layout:e.layout,writerAgent:b.writerAgent,projectFolderPath:b.projectFolderPath,userPrompt:b.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),k$(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),HH(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{}}),iw({layout:e.layout,cloudApi:jl}),de.delete(r),Ml.delete(r),Fm(e.layout,r)}tt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:n}),ei(e.layout)},U$=(e,t,r,n,o,s,i)=>{let a=de.get(r),c=a?.accumulatedOutput??s;TH(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),Gn(t,r,()=>nw(e.layout,r),Dl(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),tt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},uJ=(e,t,r,n,o,s,i,a)=>{let c=[],d=!1,p=y=>{if(!(o===void 0||y.length===0)){if(Mt(o)){tt(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:y},requestId:n});return}dr(o,y)}};if(o!==void 0){let y=de.get(o);Ml.set(o,t),de.set(o,{originalPrompt:s,userTranscriptPrompt:y?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:y?.projectFolderPath,reportKey:y?.reportKey,accumulatedOutput:y?.accumulatedOutput??""}),tt(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),Gn(r,o,()=>z$(o),Dl(e,r,o,n,y?.projectFolderPath,y?.reportKey))}let f=a==="claude-cli",b=[];t.stdout?.on("data",y=>{let h=y.toString("utf8");if(f?b.push(h):(c.push(h),p(h)),d||o===void 0)return;let u=xl(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let S=de.get(o),A=[S?.accumulatedOutput??"",u.partialOutput].filter(g=>g.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=A),Ml.delete(o),U$(e,r,o,n,u.question,A,s)}}),t.stderr?.on("data",y=>{let h=y.toString("utf8");c.push(h),p(h)}),t.on("close",y=>{if(d)return;tg(a);let h=o!==void 0?de.get(o):void 0,u=f?fo(b.join("")):{output:c.join("").trim(),llmUsage:void 0},S=f?c.join("").trim():"",A=[u.output.trim(),S].filter(_=>_.length>0).join(`
`);f&&u.output.trim().length>0&&p(u.output);let g=h!==void 0&&h.accumulatedOutput.length>0?`${h.accumulatedOutput}

${A}`.trim():A;Hr(e,r,o,n,y??-1,g,s,u.llmUsage)}),t.on("error",y=>{d||Hr(e,r,o,n,-1,y.message,s)})},pJ=(e,t,r,n,o,s,i,a,c)=>{let d=F$(r,c);s!==void 0&&(de.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),tt(o,{type:"terminal.stream.start",payload:{runId:s},requestId:n}),Gn(o,s,()=>de.has(s),Dl(e,o,s,n,i,a))),ui(e,t,r,f=>{if(!(s===void 0||f.length===0)){if(Mt(s)){tt(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:f},requestId:n});return}dr(s,f)}}).then(f=>{tg(t),Hr(e,o,s,n,f.exitCode,f.output,r,f.llmUsage)}).catch(f=>{let b=f instanceof Error?f.message:String(f);Hr(e,o,s,n,-1,b,r)})},cg=(e,t,r,n,o,s,i,a,c,d,p,f)=>{let b=F$(r,p);if(Qs(e.layout),ln(e,t)){j$(s),pJ(e,t,r,n,o,s,c,d,b);return}let y=wt(t,r,dJ(e),i);if(y===null){Hr(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}j$(s);let h=BH({workspace:e.workspace,projectFolderPath:c}),u=()=>{let S=(0,D$.spawn)(y.command,[...y.args],{cwd:h,stdio:["ignore","pipe","pipe"],env:f??process.env});uJ(e,S,o,n,s,r,b,t)};if(s===void 0){u();return}de.set(s,{originalPrompt:r,userTranscriptPrompt:b,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:de.get(s)?.accumulatedOutput??""}),cJ(e,o,s,n,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Bs({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Gn(o,s,()=>de.has(s),Dl(e,o,s,n,c,d)),a$({socket:o,sendMessage:tt,requestId:n,agentRunId:s,shellSessionId:a,command:y.command,args:y.args,cwd:h,processEnv:f,originalPrompt:r,writerAgent:t,onInputRequired:S=>{a!==void 0&&hs(a,_=>{tt(o,_)},n);let A=de.get(s),g=[A?.accumulatedOutput??"",S.partialOutput].filter(_=>_.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=g),U$(e,o,s,n,S.question,g,r)},onFinished:(S,A)=>{tg(t);let g=fo(A),_=de.get(s),w=_!==void 0&&_.accumulatedOutput.length>0?`${_.accumulatedOutput}

${g.output}`.trim():g.output;Hr(e,o,s,n,S,w,r,g.llmUsage)}}).then(S=>{if(!S){u();return}Gn(o,s,()=>pw(s),Dl(e,o,s,n,c,d))}).catch(S=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",S instanceof Error?S.message:S),u()})},xw=(e,t,r,n)=>{Fm(e.layout,t.agentRunId),t.shellSessionId!==void 0&&tt(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=i$(t),s=de.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;cg(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},Iw=(e,t)=>{for(let r of CH(e.layout))de.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:Dr(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Gn(t,r.agentRunId,()=>nw(e.layout,r.agentRunId),{awaitingInput:!0}),tt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Ow=(e,t,r,n)=>{let o=de.get(r);if(o===void 0)return!1;Rw.add(r),Cl(r);let s=Ml.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(r$(r))return!0;Fm(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${$$}`:"Stopped by user.";return Hr(e,t,r,n,H$,i,o.originalPrompt),!0}});var mJ,Nw,G$=l(()=>{"use strict";Ai();mJ=()=>`http://127.0.0.1:${ct()}/restart`,Nw=async()=>{try{let e=await fetch(mJ(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var V$=l(()=>{"use strict";aa()});var q$=l(()=>{"use strict";n_()});var K$,J$=l(()=>{"use strict";K$=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Hl,gJ,Mw,Y$=l(()=>{"use strict";B();ee();V$();LS();q$();J$();ao();Hl=(e,t)=>{Er(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},gJ=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(sh(),oh)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},Mw=async e=>{let t=ve(e.layout.installDir)?.bundleVersion??null;if(!K$({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(at(e.layout)){ti({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Hl(e.layout,{summary:r,action:"install-bundle-update-start"}),Ft({launchAgentLabel:te(e.layout.installDir),installDir:e.layout.installDir});let n=await ss({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),Hl(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await gJ();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Hl(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),Hl(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),Hl(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var fJ,jw,X$=l(()=>{"use strict";fJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jw=e=>{if(!fJ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Dw,Hw,Z$=l(()=>{"use strict";iS();aS();Dw=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Ui({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},Hw=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Yt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var Q$,hJ,yJ,SJ,$l,eF=l(()=>{"use strict";Q$=m(require("node:os"));we();hJ="Default",yJ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),SJ=e=>{let t=Q$.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},$l=()=>{let e=N(),t=Zc(e),r=yJ(hJ);return`${SJ(t)}/${r.length>0?r:"project"}`}});var tF=l(()=>{"use strict";aa()});var rF,$w,nF=l(()=>{"use strict";tF();rF=!1,$w=e=>{rF||(rF=!0,process.on("uncaughtException",t=>{wn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;wn(e,{kind:"crash",message:r,stack:n})}))}});var oF,AJ,Fw,sF=l(()=>{"use strict";oF=require("node:child_process");Zm();lt();Um();zm();El();Bm();AJ=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,oF.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},Fw=async e=>{if(!se(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Le(e.runConfig.writerExecutionBackend)==="api"){let r=Fe(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let n=ge(e.layout.configPath),o=Ne(n,r),s=o!==null&&o.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await ur(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await AJ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var zw,iF=l(()=>{"use strict";zw=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var aF,Uw,lF=l(()=>{"use strict";aF=require("node:crypto"),Uw=()=>(0,aF.randomUUID)()});var As,cF,dg=l(()=>{"use strict";As="[[WORKING_ESTIMATE]]",cF=(e,t,r,n="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",As,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var dF,uF=l(()=>{"use strict";dF=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var bJ,pF,mF=l(()=>{"use strict";dg();bJ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,pF=e=>{if(!e.includes(As))return null;let t=null;for(let r of e.matchAll(bJ)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var PJ,Bw,gF=l(()=>{"use strict";mF();PJ=/^(\d{1,6})\b/,Bw=e=>{let t=pF(e);if(t!==null)return t;let r=PJ.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return!Number.isFinite(n)||n<=0?null:n}});var _J,wJ,vJ,ug,Gw=l(()=>{"use strict";lt();oa();_J="http://127.0.0.1:11434",wJ=45e3,vJ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},ug=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||_J,n=t===void 0?(await mt({commands:ie({})})).estimateModel:t;if(n===null||n.trim().length===0)return null;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:n,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(wJ)});return o.ok?vJ(await o.json()):null}catch{return null}}});var Vw,qw,Kw,fF=l(()=>{"use strict";Gs();dg();ag();uF();gF();rl();Gw();Vw=async e=>{let t=Dr(e.wrappedPrompt),r=QM(e.reportsDir);return{estimateOutput:await ug(cF(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},qw=e=>{let t=Bw(e.estimateOutput);t!==null&&cm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},Kw=e=>{let t=Bw(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=dF(t);return Us({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Pt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),cm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var pg,hF,Jw=l(()=>{"use strict";pg="[[WORKING_TOKEN_ESTIMATE]]",hF=(e,t,r,n="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",pg,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var yF,WJ,SF,AF=l(()=>{"use strict";Jw();yF=/^(\d{1,8})\b/,WJ=e=>{let t=e.indexOf(pg);if(t<0)return null;let r=e.slice(t+pg.length).trim(),n=yF.exec(r);if(n===null)return null;let o=Number.parseInt(n[1]??"",10);return Number.isFinite(o)&&o>=1?o:null},SF=e=>{let t=WJ(e);if(t!==null)return t;let r=yF.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return Number.isFinite(n)&&n>=1?n:null}});var Yw,Xw,bF=l(()=>{"use strict";Jw();ag();AF();rl();Gw();Yw=async e=>{let t=Dr(e.wrappedPrompt),r=rj(e.reportsDir);return{estimateOutput:await ug(hF(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},Xw=e=>{let t=SF(e.estimateOutput);return t===null?null:(ej({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var PF=l(()=>{"use strict";Z_();bH();_H();LH();Ai();B$();Zm();lt();Lw();qm();G$();fS();Y$();ao();X$();Z$();Gm();eF();nF();sF();dd();iF();lF();dg();Gs();fF();bF();ow();oa();Jm();Sw()});var _F={};St(_F,{buildContinuationPromptWithContext:()=>RJ});var LJ,EJ,RJ,wF=l(()=>{"use strict";LJ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,EJ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),RJ=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=EJ(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${LJ(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var vF={};St(vF,{readHarnessExportSets:()=>CJ});var Fl,Zw,mg,kJ,CJ,WF=l(()=>{"use strict";Fl=m(require("node:fs")),Zw=m(require("node:path"));we();mg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kJ=e=>{if(!Fl.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Fl.default.readFileSync(e.harnessManifestPath,"utf8"));if(mg(t))return t}catch{return null}return null},CJ=(e,t)=>{let r=N(t),n=kJ(r);if(n===null)return[];let o=mg(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!mg(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!mg(p))continue;let f=typeof p.path=="string"?p.path:void 0,b=typeof p.id=="string"?p.id:"",y=typeof p.kind=="string"?p.kind:"",h=typeof p.title=="string"?p.title:"";if(f===void 0||b.length===0||y.length===0||h.length===0)continue;let u=f.startsWith("shared/")?Zw.default.join(r.harnessRootDir,f):Zw.default.join(r.harnessSetsDir,i,f);Fl.default.existsSync(u)&&d.push({id:b,kind:y,title:h,content:Fl.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var sv,ev,bs,LF,TJ,EF,RF,Qw,kF,tv,rv,nv,Y,z,ov,xJ,zl,IJ,OJ,NJ,MJ,jJ,DJ,HJ,$J,Ul,CF=l(()=>{"use strict";sv=require("node:child_process"),ev=m(require("node:fs")),bs=m(require("node:os"));uH();B();ee();Ro();f_();fH();ae();Ge();aa();MA();vm();Sm();ut();mn();jS();Gt();PF();LF=3e4,TJ=3e4,EF=new Map,RF=new Map,Qw=new Map,kF=new Map,tv=new Map,rv=new Map,nv=new Map,Y=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),z=(e,t,r)=>{e.readyState===bl.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Er(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),qu(r,"out",t)))},ov=e=>e,xJ=e=>{if(!ev.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(ev.default.readFileSync(e.harnessManifestPath,"utf8"));if(Y(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},zl=(e,t)=>{let r=xJ(t);r!==null&&z(e,{type:"harness.manifest.report",payload:{hostname:bs.default.hostname(),manifest:r}})},IJ=async(e,t,r,n,o,s,i=!1,a,c,d,p,f)=>{let b=f?.trim()??"";if(!se(t)){z(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let y=Rl({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),h=await mt({commands:ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?Vw({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:h?.estimateModel,capabilityNote:h?.capabilityNote}).catch(()=>null):null,S=s!==void 0?Yw({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:h?.estimateModel,capabilityNote:h?.capabilityNote}).catch(()=>null):null,A=Ol(t)&&!gw(t);if(A){try{await ur(e.layout.installDir,t)}catch(H){let Pe=H instanceof Error?H.message:String(H);z(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Pe}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Il(t)}else if(!Ol(t))try{await ur(e.layout.installDir,t)}catch(H){let Pe=H instanceof Error?H.message:String(H);z(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Pe}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let g=mi(d,$l,f);if(g===null){z(o,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:n});return}ze({projectFolderPath:g,...b.length>0?{projectId:b}:{}}),i||al(e.layout,t,g);let _=ym({sessionContinuation:i,supportsWriterSessionContinuation:Qm(t),isWriterConversationStarted:eg(t)}),w=i&&_==="first"?il(e.layout,t,g):null,W=w!==null?os(e.layout,w):null,E=W!==null&&W.turns.length>0,R=UP({sessionContinuation:i,supportsWriterSessionContinuation:Qm(t),isWriterConversationStarted:eg(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:E,userPromptCharacterCount:r.length}),T=r;if(R.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?Nl(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:Pe}=await Promise.resolve().then(()=>(wF(),_F));T=Pe({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else R.continuationStrategy==="transcript_seed"&&W!==null&&W.turns.length>0&&(T=pm({priorTurns:W.turns,userMessage:r}));let I=R.ragLimit>0?await Ho({layout:e.layout,query:T,limit:R.ragLimit,minScore:R.ragMinScore,projectFolderPath:g,...b.length>0?{projectId:b}:{}}):[],D=R.ragLimit>0&&g.trim().length>0?await OA({layout:e.layout,query:T,limit:2,minScore:.32,projectFolderPath:g,...b.length>0?{projectId:b}:{}}):[],oe=R.injectMemory?IP(e.layout,g,b.length>0?b:void 0):[],V=`${NP(oe,R.memoryEntryLimit)}${TA(I)}${NA(D)}${T}`,U=p?.trim()??(s!==void 0&&g.trim().length>0?Uw():void 0);if(s!==void 0&&U!==void 0&&U.length>0&&g.trim().length>0){Bs({reportKey:U,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=V;u!==null&&u.then(Pe=>{if(Pe===null)return;let jt=Kw({estimateOutput:Pe.estimateOutput??"",reportKey:U,agentRunId:s,reportsDir:e.layout.reportsDir,task:Pe.task,writerLabel:Pe.writerLabel,embedding:Pe.embedding});if(jt.estimateSeconds===null)return;Cw(e.layout.reportsDir,s);let yt=`${As}
${jt.estimateSeconds}
`;if(Mt(s)){z(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:yt},requestId:n});return}dr(s,yt)}).catch(()=>{}),V=zw(H),V=Cf(V,{agentRunId:s,reportKey:U,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then(H=>{H!==null&&qw({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&S!==null&&S.then(H=>{H!==null&&Xw({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let $r=s!==void 0&&nv.get(s)===!0;if(s!==void 0&&g.trim().length>0){let H=await _u(g);rv.set(s,H),U!==void 0&&U.length>0&&tv.set(s,U)}cg(e,t,V,n,ov(o),s,{sessionTurn:R.sessionTurn},a,g,U,r,jh(e.layout,s,$r)),A&&s!==void 0&&z(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:hw(t)},requestId:n})},OJ=async(e,t,r,n,o)=>{let s=(i,a)=>{z(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await yw({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,z(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:n})}}),c=se(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?ys(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},NJ=(e,t,r)=>new Promise(n=>{if(!se(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=wt(t,r,ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,sv.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),MJ=async(e,t,r,n)=>{if(t.installMethod!=="deterministic-bundle")return!1;z(n,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let o=Wt(t.bundle),s=Y(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(o!==null)return o;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=We(e.wsUrl)??Ut,f=await wy({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return f.ok?f.bundle:null})();if(i===null)return z(n,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=pn({bundle:i,layout:e.layout});return z(n,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&zl(n,e.layout),!0},jJ=async(e,t,r,n)=>{if(await MJ(e,t,r,n))return;let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(z(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){z(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!se(o)){z(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}Qs(e.layout);let i=await(async()=>{try{await ur(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return NJ(e,o,s)})().finally(()=>{ei(e.layout)});z(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),zl(n,e.layout)},DJ=e=>{let t=1e3*2**e;return Math.min(TJ,t)},HJ=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(at(e.layout)){Xf(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,Nw().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1})}},n=(u,S="system.ack")=>{if(!t.selfUpdateInFlight){if(at(e.layout)){ti({layout:e.layout,remoteBundleVersion:u,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,Mw({layout:e.layout,remoteBundleVersion:u,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},o=()=>{let u=fe(e.layout);u!==null&&xe(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),y())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===bl.OPEN||u.readyState===bl.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(o,LF)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=DJ(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,y()},u)},f=u=>{s();let S=()=>{let A=Js(e.layout.installDir),g=ct();z(u,{type:"agent.heartbeat",payload:{hostname:bs.default.hostname(),macOsUsername:bs.default.userInfo().username,wakeError:t.wakeError,wakePort:g,...e.email!==null?{email:e.email}:{},installBundleVersion:A}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,LF)},b=(u,S)=>{if(typeof u.type!="string")return;if(MS(u)){t.stopped=!0,s(),a(),c(),xS({layout:e.layout}).finally(()=>{_l(),process.exit(0)});return}Er(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),qu(e.layout,"in",u);let A=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&Y(u.payload)){let g=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",_=typeof u.payload.origin=="string"?u.payload.origin:"",w=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",W=typeof u.payload.challenge=="string"?u.payload.challenge:"",E=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!g_({serverPublicKey:g,origin:_,devicePublicKey:w,challenge:W,serverAttestation:E})){t.wakeError="Server attestation verification failed",Er(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&Y(u.payload)){let g=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Er(e.layout,{direction:"local",type:"writer.ensure",summary:g,action:"ensure-writer"}),Fw({layout:e.layout,writerAgent:g,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(_=>{z(S,{type:"writer.status",payload:_},e.layout)})}if(u.type==="install.bundle.update"&&Y(u.payload)){let g=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";g.length>0&&n(g,"install.bundle.update")}if(u.type==="system.ack"){ku(e.layout,{wsUrl:e.wsUrl});let g=Y(u.payload)?u.payload:null,_=jw(g);_!==null&&n(_)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&Y(u.payload)&&Dw(u.payload),u.type==="automations.run"&&Y(u.payload)&&Hw(u.payload),u.type==="terminal.stream.accepted"&&Y(u.payload)){let g=typeof u.payload.runId=="string"?u.payload.runId:"";if(g.length>0){let _=cw(g);for(let w of _)z(S,{type:"terminal.stream.chunk",payload:{runId:g,chunk:w},requestId:A})}}if(u.type==="agent.agentRun.list"&&z(S,{type:"dashboard.agentRun.list.result",payload:{runs:Ww(e.layout)},requestId:A}),u.type==="agent.agentRun.get"&&Y(u.payload)){let g=typeof u.payload.runId=="string"?u.payload.runId:"",_=g.length>0?Nl(e.layout,g):null;z(S,{type:"dashboard.agentRun.get.result",payload:{run:_},requestId:A})}if(u.type==="command.claude.run"&&Y(u.payload)){let g=u.payload.prompt,_=typeof u.payload.writerAgent=="string"&&se(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",w=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,W=u.payload.sessionContinuation===!0,E=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,R=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,T=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=mi(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,$l,T),D=Ch(u.payload.compositionSnapshot),oe=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof g=="string"&&g.trim().length>0){if(console.log(`[agent-witch] Running ${_} task (${W?"continue":"first"})\u2026`),I===null){z(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(D!==null){let V=xh(e.layout,D);if(V!==null){z(S,{type:"command.claude.result",payload:{exitCode:-1,output:V,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(w!==void 0){let U=Oh(e.layout,w,D);if(!U.ok){z(S,{type:"command.claude.result",payload:{exitCode:-1,output:U.errorMessage,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}nv.set(w,D.entries.some($r=>$r.scope==="run"))}}w!==void 0&&R!==void 0&&EF.set(w,R),w!==void 0&&(RF.set(w,I),T!==void 0&&T.trim().length>0&&Qw.set(w,T.trim()),kF.set(w,g.trim()),ze({projectFolderPath:I,...T!==void 0&&T.trim().length>0?{projectId:T.trim()}:{}})),IJ(e,_,g.trim(),A,S,w,W,R,E,I,oe,T)}}if(u.type==="shell.session.open"&&Y(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.cols=="number"?u.payload.cols:120,w=typeof u.payload.rows=="number"?u.payload.rows:32;g.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),mw({shellSessionId:g,cwd:e.workspace,cols:_,rows:w,send:W=>{z(S,W)},requestId:A}))}if(u.type==="shell.session.close"&&Y(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";g.length>0&&hs(g,_=>{z(S,_)},A)}if(u.type==="shell.input"&&Y(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.data=="string"?u.payload.data:"";g.length>0&&_.length>0&&dw(g,_)}if(u.type==="shell.resize"&&Y(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.cols=="number"?u.payload.cols:0,w=typeof u.payload.rows=="number"?u.payload.rows:0;g.length>0&&_>0&&w>0&&uw(g,_,w)}if(u.type==="command.writer.session.end"&&Y(u.payload)){let g=u.payload.writerAgent;typeof g=="string"&&se(g)&&(fw(g),fm(e.layout,g))}if(u.type==="command.writer.session.start"&&Y(u.payload)){let g=u.payload.writerAgent,_=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof g=="string"&&se(g)&&_.length>0&&(console.log(`[agent-witch] Starting ${g} session\u2026`),OJ(e,g,_,A,S))}if(u.type==="command.claude.stop"&&Y(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";g.length>0&&(console.log(`[agent-witch] Stopping run ${g}\u2026`),Ow(e,ov(S),g,A))}if(u.type==="command.claude.input_respond"&&Y(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",_=typeof u.payload.response=="string"?u.payload.response.trim():"",w=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",W=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",E=typeof u.payload.question=="string"?u.payload.question:"";g.length>0&&_.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),xw(e,{agentRunId:g,originalPrompt:w,partialOutput:W,question:E,response:_,shellSessionId:EF.get(g)},A,ov(S)))}if(u.type==="dispatch.approval.required"&&Y(u.payload)){let g=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",_=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${g}: ${_}`),process.platform==="darwin"&&(0,sv.spawn)("osascript",["-e",`display notification "${_.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${g.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&Y(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),jJ(e,u.payload,A,S)),u.type==="harness.export.request"&&Y(u.payload)){let g=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",_=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,w=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(W=>typeof W=="string"):[];g.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:W}=await Promise.resolve().then(()=>(WF(),vF)),E=W(w,e.email);z(S,{type:"harness.export.result",payload:{success:E.length>0,borrowerUserId:g,..._!==void 0?{targetDeviceId:_}:{},sets:E,errorMessage:E.length>0?void 0:"No readable harness sets were found on this machine."},requestId:A})})()}if(u.type==="harness.manifest.request"&&zl(S,e.layout),u.type==="command.claude.result"&&Y(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,_=typeof u.payload.output=="string"?u.payload.output:"",w=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,W=mi(g!==void 0?RF.get(g):void 0,$l),E=g!==void 0?Qw.get(g):void 0,R=g!==void 0?kF.get(g)??"":"",T=Xy({exitCode:w,output:_});if(T&&W!==null&&CA({layout:e.layout,text:_,source:g??"command.claude.result",projectFolderPath:W,...E!==void 0?{projectId:E}:{}}),w!=null&&w!==0&&_.trim().length>0&&W!==null&&(WA({layout:e.layout,errorText:_,projectFolderPath:W,...E!==void 0?{projectId:E}:{}}),IA({layout:e.layout,text:_,source:g??"command.claude.result.failure",projectFolderPath:W,...E!==void 0?{projectId:E}:{}})),T&&R.trim().length>0&&W!==null&&OP({layout:e.layout,projectFolderPath:W,...E!==void 0?{projectId:E}:{},entry:{id:`${Date.now()}-${g??"run"}`,...g!==void 0?{agentRunId:g}:{},prompt:R,output:_,createdAt:new Date().toISOString()}}),g!==void 0&&W!==null){let D=tv.get(g),oe=rv.get(g);D!==void 0&&oe!==void 0&&_u(W).then(V=>{let U=Zy({before:oe,after:V});Tf(D,U),rv.delete(g),tv.delete(g)})}if(T&&E!==void 0&&E.trim().length>0){let D=$(),oe=D===null?null:X({wsUrl:D.wsUrl,pairingToken:D.pairingToken});oe!==null&&eS(oe,E,{...g!==void 0?{sourceRunId:g}:{},lesson:Qy({prompt:R,output:_})})}g!==void 0&&(fi(e.layout,g),nv.delete(g),Qw.delete(g))}},y=()=>{if(t.stopped)return;a(),c();let u=new bl(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),kw(X({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Tw(e.layout);let S=We(e.wsUrl)??"http://localhost:3000",A=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),g=m_({layout:e.layout,origin:S,...A!==void 0&&A.length>0?{claimToken:A}:{}});z(u,{type:"agent.register",payload:{role:"agent",hostname:bs.default.hostname(),macOsUsername:bs.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...g}},e.layout),zl(u,e.layout),Iw(e,u),f(u)}),u.on("message",S=>{let A=typeof S=="string"?S:S.toString("utf8");try{let g=JSON.parse(A);if(!Y(g))return;b(g,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(S,A)=>{s(),t.socket=void 0,t.wsConnected=!1,dS(e.layout),t.reconnectAttempt+=1;let g=typeof A=="string"?A:A.toString("utf8");wn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:g}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",S=>{t.wakeError=S.message,wn(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},h=()=>{t.stopped=!0,s(),i(),a(),c()};return Yf(()=>{let u=Zf();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&n(u.remoteBundleVersion,u.trigger);let S=Qf();S!==null&&r(S)}),{connect:y,startLocalHealthCheck:d,stop:h,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Ji(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:pl(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,y()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(zl(u,e.layout),{ok:!0})}}},$J=async()=>{$e("agent-witch");let e=q_(),t=L();X_().ok||(process.platform==="darwin"?(await Yr(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),tw(t);let n=ew({installDir:t});n.length>0&&console.log(`[agent-witch] Stopped ${n.length} sibling process(es): ${n.join(", ")}`),process.platform==="darwin"&&(Ft({launchAgentLabel:te(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Ms());let o=await Vh(),s=o[0];s!==void 0&&$w(s.layout);for(let y of o){let h=We(y.wsUrl)??Ut;Ys(y.layout.installDir,h)}let i=o.map(y=>HJ(y)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),_l(),process.exit(0));let c=()=>{o.forEach((y,h)=>{let u=i[h];if(u===void 0)return;let S=fe(y.layout);uS(S,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let y=o[0]?.layout;y!==void 0&&(at(y)||Yi(y.installDir))},f=await rw({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):ul({layout:o[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let y of i)y.startLocalHealthCheck(),y.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let b=zt(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),js(),d()});d=()=>{b(),f.stop(),_l(),console.log("[agent-witch] Shutting down.");for(let y of i)y.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Ul=$J});var iv=l(()=>{"use strict";CF()});var TF={};St(TF,{startAgentWitchClient:()=>Ul});var FJ,xF=l(()=>{"use strict";iv();iv();ro();xf();pd();FJ={};if(Qr(FJ.url)&&!it()){let e=process.argv.indexOf("report");e>=0&&process.exit(ud(process.argv.slice(e))),Ul()}});Rf();xf();pd();var DL="20.x",HL="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var xG=e=>[`Node.js ${DL} or newer is required (found ${e}).`,HL].join(" "),$L=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${xG(process.version)}
`),process.exit(1))};var GJ={},zJ=async()=>{$e("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(sh(),oh)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},UJ=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(FC(),$C)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},BJ=async()=>{if(!Qr(GJ.url))return;$L();let e=process.argv.indexOf("report");e>=0&&process.exit(ud(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await zJ();return}if(t==="wake"){await UJ();return}if(t==="bridge"){let{runAgentWitchBridgeCli:n}=await Promise.resolve().then(()=>(zT(),FT));await n();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:n}=await Promise.resolve().then(()=>(iD(),sD));n();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(xF(),TF));await r()};BJ();
