#!/usr/bin/env node
"use strict";var KF=Object.create;var fg=Object.defineProperty;var JF=Object.getOwnPropertyDescriptor;var YF=Object.getOwnPropertyNames;var XF=Object.getPrototypeOf,ZF=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var W=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},St=(e,t)=>{for(var r in t)fg(e,r,{get:t[r],enumerable:!0})},QF=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of YF(t))!ZF.call(e,o)&&o!==r&&fg(e,o,{get:()=>t[o],enumerable:!(n=JF(t,o))||n.enumerable});return e};var m=(e,t,r)=>(r=e!=null?KF(XF(e)):{},QF(t||!e||!e.__esModule?fg(r,"default",{value:e,enumerable:!0}):r,e));var Kn=W(hg=>{"use strict";Object.defineProperty(hg,"__esModule",{value:!0});hg.stringify=ez;function ez(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=W(yg=>{"use strict";Object.defineProperty(yg,"__esModule",{value:!0});yg.generateTypeGuardError=tz;var uv=Kn();function tz(e,t,r){return(0,uv.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,uv.stringify)(e)}) to be "${r}"`}});var dr=W(Vl=>{"use strict";Object.defineProperty(Vl,"__esModule",{value:!0});Vl.isNonNullObject=void 0;var rz=O(),nz=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,rz.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Vl.isNonNullObject=nz});var At=W(pe=>{"use strict";Object.defineProperty(pe,"__esModule",{value:!0});pe.attachTypeGuardMeta=pe.isArrayTypeGuard=pe.isNestedObjectTypeGuard=pe.getTypeGuardWrapperKind=pe.getTypeGuardInnerGuard=pe.getTypeGuardItemGuard=pe.getTypeGuardSchema=void 0;var oz=e=>e.schema;pe.getTypeGuardSchema=oz;var sz=e=>e.itemGuard;pe.getTypeGuardItemGuard=sz;var iz=e=>e.innerGuard;pe.getTypeGuardInnerGuard=iz;var az=e=>e.wrapperKind;pe.getTypeGuardWrapperKind=az;var lz=e=>{if((0,pe.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};pe.isNestedObjectTypeGuard=lz;var cz=e=>{if((0,pe.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};pe.isArrayTypeGuard=cz;var dz=(e,t)=>Object.assign(e,t);pe.attachTypeGuardMeta=dz});var bs=W($r=>{"use strict";Object.defineProperty($r,"__esModule",{value:!0});$r.getExpectedTypeName=$r.getTypeGuardDisplayName=void 0;var pv=At(),uz=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};$r.getTypeGuardDisplayName=uz;var pz=e=>{let t=(0,pv.getTypeGuardWrapperKind)(e),r=(0,pv.getTypeGuardInnerGuard)(e);if(t&&r){let o=(0,$r.getExpectedTypeName)(r);if(t==="undefinedOr")return`${o} | undefined`;if(t==="nullOr")return`${o} | null`;if(t==="nilOr")return`${o} | null | undefined`}let n=e.name;if(n.startsWith("is")){let o=n.slice(2);return o.endsWith("Guard")&&(o=o.slice(0,-5)),o==="Type"||o==="Schema"?"object":o==="Array"?"Array":o.toLowerCase()}return"unknown"};$r.getExpectedTypeName=pz});var Fr=W(ql=>{"use strict";Object.defineProperty(ql,"__esModule",{value:!0});ql.createValidationResult=void 0;var mz=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});ql.createValidationResult=mz});var Jn=W(Kl=>{"use strict";Object.defineProperty(Kl,"__esModule",{value:!0});Kl.createValidationError=void 0;var gz=(e,t,r,n)=>({path:e,expectedType:t,actualValue:r,message:n});Kl.createValidationError=gz});var Yn=W(Jl=>{"use strict";Object.defineProperty(Jl,"__esModule",{value:!0});Jl.createTreeNode=void 0;var fz=(e,t,r,n)=>({valid:t,path:e,...r&&{expectedType:r},...n!==void 0&&{actualValue:n},children:{},errors:[]});Jl.createTreeNode=fz});var Ps=W(Yl=>{"use strict";Object.defineProperty(Yl,"__esModule",{value:!0});Yl.combineResults=void 0;var hz=Fr(),yz=(e,t)=>{let r=e.every(s=>s.valid),n=e.flatMap(s=>s.errors),o={valid:r,path:t||"root",children:{},errors:n};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";o.children[i]=s.tree}}),(0,hz.createValidationResult)(r,n,o)};Yl.combineResults=yz});var Zl=W(Xl=>{"use strict";Object.defineProperty(Xl,"__esModule",{value:!0});Xl.createSimplifiedTree=void 0;var mv=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,n])=>{t[r]=mv(n)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},Sz=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let n={};Object.entries(e.children).forEach(([o,s])=>{n[o]=mv(s)}),r[t]={valid:e.valid,value:n}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Xl.createSimplifiedTree=Sz});var _s=W(ec=>{"use strict";Object.defineProperty(ec,"__esModule",{value:!0});ec.validateObject=void 0;var Az=dr(),ws=Fr(),bz=Jn(),Ql=Yn(),Pz=Ps(),gv=tc(),wz=(e,t,r)=>{let n=()=>{let i=(0,bz.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Ql.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,ws.createValidationResult)(!1,[],a):(0,ws.createValidationResult)(!1,[i],a)},o=()=>{let i=Object.keys(t);if(i.length===0)return(0,ws.createValidationResult)(!0,[],(0,Ql.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,b=t[g],h=e[g],y=(0,gv.validateProperty)(g,h,b,r);return y.valid?p.length===0?(0,ws.createValidationResult)(!0,[],(0,Ql.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,gv.validateProperty)(d,e[d],p,r)}),a=(0,Pz.combineResults)(i,r.path),c=(0,Ql.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,ws.createValidationResult)(a.valid,a.errors,c)};return(0,Az.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?o():s():n()};ec.validateObject=wz});var hv=W(oc=>{"use strict";Object.defineProperty(oc,"__esModule",{value:!0});oc.validateArray=void 0;var _z=Kn(),rc=Fr(),fv=Jn(),nc=Yn(),vz=Ps(),Wz=_s(),Lz=bs(),Ez=At(),Rz=(e,t,r)=>{let n=r.path;if(!Array.isArray(e)){let c=(0,fv.createValidationError)(n,"Array",e,`Expected ${n} (${JSON.stringify(e)}) to be "Array"`),d=(0,nc.createTreeNode)(n,!1,"Array",e);return d.errors=[c],(0,rc.createValidationResult)(!1,[c],d)}let o=(0,Ez.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${n}[${d}]`,g={path:p,config:r.config||null};if(o)return(0,Wz.validateObject)(c,o,g);let b=t(c,null),h=(0,Lz.getExpectedTypeName)(t),y=(0,_z.stringify)(c);if(b)return(0,rc.createValidationResult)(!0,[],(0,nc.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,S=(0,fv.createValidationError)(p,h,c,u),A=(0,nc.createTreeNode)(p,!1,h,c);return A.errors=[S],(0,rc.createValidationResult)(!1,[S],A)}),i=(0,vz.combineResults)(s,n),a=(0,nc.createTreeNode)(n,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,rc.createValidationResult)(i.valid,i.errors,a)};oc.validateArray=Rz});var tc=W(ic=>{"use strict";Object.defineProperty(ic,"__esModule",{value:!0});ic.validateProperty=void 0;var yv=Fr(),kz=Jn(),Sv=Yn(),Cz=bs(),sc=At(),Tz=_s(),xz=hv(),Iz=(e,t,r,n)=>{let o=`${n.path}.${e}`,s={path:o,config:n.config||null,...n.parentTree&&{parentTree:n.parentTree}},i=n.config?.errorMode||"multi",a=(0,sc.getTypeGuardSchema)(r),c=(0,sc.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,Tz.validateObject)(t,a,s);if(c&&(0,sc.isArrayTypeGuard)(r))return(0,xz.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),b=(0,Cz.getExpectedTypeName)(r);return g?(0,yv.createValidationResult)(!0,[],(0,Sv.createTreeNode)(o,!0,b,t)):(()=>{let h=(0,kz.createValidationError)(o,b,t,`Expected ${o} (${JSON.stringify(t)}) to be "${b}"`),y=(0,Sv.createTreeNode)(o,!1,b,t);return y.errors=[h],(0,yv.createValidationResult)(!1,[h],y)})()};if((0,sc.isNestedObjectTypeGuard)(r)){let p=n.config?{...n.config,identifier:o}:null;return d(p)}return d(null)};ic.validateProperty=Iz});var lc=W(ac=>{"use strict";Object.defineProperty(ac,"__esModule",{value:!0});ac.isNil=void 0;var Oz=O(),Mz=function(e,t){return e!=null?(t&&t.callbackOnError((0,Oz.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};ac.isNil=Mz});var Sg=W(cc=>{"use strict";Object.defineProperty(cc,"__esModule",{value:!0});cc.isDefined=void 0;var Nz=O(),jz=lc(),Dz=function(e,t){return(0,jz.isNil)(e,null)?(t&&t.callbackOnError((0,Nz.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};cc.isDefined=Dz});var Ag=W(dc=>{"use strict";Object.defineProperty(dc,"__esModule",{value:!0});dc.reportValidationResults=void 0;var Hz=Zl(),Av=Sg(),$z=lc(),Fz=(e,t)=>{if(e.valid===!0||(0,$z.isNil)(t))return;let r=t.errorMode||"multi",n=(i,a)=>{(0,Av.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,Hz.createSimplifiedTree)(a),null,2))},o=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,Av.isDefined)(e.tree)?n(t,e.tree):r==="multi"?o(t):s(t)};dc.reportValidationResults=Fz});var bg=W(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.Validation=Q.reportValidationResults=Q.validateObject=Q.validateProperty=Q.createSimplifiedTree=Q.combineResults=Q.createTreeNode=Q.createValidationError=Q.createValidationResult=Q.getExpectedTypeName=void 0;var zz=bs();Object.defineProperty(Q,"getExpectedTypeName",{enumerable:!0,get:function(){return zz.getExpectedTypeName}});var Uz=Fr();Object.defineProperty(Q,"createValidationResult",{enumerable:!0,get:function(){return Uz.createValidationResult}});var Bz=Jn();Object.defineProperty(Q,"createValidationError",{enumerable:!0,get:function(){return Bz.createValidationError}});var Gz=Yn();Object.defineProperty(Q,"createTreeNode",{enumerable:!0,get:function(){return Gz.createTreeNode}});var Vz=Ps();Object.defineProperty(Q,"combineResults",{enumerable:!0,get:function(){return Vz.combineResults}});var qz=Zl();Object.defineProperty(Q,"createSimplifiedTree",{enumerable:!0,get:function(){return qz.createSimplifiedTree}});var Kz=tc();Object.defineProperty(Q,"validateProperty",{enumerable:!0,get:function(){return Kz.validateProperty}});var Jz=_s();Object.defineProperty(Q,"validateObject",{enumerable:!0,get:function(){return Jz.validateObject}});var Yz=Ag();Object.defineProperty(Q,"reportValidationResults",{enumerable:!0,get:function(){return Yz.reportValidationResults}});var Xz=Fr(),Zz=Ps(),Qz=Jn(),e1=Yn(),t1=tc(),r1=_s(),n1=Ag(),o1=Zl();Q.Validation={result:Xz.createValidationResult,combine:Zz.combineResults,error:Qz.createValidationError,treeNode:e1.createTreeNode,property:t1.validateProperty,object:r1.validateObject,report:n1.reportValidationResults,createSimplifiedTree:o1.createSimplifiedTree}});var uc=W(Pg=>{"use strict";Object.defineProperty(Pg,"__esModule",{value:!0});Pg.isType=i1;var bv=dr(),Pv=bg(),s1=At();function i1(e){if(!(0,bv.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,n){let o=n?.errorMode||"multi";if(o==="multi"||o==="json"){let s={path:n?.identifier||"root",config:n||null},i=(0,Pv.validateObject)(r,e,s);return(0,Pv.reportValidationResults)(i,n||null),i.valid}return(0,bv.isNonNullObject)(r,n)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],n?{...n,identifier:`${n.identifier}.${s}`}:null)}):!1}return(0,s1.attachTypeGuardMeta)(t,{schema:e})}});var Wv=W(zr=>{"use strict";Object.defineProperty(zr,"__esModule",{value:!0});zr.isNestedType=zr.isShape=void 0;zr.isSchema=vs;var wv=dr(),_v=bg(),vv=At();function vs(e){if(!(0,wv.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=l1(e);function r(n,o){let s=o?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:o?.identifier||"root",config:o||null},a=(0,_v.validateObject)(n,t,i);return(0,_v.reportValidationResults)(a,o||null),a.valid}return(0,wv.isNonNullObject)(n,o)?Object.keys(t).every(function(i){let a=t[i];return a?a(n[i],o?{...o,identifier:`${o.identifier}.${i}`}:null):!1}):!1}return(0,vv.attachTypeGuardMeta)(r,{schema:t})}function a1(e){return typeof e=="function"?e:Array.isArray(e)?c1(e):typeof e=="object"&&e!==null?vs(e):e}function l1(e){let t={};for(let[r,n]of Object.entries(e))t[r]=a1(n);return t}function c1(e){let t=e[0],r=vs(t);function n(o,s){return Array.isArray(o)?o.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,vv.attachTypeGuardMeta)(n,{itemGuard:r})}zr.isShape=vs;zr.isNestedType=vs});var Lv=W(wg=>{"use strict";Object.defineProperty(wg,"__esModule",{value:!0});wg.isObjectWith=u1;var d1=uc();function u1(e){return(0,d1.isType)(e)}});var Ev=W(_g=>{"use strict";Object.defineProperty(_g,"__esModule",{value:!0});_g.isObject=m1;var p1=uc();function m1(e){return(0,p1.isType)(e)}});var Rv=W(vg=>{"use strict";Object.defineProperty(vg,"__esModule",{value:!0});vg.guardWithTolerance=g1;function g1(e,t,r){return t(e,r),e}});var kv=W(Wg=>{"use strict";Object.defineProperty(Wg,"__esModule",{value:!0});Wg.isBranded=h1;var f1=O();function h1(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,f1.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var Cv=W(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.BrandSymbols=void 0;pc.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var Tv=W(mc=>{"use strict";Object.defineProperty(mc,"__esModule",{value:!0});mc.isAny=void 0;var y1=function(e){return!0};mc.isAny=y1});var Ws=W(Lg=>{"use strict";Object.defineProperty(Lg,"__esModule",{value:!0});Lg.reportTypeGuardError=A1;var S1=O();function A1(e,t,r){e&&e.callbackOnError((0,S1.generateTypeGuardError)(t,e.identifier,r))}});var xv=W(gc=>{"use strict";Object.defineProperty(gc,"__esModule",{value:!0});gc.isBoolean=void 0;var b1=Ws(),P1=function(t,r){return typeof t!="boolean"?((0,b1.reportTypeGuardError)(r,t,"boolean"),!1):!0};gc.isBoolean=P1});var Iv=W(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.isDate=void 0;var w1=O(),_1=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,w1.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};fc.isDate=_1});var Eg=W(hc=>{"use strict";Object.defineProperty(hc,"__esModule",{value:!0});hc.isNumber=void 0;var v1=Ws(),W1=function(t,r){return typeof t!="number"||isNaN(t)?((0,v1.reportTypeGuardError)(r,t,"number"),!1):!0};hc.isNumber=W1});var Ov=W(yc=>{"use strict";Object.defineProperty(yc,"__esModule",{value:!0});yc.isString=void 0;var L1=Ws(),E1=function(t,r){return typeof t!="string"?((0,L1.reportTypeGuardError)(r,t,"string"),!1):!0};yc.isString=E1});var Mv=W(Sc=>{"use strict";Object.defineProperty(Sc,"__esModule",{value:!0});Sc.isUnknown=void 0;var R1=function(e){return!0};Sc.isUnknown=R1});var Nv=W(Ac=>{"use strict";Object.defineProperty(Ac,"__esModule",{value:!0});Ac.isFunction=void 0;var k1=O(),C1=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,k1.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Ac.isFunction=C1});var Dv=W(bc=>{"use strict";Object.defineProperty(bc,"__esModule",{value:!0});bc.isFile=void 0;var jv=O(),T1=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,jv.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,jv.generateTypeGuardError)(e,t.identifier,"File")),!1)};bc.isFile=T1});var $v=W(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.isFileList=void 0;var Hv=O(),x1=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,Hv.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,Hv.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Pc.isFileList=x1});var zv=W(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.isBlob=void 0;var Fv=O(),I1=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,Fv.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,Fv.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};wc.isBlob=I1});var Bv=W(_c=>{"use strict";Object.defineProperty(_c,"__esModule",{value:!0});_c.isFormData=void 0;var Uv=O(),O1=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,Uv.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,Uv.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};_c.isFormData=O1});var Vv=W(vc=>{"use strict";Object.defineProperty(vc,"__esModule",{value:!0});vc.isURL=void 0;var Gv=O(),M1=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,Gv.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,Gv.generateTypeGuardError)(e,t.identifier,"URL")),!1)};vc.isURL=M1});var Kv=W(Wc=>{"use strict";Object.defineProperty(Wc,"__esModule",{value:!0});Wc.isURLSearchParams=void 0;var qv=O(),N1=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,qv.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,qv.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Wc.isURLSearchParams=N1});var Jv=W(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.isMap=void 0;var j1=O(),D1=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,j1.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Lc.isMap=D1});var Yv=W(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.isSet=void 0;var H1=O(),$1=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,H1.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Ec.isSet=$1});var Xv=W(Rg=>{"use strict";Object.defineProperty(Rg,"__esModule",{value:!0});Rg.isIndexSignature=z1;var F1=O();function z1(e,t){return function(r,n){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return n&&n.callbackOnError((0,F1.generateTypeGuardError)(r,n.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],b=e(d,n?{...n,identifier:`${n.identifier}[key:${p}]`}:null),h=t(g,n?{...n,identifier:`${n.identifier}[value:${p}]`}:null);return b&&h})}}});var Zv=W(Rc=>{"use strict";Object.defineProperty(Rc,"__esModule",{value:!0});Rc.isError=void 0;var U1=Ws(),B1=function(t,r){return t instanceof Error?!0:((0,U1.reportTypeGuardError)(r,t,"Error"),!1)};Rc.isError=B1});var Cg=W(kg=>{"use strict";Object.defineProperty(kg,"__esModule",{value:!0});kg.isArrayWithEachItem=q1;var G1=O(),V1=At();function q1(e){let t=function(r,n){return Array.isArray(r)?r.every((o,s)=>e(o,n?{...n,identifier:`${n.identifier}[${s}]`}:null)):(n&&n.callbackOnError((0,G1.generateTypeGuardError)(r,n.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,V1.attachTypeGuardMeta)(t,{itemGuard:e})}});var Tg=W(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.isNonEmptyArray=void 0;var K1=O(),J1=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,K1.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};kc.isNonEmptyArray=J1});var Qv=W(xg=>{"use strict";Object.defineProperty(xg,"__esModule",{value:!0});xg.isNonEmptyArrayWithEachItem=Z1;var Y1=Cg(),X1=Tg();function Z1(e){return function(t,r){return(0,Y1.isArrayWithEachItem)(e)(t,r)&&(0,X1.isNonEmptyArray)(t,r)}}});var tW=W(Ig=>{"use strict";Object.defineProperty(Ig,"__esModule",{value:!0});Ig.isTuple=Q1;var eW=O();function Q1(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,eW.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((n,o)=>n(t[o],r?{...r,identifier:`${r.identifier}[${o}]`}:null)):(r&&r.callbackOnError((0,eW.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var rW=W(Og=>{"use strict";Object.defineProperty(Og,"__esModule",{value:!0});Og.isObjectWithEachItem=tU;var eU=O();function tU(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,eU.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var nW=W(Mg=>{"use strict";Object.defineProperty(Mg,"__esModule",{value:!0});Mg.isPartialOf=nU;var rU=dr();function nU(e){return function(t,r){if(!(0,rU.isNonNullObject)(t,r))return!1;for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&Object.prototype.hasOwnProperty.call(t,n)){let o=e[n],s=t[n];if(o&&!o(s,r?{...r,identifier:`${r.identifier}.${n}`}:null))return!1}return!0}}});var oW=W(Ng=>{"use strict";Object.defineProperty(Ng,"__esModule",{value:!0});Ng.isPick=sU;var oU=dr();function sU(e,...t){return function(r,n){if(!(0,oU.isNonNullObject)(r,n))return!1;for(let o of t)if(!Object.prototype.hasOwnProperty.call(r,o))return n&&e(r,n),!1;return!0}}});var sW=W(jg=>{"use strict";Object.defineProperty(jg,"__esModule",{value:!0});jg.isOmit=aU;var iU=dr();function aU(e,...t){return function(r,n){if(!(0,iU.isNonNullObject)(r,n))return!1;let o=[],s=n?.identifier||"root",i=n?{...n,callbackOnError:d=>o.push(d)}:{identifier:s,callbackOnError:d=>o.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=o.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),b=g>=0?p.slice(0,g):p;if(a.has(b))return!1;let h=b.startsWith(s+".")&&b.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(n&&c.length>0)for(let d of c)n.callbackOnError(d);return c.length===0}}});var iW=W(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.isNonEmptyString=void 0;var lU=O(),cU=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,lU.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Cc.isNonEmptyString=cU});var aW=W(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.isNonNegativeNumber=void 0;var dU=O(),uU=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,dU.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Tc.isNonNegativeNumber=uU});var lW=W(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.isPositiveNumber=void 0;var pU=O(),mU=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,pU.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};xc.isPositiveNumber=mU});var cW=W(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.isNonPositiveNumber=void 0;var gU=O(),fU=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,gU.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Ic.isNonPositiveNumber=fU});var dW=W(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.isNegativeNumber=void 0;var hU=O(),yU=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,hU.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Oc.isNegativeNumber=yU});var uW=W(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.isInteger=void 0;var SU=O(),AU=Eg(),bU=function(e,t){return!(0,AU.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,SU.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Mc.isInteger=bU});var pW=W(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.isPositiveInteger=void 0;var PU=O(),wU=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,PU.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Nc.isPositiveInteger=wU});var mW=W(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.isNegativeInteger=void 0;var _U=O(),vU=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,_U.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};jc.isNegativeInteger=vU});var gW=W(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.isNonNegativeInteger=void 0;var WU=O(),LU=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,WU.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Dc.isNonNegativeInteger=LU});var fW=W(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.isNonPositiveInteger=void 0;var EU=O(),RU=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,EU.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Hc.isNonPositiveInteger=RU});var hW=W(Fc=>{"use strict";Object.defineProperty(Fc,"__esModule",{value:!0});Fc.isNumeric=void 0;var $c=O(),kU=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,$c.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,$c.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,$c.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,$c.generateTypeGuardError)(e,t.identifier,"number key")),!1};Fc.isNumeric=kU});var yW=W(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.isBooleanLike=void 0;var Dg=O(),CU=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Dg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Dg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};zc.isBooleanLike=CU});var SW=W(Uc=>{"use strict";Object.defineProperty(Uc,"__esModule",{value:!0});Uc.isDateLike=void 0;var Ls=O(),TU=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Ls.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Ls.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Ls.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Ls.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Ls.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Uc.isDateLike=TU});var AW=W(Bc=>{"use strict";Object.defineProperty(Bc,"__esModule",{value:!0});Bc.isBigInt=void 0;var xU=O(),IU=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,xU.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Bc.isBigInt=IU});var $g=W(Hg=>{"use strict";Object.defineProperty(Hg,"__esModule",{value:!0});Hg.isOneOf=OU;var bW=Kn();function OU(...e){return function(t,r){let n=e.some(function(o){return t===o});return!n&&r&&r.callbackOnError(`${r.identifier} (${(0,bW.stringify)(t)}) must be one of following values ${e.map(bW.stringify).join(" | ")}`),n}}});var PW=W(Fg=>{"use strict";Object.defineProperty(Fg,"__esModule",{value:!0});Fg.isOneOfTypes=jU;var MU=Kn(),NU=bs();function jU(...e){return function(t,r){let n=e.map(s=>({typeGuard:s,isValid:s(t,null)})),o=n.some(s=>s.isValid);if(!o&&r){let s=(0,MU.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,NU.getTypeGuardDisplayName)(c)).join(" | ")}"`];n.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return o}}});var wW=W(zg=>{"use strict";Object.defineProperty(zg,"__esModule",{value:!0});zg.isIntersectionOf=DU;function DU(...e){return function(t,r){for(let n of e)if(!n(t,r))return!1;return!0}}});var _W=W(Ug=>{"use strict";Object.defineProperty(Ug,"__esModule",{value:!0});Ug.isExtensionOf=HU;function HU(e,t){return function(r,n){return e(r,n)?t(r,n):!1}}});var vW=W(Bg=>{"use strict";Object.defineProperty(Bg,"__esModule",{value:!0});Bg.isNullOr=FU;var $U=At();function FU(e){function t(r,n){return r===null?!0:e(r,n)}return(0,$U.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var WW=W(Gg=>{"use strict";Object.defineProperty(Gg,"__esModule",{value:!0});Gg.isUndefinedOr=UU;var zU=At();function UU(e){function t(r,n){return r===void 0?!0:e(r,n)}return(0,zU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var LW=W(Vg=>{"use strict";Object.defineProperty(Vg,"__esModule",{value:!0});Vg.isNilOr=GU;var BU=At();function GU(e){function t(r,n){return r==null?!0:e(r,n)}return(0,BU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var EW=W(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.isAsserted=VU;function VU(e){return!0}});var RW=W(Kg=>{"use strict";Object.defineProperty(Kg,"__esModule",{value:!0});Kg.isEnum=KU;var qU=$g();function KU(e){return function(t,r){return(0,qU.isOneOf)(...Object.values(e))(t,r)}}});var kW=W(Jg=>{"use strict";Object.defineProperty(Jg,"__esModule",{value:!0});Jg.isEqualTo=XU;var JU=O(),YU=Kn();function XU(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,JU.generateTypeGuardError)(t,r.identifier,`equal to ${(0,YU.stringify)(e)}`)),!1):!0}}});var CW=W(Gc=>{"use strict";Object.defineProperty(Gc,"__esModule",{value:!0});Gc.isRegex=void 0;var ZU=O(),QU=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,ZU.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Gc.isRegex=QU});var xW=W(Yg=>{"use strict";Object.defineProperty(Yg,"__esModule",{value:!0});Yg.isPattern=eB;var TW=O();function eB(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,n){return typeof r!="string"?(n&&n.callbackOnError((0,TW.generateTypeGuardError)(r,n.identifier,"string")),!1):t.test(r)?!0:(n&&n.callbackOnError((0,TW.generateTypeGuardError)(r,n.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var IW=W(Xg=>{"use strict";Object.defineProperty(Xg,"__esModule",{value:!0});Xg.by=tB;function tB(e){return function(t){return e(t,null)}}});var OW=W(Zg=>{"use strict";Object.defineProperty(Zg,"__esModule",{value:!0});Zg.toNumber=rB;function rB(e){return typeof e=="number"?e:Number(e)}});var MW=W(Qg=>{"use strict";Object.defineProperty(Qg,"__esModule",{value:!0});Qg.toDate=nB;function nB(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var NW=W(ef=>{"use strict";Object.defineProperty(ef,"__esModule",{value:!0});ef.toBoolean=oB;function oB(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var jW=W(Vc=>{"use strict";Object.defineProperty(Vc,"__esModule",{value:!0});Vc.isSymbol=void 0;var sB=O(),iB=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,sB.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Vc.isSymbol=iB});var Es=W(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var aB=uc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return aB.isType}});var tf=Wv();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return tf.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return tf.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return tf.isNestedType}});var lB=Lv();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return lB.isObjectWith}});var cB=Ev();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return cB.isObject}});var dB=Rv();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return dB.guardWithTolerance}});var uB=kv();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return uB.isBranded}});var pB=Cv();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return pB.BrandSymbols}});var mB=Tv();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return mB.isAny}});var gB=xv();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return gB.isBoolean}});var fB=Iv();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return fB.isDate}});var hB=Sg();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return hB.isDefined}});var yB=lc();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return yB.isNil}});var SB=Eg();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return SB.isNumber}});var AB=Ov();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return AB.isString}});var bB=Mv();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return bB.isUnknown}});var PB=Nv();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return PB.isFunction}});var wB=Dv();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return wB.isFile}});var _B=$v();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return _B.isFileList}});var vB=zv();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return vB.isBlob}});var WB=Bv();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return WB.isFormData}});var LB=Vv();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return LB.isURL}});var EB=Kv();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return EB.isURLSearchParams}});var RB=Jv();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return RB.isMap}});var kB=Yv();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return kB.isSet}});var CB=Xv();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return CB.isIndexSignature}});var TB=Zv();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return TB.isError}});var xB=Cg();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return xB.isArrayWithEachItem}});var IB=Tg();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return IB.isNonEmptyArray}});var OB=Qv();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return OB.isNonEmptyArrayWithEachItem}});var MB=tW();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return MB.isTuple}});var NB=dr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return NB.isNonNullObject}});var jB=rW();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return jB.isObjectWithEachItem}});var DB=nW();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return DB.isPartialOf}});var HB=oW();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return HB.isPick}});var $B=sW();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return $B.isOmit}});var FB=iW();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return FB.isNonEmptyString}});var zB=aW();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return zB.isNonNegativeNumber}});var UB=lW();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return UB.isPositiveNumber}});var BB=cW();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return BB.isNonPositiveNumber}});var GB=dW();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return GB.isNegativeNumber}});var VB=uW();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return VB.isInteger}});var qB=pW();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return qB.isPositiveInteger}});var KB=mW();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return KB.isNegativeInteger}});var JB=gW();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return JB.isNonNegativeInteger}});var YB=fW();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return YB.isNonPositiveInteger}});var XB=hW();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return XB.isNumeric}});var ZB=yW();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return ZB.isBooleanLike}});var QB=SW();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return QB.isDateLike}});var eG=AW();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return eG.isBigInt}});var tG=$g();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return tG.isOneOf}});var rG=PW();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return rG.isOneOfTypes}});var nG=wW();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return nG.isIntersectionOf}});var oG=_W();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return oG.isExtensionOf}});var sG=vW();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return sG.isNullOr}});var iG=WW();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return iG.isUndefinedOr}});var aG=LW();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return aG.isNilOr}});var lG=EW();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return lG.isAsserted}});var cG=RW();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return cG.isEnum}});var dG=kW();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return dG.isEqualTo}});var uG=CW();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return uG.isRegex}});var pG=xW();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return pG.isPattern}});var mG=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return mG.generateTypeGuardError}});var gG=IW();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return gG.by}});var fG=OW();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return fG.toNumber}});var hG=MW();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return hG.toDate}});var yG=NW();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return yG.toBoolean}});var SG=jW();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return SG.isSymbol}})});var Rs,DW,HW,Ur,rf,N7,$W,qc,Br,ks,nf,of,sf,af,Nt,lf,Kc,Jc,Yc,Cs,rt,Xn,Zn,Xc,ur,cf,FW,bt=l(()=>{"use strict";Rs={production:".agent-witch",localhost:".local-agent-witch"},DW={production:47892,localhost:47893},HW={production:"com.agent-witch",localhost:"com.local-agent-witch"},Ur={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},rf="app",N7=`${rf}/agent-witch.js`,$W=`${rf}/command`,qc={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Br=Rs.production,ks=Rs.localhost,nf=DW.production,of=DW.localhost,sf=HW.production,af=HW.localhost,Nt="profiles",lf=Ur.activeProfile,Kc="harness",Jc="sets",Yc="manifest.json",Cs=qc.projectsDir,rt=qc.logsDir,Xn="agent-witch.log",Zn="agent-witch.error.log",Xc=qc.reportsDir,ur=qc.deviceKeypairJson,cf=rf,FW="agent-witch.js"});var Zc,zW,bG,AG,UW,BW=l(()=>{"use strict";Zc=m(require("node:path")),zW=require("node:url"),bG={},AG=()=>!0,UW=()=>{if(AG()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Zc.default.dirname(Zc.default.resolve(e))}return Zc.default.dirname((0,zW.fileURLToPath)(bG.url))}});var df,GW,N,VW,PG,pr,E,Qc,jt,qW,ed,Qn,td,rd,re,nt,uf,ot,pf,M,mf=l(()=>{"use strict";df=m(require("node:fs")),GW=m(require("node:os")),N=m(require("node:path")),VW=m(Es());bt();BW();PG=UW(),pr=e=>e.trim().toLowerCase(),E=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return N.default.resolve(e);let t=N.default.resolve(PG),r=N.default.basename(t),n=N.default.basename(N.default.dirname(t));return r===cf&&(n===Br||n===ks)?N.default.dirname(t):r===Br||r===ks?t:N.default.join(GW.default.homedir(),Br)},Qc=(e=E())=>N.default.join(e,cf),jt=(e=E())=>N.default.join(Qc(e),FW),qW=(e,t,r)=>t!==null?N.default.join(e,Nt,t,r):N.default.join(e,r),ed=e=>qW(e.installDir,e.profileEmail,Cs),Qn=e=>qW(e.installDir,e.profileEmail,rt),td=e=>e.profileEmail!==null?N.default.join(e.installDir,Nt,e.profileEmail,ur):N.default.join(e.installDir,ur),rd=e=>N.default.basename(e)===ks,re=(e=E())=>rd(e)?af:sf,nt=(e=E())=>rd(e)?of:nf,uf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return pr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?pr(t):null},ot=(e=E())=>{let t=N.default.join(e,lf);if(!df.default.existsSync(t))return null;try{let r=JSON.parse(df.default.readFileSync(t,"utf8"));if((0,VW.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return pr(r.email)}catch{return null}return null},pf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?pr(r):null}let t=uf();return t!==null?t:ot()},M=e=>{let t=E(),r=Qc(t),n=jt(t),o=pf(e);if(o!==null){let b=N.default.join(t,Nt,o),h=N.default.join(b,Kc),y=N.default.join(b,Cs),u=N.default.join(b,rt),S=N.default.join(b,Xc),A=N.default.join(b,ur),f=N.default.join(b,rt,Xn),w=N.default.join(b,rt,Zn);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:y,logsDir:u,mainLogPath:f,errorLogPath:w,reportsDir:S,deviceKeypairPath:A,configPath:N.default.join(b,"config.json"),harnessRootDir:h,harnessManifestPath:N.default.join(h,Yc),harnessSetsDir:N.default.join(h,Jc)}}let s=N.default.join(t,Kc),i=N.default.join(t,Cs),a=N.default.join(t,rt),c=N.default.join(t,Xc),d=N.default.join(t,ur),p=N.default.join(t,rt,Xn),g=N.default.join(t,rt,Zn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:g,reportsDir:c,deviceKeypairPath:d,configPath:N.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:N.default.join(s,Yc),harnessSetsDir:N.default.join(s,Jc)}}});var gf,KW,wG,_G,JW,ff,YW=l(()=>{"use strict";gf=m(require("node:fs")),KW=m(require("node:path"));bt();mf();wG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_G=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,JW=e=>{let t=KW.default.join(e,Ur.wakePort);if(!gf.default.existsSync(t))return null;try{let r=JSON.parse(gf.default.readFileSync(t,"utf8"));if(wG(r)&&_G(r.wakePort))return r.wakePort}catch{return null}return null},ff=(e=E())=>JW(e)??nt(e)});var B=l(()=>{"use strict";mf();YW()});var Ts,RG,kG,XW,CG,TG,ZW=l(()=>{"use strict";B();Ts=re(),RG=`${Ts}-wake`,kG=`${Ts}-live`,XW=`${Ts}-watchdog`,CG=`${Ts}-automation-scheduler`,TG=`${Ts}-updater`});var hf,yf,nd=l(()=>{"use strict";hf=new Set(["","loginwindow","_mbsetupuser","root"]),yf=5e3});var QW,xG,eL,Sf,Af=l(()=>{"use strict";QW=require("node:child_process");nd();xG=e=>e.trim().toLowerCase(),eL=e=>e==null?!1:!hf.has(xG(e)),Sf=()=>{if(process.platform!=="darwin")return null;try{let t=(0,QW.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return eL(t)?t:null}catch{return null}}});var rL,tL,st,xs=l(()=>{"use strict";rL=m(require("node:os"));Af();tL=e=>e.trim().toLowerCase(),st=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Sf():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??rL.default.userInfo().username;return tL(r)===tL(n)}});var nL,oL,Gr,sL=l(()=>{"use strict";nL=require("node:child_process"),oL=m(require("node:fs"));B();xs();Gr=(e=E())=>{let t=jt(e);if(!oL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!st())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=ot(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,nL.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var iL,Is,od=l(()=>{"use strict";iL=require("node:child_process"),Is=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,iL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var sd,bf,aL,ee,id,Os=l(()=>{"use strict";sd=m(require("node:fs")),bf=m(require("node:path"));B();bt();aL=e=>{let t=bf.default.join(e,Nt);return sd.default.existsSync(t)?sd.default.readdirSync(t).filter(r=>sd.default.statSync(bf.default.join(t,r)).isDirectory()).map(r=>pr(r)).toSorted():[]},ee=(e=E())=>{let t=re(e);return[{profileEmail:aL(e)[0]??null,launchAgentLabel:t}]},id=(e=E())=>aL(e)});var Pf,lL,cL,IG,Dt,ad=l(()=>{"use strict";Pf=m(require("node:fs")),lL=m(require("node:os")),cL=m(require("node:path"));B();Os();IG=()=>cL.default.join(lL.default.homedir(),"Library","LaunchAgents"),Dt=(e=E())=>{let t=re(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of ee(e))r.add(o.launchAgentLabel);let n=IG();if(Pf.default.existsSync(n))for(let o of Pf.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var dL,Ms,uL=l(()=>{"use strict";B();od();ad();Os();dL=(e=E())=>{let t=new Set(ee(e).map(r=>r.launchAgentLabel));return Dt(e).filter(r=>!t.has(r))},Ms=(e=E())=>{for(let t of dL(e))Is(t)}});var Ns,wf=l(()=>{"use strict";B();od();ad();Ns=(e=E())=>{for(let t of Dt(e))Is(t)}});var pL,mL,OG,Vr,gL=l(()=>{"use strict";pL=require("node:child_process"),mL=require("node:util"),OG=(0,mL.promisify)(pL.execFile),Vr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await OG("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var qr,MG,_f,vf=l(()=>{"use strict";qr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MG=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,_f=e=>{let t=e.pathValue??MG(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${qr(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${qr(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${qr(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${qr(e.homeDir)}</string>
    <key>PATH</key>
    <string>${qr(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${qr(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${qr(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var ld,Wf=l(()=>{"use strict";ld=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Kr,Lf,js,NG,jG,DG,fL,Ht,Ef=l(()=>{"use strict";Kr=m(require("node:fs")),Lf=m(require("node:os")),js=m(require("node:path"));bt();B();vf();Wf();NG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jG=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,DG=e=>{let t=js.default.join(e,Ur.wakePort);if(!Kr.default.existsSync(t))return nt(e);try{let r=JSON.parse(Kr.default.readFileSync(t,"utf8"));if(NG(r)&&jG(r.wakePort))return r.wakePort}catch{return nt(e)}return nt(e)},fL=(e,t=Lf.default.homedir())=>js.default.join(t,"Library","LaunchAgents",`${e}.plist`),Ht=e=>{let t=e.installDir??E(),r=e.homeDir??Lf.default.homedir(),n=fL(e.launchAgentLabel,r),o=Kr.default.existsSync(n)?Kr.default.readFileSync(n,"utf8"):null;if(o!==null&&ld(o))return{ok:!0,rewritten:!1,plistPath:n};let s=_f({launchAgentLabel:e.launchAgentLabel,runPath:js.default.join(t,$W,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??DG(t)});if(!ld(s))return{ok:!1,rewritten:!1,plistPath:n,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Kr.default.mkdirSync(js.default.dirname(n),{recursive:!0}),Kr.default.writeFileSync(n,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:n,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:n}}});var yL,SL,AL,Ds,HG,$G,hL,ve,Rf=l(()=>{"use strict";yL=require("node:child_process"),SL=m(require("node:fs")),AL=require("node:util");B();Ef();xs();Ds=(0,AL.promisify)(yL.execFile),HG=async e=>{try{return await Ds("launchctl",["print",e]),!0}catch{return!1}},$G=async(e,t,r)=>{await HG(t)&&await Ds("launchctl",["bootout",t]).catch(()=>{}),await Ds("launchctl",["bootstrap",e,r]),await Ds("launchctl",["enable",t])},hL=async e=>{try{return await Ds("launchctl",["kickstart","-k",e]),!0}catch{return!1}},ve=async(e,t=E())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!st())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let n=`gui/${r}`,o=`${n}/${e}`,s=Ht({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await hL(o))return{ok:!0};let i=s.plistPath;if(!SL.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await $G(n,o,i),await hL(o)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Jr,bL=l(()=>{"use strict";B();Rf();Os();Jr=async(e=E())=>{let t=[];for(let r of ee(e))(await ve(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Fe,$t,PL=l(()=>{"use strict";wf();xs();nd();Fe=e=>{st()||(Ns(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},$t=(e,t=yf)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{st()||e()},t);return()=>{clearInterval(r)}}});var te=l(()=>{"use strict";ZW();sL();od();uL();wf();ad();xs();gL();bL();Rf();Ef();Wf();vf();Os();Af();nd();PL()});var kf=l(()=>{"use strict";te()});var wL,_L,cd,vL,eo,WL,LL,Yr=l(()=>{"use strict";wL=".agent-witch",_L="memory",cd="project.json",vL="chunks.ndjson",eo="runs.ndjson",WL="reports",LL=".json"});var EL=l(()=>{"use strict";Yr()});var RL,dd,Cf=l(()=>{"use strict";RL=m(require("node:path"));EL();dd=(e,t)=>RL.default.join(e.trim(),`${t.trim()}${LL}`)});var Hs,kL,CL=l(()=>{"use strict";Hs="agent-witch.js",kL="command"});var ud=l(()=>{"use strict";CL()});var Xr,TL,xL=l(()=>{"use strict";ud();Xr=e=>`'${e.replace(/'/g,"'\\''")}'`,TL=e=>{let t=`${e.installDir.trim()}/${"app"}/${Hs}`,r=[Xr("node"),Xr(t),"report","write","--key",Xr(e.reportKey.trim()),"--agent-run-id",Xr(e.agentRunId.trim()),"--status",Xr(e.status),"--summary",Xr(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Xr(e.details.trim())),r.join(" ")}});var Pt,IL,FG,Tf,pd=l(()=>{"use strict";Cf();xL();Pt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},IL=e=>e===Pt.COMPLETED||e===Pt.FAILED,FG=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Tf=(e,t)=>{let r=dd(t.reportsDir,t.reportKey),n=TL({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Pt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${FG({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var We=l(()=>{"use strict";bt();B()});var Fs,ML,OL,NL,zG,to,UG,jL,zs,Us,xf,DL,HL,Bs=l(()=>{"use strict";Fs=m(require("node:fs")),ML=m(require("node:path"));pd();Cf();We();OL=50,NL=e=>{let t=M(),r=dd(t.reportsDir,e);return Fs.default.mkdirSync(ML.default.dirname(r),{recursive:!0}),r},zG=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},to=e=>{let t=NL(e);if(!Fs.default.existsSync(t))return null;try{let r=JSON.parse(Fs.default.readFileSync(t,"utf8"));return zG(r)?r:null}catch{return null}},UG=(e,t)=>{let r=[...e,t];return r.length>OL?r.slice(r.length-OL):r},jL=e=>{let t=NL(e.reportKey);Fs.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},zs=e=>{let t=to(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:UG(t?.history??[],n)};return jL(o),o},Us=e=>{let t=to(e.reportKey);return t!==null?t:zs({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Pt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},xf=(e,t)=>{let r=t.trim();if(r.length===0)return to(e);let n=to(e);if(n===null)return null;let o=n.details!==void 0&&n.details.trim().length>0?`${n.details.trim()}
${r}`:r,s={...n,updatedAt:new Date().toISOString(),details:o};return jL(s),s},DL=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},HL=e=>{if(e===null||!IL(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Pt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var BG,GG,Gs,$L,md,If=l(()=>{"use strict";pd();Bs();BG=new Set(Object.values(Pt)),GG=e=>BG.has(e),Gs=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},$L=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},md=e=>{if(e[0]!=="write")return $L(),1;let r=Gs(e,"--key"),n=Gs(e,"--agent-run-id"),o=Gs(e,"--status"),s=Gs(e,"--summary"),i=Gs(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!GG(o)?($L(),1):(zs({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var it,ro=l(()=>{"use strict";it=()=>!0});var Of,FL,Zr,gd=l(()=>{"use strict";Of=m(require("node:path")),FL=require("node:url");ro();Zr=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Of.default.resolve(t);return it()?r===Of.default.resolve(__filename):r===(0,FL.fileURLToPath)(e)}});var fd,no,KG,jY,oo=l(()=>{"use strict";fd="agent-witch.js",no="deps.tar.gz",KG="install.sh",jY={mainScript:`app/${fd}`,depsArchive:`app/${no}`,installShell:KG}});var GL=l(()=>{"use strict";oo()});var VL=l(()=>{"use strict";oo();GL()});var Vs,Nf,hd,JG,qs,Le,io,Ks,Js,Qr,jf=l(()=>{"use strict";Vs=m(require("node:fs")),Nf=m(require("node:path"));VL();B();hd="install-version.json",JG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qs=(e=E())=>Nf.default.join(e,hd),Le=(e=E())=>{let t=qs(e);if(!Vs.default.existsSync(t))return null;try{let r=JSON.parse(Vs.default.readFileSync(t,"utf8"));return!JG(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},io=(e,t=E())=>{let r=qs(t);Vs.default.mkdirSync(Nf.default.dirname(r),{recursive:!0}),Vs.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Ks=(e=E())=>Le(e)?.bundleVersion??"202",Js=(e,t)=>{let r=Le(e);if(r!==null)return r;let n={bundleVersion:"202",appOrigin:t,updatedAt:new Date().toISOString()};return io(n,e),n},Qr=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var qL,en,Df,Hf,$f,yd,wt,tn,Ff=l(()=>{"use strict";qL=require("node:crypto"),en=m(require("node:fs")),Df=m(require("node:path"));B();Hf="self-update-log.ndjson",$f=100,yd=(e=E())=>{let t=M(),r=t.installDir===e?t.logsDir:Qn({installDir:e,profileEmail:t.profileEmail});return Df.default.join(r,Hf)},wt=(e,t=E())=>{let r={id:(0,qL.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=yd(t);en.default.mkdirSync(Df.default.dirname(n),{recursive:!0});let o=en.default.existsSync(n)?en.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-$f+1)),JSON.stringify(r)];return en.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},tn=(e=20,t=E())=>{let r=yd(t);if(!en.default.existsSync(r))return[];let n=en.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var zf,eX,Uf=l(()=>{"use strict";oo();zf="deps",eX=`${"app"}/${no}`});var KL=l(()=>{"use strict";Uf()});var JL,mr,rn,YL,Bf,Gf,XL=l(()=>{"use strict";JL=require("node:child_process"),mr=m(require("node:fs")),rn=m(require("node:path"));oo();Uf();YL=e=>rn.default.join(e,"app",zf),Bf=e=>{let t=rn.default.join(e,"app"),r=rn.default.join(t,no);mr.default.existsSync(r)&&(mr.default.rmSync(YL(e),{recursive:!0,force:!0}),mr.default.mkdirSync(t,{recursive:!0}),(0,JL.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),mr.default.rmSync(r,{force:!0}))},Gf=e=>{mr.default.rmSync(rn.default.join(e,"node_modules"),{recursive:!0,force:!0}),mr.default.rmSync(rn.default.join(e,"package.json"),{force:!0}),mr.default.rmSync(rn.default.join(e,"package-lock.json"),{force:!0})}});var ZL=l(()=>{"use strict";KL();XL()});var Ft,Sd,QL=l(()=>{"use strict";Ft="https://www.agentwitch.com",Sd="wss://www.agentwitch.com/api/agent-witch/ws"});var Ys,zt,eE=l(()=>{"use strict";Ys="127.0.0.1",zt=`http://${Ys}:43347`});var Ut=l(()=>{"use strict";QL();eE()});var Xs,Ad,tE,qf,YG,rE,Yf,nE,at,Zs,Qs,Xf,Kf,Jf,ei,Zf,Qf,eh,ao=l(()=>{"use strict";Xs=m(require("node:fs")),Ad=m(require("node:path")),tE="active-writer-work.json",qf=new Set,YG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rE=e=>e.profileEmail===null?Ad.default.join(e.installDir,tE):Ad.default.join(e.installDir,"profiles",e.profileEmail,tE),Yf=e=>{let t=rE(e);if(!Xs.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Xs.default.readFileSync(t,"utf8"));return!YG(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},nE=(e,t)=>{let r=rE(e);Xs.default.mkdirSync(Ad.default.dirname(r),{recursive:!0}),Xs.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},at=e=>Yf(e).activeCount>0,Zs=e=>{let t=Yf(e);nE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Qs=e=>{let t=Yf(e),r=Math.max(0,t.activeCount-1);if(nE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let n of qf)n()},Xf=e=>(qf.add(e),()=>{qf.delete(e)}),Kf=null,Jf=null,ei=e=>{Kf=e},Zf=e=>{Jf=e},Qf=()=>{let e=Kf;return Kf=null,e},eh=()=>{let e=Jf;return Jf=null,e}});var Ee,th=l(()=>{"use strict";Ee=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var lo,bd,ti,rh=l(()=>{"use strict";lo="qwen2.5:7b",bd="nomic-embed-text",ti="Install Ollama from https://ollama.com/download"});var ri,oE,nh=l(()=>{"use strict";rh();ri=()=>`
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
    echo "Ollama is missing. ${ti}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${ti}" >&2
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
  agent_witch_ensure_ollama_model "${bd}" "\${pull_log}"
}
`,oE=()=>`
${ri()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var sE,XG,Pd,oh=l(()=>{"use strict";sE=require("node:child_process");B();nh();XG=e=>new Promise(t=>{let r=(0,sE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:E()}}),n=[];r.stdout.on("data",o=>{n.push(o)}),r.stderr.on("data",o=>{n.push(o)}),r.on("error",o=>{t({exitCode:1,output:o.message})}),r.on("close",o=>{t({exitCode:o??1,output:Buffer.concat(n).toString("utf8").trim()})})}),Pd=async(e=XG)=>{let t=`${ri()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var gr,wd,iE,ZG,aE,uo,QG,e2,t2,co,nn,on,lE=l(()=>{"use strict";gr=m(require("node:fs")),wd=m(require("node:path"));ZL();te();B();oo();Ut();jf();ao();th();Ff();oh();iE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ZG=e=>{let t=ot(e),r=t===null?M():M(t);if(!gr.default.existsSync(r.configPath))return null;try{let n=JSON.parse(gr.default.readFileSync(r.configPath,"utf8"));return!iE(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},aE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!iE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},uo=async e=>(await aE(e))?.bundleVersion??null,QG=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=wd.default.join(t,r);gr.default.mkdirSync(wd.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());gr.default.writeFileSync(o,s),r.endsWith(".js")&&gr.default.chmodSync(o,493)},e2=async()=>{Ms(),await Jr()},t2=(e,t)=>e!==null?Ee(e):t??Ft,co=(e,t)=>({localBundleVersion:t,...e}),nn=async e=>{let t=E(),r=Le(t),n=r?.bundleVersion??null,o=await Pd();wt({event:"check_complete",ok:o.ok,message:o.message,localBundleVersion:n,remoteBundleVersion:null});let s=ZG(t),i=t2(s,r?.appOrigin);if(i===null){let d=co({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return wt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}let a=await aE(i);if(a===null){let d=co({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return wt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}if(!(e?.force===!0||Qr(n,a.bundleVersion))){let d=co({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},n);return wt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),d}try{for(let b of a.scripts)await QG(i,t,b);let d=wd.default.join(t,fd);gr.default.existsSync(d)&&gr.default.rmSync(d,{force:!0}),Bf(t),Gf(t),io({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=M(ot(t));if(at(p)){let b=co({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return wt({event:"update_applied",ok:!0,message:b.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),b}await e2();let g=co({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return wt({event:"update_applied",ok:!0,message:g.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=co({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},n);return wt({event:"update_failed",ok:!1,message:p,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),g}},on=()=>{let e=E();return{local:Le(e),logs:tn(20,e)}}});var cE={};St(cE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>hd,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>ti,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>bd,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>lo,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Hf,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>$f,appendAgentWitchSelfUpdateLog:()=>wt,buildAgentWitchEnsureOllamaShell:()=>ri,buildAgentWitchInstallScriptOllama:()=>oE,buildAgentWitchSelfUpdateStatus:()=>on,ensureAgentWitchInstallVersionRecorded:()=>Js,ensureAgentWitchOllamaInstalled:()=>Pd,fetchAgentWitchRemoteInstallBundleVersion:()=>uo,isRemoteAgentWitchBundleVersionNewer:()=>Qr,readAgentWitchInstallVersion:()=>Le,readAgentWitchSelfUpdateLogs:()=>tn,resolveAgentWitchAppOriginFromWsUrl:()=>Ee,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Ks,resolveAgentWitchInstallVersionPath:()=>qs,resolveAgentWitchSelfUpdateLogPath:()=>yd,runAgentWitchSelfUpdate:()=>nn,writeAgentWitchInstallVersion:()=>io});var Ve=l(()=>{"use strict";jf();Ff();lE();th();rh();nh();oh()});var sh={};St(sh,{buildAgentWitchSelfUpdateStatus:()=>on,fetchAgentWitchRemoteInstallBundleVersion:()=>uo,runAgentWitchSelfUpdate:()=>nn});var ih=l(()=>{"use strict";Ve()});function po(e){return(0,dE.createHash)("sha256").update(e.trim()).digest("hex")}var dE,ah=l(()=>{"use strict";dE=require("node:crypto")});var mo,ni,r2,uE,lh,pE=l(()=>{"use strict";mo=m(require("node:fs")),ni=m(require("node:path"));ah();We();r2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uE=e=>{if(!mo.default.existsSync(e))return null;try{let t=JSON.parse(mo.default.readFileSync(e,"utf8"));return!r2(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:po(t.pairingToken.trim())}catch{return null}},lh=(e=E())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(uE(ni.default.join(e,"config.json")));let o=ni.default.join(e,Nt);if(!mo.default.existsSync(o))return t;for(let s of mo.default.readdirSync(o)){let i=ni.default.join(o,s);mo.default.statSync(i).isDirectory()&&n(uE(ni.default.join(i,"config.json")))}return t}});var ch,mE,_d,oi,si,n2,o2,s2,gE,se,ie,vd,_t,lt=l(()=>{"use strict";ch=m(require("node:fs")),mE=m(require("node:os")),_d=m(require("node:path")),oi={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},si=e=>e.trim().length>0,n2=e=>{let t=_d.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},o2=()=>{let e=mE.default.homedir(),t=_d.default.join(e,".local","bin","agent");if(ch.default.existsSync(t))return t;let r=_d.default.join(e,".local","bin","cursor-agent");return ch.default.existsSync(r)?r:oi.cursorCommand},s2=e=>{let t=e.trim();return!si(t)||t===oi.cursorCommand?o2():t},gE=(e,t)=>n2(e)?t:["agent",...t],se=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ie=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:si(t)?t.trim():oi.claudeCommand,codexCommand:si(r)?r.trim():oi.codexCommand,cursorCommand:s2(n),antigravityCommand:si(o)?o.trim():oi.antigravityCommand}},vd=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:gE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},_t=(e,t,r,n)=>{let o=t.trim();if(!si(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:gE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",o])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var fr,i2,go,a2,fo,Wd=l(()=>{"use strict";fr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,i2=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([n,o])=>{if(typeof o!="object"||o===null)return{name:n,total:0};let s=o;return{name:n,total:fr(s.inputTokens)+fr(s.outputTokens)+fr(s.cacheReadInputTokens)+fr(s.cacheCreationInputTokens)}})].sort((n,o)=>o.total-n.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},go=e=>{let t=e.trim(),r=t.indexOf("{"),n=t.lastIndexOf("}");if(r<0||n<=r)return null;let o;try{o=JSON.parse(t.slice(r,n+1))}catch{return null}if(typeof o!="object"||o===null)return null;let s=o;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=fr(a.input_tokens)+fr(a.cache_creation_input_tokens)+fr(a.cache_read_input_tokens),d=fr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:i2(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},a2=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),fo=(e,t)=>{let r=go(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??a2(r)}}});var dh,l2,c2,uh,ph=l(()=>{"use strict";dh=e=>e.toLocaleString("en-US"),l2=e=>e<.01?e.toFixed(4):e.toFixed(3),c2=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${l2(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${dh(e.inputTokens)} in / ${dh(e.outputTokens)} out (${dh(e.totalTokens)} total)`,t].join(`
`)},uh=(e,t)=>{if(t===void 0)return e;let r=c2(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var Ld,mh=l(()=>{"use strict";Ld={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var sn,gh,Ed,fh=l(()=>{"use strict";mh();sn="auto",gh=e=>({value:sn,label:`Auto (${Ld[e]})`}),Ed={anthropic:[gh("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[gh("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[gh("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var ho,ii,hh,ai=l(()=>{"use strict";mh();fh();ho=e=>{let t=e?.trim()??"";if(!(t.length===0||t===sn))return t},ii=(e,t)=>{let r=ho(t);return r===void 0?Ld[e]:r},hh=e=>{let t=ho(e);return t===void 0?sn:t}});var Rd,d2,u2,kd,fE=l(()=>{"use strict";Rd={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},d2=e=>{let t=Rd[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Rd["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Rd["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Rd["gemini-2.0-flash"]:null},u2=(e,t,r)=>{let n=d2(e);if(n===null)return null;let o=t/1e6*n.inputUsd,s=r/1e6*n.outputUsd;return o+s},kd=e=>{let t=u2(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var yo,p2,m2,g2,Cd,hE=l(()=>{"use strict";fE();yo=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),p2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=yo(r.input_tokens),o=yo(r.output_tokens);return n===0&&o===0?null:kd({provider:"anthropic",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},m2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=yo(r.prompt_tokens),o=yo(r.completion_tokens);return n===0&&o===0?null:kd({provider:"openai",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},g2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let n=yo(r.promptTokenCount),o=yo(r.candidatesTokenCount);return n===0&&o===0?null:kd({provider:"google",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},Cd=(e,t,r)=>e==="anthropic"?p2(t,r):e==="openai"?m2(t,r):g2(t,r)});var f2,yh,h2,y2,S2,A2,b2,Sh,Ah=l(()=>{"use strict";ai();hE();f2=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let n=r;return n.type==="text"&&typeof n.text=="string"?n.text:""}).join(""):""},yh=(e,t,r)=>{let n=r?.trim()??"";return n.length>0?n:ii(e,t.model)},h2=async e=>{let t=yh("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Anthropic API error (${String(r.status)})`};let o=f2(n);o.length>0&&e.onChunk?.(o);let s=Cd("anthropic",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},y2=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.message;return typeof n?.content=="string"?n.content:""},S2=async e=>{let t=yh("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`OpenAI API error (${String(r.status)})`};let o=y2(n);o.length>0&&e.onChunk?.(o);let s=Cd("openai",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},A2=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.content?.parts;return Array.isArray(n)?n.map(o=>{if(typeof o!="object"||o===null)return"";let s=o.text;return typeof s=="string"?s:""}).join(""):""},b2=async e=>{let t=yh("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,n=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),o=await n.json().catch(()=>null);if(!n.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Google API error (${String(n.status)})`};let s=A2(o);s.length>0&&e.onChunk?.(s);let i=Cd("google",o,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Sh=async e=>{try{return e.provider==="anthropic"?await h2(e):e.provider==="openai"?await S2(e):await b2(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var ze,li=l(()=>{"use strict";ze=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var yE,P2,Td,bh=l(()=>{"use strict";yE=m(require("node:path")),P2="writer-api-secrets.json",Td=e=>yE.default.join(e,P2)});var Ph,SE,w2,hr,je,yr=l(()=>{"use strict";Ph=m(require("node:fs"));ai();bh();SE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),w2=e=>{if(!SE(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,n=ho(r);return{apiKey:t,...n!==void 0?{model:n}:{}}},hr=e=>{let t=Td(e);if(!Ph.default.existsSync(t))return{};try{let r=JSON.parse(Ph.default.readFileSync(t,"utf8"));if(!SE(r))return{};let n={},o=["anthropic","openai","google"];for(let s of o){let i=w2(r[s]);i!==null&&(n[s]=i)}return n}catch{return{}}},je=(e,t)=>hr(e)[t]??null});var Re,ci=l(()=>{"use strict";Re=e=>e==="api"?"api":"cli"});var AE,he,an,Bt=l(()=>{"use strict";AE=m(require("node:path"));li();yr();ci();he=e=>AE.default.dirname(e),an=(e,t)=>{if(Re(e.writerExecutionBackend)!=="api")return!1;let r=ze(t);if(r===null)return!1;let n=he(e.layout.configPath),o=je(n,r);return o!==null&&o.apiKey.length>0}});var di,wh=l(()=>{"use strict";ph();Ah();li();yr();Bt();di=async(e,t,r,n)=>{let o=r.trim();if(o.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=ze(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=he(e.layout.configPath),a=je(i,s);if(a===null){let d=Object.keys(hr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Sh({provider:s,secret:a,prompt:o,onChunk:n});return{exitCode:c.exitCode,output:uh(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var bE,So,_h=l(()=>{"use strict";bE=require("node:child_process");lt();Wd();wh();Bt();So=(e,t,r)=>new Promise(n=>{if(!se(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(an(e,t)){di(e,t,r).then(n);return}let o=_t(t,r,ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,bE.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=fo(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(b=>b.length>0).join(`
`);n({exitCode:c??-1,output:g})}),s.on("error",c=>{n({exitCode:-1,output:c.message})})})});var PE=l(()=>{"use strict"});var wE=l(()=>{"use strict";ph();_h();Ah();PE();yr();Bt()});var _E,vE,WE,LE=l(()=>{"use strict";_E="claude",vE="codex",WE="cursor"});var EE,_2,vh,ui,xd=l(()=>{"use strict";EE=m(require("node:path"));Ut();bt();_2="ws://localhost:3000/api/agent-witch/ws",vh=e=>e.replace(/\/$/,""),ui=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return vh(t);let r=EE.default.basename(e.installDir);if(r===Rs.production)return Sd;let n=e.configWsUrl?.trim()??"";return r===Rs.localhost?n.length>0?vh(n):_2:n.length>0?vh(n):Sd}});var W2,Wh,Lh=l(()=>{"use strict";LE();xd();ci();W2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wh=e=>{if(!W2(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=ui({installDir:e.layout.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??_E,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??vE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??WE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:n,workspace:o,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Re(t.writerExecutionBackend),layout:e.layout}}}});var Eh,Rh,kh=l(()=>{"use strict";Eh=m(require("node:fs"));B();Lh();Rh=e=>{let t=M(e);if(!Eh.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Eh.default.readFileSync(t.configPath,"utf8")),n=Wh({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!n.ok){if(n.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return n.config}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}}});var pi,RE=l(()=>{"use strict";pi=(e,t,r)=>{let n=r?.trim()??"",o=e?.trim()??"";return n.length>0?o.length>0?o:null:o.length>0?o:t()}});var Ch,L2,Th,kE=l(()=>{"use strict";Ch=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),L2=e=>{if(!Ch(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",n=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||n.length===0||!Array.isArray(e.entries))return null;let o=e.entries.flatMap(s=>{if(!Ch(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!Ch(g))return[];let b=typeof g.itemKey=="string"?g.itemKey.trim():"",h=typeof g.relativePath=="string"?g.relativePath:"",y=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return b.length===0||y.length===0?[]:[{itemKey:b,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:n,entries:o}},Th=L2});var CE,E2,Id,xh=l(()=>{"use strict";CE=m(require("node:path")),E2=(e,t)=>{let r=t.trim();return CE.default.join(e,"components","store",r.slice(0,2),r)},Id=E2});var TE,R2,Ih,xE=l(()=>{"use strict";TE=m(require("node:fs"));xh();R2=(e,t)=>{let r=[];for(let n of t.entries)for(let o of n.items){let s=Id(e.installDir,o.contentSha256);TE.default.existsSync(s)||r.push(o.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},Ih=R2});var mi,Ao,k2,Oh,C2,Mh,Nh=l(()=>{"use strict";mi=m(require("node:fs")),Ao=m(require("node:path"));xh();k2=(e,t)=>Ao.default.join(e.installDir,"runs",t,"overlay"),Oh=(e,t)=>Ao.default.join(k2(e,t),".cursor"),C2=(e,t,r)=>{let n=r.entries.filter(s=>s.scope==="run");if(n.length===0)return{ok:!0};let o=Oh(e,t);mi.default.mkdirSync(o,{recursive:!0});for(let s of n)for(let i of s.items){let a=Id(e.installDir,i.contentSha256);if(!mi.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Ao.default.join(o,c):Ao.default.join(o,i.itemKey);mi.default.mkdirSync(Ao.default.dirname(d),{recursive:!0}),mi.default.copyFileSync(a,d)}return{ok:!0}},Mh=C2});var jh,IE,T2,gi,OE=l(()=>{"use strict";jh=m(require("node:fs")),IE=m(require("node:path")),T2=(e,t)=>{let r=IE.default.join(e.installDir,"runs",t);jh.default.existsSync(r)&&jh.default.rmSync(r,{recursive:!0,force:!0})},gi=T2});var x2,Dh,ME=l(()=>{"use strict";Nh();x2=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let n=Oh(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:n}},Dh=x2});var Hh,I2,O2,M2,N2,j2,F,NE=l(()=>{"use strict";Hh=m(require("node:fs"));xd();B();ci();I2="claude",O2="codex",M2="cursor",N2="agy",j2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F=()=>{let e=M();if(!Hh.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Hh.default.readFileSync(e.configPath,"utf8"));if(!j2(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=ui({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,writerExecutionBackend:Re(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:I2,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:O2,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:M2,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:N2,pairingToken:s,layout:e}}catch{return null}}});var Od,jE,DE=l(()=>{"use strict";Od=m(require("node:fs"));bh();jE=(e,t)=>{let r=Td(e);Od.default.mkdirSync(e,{recursive:!0}),Od.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Od.default.chmodSync(r,384)}catch{}}});var Md,HE,$h=l(()=>{"use strict";Md=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),n=t.slice(-4);return`${r}${"\u2022".repeat(12)}${n}`},HE=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Md(t)}});var fi,D2,Fh,zh,$E=l(()=>{"use strict";fi=m(require("node:fs"));yr();DE();$h();ai();Bt();D2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fh=(e,t,r,n)=>{let o=e[t],s=r?.trim()??"",i=HE(s,o?.apiKey)?"":s,a=i.length>0?i:o?.apiKey;if(a===void 0||a.length===0)return e;let c=n!==void 0?ho(n):o?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},zh=e=>{let t=he(e.configPath),r={};if(fi.default.existsSync(e.configPath))try{let o=JSON.parse(fi.default.readFileSync(e.configPath,"utf8"));D2(o)&&(r={...o})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,fi.default.mkdirSync(t,{recursive:!0}),fi.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let n=Fh(Fh(Fh(hr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);jE(t,n)}});var Uh,FE=l(()=>{"use strict";Uh={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var Bh,zE=l(()=>{"use strict";li();yr();Bt();Bt();Bh=(e,t)=>{if(an(e,t))return!1;let r=ze(t);if(r===null)return!1;let n=he(e.layout.configPath),o=je(n,r);return o===null||o.apiKey.trim().length===0}});var UE,Gh,Vh=l(()=>{"use strict";UE=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let n=e.readConfig(r);return n===null?[]:[n]})},Gh=async e=>{let t=UE(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=UE(e);if(o.length>0){r(o);return}setTimeout(n,e.pollIntervalMs)};n()}))}});var H2,qh,BE=l(()=>{"use strict";te();kh();Vh();H2=1e4,qh=()=>Gh({listProfileEmails:id,readConfig:Rh,pollIntervalMs:H2,logWaiting:e=>{console.error(e)}})});var ae=l(()=>{"use strict";_h();wE();kh();xd();RE();kE();xE();Nh();OE();ME();ci();NE();$E();yr();Bt();$h();ai();FE();wh();Bt();zE();li();yr();BE();Lh();Vh()});var Nd,GE,$2,F2,VE,jd,hi,Dd,yi=l(()=>{"use strict";Nd=m(require("node:fs")),GE=m(require("node:path")),$2="wake-port.json",F2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VE=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,jd=e=>GE.default.join(e,$2),hi=e=>{let t=jd(e);if(!Nd.default.existsSync(t))return null;try{let r=JSON.parse(Nd.default.readFileSync(t,"utf8"));if(F2(r)&&VE(r.wakePort))return r.wakePort}catch{return null}return null},Dd=(e,t)=>{if(!VE(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=jd(e);Nd.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var gee,fee,hee,ct,qE,Si=l(()=>{"use strict";yi();We();yi();gee=nt(),fee=`${re()}-wake`,hee=re(),ct=()=>{let e=E(),t=hi(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return nt()},qE=e=>{let t=E();hi(t)===null&&Dd(t,e)}});var KE=l(()=>{"use strict";ah();te();pE();ae();Si()});var Kh,Ai,bi,JE=l(()=>{"use strict";Kh=m(require("node:os"));KE();Ai=()=>{let e=ee();return{ok:!0,port:ct(),hostname:Kh.default.hostname(),profileCount:e.length}},bi=()=>{let e=ee(),t=F()?.pairingToken.trim()??"",r=t.length>0?po(t):null,n=lh();return{hostname:Kh.default.hostname(),port:ct(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var Jh=l(()=>{"use strict";JE()});var YE,XE,ZE,Hd,bo=l(()=>{"use strict";YE="materialization.json",XE="backups",ZE=".gitignore",Hd=e=>`harness-set:${e.trim()}`});var QE,eR,$d,tR=l(()=>{"use strict";QE=m(require("node:crypto")),eR=m(require("node:fs")),$d=e=>{try{let t=eR.default.readFileSync(e);return QE.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Sr,ln,z2,rR,Yh,nR=l(()=>{"use strict";Sr=m(require("node:fs")),ln=m(require("node:path"));tR();z2=(e,t,r,n)=>{let o=new Date().toISOString().replaceAll(":","-"),s=ln.default.join(t,o,n);return Sr.default.mkdirSync(ln.default.dirname(s),{recursive:!0}),Sr.default.copyFileSync(r,s),ln.default.relative(e,s).replaceAll("\\","/")},rR=e=>{let t=ln.default.join(e.repoRoot,e.repoRelativeDestination),r=$d(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let n=e.ledger.entries[e.repoRelativeDestination];if(Sr.default.existsSync(t)){let o=$d(t);if(o===r)return{kind:"skipped_unchanged"};if(!(n!==void 0&&n.componentId===e.componentId)&&o!==null){let i=z2(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Sr.default.mkdirSync(ln.default.dirname(t),{recursive:!0}),Sr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Sr.default.mkdirSync(ln.default.dirname(t),{recursive:!0}),Sr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},Yh=e=>{let t=$d(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var Xh,oR,Fd,Zh=l(()=>{"use strict";Xh=m(require("node:fs"));bo();oR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fd=e=>{if(!Xh.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(Xh.default.readFileSync(e,"utf8"));if(oR(t)&&t.version===1&&oR(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Ar,zd,sR,iR=l(()=>{"use strict";Ar=m(require("node:fs")),zd=m(require("node:path"));bo();sR=e=>{let t=new Set(e.setSlugs.map(s=>Hd(s))),r=[],n=[],o={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){o[s]=i;continue}let a=zd.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=zd.default.join(e.repoRoot,i.backupPath);Ar.default.existsSync(c)?(Ar.default.mkdirSync(zd.default.dirname(a),{recursive:!0}),Ar.default.copyFileSync(c,a),n.push(s)):Ar.default.existsSync(a)&&Ar.default.rmSync(a,{force:!0})}else Ar.default.existsSync(a)&&Ar.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:o},summary:{removedPaths:r,restoredPaths:n}}}});var Qh,Ud,ey=l(()=>{"use strict";Qh=m(require("node:path"));bo();Ud=e=>({ledgerFilePath:Qh.default.join(e.metaDirPath,YE),backupsDirPath:Qh.default.join(e.metaDirPath,XE)})});var ty,aR,lR=l(()=>{"use strict";ty=m(require("node:path")),aR=(e,t)=>{let n=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(n.length===0)return ty.default.posix.join("rules",e,"file");let o=n[n.length-1]??"file",s=n[0]??"rules";return ty.default.posix.join(s,e,o)}});var ry,cR,ny,dR=l(()=>{"use strict";ry=m(require("node:fs")),cR=m(require("node:path")),ny=(e,t)=>{ry.default.mkdirSync(cR.default.dirname(e),{recursive:!0}),ry.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var oy,U2,qe,wi=l(()=>{"use strict";oy=m(require("node:os")),U2=e=>{let t=e.trim();return t.startsWith("~/")?`${oy.default.homedir()}${t.slice(1)}`:t==="~"?oy.default.homedir():t},qe=U2});var Bd,uR,B2,pR,mR=l(()=>{"use strict";Bd=m(require("node:fs")),uR=m(require("node:path"));bo();Yr();B2=`*
!${cd}
`,pR=e=>{let t=uR.default.join(e,ZE);Bd.default.existsSync(t)||(Bd.default.mkdirSync(e,{recursive:!0}),Bd.default.writeFileSync(t,B2))}});var cn,Ke,dn=l(()=>{"use strict";cn=m(require("node:path"));Yr();wi();Ke=e=>{let t=qe(e),r=cn.default.join(t,wL);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:cn.default.join(r,"rag"),memoryDirPath:cn.default.join(r,_L),reportsDirPath:cn.default.join(r,WL),metaFilePath:cn.default.join(r,cd),ragChunksFilePath:cn.default.join(r,"rag",vL)}}});var vt,fR,G2,V2,Ue,sy=l(()=>{"use strict";vt=m(require("node:fs")),fR=m(require("node:path"));Yr();mR();dn();G2=(e,t)=>{if(vt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};vt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},V2=e=>{vt.default.existsSync(e.ragChunksFilePath)||vt.default.writeFileSync(e.ragChunksFilePath,"");let t=fR.default.join(e.memoryDirPath,eo);vt.default.existsSync(t)||vt.default.writeFileSync(t,"")},Ue=e=>{let t=Ke(e.projectFolderPath);return vt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),vt.default.mkdirSync(t.ragDirPath,{recursive:!0}),vt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),pR(t.metaDirPath),G2(t,e),V2(t),{ok:!0,layout:t}}});var hR,yR,SR,AR,Gd,Vd=l(()=>{"use strict";hR="components",yR="store",SR="versions",AR="installed.json",Gd=e=>`harness-set:${e.trim()}`});var iy,bR,qd,ay=l(()=>{"use strict";iy=m(require("node:fs")),bR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qd=e=>{if(!iy.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(iy.default.readFileSync(e,"utf8"));if(bR(t)&&t.version===1&&bR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var _i,Po,Kd=l(()=>{"use strict";_i=m(require("node:path"));Vd();Po=e=>{let t=_i.default.join(e,hR);return{componentsRootDir:t,storeDir:_i.default.join(t,yR),versionsDir:_i.default.join(t,SR),installedFilePath:_i.default.join(t,AR)}}});var ly,PR,Jd,Yd,Xd=l(()=>{"use strict";ly=m(require("node:crypto")),PR=m(require("node:fs")),Jd=e=>ly.default.createHash("sha256").update(e,"utf8").digest("hex"),Yd=e=>{try{let t=PR.default.readFileSync(e);return ly.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var cy,wR,_R,vR=l(()=>{"use strict";cy=m(require("node:fs")),wR=m(require("node:path")),_R=(e,t)=>{cy.default.mkdirSync(wR.default.dirname(e),{recursive:!0}),cy.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var dy,uy,WR,LR=l(()=>{"use strict";dy=m(require("node:fs")),uy=m(require("node:path")),WR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),n=uy.default.join(e,r),o=uy.default.join(n,`${t.versionId}.json`);dy.default.mkdirSync(n,{recursive:!0}),dy.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`)}});var Zd,ER,RR,kR=l(()=>{"use strict";Zd=m(require("node:fs")),ER=m(require("node:path"));Xd();RR=e=>{let t=Jd(e.content),r=ER.default.join(e.storeDir,t);return Zd.default.existsSync(r)||(Zd.default.mkdirSync(e.storeDir,{recursive:!0}),Zd.default.writeFileSync(r,e.content)),t}});var py,CR,q2,Qd,my=l(()=>{"use strict";py=m(require("node:fs")),CR=m(require("node:path"));Vd();ay();Kd();Xd();vR();LR();kR();q2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qd=e=>{let t=Po(e.installDir),r=Gd(e.setSlug),n=String(e.setEntry.version),o=[];for(let i of e.setEntry.items){if(!q2(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=CR.default.join(e.harnessRootDir,a);if(!py.default.existsSync(c))continue;let d=py.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Yd(c);if(p!==null){if(Jd(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);RR({storeDir:t.storeDir,content:d}),o.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(o.length===0)return;WR(t.versionsDir,{version:1,componentId:r,versionId:n,items:o,createdAt:new Date().toISOString()});let s=qd(t.installedFilePath);_R(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:n,installedAt:new Date().toISOString()}}})}});var fy,gy,TR,xR=l(()=>{"use strict";fy=m(require("node:fs"));my();ay();Kd();gy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),TR=e=>{if(!fy.default.existsSync(e.harnessManifestPath))return;let t=Po(e.installDir),r=qd(t.installedFilePath);if(Object.keys(r.components).length>0)return;let n;try{n=JSON.parse(fy.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!gy(n)||n.version!==1||!gy(n.sets)))for(let[o,s]of Object.entries(n.sets)){if(!gy(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Qd({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:o,setEntry:{version:i,items:a}})}}});var hy,IR,OR,MR=l(()=>{"use strict";hy=m(require("node:fs")),IR=m(require("node:path")),OR=e=>{let t=e.componentId.replaceAll("/","_"),r=IR.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!hy.default.existsSync(r))return null;try{let n=JSON.parse(hy.default.readFileSync(r,"utf8"));if(typeof n=="object"&&n!==null&&n.version===1)return n}catch{return null}return null}});var eu,tu,NR,jR=l(()=>{"use strict";eu=m(require("node:fs")),tu=m(require("node:path"));Vd();xR();MR();Kd();Xd();NR=e=>{TR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Po(e.layout.installDir),r=Gd(e.setSlug),n=OR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(n!==null){let i=n.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=tu.default.join(t.storeDir,i.contentSha256);if(eu.default.existsSync(a)&&Yd(a)===i.contentSha256)return a}}let o=e.manifestItemPath.trim();if(o.length===0)return null;let s=o.startsWith("shared/")?tu.default.join(e.layout.harnessRootDir,o):tu.default.join(e.layout.harnessSetsDir,e.setSlug,o);if(!eu.default.existsSync(s))return null;try{if(!eu.default.statSync(s).isFile())return null}catch{return null}return s}});var DR,K2,J2,br,ru=l(()=>{"use strict";Zh();ey();dn();DR="harness-set:",K2=e=>{let t=e.trim();if(!t.startsWith(DR))return null;let r=t.slice(DR.length).trim();return r.length>0?r:null},J2=e=>{let t=new Set;for(let r of Object.values(e.entries)){let n=K2(r.componentId);n!==null&&t.add(n)}return[...t].sort((r,n)=>r.localeCompare(n))},br=e=>{let t=Ke(e),{ledgerFilePath:r}=Ud(t),n=Fd(r);return J2(n)}});var nu,yy,vi,Y2,Gt,Wi,wo=l(()=>{"use strict";nu=m(require("node:fs")),yy=m(require("node:os")),vi=m(require("node:path")),Y2=()=>nu.default.realpathSync(vi.default.resolve(yy.default.homedir())),Gt=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?vi.default.join(yy.default.homedir(),t.slice(1)):t,n;try{n=nu.default.realpathSync(vi.default.resolve(r))}catch{return null}let o=Y2();return n===o||n.startsWith(`${o}${vi.default.sep}`)?n:null},Wi=e=>{let t=Gt(e);if(t===null)return null;try{if(!nu.default.statSync(t).isFile())return null}catch{return null}return t}});var Sy,Ay=l(()=>{"use strict";Sy=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var su,HR,ou,X2,Li,by=l(()=>{"use strict";su=m(require("node:fs")),HR=m(require("node:path"));bo();nR();Zh();iR();ey();lR();dR();wi();sy();jR();ru();wo();Ay();ou=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),X2=e=>{if(!su.default.existsSync(e))return null;try{let t=JSON.parse(su.default.readFileSync(e,"utf8"));if(ou(t)&&t.version===1)return t}catch{return null}return null},Li=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=qe(e.projectFolderPath),n=Gt(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=su.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Ue({projectFolderPath:n}),{ledgerFilePath:i,backupsDirPath:a}=Ud(s.layout),d=br(n).filter(A=>!t.includes(A)),p=Fd(i),g=0;if(d.length>0){let A=sR({repoRoot:n,setSlugs:d,ledger:p});p=A.ledger,g=A.summary.removedPaths.length}if(t.length===0)return ny(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:n,appliedSetSlugs:[]};let b=X2(e.layout.harnessManifestPath);if(b===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=ou(b.sets)?b.sets:{},y=0,u=0,S=0;for(let A of t){let f=h[A];if(!ou(f))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",_=Hd(A),v=Array.isArray(f.items)?f.items:[];for(let L of v){if(!ou(L))continue;let R=typeof L.path=="string"?L.path.trim():"";if(R.length===0)continue;let T=Sy(R);if(T===null)continue;let I=aR(A,T),D=HR.default.posix.join(".cursor",I).replaceAll("\\","/"),le=typeof L.id=="string"?L.id.trim():"",V=NR({layout:e.layout,setSlug:A,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:R,manifestItemId:le});if(V===null)continue;let q=rR({repoRoot:n,backupsDir:a,repoRelativeDestination:D,sourceAbsolutePath:V,componentId:_,versionId:w,ledger:p});if(q.kind==="skipped_unchanged"){u+=1;continue}if(q.kind==="backed_up_user_file"){S+=1,y+=1,p={version:1,entries:{...p.entries,[D]:Yh({componentId:_,versionId:w,sourceAbsolutePath:V,backupPath:q.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[D]:Yh({componentId:_,versionId:w,sourceAbsolutePath:V})}}}}return y===0&&u===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(ny(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:S,removedLedgerPathCount:g,projectFolderPath:n,appliedSetSlugs:t})}});var $R,iu,Z2,Q2,e5,t5,r5,n5,o5,s5,i5,Ei,au=l(()=>{"use strict";$R=m(require("node:crypto")),iu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Z2=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},Q2=(e,t)=>{let r=Z2(t),n=iu(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},e5=(e,t,r)=>{let n=Q2(t,r);return`shared/items/${e}/${n}`},t5=["rules","skills","commands","instructions","agents"],r5=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),n5=(e,t)=>[...e.filter(n=>n.id!==t.id),t],o5=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},s5=e=>$R.default.createHash("sha256").update(e,"utf8").digest("hex"),i5=e=>({id:e.id,kind:e.kind,title:e.title,path:e5(e.id,e.kind,e.title),contentSha256:s5(e.content)}),Ei=e=>{let t=new Date().toISOString(),r=e.existingManifest??r5(e.hostname,t),n=iu(e.bundle.slug),o=o5(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...t5.map(d=>`sets/${n}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=i5(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:n5(d.nextItems,g)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var Pr,FR,lu,a5,un,Py=l(()=>{"use strict";Pr=m(require("node:fs")),FR=m(require("node:os")),lu=m(require("node:path"));au();a5=e=>{if(!Pr.default.existsSync(e))return null;try{let t=JSON.parse(Pr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},un=e=>{try{let t=a5(e.layout.harnessManifestPath),r=Ei({bundle:e.bundle,hostname:FR.default.hostname(),existingManifest:t});Pr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let n of r.directories)Pr.default.mkdirSync(lu.default.join(e.layout.harnessRootDir,n),{recursive:!0});for(let n of r.files){let o=lu.default.join(e.layout.harnessRootDir,n.relativePath);Pr.default.mkdirSync(lu.default.dirname(o),{recursive:!0}),Pr.default.writeFileSync(o,n.content)}return Pr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var wy,zR=l(()=>{"use strict";Py();by();wy=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=un({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Li({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var UR,BR=l(()=>{"use strict";UR=["rule","skill","command","instruction","agent"]});var GR,l5,c5,Wt,_y=l(()=>{"use strict";BR();GR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),l5=e=>typeof e=="string"&&UR.includes(e),c5=e=>{if(!GR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!l5(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Wt=e=>{if(!GR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=c5(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var VR,d5,vy,qR=l(()=>{"use strict";VR=require("node:zlib");_y();d5="x-agent-witch-token",vy=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[d5]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let n=r.headers.get("x-content-sha256")?.trim()??"";if(n.length>0&&n!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let o=Buffer.from(await r.arrayBuffer()),s=(0,VR.gunzipSync)(o).toString("utf8"),i=JSON.parse(s),a=Wt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var Ly,Wy,wr,KR=l(()=>{"use strict";Ly=m(require("node:fs")),Wy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wr=e=>{if(!Ly.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Ly.default.readFileSync(e.harnessManifestPath,"utf8"));if(!Wy(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=Wy(t.sets)?t.sets:{},o=Object.entries(n).map(([s,i])=>{if(!Wy(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var cu,JR=l(()=>{"use strict";cu=()=>"~"});var YR,XR,ZR=l(()=>{"use strict";YR=require("node:crypto"),XR=e=>`local-${(0,YR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Ey,QR=l(()=>{"use strict";Ey=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Ri,du,Ry=l(()=>{"use strict";Ri=m(require("node:path")),du=e=>{let t=Ri.default.dirname(e),r=Ri.default.basename(t);return r==="agents"?Ri.default.basename(Ri.default.dirname(t)):r}});var ki,Vt,ek,u5,p5,m5,uu,tk,ky=l(()=>{"use strict";ki=m(require("node:fs")),Vt=m(require("node:path"));ZR();QR();Ry();ek=new Set(["node_modules",".git","dist","build",".next","coverage"]),u5=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},p5=(e,t)=>{let r=Vt.default.basename(t);if(e==="skill"){let n=t.split(Vt.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},m5=e=>{let t=[],r=(o,s)=>{let i;try{i=ki.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&ek.has(a.name))continue;let c=Vt.default.join(o,a.name),d=s?Vt.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;Ey(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=Vt.default.join(e,o);ki.default.existsSync(s)&&r(s,o)}let n=Vt.default.join(e,"skills");return ki.default.existsSync(n)&&r(n,"skills"),t},uu=e=>{let t=m5(e);if(t.length===0)return null;let r=Vt.default.dirname(e),n=du(e),o=u5(n),s=t.map(i=>{let a=Ey(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:XR(i.absolutePath),kind:a,title:p5(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},tk=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=ki.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||ek.has(a.name))continue;let c=Vt.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var rk,Cy,g5,Ty,nk=l(()=>{"use strict";rk=m(require("node:fs")),Cy=m(require("node:path"));ky();wo();g5=e=>{let t=Gt(e.trim());if(t===null)return null;if(Cy.default.basename(t)===".cursor")return t;let r=Cy.default.join(t,".cursor");try{if(rk.default.statSync(r).isDirectory())return Gt(r)}catch{return null}return null},Ty=e=>{let t=g5(e.projectPath);if(t===null)return null;let r=uu(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var ok,f5,pu,xy,sk=l(()=>{"use strict";ok=m(require("node:path"));ky();wo();Ry();f5=5,pu=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},xy=e=>{let t=Gt(e.scanRoot.trim());if(t===null)return pu(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of tk(t,f5,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=Gt(s);if(i===null)continue;let a=du(i);pu(e.response,"folder",{cursorDir:i,groupName:a,repoPath:ok.default.dirname(i)});let c=uu(i);c!==null&&(r.push(c),pu(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return pu(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var ik,ak,lk=l(()=>{"use strict";ik=m(require("node:path")),ak=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:ik.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var xe,ck,Iy,h5,Oy,My,mu,Ny,Ci,dk=l(()=>{"use strict";xe=m(require("node:fs")),ck=m(require("node:os")),Iy=m(require("node:path"));au();my();wo();lk();h5=e=>{if(!xe.default.existsSync(e))return null;try{let t=JSON.parse(xe.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Oy=e=>{let t=e.hostname??ck.default.hostname(),r=h5(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=Wi(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let b=xe.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:b,setSlugs:[i.slug]})}let d=Ei({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)o.add(p);for(let p of d.files)s.push(p),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{xe.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)xe.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=Iy.default.join(e.layout.harnessRootDir,i.relativePath);xe.default.mkdirSync(Iy.default.dirname(a),{recursive:!0}),xe.default.writeFileSync(a,i.content)}xe.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=iu(i.slug),d=r.sets[c];d!==void 0&&Qd({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},My="reveal-cache.json",mu=(e,t)=>{xe.default.mkdirSync(e.harnessRootDir,{recursive:!0}),xe.default.writeFileSync(`${e.harnessRootDir}/${My}`,`${JSON.stringify(t,null,2)}
`)},Ny=e=>{let t=`${e.harnessRootDir}/${My}`;xe.default.existsSync(t)&&xe.default.unlinkSync(t)},Ci=e=>{let t=`${e.harnessRootDir}/${My}`;if(!xe.default.existsSync(t))return null;try{let r=JSON.parse(xe.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return ak(r)}catch{return null}return null}});var pn=l(()=>{"use strict";by();zR();Ay();Py();qR();_y();au();KR();JR();nk();wo();sk();dk()});var jy,uk=l(()=>{"use strict";pn();We();jy=e=>{let t=M(e.profileEmail);return un({bundle:e.bundle,layout:t})}});var pk=l(()=>{"use strict";uk();pn()});var y5,mk,S5,gk,mn,gu,fk=l(()=>{"use strict";y5=["agentwitch.com","www.agentwitch.com"],mk=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,S5=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},gk=e=>{let t=S5(e);return!!(y5.includes(t)||mk.test(e.trim().toLowerCase()))},mn=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return gk(r)?mk.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},gu=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:mn(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Ti=l(()=>{"use strict";fk()});var qt,xi=l(()=>{"use strict";qt=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Ii,hk=l(()=>{"use strict";pk();Ti();xi();Ii=e=>{if(!qt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Wt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!mn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=jy({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}}});var Dy=l(()=>{"use strict";hk()});var A5,_o,Hy=l(()=>{"use strict";A5=e=>e==="hourly"||e==="daily"||e==="weekdays",_o=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!A5(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Oi,fu,yk,Sk,$y,dt,hu,yu,Su,Au,bu=l(()=>{"use strict";Oi=m(require("node:fs")),fu=m(require("node:path"));Hy();yk="automations.json",Sk=e=>e.profileEmail!==null?fu.default.join(e.installDir,"profiles",e.profileEmail,yk):fu.default.join(e.installDir,yk),$y=()=>({version:1,automations:[]}),dt=e=>{let t=Sk(e);if(!Oi.default.existsSync(t))return $y();try{let r=JSON.parse(Oi.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?$y():{version:1,automations:r.automations.flatMap(o=>{let s=_o(o);return s!==null?[s]:[]})}}catch{return $y()}},hu=(e,t)=>{let r=Sk(e);Oi.default.mkdirSync(fu.default.dirname(r),{recursive:!0}),Oi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},yu=(e,t)=>{hu(e,{version:1,automations:t})},Su=(e,t)=>{let n=dt(e).automations.filter(o=>o.id!==t.id);hu(e,{version:1,automations:[...n,t]})},Au=(e,t)=>dt(e).automations.find(r=>r.id===t)??null});var De,_r=l(()=>{"use strict";De="x-agent-witch-token"});var Z,gn,Fy,Mi,zy,b5,Uy,Ni,ji,By,Di=l(()=>{"use strict";_r();Ve();Z=e=>{let t=Ee(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},gn=e=>({[De]:e,"Content-Type":"application/json"}),Fy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:gn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Mi=async(e,t,r,n,o)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:gn(e.pairingToken),body:JSON.stringify({exitCode:r,output:n,...typeof o?.estimateSeconds=="number"?{estimateSeconds:o.estimateSeconds}:{},...typeof o?.actualSeconds=="number"?{actualSeconds:o.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},zy=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:gn(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},b5=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let n of t.projects){if(typeof n!="object"||n===null)continue;let o=n,s=typeof o.id=="string"?o.id.trim():"",i=typeof o.name=="string"?o.name.trim():"",a=typeof o.folderPath=="string"?o.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},Uy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:gn(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n;if(o.ok!==!0||typeof o.project!="object")return null;let s=o.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Ni=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:gn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return b5(r)}catch{return null}},ji=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:gn(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},By=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:gn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var fn,Ak,bk,P5,Gy,Pk,Vy=l(()=>{"use strict";fn=m(require("node:fs")),Ak=m(require("node:path")),bk=e=>Ak.default.join(e.harnessRootDir,"projects-registry.json"),P5=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),Gy=e=>{let t=bk(e);if(!fn.default.existsSync(t))return[];try{let r=JSON.parse(fn.default.readFileSync(t,"utf8"));return P5(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string").map(n=>({id:n.id,name:n.name,projectFolderPath:n.projectFolderPath,addedAt:typeof n.addedAt=="string"?n.addedAt:new Date().toISOString(),...typeof n.cloudProjectId=="string"&&n.cloudProjectId.length>0?{cloudProjectId:n.cloudProjectId}:{}})):[]}catch{return[]}},Pk=e=>{let t=bk(e);if(!fn.default.existsSync(t))return;let r=`${t}.migrated`;if(fn.default.existsSync(r)){fn.default.unlinkSync(t);return}fn.default.renameSync(t,r)}});var wk,w5,_5,_k,vk=l(()=>{"use strict";wi();wk=e=>qe(e),w5=e=>new Set(e.map(t=>wk(t.folderPath))),_5=e=>new Set(e.map(t=>t.id)),_k=(e,t)=>{let r=w5(t),n=_5(t),o=[],s=new Set;for(let i of e){let a=wk(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&n.has(i.cloudProjectId)||(s.add(a),o.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return o}});var qy,Ky=l(()=>{"use strict";Di();Vy();vk();qy=async(e,t)=>{let r=Gy(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let n=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let o=await Ni(n);if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=_k(r,o),i=r.length-s.length,a=0,c=0;for(let d of s)await Uy(n,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&Pk(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var Jy,hn,Pu=l(()=>{"use strict";Jy=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),hn=(e,t)=>e.find(r=>r.id===t)??null});var vo,wu=l(()=>{"use strict";Di();Ky();Pu();vo=async(e,t)=>{t!==void 0&&await qy(t,e);let r=Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let n=await Ni(r);if(n===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let o=Jy(n);return{ok:!0,projects:o,message:o.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${o.length} project${o.length===1?"":"s"} from Agent Witch Console.`}}});var Wk=l(()=>{"use strict"});var Ie,Lk,v5,W5,L5,E5,Wo,Yy=l(()=>{"use strict";Ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lk=(e,t)=>e.length===0?`<p class="empty">${Ie(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Ie(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Ie(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,v5=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,W5=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ie(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,L5=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?W5(e.project):v5();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(n=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Ie(n.slug)}"${t.size===0||t.has(n.slug)?" checked":""} />
            <span><strong>${Ie(n.name)}</strong> <span class="muted mono">(${Ie(n.slug)})</span></span>
          </label>
          <p class="muted">${n.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ie(e.project.id)}" />
        <p class="field-label">Installed</p>
        <p class="lede">Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.</p>
        ${r}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`},E5=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Ie(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Ie(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Wo=e=>{let t=e.flashError?`<div class="alert-error">${Ie(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ie(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},n=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${Ie(c)}</a>`,o=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=L5({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=Lk(o,"No workflows installed for this project yet."):e.activeTab==="agents"?i=Lk(s,"No agents installed for this project yet."):i=E5({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Ie(e.project.name)}</h1>
      <p class="muted mono">${Ie(e.project.projectFolderPath)}</p>
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
    </section>`}});var R5,k5,Ek,Rk=l(()=>{"use strict";pn();_r();R5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),k5=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[De]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();return!R5(n)||n.ok!==!0||!Array.isArray(n.bundles)?null:n.bundles.flatMap(o=>{let s=Wt(o);return s===null?[]:[s]})}catch{return null}},Ek=k5});var kk,Xy,Ck=l(()=>{"use strict";ae();pn();Yy();wu();Rk();Pu();ru();Di();kk=e=>({kind:"page",title:e.project.name,body:Wo({project:e.project,installed:wr(e.layout),linkedSetSlugs:br(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),Xy=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=F();if(r===null)return{kind:"not_found"};let n=await vo(r,e.layout),o=hn(n.projects,t);if(o===null)return{kind:"not_found"};let s=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await Ek(s,o.id);if(i===null)return kk({layout:e.layout,project:o,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=wy({layout:e.layout,projectFolderPath:o.projectFolderPath,bundles:i});if(!a.ok)return kk({layout:e.layout,project:o,errorMessage:a.errorMessage});let c=s===null?!1:await ji(s,o.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(o.id)}&${d.toString()}`}}});var C5,Zy,Tk=l(()=>{"use strict";C5=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,Zy=C5});var xk,Ik,T5,x5,_u,vu,Ok=l(()=>{"use strict";xk=require("node:child_process"),Ik=require("node:util"),T5=(0,Ik.promisify)(xk.execFile),x5=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},_u=async(e,t)=>{try{let{stdout:r}=await T5("git",t,{cwd:e,env:x5(),maxBuffer:1048576});return r.trim()}catch{return null}},vu=async e=>{let t=await _u(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await _u(e,["rev-parse","--abbrev-ref","HEAD"]),n=await _u(e,["status","--porcelain"]),o=await _u(e,["diff","--shortstat","HEAD"]),s=n===null||n.length===0?0:n.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:o===null||o.length===0?null:o}}});var Qy,Mk=l(()=>{"use strict";Qy=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",n=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,o=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${n}; ${o}; ${s}; ${i.join("; ")}.`}});var I5,eS,Nk=l(()=>{"use strict";I5=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",n=r.length>0?r:t.length>0?t:"Lesson from completed run";return n.length<=280?n:`${n.slice(0,277)}\u2026`},eS=I5});var O5,tS,jk=l(()=>{"use strict";_r();O5=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[De]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},tS=O5});var Dk,vr,Hk=l(()=>{"use strict";Dk=require("node:child_process"),vr=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,n=(0,Dk.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return n.length>0?n:null}catch{return null}}});var $k=l(()=>{"use strict";wu()});var Hi,Fk=l(()=>{"use strict";_r();Hi=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[De]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var ut=l(()=>{"use strict";wu();Pu();Wk();wi();sy();Ck();ru();Tk();Ok();Mk();Nk();jk();Hk();$k();Fk();Ky();Vy();Di()});var Wu,$i,zk,rS,yn,nS=l(()=>{"use strict";Wu=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},$i=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=Wu(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},zk=e=>e>=1&&e<=5,rS=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Wu(t,"UTC")},yn=e=>{let t=e.from??new Date,r=Wu(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return $i(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=$i(r,e.timeZone,n,0),s=Wu(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?$i(rS(r),e.timeZone,n,0):o;if(!i&&zk(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=rS(a),zk(a.weekday))return $i(a,e.timeZone,n,0);return $i(rS(r),e.timeZone,n,0)}});var Uk,oS,Kt,sS=l(()=>{"use strict";Uk=require("node:crypto");ae();ut();nS();bu();oS=!1,Kt=async e=>{if(oS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=F();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=Au(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};oS=!0;let o=(0,Uk.randomUUID)();try{let s=await So(t,"claude-cli",n.prompt);await By(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=yn({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return Su(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{oS=!1}}});var Lu,Bk=l(()=>{"use strict";ae();sS();bu();Lu=async()=>{let e=F();if(e===null)return;let t=dt(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await Kt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var Fi=l(()=>{"use strict";bu();Bk();sS();nS()});var Gk=l(()=>{"use strict";Fi()});var Vk=l(()=>{"use strict";Hy()});var qk=l(()=>{"use strict";Vk()});var iS=l(()=>{"use strict";Fi()});var M5,N5,zi,aS=l(()=>{"use strict";Gk();qk();iS();We();M5=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),N5=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??yn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??yn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},zi=e=>{let t=M5(e.profileEmail),r=dt(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=_o(s);return i!==null?[N5(i,n.get(i.id))]:[]});return yu(t,o),{ok:!0,writtenCount:o.length}}});var lS=l(()=>{"use strict";Fi()});var Kk=l(()=>{"use strict";ae()});var Jk=l(()=>{"use strict";aS();lS();iS();Kk()});var Yk,Ui,Bi,Gi,Xk=l(()=>{"use strict";Yk=m(require("node:os"));Jk();Ti();xi();Ui=e=>{if(!qt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!mn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=zi({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},Bi=async e=>{if(!qt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:mn(t)?Kt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Gi=()=>{let e=F(),t=e!==null?dt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Yk.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var cS=l(()=>{"use strict";Xk()});var Eu=l(()=>{"use strict";te()});var Ru=l(()=>{"use strict";te()});var ku,Qk,eC,Zk,j5,D5,Lo,dS=l(()=>{"use strict";ku=m(require("node:fs")),Qk=m(require("node:os")),eC=m(require("node:path"));Eu();Ru();yi();We();Zk=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},j5=e=>eC.default.join(Qk.default.homedir(),"Library","LaunchAgents",`${e}.plist`),D5=async e=>ku.default.existsSync(j5(e))?(await ve(e)).ok:!1,Lo=async(e=E())=>{let t=ku.default.existsSync(jd(e)),r=!ku.default.existsSync(jt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let n=hi(e);if(n===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await Zk(n))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${re(e)}-wake`;await D5(i)&&s.push(i);for(let c of ee(e))(await ve(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await Zk(n);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var tC=l(()=>{"use strict";te()});var Eo,Vi=l(()=>{"use strict";Eo="connection-health.json"});var Sn,Cu,H5,qi,ye,uS,Tu,Oe,xu=l(()=>{"use strict";Sn=m(require("node:fs")),Cu=m(require("node:path"));Vi();H5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qi=e=>e.profileEmail===null?Cu.default.join(e.installDir,Eo):Cu.default.join(e.installDir,"profiles",e.profileEmail,Eo),ye=e=>{let t=qi(e);if(!Sn.default.existsSync(t))return null;try{let r=JSON.parse(Sn.default.readFileSync(t,"utf8"));return!H5(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},uS=e=>{let t=qi(e);Sn.default.existsSync(t)&&Sn.default.rmSync(t,{force:!0})},Tu=(e,t)=>{let r=qi(e),n=ye(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};Sn.default.mkdirSync(Cu.default.dirname(r),{recursive:!0}),Sn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Oe=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var Ki,rC=l(()=>{"use strict";Vi();xu();Ki=(e,t)=>{if(!t.socketOpen)return!1;let r=ye(e);return r===null?!1:!Oe(r,t.staleAfterMs??12e4,t.nowMs)}});var pS,nC=l(()=>{"use strict";xu();pS=(e,t)=>!(e!==null&&!Oe(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Ro=l(()=>{"use strict";xu();rC();nC();Vi()});var mS=l(()=>{"use strict";Ro();te()});var gS=l(()=>{"use strict";Ro()});var fS=l(()=>{"use strict";te()});var sC,oC,Ji,hS=l(()=>{"use strict";sC=m(require("node:fs"));Ut();Eu();Ru();We();oC=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Ji=async(e=E())=>{if(!sC.default.existsSync(jt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await oC())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let n=[];for(let s of ee(e))(await ve(s.launchAgentLabel)).ok&&n.push(s.launchAgentLabel);let o=await oC();return{ok:o||n.length>0,liveReachable:o,hollowInstall:!1,kickstartedLabels:n}}});var iC=l(()=>{"use strict";te()});var aC,An,yS,$5,F5,z5,lC,U5,cC,ko,Iu=l(()=>{"use strict";aC=require("node:crypto"),An=m(require("node:fs")),yS=m(require("node:path"));We();$5="watchdog-log.ndjson",F5=200,z5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lC=(e=E())=>{let t=M(),r=t.installDir===e?t.logsDir:Qn({installDir:e,profileEmail:t.profileEmail});return yS.default.join(r,$5)},U5=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!z5(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},cC=(e,t=E())=>{let r={id:(0,aC.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=lC(t);An.default.mkdirSync(yS.default.dirname(n),{recursive:!0});let o=An.default.existsSync(n)?An.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-F5+1)),JSON.stringify(r)];return An.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},ko=(e=20,t=E())=>{let r=lC(t);if(!An.default.existsSync(r))return[];let n=An.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=U5(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var SS,AS,bS,PS=l(()=>{"use strict";bt();SS=Ur.watchdogReinstallState,AS=900*1e3,bS=3e3});var dC=l(()=>{"use strict";PS()});var uC={};St(uC,{verifyAgentWitchReviveAfterKickstart:()=>G5});var B5,G5,pC=l(()=>{"use strict";dC();gS();fS();We();B5=e=>new Promise(t=>{setTimeout(t,e)}),G5=async e=>{if(await B5(e.verifyDelayMs??bS),!await Vr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),n=ye(r);return!Oe(n,e.staleAfterMs)}});var Yi,wS,V5,mC,gC,_S,vS,WS=l(()=>{"use strict";Yi=m(require("node:fs")),wS=m(require("node:path"));B();PS();V5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mC=e=>wS.default.join(e,SS),gC=(e=E())=>{let t=mC(e);if(!Yi.default.existsSync(t))return null;try{let r=JSON.parse(Yi.default.readFileSync(t,"utf8"));return!V5(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},_S=(e=E(),t=Date.now())=>{let r=gC(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=AS:!0},vS=(e=E(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=mC(e);return Yi.default.mkdirSync(wS.default.dirname(n),{recursive:!0}),Yi.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var LS,fC=l(()=>{"use strict";te();WS();LS=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!_S())return{attempted:!1,ok:!1,targets:e};vS();let n=await t();if(!n.ok)return{attempted:!0,ok:!1,errorMessage:n.errorMessage,targets:e};let o=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await ve(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:o.some(s=>s.revived||s.reason==="healthy"),targets:o}}});var hC=l(()=>{"use strict";WS();fC()});var ES=l(()=>{"use strict";Ve()});var yC=l(()=>{"use strict";Ve()});var SC,Co,AC,bC,PC,q5,K5,wC,J5,Y5,_C,vC=l(()=>{"use strict";SC=require("node:child_process"),Co=m(require("node:fs")),AC=m(require("node:os")),bC=m(require("node:path")),PC=require("node:util");ES();yC();We();q5=(0,PC.promisify)(SC.execFile),K5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wC=e=>{let t=ot(e),r=t===null?M():M(t);if(!Co.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Co.default.readFileSync(r.configPath,"utf8"));return!K5(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},J5=e=>wC(e)?.wsUrl??null,Y5=e=>{let t=J5(e);return t!==null?Ee(t):Le(e)?.appOrigin??null},_C=async e=>{let t=e?.installDir??E(),r=wC(t),n=r!==null?Ee(r.wsUrl):Y5(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=bC.default.join(AC.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Co.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??ot(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await q5("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Co.default.existsSync(i)&&Co.default.unlinkSync(i)}}});var WC={};St(WC,{attemptAgentWitchWatchdogReinstall:()=>X5});var X5,LC=l(()=>{"use strict";hC();vC();X5=async e=>LS(e,()=>_C())});var EC,RC,kC,Z5,Q5,eV,Xi,RS=l(()=>{"use strict";tC();mS();gS();fS();hS();dS();Eu();Ru();We();ao();iC();Iu();EC=e=>e===null?M():M(e),RC=async(e,t,r)=>{if(!await Vr(e))return"not_running";let o=EC(t);if(at(o))return"healthy";let s=ye(o);return Oe(s,r)?"stale_connection":"healthy"},kC=async e=>{let t=e?.staleAfterMs??12e4,r=E(),n=ee(r);return Promise.all(n.map(async o=>{let s=await RC(o.launchAgentLabel,o.profileEmail,t),i=EC(o.profileEmail),a=ye(i),c=await Vr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Oe(a,t),needsRevive:s!=="healthy",reason:s}}))},Z5=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},Q5=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",eV=async e=>{let t=await ve(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(pC(),uC)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Xi=async e=>{if(!st())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=E();await Lo(r),await Ji(r);let n=ee(r),o=[];for(let p of n){let g=await RC(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){o.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}o.push(await eV({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(o.length===0){let p=Gr();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(LC(),WC)),g=await p(o);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&cC({event:Q5(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:Z5(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var CC,Ou,TC=l(()=>{"use strict";CC=m(require("node:os"));mS();Iu();RS();Ou=async()=>{let e=await kC(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:CC.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:ko(1)[0]??null}}});var kS=l(()=>{"use strict";dS();RS();TC();Iu()});var Zi,Qi,ea,xC=l(()=>{"use strict";te();kS();Zi=async()=>{await Lo();let e=ee(),t=[];for(let r of e){let n=await ve(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Gr();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Qi=Xi,ea=Xi});var CS=l(()=>{"use strict";xC()});var Nu,Mu,IC,TS,OC,tV,rV,nV,oV,sV,ju,MC=l(()=>{"use strict";Nu=require("node:child_process"),Mu=m(require("node:fs")),IC=m(require("node:os")),TS=m(require("node:path")),OC=require("node:util");te();B();tV=(0,OC.promisify)(Nu.execFile),rV=()=>TS.default.join(IC.default.homedir(),"Library","LaunchAgents"),nV=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await tV("launchctl",["bootout",r]).catch(()=>{})},oV=e=>{let t=TS.default.join(rV(),`${e}.plist`);Mu.default.existsSync(t)&&Mu.default.unlinkSync(t)},sV=e=>{(0,Nu.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},ju=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=E();if(!Mu.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Dt(e);for(let r of t)await nV(r),oV(r);return sV(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var NC,Du,jC,To,DC,iV,aV,lV,xS,cV,IS,HC=l(()=>{"use strict";NC=require("node:child_process"),Du=m(require("node:fs")),jC=m(require("node:os")),To=m(require("node:path")),DC=require("node:util");te();iV=(0,DC.promisify)(NC.execFile),aV=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],lV=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],xS=e=>{Du.default.existsSync(e)&&Du.default.rmSync(e,{force:!0})},cV=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await iV("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},IS=async e=>{let r=(e.listLaunchAgentLabels??Dt)(e.layout.installDir),n=e.launchAgentsDir??To.default.join(jC.default.homedir(),"Library","LaunchAgents"),o=e.bootoutLaunchAgent??cV;for(let i of r)await o(i),xS(To.default.join(n,`${i}.plist`));let s=To.default.dirname(e.layout.configPath);for(let i of aV)xS(To.default.join(s,i));for(let i of lV)xS(To.default.join(e.layout.installDir,i));return Du.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var OS,$C=l(()=>{"use strict";OS={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var MS,FC=l(()=>{"use strict";MS="unknown_identity"});var NS=l(()=>{"use strict";$C();FC()});var dV,jS,zC=l(()=>{"use strict";NS();dV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jS=e=>e.type!=="system.error"||!dV(e.payload)?!1:e.payload.errorCode===MS});var DS=l(()=>{"use strict";MC();HC();zC()});var Hu=l(()=>{"use strict";te();Ve();DS();kS()});var xo,$u,Fu=l(()=>{"use strict";Hu();xo=(e=20)=>ko(e),$u=Ou});var zu,Io,Uu,Bu=l(()=>{"use strict";Hu();zu=on,Io=(e=20)=>tn(e),Uu=e=>nn(e)});var Gu,HS=l(()=>{"use strict";Hu();Gu=()=>ju()});var UC=l(()=>{"use strict";Jh();Dy();cS();CS();Fu();Bu();HS()});var BC={};St(BC,{buildAgentWitchAutomationStatusFromWakeServer:()=>Gi,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>zu,buildAgentWitchWakeHealthResponse:()=>Ai,buildAgentWitchWakeIdentityResponse:()=>bi,buildAgentWitchWatchdogStatus:()=>$u,installHarnessFromWakeServer:()=>Ii,readAgentWitchSelfUpdateLogEntries:()=>Io,readAgentWitchWatchdogLogEntries:()=>xo,restartAgentWitchFromWakeServer:()=>ea,reviveAgentWitchWebSocketFromWakeServer:()=>Qi,runAgentWitchSelfUpdateFromWakeServer:()=>Uu,runAgentWitchUninstallLocalFromWakeServer:()=>Gu,runAutomationFromWakeServer:()=>Bi,syncAutomationsFromWakeServer:()=>Ui,wakeAgentWitchLaunchAgents:()=>Zi});var GC=l(()=>{"use strict";UC()});var VC,qC,$S,FS,KC=l(()=>{"use strict";VC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),qC=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?VC(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?VC(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},$S=e=>{let t=e.watchdogLogs.map(qC).join(""),r=e.updateLogs.map(qC).join("");return`<!doctype html>
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
</html>`},FS=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var JC,YC,XC=l(()=>{"use strict";JC=m(require("node:net")),YC=()=>new Promise((e,t)=>{let r=JC.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var ZC,uV,zS,QC=l(()=>{"use strict";ZC=m(require("node:net"));XC();Si();yi();We();uV=e=>new Promise(t=>{let r=ZC.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),zS=async()=>{let e=E(),t=ct();if(await uV(t))return qE(t),t;let r=await YC();return Dd(e,r),r}});var pV,US,eT=l(()=>{"use strict";pV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),US=e=>({force:pV(e)&&e.force===!0})});var ta=l(()=>{"use strict";Ti();KC();QC();eT();kf();gd();ro()});var BS,j,GS,VS,ra,tT=l(()=>{"use strict";BS=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},GS=e=>{e.writeHead(403),e.end()},VS=e=>e.url?.split("?")[0]??"/",ra=(e,t,r=20,n=200)=>{let o=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(o.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,n):r}});var pt=l(()=>{"use strict";tT()});var mV,rT,nT=l(()=>{"use strict";cS();pt();mV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},rT=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,Gi(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await mV(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let n=Ui(t);return j(e.response,n.ok?200:400,n,e.cors.headers),!0}let r=await Bi(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var gV,sT,oT,iT,qS,aT,KS=l(()=>{"use strict";gV=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],sT=e=>/embed|minilm|^bge-/i.test(e),oT=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),iT=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),qS=e=>e.filter(t=>t.trim().length>0&&!sT(t)),aT=(e,t)=>{let r=e.filter(o=>o.trim().length>0&&!sT(o)),n=t?.trim()??"";if(n.length>0){let o=r.find(s=>oT(s,n));if(o!==void 0)return o}for(let o of gV){let s=r.find(i=>oT(i,o));if(s!==void 0)return s}return r[0]??null}});var JS,dT,uT,Vu,pT,lT,cT,fV,hV,yV,SV,AV,bV,mt,na=l(()=>{"use strict";JS=require("node:child_process"),dT=m(require("node:fs")),uT=m(require("node:os")),Vu=m(require("node:path"));Ve();lt();KS();pT=3e3,lT=["claude-cli","codex","cursor","antigravity"],cT={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},fV=(e,t)=>new Promise(r=>{let n=(0,JS.spawn)(e,[...t],{stdio:"ignore"}),o=setTimeout(()=>{n.kill("SIGTERM"),r(!1)},pT);n.on("error",()=>{clearTimeout(o),r(!1)}),n.on("close",s=>{clearTimeout(o),r(s===0)})}),hV=()=>{let e=uT.default.homedir();return["ollama",Vu.default.join(e,".local","bin","ollama"),Vu.default.join(e,".agent-witch","ollama","ollama"),Vu.default.join(e,".local-agent-witch","ollama","ollama")]},yV=e=>new Promise(t=>{let r=(0,JS.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),n=[],o=setTimeout(()=>{r.kill("SIGTERM"),t(null)},pT);r.stdout.on("data",s=>{n.push(s)}),r.on("error",()=>{clearTimeout(o),t(null)}),r.on("close",s=>{if(clearTimeout(o),s!==0){t(null);return}t(iT(Buffer.concat(n).toString("utf8")))})}),SV=async()=>{for(let e of hV()){if(e!=="ollama"&&!dT.default.existsSync(e))continue;let t=await yV(e);if(t!==null)return t}return[]},AV=e=>{let t=e.installedWriterIds.map(s=>cT[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,n=se(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${cT[e.writerAgent]} is not installed.`:"",o=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[n,r,o].filter(s=>s.length>0).join(" ")},bV=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:lo},mt=async e=>{let t=lT.map(i=>{let a=vd(i,e.commands);return fV(a.command,a.args)}),[r,...n]=await Promise.all([SV(),...t]),o=lT.flatMap((i,a)=>n[a]===!0?[i]:[]),s=aT(r,bV());return{ollamaModels:r,estimateModel:s,installedWriterIds:o,capabilityNote:AV({writerAgent:e.writerAgent??"",installedWriterIds:o,estimateModel:s})}}});var PV,wV,YS,mT=l(()=>{"use strict";PV="http://127.0.0.1:11434",wV=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},YS=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||PV;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return n.ok?wV(await n.json()):null}catch{return null}}});var XS=l(()=>{"use strict";lt();na();mT();KS()});var _V,gT,fT=l(()=>{"use strict";XS();_V={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},gT=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:_V[t]})),ollamaModels:qS(e.ollamaModels)})});var vV,hT,yT=l(()=>{"use strict";XS();pt();fT();vV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},hT=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await mt({commands:ie({})});return j(e.response,200,{ok:!0,...gT({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await vV(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",n=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",o=await YS({model:r,prompt:n});return o===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:o},e.cors.headers),!0)}return!1}});var WV,ST,AT=l(()=>{"use strict";Dy();pt();WV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},ST=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await WV(e);if(t===null)return!0;let r=Ii(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var bT=l(()=>{"use strict";ut()});var ZS,PT=l(()=>{"use strict";bT();xi();ZS=e=>{if(!qt(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Ue({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var wT,QS,eA=l(()=>{"use strict";ae();ut();xi();wT=e=>{if(!qt(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},QS=async e=>{let t=wT(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=vr("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let n=F();if(n===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let o=Z({wsUrl:n.wsUrl,pairingToken:n.pairingToken});return o===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Ue({projectFolderPath:r}),await Hi(o,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var _T=l(()=>{"use strict";PT();eA()});var vT,WT=l(()=>{"use strict";_T();eA();pt();vT=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=ZS(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await QS(t),n=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,n,r,e.cors.headers),!0}return!1}});var LT,ET=l(()=>{"use strict";ta();Bu();Fu();LT=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=xo(50),r=Io(50);return e.response.writeHead(200,FS()),e.response.end($S({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var RT,kT=l(()=>{"use strict";Jh();pt();RT=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,Ai(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,bi(),e.cors.headers),!0):!1});var CT,TT=l(()=>{"use strict";HS();pt();CT=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Gu();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var xT,IT=l(()=>{"use strict";CS();pt();xT=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Qi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await ea();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Zi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var OT,MT=l(()=>{"use strict";ta();Bu();pt();OT=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=zu();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=ra(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:Io(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=US(t),n=await Uu({force:r});return j(e.response,n.ok?200:503,n,e.cors.headers),!0}return!1}});var NT,jT=l(()=>{"use strict";Fu();pt();NT=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await $u();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=ra(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:xo(t)},e.cors.headers),!0}return!1}});var DT,HT=l(()=>{"use strict";nT();yT();AT();WT();ET();kT();TT();IT();MT();jT();DT=[RT,LT,NT,xT,OT,CT,ST,vT,rT,hT]});var $T,FT=l(()=>{"use strict";HT();$T=async e=>{for(let t of DT)if(await t(e))return!0;return!1}});var LV,zT,UT=l(()=>{"use strict";Ti();pt();FT();LV=(e,t,r,n)=>({request:e,response:t,wakePort:r,cors:n,pathname:VS(e),readJsonBody:()=>BS(e)}),zT=async(e,t,r)=>{let n=e.headers.origin,o=gu(n);try{if(n!==void 0&&n.length>0&&!o.allowed){GS(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=LV(e,t,r,o);if(await $T(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}}});var BT,bn,qu,Ku=l(()=>{"use strict";BT=m(require("node:http"));ta();UT();bn=async()=>{let e=await zS(),t=BT.default.createServer((r,n)=>{zT(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},qu=bn});var GT={};St(GT,{runAgentWitchBridgeCli:()=>EV});var EV,VT=l(()=>{"use strict";te();Ku();EV=async()=>{Fe("agent-witch-bridge");let e=await bn(),t=$t(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var qT=l(()=>{"use strict";Ut()});var Oo,tA,KT=l(()=>{"use strict";Oo=(e,t,r)=>e===1?t:r,tA=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${Oo(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Oo(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${Oo(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Oo(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Oo(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${Oo(p,"year","years")} ago`}});var Pn,rA,RV,kV,nA,Wr,oa,oA,JT=l(()=>{"use strict";Pn=m(require("node:fs")),rA=m(require("node:path")),RV="local-ws-traffic.ndjson",kV=500,nA=e=>rA.default.join(e.logsDir,RV),Wr=(e,t)=>{let r=nA(e);Pn.default.mkdirSync(rA.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Pn.default.appendFileSync(r,`${n}
`,"utf8")},oa=(e,t=kV)=>{let r=nA(e);if(!Pn.default.existsSync(r))return[];let o=Pn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},oA=e=>{let t=nA(e);Pn.default.existsSync(t)&&Pn.default.writeFileSync(t,"","utf8")}});var CV,YT,XT,ZT=l(()=>{"use strict";NS();CV=new Set(Object.values(OS)),YT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),XT=e=>{if(!YT(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!CV.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!YT(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var QT,ex=l(()=>{"use strict";QT=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var TV,xV,IV,sa,tx=l(()=>{"use strict";ex();TV=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,xV=e=>TV.test(e),IV=e=>QT(e),sa=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>sa(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&xV(n)){r[n]=IV(o);continue}r[n]=sa(o)}return r}});var Lt,sA,OV,MV,NV,iA,rx,nx,ox,jV,Ju,wn,Yu,aA,sx=l(()=>{"use strict";Lt=m(require("node:fs")),sA=m(require("node:path"));ZT();tx();OV="local-ws-trace.ndjson",MV=1e4,NV=1440*60*1e3,iA=e=>sA.default.join(e.logsDir,OV),rx=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},nx=e=>{if(!Lt.default.existsSync(e))return;let t=Lt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-NV,o=t.filter(s=>{let i=rx(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-MV);Lt.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},ox=(e,t)=>{let r=iA(e);Lt.default.mkdirSync(sA.default.dirname(r),{recursive:!0}),Lt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),nx(r)},jV=e=>e.parsed===null?{_empty:!0}:sa(e.parsed),Ju=(e,t,r)=>{let n=XT(r);ox(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:jV(n)})},wn=(e,t)=>{ox(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:sa({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Yu=(e,t=80)=>{let r=iA(e);if(nx(r),!Lt.default.existsSync(r))return[];let n=Lt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let i=rx(s);i!==null&&o.push(i)}return o.reverse()},aA=e=>{let t=iA(e);Lt.default.existsSync(t)&&Lt.default.writeFileSync(t,"","utf8")}});var Lr,ix,DV,lA,Xu,ax=l(()=>{"use strict";Lr=m(require("node:fs")),ix=m(require("node:path")),DV=256e3,lA=e=>{Lr.default.mkdirSync(ix.default.dirname(e),{recursive:!0}),Lr.default.writeFileSync(e,"","utf8")},Xu=(e,t=DV)=>{if(!Lr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Lr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=Lr.default.openSync(e,"r");try{Lr.default.readSync(a,i,0,s,o)}finally{Lr.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var ia=l(()=>{"use strict";JT();sx();ax()});var cA,dA,lx=l(()=>{"use strict";cA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dA=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",n=e.exists&&e.content.length>0?`<pre class="error-log-view">${cA(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${cA(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${cA(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${n}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var cx=l(()=>{"use strict";lx()});var uA,pA=l(()=>{"use strict";uA=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var mA=l(()=>{"use strict";Vi()});var gA,fA,dx=l(()=>{"use strict";mA();gA=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e);return Number.isNaN(n)?!0:r-n>t},fA=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var ux=l(()=>{"use strict";pA();dx()});var px,aa,hA,la=l(()=>{"use strict";pA();px=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aa=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=px(e),r=px(uA(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},hA=`(function () {
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
})();`});var _n,HV,yA,mx=l(()=>{"use strict";_n=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HV=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},yA=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${_n(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?_n(r.direction):_n(r.kind),i=`trace-body-${n}`,a=_n(HV(r.body));return`<tr>
        <td title="${_n(r.at)}">${_n(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${_n(r.command)}</code></td>
        <td>${o}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var fx,gx,SA,hx=l(()=>{"use strict";fx=m(require("node:path"));B();Ut();gx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SA=e=>{let t=re(e.installDir),n=`AW_HOME="$HOME/${fx.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${gx(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${gx(n)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var yx=l(()=>{"use strict";la();mx();hx();la()});var $V,Jt,ca=l(()=>{"use strict";$V=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Jt=$V});var Sx,Ax,bx,Px,wx,_x,vx,Mo=l(()=>{"use strict";Sx="projects",Ax="knowledge",bx="chunks.ndjson",Px="lessons.ndjson",wx="error-chunks.ndjson",_x="usage-stats.json",vx="knowledge-location.json"});var Zu,FV,Qu,AA=l(()=>{"use strict";Zu=m(require("node:path"));Mo();FV=(e,t)=>{let r=t.trim(),n=Zu.default.join(e.installDir,Sx,r,Ax);return{projectId:r,knowledgeDirPath:n,ragChunksFilePath:Zu.default.join(n,bx),memoryRunsFilePath:Zu.default.join(n,Px)}},Qu=FV});var bA,zV,Wx,Lx=l(()=>{"use strict";bA=m(require("node:fs"));Mo();dn();zV=e=>{let t=Ke(e.projectFolderPath),r=`${t.metaDirPath}/${vx}`,n={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};bA.default.mkdirSync(t.metaDirPath,{recursive:!0}),bA.default.writeFileSync(r,`${JSON.stringify(n,null,2)}
`)},Wx=zV});var No,Rx,Ex,UV,kx,Cx=l(()=>{"use strict";No=m(require("node:fs")),Rx=m(require("node:path"));Yr();dn();AA();Lx();Ex=(e,t)=>{No.default.existsSync(e)&&(No.default.existsSync(t)&&No.default.statSync(t).size>0||(No.default.mkdirSync(Rx.default.dirname(t),{recursive:!0}),No.default.copyFileSync(e,t)))},UV=e=>{let t=Ke(e.projectFolderPath),r=Qu(e.layout,e.projectId),n=`${t.memoryDirPath}/${eo}`;Ex(t.ragChunksFilePath,r.ragChunksFilePath),Ex(n,r.memoryRunsFilePath),Wx({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},kx=UV});var PA,BV,Tx,xx=l(()=>{"use strict";PA=m(require("node:fs"));dn();BV=e=>{let t=Ke(e);if(!PA.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(PA.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let n=r;return{projectId:typeof n.projectId=="string"&&n.projectId.trim().length>0?n.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Tx=BV});var Ix,GV,jo,ep=l(()=>{"use strict";Ix=m(require("node:path"));Yr();dn();Cx();xx();AA();GV=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Tx(t),n=e.projectId?.trim()||r.projectId?.trim()||"";if(n.length>0){kx({layout:e.layout,projectFolderPath:t,projectId:n});let s=Qu(e.layout,n);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:n}}let o=Ke(t);return{ragChunksFilePath:o.ragChunksFilePath,memoryRunsFilePath:Ix.default.join(o.memoryDirPath,eo),projectId:null}},jo=GV});var tp,qV,rp,wA=l(()=>{"use strict";tp=m(require("node:fs"));Mo();qV=(e,t=500)=>{if(!tp.default.existsSync(e))return;let r=tp.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let n=r.slice(r.length-t);tp.default.writeFileSync(e,`${n.join(`
`)}
`)},rp=qV});var np,KV,vn,_A=l(()=>{"use strict";np=m(require("node:path"));Mo();ep();KV=e=>{let t=jo(e);if(t===null)return null;let r=np.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:np.default.join(r,_x),errorChunksFilePath:np.default.join(r,wx)}},vn=KV});var Mx,da,Nx,Ox,vA,jx,XV,WA,Dx,LA,EA,RA,kA=l(()=>{"use strict";Mx=require("node:crypto"),da=m(require("node:fs")),Nx=m(require("node:path"));ca();Mo();_A();Ox=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),vA=e=>{if(!da.default.existsSync(e))return Ox();try{let t=JSON.parse(da.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return Ox()},jx=(e,t)=>{da.default.mkdirSync(Nx.default.dirname(e),{recursive:!0}),da.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},XV=e=>{let t=Jt(e).trim(),n=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,Mx.createHash)("sha256").update(n).digest("hex").slice(0,16)},WA=e=>{let t=vn(e);return t===null?null:vA(t.usageStatsFilePath)},Dx=e=>{if(e.chunkIds.length===0)return;let t=vn(e);if(t===null)return;let r=vA(t.usageStatsFilePath),n={...r.chunkRetrievalCounts};for(let o of e.chunkIds)n[o]=(n[o]??0)+1;jx(t.usageStatsFilePath,{...r,chunkRetrievalCounts:n})},LA=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=vn(e);if(r===null)return null;let n=XV(t),o=vA(r.usageStatsFilePath),s=o.errorOccurrences[n],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return jx(r.usageStatsFilePath,{...o,errorOccurrences:{...o.errorOccurrences,[n]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),n},EA=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,RA=e=>{if(e===null)return[];let t=[];for(let[r,n]of Object.entries(e.chunkRetrievalCounts))n<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:n,chunkId:r,message:`Knowledge chunk "${r}" was injected ${n} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,n]of Object.entries(e.errorOccurrences))n.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:n.count,errorFingerprint:r,message:`Error "${n.preview}" occurred ${n.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:n.count,errorFingerprint:r,message:`Same error (${n.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,n)=>r.priority-n.priority||n.hitCount-r.hitCount)}});var ua,Hx,ZV,QV,$x,eq,CA,pa,Do,TA,Ho,xA,IA=l(()=>{"use strict";ua=m(require("node:fs")),Hx=m(require("node:path"));ca();ep();wA();kA();ZV="http://127.0.0.1:11434",QV="nomic-embed-text",$x=(e,t,r)=>jo({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,eq=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},CA=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},pa=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||ZV,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||QV;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},Do=(e,t,r)=>{let n=$x(e,t,r);if(n===null||!ua.default.existsSync(n))return[];let o=ua.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},TA=async e=>{let t=Jt(e.text),r=CA(t);if(r.length===0)return 0;let n=$x(e.layout,e.projectFolderPath,e.projectId);if(n===null)return 0;ua.default.mkdirSync(Hx.default.dirname(n),{recursive:!0});let o=0;for(let s of r){let i=await pa(s);if(i===null)continue;let a={id:`${Date.now()}-${o}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};ua.default.appendFileSync(n,`${JSON.stringify(a)}
`,"utf8"),o+=1}return rp(n),o},Ho=async e=>{let t=await pa(e.query);if(t===null)return[];let r=e.minScore??0,s=Do(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:eq(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return Dx({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},xA=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var ma,Fx,tq,rq,OA,MA,NA,zx=l(()=>{"use strict";ma=m(require("node:fs")),Fx=m(require("node:path"));ca();_A();wA();IA();tq=e=>{if(!ma.default.existsSync(e))return[];let t=ma.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let n of t)try{r.push(JSON.parse(n))}catch{}return r},rq=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},OA=async e=>{let t=vn(e);if(t===null)return 0;let r=Jt(e.text),n=CA(r,600);if(n.length===0)return 0;let o=t.errorChunksFilePath;ma.default.mkdirSync(Fx.default.dirname(o),{recursive:!0});let s=0;for(let i of n.slice(0,3)){let a=await pa(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};ma.default.appendFileSync(o,`${JSON.stringify(c)}
`,"utf8"),s+=1}return rp(o,200),s},MA=async e=>{let t=vn(e);if(t===null)return[];let r=await pa(e.query);if(r===null)return[];let n=e.minScore??.3;return tq(t.errorChunksFilePath).map(s=>({chunk:s,score:rq(r,s.embedding)})).filter(s=>s.score>=n).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},NA=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var jA=l(()=>{"use strict";IA();kA();zx()});var DA,Ux=l(()=>{"use strict";DA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var Bx=l(()=>{"use strict";Ux()});var me,HA,$A=l(()=>{"use strict";Bx();me=DA,HA=`
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
  padding-bottom: 0.75rem;
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
  gap: 0.65rem;
  margin-top: 1.25rem;
  padding: 1rem 0 0.5rem;
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
.sdlc-submit {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 0.65rem 0.75rem;
}
.sdlc-submit .btn-primary { min-width: 8.5rem; }
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
`.trim()});var nq,oq,FA,Gx,zA,Vx=l(()=>{"use strict";$A();la();nq=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,oq=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],FA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gx=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${nq}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,zA=e=>{let t=oq.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=FA(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"",o=FA(e.installBundleVersionLabel?.trim()??"unknown"),s=Gx("brand brand-in-sidebar",o),i=Gx("brand brand-in-header",o);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${FA(e.title)} \xB7 Agent Witch Local</title>
  <style>${HA}</style>
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
  <script>${hA}</script>
</body>
</html>`}});var op,ga,sp=l(()=>{"use strict";op=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ga=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${op(e.syncMessage)}</p>`:"",n=op(e.manageHref),o=op(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${op(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${n}" target="_blank" rel="noopener noreferrer">${o} \u2197</a></p>
    </div>`}});var UA,BA,GA,qx=l(()=>{"use strict";UA=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,BA=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,GA=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Kx=l(()=>{"use strict";Vx();sp();qx()});var $o,VA,Jx=l(()=>{"use strict";la();$o=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VA=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${$o(e.wakeError)}</div>`:"",a=aa(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
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
    </div>`}});var Yx=l(()=>{"use strict";Jx()});var k,ip=l(()=>{"use strict";k=e=>e==="passed"||e==="stopped"||e==="failed"});var Xx,qA,Wn,KA,fa=l(()=>{"use strict";Xx="Stopped at the round limit. The best prompt is kept.",qA="Stopped because the score stopped rising. The best prompt is kept.",Wn="Finished. The best prompt is the result.",KA="Wizard ended. Progress from finished steps is kept."});var ha,JA=l(()=>{"use strict";ha=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],n=e.instructions?.trim()??"",o=n.length===0?[]:["","Instructions:",n];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...o,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",n.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var sq,iq,ya,Zx,ap=l(()=>{"use strict";sq=/\n+|;\s+/,iq=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,ya=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let n=r.split(sq).map(o=>o.replace(/^[-*]\s*/,"").trim()).filter(o=>o.length>0).reduce((o,s)=>{if(t.length+o.length>=12)return o;let i=s.toLowerCase();return[...t,...o].some(c=>c.toLowerCase()===i)?o:[...o,iq(s)]},[]);return[...t,...n]},[]),Zx=e=>{let t=ya(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var Ae,Sa=l(()=>{"use strict";Ae=e=>{let t=e.flatMap(o=>o.score===null?[]:[{roundNumber:o.roundNumber,promptText:o.promptText,score:o.score,reasons:o.reasons}]),[r,...n]=t;return r===void 0?null:n.reduce((o,s)=>s.score>o.score||s.score===o.score&&s.roundNumber>o.roundNumber?s:o,r)}});var Aa,YA=l(()=>{"use strict";ap();Sa();Aa=e=>{let t=[...e.priorRounds,e.current],r=Ae(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},n=[...t].filter(o=>o.score<r.score).sort((o,s)=>s.roundNumber-o.roundNumber).map(o=>o.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:Zx(n)}}});var XA,aq,lq,Qx,e0=l(()=>{"use strict";XA={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},aq=e=>{try{let t=JSON.parse(e.fragment);return{...XA,objects:[...e.objects,t]}}catch{return{...XA,objects:e.objects}}},lq=(e,t)=>{if(e.inString){let n=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:n}:t==="\\"?{...e,escaped:!0,fragment:n}:t==='"'?{...e,inString:!1,fragment:n}:{...e,fragment:n}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:aq(r)},Qx=e=>[...e].reduce(lq,XA).objects});var cq,ZA,dq,t0,QA=l(()=>{"use strict";e0();cq=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},ZA=e=>{let t=Qx(e).filter(cq),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},dq=(e,t)=>({...e,passed:e.score>=t}),t0=(e,t)=>{let r=ZA(e);return r===null?null:dq(r,t)}});var eb,tb,lp=l(()=>{"use strict";eb="The judge reply needs a score and a reason.",tb="The improver reply was empty."});var r0,n0=l(()=>{"use strict";r0=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((n,o)=>o>n.best?{best:o,stall:0}:{best:n.best,stall:n.stall+1},{best:t,stall:0}).stall}});var o0,s0=l(()=>{"use strict";o0=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((n,o)=>o.score>n.best?{best:o.score,reasons:[]}:{best:n.best,reasons:[...n.reasons,o.reasons]},{best:t.score,reasons:[]}).reasons}});var pq,i0,a0=l(()=>{"use strict";n0();s0();fa();ap();pq=e=>{let t=ya(e);return t.length===0?qA:`${qA} Avoid: ${t.join("; ")}.`},i0=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:Xx};if(r0(e.scores)>=3){let t=e.scores.map((r,n)=>({score:r,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:pq(o0(t))}}return null}});var Er,mq,rb,l0,cp=l(()=>{"use strict";Er=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},mq=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,rb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",mq(e.tokens),`Delay: ${Er(e.delayMs)}`,"",n,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},l0=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var gq,c0,d0=l(()=>{"use strict";QA();gq=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,c0=e=>{let r=(gq.exec(e)?.[1]??e).trim();return r.length===0||ZA(r)!==null?null:r}});var u0,dp,p0=l(()=>{"use strict";cp();d0();lp();u0=e=>({type:"call",role:"judge",choice:e.choice,prompt:l0({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),dp=e=>{let t=c0(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:tb}}:{nextPrompt:t,continuation:u0({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var nb,m0=l(()=>{"use strict";JA();YA();QA();lp();fa();a0();lp();p0();nb=e=>{let t=t0(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:eb}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],n=e.round??r.length,o=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=i0({scores:o.map(a=>a.score),reasons:o.map(a=>a.reasons),round:n,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=Aa({current:{roundNumber:n,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:ha({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var ba,ob=l(()=>{"use strict";ba=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var g0=l(()=>{"use strict"});var f0=l(()=>{"use strict"});var Pa,up=l(()=>{"use strict";Pa=e=>{let t=e.trim(),n=t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t,o=n.indexOf("{"),s=n.lastIndexOf("}");if(o===-1||s<=o)throw new Error("No JSON object in reply.");return JSON.parse(n.slice(o,s+1))}});var h0=l(()=>{"use strict";fa();up()});var y0=l(()=>{"use strict"});var S0=l(()=>{"use strict";y0()});var ib,A0=l(()=>{"use strict";ib=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",n,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var fq,ab,b0=l(()=>{"use strict";cp();fq=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,ab=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",fq(e.tokens),`Delay: ${Er(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var hq,yq,Sq,lb,P0=l(()=>{"use strict";hq=/[A-Za-z0-9_./~-]{3,180}/g,yq=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,Sq=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||yq.test(t)},lb=(e,t=12)=>{let r=[];for(let n of e.matchAll(hq)){let o=n[0].replace(/\.+$/,"");if(!(!Sq(o)||r.includes(o))&&(r.push(o),r.length>=t))break}return r}});var wa,w0=l(()=>{"use strict";wa=(e,t)=>e.flatMap(r=>{let n=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||n.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:n}]}).sort((r,n)=>r.roundNumber-n.roundNumber)});var pp,cb,_0,db,ub=l(()=>{"use strict";pp=e=>Math.floor(e/2),cb=e=>Math.max(pp(e)+1,e-20),_0=(e,t)=>e>=t?"passes":e>=cb(t)?"close":e>=pp(t)?"weak":"bad",db=e=>[{band:"bad",label:`0\u2013${pp(e)-1} bad`},{band:"weak",label:`${pp(e)}\u2013${cb(e)-1} weak`},{band:"close",label:`${cb(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var mp,pb=l(()=>{"use strict";ub();mp=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",n=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${_0(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),o=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...n,...o]}});var v0,W0=l(()=>{"use strict";v0=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var L0,E0=l(()=>{"use strict";L0=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var Aq,bq,R0,k0=l(()=>{"use strict";ip();pb();W0();E0();Aq=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],bq=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",R0=e=>{let t=e.wizard;if(t===void 0)return[];let r=v0(t),n=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),o=e.status==="wizard_paused",s=t.phase==="complete",i=Aq.map((p,g)=>{let b=!s&&!o&&g===r?"active":"done";return{id:`wizard-${g+1}`,label:p,state:b,detail:null}}).filter((p,g)=>s?!0:g<=n),a=o&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=L0(t)&&(!o||a)?mp(e):[],d=k(e.status)&&!s?[{id:"end",label:bq(e),state:"done",detail:e.errorMessage}]:[];return[...i,...c,...d]}});var Pq,mb,C0=l(()=>{"use strict";ip();pb();k0();Pq=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",mb=e=>{if(e.wizard!==void 0)return R0(e);let t=mp(e),r=k(e.status)?[{id:"end",label:Pq(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var T0=l(()=>{"use strict";Ut()});var x0,_a,va,zo,gp,gb,I0=l(()=>{"use strict";T0();x0="/prompt-optimizer/agent",_a=`${zt}${x0}`,va=`${zt}/prompt-optimizer`,zo="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",gp=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${zo}`,gb="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Rr=l(()=>{"use strict"});var fb,O0=l(()=>{"use strict";fb="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var M0,N0=l(()=>{"use strict";M0=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Wa,D0=l(()=>{"use strict";N0();Rr();Wa=e=>({schemaVersion:3,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:M0(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{}})});var hb,H0=l(()=>{"use strict";hb=e=>({...e,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null}))})});var yb,$0=l(()=>{"use strict";Rr();yb=(e,t,r)=>{let n=r.trim();if(n.length===0)return e;let o=e.avoidByStep[t]??[],s=[n,...o].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var F0,Sb,z0=l(()=>{"use strict";F0=["generalize","evaluate","separate","optimize_modules"],Sb=(e,t)=>{let r=F0.indexOf(t);if(r===-1)return e;let n=F0.slice(r+1);return n.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:n.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:n.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:n.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:n.includes("separate")?null:e.selectedSplitTopology,modules:n.includes("optimize_modules")?[]:e.modules,currentModuleIndex:n.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:n.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var fp,Ab=l(()=>{"use strict";ap();fp=e=>{let t=ya(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var bb,U0=l(()=>{"use strict";Ab();bb=e=>{let t=fp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,n,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(o=>o.length>0).join(`
`)}});var _q,vq,Wq,B0,G0=l(()=>{"use strict";_q=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),vq=/^\{\{[a-zA-Z0-9_-]+\}\}$/,Wq=(e,t)=>{let{masked:r,tokens:n}=t.reduce((o,s)=>{let i=s.sampleValue.trim();if(i.length===0)return o;let a=new RegExp(_q(i),"g"),c=[...o.tokens];return{masked:o.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return n.reduce((o,s,i)=>o.replace(`\0PO${i}\0`,s),r)},B0=(e,t)=>{let r=[...t].sort((o,s)=>s.sampleValue.length-o.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(o=>vq.test(o)?o:Wq(o,r)).join("")}});var Pb,V0=l(()=>{"use strict";G0();Pb=(e,t)=>e.map(r=>({...r,modules:r.modules.map(n=>({...n,prompt:B0(n.prompt,t)}))}))});var Lq,_b,q0=l(()=>{"use strict";Rr();Ab();Lq=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),_b=e=>{let t=fp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,o=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=Lq(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",o,r,n,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var vb,K0=l(()=>{"use strict";ob();vb=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",n=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),o=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...n,s].filter(a=>a.length>0).join(`
`);return ba({promptText:e.promptText,instructions:`${i}${o.join(`
`)}`})}});var La,Wb=l(()=>{"use strict";Sa();La=e=>{let t=e.revisions.map(o=>({roundNumber:o.roundNumber,score:o.judgement?.score??null,passed:o.judgement?.passed??null,runOutput:o.run?.output??null,tokens:o.run?.tokens??null})),r=Ae(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null}))),n=r===null?null:e.revisions.find(o=>o.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:n?.run?.output??null,rounds:t}}});var Lb,J0=l(()=>{"use strict";Wb();Lb=e=>{let t=La({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((n,o)=>o===e.moduleIndex?{...n,status:r,selectedRevisionRound:t.bestRound,statistics:t}:n)}}});var Ea,Y0=l(()=>{"use strict";Ea=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let n=r.statistics?.bestRunOutput?.trim()??"";return n.length>0?{output:n,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var Eq,Rq,ge,Eb=l(()=>{"use strict";Rr();Eq=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let n=r.rounds.reduce((o,s)=>o+(s.tokens??0),0);return n>0?n:null},Rq=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,ge=e=>{let t=e.modules.map((s,i)=>({moduleId:s.moduleId,title:s.title,bestScore:s.statistics?.bestScore??null,tokens:Eq(e,i),status:s.status})),r=t.length,n=t.filter((s,i)=>Rq(e.modules[i])).length,o=r>0&&n===r?"passed":"stopped";return{passedModuleCount:n,totalModules:r,terminalStatusSuggestion:o,rows:t}}});var Rb,X0=l(()=>{"use strict";Rr();Eb();Rb=e=>{let t=ge(e.wizard),r=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${70})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&r.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,o)=>{let s=n.statistics?.bestRunOutput?.trim();s===void 0||s.length===0||r.push("",`## Module ${o+1}: ${n.title}`,"","```",s,"```")}),`${r.join(`
`)}
`}});var kb,Z0=l(()=>{"use strict";kb=e=>{let t=e.modules.reduce((r,n)=>{let o=n.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+o},0);return t>0?t:null}});var gt,kq,Cb,Q0=l(()=>{"use strict";gt=m(Es());up();kq=(0,gt.isType)({name:gt.isNonEmptyString,description:gt.isString,sampleValue:gt.isString}),Cb=e=>{let t=Pa(e);if(!(0,gt.isType)({templatedPrompt:gt.isNonEmptyString,variables:(0,gt.isArrayWithEachItem)(kq)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ne,Cq,Tq,Tb,eI=l(()=>{"use strict";ne=m(Es());Rr();up();Cq=(0,ne.isType)({id:ne.isNonEmptyString,title:ne.isNonEmptyString,prompt:ne.isNonEmptyString,order:ne.isNumber}),Tq=(0,ne.isType)({id:ne.isNonEmptyString,title:ne.isNonEmptyString,summary:ne.isString,topology:(0,ne.isOneOf)("chain","parallel"),modules:(0,ne.isArrayWithEachItem)(Cq),recommended:ne.isBoolean}),Tb=e=>{let t=Pa(e);if(!(0,ne.isType)({options:(0,ne.isArrayWithEachItem)(Tq)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),n=r.filter(o=>o.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return n!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Uo,tI=l(()=>{"use strict";Uo=e=>{let t=e.wizard.attempts.filter(n=>n.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var xq,Ra,xb=l(()=>{"use strict";xq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ra=(e,t)=>{let r=new Map(t.map(n=>[n.name,n.sampleValue]));return e.replace(xq,(n,o)=>{let s=r.get(o);return s===void 0?n:s})}});var ka,Ca,rI=l(()=>{"use strict";Sa();xb();ka=e=>Ra(e.templatedPrompt,e.variables),Ca=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(n=>n.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return Ae(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??ka(e.wizard)}});var Iq,Ta,nI=l(()=>{"use strict";Iq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ta=(e,t)=>e.replace(Iq,(r,n)=>{let o=t[n];return o===void 0||o.trim()===""?r:o})});var Oq,xa,Ib=l(()=>{"use strict";Oq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,xa=e=>{let t=new Set,r=[];for(let n of e.matchAll(Oq)){let o=n[1];t.has(o)||(t.add(o),r.push(o))}return r}});var Ia,Ln,oI=l(()=>{"use strict";Ia=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Ln=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var Mq,hp,Ob,sI=l(()=>{"use strict";Ib();Mq="wizardParam_",hp=e=>`${Mq}${e}`,Ob=e=>{let t=xa(e.modulePrompt),r={...e.wizard.parameterValues},n=new Set(e.wizard.variables.map(o=>o.name));for(let o of t){let s=hp(o),i=e.posted.get(s),a=i!==null?i.trim():r[o]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:n.has(o)?`Fill in {{${o}}} before running this module.`:`Fill in {{${o}}} (not listed in Step 1) before running this module.`};r[o]=a}return{ok:!0,parameterValues:r}}});var En,iI=l(()=>{"use strict";En=["generalize","evaluate","separate","optimize_modules"]});var C=l(()=>{"use strict";ip();fa();m0();JA();cp();ob();g0();f0();h0();S0();A0();b0();P0();YA();w0();Sa();C0();ub();I0();Rr();O0();D0();H0();$0();z0();U0();V0();q0();K0();Wb();J0();Y0();Eb();X0();Z0();Q0();eI();tI();rI();xb();nI();Ib();oI();sI();iI()});var Ma=l(()=>{"use strict";lt();na();Wd()});var Nq,cI,dI=l(()=>{"use strict";Ma();Nq=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,cI=e=>{let t=go(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(Nq)],n=r[r.length-1];if(n===void 0)return null;let o=Number(n[1])+Number(n[2]);return Number.isFinite(o)&&o>=1?o:null}});var jq,Dq,uI,Mb,Hq,$q,ft,pI,mI,kn=l(()=>{"use strict";Ma();dI();jq="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",Dq="The writer waited on terminal input and did not return a prompt.",uI=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Mb=e=>{let t=e.trim();if(t.length===0||t.length>=500||!uI.test(t))return null;let r=t.split(`
`).map(n=>n.trim()).find(n=>uI.test(n))??t;return r.length>280?`${r.slice(0,277)}...`:r},Hq=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},$q=e=>Mb(e.stdout)??Mb(e.stderr)??(Hq(e.replyFile)?Mb(e.replyFile):null),ft=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return jq;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?Dq:null},pI=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],mI=e=>{let t=e.replyFileText?.trim()??"",r=ft([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let n=$q({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(n!==null)return{ok:!1,errorMessage:n};let o=cI([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:o};if(e.writerAgent==="claude-cli"){let i=go(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:o}:{ok:!1,errorMessage:"The writer did not reply."}}});var Na,Nb=l(()=>{"use strict";Na=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var yp,Bo,jb=l(()=>{"use strict";Nb();yp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bo=e=>{let t=Na(e.cycle),r=e.cycle.wizard,o=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=o!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${yp(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let b=g.judgement?.score,h=b==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${b}`,y=g.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${yp(y)}</span>`;if(e.interactive){let S=e.selectedRound===g.roundNumber?" checked":"";return`<li><label><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${S}> ${yp(h)}</label>${u}</li>`}return`<li>${yp(h)}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var Db,gI,Sp,fI,Ap=l(()=>{"use strict";Db=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gI=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Db(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Db(t.prompt)}</pre></li>`).join("")}</ol>`,Sp=e=>gI([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),fI=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(o=>o.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Db(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${gI(t.modules.map(o=>({title:o.title,prompt:o.prompt})))}
  </section>`}});var ce,Fq,zq,Uq,Bq,Gq,Vq,Go,bp=l(()=>{"use strict";C();jb();Ap();ce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Fq=e=>{let t=e.wizard;if(t===void 0)return null;let n=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(n===void 0||typeof n.output!="object"||n.output===null)return null;let o=n.output.revisions;if(!Array.isArray(o))return null;let s=[];for(let i of o){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},zq=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.variables.length===0?'<p class="muted">No variables yet.</p>':`<ul class="sdlc-wizard-vars">${t.variables.map(a=>`<li><strong>{{${ce(a.name)}}}</strong> \u2014 ${ce(a.description)} (sample: ${ce(a.sampleValue)})</li>`).join("")}</ul>`,n=t.templatedPrompt.trim(),o=n.length===0?'<p class="muted">No templated prompt yet.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${ce(n)}</pre>`,s=Ra(t.templatedPrompt,t.variables).trim(),i=s.length===0||s===n?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${ce(s)}</pre>`;return`${r}${o}${i}`},Uq=(e,t)=>`<ul class="sdlc-wizard-revisions">${e.map(n=>{let o=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,s=t===n.roundNumber?" (selected)":"",i=n.reasons?.trim()??"",a=i.length===0?"":`<br><span class="muted">${ce(i)}</span>`;return`<li>${ce(o)}${s}${a}</li>`}).join("")}</ul>`,Bq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Bo({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let n=Fq(e);if(n!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${Uq(n,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Ca({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${ce(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${ce(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},Gq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let n=t.modules.map(o=>`<li><strong>${ce(o.title)}</strong> <span class="muted">(${ce(o.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${n}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(n=>{let o=n.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===n.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${ce(n.title)}</strong>${o}${ce(s)}<br><span class="muted">${ce(n.summary)} (${ce(n.topology)})</span>${Sp(n)}</li>`}).join("")}</ul>`},Vq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((o,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${ce(i)}</span> <strong>${ce(o.title)}</strong>${ce(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${ce(o.prompt)}</pre></li>`}).join(""),n=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Bo({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${n}`},Go=(e,t)=>{switch(t){case"wizard-1":return zq(e);case"wizard-2":return Bq(e);case"wizard-3":return Gq(e);case"wizard-4":return Vq(e);default:return""}}});var qq,hI,yI,SI=l(()=>{"use strict";C();kn();bp();qq=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},hI=(e,t,r,n)=>{let o=ft(t);return{title:e,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:n,promptText:o===null?t:null,promptNote:o,bodyHtml:null}},yI=(e,t)=>{if(t.id.startsWith("wizard-")){let o=Go(e,t.id);return{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:o.trim().length===0?null:o}}if(t.id==="end"){let o=Ae(e.revisions.map(s=>({roundNumber:s.roundNumber,promptText:s.promptText,score:s.judgement?.score??null,reasons:s.judgement?.reasons??null})));return o===null?{title:t.label,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:hI(t.label,o.promptText,o.score,o.reasons)}let r=t.id==="rewrite"?e.currentRound:qq(t.id),n=r===null?void 0:e.revisions.find(o=>o.roundNumber===r);return n===void 0?{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:hI(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail)}});var ja,AI,bI=l(()=>{"use strict";ja=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AI=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?'<p class="muted">Not scored yet.</p>':`<p class="muted">${ja(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,n=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${ja(e.feedback.trim())}</p>`,o=e.promptNote!==null?`<div class="alert-error">${ja(e.promptNote)}</div>`:e.promptText===null?"":`<h2>Saved prompt</h2><pre class="mono">${ja(e.promptText)}</pre>`;return`<h2>${ja(e.title)}</h2>${t}${r}${n}${o}`}});var Cn,Vo,Da=l(()=>{"use strict";Cn=e=>e.toLocaleString("en-US"),Vo=(e,t)=>e.revisions.reduce((r,n)=>t!==void 0&&n.roundNumber>t?r:r+(n.writerTokens??0)+(n.run?.tokens??0)+(n.judgement?.tokens??0),0)});var Pp,Kq,PI,wp,wI,_I,_p=l(()=>{"use strict";C();SI();bI();Da();Pp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Kq=(e,t)=>{let r=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',n=/^score-(\d+)$/.exec(e.id),o=e.state==="done"&&n!==null?Vo(t,Number(n[1])):0,s=o>0?`<span class="sdlc-node-reason">${Cn(o)} tokens so far</span>`:"",i=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Pp(e.detail)}</span>`:"",a=AI(yI(t,e)),c=t.wizard!==void 0&&t.wizard.phase==="complete"&&k(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Pp(e.id)}"`:"";return`<li class="sdlc-node sdlc-node-${e.state}"><button type="button" class="sdlc-node-open"${c} data-sdlc-node>${r}<span class="sdlc-node-label">${Pp(e.label)}${i}${s}</span></button><template>${a}</template></li>`},PI=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>Kq(r,t)).join("")}</ol>`,wp=e=>`<div class="sdlc-score" aria-label="What the score means">${db(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Pp(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,wI='<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog"><button class="btn btn-secondary" type="submit">Close</button></form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>',_I=`<script>
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
</script>`});var vp,Wp,Lp,vI,Hb=l(()=>{"use strict";vp="support-reply",Wp="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Lp=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),vI=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Ep,WI,LI=l(()=>{"use strict";C();_p();Hb();Ep=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WI=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>70</strong> and up to <strong>5</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>You set the pass score with the slider. The bar fades from a weak score to a pass. The mark is the usual ${90}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${wp(90)}
      <h2>Writers and folder</h2>
      <p>You choose the judge and the improver. Each one has an optional instructions field, used with the goal. Each round the judge runs the prompt in the folder you chose. If the prompt needs an input, put that input in the judge instructions. The judge then reads the git changes, or the files the prompt names, and scores those changes. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder. It does not guess a printed reply, and it does not score the prompt wording. A separate pass checks the tokens and suggests what to cut before the improver runs. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, and improver you last chose. The first visit uses your home directory and leaves the judge and improver blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot runs this loop itself before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a run in that folder. maxRounds is optional and defaults to 10. When only one writer is installed, that writer scores and rewrites. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${Ep(Wp)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Ep(Lp)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Ep(vI)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Ep(vp)}">Run this sample</a>
      </div>
    </section>`});var $b,Rp,Jq,EI,RI=l(()=>{"use strict";$b=m(require("node:fs")),Rp=m(require("node:path")),Jq=e=>Rp.default.join(Rp.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),EI=(e,t)=>{let r=Jq(e),n=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;$b.default.mkdirSync(Rp.default.dirname(r),{recursive:!0}),$b.default.appendFileSync(r,n,"utf8")}});var qo,kI,Yq,CI,Xq,TI,Et,J,xI,G,Je=l(()=>{"use strict";qo=m(require("node:fs")),kI=m(require("node:path"));C();RI();Yq=e=>e.wizard===void 0?e:{...e,wizard:hb(e.wizard)},CI=new Set,Xq=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),TI=(e,t)=>{qo.default.mkdirSync(kI.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;qo.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),qo.default.renameSync(r,e)},Et=e=>{if(!qo.default.existsSync(e))return[];try{let t=JSON.parse(qo.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(Xq).map(Yq):[]}catch{return[]}},J=(e,t)=>Et(e).find(r=>r.id===t)??null,xI=(e,t)=>{CI.add(t);let r=Et(e).filter(n=>n.id!==t);TI(e,r)},G=(e,t)=>{if(CI.has(t.id))return;let r=Et(e),n=r.some(o=>o.id===t.id)?r.map(o=>o.id===t.id?t:o):[t,...r];TI(e,n),EI(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var II,kp,Fb,Tn,zb,Rt,xn,ke,Ye=l(()=>{"use strict";II=m(require("node:fs")),kp=m(require("node:os")),Fb=m(require("node:path"));ut();Tn="~",zb=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Rt=e=>{let t=kp.default.homedir(),r=zb(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},xn=e=>{let t=e.trim().length===0?"~":e.trim(),r=qe(t),n=Fb.default.isAbsolute(r)?zb(r):zb(Fb.default.resolve(kp.default.homedir(),r));try{if(!II.default.statSync(n).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:n,display:Rt(n)}},ke=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:kp.default.homedir()});var Ko,kt,Ha,OI,Cp,Zq,MI,NI,jI,Ub=l(()=>{"use strict";Ko=m(require("node:fs")),kt=m(require("node:path")),Ha=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},OI=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Cp=(e,t)=>{let r=Ha(e);return r.length>0?r:Ha(t)},Zq=e=>{let t=Cp(e.fileName,e.name),r=e.promptText.trim(),n=e.name.trim();if(t.length===0||r.length===0||n.length===0)return null;let o=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${OI(n)}`,...o.length>0?[`description: ${OI(o)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},MI=e=>`.cursor/skills/${e}/SKILL.md`,NI=(e,t)=>{let r=Ha(t);if(r.length===0)return!1;let n=kt.default.resolve(e),o=kt.default.resolve(n,".cursor","skills"),s=kt.default.resolve(n,MI(r));return s.startsWith(`${o}${kt.default.sep}`)?Ko.default.existsSync(s):!1},jI=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Cp(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=kt.default.resolve(e.workingDirectory);try{if(!Ko.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=Zq({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let n=MI(r.slug),o=kt.default.resolve(t,".cursor","skills"),s=kt.default.resolve(t,n);if(!s.startsWith(`${o}${kt.default.sep}`))return{ok:!1,errorCode:"path"};if(Ko.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Ko.default.mkdirSync(kt.default.dirname(s),{recursive:!0}),Ko.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:n}}});var Qq,DI,HI,$I=l(()=>{"use strict";C();C();Je();Ye();kn();Ub();Qq=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,DI=e=>{let t=e.get("savedSkill");return t!==null&&Qq.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},HI=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=J(e.storePath,t),n=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!k(r.status))return{kind:"redirect",location:n("skillError=working")};let o=Ae(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(o===null||ft(o.promptText)!==null)return{kind:"redirect",location:n("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=jI({workingDirectory:ke(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:o.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:n(`skillError=${a}`)}}return{kind:"redirect",location:n(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var x,eK,Tp,be,In,zI,FI,UI,BI,Me=l(()=>{"use strict";x="manual",eK=["claude-cli","codex","cursor","antigravity"],Tp={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},be=e=>e===x?"You":e in Tp?Tp[e]:e,In=e=>eK.filter(t=>e.includes(t)),zI=e=>{let t=In(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},FI=(e,t)=>t===x?x:e.find(r=>r===t)??null,UI=(e,t,r)=>{let n=In(e),o=FI(n,t),s=FI(n,r);return o===null||s===null?null:{judge:o,improver:s}},BI=(e,t,r)=>{let n=In(e);return t===null||t.trim()===""?r!==x?r:n[0]??null:t===x?null:n.find(o=>o===t)??null}});var Bb,GI,VI=l(()=>{"use strict";Bb={ok:!1,errorMessage:"Stopped.",stopped:!0},GI=(e,t,r)=>{if(t===void 0)return;let n=()=>{e.kill("SIGTERM"),r(Bb)};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var qI,$a,KI,Gb,tK,rK,nK,Xe,Fa=l(()=>{"use strict";qI=require("node:child_process"),$a=m(require("node:fs")),KI=m(require("node:os")),Gb=m(require("node:path"));Ma();VI();kn();tK=["claude-cli","codex","cursor","antigravity"],rK=18e4,nK=e=>tK.includes(e),Xe=e=>new Promise(t=>{if(e.signal?.aborted){t(Bb);return}if(!nK(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,n=_t(r,e.prompt,ie({}));if(n===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!$a.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let o=Gb.default.join($a.default.mkdtempSync(Gb.default.join(KI.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=pI({writerAgent:r,baseArgs:n.args,replyPath:o}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,qI.spawn)(n.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=g=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(g))};GI(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??rK),d.stdout.on("data",g=>{i.push(Buffer.from(g))}),d.stderr.on("data",g=>{a.push(Buffer.from(g))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let g=$a.default.existsSync(o)?$a.default.readFileSync(o,"utf8"):null;p(mI({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:g}))})})});var JI,oK,za,xp,Ip=l(()=>{"use strict";C();Me();JI=e=>e===x?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},oK=(e,t,r,n,o,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:n,reasons:o,rawReply:t,tokens:s}}:i),za=(e,t,r=null)=>{let n=e.revisions.find(a=>a.roundNumber===e.currentRound),o=nb({raw:t,passScore:e.passScore,goal:e.goal,promptText:n?.promptText??"",improver:JI(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:wa(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=oK(e,t,o.verdict?.score??null,o.verdict?.passed??null,o.verdict?.reasons??null,r),i=new Date().toISOString();return o.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:o.continuation.type,errorMessage:o.continuation.type==="passed"?null:o.continuation.errorMessage,updatedAt:i}},xp=(e,t,r=null)=>{let n=dp({raw:t,judge:JI(e.judgeModel),goal:e.goal,passScore:e.passScore}),o=new Date().toISOString();return n.nextPrompt===null?{...e,status:"failed",errorMessage:n.continuation.type==="failed"?n.continuation.errorMessage:"The improver reply was empty.",updatedAt:o}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:n.nextPrompt,judgement:null,writerTokens:r}],updatedAt:o}}});var Op,Vb=l(()=>{"use strict";Op=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let n=`Token review: ${r}`;return{...e,revisions:e.revisions.map(o=>{if(o.roundNumber!==e.currentRound)return o;let s=o.judgement?.reasons?.trim()??"";return{...o,run:o.run===void 0?o.run:{...o.run,tokenReview:r},judgement:o.judgement===null?o.judgement:{...o.judgement,reasons:s.length===0?n:`${s}

${n}`}}})}}});var ZI,Mp,Np,YI,XI,qb,sK,QI,Kb,iK,eO,aK,lK,tO,rO=l(()=>{"use strict";ZI=require("node:child_process"),Mp=m(require("node:fs")),Np=m(require("node:path"));C();YI=4e3,XI=12e3,qb=(e,t)=>{let r=(0,ZI.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},sK=e=>qb(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",QI=e=>{let t=qb(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(n=>{if(n.length<4)return[];let o=n.slice(3).trim();return[[(o.includes(" -> ")?o.split(" -> ").at(-1)??o:o).replaceAll('"',""),n]]});return Object.fromEntries(r)},Kb=(e,t)=>{let r=Np.default.resolve(e,t),n=Np.default.relative(e,r);if(n.startsWith("..")||Np.default.isAbsolute(n)||!Mp.default.existsSync(r)||!Mp.default.statSync(r).isFile())return null;let o=Mp.default.readFileSync(r,"utf8");return o.includes("\0")?"(binary file)":o.length>YI?`${o.slice(0,YI)}
\u2026truncated`:o},iK=e=>e.length>XI?`${e.slice(0,XI)}
\u2026truncated`:e,eO=e=>{let t=lb(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(o=>[o,Kb(e.workingDirectory,o)])),n=sK(e.workingDirectory);return{git:n,status:n?QI(e.workingDirectory):{},files:r,paths:t}},aK=(e,t)=>{let r=qb(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let n=Kb(e,t);return n===null?`${t} is missing.`:n},lK=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",tO=e=>{let t=e.before.git?QI(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),n=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Kb(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),o=r.map(a=>aK(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",o.length>0?`Changes since the run started:
${o.join(`
`)}`:"",n.length>0?`Files named in the prompt:
${n.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:lK(e.before.git,e.before.paths.length>0),evidence:iK(i.join(`

`))}}});var Xb,z,Zb,Pe,nO,cK,dK,oO,Jo,sO,Yo,uK,pK,Ua,Jb,Yb,mK,iO,gK,fK,hK,aO,yK,lO,cO,SK,AK,dO,uO=l(()=>{"use strict";Xb=require("node:child_process"),z=m(require("node:fs")),Zb=m(require("node:os")),Pe=m(require("node:path")),nO=8e6,cK=16e6,dK=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],oO=(e,t)=>{let r=(0,Xb.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Jo=(e,t)=>(0,Xb.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,sO=e=>{let t=oO(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let n=r.slice(3).trim().replaceAll('"',"");return(n.includes(" -> ")?n.split(" -> "):[n]).map(s=>[s.trim(),r])}))},Yo=(e,t)=>{let r=Pe.default.resolve(e,t),n=Pe.default.relative(e,r);return n.startsWith("..")||Pe.default.isAbsolute(n)?null:r},uK=(e,t)=>{let r=Yo(e,t);if(r===null||!z.default.existsSync(r))return null;let n=z.default.statSync(r);return!n.isFile()||n.size>nO?null:z.default.readFileSync(r)},pK=(e,t,r)=>{let n=Yo(e,t);n!==null&&(z.default.mkdirSync(Pe.default.dirname(n),{recursive:!0}),z.default.writeFileSync(n,r))},Ua=(e,t)=>{let r=Yo(e,t);r===null||!z.default.existsSync(r)||z.default.rmSync(r,{recursive:!0,force:!0})},Jb=(e,t)=>Jo(e,["cat-file","-e",`HEAD:${t}`]),Yb=e=>{let t=oO(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},mK=e=>Pe.default.resolve(e)!==Pe.default.resolve(Zb.default.homedir()),iO=e=>{if(!z.default.existsSync(e))return 0;let t=z.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?z.default.readdirSync(e).reduce((r,n)=>r+iO(Pe.default.join(e,n)),0):0},gK=(e,t,r)=>{let n=Yo(e,r);if(n===null||!z.default.existsSync(n))return{relativePath:r,existed:!1,copyDir:null};if(iO(n)>cK)return{relativePath:r,existed:!0,copyDir:null};let o=Pe.default.join(t,"cache",r);return z.default.mkdirSync(Pe.default.dirname(o),{recursive:!0}),z.default.cpSync(n,o,{recursive:!0}),{relativePath:r,existed:!0,copyDir:o}},fK=400,hK=32e6,aO=e=>{let t=[],r=0,n=!0,o=s=>{if(!(!n||!z.default.existsSync(s)))for(let i of z.default.readdirSync(s)){if(!n||i===".git"||i==="node_modules")continue;let a=Pe.default.join(s,i),c=z.default.statSync(a);if(c.isDirectory()){o(a);continue}if(!(!c.isFile()||c.size>nO)){if(t.length>=fK||r+c.size>hK){n=!1;return}r+=c.size,t.push(Pe.default.relative(e,a))}}};return o(e),{paths:t,complete:n}},yK=(e,t,r)=>{let n=Yo(e,r);if(n===null||!z.default.existsSync(n))return null;let o=uK(e,r);if(o===null)return"skip";let s=Pe.default.join(t,"files",r);return z.default.mkdirSync(Pe.default.dirname(s),{recursive:!0}),z.default.writeFileSync(s,o),s},lO=e=>{let t=z.default.mkdtempSync(Pe.default.join(Zb.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?sO(e.workingDirectory):{},n=e.git?{paths:[],complete:!0}:aO(e.workingDirectory),o=e.git?[...Object.keys(r),...e.namedPaths]:[...n.paths,...e.namedPaths],s=Object.fromEntries([...new Set(o)].map(i=>[i,yK(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?Yb(e.workingDirectory):null,isolateCaches:mK(e.workingDirectory),complete:n.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:dK.map(i=>gK(e.workingDirectory,t,i))}},cO=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Ua(e.workingDirectory,t);return}pK(e.workingDirectory,t,z.default.readFileSync(r))}},SK=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?cO(e,t):Jb(e.workingDirectory,t)?Jo(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Ua(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",n=r.startsWith(" ")||r.startsWith("?");n&&Jb(e.workingDirectory,t)&&Jo(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),n&&!Jb(e.workingDirectory,t)&&Jo(e.workingDirectory,["reset","-q","HEAD","--",t])},AK=(e,t)=>{let r=Yo(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Ua(e.workingDirectory,t.relativePath),z.default.mkdirSync(Pe.default.dirname(r),{recursive:!0}),z.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Ua(e.workingDirectory,t.relativePath);return}if(z.default.existsSync(r))for(let n of z.default.readdirSync(r)){let o=Pe.default.join(r,n);z.default.statSync(o).mtimeMs>=e.startedMs-1e3&&z.default.rmSync(o,{recursive:!0,force:!0})}}}},dO=e=>{try{if(e.git){if(Yb(e.workingDirectory)!==e.head&&(!(e.head===null?Jo(e.workingDirectory,["update-ref","-d","HEAD"]):Jo(e.workingDirectory,["reset","--hard",e.head]))||Yb(e.workingDirectory)!==e.head))throw new Error("head");let r=sO(e.workingDirectory);for(let n of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))SK(e,n)}else{if(e.complete)for(let t of aO(e.workingDirectory).paths)e.files[t]===void 0&&Ua(e.workingDirectory,t);for(let t of Object.keys(e.files))cO(e,t)}for(let t of e.caches)AK(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{z.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var jp,Dp,bK,PK,wK,_K,vK,pO,WK,mO,gO=l(()=>{"use strict";C();Ip();Vb();rO();uO();Me();Ye();Fa();jp=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),Dp=e=>({...e,status:"stopped",errorMessage:Wn,judgePhase:void 0,updatedAt:new Date().toISOString()}),bK=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),PK=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==x?t:e.improverModel!==x?e.improverModel:null}return e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null},wK=async e=>{let t=ke(e.cycle),r=eO({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),n=lO({workingDirectory:t,git:r.git,namedPaths:r.paths}),o=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?vb({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Ea(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):ba({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await Xe({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?tO({workingDirectory:t,before:r,writerReply:i.text}):null,c=dO(n);return i.ok?!c.ok||a===null?{ok:!1,cycle:jp(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-o,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Dp(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:jp(e.cycle,i.errorMessage)})},_K=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:wK({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),vK=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),pO=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let n=await Xe({writerAgent:e.reviewer,workingDirectory:ke(e.cycle),prompt:ab({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return n.ok?{kind:"suggestion",text:n.text.trim(),tokens:n.tokens}:n.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Dp(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},WK=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===x)return t;let n={...t,judgePhase:"scoring"};e.onProgress?.(n);let o=await Xe({writerAgent:t.judgeModel,workingDirectory:ke(t),prompt:ib({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return o.ok?{...za(n,o.text,o.tokens),judgePhase:void 0}:o.stopped===!0||e.signal?.aborted===!0?Dp(n):(e.onWriterFailure?.(t.judgeModel),jp(n,o.errorMessage))},mO=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return WK(e);let n=PK(t),o=await _K({cycle:t,revision:r,runner:n,signal:e.signal,onWriterFailure:e.onWriterFailure});if(o===null)return t;if(!o.ok)return o.cycle;let s=r.run===void 0?bK(t,o.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===x){let p=await pO({cycle:s,run:o.run,promptText:r.promptText,reviewer:n,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...vK(s,p.text),judgePhase:void 0}}let i=await Xe({writerAgent:t.judgeModel,workingDirectory:ke(t),prompt:rb({goal:t.goal,lookedAt:o.run.lookedAt??"the writer reply",evidence:o.run.evidence??o.run.output,tokens:o.run.tokens,delayMs:o.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Dp(s):(e.onWriterFailure?.(t.judgeModel),jp(s,i.errorMessage));let a=await pO({cycle:s,run:o.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=za(s,i.text,c);return Op(d,a.text)}});var Hp,Qb=l(()=>{"use strict";C();Hp=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t?.judgement?.score,n=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||n.length===0?null:Aa({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:n},priorRounds:wa(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null})),e.currentRound)})}});var $p,LK,EK,eP,fO=l(()=>{"use strict";C();Ip();gO();Qb();Me();Ye();Fa();$p=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),LK=e=>({...e,status:"stopped",errorMessage:Wn,updatedAt:new Date().toISOString()}),EK=(e,t,r,n,o)=>t.ok?null:t.stopped===!0||n?.aborted===!0?LK(e):(o?.(r),$p(e,t.errorMessage)),eP=async(e,t,r,n)=>{let o=e.revisions.find(c=>c.roundNumber===e.currentRound);if(o===void 0)return $p(e,"This round has no prompt.");if(e.status==="judging")return mO({cycle:e,revision:o,onWriterFailure:t,signal:r,onProgress:n});if(e.status!=="improving")return $p(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===x)return e;let s=Hp(e);if(s===null)return $p(e,"The improver needs the score and the reason.");let i=await Xe({writerAgent:e.improverModel,workingDirectory:ke(e),prompt:ha({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=EK(e,i,e.improverModel,r,t);return a!==null?a:xp(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var Up,Fp,hO,RK,kK,zp,yO,SO,CK,TK,AO,bO,PO,tP=l(()=>{"use strict";C();Me();Ye();Fa();fO();Nb();Up=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),Fp=(e,t,r)=>e.wizard===void 0||t===null?Up(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},hO=e=>{let t=e.wizard;return t===void 0||Na(e).length===0?e:{...e,wizard:Uo({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},RK=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",kK=e=>{let t=e.wizard;if(t===void 0)return e;let r=La({revisions:e.revisions});if(r.rounds.length===0)return e;let n=t.modules[t.currentModuleIndex];return{...e,wizard:Uo({wizard:t,step:"optimize_modules",output:{moduleId:n?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},zp=(e,t)=>({...e,status:"wizard_paused",errorMessage:e.errorMessage,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),yO=e=>e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null,SO=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let o=r.attempts.filter(s=>s.step===t).at(-1);return o===void 0?"":JSON.stringify(o.output)},CK=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=yO(e);if(o===null)return Up(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??ka(n),i=bb({goal:e.goal,sourcePrompt:s,avoid:n.avoidByStep.generalize,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:SO(e,"generalize")}),a=await Xe({writerAgent:o,prompt:i,workingDirectory:ke(e),signal:t});if(!a.ok)return r?.(o),Fp(e,"generalize",a.errorMessage);try{let c=Cb(a.text),d=Uo({wizard:{...n,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Ia(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return zp({...e,wizard:d},"generalize")}catch(c){return Fp(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},TK=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=yO(e);if(o===null)return Up(e,"Choose a writer to suggest splits.");let s=Ca({wizard:n,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=_b({goal:e.goal,templatedPrompt:n.templatedPrompt,variables:n.variables,evaluatedPromptReference:s,avoid:n.avoidByStep.separate,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:SO(e,"separate")}),a=await Xe({writerAgent:o,prompt:i,workingDirectory:ke(e),signal:t});if(!a.ok)return r?.(o),Fp(e,"separate",a.errorMessage);try{let c=Tb(a.text),d=Pb(c,n.variables),p=Uo({wizard:{...n,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return zp({...e,wizard:p},"separate")}catch(c){return Fp(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},AO=e=>{let t=e.wizard;if(t===void 0)return e;let r=ka(t),n=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:70,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:n}},bO=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let n=r.modules[t];if(n===void 0)return Up(e,"This module is missing.");let o=Ln(r),s=Ta(n.prompt,o),i=e.runnerModel!==void 0&&e.runnerModel!==x?e.runnerModel:e.judgeModel!==x?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:70,maxRounds:1,errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},PO=async(e,t,r,n)=>{let o=e.wizard;if(o===void 0)return eP(e,t,r,n);if(o.gate!==null||e.status==="wizard_paused")return e;if(o.phase==="generalize")return CK(e,r,t);if(o.phase==="separate"&&o.splitOptions.length===0)return TK(e,r,t);if(o.phase==="evaluate"||o.phase==="optimize_modules"){let s=await eP(e,t,r,n);if(k(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Na(s).length===0)return s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let p=Ae(s.revisions.map(b=>({roundNumber:b.roundNumber,promptText:b.promptText,score:b.judgement?.score??0,reasons:b.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0,g=zp({...s,wizard:{...s.wizard,evaluateSelectedRound:p}},i);return i==="evaluate"?hO(g):g}let a=zp(s,i),c=i==="optimize_modules"&&a.wizard!==void 0?(()=>{let d=Lb({wizard:{...a.wizard,modules:a.wizard.modules.map((p,g)=>g===a.wizard.currentModuleIndex&&p.status==="running"?{...p,status:"paused"}:p)},moduleIndex:a.wizard.currentModuleIndex,revisions:a.revisions,cycleStatus:RK(s.status)});return{...a,wizard:d}})():a;return i==="evaluate"?hO(c):kK(c)}return s}return o.phase==="complete",e}});var kr,wO,xK,_O=l(()=>{"use strict";C();Ye();kn();Ub();kr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wO=e=>{if(!k(e.status))return"";let t=Ae(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,n=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",o=ft(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${kr(t.reasons.trim())}</p>`,i=o===null?xK({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ke(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${kr(o)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${n}${s}${i}</section>`},xK=e=>{let t=e.sourceSkill?.fileName??Ha(e.goal),r=e.sourceSkill?.name??t,n=e.sourceSkill?.description??e.goal,o=Cp(t,r),s=o.length>0&&NI(e.workingDirectory,o),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${kr(o)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${kr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${kr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${kr(n)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${kr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${kr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var Bp,rP=l(()=>{"use strict";C();C();Me();kn();Bp=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!k(e.status)){let t=e.judgeModel;return{title:`${be(t)} is suggesting module splits.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!k(e.status)){let t=e.judgeModel;return{title:`${be(t)} is generalizing your prompt.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===x?{title:`Score the prompt text for round ${e.currentRound+1}.`,detail:"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."}:e.judgePhase==="scoring"?{title:`${be(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"No folder run in step 2. This panel keeps updating, so the page is not stuck."}:{title:`${be(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"Wizard evaluate revises prompt wording before the runner executes in step 4."};if(e.status==="judging"&&e.judgeModel===x){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==x?{title:`${be(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"You score the changes after this run."}:{title:`Score the changes from round ${e.currentRound+1}.`,detail:t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt."}}if(e.status==="judging"&&e.judgePhase==="reviewing")return{title:`${be(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,detail:"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck."};if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,n=t.currentModuleIndex+1,o=t.modules.length;return{title:`${be(r)} is scoring module ${n} of ${o}.`,detail:`Step 4 runs one trial per module (pass \u2265 ${70}). This panel keeps updating.`}}return{title:`${be(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,detail:"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck."}}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,n=t.currentModuleIndex+1,o=t.modules.length;return{title:`${be(r)} is running module ${n} of ${o}.`,detail:`The runner executes the module prompt; the judge scores output (pass \u2265 ${70}). This panel keeps updating.`}}return{title:`${be(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck."}}if(e.status==="improving"&&e.improverModel===x){let t=e.revisions.find(n=>n.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return{title:"Rewrite the prompt.",detail:t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`}}if(e.status==="improving")return{title:`${be(e.improverModel)} is rewriting the prompt.`,detail:"That writer is working on this Mac. This panel keeps updating, so the page is not stuck."};if(e.status==="passed")return{title:"This prompt passed.",detail:""};if(e.status==="stopped"){let t=e.revisions.some(o=>ft(o.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let o=ge(e.wizard),s=o.totalModules>0&&(e.wizard.phase==="complete"||o.passedModuleCount>0||k(e.status));return{title:s&&o.totalModules>0?`Wizard finished \u2014 ${o.passedModuleCount}/${o.totalModules} modules passed`:"Wizard stopped before all steps finished",detail:r.length>0?r:s?"":"Progress from finished steps is kept."}}return{title:(e.errorMessage??"").startsWith("Finished")?"Finished.":"Stopped.",detail:r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept."}}return k(e.status)?{title:"This run stopped because a reply could not be used.",detail:""}:{title:"Working on this Mac.",detail:"This panel keeps updating."}}});var Ct,Ba=l(()=>{"use strict";Me();Ct=e=>{if(e.status==="improving"&&e.improverModel===x)return!0;if(e.status!=="judging"||e.judgeModel!==x)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===x}});var vO,WO=l(()=>{"use strict";vO=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Cr,IK,LO,EO=l(()=>{"use strict";C();Cr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IK=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Cr(r)}</p>`},LO=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Cr(e.cycleId)}">`,n=e.instructions?.trim()??"",o=n.length===0?"":`<p class="muted">Instructions</p><p>${Cr(n)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Cr(a)}.</p>`}<pre class="mono">${Cr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Er(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Cr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${o}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Cr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${o}${IK(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Cr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Ga,OK,RO,kO=l(()=>{"use strict";C();kn();Ga=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OK=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,n=ft(t.promptText),o=t.judgement?.reasons?`<p class="muted">${Ga(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Ga(i)}.</p>`}<pre class="mono">${Ga(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Er(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=n===null?`<pre class="mono">${Ga(d)}</pre>`:`<div class="alert-error">${Ga(n)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${o}${a}${p}</article>`},RO=e=>e.revisions.map(t=>OK(e,t)).join("")});var CO,TO=l(()=>{"use strict";C();CO=e=>{if(k(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Tt,MK,nP,NK,jK,DK,HK,xO,IO,oP=l(()=>{"use strict";TO();Tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MK="Stop this run? Writers will stop and the best prompt is kept.",nP="End the wizard? Writers will stop and progress from finished steps is kept.",NK="Skip this module and pause at the step gate?",jK=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Tt(MK)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Tt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,DK=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Tt(nP)}"><input type="hidden" name="cycleId" value="${Tt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,HK=e=>{let t=Tt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Tt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Tt(NK)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Tt(nP)}">End wizard</button>
    </form>
  </div>`},xO=e=>{let t=CO(e);return t==="none"?"":t==="classic"?jK(e.id):t==="wizard_end_only"?DK(e.id):HK(e)},IO=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Tt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Tt(nP)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var OO,MO=l(()=>{"use strict";C();Da();OO=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let n=r.variables.length;return r.templatedPrompt.trim().length>0?n>0?`Templated prompt \xB7 ${n} variable${n===1?"":"s"}`:"Templated prompt ready":n>0?`${n} variable${n===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let n=e.revisions.filter(o=>o.judgement!==null&&o.judgement!==void 0).length;if(n>0){let o=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return o===null?`${n} scored revision${n===1?"":"s"}`:`Best score ${o} \xB7 ${n} revision${n===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let n=r.modules.length>0?r.modules.length:r.splitOptions.length;return n>0?`${n} module${n===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let n=ge(r);if(n.terminalStatusSuggestion==="passed"&&n.passedModuleCount===n.totalModules){let o=n.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=n.rows.reduce((i,a)=>i+(a.tokens??0),0);return o===null||o.bestScore===null?`${Cn(s)} tokens total`:`Lowest: ${o.title} (${o.bestScore}) \xB7 ${Cn(s)} tokens`}return`${n.passedModuleCount}/${n.totalModules} passed \xB7 \u2265 ${70}`}return""}});var NO,$K,jO,DO=l(()=>{"use strict";C();MO();bp();NO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$K=(e,t,r)=>{let n=Go(e,t);if(n.trim().length===0)return"";let o=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=OO(e,t),i=`${NO(o)} <span class="muted sdlc-wizard-outcome-step-hint">${NO(s)}</span>`,a=t==="wizard-4"&&r.phase==="complete"?" open":"",c=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step" id="${c}"${a}><summary aria-controls="${c}-body">${i}</summary><div class="sdlc-wizard-outcome-step-body" id="${c}-body">${n}</div></details>`},jO=e=>{let t=e.wizard;if(t===void 0||!k(e.status))return"";let r=t.phase==="complete",o=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>$K(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${o}</div>`:o;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var HO,$O,FO=l(()=>{"use strict";HO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$O=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(n=>`<li class="sdlc-wizard-module-prompt"><strong>${HO(n.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${HO(n.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var sP,zO,iP=l(()=>{"use strict";C();sP=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,zO=e=>{if(sP(e))return"Passed";let t=e.statistics?.bestScore;return t!=null&&t<70?`Below pass (${t})`:e.status}});var UO,BO=l(()=>{"use strict";C();UO=e=>{if(e.terminalStatusSuggestion==="passed")return"";let t=e.rows.filter(r=>r.bestScore!==null&&r.bestScore<70).length;return t>0&&t===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${t} module${t===1?"":"s"} scored below ${70}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${70}.`}});var Gp,GO,VO=l(()=>{"use strict";C();iP();iP();BO();Gp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GO=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=ge(t),n=r.terminalStatusSuggestion==="passed"?"":UO(r),o=60,s=r.rows.map((a,c)=>{let d=t.modules[c],p=a.bestScore===null?"\u2014":`${a.bestScore} / \u2265${70}`,b=a.bestScore!==null&&a.bestScore>=o&&a.bestScore<70?' class="sdlc-score-near-pass"':"",h=d===void 0?a.status:zO(d),y=d!==void 0&&sP(d)?'<span aria-label="Passed">\u2713</span>':Gp(h);return`<tr${b}><td>${Gp(a.title)}</td><td>${Gp(p)}</td><td>${a.tokens??"\u2014"}</td><td>${y}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${Gp(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${s}</tbody></table></div>`}});var FK,qO,KO=l(()=>{"use strict";C();C();FO();VO();FK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qO=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!k(e.status)||t.modules.length===0)return"";let r=GO(e),n=$O(e);if(r.length===0&&n.length===0)return"";let o=(e.revisions[0]?.promptText??"").trim(),s=ge(t),i=s.passedModuleCount<s.totalModules?" open":"";return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${o.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${FK(o)}</pre></details>`}${r}${n}</section>`}});var Yt,Va=l(()=>{"use strict";Yt=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",n=r.length>0?r:"Untitled run";return n.length<=72?n:`${n.slice(0,71).trimEnd()}\u2026`}});var Tr,Vp,aP=l(()=>{"use strict";C();_p();_O();rP();Ba();WO();Qb();EO();kO();oP();DO();KO();Da();Ye();Va();Tr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vp=e=>{let t=!k(e.status)&&e.status!=="wizard_paused"&&!Ct(e),r=Bp(e),n=PI(mb(vO(e)),e),o=k(e.status)?"":xO(e),s=jO(e),i=qO(e),a=wO(e),c=e.errorMessage===null?"":`<div class="alert-error">${Tr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?ge(e.wizard):null,b=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,h=!t&&e.wizard!==void 0&&k(e.status)&&(e.wizard.phase==="complete"||ge(e.wizard).passedModuleCount>0),y=h?b?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Tr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",S=r.detail.length===0&&u.length===0||r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Tr(r.detail)}${p}</p>`,A=e.revisions.find(Hr=>Hr.roundNumber===e.currentRound),f=e.status==="improving"?Hp(e):null,w=Vo(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),v=Ct(e)?LO({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:f?.promptText??A?.promptText??"",score:f?.score??A?.judgement?.score??null,reasons:f?.reasons??A?.judgement?.reasons??null,avoid:f?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:A?.run??null,minJudgeScore:_?1:0}):"",L=e.wizard!==void 0&&e.wizard.phase==="complete"&&k(e.status),R=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",T=e.wizard!==void 0&&!L?70:e.passScore,I=R?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${wp(T)}</div>`:"",D=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':k(e.status)?L&&g!==null&&!b?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",le=t?d:h?b?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',V=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Tr(Rt(ke(e)))}</li>`:"",w>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Cn(w)} so far</li>`:""].filter(Hr=>Hr.length>0),q=V.length===0?"":`<ul class="sdlc-run-meta">${V.join("")}</ul>`,Dr=o.length===0?"":`<div class="sdlc-run-actions">${o}</div>`,H=L?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${n}</div>`,_e=L?"":I.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${H}</div>`:`<div class="sdlc-run-grid">${H}${I}</div>`,yt=RO(e),Gl=e.wizard!==void 0&&k(e.status)&&e.revisions.every(Hr=>Hr.roundNumber===0&&(Hr.judgement===void 0||Hr.judgement===null)),UF=yt.length===0||Gl?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${yt}</div></section>`,BF=`<p class="sdlc-run-goal" title="${Tr(e.goal.trim())}">${Tr(Yt(e.goal))}</p>`,GF=L?`${c}${i}${s}${v}${a}`:`${c}${_e}${v}${s}${a}`,VF='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',qF=L?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Tr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${VF}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${D}</div>${BF}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${le}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Tr(r.title)}</h2>${S}${u}${qF}</div></div>${q}${Dr}</header>${GF}</section>${UF}`}});var JO,On,qp=l(()=>{"use strict";C();JO=e=>En.indexOf(e),On=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||k(e.status)?En.length:t.gate!==null?JO(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?JO(t.phase):null}});var YO,XO=l(()=>{"use strict";YO=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Mn,ZO,QO=l(()=>{"use strict";C();XO();Mn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ZO=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,n=Ea(t,r),o=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Mn(YO(n))}</pre></div>`:"",s=xa(e.modulePrompt);if(s.length===0)return o.length>0?`<div class="sdlc-wizard-module-params">${o}</div>`:"";let i=Ln(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=hp(c),g=i[c]??"",b=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Mn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Mn(p)}">${Mn(b)}</label>
        ${h}
        <input class="input" type="text" id="${Mn(p)}" name="${Mn(p)}" value="${Mn(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${o}${a}</div>`}});var xt,eM,tM=l(()=>{"use strict";C();QO();jb();Ap();oP();xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eM=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let n=r.gate,o=n==="generalize"?"Step 1 \u2014 Generalize":n==="evaluate"?"Step 2 \u2014 Evaluate":n==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=n==="generalize"?`<ul class="sdlc-wizard-vars">${r.variables.map(v=>`<li><strong>{{${xt(v.name)}}}</strong> \u2014 ${xt(v.description)} (sample: ${xt(v.sampleValue)})</li>`).join("")}</ul><pre class="sdlc-pre">${xt(r.templatedPrompt)}</pre>`:"",i=n==="evaluate"?Bo({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",c=n==="separate"?`${n==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(v=>{let L=v.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',R=v.recommended?' <span class="sdlc-badge">Recommended</span>':"",T=r.selectedSplitOptionId===v.id||r.selectedSplitOptionId===null&&v.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${xt(v.id)}" required${T}> <strong>${xt(v.title)}</strong>${L}${R}<br><span class="muted">${xt(v.summary)}</span></label>${Sp(v)}</li>`}).join("")}</ul>`:"",d=r.modules[r.currentModuleIndex],g=n==="optimize_modules"&&d?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",b=d?.title??"Module",h=d?.prompt??"",y=d?.status==="pending",u=n==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${xt(b)}</p>${y?ZO({cycle:e,modulePrompt:h}):""}<p class="muted">Test run prompt preview: ${xt(Ta(h,Ln(r)))}</p>${d?.statistics===null||d?.statistics===void 0?"":`<p class="muted">Module stats: best ${d.statistics.bestScore??"\u2014"} / \u2265${70} (round ${d.statistics.bestRound??"\u2014"}).</p>`}${Bo({cycle:e,interactive:!1,caption:y?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${b}\u201D (runner + judge).`})}`:"",S=n==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":n==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":n==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":y?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",A=kb(r),f=A===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${A}</p>`,w=t?.active===!0?" sdlc-wizard-gate-active":"",_=t?.active===!0?' id="prompt-optimizer-wizard-active-step"':"";return`<section class="card sdlc-wizard-gate${w}"${_}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${o}</h2>
    <p class="sdlc-wizard-gate-lede">${S}</p>
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
    ${IO(e)}
  </section>`}});var zK,rM,nM=l(()=>{"use strict";C();zK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rM=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||k(e.status))return"";if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>Suggesting module splits</h2>
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let r=t.currentModuleIndex,o=t.modules[r]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    <h2>Module ${r+1} of ${t.modules.length}: ${zK(o)}</h2>
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
  </section>`:""}});var UK,BK,GK,oM,sM=l(()=>{"use strict";C();qp();tM();nM();bp();UK={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},BK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GK=(e,t,r)=>`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${BK(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${Go(e,t)}</div>
</details>`,oM=e=>{let t=e.wizard;if(t===void 0)return"";let r=On(e);if(r===null)return"";let n=En.slice(0,r).map((i,a)=>GK(e,`wizard-${a+1}`,UK[i])),o=t.gate!==null?eM(e,{active:!0}):rM(e),s=r>=En.length?"":o;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${n.join("")}${s}</div>`}});var Kp,lP=l(()=>{"use strict";sM();Ap();C();Kp=e=>{if(e===null||e.wizard!==void 0&&k(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=oM(e),r=fI(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var cP,iM,aM,Jp,lM,Yp=l(()=>{"use strict";C();Je();cP=new Map,iM=e=>{let t=new AbortController;return cP.set(e,t),t.signal},aM=e=>{cP.delete(e)},Jp=e=>{cP.get(e)?.abort()},lM=(e,t)=>{let r=J(e,t);return r===null||r.wizard!==void 0?!1:(k(r.status)||(G(e,{...r,status:"stopped",errorMessage:Wn,updatedAt:new Date().toISOString()}),Jp(t)),!0)}});var qa,Xp,cM,dP,dM,uM,pM,mM,uP=l(()=>{"use strict";qa=m(require("node:fs")),Xp=m(require("node:path")),cM=e=>Xp.default.join(Xp.default.dirname(e),"prompt-optimizer-writer-ready.json"),dP=e=>{let t=cM(e);if(!qa.default.existsSync(t))return{};try{let r=JSON.parse(qa.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},dM=(e,t)=>{qa.default.mkdirSync(Xp.default.dirname(e),{recursive:!0}),qa.default.writeFileSync(cM(e),`${JSON.stringify(t,null,2)}
`)},uM=(e,t)=>dP(e)[t]?.message??null,pM=(e,t,r)=>{dM(e,{...dP(e),[t]:{message:r}})},mM=(e,t)=>{let r=dP(e);r[t]!==void 0&&dM(e,Object.fromEntries(Object.entries(r).filter(([n])=>n!==t)))}});var pP,Zp,Qp,gM,Ne,Nn=l(()=>{"use strict";C();Ma();tP();Ba();Yp();uP();Je();pP=new Set,Zp={atMs:0,ids:[]},Qp=async()=>{if(Date.now()-Zp.atMs<3e4)return Zp.ids;let e=await mt({commands:ie({})});return Zp.atMs=Date.now(),Zp.ids=e.installedWriterIds,e.installedWriterIds},gM=async(e,t,r)=>{let n=J(e,t);if(n===null||k(n.status)||n.status==="wizard_paused"||Ct(n)||r.aborted)return;let o=await PO(n,i=>{mM(e,i)},r,i=>{J(e,t)?.status==="stopped"||r.aborted||G(e,i)});J(e,t)?.status==="stopped"||r.aborted||(G(e,o),k(o.status)||await gM(e,t,r))},Ne=(e,t)=>{if(pP.has(t))return;let r=J(e,t);if(r===null||k(r.status)||r.status==="wizard_paused"||Ct(r))return;pP.add(t);let n=iM(t);gM(e,t,n).finally(()=>{pP.delete(t),aM(t)})}});var xr,Ka=l(()=>{"use strict";aP();lP();Nn();xr=(e,t)=>(Ne(e,t.id),`${Vp(t)}${Kp(t)}`)});var fM,hM,yM=l(()=>{"use strict";fM=(e,t)=>e.revisions.find(n=>n.roundNumber===t)?.judgement?.score??null,hM=e=>e!==null&&e>0});var em,SM,mP=l(()=>{"use strict";C();Yp();em=e=>(Jp(e.id),{...e,status:"stopped",errorMessage:KA,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null,phase:"complete"},updatedAt:new Date().toISOString()}),SM=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;Jp(e.id);let r=t.currentModuleIndex,n=t.modules.map((o,s)=>s===r?{...o,status:"stopped"}:o);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:n,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var VK,AM,qK,bM,PM=l(()=>{"use strict";C();tP();Ka();Je();Nn();yM();mP();VK="Pick a revision scored above 0 before continuing to Separate.",AM=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),qK=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null})),bM=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",n=t.get("intent")??"";if(!n.startsWith("wizard-"))return!1;let o=t.get("cycleId")?.trim()??"",s=J(e.storePath,o);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=J(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(xr(e.storePath,d))};if(n==="wizard-stop-all"){let c=em(s);return G(e.storePath,c),a(o),!0}if(n==="wizard-skip-module"){let c=SM(s);return G(e.storePath,c),a(o),!0}if(n==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(o),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=yb(s.wizard,d,c);g=Sb(g,d),g={...g,pendingStepInstructions:p};let b={...s,status:"judging",wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return G(e.storePath,b),Ne(e.storePath,o),a(o),!0}if(n==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(o),!0;if(c==="generalize"){let p=(s.errorMessage?.trim().length??0)>0?AM(s):AO({...s,wizard:{...s.wizard,gate:null}});return G(e.storePath,p),Ne(e.storePath,o),a(o),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=fM(s,p??-1);if(!hM(g)){let y={...s,errorMessage:VK,updatedAt:new Date().toISOString()};return G(e.storePath,y),a(o),!0}let b={...s.wizard,evaluateSelectedRound:p},h={...s,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...b,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()};return G(e.storePath,h),Ne(e.storePath,o),a(o),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0){let y=AM(s);return G(e.storePath,y),Ne(e.storePath,o),a(o),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(y=>y.id===p);if(g===void 0){let y={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return G(e.storePath,y),a(o),!0}let b=qK(g),h={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...s.wizard,gate:"optimize_modules",selectedSplitOptionId:p,selectedSplitTopology:g.topology,modules:b,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(s.wizard.parameterValues??{}).length>0?s.wizard.parameterValues??{}:Ia(s.wizard.variables)},updatedAt:new Date().toISOString()};return G(e.storePath,h),a(o),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(o),!0;let g=Ob({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!g.ok){let u={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return G(e.storePath,u),a(o),!0}let b={...s.wizard,parameterValues:g.parameterValues};if(p.status==="pending"){let u=bO({...s,wizard:{...b,gate:null}},d);return G(e.storePath,u),Ne(e.storePath,o),a(o),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=ge(b),S={...s,status:u.terminalStatusSuggestion,wizard:{...b,gate:null,phase:"complete"},updatedAt:new Date().toISOString()};return G(e.storePath,S),a(o),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...b,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return G(e.storePath,y),a(o),!0}}return a(o),!0}});var KK,wM,JK,gP,YK,_M,vM=l(()=>{"use strict";Me();Yp();mP();Vb();Ip();Ba();Je();KK="Add a score from 0 to 100 and the reason for it.",wM="Add a score from 1 to 100 and the reason for it.",JK="Write the next prompt.",gP="This step is not waiting for you.",YK=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},_M=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=J(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(G(e.storePath,em(a)),{kind:"saved",cycleId:i}):lM(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",n=J(e.storePath,r);if(n===null||!Ct(n))return n===null?{kind:"missing"}:{kind:"invalid",cycle:n,errorMessage:gP};if(t==="manual-judge"){if(n.judgeModel!==x)return{kind:"invalid",cycle:n,errorMessage:gP};let i=YK(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=n.wizard!==void 0&&(n.wizard.phase==="evaluate"||n.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:n,errorMessage:c?wM:KK};if(c&&i===0)return{kind:"invalid",cycle:n,errorMessage:wM};let d=n.revisions.find(g=>g.roundNumber===n.currentRound)?.run?.tokenReview??"",p=Op(za(n,JSON.stringify({score:i,passed:i>=n.passScore,reasons:a})),d);return G(e.storePath,p),{kind:"saved",cycleId:n.id}}if(n.improverModel!==x)return{kind:"invalid",cycle:n,errorMessage:gP};let o=(e.posted.get("prompt")??"").trim();if(o.length===0)return{kind:"invalid",cycle:n,errorMessage:JK};let s=xp(n,o);return G(e.storePath,s),{kind:"saved",cycleId:n.id}}});var WM,LM=l(()=>{"use strict";WM=`<script>
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
</script>`});var EM,RM=l(()=>{"use strict";EM=`<script>
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
    const button = document.querySelector("[data-sdlc-run-wizard]");
    if (button instanceof HTMLButtonElement) {
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      button.innerHTML =
        '<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026';
    }
    document.querySelector(".sdlc-wizard-resume-paused")?.remove();
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
</script>`});var kM,CM=l(()=>{"use strict";kM=`<script>
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
</script>`});var TM,xM=l(()=>{"use strict";TM=`<script>
(() => {
  const fit = (area) => {
    area.style.height = "auto";
    area.style.height = area.scrollHeight + "px";
  };
  document.querySelectorAll("form.sdlc-form textarea").forEach((area) => {
    fit(area);
    area.addEventListener("input", () => fit(area));
  });
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
  const paintRunHint = () => {
    if (!(hint instanceof HTMLElement)) return;
    if (!(runButton instanceof HTMLButtonElement)) {
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
        runButton.disabled = !canRun;
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
      if (!submitter.hasAttribute("data-sdlc-run-wizard")) return;
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
        return;
      }
      paintRunButton(true);
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
      paintRunButton(false);
      paintReady();
    }
  });
})();
</script>`});var IM,OM=l(()=>{"use strict";C();Ye();IM=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),n=t.wizard?.templatedPrompt.trim()??"",o=n.length>0?n:r?.promptText??e.prompt;return{goal:t.goal,prompt:o,folder:t.workingDirectory===void 0?e.folder:Rt(t.workingDirectory),passScore:String(t.passScore),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!k(t.status)}}});var MM,NM=l(()=>{"use strict";C();qp();MM=e=>{if(e.wizard===void 0)return k(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=On(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(k(e.status)){if(e.wizard.phase==="complete"){let r=ge(e.wizard),n=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),o=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${o}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var jM,DM=l(()=>{"use strict";jM=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return"Just now";let o=Math.floor(n/60);if(o<60)return`${o} min ago`;let s=Math.floor(o/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Xt,XK,ZK,HM,$M=l(()=>{"use strict";NM();DM();Va();Xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),XK=e=>e.wizard===void 0?"classic":"wizard",ZK=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Xt(t)}">`,n=MM(e),o=jM(e.updatedAt),s=t!==null&&e.id===t,i=s?`${n.subtitle} \xB7 Shown above`:n.subtitle,a=o.length===0?i:`${i} \xB7 ${o}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Xt(n.badgeClass)}">${Xt(n.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Xt(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Xt(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${XK(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Xt(e.id)}">${Xt(Yt(e.goal))}</a><p class="muted">${Xt(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},HM=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>ZK(a,t)).join(""),n=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="classic" aria-pressed="false">Classic</button>
  </div>`,o=Math.min(e.length,20),s=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${n}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Xt(s)}</summary>${i}</details>`:i}});var fP,tm,FM,QK,e8,hP,zM,yP=l(()=>{"use strict";fP=m(require("node:fs")),tm=m(require("node:path"));Ye();FM=/^[a-z0-9-]+$/,QK=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},e8=(e,t)=>{if(!FM.test(t))return null;let r=e.replace(/^\uFEFF/,""),n=t,o="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=QK(p[2]??"");p[1]==="name"&&g.length>0&&(n=g),p[1]==="description"&&(o=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:n,description:o,promptText:i}},hP=e=>{let t=xn(e);if(!t.ok)return[];let r=tm.default.resolve(t.path,".cursor","skills"),n=[];try{n=fP.default.readdirSync(r)}catch{return[]}return n.filter(o=>FM.test(o)).flatMap(o=>{let s=tm.default.resolve(r,o,"SKILL.md");if(!s.startsWith(`${r}${tm.default.sep}`))return[];try{let i=e8(fP.default.readFileSync(s,"utf8"),o);return i===null?[]:[i]}catch{return[]}}).toSorted((o,s)=>o.fileName.localeCompare(s.fileName))},zM=(e,t)=>hP(e).find(r=>r.fileName===t)??null});var UM,BM=l(()=>{"use strict";UM={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Pass score",practice:"The run passes at this score. 90 is the usual bar. Lower it when a useful prompt is enough.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var Ja,t8,r8,Be,Ya=l(()=>{"use strict";BM();Ja=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),t8='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>',r8=e=>{let t=UM[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Ja(t.title)}" aria-describedby="${r}" aria-expanded="false">${t8}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Ja(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Ja(t.example)}</span></span></button>`},Be=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Ja(r)}"`}>${Ja(e)}</span>${r8(t)}</span>`});var GM,n8,VM,qM,KM=l(()=>{"use strict";Ya();GM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n8=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),VM=e=>{if(e.length===0)return`<div class="field">${Be("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${GM(r.fileName)}">${GM(r.fileName)}</option>`).join("");return`<div class="field">${Be("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${n8(e)}</script>`},qM=`<script>
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
</script>`});var Ce,JM,YM,o8,XM,ZM,QM,eN=l(()=>{"use strict";C();rP();Me();Va();qp();Ce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JM=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",YM=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,o8=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(n=>n.roundNumber===0)?.promptText??""},XM=e=>e===x?"You":be(e),ZM=e=>{let t=o8(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":be(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ce(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ce(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ce(XM(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ce(XM(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ce(r)}</dd></div>
    </dl>
  </details>`},QM=e=>{let t=e.wizard;if(t===void 0)return"";let r=Yt(e.goal),n=e.status==="wizard_paused",o=!k(e.status)&&e.status!=="wizard_paused";if(!n&&!o)return"";if(o){let p=Bp(e),g=YM(t),b=g===null?"":JM(g),h=On(e),y=b.length===0?"":h===null||h>=4?` <strong>${Ce(b)}</strong>`:` <strong>${Ce(b)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ce(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ce(p.title)}${y}</p>
    <p class="muted">${Ce(p.detail)}</p>
    <div class="actions">
      ${ZM(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ce(e.id)}">Open this run</a>
    </div>
  </section>`}let s=YM(t),i=s===null?"Wizard":JM(s),a=On(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ce(r)}</h2>
    <p class="lede">Paused at <strong>${Ce(i)}</strong>${Ce(c)} (last updated ${Ce(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${ZM(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ce(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Xa,tN,rN=l(()=>{"use strict";Ya();Xa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tN=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(o=>`<option value="${Xa(o.id)}"${o.id===e.runner?" selected":""}>${Xa(o.label)}</option>`).join(""),n=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Xa(e.runner)}">Checking ${Xa(e.writers.find(o=>o.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Be("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${n}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Be("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Xa(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var nN,oN=l(()=>{"use strict";nN=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Xo,sN,iN,aN,lN,cN=l(()=>{"use strict";Ya();Xo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sN=(e,t,r,n,o)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=n.map(c=>`<option value="${Xo(c.id)}"${c.id===r?" selected":""}>${Xo(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Xo(o)}</option>`;return`<div class="field">${Be(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},iN=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let n=r.find(o=>o.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Xo(t)}">Checking ${Xo(n)}\u2026</p>`},aN=(e,t,r,n,o)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Be(t,o)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Xo(r)}</textarea><span class="muted">${n}</span></div></details>`,lN=e=>{let t=`<div class="sdlc-writer">${sN("judge","Judge",e.judge,e.writers,"I'll score it")}${iN("judge",e.judge,e.writers)}${aN("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${sN("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${iN("improver",e.improver,e.writers)}${aN("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var i8,jn,dN,uN=l(()=>{"use strict";Ba();aP();LM();RM();_p();CM();xM();OM();$M();yP();KM();Ya();lP();eN();Va();rN();oN();cN();C();i8=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,jn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dN=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${jn(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${jn(e.skillNotice??"")}</div>`,n=`${wI}${_I}`,o=e.resumableWizardCycle??null,s=o===null?"":QM(o),i=Kp(e.cycle),a=e.cycle===null?"":Vp(e.cycle),c=e.cycle!==null&&Ct(e.cycle),d=IM(e),p=i8(d.goal,d.prompt,e.canRun),g=lN({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),b=tN({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=fb,y=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",u=e.cycle!==null&&k(e.cycle.status),S=u?"":" open",A=u?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>',f=u?(()=>{let I=e.cycle!==null?Yt(e.cycle.goal):Yt(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${jn(I)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></summary>`})():'<summary class="sdlc-compose-summary"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</summary>',w=u?" sdlc-compose-viewing-finished":"",_=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",v=c?"waiting":d.running?"running":"idle",L=d.running&&!c?' aria-busy="true"':"",R=`<section class="card sdlc-compose${w}" id="prompt-optimizer-compose">
      <div class="sdlc-form-head">
        ${A}
      </div>
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${S}>
        ${f}
        <div class="sdlc-compose-details-body">
      <p class="lede">${h} ${jn(e.modelNote)}</p>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${y}
        <div class="sdlc-block">
          <p class="sdlc-block-title">Prompt and goal</p>
          <div class="field">
            ${Be("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${jn(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Be("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${jn(d.prompt)}</textarea>
          </div>
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Folder</p>
          <div class="sdlc-folder">
          <div class="field">
            ${Be("Folder","folder")}
            <input class="input" type="text" name="folder" value="${jn(d.folder)}" onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${VM(hP(d.folder))}
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Judge and improver</p>
          ${g}
        </div>
        ${b}
        <div data-sdlc-wizard-only>${nN()}</div>
        </fieldset>
        </div>
      </details>
        <div class="sdlc-submit-bar" data-sdlc-submit-bar>
          <p class="sdlc-writer-summary" data-sdlc-writer-summary hidden></p>
          <p class="muted sdlc-run-hint" data-sdlc-run-hint role="status"></p>
          <div class="sdlc-submit">
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: pass score ${70}, up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${v}" data-can-run="${p?"true":"false"}"${L}${d.running&&!c?" disabled":""}>${_}</button>
          </div>
        </div>
      </form>
    </section>`,T=`${""}${WM}${EM}${TM}${qM}${kM}`;return`${t}${r}${R}${s}${a}${i}${n}${HM(e.history,e.cycle?.id??null)}${T}`}});var Za,SP=l(()=>{"use strict";uN();Za=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:dN(t)}))}});var pN,mN=l(()=>{"use strict";vM();Ka();SP();Je();Nn();pN=async(e,t,r)=>{let n=t===null?{kind:"ignored"}:_M({posted:t,storePath:e.storePath});if(n.kind==="ignored")return!1;if(n.kind==="saved"){let o=J(e.storePath,n.cycleId);return Ne(e.storePath,n.cycleId),t?.get("liveFragment")==="1"&&o!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":o.id}),e.response.end(xr(e.storePath,o)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(n.cycleId)}`}),e.response.end(),!0)}return n.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Za(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:n.cycle.judgeModel,improver:n.cycle.improverModel,folder:"~",passScore:String(n.cycle.passScore),maxRounds:String(n.cycle.maxRounds),canRun:r.canRun,errorMessage:n.errorMessage,skillNotice:null,cycle:n.cycle,history:Et(e.storePath),resumableWizardCycle:null}),!0)}});var gN,rm,AP=l(()=>{"use strict";gN=m(require("node:os"));C();rm=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??gN.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??90,maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var fN,Zo,bP,hN,yN,Qa=l(()=>{"use strict";C();Me();Hb();fN=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Zo=e=>{let t=zI(e),r=In(e).map(s=>({id:s,label:Tp[s]})),n=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,o=t?.judge??"";return{note:n,canRun:!0,models:t,writers:r,judge:o,improver:t?.improver??o,runner:o}},bP=(e,t,r)=>t===x||t!==null&&e.writers.some(n=>n.id===t)?t:r,hN=(e,t,r,n=null)=>({judge:bP(e,t,e.judge),improver:bP(e,r,e.improver),runner:bP(e,n,e.runner)}),yN=e=>e===vp?{goal:Wp,prompt:Lp}:{goal:"",prompt:""}});var nm,PP=l(()=>{"use strict";C();Me();Ye();Qa();nm=e=>{let t=hN(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=String(70),n=String(5),o=e.posted?.get("judgeInstructions")?.trim()??"",s=e.posted?.get("improverInstructions")?.trim()??"",i=e.posted?.get("runnerInstructions")?.trim()??"",a=e.posted?.get("runner")??null,c=(u,S)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:u,passScore:r,maxRounds:n,errorMessage:S,judge:t.judge,improver:t.improver,judgeInstructions:o,improverInstructions:s,runner:t.runner,runnerInstructions:i});if(e.posted===null)return c(e.defaultFolder??Tn,null);let d=e.posted.get("folder")??Tn;if(e.posted.get("intent")==="choose-folder"){let u=e.pickFolder();return c(u===null?d:Rt(u),null)}if((e.posted.get("intent")??"")!=="run")return c(d,null);let g=fN(e.goal,e.prompt);if(g!==null)return c(d,g);let b=UI(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(b===null)return c(d,"Choose a judge and an improver.");let h=xn(d);if(!h.ok)return c(d,h.errorMessage);let y=BI(e.installedIds,a,b.judge);return y===null?c(d,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:h.path,passScore:70,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:o,improverInstructions:s,runner:y,runnerInstructions:i}}});var Qo,sm,a8,wP,SN,om,AN,l8,bN,_P,c8,d8,u8,vP,PN,wN,_N=l(()=>{"use strict";Qo=m(require("node:fs")),sm=m(require("node:path"));Me();Ye();a8=["remember","choose-folder","run"],wP=()=>({folder:Tn,judge:"",improver:"",runner:""}),SN=e=>sm.default.join(sm.default.dirname(e),"prompt-optimizer-preferences.json"),om=e=>typeof e=="string"?e:"",AN=e=>{let t=SN(e);if(!Qo.default.existsSync(t))return wP();try{let r=JSON.parse(Qo.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return wP();let n=r,o=om(n.folder).trim();return{folder:o.length===0?Tn:o,judge:om(n.judge),improver:om(n.improver),runner:om(n.runner)}}catch{return wP()}},l8=(e,t)=>{let r=SN(e);Qo.default.mkdirSync(sm.default.dirname(e),{recursive:!0});let n=`${r}.tmp`;Qo.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`),Qo.default.renameSync(n,r)},bN=(e,t)=>e===x||In(t).some(r=>r===e),_P=(e,t,r)=>e===null?t:e.length===0?"":bN(e,r)?e:t,c8=(e,t)=>{if(e===null)return t;let r=xn(e);return r.ok?r.display:t},d8=e=>{let t=AN(e.storePath),r={folder:c8(e.folder,t.folder),judge:_P(e.judge,t.judge,e.installedIds),improver:_P(e.improver,t.improver,e.installedIds),runner:_P(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||l8(e.storePath,r)},u8=e=>{let t=xn(e);return t.ok?t.display:Tn},vP=(e,t)=>bN(e,t)?e:"",PN=e=>{let t=AN(e.storePath);return{selection:{...e.selection,judge:vP(t.judge,e.installedIds)||e.selection.judge,improver:vP(t.improver,e.installedIds)||e.selection.improver,runner:vP(t.runner,e.installedIds)||e.selection.runner},defaultFolder:u8(t.folder)}},wN=e=>{let t=e.posted.get("intent")??"";if(!a8.includes(t))return;let r=e.posted.get("folder");d8({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var vN,p8,m8,WP,g8,im,am=l(()=>{"use strict";vN=m(require("node:os"));Me();uP();Fa();p8="Reply with the single word ok. Do not use tools.",m8=45e3,WP=async(e,t)=>{if(t===x)return{ok:!0,message:"You will do this step."};let r=uM(e,t);if(r!==null)return{ok:!0,message:r};let n=await Xe({writerAgent:t,prompt:p8,workingDirectory:vN.default.tmpdir(),timeoutMs:m8});if(!n.ok)return{ok:!1,message:n.errorMessage};let o=`${be(t)} is ready.`;return pM(e,t,o),{ok:!0,message:o}},g8=e=>[...new Set(e.filter(t=>t.length>0))],im=async(e,t,r,n)=>{for(let o of g8([t,r,n??""])){let s=await WP(e,o);if(!s.ok)return s.message}return null}});var LP,WN=l(()=>{"use strict";C();LP=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!k(r.status)&&!(t!==null&&r.id===t))return r;return null}});var LN,EN=l(()=>{"use strict";ut();C();Ka();AP();PP();SP();Je();Ye();_N();yP();am();WN();Nn();LN=async e=>{let t=e.posted===null?PN({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=nm({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>vr("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(wN({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Rt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let n=r.kind==="start"?await im(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&n!==null){await Za(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Rt(r.workingDirectory),passScore:String(r.passScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:n,skillNotice:e.skillNotice,cycle:null,history:Et(e.route.storePath),resumableWizardCycle:LP(Et(e.route.storePath),null)});return}if(r.kind==="start"){let s=zM(r.workingDirectory,r.sourceSkillFile),i=rm({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,wizard:{...Wa(r.prompt),runnerInstructions:r.runnerInstructions},runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(G(e.route.storePath,i),Ne(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(xr(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let o=e.cycleId===null?null:J(e.route.storePath,e.cycleId);o!==null&&Ne(e.route.storePath,o.id),await Za(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:o,history:Et(e.route.storePath),resumableWizardCycle:LP(Et(e.route.storePath),o?.id??null)})}});var RN,kN=l(()=>{"use strict";Je();RN=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";xI(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var CN,TN=l(()=>{"use strict";CN=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let n=r[1].replace(/^"|"$/g,""),o=new URLSearchParams,s=t.split(`--${n}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),o.append(a[1],d)}return o}return new URLSearchParams(t)}});var xN,IN=l(()=>{"use strict";$I();PM();mN();EN();kN();Qa();TN();Nn();xN=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Qp(),n=Zo(r),o=e.method==="POST"?CN(e.request.headers["content-type"],await e.readBody(e.request)):null;if(bM({posted:o,storePath:e.storePath,response:e.response})||await pN(e,o,n))return;let s=yN(t.searchParams.get("example")),i=RN({posted:o,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=HI({posted:o,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await LN({route:e,posted:o,installedIds:r,selection:n,goal:o?.get("goal")??s.goal,prompt:o?.get("prompt")??s.prompt,skillNotice:DI(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var f8,ON,MN=l(()=>{"use strict";C();Je();f8=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",ON=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let n=J(e.storePath,r);if(n===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(n.wizard===void 0||!k(n.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let o=Rb({goal:n.goal,cycleStatus:n.status,wizard:n.wizard}),s=`prompt-optimizer-wizard-${f8(n.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(o),!0}});var NN,jN=l(()=>{"use strict";Ka();Je();NN=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),n=r===null?null:J(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(n===null?"":xr(e.storePath,n)),!0}});var h8,DN,HN=l(()=>{"use strict";Me();am();h8=["claude-cli","codex","cursor","antigravity"],DN=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let n=t===x||h8.includes(t)?await WP(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(n)),!0}});var $N,FN=l(()=>{"use strict";C();$N=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:_a,page:va,context:zo,installedWriters:e,post:{method:"POST",url:_a,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${_a}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var EP,zN=l(()=>{"use strict";C();Da();EP=e=>{let t=e.revisions[e.revisions.length-1]??null,r=Ae(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null}))),n=k(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:n,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:Vo(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:zo,page:`${va}?cycle=${encodeURIComponent(e.id)}`}}});var Te,y8,UN,BN,GN=l(()=>{"use strict";Te=m(Es());C();y8=(0,Te.isType)({goal:Te.isString,prompt:Te.isString,workingDirectory:Te.isString,judge:(0,Te.isUndefinedOr)(Te.isString),improver:(0,Te.isUndefinedOr)(Te.isString),passScore:(0,Te.isUndefinedOr)(Te.isNumber),maxRounds:(0,Te.isUndefinedOr)(Te.isNumber)}),UN=e=>{let t=e?.trim()??"";return t.length===0?null:t},BN=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return y8(t)?t.workingDirectory.trim().length===0?{ok:!1,error:gp}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:UN(t.judge),improver:UN(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:gp}}});var S8,VN,qN=l(()=>{"use strict";C();Me();PP();Qa();S8=e=>e.map(t=>t.id).join(", "),VN=e=>{let t=Zo(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,n=e.body.judge??r,o=e.body.improver??r;if(n===x||o===x)return{ok:!1,error:gb,installedWriters:t.writers};if(n===null||o===null){let a=S8(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:n,improver:o,runner:n}),i=nm({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var KN,JN=l(()=>{"use strict";C();AP();FN();zN();Qa();GN();qN();Je();KN=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=J(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:EP(c)}}let r=await e.handlers.readInstalledIds(),n=Zo(r);if(e.method==="GET")return{status:200,body:$N(n.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let o=BN(e.rawBody);if(!o.ok)return{status:400,body:{ok:!1,error:o.error,installedWriters:n.writers}};let s=VN({body:o.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:n.writers}};let a=rm({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:Wa(s.prompt),runnerModel:s.runner});return G(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:EP(a)}}});var YN,XN=l(()=>{"use strict";Nn();am();JN();YN=async e=>{let t=await KN({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Qp,readWritersReady:im,startCycle:Ne}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var A8,RP,ZN=l(()=>{"use strict";LI();IN();MN();jN();HN();XN();A8=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},RP=async e=>{let t=A8(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await YN(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:WI()})),!0):(await DN({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||ON({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||NN({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await xN(e),!0)}});var QN=l(()=>{"use strict";ZN()});var Dn,el,b8,P8,w8,_8,ej,tj=l(()=>{"use strict";Dn=m(require("node:fs")),el=m(require("node:path")),b8="prompt-optimizer-cycles.json",P8="prompt-optimizer-preferences.json",w8="prompt-sdlc-cycles.json",_8="prompt-sdlc-preferences.json",ej=e=>{let t=el.default.join(e,b8),r=el.default.join(e,w8);if(Dn.default.existsSync(t)||!Dn.default.existsSync(r))return t;try{Dn.default.renameSync(r,t)}catch{return r}let n=el.default.join(e,_8),o=el.default.join(e,P8);if(Dn.default.existsSync(n)&&!Dn.default.existsSync(o))try{Dn.default.renameSync(n,o)}catch{}return t}});var es,v8,kP,rj=l(()=>{"use strict";es=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),v8=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],kP=e=>{let t=v8.map(i=>`<option value="${es(i.value)}">${es(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${es(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${es(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${es(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${es(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var tl,sj,W8,ij,L8,E8,aj,cm,nj,oj,R8,k8,Zt,rl,lm,C8,dm,CP,T8,TP,lj,xP,cj,x8,I8,O8,dj,uj,pj,nl=l(()=>{"use strict";tl=m(require("node:fs")),sj=m(require("node:path")),W8="estimate-history.ndjson",ij=100,L8=500,E8=2e4,aj=e=>sj.default.join(e,W8),cm=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,L8),nj=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,E8),oj=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,R8=e=>({...e,estimateTokens:oj(e.estimateTokens),actualTokens:oj(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),k8=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Zt=e=>{let t=aj(e);return tl.default.existsSync(t)?tl.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let n=r.trim();if(n.length===0)return[];try{let o=JSON.parse(n);return k8(o)?[R8(o)]:[]}catch{return[]}}):[]},rl=(e,t)=>{tl.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(n=>JSON.stringify(n)).join(`
`)}
`;tl.default.writeFileSync(aj(e),r,"utf8")},lm=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),C8=e=>{let t=e.filter(n=>n.actualSeconds!==null&&n.estimateSeconds!==null&&n.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(n=>`| ${lm(n.task)} | ${lm(n.writerLabel)} | ${n.estimateSeconds} | ${n.actualSeconds} |`)].join(`
`)},dm=e=>{let t=Zt(e.reportsDir),r=cm(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:n?.actualSeconds??null,estimateTokens:n?.estimateTokens??null,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);rl(e.reportsDir,[...s,o])},CP=e=>{let t=Zt(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),n=new Date().toISOString(),o=e.task!==void 0?cm(e.task):"",s={id:e.agentRunId,task:o.length>0?o:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:n,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);rl(e.reportsDir,[...i,s])},T8=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-ij),TP=e=>[...Zt(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),lj=e=>{let t=Zt(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),n=nj(e.input),o=nj(e.output),s=cm(n),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:n.length>0?n:r?.input??"",output:o.length>0?o:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);rl(e.reportsDir,[...c,a])},xP=(e,t)=>{let r=Zt(e).find(n=>n.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},cj=e=>({table:C8(T8(Zt(e))),embedding:null}),x8=e=>{let t=new Map;for(let n of e){if(n.actualTokens===null)continue;let o=n.writerLabel.trim()||"Writer",s=t.get(o)??[];s.push(n.actualTokens),t.set(o,s)}let r=new Set;for(let[n,o]of t){let s=[...o].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${n}:${i}`)}return e.filter(n=>{let o=n.writerLabel.trim()||"Writer";return!r.has(`${o}:${n.actualTokens}`)})},I8=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-ij),O8=e=>{let t=x8(I8(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let n=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",n.join(". ")+(n.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${lm(s.task)} | ${lm(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},dj=e=>{let t=Zt(e.reportsDir),r=cm(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:n?.writerLabel??"",estimateSeconds:n?.estimateSeconds??null,actualSeconds:n?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);rl(e.reportsDir,[...s,o])},uj=e=>{let t=Zt(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),n=new Date().toISOString(),o={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:r?.completedAt??n,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);rl(e.reportsDir,[...s,o])},pj=e=>O8(Zt(e))});var mj=l(()=>{"use strict";nl()});var Qt,IP,M8,OP,N8,j8,um,pm,D8,MP,gj=l(()=>{"use strict";mj();Qt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IP=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let n=Math.floor(t/60),o=t%60;return o===0?`${n} hr`:`${n} hr ${o} min`},M8=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${IP(-r)} under`:`${IP(r)} over`},OP=e=>e.toLocaleString("en-US"),N8=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${OP(-r)} under`:`${OP(r)} over`},j8=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},um=e=>e===null?"\u2014":IP(e),pm=e=>e===null?"\u2014":OP(e),D8=`(function () {
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
})();`,MP=e=>{let r=TP(e.reportsDir).map((o,s)=>{let i=o.input.trim().length>0?o.input:o.task,a=o.output.trim().length>0?o.output:"\u2014",c=o.writerLabel.trim().length>0?o.writerLabel:"Writer",d=o.estimateSeconds===null||o.actualSeconds===null?"no estimate":M8(o.estimateSeconds,o.actualSeconds),p=o.estimateTokens===null||o.actualTokens===null?"no estimate":N8(o.estimateTokens,o.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${Qt(j8(i))}</button></td>
        <td>${Qt(c)}</td>
        <td>${um(o.estimateSeconds)}</td>
        <td>${um(o.actualSeconds)}</td>
        <td>${Qt(d)}</td>
        <td>${pm(o.estimateTokens)}</td>
        <td>${pm(o.actualTokens)}</td>
        <td>${Qt(p)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${Qt(c)}</p>
        <h2>Input</h2>
        <pre>${Qt(i)}</pre>
        <h2>Output</h2>
        <pre>${Qt(a)}</pre>
        <p>Time: estimated ${um(o.estimateSeconds)} \xB7 actual ${um(o.actualSeconds)} \xB7 ${Qt(d)}</p>
        <p>Tokens: estimated ${pm(o.estimateTokens)} \xB7 actual ${pm(o.actualTokens)} \xB7 ${Qt(p)}</p>
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
        <script>${D8}</script>`}
    </section>`}});var fj=l(()=>{"use strict";rj();gj()});var ts,H8,$8,NP,hj=l(()=>{"use strict";ts=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H8=(e,t,r)=>{let n=ts(t),o=ts(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${n}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${o}</pre>
</article>`},$8=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${ts(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((n,o)=>H8(o,n.userPrompt,n.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${ts(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${ts(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${ts(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},NP=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map($8).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var yj=l(()=>{"use strict";hj()});var ol,Sj,Aj,jP,DP,HP,bj=l(()=>{"use strict";ol=m(require("node:fs")),Sj=m(require("node:path"));ca();ep();Aj=(e,t,r)=>jo({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,jP=(e,t,r)=>{let n=Aj(e,t,r);if(n===null)return[];if(!ol.default.existsSync(n))return[];let o=ol.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},DP=e=>{let t=Aj(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Jt(e.entry.prompt),output:Jt(e.entry.output)};ol.default.mkdirSync(Sj.default.dirname(t),{recursive:!0}),ol.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},HP=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var F8,z8,sl,mm,$P=l(()=>{"use strict";F8=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),z8=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,sl=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let n=[],o=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=F8(i.assistantOutput),d=c.length>0?`Assistant: ${z8(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(o+p.length>r&&n.length>0)break;n.unshift(p),o+=p.length}}return n.join(`

`)},mm=e=>{let t=e.userMessage.trim(),r=sl({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var It,il,UP,U8,B8,FP,G8,BP,gm,Pj,wj,V8,rs,GP,zP,_j,q8,vj,ns,fm,al,K8,ll,VP,hm,ym,Wj=l(()=>{"use strict";It=m(require("node:fs")),il=m(require("node:path")),UP=require("node:crypto");$P();U8="writer-sessions",B8="active-index.json",FP=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G8=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",BP=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},gm=e=>{let t=il.default.join(e.installDir,U8);return It.default.mkdirSync(t,{recursive:!0}),t},Pj=e=>il.default.join(gm(e),B8),wj=(e,t)=>il.default.join(gm(e),`${t}.canonical.json`),V8=(e,t)=>il.default.join(gm(e),`${t}.continuation.json`),rs=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,GP=e=>{let t=Pj(e);if(!It.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(It.default.readFileSync(t,"utf8"));if(!FP(r)||!Array.isArray(r.entries))return{entries:[]};let n=[];for(let o of r.entries){if(!FP(o)||typeof o.sessionId!="string")continue;let s=typeof o.writerAgent=="string"?o.writerAgent:"";if(!G8(s))continue;let i=typeof o.projectFolderPath=="string"?o.projectFolderPath:(o.projectFolderPath===null,null);n.push({writerAgent:s,projectFolderPath:i,sessionId:o.sessionId})}return{entries:n}}catch{return{entries:[]}}},zP=(e,t)=>{It.default.writeFileSync(Pj(e),JSON.stringify(t,null,2))},_j=(e,t)=>{It.default.writeFileSync(wj(e,t.sessionId),JSON.stringify(t,null,2))},q8=(e,t)=>{It.default.writeFileSync(V8(e,t.sessionId),JSON.stringify(t,null,2))},vj=(e,t)=>{let r=sl({turns:t.turns});q8(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},ns=(e,t)=>{let r=wj(e,t);if(!It.default.existsSync(r))return null;try{let n=JSON.parse(It.default.readFileSync(r,"utf8"));return!FP(n)||typeof n.sessionId!="string"?null:n}catch{return null}},fm=(e,t=20)=>{let r=gm(e),n=It.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),o=[];for(let s of n){let i=s.name.replace(/\.canonical\.json$/,""),a=ns(e,i);a!==null&&o.push(a)}return o.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},al=(e,t,r)=>{let n=BP(r);return GP(e).entries.find(i=>rs(i)===rs({writerAgent:t,projectFolderPath:n}))?.sessionId??null},K8=(e,t,r,n)=>{let o=GP(e),s=rs({writerAgent:t,projectFolderPath:r}),i=[...o.entries.filter(a=>rs(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:n}];zP(e,{entries:i})},ll=(e,t,r)=>{let n=(0,UP.randomUUID)(),o=new Date().toISOString(),s=BP(r),i={sessionId:n,writerAgent:t,projectFolderPath:s,turns:[],createdAt:o,updatedAt:o};return _j(e,i),vj(e,i),K8(e,t,s,n),n},VP=(e,t,r)=>{let n=al(e,t,r);return n!==null?n:ll(e,t,r)},hm=(e,t,r)=>{let n=BP(r),o=GP(e);if(n===null&&r===void 0){zP(e,{entries:o.entries.filter(i=>i.writerAgent!==t)});return}let s=rs({writerAgent:t,projectFolderPath:n});zP(e,{entries:o.entries.filter(i=>rs(i)!==s)})},ym=e=>{let t=VP(e.layout,e.writerAgent,e.projectFolderPath),r=ns(e.layout,t);if(r===null)return;let n={id:(0,UP.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},o={...r,turns:[...r.turns,n],updatedAt:n.createdAt};_j(e.layout,o),vj(e.layout,o)}});var J8,Y8,Sm,qP,Lj=l(()=>{"use strict";J8=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",Y8=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},Sm=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",qP=e=>{let t=Sm(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",n=J8(r,e.userPromptCharacterCount),o=Y8({contextBudget:n,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:n,...o}}});var Am=l(()=>{"use strict";bj();Wj();$P();Lj()});var Ej=l(()=>{"use strict";fh()});var He,Z8,Q8,KP,JP,YP,Rj=l(()=>{"use strict";ae();Ej();He=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Z8=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},Q8=(e,t,r)=>{let n=e[t]?.apiKey;if(n!==void 0&&n.length>0){let o=Md(n);return`value="${He(o)}" placeholder="Paste a new key to replace"`}return`placeholder="${He(r)}"`},KP=(e,t,r,n,o)=>{let s=Uh[t];return`<label class="field">
          <span class="field-label">${He(n)} API key \u2014 ${He(Z8(e,t))} \xB7 <a class="field-link" href="${He(s.href)}" target="_blank" rel="noopener noreferrer">${He(s.label)}</a></span>
          <input class="input mono" type="password" name="${He(r)}" autocomplete="off" ${Q8(e,t,o)} />
        </label>`},JP=(e,t,r,n)=>{let o=hh(e[t]?.model),s=new Set(Ed[t].map(c=>c.value)),i=Ed[t].map(c=>{let d=c.value===o?" selected":"";return`<option value="${He(c.value)}"${d}>${He(c.label)}</option>`}).join(""),a=o!==sn&&!s.has(o)?`<option value="${He(o)}" selected>${He(o)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${He(n)}</span>
          <select class="input mono" name="${He(r)}">${i}${a}</select>
        </label>`},YP=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${He(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",n=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
    </section>`}});var kj=l(()=>{"use strict";Rj()});var bm,Cj,Tj=l(()=>{"use strict";bm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cj=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${bm(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Console \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let n=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${bm(s.name)}</strong> <span class="muted mono">(${bm(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),o=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${bm(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${o}
      <ul class="harness-installed-set-list">${n}</ul>
    </section>`}});var e3,xj,Ij,Oj=l(()=>{"use strict";e3=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,xj=e=>e.kind==="folder",Ij=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let d=s.children.get(a);if(d!==void 0&&xj(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=n=>{let o=[];for(let s of n.children.values()){if(xj(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(e3)};return r(t)}});var Mj,XP,Nj=l(()=>{"use strict";Mj=m(require("node:path")),XP=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${XP(r.children,t)}</ul>
            </details>
          </li>`;let n=Mj.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var jj,Ir,t3,r3,cl,n3,ZP,Dj=l(()=>{"use strict";sp();jj=m(require("node:path"));Tj();Oj();Nj();Ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),t3=()=>`(() => {
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

})();`,r3=()=>`(() => {
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
})();`,cl=e=>{let t=ga({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=Cj({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),n=e.flashError?`<div class="alert-error">${Ir(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ir(e.flashMessage)}</div>`:"",o=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':n3(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Ir(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Ir(s)}" />
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
    <script>${t3()}</script>
    <script>${r3()}</script>`;return`${t}${r}${n}${c}${d}`},n3=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let d=Ij(a.items.map(b=>({...b,relativePath:typeof b.relativePath=="string"&&b.relativePath.length>0?b.relativePath:jj.default.relative(a.sourceRoot,b.sourcePath).replaceAll("\\","/")}))),p=XP(d,Ir),g=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Ir(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Ir(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Ir(n)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},ZP=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&o.set(d,p)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?o.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,b=t.sets[i];if(b===void 0)continue;let h=a.length>0?a:b.proposedSlug,y=g.length>0?g:b.proposedName,u=r.has(i),S=b.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:u}));s.push({slug:h,name:y,items:S})}return s}});var Hj=l(()=>{"use strict";Dj()});var o3,QP,$j=l(()=>{"use strict";_r();o3=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[De]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null||n.ok!==!0)return null;let o=n;return{counts:{harness:Number(o.counts?.harness??0),workflow:Number(o.counts?.workflow??0),agent:Number(o.counts?.agent??0)},items:Array.isArray(o.items)?o.items:[]}}catch{return null}},QP=o3});var s3,Fj,zj=l(()=>{"use strict";_r();s3=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[De]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let n=await r.json();return typeof n!="object"||n===null||n.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof n.promotedCount=="number"?n.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},Fj=s3});var Uj=l(()=>{"use strict"});var dl,i3,ew,Bj=l(()=>{"use strict";sp();dl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),i3=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,ew=e=>{let t=e.flashError?`<div class="alert-error">${dl(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${dl(e.flashMessage)}</div>`:"",r=ga({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),n=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(o=>{let s=e.compositionCountsByProjectId?.[o.id],i=s!==void 0?`<span class="muted">${dl(i3(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(o.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(o.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(o.id)}">
                  <strong>${dl(o.name)}</strong>
                  <span class="muted mono">${dl(o.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${n}
    </section>`}});var Gj=l(()=>{"use strict";Uj();Yy();Bj()});var Pm,Vj=l(()=>{"use strict";Pm=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var qj,er,tw=l(()=>{"use strict";qj=m(require("node:path"));Ut();bt();B();ae();Ve();er=e=>{let t=F()?.layout.installDir??E();if(qj.default.basename(t)===Br)return Ft;let r=F(),n=r!==null?Ee(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):Ft}});var rw,Kj=l(()=>{"use strict";Ve();tw();rw=async e=>{let t=Le(e.installDir),r=t?.bundleVersion??null,n=er(t);try{let o=await uo(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Qr(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var nw,Jj=l(()=>{"use strict";nw=e=>!e});var ow,os,sw=l(()=>{"use strict";B();ow=()=>`http://127.0.0.1:${ff()}/update/run`,os=async e=>{try{let t=await fetch(ow(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var a3,Yj,iw,Xj=l(()=>{"use strict";B();te();sw();a3=()=>{Ht({launchAgentLabel:re(),installDir:E()})},Yj=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},iw=async()=>{a3();let e=await os({force:!0});if(e.ok)return{ok:!0,message:Yj(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:Yj(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ve(),cE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var aw=l(()=>{"use strict";$A();Vj();tw();Kj();Jj();Xj();sw()});var Zj,Qj=l(()=>{"use strict";Zj=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var eD,tD,lw,cw,rD=l(()=>{"use strict";eD=require("node:crypto"),tD=m(require("node:fs"));ut();ae();ae();Qj();lw=!1,cw=async e=>{if(lw)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!Zj(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=F();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&tD.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,eD.randomUUID)();lw=!0;try{if(await Fy(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await So({...r,workspace:o},e.writerAgent,t);return await Mi(n,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{lw=!1}}});var nD=l(()=>{"use strict";rD()});var Ze,l3,oD,sD,dw,uw,pw,mw,gw,fw,hw=l(()=>{"use strict";Ze=require("node:crypto"),l3=Buffer.from("302a300506032b6570032100","hex"),oD=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},sD=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Ze.createPublicKey)({key:Buffer.concat([l3,t]),format:"der",type:"spki"})},dw=()=>{let{publicKey:e,privateKey:t}=(0,Ze.generateKeyPairSync)("ed25519");return{publicKeyRaw:oD(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},uw=e=>(0,Ze.createPrivateKey)(e),pw=(e,t)=>(0,Ze.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),mw=(e,t,r)=>{try{let n=sD(e);return(0,Ze.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},gw=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,fw=()=>(0,Ze.randomBytes)(32).toString("base64url")});var tr,wm,iD,c3,d3,_m,yw,Sw,aD=l(()=>{"use strict";tr=m(require("node:fs")),wm=m(require("node:path"));hw();B();bt();iD=e=>wm.default.join(e.installDir,ur),c3=(e,t)=>{if(e.profileEmail===null||t===iD(e)||tr.default.existsSync(t))return;let r=iD(e);tr.default.existsSync(r)&&(tr.default.mkdirSync(wm.default.dirname(t),{recursive:!0}),tr.default.renameSync(r,t))},d3=e=>{if(!tr.default.existsSync(e))return null;try{let t=tr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},_m=e=>{let t=td(e);c3(e,t);let r=d3(t);if(r!==null)return r;let n=dw();return tr.default.mkdirSync(wm.default.dirname(t),{recursive:!0}),tr.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},yw=e=>{let t=_m(e.layout),r=fw(),n=gw({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=uw(t.privateKeyPem),s=pw(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Sw=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return mw(e.serverPublicKey,t,e.serverAttestation)}});var Aw=l(()=>{"use strict";aD();hw()});var uD,ul,ww,_w,lD,u3,bw,vm,oe,pD,p3,Pw,m3,g3,vw,de,we,rr,f3,cD,dD,pl,ml,mD=l(()=>{"use strict";uD=m(require("node:http")),ul=m(require("node:fs")),ww=m(require("node:path"));Wm();ia();cx();ux();yx();Ro();mA();jA();Kx();Yx();QN();tj();fj();yj();Am();kj();Hj();pn();ut();_r();$j();zj();Gj();aw();Ve();nD();ae();Aw();_w=e=>tA(e)??"never",lD=48e3,u3=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,bw=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??cu(),reveal:t.reveal,installed:wr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),vm=async e=>{let t=F();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:vo(t,e)},oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pD=200,p3=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Pw=e=>{let t=e.trim().slice(0,pD),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},m3=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${oe(t)}</div>`,g3=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${oe(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',vw={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},de=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...vw}),e.end(JSON.stringify(r))},we=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},rr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},f3=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=p3(e.healthBadge),n=e.status.wakeError?`<div class="alert-error">${oe(e.status.wakeError)}</div>`:"",o=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=nw(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${aa(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${oe(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${oe(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${oe(_w(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${oe(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${s}
    </section>`},cD=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},dD=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,pD)},pl=e=>{let t=ww.default.join(e.layout.installDir,"link-code.txt"),r=()=>Le(e.layout.installDir),n=()=>{let h=r();return{installBundleVersion:Pm(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},o=async h=>{let y=h.installVersion??r(),u=await i(),S=BA(u),A=h.updateFlash??null,f=GA(A),w=m3(A,h.updateError??null);return zA({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:er(y),installBundleVersionLabel:Pm(y),prependBody:`${f}${w}${S}`,headerUpdateButtonHtml:UA(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await rw(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:Pw("An update is already running.")}),h.end();return}c=!0;try{let u=await iw(),S=u.ok?"/?update=ok":Pw(u.message);h.writeHead(303,{Location:S}),h.end()}catch(u){let S=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:Pw(S)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",S=n(),A=await o({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:S.installVersion,body:`<section class="card">
      <h1>${oe(y)}</h1>
      <p>${oe(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(A)},g=()=>{if(ul.default.existsSync(t))return ul.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return ul.default.writeFileSync(t,h,"utf8"),h},b=uD.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",S=h.method??"GET";if(S==="OPTIONS"){y.writeHead(204,vw),y.end();return}if(!await RP({method:S,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:ej(ww.default.dirname(e.layout.configPath)),readBody:rr,sendHtml:we,renderShell:o})){if(S==="GET"&&u==="/health"){let A=e.controllers.getStatus(),f=n();de(y,200,{ok:!0,...A,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/status"){let A=n();de(y,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/traffic"){de(y,200,{entries:oa(e.layout)});return}if(S==="DELETE"&&u==="/api/traffic"||S==="POST"&&u==="/api/traffic/clear"){if(oA(e.layout),S==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}de(y,200,{ok:!0});return}if(S==="GET"&&u==="/api/trace"){de(y,200,{entries:Yu(e.layout)});return}if(S==="DELETE"&&u==="/api/trace"||S==="POST"&&u==="/api/trace/clear"){if(aA(e.layout),S==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}de(y,200,{ok:!0});return}if(S==="POST"&&u==="/api/errors/clear"){lA(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(S==="GET"&&u==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let w=await Ho({layout:e.layout,query:f,limit:20});de(y,200,{chunks:w,query:f});return}de(y,200,{chunks:Do(e.layout).slice(-50).reverse()});return}if(S==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(S==="GET"&&u==="/api/update-status"){let A=await i();de(y,200,{ok:!0,...A});return}if((S==="GET"||S==="POST")&&u==="/api/update"){await d(y);return}if(S==="GET"&&u==="/"){let A=e.controllers.getStatus(),f=n(),w=wr(e.layout),_=Xu(e.layout.errorLogPath);we(y,await o({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:cD(h.url??void 0),updateError:dD(h.url??void 0),body:VA({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:Do(e.layout).length,trafficEntryCount:oa(e.layout).length,wakeError:A.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(S==="GET"&&u==="/task"){let A=e.controllers.getStatus(),f=n(),w=F(),_=new URL(h.url??"/",`http://127.0.0.1:${43347}`),v=_.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=_.searchParams.get("failed")==="1"?_.searchParams.get("error")?.trim()??"Task failed.":null,R=_.searchParams.get("runId");we(y,await o({title:"Task",activePath:"/task",installVersion:f.installVersion,body:kP({defaultWorkspace:w?.workspace??"",wsConnected:A.wsConnected,flashMessage:v,flashError:L,lastRunId:R})}));return}if(S==="POST"&&u==="/task/dispatch"){let A=await rr(h),f=new URLSearchParams(A),w=f.get("prompt")?.trim()??"",_=f.get("writerAgent")?.trim()??"claude-cli",v=f.get("projectFolder")?.trim()??"",L=await cw({prompt:w,writerAgent:_,...v.length>0?{projectFolderPath:v}:{}}),R=new URLSearchParams;L.ok?R.set("ok","1"):(R.set("failed","1"),L.errorMessage!==void 0&&R.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&R.set("runId",L.agentRunId),y.writeHead(303,{Location:`/task?${R.toString()}`}),y.end();return}if(S==="GET"&&u==="/writer-sessions"){let A=n(),f=fm(e.layout,12);we(y,await o({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:cD(h.url??void 0),updateError:dD(h.url??void 0),body:NP({sessions:f})}));return}if(S==="GET"&&u==="/errors"){let A=n(),f=Xu(e.layout.errorLogPath);we(y,await o({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:dA({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(S==="GET"&&u==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),w=ye(e.layout),_=w!==null?Oe(w,12e4):gA(f.lastHeartbeatAt,12e4),v=fA({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:_}),L=n();we(y,await o({title:"Status",activePath:"/status",installVersion:L.installVersion,body:`${f3({status:f,healthBadge:v,revived:A.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:L.installBundleVersion,installBundleUpdatedAt:L.installBundleUpdatedAt})}${SA({installDir:e.layout.installDir})}${yA({entries:Yu(e.layout)})}`}));return}if(S==="GET"&&u==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=oa(e.layout),w=n(),_=f.map(R=>`<tr><td title="${oe(R.at)}">${oe(_w(R.at))}</td><td>${oe(R.direction)}</td><td><code>${oe(R.type)}</code></td><td>${oe(R.summary)}</td><td>${oe(R.action??"")}</td></tr>`).join(""),v=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${_}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',L=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";we(y,await o({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${L}
              ${v}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(S==="GET"&&u==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=n(),w=er(f.installVersion),_=await vm(e.layout),v=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,L=F(),R=L===null?null:Z({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),T=R===null?{}:Object.fromEntries((await Promise.all(_.projects.map(async I=>{let D=await QP(R,I.id);return[I.id,D?.counts??null]}))).filter(I=>I[1]!==null));we(y,await o({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:ew({projects:_.projects,compositionCountsByProjectId:T,cloudAppOrigin:w,syncMessage:_.message,syncOk:_.ok,flashMessage:null,flashError:v})}));return}if(S==="GET"&&u==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=F(),_=w===null?null:Z({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),v=f.length>0&&_!==null?vr():null;if(v===null||_===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Ue({projectFolderPath:v}),!await Hi(_,f,v)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(S==="GET"&&u==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=A.searchParams.get("id")?.trim()??"",w=n(),_=await vm(e.layout),v=hn(_.projects,f);if(v===null){await p(y,"Project not found");return}let L=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,R=A.searchParams.get("knowledgePromoted"),T=R!==null?`Marked ${R} lesson(s) as promoted in Agent Witch.`:null,I=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,D=A.searchParams.get("tab")?.trim()??"harness",le=D==="workflows"||D==="agents"||D==="knowledge"?D:"harness",V=F(),q=V===null?null:Z({wsUrl:V.wsUrl,pairingToken:V.pairingToken}),Dr=q===null?null:await QP(q,v.id),H=0;if(q!==null)try{let _e=await fetch(`${q.appOrigin}/api/agent-witch/projects/${encodeURIComponent(v.id)}/knowledge`,{method:"GET",headers:{[De]:q.pairingToken},signal:AbortSignal.timeout(1e4)});if(_e.ok){let yt=await _e.json();typeof yt=="object"&&yt!==null&&typeof yt.candidateCount=="number"&&(H=yt.candidateCount)}}catch{H=0}we(y,await o({title:v.name,activePath:"/projects",installVersion:w.installVersion,body:Wo({project:v,installed:wr(e.layout),linkedSetSlugs:br(v.projectFolderPath),composition:Dr,knowledgeCandidateCount:H,activeTab:le,flashMessage:L??T,flashError:I})}));return}if(S==="POST"&&u==="/projects/pull-bound-harness"){let A=await rr(h),f=await Xy({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await p(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let w=n();we(y,await o({title:f.title,activePath:"/projects",installVersion:w.installVersion,body:f.body}));return}if(S==="POST"&&u==="/projects/link-harness"){let A=await rr(h),f=new URLSearchParams(A),w=f.get("projectId")?.trim()??"",_=await vm(e.layout),v=hn(_.projects,w);if(v===null){await p(y,"Project not found");return}let L=f.getAll("applySet").map(V=>String(V)),R=Li({layout:e.layout,projectFolderPath:v.projectFolderPath,setSlugs:L});if(!R.ok){let V=n();we(y,await o({title:v.name,activePath:"/projects",installVersion:V.installVersion,body:Wo({project:v,installed:wr(e.layout),linkedSetSlugs:br(v.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:R.errorMessage})}));return}let T=F(),I=T===null?null:Z({wsUrl:T.wsUrl,pairingToken:T.pairingToken}),D=I===null?!1:await ji(I,v.id,R.appliedSetSlugs),le=new URLSearchParams({linked:"1",files:String(R.writtenFileCount),bindingsSynced:D?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${le.toString()}`}),y.end();return}if(S==="POST"&&u==="/project/knowledge/promote-all"){let A=await rr(h),w=new URLSearchParams(A).get("projectId")?.trim()??"",_=await vm(e.layout),v=hn(_.projects,w);if(v===null){await p(y,"Project not found");return}let L=F(),R=L===null?null:Z({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),T=R===null?{ok:!1,promotedCount:0}:await Fj(R,v.id),I=new URLSearchParams({tab:"knowledge",...T.ok?{knowledgePromoted:String(T.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${I.toString()}`}),y.end();return}if(S==="GET"&&u==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=n(),w=Ci(e.layout),_=A.searchParams.get("submitted")==="1",v=_?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,L=w?.scanRoots[0]??cu(),R=u3(e.layout,{reveal:w,importQuery:A.searchParams.get("import")==="1",justSubmitted:_}),T=er(f.installVersion);we(y,await o({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:cl(bw(e.layout,{cloudAppOrigin:T,reveal:w,scanFolder:L,flashMessage:v,importSectionExpanded:R}))}));return}if(S==="POST"&&u==="/api/harness/pick-folder"){let A=vr();if(A===null){de(y,200,{cancelled:!0});return}de(y,200,{path:A});return}if(S==="GET"&&u==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=Wi(f);if(w===null){de(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=ul.default.readFileSync(w,"utf8"),v=_.length>lD?`${_.slice(0,lD)}
\u2026 (truncated)`:_;de(y,200,{content:v})}catch{de(y,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&u==="/api/harness/reveal/add-project"){let A=await rr(h),f="";try{let v=JSON.parse(A);typeof v=="object"&&v!==null&&typeof v.projectPath=="string"&&(f=v.projectPath.trim())}catch{de(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){de(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=Ci(e.layout),_=Ty({reveal:w,projectPath:f});if(_===null||_.sets.length===0){de(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}mu(e.layout,_),de(y,200,{ok:!0,setCount:_.sets.length});return}if(S==="GET"&&u==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){de(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...vw});let _=xy({scanRoot:f,response:y,shouldAbort:()=>w});mu(e.layout,_),y.end();return}if(S==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&u==="/harness/submit"){let A=Ci(e.layout);if(A===null){let T=n(),I=er(T.installVersion);we(y,await o({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:cl(bw(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await rr(h),w=new URLSearchParams(f),_=ZP(w,A),v=Oy({layout:e.layout,sets:_});if(!v.ok){let T=n(),I=er(T.installVersion);we(y,await o({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:cl(bw(e.layout,{cloudAppOrigin:I,reveal:A,flashError:v.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}Ny(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${v.writtenItemCount??0}${R}`}),y.end();return}if(S==="GET"&&u==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=F()?.writerExecutionBackend??Re(void 0),_=he(e.layout.configPath),v=hr(_),L=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=n();we(y,await o({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:YP({writerExecutionBackend:w,secrets:v,flashMessage:L})}));return}if(S==="POST"&&u==="/writer-api"){let A=await rr(h),f=new URLSearchParams(A),w=f.get("writerExecutionBackend")?.trim()??"cli";zh({configPath:e.layout.configPath,writerExecutionBackend:Re(w),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(S==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(S==="GET"&&u==="/history"){let A=n();we(y,await o({title:"History",activePath:"/history",installVersion:A.installVersion,body:MP({reportsDir:e.layout.reportsDir})}));return}if(S==="GET"&&u==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=n(),_=WA({layout:e.layout}),v=RA(_),L=f.length>0?await Ho({layout:e.layout,query:f,limit:20}):Do(e.layout).slice(-50).reverse(),R=L.map(I=>{let D=EA(_,I.id),le=D>0?` \xB7 used in ${D} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${oe(I.createdAt)}">${oe(_w(I.createdAt))}${I.source?` \xB7 ${oe(I.source)}`:""}${le}</div><pre>${oe(I.text)}</pre></article>`}).join(""),T=v.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${v.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${oe(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";we(y,await o({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${oe(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${T}${R}${g3(f,L.length)}`}));return}S==="POST"&&await rr(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return b.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),b.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${zt}`)}),b},ml=e=>_m(e).publicKeyRaw});var Wm=l(()=>{"use strict";qT();KT();mD()});var fD={};St(fD,{runAgentWitchExternalLiveCli:()=>y3});var Ww,gD,h3,y3,hD=l(()=>{"use strict";Ww=m(require("node:fs")),gD=m(require("node:path"));Ro();B();te();Wm();te();h3=e=>{let t=gD.default.join(e,"link-code.txt");if(!Ww.default.existsSync(t))return null;let r=Ww.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},y3=()=>{Fe("agent-witch-live");let e=E(),t=M(),r=h3(e),n=ml(t);pl({layout:t,controllers:{getStatus:()=>{let o=ye(t);return{wsConnected:Ki(t,{socketOpen:!0}),lastHeartbeatAt:o?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:n}},reviveWebSocket:()=>{Jr(e)}}})}});var nr=W((R_e,AD)=>{"use strict";var yD=["nodebuffer","arraybuffer","fragments"],SD=typeof Blob<"u";SD&&yD.push("blob");AD.exports={BINARY_TYPES:yD,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:SD,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var gl=W((k_e,Lm)=>{"use strict";var{EMPTY_BUFFER:S3}=nr(),Lw=Buffer[Symbol.species];function A3(e,t){if(e.length===0)return S3;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new Lw(r.buffer,r.byteOffset,n):r}function bD(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function PD(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function b3(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Ew(e){if(Ew.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Lw(e):ArrayBuffer.isView(e)?t=new Lw(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Ew.readOnly=!1),t}Lm.exports={concat:A3,mask:bD,toArrayBuffer:b3,toBuffer:Ew,unmask:PD};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Lm.exports.mask=function(t,r,n,o,s){s<48?bD(t,r,n,o,s):e.mask(t,r,n,o,s)},Lm.exports.unmask=function(t,r){t.length<32?PD(t,r):e.unmask(t,r)}}catch{}});var vD=W((C_e,_D)=>{"use strict";var wD=Symbol("kDone"),Rw=Symbol("kRun"),kw=class{constructor(t){this[wD]=()=>{this.pending--,this[Rw]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Rw]()}[Rw](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[wD])}}};_D.exports=kw});var as=W((T_e,RD)=>{"use strict";var fl=require("zlib"),WD=gl(),P3=vD(),{kStatusCode:LD}=nr(),w3=Buffer[Symbol.species],_3=Buffer.from([0,0,255,255]),Rm=Symbol("permessage-deflate"),or=Symbol("total-length"),ss=Symbol("callback"),Or=Symbol("buffers"),is=Symbol("error"),Em,Cw=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Em){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Em=new P3(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[ss];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){Em.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){Em.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?fl.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=fl.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Rm]=this,this._inflate[or]=0,this._inflate[Or]=[],this._inflate.on("error",W3),this._inflate.on("data",ED)}this._inflate[ss]=n,this._inflate.write(t),r&&this._inflate.write(_3),this._inflate.flush(()=>{let s=this._inflate[is];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=WD.concat(this._inflate[Or],this._inflate[or]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[or]=0,this._inflate[Or]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?fl.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=fl.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[or]=0,this._deflate[Or]=[],this._deflate.on("data",v3)}this._deflate[ss]=n,this._deflate.write(t),this._deflate.flush(fl.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=WD.concat(this._deflate[Or],this._deflate[or]);r&&(s=new w3(s.buffer,s.byteOffset,s.length-4)),this._deflate[ss]=null,this._deflate[or]=0,this._deflate[Or]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};RD.exports=Cw;function v3(e){this[Or].push(e),this[or]+=e.length}function ED(e){if(this[or]+=e.length,this[Rm]._maxPayload<1||this[or]<=this[Rm]._maxPayload){this[Or].push(e);return}this[is]=new RangeError("Max payload size exceeded"),this[is].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[is][LD]=1009,this.removeListener("data",ED),this.reset()}function W3(e){if(this[Rm]._inflate=null,this[is]){this[ss](this[is]);return}e[LD]=1007,this[ss](e)}});var ls=W((x_e,km)=>{"use strict";var{isUtf8:kD}=require("buffer"),{hasBlob:L3}=nr(),E3=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function R3(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Tw(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function k3(e){return L3&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}km.exports={isBlob:k3,isValidStatusCode:R3,isValidUTF8:Tw,tokenChars:E3};if(kD)km.exports.isValidUTF8=function(e){return e.length<24?Tw(e):kD(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");km.exports.isValidUTF8=function(t){return t.length<32?Tw(t):e(t)}}catch{}});var Nw=W((I_e,ND)=>{"use strict";var{Writable:C3}=require("stream"),CD=as(),{BINARY_TYPES:T3,EMPTY_BUFFER:TD,kStatusCode:x3,kWebSocket:I3}=nr(),{concat:xw,toArrayBuffer:O3,unmask:M3}=gl(),{isValidStatusCode:N3,isValidUTF8:xD}=ls(),Cm=Buffer[Symbol.species],Qe=0,ID=1,OD=2,MD=3,Iw=4,Ow=5,Tm=6,Mw=class extends C3{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||T3[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[I3]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Qe}_write(t,r,n){if(this._opcode===8&&this._state==Qe)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Cm(n.buffer,n.byteOffset+t,n.length-t),new Cm(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new Cm(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Qe:this.getInfo(t);break;case ID:this.getPayloadLength16(t);break;case OD:this.getPayloadLength64(t);break;case MD:this.getMask();break;case Iw:this.getData(t);break;case Ow:case Tm:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[CD.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=ID:this._payloadLength===127?this._state=OD:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=MD:this._state=Iw}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Iw}getData(t){let r=TD;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&M3(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=Ow,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[CD.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Qe&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Qe;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=xw(n,r):this._binaryType==="arraybuffer"?o=O3(xw(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=Qe):(this._state=Tm,setImmediate(()=>{this.emit("message",o,!0),this._state=Qe,this.startLoop(t)}))}else{let o=xw(n,r);if(!this._skipUTF8Validation&&!xD(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Ow||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=Qe):(this._state=Tm,setImmediate(()=>{this.emit("message",o,!1),this._state=Qe,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,TD),this.end();else{let n=t.readUInt16BE(0);if(!N3(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new Cm(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!xD(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=Qe;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Qe):(this._state=Tm,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Qe,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[x3]=o,i}};ND.exports=Mw});var Hw=W((M_e,HD)=>{"use strict";var{Duplex:O_e}=require("stream"),{randomFillSync:j3}=require("crypto"),{types:{isUint8Array:D3}}=require("util"),jD=as(),{EMPTY_BUFFER:H3,kWebSocket:$3,NOOP:F3}=nr(),{isBlob:cs,isValidStatusCode:z3}=ls(),{mask:DD,toBuffer:Hn}=gl(),et=Symbol("kByteLength"),U3=Buffer.alloc(4),xm=8*1024,$n,ds=xm,ht=0,B3=1,G3=2,jw=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=ht,this.onerror=F3,this[$3]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||U3,r.generateMask?r.generateMask(n):(ds===xm&&($n===void 0&&($n=Buffer.alloc(xm)),j3($n,0,xm),ds=0),n[0]=$n[ds++],n[1]=$n[ds++],n[2]=$n[ds++],n[3]=$n[ds++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[et]!==void 0?a=r[et]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(o?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=n[0],d[s-3]=n[1],d[s-2]=n[2],d[s-1]=n[3],i?[d,t]:o?(DD(t,n,d,s,a),[d]):(DD(t,n,t,0,a),[d,t])):[d,t]}close(t,r,n,o){let s;if(t===void 0)s=H3;else{if(typeof t!="number"||!z3(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(D3(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[et]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==ht?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):cs(t)?(o=t.size,s=!1):(t=Hn(t),o=t.length,s=Hn.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[et]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};cs(t)?this._state!==ht?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ht?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):cs(t)?(o=t.size,s=!1):(t=Hn(t),o=t.length,s=Hn.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[et]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};cs(t)?this._state!==ht?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ht?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[jD.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):cs(t)?(a=t.size,c=!1):(t=Hn(t),a=t.length,c=Hn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[et]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};cs(t)?this._state!==ht?this.enqueue([this.getBlobData,t,this._compress,d,n]):this.getBlobData(t,this._compress,d,n):this._state!==ht?this.enqueue([this.dispatch,t,this._compress,d,n]):this.dispatch(t,this._compress,d,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[et],this._state=G3,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(Dw,this,a,o);return}this._bufferedBytes-=n[et];let i=Hn(s);r?this.dispatch(i,r,n,o):(this._state=ht,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(V3,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[jD.extensionName];this._bufferedBytes+=n[et],this._state=B3,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");Dw(this,c,o);return}this._bufferedBytes-=n[et],this._state=ht,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===ht&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][et],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][et],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};HD.exports=jw;function Dw(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function V3(e,t,r){Dw(e,t,r),e.onerror(t)}});var KD=W((N_e,qD)=>{"use strict";var{kForOnEventAttribute:hl,kListener:$w}=nr(),$D=Symbol("kCode"),FD=Symbol("kData"),zD=Symbol("kError"),UD=Symbol("kMessage"),BD=Symbol("kReason"),us=Symbol("kTarget"),GD=Symbol("kType"),VD=Symbol("kWasClean"),sr=class{constructor(t){this[us]=null,this[GD]=t}get target(){return this[us]}get type(){return this[GD]}};Object.defineProperty(sr.prototype,"target",{enumerable:!0});Object.defineProperty(sr.prototype,"type",{enumerable:!0});var Fn=class extends sr{constructor(t,r={}){super(t),this[$D]=r.code===void 0?0:r.code,this[BD]=r.reason===void 0?"":r.reason,this[VD]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[$D]}get reason(){return this[BD]}get wasClean(){return this[VD]}};Object.defineProperty(Fn.prototype,"code",{enumerable:!0});Object.defineProperty(Fn.prototype,"reason",{enumerable:!0});Object.defineProperty(Fn.prototype,"wasClean",{enumerable:!0});var ps=class extends sr{constructor(t,r={}){super(t),this[zD]=r.error===void 0?null:r.error,this[UD]=r.message===void 0?"":r.message}get error(){return this[zD]}get message(){return this[UD]}};Object.defineProperty(ps.prototype,"error",{enumerable:!0});Object.defineProperty(ps.prototype,"message",{enumerable:!0});var yl=class extends sr{constructor(t,r={}){super(t),this[FD]=r.data===void 0?null:r.data}get data(){return this[FD]}};Object.defineProperty(yl.prototype,"data",{enumerable:!0});var q3={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[hl]&&o[$w]===t&&!o[hl])return;let n;if(e==="message")n=function(s,i){let a=new yl("message",{data:i?s:s.toString()});a[us]=this,Im(t,this,a)};else if(e==="close")n=function(s,i){let a=new Fn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[us]=this,Im(t,this,a)};else if(e==="error")n=function(s){let i=new ps("error",{error:s,message:s.message});i[us]=this,Im(t,this,i)};else if(e==="open")n=function(){let s=new sr("open");s[us]=this,Im(t,this,s)};else return;n[hl]=!!r[hl],n[$w]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[$w]===t&&!r[hl]){this.removeListener(e,r);break}}};qD.exports={CloseEvent:Fn,ErrorEvent:ps,Event:sr,EventTarget:q3,MessageEvent:yl};function Im(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Om=W((j_e,JD)=>{"use strict";var{tokenChars:Sl}=ls();function Ot(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function K3(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&Sl[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);d===44?(Ot(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&Sl[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),Ot(r,e.slice(c,p),!0),d===44&&(Ot(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(o){if(Sl[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:n||(n=!0),o=!1}else if(s)if(Sl[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&Sl[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);n&&(h=h.replace(/\\/g,""),n=!1),Ot(r,a,h),d===44&&(Ot(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let b=e.slice(c,p);return i===void 0?Ot(t,b,r):(a===void 0?Ot(r,b,!0):n?Ot(r,a,b.replace(/\\/g,"")):Ot(r,a,b),Ot(t,i,r)),t}function J3(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}JD.exports={format:J3,parse:K3}});var Dm=W(($_e,aH)=>{"use strict";var Y3=require("events"),X3=require("https"),Z3=require("http"),ZD=require("net"),Q3=require("tls"),{randomBytes:e4,createHash:t4}=require("crypto"),{Duplex:D_e,Readable:H_e}=require("stream"),{URL:Fw}=require("url"),Mr=as(),r4=Nw(),n4=Hw(),{isBlob:o4}=ls(),{BINARY_TYPES:YD,CLOSE_TIMEOUT:s4,EMPTY_BUFFER:Mm,GUID:i4,kForOnEventAttribute:zw,kListener:a4,kStatusCode:l4,kWebSocket:fe,NOOP:QD}=nr(),{EventTarget:{addEventListener:c4,removeEventListener:d4}}=KD(),{format:u4,parse:p4}=Om(),{toBuffer:m4}=gl(),eH=Symbol("kAborted"),Uw=[8,13],ir=["CONNECTING","OPEN","CLOSING","CLOSED"],g4=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Y=class e extends Y3{constructor(t,r,n){super(),this._binaryType=YD[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Mm,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),tH(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){YD.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new r4({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new n4(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[fe]=this,s[fe]=this,t[fe]=this,o.on("conclude",y4),o.on("drain",S4),o.on("error",A4),o.on("message",b4),o.on("ping",P4),o.on("pong",w4),s.onerror=_4,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",oH),t.on("data",jm),t.on("end",sH),t.on("error",iH),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Mr.extensionName]&&this._extensions[Mr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ge(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),nH(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Bw(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Mm,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Bw(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Mm,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Bw(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Mr.extensionName]||(o.compress=!1),this._sender.send(t||Mm,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ge(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Y,"CONNECTING",{enumerable:!0,value:ir.indexOf("CONNECTING")});Object.defineProperty(Y.prototype,"CONNECTING",{enumerable:!0,value:ir.indexOf("CONNECTING")});Object.defineProperty(Y,"OPEN",{enumerable:!0,value:ir.indexOf("OPEN")});Object.defineProperty(Y.prototype,"OPEN",{enumerable:!0,value:ir.indexOf("OPEN")});Object.defineProperty(Y,"CLOSING",{enumerable:!0,value:ir.indexOf("CLOSING")});Object.defineProperty(Y.prototype,"CLOSING",{enumerable:!0,value:ir.indexOf("CLOSING")});Object.defineProperty(Y,"CLOSED",{enumerable:!0,value:ir.indexOf("CLOSED")});Object.defineProperty(Y.prototype,"CLOSED",{enumerable:!0,value:ir.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Y.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Y.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[zw])return t[a4];return null},set(t){for(let r of this.listeners(e))if(r[zw]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[zw]:!0})}})});Y.prototype.addEventListener=c4;Y.prototype.removeEventListener=d4;aH.exports=Y;function tH(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:s4,protocolVersion:Uw[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!Uw.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${Uw.join(", ")})`);let s;if(t instanceof Fw)s=t;else try{s=new Fw(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Nm(e,u);return}let d=i?443:80,p=e4(16).toString("base64"),g=i?X3.request:Z3.request,b=new Set,h;if(o.createConnection=o.createConnection||(i?h4:f4),o.defaultPort=o.defaultPort||d,o.port=s.port||d,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(h=new Mr({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=u4({[Mr.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!g4.test(u)||b.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");b.add(u)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let u=o.path.split(":");o.socketPath=u[0],o.path=u[1]}let y;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let u=n&&n.headers;if(n={...n,headers:{}},u)for(let[S,A]of Object.entries(u))n.headers[S.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,u||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),y=e._req=g(o),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=g(o);o.timeout&&y.on("timeout",()=>{Ge(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[eH]||(y=e._req=null,Nm(e,u))}),y.on("response",u=>{let S=u.headers.location,A=u.statusCode;if(S&&o.followRedirects&&A>=300&&A<400){if(++e._redirects>o.maxRedirects){Ge(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new Fw(S,t)}catch{let _=new SyntaxError(`Invalid URL: ${S}`);Nm(e,_);return}tH(e,f,r,n)}else e.emit("unexpected-response",y,u)||Ge(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,S,A)=>{if(e.emit("upgrade",u),e.readyState!==Y.CONNECTING)return;y=e._req=null;let f=u.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){Ge(e,S,"Invalid Upgrade header");return}let w=t4("sha1").update(p+i4).digest("base64");if(u.headers["sec-websocket-accept"]!==w){Ge(e,S,"Invalid Sec-WebSocket-Accept header");return}let _=u.headers["sec-websocket-protocol"],v;if(_!==void 0?b.size?b.has(_)||(v="Server sent an invalid subprotocol"):v="Server sent a subprotocol but none was requested":b.size&&(v="Server sent no subprotocol"),v){Ge(e,S,v);return}_&&(e._protocol=_);let L=u.headers["sec-websocket-extensions"];if(L!==void 0){if(!h){Ge(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=p4(L)}catch{Ge(e,S,"Invalid Sec-WebSocket-Extensions header");return}let T=Object.keys(R);if(T.length!==1||T[0]!==Mr.extensionName){Ge(e,S,"Server indicated an extension that was not requested");return}try{h.accept(R[Mr.extensionName])}catch{Ge(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Mr.extensionName]=h}e.setSocket(S,A,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(y,e):y.end()}function Nm(e,t){e._readyState=Y.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function f4(e){return e.path=e.socketPath,ZD.connect(e)}function h4(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=ZD.isIP(e.host)?"":e.host),Q3.connect(e)}function Ge(e,t,r){e._readyState=Y.CLOSING;let n=new Error(r);Error.captureStackTrace(n,Ge),t.setHeader?(t[eH]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Nm,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function Bw(e,t,r){if(t){let n=o4(t)?t.size:m4(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${ir[e.readyState]})`);process.nextTick(r,n)}}function y4(e,t){let r=this[fe];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[fe]!==void 0&&(r._socket.removeListener("data",jm),process.nextTick(rH,r._socket),e===1005?r.close():r.close(e,t))}function S4(){let e=this[fe];e.isPaused||e._socket.resume()}function A4(e){let t=this[fe];t._socket[fe]!==void 0&&(t._socket.removeListener("data",jm),process.nextTick(rH,t._socket),t.close(e[l4])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function XD(){this[fe].emitClose()}function b4(e,t){this[fe].emit("message",e,t)}function P4(e){let t=this[fe];t._autoPong&&t.pong(e,!this._isServer,QD),t.emit("ping",e)}function w4(e){this[fe].emit("pong",e)}function rH(e){e.resume()}function _4(e){let t=this[fe];t.readyState!==Y.CLOSED&&(t.readyState===Y.OPEN&&(t._readyState=Y.CLOSING,nH(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function nH(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function oH(){let e=this[fe];if(this.removeListener("close",oH),this.removeListener("data",jm),this.removeListener("end",sH),e._readyState=Y.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[fe]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",XD),e._receiver.on("finish",XD))}function jm(e){this[fe]._receiver.write(e)||this.pause()}function sH(){let e=this[fe];e._readyState=Y.CLOSING,e._receiver.end(),this.end()}function iH(){let e=this[fe];this.removeListener("error",iH),this.on("error",QD),e&&(e._readyState=Y.CLOSING,this.destroy())}});var uH=W((z_e,dH)=>{"use strict";var F_e=Dm(),{Duplex:v4}=require("stream");function lH(e){e.emit("close")}function W4(){!this.destroyed&&this._writableState.finished&&this.destroy()}function cH(e){this.removeListener("error",cH),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function L4(e,t){let r=!0,n=new v4({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(lH,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(lH,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",W4),n.on("error",cH),n}dH.exports=L4});var Gw=W((U_e,pH)=>{"use strict";var{tokenChars:E4}=ls();function R4(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&E4[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}pH.exports={parse:R4}});var AH=W((G_e,SH)=>{"use strict";var k4=require("events"),Hm=require("http"),{Duplex:B_e}=require("stream"),{createHash:C4}=require("crypto"),mH=Om(),zn=as(),T4=Gw(),x4=Dm(),{CLOSE_TIMEOUT:I4,GUID:O4,kWebSocket:M4}=nr(),N4=/^[+/0-9A-Za-z]{22}==$/,gH=0,fH=1,yH=2,Vw=class extends k4{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:I4,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:x4,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Hm.createServer((n,o)=>{let s=Hm.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=j4(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=gH}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===yH){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Al,this);return}if(t&&this.once("close",t),this._state!==fH)if(this._state=fH,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Al,this):process.nextTick(Al,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Al(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",hH);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Un(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Un(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!N4.test(s)){Un(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Un(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){bl(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=T4.parse(c)}catch{Un(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let b=new zn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=mH.parse(p);h[zn.extensionName]&&(b.accept(h[zn.extensionName]),g[zn.extensionName]=b)}catch{Un(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let b={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(b,(h,y,u,S)=>{if(!h)return bl(r,y||401,u,S);this.completeUpgrade(g,s,d,t,r,n,o)});return}if(!this.options.verifyClient(b))return bl(r,401)}this.completeUpgrade(g,s,d,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[M4])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>gH)return bl(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${C4("sha1").update(r+O4).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(n.size){let g=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[zn.extensionName]){let g=t[zn.extensionName].params,b=mH.format({[zn.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${b}`),p._extensions=t}this.emit("headers",d,o),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",hH),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Al,this)})),a(p,o)}};SH.exports=Vw;function j4(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function Al(e){e._state=yH,e.emit("close")}function hH(){this.destroy()}function bl(e,t,r,n){r=r||Hm.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Hm.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function Un(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,Un),e.emit("wsClientError",i,r,t)}else bl(r,n,o,s)}});var D4,H4,$4,F4,z4,U4,bH,B4,Pl,PH=l(()=>{D4=m(uH(),1),H4=m(Om(),1),$4=m(as(),1),F4=m(Nw(),1),z4=m(Hw(),1),U4=m(Gw(),1),bH=m(Dm(),1),B4=m(AH(),1),Pl=bH.default});var qw,Kw,Jw=l(()=>{"use strict";qw="AGENT_WITCH_EXTERNAL_BRIDGE",Kw="AGENT_WITCH_EXTERNAL_LIVE"});var Yw,wH=l(()=>{"use strict";Yw=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var G4,Xw,_H=l(()=>{"use strict";Jw();wH();G4=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",Xw=(e={})=>{let t=e.env??process.env,r=Yw(t[qw]),n=Yw(t[Kw]);return{mode:G4(r,n),skipInProcessBridge:r,skipInProcessLive:n}}});var vH=l(()=>{"use strict";Jw()});var WH=l(()=>{"use strict";_H();vH()});var Zw=l(()=>{"use strict"});var ar,wl=l(()=>{"use strict";ar=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var ms,Bn,LH,q4,Qw,e_,EH,RH,t_,kH,_l,r_=l(()=>{"use strict";ms=m(require("node:fs")),Bn=m(require("node:os")),LH=m(require("node:path"));Zw();wl();q4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qw=(e=Bn.default.hostname())=>LH.default.join(Bn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),e_=e=>{if(!ms.default.existsSync(e))return null;try{let t=JSON.parse(ms.default.readFileSync(e,"utf8"));return!q4(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},EH=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},RH=(e,t)=>{ms.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},t_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Qw(),n=e_(r);if(n!==null&&n.pid!==process.pid&&ar(n.pid)&&EH(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:Bn.default.hostname(),macOsUsername:Bn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return RH(r,o),{ok:!0}},kH=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Qw(),n=e_(r);return n!==null&&n.pid!==process.pid&&ar(n.pid)&&EH(n)?{ok:!1}:(RH(r,{hostname:Bn.default.hostname(),macOsUsername:Bn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},_l=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Qw();e_(r)?.pid===process.pid&&ms.default.existsSync(r)&&ms.default.unlinkSync(r)}});var n_,vl,K4,J4,Y4,X4,o_,CH=l(()=>{"use strict";n_=require("node:child_process"),vl=m(require("node:path"));wl();ud();K4=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),J4=(e,t)=>{if(K4(e)||!/\bnode\b/.test(e))return!1;let r=vl.default.resolve(t),n=vl.default.join(r,"app",Hs),o=vl.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Hs||i==="agent-witch.ts")return e.includes(r);try{let a=vl.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},Y4=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,n_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},X4=(e,t,r)=>{let n=Y4(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||J4(d,t)&&o.push(c)}return o},o_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,n_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=X4(r,e.installDir,t),o=[];for(let s of n)if(ar(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var Wl,Ll,TH,Z4,s_,xH=l(()=>{"use strict";Wl=m(require("node:fs")),Ll=m(require("node:path"));We();TH=(e,t)=>{!Wl.default.existsSync(e)||Wl.default.existsSync(t)||(Wl.default.mkdirSync(Ll.default.dirname(t),{recursive:!0}),Wl.default.renameSync(e,t))},Z4=e=>{if(e.profileEmail===null)return;let t=Ll.default.join(e.installDir,rt);TH(Ll.default.join(t,Xn),e.mainLogPath),TH(Ll.default.join(t,Zn),e.errorLogPath)},s_=e=>{let t=M();e!==void 0&&t.installDir!==e||Z4(t)}});var Q4,IH=l(()=>{"use strict";ta();Ku();Ku();Q4={};!it()&&Zr(Q4.url)&&(async()=>{Fe("agent-witch-wake-server");let e=await bn(),t=$t(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var OH=l(()=>{"use strict";IH()});var MH=l(()=>{"use strict";Fi()});var i_,NH=l(()=>{"use strict";Zw();OH();r_();MH();i_=async(e={})=>{let t=e.skipInProcessBridge?null:await qu();Lu();let r=setInterval(()=>{Lu()},6e4),n=setInterval(()=>{if(!kH().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t?.close()}}}});var El,$m,rJ,jH,DH,Fm,HH,$H,a_,FH,zm,zH=l(()=>{"use strict";El=m(require("node:fs")),$m=m(require("node:path")),rJ="pending-run-inputs.json",jH=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),DH=e=>{let t=e.profileEmail?$m.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return $m.default.join(t,rJ)},Fm=e=>{let t=DH(e);if(!El.default.existsSync(t))return{};try{let r=JSON.parse(El.default.readFileSync(t,"utf8"));return jH(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!jH(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},HH=(e,t)=>{let r=DH(e);El.default.mkdirSync($m.default.dirname(r),{recursive:!0}),El.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},$H=e=>Object.values(Fm(e)),a_=(e,t)=>Fm(e)[t]!==void 0,FH=(e,t)=>{let r=Fm(e);r[t.agentRunId]=t,HH(e,r)},zm=(e,t)=>{let r=Fm(e);delete r[t],HH(e,r)}});var Um=l(()=>{"use strict";ae()});var UH=l(()=>{"use strict";ae()});var Bm=l(()=>{"use strict";ae()});var Gm=l(()=>{"use strict";ae()});var Rl=l(()=>{"use strict";ae()});var nJ,oJ,kl,l_=l(()=>{"use strict";lt();Um();UH();Bm();Gm();Rl();nJ={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},oJ={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},kl=e=>{if(!se(e.writerAgent))return"the selected writer";let t=ze(e.writerAgent);if(Re(e.writerExecutionBackend)==="api"&&t!==null){let r=je(he(e.configPath),t);if(r!==null&&r.apiKey.length>0){let n=ii(t,r.model);return`${oJ[t]} model ${n}`}}return nJ[e.writerAgent]}});var sJ,iJ,BH,GH,VH=l(()=>{"use strict";sJ=/"input_tokens"\s*:\s*(\d+)/,iJ=/"output_tokens"\s*:\s*(\d+)/,BH=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},GH=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=BH(sJ.exec(t)),n=BH(iJ.exec(t));if(r===null||n===null)return null;let o=r+n;return o>=1?o:null}});var Vm=l(()=>{"use strict";ut()});var Cl,qm,aJ,c_,qH,KH,JH,d_,YH=l(()=>{"use strict";Cl=m(require("node:fs")),qm=m(require("node:path"));Vm();aJ="run-completion-outbox.json",c_=e=>{let t=e.profileEmail?qm.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return qm.default.join(t,aJ)},qH=e=>{let t=c_(e);if(!Cl.default.existsSync(t))return[];try{let r=JSON.parse(Cl.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},KH=(e,t)=>{Cl.default.mkdirSync(qm.default.dirname(c_(e)),{recursive:!0}),Cl.default.writeFileSync(c_(e),JSON.stringify(t,null,2),"utf8")},JH=(e,t)=>{let r=[...qH(e).filter(n=>n.runId!==t.runId),t];KH(e,r)},d_=async e=>{if(e.cloudApi===null)return;let t=qH(e.layout);if(t.length===0)return;let r=[];for(let n of t)await Mi(e.cloudApi,n.runId,n.exitCode,n.output,{estimateSeconds:n.estimateSeconds,actualSeconds:n.actualSeconds})||r.push(n);KH(e.layout,r)}});var XH=l(()=>{"use strict"});var u_,Tl,cJ,Gn,ZH=l(()=>{"use strict";XH();u_=new Map,Tl=e=>{let t=u_.get(e);t!==void 0&&(clearInterval(t),u_.delete(e))},cJ=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},Gn=(e,t,r,n={})=>{Tl(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){Tl(t);return}let i=n.onTick?.()??{};cJ(e,t,o,i)};s(),u_.set(t,setInterval(s,15e3))}});var QH=l(()=>{"use strict";ut()});var e$,t$=l(()=>{"use strict";QH();e$=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:qe(t)}});var p_,xl,lr,m_,Mt,r$,Km=l(()=>{"use strict";p_=new Set,xl=new Map,lr=(e,t)=>{if(t.length===0)return;let r=xl.get(e)??[];r.push(t),xl.set(e,r)},m_=e=>{p_.add(e);let t=xl.get(e)??[];return xl.delete(e),t},Mt=e=>p_.has(e),r$=e=>{p_.delete(e),xl.delete(e)}});var Jm,n$,dJ,o$,s$=l(()=>{"use strict";Jm=m(require("node:path")),n$=require("node:url");ro();dJ={},o$=()=>{if(it()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Jm.default.dirname(Jm.default.resolve(e))}return Jm.default.dirname((0,n$.fileURLToPath)(dJ.url))}});var i$,a$,l$,c$,$e,gs,d$,u$,fs,g_,f_,h_,p$,y_,m$,Ym=l(()=>{"use strict";i$=require("node:crypto"),a$=m(require("node:fs")),l$=m(require("node:path")),c$=require("node:url");wl();ro();s$();$e=new Map,d$=async()=>{if(gs!==void 0)return gs;try{if(it()){let e=o$(),t=l$.default.join(e,"deps","node-pty","lib","index.js");if(a$.default.existsSync(t)){let r=await import((0,c$.pathToFileURL)(t).href);return gs=r,r}}return gs=await import("node-pty"),gs}catch{return gs=null,null}},u$=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},fs=(e,t,r)=>{let n=$e.get(e);if(n!==void 0){$e.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},g_=(e,t)=>{let r=$e.get(e);return r===void 0?!1:(r.pty.write(t),!0)},f_=(e,t,r)=>{let n=$e.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},h_=e=>{for(let t of $e.values())if(!(t.mode!=="agent"||t.runId!==e))return ar(t.pty.pid);return!1},p$=e=>{for(let[t,r]of $e.entries())if(!(r.mode!=="agent"||r.runId!==e)){$e.delete(t);try{r.pty.kill()}catch{}return!0}return!1},y_=async e=>{let t=await d$();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;$e.get(e.shellSessionId)!==void 0&&fs(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return $e.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{u$(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{$e.get(e.shellSessionId)?.pty===o&&($e.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},m$=async e=>{let t=e.shellSessionId??(0,i$.randomUUID)(),r=await d$();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return $e.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{u$(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{$e.get(t)?.pty===n&&($e.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var Xm,g$,f$=l(()=>{"use strict";Xm="[[AWAITING_INPUT]]",g$=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Xm,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Il,h$,Zm=l(()=>{"use strict";f$();Il=e=>{let t=e.indexOf(Xm);if(t<0)return null;let n=e.slice(t+Xm.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},h$=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",g$].join(`
`)});var y$,S$=l(()=>{"use strict";Km();Ym();Zm();y$=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(Mt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}lr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await m$({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=Il(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var A$,b$,P$,cr,Qm=l(()=>{"use strict";A$=require("node:child_process"),b$=m(require("node:fs")),P$=m(require("node:path"));ud();cr=(e,t)=>{let r=P$.default.join(e,"app",kL,"ensure-writer.sh");return b$.default.existsSync(r)?new Promise((n,o)=>{let s=(0,A$.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var w$,Vn,Ml,eg,S_,Ol,tg,rg,A_,b_,uJ,hs,pJ,mJ,P_,w_=l(()=>{"use strict";w$=require("node:child_process");lt();Qm();Bm();Um();Rl();Gm();Vn=new Map,Ml=e=>e==="cursor"||e==="antigravity",eg=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",S_=e=>Vn.get(e)?.warmed===!0,Ol=e=>{let t=Vn.get(e);Vn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},tg=e=>Vn.get(e)?.conversationStarted===!0,rg=e=>{let t=Vn.get(e);Vn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},A_=e=>{Vn.delete(e)},b_=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",uJ={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},hs=e=>`${uJ[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,pJ=(e,t,r,n)=>new Promise(o=>{let s=vd(t,r),i=[],a=(0,w$.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),n?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{o({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{o({exitCode:-1,output:d.message})})}),mJ=(e,t)=>{let r=hs(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},P_=async e=>{if(!se(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=ze(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let n=he(e.runConfig.layout.configPath);return je(n,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Ol(e.writerAgent),{exitCode:0,output:hs(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await cr(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}Ml(e.writerAgent)&&Ol(e.writerAgent);let t=await pJ(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?mJ(e.writerAgent,t.output):hs(e.writerAgent)}}});var qn,__=l(()=>{"use strict";qn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var _$,gJ,fJ,v$,hJ,v_,W$=l(()=>{"use strict";__();_$=/you(?:'|')ve hit your session limit/i,gJ=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],fJ=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,v$=(e,t)=>{for(let r of e.split(/\r?\n/)){let n=r.trim();if(n.length>0&&t.test(n))return n}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},hJ=e=>{let t=fJ.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},v_=e=>{let t=e.trim();if(t.length===0)return null;if(_$.test(t))return{code:qn.SESSION_LIMIT,resetHint:hJ(t),matchedLine:v$(t,_$)};for(let r of gJ)if(r.test(t))return{code:qn.PROVIDER_QUOTA,resetHint:null,matchedLine:v$(t,r)};return null}});var ng,og,W_,L_=l(()=>{"use strict";ng="[[AGENT_RUN_WRITER_EXECUTION]]",og="cli-writer-api-key-missing",W_="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var E_=l(()=>{"use strict";L_()});var L$=l(()=>{"use strict";E_()});var sg=l(()=>{"use strict";__();W$();L_();E_();L$()});var ig,E$=l(()=>{"use strict";ig={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var R$,k$=l(()=>{"use strict";R$="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var C$,T$=l(()=>{"use strict";sg();k$();C$=e=>e.code===qn.SESSION_LIMIT?R$:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var x$,I$=l(()=>{"use strict";sg();E$();T$();x$=e=>{let t=v_(e.output);return t!==null?{status:ig.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:C$(t)}:{status:e.exitCode===0?ig.COMPLETED:ig.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var R_,QWe,O$=l(()=>{"use strict";R_={OPEN:"open",APPROVAL:"approval"},QWe=R_.APPROVAL});var ys,ag,M$,AJ,N$,j$,D$,Nl,k_,C_=l(()=>{"use strict";ys=m(require("node:fs")),ag=m(require("node:path")),M$="runs",AJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),N$=e=>{let t=e.profileEmail!==null?ag.default.join(e.installDir,"profiles",e.profileEmail,M$):ag.default.join(e.installDir,M$);return ys.default.mkdirSync(t,{recursive:!0}),t},j$=(e,t)=>ag.default.join(N$(e),`${t}.json`),D$=(e,t)=>{ys.default.writeFileSync(j$(e,t.id),JSON.stringify(t,null,2))},Nl=(e,t)=>{let r=j$(e,t);if(!ys.default.existsSync(r))return null;try{let n=JSON.parse(ys.default.readFileSync(r,"utf8"));return!AJ(n)||typeof n.id!="string"?null:n}catch{return null}},k_=e=>{let t=N$(e),r=ys.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=Nl(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var bJ,H$,$$=l(()=>{"use strict";I$();O$();C_();bJ=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",n=x$({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:n.status,dispatchPolicy:R_.OPEN,resultOutput:e.output,resultExitCode:n.resultExitCode,resultOutcomeCode:n.resultOutcomeCode,denialReason:n.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},H$=(e,t)=>{let r=bJ(t);return D$(e,r),r}});var F$=l(()=>{"use strict";Am()});var z$,U$=l(()=>{"use strict";sg();z$=()=>[ng,`agentRunWriterExecutionBackend=${og}`,`agentRunWriterExecutionReasonCode=${W_}`].join(`
`)});var Nr,lg=l(()=>{"use strict";Nr=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var T_,PJ,wJ,B$,G$=l(()=>{"use strict";T_=e=>e.toLocaleString("en-US"),PJ=e=>e<.01?e.toFixed(4):e.toFixed(3),wJ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${PJ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${T_(e.inputTokens)} in / ${T_(e.outputTokens)} out (${T_(e.totalTokens)} total)`,t].join(`
`)},B$=(e,t)=>{if(t===void 0)return e;let r=wJ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var V$=l(()=>{"use strict";ae()});var K$,jl,ue,x_,cg,q$,_J,vJ,J$,Y$,X$,Dl,I_,O_,M_,Z$,WJ,tt,Hl,jr,Q$,LJ,EJ,dg,N_,j_,D_,eF=l(()=>{"use strict";K$=require("node:child_process");ae();lt();zH();nl();l_();VH();Wd();YH();Vm();ZH();wl();t$();Km();Ym();Zm();S$();w_();$$();F$();U$();lg();G$();ao();V$();Rl();Bs();Zm();jl=new Map,ue=new Map,x_=new Set,cg=new Map,q$=e=>{e!==void 0&&!cg.has(e)&&cg.set(e,Date.now())},_J=(e,t,r,n)=>{let o=n.endsWith(`
`)?n:`${n}
`;if(Mt(t)){tt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:o},requestId:r});return}lr(t,o)},vJ=(e,t,r,n,o)=>{if(!Bh(e,o))return;let s=`${z$()}
`;_J(t,r,n,s);let i=ue.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},J$=130,Y$=`

Stopped by user.`,X$=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:Nr(e)},Dl=null,I_=e=>{Dl=e},O_=(e,t)=>{if(Dl===null)return;let r=xP(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||zy(Dl,t,r)},M_=async e=>{await d_({layout:e,cloudApi:Dl})},Z$=e=>{let t=jl.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:ar(t.pid)},WJ=e=>ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),tt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Hl=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=to(s),c=ue.get(r);if(a!==null&&c!==void 0){let d=HL(a),p=Z$(r)||h_(r);d!==null&&!p&&jr(e,t,r,n,d.exitCode,d.output,c.originalPrompt)}return DL(a)}}),jr=(e,t,r,n,o,s,i,a)=>{let c=fo(s,a),d=o,p=B$(c.output,c.llmUsage);if(r!==void 0){let b=cg.get(r);cg.delete(r),b!==void 0&&CP({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-b)/1e3))});let h=GH(c.llmUsage,p);h!==null&&uj({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&x_.has(r)&&(x_.delete(r),d=J$,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${Y$}`:"Stopped by user.");let g=r!==void 0?xP(e.layout.reportsDir,r):null;if(r!==void 0){Tl(r),gi(e.layout,r),Mt(r)&&(tt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),r$(r));let b=ue.get(r);lj({reportsDir:e.layout.reportsDir,agentRunId:r,input:Nr(i),output:p,...b!==void 0?{writerLabel:kl({writerAgent:b.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),b!==void 0&&ym({layout:e.layout,writerAgent:b.writerAgent,projectFolderPath:b.projectFolderPath,userPrompt:b.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),H$(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),JH(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),d_({layout:e.layout,cloudApi:Dl}),ue.delete(r),jl.delete(r),zm(e.layout,r)}tt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:n}),Qs(e.layout)},Q$=(e,t,r,n,o,s,i)=>{let a=ue.get(r),c=a?.accumulatedOutput??s;FH(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),Gn(t,r,()=>a_(e.layout,r),Hl(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),tt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},LJ=(e,t,r,n,o,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(o===void 0||h.length===0)){if(Mt(o)){tt(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:h},requestId:n});return}lr(o,h)}};if(o!==void 0){let h=ue.get(o);jl.set(o,t),ue.set(o,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),tt(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),Gn(r,o,()=>Z$(o),Hl(e,r,o,n,h?.projectFolderPath,h?.reportKey))}let g=a==="claude-cli",b=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(g?b.push(y):(c.push(y),p(y)),d||o===void 0)return;let u=Il(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let S=ue.get(o),A=[S?.accumulatedOutput??"",u.partialOutput].filter(f=>f.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=A),jl.delete(o),Q$(e,r,o,n,u.question,A,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;rg(a);let y=o!==void 0?ue.get(o):void 0,u=g?fo(b.join("")):{output:c.join("").trim(),llmUsage:void 0},S=g?c.join("").trim():"",A=[u.output.trim(),S].filter(w=>w.length>0).join(`
`);g&&u.output.trim().length>0&&p(u.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;jr(e,r,o,n,h??-1,f,s,u.llmUsage)}),t.on("error",h=>{d||jr(e,r,o,n,-1,h.message,s)})},EJ=(e,t,r,n,o,s,i,a,c)=>{let d=X$(r,c);s!==void 0&&(ue.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),tt(o,{type:"terminal.stream.start",payload:{runId:s},requestId:n}),Gn(o,s,()=>ue.has(s),Hl(e,o,s,n,i,a))),di(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Mt(s)){tt(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:n});return}lr(s,g)}}).then(g=>{rg(t),jr(e,o,s,n,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let b=g instanceof Error?g.message:String(g);jr(e,o,s,n,-1,b,r)})},dg=(e,t,r,n,o,s,i,a,c,d,p,g)=>{let b=X$(r,p);if(Zs(e.layout),an(e,t)){q$(s),EJ(e,t,r,n,o,s,c,d,b);return}let h=_t(t,r,WJ(e),i);if(h===null){jr(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}q$(s);let y=e$({workspace:e.workspace,projectFolderPath:c}),u=()=>{let S=(0,K$.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:g??process.env});LJ(e,S,o,n,s,r,b,t)};if(s===void 0){u();return}ue.set(s,{originalPrompt:r,userTranscriptPrompt:b,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:ue.get(s)?.accumulatedOutput??""}),vJ(e,o,s,n,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Us({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Gn(o,s,()=>ue.has(s),Hl(e,o,s,n,c,d)),y$({socket:o,sendMessage:tt,requestId:n,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:S=>{a!==void 0&&fs(a,w=>{tt(o,w)},n);let A=ue.get(s),f=[A?.accumulatedOutput??"",S.partialOutput].filter(w=>w.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),Q$(e,o,s,n,S.question,f,r)},onFinished:(S,A)=>{rg(t);let f=fo(A),w=ue.get(s),_=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${f.output}`.trim():f.output;jr(e,o,s,n,S,_,r,f.llmUsage)}}).then(S=>{if(!S){u();return}Gn(o,s,()=>h_(s),Hl(e,o,s,n,c,d))}).catch(S=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",S instanceof Error?S.message:S),u()})},N_=(e,t,r,n)=>{zm(e.layout,t.agentRunId),t.shellSessionId!==void 0&&tt(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=h$(t),s=ue.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;dg(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},j_=(e,t)=>{for(let r of $H(e.layout))ue.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:Nr(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Gn(t,r.agentRunId,()=>a_(e.layout,r.agentRunId),{awaitingInput:!0}),tt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},D_=(e,t,r,n)=>{let o=ue.get(r);if(o===void 0)return!1;x_.add(r),Tl(r);let s=jl.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(p$(r))return!0;zm(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${Y$}`:"Stopped by user.";return jr(e,t,r,n,J$,i,o.originalPrompt),!0}});var RJ,H_,tF=l(()=>{"use strict";Si();RJ=()=>`http://127.0.0.1:${ct()}/restart`,H_=async()=>{try{let e=await fetch(RJ(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var rF=l(()=>{"use strict";ia()});var nF=l(()=>{"use strict";aw()});var oF,sF=l(()=>{"use strict";oF=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var $l,kJ,$_,iF=l(()=>{"use strict";B();te();rF();ES();nF();sF();ao();$l=(e,t)=>{Wr(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},kJ=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ih(),sh)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},$_=async e=>{let t=Le(e.layout.installDir)?.bundleVersion??null;if(!oF({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(at(e.layout)){ei({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),$l(e.layout,{summary:r,action:"install-bundle-update-start"}),Ht({launchAgentLabel:re(e.layout.installDir),installDir:e.layout.installDir});let n=await os({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),$l(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await kJ();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),$l(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),$l(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),$l(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var CJ,F_,aF=l(()=>{"use strict";CJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F_=e=>{if(!CJ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var z_,U_,lF=l(()=>{"use strict";aS();lS();z_=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=zi({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},U_=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Kt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var cF,TJ,xJ,IJ,Fl,dF=l(()=>{"use strict";cF=m(require("node:os"));We();TJ="Default",xJ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),IJ=e=>{let t=cF.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Fl=()=>{let e=M(),t=ed(e),r=xJ(TJ);return`${IJ(t)}/${r.length>0?r:"project"}`}});var uF=l(()=>{"use strict";ia()});var pF,B_,mF=l(()=>{"use strict";uF();pF=!1,B_=e=>{pF||(pF=!0,process.on("uncaughtException",t=>{wn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;wn(e,{kind:"crash",message:r,stack:n})}))}});var gF,OJ,G_,fF=l(()=>{"use strict";gF=require("node:child_process");Qm();lt();Bm();Um();Rl();Gm();OJ=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,gF.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},G_=async e=>{if(!se(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=ze(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let n=he(e.layout.configPath),o=je(n,r),s=o!==null&&o.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await cr(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await OJ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var V_,hF=l(()=>{"use strict";V_=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var yF,q_,SF=l(()=>{"use strict";yF=require("node:crypto"),q_=()=>(0,yF.randomUUID)()});var Ss,AF,ug=l(()=>{"use strict";Ss="[[WORKING_ESTIMATE]]",AF=(e,t,r,n="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Ss,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var bF,PF=l(()=>{"use strict";bF=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var MJ,wF,_F=l(()=>{"use strict";ug();MJ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,wF=e=>{if(!e.includes(Ss))return null;let t=null;for(let r of e.matchAll(MJ)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var NJ,K_,vF=l(()=>{"use strict";_F();NJ=/^(\d{1,6})\b/,K_=e=>{let t=wF(e);if(t!==null)return t;let r=NJ.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return!Number.isFinite(n)||n<=0?null:n}});var jJ,DJ,HJ,pg,J_=l(()=>{"use strict";lt();na();jJ="http://127.0.0.1:11434",DJ=45e3,HJ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},pg=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||jJ,n=t===void 0?(await mt({commands:ie({})})).estimateModel:t;if(n===null||n.trim().length===0)return null;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:n,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(DJ)});return o.ok?HJ(await o.json()):null}catch{return null}}});var Y_,X_,Z_,WF=l(()=>{"use strict";Bs();ug();lg();PF();vF();nl();J_();Y_=async e=>{let t=Nr(e.wrappedPrompt),r=cj(e.reportsDir);return{estimateOutput:await pg(AF(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},X_=e=>{let t=K_(e.estimateOutput);t!==null&&dm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},Z_=e=>{let t=K_(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=bF(t);return zs({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Pt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),dm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var mg,LF,Q_=l(()=>{"use strict";mg="[[WORKING_TOKEN_ESTIMATE]]",LF=(e,t,r,n="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",mg,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var EF,$J,RF,kF=l(()=>{"use strict";Q_();EF=/^(\d{1,8})\b/,$J=e=>{let t=e.indexOf(mg);if(t<0)return null;let r=e.slice(t+mg.length).trim(),n=EF.exec(r);if(n===null)return null;let o=Number.parseInt(n[1]??"",10);return Number.isFinite(o)&&o>=1?o:null},RF=e=>{let t=$J(e);if(t!==null)return t;let r=EF.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return Number.isFinite(n)&&n>=1?n:null}});var ev,tv,CF=l(()=>{"use strict";Q_();lg();kF();nl();J_();ev=async e=>{let t=Nr(e.wrappedPrompt),r=pj(e.reportsDir);return{estimateOutput:await pg(LF(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},tv=e=>{let t=RF(e.estimateOutput);return t===null?null:(dj({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var TF=l(()=>{"use strict";r_();CH();xH();NH();Si();eF();Qm();lt();C_();Km();tF();hS();iF();ao();aF();lF();Vm();dF();mF();fF();pd();hF();SF();ug();Bs();WF();CF();l_();na();Ym();w_()});var xF={};St(xF,{buildContinuationPromptWithContext:()=>UJ});var FJ,zJ,UJ,IF=l(()=>{"use strict";FJ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,zJ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),UJ=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=zJ(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${FJ(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var OF={};St(OF,{readHarnessExportSets:()=>GJ});var zl,rv,gg,BJ,GJ,MF=l(()=>{"use strict";zl=m(require("node:fs")),rv=m(require("node:path"));We();gg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BJ=e=>{if(!zl.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(zl.default.readFileSync(e.harnessManifestPath,"utf8"));if(gg(t))return t}catch{return null}return null},GJ=(e,t)=>{let r=M(t),n=BJ(r);if(n===null)return[];let o=gg(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!gg(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!gg(p))continue;let g=typeof p.path=="string"?p.path:void 0,b=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(g===void 0||b.length===0||h.length===0||y.length===0)continue;let u=g.startsWith("shared/")?rv.default.join(r.harnessRootDir,g):rv.default.join(r.harnessSetsDir,i,g);zl.default.existsSync(u)&&d.push({id:b,kind:h,title:y,content:zl.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var cv,ov,As,NF,VJ,jF,DF,nv,HF,sv,iv,av,X,U,lv,qJ,Ul,KJ,JJ,YJ,XJ,ZJ,QJ,e6,t6,Bl,$F=l(()=>{"use strict";cv=require("node:child_process"),ov=m(require("node:fs")),As=m(require("node:os"));PH();B();te();Ro();Aw();WH();ae();Ve();ia();jA();Wm();Am();ut();pn();DS();Ut();TF();NF=3e4,VJ=3e4,jF=new Map,DF=new Map,nv=new Map,HF=new Map,sv=new Map,iv=new Map,av=new Map,X=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),U=(e,t,r)=>{e.readyState===Pl.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Wr(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Ju(r,"out",t)))},lv=e=>e,qJ=e=>{if(!ov.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(ov.default.readFileSync(e.harnessManifestPath,"utf8"));if(X(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Ul=(e,t)=>{let r=qJ(t);r!==null&&U(e,{type:"harness.manifest.report",payload:{hostname:As.default.hostname(),manifest:r}})},KJ=async(e,t,r,n,o,s,i=!1,a,c,d,p,g)=>{let b=g?.trim()??"";if(!se(t)){U(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let h=kl({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await mt({commands:ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?Y_({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,S=s!==void 0?ev({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=Ml(t)&&!S_(t);if(A){try{await cr(e.layout.installDir,t)}catch(H){let _e=H instanceof Error?H.message:String(H);U(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_e}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Ol(t)}else if(!Ml(t))try{await cr(e.layout.installDir,t)}catch(H){let _e=H instanceof Error?H.message:String(H);U(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_e}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let f=pi(d,Fl,g);if(f===null){U(o,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Ue({projectFolderPath:f,...b.length>0?{projectId:b}:{}}),i||ll(e.layout,t,f);let w=Sm({sessionContinuation:i,supportsWriterSessionContinuation:eg(t),isWriterConversationStarted:tg(t)}),_=i&&w==="first"?al(e.layout,t,f):null,v=_!==null?ns(e.layout,_):null,L=v!==null&&v.turns.length>0,R=qP({sessionContinuation:i,supportsWriterSessionContinuation:eg(t),isWriterConversationStarted:tg(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:L,userPromptCharacterCount:r.length}),T=r;if(R.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?Nl(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:_e}=await Promise.resolve().then(()=>(IF(),xF));T=_e({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else R.continuationStrategy==="transcript_seed"&&v!==null&&v.turns.length>0&&(T=mm({priorTurns:v.turns,userMessage:r}));let I=R.ragLimit>0?await Ho({layout:e.layout,query:T,limit:R.ragLimit,minScore:R.ragMinScore,projectFolderPath:f,...b.length>0?{projectId:b}:{}}):[],D=R.ragLimit>0&&f.trim().length>0?await MA({layout:e.layout,query:T,limit:2,minScore:.32,projectFolderPath:f,...b.length>0?{projectId:b}:{}}):[],le=R.injectMemory?jP(e.layout,f,b.length>0?b:void 0):[],V=`${HP(le,R.memoryEntryLimit)}${xA(I)}${NA(D)}${T}`,q=p?.trim()??(s!==void 0&&f.trim().length>0?q_():void 0);if(s!==void 0&&q!==void 0&&q.length>0&&f.trim().length>0){Us({reportKey:q,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=V;u!==null&&u.then(_e=>{if(_e===null)return;let yt=Z_({estimateOutput:_e.estimateOutput??"",reportKey:q,agentRunId:s,reportsDir:e.layout.reportsDir,task:_e.task,writerLabel:_e.writerLabel,embedding:_e.embedding});if(yt.estimateSeconds===null)return;O_(e.layout.reportsDir,s);let Gl=`${Ss}
${yt.estimateSeconds}
`;if(Mt(s)){U(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Gl},requestId:n});return}lr(s,Gl)}).catch(()=>{}),V=V_(H),V=Tf(V,{agentRunId:s,reportKey:q,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then(H=>{H!==null&&X_({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&S!==null&&S.then(H=>{H!==null&&tv({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let Dr=s!==void 0&&av.get(s)===!0;if(s!==void 0&&f.trim().length>0){let H=await vu(f);iv.set(s,H),q!==void 0&&q.length>0&&sv.set(s,q)}dg(e,t,V,n,lv(o),s,{sessionTurn:R.sessionTurn},a,f,q,r,Dh(e.layout,s,Dr)),A&&s!==void 0&&U(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:b_(t)},requestId:n})},JJ=async(e,t,r,n,o)=>{let s=(i,a)=>{U(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await P_({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,U(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:n})}}),c=se(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?hs(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},YJ=(e,t,r)=>new Promise(n=>{if(!se(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=_t(t,r,ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,cv.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),XJ=async(e,t,r,n)=>{if(t.installMethod!=="deterministic-bundle")return!1;U(n,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let o=Wt(t.bundle),s=X(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(o!==null)return o;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=Ee(e.wsUrl)??Ft,g=await vy({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return U(n,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=un({bundle:i,layout:e.layout});return U(n,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Ul(n,e.layout),!0},ZJ=async(e,t,r,n)=>{if(await XJ(e,t,r,n))return;let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(U(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){U(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!se(o)){U(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}Zs(e.layout);let i=await(async()=>{try{await cr(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return YJ(e,o,s)})().finally(()=>{Qs(e.layout)});U(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),Ul(n,e.layout)},QJ=e=>{let t=1e3*2**e;return Math.min(VJ,t)},e6=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(at(e.layout)){Zf(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,H_().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1})}},n=(u,S="system.ack")=>{if(!t.selfUpdateInFlight){if(at(e.layout)){ei({layout:e.layout,remoteBundleVersion:u,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,$_({layout:e.layout,remoteBundleVersion:u,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},o=()=>{let u=ye(e.layout);u!==null&&Oe(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===Pl.OPEN||u.readyState===Pl.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(o,NF)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=QJ(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},g=u=>{s();let S=()=>{let A=Ks(e.layout.installDir),f=ct();U(u,{type:"agent.heartbeat",payload:{hostname:As.default.hostname(),macOsUsername:As.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:A}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,NF)},b=(u,S)=>{if(typeof u.type!="string")return;if(jS(u)){t.stopped=!0,s(),a(),c(),IS({layout:e.layout}).finally(()=>{_l(),process.exit(0)});return}Wr(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),Ju(e.layout,"in",u);let A=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&X(u.payload)){let f=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",_=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",v=typeof u.payload.challenge=="string"?u.payload.challenge:"",L=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!Sw({serverPublicKey:f,origin:w,devicePublicKey:_,challenge:v,serverAttestation:L})){t.wakeError="Server attestation verification failed",Wr(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&X(u.payload)){let f=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Wr(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),G_({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{U(S,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&X(u.payload)){let f=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";f.length>0&&n(f,"install.bundle.update")}if(u.type==="system.ack"){Tu(e.layout,{wsUrl:e.wsUrl});let f=X(u.payload)?u.payload:null,w=F_(f);w!==null&&n(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&X(u.payload)&&z_(u.payload),u.type==="automations.run"&&X(u.payload)&&U_(u.payload),u.type==="terminal.stream.accepted"&&X(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"";if(f.length>0){let w=m_(f);for(let _ of w)U(S,{type:"terminal.stream.chunk",payload:{runId:f,chunk:_},requestId:A})}}if(u.type==="agent.agentRun.list"&&U(S,{type:"dashboard.agentRun.list.result",payload:{runs:k_(e.layout)},requestId:A}),u.type==="agent.agentRun.get"&&X(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"",w=f.length>0?Nl(e.layout,f):null;U(S,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:A})}if(u.type==="command.claude.run"&&X(u.payload)){let f=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&se(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",_=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,v=u.payload.sessionContinuation===!0,L=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,R=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,T=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=pi(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,Fl,T),D=Th(u.payload.compositionSnapshot),le=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${v?"continue":"first"})\u2026`),I===null){U(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:A});return}if(D!==null){let V=Ih(e.layout,D);if(V!==null){U(S,{type:"command.claude.result",payload:{exitCode:-1,output:V,..._!==void 0?{agentRunId:_}:{}},requestId:A});return}if(_!==void 0){let q=Mh(e.layout,_,D);if(!q.ok){U(S,{type:"command.claude.result",payload:{exitCode:-1,output:q.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:A});return}av.set(_,D.entries.some(Dr=>Dr.scope==="run"))}}_!==void 0&&R!==void 0&&jF.set(_,R),_!==void 0&&(DF.set(_,I),T!==void 0&&T.trim().length>0&&nv.set(_,T.trim()),HF.set(_,f.trim()),Ue({projectFolderPath:I,...T!==void 0&&T.trim().length>0?{projectId:T.trim()}:{}})),KJ(e,w,f.trim(),A,S,_,v,R,L,I,le,T)}}if(u.type==="shell.session.open"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,_=typeof u.payload.rows=="number"?u.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),y_({shellSessionId:f,cwd:e.workspace,cols:w,rows:_,send:v=>{U(S,v)},requestId:A}))}if(u.type==="shell.session.close"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";f.length>0&&fs(f,w=>{U(S,w)},A)}if(u.type==="shell.input"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";f.length>0&&w.length>0&&g_(f,w)}if(u.type==="shell.resize"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,_=typeof u.payload.rows=="number"?u.payload.rows:0;f.length>0&&w>0&&_>0&&f_(f,w,_)}if(u.type==="command.writer.session.end"&&X(u.payload)){let f=u.payload.writerAgent;typeof f=="string"&&se(f)&&(A_(f),hm(e.layout,f))}if(u.type==="command.writer.session.start"&&X(u.payload)){let f=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof f=="string"&&se(f)&&w.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),JJ(e,f,w,A,S))}if(u.type==="command.claude.stop"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),D_(e,lv(S),f,A))}if(u.type==="command.claude.input_respond"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",_=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",v=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",L=typeof u.payload.question=="string"?u.payload.question:"";f.length>0&&w.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),N_(e,{agentRunId:f,originalPrompt:_,partialOutput:v,question:L,response:w,shellSessionId:jF.get(f)},A,lv(S)))}if(u.type==="dispatch.approval.required"&&X(u.payload)){let f=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${w}`),process.platform==="darwin"&&(0,cv.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&X(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),ZJ(e,u.payload,A,S)),u.type==="harness.export.request"&&X(u.payload)){let f=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,_=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(v=>typeof v=="string"):[];f.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:v}=await Promise.resolve().then(()=>(MF(),OF)),L=v(_,e.email);U(S,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:f,...w!==void 0?{targetDeviceId:w}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:A})})()}if(u.type==="harness.manifest.request"&&Ul(S,e.layout),u.type==="command.claude.result"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",_=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,v=pi(f!==void 0?DF.get(f):void 0,Fl),L=f!==void 0?nv.get(f):void 0,R=f!==void 0?HF.get(f)??"":"",T=Zy({exitCode:_,output:w});if(T&&v!==null&&TA({layout:e.layout,text:w,source:f??"command.claude.result",projectFolderPath:v,...L!==void 0?{projectId:L}:{}}),_!=null&&_!==0&&w.trim().length>0&&v!==null&&(LA({layout:e.layout,errorText:w,projectFolderPath:v,...L!==void 0?{projectId:L}:{}}),OA({layout:e.layout,text:w,source:f??"command.claude.result.failure",projectFolderPath:v,...L!==void 0?{projectId:L}:{}})),T&&R.trim().length>0&&v!==null&&DP({layout:e.layout,projectFolderPath:v,...L!==void 0?{projectId:L}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:R,output:w,createdAt:new Date().toISOString()}}),f!==void 0&&v!==null){let D=sv.get(f),le=iv.get(f);D!==void 0&&le!==void 0&&vu(v).then(V=>{let q=Qy({before:le,after:V});xf(D,q),iv.delete(f),sv.delete(f)})}if(T&&L!==void 0&&L.trim().length>0){let D=F(),le=D===null?null:Z({wsUrl:D.wsUrl,pairingToken:D.pairingToken});le!==null&&tS(le,L,{...f!==void 0?{sourceRunId:f}:{},lesson:eS({prompt:R,output:w})})}f!==void 0&&(gi(e.layout,f),av.delete(f),nv.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let u=new Pl(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),I_(Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),M_(e.layout);let S=Ee(e.wsUrl)??"http://localhost:3000",A=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=yw({layout:e.layout,origin:S,...A!==void 0&&A.length>0?{claimToken:A}:{}});U(u,{type:"agent.register",payload:{role:"agent",hostname:As.default.hostname(),macOsUsername:As.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),Ul(u,e.layout),j_(e,u),g(u)}),u.on("message",S=>{let A=typeof S=="string"?S:S.toString("utf8");try{let f=JSON.parse(A);if(!X(f))return;b(f,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(S,A)=>{s(),t.socket=void 0,t.wsConnected=!1,uS(e.layout),t.reconnectAttempt+=1;let f=typeof A=="string"?A:A.toString("utf8");wn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:f}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",S=>{t.wakeError=S.message,wn(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return Xf(()=>{let u=Qf();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&n(u.remoteBundleVersion,u.trigger);let S=eh();S!==null&&r(S)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Ki(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:ml(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Ul(u,e.layout),{ok:!0})}}},t6=async()=>{Fe("agent-witch");let e=Xw(),t=E();t_().ok||(process.platform==="darwin"?(await Jr(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),s_(t);let n=o_({installDir:t});n.length>0&&console.log(`[agent-witch] Stopped ${n.length} sibling process(es): ${n.join(", ")}`),process.platform==="darwin"&&(Ht({launchAgentLabel:re(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Ms());let o=await qh(),s=o[0];s!==void 0&&B_(s.layout);for(let h of o){let y=Ee(h.wsUrl)??Ft;Js(h.layout.installDir,y)}let i=o.map(h=>e6(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),_l(),process.exit(0));let c=()=>{o.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let S=ye(h.layout);pS(S,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=o[0]?.layout;h!==void 0&&(at(h)||Ji(h.installDir))},g=await i_({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):pl({layout:o[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let b=$t(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Ns(),d()});d=()=>{b(),g.stop(),_l(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Bl=t6});var dv=l(()=>{"use strict";$F()});var FF={};St(FF,{startAgentWitchClient:()=>Bl});var r6,zF=l(()=>{"use strict";dv();dv();ro();If();gd();r6={};if(Zr(r6.url)&&!it()){let e=process.argv.indexOf("report");e>=0&&process.exit(md(process.argv.slice(e))),Bl()}});kf();If();gd();var zL="20.x",UL="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var qG=e=>[`Node.js ${zL} or newer is required (found ${e}).`,UL].join(" "),BL=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${qG(process.version)}
`),process.exit(1))};var i6={},n6=async()=>{Fe("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ih(),sh)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},o6=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(GC(),BC)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},s6=async()=>{if(!Zr(i6.url))return;BL();let e=process.argv.indexOf("report");e>=0&&process.exit(md(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await n6();return}if(t==="wake"){await o6();return}if(t==="bridge"){let{runAgentWitchBridgeCli:n}=await Promise.resolve().then(()=>(VT(),GT));await n();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:n}=await Promise.resolve().then(()=>(hD(),fD));n();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(zF(),FF));await r()};s6();
