#!/usr/bin/env node
"use strict";var qF=Object.create;var pg=Object.defineProperty;var KF=Object.getOwnPropertyDescriptor;var JF=Object.getOwnPropertyNames;var YF=Object.getPrototypeOf,XF=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var E=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},St=(e,t)=>{for(var r in t)pg(e,r,{get:t[r],enumerable:!0})},ZF=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of JF(t))!XF.call(e,o)&&o!==r&&pg(e,o,{get:()=>t[o],enumerable:!(n=KF(t,o))||n.enumerable});return e};var m=(e,t,r)=>(r=e!=null?qF(YF(e)):{},ZF(t||!e||!e.__esModule?pg(r,"default",{value:e,enumerable:!0}):r,e));var Kn=E(mg=>{"use strict";Object.defineProperty(mg,"__esModule",{value:!0});mg.stringify=QF;function QF(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=E(gg=>{"use strict";Object.defineProperty(gg,"__esModule",{value:!0});gg.generateTypeGuardError=ez;var cv=Kn();function ez(e,t,r){return(0,cv.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,cv.stringify)(e)}) to be "${r}"`}});var dr=E(Gl=>{"use strict";Object.defineProperty(Gl,"__esModule",{value:!0});Gl.isNonNullObject=void 0;var tz=O(),rz=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,tz.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Gl.isNonNullObject=rz});var At=E(pe=>{"use strict";Object.defineProperty(pe,"__esModule",{value:!0});pe.attachTypeGuardMeta=pe.isArrayTypeGuard=pe.isNestedObjectTypeGuard=pe.getTypeGuardWrapperKind=pe.getTypeGuardInnerGuard=pe.getTypeGuardItemGuard=pe.getTypeGuardSchema=void 0;var nz=e=>e.schema;pe.getTypeGuardSchema=nz;var oz=e=>e.itemGuard;pe.getTypeGuardItemGuard=oz;var sz=e=>e.innerGuard;pe.getTypeGuardInnerGuard=sz;var iz=e=>e.wrapperKind;pe.getTypeGuardWrapperKind=iz;var az=e=>{if((0,pe.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};pe.isNestedObjectTypeGuard=az;var lz=e=>{if((0,pe.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};pe.isArrayTypeGuard=lz;var cz=(e,t)=>Object.assign(e,t);pe.attachTypeGuardMeta=cz});var bs=E($r=>{"use strict";Object.defineProperty($r,"__esModule",{value:!0});$r.getExpectedTypeName=$r.getTypeGuardDisplayName=void 0;var dv=At(),dz=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};$r.getTypeGuardDisplayName=dz;var uz=e=>{let t=(0,dv.getTypeGuardWrapperKind)(e),r=(0,dv.getTypeGuardInnerGuard)(e);if(t&&r){let o=(0,$r.getExpectedTypeName)(r);if(t==="undefinedOr")return`${o} | undefined`;if(t==="nullOr")return`${o} | null`;if(t==="nilOr")return`${o} | null | undefined`}let n=e.name;if(n.startsWith("is")){let o=n.slice(2);return o.endsWith("Guard")&&(o=o.slice(0,-5)),o==="Type"||o==="Schema"?"object":o==="Array"?"Array":o.toLowerCase()}return"unknown"};$r.getExpectedTypeName=uz});var Fr=E(Vl=>{"use strict";Object.defineProperty(Vl,"__esModule",{value:!0});Vl.createValidationResult=void 0;var pz=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Vl.createValidationResult=pz});var Jn=E(ql=>{"use strict";Object.defineProperty(ql,"__esModule",{value:!0});ql.createValidationError=void 0;var mz=(e,t,r,n)=>({path:e,expectedType:t,actualValue:r,message:n});ql.createValidationError=mz});var Yn=E(Kl=>{"use strict";Object.defineProperty(Kl,"__esModule",{value:!0});Kl.createTreeNode=void 0;var gz=(e,t,r,n)=>({valid:t,path:e,...r&&{expectedType:r},...n!==void 0&&{actualValue:n},children:{},errors:[]});Kl.createTreeNode=gz});var Ps=E(Jl=>{"use strict";Object.defineProperty(Jl,"__esModule",{value:!0});Jl.combineResults=void 0;var fz=Fr(),hz=(e,t)=>{let r=e.every(s=>s.valid),n=e.flatMap(s=>s.errors),o={valid:r,path:t||"root",children:{},errors:n};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";o.children[i]=s.tree}}),(0,fz.createValidationResult)(r,n,o)};Jl.combineResults=hz});var Xl=E(Yl=>{"use strict";Object.defineProperty(Yl,"__esModule",{value:!0});Yl.createSimplifiedTree=void 0;var uv=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,n])=>{t[r]=uv(n)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},yz=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let n={};Object.entries(e.children).forEach(([o,s])=>{n[o]=uv(s)}),r[t]={valid:e.valid,value:n}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Yl.createSimplifiedTree=yz});var _s=E(Ql=>{"use strict";Object.defineProperty(Ql,"__esModule",{value:!0});Ql.validateObject=void 0;var Sz=dr(),ws=Fr(),Az=Jn(),Zl=Yn(),bz=Ps(),pv=ec(),Pz=(e,t,r)=>{let n=()=>{let i=(0,Az.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Zl.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,ws.createValidationResult)(!1,[],a):(0,ws.createValidationResult)(!1,[i],a)},o=()=>{let i=Object.keys(t);if(i.length===0)return(0,ws.createValidationResult)(!0,[],(0,Zl.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,b=t[g],h=e[g],y=(0,pv.validateProperty)(g,h,b,r);return y.valid?p.length===0?(0,ws.createValidationResult)(!0,[],(0,Zl.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,pv.validateProperty)(d,e[d],p,r)}),a=(0,bz.combineResults)(i,r.path),c=(0,Zl.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,ws.createValidationResult)(a.valid,a.errors,c)};return(0,Sz.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?o():s():n()};Ql.validateObject=Pz});var gv=E(nc=>{"use strict";Object.defineProperty(nc,"__esModule",{value:!0});nc.validateArray=void 0;var wz=Kn(),tc=Fr(),mv=Jn(),rc=Yn(),_z=Ps(),vz=_s(),Ez=bs(),Lz=At(),Wz=(e,t,r)=>{let n=r.path;if(!Array.isArray(e)){let c=(0,mv.createValidationError)(n,"Array",e,`Expected ${n} (${JSON.stringify(e)}) to be "Array"`),d=(0,rc.createTreeNode)(n,!1,"Array",e);return d.errors=[c],(0,tc.createValidationResult)(!1,[c],d)}let o=(0,Lz.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${n}[${d}]`,g={path:p,config:r.config||null};if(o)return(0,vz.validateObject)(c,o,g);let b=t(c,null),h=(0,Ez.getExpectedTypeName)(t),y=(0,wz.stringify)(c);if(b)return(0,tc.createValidationResult)(!0,[],(0,rc.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,S=(0,mv.createValidationError)(p,h,c,u),A=(0,rc.createTreeNode)(p,!1,h,c);return A.errors=[S],(0,tc.createValidationResult)(!1,[S],A)}),i=(0,_z.combineResults)(s,n),a=(0,rc.createTreeNode)(n,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,tc.createValidationResult)(i.valid,i.errors,a)};nc.validateArray=Wz});var ec=E(sc=>{"use strict";Object.defineProperty(sc,"__esModule",{value:!0});sc.validateProperty=void 0;var fv=Fr(),Rz=Jn(),hv=Yn(),kz=bs(),oc=At(),Cz=_s(),Tz=gv(),xz=(e,t,r,n)=>{let o=`${n.path}.${e}`,s={path:o,config:n.config||null,...n.parentTree&&{parentTree:n.parentTree}},i=n.config?.errorMode||"multi",a=(0,oc.getTypeGuardSchema)(r),c=(0,oc.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,Cz.validateObject)(t,a,s);if(c&&(0,oc.isArrayTypeGuard)(r))return(0,Tz.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),b=(0,kz.getExpectedTypeName)(r);return g?(0,fv.createValidationResult)(!0,[],(0,hv.createTreeNode)(o,!0,b,t)):(()=>{let h=(0,Rz.createValidationError)(o,b,t,`Expected ${o} (${JSON.stringify(t)}) to be "${b}"`),y=(0,hv.createTreeNode)(o,!1,b,t);return y.errors=[h],(0,fv.createValidationResult)(!1,[h],y)})()};if((0,oc.isNestedObjectTypeGuard)(r)){let p=n.config?{...n.config,identifier:o}:null;return d(p)}return d(null)};sc.validateProperty=xz});var ac=E(ic=>{"use strict";Object.defineProperty(ic,"__esModule",{value:!0});ic.isNil=void 0;var Iz=O(),Oz=function(e,t){return e!=null?(t&&t.callbackOnError((0,Iz.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};ic.isNil=Oz});var fg=E(lc=>{"use strict";Object.defineProperty(lc,"__esModule",{value:!0});lc.isDefined=void 0;var Mz=O(),Nz=ac(),jz=function(e,t){return(0,Nz.isNil)(e,null)?(t&&t.callbackOnError((0,Mz.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};lc.isDefined=jz});var hg=E(cc=>{"use strict";Object.defineProperty(cc,"__esModule",{value:!0});cc.reportValidationResults=void 0;var Dz=Xl(),yv=fg(),Hz=ac(),$z=(e,t)=>{if(e.valid===!0||(0,Hz.isNil)(t))return;let r=t.errorMode||"multi",n=(i,a)=>{(0,yv.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,Dz.createSimplifiedTree)(a),null,2))},o=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,yv.isDefined)(e.tree)?n(t,e.tree):r==="multi"?o(t):s(t)};cc.reportValidationResults=$z});var yg=E(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.Validation=Q.reportValidationResults=Q.validateObject=Q.validateProperty=Q.createSimplifiedTree=Q.combineResults=Q.createTreeNode=Q.createValidationError=Q.createValidationResult=Q.getExpectedTypeName=void 0;var Fz=bs();Object.defineProperty(Q,"getExpectedTypeName",{enumerable:!0,get:function(){return Fz.getExpectedTypeName}});var zz=Fr();Object.defineProperty(Q,"createValidationResult",{enumerable:!0,get:function(){return zz.createValidationResult}});var Uz=Jn();Object.defineProperty(Q,"createValidationError",{enumerable:!0,get:function(){return Uz.createValidationError}});var Bz=Yn();Object.defineProperty(Q,"createTreeNode",{enumerable:!0,get:function(){return Bz.createTreeNode}});var Gz=Ps();Object.defineProperty(Q,"combineResults",{enumerable:!0,get:function(){return Gz.combineResults}});var Vz=Xl();Object.defineProperty(Q,"createSimplifiedTree",{enumerable:!0,get:function(){return Vz.createSimplifiedTree}});var qz=ec();Object.defineProperty(Q,"validateProperty",{enumerable:!0,get:function(){return qz.validateProperty}});var Kz=_s();Object.defineProperty(Q,"validateObject",{enumerable:!0,get:function(){return Kz.validateObject}});var Jz=hg();Object.defineProperty(Q,"reportValidationResults",{enumerable:!0,get:function(){return Jz.reportValidationResults}});var Yz=Fr(),Xz=Ps(),Zz=Jn(),Qz=Yn(),e1=ec(),t1=_s(),r1=hg(),n1=Xl();Q.Validation={result:Yz.createValidationResult,combine:Xz.combineResults,error:Zz.createValidationError,treeNode:Qz.createTreeNode,property:e1.validateProperty,object:t1.validateObject,report:r1.reportValidationResults,createSimplifiedTree:n1.createSimplifiedTree}});var dc=E(Sg=>{"use strict";Object.defineProperty(Sg,"__esModule",{value:!0});Sg.isType=s1;var Sv=dr(),Av=yg(),o1=At();function s1(e){if(!(0,Sv.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,n){let o=n?.errorMode||"multi";if(o==="multi"||o==="json"){let s={path:n?.identifier||"root",config:n||null},i=(0,Av.validateObject)(r,e,s);return(0,Av.reportValidationResults)(i,n||null),i.valid}return(0,Sv.isNonNullObject)(r,n)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],n?{...n,identifier:`${n.identifier}.${s}`}:null)}):!1}return(0,o1.attachTypeGuardMeta)(t,{schema:e})}});var _v=E(zr=>{"use strict";Object.defineProperty(zr,"__esModule",{value:!0});zr.isNestedType=zr.isShape=void 0;zr.isSchema=vs;var bv=dr(),Pv=yg(),wv=At();function vs(e){if(!(0,bv.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=a1(e);function r(n,o){let s=o?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:o?.identifier||"root",config:o||null},a=(0,Pv.validateObject)(n,t,i);return(0,Pv.reportValidationResults)(a,o||null),a.valid}return(0,bv.isNonNullObject)(n,o)?Object.keys(t).every(function(i){let a=t[i];return a?a(n[i],o?{...o,identifier:`${o.identifier}.${i}`}:null):!1}):!1}return(0,wv.attachTypeGuardMeta)(r,{schema:t})}function i1(e){return typeof e=="function"?e:Array.isArray(e)?l1(e):typeof e=="object"&&e!==null?vs(e):e}function a1(e){let t={};for(let[r,n]of Object.entries(e))t[r]=i1(n);return t}function l1(e){let t=e[0],r=vs(t);function n(o,s){return Array.isArray(o)?o.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,wv.attachTypeGuardMeta)(n,{itemGuard:r})}zr.isShape=vs;zr.isNestedType=vs});var vv=E(Ag=>{"use strict";Object.defineProperty(Ag,"__esModule",{value:!0});Ag.isObjectWith=d1;var c1=dc();function d1(e){return(0,c1.isType)(e)}});var Ev=E(bg=>{"use strict";Object.defineProperty(bg,"__esModule",{value:!0});bg.isObject=p1;var u1=dc();function p1(e){return(0,u1.isType)(e)}});var Lv=E(Pg=>{"use strict";Object.defineProperty(Pg,"__esModule",{value:!0});Pg.guardWithTolerance=m1;function m1(e,t,r){return t(e,r),e}});var Wv=E(wg=>{"use strict";Object.defineProperty(wg,"__esModule",{value:!0});wg.isBranded=f1;var g1=O();function f1(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,g1.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var Rv=E(uc=>{"use strict";Object.defineProperty(uc,"__esModule",{value:!0});uc.BrandSymbols=void 0;uc.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var kv=E(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.isAny=void 0;var h1=function(e){return!0};pc.isAny=h1});var Es=E(_g=>{"use strict";Object.defineProperty(_g,"__esModule",{value:!0});_g.reportTypeGuardError=S1;var y1=O();function S1(e,t,r){e&&e.callbackOnError((0,y1.generateTypeGuardError)(t,e.identifier,r))}});var Cv=E(mc=>{"use strict";Object.defineProperty(mc,"__esModule",{value:!0});mc.isBoolean=void 0;var A1=Es(),b1=function(t,r){return typeof t!="boolean"?((0,A1.reportTypeGuardError)(r,t,"boolean"),!1):!0};mc.isBoolean=b1});var Tv=E(gc=>{"use strict";Object.defineProperty(gc,"__esModule",{value:!0});gc.isDate=void 0;var P1=O(),w1=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,P1.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};gc.isDate=w1});var vg=E(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.isNumber=void 0;var _1=Es(),v1=function(t,r){return typeof t!="number"||isNaN(t)?((0,_1.reportTypeGuardError)(r,t,"number"),!1):!0};fc.isNumber=v1});var xv=E(hc=>{"use strict";Object.defineProperty(hc,"__esModule",{value:!0});hc.isString=void 0;var E1=Es(),L1=function(t,r){return typeof t!="string"?((0,E1.reportTypeGuardError)(r,t,"string"),!1):!0};hc.isString=L1});var Iv=E(yc=>{"use strict";Object.defineProperty(yc,"__esModule",{value:!0});yc.isUnknown=void 0;var W1=function(e){return!0};yc.isUnknown=W1});var Ov=E(Sc=>{"use strict";Object.defineProperty(Sc,"__esModule",{value:!0});Sc.isFunction=void 0;var R1=O(),k1=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,R1.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Sc.isFunction=k1});var Nv=E(Ac=>{"use strict";Object.defineProperty(Ac,"__esModule",{value:!0});Ac.isFile=void 0;var Mv=O(),C1=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,Mv.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,Mv.generateTypeGuardError)(e,t.identifier,"File")),!1)};Ac.isFile=C1});var Dv=E(bc=>{"use strict";Object.defineProperty(bc,"__esModule",{value:!0});bc.isFileList=void 0;var jv=O(),T1=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,jv.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,jv.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};bc.isFileList=T1});var $v=E(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.isBlob=void 0;var Hv=O(),x1=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,Hv.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,Hv.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Pc.isBlob=x1});var zv=E(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.isFormData=void 0;var Fv=O(),I1=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,Fv.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,Fv.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};wc.isFormData=I1});var Bv=E(_c=>{"use strict";Object.defineProperty(_c,"__esModule",{value:!0});_c.isURL=void 0;var Uv=O(),O1=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,Uv.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,Uv.generateTypeGuardError)(e,t.identifier,"URL")),!1)};_c.isURL=O1});var Vv=E(vc=>{"use strict";Object.defineProperty(vc,"__esModule",{value:!0});vc.isURLSearchParams=void 0;var Gv=O(),M1=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,Gv.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,Gv.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};vc.isURLSearchParams=M1});var qv=E(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.isMap=void 0;var N1=O(),j1=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,N1.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Ec.isMap=j1});var Kv=E(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.isSet=void 0;var D1=O(),H1=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,D1.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Lc.isSet=H1});var Jv=E(Eg=>{"use strict";Object.defineProperty(Eg,"__esModule",{value:!0});Eg.isIndexSignature=F1;var $1=O();function F1(e,t){return function(r,n){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return n&&n.callbackOnError((0,$1.generateTypeGuardError)(r,n.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],b=e(d,n?{...n,identifier:`${n.identifier}[key:${p}]`}:null),h=t(g,n?{...n,identifier:`${n.identifier}[value:${p}]`}:null);return b&&h})}}});var Yv=E(Wc=>{"use strict";Object.defineProperty(Wc,"__esModule",{value:!0});Wc.isError=void 0;var z1=Es(),U1=function(t,r){return t instanceof Error?!0:((0,z1.reportTypeGuardError)(r,t,"Error"),!1)};Wc.isError=U1});var Wg=E(Lg=>{"use strict";Object.defineProperty(Lg,"__esModule",{value:!0});Lg.isArrayWithEachItem=V1;var B1=O(),G1=At();function V1(e){let t=function(r,n){return Array.isArray(r)?r.every((o,s)=>e(o,n?{...n,identifier:`${n.identifier}[${s}]`}:null)):(n&&n.callbackOnError((0,B1.generateTypeGuardError)(r,n.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,G1.attachTypeGuardMeta)(t,{itemGuard:e})}});var Rg=E(Rc=>{"use strict";Object.defineProperty(Rc,"__esModule",{value:!0});Rc.isNonEmptyArray=void 0;var q1=O(),K1=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,q1.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Rc.isNonEmptyArray=K1});var Xv=E(kg=>{"use strict";Object.defineProperty(kg,"__esModule",{value:!0});kg.isNonEmptyArrayWithEachItem=X1;var J1=Wg(),Y1=Rg();function X1(e){return function(t,r){return(0,J1.isArrayWithEachItem)(e)(t,r)&&(0,Y1.isNonEmptyArray)(t,r)}}});var Qv=E(Cg=>{"use strict";Object.defineProperty(Cg,"__esModule",{value:!0});Cg.isTuple=Z1;var Zv=O();function Z1(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,Zv.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((n,o)=>n(t[o],r?{...r,identifier:`${r.identifier}[${o}]`}:null)):(r&&r.callbackOnError((0,Zv.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var eE=E(Tg=>{"use strict";Object.defineProperty(Tg,"__esModule",{value:!0});Tg.isObjectWithEachItem=eU;var Q1=O();function eU(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,Q1.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var tE=E(xg=>{"use strict";Object.defineProperty(xg,"__esModule",{value:!0});xg.isPartialOf=rU;var tU=dr();function rU(e){return function(t,r){if(!(0,tU.isNonNullObject)(t,r))return!1;for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&Object.prototype.hasOwnProperty.call(t,n)){let o=e[n],s=t[n];if(o&&!o(s,r?{...r,identifier:`${r.identifier}.${n}`}:null))return!1}return!0}}});var rE=E(Ig=>{"use strict";Object.defineProperty(Ig,"__esModule",{value:!0});Ig.isPick=oU;var nU=dr();function oU(e,...t){return function(r,n){if(!(0,nU.isNonNullObject)(r,n))return!1;for(let o of t)if(!Object.prototype.hasOwnProperty.call(r,o))return n&&e(r,n),!1;return!0}}});var nE=E(Og=>{"use strict";Object.defineProperty(Og,"__esModule",{value:!0});Og.isOmit=iU;var sU=dr();function iU(e,...t){return function(r,n){if(!(0,sU.isNonNullObject)(r,n))return!1;let o=[],s=n?.identifier||"root",i=n?{...n,callbackOnError:d=>o.push(d)}:{identifier:s,callbackOnError:d=>o.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=o.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),b=g>=0?p.slice(0,g):p;if(a.has(b))return!1;let h=b.startsWith(s+".")&&b.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(n&&c.length>0)for(let d of c)n.callbackOnError(d);return c.length===0}}});var oE=E(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.isNonEmptyString=void 0;var aU=O(),lU=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,aU.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};kc.isNonEmptyString=lU});var sE=E(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.isNonNegativeNumber=void 0;var cU=O(),dU=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,cU.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Cc.isNonNegativeNumber=dU});var iE=E(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.isPositiveNumber=void 0;var uU=O(),pU=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,uU.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Tc.isPositiveNumber=pU});var aE=E(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.isNonPositiveNumber=void 0;var mU=O(),gU=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,mU.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};xc.isNonPositiveNumber=gU});var lE=E(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.isNegativeNumber=void 0;var fU=O(),hU=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,fU.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Ic.isNegativeNumber=hU});var cE=E(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.isInteger=void 0;var yU=O(),SU=vg(),AU=function(e,t){return!(0,SU.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,yU.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Oc.isInteger=AU});var dE=E(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.isPositiveInteger=void 0;var bU=O(),PU=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,bU.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Mc.isPositiveInteger=PU});var uE=E(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.isNegativeInteger=void 0;var wU=O(),_U=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,wU.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Nc.isNegativeInteger=_U});var pE=E(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.isNonNegativeInteger=void 0;var vU=O(),EU=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,vU.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};jc.isNonNegativeInteger=EU});var mE=E(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.isNonPositiveInteger=void 0;var LU=O(),WU=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,LU.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Dc.isNonPositiveInteger=WU});var gE=E($c=>{"use strict";Object.defineProperty($c,"__esModule",{value:!0});$c.isNumeric=void 0;var Hc=O(),RU=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Hc.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Hc.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Hc.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Hc.generateTypeGuardError)(e,t.identifier,"number key")),!1};$c.isNumeric=RU});var fE=E(Fc=>{"use strict";Object.defineProperty(Fc,"__esModule",{value:!0});Fc.isBooleanLike=void 0;var Mg=O(),kU=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Mg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Mg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Fc.isBooleanLike=kU});var hE=E(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.isDateLike=void 0;var Ls=O(),CU=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Ls.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Ls.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Ls.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Ls.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Ls.generateTypeGuardError)(e,t.identifier,"date-like")),!1};zc.isDateLike=CU});var yE=E(Uc=>{"use strict";Object.defineProperty(Uc,"__esModule",{value:!0});Uc.isBigInt=void 0;var TU=O(),xU=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,TU.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Uc.isBigInt=xU});var jg=E(Ng=>{"use strict";Object.defineProperty(Ng,"__esModule",{value:!0});Ng.isOneOf=IU;var SE=Kn();function IU(...e){return function(t,r){let n=e.some(function(o){return t===o});return!n&&r&&r.callbackOnError(`${r.identifier} (${(0,SE.stringify)(t)}) must be one of following values ${e.map(SE.stringify).join(" | ")}`),n}}});var AE=E(Dg=>{"use strict";Object.defineProperty(Dg,"__esModule",{value:!0});Dg.isOneOfTypes=NU;var OU=Kn(),MU=bs();function NU(...e){return function(t,r){let n=e.map(s=>({typeGuard:s,isValid:s(t,null)})),o=n.some(s=>s.isValid);if(!o&&r){let s=(0,OU.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,MU.getTypeGuardDisplayName)(c)).join(" | ")}"`];n.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return o}}});var bE=E(Hg=>{"use strict";Object.defineProperty(Hg,"__esModule",{value:!0});Hg.isIntersectionOf=jU;function jU(...e){return function(t,r){for(let n of e)if(!n(t,r))return!1;return!0}}});var PE=E($g=>{"use strict";Object.defineProperty($g,"__esModule",{value:!0});$g.isExtensionOf=DU;function DU(e,t){return function(r,n){return e(r,n)?t(r,n):!1}}});var wE=E(Fg=>{"use strict";Object.defineProperty(Fg,"__esModule",{value:!0});Fg.isNullOr=$U;var HU=At();function $U(e){function t(r,n){return r===null?!0:e(r,n)}return(0,HU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var _E=E(zg=>{"use strict";Object.defineProperty(zg,"__esModule",{value:!0});zg.isUndefinedOr=zU;var FU=At();function zU(e){function t(r,n){return r===void 0?!0:e(r,n)}return(0,FU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var vE=E(Ug=>{"use strict";Object.defineProperty(Ug,"__esModule",{value:!0});Ug.isNilOr=BU;var UU=At();function BU(e){function t(r,n){return r==null?!0:e(r,n)}return(0,UU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var EE=E(Bg=>{"use strict";Object.defineProperty(Bg,"__esModule",{value:!0});Bg.isAsserted=GU;function GU(e){return!0}});var LE=E(Gg=>{"use strict";Object.defineProperty(Gg,"__esModule",{value:!0});Gg.isEnum=qU;var VU=jg();function qU(e){return function(t,r){return(0,VU.isOneOf)(...Object.values(e))(t,r)}}});var WE=E(Vg=>{"use strict";Object.defineProperty(Vg,"__esModule",{value:!0});Vg.isEqualTo=YU;var KU=O(),JU=Kn();function YU(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,KU.generateTypeGuardError)(t,r.identifier,`equal to ${(0,JU.stringify)(e)}`)),!1):!0}}});var RE=E(Bc=>{"use strict";Object.defineProperty(Bc,"__esModule",{value:!0});Bc.isRegex=void 0;var XU=O(),ZU=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,XU.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Bc.isRegex=ZU});var CE=E(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.isPattern=QU;var kE=O();function QU(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,n){return typeof r!="string"?(n&&n.callbackOnError((0,kE.generateTypeGuardError)(r,n.identifier,"string")),!1):t.test(r)?!0:(n&&n.callbackOnError((0,kE.generateTypeGuardError)(r,n.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var TE=E(Kg=>{"use strict";Object.defineProperty(Kg,"__esModule",{value:!0});Kg.by=eB;function eB(e){return function(t){return e(t,null)}}});var xE=E(Jg=>{"use strict";Object.defineProperty(Jg,"__esModule",{value:!0});Jg.toNumber=tB;function tB(e){return typeof e=="number"?e:Number(e)}});var IE=E(Yg=>{"use strict";Object.defineProperty(Yg,"__esModule",{value:!0});Yg.toDate=rB;function rB(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var OE=E(Xg=>{"use strict";Object.defineProperty(Xg,"__esModule",{value:!0});Xg.toBoolean=nB;function nB(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var ME=E(Gc=>{"use strict";Object.defineProperty(Gc,"__esModule",{value:!0});Gc.isSymbol=void 0;var oB=O(),sB=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,oB.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Gc.isSymbol=sB});var Ws=E(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var iB=dc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return iB.isType}});var Zg=_v();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return Zg.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return Zg.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return Zg.isNestedType}});var aB=vv();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return aB.isObjectWith}});var lB=Ev();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return lB.isObject}});var cB=Lv();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return cB.guardWithTolerance}});var dB=Wv();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return dB.isBranded}});var uB=Rv();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return uB.BrandSymbols}});var pB=kv();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return pB.isAny}});var mB=Cv();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return mB.isBoolean}});var gB=Tv();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return gB.isDate}});var fB=fg();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return fB.isDefined}});var hB=ac();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return hB.isNil}});var yB=vg();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return yB.isNumber}});var SB=xv();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return SB.isString}});var AB=Iv();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return AB.isUnknown}});var bB=Ov();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return bB.isFunction}});var PB=Nv();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return PB.isFile}});var wB=Dv();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return wB.isFileList}});var _B=$v();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return _B.isBlob}});var vB=zv();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return vB.isFormData}});var EB=Bv();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return EB.isURL}});var LB=Vv();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return LB.isURLSearchParams}});var WB=qv();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return WB.isMap}});var RB=Kv();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return RB.isSet}});var kB=Jv();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return kB.isIndexSignature}});var CB=Yv();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return CB.isError}});var TB=Wg();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return TB.isArrayWithEachItem}});var xB=Rg();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return xB.isNonEmptyArray}});var IB=Xv();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return IB.isNonEmptyArrayWithEachItem}});var OB=Qv();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return OB.isTuple}});var MB=dr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return MB.isNonNullObject}});var NB=eE();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return NB.isObjectWithEachItem}});var jB=tE();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return jB.isPartialOf}});var DB=rE();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return DB.isPick}});var HB=nE();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return HB.isOmit}});var $B=oE();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return $B.isNonEmptyString}});var FB=sE();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return FB.isNonNegativeNumber}});var zB=iE();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return zB.isPositiveNumber}});var UB=aE();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return UB.isNonPositiveNumber}});var BB=lE();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return BB.isNegativeNumber}});var GB=cE();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return GB.isInteger}});var VB=dE();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return VB.isPositiveInteger}});var qB=uE();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return qB.isNegativeInteger}});var KB=pE();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return KB.isNonNegativeInteger}});var JB=mE();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return JB.isNonPositiveInteger}});var YB=gE();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return YB.isNumeric}});var XB=fE();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return XB.isBooleanLike}});var ZB=hE();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return ZB.isDateLike}});var QB=yE();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return QB.isBigInt}});var eG=jg();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return eG.isOneOf}});var tG=AE();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return tG.isOneOfTypes}});var rG=bE();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return rG.isIntersectionOf}});var nG=PE();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return nG.isExtensionOf}});var oG=wE();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return oG.isNullOr}});var sG=_E();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return sG.isUndefinedOr}});var iG=vE();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return iG.isNilOr}});var aG=EE();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return aG.isAsserted}});var lG=LE();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return lG.isEnum}});var cG=WE();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return cG.isEqualTo}});var dG=RE();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return dG.isRegex}});var uG=CE();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return uG.isPattern}});var pG=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return pG.generateTypeGuardError}});var mG=TE();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return mG.by}});var gG=xE();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return gG.toNumber}});var fG=IE();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return fG.toDate}});var hG=OE();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return hG.toBoolean}});var yG=ME();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return yG.isSymbol}})});var Rs,NE,jE,Ur,Qg,M7,DE,Vc,Br,ks,ef,tf,rf,nf,Nt,of,qc,Kc,Jc,Cs,rt,Xn,Zn,Yc,ur,sf,HE,bt=l(()=>{"use strict";Rs={production:".agent-witch",localhost:".local-agent-witch"},NE={production:47892,localhost:47893},jE={production:"com.agent-witch",localhost:"com.local-agent-witch"},Ur={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Qg="app",M7=`${Qg}/agent-witch.js`,DE=`${Qg}/command`,Vc={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Br=Rs.production,ks=Rs.localhost,ef=NE.production,tf=NE.localhost,rf=jE.production,nf=jE.localhost,Nt="profiles",of=Ur.activeProfile,qc="harness",Kc="sets",Jc="manifest.json",Cs=Vc.projectsDir,rt=Vc.logsDir,Xn="agent-witch.log",Zn="agent-witch.error.log",Yc=Vc.reportsDir,ur=Vc.deviceKeypairJson,sf=Qg,HE="agent-witch.js"});var Xc,$E,AG,SG,FE,zE=l(()=>{"use strict";Xc=m(require("node:path")),$E=require("node:url"),AG={},SG=()=>!0,FE=()=>{if(SG()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Xc.default.dirname(Xc.default.resolve(e))}return Xc.default.dirname((0,$E.fileURLToPath)(AG.url))}});var af,UE,N,BE,bG,pr,W,Zc,jt,GE,Qc,Qn,ed,td,ne,nt,lf,ot,cf,M,df=l(()=>{"use strict";af=m(require("node:fs")),UE=m(require("node:os")),N=m(require("node:path")),BE=m(Ws());bt();zE();bG=FE(),pr=e=>e.trim().toLowerCase(),W=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return N.default.resolve(e);let t=N.default.resolve(bG),r=N.default.basename(t),n=N.default.basename(N.default.dirname(t));return r===sf&&(n===Br||n===ks)?N.default.dirname(t):r===Br||r===ks?t:N.default.join(UE.default.homedir(),Br)},Zc=(e=W())=>N.default.join(e,sf),jt=(e=W())=>N.default.join(Zc(e),HE),GE=(e,t,r)=>t!==null?N.default.join(e,Nt,t,r):N.default.join(e,r),Qc=e=>GE(e.installDir,e.profileEmail,Cs),Qn=e=>GE(e.installDir,e.profileEmail,rt),ed=e=>e.profileEmail!==null?N.default.join(e.installDir,Nt,e.profileEmail,ur):N.default.join(e.installDir,ur),td=e=>N.default.basename(e)===ks,ne=(e=W())=>td(e)?nf:rf,nt=(e=W())=>td(e)?tf:ef,lf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return pr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?pr(t):null},ot=(e=W())=>{let t=N.default.join(e,of);if(!af.default.existsSync(t))return null;try{let r=JSON.parse(af.default.readFileSync(t,"utf8"));if((0,BE.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return pr(r.email)}catch{return null}return null},cf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?pr(r):null}let t=lf();return t!==null?t:ot()},M=e=>{let t=W(),r=Zc(t),n=jt(t),o=cf(e);if(o!==null){let b=N.default.join(t,Nt,o),h=N.default.join(b,qc),y=N.default.join(b,Cs),u=N.default.join(b,rt),S=N.default.join(b,Yc),A=N.default.join(b,ur),f=N.default.join(b,rt,Xn),w=N.default.join(b,rt,Zn);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:y,logsDir:u,mainLogPath:f,errorLogPath:w,reportsDir:S,deviceKeypairPath:A,configPath:N.default.join(b,"config.json"),harnessRootDir:h,harnessManifestPath:N.default.join(h,Jc),harnessSetsDir:N.default.join(h,Kc)}}let s=N.default.join(t,qc),i=N.default.join(t,Cs),a=N.default.join(t,rt),c=N.default.join(t,Yc),d=N.default.join(t,ur),p=N.default.join(t,rt,Xn),g=N.default.join(t,rt,Zn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:g,reportsDir:c,deviceKeypairPath:d,configPath:N.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:N.default.join(s,Jc),harnessSetsDir:N.default.join(s,Kc)}}});var uf,VE,PG,wG,qE,pf,KE=l(()=>{"use strict";uf=m(require("node:fs")),VE=m(require("node:path"));bt();df();PG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wG=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,qE=e=>{let t=VE.default.join(e,Ur.wakePort);if(!uf.default.existsSync(t))return null;try{let r=JSON.parse(uf.default.readFileSync(t,"utf8"));if(PG(r)&&wG(r.wakePort))return r.wakePort}catch{return null}return null},pf=(e=W())=>qE(e)??nt(e)});var G=l(()=>{"use strict";df();KE()});var Ts,WG,RG,JE,kG,CG,YE=l(()=>{"use strict";G();Ts=ne(),WG=`${Ts}-wake`,RG=`${Ts}-live`,JE=`${Ts}-watchdog`,kG=`${Ts}-automation-scheduler`,CG=`${Ts}-updater`});var mf,gf,rd=l(()=>{"use strict";mf=new Set(["","loginwindow","_mbsetupuser","root"]),gf=5e3});var XE,TG,ZE,ff,hf=l(()=>{"use strict";XE=require("node:child_process");rd();TG=e=>e.trim().toLowerCase(),ZE=e=>e==null?!1:!mf.has(TG(e)),ff=()=>{if(process.platform!=="darwin")return null;try{let t=(0,XE.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return ZE(t)?t:null}catch{return null}}});var eL,QE,st,xs=l(()=>{"use strict";eL=m(require("node:os"));hf();QE=e=>e.trim().toLowerCase(),st=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?ff():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??eL.default.userInfo().username;return QE(r)===QE(n)}});var tL,rL,Gr,nL=l(()=>{"use strict";tL=require("node:child_process"),rL=m(require("node:fs"));G();xs();Gr=(e=W())=>{let t=jt(e);if(!rL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!st())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=ot(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,tL.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var oL,Is,nd=l(()=>{"use strict";oL=require("node:child_process"),Is=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,oL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var od,yf,sL,ee,sd,Os=l(()=>{"use strict";od=m(require("node:fs")),yf=m(require("node:path"));G();bt();sL=e=>{let t=yf.default.join(e,Nt);return od.default.existsSync(t)?od.default.readdirSync(t).filter(r=>od.default.statSync(yf.default.join(t,r)).isDirectory()).map(r=>pr(r)).toSorted():[]},ee=(e=W())=>{let t=ne(e);return[{profileEmail:sL(e)[0]??null,launchAgentLabel:t}]},sd=(e=W())=>sL(e)});var Sf,iL,aL,xG,Dt,id=l(()=>{"use strict";Sf=m(require("node:fs")),iL=m(require("node:os")),aL=m(require("node:path"));G();Os();xG=()=>aL.default.join(iL.default.homedir(),"Library","LaunchAgents"),Dt=(e=W())=>{let t=ne(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of ee(e))r.add(o.launchAgentLabel);let n=xG();if(Sf.default.existsSync(n))for(let o of Sf.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var lL,Ms,cL=l(()=>{"use strict";G();nd();id();Os();lL=(e=W())=>{let t=new Set(ee(e).map(r=>r.launchAgentLabel));return Dt(e).filter(r=>!t.has(r))},Ms=(e=W())=>{for(let t of lL(e))Is(t)}});var Ns,Af=l(()=>{"use strict";G();nd();id();Ns=(e=W())=>{for(let t of Dt(e))Is(t)}});var dL,uL,IG,Vr,pL=l(()=>{"use strict";dL=require("node:child_process"),uL=require("node:util"),IG=(0,uL.promisify)(dL.execFile),Vr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await IG("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var qr,OG,bf,Pf=l(()=>{"use strict";qr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OG=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,bf=e=>{let t=e.pathValue??OG(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
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
`}});var ad,wf=l(()=>{"use strict";ad=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Kr,_f,js,MG,NG,jG,mL,Ht,vf=l(()=>{"use strict";Kr=m(require("node:fs")),_f=m(require("node:os")),js=m(require("node:path"));bt();G();Pf();wf();MG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),NG=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,jG=e=>{let t=js.default.join(e,Ur.wakePort);if(!Kr.default.existsSync(t))return nt(e);try{let r=JSON.parse(Kr.default.readFileSync(t,"utf8"));if(MG(r)&&NG(r.wakePort))return r.wakePort}catch{return nt(e)}return nt(e)},mL=(e,t=_f.default.homedir())=>js.default.join(t,"Library","LaunchAgents",`${e}.plist`),Ht=e=>{let t=e.installDir??W(),r=e.homeDir??_f.default.homedir(),n=mL(e.launchAgentLabel,r),o=Kr.default.existsSync(n)?Kr.default.readFileSync(n,"utf8"):null;if(o!==null&&ad(o))return{ok:!0,rewritten:!1,plistPath:n};let s=bf({launchAgentLabel:e.launchAgentLabel,runPath:js.default.join(t,DE,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??jG(t)});if(!ad(s))return{ok:!1,rewritten:!1,plistPath:n,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Kr.default.mkdirSync(js.default.dirname(n),{recursive:!0}),Kr.default.writeFileSync(n,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:n,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:n}}});var fL,hL,yL,Ds,DG,HG,gL,ve,Ef=l(()=>{"use strict";fL=require("node:child_process"),hL=m(require("node:fs")),yL=require("node:util");G();vf();xs();Ds=(0,yL.promisify)(fL.execFile),DG=async e=>{try{return await Ds("launchctl",["print",e]),!0}catch{return!1}},HG=async(e,t,r)=>{await DG(t)&&await Ds("launchctl",["bootout",t]).catch(()=>{}),await Ds("launchctl",["bootstrap",e,r]),await Ds("launchctl",["enable",t])},gL=async e=>{try{return await Ds("launchctl",["kickstart","-k",e]),!0}catch{return!1}},ve=async(e,t=W())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!st())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let n=`gui/${r}`,o=`${n}/${e}`,s=Ht({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await gL(o))return{ok:!0};let i=s.plistPath;if(!hL.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await HG(n,o,i),await gL(o)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Jr,SL=l(()=>{"use strict";G();Ef();Os();Jr=async(e=W())=>{let t=[];for(let r of ee(e))(await ve(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Fe,$t,AL=l(()=>{"use strict";Af();xs();rd();Fe=e=>{st()||(Ns(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},$t=(e,t=gf)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{st()||e()},t);return()=>{clearInterval(r)}}});var te=l(()=>{"use strict";YE();nL();nd();cL();Af();id();xs();pL();SL();Ef();vf();wf();Pf();Os();hf();rd();AL()});var Lf=l(()=>{"use strict";te()});var bL,PL,ld,wL,eo,_L,vL,Yr=l(()=>{"use strict";bL=".agent-witch",PL="memory",ld="project.json",wL="chunks.ndjson",eo="runs.ndjson",_L="reports",vL=".json"});var EL=l(()=>{"use strict";Yr()});var LL,cd,Wf=l(()=>{"use strict";LL=m(require("node:path"));EL();cd=(e,t)=>LL.default.join(e.trim(),`${t.trim()}${vL}`)});var Hs,WL,RL=l(()=>{"use strict";Hs="agent-witch.js",WL="command"});var dd=l(()=>{"use strict";RL()});var Xr,kL,CL=l(()=>{"use strict";dd();Xr=e=>`'${e.replace(/'/g,"'\\''")}'`,kL=e=>{let t=`${e.installDir.trim()}/${"app"}/${Hs}`,r=[Xr("node"),Xr(t),"report","write","--key",Xr(e.reportKey.trim()),"--agent-run-id",Xr(e.agentRunId.trim()),"--status",Xr(e.status),"--summary",Xr(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Xr(e.details.trim())),r.join(" ")}});var Pt,TL,$G,Rf,ud=l(()=>{"use strict";Wf();CL();Pt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},TL=e=>e===Pt.COMPLETED||e===Pt.FAILED,$G=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Rf=(e,t)=>{let r=cd(t.reportsDir,t.reportKey),n=kL({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Pt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${$G({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var Ee=l(()=>{"use strict";bt();G()});var Fs,IL,xL,OL,FG,to,zG,ML,zs,Us,kf,NL,jL,Bs=l(()=>{"use strict";Fs=m(require("node:fs")),IL=m(require("node:path"));ud();Wf();Ee();xL=50,OL=e=>{let t=M(),r=cd(t.reportsDir,e);return Fs.default.mkdirSync(IL.default.dirname(r),{recursive:!0}),r},FG=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},to=e=>{let t=OL(e);if(!Fs.default.existsSync(t))return null;try{let r=JSON.parse(Fs.default.readFileSync(t,"utf8"));return FG(r)?r:null}catch{return null}},zG=(e,t)=>{let r=[...e,t];return r.length>xL?r.slice(r.length-xL):r},ML=e=>{let t=OL(e.reportKey);Fs.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},zs=e=>{let t=to(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:zG(t?.history??[],n)};return ML(o),o},Us=e=>{let t=to(e.reportKey);return t!==null?t:zs({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Pt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},kf=(e,t)=>{let r=t.trim();if(r.length===0)return to(e);let n=to(e);if(n===null)return null;let o=n.details!==void 0&&n.details.trim().length>0?`${n.details.trim()}
${r}`:r,s={...n,updatedAt:new Date().toISOString(),details:o};return ML(s),s},NL=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},jL=e=>{if(e===null||!TL(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Pt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var UG,BG,Gs,DL,pd,Cf=l(()=>{"use strict";ud();Bs();UG=new Set(Object.values(Pt)),BG=e=>UG.has(e),Gs=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},DL=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},pd=e=>{if(e[0]!=="write")return DL(),1;let r=Gs(e,"--key"),n=Gs(e,"--agent-run-id"),o=Gs(e,"--status"),s=Gs(e,"--summary"),i=Gs(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!BG(o)?(DL(),1):(zs({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var it,ro=l(()=>{"use strict";it=()=>!0});var Tf,HL,Zr,md=l(()=>{"use strict";Tf=m(require("node:path")),HL=require("node:url");ro();Zr=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Tf.default.resolve(t);return it()?r===Tf.default.resolve(__filename):r===(0,HL.fileURLToPath)(e)}});var gd,no,qG,NY,oo=l(()=>{"use strict";gd="agent-witch.js",no="deps.tar.gz",qG="install.sh",NY={mainScript:`app/${gd}`,depsArchive:`app/${no}`,installShell:qG}});var UL=l(()=>{"use strict";oo()});var BL=l(()=>{"use strict";oo();UL()});var Vs,If,fd,KG,qs,Le,io,Ks,Js,Qr,Of=l(()=>{"use strict";Vs=m(require("node:fs")),If=m(require("node:path"));BL();G();fd="install-version.json",KG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qs=(e=W())=>If.default.join(e,fd),Le=(e=W())=>{let t=qs(e);if(!Vs.default.existsSync(t))return null;try{let r=JSON.parse(Vs.default.readFileSync(t,"utf8"));return!KG(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},io=(e,t=W())=>{let r=qs(t);Vs.default.mkdirSync(If.default.dirname(r),{recursive:!0}),Vs.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Ks=(e=W())=>Le(e)?.bundleVersion??"207",Js=(e,t)=>{let r=Le(e);if(r!==null)return r;let n={bundleVersion:"207",appOrigin:t,updatedAt:new Date().toISOString()};return io(n,e),n},Qr=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var GL,en,Mf,Nf,jf,hd,wt,tn,Df=l(()=>{"use strict";GL=require("node:crypto"),en=m(require("node:fs")),Mf=m(require("node:path"));G();Nf="self-update-log.ndjson",jf=100,hd=(e=W())=>{let t=M(),r=t.installDir===e?t.logsDir:Qn({installDir:e,profileEmail:t.profileEmail});return Mf.default.join(r,Nf)},wt=(e,t=W())=>{let r={id:(0,GL.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=hd(t);en.default.mkdirSync(Mf.default.dirname(n),{recursive:!0});let o=en.default.existsSync(n)?en.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-jf+1)),JSON.stringify(r)];return en.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},tn=(e=20,t=W())=>{let r=hd(t);if(!en.default.existsSync(r))return[];let n=en.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var Hf,QY,$f=l(()=>{"use strict";oo();Hf="deps",QY=`${"app"}/${no}`});var VL=l(()=>{"use strict";$f()});var qL,mr,rn,KL,Ff,zf,JL=l(()=>{"use strict";qL=require("node:child_process"),mr=m(require("node:fs")),rn=m(require("node:path"));oo();$f();KL=e=>rn.default.join(e,"app",Hf),Ff=e=>{let t=rn.default.join(e,"app"),r=rn.default.join(t,no);mr.default.existsSync(r)&&(mr.default.rmSync(KL(e),{recursive:!0,force:!0}),mr.default.mkdirSync(t,{recursive:!0}),(0,qL.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),mr.default.rmSync(r,{force:!0}))},zf=e=>{mr.default.rmSync(rn.default.join(e,"node_modules"),{recursive:!0,force:!0}),mr.default.rmSync(rn.default.join(e,"package.json"),{force:!0}),mr.default.rmSync(rn.default.join(e,"package-lock.json"),{force:!0})}});var YL=l(()=>{"use strict";VL();JL()});var Ft,yd,XL=l(()=>{"use strict";Ft="https://www.agentwitch.com",yd="wss://www.agentwitch.com/api/agent-witch/ws"});var Ys,zt,ZL=l(()=>{"use strict";Ys="127.0.0.1",zt=`http://${Ys}:43347`});var Ut=l(()=>{"use strict";XL();ZL()});var Xs,Sd,QL,Bf,JG,eW,qf,tW,at,Zs,Qs,Kf,Gf,Vf,ei,Jf,Yf,Xf,ao=l(()=>{"use strict";Xs=m(require("node:fs")),Sd=m(require("node:path")),QL="active-writer-work.json",Bf=new Set,JG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eW=e=>e.profileEmail===null?Sd.default.join(e.installDir,QL):Sd.default.join(e.installDir,"profiles",e.profileEmail,QL),qf=e=>{let t=eW(e);if(!Xs.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Xs.default.readFileSync(t,"utf8"));return!JG(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},tW=(e,t)=>{let r=eW(e);Xs.default.mkdirSync(Sd.default.dirname(r),{recursive:!0}),Xs.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},at=e=>qf(e).activeCount>0,Zs=e=>{let t=qf(e);tW(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Qs=e=>{let t=qf(e),r=Math.max(0,t.activeCount-1);if(tW(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let n of Bf)n()},Kf=e=>(Bf.add(e),()=>{Bf.delete(e)}),Gf=null,Vf=null,ei=e=>{Gf=e},Jf=e=>{Vf=e},Yf=()=>{let e=Gf;return Gf=null,e},Xf=()=>{let e=Vf;return Vf=null,e}});var We,Zf=l(()=>{"use strict";We=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var lo,Ad,ti,Qf=l(()=>{"use strict";lo="qwen2.5:7b",Ad="nomic-embed-text",ti="Install Ollama from https://ollama.com/download"});var ri,rW,eh=l(()=>{"use strict";Qf();ri=()=>`
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
  agent_witch_ensure_ollama_model "${Ad}" "\${pull_log}"
}
`,rW=()=>`
${ri()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var nW,YG,bd,th=l(()=>{"use strict";nW=require("node:child_process");G();eh();YG=e=>new Promise(t=>{let r=(0,nW.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:W()}}),n=[];r.stdout.on("data",o=>{n.push(o)}),r.stderr.on("data",o=>{n.push(o)}),r.on("error",o=>{t({exitCode:1,output:o.message})}),r.on("close",o=>{t({exitCode:o??1,output:Buffer.concat(n).toString("utf8").trim()})})}),bd=async(e=YG)=>{let t=`${ri()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var gr,Pd,oW,XG,sW,uo,ZG,QG,e2,co,nn,on,iW=l(()=>{"use strict";gr=m(require("node:fs")),Pd=m(require("node:path"));YL();te();G();oo();Ut();Of();ao();Zf();Df();th();oW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),XG=e=>{let t=ot(e),r=t===null?M():M(t);if(!gr.default.existsSync(r.configPath))return null;try{let n=JSON.parse(gr.default.readFileSync(r.configPath,"utf8"));return!oW(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},sW=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!oW(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},uo=async e=>(await sW(e))?.bundleVersion??null,ZG=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=Pd.default.join(t,r);gr.default.mkdirSync(Pd.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());gr.default.writeFileSync(o,s),r.endsWith(".js")&&gr.default.chmodSync(o,493)},QG=async()=>{Ms(),await Jr()},e2=(e,t)=>e!==null?We(e):t??Ft,co=(e,t)=>({localBundleVersion:t,...e}),nn=async e=>{let t=W(),r=Le(t),n=r?.bundleVersion??null,o=await bd();wt({event:"check_complete",ok:o.ok,message:o.message,localBundleVersion:n,remoteBundleVersion:null});let s=XG(t),i=e2(s,r?.appOrigin);if(i===null){let d=co({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return wt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}let a=await sW(i);if(a===null){let d=co({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return wt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}if(!(e?.force===!0||Qr(n,a.bundleVersion))){let d=co({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},n);return wt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),d}try{for(let b of a.scripts)await ZG(i,t,b);let d=Pd.default.join(t,gd);gr.default.existsSync(d)&&gr.default.rmSync(d,{force:!0}),Ff(t),zf(t),io({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=M(ot(t));if(at(p)){let b=co({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return wt({event:"update_applied",ok:!0,message:b.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),b}await QG();let g=co({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return wt({event:"update_applied",ok:!0,message:g.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=co({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},n);return wt({event:"update_failed",ok:!1,message:p,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),g}},on=()=>{let e=W();return{local:Le(e),logs:tn(20,e)}}});var aW={};St(aW,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>fd,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>ti,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Ad,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>lo,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Nf,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>jf,appendAgentWitchSelfUpdateLog:()=>wt,buildAgentWitchEnsureOllamaShell:()=>ri,buildAgentWitchInstallScriptOllama:()=>rW,buildAgentWitchSelfUpdateStatus:()=>on,ensureAgentWitchInstallVersionRecorded:()=>Js,ensureAgentWitchOllamaInstalled:()=>bd,fetchAgentWitchRemoteInstallBundleVersion:()=>uo,isRemoteAgentWitchBundleVersionNewer:()=>Qr,readAgentWitchInstallVersion:()=>Le,readAgentWitchSelfUpdateLogs:()=>tn,resolveAgentWitchAppOriginFromWsUrl:()=>We,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Ks,resolveAgentWitchInstallVersionPath:()=>qs,resolveAgentWitchSelfUpdateLogPath:()=>hd,runAgentWitchSelfUpdate:()=>nn,writeAgentWitchInstallVersion:()=>io});var Ve=l(()=>{"use strict";Of();Df();iW();Zf();Qf();eh();th()});var rh={};St(rh,{buildAgentWitchSelfUpdateStatus:()=>on,fetchAgentWitchRemoteInstallBundleVersion:()=>uo,runAgentWitchSelfUpdate:()=>nn});var nh=l(()=>{"use strict";Ve()});function po(e){return(0,lW.createHash)("sha256").update(e.trim()).digest("hex")}var lW,oh=l(()=>{"use strict";lW=require("node:crypto")});var mo,ni,t2,cW,sh,dW=l(()=>{"use strict";mo=m(require("node:fs")),ni=m(require("node:path"));oh();Ee();t2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cW=e=>{if(!mo.default.existsSync(e))return null;try{let t=JSON.parse(mo.default.readFileSync(e,"utf8"));return!t2(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:po(t.pairingToken.trim())}catch{return null}},sh=(e=W())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(cW(ni.default.join(e,"config.json")));let o=ni.default.join(e,Nt);if(!mo.default.existsSync(o))return t;for(let s of mo.default.readdirSync(o)){let i=ni.default.join(o,s);mo.default.statSync(i).isDirectory()&&n(cW(ni.default.join(i,"config.json")))}return t}});var ih,uW,wd,oi,si,r2,n2,o2,pW,ie,ae,_d,_t,lt=l(()=>{"use strict";ih=m(require("node:fs")),uW=m(require("node:os")),wd=m(require("node:path")),oi={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},si=e=>e.trim().length>0,r2=e=>{let t=wd.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},n2=()=>{let e=uW.default.homedir(),t=wd.default.join(e,".local","bin","agent");if(ih.default.existsSync(t))return t;let r=wd.default.join(e,".local","bin","cursor-agent");return ih.default.existsSync(r)?r:oi.cursorCommand},o2=e=>{let t=e.trim();return!si(t)||t===oi.cursorCommand?n2():t},pW=(e,t)=>r2(e)?t:["agent",...t],ie=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ae=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:si(t)?t.trim():oi.claudeCommand,codexCommand:si(r)?r.trim():oi.codexCommand,cursorCommand:o2(n),antigravityCommand:si(o)?o.trim():oi.antigravityCommand}},_d=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:pW(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},_t=(e,t,r,n)=>{let o=t.trim();if(!si(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:pW(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",o])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var fr,s2,go,i2,fo,vd=l(()=>{"use strict";fr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,s2=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([n,o])=>{if(typeof o!="object"||o===null)return{name:n,total:0};let s=o;return{name:n,total:fr(s.inputTokens)+fr(s.outputTokens)+fr(s.cacheReadInputTokens)+fr(s.cacheCreationInputTokens)}})].sort((n,o)=>o.total-n.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},go=e=>{let t=e.trim(),r=t.indexOf("{"),n=t.lastIndexOf("}");if(r<0||n<=r)return null;let o;try{o=JSON.parse(t.slice(r,n+1))}catch{return null}if(typeof o!="object"||o===null)return null;let s=o;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=fr(a.input_tokens)+fr(a.cache_creation_input_tokens)+fr(a.cache_read_input_tokens),d=fr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:s2(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},i2=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),fo=(e,t)=>{let r=go(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??i2(r)}}});var ah,a2,l2,lh,ch=l(()=>{"use strict";ah=e=>e.toLocaleString("en-US"),a2=e=>e<.01?e.toFixed(4):e.toFixed(3),l2=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${a2(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${ah(e.inputTokens)} in / ${ah(e.outputTokens)} out (${ah(e.totalTokens)} total)`,t].join(`
`)},lh=(e,t)=>{if(t===void 0)return e;let r=l2(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var Ed,dh=l(()=>{"use strict";Ed={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var sn,uh,Ld,ph=l(()=>{"use strict";dh();sn="auto",uh=e=>({value:sn,label:`Auto (${Ed[e]})`}),Ld={anthropic:[uh("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[uh("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[uh("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var ho,ii,mh,ai=l(()=>{"use strict";dh();ph();ho=e=>{let t=e?.trim()??"";if(!(t.length===0||t===sn))return t},ii=(e,t)=>{let r=ho(t);return r===void 0?Ed[e]:r},mh=e=>{let t=ho(e);return t===void 0?sn:t}});var Wd,c2,d2,Rd,mW=l(()=>{"use strict";Wd={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},c2=e=>{let t=Wd[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Wd["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Wd["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Wd["gemini-2.0-flash"]:null},d2=(e,t,r)=>{let n=c2(e);if(n===null)return null;let o=t/1e6*n.inputUsd,s=r/1e6*n.outputUsd;return o+s},Rd=e=>{let t=d2(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var yo,u2,p2,m2,kd,gW=l(()=>{"use strict";mW();yo=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),u2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=yo(r.input_tokens),o=yo(r.output_tokens);return n===0&&o===0?null:Rd({provider:"anthropic",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},p2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=yo(r.prompt_tokens),o=yo(r.completion_tokens);return n===0&&o===0?null:Rd({provider:"openai",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},m2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let n=yo(r.promptTokenCount),o=yo(r.candidatesTokenCount);return n===0&&o===0?null:Rd({provider:"google",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},kd=(e,t,r)=>e==="anthropic"?u2(t,r):e==="openai"?p2(t,r):m2(t,r)});var g2,gh,f2,h2,y2,S2,A2,fh,hh=l(()=>{"use strict";ai();gW();g2=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let n=r;return n.type==="text"&&typeof n.text=="string"?n.text:""}).join(""):""},gh=(e,t,r)=>{let n=r?.trim()??"";return n.length>0?n:ii(e,t.model)},f2=async e=>{let t=gh("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Anthropic API error (${String(r.status)})`};let o=g2(n);o.length>0&&e.onChunk?.(o);let s=kd("anthropic",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},h2=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.message;return typeof n?.content=="string"?n.content:""},y2=async e=>{let t=gh("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`OpenAI API error (${String(r.status)})`};let o=h2(n);o.length>0&&e.onChunk?.(o);let s=kd("openai",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},S2=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.content?.parts;return Array.isArray(n)?n.map(o=>{if(typeof o!="object"||o===null)return"";let s=o.text;return typeof s=="string"?s:""}).join(""):""},A2=async e=>{let t=gh("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,n=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),o=await n.json().catch(()=>null);if(!n.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Google API error (${String(n.status)})`};let s=S2(o);s.length>0&&e.onChunk?.(s);let i=kd("google",o,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},fh=async e=>{try{return e.provider==="anthropic"?await f2(e):e.provider==="openai"?await y2(e):await A2(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var ze,li=l(()=>{"use strict";ze=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var fW,b2,Cd,yh=l(()=>{"use strict";fW=m(require("node:path")),b2="writer-api-secrets.json",Cd=e=>fW.default.join(e,b2)});var Sh,hW,P2,hr,je,yr=l(()=>{"use strict";Sh=m(require("node:fs"));ai();yh();hW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),P2=e=>{if(!hW(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,n=ho(r);return{apiKey:t,...n!==void 0?{model:n}:{}}},hr=e=>{let t=Cd(e);if(!Sh.default.existsSync(t))return{};try{let r=JSON.parse(Sh.default.readFileSync(t,"utf8"));if(!hW(r))return{};let n={},o=["anthropic","openai","google"];for(let s of o){let i=P2(r[s]);i!==null&&(n[s]=i)}return n}catch{return{}}},je=(e,t)=>hr(e)[t]??null});var Re,ci=l(()=>{"use strict";Re=e=>e==="api"?"api":"cli"});var yW,he,an,Bt=l(()=>{"use strict";yW=m(require("node:path"));li();yr();ci();he=e=>yW.default.dirname(e),an=(e,t)=>{if(Re(e.writerExecutionBackend)!=="api")return!1;let r=ze(t);if(r===null)return!1;let n=he(e.layout.configPath),o=je(n,r);return o!==null&&o.apiKey.length>0}});var di,Ah=l(()=>{"use strict";ch();hh();li();yr();Bt();di=async(e,t,r,n)=>{let o=r.trim();if(o.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=ze(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=he(e.layout.configPath),a=je(i,s);if(a===null){let d=Object.keys(hr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await fh({provider:s,secret:a,prompt:o,onChunk:n});return{exitCode:c.exitCode,output:lh(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var SW,So,bh=l(()=>{"use strict";SW=require("node:child_process");lt();vd();Ah();Bt();So=(e,t,r)=>new Promise(n=>{if(!ie(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(an(e,t)){di(e,t,r).then(n);return}let o=_t(t,r,ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,SW.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=fo(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(b=>b.length>0).join(`
`);n({exitCode:c??-1,output:g})}),s.on("error",c=>{n({exitCode:-1,output:c.message})})})});var AW=l(()=>{"use strict"});var bW=l(()=>{"use strict";ch();bh();hh();AW();yr();Bt()});var PW,wW,_W,vW=l(()=>{"use strict";PW="claude",wW="codex",_W="cursor"});var EW,w2,Ph,ui,Td=l(()=>{"use strict";EW=m(require("node:path"));Ut();bt();w2="ws://localhost:3000/api/agent-witch/ws",Ph=e=>e.replace(/\/$/,""),ui=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Ph(t);let r=EW.default.basename(e.installDir);if(r===Rs.production)return yd;let n=e.configWsUrl?.trim()??"";return r===Rs.localhost?n.length>0?Ph(n):w2:n.length>0?Ph(n):yd}});var v2,wh,_h=l(()=>{"use strict";vW();Td();ci();v2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wh=e=>{if(!v2(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=ui({installDir:e.layout.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??PW,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??wW,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??_W,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:n,workspace:o,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Re(t.writerExecutionBackend),layout:e.layout}}}});var vh,Eh,Lh=l(()=>{"use strict";vh=m(require("node:fs"));G();_h();Eh=e=>{let t=M(e);if(!vh.default.existsSync(t.configPath))return null;try{let r=JSON.parse(vh.default.readFileSync(t.configPath,"utf8")),n=wh({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!n.ok){if(n.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return n.config}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}}});var pi,LW=l(()=>{"use strict";pi=(e,t,r)=>{let n=r?.trim()??"",o=e?.trim()??"";return n.length>0?o.length>0?o:null:o.length>0?o:t()}});var Wh,E2,Rh,WW=l(()=>{"use strict";Wh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),E2=e=>{if(!Wh(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",n=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||n.length===0||!Array.isArray(e.entries))return null;let o=e.entries.flatMap(s=>{if(!Wh(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!Wh(g))return[];let b=typeof g.itemKey=="string"?g.itemKey.trim():"",h=typeof g.relativePath=="string"?g.relativePath:"",y=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return b.length===0||y.length===0?[]:[{itemKey:b,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:n,entries:o}},Rh=E2});var RW,L2,xd,kh=l(()=>{"use strict";RW=m(require("node:path")),L2=(e,t)=>{let r=t.trim();return RW.default.join(e,"components","store",r.slice(0,2),r)},xd=L2});var kW,W2,Ch,CW=l(()=>{"use strict";kW=m(require("node:fs"));kh();W2=(e,t)=>{let r=[];for(let n of t.entries)for(let o of n.items){let s=xd(e.installDir,o.contentSha256);kW.default.existsSync(s)||r.push(o.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},Ch=W2});var mi,Ao,R2,Th,k2,xh,Ih=l(()=>{"use strict";mi=m(require("node:fs")),Ao=m(require("node:path"));kh();R2=(e,t)=>Ao.default.join(e.installDir,"runs",t,"overlay"),Th=(e,t)=>Ao.default.join(R2(e,t),".cursor"),k2=(e,t,r)=>{let n=r.entries.filter(s=>s.scope==="run");if(n.length===0)return{ok:!0};let o=Th(e,t);mi.default.mkdirSync(o,{recursive:!0});for(let s of n)for(let i of s.items){let a=xd(e.installDir,i.contentSha256);if(!mi.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Ao.default.join(o,c):Ao.default.join(o,i.itemKey);mi.default.mkdirSync(Ao.default.dirname(d),{recursive:!0}),mi.default.copyFileSync(a,d)}return{ok:!0}},xh=k2});var Oh,TW,C2,gi,xW=l(()=>{"use strict";Oh=m(require("node:fs")),TW=m(require("node:path")),C2=(e,t)=>{let r=TW.default.join(e.installDir,"runs",t);Oh.default.existsSync(r)&&Oh.default.rmSync(r,{recursive:!0,force:!0})},gi=C2});var T2,Mh,IW=l(()=>{"use strict";Ih();T2=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let n=Th(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:n}},Mh=T2});var Nh,x2,I2,O2,M2,N2,F,OW=l(()=>{"use strict";Nh=m(require("node:fs"));Td();G();ci();x2="claude",I2="codex",O2="cursor",M2="agy",N2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F=()=>{let e=M();if(!Nh.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Nh.default.readFileSync(e.configPath,"utf8"));if(!N2(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=ui({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,writerExecutionBackend:Re(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:x2,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:I2,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:O2,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:M2,pairingToken:s,layout:e}}catch{return null}}});var Id,MW,NW=l(()=>{"use strict";Id=m(require("node:fs"));yh();MW=(e,t)=>{let r=Cd(e);Id.default.mkdirSync(e,{recursive:!0}),Id.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Id.default.chmodSync(r,384)}catch{}}});var Od,jW,jh=l(()=>{"use strict";Od=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),n=t.slice(-4);return`${r}${"\u2022".repeat(12)}${n}`},jW=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Od(t)}});var fi,j2,Dh,Hh,DW=l(()=>{"use strict";fi=m(require("node:fs"));yr();NW();jh();ai();Bt();j2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Dh=(e,t,r,n)=>{let o=e[t],s=r?.trim()??"",i=jW(s,o?.apiKey)?"":s,a=i.length>0?i:o?.apiKey;if(a===void 0||a.length===0)return e;let c=n!==void 0?ho(n):o?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Hh=e=>{let t=he(e.configPath),r={};if(fi.default.existsSync(e.configPath))try{let o=JSON.parse(fi.default.readFileSync(e.configPath,"utf8"));j2(o)&&(r={...o})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,fi.default.mkdirSync(t,{recursive:!0}),fi.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let n=Dh(Dh(Dh(hr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);MW(t,n)}});var $h,HW=l(()=>{"use strict";$h={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var Fh,$W=l(()=>{"use strict";li();yr();Bt();Bt();Fh=(e,t)=>{if(an(e,t))return!1;let r=ze(t);if(r===null)return!1;let n=he(e.layout.configPath),o=je(n,r);return o===null||o.apiKey.trim().length===0}});var FW,zh,Uh=l(()=>{"use strict";FW=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let n=e.readConfig(r);return n===null?[]:[n]})},zh=async e=>{let t=FW(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=FW(e);if(o.length>0){r(o);return}setTimeout(n,e.pollIntervalMs)};n()}))}});var D2,Bh,zW=l(()=>{"use strict";te();Lh();Uh();D2=1e4,Bh=()=>zh({listProfileEmails:sd,readConfig:Eh,pollIntervalMs:D2,logWaiting:e=>{console.error(e)}})});var le=l(()=>{"use strict";bh();bW();Lh();Td();LW();WW();CW();Ih();xW();IW();ci();OW();DW();yr();Bt();jh();ai();HW();Ah();Bt();$W();li();yr();zW();_h();Uh()});var Md,UW,H2,$2,BW,Nd,hi,jd,yi=l(()=>{"use strict";Md=m(require("node:fs")),UW=m(require("node:path")),H2="wake-port.json",$2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BW=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Nd=e=>UW.default.join(e,H2),hi=e=>{let t=Nd(e);if(!Md.default.existsSync(t))return null;try{let r=JSON.parse(Md.default.readFileSync(t,"utf8"));if($2(r)&&BW(r.wakePort))return r.wakePort}catch{return null}return null},jd=(e,t)=>{if(!BW(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Nd(e);Md.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var mee,gee,fee,ct,GW,Si=l(()=>{"use strict";yi();Ee();yi();mee=nt(),gee=`${ne()}-wake`,fee=ne(),ct=()=>{let e=W(),t=hi(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return nt()},GW=e=>{let t=W();hi(t)===null&&jd(t,e)}});var VW=l(()=>{"use strict";oh();te();dW();le();Si()});var Gh,Ai,bi,qW=l(()=>{"use strict";Gh=m(require("node:os"));VW();Ai=()=>{let e=ee();return{ok:!0,port:ct(),hostname:Gh.default.hostname(),profileCount:e.length}},bi=()=>{let e=ee(),t=F()?.pairingToken.trim()??"",r=t.length>0?po(t):null,n=sh();return{hostname:Gh.default.hostname(),port:ct(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var Vh=l(()=>{"use strict";qW()});var KW,JW,YW,Dd,bo=l(()=>{"use strict";KW="materialization.json",JW="backups",YW=".gitignore",Dd=e=>`harness-set:${e.trim()}`});var XW,ZW,Hd,QW=l(()=>{"use strict";XW=m(require("node:crypto")),ZW=m(require("node:fs")),Hd=e=>{try{let t=ZW.default.readFileSync(e);return XW.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Sr,ln,F2,eR,qh,tR=l(()=>{"use strict";Sr=m(require("node:fs")),ln=m(require("node:path"));QW();F2=(e,t,r,n)=>{let o=new Date().toISOString().replaceAll(":","-"),s=ln.default.join(t,o,n);return Sr.default.mkdirSync(ln.default.dirname(s),{recursive:!0}),Sr.default.copyFileSync(r,s),ln.default.relative(e,s).replaceAll("\\","/")},eR=e=>{let t=ln.default.join(e.repoRoot,e.repoRelativeDestination),r=Hd(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let n=e.ledger.entries[e.repoRelativeDestination];if(Sr.default.existsSync(t)){let o=Hd(t);if(o===r)return{kind:"skipped_unchanged"};if(!(n!==void 0&&n.componentId===e.componentId)&&o!==null){let i=F2(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Sr.default.mkdirSync(ln.default.dirname(t),{recursive:!0}),Sr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Sr.default.mkdirSync(ln.default.dirname(t),{recursive:!0}),Sr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},qh=e=>{let t=Hd(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var Kh,rR,$d,Jh=l(()=>{"use strict";Kh=m(require("node:fs"));bo();rR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$d=e=>{if(!Kh.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(Kh.default.readFileSync(e,"utf8"));if(rR(t)&&t.version===1&&rR(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Ar,Fd,nR,oR=l(()=>{"use strict";Ar=m(require("node:fs")),Fd=m(require("node:path"));bo();nR=e=>{let t=new Set(e.setSlugs.map(s=>Dd(s))),r=[],n=[],o={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){o[s]=i;continue}let a=Fd.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Fd.default.join(e.repoRoot,i.backupPath);Ar.default.existsSync(c)?(Ar.default.mkdirSync(Fd.default.dirname(a),{recursive:!0}),Ar.default.copyFileSync(c,a),n.push(s)):Ar.default.existsSync(a)&&Ar.default.rmSync(a,{force:!0})}else Ar.default.existsSync(a)&&Ar.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:o},summary:{removedPaths:r,restoredPaths:n}}}});var Yh,zd,Xh=l(()=>{"use strict";Yh=m(require("node:path"));bo();zd=e=>({ledgerFilePath:Yh.default.join(e.metaDirPath,KW),backupsDirPath:Yh.default.join(e.metaDirPath,JW)})});var Zh,sR,iR=l(()=>{"use strict";Zh=m(require("node:path")),sR=(e,t)=>{let n=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(n.length===0)return Zh.default.posix.join("rules",e,"file");let o=n[n.length-1]??"file",s=n[0]??"rules";return Zh.default.posix.join(s,e,o)}});var Qh,aR,ey,lR=l(()=>{"use strict";Qh=m(require("node:fs")),aR=m(require("node:path")),ey=(e,t)=>{Qh.default.mkdirSync(aR.default.dirname(e),{recursive:!0}),Qh.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var ty,z2,qe,wi=l(()=>{"use strict";ty=m(require("node:os")),z2=e=>{let t=e.trim();return t.startsWith("~/")?`${ty.default.homedir()}${t.slice(1)}`:t==="~"?ty.default.homedir():t},qe=z2});var Ud,cR,U2,dR,uR=l(()=>{"use strict";Ud=m(require("node:fs")),cR=m(require("node:path"));bo();Yr();U2=`*
!${ld}
`,dR=e=>{let t=cR.default.join(e,YW);Ud.default.existsSync(t)||(Ud.default.mkdirSync(e,{recursive:!0}),Ud.default.writeFileSync(t,U2))}});var cn,Ke,dn=l(()=>{"use strict";cn=m(require("node:path"));Yr();wi();Ke=e=>{let t=qe(e),r=cn.default.join(t,bL);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:cn.default.join(r,"rag"),memoryDirPath:cn.default.join(r,PL),reportsDirPath:cn.default.join(r,_L),metaFilePath:cn.default.join(r,ld),ragChunksFilePath:cn.default.join(r,"rag",wL)}}});var vt,mR,B2,G2,Ue,ry=l(()=>{"use strict";vt=m(require("node:fs")),mR=m(require("node:path"));Yr();uR();dn();B2=(e,t)=>{if(vt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};vt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},G2=e=>{vt.default.existsSync(e.ragChunksFilePath)||vt.default.writeFileSync(e.ragChunksFilePath,"");let t=mR.default.join(e.memoryDirPath,eo);vt.default.existsSync(t)||vt.default.writeFileSync(t,"")},Ue=e=>{let t=Ke(e.projectFolderPath);return vt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),vt.default.mkdirSync(t.ragDirPath,{recursive:!0}),vt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),dR(t.metaDirPath),B2(t,e),G2(t),{ok:!0,layout:t}}});var gR,fR,hR,yR,Bd,Gd=l(()=>{"use strict";gR="components",fR="store",hR="versions",yR="installed.json",Bd=e=>`harness-set:${e.trim()}`});var ny,SR,Vd,oy=l(()=>{"use strict";ny=m(require("node:fs")),SR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vd=e=>{if(!ny.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(ny.default.readFileSync(e,"utf8"));if(SR(t)&&t.version===1&&SR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var _i,Po,qd=l(()=>{"use strict";_i=m(require("node:path"));Gd();Po=e=>{let t=_i.default.join(e,gR);return{componentsRootDir:t,storeDir:_i.default.join(t,fR),versionsDir:_i.default.join(t,hR),installedFilePath:_i.default.join(t,yR)}}});var sy,AR,Kd,Jd,Yd=l(()=>{"use strict";sy=m(require("node:crypto")),AR=m(require("node:fs")),Kd=e=>sy.default.createHash("sha256").update(e,"utf8").digest("hex"),Jd=e=>{try{let t=AR.default.readFileSync(e);return sy.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var iy,bR,PR,wR=l(()=>{"use strict";iy=m(require("node:fs")),bR=m(require("node:path")),PR=(e,t)=>{iy.default.mkdirSync(bR.default.dirname(e),{recursive:!0}),iy.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var ay,ly,_R,vR=l(()=>{"use strict";ay=m(require("node:fs")),ly=m(require("node:path")),_R=(e,t)=>{let r=t.componentId.replaceAll("/","_"),n=ly.default.join(e,r),o=ly.default.join(n,`${t.versionId}.json`);ay.default.mkdirSync(n,{recursive:!0}),ay.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`)}});var Xd,ER,LR,WR=l(()=>{"use strict";Xd=m(require("node:fs")),ER=m(require("node:path"));Yd();LR=e=>{let t=Kd(e.content),r=ER.default.join(e.storeDir,t);return Xd.default.existsSync(r)||(Xd.default.mkdirSync(e.storeDir,{recursive:!0}),Xd.default.writeFileSync(r,e.content)),t}});var cy,RR,V2,Zd,dy=l(()=>{"use strict";cy=m(require("node:fs")),RR=m(require("node:path"));Gd();oy();qd();Yd();wR();vR();WR();V2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zd=e=>{let t=Po(e.installDir),r=Bd(e.setSlug),n=String(e.setEntry.version),o=[];for(let i of e.setEntry.items){if(!V2(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=RR.default.join(e.harnessRootDir,a);if(!cy.default.existsSync(c))continue;let d=cy.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Jd(c);if(p!==null){if(Kd(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);LR({storeDir:t.storeDir,content:d}),o.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(o.length===0)return;_R(t.versionsDir,{version:1,componentId:r,versionId:n,items:o,createdAt:new Date().toISOString()});let s=Vd(t.installedFilePath);PR(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:n,installedAt:new Date().toISOString()}}})}});var py,uy,kR,CR=l(()=>{"use strict";py=m(require("node:fs"));dy();oy();qd();uy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kR=e=>{if(!py.default.existsSync(e.harnessManifestPath))return;let t=Po(e.installDir),r=Vd(t.installedFilePath);if(Object.keys(r.components).length>0)return;let n;try{n=JSON.parse(py.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!uy(n)||n.version!==1||!uy(n.sets)))for(let[o,s]of Object.entries(n.sets)){if(!uy(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Zd({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:o,setEntry:{version:i,items:a}})}}});var my,TR,xR,IR=l(()=>{"use strict";my=m(require("node:fs")),TR=m(require("node:path")),xR=e=>{let t=e.componentId.replaceAll("/","_"),r=TR.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!my.default.existsSync(r))return null;try{let n=JSON.parse(my.default.readFileSync(r,"utf8"));if(typeof n=="object"&&n!==null&&n.version===1)return n}catch{return null}return null}});var Qd,eu,OR,MR=l(()=>{"use strict";Qd=m(require("node:fs")),eu=m(require("node:path"));Gd();CR();IR();qd();Yd();OR=e=>{kR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Po(e.layout.installDir),r=Bd(e.setSlug),n=xR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(n!==null){let i=n.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=eu.default.join(t.storeDir,i.contentSha256);if(Qd.default.existsSync(a)&&Jd(a)===i.contentSha256)return a}}let o=e.manifestItemPath.trim();if(o.length===0)return null;let s=o.startsWith("shared/")?eu.default.join(e.layout.harnessRootDir,o):eu.default.join(e.layout.harnessSetsDir,e.setSlug,o);if(!Qd.default.existsSync(s))return null;try{if(!Qd.default.statSync(s).isFile())return null}catch{return null}return s}});var NR,q2,K2,br,tu=l(()=>{"use strict";Jh();Xh();dn();NR="harness-set:",q2=e=>{let t=e.trim();if(!t.startsWith(NR))return null;let r=t.slice(NR.length).trim();return r.length>0?r:null},K2=e=>{let t=new Set;for(let r of Object.values(e.entries)){let n=q2(r.componentId);n!==null&&t.add(n)}return[...t].sort((r,n)=>r.localeCompare(n))},br=e=>{let t=Ke(e),{ledgerFilePath:r}=zd(t),n=$d(r);return K2(n)}});var ru,gy,vi,J2,Gt,Ei,wo=l(()=>{"use strict";ru=m(require("node:fs")),gy=m(require("node:os")),vi=m(require("node:path")),J2=()=>ru.default.realpathSync(vi.default.resolve(gy.default.homedir())),Gt=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?vi.default.join(gy.default.homedir(),t.slice(1)):t,n;try{n=ru.default.realpathSync(vi.default.resolve(r))}catch{return null}let o=J2();return n===o||n.startsWith(`${o}${vi.default.sep}`)?n:null},Ei=e=>{let t=Gt(e);if(t===null)return null;try{if(!ru.default.statSync(t).isFile())return null}catch{return null}return t}});var fy,hy=l(()=>{"use strict";fy=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var ou,jR,nu,Y2,Li,yy=l(()=>{"use strict";ou=m(require("node:fs")),jR=m(require("node:path"));bo();tR();Jh();oR();Xh();iR();lR();wi();ry();MR();tu();wo();hy();nu=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Y2=e=>{if(!ou.default.existsSync(e))return null;try{let t=JSON.parse(ou.default.readFileSync(e,"utf8"));if(nu(t)&&t.version===1)return t}catch{return null}return null},Li=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=qe(e.projectFolderPath),n=Gt(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=ou.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Ue({projectFolderPath:n}),{ledgerFilePath:i,backupsDirPath:a}=zd(s.layout),d=br(n).filter(A=>!t.includes(A)),p=$d(i),g=0;if(d.length>0){let A=nR({repoRoot:n,setSlugs:d,ledger:p});p=A.ledger,g=A.summary.removedPaths.length}if(t.length===0)return ey(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:n,appliedSetSlugs:[]};let b=Y2(e.layout.harnessManifestPath);if(b===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=nu(b.sets)?b.sets:{},y=0,u=0,S=0;for(let A of t){let f=h[A];if(!nu(f))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",_=Dd(A),v=Array.isArray(f.items)?f.items:[];for(let L of v){if(!nu(L))continue;let R=typeof L.path=="string"?L.path.trim():"";if(R.length===0)continue;let T=fy(R);if(T===null)continue;let I=sR(A,T),D=jR.default.posix.join(".cursor",I).replaceAll("\\","/"),re=typeof L.id=="string"?L.id.trim():"",U=OR({layout:e.layout,setSlug:A,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:R,manifestItemId:re});if(U===null)continue;let q=eR({repoRoot:n,backupsDir:a,repoRelativeDestination:D,sourceAbsolutePath:U,componentId:_,versionId:w,ledger:p});if(q.kind==="skipped_unchanged"){u+=1;continue}if(q.kind==="backed_up_user_file"){S+=1,y+=1,p={version:1,entries:{...p.entries,[D]:qh({componentId:_,versionId:w,sourceAbsolutePath:U,backupPath:q.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[D]:qh({componentId:_,versionId:w,sourceAbsolutePath:U})}}}}return y===0&&u===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(ey(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:S,removedLedgerPathCount:g,projectFolderPath:n,appliedSetSlugs:t})}});var DR,su,X2,Z2,Q2,e5,t5,r5,n5,o5,s5,Wi,iu=l(()=>{"use strict";DR=m(require("node:crypto")),su=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},X2=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},Z2=(e,t)=>{let r=X2(t),n=su(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},Q2=(e,t,r)=>{let n=Z2(t,r);return`shared/items/${e}/${n}`},e5=["rules","skills","commands","instructions","agents"],t5=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),r5=(e,t)=>[...e.filter(n=>n.id!==t.id),t],n5=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},o5=e=>DR.default.createHash("sha256").update(e,"utf8").digest("hex"),s5=e=>({id:e.id,kind:e.kind,title:e.title,path:Q2(e.id,e.kind,e.title),contentSha256:o5(e.content)}),Wi=e=>{let t=new Date().toISOString(),r=e.existingManifest??t5(e.hostname,t),n=su(e.bundle.slug),o=n5(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...e5.map(d=>`sets/${n}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=s5(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:r5(d.nextItems,g)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var Pr,HR,au,i5,un,Sy=l(()=>{"use strict";Pr=m(require("node:fs")),HR=m(require("node:os")),au=m(require("node:path"));iu();i5=e=>{if(!Pr.default.existsSync(e))return null;try{let t=JSON.parse(Pr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},un=e=>{try{let t=i5(e.layout.harnessManifestPath),r=Wi({bundle:e.bundle,hostname:HR.default.hostname(),existingManifest:t});Pr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let n of r.directories)Pr.default.mkdirSync(au.default.join(e.layout.harnessRootDir,n),{recursive:!0});for(let n of r.files){let o=au.default.join(e.layout.harnessRootDir,n.relativePath);Pr.default.mkdirSync(au.default.dirname(o),{recursive:!0}),Pr.default.writeFileSync(o,n.content)}return Pr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var Ay,$R=l(()=>{"use strict";Sy();yy();Ay=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=un({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Li({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var FR,zR=l(()=>{"use strict";FR=["rule","skill","command","instruction","agent"]});var UR,a5,l5,Et,by=l(()=>{"use strict";zR();UR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),a5=e=>typeof e=="string"&&FR.includes(e),l5=e=>{if(!UR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!a5(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Et=e=>{if(!UR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=l5(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var BR,c5,Py,GR=l(()=>{"use strict";BR=require("node:zlib");by();c5="x-agent-witch-token",Py=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[c5]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let n=r.headers.get("x-content-sha256")?.trim()??"";if(n.length>0&&n!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let o=Buffer.from(await r.arrayBuffer()),s=(0,BR.gunzipSync)(o).toString("utf8"),i=JSON.parse(s),a=Et(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var _y,wy,wr,VR=l(()=>{"use strict";_y=m(require("node:fs")),wy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wr=e=>{if(!_y.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(_y.default.readFileSync(e.harnessManifestPath,"utf8"));if(!wy(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=wy(t.sets)?t.sets:{},o=Object.entries(n).map(([s,i])=>{if(!wy(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var lu,qR=l(()=>{"use strict";lu=()=>"~"});var KR,JR,YR=l(()=>{"use strict";KR=require("node:crypto"),JR=e=>`local-${(0,KR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var vy,XR=l(()=>{"use strict";vy=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Ri,cu,Ey=l(()=>{"use strict";Ri=m(require("node:path")),cu=e=>{let t=Ri.default.dirname(e),r=Ri.default.basename(t);return r==="agents"?Ri.default.basename(Ri.default.dirname(t)):r}});var ki,Vt,ZR,d5,u5,p5,du,QR,Ly=l(()=>{"use strict";ki=m(require("node:fs")),Vt=m(require("node:path"));YR();XR();Ey();ZR=new Set(["node_modules",".git","dist","build",".next","coverage"]),d5=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},u5=(e,t)=>{let r=Vt.default.basename(t);if(e==="skill"){let n=t.split(Vt.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},p5=e=>{let t=[],r=(o,s)=>{let i;try{i=ki.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&ZR.has(a.name))continue;let c=Vt.default.join(o,a.name),d=s?Vt.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;vy(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=Vt.default.join(e,o);ki.default.existsSync(s)&&r(s,o)}let n=Vt.default.join(e,"skills");return ki.default.existsSync(n)&&r(n,"skills"),t},du=e=>{let t=p5(e);if(t.length===0)return null;let r=Vt.default.dirname(e),n=cu(e),o=d5(n),s=t.map(i=>{let a=vy(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:JR(i.absolutePath),kind:a,title:u5(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},QR=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=ki.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||ZR.has(a.name))continue;let c=Vt.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var ek,Wy,m5,Ry,tk=l(()=>{"use strict";ek=m(require("node:fs")),Wy=m(require("node:path"));Ly();wo();m5=e=>{let t=Gt(e.trim());if(t===null)return null;if(Wy.default.basename(t)===".cursor")return t;let r=Wy.default.join(t,".cursor");try{if(ek.default.statSync(r).isDirectory())return Gt(r)}catch{return null}return null},Ry=e=>{let t=m5(e.projectPath);if(t===null)return null;let r=du(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var rk,g5,uu,ky,nk=l(()=>{"use strict";rk=m(require("node:path"));Ly();wo();Ey();g5=5,uu=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},ky=e=>{let t=Gt(e.scanRoot.trim());if(t===null)return uu(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of QR(t,g5,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=Gt(s);if(i===null)continue;let a=cu(i);uu(e.response,"folder",{cursorDir:i,groupName:a,repoPath:rk.default.dirname(i)});let c=du(i);c!==null&&(r.push(c),uu(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return uu(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var ok,sk,ik=l(()=>{"use strict";ok=m(require("node:path")),sk=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:ok.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var xe,ak,Cy,f5,Ty,xy,pu,Iy,Ci,lk=l(()=>{"use strict";xe=m(require("node:fs")),ak=m(require("node:os")),Cy=m(require("node:path"));iu();dy();wo();ik();f5=e=>{if(!xe.default.existsSync(e))return null;try{let t=JSON.parse(xe.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Ty=e=>{let t=e.hostname??ak.default.hostname(),r=f5(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=Ei(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let b=xe.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:b,setSlugs:[i.slug]})}let d=Wi({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)o.add(p);for(let p of d.files)s.push(p),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{xe.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)xe.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=Cy.default.join(e.layout.harnessRootDir,i.relativePath);xe.default.mkdirSync(Cy.default.dirname(a),{recursive:!0}),xe.default.writeFileSync(a,i.content)}xe.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=su(i.slug),d=r.sets[c];d!==void 0&&Zd({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},xy="reveal-cache.json",pu=(e,t)=>{xe.default.mkdirSync(e.harnessRootDir,{recursive:!0}),xe.default.writeFileSync(`${e.harnessRootDir}/${xy}`,`${JSON.stringify(t,null,2)}
`)},Iy=e=>{let t=`${e.harnessRootDir}/${xy}`;xe.default.existsSync(t)&&xe.default.unlinkSync(t)},Ci=e=>{let t=`${e.harnessRootDir}/${xy}`;if(!xe.default.existsSync(t))return null;try{let r=JSON.parse(xe.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return sk(r)}catch{return null}return null}});var pn=l(()=>{"use strict";yy();$R();hy();Sy();GR();by();iu();VR();qR();tk();wo();nk();lk()});var Oy,ck=l(()=>{"use strict";pn();Ee();Oy=e=>{let t=M(e.profileEmail);return un({bundle:e.bundle,layout:t})}});var dk=l(()=>{"use strict";ck();pn()});var h5,uk,y5,pk,mn,mu,mk=l(()=>{"use strict";h5=["agentwitch.com","www.agentwitch.com"],uk=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,y5=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},pk=e=>{let t=y5(e);return!!(h5.includes(t)||uk.test(e.trim().toLowerCase()))},mn=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return pk(r)?uk.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},mu=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:mn(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Ti=l(()=>{"use strict";mk()});var qt,xi=l(()=>{"use strict";qt=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Ii,gk=l(()=>{"use strict";dk();Ti();xi();Ii=e=>{if(!qt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Et(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!mn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=Oy({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}}});var My=l(()=>{"use strict";gk()});var S5,_o,Ny=l(()=>{"use strict";S5=e=>e==="hourly"||e==="daily"||e==="weekdays",_o=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!S5(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Oi,gu,fk,hk,jy,dt,fu,hu,yu,Su,Au=l(()=>{"use strict";Oi=m(require("node:fs")),gu=m(require("node:path"));Ny();fk="automations.json",hk=e=>e.profileEmail!==null?gu.default.join(e.installDir,"profiles",e.profileEmail,fk):gu.default.join(e.installDir,fk),jy=()=>({version:1,automations:[]}),dt=e=>{let t=hk(e);if(!Oi.default.existsSync(t))return jy();try{let r=JSON.parse(Oi.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?jy():{version:1,automations:r.automations.flatMap(o=>{let s=_o(o);return s!==null?[s]:[]})}}catch{return jy()}},fu=(e,t)=>{let r=hk(e);Oi.default.mkdirSync(gu.default.dirname(r),{recursive:!0}),Oi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},hu=(e,t)=>{fu(e,{version:1,automations:t})},yu=(e,t)=>{let n=dt(e).automations.filter(o=>o.id!==t.id);fu(e,{version:1,automations:[...n,t]})},Su=(e,t)=>dt(e).automations.find(r=>r.id===t)??null});var De,_r=l(()=>{"use strict";De="x-agent-witch-token"});var Z,gn,Dy,Mi,Hy,A5,$y,Ni,ji,Fy,Di=l(()=>{"use strict";_r();Ve();Z=e=>{let t=We(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},gn=e=>({[De]:e,"Content-Type":"application/json"}),Dy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:gn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Mi=async(e,t,r,n,o)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:gn(e.pairingToken),body:JSON.stringify({exitCode:r,output:n,...typeof o?.estimateSeconds=="number"?{estimateSeconds:o.estimateSeconds}:{},...typeof o?.actualSeconds=="number"?{actualSeconds:o.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Hy=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:gn(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},A5=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let n of t.projects){if(typeof n!="object"||n===null)continue;let o=n,s=typeof o.id=="string"?o.id.trim():"",i=typeof o.name=="string"?o.name.trim():"",a=typeof o.folderPath=="string"?o.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},$y=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:gn(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n;if(o.ok!==!0||typeof o.project!="object")return null;let s=o.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Ni=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:gn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return A5(r)}catch{return null}},ji=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:gn(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},Fy=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:gn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var fn,yk,Sk,b5,zy,Ak,Uy=l(()=>{"use strict";fn=m(require("node:fs")),yk=m(require("node:path")),Sk=e=>yk.default.join(e.harnessRootDir,"projects-registry.json"),b5=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),zy=e=>{let t=Sk(e);if(!fn.default.existsSync(t))return[];try{let r=JSON.parse(fn.default.readFileSync(t,"utf8"));return b5(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string").map(n=>({id:n.id,name:n.name,projectFolderPath:n.projectFolderPath,addedAt:typeof n.addedAt=="string"?n.addedAt:new Date().toISOString(),...typeof n.cloudProjectId=="string"&&n.cloudProjectId.length>0?{cloudProjectId:n.cloudProjectId}:{}})):[]}catch{return[]}},Ak=e=>{let t=Sk(e);if(!fn.default.existsSync(t))return;let r=`${t}.migrated`;if(fn.default.existsSync(r)){fn.default.unlinkSync(t);return}fn.default.renameSync(t,r)}});var bk,P5,w5,Pk,wk=l(()=>{"use strict";wi();bk=e=>qe(e),P5=e=>new Set(e.map(t=>bk(t.folderPath))),w5=e=>new Set(e.map(t=>t.id)),Pk=(e,t)=>{let r=P5(t),n=w5(t),o=[],s=new Set;for(let i of e){let a=bk(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&n.has(i.cloudProjectId)||(s.add(a),o.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return o}});var By,Gy=l(()=>{"use strict";Di();Uy();wk();By=async(e,t)=>{let r=zy(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let n=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let o=await Ni(n);if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=Pk(r,o),i=r.length-s.length,a=0,c=0;for(let d of s)await $y(n,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&Ak(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var Vy,hn,bu=l(()=>{"use strict";Vy=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),hn=(e,t)=>e.find(r=>r.id===t)??null});var vo,Pu=l(()=>{"use strict";Di();Gy();bu();vo=async(e,t)=>{t!==void 0&&await By(t,e);let r=Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let n=await Ni(r);if(n===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let o=Vy(n);return{ok:!0,projects:o,message:o.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${o.length} project${o.length===1?"":"s"} from Agent Witch Console.`}}});var _k=l(()=>{"use strict"});var Ie,vk,_5,v5,E5,L5,Eo,qy=l(()=>{"use strict";Ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vk=(e,t)=>e.length===0?`<p class="empty">${Ie(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Ie(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Ie(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,_5=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,v5=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ie(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,E5=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?v5(e.project):_5();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(n=>`<li class="harness-installed-set">
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
      </form>`},L5=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Ie(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Ie(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Eo=e=>{let t=e.flashError?`<div class="alert-error">${Ie(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ie(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},n=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${Ie(c)}</a>`,o=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=E5({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=vk(o,"No workflows installed for this project yet."):e.activeTab==="agents"?i=vk(s,"No agents installed for this project yet."):i=L5({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
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
    </section>`}});var W5,R5,Ek,Lk=l(()=>{"use strict";pn();_r();W5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),R5=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[De]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();return!W5(n)||n.ok!==!0||!Array.isArray(n.bundles)?null:n.bundles.flatMap(o=>{let s=Et(o);return s===null?[]:[s]})}catch{return null}},Ek=R5});var Wk,Ky,Rk=l(()=>{"use strict";le();pn();qy();Pu();Lk();bu();tu();Di();Wk=e=>({kind:"page",title:e.project.name,body:Eo({project:e.project,installed:wr(e.layout),linkedSetSlugs:br(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),Ky=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=F();if(r===null)return{kind:"not_found"};let n=await vo(r,e.layout),o=hn(n.projects,t);if(o===null)return{kind:"not_found"};let s=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await Ek(s,o.id);if(i===null)return Wk({layout:e.layout,project:o,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=Ay({layout:e.layout,projectFolderPath:o.projectFolderPath,bundles:i});if(!a.ok)return Wk({layout:e.layout,project:o,errorMessage:a.errorMessage});let c=s===null?!1:await ji(s,o.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(o.id)}&${d.toString()}`}}});var k5,Jy,kk=l(()=>{"use strict";k5=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,Jy=k5});var Ck,Tk,C5,T5,wu,_u,xk=l(()=>{"use strict";Ck=require("node:child_process"),Tk=require("node:util"),C5=(0,Tk.promisify)(Ck.execFile),T5=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},wu=async(e,t)=>{try{let{stdout:r}=await C5("git",t,{cwd:e,env:T5(),maxBuffer:1048576});return r.trim()}catch{return null}},_u=async e=>{let t=await wu(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await wu(e,["rev-parse","--abbrev-ref","HEAD"]),n=await wu(e,["status","--porcelain"]),o=await wu(e,["diff","--shortstat","HEAD"]),s=n===null||n.length===0?0:n.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:o===null||o.length===0?null:o}}});var Yy,Ik=l(()=>{"use strict";Yy=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",n=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,o=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${n}; ${o}; ${s}; ${i.join("; ")}.`}});var x5,Xy,Ok=l(()=>{"use strict";x5=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",n=r.length>0?r:t.length>0?t:"Lesson from completed run";return n.length<=280?n:`${n.slice(0,277)}\u2026`},Xy=x5});var I5,Zy,Mk=l(()=>{"use strict";_r();I5=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[De]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},Zy=I5});var Nk,vr,jk=l(()=>{"use strict";Nk=require("node:child_process"),vr=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,n=(0,Nk.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return n.length>0?n:null}catch{return null}}});var Dk=l(()=>{"use strict";Pu()});var Hi,Hk=l(()=>{"use strict";_r();Hi=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[De]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var ut=l(()=>{"use strict";Pu();bu();_k();wi();ry();Rk();tu();kk();xk();Ik();Ok();Mk();jk();Dk();Hk();Gy();Uy();Di()});var vu,$i,$k,Qy,yn,eS=l(()=>{"use strict";vu=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},$i=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=vu(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},$k=e=>e>=1&&e<=5,Qy=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return vu(t,"UTC")},yn=e=>{let t=e.from??new Date,r=vu(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return $i(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=$i(r,e.timeZone,n,0),s=vu(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?$i(Qy(r),e.timeZone,n,0):o;if(!i&&$k(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=Qy(a),$k(a.weekday))return $i(a,e.timeZone,n,0);return $i(Qy(r),e.timeZone,n,0)}});var Fk,tS,Kt,rS=l(()=>{"use strict";Fk=require("node:crypto");le();ut();eS();Au();tS=!1,Kt=async e=>{if(tS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=F();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=Su(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};tS=!0;let o=(0,Fk.randomUUID)();try{let s=await So(t,"claude-cli",n.prompt);await Fy(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=yn({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return yu(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{tS=!1}}});var Eu,zk=l(()=>{"use strict";le();rS();Au();Eu=async()=>{let e=F();if(e===null)return;let t=dt(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await Kt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var Fi=l(()=>{"use strict";Au();zk();rS();eS()});var Uk=l(()=>{"use strict";Fi()});var Bk=l(()=>{"use strict";Ny()});var Gk=l(()=>{"use strict";Bk()});var nS=l(()=>{"use strict";Fi()});var O5,M5,zi,oS=l(()=>{"use strict";Uk();Gk();nS();Ee();O5=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),M5=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??yn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??yn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},zi=e=>{let t=O5(e.profileEmail),r=dt(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=_o(s);return i!==null?[M5(i,n.get(i.id))]:[]});return hu(t,o),{ok:!0,writtenCount:o.length}}});var sS=l(()=>{"use strict";Fi()});var Vk=l(()=>{"use strict";le()});var qk=l(()=>{"use strict";oS();sS();nS();Vk()});var Kk,Ui,Bi,Gi,Jk=l(()=>{"use strict";Kk=m(require("node:os"));qk();Ti();xi();Ui=e=>{if(!qt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!mn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=zi({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},Bi=async e=>{if(!qt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:mn(t)?Kt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Gi=()=>{let e=F(),t=e!==null?dt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Kk.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var iS=l(()=>{"use strict";Jk()});var Lu=l(()=>{"use strict";te()});var Wu=l(()=>{"use strict";te()});var Ru,Xk,Zk,Yk,N5,j5,Lo,aS=l(()=>{"use strict";Ru=m(require("node:fs")),Xk=m(require("node:os")),Zk=m(require("node:path"));Lu();Wu();yi();Ee();Yk=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},N5=e=>Zk.default.join(Xk.default.homedir(),"Library","LaunchAgents",`${e}.plist`),j5=async e=>Ru.default.existsSync(N5(e))?(await ve(e)).ok:!1,Lo=async(e=W())=>{let t=Ru.default.existsSync(Nd(e)),r=!Ru.default.existsSync(jt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let n=hi(e);if(n===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await Yk(n))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${ne(e)}-wake`;await j5(i)&&s.push(i);for(let c of ee(e))(await ve(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await Yk(n);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var Qk=l(()=>{"use strict";te()});var Wo,Vi=l(()=>{"use strict";Wo="connection-health.json"});var Sn,ku,D5,qi,ye,lS,Cu,Oe,Tu=l(()=>{"use strict";Sn=m(require("node:fs")),ku=m(require("node:path"));Vi();D5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qi=e=>e.profileEmail===null?ku.default.join(e.installDir,Wo):ku.default.join(e.installDir,"profiles",e.profileEmail,Wo),ye=e=>{let t=qi(e);if(!Sn.default.existsSync(t))return null;try{let r=JSON.parse(Sn.default.readFileSync(t,"utf8"));return!D5(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},lS=e=>{let t=qi(e);Sn.default.existsSync(t)&&Sn.default.rmSync(t,{force:!0})},Cu=(e,t)=>{let r=qi(e),n=ye(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};Sn.default.mkdirSync(ku.default.dirname(r),{recursive:!0}),Sn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Oe=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var Ki,eC=l(()=>{"use strict";Vi();Tu();Ki=(e,t)=>{if(!t.socketOpen)return!1;let r=ye(e);return r===null?!1:!Oe(r,t.staleAfterMs??12e4,t.nowMs)}});var cS,tC=l(()=>{"use strict";Tu();cS=(e,t)=>!(e!==null&&!Oe(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Ro=l(()=>{"use strict";Tu();eC();tC();Vi()});var dS=l(()=>{"use strict";Ro();te()});var uS=l(()=>{"use strict";Ro()});var pS=l(()=>{"use strict";te()});var nC,rC,Ji,mS=l(()=>{"use strict";nC=m(require("node:fs"));Ut();Lu();Wu();Ee();rC=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Ji=async(e=W())=>{if(!nC.default.existsSync(jt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await rC())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let n=[];for(let s of ee(e))(await ve(s.launchAgentLabel)).ok&&n.push(s.launchAgentLabel);let o=await rC();return{ok:o||n.length>0,liveReachable:o,hollowInstall:!1,kickstartedLabels:n}}});var oC=l(()=>{"use strict";te()});var sC,An,gS,H5,$5,F5,iC,z5,aC,ko,xu=l(()=>{"use strict";sC=require("node:crypto"),An=m(require("node:fs")),gS=m(require("node:path"));Ee();H5="watchdog-log.ndjson",$5=200,F5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iC=(e=W())=>{let t=M(),r=t.installDir===e?t.logsDir:Qn({installDir:e,profileEmail:t.profileEmail});return gS.default.join(r,H5)},z5=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!F5(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},aC=(e,t=W())=>{let r={id:(0,sC.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=iC(t);An.default.mkdirSync(gS.default.dirname(n),{recursive:!0});let o=An.default.existsSync(n)?An.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-$5+1)),JSON.stringify(r)];return An.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},ko=(e=20,t=W())=>{let r=iC(t);if(!An.default.existsSync(r))return[];let n=An.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=z5(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var fS,hS,yS,SS=l(()=>{"use strict";bt();fS=Ur.watchdogReinstallState,hS=900*1e3,yS=3e3});var lC=l(()=>{"use strict";SS()});var cC={};St(cC,{verifyAgentWitchReviveAfterKickstart:()=>B5});var U5,B5,dC=l(()=>{"use strict";lC();uS();pS();Ee();U5=e=>new Promise(t=>{setTimeout(t,e)}),B5=async e=>{if(await U5(e.verifyDelayMs??yS),!await Vr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),n=ye(r);return!Oe(n,e.staleAfterMs)}});var Yi,AS,G5,uC,pC,bS,PS,wS=l(()=>{"use strict";Yi=m(require("node:fs")),AS=m(require("node:path"));G();SS();G5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uC=e=>AS.default.join(e,fS),pC=(e=W())=>{let t=uC(e);if(!Yi.default.existsSync(t))return null;try{let r=JSON.parse(Yi.default.readFileSync(t,"utf8"));return!G5(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},bS=(e=W(),t=Date.now())=>{let r=pC(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=hS:!0},PS=(e=W(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=uC(e);return Yi.default.mkdirSync(AS.default.dirname(n),{recursive:!0}),Yi.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var _S,mC=l(()=>{"use strict";te();wS();_S=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!bS())return{attempted:!1,ok:!1,targets:e};PS();let n=await t();if(!n.ok)return{attempted:!0,ok:!1,errorMessage:n.errorMessage,targets:e};let o=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await ve(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:o.some(s=>s.revived||s.reason==="healthy"),targets:o}}});var gC=l(()=>{"use strict";wS();mC()});var vS=l(()=>{"use strict";Ve()});var fC=l(()=>{"use strict";Ve()});var hC,Co,yC,SC,AC,V5,q5,bC,K5,J5,PC,wC=l(()=>{"use strict";hC=require("node:child_process"),Co=m(require("node:fs")),yC=m(require("node:os")),SC=m(require("node:path")),AC=require("node:util");vS();fC();Ee();V5=(0,AC.promisify)(hC.execFile),q5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bC=e=>{let t=ot(e),r=t===null?M():M(t);if(!Co.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Co.default.readFileSync(r.configPath,"utf8"));return!q5(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},K5=e=>bC(e)?.wsUrl??null,J5=e=>{let t=K5(e);return t!==null?We(t):Le(e)?.appOrigin??null},PC=async e=>{let t=e?.installDir??W(),r=bC(t),n=r!==null?We(r.wsUrl):J5(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=SC.default.join(yC.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Co.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??ot(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await V5("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Co.default.existsSync(i)&&Co.default.unlinkSync(i)}}});var _C={};St(_C,{attemptAgentWitchWatchdogReinstall:()=>Y5});var Y5,vC=l(()=>{"use strict";gC();wC();Y5=async e=>_S(e,()=>PC())});var EC,LC,WC,X5,Z5,Q5,Xi,ES=l(()=>{"use strict";Qk();dS();uS();pS();mS();aS();Lu();Wu();Ee();ao();oC();xu();EC=e=>e===null?M():M(e),LC=async(e,t,r)=>{if(!await Vr(e))return"not_running";let o=EC(t);if(at(o))return"healthy";let s=ye(o);return Oe(s,r)?"stale_connection":"healthy"},WC=async e=>{let t=e?.staleAfterMs??12e4,r=W(),n=ee(r);return Promise.all(n.map(async o=>{let s=await LC(o.launchAgentLabel,o.profileEmail,t),i=EC(o.profileEmail),a=ye(i),c=await Vr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Oe(a,t),needsRevive:s!=="healthy",reason:s}}))},X5=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},Z5=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",Q5=async e=>{let t=await ve(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(dC(),cC)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Xi=async e=>{if(!st())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=W();await Lo(r),await Ji(r);let n=ee(r),o=[];for(let p of n){let g=await LC(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){o.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}o.push(await Q5({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(o.length===0){let p=Gr();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(vC(),_C)),g=await p(o);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&aC({event:Z5(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:X5(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var RC,Iu,kC=l(()=>{"use strict";RC=m(require("node:os"));dS();xu();ES();Iu=async()=>{let e=await WC(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:RC.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:ko(1)[0]??null}}});var LS=l(()=>{"use strict";aS();ES();kC();xu()});var Zi,Qi,ea,CC=l(()=>{"use strict";te();LS();Zi=async()=>{await Lo();let e=ee(),t=[];for(let r of e){let n=await ve(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Gr();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Qi=Xi,ea=Xi});var WS=l(()=>{"use strict";CC()});var Mu,Ou,TC,RS,xC,eV,tV,rV,nV,oV,Nu,IC=l(()=>{"use strict";Mu=require("node:child_process"),Ou=m(require("node:fs")),TC=m(require("node:os")),RS=m(require("node:path")),xC=require("node:util");te();G();eV=(0,xC.promisify)(Mu.execFile),tV=()=>RS.default.join(TC.default.homedir(),"Library","LaunchAgents"),rV=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await eV("launchctl",["bootout",r]).catch(()=>{})},nV=e=>{let t=RS.default.join(tV(),`${e}.plist`);Ou.default.existsSync(t)&&Ou.default.unlinkSync(t)},oV=e=>{(0,Mu.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Nu=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=W();if(!Ou.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Dt(e);for(let r of t)await rV(r),nV(r);return oV(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var OC,ju,MC,To,NC,sV,iV,aV,kS,lV,CS,jC=l(()=>{"use strict";OC=require("node:child_process"),ju=m(require("node:fs")),MC=m(require("node:os")),To=m(require("node:path")),NC=require("node:util");te();sV=(0,NC.promisify)(OC.execFile),iV=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],aV=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],kS=e=>{ju.default.existsSync(e)&&ju.default.rmSync(e,{force:!0})},lV=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await sV("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},CS=async e=>{let r=(e.listLaunchAgentLabels??Dt)(e.layout.installDir),n=e.launchAgentsDir??To.default.join(MC.default.homedir(),"Library","LaunchAgents"),o=e.bootoutLaunchAgent??lV;for(let i of r)await o(i),kS(To.default.join(n,`${i}.plist`));let s=To.default.dirname(e.layout.configPath);for(let i of iV)kS(To.default.join(s,i));for(let i of aV)kS(To.default.join(e.layout.installDir,i));return ju.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var TS,DC=l(()=>{"use strict";TS={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var xS,HC=l(()=>{"use strict";xS="unknown_identity"});var IS=l(()=>{"use strict";DC();HC()});var cV,OS,$C=l(()=>{"use strict";IS();cV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),OS=e=>e.type!=="system.error"||!cV(e.payload)?!1:e.payload.errorCode===xS});var MS=l(()=>{"use strict";IC();jC();$C()});var Du=l(()=>{"use strict";te();Ve();MS();LS()});var xo,Hu,$u=l(()=>{"use strict";Du();xo=(e=20)=>ko(e),Hu=Iu});var Fu,Io,zu,Uu=l(()=>{"use strict";Du();Fu=on,Io=(e=20)=>tn(e),zu=e=>nn(e)});var Bu,NS=l(()=>{"use strict";Du();Bu=()=>Nu()});var FC=l(()=>{"use strict";Vh();My();iS();WS();$u();Uu();NS()});var zC={};St(zC,{buildAgentWitchAutomationStatusFromWakeServer:()=>Gi,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Fu,buildAgentWitchWakeHealthResponse:()=>Ai,buildAgentWitchWakeIdentityResponse:()=>bi,buildAgentWitchWatchdogStatus:()=>Hu,installHarnessFromWakeServer:()=>Ii,readAgentWitchSelfUpdateLogEntries:()=>Io,readAgentWitchWatchdogLogEntries:()=>xo,restartAgentWitchFromWakeServer:()=>ea,reviveAgentWitchWebSocketFromWakeServer:()=>Qi,runAgentWitchSelfUpdateFromWakeServer:()=>zu,runAgentWitchUninstallLocalFromWakeServer:()=>Bu,runAutomationFromWakeServer:()=>Bi,syncAutomationsFromWakeServer:()=>Ui,wakeAgentWitchLaunchAgents:()=>Zi});var UC=l(()=>{"use strict";FC()});var BC,GC,jS,DS,VC=l(()=>{"use strict";BC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),GC=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?BC(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?BC(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},jS=e=>{let t=e.watchdogLogs.map(GC).join(""),r=e.updateLogs.map(GC).join("");return`<!doctype html>
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
</html>`},DS=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var qC,KC,JC=l(()=>{"use strict";qC=m(require("node:net")),KC=()=>new Promise((e,t)=>{let r=qC.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var YC,dV,HS,XC=l(()=>{"use strict";YC=m(require("node:net"));JC();Si();yi();Ee();dV=e=>new Promise(t=>{let r=YC.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),HS=async()=>{let e=W(),t=ct();if(await dV(t))return GW(t),t;let r=await KC();return jd(e,r),r}});var uV,$S,ZC=l(()=>{"use strict";uV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$S=e=>({force:uV(e)&&e.force===!0})});var ta=l(()=>{"use strict";Ti();VC();XC();ZC();Lf();md();ro()});var FS,j,zS,US,ra,QC=l(()=>{"use strict";FS=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},zS=e=>{e.writeHead(403),e.end()},US=e=>e.url?.split("?")[0]??"/",ra=(e,t,r=20,n=200)=>{let o=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(o.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,n):r}});var pt=l(()=>{"use strict";QC()});var pV,eT,tT=l(()=>{"use strict";iS();pt();pV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},eT=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,Gi(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await pV(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let n=Ui(t);return j(e.response,n.ok?200:400,n,e.cors.headers),!0}let r=await Bi(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var mV,nT,rT,oT,BS,sT,GS=l(()=>{"use strict";mV=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],nT=e=>/embed|minilm|^bge-/i.test(e),rT=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),oT=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),BS=e=>e.filter(t=>t.trim().length>0&&!nT(t)),sT=(e,t)=>{let r=e.filter(o=>o.trim().length>0&&!nT(o)),n=t?.trim()??"";if(n.length>0){let o=r.find(s=>rT(s,n));if(o!==void 0)return o}for(let o of mV){let s=r.find(i=>rT(i,o));if(s!==void 0)return s}return r[0]??null}});var VS,lT,cT,Gu,dT,iT,aT,gV,fV,hV,yV,SV,AV,mt,na=l(()=>{"use strict";VS=require("node:child_process"),lT=m(require("node:fs")),cT=m(require("node:os")),Gu=m(require("node:path"));Ve();lt();GS();dT=3e3,iT=["claude-cli","codex","cursor","antigravity"],aT={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},gV=(e,t)=>new Promise(r=>{let n=(0,VS.spawn)(e,[...t],{stdio:"ignore"}),o=setTimeout(()=>{n.kill("SIGTERM"),r(!1)},dT);n.on("error",()=>{clearTimeout(o),r(!1)}),n.on("close",s=>{clearTimeout(o),r(s===0)})}),fV=()=>{let e=cT.default.homedir();return["ollama",Gu.default.join(e,".local","bin","ollama"),Gu.default.join(e,".agent-witch","ollama","ollama"),Gu.default.join(e,".local-agent-witch","ollama","ollama")]},hV=e=>new Promise(t=>{let r=(0,VS.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),n=[],o=setTimeout(()=>{r.kill("SIGTERM"),t(null)},dT);r.stdout.on("data",s=>{n.push(s)}),r.on("error",()=>{clearTimeout(o),t(null)}),r.on("close",s=>{if(clearTimeout(o),s!==0){t(null);return}t(oT(Buffer.concat(n).toString("utf8")))})}),yV=async()=>{for(let e of fV()){if(e!=="ollama"&&!lT.default.existsSync(e))continue;let t=await hV(e);if(t!==null)return t}return[]},SV=e=>{let t=e.installedWriterIds.map(s=>aT[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,n=ie(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${aT[e.writerAgent]} is not installed.`:"",o=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[n,r,o].filter(s=>s.length>0).join(" ")},AV=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:lo},mt=async e=>{let t=iT.map(i=>{let a=_d(i,e.commands);return gV(a.command,a.args)}),[r,...n]=await Promise.all([yV(),...t]),o=iT.flatMap((i,a)=>n[a]===!0?[i]:[]),s=sT(r,AV());return{ollamaModels:r,estimateModel:s,installedWriterIds:o,capabilityNote:SV({writerAgent:e.writerAgent??"",installedWriterIds:o,estimateModel:s})}}});var bV,PV,qS,uT=l(()=>{"use strict";bV="http://127.0.0.1:11434",PV=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},qS=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||bV;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return n.ok?PV(await n.json()):null}catch{return null}}});var KS=l(()=>{"use strict";lt();na();uT();GS()});var wV,pT,mT=l(()=>{"use strict";KS();wV={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},pT=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:wV[t]})),ollamaModels:BS(e.ollamaModels)})});var _V,gT,fT=l(()=>{"use strict";KS();pt();mT();_V=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},gT=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await mt({commands:ae({})});return j(e.response,200,{ok:!0,...pT({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await _V(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",n=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",o=await qS({model:r,prompt:n});return o===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:o},e.cors.headers),!0)}return!1}});var vV,hT,yT=l(()=>{"use strict";My();pt();vV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},hT=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await vV(e);if(t===null)return!0;let r=Ii(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var ST=l(()=>{"use strict";ut()});var JS,AT=l(()=>{"use strict";ST();xi();JS=e=>{if(!qt(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Ue({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var bT,YS,XS=l(()=>{"use strict";le();ut();xi();bT=e=>{if(!qt(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},YS=async e=>{let t=bT(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=vr("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let n=F();if(n===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let o=Z({wsUrl:n.wsUrl,pairingToken:n.pairingToken});return o===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Ue({projectFolderPath:r}),await Hi(o,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var PT=l(()=>{"use strict";AT();XS()});var wT,_T=l(()=>{"use strict";PT();XS();pt();wT=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=JS(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await YS(t),n=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,n,r,e.cors.headers),!0}return!1}});var vT,ET=l(()=>{"use strict";ta();Uu();$u();vT=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=xo(50),r=Io(50);return e.response.writeHead(200,DS()),e.response.end(jS({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var LT,WT=l(()=>{"use strict";Vh();pt();LT=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,Ai(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,bi(),e.cors.headers),!0):!1});var RT,kT=l(()=>{"use strict";NS();pt();RT=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Bu();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var CT,TT=l(()=>{"use strict";WS();pt();CT=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Qi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await ea();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Zi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var xT,IT=l(()=>{"use strict";ta();Uu();pt();xT=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Fu();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=ra(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:Io(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=$S(t),n=await zu({force:r});return j(e.response,n.ok?200:503,n,e.cors.headers),!0}return!1}});var OT,MT=l(()=>{"use strict";$u();pt();OT=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Hu();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=ra(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:xo(t)},e.cors.headers),!0}return!1}});var NT,jT=l(()=>{"use strict";tT();fT();yT();_T();ET();WT();kT();TT();IT();MT();NT=[LT,vT,OT,CT,xT,RT,hT,wT,eT,gT]});var DT,HT=l(()=>{"use strict";jT();DT=async e=>{for(let t of NT)if(await t(e))return!0;return!1}});var EV,$T,FT=l(()=>{"use strict";Ti();pt();HT();EV=(e,t,r,n)=>({request:e,response:t,wakePort:r,cors:n,pathname:US(e),readJsonBody:()=>FS(e)}),$T=async(e,t,r)=>{let n=e.headers.origin,o=mu(n);try{if(n!==void 0&&n.length>0&&!o.allowed){zS(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=EV(e,t,r,o);if(await DT(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}}});var zT,bn,Vu,qu=l(()=>{"use strict";zT=m(require("node:http"));ta();FT();bn=async()=>{let e=await HS(),t=zT.default.createServer((r,n)=>{$T(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Vu=bn});var UT={};St(UT,{runAgentWitchBridgeCli:()=>LV});var LV,BT=l(()=>{"use strict";te();qu();LV=async()=>{Fe("agent-witch-bridge");let e=await bn(),t=$t(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var GT=l(()=>{"use strict";Ut()});var Oo,ZS,VT=l(()=>{"use strict";Oo=(e,t,r)=>e===1?t:r,ZS=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${Oo(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Oo(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${Oo(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Oo(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Oo(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${Oo(p,"year","years")} ago`}});var Pn,QS,WV,RV,eA,Er,oa,tA,qT=l(()=>{"use strict";Pn=m(require("node:fs")),QS=m(require("node:path")),WV="local-ws-traffic.ndjson",RV=500,eA=e=>QS.default.join(e.logsDir,WV),Er=(e,t)=>{let r=eA(e);Pn.default.mkdirSync(QS.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Pn.default.appendFileSync(r,`${n}
`,"utf8")},oa=(e,t=RV)=>{let r=eA(e);if(!Pn.default.existsSync(r))return[];let o=Pn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},tA=e=>{let t=eA(e);Pn.default.existsSync(t)&&Pn.default.writeFileSync(t,"","utf8")}});var kV,KT,JT,YT=l(()=>{"use strict";IS();kV=new Set(Object.values(TS)),KT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JT=e=>{if(!KT(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!kV.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!KT(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var XT,ZT=l(()=>{"use strict";XT=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var CV,TV,xV,sa,QT=l(()=>{"use strict";ZT();CV=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,TV=e=>CV.test(e),xV=e=>XT(e),sa=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>sa(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&TV(n)){r[n]=xV(o);continue}r[n]=sa(o)}return r}});var Lt,rA,IV,OV,MV,nA,ex,tx,rx,NV,Ku,wn,Ju,oA,nx=l(()=>{"use strict";Lt=m(require("node:fs")),rA=m(require("node:path"));YT();QT();IV="local-ws-trace.ndjson",OV=1e4,MV=1440*60*1e3,nA=e=>rA.default.join(e.logsDir,IV),ex=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},tx=e=>{if(!Lt.default.existsSync(e))return;let t=Lt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-MV,o=t.filter(s=>{let i=ex(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-OV);Lt.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},rx=(e,t)=>{let r=nA(e);Lt.default.mkdirSync(rA.default.dirname(r),{recursive:!0}),Lt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),tx(r)},NV=e=>e.parsed===null?{_empty:!0}:sa(e.parsed),Ku=(e,t,r)=>{let n=JT(r);rx(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:NV(n)})},wn=(e,t)=>{rx(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:sa({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Ju=(e,t=80)=>{let r=nA(e);if(tx(r),!Lt.default.existsSync(r))return[];let n=Lt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let i=ex(s);i!==null&&o.push(i)}return o.reverse()},oA=e=>{let t=nA(e);Lt.default.existsSync(t)&&Lt.default.writeFileSync(t,"","utf8")}});var Lr,ox,jV,sA,Yu,sx=l(()=>{"use strict";Lr=m(require("node:fs")),ox=m(require("node:path")),jV=256e3,sA=e=>{Lr.default.mkdirSync(ox.default.dirname(e),{recursive:!0}),Lr.default.writeFileSync(e,"","utf8")},Yu=(e,t=jV)=>{if(!Lr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Lr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=Lr.default.openSync(e,"r");try{Lr.default.readSync(a,i,0,s,o)}finally{Lr.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var ia=l(()=>{"use strict";qT();nx();sx()});var iA,aA,ix=l(()=>{"use strict";iA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aA=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",n=e.exists&&e.content.length>0?`<pre class="error-log-view">${iA(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${iA(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${iA(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${n}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var ax=l(()=>{"use strict";ix()});var lA,cA=l(()=>{"use strict";lA=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var dA=l(()=>{"use strict";Vi()});var uA,pA,lx=l(()=>{"use strict";dA();uA=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e);return Number.isNaN(n)?!0:r-n>t},pA=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var cx=l(()=>{"use strict";cA();lx()});var dx,aa,mA,la=l(()=>{"use strict";cA();dx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aa=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=dx(e),r=dx(lA(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},mA=`(function () {
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
})();`});var _n,DV,gA,ux=l(()=>{"use strict";_n=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DV=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},gA=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${_n(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?_n(r.direction):_n(r.kind),i=`trace-body-${n}`,a=_n(DV(r.body));return`<tr>
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
    </section>`});var mx,px,fA,gx=l(()=>{"use strict";mx=m(require("node:path"));G();Ut();px=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fA=e=>{let t=ne(e.installDir),n=`AW_HOME="$HOME/${mx.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${px(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${px(n)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var fx=l(()=>{"use strict";la();ux();gx();la()});var HV,Jt,ca=l(()=>{"use strict";HV=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Jt=HV});var hx,yx,Sx,Ax,bx,Px,wx,Mo=l(()=>{"use strict";hx="projects",yx="knowledge",Sx="chunks.ndjson",Ax="lessons.ndjson",bx="error-chunks.ndjson",Px="usage-stats.json",wx="knowledge-location.json"});var Xu,$V,Zu,hA=l(()=>{"use strict";Xu=m(require("node:path"));Mo();$V=(e,t)=>{let r=t.trim(),n=Xu.default.join(e.installDir,hx,r,yx);return{projectId:r,knowledgeDirPath:n,ragChunksFilePath:Xu.default.join(n,Sx),memoryRunsFilePath:Xu.default.join(n,Ax)}},Zu=$V});var yA,FV,_x,vx=l(()=>{"use strict";yA=m(require("node:fs"));Mo();dn();FV=e=>{let t=Ke(e.projectFolderPath),r=`${t.metaDirPath}/${wx}`,n={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};yA.default.mkdirSync(t.metaDirPath,{recursive:!0}),yA.default.writeFileSync(r,`${JSON.stringify(n,null,2)}
`)},_x=FV});var No,Lx,Ex,zV,Wx,Rx=l(()=>{"use strict";No=m(require("node:fs")),Lx=m(require("node:path"));Yr();dn();hA();vx();Ex=(e,t)=>{No.default.existsSync(e)&&(No.default.existsSync(t)&&No.default.statSync(t).size>0||(No.default.mkdirSync(Lx.default.dirname(t),{recursive:!0}),No.default.copyFileSync(e,t)))},zV=e=>{let t=Ke(e.projectFolderPath),r=Zu(e.layout,e.projectId),n=`${t.memoryDirPath}/${eo}`;Ex(t.ragChunksFilePath,r.ragChunksFilePath),Ex(n,r.memoryRunsFilePath),_x({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},Wx=zV});var SA,UV,kx,Cx=l(()=>{"use strict";SA=m(require("node:fs"));dn();UV=e=>{let t=Ke(e);if(!SA.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(SA.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let n=r;return{projectId:typeof n.projectId=="string"&&n.projectId.trim().length>0?n.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},kx=UV});var Tx,BV,jo,Qu=l(()=>{"use strict";Tx=m(require("node:path"));Yr();dn();Rx();Cx();hA();BV=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=kx(t),n=e.projectId?.trim()||r.projectId?.trim()||"";if(n.length>0){Wx({layout:e.layout,projectFolderPath:t,projectId:n});let s=Zu(e.layout,n);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:n}}let o=Ke(t);return{ragChunksFilePath:o.ragChunksFilePath,memoryRunsFilePath:Tx.default.join(o.memoryDirPath,eo),projectId:null}},jo=BV});var ep,VV,tp,AA=l(()=>{"use strict";ep=m(require("node:fs"));Mo();VV=(e,t=500)=>{if(!ep.default.existsSync(e))return;let r=ep.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let n=r.slice(r.length-t);ep.default.writeFileSync(e,`${n.join(`
`)}
`)},tp=VV});var rp,qV,vn,bA=l(()=>{"use strict";rp=m(require("node:path"));Mo();Qu();qV=e=>{let t=jo(e);if(t===null)return null;let r=rp.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:rp.default.join(r,Px),errorChunksFilePath:rp.default.join(r,bx)}},vn=qV});var Ix,da,Ox,xx,PA,Mx,YV,wA,Nx,_A,vA,EA,LA=l(()=>{"use strict";Ix=require("node:crypto"),da=m(require("node:fs")),Ox=m(require("node:path"));ca();Mo();bA();xx=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),PA=e=>{if(!da.default.existsSync(e))return xx();try{let t=JSON.parse(da.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return xx()},Mx=(e,t)=>{da.default.mkdirSync(Ox.default.dirname(e),{recursive:!0}),da.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},YV=e=>{let t=Jt(e).trim(),n=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,Ix.createHash)("sha256").update(n).digest("hex").slice(0,16)},wA=e=>{let t=vn(e);return t===null?null:PA(t.usageStatsFilePath)},Nx=e=>{if(e.chunkIds.length===0)return;let t=vn(e);if(t===null)return;let r=PA(t.usageStatsFilePath),n={...r.chunkRetrievalCounts};for(let o of e.chunkIds)n[o]=(n[o]??0)+1;Mx(t.usageStatsFilePath,{...r,chunkRetrievalCounts:n})},_A=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=vn(e);if(r===null)return null;let n=YV(t),o=PA(r.usageStatsFilePath),s=o.errorOccurrences[n],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return Mx(r.usageStatsFilePath,{...o,errorOccurrences:{...o.errorOccurrences,[n]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),n},vA=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,EA=e=>{if(e===null)return[];let t=[];for(let[r,n]of Object.entries(e.chunkRetrievalCounts))n<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:n,chunkId:r,message:`Knowledge chunk "${r}" was injected ${n} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,n]of Object.entries(e.errorOccurrences))n.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:n.count,errorFingerprint:r,message:`Error "${n.preview}" occurred ${n.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:n.count,errorFingerprint:r,message:`Same error (${n.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,n)=>r.priority-n.priority||n.hitCount-r.hitCount)}});var ua,jx,XV,ZV,Dx,QV,WA,pa,Do,RA,Ho,kA,CA=l(()=>{"use strict";ua=m(require("node:fs")),jx=m(require("node:path"));ca();Qu();AA();LA();XV="http://127.0.0.1:11434",ZV="nomic-embed-text",Dx=(e,t,r)=>jo({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,QV=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},WA=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},pa=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||XV,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||ZV;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},Do=(e,t,r)=>{let n=Dx(e,t,r);if(n===null||!ua.default.existsSync(n))return[];let o=ua.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},RA=async e=>{let t=Jt(e.text),r=WA(t);if(r.length===0)return 0;let n=Dx(e.layout,e.projectFolderPath,e.projectId);if(n===null)return 0;ua.default.mkdirSync(jx.default.dirname(n),{recursive:!0});let o=0;for(let s of r){let i=await pa(s);if(i===null)continue;let a={id:`${Date.now()}-${o}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};ua.default.appendFileSync(n,`${JSON.stringify(a)}
`,"utf8"),o+=1}return tp(n),o},Ho=async e=>{let t=await pa(e.query);if(t===null)return[];let r=e.minScore??0,s=Do(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:QV(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return Nx({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},kA=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var ma,Hx,eq,tq,TA,xA,IA,$x=l(()=>{"use strict";ma=m(require("node:fs")),Hx=m(require("node:path"));ca();bA();AA();CA();eq=e=>{if(!ma.default.existsSync(e))return[];let t=ma.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let n of t)try{r.push(JSON.parse(n))}catch{}return r},tq=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},TA=async e=>{let t=vn(e);if(t===null)return 0;let r=Jt(e.text),n=WA(r,600);if(n.length===0)return 0;let o=t.errorChunksFilePath;ma.default.mkdirSync(Hx.default.dirname(o),{recursive:!0});let s=0;for(let i of n.slice(0,3)){let a=await pa(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};ma.default.appendFileSync(o,`${JSON.stringify(c)}
`,"utf8"),s+=1}return tp(o,200),s},xA=async e=>{let t=vn(e);if(t===null)return[];let r=await pa(e.query);if(r===null)return[];let n=e.minScore??.3;return eq(t.errorChunksFilePath).map(s=>({chunk:s,score:tq(r,s.embedding)})).filter(s=>s.score>=n).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},IA=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var OA=l(()=>{"use strict";CA();LA();$x()});var MA,Fx=l(()=>{"use strict";MA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var zx=l(()=>{"use strict";Fx()});var me,NA,jA=l(()=>{"use strict";zx();me=MA,NA=`
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
.sdlc-submit {
  position: sticky;
  bottom: 0;
  z-index: 30;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 0.65rem 0.75rem;
  margin: 0 -0.05rem;
  padding: 0.65rem 0 0.5rem;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.92) 28%,
    #fff 55%
  );
  box-shadow: 0 -10px 28px rgba(15, 23, 42, 0.06);
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
`.trim()});var rq,nq,DA,Ux,HA,Bx=l(()=>{"use strict";jA();la();rq=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,nq=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],DA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ux=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${rq}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,HA=e=>{let t=nq.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=DA(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"",o=DA(e.installBundleVersionLabel?.trim()??"unknown"),s=Ux("brand brand-in-sidebar",o),i=Ux("brand brand-in-header",o);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${DA(e.title)} \xB7 Agent Witch Local</title>
  <style>${NA}</style>
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
  <script>${mA}</script>
</body>
</html>`}});var np,ga,op=l(()=>{"use strict";np=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ga=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${np(e.syncMessage)}</p>`:"",n=np(e.manageHref),o=np(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${np(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${n}" target="_blank" rel="noopener noreferrer">${o} \u2197</a></p>
    </div>`}});var $A,FA,zA,Gx=l(()=>{"use strict";$A=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,FA=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,zA=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Vx=l(()=>{"use strict";Bx();op();Gx()});var $o,UA,qx=l(()=>{"use strict";la();$o=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UA=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${$o(e.wakeError)}</div>`:"",a=aa(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
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
    </div>`}});var Kx=l(()=>{"use strict";qx()});var sp,ip,ap,Jx,BA=l(()=>{"use strict";sp="support-reply",ip="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",ap=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),Jx=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var lp,Yx,Xx=l(()=>{"use strict";BA();lp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Yx=()=>`<section class="card">
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
      <p>${lp(ip)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${lp(ap)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${lp(Jx)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${lp(sp)}">Run this sample</a>
      </div>
    </section>`});var k,cp=l(()=>{"use strict";k=e=>e==="passed"||e==="stopped"||e==="failed"});var Zx,GA,En,VA,fa=l(()=>{"use strict";Zx="Stopped at the round limit. The best prompt is kept.",GA="Stopped because the score stopped rising. The best prompt is kept.",En="Finished. The best prompt is the result.",VA="Wizard ended. Progress from finished steps is kept."});var ha,qA=l(()=>{"use strict";ha=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],n=e.instructions?.trim()??"",o=n.length===0?[]:["","Instructions:",n];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...o,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",n.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var oq,sq,ya,Qx,dp=l(()=>{"use strict";oq=/\n+|;\s+/,sq=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,ya=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let n=r.split(oq).map(o=>o.replace(/^[-*]\s*/,"").trim()).filter(o=>o.length>0).reduce((o,s)=>{if(t.length+o.length>=12)return o;let i=s.toLowerCase();return[...t,...o].some(c=>c.toLowerCase()===i)?o:[...o,sq(s)]},[]);return[...t,...n]},[]),Qx=e=>{let t=ya(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var Ae,Sa=l(()=>{"use strict";Ae=e=>{let t=e.flatMap(o=>o.score===null?[]:[{roundNumber:o.roundNumber,promptText:o.promptText,score:o.score,reasons:o.reasons}]),[r,...n]=t;return r===void 0?null:n.reduce((o,s)=>s.score>o.score||s.score===o.score&&s.roundNumber>o.roundNumber?s:o,r)}});var Aa,KA=l(()=>{"use strict";dp();Sa();Aa=e=>{let t=[...e.priorRounds,e.current],r=Ae(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},n=[...t].filter(o=>o.score<r.score).sort((o,s)=>s.roundNumber-o.roundNumber).map(o=>o.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:Qx(n)}}});var JA,iq,aq,e0,t0=l(()=>{"use strict";JA={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},iq=e=>{try{let t=JSON.parse(e.fragment);return{...JA,objects:[...e.objects,t]}}catch{return{...JA,objects:e.objects}}},aq=(e,t)=>{if(e.inString){let n=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:n}:t==="\\"?{...e,escaped:!0,fragment:n}:t==='"'?{...e,inString:!1,fragment:n}:{...e,fragment:n}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:iq(r)},e0=e=>[...e].reduce(aq,JA).objects});var lq,YA,cq,r0,XA=l(()=>{"use strict";t0();lq=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},YA=e=>{let t=e0(e).filter(lq),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},cq=(e,t)=>({...e,passed:e.score>=t}),r0=(e,t)=>{let r=YA(e);return r===null?null:cq(r,t)}});var ZA,QA,up=l(()=>{"use strict";ZA="The judge reply needs a score and a reason.",QA="The improver reply was empty."});var n0,o0=l(()=>{"use strict";n0=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((n,o)=>o>n.best?{best:o,stall:0}:{best:n.best,stall:n.stall+1},{best:t,stall:0}).stall}});var s0,i0=l(()=>{"use strict";s0=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((n,o)=>o.score>n.best?{best:o.score,reasons:[]}:{best:n.best,reasons:[...n.reasons,o.reasons]},{best:t.score,reasons:[]}).reasons}});var uq,a0,l0=l(()=>{"use strict";o0();i0();fa();dp();uq=e=>{let t=ya(e);return t.length===0?GA:`${GA} Avoid: ${t.join("; ")}.`},a0=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:Zx};if(n0(e.scores)>=3){let t=e.scores.map((r,n)=>({score:r,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:uq(s0(t))}}return null}});var Wr,pq,eb,c0,pp=l(()=>{"use strict";Wr=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},pq=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,eb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",pq(e.tokens),`Delay: ${Wr(e.delayMs)}`,"",n,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},c0=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var mq,d0,u0=l(()=>{"use strict";XA();mq=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,d0=e=>{let r=(mq.exec(e)?.[1]??e).trim();return r.length===0||YA(r)!==null?null:r}});var p0,mp,m0=l(()=>{"use strict";pp();u0();up();p0=e=>({type:"call",role:"judge",choice:e.choice,prompt:c0({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),mp=e=>{let t=d0(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:QA}}:{nextPrompt:t,continuation:p0({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var tb,g0=l(()=>{"use strict";qA();KA();XA();up();fa();l0();up();m0();tb=e=>{let t=r0(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:ZA}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],n=e.round??r.length,o=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=a0({scores:o.map(a=>a.score),reasons:o.map(a=>a.reasons),round:n,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=Aa({current:{roundNumber:n,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:ha({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var ba,rb=l(()=>{"use strict";ba=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var f0=l(()=>{"use strict"});var h0=l(()=>{"use strict"});var Pa,gp=l(()=>{"use strict";Pa=e=>{let t=e.trim(),n=t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t,o=n.indexOf("{"),s=n.lastIndexOf("}");if(o===-1||s<=o)throw new Error("No JSON object in reply.");return JSON.parse(n.slice(o,s+1))}});var y0=l(()=>{"use strict";fa();gp()});var S0=l(()=>{"use strict"});var A0=l(()=>{"use strict";S0()});var ob,b0=l(()=>{"use strict";ob=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",n,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var gq,sb,P0=l(()=>{"use strict";pp();gq=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,sb=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",gq(e.tokens),`Delay: ${Wr(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var fq,hq,yq,ib,w0=l(()=>{"use strict";fq=/[A-Za-z0-9_./~-]{3,180}/g,hq=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,yq=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||hq.test(t)},ib=(e,t=12)=>{let r=[];for(let n of e.matchAll(fq)){let o=n[0].replace(/\.+$/,"");if(!(!yq(o)||r.includes(o))&&(r.push(o),r.length>=t))break}return r}});var wa,_0=l(()=>{"use strict";wa=(e,t)=>e.flatMap(r=>{let n=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||n.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:n}]}).sort((r,n)=>r.roundNumber-n.roundNumber)});var fp,ab,v0,lb,cb=l(()=>{"use strict";fp=e=>Math.floor(e/2),ab=e=>Math.max(fp(e)+1,e-20),v0=(e,t)=>e>=t?"passes":e>=ab(t)?"close":e>=fp(t)?"weak":"bad",lb=e=>[{band:"bad",label:`0\u2013${fp(e)-1} bad`},{band:"weak",label:`${fp(e)}\u2013${ab(e)-1} weak`},{band:"close",label:`${ab(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var hp,db=l(()=>{"use strict";cb();hp=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",n=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${v0(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),o=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...n,...o]}});var E0,L0=l(()=>{"use strict";E0=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var W0,R0=l(()=>{"use strict";W0=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var Sq,Aq,k0,C0=l(()=>{"use strict";cp();db();L0();R0();Sq=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],Aq=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",k0=e=>{let t=e.wizard;if(t===void 0)return[];let r=E0(t),n=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),o=e.status==="wizard_paused",s=t.phase==="complete",i=Sq.map((p,g)=>{let b=!s&&!o&&g===r?"active":"done";return{id:`wizard-${g+1}`,label:p,state:b,detail:null}}).filter((p,g)=>s?!0:g<=n),a=o&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=W0(t)&&(!o||a)?hp(e):[],d=k(e.status)&&!s?[{id:"end",label:Aq(e),state:"done",detail:e.errorMessage}]:[];return[...i,...c,...d]}});var bq,ub,T0=l(()=>{"use strict";cp();db();C0();bq=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",ub=e=>{if(e.wizard!==void 0)return k0(e);let t=hp(e),r=k(e.status)?[{id:"end",label:bq(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var x0=l(()=>{"use strict";Ut()});var I0,_a,va,zo,yp,pb,O0=l(()=>{"use strict";x0();I0="/prompt-optimizer/agent",_a=`${zt}${I0}`,va=`${zt}/prompt-optimizer`,zo="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",yp=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${zo}`,pb="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Rr=l(()=>{"use strict"});var mb,M0=l(()=>{"use strict";mb="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var N0,j0=l(()=>{"use strict";N0=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Ea,H0=l(()=>{"use strict";j0();Rr();Ea=e=>({schemaVersion:3,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:N0(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{}})});var gb,$0=l(()=>{"use strict";gb=e=>({...e,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null}))})});var fb,F0=l(()=>{"use strict";Rr();fb=(e,t,r)=>{let n=r.trim();if(n.length===0)return e;let o=e.avoidByStep[t]??[],s=[n,...o].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var z0,hb,U0=l(()=>{"use strict";z0=["generalize","evaluate","separate","optimize_modules"],hb=(e,t)=>{let r=z0.indexOf(t);if(r===-1)return e;let n=z0.slice(r+1);return n.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:n.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:n.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:n.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:n.includes("separate")?null:e.selectedSplitTopology,modules:n.includes("optimize_modules")?[]:e.modules,currentModuleIndex:n.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:n.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Sp,yb=l(()=>{"use strict";dp();Sp=e=>{let t=ya(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Sb,B0=l(()=>{"use strict";yb();Sb=e=>{let t=Sp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,n,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(o=>o.length>0).join(`
`)}});var wq,_q,vq,G0,V0=l(()=>{"use strict";wq=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),_q=/^\{\{[a-zA-Z0-9_-]+\}\}$/,vq=(e,t)=>{let{masked:r,tokens:n}=t.reduce((o,s)=>{let i=s.sampleValue.trim();if(i.length===0)return o;let a=new RegExp(wq(i),"g"),c=[...o.tokens];return{masked:o.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return n.reduce((o,s,i)=>o.replace(`\0PO${i}\0`,s),r)},G0=(e,t)=>{let r=[...t].sort((o,s)=>s.sampleValue.length-o.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(o=>_q.test(o)?o:vq(o,r)).join("")}});var Ab,q0=l(()=>{"use strict";V0();Ab=(e,t)=>e.map(r=>({...r,modules:r.modules.map(n=>({...n,prompt:G0(n.prompt,t)}))}))});var Eq,Pb,K0=l(()=>{"use strict";Rr();yb();Eq=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Pb=e=>{let t=Sp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,o=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=Eq(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",o,r,n,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var wb,J0=l(()=>{"use strict";rb();wb=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",n=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),o=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...n,s].filter(a=>a.length>0).join(`
`);return ba({promptText:e.promptText,instructions:`${i}${o.join(`
`)}`})}});var La,_b=l(()=>{"use strict";Sa();La=e=>{let t=e.revisions.map(o=>({roundNumber:o.roundNumber,score:o.judgement?.score??null,passed:o.judgement?.passed??null,runOutput:o.run?.output??null,tokens:o.run?.tokens??null})),r=Ae(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null}))),n=r===null?null:e.revisions.find(o=>o.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:n?.run?.output??null,rounds:t}}});var vb,Y0=l(()=>{"use strict";_b();vb=e=>{let t=La({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((n,o)=>o===e.moduleIndex?{...n,status:r,selectedRevisionRound:t.bestRound,statistics:t}:n)}}});var Wa,X0=l(()=>{"use strict";Wa=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let n=r.statistics?.bestRunOutput?.trim()??"";return n.length>0?{output:n,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var Lq,Wq,ge,Eb=l(()=>{"use strict";Rr();Lq=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let n=r.rounds.reduce((o,s)=>o+(s.tokens??0),0);return n>0?n:null},Wq=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,ge=e=>{let t=e.modules.map((s,i)=>({moduleId:s.moduleId,title:s.title,bestScore:s.statistics?.bestScore??null,tokens:Lq(e,i),status:s.status})),r=t.length,n=t.filter((s,i)=>Wq(e.modules[i])).length,o=r>0&&n===r?"passed":"stopped";return{passedModuleCount:n,totalModules:r,terminalStatusSuggestion:o,rows:t}}});var Lb,Z0=l(()=>{"use strict";Rr();Eb();Lb=e=>{let t=ge(e.wizard),r=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${70})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&r.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,o)=>{let s=n.statistics?.bestRunOutput?.trim();s===void 0||s.length===0||r.push("",`## Module ${o+1}: ${n.title}`,"","```",s,"```")}),`${r.join(`
`)}
`}});var Wb,Q0=l(()=>{"use strict";Wb=e=>{let t=e.modules.reduce((r,n)=>{let o=n.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+o},0);return t>0?t:null}});var gt,Rq,Rb,eI=l(()=>{"use strict";gt=m(Ws());gp();Rq=(0,gt.isType)({name:gt.isNonEmptyString,description:gt.isString,sampleValue:gt.isString}),Rb=e=>{let t=Pa(e);if(!(0,gt.isType)({templatedPrompt:gt.isNonEmptyString,variables:(0,gt.isArrayWithEachItem)(Rq)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var oe,kq,Cq,kb,tI=l(()=>{"use strict";oe=m(Ws());Rr();gp();kq=(0,oe.isType)({id:oe.isNonEmptyString,title:oe.isNonEmptyString,prompt:oe.isNonEmptyString,order:oe.isNumber}),Cq=(0,oe.isType)({id:oe.isNonEmptyString,title:oe.isNonEmptyString,summary:oe.isString,topology:(0,oe.isOneOf)("chain","parallel"),modules:(0,oe.isArrayWithEachItem)(kq),recommended:oe.isBoolean}),kb=e=>{let t=Pa(e);if(!(0,oe.isType)({options:(0,oe.isArrayWithEachItem)(Cq)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),n=r.filter(o=>o.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return n!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Uo,rI=l(()=>{"use strict";Uo=e=>{let t=e.wizard.attempts.filter(n=>n.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var Tq,Ra,Cb=l(()=>{"use strict";Tq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ra=(e,t)=>{let r=new Map(t.map(n=>[n.name,n.sampleValue]));return e.replace(Tq,(n,o)=>{let s=r.get(o);return s===void 0?n:s})}});var ka,Ca,nI=l(()=>{"use strict";Sa();Cb();ka=e=>Ra(e.templatedPrompt,e.variables),Ca=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(n=>n.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return Ae(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??ka(e.wizard)}});var xq,Ta,oI=l(()=>{"use strict";xq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ta=(e,t)=>e.replace(xq,(r,n)=>{let o=t[n];return o===void 0||o.trim()===""?r:o})});var Iq,xa,Tb=l(()=>{"use strict";Iq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,xa=e=>{let t=new Set,r=[];for(let n of e.matchAll(Iq)){let o=n[1];t.has(o)||(t.add(o),r.push(o))}return r}});var Ia,Ln,sI=l(()=>{"use strict";Ia=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Ln=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var Oq,Ap,xb,iI=l(()=>{"use strict";Tb();Oq="wizardParam_",Ap=e=>`${Oq}${e}`,xb=e=>{let t=xa(e.modulePrompt),r={...e.wizard.parameterValues},n=new Set(e.wizard.variables.map(o=>o.name));for(let o of t){let s=Ap(o),i=e.posted.get(s),a=i!==null?i.trim():r[o]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:n.has(o)?`Fill in {{${o}}} before running this module.`:`Fill in {{${o}}} (not listed in Step 1) before running this module.`};r[o]=a}return{ok:!0,parameterValues:r}}});var Wn,aI=l(()=>{"use strict";Wn=["generalize","evaluate","separate","optimize_modules"]});var C=l(()=>{"use strict";cp();fa();g0();qA();pp();rb();f0();h0();y0();A0();b0();P0();w0();KA();_0();Sa();T0();cb();O0();Rr();M0();H0();$0();F0();U0();B0();q0();K0();J0();_b();Y0();X0();Eb();Z0();Q0();eI();tI();rI();nI();Cb();oI();Tb();sI();iI();aI()});var Ib,bp,Mq,uI,pI=l(()=>{"use strict";Ib=m(require("node:fs")),bp=m(require("node:path")),Mq=e=>bp.default.join(bp.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),uI=(e,t)=>{let r=Mq(e),n=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;Ib.default.mkdirSync(bp.default.dirname(r),{recursive:!0}),Ib.default.appendFileSync(r,n,"utf8")}});var Bo,mI,Nq,gI,jq,fI,Wt,J,hI,V,Je=l(()=>{"use strict";Bo=m(require("node:fs")),mI=m(require("node:path"));C();pI();Nq=e=>e.wizard===void 0?e:{...e,wizard:gb(e.wizard)},gI=new Set,jq=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),fI=(e,t)=>{Bo.default.mkdirSync(mI.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Bo.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Bo.default.renameSync(r,e)},Wt=e=>{if(!Bo.default.existsSync(e))return[];try{let t=JSON.parse(Bo.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(jq).map(Nq):[]}catch{return[]}},J=(e,t)=>Wt(e).find(r=>r.id===t)??null,hI=(e,t)=>{gI.add(t);let r=Wt(e).filter(n=>n.id!==t);fI(e,r)},V=(e,t)=>{if(gI.has(t.id))return;let r=Wt(e),n=r.some(o=>o.id===t.id)?r.map(o=>o.id===t.id?t:o):[t,...r];fI(e,n),uI(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var yI,Pp,Ob,kn,Mb,Rt,Cn,ke,Ye=l(()=>{"use strict";yI=m(require("node:fs")),Pp=m(require("node:os")),Ob=m(require("node:path"));ut();kn="~",Mb=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Rt=e=>{let t=Pp.default.homedir(),r=Mb(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Cn=e=>{let t=e.trim().length===0?"~":e.trim(),r=qe(t),n=Ob.default.isAbsolute(r)?Mb(r):Mb(Ob.default.resolve(Pp.default.homedir(),r));try{if(!yI.default.statSync(n).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:n,display:Rt(n)}},ke=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Pp.default.homedir()});var Oa=l(()=>{"use strict";lt();na();vd()});var Dq,SI,AI=l(()=>{"use strict";Oa();Dq=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,SI=e=>{let t=go(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(Dq)],n=r[r.length-1];if(n===void 0)return null;let o=Number(n[1])+Number(n[2]);return Number.isFinite(o)&&o>=1?o:null}});var Hq,$q,bI,Nb,Fq,zq,ft,PI,wI,Tn=l(()=>{"use strict";Oa();AI();Hq="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",$q="The writer waited on terminal input and did not return a prompt.",bI=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Nb=e=>{let t=e.trim();if(t.length===0||t.length>=500||!bI.test(t))return null;let r=t.split(`
`).map(n=>n.trim()).find(n=>bI.test(n))??t;return r.length>280?`${r.slice(0,277)}...`:r},Fq=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},zq=e=>Nb(e.stdout)??Nb(e.stderr)??(Fq(e.replyFile)?Nb(e.replyFile):null),ft=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return Hq;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?$q:null},PI=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],wI=e=>{let t=e.replyFileText?.trim()??"",r=ft([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let n=zq({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(n!==null)return{ok:!1,errorMessage:n};let o=SI([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:o};if(e.writerAgent==="claude-cli"){let i=go(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:o}:{ok:!1,errorMessage:"The writer did not reply."}}});var Go,kt,Ma,_I,wp,Uq,vI,EI,LI,jb=l(()=>{"use strict";Go=m(require("node:fs")),kt=m(require("node:path")),Ma=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},_I=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),wp=(e,t)=>{let r=Ma(e);return r.length>0?r:Ma(t)},Uq=e=>{let t=wp(e.fileName,e.name),r=e.promptText.trim(),n=e.name.trim();if(t.length===0||r.length===0||n.length===0)return null;let o=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${_I(n)}`,...o.length>0?[`description: ${_I(o)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},vI=e=>`.cursor/skills/${e}/SKILL.md`,EI=(e,t)=>{let r=Ma(t);if(r.length===0)return!1;let n=kt.default.resolve(e),o=kt.default.resolve(n,".cursor","skills"),s=kt.default.resolve(n,vI(r));return s.startsWith(`${o}${kt.default.sep}`)?Go.default.existsSync(s):!1},LI=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(wp(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=kt.default.resolve(e.workingDirectory);try{if(!Go.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=Uq({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let n=vI(r.slug),o=kt.default.resolve(t,".cursor","skills"),s=kt.default.resolve(t,n);if(!s.startsWith(`${o}${kt.default.sep}`))return{ok:!1,errorCode:"path"};if(Go.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Go.default.mkdirSync(kt.default.dirname(s),{recursive:!0}),Go.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:n}}});var Bq,WI,RI,kI=l(()=>{"use strict";C();C();Je();Ye();Tn();jb();Bq=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,WI=e=>{let t=e.get("savedSkill");return t!==null&&Bq.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},RI=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=J(e.storePath,t),n=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!k(r.status))return{kind:"redirect",location:n("skillError=working")};let o=Ae(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(o===null||ft(o.promptText)!==null)return{kind:"redirect",location:n("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=LI({workingDirectory:ke(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:o.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:n(`skillError=${a}`)}}return{kind:"redirect",location:n(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var x,Gq,_p,be,xn,TI,CI,xI,II,Me=l(()=>{"use strict";x="manual",Gq=["claude-cli","codex","cursor","antigravity"],_p={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},be=e=>e===x?"You":e in _p?_p[e]:e,xn=e=>Gq.filter(t=>e.includes(t)),TI=e=>{let t=xn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},CI=(e,t)=>t===x?x:e.find(r=>r===t)??null,xI=(e,t,r)=>{let n=xn(e),o=CI(n,t),s=CI(n,r);return o===null||s===null?null:{judge:o,improver:s}},II=(e,t,r)=>{let n=xn(e);return t===null||t.trim()===""?r!==x?r:n[0]??null:t===x?null:n.find(o=>o===t)??null}});var Db,OI,MI=l(()=>{"use strict";Db={ok:!1,errorMessage:"Stopped.",stopped:!0},OI=(e,t,r)=>{if(t===void 0)return;let n=()=>{e.kill("SIGTERM"),r(Db)};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var NI,Na,jI,Hb,Vq,qq,Kq,Xe,ja=l(()=>{"use strict";NI=require("node:child_process"),Na=m(require("node:fs")),jI=m(require("node:os")),Hb=m(require("node:path"));Oa();MI();Tn();Vq=["claude-cli","codex","cursor","antigravity"],qq=18e4,Kq=e=>Vq.includes(e),Xe=e=>new Promise(t=>{if(e.signal?.aborted){t(Db);return}if(!Kq(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,n=_t(r,e.prompt,ae({}));if(n===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!Na.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let o=Hb.default.join(Na.default.mkdtempSync(Hb.default.join(jI.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=PI({writerAgent:r,baseArgs:n.args,replyPath:o}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,NI.spawn)(n.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=g=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(g))};OI(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??qq),d.stdout.on("data",g=>{i.push(Buffer.from(g))}),d.stderr.on("data",g=>{a.push(Buffer.from(g))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let g=Na.default.existsSync(o)?Na.default.readFileSync(o,"utf8"):null;p(wI({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:g}))})})});var DI,Jq,Da,vp,Ep=l(()=>{"use strict";C();Me();DI=e=>e===x?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},Jq=(e,t,r,n,o,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:n,reasons:o,rawReply:t,tokens:s}}:i),Da=(e,t,r=null)=>{let n=e.revisions.find(a=>a.roundNumber===e.currentRound),o=tb({raw:t,passScore:e.passScore,goal:e.goal,promptText:n?.promptText??"",improver:DI(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:wa(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=Jq(e,t,o.verdict?.score??null,o.verdict?.passed??null,o.verdict?.reasons??null,r),i=new Date().toISOString();return o.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:o.continuation.type,errorMessage:o.continuation.type==="passed"?null:o.continuation.errorMessage,updatedAt:i}},vp=(e,t,r=null)=>{let n=mp({raw:t,judge:DI(e.judgeModel),goal:e.goal,passScore:e.passScore}),o=new Date().toISOString();return n.nextPrompt===null?{...e,status:"failed",errorMessage:n.continuation.type==="failed"?n.continuation.errorMessage:"The improver reply was empty.",updatedAt:o}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:n.nextPrompt,judgement:null,writerTokens:r}],updatedAt:o}}});var Lp,$b=l(()=>{"use strict";Lp=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let n=`Token review: ${r}`;return{...e,revisions:e.revisions.map(o=>{if(o.roundNumber!==e.currentRound)return o;let s=o.judgement?.reasons?.trim()??"";return{...o,run:o.run===void 0?o.run:{...o.run,tokenReview:r},judgement:o.judgement===null?o.judgement:{...o.judgement,reasons:s.length===0?n:`${s}

${n}`}}})}}});var FI,Wp,Rp,HI,$I,Fb,Yq,zI,zb,Xq,UI,Zq,Qq,BI,GI=l(()=>{"use strict";FI=require("node:child_process"),Wp=m(require("node:fs")),Rp=m(require("node:path"));C();HI=4e3,$I=12e3,Fb=(e,t)=>{let r=(0,FI.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Yq=e=>Fb(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",zI=e=>{let t=Fb(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(n=>{if(n.length<4)return[];let o=n.slice(3).trim();return[[(o.includes(" -> ")?o.split(" -> ").at(-1)??o:o).replaceAll('"',""),n]]});return Object.fromEntries(r)},zb=(e,t)=>{let r=Rp.default.resolve(e,t),n=Rp.default.relative(e,r);if(n.startsWith("..")||Rp.default.isAbsolute(n)||!Wp.default.existsSync(r)||!Wp.default.statSync(r).isFile())return null;let o=Wp.default.readFileSync(r,"utf8");return o.includes("\0")?"(binary file)":o.length>HI?`${o.slice(0,HI)}
\u2026truncated`:o},Xq=e=>e.length>$I?`${e.slice(0,$I)}
\u2026truncated`:e,UI=e=>{let t=ib(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(o=>[o,zb(e.workingDirectory,o)])),n=Yq(e.workingDirectory);return{git:n,status:n?zI(e.workingDirectory):{},files:r,paths:t}},Zq=(e,t)=>{let r=Fb(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let n=zb(e,t);return n===null?`${t} is missing.`:n},Qq=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",BI=e=>{let t=e.before.git?zI(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),n=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=zb(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),o=r.map(a=>Zq(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",o.length>0?`Changes since the run started:
${o.join(`
`)}`:"",n.length>0?`Files named in the prompt:
${n.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:Qq(e.before.git,e.before.paths.length>0),evidence:Xq(i.join(`

`))}}});var Gb,z,Vb,Pe,VI,eK,tK,qI,Vo,KI,qo,rK,nK,Ha,Ub,Bb,oK,JI,sK,iK,aK,YI,lK,XI,ZI,cK,dK,QI,eO=l(()=>{"use strict";Gb=require("node:child_process"),z=m(require("node:fs")),Vb=m(require("node:os")),Pe=m(require("node:path")),VI=8e6,eK=16e6,tK=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],qI=(e,t)=>{let r=(0,Gb.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Vo=(e,t)=>(0,Gb.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,KI=e=>{let t=qI(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let n=r.slice(3).trim().replaceAll('"',"");return(n.includes(" -> ")?n.split(" -> "):[n]).map(s=>[s.trim(),r])}))},qo=(e,t)=>{let r=Pe.default.resolve(e,t),n=Pe.default.relative(e,r);return n.startsWith("..")||Pe.default.isAbsolute(n)?null:r},rK=(e,t)=>{let r=qo(e,t);if(r===null||!z.default.existsSync(r))return null;let n=z.default.statSync(r);return!n.isFile()||n.size>VI?null:z.default.readFileSync(r)},nK=(e,t,r)=>{let n=qo(e,t);n!==null&&(z.default.mkdirSync(Pe.default.dirname(n),{recursive:!0}),z.default.writeFileSync(n,r))},Ha=(e,t)=>{let r=qo(e,t);r===null||!z.default.existsSync(r)||z.default.rmSync(r,{recursive:!0,force:!0})},Ub=(e,t)=>Vo(e,["cat-file","-e",`HEAD:${t}`]),Bb=e=>{let t=qI(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},oK=e=>Pe.default.resolve(e)!==Pe.default.resolve(Vb.default.homedir()),JI=e=>{if(!z.default.existsSync(e))return 0;let t=z.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?z.default.readdirSync(e).reduce((r,n)=>r+JI(Pe.default.join(e,n)),0):0},sK=(e,t,r)=>{let n=qo(e,r);if(n===null||!z.default.existsSync(n))return{relativePath:r,existed:!1,copyDir:null};if(JI(n)>eK)return{relativePath:r,existed:!0,copyDir:null};let o=Pe.default.join(t,"cache",r);return z.default.mkdirSync(Pe.default.dirname(o),{recursive:!0}),z.default.cpSync(n,o,{recursive:!0}),{relativePath:r,existed:!0,copyDir:o}},iK=400,aK=32e6,YI=e=>{let t=[],r=0,n=!0,o=s=>{if(!(!n||!z.default.existsSync(s)))for(let i of z.default.readdirSync(s)){if(!n||i===".git"||i==="node_modules")continue;let a=Pe.default.join(s,i),c=z.default.statSync(a);if(c.isDirectory()){o(a);continue}if(!(!c.isFile()||c.size>VI)){if(t.length>=iK||r+c.size>aK){n=!1;return}r+=c.size,t.push(Pe.default.relative(e,a))}}};return o(e),{paths:t,complete:n}},lK=(e,t,r)=>{let n=qo(e,r);if(n===null||!z.default.existsSync(n))return null;let o=rK(e,r);if(o===null)return"skip";let s=Pe.default.join(t,"files",r);return z.default.mkdirSync(Pe.default.dirname(s),{recursive:!0}),z.default.writeFileSync(s,o),s},XI=e=>{let t=z.default.mkdtempSync(Pe.default.join(Vb.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?KI(e.workingDirectory):{},n=e.git?{paths:[],complete:!0}:YI(e.workingDirectory),o=e.git?[...Object.keys(r),...e.namedPaths]:[...n.paths,...e.namedPaths],s=Object.fromEntries([...new Set(o)].map(i=>[i,lK(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?Bb(e.workingDirectory):null,isolateCaches:oK(e.workingDirectory),complete:n.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:tK.map(i=>sK(e.workingDirectory,t,i))}},ZI=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Ha(e.workingDirectory,t);return}nK(e.workingDirectory,t,z.default.readFileSync(r))}},cK=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?ZI(e,t):Ub(e.workingDirectory,t)?Vo(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Ha(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",n=r.startsWith(" ")||r.startsWith("?");n&&Ub(e.workingDirectory,t)&&Vo(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),n&&!Ub(e.workingDirectory,t)&&Vo(e.workingDirectory,["reset","-q","HEAD","--",t])},dK=(e,t)=>{let r=qo(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Ha(e.workingDirectory,t.relativePath),z.default.mkdirSync(Pe.default.dirname(r),{recursive:!0}),z.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Ha(e.workingDirectory,t.relativePath);return}if(z.default.existsSync(r))for(let n of z.default.readdirSync(r)){let o=Pe.default.join(r,n);z.default.statSync(o).mtimeMs>=e.startedMs-1e3&&z.default.rmSync(o,{recursive:!0,force:!0})}}}},QI=e=>{try{if(e.git){if(Bb(e.workingDirectory)!==e.head&&(!(e.head===null?Vo(e.workingDirectory,["update-ref","-d","HEAD"]):Vo(e.workingDirectory,["reset","--hard",e.head]))||Bb(e.workingDirectory)!==e.head))throw new Error("head");let r=KI(e.workingDirectory);for(let n of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))cK(e,n)}else{if(e.complete)for(let t of YI(e.workingDirectory).paths)e.files[t]===void 0&&Ha(e.workingDirectory,t);for(let t of Object.keys(e.files))ZI(e,t)}for(let t of e.caches)dK(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{z.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var kp,Cp,uK,pK,mK,gK,fK,tO,hK,rO,nO=l(()=>{"use strict";C();Ep();$b();GI();eO();Me();Ye();ja();kp=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),Cp=e=>({...e,status:"stopped",errorMessage:En,judgePhase:void 0,updatedAt:new Date().toISOString()}),uK=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),pK=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==x?t:e.improverModel!==x?e.improverModel:null}return e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null},mK=async e=>{let t=ke(e.cycle),r=UI({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),n=XI({workingDirectory:t,git:r.git,namedPaths:r.paths}),o=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?wb({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Wa(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):ba({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await Xe({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?BI({workingDirectory:t,before:r,writerReply:i.text}):null,c=QI(n);return i.ok?!c.ok||a===null?{ok:!1,cycle:kp(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-o,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Cp(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:kp(e.cycle,i.errorMessage)})},gK=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:mK({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),fK=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),tO=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let n=await Xe({writerAgent:e.reviewer,workingDirectory:ke(e.cycle),prompt:sb({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return n.ok?{kind:"suggestion",text:n.text.trim(),tokens:n.tokens}:n.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Cp(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},hK=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===x)return t;let n={...t,judgePhase:"scoring"};e.onProgress?.(n);let o=await Xe({writerAgent:t.judgeModel,workingDirectory:ke(t),prompt:ob({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return o.ok?{...Da(n,o.text,o.tokens),judgePhase:void 0}:o.stopped===!0||e.signal?.aborted===!0?Cp(n):(e.onWriterFailure?.(t.judgeModel),kp(n,o.errorMessage))},rO=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return hK(e);let n=pK(t),o=await gK({cycle:t,revision:r,runner:n,signal:e.signal,onWriterFailure:e.onWriterFailure});if(o===null)return t;if(!o.ok)return o.cycle;let s=r.run===void 0?uK(t,o.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===x){let p=await tO({cycle:s,run:o.run,promptText:r.promptText,reviewer:n,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...fK(s,p.text),judgePhase:void 0}}let i=await Xe({writerAgent:t.judgeModel,workingDirectory:ke(t),prompt:eb({goal:t.goal,lookedAt:o.run.lookedAt??"the writer reply",evidence:o.run.evidence??o.run.output,tokens:o.run.tokens,delayMs:o.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Cp(s):(e.onWriterFailure?.(t.judgeModel),kp(s,i.errorMessage));let a=await tO({cycle:s,run:o.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Da(s,i.text,c);return Lp(d,a.text)}});var Tp,qb=l(()=>{"use strict";C();Tp=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t?.judgement?.score,n=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||n.length===0?null:Aa({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:n},priorRounds:wa(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null})),e.currentRound)})}});var xp,yK,SK,Kb,oO=l(()=>{"use strict";C();Ep();nO();qb();Me();Ye();ja();xp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),yK=e=>({...e,status:"stopped",errorMessage:En,updatedAt:new Date().toISOString()}),SK=(e,t,r,n,o)=>t.ok?null:t.stopped===!0||n?.aborted===!0?yK(e):(o?.(r),xp(e,t.errorMessage)),Kb=async(e,t,r,n)=>{let o=e.revisions.find(c=>c.roundNumber===e.currentRound);if(o===void 0)return xp(e,"This round has no prompt.");if(e.status==="judging")return rO({cycle:e,revision:o,onWriterFailure:t,signal:r,onProgress:n});if(e.status!=="improving")return xp(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===x)return e;let s=Tp(e);if(s===null)return xp(e,"The improver needs the score and the reason.");let i=await Xe({writerAgent:e.improverModel,workingDirectory:ke(e),prompt:ha({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=SK(e,i,e.improverModel,r,t);return a!==null?a:vp(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var $a,Jb=l(()=>{"use strict";$a=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var Mp,Ip,sO,AK,bK,Op,iO,aO,PK,wK,lO,cO,dO,Yb=l(()=>{"use strict";C();Me();Ye();ja();oO();Jb();Mp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),Ip=(e,t,r)=>e.wizard===void 0||t===null?Mp(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},sO=e=>{let t=e.wizard;return t===void 0||$a(e).length===0?e:{...e,wizard:Uo({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},AK=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",bK=e=>{let t=e.wizard;if(t===void 0)return e;let r=La({revisions:e.revisions});if(r.rounds.length===0)return e;let n=t.modules[t.currentModuleIndex];return{...e,wizard:Uo({wizard:t,step:"optimize_modules",output:{moduleId:n?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Op=(e,t)=>({...e,status:"wizard_paused",errorMessage:e.errorMessage,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),iO=e=>e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null,aO=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let o=r.attempts.filter(s=>s.step===t).at(-1);return o===void 0?"":JSON.stringify(o.output)},PK=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=iO(e);if(o===null)return Mp(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??ka(n),i=Sb({goal:e.goal,sourcePrompt:s,avoid:n.avoidByStep.generalize,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:aO(e,"generalize")}),a=await Xe({writerAgent:o,prompt:i,workingDirectory:ke(e),signal:t});if(!a.ok)return r?.(o),Ip(e,"generalize",a.errorMessage);try{let c=Rb(a.text),d=Uo({wizard:{...n,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Ia(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return Op({...e,wizard:d},"generalize")}catch(c){return Ip(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},wK=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=iO(e);if(o===null)return Mp(e,"Choose a writer to suggest splits.");let s=Ca({wizard:n,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Pb({goal:e.goal,templatedPrompt:n.templatedPrompt,variables:n.variables,evaluatedPromptReference:s,avoid:n.avoidByStep.separate,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:aO(e,"separate")}),a=await Xe({writerAgent:o,prompt:i,workingDirectory:ke(e),signal:t});if(!a.ok)return r?.(o),Ip(e,"separate",a.errorMessage);try{let c=kb(a.text),d=Ab(c,n.variables),p=Uo({wizard:{...n,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return Op({...e,wizard:p},"separate")}catch(c){return Ip(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},lO=e=>{let t=e.wizard;if(t===void 0)return e;let r=ka(t),n=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:70,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:n}},cO=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let n=r.modules[t];if(n===void 0)return Mp(e,"This module is missing.");let o=Ln(r),s=Ta(n.prompt,o),i=e.runnerModel!==void 0&&e.runnerModel!==x?e.runnerModel:e.judgeModel!==x?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:70,maxRounds:1,errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},dO=async(e,t,r,n)=>{let o=e.wizard;if(o===void 0)return Kb(e,t,r,n);if(o.gate!==null||e.status==="wizard_paused")return e;if(o.phase==="generalize")return PK(e,r,t);if(o.phase==="separate"&&o.splitOptions.length===0)return wK(e,r,t);if(o.phase==="evaluate"||o.phase==="optimize_modules"){let s=await Kb(e,t,r,n);if(k(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&$a(s).length===0)return s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let p=Ae(s.revisions.map(b=>({roundNumber:b.roundNumber,promptText:b.promptText,score:b.judgement?.score??0,reasons:b.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0,g=Op({...s,wizard:{...s.wizard,evaluateSelectedRound:p}},i);return i==="evaluate"?sO(g):g}let a=Op(s,i),c=i==="optimize_modules"&&a.wizard!==void 0?(()=>{let d=vb({wizard:{...a.wizard,modules:a.wizard.modules.map((p,g)=>g===a.wizard.currentModuleIndex&&p.status==="running"?{...p,status:"paused"}:p)},moduleIndex:a.wizard.currentModuleIndex,revisions:a.revisions,cycleStatus:AK(s.status)});return{...a,wizard:d}})():a;return i==="evaluate"?sO(c):bK(c)}return s}return o.phase==="complete",e}});var Np,Ko,Xb=l(()=>{"use strict";Jb();Np=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ko=e=>{let t=$a(e.cycle),r=e.cycle.wizard,o=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=o!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Np(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let b=g.judgement?.score,h=b==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${b}`,y=g.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${Np(y)}</span>`;if(e.interactive){let S=e.selectedRound===g.roundNumber?" checked":"";return`<li><label><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${S}> ${Np(h)}</label>${u}</li>`}return`<li>${Np(h)}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var Zb,uO,jp,pO,Dp=l(()=>{"use strict";Zb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uO=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Zb(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Zb(t.prompt)}</pre></li>`).join("")}</ol>`,jp=e=>uO([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),pO=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(o=>o.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Zb(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${uO(t.modules.map(o=>({title:o.title,prompt:o.prompt})))}
  </section>`}});var ce,_K,vK,EK,LK,WK,RK,Jo,Hp=l(()=>{"use strict";C();Xb();Dp();ce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_K=e=>{let t=e.wizard;if(t===void 0)return null;let n=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(n===void 0||typeof n.output!="object"||n.output===null)return null;let o=n.output.revisions;if(!Array.isArray(o))return null;let s=[];for(let i of o){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},vK=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.variables.length===0?'<p class="muted">No variables yet.</p>':`<ul class="sdlc-wizard-vars">${t.variables.map(a=>`<li><strong>{{${ce(a.name)}}}</strong> \u2014 ${ce(a.description)} (sample: ${ce(a.sampleValue)})</li>`).join("")}</ul>`,n=t.templatedPrompt.trim(),o=n.length===0?'<p class="muted">No templated prompt yet.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${ce(n)}</pre>`,s=Ra(t.templatedPrompt,t.variables).trim(),i=s.length===0||s===n?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${ce(s)}</pre>`;return`${r}${o}${i}`},EK=(e,t)=>`<ul class="sdlc-wizard-revisions">${e.map(n=>{let o=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,s=t===n.roundNumber?" (selected)":"",i=n.reasons?.trim()??"",a=i.length===0?"":`<br><span class="muted">${ce(i)}</span>`;return`<li>${ce(o)}${s}${a}</li>`}).join("")}</ul>`,LK=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Ko({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let n=_K(e);if(n!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${EK(n,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Ca({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${ce(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${ce(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},WK=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let n=t.modules.map(o=>`<li><strong>${ce(o.title)}</strong> <span class="muted">(${ce(o.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${n}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(n=>{let o=n.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===n.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${ce(n.title)}</strong>${o}${ce(s)}<br><span class="muted">${ce(n.summary)} (${ce(n.topology)})</span>${jp(n)}</li>`}).join("")}</ul>`},RK=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((o,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${ce(i)}</span> <strong>${ce(o.title)}</strong>${ce(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${ce(o.prompt)}</pre></li>`}).join(""),n=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Ko({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${n}`},Jo=(e,t)=>{switch(t){case"wizard-1":return vK(e);case"wizard-2":return LK(e);case"wizard-3":return WK(e);case"wizard-4":return RK(e);default:return""}}});var kK,mO,gO,fO=l(()=>{"use strict";C();Tn();Hp();kK=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},mO=(e,t,r,n)=>{let o=ft(t);return{title:e,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:n,promptText:o===null?t:null,promptNote:o,bodyHtml:null}},gO=(e,t)=>{if(t.id.startsWith("wizard-")){let o=Jo(e,t.id);return{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:o.trim().length===0?null:o}}if(t.id==="end"){let o=Ae(e.revisions.map(s=>({roundNumber:s.roundNumber,promptText:s.promptText,score:s.judgement?.score??null,reasons:s.judgement?.reasons??null})));return o===null?{title:t.label,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:mO(t.label,o.promptText,o.score,o.reasons)}let r=t.id==="rewrite"?e.currentRound:kK(t.id),n=r===null?void 0:e.revisions.find(o=>o.roundNumber===r);return n===void 0?{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:mO(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail)}});var Fa,hO,yO=l(()=>{"use strict";Fa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hO=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?'<p class="muted">Not scored yet.</p>':`<p class="muted">${Fa(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,n=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Fa(e.feedback.trim())}</p>`,o=e.promptNote!==null?`<div class="alert-error">${Fa(e.promptNote)}</div>`:e.promptText===null?"":`<h2>Saved prompt</h2><pre class="mono">${Fa(e.promptText)}</pre>`;return`<h2>${Fa(e.title)}</h2>${t}${r}${n}${o}`}});var In,Yo,za=l(()=>{"use strict";In=e=>e.toLocaleString("en-US"),Yo=(e,t)=>e.revisions.reduce((r,n)=>t!==void 0&&n.roundNumber>t?r:r+(n.writerTokens??0)+(n.run?.tokens??0)+(n.judgement?.tokens??0),0)});var $p,CK,SO,AO,bO,PO,Qb=l(()=>{"use strict";C();fO();yO();za();$p=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),CK=(e,t)=>{let r=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',n=/^score-(\d+)$/.exec(e.id),o=e.state==="done"&&n!==null?Yo(t,Number(n[1])):0,s=o>0?`<span class="sdlc-node-reason">${In(o)} tokens so far</span>`:"",i=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${$p(e.detail)}</span>`:"",a=hO(gO(t,e)),c=t.wizard!==void 0&&t.wizard.phase==="complete"&&k(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${$p(e.id)}"`:"";return`<li class="sdlc-node sdlc-node-${e.state}"><button type="button" class="sdlc-node-open"${c} data-sdlc-node>${r}<span class="sdlc-node-label">${$p(e.label)}${i}${s}</span></button><template>${a}</template></li>`},SO=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>CK(r,t)).join("")}</ol>`,AO=e=>`<div class="sdlc-score" aria-label="What the score means">${lb(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${$p(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,bO='<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog"><button class="btn btn-secondary" type="submit">Close</button></form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>',PO=`<script>
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
</script>`});var kr,wO,TK,_O=l(()=>{"use strict";C();Ye();Tn();jb();kr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wO=e=>{if(!k(e.status))return"";let t=Ae(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,n=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",o=ft(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${kr(t.reasons.trim())}</p>`,i=o===null?TK({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ke(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${kr(o)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${n}${s}${i}</section>`},TK=e=>{let t=e.sourceSkill?.fileName??Ma(e.goal),r=e.sourceSkill?.name??t,n=e.sourceSkill?.description??e.goal,o=wp(t,r),s=o.length>0&&EI(e.workingDirectory,o),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${kr(o)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${kr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${kr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${kr(n)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${kr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${kr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var Fp,eP=l(()=>{"use strict";C();C();Me();Tn();Fp=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!k(e.status)){let t=e.judgeModel;return{title:`${be(t)} is suggesting module splits.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!k(e.status)){let t=e.judgeModel;return{title:`${be(t)} is generalizing your prompt.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===x?{title:`Score the prompt text for round ${e.currentRound+1}.`,detail:"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."}:e.judgePhase==="scoring"?{title:`${be(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"No folder run in step 2. This panel keeps updating, so the page is not stuck."}:{title:`${be(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"Wizard evaluate revises prompt wording before the runner executes in step 4."};if(e.status==="judging"&&e.judgeModel===x){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==x?{title:`${be(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"You score the changes after this run."}:{title:`Score the changes from round ${e.currentRound+1}.`,detail:t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt."}}if(e.status==="judging"&&e.judgePhase==="reviewing")return{title:`${be(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,detail:"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck."};if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,n=t.currentModuleIndex+1,o=t.modules.length;return{title:`${be(r)} is scoring module ${n} of ${o}.`,detail:`Step 4 runs one trial per module (pass \u2265 ${70}). This panel keeps updating.`}}return{title:`${be(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,detail:"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck."}}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,n=t.currentModuleIndex+1,o=t.modules.length;return{title:`${be(r)} is running module ${n} of ${o}.`,detail:`The runner executes the module prompt; the judge scores output (pass \u2265 ${70}). This panel keeps updating.`}}return{title:`${be(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck."}}if(e.status==="improving"&&e.improverModel===x){let t=e.revisions.find(n=>n.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return{title:"Rewrite the prompt.",detail:t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`}}if(e.status==="improving")return{title:`${be(e.improverModel)} is rewriting the prompt.`,detail:"That writer is working on this Mac. This panel keeps updating, so the page is not stuck."};if(e.status==="passed")return{title:"This prompt passed.",detail:""};if(e.status==="stopped"){let t=e.revisions.some(o=>ft(o.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let o=ge(e.wizard),s=o.totalModules>0&&(e.wizard.phase==="complete"||o.passedModuleCount>0||k(e.status));return{title:s&&o.totalModules>0?`Wizard finished \u2014 ${o.passedModuleCount}/${o.totalModules} modules passed`:"Wizard stopped before all steps finished",detail:r.length>0?r:s?"":"Progress from finished steps is kept."}}return{title:(e.errorMessage??"").startsWith("Finished")?"Finished.":"Stopped.",detail:r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept."}}return k(e.status)?{title:"This run stopped because a reply could not be used.",detail:""}:{title:"Working on this Mac.",detail:"This panel keeps updating."}}});var Ct,Ua=l(()=>{"use strict";Me();Ct=e=>{if(e.status==="improving"&&e.improverModel===x)return!0;if(e.status!=="judging"||e.judgeModel!==x)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===x}});var vO,EO=l(()=>{"use strict";vO=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Cr,xK,LO,WO=l(()=>{"use strict";C();Cr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xK=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Cr(r)}</p>`},LO=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Cr(e.cycleId)}">`,n=e.instructions?.trim()??"",o=n.length===0?"":`<p class="muted">Instructions</p><p>${Cr(n)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Cr(a)}.</p>`}<pre class="mono">${Cr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Wr(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Cr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${o}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Cr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${o}${xK(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Cr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Ba,IK,RO,kO=l(()=>{"use strict";C();Tn();Ba=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IK=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,n=ft(t.promptText),o=t.judgement?.reasons?`<p class="muted">${Ba(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Ba(i)}.</p>`}<pre class="mono">${Ba(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Wr(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=n===null?`<pre class="mono">${Ba(d)}</pre>`:`<div class="alert-error">${Ba(n)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${o}${a}${p}</article>`},RO=e=>e.revisions.map(t=>IK(e,t)).join("")});var CO,TO=l(()=>{"use strict";C();CO=e=>{if(k(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Tt,OK,tP,MK,NK,jK,DK,xO,IO,rP=l(()=>{"use strict";TO();Tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OK="Stop this run? Writers will stop and the best prompt is kept.",tP="End the wizard? Writers will stop and progress from finished steps is kept.",MK="Skip this module and pause at the step gate?",NK=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Tt(OK)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Tt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,jK=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Tt(tP)}"><input type="hidden" name="cycleId" value="${Tt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,DK=e=>{let t=Tt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Tt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Tt(MK)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Tt(tP)}">End wizard</button>
    </form>
  </div>`},xO=e=>{let t=CO(e);return t==="none"?"":t==="classic"?NK(e.id):t==="wizard_end_only"?jK(e.id):DK(e)},IO=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Tt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Tt(tP)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var OO,MO=l(()=>{"use strict";C();za();OO=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let n=r.variables.length;return r.templatedPrompt.trim().length>0?n>0?`Templated prompt \xB7 ${n} variable${n===1?"":"s"}`:"Templated prompt ready":n>0?`${n} variable${n===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let n=e.revisions.filter(o=>o.judgement!==null&&o.judgement!==void 0).length;if(n>0){let o=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return o===null?`${n} scored revision${n===1?"":"s"}`:`Best score ${o} \xB7 ${n} revision${n===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let n=r.modules.length>0?r.modules.length:r.splitOptions.length;return n>0?`${n} module${n===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let n=ge(r);if(n.terminalStatusSuggestion==="passed"&&n.passedModuleCount===n.totalModules){let o=n.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=n.rows.reduce((i,a)=>i+(a.tokens??0),0);return o===null||o.bestScore===null?`${In(s)} tokens total`:`Lowest: ${o.title} (${o.bestScore}) \xB7 ${In(s)} tokens`}return`${n.passedModuleCount}/${n.totalModules} passed \xB7 \u2265 ${70}`}return""}});var NO,HK,jO,DO=l(()=>{"use strict";C();MO();Hp();NO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HK=(e,t,r)=>{let n=Jo(e,t);if(n.trim().length===0)return"";let o=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=OO(e,t),i=`${NO(o)} <span class="muted sdlc-wizard-outcome-step-hint">${NO(s)}</span>`,a=t==="wizard-4"&&r.phase==="complete"?" open":"",c=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step" id="${c}"${a}><summary aria-controls="${c}-body">${i}</summary><div class="sdlc-wizard-outcome-step-body" id="${c}-body">${n}</div></details>`},jO=e=>{let t=e.wizard;if(t===void 0||!k(e.status))return"";let r=t.phase==="complete",o=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>HK(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${o}</div>`:o;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var HO,$O,FO=l(()=>{"use strict";HO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$O=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(n=>`<li class="sdlc-wizard-module-prompt"><strong>${HO(n.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${HO(n.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var nP,zO,oP=l(()=>{"use strict";C();nP=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,zO=e=>{if(nP(e))return"Passed";let t=e.statistics?.bestScore;return t!=null&&t<70?`Below pass (${t})`:e.status}});var UO,BO=l(()=>{"use strict";C();UO=e=>{if(e.terminalStatusSuggestion==="passed")return"";let t=e.rows.filter(r=>r.bestScore!==null&&r.bestScore<70).length;return t>0&&t===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${t} module${t===1?"":"s"} scored below ${70}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${70}.`}});var zp,GO,VO=l(()=>{"use strict";C();oP();oP();BO();zp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GO=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=ge(t),n=r.terminalStatusSuggestion==="passed"?"":UO(r),o=60,s=r.rows.map((a,c)=>{let d=t.modules[c],p=a.bestScore===null?"\u2014":`${a.bestScore} / \u2265${70}`,b=a.bestScore!==null&&a.bestScore>=o&&a.bestScore<70?' class="sdlc-score-near-pass"':"",h=d===void 0?a.status:zO(d),y=d!==void 0&&nP(d)?'<span aria-label="Passed">\u2713</span>':zp(h);return`<tr${b}><td>${zp(a.title)}</td><td>${zp(p)}</td><td>${a.tokens??"\u2014"}</td><td>${y}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${zp(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${s}</tbody></table></div>`}});var $K,qO,KO=l(()=>{"use strict";C();C();FO();VO();$K=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qO=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!k(e.status)||t.modules.length===0)return"";let r=GO(e),n=$O(e);if(r.length===0&&n.length===0)return"";let o=(e.revisions[0]?.promptText??"").trim(),s=ge(t),i=s.passedModuleCount<s.totalModules?" open":"";return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${o.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${$K(o)}</pre></details>`}${r}${n}</section>`}});var Yt,Ga=l(()=>{"use strict";Yt=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",n=r.length>0?r:"Untitled run";return n.length<=72?n:`${n.slice(0,71).trimEnd()}\u2026`}});var Tr,Up,sP=l(()=>{"use strict";C();Qb();_O();eP();Ua();EO();qb();WO();kO();rP();DO();KO();za();Ye();Ga();Tr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Up=e=>{let t=!k(e.status)&&e.status!=="wizard_paused"&&!Ct(e),r=Fp(e),n=SO(ub(vO(e)),e),o=k(e.status)?"":xO(e),s=jO(e),i=qO(e),a=wO(e),c=e.errorMessage===null?"":`<div class="alert-error">${Tr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?ge(e.wizard):null,b=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,h=!t&&e.wizard!==void 0&&k(e.status)&&(e.wizard.phase==="complete"||ge(e.wizard).passedModuleCount>0),y=h?b?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Tr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",S=r.detail.length===0&&u.length===0||r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Tr(r.detail)}${p}</p>`,A=e.revisions.find(Hr=>Hr.roundNumber===e.currentRound),f=e.status==="improving"?Tp(e):null,w=Yo(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),v=Ct(e)?LO({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:f?.promptText??A?.promptText??"",score:f?.score??A?.judgement?.score??null,reasons:f?.reasons??A?.judgement?.reasons??null,avoid:f?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:A?.run??null,minJudgeScore:_?1:0}):"",L=e.wizard!==void 0&&e.wizard.phase==="complete"&&k(e.status),R=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",T=e.wizard!==void 0&&!L?70:e.passScore,I=R?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${AO(T)}</div>`:"",D=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':k(e.status)?L&&g!==null&&!b?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",re=t?d:h?b?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',U=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Tr(Rt(ke(e)))}</li>`:"",w>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${In(w)} so far</li>`:""].filter(Hr=>Hr.length>0),q=U.length===0?"":`<ul class="sdlc-run-meta">${U.join("")}</ul>`,Dr=o.length===0?"":`<div class="sdlc-run-actions">${o}</div>`,H=L?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${n}</div>`,_e=L?"":I.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${H}</div>`:`<div class="sdlc-run-grid">${H}${I}</div>`,yt=RO(e),Bl=e.wizard!==void 0&&k(e.status)&&e.revisions.every(Hr=>Hr.roundNumber===0&&(Hr.judgement===void 0||Hr.judgement===null)),zF=yt.length===0||Bl?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${yt}</div></section>`,UF=`<p class="sdlc-run-goal" title="${Tr(e.goal.trim())}">${Tr(Yt(e.goal))}</p>`,BF=L?`${c}${i}${s}${v}${a}`:`${c}${_e}${v}${s}${a}`,GF='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',VF=L?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Tr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${GF}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${D}</div>${UF}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${re}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Tr(r.title)}</h2>${S}${u}${VF}</div></div>${q}${Dr}</header>${BF}</section>${zF}`}});var JO,On,Bp=l(()=>{"use strict";C();JO=e=>Wn.indexOf(e),On=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||k(e.status)?Wn.length:t.gate!==null?JO(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?JO(t.phase):null}});var YO,XO=l(()=>{"use strict";YO=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Mn,ZO,QO=l(()=>{"use strict";C();XO();Mn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ZO=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,n=Wa(t,r),o=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Mn(YO(n))}</pre></div>`:"",s=xa(e.modulePrompt);if(s.length===0)return o.length>0?`<div class="sdlc-wizard-module-params">${o}</div>`:"";let i=Ln(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=Ap(c),g=i[c]??"",b=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Mn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Mn(p)}">${Mn(b)}</label>
        ${h}
        <input class="input" type="text" id="${Mn(p)}" name="${Mn(p)}" value="${Mn(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${o}${a}</div>`}});var xt,eM,tM=l(()=>{"use strict";C();QO();Xb();Dp();rP();xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eM=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let n=r.gate,o=n==="generalize"?"Step 1 \u2014 Generalize":n==="evaluate"?"Step 2 \u2014 Evaluate":n==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=n==="generalize"?`<ul class="sdlc-wizard-vars">${r.variables.map(v=>`<li><strong>{{${xt(v.name)}}}</strong> \u2014 ${xt(v.description)} (sample: ${xt(v.sampleValue)})</li>`).join("")}</ul><pre class="sdlc-pre">${xt(r.templatedPrompt)}</pre>`:"",i=n==="evaluate"?Ko({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",c=n==="separate"?`${n==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(v=>{let L=v.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',R=v.recommended?' <span class="sdlc-badge">Recommended</span>':"",T=r.selectedSplitOptionId===v.id||r.selectedSplitOptionId===null&&v.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${xt(v.id)}" required${T}> <strong>${xt(v.title)}</strong>${L}${R}<br><span class="muted">${xt(v.summary)}</span></label>${jp(v)}</li>`}).join("")}</ul>`:"",d=r.modules[r.currentModuleIndex],g=n==="optimize_modules"&&d?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",b=d?.title??"Module",h=d?.prompt??"",y=d?.status==="pending",u=n==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${xt(b)}</p>${y?ZO({cycle:e,modulePrompt:h}):""}<p class="muted">Test run prompt preview: ${xt(Ta(h,Ln(r)))}</p>${d?.statistics===null||d?.statistics===void 0?"":`<p class="muted">Module stats: best ${d.statistics.bestScore??"\u2014"} / \u2265${70} (round ${d.statistics.bestRound??"\u2014"}).</p>`}${Ko({cycle:e,interactive:!1,caption:y?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${b}\u201D (runner + judge).`})}`:"",S=n==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":n==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":n==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":y?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",A=Wb(r),f=A===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${A}</p>`,w=t?.active===!0?" sdlc-wizard-gate-active":"",_=t?.active===!0?' id="prompt-optimizer-wizard-active-step"':"";return`<section class="card sdlc-wizard-gate${w}"${_}>
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
  </section>`}});var FK,rM,nM=l(()=>{"use strict";C();FK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rM=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||k(e.status))return"";if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>Suggesting module splits</h2>
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let r=t.currentModuleIndex,o=t.modules[r]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    <h2>Module ${r+1} of ${t.modules.length}: ${FK(o)}</h2>
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
  </section>`:""}});var zK,UK,BK,oM,sM=l(()=>{"use strict";C();Bp();tM();nM();Hp();zK={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},UK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BK=(e,t,r)=>`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${UK(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${Jo(e,t)}</div>
</details>`,oM=e=>{let t=e.wizard;if(t===void 0)return"";let r=On(e);if(r===null)return"";let n=Wn.slice(0,r).map((i,a)=>BK(e,`wizard-${a+1}`,zK[i])),o=t.gate!==null?eM(e,{active:!0}):rM(e),s=r>=Wn.length?"":o;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${n.join("")}${s}</div>`}});var Gp,iP=l(()=>{"use strict";sM();Dp();C();Gp=e=>{if(e===null||e.wizard!==void 0&&k(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=oM(e),r=pO(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var aP,iM,aM,Vp,lM,qp=l(()=>{"use strict";C();Je();aP=new Map,iM=e=>{let t=new AbortController;return aP.set(e,t),t.signal},aM=e=>{aP.delete(e)},Vp=e=>{aP.get(e)?.abort()},lM=(e,t)=>{let r=J(e,t);return r===null||r.wizard!==void 0?!1:(k(r.status)||(V(e,{...r,status:"stopped",errorMessage:En,updatedAt:new Date().toISOString()}),Vp(t)),!0)}});var Va,Kp,cM,lP,dM,uM,pM,mM,cP=l(()=>{"use strict";Va=m(require("node:fs")),Kp=m(require("node:path")),cM=e=>Kp.default.join(Kp.default.dirname(e),"prompt-optimizer-writer-ready.json"),lP=e=>{let t=cM(e);if(!Va.default.existsSync(t))return{};try{let r=JSON.parse(Va.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},dM=(e,t)=>{Va.default.mkdirSync(Kp.default.dirname(e),{recursive:!0}),Va.default.writeFileSync(cM(e),`${JSON.stringify(t,null,2)}
`)},uM=(e,t)=>lP(e)[t]?.message??null,pM=(e,t,r)=>{dM(e,{...lP(e),[t]:{message:r}})},mM=(e,t)=>{let r=lP(e);r[t]!==void 0&&dM(e,Object.fromEntries(Object.entries(r).filter(([n])=>n!==t)))}});var dP,Jp,Yp,gM,Ne,Nn=l(()=>{"use strict";C();Oa();Yb();Ua();qp();cP();Je();dP=new Set,Jp={atMs:0,ids:[]},Yp=async()=>{if(Date.now()-Jp.atMs<3e4)return Jp.ids;let e=await mt({commands:ae({})});return Jp.atMs=Date.now(),Jp.ids=e.installedWriterIds,e.installedWriterIds},gM=async(e,t,r)=>{let n=J(e,t);if(n===null||k(n.status)||n.status==="wizard_paused"||Ct(n)||r.aborted)return;let o=await dO(n,i=>{mM(e,i)},r,i=>{J(e,t)?.status==="stopped"||r.aborted||V(e,i)});J(e,t)?.status==="stopped"||r.aborted||(V(e,o),k(o.status)||await gM(e,t,r))},Ne=(e,t)=>{if(dP.has(t))return;let r=J(e,t);if(r===null||k(r.status)||r.status==="wizard_paused"||Ct(r))return;dP.add(t);let n=iM(t);gM(e,t,n).finally(()=>{dP.delete(t),aM(t)})}});var xr,qa=l(()=>{"use strict";sP();iP();Nn();xr=(e,t)=>(Ne(e,t.id),`${Up(t)}${Gp(t)}`)});var fM,hM,yM=l(()=>{"use strict";fM=(e,t)=>e.revisions.find(n=>n.roundNumber===t)?.judgement?.score??null,hM=e=>e!==null&&e>0});var Xp,SM,uP=l(()=>{"use strict";C();qp();Xp=e=>(Vp(e.id),{...e,status:"stopped",errorMessage:VA,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null,phase:"complete"},updatedAt:new Date().toISOString()}),SM=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;Vp(e.id);let r=t.currentModuleIndex,n=t.modules.map((o,s)=>s===r?{...o,status:"stopped"}:o);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:n,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var GK,AM,VK,bM,PM=l(()=>{"use strict";C();Yb();qa();Je();Nn();yM();uP();GK="Pick a revision scored above 0 before continuing to Separate.",AM=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),VK=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null})),bM=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",n=t.get("intent")??"";if(!n.startsWith("wizard-"))return!1;let o=t.get("cycleId")?.trim()??"",s=J(e.storePath,o);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=J(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(xr(e.storePath,d))};if(n==="wizard-stop-all"){let c=Xp(s);return V(e.storePath,c),a(o),!0}if(n==="wizard-skip-module"){let c=SM(s);return V(e.storePath,c),a(o),!0}if(n==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(o),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=fb(s.wizard,d,c);g=hb(g,d),g={...g,pendingStepInstructions:p};let b={...s,status:"judging",wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return V(e.storePath,b),Ne(e.storePath,o),a(o),!0}if(n==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(o),!0;if(c==="generalize"){let p=(s.errorMessage?.trim().length??0)>0?AM(s):lO({...s,wizard:{...s.wizard,gate:null}});return V(e.storePath,p),Ne(e.storePath,o),a(o),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=fM(s,p??-1);if(!hM(g)){let y={...s,errorMessage:GK,updatedAt:new Date().toISOString()};return V(e.storePath,y),a(o),!0}let b={...s.wizard,evaluateSelectedRound:p},h={...s,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...b,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()};return V(e.storePath,h),Ne(e.storePath,o),a(o),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0){let y=AM(s);return V(e.storePath,y),Ne(e.storePath,o),a(o),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(y=>y.id===p);if(g===void 0){let y={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return V(e.storePath,y),a(o),!0}let b=VK(g),h={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...s.wizard,gate:"optimize_modules",selectedSplitOptionId:p,selectedSplitTopology:g.topology,modules:b,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(s.wizard.parameterValues??{}).length>0?s.wizard.parameterValues??{}:Ia(s.wizard.variables)},updatedAt:new Date().toISOString()};return V(e.storePath,h),a(o),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(o),!0;let g=xb({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!g.ok){let u={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return V(e.storePath,u),a(o),!0}let b={...s.wizard,parameterValues:g.parameterValues};if(p.status==="pending"){let u=cO({...s,wizard:{...b,gate:null}},d);return V(e.storePath,u),Ne(e.storePath,o),a(o),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=ge(b),S={...s,status:u.terminalStatusSuggestion,wizard:{...b,gate:null,phase:"complete"},updatedAt:new Date().toISOString()};return V(e.storePath,S),a(o),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...b,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return V(e.storePath,y),a(o),!0}}return a(o),!0}});var qK,wM,KK,pP,JK,_M,vM=l(()=>{"use strict";Me();qp();uP();$b();Ep();Ua();Je();qK="Add a score from 0 to 100 and the reason for it.",wM="Add a score from 1 to 100 and the reason for it.",KK="Write the next prompt.",pP="This step is not waiting for you.",JK=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},_M=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=J(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(V(e.storePath,Xp(a)),{kind:"saved",cycleId:i}):lM(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",n=J(e.storePath,r);if(n===null||!Ct(n))return n===null?{kind:"missing"}:{kind:"invalid",cycle:n,errorMessage:pP};if(t==="manual-judge"){if(n.judgeModel!==x)return{kind:"invalid",cycle:n,errorMessage:pP};let i=JK(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=n.wizard!==void 0&&(n.wizard.phase==="evaluate"||n.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:n,errorMessage:c?wM:qK};if(c&&i===0)return{kind:"invalid",cycle:n,errorMessage:wM};let d=n.revisions.find(g=>g.roundNumber===n.currentRound)?.run?.tokenReview??"",p=Lp(Da(n,JSON.stringify({score:i,passed:i>=n.passScore,reasons:a})),d);return V(e.storePath,p),{kind:"saved",cycleId:n.id}}if(n.improverModel!==x)return{kind:"invalid",cycle:n,errorMessage:pP};let o=(e.posted.get("prompt")??"").trim();if(o.length===0)return{kind:"invalid",cycle:n,errorMessage:KK};let s=vp(n,o);return V(e.storePath,s),{kind:"saved",cycleId:n.id}}});var EM,LM=l(()=>{"use strict";EM=`<script>
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
</script>`});var WM,RM=l(()=>{"use strict";WM=`<script>
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
    form.addEventListener("submit", (event) => {
      const submitter = event.submitter;
      if (!(submitter instanceof HTMLButtonElement)) return;
      if (!submitter.hasAttribute("data-sdlc-run-wizard")) return;
      const reason = readRunBlockReason();
      if (composeStep !== COMPOSE_STEP_COUNT) {
        event.preventDefault();
        showComposeStep(COMPOSE_STEP_COUNT);
        paintComposeStepError(
          "Review the summary on step 4 before you run.",
        );
        return;
      }
      if (reason !== null) {
        event.preventDefault();
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
    });
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
</script>`});var IM,OM=l(()=>{"use strict";C();Ye();IM=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),n=t.wizard?.templatedPrompt.trim()??"",o=n.length>0?n:r?.promptText??e.prompt;return{goal:t.goal,prompt:o,folder:t.workingDirectory===void 0?e.folder:Rt(t.workingDirectory),passScore:String(t.passScore),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!k(t.status)}}});var MM,NM=l(()=>{"use strict";C();Bp();MM=e=>{if(e.wizard===void 0)return k(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=On(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(k(e.status)){if(e.wizard.phase==="complete"){let r=ge(e.wizard),n=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),o=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${o}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var jM,DM=l(()=>{"use strict";jM=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return"Just now";let o=Math.floor(n/60);if(o<60)return`${o} min ago`;let s=Math.floor(o/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Xt,YK,XK,HM,$M=l(()=>{"use strict";NM();DM();Ga();Xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YK=e=>e.wizard===void 0?"classic":"wizard",XK=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Xt(t)}">`,n=MM(e),o=jM(e.updatedAt),s=t!==null&&e.id===t,i=s?`${n.subtitle} \xB7 Shown above`:n.subtitle,a=o.length===0?i:`${i} \xB7 ${o}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Xt(n.badgeClass)}">${Xt(n.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Xt(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Xt(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${YK(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Xt(e.id)}">${Xt(Yt(e.goal))}</a><p class="muted">${Xt(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},HM=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>XK(a,t)).join(""),n=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,o=Math.min(e.length,20),s=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${n}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Xt(s)}</summary>${i}</details>`:i}});var mP,Zp,FM,ZK,QK,gP,zM,fP=l(()=>{"use strict";mP=m(require("node:fs")),Zp=m(require("node:path"));Ye();FM=/^[a-z0-9-]+$/,ZK=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},QK=(e,t)=>{if(!FM.test(t))return null;let r=e.replace(/^\uFEFF/,""),n=t,o="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=ZK(p[2]??"");p[1]==="name"&&g.length>0&&(n=g),p[1]==="description"&&(o=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:n,description:o,promptText:i}},gP=e=>{let t=Cn(e);if(!t.ok)return[];let r=Zp.default.resolve(t.path,".cursor","skills"),n=[];try{n=mP.default.readdirSync(r)}catch{return[]}return n.filter(o=>FM.test(o)).flatMap(o=>{let s=Zp.default.resolve(r,o,"SKILL.md");if(!s.startsWith(`${r}${Zp.default.sep}`))return[];try{let i=QK(mP.default.readFileSync(s,"utf8"),o);return i===null?[]:[i]}catch{return[]}}).toSorted((o,s)=>o.fileName.localeCompare(s.fileName))},zM=(e,t)=>gP(e).find(r=>r.fileName===t)??null});var UM,BM=l(()=>{"use strict";UM={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Pass score",practice:"The run passes at this score. 90 is the usual bar. Lower it when a useful prompt is enough.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var Ka,e8,t8,Be,Ja=l(()=>{"use strict";BM();Ka=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e8='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>',t8=e=>{let t=UM[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Ka(t.title)}" aria-describedby="${r}" aria-expanded="false">${e8}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Ka(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Ka(t.example)}</span></span></button>`},Be=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Ka(r)}"`}>${Ka(e)}</span>${t8(t)}</span>`});var GM,r8,VM,qM,KM=l(()=>{"use strict";Ja();GM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),r8=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),VM=e=>{if(e.length===0)return`<div class="field">${Be("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${GM(r.fileName)}">${GM(r.fileName)}</option>`).join("");return`<div class="field">${Be("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${r8(e)}</script>`},qM=`<script>
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
</script>`});var Ce,JM,n8,YM,XM,ZM,QM=l(()=>{"use strict";C();eP();Me();Ga();Bp();Ce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JM=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",n8=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(n=>n.roundNumber===0)?.promptText??""},YM=e=>e===x?"You":be(e),XM=e=>{let t=n8(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":be(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ce(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ce(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ce(YM(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ce(YM(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ce(r)}</dd></div>
    </dl>
  </details>`},ZM=e=>{let t=e.wizard;if(t===void 0)return"";let r=Yt(e.goal),n=e.status==="wizard_paused",o=!k(e.status)&&e.status!=="wizard_paused";if(!n&&!o)return"";if(o){let d=Fp(e),p=t.gate===null?"":JM(t.gate),g=On(e),b=p.length===0?"":g===null||g>=4?` <strong>${Ce(p)}</strong>`:` <strong>${Ce(p)}</strong> (step ${g+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ce(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ce(d.title)}${b}</p>
    <p class="muted">${Ce(d.detail)}</p>
    <div class="actions">
      ${XM(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ce(e.id)}">Open this run</a>
    </div>
  </section>`}let s=JM(t.gate),i=On(e),a=i===null||i>=4?"":` (step ${i+1} of 4)`,c=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ce(r)}</h2>
    <p class="lede">Paused at <strong>${Ce(s)}</strong>${Ce(a)} (last updated ${Ce(c)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${XM(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ce(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Ya,eN,tN=l(()=>{"use strict";Ja();Ya=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eN=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(o=>`<option value="${Ya(o.id)}"${o.id===e.runner?" selected":""}>${Ya(o.label)}</option>`).join(""),n=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Ya(e.runner)}">Checking ${Ya(e.writers.find(o=>o.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Be("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${n}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Be("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Ya(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var rN,nN=l(()=>{"use strict";rN=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Xo,oN,sN,iN,aN,lN=l(()=>{"use strict";Ja();Xo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oN=(e,t,r,n,o)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=n.map(c=>`<option value="${Xo(c.id)}"${c.id===r?" selected":""}>${Xo(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Xo(o)}</option>`;return`<div class="field">${Be(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},sN=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let n=r.find(o=>o.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Xo(t)}">Checking ${Xo(n)}\u2026</p>`},iN=(e,t,r,n,o)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Be(t,o)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Xo(r)}</textarea><span class="muted">${n}</span></div></details>`,aN=e=>{let t=`<div class="sdlc-writer">${oN("judge","Judge",e.judge,e.writers,"I'll score it")}${sN("judge",e.judge,e.writers)}${iN("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${oN("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${sN("improver",e.improver,e.writers)}${iN("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var s8,jn,cN,dN=l(()=>{"use strict";Ua();sP();LM();RM();Qb();CM();xM();OM();$M();fP();KM();Ja();iP();QM();Ga();tN();nN();lN();C();s8=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,jn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cN=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${jn(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${jn(e.skillNotice??"")}</div>`,n=`${bO}${PO}`,o=e.resumableWizardCycle??null,s=o===null?"":ZM(o),i=Gp(e.cycle),a=e.cycle===null?"":Up(e.cycle),c=e.cycle!==null&&Ct(e.cycle),d=IM(e),p=s8(d.goal,d.prompt,e.canRun),g=aN({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),b=eN({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=mb,y=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",u=e.cycle!==null&&k(e.cycle.status),S=d.running&&!u,A=u||S?"":" open",f=S?" sdlc-compose-run-focus":"",_=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${u?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,v=u?(()=>{let U=e.cycle!==null?Yt(e.cycle.goal):Yt(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${jn(U)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${_}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${_}</summary>`,L=u?" sdlc-compose-viewing-finished":"",R=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",T=c?"waiting":d.running?"running":"idle",I=d.running&&!c?' aria-busy="true"':"",D=`<section class="card sdlc-compose${L}${f}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${A}>
        ${v}
        <div class="sdlc-compose-details-body">
      <p class="lede">${h} ${jn(e.modelNote)}</p>
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
            ${Be("Folder","folder")}
            <input class="input" type="text" name="folder" value="${jn(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${VM(gP(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${Be("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${jn(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Be("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${jn(d.prompt)}</textarea>
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
        ${b}
        ${rN()}
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
          <div class="sdlc-submit">
          <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${T}" data-can-run="${p?"true":"false"}"${I}${d.running?" disabled":""}>${R}</button>
          </div>
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
          </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,re=`${""}${EM}${WM}${TM}${qM}${kM}`;return`${t}${r}${D}${s}${a}${i}${n}${HM(e.history,e.cycle?.id??null)}${re}`}});var Xa,hP=l(()=>{"use strict";dN();Xa=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:cN(t)}))}});var uN,pN=l(()=>{"use strict";vM();qa();hP();Je();Nn();uN=async(e,t,r)=>{let n=t===null?{kind:"ignored"}:_M({posted:t,storePath:e.storePath});if(n.kind==="ignored")return!1;if(n.kind==="saved"){let o=J(e.storePath,n.cycleId);return Ne(e.storePath,n.cycleId),t?.get("liveFragment")==="1"&&o!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":o.id}),e.response.end(xr(e.storePath,o)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(n.cycleId)}`}),e.response.end(),!0)}return n.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Xa(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:n.cycle.judgeModel,improver:n.cycle.improverModel,folder:"~",passScore:String(n.cycle.passScore),maxRounds:String(n.cycle.maxRounds),canRun:r.canRun,errorMessage:n.errorMessage,skillNotice:null,cycle:n.cycle,history:Wt(e.storePath),resumableWizardCycle:null}),!0)}});var mN,Qp,yP=l(()=>{"use strict";mN=m(require("node:os"));C();Qp=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??mN.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??90,maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var gN,Zo,SP,fN,hN,Za=l(()=>{"use strict";C();Me();BA();gN=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Zo=e=>{let t=TI(e),r=xn(e).map(s=>({id:s,label:_p[s]})),n=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,o=t?.judge??"";return{note:n,canRun:!0,models:t,writers:r,judge:o,improver:t?.improver??o,runner:o}},SP=(e,t,r)=>t===x||t!==null&&e.writers.some(n=>n.id===t)?t:r,fN=(e,t,r,n=null)=>({judge:SP(e,t,e.judge),improver:SP(e,r,e.improver),runner:SP(e,n,e.runner)}),hN=e=>e===sp?{goal:ip,prompt:ap}:{goal:"",prompt:""}});var em,AP=l(()=>{"use strict";C();Me();Ye();Za();em=e=>{let t=fN(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=String(70),n=String(5),o=e.posted?.get("judgeInstructions")?.trim()??"",s=e.posted?.get("improverInstructions")?.trim()??"",i=e.posted?.get("runnerInstructions")?.trim()??"",a=e.posted?.get("runner")??null,c=(u,S)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:u,passScore:r,maxRounds:n,errorMessage:S,judge:t.judge,improver:t.improver,judgeInstructions:o,improverInstructions:s,runner:t.runner,runnerInstructions:i});if(e.posted===null)return c(e.defaultFolder??kn,null);let d=e.posted.get("folder")??kn;if(e.posted.get("intent")==="choose-folder"){let u=e.pickFolder();return c(u===null?d:Rt(u),null)}if((e.posted.get("intent")??"")!=="run")return c(d,null);let g=gN(e.goal,e.prompt);if(g!==null)return c(d,g);let b=xI(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(b===null)return c(d,"Choose a judge and an improver.");let h=Cn(d);if(!h.ok)return c(d,h.errorMessage);let y=II(e.installedIds,a,b.judge);return y===null?c(d,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:h.path,passScore:70,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:o,improverInstructions:s,runner:y,runnerInstructions:i}}});var Qo,rm,i8,bP,yN,tm,SN,a8,AN,PP,l8,c8,d8,wP,bN,PN,wN=l(()=>{"use strict";Qo=m(require("node:fs")),rm=m(require("node:path"));Me();Ye();i8=["remember","choose-folder","run"],bP=()=>({folder:kn,judge:"",improver:"",runner:""}),yN=e=>rm.default.join(rm.default.dirname(e),"prompt-optimizer-preferences.json"),tm=e=>typeof e=="string"?e:"",SN=e=>{let t=yN(e);if(!Qo.default.existsSync(t))return bP();try{let r=JSON.parse(Qo.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return bP();let n=r,o=tm(n.folder).trim();return{folder:o.length===0?kn:o,judge:tm(n.judge),improver:tm(n.improver),runner:tm(n.runner)}}catch{return bP()}},a8=(e,t)=>{let r=yN(e);Qo.default.mkdirSync(rm.default.dirname(e),{recursive:!0});let n=`${r}.tmp`;Qo.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`),Qo.default.renameSync(n,r)},AN=(e,t)=>e===x||xn(t).some(r=>r===e),PP=(e,t,r)=>e===null?t:e.length===0?"":AN(e,r)?e:t,l8=(e,t)=>{if(e===null)return t;let r=Cn(e);return r.ok?r.display:t},c8=e=>{let t=SN(e.storePath),r={folder:l8(e.folder,t.folder),judge:PP(e.judge,t.judge,e.installedIds),improver:PP(e.improver,t.improver,e.installedIds),runner:PP(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||a8(e.storePath,r)},d8=e=>{let t=Cn(e);return t.ok?t.display:kn},wP=(e,t)=>AN(e,t)?e:"",bN=e=>{let t=SN(e.storePath);return{selection:{...e.selection,judge:wP(t.judge,e.installedIds)||e.selection.judge,improver:wP(t.improver,e.installedIds)||e.selection.improver,runner:wP(t.runner,e.installedIds)||e.selection.runner},defaultFolder:d8(t.folder)}},PN=e=>{let t=e.posted.get("intent")??"";if(!i8.includes(t))return;let r=e.posted.get("folder");c8({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var _N,u8,p8,_P,m8,nm,om=l(()=>{"use strict";_N=m(require("node:os"));Me();cP();ja();u8="Reply with the single word ok. Do not use tools.",p8=45e3,_P=async(e,t)=>{if(t===x)return{ok:!0,message:"You will do this step."};let r=uM(e,t);if(r!==null)return{ok:!0,message:r};let n=await Xe({writerAgent:t,prompt:u8,workingDirectory:_N.default.tmpdir(),timeoutMs:p8});if(!n.ok)return{ok:!1,message:n.errorMessage};let o=`${be(t)} is ready.`;return pM(e,t,o),{ok:!0,message:o}},m8=e=>[...new Set(e.filter(t=>t.length>0))],nm=async(e,t,r,n)=>{for(let o of m8([t,r,n??""])){let s=await _P(e,o);if(!s.ok)return s.message}return null}});var vP,vN=l(()=>{"use strict";C();vP=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!k(r.status)&&!(t!==null&&r.id===t))return r;return null}});var EN,LN=l(()=>{"use strict";ut();C();qa();yP();AP();hP();Je();Ye();wN();fP();om();vN();Nn();EN=async e=>{let t=e.posted===null?bN({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=em({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>vr("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(PN({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Rt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let n=r.kind==="start"?await nm(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&n!==null){await Xa(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Rt(r.workingDirectory),passScore:String(r.passScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:n,skillNotice:e.skillNotice,cycle:null,history:Wt(e.route.storePath),resumableWizardCycle:vP(Wt(e.route.storePath),null)});return}if(r.kind==="start"){let s=zM(r.workingDirectory,r.sourceSkillFile),i=Qp({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,wizard:{...Ea(r.prompt),runnerInstructions:r.runnerInstructions},runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(V(e.route.storePath,i),Ne(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(xr(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let o=e.cycleId===null?null:J(e.route.storePath,e.cycleId);o!==null&&Ne(e.route.storePath,o.id),await Xa(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:o,history:Wt(e.route.storePath),resumableWizardCycle:vP(Wt(e.route.storePath),o?.id??null)})}});var WN,RN=l(()=>{"use strict";Je();WN=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";hI(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var kN,CN=l(()=>{"use strict";kN=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let n=r[1].replace(/^"|"$/g,""),o=new URLSearchParams,s=t.split(`--${n}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),o.append(a[1],d)}return o}return new URLSearchParams(t)}});var TN,xN=l(()=>{"use strict";kI();PM();pN();LN();RN();Za();CN();Nn();TN=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Yp(),n=Zo(r),o=e.method==="POST"?kN(e.request.headers["content-type"],await e.readBody(e.request)):null;if(bM({posted:o,storePath:e.storePath,response:e.response})||await uN(e,o,n))return;let s=hN(t.searchParams.get("example")),i=WN({posted:o,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=RI({posted:o,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await EN({route:e,posted:o,installedIds:r,selection:n,goal:o?.get("goal")??s.goal,prompt:o?.get("prompt")??s.prompt,skillNotice:WI(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var g8,IN,ON=l(()=>{"use strict";C();Je();g8=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",IN=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let n=J(e.storePath,r);if(n===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(n.wizard===void 0||!k(n.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let o=Lb({goal:n.goal,cycleStatus:n.status,wizard:n.wizard}),s=`prompt-optimizer-wizard-${g8(n.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(o),!0}});var MN,NN=l(()=>{"use strict";qa();Je();MN=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),n=r===null?null:J(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(n===null?"":xr(e.storePath,n)),!0}});var f8,jN,DN=l(()=>{"use strict";Me();om();f8=["claude-cli","codex","cursor","antigravity"],jN=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let n=t===x||f8.includes(t)?await _P(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(n)),!0}});var HN,$N=l(()=>{"use strict";C();HN=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:_a,page:va,context:zo,installedWriters:e,post:{method:"POST",url:_a,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${_a}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var EP,FN=l(()=>{"use strict";C();za();EP=e=>{let t=e.revisions[e.revisions.length-1]??null,r=Ae(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null}))),n=k(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:n,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:Yo(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:zo,page:`${va}?cycle=${encodeURIComponent(e.id)}`}}});var Te,h8,zN,UN,BN=l(()=>{"use strict";Te=m(Ws());C();h8=(0,Te.isType)({goal:Te.isString,prompt:Te.isString,workingDirectory:Te.isString,judge:(0,Te.isUndefinedOr)(Te.isString),improver:(0,Te.isUndefinedOr)(Te.isString),passScore:(0,Te.isUndefinedOr)(Te.isNumber),maxRounds:(0,Te.isUndefinedOr)(Te.isNumber)}),zN=e=>{let t=e?.trim()??"";return t.length===0?null:t},UN=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return h8(t)?t.workingDirectory.trim().length===0?{ok:!1,error:yp}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:zN(t.judge),improver:zN(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:yp}}});var y8,GN,VN=l(()=>{"use strict";C();Me();AP();Za();y8=e=>e.map(t=>t.id).join(", "),GN=e=>{let t=Zo(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,n=e.body.judge??r,o=e.body.improver??r;if(n===x||o===x)return{ok:!1,error:pb,installedWriters:t.writers};if(n===null||o===null){let a=y8(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:n,improver:o,runner:n}),i=em({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var qN,KN=l(()=>{"use strict";C();yP();$N();FN();Za();BN();VN();Je();qN=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=J(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:EP(c)}}let r=await e.handlers.readInstalledIds(),n=Zo(r);if(e.method==="GET")return{status:200,body:HN(n.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let o=UN(e.rawBody);if(!o.ok)return{status:400,body:{ok:!1,error:o.error,installedWriters:n.writers}};let s=GN({body:o.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:n.writers}};let a=Qp({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:Ea(s.prompt),runnerModel:s.runner});return V(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:EP(a)}}});var JN,YN=l(()=>{"use strict";Nn();om();KN();JN=async e=>{let t=await qN({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Yp,readWritersReady:nm,startCycle:Ne}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var S8,LP,XN=l(()=>{"use strict";Xx();xN();ON();NN();DN();YN();S8=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},LP=async e=>{let t=S8(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await JN(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Yx()})),!0):(await jN({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||IN({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||MN({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await TN(e),!0)}});var ZN=l(()=>{"use strict";XN()});var Dn,Qa,A8,b8,P8,w8,QN,ej=l(()=>{"use strict";Dn=m(require("node:fs")),Qa=m(require("node:path")),A8="prompt-optimizer-cycles.json",b8="prompt-optimizer-preferences.json",P8="prompt-sdlc-cycles.json",w8="prompt-sdlc-preferences.json",QN=e=>{let t=Qa.default.join(e,A8),r=Qa.default.join(e,P8);if(Dn.default.existsSync(t)||!Dn.default.existsSync(r))return t;try{Dn.default.renameSync(r,t)}catch{return r}let n=Qa.default.join(e,w8),o=Qa.default.join(e,b8);if(Dn.default.existsSync(n)&&!Dn.default.existsSync(o))try{Dn.default.renameSync(n,o)}catch{}return t}});var es,_8,WP,tj=l(()=>{"use strict";es=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_8=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],WP=e=>{let t=_8.map(i=>`<option value="${es(i.value)}">${es(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${es(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${es(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${es(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
    </section>`}});var el,oj,v8,sj,E8,L8,ij,im,rj,nj,W8,R8,Zt,tl,sm,k8,am,RP,C8,kP,aj,CP,lj,T8,x8,I8,cj,dj,uj,rl=l(()=>{"use strict";el=m(require("node:fs")),oj=m(require("node:path")),v8="estimate-history.ndjson",sj=100,E8=500,L8=2e4,ij=e=>oj.default.join(e,v8),im=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,E8),rj=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,L8),nj=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,W8=e=>({...e,estimateTokens:nj(e.estimateTokens),actualTokens:nj(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),R8=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Zt=e=>{let t=ij(e);return el.default.existsSync(t)?el.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let n=r.trim();if(n.length===0)return[];try{let o=JSON.parse(n);return R8(o)?[W8(o)]:[]}catch{return[]}}):[]},tl=(e,t)=>{el.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(n=>JSON.stringify(n)).join(`
`)}
`;el.default.writeFileSync(ij(e),r,"utf8")},sm=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),k8=e=>{let t=e.filter(n=>n.actualSeconds!==null&&n.estimateSeconds!==null&&n.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(n=>`| ${sm(n.task)} | ${sm(n.writerLabel)} | ${n.estimateSeconds} | ${n.actualSeconds} |`)].join(`
`)},am=e=>{let t=Zt(e.reportsDir),r=im(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:n?.actualSeconds??null,estimateTokens:n?.estimateTokens??null,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);tl(e.reportsDir,[...s,o])},RP=e=>{let t=Zt(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),n=new Date().toISOString(),o=e.task!==void 0?im(e.task):"",s={id:e.agentRunId,task:o.length>0?o:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:n,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);tl(e.reportsDir,[...i,s])},C8=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-sj),kP=e=>[...Zt(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),aj=e=>{let t=Zt(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),n=rj(e.input),o=rj(e.output),s=im(n),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:n.length>0?n:r?.input??"",output:o.length>0?o:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);tl(e.reportsDir,[...c,a])},CP=(e,t)=>{let r=Zt(e).find(n=>n.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},lj=e=>({table:k8(C8(Zt(e))),embedding:null}),T8=e=>{let t=new Map;for(let n of e){if(n.actualTokens===null)continue;let o=n.writerLabel.trim()||"Writer",s=t.get(o)??[];s.push(n.actualTokens),t.set(o,s)}let r=new Set;for(let[n,o]of t){let s=[...o].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${n}:${i}`)}return e.filter(n=>{let o=n.writerLabel.trim()||"Writer";return!r.has(`${o}:${n.actualTokens}`)})},x8=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-sj),I8=e=>{let t=T8(x8(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let n=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",n.join(". ")+(n.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${sm(s.task)} | ${sm(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},cj=e=>{let t=Zt(e.reportsDir),r=im(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:n?.writerLabel??"",estimateSeconds:n?.estimateSeconds??null,actualSeconds:n?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);tl(e.reportsDir,[...s,o])},dj=e=>{let t=Zt(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),n=new Date().toISOString(),o={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:r?.completedAt??n,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);tl(e.reportsDir,[...s,o])},uj=e=>I8(Zt(e))});var pj=l(()=>{"use strict";rl()});var Qt,TP,O8,xP,M8,N8,lm,cm,j8,IP,mj=l(()=>{"use strict";pj();Qt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),TP=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let n=Math.floor(t/60),o=t%60;return o===0?`${n} hr`:`${n} hr ${o} min`},O8=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${TP(-r)} under`:`${TP(r)} over`},xP=e=>e.toLocaleString("en-US"),M8=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${xP(-r)} under`:`${xP(r)} over`},N8=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},lm=e=>e===null?"\u2014":TP(e),cm=e=>e===null?"\u2014":xP(e),j8=`(function () {
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
})();`,IP=e=>{let r=kP(e.reportsDir).map((o,s)=>{let i=o.input.trim().length>0?o.input:o.task,a=o.output.trim().length>0?o.output:"\u2014",c=o.writerLabel.trim().length>0?o.writerLabel:"Writer",d=o.estimateSeconds===null||o.actualSeconds===null?"no estimate":O8(o.estimateSeconds,o.actualSeconds),p=o.estimateTokens===null||o.actualTokens===null?"no estimate":M8(o.estimateTokens,o.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${Qt(N8(i))}</button></td>
        <td>${Qt(c)}</td>
        <td>${lm(o.estimateSeconds)}</td>
        <td>${lm(o.actualSeconds)}</td>
        <td>${Qt(d)}</td>
        <td>${cm(o.estimateTokens)}</td>
        <td>${cm(o.actualTokens)}</td>
        <td>${Qt(p)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${Qt(c)}</p>
        <h2>Input</h2>
        <pre>${Qt(i)}</pre>
        <h2>Output</h2>
        <pre>${Qt(a)}</pre>
        <p>Time: estimated ${lm(o.estimateSeconds)} \xB7 actual ${lm(o.actualSeconds)} \xB7 ${Qt(d)}</p>
        <p>Tokens: estimated ${cm(o.estimateTokens)} \xB7 actual ${cm(o.actualTokens)} \xB7 ${Qt(p)}</p>
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
        <script>${j8}</script>`}
    </section>`}});var gj=l(()=>{"use strict";tj();mj()});var ts,D8,H8,OP,fj=l(()=>{"use strict";ts=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),D8=(e,t,r)=>{let n=ts(t),o=ts(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${n}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${o}</pre>
</article>`},H8=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${ts(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((n,o)=>D8(o,n.userPrompt,n.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${ts(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${ts(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${ts(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},OP=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(H8).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var hj=l(()=>{"use strict";fj()});var nl,yj,Sj,MP,NP,jP,Aj=l(()=>{"use strict";nl=m(require("node:fs")),yj=m(require("node:path"));ca();Qu();Sj=(e,t,r)=>jo({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,MP=(e,t,r)=>{let n=Sj(e,t,r);if(n===null)return[];if(!nl.default.existsSync(n))return[];let o=nl.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},NP=e=>{let t=Sj(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Jt(e.entry.prompt),output:Jt(e.entry.output)};nl.default.mkdirSync(yj.default.dirname(t),{recursive:!0}),nl.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},jP=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var $8,F8,ol,dm,DP=l(()=>{"use strict";$8=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),F8=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,ol=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let n=[],o=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=$8(i.assistantOutput),d=c.length>0?`Assistant: ${F8(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(o+p.length>r&&n.length>0)break;n.unshift(p),o+=p.length}}return n.join(`

`)},dm=e=>{let t=e.userMessage.trim(),r=ol({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var It,sl,FP,z8,U8,HP,B8,zP,um,bj,Pj,G8,rs,UP,$P,wj,V8,_j,ns,pm,il,q8,al,BP,mm,gm,vj=l(()=>{"use strict";It=m(require("node:fs")),sl=m(require("node:path")),FP=require("node:crypto");DP();z8="writer-sessions",U8="active-index.json",HP=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B8=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",zP=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},um=e=>{let t=sl.default.join(e.installDir,z8);return It.default.mkdirSync(t,{recursive:!0}),t},bj=e=>sl.default.join(um(e),U8),Pj=(e,t)=>sl.default.join(um(e),`${t}.canonical.json`),G8=(e,t)=>sl.default.join(um(e),`${t}.continuation.json`),rs=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,UP=e=>{let t=bj(e);if(!It.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(It.default.readFileSync(t,"utf8"));if(!HP(r)||!Array.isArray(r.entries))return{entries:[]};let n=[];for(let o of r.entries){if(!HP(o)||typeof o.sessionId!="string")continue;let s=typeof o.writerAgent=="string"?o.writerAgent:"";if(!B8(s))continue;let i=typeof o.projectFolderPath=="string"?o.projectFolderPath:(o.projectFolderPath===null,null);n.push({writerAgent:s,projectFolderPath:i,sessionId:o.sessionId})}return{entries:n}}catch{return{entries:[]}}},$P=(e,t)=>{It.default.writeFileSync(bj(e),JSON.stringify(t,null,2))},wj=(e,t)=>{It.default.writeFileSync(Pj(e,t.sessionId),JSON.stringify(t,null,2))},V8=(e,t)=>{It.default.writeFileSync(G8(e,t.sessionId),JSON.stringify(t,null,2))},_j=(e,t)=>{let r=ol({turns:t.turns});V8(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},ns=(e,t)=>{let r=Pj(e,t);if(!It.default.existsSync(r))return null;try{let n=JSON.parse(It.default.readFileSync(r,"utf8"));return!HP(n)||typeof n.sessionId!="string"?null:n}catch{return null}},pm=(e,t=20)=>{let r=um(e),n=It.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),o=[];for(let s of n){let i=s.name.replace(/\.canonical\.json$/,""),a=ns(e,i);a!==null&&o.push(a)}return o.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},il=(e,t,r)=>{let n=zP(r);return UP(e).entries.find(i=>rs(i)===rs({writerAgent:t,projectFolderPath:n}))?.sessionId??null},q8=(e,t,r,n)=>{let o=UP(e),s=rs({writerAgent:t,projectFolderPath:r}),i=[...o.entries.filter(a=>rs(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:n}];$P(e,{entries:i})},al=(e,t,r)=>{let n=(0,FP.randomUUID)(),o=new Date().toISOString(),s=zP(r),i={sessionId:n,writerAgent:t,projectFolderPath:s,turns:[],createdAt:o,updatedAt:o};return wj(e,i),_j(e,i),q8(e,t,s,n),n},BP=(e,t,r)=>{let n=il(e,t,r);return n!==null?n:al(e,t,r)},mm=(e,t,r)=>{let n=zP(r),o=UP(e);if(n===null&&r===void 0){$P(e,{entries:o.entries.filter(i=>i.writerAgent!==t)});return}let s=rs({writerAgent:t,projectFolderPath:n});$P(e,{entries:o.entries.filter(i=>rs(i)!==s)})},gm=e=>{let t=BP(e.layout,e.writerAgent,e.projectFolderPath),r=ns(e.layout,t);if(r===null)return;let n={id:(0,FP.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},o={...r,turns:[...r.turns,n],updatedAt:n.createdAt};wj(e.layout,o),_j(e.layout,o)}});var K8,J8,fm,GP,Ej=l(()=>{"use strict";K8=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",J8=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},fm=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",GP=e=>{let t=fm(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",n=K8(r,e.userPromptCharacterCount),o=J8({contextBudget:n,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:n,...o}}});var hm=l(()=>{"use strict";Aj();vj();DP();Ej()});var Lj=l(()=>{"use strict";ph()});var He,X8,Z8,VP,qP,KP,Wj=l(()=>{"use strict";le();Lj();He=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),X8=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},Z8=(e,t,r)=>{let n=e[t]?.apiKey;if(n!==void 0&&n.length>0){let o=Od(n);return`value="${He(o)}" placeholder="Paste a new key to replace"`}return`placeholder="${He(r)}"`},VP=(e,t,r,n,o)=>{let s=$h[t];return`<label class="field">
          <span class="field-label">${He(n)} API key \u2014 ${He(X8(e,t))} \xB7 <a class="field-link" href="${He(s.href)}" target="_blank" rel="noopener noreferrer">${He(s.label)}</a></span>
          <input class="input mono" type="password" name="${He(r)}" autocomplete="off" ${Z8(e,t,o)} />
        </label>`},qP=(e,t,r,n)=>{let o=mh(e[t]?.model),s=new Set(Ld[t].map(c=>c.value)),i=Ld[t].map(c=>{let d=c.value===o?" selected":"";return`<option value="${He(c.value)}"${d}>${He(c.label)}</option>`}).join(""),a=o!==sn&&!s.has(o)?`<option value="${He(o)}" selected>${He(o)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${He(n)}</span>
          <select class="input mono" name="${He(r)}">${i}${a}</select>
        </label>`},KP=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${He(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",n=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${VP(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${qP(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${VP(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${qP(e.secrets,"openai","openaiModel","OpenAI model")}
        ${VP(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${qP(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var Rj=l(()=>{"use strict";Wj()});var ym,kj,Cj=l(()=>{"use strict";ym=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kj=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${ym(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Console \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let n=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${ym(s.name)}</strong> <span class="muted mono">(${ym(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),o=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${ym(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${o}
      <ul class="harness-installed-set-list">${n}</ul>
    </section>`}});var Q8,Tj,xj,Ij=l(()=>{"use strict";Q8=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,Tj=e=>e.kind==="folder",xj=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let d=s.children.get(a);if(d!==void 0&&Tj(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=n=>{let o=[];for(let s of n.children.values()){if(Tj(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(Q8)};return r(t)}});var Oj,JP,Mj=l(()=>{"use strict";Oj=m(require("node:path")),JP=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${JP(r.children,t)}</ul>
            </details>
          </li>`;let n=Oj.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var Nj,Ir,e3,t3,ll,r3,YP,jj=l(()=>{"use strict";op();Nj=m(require("node:path"));Cj();Ij();Mj();Ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e3=()=>`(() => {
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

})();`,t3=()=>`(() => {
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
})();`,ll=e=>{let t=ga({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=kj({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),n=e.flashError?`<div class="alert-error">${Ir(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ir(e.flashMessage)}</div>`:"",o=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':r3(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
    <script>${e3()}</script>
    <script>${t3()}</script>`;return`${t}${r}${n}${c}${d}`},r3=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let d=xj(a.items.map(b=>({...b,relativePath:typeof b.relativePath=="string"&&b.relativePath.length>0?b.relativePath:Nj.default.relative(a.sourceRoot,b.sourcePath).replaceAll("\\","/")}))),p=JP(d,Ir),g=a.items.length;return`<div class="harness-set-block">
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
    </form>`},YP=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&o.set(d,p)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?o.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,b=t.sets[i];if(b===void 0)continue;let h=a.length>0?a:b.proposedSlug,y=g.length>0?g:b.proposedName,u=r.has(i),S=b.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:u}));s.push({slug:h,name:y,items:S})}return s}});var Dj=l(()=>{"use strict";jj()});var n3,XP,Hj=l(()=>{"use strict";_r();n3=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[De]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null||n.ok!==!0)return null;let o=n;return{counts:{harness:Number(o.counts?.harness??0),workflow:Number(o.counts?.workflow??0),agent:Number(o.counts?.agent??0)},items:Array.isArray(o.items)?o.items:[]}}catch{return null}},XP=n3});var o3,$j,Fj=l(()=>{"use strict";_r();o3=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[De]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let n=await r.json();return typeof n!="object"||n===null||n.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof n.promotedCount=="number"?n.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},$j=o3});var zj=l(()=>{"use strict"});var cl,s3,ZP,Uj=l(()=>{"use strict";op();cl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),s3=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,ZP=e=>{let t=e.flashError?`<div class="alert-error">${cl(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${cl(e.flashMessage)}</div>`:"",r=ga({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),n=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(o=>{let s=e.compositionCountsByProjectId?.[o.id],i=s!==void 0?`<span class="muted">${cl(s3(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(o.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(o.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
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
    </section>`}});var Bj=l(()=>{"use strict";zj();qy();Uj()});var Sm,Gj=l(()=>{"use strict";Sm=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var Vj,er,QP=l(()=>{"use strict";Vj=m(require("node:path"));Ut();bt();G();le();Ve();er=e=>{let t=F()?.layout.installDir??W();if(Vj.default.basename(t)===Br)return Ft;let r=F(),n=r!==null?We(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):Ft}});var ew,qj=l(()=>{"use strict";Ve();QP();ew=async e=>{let t=Le(e.installDir),r=t?.bundleVersion??null,n=er(t);try{let o=await uo(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Qr(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var tw,Kj=l(()=>{"use strict";tw=e=>!e});var rw,os,nw=l(()=>{"use strict";G();rw=()=>`http://127.0.0.1:${pf()}/update/run`,os=async e=>{try{let t=await fetch(rw(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var i3,Jj,ow,Yj=l(()=>{"use strict";G();te();nw();i3=()=>{Ht({launchAgentLabel:ne(),installDir:W()})},Jj=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},ow=async()=>{i3();let e=await os({force:!0});if(e.ok)return{ok:!0,message:Jj(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:Jj(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ve(),aW)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var sw=l(()=>{"use strict";jA();Gj();QP();qj();Kj();Yj();nw()});var Xj,Zj=l(()=>{"use strict";Xj=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var Qj,eD,iw,aw,tD=l(()=>{"use strict";Qj=require("node:crypto"),eD=m(require("node:fs"));ut();le();le();Zj();iw=!1,aw=async e=>{if(iw)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!Xj(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=F();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&eD.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,Qj.randomUUID)();iw=!0;try{if(await Dy(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await So({...r,workspace:o},e.writerAgent,t);return await Mi(n,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{iw=!1}}});var rD=l(()=>{"use strict";tD()});var Ze,a3,nD,oD,lw,cw,dw,uw,pw,mw,gw=l(()=>{"use strict";Ze=require("node:crypto"),a3=Buffer.from("302a300506032b6570032100","hex"),nD=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},oD=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Ze.createPublicKey)({key:Buffer.concat([a3,t]),format:"der",type:"spki"})},lw=()=>{let{publicKey:e,privateKey:t}=(0,Ze.generateKeyPairSync)("ed25519");return{publicKeyRaw:nD(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},cw=e=>(0,Ze.createPrivateKey)(e),dw=(e,t)=>(0,Ze.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),uw=(e,t,r)=>{try{let n=oD(e);return(0,Ze.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},pw=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,mw=()=>(0,Ze.randomBytes)(32).toString("base64url")});var tr,Am,sD,l3,c3,bm,fw,hw,iD=l(()=>{"use strict";tr=m(require("node:fs")),Am=m(require("node:path"));gw();G();bt();sD=e=>Am.default.join(e.installDir,ur),l3=(e,t)=>{if(e.profileEmail===null||t===sD(e)||tr.default.existsSync(t))return;let r=sD(e);tr.default.existsSync(r)&&(tr.default.mkdirSync(Am.default.dirname(t),{recursive:!0}),tr.default.renameSync(r,t))},c3=e=>{if(!tr.default.existsSync(e))return null;try{let t=tr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},bm=e=>{let t=ed(e);l3(e,t);let r=c3(t);if(r!==null)return r;let n=lw();return tr.default.mkdirSync(Am.default.dirname(t),{recursive:!0}),tr.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},fw=e=>{let t=bm(e.layout),r=mw(),n=pw({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=cw(t.privateKeyPem),s=dw(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},hw=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return uw(e.serverPublicKey,t,e.serverAttestation)}});var yw=l(()=>{"use strict";iD();gw()});var dD,dl,bw,Pw,aD,d3,Sw,Pm,se,uD,u3,Aw,p3,m3,ww,de,we,rr,g3,lD,cD,ul,pl,pD=l(()=>{"use strict";dD=m(require("node:http")),dl=m(require("node:fs")),bw=m(require("node:path"));wm();ia();ax();cx();fx();Ro();dA();OA();Vx();Kx();ZN();ej();gj();hj();hm();Rj();Dj();pn();ut();_r();Hj();Fj();Bj();sw();Ve();rD();le();yw();Pw=e=>ZS(e)??"never",aD=48e3,d3=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,Sw=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??lu(),reveal:t.reveal,installed:wr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Pm=async e=>{let t=F();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:vo(t,e)},se=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uD=200,u3=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Aw=e=>{let t=e.trim().slice(0,uD),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},p3=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${se(t)}</div>`,m3=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${se(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',ww={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},de=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...ww}),e.end(JSON.stringify(r))},we=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},rr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},g3=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=u3(e.healthBadge),n=e.status.wakeError?`<div class="alert-error">${se(e.status.wakeError)}</div>`:"",o=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=tw(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${se(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${se(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${se(Pw(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${se(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${s}
    </section>`},lD=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},cD=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,uD)},ul=e=>{let t=bw.default.join(e.layout.installDir,"link-code.txt"),r=()=>Le(e.layout.installDir),n=()=>{let h=r();return{installBundleVersion:Sm(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},o=async h=>{let y=h.installVersion??r(),u=await i(),S=FA(u),A=h.updateFlash??null,f=zA(A),w=p3(A,h.updateError??null);return HA({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:er(y),installBundleVersionLabel:Sm(y),prependBody:`${f}${w}${S}`,headerUpdateButtonHtml:$A(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await ew(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:Aw("An update is already running.")}),h.end();return}c=!0;try{let u=await ow(),S=u.ok?"/?update=ok":Aw(u.message);h.writeHead(303,{Location:S}),h.end()}catch(u){let S=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:Aw(S)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",S=n(),A=await o({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:S.installVersion,body:`<section class="card">
      <h1>${se(y)}</h1>
      <p>${se(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(A)},g=()=>{if(dl.default.existsSync(t))return dl.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return dl.default.writeFileSync(t,h,"utf8"),h},b=dD.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",S=h.method??"GET";if(S==="OPTIONS"){y.writeHead(204,ww),y.end();return}if(!await LP({method:S,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:QN(bw.default.dirname(e.layout.configPath)),readBody:rr,sendHtml:we,renderShell:o})){if(S==="GET"&&u==="/health"){let A=e.controllers.getStatus(),f=n();de(y,200,{ok:!0,...A,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/status"){let A=n();de(y,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/traffic"){de(y,200,{entries:oa(e.layout)});return}if(S==="DELETE"&&u==="/api/traffic"||S==="POST"&&u==="/api/traffic/clear"){if(tA(e.layout),S==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}de(y,200,{ok:!0});return}if(S==="GET"&&u==="/api/trace"){de(y,200,{entries:Ju(e.layout)});return}if(S==="DELETE"&&u==="/api/trace"||S==="POST"&&u==="/api/trace/clear"){if(oA(e.layout),S==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}de(y,200,{ok:!0});return}if(S==="POST"&&u==="/api/errors/clear"){sA(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(S==="GET"&&u==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let w=await Ho({layout:e.layout,query:f,limit:20});de(y,200,{chunks:w,query:f});return}de(y,200,{chunks:Do(e.layout).slice(-50).reverse()});return}if(S==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(S==="GET"&&u==="/api/update-status"){let A=await i();de(y,200,{ok:!0,...A});return}if((S==="GET"||S==="POST")&&u==="/api/update"){await d(y);return}if(S==="GET"&&u==="/"){let A=e.controllers.getStatus(),f=n(),w=wr(e.layout),_=Yu(e.layout.errorLogPath);we(y,await o({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:lD(h.url??void 0),updateError:cD(h.url??void 0),body:UA({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:Do(e.layout).length,trafficEntryCount:oa(e.layout).length,wakeError:A.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(S==="GET"&&u==="/task"){let A=e.controllers.getStatus(),f=n(),w=F(),_=new URL(h.url??"/",`http://127.0.0.1:${43347}`),v=_.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=_.searchParams.get("failed")==="1"?_.searchParams.get("error")?.trim()??"Task failed.":null,R=_.searchParams.get("runId");we(y,await o({title:"Task",activePath:"/task",installVersion:f.installVersion,body:WP({defaultWorkspace:w?.workspace??"",wsConnected:A.wsConnected,flashMessage:v,flashError:L,lastRunId:R})}));return}if(S==="POST"&&u==="/task/dispatch"){let A=await rr(h),f=new URLSearchParams(A),w=f.get("prompt")?.trim()??"",_=f.get("writerAgent")?.trim()??"claude-cli",v=f.get("projectFolder")?.trim()??"",L=await aw({prompt:w,writerAgent:_,...v.length>0?{projectFolderPath:v}:{}}),R=new URLSearchParams;L.ok?R.set("ok","1"):(R.set("failed","1"),L.errorMessage!==void 0&&R.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&R.set("runId",L.agentRunId),y.writeHead(303,{Location:`/task?${R.toString()}`}),y.end();return}if(S==="GET"&&u==="/writer-sessions"){let A=n(),f=pm(e.layout,12);we(y,await o({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:lD(h.url??void 0),updateError:cD(h.url??void 0),body:OP({sessions:f})}));return}if(S==="GET"&&u==="/errors"){let A=n(),f=Yu(e.layout.errorLogPath);we(y,await o({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:aA({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(S==="GET"&&u==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),w=ye(e.layout),_=w!==null?Oe(w,12e4):uA(f.lastHeartbeatAt,12e4),v=pA({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:_}),L=n();we(y,await o({title:"Status",activePath:"/status",installVersion:L.installVersion,body:`${g3({status:f,healthBadge:v,revived:A.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:L.installBundleVersion,installBundleUpdatedAt:L.installBundleUpdatedAt})}${fA({installDir:e.layout.installDir})}${gA({entries:Ju(e.layout)})}`}));return}if(S==="GET"&&u==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=oa(e.layout),w=n(),_=f.map(R=>`<tr><td title="${se(R.at)}">${se(Pw(R.at))}</td><td>${se(R.direction)}</td><td><code>${se(R.type)}</code></td><td>${se(R.summary)}</td><td>${se(R.action??"")}</td></tr>`).join(""),v=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${_}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',L=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";we(y,await o({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${L}
              ${v}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(S==="GET"&&u==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=n(),w=er(f.installVersion),_=await Pm(e.layout),v=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,L=F(),R=L===null?null:Z({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),T=R===null?{}:Object.fromEntries((await Promise.all(_.projects.map(async I=>{let D=await XP(R,I.id);return[I.id,D?.counts??null]}))).filter(I=>I[1]!==null));we(y,await o({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:ZP({projects:_.projects,compositionCountsByProjectId:T,cloudAppOrigin:w,syncMessage:_.message,syncOk:_.ok,flashMessage:null,flashError:v})}));return}if(S==="GET"&&u==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=F(),_=w===null?null:Z({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),v=f.length>0&&_!==null?vr():null;if(v===null||_===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Ue({projectFolderPath:v}),!await Hi(_,f,v)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(S==="GET"&&u==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=A.searchParams.get("id")?.trim()??"",w=n(),_=await Pm(e.layout),v=hn(_.projects,f);if(v===null){await p(y,"Project not found");return}let L=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,R=A.searchParams.get("knowledgePromoted"),T=R!==null?`Marked ${R} lesson(s) as promoted in Agent Witch.`:null,I=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,D=A.searchParams.get("tab")?.trim()??"harness",re=D==="workflows"||D==="agents"||D==="knowledge"?D:"harness",U=F(),q=U===null?null:Z({wsUrl:U.wsUrl,pairingToken:U.pairingToken}),Dr=q===null?null:await XP(q,v.id),H=0;if(q!==null)try{let _e=await fetch(`${q.appOrigin}/api/agent-witch/projects/${encodeURIComponent(v.id)}/knowledge`,{method:"GET",headers:{[De]:q.pairingToken},signal:AbortSignal.timeout(1e4)});if(_e.ok){let yt=await _e.json();typeof yt=="object"&&yt!==null&&typeof yt.candidateCount=="number"&&(H=yt.candidateCount)}}catch{H=0}we(y,await o({title:v.name,activePath:"/projects",installVersion:w.installVersion,body:Eo({project:v,installed:wr(e.layout),linkedSetSlugs:br(v.projectFolderPath),composition:Dr,knowledgeCandidateCount:H,activeTab:re,flashMessage:L??T,flashError:I})}));return}if(S==="POST"&&u==="/projects/pull-bound-harness"){let A=await rr(h),f=await Ky({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await p(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let w=n();we(y,await o({title:f.title,activePath:"/projects",installVersion:w.installVersion,body:f.body}));return}if(S==="POST"&&u==="/projects/link-harness"){let A=await rr(h),f=new URLSearchParams(A),w=f.get("projectId")?.trim()??"",_=await Pm(e.layout),v=hn(_.projects,w);if(v===null){await p(y,"Project not found");return}let L=f.getAll("applySet").map(U=>String(U)),R=Li({layout:e.layout,projectFolderPath:v.projectFolderPath,setSlugs:L});if(!R.ok){let U=n();we(y,await o({title:v.name,activePath:"/projects",installVersion:U.installVersion,body:Eo({project:v,installed:wr(e.layout),linkedSetSlugs:br(v.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:R.errorMessage})}));return}let T=F(),I=T===null?null:Z({wsUrl:T.wsUrl,pairingToken:T.pairingToken}),D=I===null?!1:await ji(I,v.id,R.appliedSetSlugs),re=new URLSearchParams({linked:"1",files:String(R.writtenFileCount),bindingsSynced:D?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${re.toString()}`}),y.end();return}if(S==="POST"&&u==="/project/knowledge/promote-all"){let A=await rr(h),w=new URLSearchParams(A).get("projectId")?.trim()??"",_=await Pm(e.layout),v=hn(_.projects,w);if(v===null){await p(y,"Project not found");return}let L=F(),R=L===null?null:Z({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),T=R===null?{ok:!1,promotedCount:0}:await $j(R,v.id),I=new URLSearchParams({tab:"knowledge",...T.ok?{knowledgePromoted:String(T.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${I.toString()}`}),y.end();return}if(S==="GET"&&u==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=n(),w=Ci(e.layout),_=A.searchParams.get("submitted")==="1",v=_?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,L=w?.scanRoots[0]??lu(),R=d3(e.layout,{reveal:w,importQuery:A.searchParams.get("import")==="1",justSubmitted:_}),T=er(f.installVersion);we(y,await o({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:ll(Sw(e.layout,{cloudAppOrigin:T,reveal:w,scanFolder:L,flashMessage:v,importSectionExpanded:R}))}));return}if(S==="POST"&&u==="/api/harness/pick-folder"){let A=vr();if(A===null){de(y,200,{cancelled:!0});return}de(y,200,{path:A});return}if(S==="GET"&&u==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=Ei(f);if(w===null){de(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=dl.default.readFileSync(w,"utf8"),v=_.length>aD?`${_.slice(0,aD)}
\u2026 (truncated)`:_;de(y,200,{content:v})}catch{de(y,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&u==="/api/harness/reveal/add-project"){let A=await rr(h),f="";try{let v=JSON.parse(A);typeof v=="object"&&v!==null&&typeof v.projectPath=="string"&&(f=v.projectPath.trim())}catch{de(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){de(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=Ci(e.layout),_=Ry({reveal:w,projectPath:f});if(_===null||_.sets.length===0){de(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}pu(e.layout,_),de(y,200,{ok:!0,setCount:_.sets.length});return}if(S==="GET"&&u==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){de(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...ww});let _=ky({scanRoot:f,response:y,shouldAbort:()=>w});pu(e.layout,_),y.end();return}if(S==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&u==="/harness/submit"){let A=Ci(e.layout);if(A===null){let T=n(),I=er(T.installVersion);we(y,await o({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:ll(Sw(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await rr(h),w=new URLSearchParams(f),_=YP(w,A),v=Ty({layout:e.layout,sets:_});if(!v.ok){let T=n(),I=er(T.installVersion);we(y,await o({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:ll(Sw(e.layout,{cloudAppOrigin:I,reveal:A,flashError:v.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}Iy(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${v.writtenItemCount??0}${R}`}),y.end();return}if(S==="GET"&&u==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=F()?.writerExecutionBackend??Re(void 0),_=he(e.layout.configPath),v=hr(_),L=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=n();we(y,await o({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:KP({writerExecutionBackend:w,secrets:v,flashMessage:L})}));return}if(S==="POST"&&u==="/writer-api"){let A=await rr(h),f=new URLSearchParams(A),w=f.get("writerExecutionBackend")?.trim()??"cli";Hh({configPath:e.layout.configPath,writerExecutionBackend:Re(w),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(S==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(S==="GET"&&u==="/history"){let A=n();we(y,await o({title:"History",activePath:"/history",installVersion:A.installVersion,body:IP({reportsDir:e.layout.reportsDir})}));return}if(S==="GET"&&u==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=n(),_=wA({layout:e.layout}),v=EA(_),L=f.length>0?await Ho({layout:e.layout,query:f,limit:20}):Do(e.layout).slice(-50).reverse(),R=L.map(I=>{let D=vA(_,I.id),re=D>0?` \xB7 used in ${D} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${se(I.createdAt)}">${se(Pw(I.createdAt))}${I.source?` \xB7 ${se(I.source)}`:""}${re}</div><pre>${se(I.text)}</pre></article>`}).join(""),T=v.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${v.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${se(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";we(y,await o({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${se(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${T}${R}${m3(f,L.length)}`}));return}S==="POST"&&await rr(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return b.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),b.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${zt}`)}),b},pl=e=>bm(e).publicKeyRaw});var wm=l(()=>{"use strict";GT();VT();pD()});var gD={};St(gD,{runAgentWitchExternalLiveCli:()=>h3});var _w,mD,f3,h3,fD=l(()=>{"use strict";_w=m(require("node:fs")),mD=m(require("node:path"));Ro();G();te();wm();te();f3=e=>{let t=mD.default.join(e,"link-code.txt");if(!_w.default.existsSync(t))return null;let r=_w.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},h3=()=>{Fe("agent-witch-live");let e=W(),t=M(),r=f3(e),n=pl(t);ul({layout:t,controllers:{getStatus:()=>{let o=ye(t);return{wsConnected:Ki(t,{socketOpen:!0}),lastHeartbeatAt:o?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:n}},reviveWebSocket:()=>{Jr(e)}}})}});var nr=E((E_e,SD)=>{"use strict";var hD=["nodebuffer","arraybuffer","fragments"],yD=typeof Blob<"u";yD&&hD.push("blob");SD.exports={BINARY_TYPES:hD,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:yD,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var ml=E((L_e,_m)=>{"use strict";var{EMPTY_BUFFER:y3}=nr(),vw=Buffer[Symbol.species];function S3(e,t){if(e.length===0)return y3;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new vw(r.buffer,r.byteOffset,n):r}function AD(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function bD(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function A3(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Ew(e){if(Ew.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new vw(e):ArrayBuffer.isView(e)?t=new vw(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Ew.readOnly=!1),t}_m.exports={concat:S3,mask:AD,toArrayBuffer:A3,toBuffer:Ew,unmask:bD};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");_m.exports.mask=function(t,r,n,o,s){s<48?AD(t,r,n,o,s):e.mask(t,r,n,o,s)},_m.exports.unmask=function(t,r){t.length<32?bD(t,r):e.unmask(t,r)}}catch{}});var _D=E((W_e,wD)=>{"use strict";var PD=Symbol("kDone"),Lw=Symbol("kRun"),Ww=class{constructor(t){this[PD]=()=>{this.pending--,this[Lw]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Lw]()}[Lw](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[PD])}}};wD.exports=Ww});var as=E((R_e,WD)=>{"use strict";var gl=require("zlib"),vD=ml(),b3=_D(),{kStatusCode:ED}=nr(),P3=Buffer[Symbol.species],w3=Buffer.from([0,0,255,255]),Em=Symbol("permessage-deflate"),or=Symbol("total-length"),ss=Symbol("callback"),Or=Symbol("buffers"),is=Symbol("error"),vm,Rw=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!vm){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;vm=new b3(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[ss];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){vm.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){vm.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?gl.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=gl.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Em]=this,this._inflate[or]=0,this._inflate[Or]=[],this._inflate.on("error",v3),this._inflate.on("data",LD)}this._inflate[ss]=n,this._inflate.write(t),r&&this._inflate.write(w3),this._inflate.flush(()=>{let s=this._inflate[is];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=vD.concat(this._inflate[Or],this._inflate[or]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[or]=0,this._inflate[Or]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?gl.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=gl.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[or]=0,this._deflate[Or]=[],this._deflate.on("data",_3)}this._deflate[ss]=n,this._deflate.write(t),this._deflate.flush(gl.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=vD.concat(this._deflate[Or],this._deflate[or]);r&&(s=new P3(s.buffer,s.byteOffset,s.length-4)),this._deflate[ss]=null,this._deflate[or]=0,this._deflate[Or]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};WD.exports=Rw;function _3(e){this[Or].push(e),this[or]+=e.length}function LD(e){if(this[or]+=e.length,this[Em]._maxPayload<1||this[or]<=this[Em]._maxPayload){this[Or].push(e);return}this[is]=new RangeError("Max payload size exceeded"),this[is].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[is][ED]=1009,this.removeListener("data",LD),this.reset()}function v3(e){if(this[Em]._inflate=null,this[is]){this[ss](this[is]);return}e[ED]=1007,this[ss](e)}});var ls=E((k_e,Lm)=>{"use strict";var{isUtf8:RD}=require("buffer"),{hasBlob:E3}=nr(),L3=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function W3(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function kw(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function R3(e){return E3&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Lm.exports={isBlob:R3,isValidStatusCode:W3,isValidUTF8:kw,tokenChars:L3};if(RD)Lm.exports.isValidUTF8=function(e){return e.length<24?kw(e):RD(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Lm.exports.isValidUTF8=function(t){return t.length<32?kw(t):e(t)}}catch{}});var Ow=E((C_e,MD)=>{"use strict";var{Writable:k3}=require("stream"),kD=as(),{BINARY_TYPES:C3,EMPTY_BUFFER:CD,kStatusCode:T3,kWebSocket:x3}=nr(),{concat:Cw,toArrayBuffer:I3,unmask:O3}=ml(),{isValidStatusCode:M3,isValidUTF8:TD}=ls(),Wm=Buffer[Symbol.species],Qe=0,xD=1,ID=2,OD=3,Tw=4,xw=5,Rm=6,Iw=class extends k3{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||C3[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[x3]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Qe}_write(t,r,n){if(this._opcode===8&&this._state==Qe)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Wm(n.buffer,n.byteOffset+t,n.length-t),new Wm(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new Wm(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Qe:this.getInfo(t);break;case xD:this.getPayloadLength16(t);break;case ID:this.getPayloadLength64(t);break;case OD:this.getMask();break;case Tw:this.getData(t);break;case xw:case Rm:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[kD.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=xD:this._payloadLength===127?this._state=ID:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=OD:this._state=Tw}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Tw}getData(t){let r=CD;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&O3(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=xw,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[kD.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Qe&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Qe;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=Cw(n,r):this._binaryType==="arraybuffer"?o=I3(Cw(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=Qe):(this._state=Rm,setImmediate(()=>{this.emit("message",o,!0),this._state=Qe,this.startLoop(t)}))}else{let o=Cw(n,r);if(!this._skipUTF8Validation&&!TD(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===xw||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=Qe):(this._state=Rm,setImmediate(()=>{this.emit("message",o,!1),this._state=Qe,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,CD),this.end();else{let n=t.readUInt16BE(0);if(!M3(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new Wm(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!TD(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=Qe;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Qe):(this._state=Rm,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Qe,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[T3]=o,i}};MD.exports=Iw});var jw=E((x_e,DD)=>{"use strict";var{Duplex:T_e}=require("stream"),{randomFillSync:N3}=require("crypto"),{types:{isUint8Array:j3}}=require("util"),ND=as(),{EMPTY_BUFFER:D3,kWebSocket:H3,NOOP:$3}=nr(),{isBlob:cs,isValidStatusCode:F3}=ls(),{mask:jD,toBuffer:Hn}=ml(),et=Symbol("kByteLength"),z3=Buffer.alloc(4),km=8*1024,$n,ds=km,ht=0,U3=1,B3=2,Mw=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=ht,this.onerror=$3,this[H3]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||z3,r.generateMask?r.generateMask(n):(ds===km&&($n===void 0&&($n=Buffer.alloc(km)),N3($n,0,km),ds=0),n[0]=$n[ds++],n[1]=$n[ds++],n[2]=$n[ds++],n[3]=$n[ds++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[et]!==void 0?a=r[et]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(o?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=n[0],d[s-3]=n[1],d[s-2]=n[2],d[s-1]=n[3],i?[d,t]:o?(jD(t,n,d,s,a),[d]):(jD(t,n,t,0,a),[d,t])):[d,t]}close(t,r,n,o){let s;if(t===void 0)s=D3;else{if(typeof t!="number"||!F3(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(j3(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[et]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==ht?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):cs(t)?(o=t.size,s=!1):(t=Hn(t),o=t.length,s=Hn.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[et]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};cs(t)?this._state!==ht?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ht?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):cs(t)?(o=t.size,s=!1):(t=Hn(t),o=t.length,s=Hn.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[et]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};cs(t)?this._state!==ht?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ht?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[ND.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):cs(t)?(a=t.size,c=!1):(t=Hn(t),a=t.length,c=Hn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[et]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};cs(t)?this._state!==ht?this.enqueue([this.getBlobData,t,this._compress,d,n]):this.getBlobData(t,this._compress,d,n):this._state!==ht?this.enqueue([this.dispatch,t,this._compress,d,n]):this.dispatch(t,this._compress,d,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[et],this._state=B3,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(Nw,this,a,o);return}this._bufferedBytes-=n[et];let i=Hn(s);r?this.dispatch(i,r,n,o):(this._state=ht,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(G3,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[ND.extensionName];this._bufferedBytes+=n[et],this._state=U3,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");Nw(this,c,o);return}this._bufferedBytes-=n[et],this._state=ht,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===ht&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][et],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][et],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};DD.exports=Mw;function Nw(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function G3(e,t,r){Nw(e,t,r),e.onerror(t)}});var qD=E((I_e,VD)=>{"use strict";var{kForOnEventAttribute:fl,kListener:Dw}=nr(),HD=Symbol("kCode"),$D=Symbol("kData"),FD=Symbol("kError"),zD=Symbol("kMessage"),UD=Symbol("kReason"),us=Symbol("kTarget"),BD=Symbol("kType"),GD=Symbol("kWasClean"),sr=class{constructor(t){this[us]=null,this[BD]=t}get target(){return this[us]}get type(){return this[BD]}};Object.defineProperty(sr.prototype,"target",{enumerable:!0});Object.defineProperty(sr.prototype,"type",{enumerable:!0});var Fn=class extends sr{constructor(t,r={}){super(t),this[HD]=r.code===void 0?0:r.code,this[UD]=r.reason===void 0?"":r.reason,this[GD]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[HD]}get reason(){return this[UD]}get wasClean(){return this[GD]}};Object.defineProperty(Fn.prototype,"code",{enumerable:!0});Object.defineProperty(Fn.prototype,"reason",{enumerable:!0});Object.defineProperty(Fn.prototype,"wasClean",{enumerable:!0});var ps=class extends sr{constructor(t,r={}){super(t),this[FD]=r.error===void 0?null:r.error,this[zD]=r.message===void 0?"":r.message}get error(){return this[FD]}get message(){return this[zD]}};Object.defineProperty(ps.prototype,"error",{enumerable:!0});Object.defineProperty(ps.prototype,"message",{enumerable:!0});var hl=class extends sr{constructor(t,r={}){super(t),this[$D]=r.data===void 0?null:r.data}get data(){return this[$D]}};Object.defineProperty(hl.prototype,"data",{enumerable:!0});var V3={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[fl]&&o[Dw]===t&&!o[fl])return;let n;if(e==="message")n=function(s,i){let a=new hl("message",{data:i?s:s.toString()});a[us]=this,Cm(t,this,a)};else if(e==="close")n=function(s,i){let a=new Fn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[us]=this,Cm(t,this,a)};else if(e==="error")n=function(s){let i=new ps("error",{error:s,message:s.message});i[us]=this,Cm(t,this,i)};else if(e==="open")n=function(){let s=new sr("open");s[us]=this,Cm(t,this,s)};else return;n[fl]=!!r[fl],n[Dw]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[Dw]===t&&!r[fl]){this.removeListener(e,r);break}}};VD.exports={CloseEvent:Fn,ErrorEvent:ps,Event:sr,EventTarget:V3,MessageEvent:hl};function Cm(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Tm=E((O_e,KD)=>{"use strict";var{tokenChars:yl}=ls();function Ot(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function q3(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&yl[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);d===44?(Ot(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&yl[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),Ot(r,e.slice(c,p),!0),d===44&&(Ot(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(o){if(yl[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:n||(n=!0),o=!1}else if(s)if(yl[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&yl[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);n&&(h=h.replace(/\\/g,""),n=!1),Ot(r,a,h),d===44&&(Ot(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let b=e.slice(c,p);return i===void 0?Ot(t,b,r):(a===void 0?Ot(r,b,!0):n?Ot(r,a,b.replace(/\\/g,"")):Ot(r,a,b),Ot(t,i,r)),t}function K3(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}KD.exports={format:K3,parse:q3}});var Mm=E((j_e,iH)=>{"use strict";var J3=require("events"),Y3=require("https"),X3=require("http"),XD=require("net"),Z3=require("tls"),{randomBytes:Q3,createHash:e4}=require("crypto"),{Duplex:M_e,Readable:N_e}=require("stream"),{URL:Hw}=require("url"),Mr=as(),t4=Ow(),r4=jw(),{isBlob:n4}=ls(),{BINARY_TYPES:JD,CLOSE_TIMEOUT:o4,EMPTY_BUFFER:xm,GUID:s4,kForOnEventAttribute:$w,kListener:i4,kStatusCode:a4,kWebSocket:fe,NOOP:ZD}=nr(),{EventTarget:{addEventListener:l4,removeEventListener:c4}}=qD(),{format:d4,parse:u4}=Tm(),{toBuffer:p4}=ml(),QD=Symbol("kAborted"),Fw=[8,13],ir=["CONNECTING","OPEN","CLOSING","CLOSED"],m4=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Y=class e extends J3{constructor(t,r,n){super(),this._binaryType=JD[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=xm,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),eH(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){JD.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new t4({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new r4(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[fe]=this,s[fe]=this,t[fe]=this,o.on("conclude",h4),o.on("drain",y4),o.on("error",S4),o.on("message",A4),o.on("ping",b4),o.on("pong",P4),s.onerror=w4,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",nH),t.on("data",Om),t.on("end",oH),t.on("error",sH),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Mr.extensionName]&&this._extensions[Mr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ge(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),rH(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){zw(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||xm,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){zw(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||xm,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){zw(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Mr.extensionName]||(o.compress=!1),this._sender.send(t||xm,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ge(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Y,"CONNECTING",{enumerable:!0,value:ir.indexOf("CONNECTING")});Object.defineProperty(Y.prototype,"CONNECTING",{enumerable:!0,value:ir.indexOf("CONNECTING")});Object.defineProperty(Y,"OPEN",{enumerable:!0,value:ir.indexOf("OPEN")});Object.defineProperty(Y.prototype,"OPEN",{enumerable:!0,value:ir.indexOf("OPEN")});Object.defineProperty(Y,"CLOSING",{enumerable:!0,value:ir.indexOf("CLOSING")});Object.defineProperty(Y.prototype,"CLOSING",{enumerable:!0,value:ir.indexOf("CLOSING")});Object.defineProperty(Y,"CLOSED",{enumerable:!0,value:ir.indexOf("CLOSED")});Object.defineProperty(Y.prototype,"CLOSED",{enumerable:!0,value:ir.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Y.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Y.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[$w])return t[i4];return null},set(t){for(let r of this.listeners(e))if(r[$w]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[$w]:!0})}})});Y.prototype.addEventListener=l4;Y.prototype.removeEventListener=c4;iH.exports=Y;function eH(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:o4,protocolVersion:Fw[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!Fw.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${Fw.join(", ")})`);let s;if(t instanceof Hw)s=t;else try{s=new Hw(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Im(e,u);return}let d=i?443:80,p=Q3(16).toString("base64"),g=i?Y3.request:X3.request,b=new Set,h;if(o.createConnection=o.createConnection||(i?f4:g4),o.defaultPort=o.defaultPort||d,o.port=s.port||d,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(h=new Mr({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=d4({[Mr.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!m4.test(u)||b.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");b.add(u)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let u=o.path.split(":");o.socketPath=u[0],o.path=u[1]}let y;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let u=n&&n.headers;if(n={...n,headers:{}},u)for(let[S,A]of Object.entries(u))n.headers[S.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,u||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),y=e._req=g(o),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=g(o);o.timeout&&y.on("timeout",()=>{Ge(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[QD]||(y=e._req=null,Im(e,u))}),y.on("response",u=>{let S=u.headers.location,A=u.statusCode;if(S&&o.followRedirects&&A>=300&&A<400){if(++e._redirects>o.maxRedirects){Ge(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new Hw(S,t)}catch{let _=new SyntaxError(`Invalid URL: ${S}`);Im(e,_);return}eH(e,f,r,n)}else e.emit("unexpected-response",y,u)||Ge(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,S,A)=>{if(e.emit("upgrade",u),e.readyState!==Y.CONNECTING)return;y=e._req=null;let f=u.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){Ge(e,S,"Invalid Upgrade header");return}let w=e4("sha1").update(p+s4).digest("base64");if(u.headers["sec-websocket-accept"]!==w){Ge(e,S,"Invalid Sec-WebSocket-Accept header");return}let _=u.headers["sec-websocket-protocol"],v;if(_!==void 0?b.size?b.has(_)||(v="Server sent an invalid subprotocol"):v="Server sent a subprotocol but none was requested":b.size&&(v="Server sent no subprotocol"),v){Ge(e,S,v);return}_&&(e._protocol=_);let L=u.headers["sec-websocket-extensions"];if(L!==void 0){if(!h){Ge(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=u4(L)}catch{Ge(e,S,"Invalid Sec-WebSocket-Extensions header");return}let T=Object.keys(R);if(T.length!==1||T[0]!==Mr.extensionName){Ge(e,S,"Server indicated an extension that was not requested");return}try{h.accept(R[Mr.extensionName])}catch{Ge(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Mr.extensionName]=h}e.setSocket(S,A,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(y,e):y.end()}function Im(e,t){e._readyState=Y.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function g4(e){return e.path=e.socketPath,XD.connect(e)}function f4(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=XD.isIP(e.host)?"":e.host),Z3.connect(e)}function Ge(e,t,r){e._readyState=Y.CLOSING;let n=new Error(r);Error.captureStackTrace(n,Ge),t.setHeader?(t[QD]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Im,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function zw(e,t,r){if(t){let n=n4(t)?t.size:p4(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${ir[e.readyState]})`);process.nextTick(r,n)}}function h4(e,t){let r=this[fe];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[fe]!==void 0&&(r._socket.removeListener("data",Om),process.nextTick(tH,r._socket),e===1005?r.close():r.close(e,t))}function y4(){let e=this[fe];e.isPaused||e._socket.resume()}function S4(e){let t=this[fe];t._socket[fe]!==void 0&&(t._socket.removeListener("data",Om),process.nextTick(tH,t._socket),t.close(e[a4])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function YD(){this[fe].emitClose()}function A4(e,t){this[fe].emit("message",e,t)}function b4(e){let t=this[fe];t._autoPong&&t.pong(e,!this._isServer,ZD),t.emit("ping",e)}function P4(e){this[fe].emit("pong",e)}function tH(e){e.resume()}function w4(e){let t=this[fe];t.readyState!==Y.CLOSED&&(t.readyState===Y.OPEN&&(t._readyState=Y.CLOSING,rH(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function rH(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function nH(){let e=this[fe];if(this.removeListener("close",nH),this.removeListener("data",Om),this.removeListener("end",oH),e._readyState=Y.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[fe]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",YD),e._receiver.on("finish",YD))}function Om(e){this[fe]._receiver.write(e)||this.pause()}function oH(){let e=this[fe];e._readyState=Y.CLOSING,e._receiver.end(),this.end()}function sH(){let e=this[fe];this.removeListener("error",sH),this.on("error",ZD),e&&(e._readyState=Y.CLOSING,this.destroy())}});var dH=E((H_e,cH)=>{"use strict";var D_e=Mm(),{Duplex:_4}=require("stream");function aH(e){e.emit("close")}function v4(){!this.destroyed&&this._writableState.finished&&this.destroy()}function lH(e){this.removeListener("error",lH),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function E4(e,t){let r=!0,n=new _4({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(aH,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(aH,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",v4),n.on("error",lH),n}cH.exports=E4});var Uw=E(($_e,uH)=>{"use strict";var{tokenChars:L4}=ls();function W4(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&L4[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}uH.exports={parse:W4}});var SH=E((z_e,yH)=>{"use strict";var R4=require("events"),Nm=require("http"),{Duplex:F_e}=require("stream"),{createHash:k4}=require("crypto"),pH=Tm(),zn=as(),C4=Uw(),T4=Mm(),{CLOSE_TIMEOUT:x4,GUID:I4,kWebSocket:O4}=nr(),M4=/^[+/0-9A-Za-z]{22}==$/,mH=0,gH=1,hH=2,Bw=class extends R4{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:x4,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:T4,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Nm.createServer((n,o)=>{let s=Nm.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=N4(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=mH}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===hH){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Sl,this);return}if(t&&this.once("close",t),this._state!==gH)if(this._state=gH,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Sl,this):process.nextTick(Sl,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Sl(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",fH);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Un(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Un(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!M4.test(s)){Un(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Un(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Al(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=C4.parse(c)}catch{Un(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let b=new zn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=pH.parse(p);h[zn.extensionName]&&(b.accept(h[zn.extensionName]),g[zn.extensionName]=b)}catch{Un(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let b={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(b,(h,y,u,S)=>{if(!h)return Al(r,y||401,u,S);this.completeUpgrade(g,s,d,t,r,n,o)});return}if(!this.options.verifyClient(b))return Al(r,401)}this.completeUpgrade(g,s,d,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[O4])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>mH)return Al(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${k4("sha1").update(r+I4).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(n.size){let g=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[zn.extensionName]){let g=t[zn.extensionName].params,b=pH.format({[zn.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${b}`),p._extensions=t}this.emit("headers",d,o),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",fH),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Sl,this)})),a(p,o)}};yH.exports=Bw;function N4(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function Sl(e){e._state=hH,e.emit("close")}function fH(){this.destroy()}function Al(e,t,r,n){r=r||Nm.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Nm.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function Un(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,Un),e.emit("wsClientError",i,r,t)}else Al(r,n,o,s)}});var j4,D4,H4,$4,F4,z4,AH,U4,bl,bH=l(()=>{j4=m(dH(),1),D4=m(Tm(),1),H4=m(as(),1),$4=m(Ow(),1),F4=m(jw(),1),z4=m(Uw(),1),AH=m(Mm(),1),U4=m(SH(),1),bl=AH.default});var Gw,Vw,qw=l(()=>{"use strict";Gw="AGENT_WITCH_EXTERNAL_BRIDGE",Vw="AGENT_WITCH_EXTERNAL_LIVE"});var Kw,PH=l(()=>{"use strict";Kw=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var B4,Jw,wH=l(()=>{"use strict";qw();PH();B4=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",Jw=(e={})=>{let t=e.env??process.env,r=Kw(t[Gw]),n=Kw(t[Vw]);return{mode:B4(r,n),skipInProcessBridge:r,skipInProcessLive:n}}});var _H=l(()=>{"use strict";qw()});var vH=l(()=>{"use strict";wH();_H()});var Yw=l(()=>{"use strict"});var ar,Pl=l(()=>{"use strict";ar=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var ms,Bn,EH,V4,Xw,Zw,LH,WH,Qw,RH,wl,e_=l(()=>{"use strict";ms=m(require("node:fs")),Bn=m(require("node:os")),EH=m(require("node:path"));Yw();Pl();V4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Xw=(e=Bn.default.hostname())=>EH.default.join(Bn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),Zw=e=>{if(!ms.default.existsSync(e))return null;try{let t=JSON.parse(ms.default.readFileSync(e,"utf8"));return!V4(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},LH=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},WH=(e,t)=>{ms.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Qw=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Xw(),n=Zw(r);if(n!==null&&n.pid!==process.pid&&ar(n.pid)&&LH(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:Bn.default.hostname(),macOsUsername:Bn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return WH(r,o),{ok:!0}},RH=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Xw(),n=Zw(r);return n!==null&&n.pid!==process.pid&&ar(n.pid)&&LH(n)?{ok:!1}:(WH(r,{hostname:Bn.default.hostname(),macOsUsername:Bn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},wl=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Xw();Zw(r)?.pid===process.pid&&ms.default.existsSync(r)&&ms.default.unlinkSync(r)}});var t_,_l,q4,K4,J4,Y4,r_,kH=l(()=>{"use strict";t_=require("node:child_process"),_l=m(require("node:path"));Pl();dd();q4=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),K4=(e,t)=>{if(q4(e)||!/\bnode\b/.test(e))return!1;let r=_l.default.resolve(t),n=_l.default.join(r,"app",Hs),o=_l.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Hs||i==="agent-witch.ts")return e.includes(r);try{let a=_l.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},J4=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,t_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},Y4=(e,t,r)=>{let n=J4(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||K4(d,t)&&o.push(c)}return o},r_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,t_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=Y4(r,e.installDir,t),o=[];for(let s of n)if(ar(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var vl,El,CH,X4,n_,TH=l(()=>{"use strict";vl=m(require("node:fs")),El=m(require("node:path"));Ee();CH=(e,t)=>{!vl.default.existsSync(e)||vl.default.existsSync(t)||(vl.default.mkdirSync(El.default.dirname(t),{recursive:!0}),vl.default.renameSync(e,t))},X4=e=>{if(e.profileEmail===null)return;let t=El.default.join(e.installDir,rt);CH(El.default.join(t,Xn),e.mainLogPath),CH(El.default.join(t,Zn),e.errorLogPath)},n_=e=>{let t=M();e!==void 0&&t.installDir!==e||X4(t)}});var Z4,xH=l(()=>{"use strict";ta();qu();qu();Z4={};!it()&&Zr(Z4.url)&&(async()=>{Fe("agent-witch-wake-server");let e=await bn(),t=$t(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var IH=l(()=>{"use strict";xH()});var OH=l(()=>{"use strict";Fi()});var o_,MH=l(()=>{"use strict";Yw();IH();e_();OH();o_=async(e={})=>{let t=e.skipInProcessBridge?null:await Vu();Eu();let r=setInterval(()=>{Eu()},6e4),n=setInterval(()=>{if(!RH().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t?.close()}}}});var Ll,jm,t6,NH,jH,Dm,DH,HH,s_,$H,Hm,FH=l(()=>{"use strict";Ll=m(require("node:fs")),jm=m(require("node:path")),t6="pending-run-inputs.json",NH=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jH=e=>{let t=e.profileEmail?jm.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return jm.default.join(t,t6)},Dm=e=>{let t=jH(e);if(!Ll.default.existsSync(t))return{};try{let r=JSON.parse(Ll.default.readFileSync(t,"utf8"));return NH(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!NH(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},DH=(e,t)=>{let r=jH(e);Ll.default.mkdirSync(jm.default.dirname(r),{recursive:!0}),Ll.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},HH=e=>Object.values(Dm(e)),s_=(e,t)=>Dm(e)[t]!==void 0,$H=(e,t)=>{let r=Dm(e);r[t.agentRunId]=t,DH(e,r)},Hm=(e,t)=>{let r=Dm(e);delete r[t],DH(e,r)}});var $m=l(()=>{"use strict";le()});var zH=l(()=>{"use strict";le()});var Fm=l(()=>{"use strict";le()});var zm=l(()=>{"use strict";le()});var Wl=l(()=>{"use strict";le()});var r6,n6,Rl,i_=l(()=>{"use strict";lt();$m();zH();Fm();zm();Wl();r6={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},n6={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Rl=e=>{if(!ie(e.writerAgent))return"the selected writer";let t=ze(e.writerAgent);if(Re(e.writerExecutionBackend)==="api"&&t!==null){let r=je(he(e.configPath),t);if(r!==null&&r.apiKey.length>0){let n=ii(t,r.model);return`${n6[t]} model ${n}`}}return r6[e.writerAgent]}});var o6,s6,UH,BH,GH=l(()=>{"use strict";o6=/"input_tokens"\s*:\s*(\d+)/,s6=/"output_tokens"\s*:\s*(\d+)/,UH=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},BH=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=UH(o6.exec(t)),n=UH(s6.exec(t));if(r===null||n===null)return null;let o=r+n;return o>=1?o:null}});var Um=l(()=>{"use strict";ut()});var kl,Bm,i6,a_,VH,qH,KH,l_,JH=l(()=>{"use strict";kl=m(require("node:fs")),Bm=m(require("node:path"));Um();i6="run-completion-outbox.json",a_=e=>{let t=e.profileEmail?Bm.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Bm.default.join(t,i6)},VH=e=>{let t=a_(e);if(!kl.default.existsSync(t))return[];try{let r=JSON.parse(kl.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},qH=(e,t)=>{kl.default.mkdirSync(Bm.default.dirname(a_(e)),{recursive:!0}),kl.default.writeFileSync(a_(e),JSON.stringify(t,null,2),"utf8")},KH=(e,t)=>{let r=[...VH(e).filter(n=>n.runId!==t.runId),t];qH(e,r)},l_=async e=>{if(e.cloudApi===null)return;let t=VH(e.layout);if(t.length===0)return;let r=[];for(let n of t)await Mi(e.cloudApi,n.runId,n.exitCode,n.output,{estimateSeconds:n.estimateSeconds,actualSeconds:n.actualSeconds})||r.push(n);qH(e.layout,r)}});var YH=l(()=>{"use strict"});var c_,Cl,l6,Gn,XH=l(()=>{"use strict";YH();c_=new Map,Cl=e=>{let t=c_.get(e);t!==void 0&&(clearInterval(t),c_.delete(e))},l6=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},Gn=(e,t,r,n={})=>{Cl(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){Cl(t);return}let i=n.onTick?.()??{};l6(e,t,o,i)};s(),c_.set(t,setInterval(s,15e3))}});var ZH=l(()=>{"use strict";ut()});var QH,e$=l(()=>{"use strict";ZH();QH=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:qe(t)}});var d_,Tl,lr,u_,Mt,t$,Gm=l(()=>{"use strict";d_=new Set,Tl=new Map,lr=(e,t)=>{if(t.length===0)return;let r=Tl.get(e)??[];r.push(t),Tl.set(e,r)},u_=e=>{d_.add(e);let t=Tl.get(e)??[];return Tl.delete(e),t},Mt=e=>d_.has(e),t$=e=>{d_.delete(e),Tl.delete(e)}});var Vm,r$,c6,n$,o$=l(()=>{"use strict";Vm=m(require("node:path")),r$=require("node:url");ro();c6={},n$=()=>{if(it()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Vm.default.dirname(Vm.default.resolve(e))}return Vm.default.dirname((0,r$.fileURLToPath)(c6.url))}});var s$,i$,a$,l$,$e,gs,c$,d$,fs,p_,m_,g_,u$,f_,p$,qm=l(()=>{"use strict";s$=require("node:crypto"),i$=m(require("node:fs")),a$=m(require("node:path")),l$=require("node:url");Pl();ro();o$();$e=new Map,c$=async()=>{if(gs!==void 0)return gs;try{if(it()){let e=n$(),t=a$.default.join(e,"deps","node-pty","lib","index.js");if(i$.default.existsSync(t)){let r=await import((0,l$.pathToFileURL)(t).href);return gs=r,r}}return gs=await import("node-pty"),gs}catch{return gs=null,null}},d$=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},fs=(e,t,r)=>{let n=$e.get(e);if(n!==void 0){$e.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},p_=(e,t)=>{let r=$e.get(e);return r===void 0?!1:(r.pty.write(t),!0)},m_=(e,t,r)=>{let n=$e.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},g_=e=>{for(let t of $e.values())if(!(t.mode!=="agent"||t.runId!==e))return ar(t.pty.pid);return!1},u$=e=>{for(let[t,r]of $e.entries())if(!(r.mode!=="agent"||r.runId!==e)){$e.delete(t);try{r.pty.kill()}catch{}return!0}return!1},f_=async e=>{let t=await c$();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;$e.get(e.shellSessionId)!==void 0&&fs(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return $e.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{d$(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{$e.get(e.shellSessionId)?.pty===o&&($e.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},p$=async e=>{let t=e.shellSessionId??(0,s$.randomUUID)(),r=await c$();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return $e.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{d$(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{$e.get(t)?.pty===n&&($e.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var Km,m$,g$=l(()=>{"use strict";Km="[[AWAITING_INPUT]]",m$=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Km,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var xl,f$,Jm=l(()=>{"use strict";g$();xl=e=>{let t=e.indexOf(Km);if(t<0)return null;let n=e.slice(t+Km.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},f$=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",m$].join(`
`)});var h$,y$=l(()=>{"use strict";Gm();qm();Jm();h$=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(Mt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}lr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await p$({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=xl(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var S$,A$,b$,cr,Ym=l(()=>{"use strict";S$=require("node:child_process"),A$=m(require("node:fs")),b$=m(require("node:path"));dd();cr=(e,t)=>{let r=b$.default.join(e,"app",WL,"ensure-writer.sh");return A$.default.existsSync(r)?new Promise((n,o)=>{let s=(0,S$.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var P$,Vn,Ol,Xm,h_,Il,Zm,Qm,y_,S_,d6,hs,u6,p6,A_,b_=l(()=>{"use strict";P$=require("node:child_process");lt();Ym();Fm();$m();Wl();zm();Vn=new Map,Ol=e=>e==="cursor"||e==="antigravity",Xm=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",h_=e=>Vn.get(e)?.warmed===!0,Il=e=>{let t=Vn.get(e);Vn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Zm=e=>Vn.get(e)?.conversationStarted===!0,Qm=e=>{let t=Vn.get(e);Vn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},y_=e=>{Vn.delete(e)},S_=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",d6={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},hs=e=>`${d6[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,u6=(e,t,r,n)=>new Promise(o=>{let s=_d(t,r),i=[],a=(0,P$.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),n?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{o({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{o({exitCode:-1,output:d.message})})}),p6=(e,t)=>{let r=hs(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},A_=async e=>{if(!ie(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=ze(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let n=he(e.runConfig.layout.configPath);return je(n,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Il(e.writerAgent),{exitCode:0,output:hs(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await cr(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}Ol(e.writerAgent)&&Il(e.writerAgent);let t=await u6(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?p6(e.writerAgent,t.output):hs(e.writerAgent)}}});var qn,P_=l(()=>{"use strict";qn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var w$,m6,g6,_$,f6,w_,v$=l(()=>{"use strict";P_();w$=/you(?:'|')ve hit your session limit/i,m6=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],g6=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,_$=(e,t)=>{for(let r of e.split(/\r?\n/)){let n=r.trim();if(n.length>0&&t.test(n))return n}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},f6=e=>{let t=g6.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},w_=e=>{let t=e.trim();if(t.length===0)return null;if(w$.test(t))return{code:qn.SESSION_LIMIT,resetHint:f6(t),matchedLine:_$(t,w$)};for(let r of m6)if(r.test(t))return{code:qn.PROVIDER_QUOTA,resetHint:null,matchedLine:_$(t,r)};return null}});var eg,tg,__,v_=l(()=>{"use strict";eg="[[AGENT_RUN_WRITER_EXECUTION]]",tg="cli-writer-api-key-missing",__="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var E_=l(()=>{"use strict";v_()});var E$=l(()=>{"use strict";E_()});var rg=l(()=>{"use strict";P_();v$();v_();E_();E$()});var ng,L$=l(()=>{"use strict";ng={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var W$,R$=l(()=>{"use strict";W$="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var k$,C$=l(()=>{"use strict";rg();R$();k$=e=>e.code===qn.SESSION_LIMIT?W$:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var T$,x$=l(()=>{"use strict";rg();L$();C$();T$=e=>{let t=w_(e.output);return t!==null?{status:ng.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:k$(t)}:{status:e.exitCode===0?ng.COMPLETED:ng.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var L_,YEe,I$=l(()=>{"use strict";L_={OPEN:"open",APPROVAL:"approval"},YEe=L_.APPROVAL});var ys,og,O$,S6,M$,N$,j$,Ml,W_,R_=l(()=>{"use strict";ys=m(require("node:fs")),og=m(require("node:path")),O$="runs",S6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),M$=e=>{let t=e.profileEmail!==null?og.default.join(e.installDir,"profiles",e.profileEmail,O$):og.default.join(e.installDir,O$);return ys.default.mkdirSync(t,{recursive:!0}),t},N$=(e,t)=>og.default.join(M$(e),`${t}.json`),j$=(e,t)=>{ys.default.writeFileSync(N$(e,t.id),JSON.stringify(t,null,2))},Ml=(e,t)=>{let r=N$(e,t);if(!ys.default.existsSync(r))return null;try{let n=JSON.parse(ys.default.readFileSync(r,"utf8"));return!S6(n)||typeof n.id!="string"?null:n}catch{return null}},W_=e=>{let t=M$(e),r=ys.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=Ml(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var A6,D$,H$=l(()=>{"use strict";x$();I$();R_();A6=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",n=T$({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:n.status,dispatchPolicy:L_.OPEN,resultOutput:e.output,resultExitCode:n.resultExitCode,resultOutcomeCode:n.resultOutcomeCode,denialReason:n.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},D$=(e,t)=>{let r=A6(t);return j$(e,r),r}});var $$=l(()=>{"use strict";hm()});var F$,z$=l(()=>{"use strict";rg();F$=()=>[eg,`agentRunWriterExecutionBackend=${tg}`,`agentRunWriterExecutionReasonCode=${__}`].join(`
`)});var Nr,sg=l(()=>{"use strict";Nr=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var k_,b6,P6,U$,B$=l(()=>{"use strict";k_=e=>e.toLocaleString("en-US"),b6=e=>e<.01?e.toFixed(4):e.toFixed(3),P6=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${b6(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${k_(e.inputTokens)} in / ${k_(e.outputTokens)} out (${k_(e.totalTokens)} total)`,t].join(`
`)},U$=(e,t)=>{if(t===void 0)return e;let r=P6(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var G$=l(()=>{"use strict";le()});var q$,Nl,ue,C_,ig,V$,w6,_6,K$,J$,Y$,jl,T_,x_,I_,X$,v6,tt,Dl,jr,Z$,E6,L6,ag,O_,M_,N_,Q$=l(()=>{"use strict";q$=require("node:child_process");le();lt();FH();rl();i_();GH();vd();JH();Um();XH();Pl();e$();Gm();qm();Jm();y$();b_();H$();$$();z$();sg();B$();ao();G$();Wl();Bs();Jm();Nl=new Map,ue=new Map,C_=new Set,ig=new Map,V$=e=>{e!==void 0&&!ig.has(e)&&ig.set(e,Date.now())},w6=(e,t,r,n)=>{let o=n.endsWith(`
`)?n:`${n}
`;if(Mt(t)){tt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:o},requestId:r});return}lr(t,o)},_6=(e,t,r,n,o)=>{if(!Fh(e,o))return;let s=`${F$()}
`;w6(t,r,n,s);let i=ue.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},K$=130,J$=`

Stopped by user.`,Y$=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:Nr(e)},jl=null,T_=e=>{jl=e},x_=(e,t)=>{if(jl===null)return;let r=CP(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||Hy(jl,t,r)},I_=async e=>{await l_({layout:e,cloudApi:jl})},X$=e=>{let t=Nl.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:ar(t.pid)},v6=e=>ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),tt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Dl=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=to(s),c=ue.get(r);if(a!==null&&c!==void 0){let d=jL(a),p=X$(r)||g_(r);d!==null&&!p&&jr(e,t,r,n,d.exitCode,d.output,c.originalPrompt)}return NL(a)}}),jr=(e,t,r,n,o,s,i,a)=>{let c=fo(s,a),d=o,p=U$(c.output,c.llmUsage);if(r!==void 0){let b=ig.get(r);ig.delete(r),b!==void 0&&RP({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-b)/1e3))});let h=BH(c.llmUsage,p);h!==null&&dj({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&C_.has(r)&&(C_.delete(r),d=K$,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${J$}`:"Stopped by user.");let g=r!==void 0?CP(e.layout.reportsDir,r):null;if(r!==void 0){Cl(r),gi(e.layout,r),Mt(r)&&(tt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),t$(r));let b=ue.get(r);aj({reportsDir:e.layout.reportsDir,agentRunId:r,input:Nr(i),output:p,...b!==void 0?{writerLabel:Rl({writerAgent:b.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),b!==void 0&&gm({layout:e.layout,writerAgent:b.writerAgent,projectFolderPath:b.projectFolderPath,userPrompt:b.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),D$(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),KH(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),l_({layout:e.layout,cloudApi:jl}),ue.delete(r),Nl.delete(r),Hm(e.layout,r)}tt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:n}),Qs(e.layout)},Z$=(e,t,r,n,o,s,i)=>{let a=ue.get(r),c=a?.accumulatedOutput??s;$H(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),Gn(t,r,()=>s_(e.layout,r),Dl(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),tt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},E6=(e,t,r,n,o,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(o===void 0||h.length===0)){if(Mt(o)){tt(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:h},requestId:n});return}lr(o,h)}};if(o!==void 0){let h=ue.get(o);Nl.set(o,t),ue.set(o,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),tt(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),Gn(r,o,()=>X$(o),Dl(e,r,o,n,h?.projectFolderPath,h?.reportKey))}let g=a==="claude-cli",b=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(g?b.push(y):(c.push(y),p(y)),d||o===void 0)return;let u=xl(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let S=ue.get(o),A=[S?.accumulatedOutput??"",u.partialOutput].filter(f=>f.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=A),Nl.delete(o),Z$(e,r,o,n,u.question,A,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;Qm(a);let y=o!==void 0?ue.get(o):void 0,u=g?fo(b.join("")):{output:c.join("").trim(),llmUsage:void 0},S=g?c.join("").trim():"",A=[u.output.trim(),S].filter(w=>w.length>0).join(`
`);g&&u.output.trim().length>0&&p(u.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;jr(e,r,o,n,h??-1,f,s,u.llmUsage)}),t.on("error",h=>{d||jr(e,r,o,n,-1,h.message,s)})},L6=(e,t,r,n,o,s,i,a,c)=>{let d=Y$(r,c);s!==void 0&&(ue.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),tt(o,{type:"terminal.stream.start",payload:{runId:s},requestId:n}),Gn(o,s,()=>ue.has(s),Dl(e,o,s,n,i,a))),di(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Mt(s)){tt(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:n});return}lr(s,g)}}).then(g=>{Qm(t),jr(e,o,s,n,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let b=g instanceof Error?g.message:String(g);jr(e,o,s,n,-1,b,r)})},ag=(e,t,r,n,o,s,i,a,c,d,p,g)=>{let b=Y$(r,p);if(Zs(e.layout),an(e,t)){V$(s),L6(e,t,r,n,o,s,c,d,b);return}let h=_t(t,r,v6(e),i);if(h===null){jr(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}V$(s);let y=QH({workspace:e.workspace,projectFolderPath:c}),u=()=>{let S=(0,q$.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:g??process.env});E6(e,S,o,n,s,r,b,t)};if(s===void 0){u();return}ue.set(s,{originalPrompt:r,userTranscriptPrompt:b,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:ue.get(s)?.accumulatedOutput??""}),_6(e,o,s,n,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Us({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Gn(o,s,()=>ue.has(s),Dl(e,o,s,n,c,d)),h$({socket:o,sendMessage:tt,requestId:n,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:S=>{a!==void 0&&fs(a,w=>{tt(o,w)},n);let A=ue.get(s),f=[A?.accumulatedOutput??"",S.partialOutput].filter(w=>w.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),Z$(e,o,s,n,S.question,f,r)},onFinished:(S,A)=>{Qm(t);let f=fo(A),w=ue.get(s),_=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${f.output}`.trim():f.output;jr(e,o,s,n,S,_,r,f.llmUsage)}}).then(S=>{if(!S){u();return}Gn(o,s,()=>g_(s),Dl(e,o,s,n,c,d))}).catch(S=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",S instanceof Error?S.message:S),u()})},O_=(e,t,r,n)=>{Hm(e.layout,t.agentRunId),t.shellSessionId!==void 0&&tt(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=f$(t),s=ue.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;ag(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},M_=(e,t)=>{for(let r of HH(e.layout))ue.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:Nr(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Gn(t,r.agentRunId,()=>s_(e.layout,r.agentRunId),{awaitingInput:!0}),tt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},N_=(e,t,r,n)=>{let o=ue.get(r);if(o===void 0)return!1;C_.add(r),Cl(r);let s=Nl.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(u$(r))return!0;Hm(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${J$}`:"Stopped by user.";return jr(e,t,r,n,K$,i,o.originalPrompt),!0}});var W6,j_,eF=l(()=>{"use strict";Si();W6=()=>`http://127.0.0.1:${ct()}/restart`,j_=async()=>{try{let e=await fetch(W6(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var tF=l(()=>{"use strict";ia()});var rF=l(()=>{"use strict";sw()});var nF,oF=l(()=>{"use strict";nF=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Hl,R6,D_,sF=l(()=>{"use strict";G();te();tF();vS();rF();oF();ao();Hl=(e,t)=>{Er(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},R6=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(nh(),rh)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},D_=async e=>{let t=Le(e.layout.installDir)?.bundleVersion??null;if(!nF({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(at(e.layout)){ei({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Hl(e.layout,{summary:r,action:"install-bundle-update-start"}),Ht({launchAgentLabel:ne(e.layout.installDir),installDir:e.layout.installDir});let n=await os({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),Hl(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await R6();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Hl(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),Hl(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),Hl(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var k6,H_,iF=l(()=>{"use strict";k6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H_=e=>{if(!k6(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var $_,F_,aF=l(()=>{"use strict";oS();sS();$_=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=zi({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},F_=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Kt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var lF,C6,T6,x6,$l,cF=l(()=>{"use strict";lF=m(require("node:os"));Ee();C6="Default",T6=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),x6=e=>{let t=lF.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},$l=()=>{let e=M(),t=Qc(e),r=T6(C6);return`${x6(t)}/${r.length>0?r:"project"}`}});var dF=l(()=>{"use strict";ia()});var uF,z_,pF=l(()=>{"use strict";dF();uF=!1,z_=e=>{uF||(uF=!0,process.on("uncaughtException",t=>{wn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;wn(e,{kind:"crash",message:r,stack:n})}))}});var mF,I6,U_,gF=l(()=>{"use strict";mF=require("node:child_process");Ym();lt();Fm();$m();Wl();zm();I6=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,mF.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},U_=async e=>{if(!ie(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=ze(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let n=he(e.layout.configPath),o=je(n,r),s=o!==null&&o.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await cr(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await I6(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var B_,fF=l(()=>{"use strict";B_=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var hF,G_,yF=l(()=>{"use strict";hF=require("node:crypto"),G_=()=>(0,hF.randomUUID)()});var Ss,SF,lg=l(()=>{"use strict";Ss="[[WORKING_ESTIMATE]]",SF=(e,t,r,n="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Ss,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var AF,bF=l(()=>{"use strict";AF=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var O6,PF,wF=l(()=>{"use strict";lg();O6=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,PF=e=>{if(!e.includes(Ss))return null;let t=null;for(let r of e.matchAll(O6)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var M6,V_,_F=l(()=>{"use strict";wF();M6=/^(\d{1,6})\b/,V_=e=>{let t=PF(e);if(t!==null)return t;let r=M6.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return!Number.isFinite(n)||n<=0?null:n}});var N6,j6,D6,cg,q_=l(()=>{"use strict";lt();na();N6="http://127.0.0.1:11434",j6=45e3,D6=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},cg=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||N6,n=t===void 0?(await mt({commands:ae({})})).estimateModel:t;if(n===null||n.trim().length===0)return null;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:n,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(j6)});return o.ok?D6(await o.json()):null}catch{return null}}});var K_,J_,Y_,vF=l(()=>{"use strict";Bs();lg();sg();bF();_F();rl();q_();K_=async e=>{let t=Nr(e.wrappedPrompt),r=lj(e.reportsDir);return{estimateOutput:await cg(SF(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},J_=e=>{let t=V_(e.estimateOutput);t!==null&&am({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},Y_=e=>{let t=V_(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=AF(t);return zs({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Pt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),am({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var dg,EF,X_=l(()=>{"use strict";dg="[[WORKING_TOKEN_ESTIMATE]]",EF=(e,t,r,n="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",dg,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var LF,H6,WF,RF=l(()=>{"use strict";X_();LF=/^(\d{1,8})\b/,H6=e=>{let t=e.indexOf(dg);if(t<0)return null;let r=e.slice(t+dg.length).trim(),n=LF.exec(r);if(n===null)return null;let o=Number.parseInt(n[1]??"",10);return Number.isFinite(o)&&o>=1?o:null},WF=e=>{let t=H6(e);if(t!==null)return t;let r=LF.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return Number.isFinite(n)&&n>=1?n:null}});var Z_,Q_,kF=l(()=>{"use strict";X_();sg();RF();rl();q_();Z_=async e=>{let t=Nr(e.wrappedPrompt),r=uj(e.reportsDir);return{estimateOutput:await cg(EF(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},Q_=e=>{let t=WF(e.estimateOutput);return t===null?null:(cj({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var CF=l(()=>{"use strict";e_();kH();TH();MH();Si();Q$();Ym();lt();R_();Gm();eF();mS();sF();ao();iF();aF();Um();cF();pF();gF();ud();fF();yF();lg();Bs();vF();kF();i_();na();qm();b_()});var TF={};St(TF,{buildContinuationPromptWithContext:()=>z6});var $6,F6,z6,xF=l(()=>{"use strict";$6=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,F6=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),z6=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=F6(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${$6(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var IF={};St(IF,{readHarnessExportSets:()=>B6});var Fl,ev,ug,U6,B6,OF=l(()=>{"use strict";Fl=m(require("node:fs")),ev=m(require("node:path"));Ee();ug=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),U6=e=>{if(!Fl.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Fl.default.readFileSync(e.harnessManifestPath,"utf8"));if(ug(t))return t}catch{return null}return null},B6=(e,t)=>{let r=M(t),n=U6(r);if(n===null)return[];let o=ug(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!ug(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!ug(p))continue;let g=typeof p.path=="string"?p.path:void 0,b=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(g===void 0||b.length===0||h.length===0||y.length===0)continue;let u=g.startsWith("shared/")?ev.default.join(r.harnessRootDir,g):ev.default.join(r.harnessSetsDir,i,g);Fl.default.existsSync(u)&&d.push({id:b,kind:h,title:y,content:Fl.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var av,rv,As,MF,G6,NF,jF,tv,DF,nv,ov,sv,X,B,iv,V6,zl,q6,K6,J6,Y6,X6,Z6,Q6,eJ,Ul,HF=l(()=>{"use strict";av=require("node:child_process"),rv=m(require("node:fs")),As=m(require("node:os"));bH();G();te();Ro();yw();vH();le();Ve();ia();OA();wm();hm();ut();pn();MS();Ut();CF();MF=3e4,G6=3e4,NF=new Map,jF=new Map,tv=new Map,DF=new Map,nv=new Map,ov=new Map,sv=new Map,X=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B=(e,t,r)=>{e.readyState===bl.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Er(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Ku(r,"out",t)))},iv=e=>e,V6=e=>{if(!rv.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(rv.default.readFileSync(e.harnessManifestPath,"utf8"));if(X(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},zl=(e,t)=>{let r=V6(t);r!==null&&B(e,{type:"harness.manifest.report",payload:{hostname:As.default.hostname(),manifest:r}})},q6=async(e,t,r,n,o,s,i=!1,a,c,d,p,g)=>{let b=g?.trim()??"";if(!ie(t)){B(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let h=Rl({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await mt({commands:ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?K_({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,S=s!==void 0?Z_({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=Ol(t)&&!h_(t);if(A){try{await cr(e.layout.installDir,t)}catch(H){let _e=H instanceof Error?H.message:String(H);B(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_e}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Il(t)}else if(!Ol(t))try{await cr(e.layout.installDir,t)}catch(H){let _e=H instanceof Error?H.message:String(H);B(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_e}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let f=pi(d,$l,g);if(f===null){B(o,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Ue({projectFolderPath:f,...b.length>0?{projectId:b}:{}}),i||al(e.layout,t,f);let w=fm({sessionContinuation:i,supportsWriterSessionContinuation:Xm(t),isWriterConversationStarted:Zm(t)}),_=i&&w==="first"?il(e.layout,t,f):null,v=_!==null?ns(e.layout,_):null,L=v!==null&&v.turns.length>0,R=GP({sessionContinuation:i,supportsWriterSessionContinuation:Xm(t),isWriterConversationStarted:Zm(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:L,userPromptCharacterCount:r.length}),T=r;if(R.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?Ml(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:_e}=await Promise.resolve().then(()=>(xF(),TF));T=_e({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else R.continuationStrategy==="transcript_seed"&&v!==null&&v.turns.length>0&&(T=dm({priorTurns:v.turns,userMessage:r}));let I=R.ragLimit>0?await Ho({layout:e.layout,query:T,limit:R.ragLimit,minScore:R.ragMinScore,projectFolderPath:f,...b.length>0?{projectId:b}:{}}):[],D=R.ragLimit>0&&f.trim().length>0?await xA({layout:e.layout,query:T,limit:2,minScore:.32,projectFolderPath:f,...b.length>0?{projectId:b}:{}}):[],re=R.injectMemory?MP(e.layout,f,b.length>0?b:void 0):[],U=`${jP(re,R.memoryEntryLimit)}${kA(I)}${IA(D)}${T}`,q=p?.trim()??(s!==void 0&&f.trim().length>0?G_():void 0);if(s!==void 0&&q!==void 0&&q.length>0&&f.trim().length>0){Us({reportKey:q,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=U;u!==null&&u.then(_e=>{if(_e===null)return;let yt=Y_({estimateOutput:_e.estimateOutput??"",reportKey:q,agentRunId:s,reportsDir:e.layout.reportsDir,task:_e.task,writerLabel:_e.writerLabel,embedding:_e.embedding});if(yt.estimateSeconds===null)return;x_(e.layout.reportsDir,s);let Bl=`${Ss}
${yt.estimateSeconds}
`;if(Mt(s)){B(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Bl},requestId:n});return}lr(s,Bl)}).catch(()=>{}),U=B_(H),U=Rf(U,{agentRunId:s,reportKey:q,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then(H=>{H!==null&&J_({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&S!==null&&S.then(H=>{H!==null&&Q_({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let Dr=s!==void 0&&sv.get(s)===!0;if(s!==void 0&&f.trim().length>0){let H=await _u(f);ov.set(s,H),q!==void 0&&q.length>0&&nv.set(s,q)}ag(e,t,U,n,iv(o),s,{sessionTurn:R.sessionTurn},a,f,q,r,Mh(e.layout,s,Dr)),A&&s!==void 0&&B(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:S_(t)},requestId:n})},K6=async(e,t,r,n,o)=>{let s=(i,a)=>{B(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await A_({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,B(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:n})}}),c=ie(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?hs(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},J6=(e,t,r)=>new Promise(n=>{if(!ie(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=_t(t,r,ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,av.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),Y6=async(e,t,r,n)=>{if(t.installMethod!=="deterministic-bundle")return!1;B(n,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let o=Et(t.bundle),s=X(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(o!==null)return o;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=We(e.wsUrl)??Ft,g=await Py({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return B(n,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=un({bundle:i,layout:e.layout});return B(n,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&zl(n,e.layout),!0},X6=async(e,t,r,n)=>{if(await Y6(e,t,r,n))return;let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(B(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){B(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!ie(o)){B(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}Zs(e.layout);let i=await(async()=>{try{await cr(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return J6(e,o,s)})().finally(()=>{Qs(e.layout)});B(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),zl(n,e.layout)},Z6=e=>{let t=1e3*2**e;return Math.min(G6,t)},Q6=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(at(e.layout)){Jf(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,j_().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1})}},n=(u,S="system.ack")=>{if(!t.selfUpdateInFlight){if(at(e.layout)){ei({layout:e.layout,remoteBundleVersion:u,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,D_({layout:e.layout,remoteBundleVersion:u,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},o=()=>{let u=ye(e.layout);u!==null&&Oe(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===bl.OPEN||u.readyState===bl.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(o,MF)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=Z6(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},g=u=>{s();let S=()=>{let A=Ks(e.layout.installDir),f=ct();B(u,{type:"agent.heartbeat",payload:{hostname:As.default.hostname(),macOsUsername:As.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:A}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,MF)},b=(u,S)=>{if(typeof u.type!="string")return;if(OS(u)){t.stopped=!0,s(),a(),c(),CS({layout:e.layout}).finally(()=>{wl(),process.exit(0)});return}Er(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),Ku(e.layout,"in",u);let A=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&X(u.payload)){let f=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",_=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",v=typeof u.payload.challenge=="string"?u.payload.challenge:"",L=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!hw({serverPublicKey:f,origin:w,devicePublicKey:_,challenge:v,serverAttestation:L})){t.wakeError="Server attestation verification failed",Er(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&X(u.payload)){let f=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Er(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),U_({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{B(S,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&X(u.payload)){let f=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";f.length>0&&n(f,"install.bundle.update")}if(u.type==="system.ack"){Cu(e.layout,{wsUrl:e.wsUrl});let f=X(u.payload)?u.payload:null,w=H_(f);w!==null&&n(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&X(u.payload)&&$_(u.payload),u.type==="automations.run"&&X(u.payload)&&F_(u.payload),u.type==="terminal.stream.accepted"&&X(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"";if(f.length>0){let w=u_(f);for(let _ of w)B(S,{type:"terminal.stream.chunk",payload:{runId:f,chunk:_},requestId:A})}}if(u.type==="agent.agentRun.list"&&B(S,{type:"dashboard.agentRun.list.result",payload:{runs:W_(e.layout)},requestId:A}),u.type==="agent.agentRun.get"&&X(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"",w=f.length>0?Ml(e.layout,f):null;B(S,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:A})}if(u.type==="command.claude.run"&&X(u.payload)){let f=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&ie(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",_=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,v=u.payload.sessionContinuation===!0,L=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,R=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,T=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=pi(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,$l,T),D=Rh(u.payload.compositionSnapshot),re=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${v?"continue":"first"})\u2026`),I===null){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:A});return}if(D!==null){let U=Ch(e.layout,D);if(U!==null){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:U,..._!==void 0?{agentRunId:_}:{}},requestId:A});return}if(_!==void 0){let q=xh(e.layout,_,D);if(!q.ok){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:q.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:A});return}sv.set(_,D.entries.some(Dr=>Dr.scope==="run"))}}_!==void 0&&R!==void 0&&NF.set(_,R),_!==void 0&&(jF.set(_,I),T!==void 0&&T.trim().length>0&&tv.set(_,T.trim()),DF.set(_,f.trim()),Ue({projectFolderPath:I,...T!==void 0&&T.trim().length>0?{projectId:T.trim()}:{}})),q6(e,w,f.trim(),A,S,_,v,R,L,I,re,T)}}if(u.type==="shell.session.open"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,_=typeof u.payload.rows=="number"?u.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),f_({shellSessionId:f,cwd:e.workspace,cols:w,rows:_,send:v=>{B(S,v)},requestId:A}))}if(u.type==="shell.session.close"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";f.length>0&&fs(f,w=>{B(S,w)},A)}if(u.type==="shell.input"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";f.length>0&&w.length>0&&p_(f,w)}if(u.type==="shell.resize"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,_=typeof u.payload.rows=="number"?u.payload.rows:0;f.length>0&&w>0&&_>0&&m_(f,w,_)}if(u.type==="command.writer.session.end"&&X(u.payload)){let f=u.payload.writerAgent;typeof f=="string"&&ie(f)&&(y_(f),mm(e.layout,f))}if(u.type==="command.writer.session.start"&&X(u.payload)){let f=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof f=="string"&&ie(f)&&w.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),K6(e,f,w,A,S))}if(u.type==="command.claude.stop"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),N_(e,iv(S),f,A))}if(u.type==="command.claude.input_respond"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",_=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",v=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",L=typeof u.payload.question=="string"?u.payload.question:"";f.length>0&&w.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),O_(e,{agentRunId:f,originalPrompt:_,partialOutput:v,question:L,response:w,shellSessionId:NF.get(f)},A,iv(S)))}if(u.type==="dispatch.approval.required"&&X(u.payload)){let f=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${w}`),process.platform==="darwin"&&(0,av.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&X(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),X6(e,u.payload,A,S)),u.type==="harness.export.request"&&X(u.payload)){let f=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,_=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(v=>typeof v=="string"):[];f.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:v}=await Promise.resolve().then(()=>(OF(),IF)),L=v(_,e.email);B(S,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:f,...w!==void 0?{targetDeviceId:w}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:A})})()}if(u.type==="harness.manifest.request"&&zl(S,e.layout),u.type==="command.claude.result"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",_=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,v=pi(f!==void 0?jF.get(f):void 0,$l),L=f!==void 0?tv.get(f):void 0,R=f!==void 0?DF.get(f)??"":"",T=Jy({exitCode:_,output:w});if(T&&v!==null&&RA({layout:e.layout,text:w,source:f??"command.claude.result",projectFolderPath:v,...L!==void 0?{projectId:L}:{}}),_!=null&&_!==0&&w.trim().length>0&&v!==null&&(_A({layout:e.layout,errorText:w,projectFolderPath:v,...L!==void 0?{projectId:L}:{}}),TA({layout:e.layout,text:w,source:f??"command.claude.result.failure",projectFolderPath:v,...L!==void 0?{projectId:L}:{}})),T&&R.trim().length>0&&v!==null&&NP({layout:e.layout,projectFolderPath:v,...L!==void 0?{projectId:L}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:R,output:w,createdAt:new Date().toISOString()}}),f!==void 0&&v!==null){let D=nv.get(f),re=ov.get(f);D!==void 0&&re!==void 0&&_u(v).then(U=>{let q=Yy({before:re,after:U});kf(D,q),ov.delete(f),nv.delete(f)})}if(T&&L!==void 0&&L.trim().length>0){let D=F(),re=D===null?null:Z({wsUrl:D.wsUrl,pairingToken:D.pairingToken});re!==null&&Zy(re,L,{...f!==void 0?{sourceRunId:f}:{},lesson:Xy({prompt:R,output:w})})}f!==void 0&&(gi(e.layout,f),sv.delete(f),tv.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let u=new bl(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),T_(Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),I_(e.layout);let S=We(e.wsUrl)??"http://localhost:3000",A=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=fw({layout:e.layout,origin:S,...A!==void 0&&A.length>0?{claimToken:A}:{}});B(u,{type:"agent.register",payload:{role:"agent",hostname:As.default.hostname(),macOsUsername:As.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),zl(u,e.layout),M_(e,u),g(u)}),u.on("message",S=>{let A=typeof S=="string"?S:S.toString("utf8");try{let f=JSON.parse(A);if(!X(f))return;b(f,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(S,A)=>{s(),t.socket=void 0,t.wsConnected=!1,lS(e.layout),t.reconnectAttempt+=1;let f=typeof A=="string"?A:A.toString("utf8");wn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:f}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",S=>{t.wakeError=S.message,wn(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return Kf(()=>{let u=Yf();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&n(u.remoteBundleVersion,u.trigger);let S=Xf();S!==null&&r(S)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Ki(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:pl(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(zl(u,e.layout),{ok:!0})}}},eJ=async()=>{Fe("agent-witch");let e=Jw(),t=W();Qw().ok||(process.platform==="darwin"?(await Jr(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),n_(t);let n=r_({installDir:t});n.length>0&&console.log(`[agent-witch] Stopped ${n.length} sibling process(es): ${n.join(", ")}`),process.platform==="darwin"&&(Ht({launchAgentLabel:ne(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Ms());let o=await Bh(),s=o[0];s!==void 0&&z_(s.layout);for(let h of o){let y=We(h.wsUrl)??Ft;Js(h.layout.installDir,y)}let i=o.map(h=>Q6(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),wl(),process.exit(0));let c=()=>{o.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let S=ye(h.layout);cS(S,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=o[0]?.layout;h!==void 0&&(at(h)||Ji(h.installDir))},g=await o_({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):ul({layout:o[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let b=$t(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Ns(),d()});d=()=>{b(),g.stop(),wl(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Ul=eJ});var lv=l(()=>{"use strict";HF()});var $F={};St($F,{startAgentWitchClient:()=>Ul});var tJ,FF=l(()=>{"use strict";lv();lv();ro();Cf();md();tJ={};if(Zr(tJ.url)&&!it()){let e=process.argv.indexOf("report");e>=0&&process.exit(pd(process.argv.slice(e))),Ul()}});Lf();Cf();md();var $L="20.x",FL="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var VG=e=>[`Node.js ${$L} or newer is required (found ${e}).`,FL].join(" "),zL=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${VG(process.version)}
`),process.exit(1))};var sJ={},rJ=async()=>{Fe("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(nh(),rh)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},nJ=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(UC(),zC)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},oJ=async()=>{if(!Zr(sJ.url))return;zL();let e=process.argv.indexOf("report");e>=0&&process.exit(pd(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await rJ();return}if(t==="wake"){await nJ();return}if(t==="bridge"){let{runAgentWitchBridgeCli:n}=await Promise.resolve().then(()=>(BT(),UT));await n();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:n}=await Promise.resolve().then(()=>(fD(),gD));n();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(FF(),$F));await r()};oJ();
