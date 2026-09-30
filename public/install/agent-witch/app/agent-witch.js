#!/usr/bin/env node
"use strict";var m$=Object.create;var ug=Object.defineProperty;var g$=Object.getOwnPropertyDescriptor;var f$=Object.getOwnPropertyNames;var h$=Object.getPrototypeOf,y$=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},ht=(e,t)=>{for(var r in t)ug(e,r,{get:t[r],enumerable:!0})},S$=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of f$(t))!y$.call(e,o)&&o!==r&&ug(e,o,{get:()=>t[o],enumerable:!(n=g$(t,o))||n.enumerable});return e};var m=(e,t,r)=>(r=e!=null?m$(h$(e)):{},S$(t||!e||!e.__esModule?ug(r,"default",{value:e,enumerable:!0}):r,e));var Dn=v(pg=>{"use strict";Object.defineProperty(pg,"__esModule",{value:!0});pg.stringify=A$;function A$(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var I=v(mg=>{"use strict";Object.defineProperty(mg,"__esModule",{value:!0});mg.generateTypeGuardError=b$;var ov=Dn();function b$(e,t,r){return(0,ov.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,ov.stringify)(e)}) to be "${r}"`}});var ir=v(Dl=>{"use strict";Object.defineProperty(Dl,"__esModule",{value:!0});Dl.isNonNullObject=void 0;var P$=I(),_$=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,P$.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Dl.isNonNullObject=_$});var yt=v(de=>{"use strict";Object.defineProperty(de,"__esModule",{value:!0});de.attachTypeGuardMeta=de.isArrayTypeGuard=de.isNestedObjectTypeGuard=de.getTypeGuardWrapperKind=de.getTypeGuardInnerGuard=de.getTypeGuardItemGuard=de.getTypeGuardSchema=void 0;var w$=e=>e.schema;de.getTypeGuardSchema=w$;var v$=e=>e.itemGuard;de.getTypeGuardItemGuard=v$;var W$=e=>e.innerGuard;de.getTypeGuardInnerGuard=W$;var E$=e=>e.wrapperKind;de.getTypeGuardWrapperKind=E$;var L$=e=>{if((0,de.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};de.isNestedObjectTypeGuard=L$;var R$=e=>{if((0,de.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};de.isArrayTypeGuard=R$;var k$=(e,t)=>Object.assign(e,t);de.attachTypeGuardMeta=k$});var gs=v(xr=>{"use strict";Object.defineProperty(xr,"__esModule",{value:!0});xr.getExpectedTypeName=xr.getTypeGuardDisplayName=void 0;var sv=yt(),C$=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};xr.getTypeGuardDisplayName=C$;var T$=e=>{let t=(0,sv.getTypeGuardWrapperKind)(e),r=(0,sv.getTypeGuardInnerGuard)(e);if(t&&r){let o=(0,xr.getExpectedTypeName)(r);if(t==="undefinedOr")return`${o} | undefined`;if(t==="nullOr")return`${o} | null`;if(t==="nilOr")return`${o} | null | undefined`}let n=e.name;if(n.startsWith("is")){let o=n.slice(2);return o.endsWith("Guard")&&(o=o.slice(0,-5)),o==="Type"||o==="Schema"?"object":o==="Array"?"Array":o.toLowerCase()}return"unknown"};xr.getExpectedTypeName=T$});var Ir=v(Hl=>{"use strict";Object.defineProperty(Hl,"__esModule",{value:!0});Hl.createValidationResult=void 0;var x$=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Hl.createValidationResult=x$});var Hn=v(Fl=>{"use strict";Object.defineProperty(Fl,"__esModule",{value:!0});Fl.createValidationError=void 0;var I$=(e,t,r,n)=>({path:e,expectedType:t,actualValue:r,message:n});Fl.createValidationError=I$});var Fn=v($l=>{"use strict";Object.defineProperty($l,"__esModule",{value:!0});$l.createTreeNode=void 0;var O$=(e,t,r,n)=>({valid:t,path:e,...r&&{expectedType:r},...n!==void 0&&{actualValue:n},children:{},errors:[]});$l.createTreeNode=O$});var fs=v(zl=>{"use strict";Object.defineProperty(zl,"__esModule",{value:!0});zl.combineResults=void 0;var N$=Ir(),M$=(e,t)=>{let r=e.every(s=>s.valid),n=e.flatMap(s=>s.errors),o={valid:r,path:t||"root",children:{},errors:n};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";o.children[i]=s.tree}}),(0,N$.createValidationResult)(r,n,o)};zl.combineResults=M$});var Bl=v(Ul=>{"use strict";Object.defineProperty(Ul,"__esModule",{value:!0});Ul.createSimplifiedTree=void 0;var iv=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,n])=>{t[r]=iv(n)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},j$=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let n={};Object.entries(e.children).forEach(([o,s])=>{n[o]=iv(s)}),r[t]={valid:e.valid,value:n}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Ul.createSimplifiedTree=j$});var ys=v(Vl=>{"use strict";Object.defineProperty(Vl,"__esModule",{value:!0});Vl.validateObject=void 0;var D$=ir(),hs=Ir(),H$=Hn(),Gl=Fn(),F$=fs(),av=ql(),$$=(e,t,r)=>{let n=()=>{let i=(0,H$.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Gl.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,hs.createValidationResult)(!1,[],a):(0,hs.createValidationResult)(!1,[i],a)},o=()=>{let i=Object.keys(t);if(i.length===0)return(0,hs.createValidationResult)(!0,[],(0,Gl.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,f=d,b=t[f],h=e[f],y=(0,av.validateProperty)(f,h,b,r);return y.valid?p.length===0?(0,hs.createValidationResult)(!0,[],(0,Gl.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,av.validateProperty)(d,e[d],p,r)}),a=(0,F$.combineResults)(i,r.path),c=(0,Gl.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,hs.createValidationResult)(a.valid,a.errors,c)};return(0,D$.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?o():s():n()};Vl.validateObject=$$});var cv=v(Yl=>{"use strict";Object.defineProperty(Yl,"__esModule",{value:!0});Yl.validateArray=void 0;var z$=Dn(),Kl=Ir(),lv=Hn(),Jl=Fn(),U$=fs(),B$=ys(),G$=gs(),V$=yt(),q$=(e,t,r)=>{let n=r.path;if(!Array.isArray(e)){let c=(0,lv.createValidationError)(n,"Array",e,`Expected ${n} (${JSON.stringify(e)}) to be "Array"`),d=(0,Jl.createTreeNode)(n,!1,"Array",e);return d.errors=[c],(0,Kl.createValidationResult)(!1,[c],d)}let o=(0,V$.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${n}[${d}]`,f={path:p,config:r.config||null};if(o)return(0,B$.validateObject)(c,o,f);let b=t(c,null),h=(0,G$.getExpectedTypeName)(t),y=(0,z$.stringify)(c);if(b)return(0,Kl.createValidationResult)(!0,[],(0,Jl.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,A=(0,lv.createValidationError)(p,h,c,u),S=(0,Jl.createTreeNode)(p,!1,h,c);return S.errors=[A],(0,Kl.createValidationResult)(!1,[A],S)}),i=(0,U$.combineResults)(s,n),a=(0,Jl.createTreeNode)(n,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Kl.createValidationResult)(i.valid,i.errors,a)};Yl.validateArray=q$});var ql=v(Zl=>{"use strict";Object.defineProperty(Zl,"__esModule",{value:!0});Zl.validateProperty=void 0;var dv=Ir(),K$=Hn(),uv=Fn(),J$=gs(),Xl=yt(),Y$=ys(),X$=cv(),Z$=(e,t,r,n)=>{let o=`${n.path}.${e}`,s={path:o,config:n.config||null,...n.parentTree&&{parentTree:n.parentTree}},i=n.config?.errorMode||"multi",a=(0,Xl.getTypeGuardSchema)(r),c=(0,Xl.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,Y$.validateObject)(t,a,s);if(c&&(0,Xl.isArrayTypeGuard)(r))return(0,X$.validateArray)(t,c,s)}let d=p=>{let f=r(t,p),b=(0,J$.getExpectedTypeName)(r);return f?(0,dv.createValidationResult)(!0,[],(0,uv.createTreeNode)(o,!0,b,t)):(()=>{let h=(0,K$.createValidationError)(o,b,t,`Expected ${o} (${JSON.stringify(t)}) to be "${b}"`),y=(0,uv.createTreeNode)(o,!1,b,t);return y.errors=[h],(0,dv.createValidationResult)(!1,[h],y)})()};if((0,Xl.isNestedObjectTypeGuard)(r)){let p=n.config?{...n.config,identifier:o}:null;return d(p)}return d(null)};Zl.validateProperty=Z$});var ec=v(Ql=>{"use strict";Object.defineProperty(Ql,"__esModule",{value:!0});Ql.isNil=void 0;var Q$=I(),e1=function(e,t){return e!=null?(t&&t.callbackOnError((0,Q$.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Ql.isNil=e1});var gg=v(tc=>{"use strict";Object.defineProperty(tc,"__esModule",{value:!0});tc.isDefined=void 0;var t1=I(),r1=ec(),n1=function(e,t){return(0,r1.isNil)(e,null)?(t&&t.callbackOnError((0,t1.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};tc.isDefined=n1});var fg=v(rc=>{"use strict";Object.defineProperty(rc,"__esModule",{value:!0});rc.reportValidationResults=void 0;var o1=Bl(),pv=gg(),s1=ec(),i1=(e,t)=>{if(e.valid===!0||(0,s1.isNil)(t))return;let r=t.errorMode||"multi",n=(i,a)=>{(0,pv.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,o1.createSimplifiedTree)(a),null,2))},o=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,pv.isDefined)(e.tree)?n(t,e.tree):r==="multi"?o(t):s(t)};rc.reportValidationResults=i1});var hg=v(X=>{"use strict";Object.defineProperty(X,"__esModule",{value:!0});X.Validation=X.reportValidationResults=X.validateObject=X.validateProperty=X.createSimplifiedTree=X.combineResults=X.createTreeNode=X.createValidationError=X.createValidationResult=X.getExpectedTypeName=void 0;var a1=gs();Object.defineProperty(X,"getExpectedTypeName",{enumerable:!0,get:function(){return a1.getExpectedTypeName}});var l1=Ir();Object.defineProperty(X,"createValidationResult",{enumerable:!0,get:function(){return l1.createValidationResult}});var c1=Hn();Object.defineProperty(X,"createValidationError",{enumerable:!0,get:function(){return c1.createValidationError}});var d1=Fn();Object.defineProperty(X,"createTreeNode",{enumerable:!0,get:function(){return d1.createTreeNode}});var u1=fs();Object.defineProperty(X,"combineResults",{enumerable:!0,get:function(){return u1.combineResults}});var p1=Bl();Object.defineProperty(X,"createSimplifiedTree",{enumerable:!0,get:function(){return p1.createSimplifiedTree}});var m1=ql();Object.defineProperty(X,"validateProperty",{enumerable:!0,get:function(){return m1.validateProperty}});var g1=ys();Object.defineProperty(X,"validateObject",{enumerable:!0,get:function(){return g1.validateObject}});var f1=fg();Object.defineProperty(X,"reportValidationResults",{enumerable:!0,get:function(){return f1.reportValidationResults}});var h1=Ir(),y1=fs(),S1=Hn(),A1=Fn(),b1=ql(),P1=ys(),_1=fg(),w1=Bl();X.Validation={result:h1.createValidationResult,combine:y1.combineResults,error:S1.createValidationError,treeNode:A1.createTreeNode,property:b1.validateProperty,object:P1.validateObject,report:_1.reportValidationResults,createSimplifiedTree:w1.createSimplifiedTree}});var nc=v(yg=>{"use strict";Object.defineProperty(yg,"__esModule",{value:!0});yg.isType=W1;var mv=ir(),gv=hg(),v1=yt();function W1(e){if(!(0,mv.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,n){let o=n?.errorMode||"multi";if(o==="multi"||o==="json"){let s={path:n?.identifier||"root",config:n||null},i=(0,gv.validateObject)(r,e,s);return(0,gv.reportValidationResults)(i,n||null),i.valid}return(0,mv.isNonNullObject)(r,n)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],n?{...n,identifier:`${n.identifier}.${s}`}:null)}):!1}return(0,v1.attachTypeGuardMeta)(t,{schema:e})}});var Sv=v(Or=>{"use strict";Object.defineProperty(Or,"__esModule",{value:!0});Or.isNestedType=Or.isShape=void 0;Or.isSchema=Ss;var fv=ir(),hv=hg(),yv=yt();function Ss(e){if(!(0,fv.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=L1(e);function r(n,o){let s=o?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:o?.identifier||"root",config:o||null},a=(0,hv.validateObject)(n,t,i);return(0,hv.reportValidationResults)(a,o||null),a.valid}return(0,fv.isNonNullObject)(n,o)?Object.keys(t).every(function(i){let a=t[i];return a?a(n[i],o?{...o,identifier:`${o.identifier}.${i}`}:null):!1}):!1}return(0,yv.attachTypeGuardMeta)(r,{schema:t})}function E1(e){return typeof e=="function"?e:Array.isArray(e)?R1(e):typeof e=="object"&&e!==null?Ss(e):e}function L1(e){let t={};for(let[r,n]of Object.entries(e))t[r]=E1(n);return t}function R1(e){let t=e[0],r=Ss(t);function n(o,s){return Array.isArray(o)?o.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,yv.attachTypeGuardMeta)(n,{itemGuard:r})}Or.isShape=Ss;Or.isNestedType=Ss});var Av=v(Sg=>{"use strict";Object.defineProperty(Sg,"__esModule",{value:!0});Sg.isObjectWith=C1;var k1=nc();function C1(e){return(0,k1.isType)(e)}});var bv=v(Ag=>{"use strict";Object.defineProperty(Ag,"__esModule",{value:!0});Ag.isObject=x1;var T1=nc();function x1(e){return(0,T1.isType)(e)}});var Pv=v(bg=>{"use strict";Object.defineProperty(bg,"__esModule",{value:!0});bg.guardWithTolerance=I1;function I1(e,t,r){return t(e,r),e}});var _v=v(Pg=>{"use strict";Object.defineProperty(Pg,"__esModule",{value:!0});Pg.isBranded=N1;var O1=I();function N1(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,O1.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var wv=v(oc=>{"use strict";Object.defineProperty(oc,"__esModule",{value:!0});oc.BrandSymbols=void 0;oc.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var vv=v(sc=>{"use strict";Object.defineProperty(sc,"__esModule",{value:!0});sc.isAny=void 0;var M1=function(e){return!0};sc.isAny=M1});var As=v(_g=>{"use strict";Object.defineProperty(_g,"__esModule",{value:!0});_g.reportTypeGuardError=D1;var j1=I();function D1(e,t,r){e&&e.callbackOnError((0,j1.generateTypeGuardError)(t,e.identifier,r))}});var Wv=v(ic=>{"use strict";Object.defineProperty(ic,"__esModule",{value:!0});ic.isBoolean=void 0;var H1=As(),F1=function(t,r){return typeof t!="boolean"?((0,H1.reportTypeGuardError)(r,t,"boolean"),!1):!0};ic.isBoolean=F1});var Ev=v(ac=>{"use strict";Object.defineProperty(ac,"__esModule",{value:!0});ac.isDate=void 0;var $1=I(),z1=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,$1.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};ac.isDate=z1});var wg=v(lc=>{"use strict";Object.defineProperty(lc,"__esModule",{value:!0});lc.isNumber=void 0;var U1=As(),B1=function(t,r){return typeof t!="number"||isNaN(t)?((0,U1.reportTypeGuardError)(r,t,"number"),!1):!0};lc.isNumber=B1});var Lv=v(cc=>{"use strict";Object.defineProperty(cc,"__esModule",{value:!0});cc.isString=void 0;var G1=As(),V1=function(t,r){return typeof t!="string"?((0,G1.reportTypeGuardError)(r,t,"string"),!1):!0};cc.isString=V1});var Rv=v(dc=>{"use strict";Object.defineProperty(dc,"__esModule",{value:!0});dc.isUnknown=void 0;var q1=function(e){return!0};dc.isUnknown=q1});var kv=v(uc=>{"use strict";Object.defineProperty(uc,"__esModule",{value:!0});uc.isFunction=void 0;var K1=I(),J1=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,K1.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};uc.isFunction=J1});var Tv=v(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.isFile=void 0;var Cv=I(),Y1=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,Cv.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,Cv.generateTypeGuardError)(e,t.identifier,"File")),!1)};pc.isFile=Y1});var Iv=v(mc=>{"use strict";Object.defineProperty(mc,"__esModule",{value:!0});mc.isFileList=void 0;var xv=I(),X1=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,xv.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,xv.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};mc.isFileList=X1});var Nv=v(gc=>{"use strict";Object.defineProperty(gc,"__esModule",{value:!0});gc.isBlob=void 0;var Ov=I(),Z1=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,Ov.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,Ov.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};gc.isBlob=Z1});var jv=v(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.isFormData=void 0;var Mv=I(),Q1=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,Mv.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,Mv.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};fc.isFormData=Q1});var Hv=v(hc=>{"use strict";Object.defineProperty(hc,"__esModule",{value:!0});hc.isURL=void 0;var Dv=I(),ez=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,Dv.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,Dv.generateTypeGuardError)(e,t.identifier,"URL")),!1)};hc.isURL=ez});var $v=v(yc=>{"use strict";Object.defineProperty(yc,"__esModule",{value:!0});yc.isURLSearchParams=void 0;var Fv=I(),tz=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,Fv.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,Fv.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};yc.isURLSearchParams=tz});var zv=v(Sc=>{"use strict";Object.defineProperty(Sc,"__esModule",{value:!0});Sc.isMap=void 0;var rz=I(),nz=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,rz.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Sc.isMap=nz});var Uv=v(Ac=>{"use strict";Object.defineProperty(Ac,"__esModule",{value:!0});Ac.isSet=void 0;var oz=I(),sz=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,oz.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Ac.isSet=sz});var Bv=v(vg=>{"use strict";Object.defineProperty(vg,"__esModule",{value:!0});vg.isIndexSignature=az;var iz=I();function az(e,t){return function(r,n){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return n&&n.callbackOnError((0,iz.generateTypeGuardError)(r,n.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let f=s[d],b=e(d,n?{...n,identifier:`${n.identifier}[key:${p}]`}:null),h=t(f,n?{...n,identifier:`${n.identifier}[value:${p}]`}:null);return b&&h})}}});var Gv=v(bc=>{"use strict";Object.defineProperty(bc,"__esModule",{value:!0});bc.isError=void 0;var lz=As(),cz=function(t,r){return t instanceof Error?!0:((0,lz.reportTypeGuardError)(r,t,"Error"),!1)};bc.isError=cz});var Eg=v(Wg=>{"use strict";Object.defineProperty(Wg,"__esModule",{value:!0});Wg.isArrayWithEachItem=pz;var dz=I(),uz=yt();function pz(e){let t=function(r,n){return Array.isArray(r)?r.every((o,s)=>e(o,n?{...n,identifier:`${n.identifier}[${s}]`}:null)):(n&&n.callbackOnError((0,dz.generateTypeGuardError)(r,n.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,uz.attachTypeGuardMeta)(t,{itemGuard:e})}});var Lg=v(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.isNonEmptyArray=void 0;var mz=I(),gz=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,mz.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Pc.isNonEmptyArray=gz});var Vv=v(Rg=>{"use strict";Object.defineProperty(Rg,"__esModule",{value:!0});Rg.isNonEmptyArrayWithEachItem=yz;var fz=Eg(),hz=Lg();function yz(e){return function(t,r){return(0,fz.isArrayWithEachItem)(e)(t,r)&&(0,hz.isNonEmptyArray)(t,r)}}});var Kv=v(kg=>{"use strict";Object.defineProperty(kg,"__esModule",{value:!0});kg.isTuple=Sz;var qv=I();function Sz(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,qv.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((n,o)=>n(t[o],r?{...r,identifier:`${r.identifier}[${o}]`}:null)):(r&&r.callbackOnError((0,qv.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var Jv=v(Cg=>{"use strict";Object.defineProperty(Cg,"__esModule",{value:!0});Cg.isObjectWithEachItem=bz;var Az=I();function bz(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,Az.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var Yv=v(Tg=>{"use strict";Object.defineProperty(Tg,"__esModule",{value:!0});Tg.isPartialOf=_z;var Pz=ir();function _z(e){return function(t,r){if(!(0,Pz.isNonNullObject)(t,r))return!1;for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&Object.prototype.hasOwnProperty.call(t,n)){let o=e[n],s=t[n];if(o&&!o(s,r?{...r,identifier:`${r.identifier}.${n}`}:null))return!1}return!0}}});var Xv=v(xg=>{"use strict";Object.defineProperty(xg,"__esModule",{value:!0});xg.isPick=vz;var wz=ir();function vz(e,...t){return function(r,n){if(!(0,wz.isNonNullObject)(r,n))return!1;for(let o of t)if(!Object.prototype.hasOwnProperty.call(r,o))return n&&e(r,n),!1;return!0}}});var Zv=v(Ig=>{"use strict";Object.defineProperty(Ig,"__esModule",{value:!0});Ig.isOmit=Ez;var Wz=ir();function Ez(e,...t){return function(r,n){if(!(0,Wz.isNonNullObject)(r,n))return!1;let o=[],s=n?.identifier||"root",i=n?{...n,callbackOnError:d=>o.push(d)}:{identifier:s,callbackOnError:d=>o.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=o.filter(d=>{let p=d.slice(9),f=p.indexOf(" ("),b=f>=0?p.slice(0,f):p;if(a.has(b))return!1;let h=b.startsWith(s+".")&&b.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(n&&c.length>0)for(let d of c)n.callbackOnError(d);return c.length===0}}});var Qv=v(_c=>{"use strict";Object.defineProperty(_c,"__esModule",{value:!0});_c.isNonEmptyString=void 0;var Lz=I(),Rz=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,Lz.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};_c.isNonEmptyString=Rz});var eW=v(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.isNonNegativeNumber=void 0;var kz=I(),Cz=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,kz.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};wc.isNonNegativeNumber=Cz});var tW=v(vc=>{"use strict";Object.defineProperty(vc,"__esModule",{value:!0});vc.isPositiveNumber=void 0;var Tz=I(),xz=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,Tz.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};vc.isPositiveNumber=xz});var rW=v(Wc=>{"use strict";Object.defineProperty(Wc,"__esModule",{value:!0});Wc.isNonPositiveNumber=void 0;var Iz=I(),Oz=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,Iz.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Wc.isNonPositiveNumber=Oz});var nW=v(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.isNegativeNumber=void 0;var Nz=I(),Mz=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,Nz.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Ec.isNegativeNumber=Mz});var oW=v(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.isInteger=void 0;var jz=I(),Dz=wg(),Hz=function(e,t){return!(0,Dz.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,jz.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Lc.isInteger=Hz});var sW=v(Rc=>{"use strict";Object.defineProperty(Rc,"__esModule",{value:!0});Rc.isPositiveInteger=void 0;var Fz=I(),$z=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Fz.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Rc.isPositiveInteger=$z});var iW=v(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.isNegativeInteger=void 0;var zz=I(),Uz=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,zz.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};kc.isNegativeInteger=Uz});var aW=v(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.isNonNegativeInteger=void 0;var Bz=I(),Gz=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Bz.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Cc.isNonNegativeInteger=Gz});var lW=v(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.isNonPositiveInteger=void 0;var Vz=I(),qz=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Vz.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Tc.isNonPositiveInteger=qz});var cW=v(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.isNumeric=void 0;var xc=I(),Kz=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,xc.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,xc.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,xc.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,xc.generateTypeGuardError)(e,t.identifier,"number key")),!1};Ic.isNumeric=Kz});var dW=v(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.isBooleanLike=void 0;var Og=I(),Jz=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Og.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Og.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Oc.isBooleanLike=Jz});var uW=v(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.isDateLike=void 0;var bs=I(),Yz=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,bs.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,bs.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,bs.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,bs.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,bs.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Nc.isDateLike=Yz});var pW=v(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.isBigInt=void 0;var Xz=I(),Zz=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,Xz.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Mc.isBigInt=Zz});var Mg=v(Ng=>{"use strict";Object.defineProperty(Ng,"__esModule",{value:!0});Ng.isOneOf=Qz;var mW=Dn();function Qz(...e){return function(t,r){let n=e.some(function(o){return t===o});return!n&&r&&r.callbackOnError(`${r.identifier} (${(0,mW.stringify)(t)}) must be one of following values ${e.map(mW.stringify).join(" | ")}`),n}}});var gW=v(jg=>{"use strict";Object.defineProperty(jg,"__esModule",{value:!0});jg.isOneOfTypes=rU;var eU=Dn(),tU=gs();function rU(...e){return function(t,r){let n=e.map(s=>({typeGuard:s,isValid:s(t,null)})),o=n.some(s=>s.isValid);if(!o&&r){let s=(0,eU.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,tU.getTypeGuardDisplayName)(c)).join(" | ")}"`];n.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return o}}});var fW=v(Dg=>{"use strict";Object.defineProperty(Dg,"__esModule",{value:!0});Dg.isIntersectionOf=nU;function nU(...e){return function(t,r){for(let n of e)if(!n(t,r))return!1;return!0}}});var hW=v(Hg=>{"use strict";Object.defineProperty(Hg,"__esModule",{value:!0});Hg.isExtensionOf=oU;function oU(e,t){return function(r,n){return e(r,n)?t(r,n):!1}}});var yW=v(Fg=>{"use strict";Object.defineProperty(Fg,"__esModule",{value:!0});Fg.isNullOr=iU;var sU=yt();function iU(e){function t(r,n){return r===null?!0:e(r,n)}return(0,sU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var SW=v($g=>{"use strict";Object.defineProperty($g,"__esModule",{value:!0});$g.isUndefinedOr=lU;var aU=yt();function lU(e){function t(r,n){return r===void 0?!0:e(r,n)}return(0,aU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var AW=v(zg=>{"use strict";Object.defineProperty(zg,"__esModule",{value:!0});zg.isNilOr=dU;var cU=yt();function dU(e){function t(r,n){return r==null?!0:e(r,n)}return(0,cU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var bW=v(Ug=>{"use strict";Object.defineProperty(Ug,"__esModule",{value:!0});Ug.isAsserted=uU;function uU(e){return!0}});var PW=v(Bg=>{"use strict";Object.defineProperty(Bg,"__esModule",{value:!0});Bg.isEnum=mU;var pU=Mg();function mU(e){return function(t,r){return(0,pU.isOneOf)(...Object.values(e))(t,r)}}});var _W=v(Gg=>{"use strict";Object.defineProperty(Gg,"__esModule",{value:!0});Gg.isEqualTo=hU;var gU=I(),fU=Dn();function hU(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,gU.generateTypeGuardError)(t,r.identifier,`equal to ${(0,fU.stringify)(e)}`)),!1):!0}}});var wW=v(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.isRegex=void 0;var yU=I(),SU=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,yU.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};jc.isRegex=SU});var WW=v(Vg=>{"use strict";Object.defineProperty(Vg,"__esModule",{value:!0});Vg.isPattern=AU;var vW=I();function AU(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,n){return typeof r!="string"?(n&&n.callbackOnError((0,vW.generateTypeGuardError)(r,n.identifier,"string")),!1):t.test(r)?!0:(n&&n.callbackOnError((0,vW.generateTypeGuardError)(r,n.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var EW=v(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.by=bU;function bU(e){return function(t){return e(t,null)}}});var LW=v(Kg=>{"use strict";Object.defineProperty(Kg,"__esModule",{value:!0});Kg.toNumber=PU;function PU(e){return typeof e=="number"?e:Number(e)}});var RW=v(Jg=>{"use strict";Object.defineProperty(Jg,"__esModule",{value:!0});Jg.toDate=_U;function _U(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var kW=v(Yg=>{"use strict";Object.defineProperty(Yg,"__esModule",{value:!0});Yg.toBoolean=wU;function wU(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var CW=v(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.isSymbol=void 0;var vU=I(),WU=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,vU.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Dc.isSymbol=WU});var Ps=v(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var EU=nc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return EU.isType}});var Xg=Sv();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return Xg.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return Xg.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return Xg.isNestedType}});var LU=Av();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return LU.isObjectWith}});var RU=bv();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return RU.isObject}});var kU=Pv();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return kU.guardWithTolerance}});var CU=_v();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return CU.isBranded}});var TU=wv();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return TU.BrandSymbols}});var xU=vv();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return xU.isAny}});var IU=Wv();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return IU.isBoolean}});var OU=Ev();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return OU.isDate}});var NU=gg();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return NU.isDefined}});var MU=ec();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return MU.isNil}});var jU=wg();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return jU.isNumber}});var DU=Lv();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return DU.isString}});var HU=Rv();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return HU.isUnknown}});var FU=kv();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return FU.isFunction}});var $U=Tv();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return $U.isFile}});var zU=Iv();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return zU.isFileList}});var UU=Nv();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return UU.isBlob}});var BU=jv();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return BU.isFormData}});var GU=Hv();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return GU.isURL}});var VU=$v();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return VU.isURLSearchParams}});var qU=zv();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return qU.isMap}});var KU=Uv();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return KU.isSet}});var JU=Bv();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return JU.isIndexSignature}});var YU=Gv();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return YU.isError}});var XU=Eg();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return XU.isArrayWithEachItem}});var ZU=Lg();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return ZU.isNonEmptyArray}});var QU=Vv();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return QU.isNonEmptyArrayWithEachItem}});var eB=Kv();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return eB.isTuple}});var tB=ir();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return tB.isNonNullObject}});var rB=Jv();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return rB.isObjectWithEachItem}});var nB=Yv();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return nB.isPartialOf}});var oB=Xv();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return oB.isPick}});var sB=Zv();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return sB.isOmit}});var iB=Qv();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return iB.isNonEmptyString}});var aB=eW();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return aB.isNonNegativeNumber}});var lB=tW();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return lB.isPositiveNumber}});var cB=rW();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return cB.isNonPositiveNumber}});var dB=nW();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return dB.isNegativeNumber}});var uB=oW();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return uB.isInteger}});var pB=sW();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return pB.isPositiveInteger}});var mB=iW();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return mB.isNegativeInteger}});var gB=aW();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return gB.isNonNegativeInteger}});var fB=lW();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return fB.isNonPositiveInteger}});var hB=cW();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return hB.isNumeric}});var yB=dW();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return yB.isBooleanLike}});var SB=uW();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return SB.isDateLike}});var AB=pW();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return AB.isBigInt}});var bB=Mg();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return bB.isOneOf}});var PB=gW();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return PB.isOneOfTypes}});var _B=fW();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return _B.isIntersectionOf}});var wB=hW();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return wB.isExtensionOf}});var vB=yW();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return vB.isNullOr}});var WB=SW();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return WB.isUndefinedOr}});var EB=AW();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return EB.isNilOr}});var LB=bW();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return LB.isAsserted}});var RB=PW();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return RB.isEnum}});var kB=_W();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return kB.isEqualTo}});var CB=wW();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return CB.isRegex}});var TB=WW();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return TB.isPattern}});var xB=I();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return xB.generateTypeGuardError}});var IB=EW();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return IB.by}});var OB=LW();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return OB.toNumber}});var NB=RW();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return NB.toDate}});var MB=kW();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return MB.toBoolean}});var jB=CW();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return jB.isSymbol}})});var _s,TW,xW,Nr,Zg,Q6,IW,Hc,Mr,ws,Qg,ef,tf,rf,Ot,nf,Fc,$c,zc,vs,et,$n,zn,Uc,ar,of,OW,St=l(()=>{"use strict";_s={production:".agent-witch",localhost:".local-agent-witch"},TW={production:47892,localhost:47893},xW={production:"com.agent-witch",localhost:"com.local-agent-witch"},Nr={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Zg="app",Q6=`${Zg}/agent-witch.js`,IW=`${Zg}/command`,Hc={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Mr=_s.production,ws=_s.localhost,Qg=TW.production,ef=TW.localhost,tf=xW.production,rf=xW.localhost,Ot="profiles",nf=Nr.activeProfile,Fc="harness",$c="sets",zc="manifest.json",vs=Hc.projectsDir,et=Hc.logsDir,$n="agent-witch.log",zn="agent-witch.error.log",Uc=Hc.reportsDir,ar=Hc.deviceKeypairJson,of=Zg,OW="agent-witch.js"});var Bc,NW,HB,DB,MW,jW=l(()=>{"use strict";Bc=m(require("node:path")),NW=require("node:url"),HB={},DB=()=>!0,MW=()=>{if(DB()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Bc.default.dirname(Bc.default.resolve(e))}return Bc.default.dirname((0,NW.fileURLToPath)(HB.url))}});var sf,DW,N,HW,FB,lr,E,Gc,Nt,FW,Vc,Un,qc,Kc,te,tt,af,rt,lf,O,cf=l(()=>{"use strict";sf=m(require("node:fs")),DW=m(require("node:os")),N=m(require("node:path")),HW=m(Ps());St();jW();FB=MW(),lr=e=>e.trim().toLowerCase(),E=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return N.default.resolve(e);let t=N.default.resolve(FB),r=N.default.basename(t),n=N.default.basename(N.default.dirname(t));return r===of&&(n===Mr||n===ws)?N.default.dirname(t):r===Mr||r===ws?t:N.default.join(DW.default.homedir(),Mr)},Gc=(e=E())=>N.default.join(e,of),Nt=(e=E())=>N.default.join(Gc(e),OW),FW=(e,t,r)=>t!==null?N.default.join(e,Ot,t,r):N.default.join(e,r),Vc=e=>FW(e.installDir,e.profileEmail,vs),Un=e=>FW(e.installDir,e.profileEmail,et),qc=e=>e.profileEmail!==null?N.default.join(e.installDir,Ot,e.profileEmail,ar):N.default.join(e.installDir,ar),Kc=e=>N.default.basename(e)===ws,te=(e=E())=>Kc(e)?rf:tf,tt=(e=E())=>Kc(e)?ef:Qg,af=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return lr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?lr(t):null},rt=(e=E())=>{let t=N.default.join(e,nf);if(!sf.default.existsSync(t))return null;try{let r=JSON.parse(sf.default.readFileSync(t,"utf8"));if((0,HW.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return lr(r.email)}catch{return null}return null},lf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?lr(r):null}let t=af();return t!==null?t:rt()},O=e=>{let t=E(),r=Gc(t),n=Nt(t),o=lf(e);if(o!==null){let b=N.default.join(t,Ot,o),h=N.default.join(b,Fc),y=N.default.join(b,vs),u=N.default.join(b,et),A=N.default.join(b,Uc),S=N.default.join(b,ar),g=N.default.join(b,et,$n),_=N.default.join(b,et,zn);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:y,logsDir:u,mainLogPath:g,errorLogPath:_,reportsDir:A,deviceKeypairPath:S,configPath:N.default.join(b,"config.json"),harnessRootDir:h,harnessManifestPath:N.default.join(h,zc),harnessSetsDir:N.default.join(h,$c)}}let s=N.default.join(t,Fc),i=N.default.join(t,vs),a=N.default.join(t,et),c=N.default.join(t,Uc),d=N.default.join(t,ar),p=N.default.join(t,et,$n),f=N.default.join(t,et,zn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:f,reportsDir:c,deviceKeypairPath:d,configPath:N.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:N.default.join(s,zc),harnessSetsDir:N.default.join(s,$c)}}});var df,$W,$B,zB,zW,uf,UW=l(()=>{"use strict";df=m(require("node:fs")),$W=m(require("node:path"));St();cf();$B=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zB=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,zW=e=>{let t=$W.default.join(e,Nr.wakePort);if(!df.default.existsSync(t))return null;try{let r=JSON.parse(df.default.readFileSync(t,"utf8"));if($B(r)&&zB(r.wakePort))return r.wakePort}catch{return null}return null},uf=(e=E())=>zW(e)??tt(e)});var U=l(()=>{"use strict";cf();UW()});var Ws,qB,KB,BW,JB,YB,GW=l(()=>{"use strict";U();Ws=te(),qB=`${Ws}-wake`,KB=`${Ws}-live`,BW=`${Ws}-watchdog`,JB=`${Ws}-automation-scheduler`,YB=`${Ws}-updater`});var pf,mf,Jc=l(()=>{"use strict";pf=new Set(["","loginwindow","_mbsetupuser","root"]),mf=5e3});var VW,XB,qW,gf,ff=l(()=>{"use strict";VW=require("node:child_process");Jc();XB=e=>e.trim().toLowerCase(),qW=e=>e==null?!1:!pf.has(XB(e)),gf=()=>{if(process.platform!=="darwin")return null;try{let t=(0,VW.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return qW(t)?t:null}catch{return null}}});var JW,KW,nt,Es=l(()=>{"use strict";JW=m(require("node:os"));ff();KW=e=>e.trim().toLowerCase(),nt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?gf():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??JW.default.userInfo().username;return KW(r)===KW(n)}});var YW,XW,jr,ZW=l(()=>{"use strict";YW=require("node:child_process"),XW=m(require("node:fs"));U();Es();jr=(e=E())=>{let t=Nt(e);if(!XW.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!nt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=rt(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,YW.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var QW,Ls,Yc=l(()=>{"use strict";QW=require("node:child_process"),Ls=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,QW.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Xc,hf,eE,Z,Zc,Rs=l(()=>{"use strict";Xc=m(require("node:fs")),hf=m(require("node:path"));U();St();eE=e=>{let t=hf.default.join(e,Ot);return Xc.default.existsSync(t)?Xc.default.readdirSync(t).filter(r=>Xc.default.statSync(hf.default.join(t,r)).isDirectory()).map(r=>lr(r)).toSorted():[]},Z=(e=E())=>{let t=te(e);return[{profileEmail:eE(e)[0]??null,launchAgentLabel:t}]},Zc=(e=E())=>eE(e)});var yf,tE,rE,ZB,Mt,Qc=l(()=>{"use strict";yf=m(require("node:fs")),tE=m(require("node:os")),rE=m(require("node:path"));U();Rs();ZB=()=>rE.default.join(tE.default.homedir(),"Library","LaunchAgents"),Mt=(e=E())=>{let t=te(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of Z(e))r.add(o.launchAgentLabel);let n=ZB();if(yf.default.existsSync(n))for(let o of yf.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var nE,ks,oE=l(()=>{"use strict";U();Yc();Qc();Rs();nE=(e=E())=>{let t=new Set(Z(e).map(r=>r.launchAgentLabel));return Mt(e).filter(r=>!t.has(r))},ks=(e=E())=>{for(let t of nE(e))Ls(t)}});var Cs,Sf=l(()=>{"use strict";U();Yc();Qc();Cs=(e=E())=>{for(let t of Mt(e))Ls(t)}});var sE,iE,QB,Dr,aE=l(()=>{"use strict";sE=require("node:child_process"),iE=require("node:util"),QB=(0,iE.promisify)(sE.execFile),Dr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await QB("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Hr,eG,Af,bf=l(()=>{"use strict";Hr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eG=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,Af=e=>{let t=e.pathValue??eG(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${Hr(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${Hr(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${Hr(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${Hr(e.homeDir)}</string>
    <key>PATH</key>
    <string>${Hr(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${Hr(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${Hr(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var ed,Pf=l(()=>{"use strict";ed=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Fr,_f,Ts,tG,rG,nG,lE,jt,wf=l(()=>{"use strict";Fr=m(require("node:fs")),_f=m(require("node:os")),Ts=m(require("node:path"));St();U();bf();Pf();tG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rG=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,nG=e=>{let t=Ts.default.join(e,Nr.wakePort);if(!Fr.default.existsSync(t))return tt(e);try{let r=JSON.parse(Fr.default.readFileSync(t,"utf8"));if(tG(r)&&rG(r.wakePort))return r.wakePort}catch{return tt(e)}return tt(e)},lE=(e,t=_f.default.homedir())=>Ts.default.join(t,"Library","LaunchAgents",`${e}.plist`),jt=e=>{let t=e.installDir??E(),r=e.homeDir??_f.default.homedir(),n=lE(e.launchAgentLabel,r),o=Fr.default.existsSync(n)?Fr.default.readFileSync(n,"utf8"):null;if(o!==null&&ed(o))return{ok:!0,rewritten:!1,plistPath:n};let s=Af({launchAgentLabel:e.launchAgentLabel,runPath:Ts.default.join(t,IW,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??nG(t)});if(!ed(s))return{ok:!1,rewritten:!1,plistPath:n,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Fr.default.mkdirSync(Ts.default.dirname(n),{recursive:!0}),Fr.default.writeFileSync(n,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:n,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:n}}});var dE,uE,pE,xs,oG,sG,cE,be,vf=l(()=>{"use strict";dE=require("node:child_process"),uE=m(require("node:fs")),pE=require("node:util");U();wf();Es();xs=(0,pE.promisify)(dE.execFile),oG=async e=>{try{return await xs("launchctl",["print",e]),!0}catch{return!1}},sG=async(e,t,r)=>{await oG(t)&&await xs("launchctl",["bootout",t]).catch(()=>{}),await xs("launchctl",["bootstrap",e,r]),await xs("launchctl",["enable",t])},cE=async e=>{try{return await xs("launchctl",["kickstart","-k",e]),!0}catch{return!1}},be=async(e,t=E())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!nt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let n=`gui/${r}`,o=`${n}/${e}`,s=jt({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await cE(o))return{ok:!0};let i=s.plistPath;if(!uE.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await sG(n,o,i),await cE(o)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var $r,mE=l(()=>{"use strict";U();vf();Rs();$r=async(e=E())=>{let t=[];for(let r of Z(e))(await be(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var He,Dt,gE=l(()=>{"use strict";Sf();Es();Jc();He=e=>{nt()||(Cs(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Dt=(e,t=mf)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{nt()||e()},t);return()=>{clearInterval(r)}}});var Q=l(()=>{"use strict";GW();ZW();Yc();oE();Sf();Qc();Es();aE();mE();vf();wf();Pf();bf();Rs();ff();Jc();gE()});var Wf=l(()=>{"use strict";Q()});var fE,hE,td,yE,Bn,SE,AE,zr=l(()=>{"use strict";fE=".agent-witch",hE="memory",td="project.json",yE="chunks.ndjson",Bn="runs.ndjson",SE="reports",AE=".json"});var bE=l(()=>{"use strict";zr()});var PE,rd,Ef=l(()=>{"use strict";PE=m(require("node:path"));bE();rd=(e,t)=>PE.default.join(e.trim(),`${t.trim()}${AE}`)});var Is,_E,wE=l(()=>{"use strict";Is="agent-witch.js",_E="command"});var nd=l(()=>{"use strict";wE()});var Ur,vE,WE=l(()=>{"use strict";nd();Ur=e=>`'${e.replace(/'/g,"'\\''")}'`,vE=e=>{let t=`${e.installDir.trim()}/${"app"}/${Is}`,r=[Ur("node"),Ur(t),"report","write","--key",Ur(e.reportKey.trim()),"--agent-run-id",Ur(e.agentRunId.trim()),"--status",Ur(e.status),"--summary",Ur(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Ur(e.details.trim())),r.join(" ")}});var At,EE,iG,Lf,od=l(()=>{"use strict";Ef();WE();At={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},EE=e=>e===At.COMPLETED||e===At.FAILED,iG=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Lf=(e,t)=>{let r=rd(t.reportsDir,t.reportKey),n=vE({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:At.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${iG({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var Pe=l(()=>{"use strict";St();U()});var Ns,RE,LE,kE,aG,Gn,lG,CE,Ms,js,Rf,TE,xE,Ds=l(()=>{"use strict";Ns=m(require("node:fs")),RE=m(require("node:path"));od();Ef();Pe();LE=50,kE=e=>{let t=O(),r=rd(t.reportsDir,e);return Ns.default.mkdirSync(RE.default.dirname(r),{recursive:!0}),r},aG=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Gn=e=>{let t=kE(e);if(!Ns.default.existsSync(t))return null;try{let r=JSON.parse(Ns.default.readFileSync(t,"utf8"));return aG(r)?r:null}catch{return null}},lG=(e,t)=>{let r=[...e,t];return r.length>LE?r.slice(r.length-LE):r},CE=e=>{let t=kE(e.reportKey);Ns.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Ms=e=>{let t=Gn(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:lG(t?.history??[],n)};return CE(o),o},js=e=>{let t=Gn(e.reportKey);return t!==null?t:Ms({reportKey:e.reportKey,agentRunId:e.agentRunId,status:At.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Rf=(e,t)=>{let r=t.trim();if(r.length===0)return Gn(e);let n=Gn(e);if(n===null)return null;let o=n.details!==void 0&&n.details.trim().length>0?`${n.details.trim()}
${r}`:r,s={...n,updatedAt:new Date().toISOString(),details:o};return CE(s),s},TE=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},xE=e=>{if(e===null||!EE(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===At.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var cG,dG,Hs,IE,sd,kf=l(()=>{"use strict";od();Ds();cG=new Set(Object.values(At)),dG=e=>cG.has(e),Hs=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},IE=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},sd=e=>{if(e[0]!=="write")return IE(),1;let r=Hs(e,"--key"),n=Hs(e,"--agent-run-id"),o=Hs(e,"--status"),s=Hs(e,"--summary"),i=Hs(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!dG(o)?(IE(),1):(Ms({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var ot,Vn=l(()=>{"use strict";ot=()=>!0});var Cf,OE,Br,id=l(()=>{"use strict";Cf=m(require("node:path")),OE=require("node:url");Vn();Br=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Cf.default.resolve(t);return ot()?r===Cf.default.resolve(__filename):r===(0,OE.fileURLToPath)(e)}});var ad,qn,mG,eY,Kn=l(()=>{"use strict";ad="agent-witch.js",qn="deps.tar.gz",mG="install.sh",eY={mainScript:`app/${ad}`,depsArchive:`app/${qn}`,installShell:mG}});var DE=l(()=>{"use strict";Kn()});var HE=l(()=>{"use strict";Kn();DE()});var Fs,xf,ld,gG,$s,_e,Yn,zs,Us,Gr,If=l(()=>{"use strict";Fs=m(require("node:fs")),xf=m(require("node:path"));HE();U();ld="install-version.json",gG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$s=(e=E())=>xf.default.join(e,ld),_e=(e=E())=>{let t=$s(e);if(!Fs.default.existsSync(t))return null;try{let r=JSON.parse(Fs.default.readFileSync(t,"utf8"));return!gG(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Yn=(e,t=E())=>{let r=$s(t);Fs.default.mkdirSync(xf.default.dirname(r),{recursive:!0}),Fs.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},zs=(e=E())=>_e(e)?.bundleVersion??"186",Us=(e,t)=>{let r=_e(e);if(r!==null)return r;let n={bundleVersion:"186",appOrigin:t,updatedAt:new Date().toISOString()};return Yn(n,e),n},Gr=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var FE,Vr,Of,Nf,Mf,cd,bt,qr,jf=l(()=>{"use strict";FE=require("node:crypto"),Vr=m(require("node:fs")),Of=m(require("node:path"));U();Nf="self-update-log.ndjson",Mf=100,cd=(e=E())=>{let t=O(),r=t.installDir===e?t.logsDir:Un({installDir:e,profileEmail:t.profileEmail});return Of.default.join(r,Nf)},bt=(e,t=E())=>{let r={id:(0,FE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=cd(t);Vr.default.mkdirSync(Of.default.dirname(n),{recursive:!0});let o=Vr.default.existsSync(n)?Vr.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Mf+1)),JSON.stringify(r)];return Vr.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},qr=(e=20,t=E())=>{let r=cd(t);if(!Vr.default.existsSync(r))return[];let n=Vr.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var Df,yY,Hf=l(()=>{"use strict";Kn();Df="deps",yY=`${"app"}/${qn}`});var $E=l(()=>{"use strict";Hf()});var zE,cr,Kr,UE,Ff,$f,BE=l(()=>{"use strict";zE=require("node:child_process"),cr=m(require("node:fs")),Kr=m(require("node:path"));Kn();Hf();UE=e=>Kr.default.join(e,"app",Df),Ff=e=>{let t=Kr.default.join(e,"app"),r=Kr.default.join(t,qn);cr.default.existsSync(r)&&(cr.default.rmSync(UE(e),{recursive:!0,force:!0}),cr.default.mkdirSync(t,{recursive:!0}),(0,zE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),cr.default.rmSync(r,{force:!0}))},$f=e=>{cr.default.rmSync(Kr.default.join(e,"node_modules"),{recursive:!0,force:!0}),cr.default.rmSync(Kr.default.join(e,"package.json"),{force:!0}),cr.default.rmSync(Kr.default.join(e,"package-lock.json"),{force:!0})}});var GE=l(()=>{"use strict";$E();BE()});var Ht,dd,VE=l(()=>{"use strict";Ht="https://www.agentwitch.com",dd="wss://www.agentwitch.com/api/agent-witch/ws"});var Bs,Ft,qE=l(()=>{"use strict";Bs="127.0.0.1",Ft=`http://${Bs}:43347`});var $t=l(()=>{"use strict";VE();qE()});var Gs,ud,KE,Uf,fG,JE,Vf,YE,st,Vs,qs,qf,Bf,Gf,Ks,Kf,Jf,Yf,Xn=l(()=>{"use strict";Gs=m(require("node:fs")),ud=m(require("node:path")),KE="active-writer-work.json",Uf=new Set,fG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JE=e=>e.profileEmail===null?ud.default.join(e.installDir,KE):ud.default.join(e.installDir,"profiles",e.profileEmail,KE),Vf=e=>{let t=JE(e);if(!Gs.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Gs.default.readFileSync(t,"utf8"));return!fG(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},YE=(e,t)=>{let r=JE(e);Gs.default.mkdirSync(ud.default.dirname(r),{recursive:!0}),Gs.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},st=e=>Vf(e).activeCount>0,Vs=e=>{let t=Vf(e);YE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},qs=e=>{let t=Vf(e),r=Math.max(0,t.activeCount-1);if(YE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let n of Uf)n()},qf=e=>(Uf.add(e),()=>{Uf.delete(e)}),Bf=null,Gf=null,Ks=e=>{Bf=e},Kf=e=>{Gf=e},Jf=()=>{let e=Bf;return Bf=null,e},Yf=()=>{let e=Gf;return Gf=null,e}});var we,Xf=l(()=>{"use strict";we=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Zn,pd,Js,Zf=l(()=>{"use strict";Zn="qwen2.5:7b",pd="nomic-embed-text",Js="Install Ollama from https://ollama.com/download"});var Ys,XE,Qf=l(()=>{"use strict";Zf();Ys=()=>`
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
    echo "Ollama is missing. ${Js}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Js}" >&2
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
  agent_witch_ensure_ollama_model "${Zn}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${pd}" "\${pull_log}"
}
`,XE=()=>`
${Ys()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var ZE,hG,md,eh=l(()=>{"use strict";ZE=require("node:child_process");U();Qf();hG=e=>new Promise(t=>{let r=(0,ZE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:E()}}),n=[];r.stdout.on("data",o=>{n.push(o)}),r.stderr.on("data",o=>{n.push(o)}),r.on("error",o=>{t({exitCode:1,output:o.message})}),r.on("close",o=>{t({exitCode:o??1,output:Buffer.concat(n).toString("utf8").trim()})})}),md=async(e=hG)=>{let t=`${Ys()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var dr,gd,QE,yG,eL,eo,SG,AG,bG,Qn,Jr,Yr,tL=l(()=>{"use strict";dr=m(require("node:fs")),gd=m(require("node:path"));GE();Q();U();Kn();$t();If();Xn();Xf();jf();eh();QE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yG=e=>{let t=rt(e),r=t===null?O():O(t);if(!dr.default.existsSync(r.configPath))return null;try{let n=JSON.parse(dr.default.readFileSync(r.configPath,"utf8"));return!QE(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},eL=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!QE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},eo=async e=>(await eL(e))?.bundleVersion??null,SG=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=gd.default.join(t,r);dr.default.mkdirSync(gd.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());dr.default.writeFileSync(o,s),r.endsWith(".js")&&dr.default.chmodSync(o,493)},AG=async()=>{ks(),await $r()},bG=(e,t)=>e!==null?we(e):t??Ht,Qn=(e,t)=>({localBundleVersion:t,...e}),Jr=async e=>{let t=E(),r=_e(t),n=r?.bundleVersion??null,o=await md();bt({event:"check_complete",ok:o.ok,message:o.message,localBundleVersion:n,remoteBundleVersion:null});let s=yG(t),i=bG(s,r?.appOrigin);if(i===null){let d=Qn({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return bt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}let a=await eL(i);if(a===null){let d=Qn({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return bt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}if(!(e?.force===!0||Gr(n,a.bundleVersion))){let d=Qn({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},n);return bt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),d}try{for(let b of a.scripts)await SG(i,t,b);let d=gd.default.join(t,ad);dr.default.existsSync(d)&&dr.default.rmSync(d,{force:!0}),Ff(t),$f(t),Yn({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=O(rt(t));if(st(p)){let b=Qn({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return bt({event:"update_applied",ok:!0,message:b.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),b}await AG();let f=Qn({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return bt({event:"update_applied",ok:!0,message:f.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),f}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",f=Qn({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},n);return bt({event:"update_failed",ok:!1,message:p,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),f}},Yr=()=>{let e=E();return{local:_e(e),logs:qr(20,e)}}});var rL={};ht(rL,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>ld,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Js,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>pd,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>Zn,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Nf,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Mf,appendAgentWitchSelfUpdateLog:()=>bt,buildAgentWitchEnsureOllamaShell:()=>Ys,buildAgentWitchInstallScriptOllama:()=>XE,buildAgentWitchSelfUpdateStatus:()=>Yr,ensureAgentWitchInstallVersionRecorded:()=>Us,ensureAgentWitchOllamaInstalled:()=>md,fetchAgentWitchRemoteInstallBundleVersion:()=>eo,isRemoteAgentWitchBundleVersionNewer:()=>Gr,readAgentWitchInstallVersion:()=>_e,readAgentWitchSelfUpdateLogs:()=>qr,resolveAgentWitchAppOriginFromWsUrl:()=>we,resolveAgentWitchHeartbeatInstallBundleVersion:()=>zs,resolveAgentWitchInstallVersionPath:()=>$s,resolveAgentWitchSelfUpdateLogPath:()=>cd,runAgentWitchSelfUpdate:()=>Jr,writeAgentWitchInstallVersion:()=>Yn});var Ue=l(()=>{"use strict";If();jf();tL();Xf();Zf();Qf();eh()});var th={};ht(th,{buildAgentWitchSelfUpdateStatus:()=>Yr,fetchAgentWitchRemoteInstallBundleVersion:()=>eo,runAgentWitchSelfUpdate:()=>Jr});var rh=l(()=>{"use strict";Ue()});function to(e){return(0,nL.createHash)("sha256").update(e.trim()).digest("hex")}var nL,nh=l(()=>{"use strict";nL=require("node:crypto")});var ro,Xs,PG,oL,oh,sL=l(()=>{"use strict";ro=m(require("node:fs")),Xs=m(require("node:path"));nh();Pe();PG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),oL=e=>{if(!ro.default.existsSync(e))return null;try{let t=JSON.parse(ro.default.readFileSync(e,"utf8"));return!PG(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:to(t.pairingToken.trim())}catch{return null}},oh=(e=E())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(oL(Xs.default.join(e,"config.json")));let o=Xs.default.join(e,Ot);if(!ro.default.existsSync(o))return t;for(let s of ro.default.readdirSync(o)){let i=Xs.default.join(o,s);ro.default.statSync(i).isDirectory()&&n(oL(Xs.default.join(i,"config.json")))}return t}});var sh,iL,fd,Zs,Qs,_G,wG,vG,aL,se,ie,hd,Pt,it=l(()=>{"use strict";sh=m(require("node:fs")),iL=m(require("node:os")),fd=m(require("node:path")),Zs={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Qs=e=>e.trim().length>0,_G=e=>{let t=fd.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},wG=()=>{let e=iL.default.homedir(),t=fd.default.join(e,".local","bin","agent");if(sh.default.existsSync(t))return t;let r=fd.default.join(e,".local","bin","cursor-agent");return sh.default.existsSync(r)?r:Zs.cursorCommand},vG=e=>{let t=e.trim();return!Qs(t)||t===Zs.cursorCommand?wG():t},aL=(e,t)=>_G(e)?t:["agent",...t],se=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ie=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:Qs(t)?t.trim():Zs.claudeCommand,codexCommand:Qs(r)?r.trim():Zs.codexCommand,cursorCommand:vG(n),antigravityCommand:Qs(o)?o.trim():Zs.antigravityCommand}},hd=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:aL(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Pt=(e,t,r,n)=>{let o=t.trim();if(!Qs(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:aL(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",o])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var ur,WG,no,EG,oo,yd=l(()=>{"use strict";ur=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,WG=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([n,o])=>{if(typeof o!="object"||o===null)return{name:n,total:0};let s=o;return{name:n,total:ur(s.inputTokens)+ur(s.outputTokens)+ur(s.cacheReadInputTokens)+ur(s.cacheCreationInputTokens)}})].sort((n,o)=>o.total-n.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},no=e=>{let t=e.trim(),r=t.indexOf("{"),n=t.lastIndexOf("}");if(r<0||n<=r)return null;let o;try{o=JSON.parse(t.slice(r,n+1))}catch{return null}if(typeof o!="object"||o===null)return null;let s=o;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=ur(a.input_tokens)+ur(a.cache_creation_input_tokens)+ur(a.cache_read_input_tokens),d=ur(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:WG(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},EG=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),oo=(e,t)=>{let r=no(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??EG(r)}}});var ih,LG,RG,ah,lh=l(()=>{"use strict";ih=e=>e.toLocaleString("en-US"),LG=e=>e<.01?e.toFixed(4):e.toFixed(3),RG=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${LG(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${ih(e.inputTokens)} in / ${ih(e.outputTokens)} out (${ih(e.totalTokens)} total)`,t].join(`
`)},ah=(e,t)=>{if(t===void 0)return e;let r=RG(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var Sd,ch=l(()=>{"use strict";Sd={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Xr,dh,Ad,uh=l(()=>{"use strict";ch();Xr="auto",dh=e=>({value:Xr,label:`Auto (${Sd[e]})`}),Ad={anthropic:[dh("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[dh("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[dh("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var so,ei,ph,ti=l(()=>{"use strict";ch();uh();so=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Xr))return t},ei=(e,t)=>{let r=so(t);return r===void 0?Sd[e]:r},ph=e=>{let t=so(e);return t===void 0?Xr:t}});var bd,kG,CG,Pd,lL=l(()=>{"use strict";bd={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},kG=e=>{let t=bd[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?bd["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?bd["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?bd["gemini-2.0-flash"]:null},CG=(e,t,r)=>{let n=kG(e);if(n===null)return null;let o=t/1e6*n.inputUsd,s=r/1e6*n.outputUsd;return o+s},Pd=e=>{let t=CG(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var io,TG,xG,IG,_d,cL=l(()=>{"use strict";lL();io=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),TG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=io(r.input_tokens),o=io(r.output_tokens);return n===0&&o===0?null:Pd({provider:"anthropic",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},xG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=io(r.prompt_tokens),o=io(r.completion_tokens);return n===0&&o===0?null:Pd({provider:"openai",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},IG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let n=io(r.promptTokenCount),o=io(r.candidatesTokenCount);return n===0&&o===0?null:Pd({provider:"google",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},_d=(e,t,r)=>e==="anthropic"?TG(t,r):e==="openai"?xG(t,r):IG(t,r)});var OG,mh,NG,MG,jG,DG,HG,gh,fh=l(()=>{"use strict";ti();cL();OG=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let n=r;return n.type==="text"&&typeof n.text=="string"?n.text:""}).join(""):""},mh=(e,t,r)=>{let n=r?.trim()??"";return n.length>0?n:ei(e,t.model)},NG=async e=>{let t=mh("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Anthropic API error (${String(r.status)})`};let o=OG(n);o.length>0&&e.onChunk?.(o);let s=_d("anthropic",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},MG=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.message;return typeof n?.content=="string"?n.content:""},jG=async e=>{let t=mh("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`OpenAI API error (${String(r.status)})`};let o=MG(n);o.length>0&&e.onChunk?.(o);let s=_d("openai",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},DG=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.content?.parts;return Array.isArray(n)?n.map(o=>{if(typeof o!="object"||o===null)return"";let s=o.text;return typeof s=="string"?s:""}).join(""):""},HG=async e=>{let t=mh("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,n=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),o=await n.json().catch(()=>null);if(!n.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Google API error (${String(n.status)})`};let s=DG(o);s.length>0&&e.onChunk?.(s);let i=_d("google",o,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},gh=async e=>{try{return e.provider==="anthropic"?await NG(e):e.provider==="openai"?await jG(e):await HG(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Fe,ri=l(()=>{"use strict";Fe=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var dL,FG,wd,hh=l(()=>{"use strict";dL=m(require("node:path")),FG="writer-api-secrets.json",wd=e=>dL.default.join(e,FG)});var yh,uL,$G,pr,Oe,mr=l(()=>{"use strict";yh=m(require("node:fs"));ti();hh();uL=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$G=e=>{if(!uL(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,n=so(r);return{apiKey:t,...n!==void 0?{model:n}:{}}},pr=e=>{let t=wd(e);if(!yh.default.existsSync(t))return{};try{let r=JSON.parse(yh.default.readFileSync(t,"utf8"));if(!uL(r))return{};let n={},o=["anthropic","openai","google"];for(let s of o){let i=$G(r[s]);i!==null&&(n[s]=i)}return n}catch{return{}}},Oe=(e,t)=>pr(e)[t]??null});var ve,ni=l(()=>{"use strict";ve=e=>e==="api"?"api":"cli"});var pL,me,Zr,zt=l(()=>{"use strict";pL=m(require("node:path"));ri();mr();ni();me=e=>pL.default.dirname(e),Zr=(e,t)=>{if(ve(e.writerExecutionBackend)!=="api")return!1;let r=Fe(t);if(r===null)return!1;let n=me(e.layout.configPath),o=Oe(n,r);return o!==null&&o.apiKey.length>0}});var oi,Sh=l(()=>{"use strict";lh();fh();ri();mr();zt();oi=async(e,t,r,n)=>{let o=r.trim();if(o.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Fe(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=me(e.layout.configPath),a=Oe(i,s);if(a===null){let d=Object.keys(pr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await gh({provider:s,secret:a,prompt:o,onChunk:n});return{exitCode:c.exitCode,output:ah(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var mL,ao,Ah=l(()=>{"use strict";mL=require("node:child_process");it();yd();Sh();zt();ao=(e,t,r)=>new Promise(n=>{if(!se(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Zr(e,t)){oi(e,t,r).then(n);return}let o=Pt(t,r,ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,mL.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=oo(i.join("")),p=a.join("").trim(),f=[d.output.trim(),p].filter(b=>b.length>0).join(`
`);n({exitCode:c??-1,output:f})}),s.on("error",c=>{n({exitCode:-1,output:c.message})})})});var gL=l(()=>{"use strict"});var fL=l(()=>{"use strict";lh();Ah();fh();gL();mr();zt()});var hL,yL,SL,AL=l(()=>{"use strict";hL="claude",yL="codex",SL="cursor"});var bL,zG,bh,si,vd=l(()=>{"use strict";bL=m(require("node:path"));$t();St();zG="ws://localhost:3000/api/agent-witch/ws",bh=e=>e.replace(/\/$/,""),si=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return bh(t);let r=bL.default.basename(e.installDir);if(r===_s.production)return dd;let n=e.configWsUrl?.trim()??"";return r===_s.localhost?n.length>0?bh(n):zG:n.length>0?bh(n):dd}});var BG,Ph,_h=l(()=>{"use strict";AL();vd();ni();BG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ph=e=>{if(!BG(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=si({installDir:e.layout.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??hL,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??yL,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??SL,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:n,workspace:o,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:ve(t.writerExecutionBackend),layout:e.layout}}}});var wh,vh,Wh=l(()=>{"use strict";wh=m(require("node:fs"));U();_h();vh=e=>{let t=O(e);if(!wh.default.existsSync(t.configPath))return null;try{let r=JSON.parse(wh.default.readFileSync(t.configPath,"utf8")),n=Ph({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!n.ok){if(n.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return n.config}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}}});var ii,PL=l(()=>{"use strict";ii=(e,t,r)=>{let n=r?.trim()??"",o=e?.trim()??"";return n.length>0?o.length>0?o:null:o.length>0?o:t()}});var Eh,GG,Lh,_L=l(()=>{"use strict";Eh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GG=e=>{if(!Eh(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",n=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||n.length===0||!Array.isArray(e.entries))return null;let o=e.entries.flatMap(s=>{if(!Eh(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(f=>{if(!Eh(f))return[];let b=typeof f.itemKey=="string"?f.itemKey.trim():"",h=typeof f.relativePath=="string"?f.relativePath:"",y=typeof f.contentSha256=="string"?f.contentSha256.trim():"";return b.length===0||y.length===0?[]:[{itemKey:b,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:n,entries:o}},Lh=GG});var wL,VG,Wd,Rh=l(()=>{"use strict";wL=m(require("node:path")),VG=(e,t)=>{let r=t.trim();return wL.default.join(e,"components","store",r.slice(0,2),r)},Wd=VG});var vL,qG,kh,WL=l(()=>{"use strict";vL=m(require("node:fs"));Rh();qG=(e,t)=>{let r=[];for(let n of t.entries)for(let o of n.items){let s=Wd(e.installDir,o.contentSha256);vL.default.existsSync(s)||r.push(o.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},kh=qG});var ai,lo,KG,Ch,JG,Th,xh=l(()=>{"use strict";ai=m(require("node:fs")),lo=m(require("node:path"));Rh();KG=(e,t)=>lo.default.join(e.installDir,"runs",t,"overlay"),Ch=(e,t)=>lo.default.join(KG(e,t),".cursor"),JG=(e,t,r)=>{let n=r.entries.filter(s=>s.scope==="run");if(n.length===0)return{ok:!0};let o=Ch(e,t);ai.default.mkdirSync(o,{recursive:!0});for(let s of n)for(let i of s.items){let a=Wd(e.installDir,i.contentSha256);if(!ai.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?lo.default.join(o,c):lo.default.join(o,i.itemKey);ai.default.mkdirSync(lo.default.dirname(d),{recursive:!0}),ai.default.copyFileSync(a,d)}return{ok:!0}},Th=JG});var Ih,EL,YG,li,LL=l(()=>{"use strict";Ih=m(require("node:fs")),EL=m(require("node:path")),YG=(e,t)=>{let r=EL.default.join(e.installDir,"runs",t);Ih.default.existsSync(r)&&Ih.default.rmSync(r,{recursive:!0,force:!0})},li=YG});var XG,Oh,RL=l(()=>{"use strict";xh();XG=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let n=Ch(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:n}},Oh=XG});var Nh,ZG,QG,e2,t2,r2,H,kL=l(()=>{"use strict";Nh=m(require("node:fs"));vd();U();ni();ZG="claude",QG="codex",e2="cursor",t2="agy",r2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=O();if(!Nh.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Nh.default.readFileSync(e.configPath,"utf8"));if(!r2(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=si({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,writerExecutionBackend:ve(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:ZG,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:QG,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e2,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:t2,pairingToken:s,layout:e}}catch{return null}}});var Ed,CL,TL=l(()=>{"use strict";Ed=m(require("node:fs"));hh();CL=(e,t)=>{let r=wd(e);Ed.default.mkdirSync(e,{recursive:!0}),Ed.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Ed.default.chmodSync(r,384)}catch{}}});var Ld,xL,Mh=l(()=>{"use strict";Ld=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),n=t.slice(-4);return`${r}${"\u2022".repeat(12)}${n}`},xL=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Ld(t)}});var ci,n2,jh,Dh,IL=l(()=>{"use strict";ci=m(require("node:fs"));mr();TL();Mh();ti();zt();n2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jh=(e,t,r,n)=>{let o=e[t],s=r?.trim()??"",i=xL(s,o?.apiKey)?"":s,a=i.length>0?i:o?.apiKey;if(a===void 0||a.length===0)return e;let c=n!==void 0?so(n):o?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Dh=e=>{let t=me(e.configPath),r={};if(ci.default.existsSync(e.configPath))try{let o=JSON.parse(ci.default.readFileSync(e.configPath,"utf8"));n2(o)&&(r={...o})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,ci.default.mkdirSync(t,{recursive:!0}),ci.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let n=jh(jh(jh(pr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);CL(t,n)}});var Hh,OL=l(()=>{"use strict";Hh={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var Fh,NL=l(()=>{"use strict";ri();mr();zt();zt();Fh=(e,t)=>{if(Zr(e,t))return!1;let r=Fe(t);if(r===null)return!1;let n=me(e.layout.configPath),o=Oe(n,r);return o===null||o.apiKey.trim().length===0}});var ML,$h,zh=l(()=>{"use strict";ML=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let n=e.readConfig(r);return n===null?[]:[n]})},$h=async e=>{let t=ML(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=ML(e);if(o.length>0){r(o);return}setTimeout(n,e.pollIntervalMs)};n()}))}});var o2,Uh,jL=l(()=>{"use strict";Q();Wh();zh();o2=1e4,Uh=()=>$h({listProfileEmails:Zc,readConfig:vh,pollIntervalMs:o2,logWaiting:e=>{console.error(e)}})});var ae=l(()=>{"use strict";Ah();fL();Wh();vd();PL();_L();WL();xh();LL();RL();ni();kL();IL();mr();zt();Mh();ti();OL();Sh();zt();NL();ri();mr();jL();_h();zh()});var Rd,DL,s2,i2,HL,kd,di,Cd,ui=l(()=>{"use strict";Rd=m(require("node:fs")),DL=m(require("node:path")),s2="wake-port.json",i2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),HL=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,kd=e=>DL.default.join(e,s2),di=e=>{let t=kd(e);if(!Rd.default.existsSync(t))return null;try{let r=JSON.parse(Rd.default.readFileSync(t,"utf8"));if(i2(r)&&HL(r.wakePort))return r.wakePort}catch{return null}return null},Cd=(e,t)=>{if(!HL(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=kd(e);Rd.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var TQ,xQ,IQ,at,FL,pi=l(()=>{"use strict";ui();Pe();ui();TQ=tt(),xQ=`${te()}-wake`,IQ=te(),at=()=>{let e=E(),t=di(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return tt()},FL=e=>{let t=E();di(t)===null&&Cd(t,e)}});var $L=l(()=>{"use strict";nh();Q();sL();ae();pi()});var Bh,mi,gi,zL=l(()=>{"use strict";Bh=m(require("node:os"));$L();mi=()=>{let e=Z();return{ok:!0,port:at(),hostname:Bh.default.hostname(),profileCount:e.length}},gi=()=>{let e=Z(),t=H()?.pairingToken.trim()??"",r=t.length>0?to(t):null,n=oh();return{hostname:Bh.default.hostname(),port:at(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var Gh=l(()=>{"use strict";zL()});var UL,BL,GL,Td,co=l(()=>{"use strict";UL="materialization.json",BL="backups",GL=".gitignore",Td=e=>`harness-set:${e.trim()}`});var VL,qL,xd,KL=l(()=>{"use strict";VL=m(require("node:crypto")),qL=m(require("node:fs")),xd=e=>{try{let t=qL.default.readFileSync(e);return VL.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var gr,Qr,a2,JL,Vh,YL=l(()=>{"use strict";gr=m(require("node:fs")),Qr=m(require("node:path"));KL();a2=(e,t,r,n)=>{let o=new Date().toISOString().replaceAll(":","-"),s=Qr.default.join(t,o,n);return gr.default.mkdirSync(Qr.default.dirname(s),{recursive:!0}),gr.default.copyFileSync(r,s),Qr.default.relative(e,s).replaceAll("\\","/")},JL=e=>{let t=Qr.default.join(e.repoRoot,e.repoRelativeDestination),r=xd(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let n=e.ledger.entries[e.repoRelativeDestination];if(gr.default.existsSync(t)){let o=xd(t);if(o===r)return{kind:"skipped_unchanged"};if(!(n!==void 0&&n.componentId===e.componentId)&&o!==null){let i=a2(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return gr.default.mkdirSync(Qr.default.dirname(t),{recursive:!0}),gr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return gr.default.mkdirSync(Qr.default.dirname(t),{recursive:!0}),gr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},Vh=e=>{let t=xd(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var qh,XL,Id,Kh=l(()=>{"use strict";qh=m(require("node:fs"));co();XL=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Id=e=>{if(!qh.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(qh.default.readFileSync(e,"utf8"));if(XL(t)&&t.version===1&&XL(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var fr,Od,ZL,QL=l(()=>{"use strict";fr=m(require("node:fs")),Od=m(require("node:path"));co();ZL=e=>{let t=new Set(e.setSlugs.map(s=>Td(s))),r=[],n=[],o={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){o[s]=i;continue}let a=Od.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Od.default.join(e.repoRoot,i.backupPath);fr.default.existsSync(c)?(fr.default.mkdirSync(Od.default.dirname(a),{recursive:!0}),fr.default.copyFileSync(c,a),n.push(s)):fr.default.existsSync(a)&&fr.default.rmSync(a,{force:!0})}else fr.default.existsSync(a)&&fr.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:o},summary:{removedPaths:r,restoredPaths:n}}}});var Jh,Nd,Yh=l(()=>{"use strict";Jh=m(require("node:path"));co();Nd=e=>({ledgerFilePath:Jh.default.join(e.metaDirPath,UL),backupsDirPath:Jh.default.join(e.metaDirPath,BL)})});var Xh,eR,tR=l(()=>{"use strict";Xh=m(require("node:path")),eR=(e,t)=>{let n=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(n.length===0)return Xh.default.posix.join("rules",e,"file");let o=n[n.length-1]??"file",s=n[0]??"rules";return Xh.default.posix.join(s,e,o)}});var Zh,rR,Qh,nR=l(()=>{"use strict";Zh=m(require("node:fs")),rR=m(require("node:path")),Qh=(e,t)=>{Zh.default.mkdirSync(rR.default.dirname(e),{recursive:!0}),Zh.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var ey,l2,Be,hi=l(()=>{"use strict";ey=m(require("node:os")),l2=e=>{let t=e.trim();return t.startsWith("~/")?`${ey.default.homedir()}${t.slice(1)}`:t==="~"?ey.default.homedir():t},Be=l2});var Md,oR,c2,sR,iR=l(()=>{"use strict";Md=m(require("node:fs")),oR=m(require("node:path"));co();zr();c2=`*
!${td}
`,sR=e=>{let t=oR.default.join(e,GL);Md.default.existsSync(t)||(Md.default.mkdirSync(e,{recursive:!0}),Md.default.writeFileSync(t,c2))}});var en,Ge,tn=l(()=>{"use strict";en=m(require("node:path"));zr();hi();Ge=e=>{let t=Be(e),r=en.default.join(t,fE);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:en.default.join(r,"rag"),memoryDirPath:en.default.join(r,hE),reportsDirPath:en.default.join(r,SE),metaFilePath:en.default.join(r,td),ragChunksFilePath:en.default.join(r,"rag",yE)}}});var _t,lR,d2,u2,$e,ty=l(()=>{"use strict";_t=m(require("node:fs")),lR=m(require("node:path"));zr();iR();tn();d2=(e,t)=>{if(_t.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};_t.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},u2=e=>{_t.default.existsSync(e.ragChunksFilePath)||_t.default.writeFileSync(e.ragChunksFilePath,"");let t=lR.default.join(e.memoryDirPath,Bn);_t.default.existsSync(t)||_t.default.writeFileSync(t,"")},$e=e=>{let t=Ge(e.projectFolderPath);return _t.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),_t.default.mkdirSync(t.ragDirPath,{recursive:!0}),_t.default.mkdirSync(t.memoryDirPath,{recursive:!0}),sR(t.metaDirPath),d2(t,e),u2(t),{ok:!0,layout:t}}});var cR,dR,uR,pR,jd,Dd=l(()=>{"use strict";cR="components",dR="store",uR="versions",pR="installed.json",jd=e=>`harness-set:${e.trim()}`});var ry,mR,Hd,ny=l(()=>{"use strict";ry=m(require("node:fs")),mR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hd=e=>{if(!ry.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(ry.default.readFileSync(e,"utf8"));if(mR(t)&&t.version===1&&mR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var yi,uo,Fd=l(()=>{"use strict";yi=m(require("node:path"));Dd();uo=e=>{let t=yi.default.join(e,cR);return{componentsRootDir:t,storeDir:yi.default.join(t,dR),versionsDir:yi.default.join(t,uR),installedFilePath:yi.default.join(t,pR)}}});var oy,gR,$d,zd,Ud=l(()=>{"use strict";oy=m(require("node:crypto")),gR=m(require("node:fs")),$d=e=>oy.default.createHash("sha256").update(e,"utf8").digest("hex"),zd=e=>{try{let t=gR.default.readFileSync(e);return oy.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var sy,fR,hR,yR=l(()=>{"use strict";sy=m(require("node:fs")),fR=m(require("node:path")),hR=(e,t)=>{sy.default.mkdirSync(fR.default.dirname(e),{recursive:!0}),sy.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var iy,ay,SR,AR=l(()=>{"use strict";iy=m(require("node:fs")),ay=m(require("node:path")),SR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),n=ay.default.join(e,r),o=ay.default.join(n,`${t.versionId}.json`);iy.default.mkdirSync(n,{recursive:!0}),iy.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`)}});var Bd,bR,PR,_R=l(()=>{"use strict";Bd=m(require("node:fs")),bR=m(require("node:path"));Ud();PR=e=>{let t=$d(e.content),r=bR.default.join(e.storeDir,t);return Bd.default.existsSync(r)||(Bd.default.mkdirSync(e.storeDir,{recursive:!0}),Bd.default.writeFileSync(r,e.content)),t}});var ly,wR,p2,Gd,cy=l(()=>{"use strict";ly=m(require("node:fs")),wR=m(require("node:path"));Dd();ny();Fd();Ud();yR();AR();_R();p2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Gd=e=>{let t=uo(e.installDir),r=jd(e.setSlug),n=String(e.setEntry.version),o=[];for(let i of e.setEntry.items){if(!p2(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=wR.default.join(e.harnessRootDir,a);if(!ly.default.existsSync(c))continue;let d=ly.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:zd(c);if(p!==null){if($d(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);PR({storeDir:t.storeDir,content:d}),o.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(o.length===0)return;SR(t.versionsDir,{version:1,componentId:r,versionId:n,items:o,createdAt:new Date().toISOString()});let s=Hd(t.installedFilePath);hR(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:n,installedAt:new Date().toISOString()}}})}});var uy,dy,vR,WR=l(()=>{"use strict";uy=m(require("node:fs"));cy();ny();Fd();dy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vR=e=>{if(!uy.default.existsSync(e.harnessManifestPath))return;let t=uo(e.installDir),r=Hd(t.installedFilePath);if(Object.keys(r.components).length>0)return;let n;try{n=JSON.parse(uy.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!dy(n)||n.version!==1||!dy(n.sets)))for(let[o,s]of Object.entries(n.sets)){if(!dy(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Gd({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:o,setEntry:{version:i,items:a}})}}});var py,ER,LR,RR=l(()=>{"use strict";py=m(require("node:fs")),ER=m(require("node:path")),LR=e=>{let t=e.componentId.replaceAll("/","_"),r=ER.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!py.default.existsSync(r))return null;try{let n=JSON.parse(py.default.readFileSync(r,"utf8"));if(typeof n=="object"&&n!==null&&n.version===1)return n}catch{return null}return null}});var Vd,qd,kR,CR=l(()=>{"use strict";Vd=m(require("node:fs")),qd=m(require("node:path"));Dd();WR();RR();Fd();Ud();kR=e=>{vR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=uo(e.layout.installDir),r=jd(e.setSlug),n=LR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(n!==null){let i=n.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=qd.default.join(t.storeDir,i.contentSha256);if(Vd.default.existsSync(a)&&zd(a)===i.contentSha256)return a}}let o=e.manifestItemPath.trim();if(o.length===0)return null;let s=o.startsWith("shared/")?qd.default.join(e.layout.harnessRootDir,o):qd.default.join(e.layout.harnessSetsDir,e.setSlug,o);if(!Vd.default.existsSync(s))return null;try{if(!Vd.default.statSync(s).isFile())return null}catch{return null}return s}});var TR,m2,g2,hr,Kd=l(()=>{"use strict";Kh();Yh();tn();TR="harness-set:",m2=e=>{let t=e.trim();if(!t.startsWith(TR))return null;let r=t.slice(TR.length).trim();return r.length>0?r:null},g2=e=>{let t=new Set;for(let r of Object.values(e.entries)){let n=m2(r.componentId);n!==null&&t.add(n)}return[...t].sort((r,n)=>r.localeCompare(n))},hr=e=>{let t=Ge(e),{ledgerFilePath:r}=Nd(t),n=Id(r);return g2(n)}});var Jd,my,Si,f2,Ut,Ai,po=l(()=>{"use strict";Jd=m(require("node:fs")),my=m(require("node:os")),Si=m(require("node:path")),f2=()=>Jd.default.realpathSync(Si.default.resolve(my.default.homedir())),Ut=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Si.default.join(my.default.homedir(),t.slice(1)):t,n;try{n=Jd.default.realpathSync(Si.default.resolve(r))}catch{return null}let o=f2();return n===o||n.startsWith(`${o}${Si.default.sep}`)?n:null},Ai=e=>{let t=Ut(e);if(t===null)return null;try{if(!Jd.default.statSync(t).isFile())return null}catch{return null}return t}});var gy,fy=l(()=>{"use strict";gy=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Xd,xR,Yd,h2,bi,hy=l(()=>{"use strict";Xd=m(require("node:fs")),xR=m(require("node:path"));co();YL();Kh();QL();Yh();tR();nR();hi();ty();CR();Kd();po();fy();Yd=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),h2=e=>{if(!Xd.default.existsSync(e))return null;try{let t=JSON.parse(Xd.default.readFileSync(e,"utf8"));if(Yd(t)&&t.version===1)return t}catch{return null}return null},bi=e=>{let t=[...new Set(e.setSlugs.map(S=>S.trim()).filter(S=>S.length>0))],r=Be(e.projectFolderPath),n=Ut(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=Xd.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=$e({projectFolderPath:n}),{ledgerFilePath:i,backupsDirPath:a}=Nd(s.layout),d=hr(n).filter(S=>!t.includes(S)),p=Id(i),f=0;if(d.length>0){let S=ZL({repoRoot:n,setSlugs:d,ledger:p});p=S.ledger,f=S.summary.removedPaths.length}if(t.length===0)return Qh(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:f,projectFolderPath:n,appliedSetSlugs:[]};let b=h2(e.layout.harnessManifestPath);if(b===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Yd(b.sets)?b.sets:{},y=0,u=0,A=0;for(let S of t){let g=h[S];if(!Yd(g))return{ok:!1,errorMessage:`Harness set "${S}" is not installed locally.`};let _=typeof g.version=="number"?String(g.version):"1",w=Td(S),W=Array.isArray(g.items)?g.items:[];for(let L of W){if(!Yd(L))continue;let R=typeof L.path=="string"?L.path.trim():"";if(R.length===0)continue;let k=gy(R);if(k===null)continue;let x=eR(S,k),D=xR.default.posix.join(".cursor",x).replaceAll("\\","/"),ee=typeof L.id=="string"?L.id.trim():"",J=kR({layout:e.layout,setSlug:S,setVersion:typeof g.version=="number"?g.version:1,manifestItemPath:R,manifestItemId:ee});if(J===null)continue;let V=JL({repoRoot:n,backupsDir:a,repoRelativeDestination:D,sourceAbsolutePath:J,componentId:w,versionId:_,ledger:p});if(V.kind==="skipped_unchanged"){u+=1;continue}if(V.kind==="backed_up_user_file"){A+=1,y+=1,p={version:1,entries:{...p.entries,[D]:Vh({componentId:w,versionId:_,sourceAbsolutePath:J,backupPath:V.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[D]:Vh({componentId:w,versionId:_,sourceAbsolutePath:J})}}}}return y===0&&u===0&&f===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Qh(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:A,removedLedgerPathCount:f,projectFolderPath:n,appliedSetSlugs:t})}});var IR,Zd,y2,S2,A2,b2,P2,_2,w2,v2,W2,Pi,Qd=l(()=>{"use strict";IR=m(require("node:crypto")),Zd=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},y2=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},S2=(e,t)=>{let r=y2(t),n=Zd(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},A2=(e,t,r)=>{let n=S2(t,r);return`shared/items/${e}/${n}`},b2=["rules","skills","commands","instructions","agents"],P2=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),_2=(e,t)=>[...e.filter(n=>n.id!==t.id),t],w2=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},v2=e=>IR.default.createHash("sha256").update(e,"utf8").digest("hex"),W2=e=>({id:e.id,kind:e.kind,title:e.title,path:A2(e.id,e.kind,e.title),contentSha256:v2(e.content)}),Pi=e=>{let t=new Date().toISOString(),r=e.existingManifest??P2(e.hostname,t),n=Zd(e.bundle.slug),o=w2(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...b2.map(d=>`sets/${n}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let f=W2(p);return{files:[...d.files,{relativePath:f.path,content:p.content}],nextItems:_2(d.nextItems,f)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var yr,OR,eu,E2,rn,yy=l(()=>{"use strict";yr=m(require("node:fs")),OR=m(require("node:os")),eu=m(require("node:path"));Qd();E2=e=>{if(!yr.default.existsSync(e))return null;try{let t=JSON.parse(yr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},rn=e=>{try{let t=E2(e.layout.harnessManifestPath),r=Pi({bundle:e.bundle,hostname:OR.default.hostname(),existingManifest:t});yr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let n of r.directories)yr.default.mkdirSync(eu.default.join(e.layout.harnessRootDir,n),{recursive:!0});for(let n of r.files){let o=eu.default.join(e.layout.harnessRootDir,n.relativePath);yr.default.mkdirSync(eu.default.dirname(o),{recursive:!0}),yr.default.writeFileSync(o,n.content)}return yr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var Sy,NR=l(()=>{"use strict";yy();hy();Sy=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=rn({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return bi({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var MR,jR=l(()=>{"use strict";MR=["rule","skill","command","instruction","agent"]});var DR,L2,R2,wt,Ay=l(()=>{"use strict";jR();DR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),L2=e=>typeof e=="string"&&MR.includes(e),R2=e=>{if(!DR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!L2(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},wt=e=>{if(!DR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=R2(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var HR,k2,by,FR=l(()=>{"use strict";HR=require("node:zlib");Ay();k2="x-agent-witch-token",by=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[k2]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let n=r.headers.get("x-content-sha256")?.trim()??"";if(n.length>0&&n!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let o=Buffer.from(await r.arrayBuffer()),s=(0,HR.gunzipSync)(o).toString("utf8"),i=JSON.parse(s),a=wt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var _y,Py,Sr,$R=l(()=>{"use strict";_y=m(require("node:fs")),Py=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sr=e=>{if(!_y.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(_y.default.readFileSync(e.harnessManifestPath,"utf8"));if(!Py(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=Py(t.sets)?t.sets:{},o=Object.entries(n).map(([s,i])=>{if(!Py(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var tu,zR=l(()=>{"use strict";tu=()=>"~"});var UR,BR,GR=l(()=>{"use strict";UR=require("node:crypto"),BR=e=>`local-${(0,UR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var wy,VR=l(()=>{"use strict";wy=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var _i,ru,vy=l(()=>{"use strict";_i=m(require("node:path")),ru=e=>{let t=_i.default.dirname(e),r=_i.default.basename(t);return r==="agents"?_i.default.basename(_i.default.dirname(t)):r}});var wi,Bt,qR,C2,T2,x2,nu,KR,Wy=l(()=>{"use strict";wi=m(require("node:fs")),Bt=m(require("node:path"));GR();VR();vy();qR=new Set(["node_modules",".git","dist","build",".next","coverage"]),C2=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},T2=(e,t)=>{let r=Bt.default.basename(t);if(e==="skill"){let n=t.split(Bt.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},x2=e=>{let t=[],r=(o,s)=>{let i;try{i=wi.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&qR.has(a.name))continue;let c=Bt.default.join(o,a.name),d=s?Bt.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;wy(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=Bt.default.join(e,o);wi.default.existsSync(s)&&r(s,o)}let n=Bt.default.join(e,"skills");return wi.default.existsSync(n)&&r(n,"skills"),t},nu=e=>{let t=x2(e);if(t.length===0)return null;let r=Bt.default.dirname(e),n=ru(e),o=C2(n),s=t.map(i=>{let a=wy(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:BR(i.absolutePath),kind:a,title:T2(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},KR=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=wi.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||qR.has(a.name))continue;let c=Bt.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var JR,Ey,I2,Ly,YR=l(()=>{"use strict";JR=m(require("node:fs")),Ey=m(require("node:path"));Wy();po();I2=e=>{let t=Ut(e.trim());if(t===null)return null;if(Ey.default.basename(t)===".cursor")return t;let r=Ey.default.join(t,".cursor");try{if(JR.default.statSync(r).isDirectory())return Ut(r)}catch{return null}return null},Ly=e=>{let t=I2(e.projectPath);if(t===null)return null;let r=nu(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var XR,O2,ou,Ry,ZR=l(()=>{"use strict";XR=m(require("node:path"));Wy();po();vy();O2=5,ou=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Ry=e=>{let t=Ut(e.scanRoot.trim());if(t===null)return ou(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of KR(t,O2,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=Ut(s);if(i===null)continue;let a=ru(i);ou(e.response,"folder",{cursorDir:i,groupName:a,repoPath:XR.default.dirname(i)});let c=nu(i);c!==null&&(r.push(c),ou(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return ou(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var QR,ek,tk=l(()=>{"use strict";QR=m(require("node:path")),ek=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:QR.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var Re,rk,ky,N2,Cy,Ty,su,xy,vi,nk=l(()=>{"use strict";Re=m(require("node:fs")),rk=m(require("node:os")),ky=m(require("node:path"));Qd();cy();po();tk();N2=e=>{if(!Re.default.existsSync(e))return null;try{let t=JSON.parse(Re.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Cy=e=>{let t=e.hostname??rk.default.hostname(),r=N2(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let f=Ai(p.sourcePath);if(f===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let b=Re.default.readFileSync(f,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:b,setSlugs:[i.slug]})}let d=Pi({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)o.add(p);for(let p of d.files)s.push(p),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Re.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)Re.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=ky.default.join(e.layout.harnessRootDir,i.relativePath);Re.default.mkdirSync(ky.default.dirname(a),{recursive:!0}),Re.default.writeFileSync(a,i.content)}Re.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=Zd(i.slug),d=r.sets[c];d!==void 0&&Gd({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},Ty="reveal-cache.json",su=(e,t)=>{Re.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Re.default.writeFileSync(`${e.harnessRootDir}/${Ty}`,`${JSON.stringify(t,null,2)}
`)},xy=e=>{let t=`${e.harnessRootDir}/${Ty}`;Re.default.existsSync(t)&&Re.default.unlinkSync(t)},vi=e=>{let t=`${e.harnessRootDir}/${Ty}`;if(!Re.default.existsSync(t))return null;try{let r=JSON.parse(Re.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return ek(r)}catch{return null}return null}});var nn=l(()=>{"use strict";hy();NR();fy();yy();FR();Ay();Qd();$R();zR();YR();po();ZR();nk()});var Iy,ok=l(()=>{"use strict";nn();Pe();Iy=e=>{let t=O(e.profileEmail);return rn({bundle:e.bundle,layout:t})}});var sk=l(()=>{"use strict";ok();nn()});var M2,ik,j2,ak,on,iu,lk=l(()=>{"use strict";M2=["agentwitch.com","www.agentwitch.com"],ik=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,j2=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},ak=e=>{let t=j2(e);return!!(M2.includes(t)||ik.test(e.trim().toLowerCase()))},on=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return ak(r)?ik.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},iu=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:on(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Wi=l(()=>{"use strict";lk()});var Gt,Ei=l(()=>{"use strict";Gt=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Li,ck=l(()=>{"use strict";sk();Wi();Ei();Li=e=>{if(!Gt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=wt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!on(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=Iy({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}}});var Oy=l(()=>{"use strict";ck()});var D2,mo,Ny=l(()=>{"use strict";D2=e=>e==="hourly"||e==="daily"||e==="weekdays",mo=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!D2(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Ri,au,dk,uk,My,lt,lu,cu,du,uu,pu=l(()=>{"use strict";Ri=m(require("node:fs")),au=m(require("node:path"));Ny();dk="automations.json",uk=e=>e.profileEmail!==null?au.default.join(e.installDir,"profiles",e.profileEmail,dk):au.default.join(e.installDir,dk),My=()=>({version:1,automations:[]}),lt=e=>{let t=uk(e);if(!Ri.default.existsSync(t))return My();try{let r=JSON.parse(Ri.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?My():{version:1,automations:r.automations.flatMap(o=>{let s=mo(o);return s!==null?[s]:[]})}}catch{return My()}},lu=(e,t)=>{let r=uk(e);Ri.default.mkdirSync(au.default.dirname(r),{recursive:!0}),Ri.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},cu=(e,t)=>{lu(e,{version:1,automations:t})},du=(e,t)=>{let n=lt(e).automations.filter(o=>o.id!==t.id);lu(e,{version:1,automations:[...n,t]})},uu=(e,t)=>lt(e).automations.find(r=>r.id===t)??null});var Ne,Ar=l(()=>{"use strict";Ne="x-agent-witch-token"});var Y,sn,jy,ki,Dy,H2,Hy,Ci,Ti,Fy,xi=l(()=>{"use strict";Ar();Ue();Y=e=>{let t=we(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},sn=e=>({[Ne]:e,"Content-Type":"application/json"}),jy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:sn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},ki=async(e,t,r,n,o)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:sn(e.pairingToken),body:JSON.stringify({exitCode:r,output:n,...typeof o?.estimateSeconds=="number"?{estimateSeconds:o.estimateSeconds}:{},...typeof o?.actualSeconds=="number"?{actualSeconds:o.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Dy=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:sn(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},H2=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let n of t.projects){if(typeof n!="object"||n===null)continue;let o=n,s=typeof o.id=="string"?o.id.trim():"",i=typeof o.name=="string"?o.name.trim():"",a=typeof o.folderPath=="string"?o.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},Hy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:sn(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n;if(o.ok!==!0||typeof o.project!="object")return null;let s=o.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Ci=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:sn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return H2(r)}catch{return null}},Ti=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:sn(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},Fy=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:sn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var an,pk,mk,F2,$y,gk,zy=l(()=>{"use strict";an=m(require("node:fs")),pk=m(require("node:path")),mk=e=>pk.default.join(e.harnessRootDir,"projects-registry.json"),F2=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),$y=e=>{let t=mk(e);if(!an.default.existsSync(t))return[];try{let r=JSON.parse(an.default.readFileSync(t,"utf8"));return F2(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string").map(n=>({id:n.id,name:n.name,projectFolderPath:n.projectFolderPath,addedAt:typeof n.addedAt=="string"?n.addedAt:new Date().toISOString(),...typeof n.cloudProjectId=="string"&&n.cloudProjectId.length>0?{cloudProjectId:n.cloudProjectId}:{}})):[]}catch{return[]}},gk=e=>{let t=mk(e);if(!an.default.existsSync(t))return;let r=`${t}.migrated`;if(an.default.existsSync(r)){an.default.unlinkSync(t);return}an.default.renameSync(t,r)}});var fk,$2,z2,hk,yk=l(()=>{"use strict";hi();fk=e=>Be(e),$2=e=>new Set(e.map(t=>fk(t.folderPath))),z2=e=>new Set(e.map(t=>t.id)),hk=(e,t)=>{let r=$2(t),n=z2(t),o=[],s=new Set;for(let i of e){let a=fk(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&n.has(i.cloudProjectId)||(s.add(a),o.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return o}});var Uy,By=l(()=>{"use strict";xi();zy();yk();Uy=async(e,t)=>{let r=$y(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let n=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let o=await Ci(n);if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=hk(r,o),i=r.length-s.length,a=0,c=0;for(let d of s)await Hy(n,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&gk(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var Gy,ln,mu=l(()=>{"use strict";Gy=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),ln=(e,t)=>e.find(r=>r.id===t)??null});var go,gu=l(()=>{"use strict";xi();By();mu();go=async(e,t)=>{t!==void 0&&await Uy(t,e);let r=Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let n=await Ci(r);if(n===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let o=Gy(n);return{ok:!0,projects:o,message:o.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${o.length} project${o.length===1?"":"s"} from Agent Witch Console.`}}});var Sk=l(()=>{"use strict"});var ke,Ak,U2,B2,G2,V2,fo,Vy=l(()=>{"use strict";ke=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ak=(e,t)=>e.length===0?`<p class="empty">${ke(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${ke(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${ke(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,U2=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,B2=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${ke(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,G2=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?B2(e.project):U2();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(n=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${ke(n.slug)}"${t.size===0||t.has(n.slug)?" checked":""} />
            <span><strong>${ke(n.name)}</strong> <span class="muted mono">(${ke(n.slug)})</span></span>
          </label>
          <p class="muted">${n.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${ke(e.project.id)}" />
        <p class="field-label">Installed</p>
        <p class="lede">Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.</p>
        ${r}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`},V2=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${ke(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${ke(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},fo=e=>{let t=e.flashError?`<div class="alert-error">${ke(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ke(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},n=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${ke(c)}</a>`,o=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=G2({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=Ak(o,"No workflows installed for this project yet."):e.activeTab==="agents"?i=Ak(s,"No agents installed for this project yet."):i=V2({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${ke(e.project.name)}</h1>
      <p class="muted mono">${ke(e.project.projectFolderPath)}</p>
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
    </section>`}});var q2,K2,bk,Pk=l(()=>{"use strict";nn();Ar();q2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),K2=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Ne]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();return!q2(n)||n.ok!==!0||!Array.isArray(n.bundles)?null:n.bundles.flatMap(o=>{let s=wt(o);return s===null?[]:[s]})}catch{return null}},bk=K2});var _k,qy,wk=l(()=>{"use strict";ae();nn();Vy();gu();Pk();mu();Kd();xi();_k=e=>({kind:"page",title:e.project.name,body:fo({project:e.project,installed:Sr(e.layout),linkedSetSlugs:hr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),qy=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let n=await go(r,e.layout),o=ln(n.projects,t);if(o===null)return{kind:"not_found"};let s=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await bk(s,o.id);if(i===null)return _k({layout:e.layout,project:o,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=Sy({layout:e.layout,projectFolderPath:o.projectFolderPath,bundles:i});if(!a.ok)return _k({layout:e.layout,project:o,errorMessage:a.errorMessage});let c=s===null?!1:await Ti(s,o.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(o.id)}&${d.toString()}`}}});var J2,Ky,vk=l(()=>{"use strict";J2=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,Ky=J2});var Wk,Ek,Y2,X2,fu,hu,Lk=l(()=>{"use strict";Wk=require("node:child_process"),Ek=require("node:util"),Y2=(0,Ek.promisify)(Wk.execFile),X2=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},fu=async(e,t)=>{try{let{stdout:r}=await Y2("git",t,{cwd:e,env:X2(),maxBuffer:1048576});return r.trim()}catch{return null}},hu=async e=>{let t=await fu(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await fu(e,["rev-parse","--abbrev-ref","HEAD"]),n=await fu(e,["status","--porcelain"]),o=await fu(e,["diff","--shortstat","HEAD"]),s=n===null||n.length===0?0:n.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:o===null||o.length===0?null:o}}});var Jy,Rk=l(()=>{"use strict";Jy=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",n=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,o=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${n}; ${o}; ${s}; ${i.join("; ")}.`}});var Z2,Yy,kk=l(()=>{"use strict";Z2=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",n=r.length>0?r:t.length>0?t:"Lesson from completed run";return n.length<=280?n:`${n.slice(0,277)}\u2026`},Yy=Z2});var Q2,Xy,Ck=l(()=>{"use strict";Ar();Q2=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Ne]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},Xy=Q2});var Tk,br,xk=l(()=>{"use strict";Tk=require("node:child_process"),br=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,n=(0,Tk.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return n.length>0?n:null}catch{return null}}});var Ik=l(()=>{"use strict";gu()});var Ii,Ok=l(()=>{"use strict";Ar();Ii=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Ne]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var ct=l(()=>{"use strict";gu();mu();Sk();hi();ty();wk();Kd();vk();Lk();Rk();kk();Ck();xk();Ik();Ok();By();zy();xi()});var yu,Oi,Nk,Zy,cn,Qy=l(()=>{"use strict";yu=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},Oi=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=yu(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},Nk=e=>e>=1&&e<=5,Zy=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return yu(t,"UTC")},cn=e=>{let t=e.from??new Date,r=yu(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Oi(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=Oi(r,e.timeZone,n,0),s=yu(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?Oi(Zy(r),e.timeZone,n,0):o;if(!i&&Nk(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=Zy(a),Nk(a.weekday))return Oi(a,e.timeZone,n,0);return Oi(Zy(r),e.timeZone,n,0)}});var Mk,eS,Vt,tS=l(()=>{"use strict";Mk=require("node:crypto");ae();ct();Qy();pu();eS=!1,Vt=async e=>{if(eS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=uu(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};eS=!0;let o=(0,Mk.randomUUID)();try{let s=await ao(t,"claude-cli",n.prompt);await Fy(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=cn({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return du(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{eS=!1}}});var Su,jk=l(()=>{"use strict";ae();tS();pu();Su=async()=>{let e=H();if(e===null)return;let t=lt(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await Vt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var Ni=l(()=>{"use strict";pu();jk();tS();Qy()});var Dk=l(()=>{"use strict";Ni()});var Hk=l(()=>{"use strict";Ny()});var Fk=l(()=>{"use strict";Hk()});var rS=l(()=>{"use strict";Ni()});var e5,t5,Mi,nS=l(()=>{"use strict";Dk();Fk();rS();Pe();e5=e=>e!==void 0&&e.trim().length>0?O(e.trim()):O(),t5=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??cn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??cn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Mi=e=>{let t=e5(e.profileEmail),r=lt(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=mo(s);return i!==null?[t5(i,n.get(i.id))]:[]});return cu(t,o),{ok:!0,writtenCount:o.length}}});var oS=l(()=>{"use strict";Ni()});var $k=l(()=>{"use strict";ae()});var zk=l(()=>{"use strict";nS();oS();rS();$k()});var Uk,ji,Di,Hi,Bk=l(()=>{"use strict";Uk=m(require("node:os"));zk();Wi();Ei();ji=e=>{if(!Gt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!on(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=Mi({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},Di=async e=>{if(!Gt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:on(t)?Vt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Hi=()=>{let e=H(),t=e!==null?lt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Uk.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var sS=l(()=>{"use strict";Bk()});var Au=l(()=>{"use strict";Q()});var bu=l(()=>{"use strict";Q()});var Pu,Vk,qk,Gk,r5,n5,ho,iS=l(()=>{"use strict";Pu=m(require("node:fs")),Vk=m(require("node:os")),qk=m(require("node:path"));Au();bu();ui();Pe();Gk=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},r5=e=>qk.default.join(Vk.default.homedir(),"Library","LaunchAgents",`${e}.plist`),n5=async e=>Pu.default.existsSync(r5(e))?(await be(e)).ok:!1,ho=async(e=E())=>{let t=Pu.default.existsSync(kd(e)),r=!Pu.default.existsSync(Nt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let n=di(e);if(n===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await Gk(n))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${te(e)}-wake`;await n5(i)&&s.push(i);for(let c of Z(e))(await be(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await Gk(n);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var Kk=l(()=>{"use strict";Q()});var yo,Fi=l(()=>{"use strict";yo="connection-health.json"});var dn,_u,o5,$i,ge,aS,wu,Ce,vu=l(()=>{"use strict";dn=m(require("node:fs")),_u=m(require("node:path"));Fi();o5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$i=e=>e.profileEmail===null?_u.default.join(e.installDir,yo):_u.default.join(e.installDir,"profiles",e.profileEmail,yo),ge=e=>{let t=$i(e);if(!dn.default.existsSync(t))return null;try{let r=JSON.parse(dn.default.readFileSync(t,"utf8"));return!o5(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},aS=e=>{let t=$i(e);dn.default.existsSync(t)&&dn.default.rmSync(t,{force:!0})},wu=(e,t)=>{let r=$i(e),n=ge(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};dn.default.mkdirSync(_u.default.dirname(r),{recursive:!0}),dn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Ce=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var zi,Jk=l(()=>{"use strict";Fi();vu();zi=(e,t)=>{if(!t.socketOpen)return!1;let r=ge(e);return r===null?!1:!Ce(r,t.staleAfterMs??12e4,t.nowMs)}});var lS,Yk=l(()=>{"use strict";vu();lS=(e,t)=>!(e!==null&&!Ce(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var So=l(()=>{"use strict";vu();Jk();Yk();Fi()});var cS=l(()=>{"use strict";So();Q()});var dS=l(()=>{"use strict";So()});var uS=l(()=>{"use strict";Q()});var Zk,Xk,Ui,pS=l(()=>{"use strict";Zk=m(require("node:fs"));$t();Au();bu();Pe();Xk=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Ui=async(e=E())=>{if(!Zk.default.existsSync(Nt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await Xk())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let n=[];for(let s of Z(e))(await be(s.launchAgentLabel)).ok&&n.push(s.launchAgentLabel);let o=await Xk();return{ok:o||n.length>0,liveReachable:o,hollowInstall:!1,kickstartedLabels:n}}});var Qk=l(()=>{"use strict";Q()});var eC,un,mS,s5,i5,a5,tC,l5,rC,Ao,Wu=l(()=>{"use strict";eC=require("node:crypto"),un=m(require("node:fs")),mS=m(require("node:path"));Pe();s5="watchdog-log.ndjson",i5=200,a5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tC=(e=E())=>{let t=O(),r=t.installDir===e?t.logsDir:Un({installDir:e,profileEmail:t.profileEmail});return mS.default.join(r,s5)},l5=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!a5(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},rC=(e,t=E())=>{let r={id:(0,eC.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=tC(t);un.default.mkdirSync(mS.default.dirname(n),{recursive:!0});let o=un.default.existsSync(n)?un.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-i5+1)),JSON.stringify(r)];return un.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Ao=(e=20,t=E())=>{let r=tC(t);if(!un.default.existsSync(r))return[];let n=un.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=l5(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var gS,fS,hS,yS=l(()=>{"use strict";St();gS=Nr.watchdogReinstallState,fS=900*1e3,hS=3e3});var nC=l(()=>{"use strict";yS()});var oC={};ht(oC,{verifyAgentWitchReviveAfterKickstart:()=>d5});var c5,d5,sC=l(()=>{"use strict";nC();dS();uS();Pe();c5=e=>new Promise(t=>{setTimeout(t,e)}),d5=async e=>{if(await c5(e.verifyDelayMs??hS),!await Dr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?O():O(e.profileEmail),n=ge(r);return!Ce(n,e.staleAfterMs)}});var Bi,SS,u5,iC,aC,AS,bS,PS=l(()=>{"use strict";Bi=m(require("node:fs")),SS=m(require("node:path"));U();yS();u5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iC=e=>SS.default.join(e,gS),aC=(e=E())=>{let t=iC(e);if(!Bi.default.existsSync(t))return null;try{let r=JSON.parse(Bi.default.readFileSync(t,"utf8"));return!u5(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},AS=(e=E(),t=Date.now())=>{let r=aC(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=fS:!0},bS=(e=E(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=iC(e);return Bi.default.mkdirSync(SS.default.dirname(n),{recursive:!0}),Bi.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var _S,lC=l(()=>{"use strict";Q();PS();_S=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!AS())return{attempted:!1,ok:!1,targets:e};bS();let n=await t();if(!n.ok)return{attempted:!0,ok:!1,errorMessage:n.errorMessage,targets:e};let o=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await be(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:o.some(s=>s.revived||s.reason==="healthy"),targets:o}}});var cC=l(()=>{"use strict";PS();lC()});var wS=l(()=>{"use strict";Ue()});var dC=l(()=>{"use strict";Ue()});var uC,bo,pC,mC,gC,p5,m5,fC,g5,f5,hC,yC=l(()=>{"use strict";uC=require("node:child_process"),bo=m(require("node:fs")),pC=m(require("node:os")),mC=m(require("node:path")),gC=require("node:util");wS();dC();Pe();p5=(0,gC.promisify)(uC.execFile),m5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fC=e=>{let t=rt(e),r=t===null?O():O(t);if(!bo.default.existsSync(r.configPath))return null;try{let n=JSON.parse(bo.default.readFileSync(r.configPath,"utf8"));return!m5(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},g5=e=>fC(e)?.wsUrl??null,f5=e=>{let t=g5(e);return t!==null?we(t):_e(e)?.appOrigin??null},hC=async e=>{let t=e?.installDir??E(),r=fC(t),n=r!==null?we(r.wsUrl):f5(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=mC.default.join(pC.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{bo.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??rt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await p5("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{bo.default.existsSync(i)&&bo.default.unlinkSync(i)}}});var SC={};ht(SC,{attemptAgentWitchWatchdogReinstall:()=>h5});var h5,AC=l(()=>{"use strict";cC();yC();h5=async e=>_S(e,()=>hC())});var bC,PC,_C,y5,S5,A5,Gi,vS=l(()=>{"use strict";Kk();cS();dS();uS();pS();iS();Au();bu();Pe();Xn();Qk();Wu();bC=e=>e===null?O():O(e),PC=async(e,t,r)=>{if(!await Dr(e))return"not_running";let o=bC(t);if(st(o))return"healthy";let s=ge(o);return Ce(s,r)?"stale_connection":"healthy"},_C=async e=>{let t=e?.staleAfterMs??12e4,r=E(),n=Z(r);return Promise.all(n.map(async o=>{let s=await PC(o.launchAgentLabel,o.profileEmail,t),i=bC(o.profileEmail),a=ge(i),c=await Dr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Ce(a,t),needsRevive:s!=="healthy",reason:s}}))},y5=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},S5=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",A5=async e=>{let t=await be(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(sC(),oC)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Gi=async e=>{if(!nt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=E();await ho(r),await Ui(r);let n=Z(r),o=[];for(let p of n){let f=await PC(p.launchAgentLabel,p.profileEmail,t);if(f==="healthy"){o.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:f});continue}o.push(await A5({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:f,staleAfterMs:t}))}if(o.length===0){let p=jr();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(AC(),SC)),f=await p(o);s=f.attempted,i=f.ok,a=f.errorMessage,c=[...f.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&rC({event:S5(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:y5(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var wC,Eu,vC=l(()=>{"use strict";wC=m(require("node:os"));cS();Wu();vS();Eu=async()=>{let e=await _C(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:wC.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Ao(1)[0]??null}}});var WS=l(()=>{"use strict";iS();vS();vC();Wu()});var Vi,qi,Ki,WC=l(()=>{"use strict";Q();WS();Vi=async()=>{await ho();let e=Z(),t=[];for(let r of e){let n=await be(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=jr();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},qi=Gi,Ki=Gi});var ES=l(()=>{"use strict";WC()});var Ru,Lu,EC,LS,LC,b5,P5,_5,w5,v5,ku,RC=l(()=>{"use strict";Ru=require("node:child_process"),Lu=m(require("node:fs")),EC=m(require("node:os")),LS=m(require("node:path")),LC=require("node:util");Q();U();b5=(0,LC.promisify)(Ru.execFile),P5=()=>LS.default.join(EC.default.homedir(),"Library","LaunchAgents"),_5=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await b5("launchctl",["bootout",r]).catch(()=>{})},w5=e=>{let t=LS.default.join(P5(),`${e}.plist`);Lu.default.existsSync(t)&&Lu.default.unlinkSync(t)},v5=e=>{(0,Ru.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},ku=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=E();if(!Lu.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Mt(e);for(let r of t)await _5(r),w5(r);return v5(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var kC,Cu,CC,Po,TC,W5,E5,L5,RS,R5,kS,xC=l(()=>{"use strict";kC=require("node:child_process"),Cu=m(require("node:fs")),CC=m(require("node:os")),Po=m(require("node:path")),TC=require("node:util");Q();W5=(0,TC.promisify)(kC.execFile),E5=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],L5=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],RS=e=>{Cu.default.existsSync(e)&&Cu.default.rmSync(e,{force:!0})},R5=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await W5("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},kS=async e=>{let r=(e.listLaunchAgentLabels??Mt)(e.layout.installDir),n=e.launchAgentsDir??Po.default.join(CC.default.homedir(),"Library","LaunchAgents"),o=e.bootoutLaunchAgent??R5;for(let i of r)await o(i),RS(Po.default.join(n,`${i}.plist`));let s=Po.default.dirname(e.layout.configPath);for(let i of E5)RS(Po.default.join(s,i));for(let i of L5)RS(Po.default.join(e.layout.installDir,i));return Cu.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var CS,IC=l(()=>{"use strict";CS={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var TS,OC=l(()=>{"use strict";TS="unknown_identity"});var xS=l(()=>{"use strict";IC();OC()});var k5,IS,NC=l(()=>{"use strict";xS();k5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),IS=e=>e.type!=="system.error"||!k5(e.payload)?!1:e.payload.errorCode===TS});var OS=l(()=>{"use strict";RC();xC();NC()});var Tu=l(()=>{"use strict";Q();Ue();OS();WS()});var _o,xu,Iu=l(()=>{"use strict";Tu();_o=(e=20)=>Ao(e),xu=Eu});var Ou,wo,Nu,Mu=l(()=>{"use strict";Tu();Ou=Yr,wo=(e=20)=>qr(e),Nu=e=>Jr(e)});var ju,NS=l(()=>{"use strict";Tu();ju=()=>ku()});var MC=l(()=>{"use strict";Gh();Oy();sS();ES();Iu();Mu();NS()});var jC={};ht(jC,{buildAgentWitchAutomationStatusFromWakeServer:()=>Hi,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Ou,buildAgentWitchWakeHealthResponse:()=>mi,buildAgentWitchWakeIdentityResponse:()=>gi,buildAgentWitchWatchdogStatus:()=>xu,installHarnessFromWakeServer:()=>Li,readAgentWitchSelfUpdateLogEntries:()=>wo,readAgentWitchWatchdogLogEntries:()=>_o,restartAgentWitchFromWakeServer:()=>Ki,reviveAgentWitchWebSocketFromWakeServer:()=>qi,runAgentWitchSelfUpdateFromWakeServer:()=>Nu,runAgentWitchUninstallLocalFromWakeServer:()=>ju,runAutomationFromWakeServer:()=>Di,syncAutomationsFromWakeServer:()=>ji,wakeAgentWitchLaunchAgents:()=>Vi});var DC=l(()=>{"use strict";MC()});var HC,FC,MS,jS,$C=l(()=>{"use strict";HC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),FC=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?HC(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?HC(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},MS=e=>{let t=e.watchdogLogs.map(FC).join(""),r=e.updateLogs.map(FC).join("");return`<!doctype html>
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
</html>`},jS=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var zC,UC,BC=l(()=>{"use strict";zC=m(require("node:net")),UC=()=>new Promise((e,t)=>{let r=zC.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var GC,C5,DS,VC=l(()=>{"use strict";GC=m(require("node:net"));BC();pi();ui();Pe();C5=e=>new Promise(t=>{let r=GC.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),DS=async()=>{let e=E(),t=at();if(await C5(t))return FL(t),t;let r=await UC();return Cd(e,r),r}});var T5,HS,qC=l(()=>{"use strict";T5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),HS=e=>({force:T5(e)&&e.force===!0})});var Ji=l(()=>{"use strict";Wi();$C();VC();qC();Wf();id();Vn()});var FS,j,$S,zS,Yi,KC=l(()=>{"use strict";FS=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},$S=e=>{e.writeHead(403),e.end()},zS=e=>e.url?.split("?")[0]??"/",Yi=(e,t,r=20,n=200)=>{let o=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(o.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,n):r}});var dt=l(()=>{"use strict";KC()});var x5,JC,YC=l(()=>{"use strict";sS();dt();x5=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},JC=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,Hi(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await x5(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let n=ji(t);return j(e.response,n.ok?200:400,n,e.cors.headers),!0}let r=await Di(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var I5,ZC,XC,QC,US,eT,BS=l(()=>{"use strict";I5=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],ZC=e=>/embed|minilm|^bge-/i.test(e),XC=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),QC=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),US=e=>e.filter(t=>t.trim().length>0&&!ZC(t)),eT=(e,t)=>{let r=e.filter(o=>o.trim().length>0&&!ZC(o)),n=t?.trim()??"";if(n.length>0){let o=r.find(s=>XC(s,n));if(o!==void 0)return o}for(let o of I5){let s=r.find(i=>XC(i,o));if(s!==void 0)return s}return r[0]??null}});var GS,nT,oT,Du,sT,tT,rT,O5,N5,M5,j5,D5,H5,ut,Xi=l(()=>{"use strict";GS=require("node:child_process"),nT=m(require("node:fs")),oT=m(require("node:os")),Du=m(require("node:path"));Ue();it();BS();sT=3e3,tT=["claude-cli","codex","cursor","antigravity"],rT={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},O5=(e,t)=>new Promise(r=>{let n=(0,GS.spawn)(e,[...t],{stdio:"ignore"}),o=setTimeout(()=>{n.kill("SIGTERM"),r(!1)},sT);n.on("error",()=>{clearTimeout(o),r(!1)}),n.on("close",s=>{clearTimeout(o),r(s===0)})}),N5=()=>{let e=oT.default.homedir();return["ollama",Du.default.join(e,".local","bin","ollama"),Du.default.join(e,".agent-witch","ollama","ollama"),Du.default.join(e,".local-agent-witch","ollama","ollama")]},M5=e=>new Promise(t=>{let r=(0,GS.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),n=[],o=setTimeout(()=>{r.kill("SIGTERM"),t(null)},sT);r.stdout.on("data",s=>{n.push(s)}),r.on("error",()=>{clearTimeout(o),t(null)}),r.on("close",s=>{if(clearTimeout(o),s!==0){t(null);return}t(QC(Buffer.concat(n).toString("utf8")))})}),j5=async()=>{for(let e of N5()){if(e!=="ollama"&&!nT.default.existsSync(e))continue;let t=await M5(e);if(t!==null)return t}return[]},D5=e=>{let t=e.installedWriterIds.map(s=>rT[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,n=se(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${rT[e.writerAgent]} is not installed.`:"",o=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[n,r,o].filter(s=>s.length>0).join(" ")},H5=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:Zn},ut=async e=>{let t=tT.map(i=>{let a=hd(i,e.commands);return O5(a.command,a.args)}),[r,...n]=await Promise.all([j5(),...t]),o=tT.flatMap((i,a)=>n[a]===!0?[i]:[]),s=eT(r,H5());return{ollamaModels:r,estimateModel:s,installedWriterIds:o,capabilityNote:D5({writerAgent:e.writerAgent??"",installedWriterIds:o,estimateModel:s})}}});var F5,$5,VS,iT=l(()=>{"use strict";F5="http://127.0.0.1:11434",$5=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},VS=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||F5;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return n.ok?$5(await n.json()):null}catch{return null}}});var qS=l(()=>{"use strict";it();Xi();iT();BS()});var z5,aT,lT=l(()=>{"use strict";qS();z5={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},aT=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:z5[t]})),ollamaModels:US(e.ollamaModels)})});var U5,cT,dT=l(()=>{"use strict";qS();dt();lT();U5=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},cT=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await ut({commands:ie({})});return j(e.response,200,{ok:!0,...aT({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await U5(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",n=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",o=await VS({model:r,prompt:n});return o===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:o},e.cors.headers),!0)}return!1}});var B5,uT,pT=l(()=>{"use strict";Oy();dt();B5=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},uT=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await B5(e);if(t===null)return!0;let r=Li(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var mT=l(()=>{"use strict";ct()});var KS,gT=l(()=>{"use strict";mT();Ei();KS=e=>{if(!Gt(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:$e({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var fT,JS,YS=l(()=>{"use strict";ae();ct();Ei();fT=e=>{if(!Gt(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},JS=async e=>{let t=fT(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=br("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let n=H();if(n===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let o=Y({wsUrl:n.wsUrl,pairingToken:n.pairingToken});return o===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:($e({projectFolderPath:r}),await Ii(o,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var hT=l(()=>{"use strict";gT();YS()});var yT,ST=l(()=>{"use strict";hT();YS();dt();yT=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=KS(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await JS(t),n=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,n,r,e.cors.headers),!0}return!1}});var AT,bT=l(()=>{"use strict";Ji();Mu();Iu();AT=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=_o(50),r=wo(50);return e.response.writeHead(200,jS()),e.response.end(MS({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var PT,_T=l(()=>{"use strict";Gh();dt();PT=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,mi(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,gi(),e.cors.headers),!0):!1});var wT,vT=l(()=>{"use strict";NS();dt();wT=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await ju();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var WT,ET=l(()=>{"use strict";ES();dt();WT=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await qi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Ki();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Vi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var LT,RT=l(()=>{"use strict";Ji();Mu();dt();LT=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Ou();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Yi(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:wo(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=HS(t),n=await Nu({force:r});return j(e.response,n.ok?200:503,n,e.cors.headers),!0}return!1}});var kT,CT=l(()=>{"use strict";Iu();dt();kT=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await xu();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Yi(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:_o(t)},e.cors.headers),!0}return!1}});var TT,xT=l(()=>{"use strict";YC();dT();pT();ST();bT();_T();vT();ET();RT();CT();TT=[PT,AT,kT,WT,LT,wT,uT,yT,JC,cT]});var IT,OT=l(()=>{"use strict";xT();IT=async e=>{for(let t of TT)if(await t(e))return!0;return!1}});var G5,NT,MT=l(()=>{"use strict";Wi();dt();OT();G5=(e,t,r,n)=>({request:e,response:t,wakePort:r,cors:n,pathname:zS(e),readJsonBody:()=>FS(e)}),NT=async(e,t,r)=>{let n=e.headers.origin,o=iu(n);try{if(n!==void 0&&n.length>0&&!o.allowed){$S(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=G5(e,t,r,o);if(await IT(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}}});var jT,pn,Hu,Fu=l(()=>{"use strict";jT=m(require("node:http"));Ji();MT();pn=async()=>{let e=await DS(),t=jT.default.createServer((r,n)=>{NT(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Hu=pn});var DT={};ht(DT,{runAgentWitchBridgeCli:()=>V5});var V5,HT=l(()=>{"use strict";Q();Fu();V5=async()=>{He("agent-witch-bridge");let e=await pn(),t=Dt(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var FT=l(()=>{"use strict";$t()});var vo,XS,$T=l(()=>{"use strict";vo=(e,t,r)=>e===1?t:r,XS=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${vo(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${vo(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${vo(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${vo(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${vo(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${vo(p,"year","years")} ago`}});var mn,ZS,q5,K5,QS,Pr,Zi,eA,zT=l(()=>{"use strict";mn=m(require("node:fs")),ZS=m(require("node:path")),q5="local-ws-traffic.ndjson",K5=500,QS=e=>ZS.default.join(e.logsDir,q5),Pr=(e,t)=>{let r=QS(e);mn.default.mkdirSync(ZS.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});mn.default.appendFileSync(r,`${n}
`,"utf8")},Zi=(e,t=K5)=>{let r=QS(e);if(!mn.default.existsSync(r))return[];let o=mn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},eA=e=>{let t=QS(e);mn.default.existsSync(t)&&mn.default.writeFileSync(t,"","utf8")}});var J5,UT,BT,GT=l(()=>{"use strict";xS();J5=new Set(Object.values(CS)),UT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BT=e=>{if(!UT(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!J5.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!UT(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var VT,qT=l(()=>{"use strict";VT=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var Y5,X5,Z5,Qi,KT=l(()=>{"use strict";qT();Y5=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,X5=e=>Y5.test(e),Z5=e=>VT(e),Qi=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>Qi(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&X5(n)){r[n]=Z5(o);continue}r[n]=Qi(o)}return r}});var vt,tA,Q5,eV,tV,rA,JT,YT,XT,rV,$u,gn,zu,nA,ZT=l(()=>{"use strict";vt=m(require("node:fs")),tA=m(require("node:path"));GT();KT();Q5="local-ws-trace.ndjson",eV=1e4,tV=1440*60*1e3,rA=e=>tA.default.join(e.logsDir,Q5),JT=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},YT=e=>{if(!vt.default.existsSync(e))return;let t=vt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-tV,o=t.filter(s=>{let i=JT(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-eV);vt.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},XT=(e,t)=>{let r=rA(e);vt.default.mkdirSync(tA.default.dirname(r),{recursive:!0}),vt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),YT(r)},rV=e=>e.parsed===null?{_empty:!0}:Qi(e.parsed),$u=(e,t,r)=>{let n=BT(r);XT(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:rV(n)})},gn=(e,t)=>{XT(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Qi({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},zu=(e,t=80)=>{let r=rA(e);if(YT(r),!vt.default.existsSync(r))return[];let n=vt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let i=JT(s);i!==null&&o.push(i)}return o.reverse()},nA=e=>{let t=rA(e);vt.default.existsSync(t)&&vt.default.writeFileSync(t,"","utf8")}});var _r,QT,nV,oA,Uu,ex=l(()=>{"use strict";_r=m(require("node:fs")),QT=m(require("node:path")),nV=256e3,oA=e=>{_r.default.mkdirSync(QT.default.dirname(e),{recursive:!0}),_r.default.writeFileSync(e,"","utf8")},Uu=(e,t=nV)=>{if(!_r.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=_r.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=_r.default.openSync(e,"r");try{_r.default.readSync(a,i,0,s,o)}finally{_r.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var ea=l(()=>{"use strict";zT();ZT();ex()});var sA,iA,tx=l(()=>{"use strict";sA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),iA=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",n=e.exists&&e.content.length>0?`<pre class="error-log-view">${sA(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${sA(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${sA(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${n}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var rx=l(()=>{"use strict";tx()});var aA,lA=l(()=>{"use strict";aA=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var cA=l(()=>{"use strict";Fi()});var dA,uA,nx=l(()=>{"use strict";cA();dA=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e);return Number.isNaN(n)?!0:r-n>t},uA=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var ox=l(()=>{"use strict";lA();nx()});var sx,ta,pA,ra=l(()=>{"use strict";lA();sx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ta=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=sx(e),r=sx(aA(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},pA=`(function () {
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
})();`});var fn,oV,mA,ix=l(()=>{"use strict";fn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oV=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},mA=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${fn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?fn(r.direction):fn(r.kind),i=`trace-body-${n}`,a=fn(oV(r.body));return`<tr>
        <td title="${fn(r.at)}">${fn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${fn(r.command)}</code></td>
        <td>${o}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var lx,ax,gA,cx=l(()=>{"use strict";lx=m(require("node:path"));U();$t();ax=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gA=e=>{let t=te(e.installDir),n=`AW_HOME="$HOME/${lx.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${ax(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${ax(n)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var dx=l(()=>{"use strict";ra();ix();cx();ra()});var sV,qt,na=l(()=>{"use strict";sV=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),qt=sV});var ux,px,mx,gx,fx,hx,yx,Wo=l(()=>{"use strict";ux="projects",px="knowledge",mx="chunks.ndjson",gx="lessons.ndjson",fx="error-chunks.ndjson",hx="usage-stats.json",yx="knowledge-location.json"});var Bu,iV,Gu,fA=l(()=>{"use strict";Bu=m(require("node:path"));Wo();iV=(e,t)=>{let r=t.trim(),n=Bu.default.join(e.installDir,ux,r,px);return{projectId:r,knowledgeDirPath:n,ragChunksFilePath:Bu.default.join(n,mx),memoryRunsFilePath:Bu.default.join(n,gx)}},Gu=iV});var hA,aV,Sx,Ax=l(()=>{"use strict";hA=m(require("node:fs"));Wo();tn();aV=e=>{let t=Ge(e.projectFolderPath),r=`${t.metaDirPath}/${yx}`,n={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};hA.default.mkdirSync(t.metaDirPath,{recursive:!0}),hA.default.writeFileSync(r,`${JSON.stringify(n,null,2)}
`)},Sx=aV});var Eo,Px,bx,lV,_x,wx=l(()=>{"use strict";Eo=m(require("node:fs")),Px=m(require("node:path"));zr();tn();fA();Ax();bx=(e,t)=>{Eo.default.existsSync(e)&&(Eo.default.existsSync(t)&&Eo.default.statSync(t).size>0||(Eo.default.mkdirSync(Px.default.dirname(t),{recursive:!0}),Eo.default.copyFileSync(e,t)))},lV=e=>{let t=Ge(e.projectFolderPath),r=Gu(e.layout,e.projectId),n=`${t.memoryDirPath}/${Bn}`;bx(t.ragChunksFilePath,r.ragChunksFilePath),bx(n,r.memoryRunsFilePath),Sx({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},_x=lV});var yA,cV,vx,Wx=l(()=>{"use strict";yA=m(require("node:fs"));tn();cV=e=>{let t=Ge(e);if(!yA.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(yA.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let n=r;return{projectId:typeof n.projectId=="string"&&n.projectId.trim().length>0?n.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},vx=cV});var Ex,dV,Lo,Vu=l(()=>{"use strict";Ex=m(require("node:path"));zr();tn();wx();Wx();fA();dV=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=vx(t),n=e.projectId?.trim()||r.projectId?.trim()||"";if(n.length>0){_x({layout:e.layout,projectFolderPath:t,projectId:n});let s=Gu(e.layout,n);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:n}}let o=Ge(t);return{ragChunksFilePath:o.ragChunksFilePath,memoryRunsFilePath:Ex.default.join(o.memoryDirPath,Bn),projectId:null}},Lo=dV});var qu,pV,Ku,SA=l(()=>{"use strict";qu=m(require("node:fs"));Wo();pV=(e,t=500)=>{if(!qu.default.existsSync(e))return;let r=qu.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let n=r.slice(r.length-t);qu.default.writeFileSync(e,`${n.join(`
`)}
`)},Ku=pV});var Ju,mV,hn,AA=l(()=>{"use strict";Ju=m(require("node:path"));Wo();Vu();mV=e=>{let t=Lo(e);if(t===null)return null;let r=Ju.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Ju.default.join(r,hx),errorChunksFilePath:Ju.default.join(r,fx)}},hn=mV});var Rx,oa,kx,Lx,bA,Cx,hV,PA,Tx,_A,wA,vA,WA=l(()=>{"use strict";Rx=require("node:crypto"),oa=m(require("node:fs")),kx=m(require("node:path"));na();Wo();AA();Lx=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),bA=e=>{if(!oa.default.existsSync(e))return Lx();try{let t=JSON.parse(oa.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return Lx()},Cx=(e,t)=>{oa.default.mkdirSync(kx.default.dirname(e),{recursive:!0}),oa.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},hV=e=>{let t=qt(e).trim(),n=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,Rx.createHash)("sha256").update(n).digest("hex").slice(0,16)},PA=e=>{let t=hn(e);return t===null?null:bA(t.usageStatsFilePath)},Tx=e=>{if(e.chunkIds.length===0)return;let t=hn(e);if(t===null)return;let r=bA(t.usageStatsFilePath),n={...r.chunkRetrievalCounts};for(let o of e.chunkIds)n[o]=(n[o]??0)+1;Cx(t.usageStatsFilePath,{...r,chunkRetrievalCounts:n})},_A=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=hn(e);if(r===null)return null;let n=hV(t),o=bA(r.usageStatsFilePath),s=o.errorOccurrences[n],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return Cx(r.usageStatsFilePath,{...o,errorOccurrences:{...o.errorOccurrences,[n]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),n},wA=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,vA=e=>{if(e===null)return[];let t=[];for(let[r,n]of Object.entries(e.chunkRetrievalCounts))n<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:n,chunkId:r,message:`Knowledge chunk "${r}" was injected ${n} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,n]of Object.entries(e.errorOccurrences))n.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:n.count,errorFingerprint:r,message:`Error "${n.preview}" occurred ${n.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:n.count,errorFingerprint:r,message:`Same error (${n.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,n)=>r.priority-n.priority||n.hitCount-r.hitCount)}});var sa,xx,yV,SV,Ix,AV,EA,ia,Ro,LA,ko,RA,kA=l(()=>{"use strict";sa=m(require("node:fs")),xx=m(require("node:path"));na();Vu();SA();WA();yV="http://127.0.0.1:11434",SV="nomic-embed-text",Ix=(e,t,r)=>Lo({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,AV=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},EA=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},ia=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||yV,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||SV;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},Ro=(e,t,r)=>{let n=Ix(e,t,r);if(n===null||!sa.default.existsSync(n))return[];let o=sa.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},LA=async e=>{let t=qt(e.text),r=EA(t);if(r.length===0)return 0;let n=Ix(e.layout,e.projectFolderPath,e.projectId);if(n===null)return 0;sa.default.mkdirSync(xx.default.dirname(n),{recursive:!0});let o=0;for(let s of r){let i=await ia(s);if(i===null)continue;let a={id:`${Date.now()}-${o}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};sa.default.appendFileSync(n,`${JSON.stringify(a)}
`,"utf8"),o+=1}return Ku(n),o},ko=async e=>{let t=await ia(e.query);if(t===null)return[];let r=e.minScore??0,s=Ro(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:AV(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return Tx({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},RA=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var aa,Ox,bV,PV,CA,TA,xA,Nx=l(()=>{"use strict";aa=m(require("node:fs")),Ox=m(require("node:path"));na();AA();SA();kA();bV=e=>{if(!aa.default.existsSync(e))return[];let t=aa.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let n of t)try{r.push(JSON.parse(n))}catch{}return r},PV=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},CA=async e=>{let t=hn(e);if(t===null)return 0;let r=qt(e.text),n=EA(r,600);if(n.length===0)return 0;let o=t.errorChunksFilePath;aa.default.mkdirSync(Ox.default.dirname(o),{recursive:!0});let s=0;for(let i of n.slice(0,3)){let a=await ia(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};aa.default.appendFileSync(o,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Ku(o,200),s},TA=async e=>{let t=hn(e);if(t===null)return[];let r=await ia(e.query);if(r===null)return[];let n=e.minScore??.3;return bV(t.errorChunksFilePath).map(s=>({chunk:s,score:PV(r,s.embedding)})).filter(s=>s.score>=n).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},xA=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var IA=l(()=>{"use strict";kA();WA();Nx()});var OA,Mx=l(()=>{"use strict";OA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var jx=l(()=>{"use strict";Mx()});var ue,NA,MA=l(()=>{"use strict";jx();ue=OA,NA=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${ue.gray50};
  --aw-zinc-100: ${ue.gray100};
  --aw-zinc-200: ${ue.gray200};
  --aw-zinc-400: ${ue.gray400};
  --aw-zinc-500: ${ue.gray500};
  --aw-zinc-600: ${ue.gray600};
  --aw-zinc-700: ${ue.gray700};
  --aw-zinc-800: ${ue.gray900};
  --aw-zinc-900: ${ue.gray900};
  --aw-brand-600: ${ue.brand600};
  --aw-brand-700: ${ue.brand700};
  --aw-brand-50: ${ue.brand50};
  --aw-emerald-50: ${ue.success50};
  --aw-emerald-700: ${ue.success700};
  --aw-amber-50: ${ue.warning50};
  --aw-amber-900: ${ue.warning900};
  --aw-red-50: ${ue.error50};
  --aw-red-700: ${ue.error700};
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
.sdlc-wizard-outcome-modules { margin: 0.5rem 0 1rem; padding-left: 1.25rem; }
.sdlc-wizard-outcome-step {
  margin-top: 0.65rem;
  border: 1px solid var(--aw-zinc-200);
  border-radius: var(--aw-radius-lg);
  padding: 0.35rem 0.75rem;
}
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
.sdlc-run-badge-done { background: var(--aw-zinc-100); color: var(--aw-zinc-600); }
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
`.trim()});var _V,wV,jA,Dx,DA,Hx=l(()=>{"use strict";MA();ra();_V=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,wV=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],jA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dx=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${_V}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,DA=e=>{let t=wV.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=jA(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"",o=jA(e.installBundleVersionLabel?.trim()??"unknown"),s=Dx("brand brand-in-sidebar",o),i=Dx("brand brand-in-header",o);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${jA(e.title)} \xB7 Agent Witch Local</title>
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
  <script>${pA}</script>
</body>
</html>`}});var Yu,la,Xu=l(()=>{"use strict";Yu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),la=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Yu(e.syncMessage)}</p>`:"",n=Yu(e.manageHref),o=Yu(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Yu(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${n}" target="_blank" rel="noopener noreferrer">${o} \u2197</a></p>
    </div>`}});var HA,FA,$A,Fx=l(()=>{"use strict";HA=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
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
    </section>`,$A=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var $x=l(()=>{"use strict";Hx();Xu();Fx()});var Co,zA,zx=l(()=>{"use strict";ra();Co=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zA=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Co(e.wakeError)}</div>`:"",a=ta(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Co(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Co(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Co(n)}</p>
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
        <p class="home-card-meta">${Co(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Co(o)}</p>
      </a>
    </div>`}});var Ux=l(()=>{"use strict";zx()});var M,Zu=l(()=>{"use strict";M=e=>e==="passed"||e==="stopped"||e==="failed"});var Bx,UA,yn,BA,Qu=l(()=>{"use strict";Bx="Stopped at the round limit. The best prompt is kept.",UA="Stopped because the score stopped rising. The best prompt is kept.",yn="Finished. The best prompt is the result.",BA="Wizard ended. Progress from finished steps is kept."});var ca,GA=l(()=>{"use strict";ca=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],n=e.instructions?.trim()??"",o=n.length===0?[]:["","Instructions:",n];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...o,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",n.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var vV,WV,da,Gx,ep=l(()=>{"use strict";vV=/\n+|;\s+/,WV=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,da=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let n=r.split(vV).map(o=>o.replace(/^[-*]\s*/,"").trim()).filter(o=>o.length>0).reduce((o,s)=>{if(t.length+o.length>=12)return o;let i=s.toLowerCase();return[...t,...o].some(c=>c.toLowerCase()===i)?o:[...o,WV(s)]},[]);return[...t,...n]},[]),Gx=e=>{let t=da(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var he,ua=l(()=>{"use strict";he=e=>{let t=e.flatMap(o=>o.score===null?[]:[{roundNumber:o.roundNumber,promptText:o.promptText,score:o.score,reasons:o.reasons}]),[r,...n]=t;return r===void 0?null:n.reduce((o,s)=>s.score>o.score||s.score===o.score&&s.roundNumber>o.roundNumber?s:o,r)}});var pa,VA=l(()=>{"use strict";ep();ua();pa=e=>{let t=[...e.priorRounds,e.current],r=he(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},n=[...t].filter(o=>o.score<r.score).sort((o,s)=>s.roundNumber-o.roundNumber).map(o=>o.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:Gx(n)}}});var qA,EV,LV,Vx,qx=l(()=>{"use strict";qA={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},EV=e=>{try{let t=JSON.parse(e.fragment);return{...qA,objects:[...e.objects,t]}}catch{return{...qA,objects:e.objects}}},LV=(e,t)=>{if(e.inString){let n=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:n}:t==="\\"?{...e,escaped:!0,fragment:n}:t==='"'?{...e,inString:!1,fragment:n}:{...e,fragment:n}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:EV(r)},Vx=e=>[...e].reduce(LV,qA).objects});var RV,KA,kV,Kx,JA=l(()=>{"use strict";qx();RV=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},KA=e=>{let t=Vx(e).filter(RV),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},kV=(e,t)=>({...e,passed:e.score>=t}),Kx=(e,t)=>{let r=KA(e);return r===null?null:kV(r,t)}});var YA,XA,tp=l(()=>{"use strict";YA="The judge reply needs a score and a reason.",XA="The improver reply was empty."});var Jx,Yx=l(()=>{"use strict";Jx=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((n,o)=>o>n.best?{best:o,stall:0}:{best:n.best,stall:n.stall+1},{best:t,stall:0}).stall}});var Xx,Zx=l(()=>{"use strict";Xx=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((n,o)=>o.score>n.best?{best:o.score,reasons:[]}:{best:n.best,reasons:[...n.reasons,o.reasons]},{best:t.score,reasons:[]}).reasons}});var TV,Qx,e0=l(()=>{"use strict";Yx();Zx();Qu();ep();TV=e=>{let t=da(e);return t.length===0?UA:`${UA} Avoid: ${t.join("; ")}.`},Qx=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:Bx};if(Jx(e.scores)>=3){let t=e.scores.map((r,n)=>({score:r,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:TV(Xx(t))}}return null}});var wr,xV,ZA,t0,rp=l(()=>{"use strict";wr=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},xV=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,ZA=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",xV(e.tokens),`Delay: ${wr(e.delayMs)}`,"",n,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},t0=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var IV,r0,n0=l(()=>{"use strict";JA();IV=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,r0=e=>{let r=(IV.exec(e)?.[1]??e).trim();return r.length===0||KA(r)!==null?null:r}});var o0,np,s0=l(()=>{"use strict";rp();n0();tp();o0=e=>({type:"call",role:"judge",choice:e.choice,prompt:t0({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),np=e=>{let t=r0(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:XA}}:{nextPrompt:t,continuation:o0({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var QA,i0=l(()=>{"use strict";GA();VA();JA();tp();Qu();e0();tp();s0();QA=e=>{let t=Kx(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:YA}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],n=e.round??r.length,o=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=Qx({scores:o.map(a=>a.score),reasons:o.map(a=>a.reasons),round:n,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=pa({current:{roundNumber:n,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:ca({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var ma,eb=l(()=>{"use strict";ma=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var tb,a0=l(()=>{"use strict";tb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",n,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var OV,rb,l0=l(()=>{"use strict";rp();OV=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,rb=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",OV(e.tokens),`Delay: ${wr(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var NV,MV,jV,nb,c0=l(()=>{"use strict";NV=/[A-Za-z0-9_./~-]{3,180}/g,MV=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,jV=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||MV.test(t)},nb=(e,t=12)=>{let r=[];for(let n of e.matchAll(NV)){let o=n[0].replace(/\.+$/,"");if(!(!jV(o)||r.includes(o))&&(r.push(o),r.length>=t))break}return r}});var ga,d0=l(()=>{"use strict";ga=(e,t)=>e.flatMap(r=>{let n=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||n.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:n}]}).sort((r,n)=>r.roundNumber-n.roundNumber)});var op,ob,u0,fa,sb=l(()=>{"use strict";op=e=>Math.floor(e/2),ob=e=>Math.max(op(e)+1,e-20),u0=(e,t)=>e>=t?"passes":e>=ob(t)?"close":e>=op(t)?"weak":"bad",fa=e=>[{band:"bad",label:`0\u2013${op(e)-1} bad`},{band:"weak",label:`${op(e)}\u2013${ob(e)-1} weak`},{band:"close",label:`${ob(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var sp,ib=l(()=>{"use strict";sb();sp=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",n=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${u0(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),o=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...n,...o]}});var p0,m0=l(()=>{"use strict";p0=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var g0,f0=l(()=>{"use strict";g0=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var DV,HV,h0,y0=l(()=>{"use strict";Zu();ib();m0();f0();DV=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],HV=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",h0=e=>{let t=e.wizard;if(t===void 0)return[];let r=p0(t),n=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),o=e.status==="wizard_paused",s=t.phase==="complete",i=DV.map((p,f)=>{let b=!s&&!o&&f===r?"active":"done";return{id:`wizard-${f+1}`,label:p,state:b,detail:null}}).filter((p,f)=>s?!0:f<=n),a=o&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=g0(t)&&(!o||a)?sp(e):[],d=M(e.status)?[{id:"end",label:HV(e),state:"done",detail:e.errorMessage}]:[];return[...i,...c,...d]}});var FV,ab,S0=l(()=>{"use strict";Zu();ib();y0();FV=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",ab=e=>{if(e.wizard!==void 0)return h0(e);let t=sp(e),r=M(e.status)?[{id:"end",label:FV(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var A0=l(()=>{"use strict";$t()});var b0,ha,ya,To,ip,lb,P0=l(()=>{"use strict";A0();b0="/prompt-optimizer/agent",ha=`${Ft}${b0}`,ya=`${Ft}/prompt-optimizer`,To="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",ip=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${To}`,lb="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Sn=l(()=>{"use strict"});var _0,w0=l(()=>{"use strict";_0=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var cb,W0=l(()=>{"use strict";w0();Sn();cb=e=>({schemaVersion:3,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:_0(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{}})});var db,E0=l(()=>{"use strict";db=e=>({...e,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null}))})});var ub,L0=l(()=>{"use strict";Sn();ub=(e,t,r)=>{let n=r.trim();if(n.length===0)return e;let o=e.avoidByStep[t]??[],s=[n,...o].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var R0,pb,k0=l(()=>{"use strict";R0=["generalize","evaluate","separate","optimize_modules"],pb=(e,t)=>{let r=R0.indexOf(t);if(r===-1)return e;let n=R0.slice(r+1);return n.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:n.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:n.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:n.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:n.includes("separate")?null:e.selectedSplitTopology,modules:n.includes("optimize_modules")?[]:e.modules,currentModuleIndex:n.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:n.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var ap,mb=l(()=>{"use strict";ep();ap=e=>{let t=da(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var gb,C0=l(()=>{"use strict";mb();gb=e=>{let t=ap(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,n,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(o=>o.length>0).join(`
`)}});var zV,UV,BV,T0,x0=l(()=>{"use strict";zV=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),UV=/^\{\{[a-zA-Z0-9_-]+\}\}$/,BV=(e,t)=>{let{masked:r,tokens:n}=t.reduce((o,s)=>{let i=s.sampleValue.trim();if(i.length===0)return o;let a=new RegExp(zV(i),"g"),c=[...o.tokens];return{masked:o.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return n.reduce((o,s,i)=>o.replace(`\0PO${i}\0`,s),r)},T0=(e,t)=>{let r=[...t].sort((o,s)=>s.sampleValue.length-o.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(o=>UV.test(o)?o:BV(o,r)).join("")}});var fb,I0=l(()=>{"use strict";x0();fb=(e,t)=>e.map(r=>({...r,modules:r.modules.map(n=>({...n,prompt:T0(n.prompt,t)}))}))});var GV,yb,O0=l(()=>{"use strict";Sn();mb();GV=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),yb=e=>{let t=ap(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,o=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=GV(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",o,r,n,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Sb,N0=l(()=>{"use strict";eb();Sb=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",n=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),o=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...n,s].filter(a=>a.length>0).join(`
`);return ma({promptText:e.promptText,instructions:`${i}${o.join(`
`)}`})}});var Sa,Ab=l(()=>{"use strict";ua();Sa=e=>{let t=e.revisions.map(o=>({roundNumber:o.roundNumber,score:o.judgement?.score??null,passed:o.judgement?.passed??null,runOutput:o.run?.output??null,tokens:o.run?.tokens??null})),r=he(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null}))),n=r===null?null:e.revisions.find(o=>o.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:n?.run?.output??null,rounds:t}}});var bb,M0=l(()=>{"use strict";Ab();bb=e=>{let t=Sa({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((n,o)=>o===e.moduleIndex?{...n,status:r,selectedRevisionRound:t.bestRound,statistics:t}:n)}}});var Aa,j0=l(()=>{"use strict";Aa=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let n=r.statistics?.bestRunOutput?.trim()??"";return n.length>0?{output:n,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var VV,qV,ba,D0=l(()=>{"use strict";Sn();VV=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let n=r.rounds.reduce((o,s)=>o+(s.tokens??0),0);return n>0?n:null},qV=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,ba=e=>{let t=e.modules.map((s,i)=>({moduleId:s.moduleId,title:s.title,bestScore:s.statistics?.bestScore??null,tokens:VV(e,i),status:s.status})),r=t.length,n=t.filter((s,i)=>qV(e.modules[i])).length,o=r>0&&n===r?"passed":"stopped";return{passedModuleCount:n,totalModules:r,terminalStatusSuggestion:o,rows:t}}});var Pb,H0=l(()=>{"use strict";Pb=e=>{let t=e.modules.reduce((r,n)=>{let o=n.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+o},0);return t>0?t:null}});var lp,_b=l(()=>{"use strict";lp=e=>{let t=e.trim(),n=t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t,o=n.indexOf("{"),s=n.lastIndexOf("}");if(o===-1||s<=o)throw new Error("No JSON object in reply.");return JSON.parse(n.slice(o,s+1))}});var pt,KV,wb,F0=l(()=>{"use strict";pt=m(Ps());_b();KV=(0,pt.isType)({name:pt.isNonEmptyString,description:pt.isString,sampleValue:pt.isString}),wb=e=>{let t=lp(e);if(!(0,pt.isType)({templatedPrompt:pt.isNonEmptyString,variables:(0,pt.isArrayWithEachItem)(KV)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var re,JV,YV,vb,$0=l(()=>{"use strict";re=m(Ps());Sn();_b();JV=(0,re.isType)({id:re.isNonEmptyString,title:re.isNonEmptyString,prompt:re.isNonEmptyString,order:re.isNumber}),YV=(0,re.isType)({id:re.isNonEmptyString,title:re.isNonEmptyString,summary:re.isString,topology:(0,re.isOneOf)("chain","parallel"),modules:(0,re.isArrayWithEachItem)(JV),recommended:re.isBoolean}),vb=e=>{let t=lp(e);if(!(0,re.isType)({options:(0,re.isArrayWithEachItem)(YV)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),n=r.filter(o=>o.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return n!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var xo,z0=l(()=>{"use strict";xo=e=>{let t=e.wizard.attempts.filter(n=>n.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var XV,Pa,Wb=l(()=>{"use strict";XV=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Pa=(e,t)=>{let r=new Map(t.map(n=>[n.name,n.sampleValue]));return e.replace(XV,(n,o)=>{let s=r.get(o);return s===void 0?n:s})}});var _a,wa,U0=l(()=>{"use strict";ua();Wb();_a=e=>Pa(e.templatedPrompt,e.variables),wa=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(n=>n.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return he(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??_a(e.wizard)}});var ZV,va,B0=l(()=>{"use strict";ZV=/\{\{([a-zA-Z0-9_-]+)\}\}/g,va=(e,t)=>e.replace(ZV,(r,n)=>{let o=t[n];return o===void 0||o.trim()===""?r:o})});var QV,Wa,Eb=l(()=>{"use strict";QV=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Wa=e=>{let t=new Set,r=[];for(let n of e.matchAll(QV)){let o=n[1];t.has(o)||(t.add(o),r.push(o))}return r}});var Ea,An,G0=l(()=>{"use strict";Ea=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),An=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var eq,cp,Lb,V0=l(()=>{"use strict";Eb();eq="wizardParam_",cp=e=>`${eq}${e}`,Lb=e=>{let t=Wa(e.modulePrompt),r={...e.wizard.parameterValues},n=new Set(e.wizard.variables.map(o=>o.name));for(let o of t){let s=cp(o),i=e.posted.get(s),a=i!==null?i.trim():r[o]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:n.has(o)?`Fill in {{${o}}} before running this module.`:`Fill in {{${o}}} (not listed in Step 1) before running this module.`};r[o]=a}return{ok:!0,parameterValues:r}}});var bn,q0=l(()=>{"use strict";bn=["generalize","evaluate","separate","optimize_modules"]});var T=l(()=>{"use strict";Zu();Qu();i0();GA();rp();eb();a0();l0();c0();VA();d0();ua();S0();sb();P0();Sn();W0();E0();L0();k0();C0();I0();O0();N0();Ab();M0();j0();D0();H0();F0();$0();z0();U0();Wb();B0();Eb();G0();V0();q0()});var Ra=l(()=>{"use strict";it();Xi();yd()});var tq,X0,Z0=l(()=>{"use strict";Ra();tq=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,X0=e=>{let t=no(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(tq)],n=r[r.length-1];if(n===void 0)return null;let o=Number(n[1])+Number(n[2]);return Number.isFinite(o)&&o>=1?o:null}});var rq,nq,Q0,Rb,oq,sq,mt,eI,tI,Pn=l(()=>{"use strict";Ra();Z0();rq="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",nq="The writer waited on terminal input and did not return a prompt.",Q0=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Rb=e=>{let t=e.trim();if(t.length===0||t.length>=500||!Q0.test(t))return null;let r=t.split(`
`).map(n=>n.trim()).find(n=>Q0.test(n))??t;return r.length>280?`${r.slice(0,277)}...`:r},oq=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},sq=e=>Rb(e.stdout)??Rb(e.stderr)??(oq(e.replyFile)?Rb(e.replyFile):null),mt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return rq;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?nq:null},eI=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],tI=e=>{let t=e.replyFileText?.trim()??"",r=mt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let n=sq({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(n!==null)return{ok:!1,errorMessage:n};let o=X0([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:o};if(e.writerAgent==="claude-cli"){let i=no(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:o}:{ok:!1,errorMessage:"The writer did not reply."}}});var ka,kb=l(()=>{"use strict";ka=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var dp,Oo,Cb=l(()=>{"use strict";kb();dp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Oo=e=>{let t=ka(e.cycle);if(t.length===0&&e.cycle.revisions.length===0)return"";let r=t.length===0?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",n=e.caption===void 0?"":`<p class="muted">${dp(e.caption)}</p>`,o=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",s=a=>o&&a===0?"Trial run":`Round ${a}`,i=e.cycle.revisions.map(a=>{let c=a.judgement?.score,d=c==null?`${s(a.roundNumber)} \u2014 not scored`:`${s(a.roundNumber)} \u2014 ${c}`,p=a.judgement?.reasons?.trim()??"",f=p.length===0?"":`<br><span class="muted">${dp(p)}</span>`;if(e.interactive){let b=e.selectedRound===a.roundNumber?" checked":"";return`<li><label><input type="radio" name="wizardRevisionRound" value="${a.roundNumber}"${b}> ${dp(d)}</label>${f}</li>`}return`<li>${dp(d)}${f}</li>`}).join("");return`${r}${n}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${i}</ul>`}});var Tb,rI,up,nI,pp=l(()=>{"use strict";Tb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rI=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Tb(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Tb(t.prompt)}</pre></li>`).join("")}</ol>`,up=e=>rI([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),nI=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(o=>o.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Tb(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${rI(t.modules.map(o=>({title:o.title,prompt:o.prompt})))}
  </section>`}});var We,iq,aq,lq,cq,dq,uq,No,mp=l(()=>{"use strict";T();Cb();pp();We=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),iq=e=>{let t=e.wizard;if(t===void 0)return null;let n=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(n===void 0||typeof n.output!="object"||n.output===null)return null;let o=n.output.revisions;if(!Array.isArray(o))return null;let s=[];for(let i of o){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},aq=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.variables.length===0?'<p class="muted">No variables yet.</p>':`<ul class="sdlc-wizard-vars">${t.variables.map(a=>`<li><strong>{{${We(a.name)}}}</strong> \u2014 ${We(a.description)} (sample: ${We(a.sampleValue)})</li>`).join("")}</ul>`,n=t.templatedPrompt.trim(),o=n.length===0?'<p class="muted">No templated prompt yet.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${We(n)}</pre>`,s=Pa(t.templatedPrompt,t.variables).trim(),i=s.length===0||s===n?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${We(s)}</pre>`;return`${r}${o}${i}`},lq=(e,t)=>`<ul class="sdlc-wizard-revisions">${e.map(n=>{let o=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,s=t===n.roundNumber?" (selected)":"",i=n.reasons?.trim()??"",a=i.length===0?"":`<br><span class="muted">${We(i)}</span>`;return`<li>${We(o)}${s}${a}</li>`}).join("")}</ul>`,cq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Oo({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let n=iq(e);if(n!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${lq(n,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let o=wa({wizard:t,revisions:e.revisions.map(s=>({roundNumber:s.roundNumber,promptText:s.promptText,score:s.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${We(o)}</pre>`}return'<p class="muted">Evaluate has not run yet.</p>'},dq=e=>{let t=e.wizard;return t===void 0?"":t.splitOptions.length===0?'<p class="muted">No split options yet.</p>':`<ul class="sdlc-wizard-splits">${t.splitOptions.map(n=>{let o=n.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===n.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${We(n.title)}</strong>${o}${We(s)}<br><span class="muted">${We(n.summary)} (${We(n.topology)})</span>${up(n)}</li>`}).join("")}</ul>`},uq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((o,s)=>{let i=s===t.currentModuleIndex?" \u2014 current":"";return`<li><strong>${We(o.title)}</strong> (${We(o.status)})${We(i)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${We(o.prompt)}</pre></li>`}).join(""),n=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Oo({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ol class="sdlc-wizard-chunks">${r}</ol>${n}`},No=(e,t)=>{switch(t){case"wizard-1":return aq(e);case"wizard-2":return cq(e);case"wizard-3":return dq(e);case"wizard-4":return uq(e);default:return""}}});var pq,oI,sI,iI=l(()=>{"use strict";T();Pn();mp();pq=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},oI=(e,t,r,n)=>{let o=mt(t);return{title:e,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:n,promptText:o===null?t:null,promptNote:o,bodyHtml:null}},sI=(e,t)=>{if(t.id.startsWith("wizard-")){let o=No(e,t.id);return{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:o.trim().length===0?null:o}}if(t.id==="end"){let o=he(e.revisions.map(s=>({roundNumber:s.roundNumber,promptText:s.promptText,score:s.judgement?.score??null,reasons:s.judgement?.reasons??null})));return o===null?{title:t.label,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:oI(t.label,o.promptText,o.score,o.reasons)}let r=t.id==="rewrite"?e.currentRound:pq(t.id),n=r===null?void 0:e.revisions.find(o=>o.roundNumber===r);return n===void 0?{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:oI(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail)}});var Ca,aI,lI=l(()=>{"use strict";Ca=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aI=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?'<p class="muted">Not scored yet.</p>':`<p class="muted">${Ca(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,n=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Ca(e.feedback.trim())}</p>`,o=e.promptNote!==null?`<div class="alert-error">${Ca(e.promptNote)}</div>`:e.promptText===null?"":`<h2>Saved prompt</h2><pre class="mono">${Ca(e.promptText)}</pre>`;return`<h2>${Ca(e.title)}</h2>${t}${r}${n}${o}`}});var gp,Mo,fp=l(()=>{"use strict";gp=e=>e.toLocaleString("en-US"),Mo=(e,t)=>e.revisions.reduce((r,n)=>t!==void 0&&n.roundNumber>t?r:r+(n.writerTokens??0)+(n.run?.tokens??0)+(n.judgement?.tokens??0),0)});var xb,mq,cI,hp,dI,uI,yp=l(()=>{"use strict";T();iI();lI();fp();xb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mq=(e,t)=>{let r=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',n=/^score-(\d+)$/.exec(e.id),o=e.state==="done"&&n!==null?Mo(t,Number(n[1])):0,s=o>0?`<span class="sdlc-node-reason">${gp(o)} tokens so far</span>`:"",i=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${xb(e.detail)}</span>`:"",a=aI(sI(t,e));return`<li class="sdlc-node sdlc-node-${e.state}"><button type="button" class="sdlc-node-open" data-sdlc-node>${r}<span class="sdlc-node-label">${xb(e.label)}${i}${s}</span></button><template>${a}</template></li>`},cI=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>mq(r,t)).join("")}</ol>`,hp=e=>`<div class="sdlc-score" aria-label="What the score means">${fa(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${xb(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,dI='<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog"><button class="btn btn-secondary" type="submit">Close</button></form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>',uI=`<script>
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
</script>`});var Sp,Ap,bp,pI,Ib=l(()=>{"use strict";Sp="support-reply",Ap="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",bp=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),pI=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Pp,mI,gI=l(()=>{"use strict";T();yp();Ib();Pp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mI=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. <strong>Classic loop (90 / 10 rounds)</strong> skips the wizard: a judge scores the prompt in your folder, an improver rewrites under the pass score, and the loop stops when the score passes, you press Finish, the round limit is hit, or the score has not risen for 3 rounds. After each scored round the page shows tokens spent. The next rewrite starts from the highest scoring prompt; lower scores become an avoid list. The round limit starts at 10 on classic runs (wizard evaluate defaults differ). Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field. The pass score slider defaults to ${90} on classic runs.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>You set the pass score with the slider. The bar fades from a weak score to a pass. The mark is the usual ${90}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${hp(90)}
      <h2>Writers and folder</h2>
      <p>You choose the judge and the improver. Each one has an optional instructions field, used with the goal. Each round the judge runs the prompt in the folder you chose. If the prompt needs an input, put that input in the judge instructions. The judge then reads the git changes, or the files the prompt names, and scores those changes. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder. It does not guess a printed reply, and it does not score the prompt wording. A separate pass checks the tokens and suggests what to cut before the improver runs. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, and improver you last chose. The first visit uses your home directory and leaves the judge and improver blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot runs this loop itself before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a run in that folder. maxRounds is optional and defaults to 10. When only one writer is installed, that writer scores and rewrites. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${Pp(Ap)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Pp(bp)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Pp(pI)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Pp(Sp)}">Run this sample</a>
      </div>
    </section>`});var Ob,_p,gq,fI,hI=l(()=>{"use strict";Ob=m(require("node:fs")),_p=m(require("node:path")),gq=e=>_p.default.join(_p.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),fI=(e,t)=>{let r=gq(e),n=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;Ob.default.mkdirSync(_p.default.dirname(r),{recursive:!0}),Ob.default.appendFileSync(r,n,"utf8")}});var jo,yI,fq,SI,hq,AI,Et,ne,bI,B,gt=l(()=>{"use strict";jo=m(require("node:fs")),yI=m(require("node:path"));T();hI();fq=e=>e.wizard===void 0?e:{...e,wizard:db(e.wizard)},SI=new Set,hq=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),AI=(e,t)=>{jo.default.mkdirSync(yI.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;jo.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),jo.default.renameSync(r,e)},Et=e=>{if(!jo.default.existsSync(e))return[];try{let t=JSON.parse(jo.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(hq).map(fq):[]}catch{return[]}},ne=(e,t)=>Et(e).find(r=>r.id===t)??null,bI=(e,t)=>{SI.add(t);let r=Et(e).filter(n=>n.id!==t);AI(e,r)},B=(e,t)=>{if(SI.has(t.id))return;let r=Et(e),n=r.some(o=>o.id===t.id)?r.map(o=>o.id===t.id?t:o):[t,...r];AI(e,n),fI(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var PI,wp,Nb,_n,Mb,Lt,wn,Ee,qe=l(()=>{"use strict";PI=m(require("node:fs")),wp=m(require("node:os")),Nb=m(require("node:path"));ct();_n="~",Mb=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Lt=e=>{let t=wp.default.homedir(),r=Mb(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},wn=e=>{let t=e.trim().length===0?"~":e.trim(),r=Be(t),n=Nb.default.isAbsolute(r)?Mb(r):Mb(Nb.default.resolve(wp.default.homedir(),r));try{if(!PI.default.statSync(n).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:n,display:Lt(n)}},Ee=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:wp.default.homedir()});var Do,Rt,Ta,_I,vp,yq,wI,vI,WI,jb=l(()=>{"use strict";Do=m(require("node:fs")),Rt=m(require("node:path")),Ta=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},_I=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),vp=(e,t)=>{let r=Ta(e);return r.length>0?r:Ta(t)},yq=e=>{let t=vp(e.fileName,e.name),r=e.promptText.trim(),n=e.name.trim();if(t.length===0||r.length===0||n.length===0)return null;let o=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${_I(n)}`,...o.length>0?[`description: ${_I(o)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},wI=e=>`.cursor/skills/${e}/SKILL.md`,vI=(e,t)=>{let r=Ta(t);if(r.length===0)return!1;let n=Rt.default.resolve(e),o=Rt.default.resolve(n,".cursor","skills"),s=Rt.default.resolve(n,wI(r));return s.startsWith(`${o}${Rt.default.sep}`)?Do.default.existsSync(s):!1},WI=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(vp(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Rt.default.resolve(e.workingDirectory);try{if(!Do.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=yq({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let n=wI(r.slug),o=Rt.default.resolve(t,".cursor","skills"),s=Rt.default.resolve(t,n);if(!s.startsWith(`${o}${Rt.default.sep}`))return{ok:!1,errorCode:"path"};if(Do.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Do.default.mkdirSync(Rt.default.dirname(s),{recursive:!0}),Do.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:n}}});var Sq,EI,LI,RI=l(()=>{"use strict";T();T();gt();qe();Pn();jb();Sq=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,EI=e=>{let t=e.get("savedSkill");return t!==null&&Sq.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},LI=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=ne(e.storePath,t),n=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!M(r.status))return{kind:"redirect",location:n("skillError=working")};let o=he(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(o===null||mt(o.promptText)!==null)return{kind:"redirect",location:n("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=WI({workingDirectory:Ee(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:o.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:n(`skillError=${a}`)}}return{kind:"redirect",location:n(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var C,Aq,Wp,Ke,vn,CI,kI,TI,xI,Me=l(()=>{"use strict";C="manual",Aq=["claude-cli","codex","cursor","antigravity"],Wp={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Ke=e=>e===C?"You":e in Wp?Wp[e]:e,vn=e=>Aq.filter(t=>e.includes(t)),CI=e=>{let t=vn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},kI=(e,t)=>t===C?C:e.find(r=>r===t)??null,TI=(e,t,r)=>{let n=vn(e),o=kI(n,t),s=kI(n,r);return o===null||s===null?null:{judge:o,improver:s}},xI=(e,t,r)=>{let n=vn(e);return t===null||t.trim()===""?r!==C?r:n[0]??null:t===C?null:n.find(o=>o===t)??null}});var Db,II,OI=l(()=>{"use strict";Db={ok:!1,errorMessage:"Stopped.",stopped:!0},II=(e,t,r)=>{if(t===void 0)return;let n=()=>{e.kill("SIGTERM"),r(Db)};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var NI,xa,MI,Hb,bq,Pq,_q,Je,Ia=l(()=>{"use strict";NI=require("node:child_process"),xa=m(require("node:fs")),MI=m(require("node:os")),Hb=m(require("node:path"));Ra();OI();Pn();bq=["claude-cli","codex","cursor","antigravity"],Pq=18e4,_q=e=>bq.includes(e),Je=e=>new Promise(t=>{if(e.signal?.aborted){t(Db);return}if(!_q(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,n=Pt(r,e.prompt,ie({}));if(n===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!xa.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let o=Hb.default.join(xa.default.mkdtempSync(Hb.default.join(MI.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=eI({writerAgent:r,baseArgs:n.args,replyPath:o}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,NI.spawn)(n.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=f=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(f))};II(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??Pq),d.stdout.on("data",f=>{i.push(Buffer.from(f))}),d.stderr.on("data",f=>{a.push(Buffer.from(f))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let f=xa.default.existsSync(o)?xa.default.readFileSync(o,"utf8"):null;p(tI({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:f}))})})});var jI,wq,Oa,Ep,Lp=l(()=>{"use strict";T();Me();jI=e=>e===C?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},wq=(e,t,r,n,o,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:n,reasons:o,rawReply:t,tokens:s}}:i),Oa=(e,t,r=null)=>{let n=e.revisions.find(a=>a.roundNumber===e.currentRound),o=QA({raw:t,passScore:e.passScore,goal:e.goal,promptText:n?.promptText??"",improver:jI(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:ga(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=wq(e,t,o.verdict?.score??null,o.verdict?.passed??null,o.verdict?.reasons??null,r),i=new Date().toISOString();return o.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:o.continuation.type,errorMessage:o.continuation.type==="passed"?null:o.continuation.errorMessage,updatedAt:i}},Ep=(e,t,r=null)=>{let n=np({raw:t,judge:jI(e.judgeModel),goal:e.goal,passScore:e.passScore}),o=new Date().toISOString();return n.nextPrompt===null?{...e,status:"failed",errorMessage:n.continuation.type==="failed"?n.continuation.errorMessage:"The improver reply was empty.",updatedAt:o}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:n.nextPrompt,judgement:null,writerTokens:r}],updatedAt:o}}});var Rp,Fb=l(()=>{"use strict";Rp=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let n=`Token review: ${r}`;return{...e,revisions:e.revisions.map(o=>{if(o.roundNumber!==e.currentRound)return o;let s=o.judgement?.reasons?.trim()??"";return{...o,run:o.run===void 0?o.run:{...o.run,tokenReview:r},judgement:o.judgement===null?o.judgement:{...o.judgement,reasons:s.length===0?n:`${s}

${n}`}}})}}});var FI,kp,Cp,DI,HI,$b,vq,$I,zb,Wq,zI,Eq,Lq,UI,BI=l(()=>{"use strict";FI=require("node:child_process"),kp=m(require("node:fs")),Cp=m(require("node:path"));T();DI=4e3,HI=12e3,$b=(e,t)=>{let r=(0,FI.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},vq=e=>$b(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",$I=e=>{let t=$b(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(n=>{if(n.length<4)return[];let o=n.slice(3).trim();return[[(o.includes(" -> ")?o.split(" -> ").at(-1)??o:o).replaceAll('"',""),n]]});return Object.fromEntries(r)},zb=(e,t)=>{let r=Cp.default.resolve(e,t),n=Cp.default.relative(e,r);if(n.startsWith("..")||Cp.default.isAbsolute(n)||!kp.default.existsSync(r)||!kp.default.statSync(r).isFile())return null;let o=kp.default.readFileSync(r,"utf8");return o.includes("\0")?"(binary file)":o.length>DI?`${o.slice(0,DI)}
\u2026truncated`:o},Wq=e=>e.length>HI?`${e.slice(0,HI)}
\u2026truncated`:e,zI=e=>{let t=nb(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(o=>[o,zb(e.workingDirectory,o)])),n=vq(e.workingDirectory);return{git:n,status:n?$I(e.workingDirectory):{},files:r,paths:t}},Eq=(e,t)=>{let r=$b(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let n=zb(e,t);return n===null?`${t} is missing.`:n},Lq=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",UI=e=>{let t=e.before.git?$I(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),n=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=zb(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),o=r.map(a=>Eq(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",o.length>0?`Changes since the run started:
${o.join(`
`)}`:"",n.length>0?`Files named in the prompt:
${n.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:Lq(e.before.git,e.before.paths.length>0),evidence:Wq(i.join(`

`))}}});var Gb,$,Vb,ye,GI,Rq,kq,VI,Ho,qI,Fo,Cq,Tq,Na,Ub,Bb,xq,KI,Iq,Oq,Nq,JI,Mq,YI,XI,jq,Dq,ZI,QI=l(()=>{"use strict";Gb=require("node:child_process"),$=m(require("node:fs")),Vb=m(require("node:os")),ye=m(require("node:path")),GI=8e6,Rq=16e6,kq=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],VI=(e,t)=>{let r=(0,Gb.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Ho=(e,t)=>(0,Gb.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,qI=e=>{let t=VI(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let n=r.slice(3).trim().replaceAll('"',"");return(n.includes(" -> ")?n.split(" -> "):[n]).map(s=>[s.trim(),r])}))},Fo=(e,t)=>{let r=ye.default.resolve(e,t),n=ye.default.relative(e,r);return n.startsWith("..")||ye.default.isAbsolute(n)?null:r},Cq=(e,t)=>{let r=Fo(e,t);if(r===null||!$.default.existsSync(r))return null;let n=$.default.statSync(r);return!n.isFile()||n.size>GI?null:$.default.readFileSync(r)},Tq=(e,t,r)=>{let n=Fo(e,t);n!==null&&($.default.mkdirSync(ye.default.dirname(n),{recursive:!0}),$.default.writeFileSync(n,r))},Na=(e,t)=>{let r=Fo(e,t);r===null||!$.default.existsSync(r)||$.default.rmSync(r,{recursive:!0,force:!0})},Ub=(e,t)=>Ho(e,["cat-file","-e",`HEAD:${t}`]),Bb=e=>{let t=VI(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},xq=e=>ye.default.resolve(e)!==ye.default.resolve(Vb.default.homedir()),KI=e=>{if(!$.default.existsSync(e))return 0;let t=$.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?$.default.readdirSync(e).reduce((r,n)=>r+KI(ye.default.join(e,n)),0):0},Iq=(e,t,r)=>{let n=Fo(e,r);if(n===null||!$.default.existsSync(n))return{relativePath:r,existed:!1,copyDir:null};if(KI(n)>Rq)return{relativePath:r,existed:!0,copyDir:null};let o=ye.default.join(t,"cache",r);return $.default.mkdirSync(ye.default.dirname(o),{recursive:!0}),$.default.cpSync(n,o,{recursive:!0}),{relativePath:r,existed:!0,copyDir:o}},Oq=400,Nq=32e6,JI=e=>{let t=[],r=0,n=!0,o=s=>{if(!(!n||!$.default.existsSync(s)))for(let i of $.default.readdirSync(s)){if(!n||i===".git"||i==="node_modules")continue;let a=ye.default.join(s,i),c=$.default.statSync(a);if(c.isDirectory()){o(a);continue}if(!(!c.isFile()||c.size>GI)){if(t.length>=Oq||r+c.size>Nq){n=!1;return}r+=c.size,t.push(ye.default.relative(e,a))}}};return o(e),{paths:t,complete:n}},Mq=(e,t,r)=>{let n=Fo(e,r);if(n===null||!$.default.existsSync(n))return null;let o=Cq(e,r);if(o===null)return"skip";let s=ye.default.join(t,"files",r);return $.default.mkdirSync(ye.default.dirname(s),{recursive:!0}),$.default.writeFileSync(s,o),s},YI=e=>{let t=$.default.mkdtempSync(ye.default.join(Vb.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?qI(e.workingDirectory):{},n=e.git?{paths:[],complete:!0}:JI(e.workingDirectory),o=e.git?[...Object.keys(r),...e.namedPaths]:[...n.paths,...e.namedPaths],s=Object.fromEntries([...new Set(o)].map(i=>[i,Mq(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?Bb(e.workingDirectory):null,isolateCaches:xq(e.workingDirectory),complete:n.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:kq.map(i=>Iq(e.workingDirectory,t,i))}},XI=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Na(e.workingDirectory,t);return}Tq(e.workingDirectory,t,$.default.readFileSync(r))}},jq=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?XI(e,t):Ub(e.workingDirectory,t)?Ho(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Na(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",n=r.startsWith(" ")||r.startsWith("?");n&&Ub(e.workingDirectory,t)&&Ho(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),n&&!Ub(e.workingDirectory,t)&&Ho(e.workingDirectory,["reset","-q","HEAD","--",t])},Dq=(e,t)=>{let r=Fo(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Na(e.workingDirectory,t.relativePath),$.default.mkdirSync(ye.default.dirname(r),{recursive:!0}),$.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Na(e.workingDirectory,t.relativePath);return}if($.default.existsSync(r))for(let n of $.default.readdirSync(r)){let o=ye.default.join(r,n);$.default.statSync(o).mtimeMs>=e.startedMs-1e3&&$.default.rmSync(o,{recursive:!0,force:!0})}}}},ZI=e=>{try{if(e.git){if(Bb(e.workingDirectory)!==e.head&&(!(e.head===null?Ho(e.workingDirectory,["update-ref","-d","HEAD"]):Ho(e.workingDirectory,["reset","--hard",e.head]))||Bb(e.workingDirectory)!==e.head))throw new Error("head");let r=qI(e.workingDirectory);for(let n of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))jq(e,n)}else{if(e.complete)for(let t of JI(e.workingDirectory).paths)e.files[t]===void 0&&Na(e.workingDirectory,t);for(let t of Object.keys(e.files))XI(e,t)}for(let t of e.caches)Dq(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{$.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Tp,xp,Hq,Fq,$q,zq,Uq,eO,Bq,tO,rO=l(()=>{"use strict";T();Lp();Fb();BI();QI();Me();qe();Ia();Tp=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),xp=e=>({...e,status:"stopped",errorMessage:yn,judgePhase:void 0,updatedAt:new Date().toISOString()}),Hq=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),Fq=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==C?t:e.improverModel!==C?e.improverModel:null}return e.judgeModel!==C?e.judgeModel:e.improverModel!==C?e.improverModel:null},$q=async e=>{let t=Ee(e.cycle),r=zI({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),n=YI({workingDirectory:t,git:r.git,namedPaths:r.paths}),o=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Sb({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Aa(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):ma({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await Je({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?UI({workingDirectory:t,before:r,writerReply:i.text}):null,c=ZI(n);return i.ok?!c.ok||a===null?{ok:!1,cycle:Tp(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-o,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:xp(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Tp(e.cycle,i.errorMessage)})},zq=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:$q({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),Uq=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),eO=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let n=await Je({writerAgent:e.reviewer,workingDirectory:Ee(e.cycle),prompt:rb({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return n.ok?{kind:"suggestion",text:n.text.trim(),tokens:n.tokens}:n.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:xp(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},Bq=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===C)return t;let n={...t,judgePhase:"scoring"};e.onProgress?.(n);let o=await Je({writerAgent:t.judgeModel,workingDirectory:Ee(t),prompt:tb({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return o.ok?{...Oa(n,o.text,o.tokens),judgePhase:void 0}:o.stopped===!0||e.signal?.aborted===!0?xp(n):(e.onWriterFailure?.(t.judgeModel),Tp(n,o.errorMessage))},tO=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return Bq(e);let n=Fq(t),o=await zq({cycle:t,revision:r,runner:n,signal:e.signal,onWriterFailure:e.onWriterFailure});if(o===null)return t;if(!o.ok)return o.cycle;let s=r.run===void 0?Hq(t,o.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===C){let p=await eO({cycle:s,run:o.run,promptText:r.promptText,reviewer:n,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...Uq(s,p.text),judgePhase:void 0}}let i=await Je({writerAgent:t.judgeModel,workingDirectory:Ee(t),prompt:ZA({goal:t.goal,lookedAt:o.run.lookedAt??"the writer reply",evidence:o.run.evidence??o.run.output,tokens:o.run.tokens,delayMs:o.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?xp(s):(e.onWriterFailure?.(t.judgeModel),Tp(s,i.errorMessage));let a=await eO({cycle:s,run:o.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Oa(s,i.text,c);return Rp(d,a.text)}});var Ip,qb=l(()=>{"use strict";T();Ip=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t?.judgement?.score,n=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||n.length===0?null:pa({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:n},priorRounds:ga(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null})),e.currentRound)})}});var Op,Gq,Vq,Kb,nO=l(()=>{"use strict";T();Lp();rO();qb();Me();qe();Ia();Op=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),Gq=e=>({...e,status:"stopped",errorMessage:yn,updatedAt:new Date().toISOString()}),Vq=(e,t,r,n,o)=>t.ok?null:t.stopped===!0||n?.aborted===!0?Gq(e):(o?.(r),Op(e,t.errorMessage)),Kb=async(e,t,r,n)=>{let o=e.revisions.find(c=>c.roundNumber===e.currentRound);if(o===void 0)return Op(e,"This round has no prompt.");if(e.status==="judging")return tO({cycle:e,revision:o,onWriterFailure:t,signal:r,onProgress:n});if(e.status!=="improving")return Op(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===C)return e;let s=Ip(e);if(s===null)return Op(e,"The improver needs the score and the reason.");let i=await Je({writerAgent:e.improverModel,workingDirectory:Ee(e),prompt:ca({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=Vq(e,i,e.improverModel,r,t);return a!==null?a:Ep(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var jp,Np,oO,qq,Kq,Mp,sO,iO,Jq,Yq,aO,lO,cO,Jb=l(()=>{"use strict";T();Me();qe();Ia();nO();kb();jp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),Np=(e,t,r)=>e.wizard===void 0||t===null?jp(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},oO=e=>{let t=e.wizard;return t===void 0||ka(e).length===0?e:{...e,wizard:xo({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},qq=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",Kq=e=>{let t=e.wizard;if(t===void 0)return e;let r=Sa({revisions:e.revisions});if(r.rounds.length===0)return e;let n=t.modules[t.currentModuleIndex];return{...e,wizard:xo({wizard:t,step:"optimize_modules",output:{moduleId:n?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Mp=(e,t)=>({...e,status:"wizard_paused",errorMessage:e.errorMessage,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),sO=e=>e.judgeModel!==C?e.judgeModel:e.improverModel!==C?e.improverModel:null,iO=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let o=r.attempts.filter(s=>s.step===t).at(-1);return o===void 0?"":JSON.stringify(o.output)},Jq=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=sO(e);if(o===null)return jp(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??_a(n),i=gb({goal:e.goal,sourcePrompt:s,avoid:n.avoidByStep.generalize,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:iO(e,"generalize")}),a=await Je({writerAgent:o,prompt:i,workingDirectory:Ee(e),signal:t});if(!a.ok)return r?.(o),Np(e,"generalize",a.errorMessage);try{let c=wb(a.text),d=xo({wizard:{...n,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Ea(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return Mp({...e,wizard:d},"generalize")}catch(c){return Np(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},Yq=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=sO(e);if(o===null)return jp(e,"Choose a writer to suggest splits.");let s=wa({wizard:n,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=yb({goal:e.goal,templatedPrompt:n.templatedPrompt,variables:n.variables,evaluatedPromptReference:s,avoid:n.avoidByStep.separate,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:iO(e,"separate")}),a=await Je({writerAgent:o,prompt:i,workingDirectory:Ee(e),signal:t});if(!a.ok)return r?.(o),Np(e,"separate",a.errorMessage);try{let c=vb(a.text),d=fb(c,n.variables),p=xo({wizard:{...n,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return Mp({...e,wizard:p},"separate")}catch(c){return Np(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},aO=e=>{let t=e.wizard;if(t===void 0)return e;let r=_a(t),n=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:70,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:n}},lO=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let n=r.modules[t];if(n===void 0)return jp(e,"This module is missing.");let o=An(r),s=va(n.prompt,o),i=e.runnerModel!==void 0&&e.runnerModel!==C?e.runnerModel:e.judgeModel!==C?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:70,maxRounds:1,errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},cO=async(e,t,r,n)=>{let o=e.wizard;if(o===void 0)return Kb(e,t,r,n);if(o.gate!==null||e.status==="wizard_paused")return e;if(o.phase==="generalize")return Jq(e,r,t);if(o.phase==="separate"&&o.splitOptions.length===0)return Yq(e,r,t);if(o.phase==="evaluate"||o.phase==="optimize_modules"){let s=await Kb(e,t,r,n);if(M(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&ka(s).length===0)return s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let p=he(s.revisions.map(b=>({roundNumber:b.roundNumber,promptText:b.promptText,score:b.judgement?.score??0,reasons:b.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0,f=Mp({...s,wizard:{...s.wizard,evaluateSelectedRound:p}},i);return i==="evaluate"?oO(f):f}let a=Mp(s,i),c=i==="optimize_modules"&&a.wizard!==void 0?(()=>{let d=bb({wizard:{...a.wizard,modules:a.wizard.modules.map((p,f)=>f===a.wizard.currentModuleIndex&&p.status==="running"?{...p,status:"paused"}:p)},moduleIndex:a.wizard.currentModuleIndex,revisions:a.revisions,cycleStatus:qq(s.status)});return{...a,wizard:d}})():a;return i==="evaluate"?oO(c):Kq(c)}return s}return o.phase==="complete",e}});var vr,dO,Xq,uO=l(()=>{"use strict";T();qe();Pn();jb();vr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dO=e=>{if(!M(e.status))return"";let t=he(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,n=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",o=mt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${vr(t.reasons.trim())}</p>`,i=o===null?Xq({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Ee(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${vr(o)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${n}${s}${i}</section>`},Xq=e=>{let t=e.sourceSkill?.fileName??Ta(e.goal),r=e.sourceSkill?.name??t,n=e.sourceSkill?.description??e.goal,o=vp(t,r),s=o.length>0&&vI(e.workingDirectory,o),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${vr(o)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${vr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${vr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${vr(n)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${vr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${vr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var pO,mO=l(()=>{"use strict";T();Me();Pn();pO=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!M(e.status)){let t=e.judgeModel;return{title:`${Ke(t)} is suggesting module splits.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!M(e.status)){let t=e.judgeModel;return{title:`${Ke(t)} is generalizing your prompt.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===C?{title:`Score the prompt text for round ${e.currentRound+1}.`,detail:"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."}:e.judgePhase==="scoring"?{title:`${Ke(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"No folder run in step 2. This panel keeps updating, so the page is not stuck."}:{title:`${Ke(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"Wizard evaluate revises prompt wording before the runner executes in step 4."};if(e.status==="judging"&&e.judgeModel===C){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==C?{title:`${Ke(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"You score the changes after this run."}:{title:`Score the changes from round ${e.currentRound+1}.`,detail:t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt."}}if(e.status==="judging"&&e.judgePhase==="reviewing")return{title:`${Ke(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,detail:"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck."};if(e.status==="judging"&&e.judgePhase==="scoring")return{title:`${Ke(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,detail:"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck."};if(e.status==="judging")return{title:`${Ke(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck."};if(e.status==="improving"&&e.improverModel===C){let t=e.revisions.find(n=>n.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return{title:"Rewrite the prompt.",detail:t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`}}if(e.status==="improving")return{title:`${Ke(e.improverModel)} is rewriting the prompt.`,detail:"That writer is working on this Mac. This panel keeps updating, so the page is not stuck."};if(e.status==="passed")return{title:"This prompt passed.",detail:""};if(e.status==="stopped"){let t=e.revisions.some(o=>mt(o.promptText)!==null),r=e.errorMessage?.trim()??"";return e.wizard!==void 0?{title:"Wizard ended.",detail:r.length>0?r:"Progress from finished steps is kept."}:{title:(e.errorMessage??"").startsWith("Finished")?"Finished.":"Stopped.",detail:r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept."}}return M(e.status)?{title:"This run stopped because a reply could not be used.",detail:""}:{title:"Working on this Mac.",detail:"This panel keeps updating."}}});var kt,Ma=l(()=>{"use strict";Me();kt=e=>{if(e.status==="improving"&&e.improverModel===C)return!0;if(e.status!=="judging"||e.judgeModel!==C)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===C}});var gO,fO=l(()=>{"use strict";gO=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Wr,Zq,hO,yO=l(()=>{"use strict";T();Wr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zq=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Wr(r)}</p>`},hO=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Wr(e.cycleId)}">`,n=e.instructions?.trim()??"",o=n.length===0?"":`<p class="muted">Instructions</p><p>${Wr(n)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Wr(a)}.</p>`}<pre class="mono">${Wr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${wr(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Wr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${o}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",f=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Wr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${o}${Zq(e.score,e.reasons)}${f}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Wr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var ja,Qq,SO,AO=l(()=>{"use strict";T();Pn();ja=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qq=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,n=mt(t.promptText),o=t.judgement?.reasons?`<p class="muted">${ja(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${ja(i)}.</p>`}<pre class="mono">${ja(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${wr(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=n===null?`<pre class="mono">${ja(d)}</pre>`:`<div class="alert-error">${ja(n)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${o}${a}${p}</article>`},SO=e=>e.revisions.map(t=>Qq(e,t)).join("")});var bO,PO=l(()=>{"use strict";T();bO=e=>{if(M(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Da,eK,tK,rK,_O,wO,Yb=l(()=>{"use strict";PO();Da=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eK=e=>`<form method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Da(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,tK=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions"><input type="hidden" name="cycleId" value="${Da(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,rK=e=>{let t=Da(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Da(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button>
    </form>
  </div>`},_O=e=>{let t=bO(e);return t==="none"?"":t==="classic"?eK(e.id):t==="wizard_end_only"?tK(e.id):rK(e)},wO=e=>e.wizard===void 0||e.status!=="wizard_paused"?"":`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end"><input type="hidden" name="cycleId" value="${Da(e.id)}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`});var Ha,nK,vO,WO=l(()=>{"use strict";T();mp();Ha=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nK=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=ba(t),n=r.terminalStatusSuggestion==="passed"?`${r.passedModuleCount} of ${r.totalModules} modules passed (score \u2265 ${70}).`:`${r.passedModuleCount} of ${r.totalModules} modules passed. Some modules were skipped, stopped, or below ${70}.`,o=r.rows.map(s=>`<tr><td>${Ha(s.title)}</td><td>${s.bestScore??"\u2014"}</td><td>${s.tokens??"\u2014"}</td><td>${Ha(s.status)}</td></tr>`).join("");return`<h3>Modules</h3><p class="muted">${Ha(n)}</p><table class="sdlc-wizard-outcome-table"><thead><tr><th>Module</th><th>Best score</th><th>Tokens</th><th>Status</th></tr></thead><tbody>${o}</tbody></table>`},vO=e=>{if(e.wizard===void 0||!M(e.status))return"";let r=e.status==="passed"?"Wizard complete":e.status==="stopped"?"Wizard ended":"Wizard stopped",n=nK(e),o=["wizard-1","wizard-2","wizard-3","wizard-4"].map(s=>{let i=No(e,s);return i.trim().length===0?"":`<details class="sdlc-wizard-outcome-step"><summary>${Ha(s==="wizard-1"?"Step 1 \u2014 Generalize":s==="wizard-2"?"Step 2 \u2014 Evaluate":s==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules")}</summary><div class="sdlc-wizard-outcome-step-body">${i}</div></details>`}).join("");return`<section class="card sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><p class="eyebrow">Wizard outcome</p><h2>${Ha(r)}</h2>${n}${o}</section>`}});var Fa,Dp,Xb=l(()=>{"use strict";T();yp();uO();mO();Ma();fO();qb();yO();AO();Yb();WO();fp();qe();Fa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dp=e=>{let t=!M(e.status)&&e.status!=="wizard_paused"&&!kt(e),r=pO(e),n=cI(ab(gO(e)),e),o=M(e.status)?"":_O(e),s=vO(e),i=dO(e),a=e.errorMessage===null?"":`<div class="alert-error">${Fa(e.errorMessage)}</div>`,c=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",d=t?" Working for <span data-elapsed>0s</span>.":"",p=r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Fa(r.detail)}${d}</p>`,f=e.revisions.find(ee=>ee.roundNumber===e.currentRound),b=e.status==="improving"?Ip(e):null,h=Mo(e),y=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),u=kt(e)?hO({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:b?.promptText??f?.promptText??"",score:b?.score??f?.judgement?.score??null,reasons:b?.reasons??f?.judgement?.reasons??null,avoid:b?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:y?1:0}):"",S=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules"?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${hp(e.passScore)}</div>`:"",g=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':M(e.status)?'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",_=t?c:'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',w=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Fa(Lt(Ee(e)))}</li>`:"",h>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${gp(h)} so far</li>`:""].filter(ee=>ee.length>0),W=w.length===0?"":`<ul class="sdlc-run-meta">${w.join("")}</ul>`,L=o.length===0?"":`<div class="sdlc-run-actions">${o}</div>`,R=`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${n}</div>`,k=S.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${R}</div>`:`<div class="sdlc-run-grid">${R}${S}</div>`,x=SO(e),D=x.length===0?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${x}</div></section>`;return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Fa(e.updatedAt)}" aria-busy="${t?"true":"false"}"><header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${g}</div><div class="sdlc-run-activity"><div class="sdlc-run-activity-icon">${_}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Fa(r.title)}</h2>${p}</div></div>${W}${L}</header>${a}${k}${u}${s}${i}</section>${D}`}});var EO,$o,Hp=l(()=>{"use strict";T();EO=e=>bn.indexOf(e),$o=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||M(e.status)?bn.length:t.gate!==null?EO(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?EO(t.phase):null}});var LO,RO=l(()=>{"use strict";LO=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Wn,kO,CO=l(()=>{"use strict";T();RO();Wn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kO=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,n=Aa(t,r),o=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Wn(LO(n))}</pre></div>`:"",s=Wa(e.modulePrompt);if(s.length===0)return o.length>0?`<div class="sdlc-wizard-module-params">${o}</div>`:"";let i=An(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=cp(c),f=i[c]??"",b=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Wn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Wn(p)}">${Wn(b)}</label>
        ${h}
        <input class="input" type="text" id="${Wn(p)}" name="${Wn(p)}" value="${Wn(f)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${o}${a}</div>`}});var Ct,TO,xO=l(()=>{"use strict";T();CO();Cb();pp();Yb();Ct=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),TO=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let n=r.gate,o=n==="generalize"?"Step 1 \u2014 Generalize":n==="evaluate"?"Step 2 \u2014 Evaluate":n==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=n==="generalize"?`<ul class="sdlc-wizard-vars">${r.variables.map(_=>`<li><strong>{{${Ct(_.name)}}}</strong> \u2014 ${Ct(_.description)} (sample: ${Ct(_.sampleValue)})</li>`).join("")}</ul><pre class="sdlc-pre">${Ct(r.templatedPrompt)}</pre>`:"",i=n==="evaluate"?Oo({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",c=n==="separate"?`${n==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(_=>{let w=_.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',W=_.recommended?' <span class="sdlc-badge">Recommended</span>':"",L=r.selectedSplitOptionId===_.id||r.selectedSplitOptionId===null&&_.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${Ct(_.id)}" required${L}> <strong>${Ct(_.title)}</strong>${w}${W}<br><span class="muted">${Ct(_.summary)}</span></label>${up(_)}</li>`}).join("")}</ul>`:"",d=r.modules[r.currentModuleIndex],p=d?.title??"Module",f=d?.prompt??"",b=d?.status==="pending",h=n==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Ct(p)}</p>${b?kO({cycle:e,modulePrompt:f}):""}<p class="muted">Test run prompt preview: ${Ct(va(f,An(r)))}</p>${d?.statistics===null||d?.statistics===void 0?"":`<p class="muted">Module stats: best ${d.statistics.bestScore??"\u2014"} / ${e.passScore} (round ${d.statistics.bestRound??"\u2014"}).</p>`}${Oo({cycle:e,interactive:!1,caption:b?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${p}\u201D (runner + judge).`})}`:"",y=n==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":n==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":n==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":b?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",u=Pb(r),A=u===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${u}</p>`,S=t?.active===!0?" sdlc-wizard-gate-active":"",g=t?.active===!0?' id="prompt-optimizer-wizard-active-step"':"";return`<section class="card sdlc-wizard-gate${S}"${g}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${o}</h2>
    <p class="sdlc-wizard-gate-lede">${y}</p>
    ${A}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Ct(e.id)}">
    ${s}
    ${i}
    ${c}
    ${h}
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
    ${wO(e)}
  </section>`}});var oK,IO,OO=l(()=>{"use strict";T();oK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IO=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||M(e.status))return"";if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>Suggesting module splits</h2>
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let r=t.currentModuleIndex,o=t.modules[r]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    <h2>Module ${r+1} of ${t.modules.length}: ${oK(o)}</h2>
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
  </section>`:""}});var sK,iK,aK,NO,MO=l(()=>{"use strict";T();Hp();xO();OO();mp();sK={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},iK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aK=(e,t,r)=>`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${iK(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${No(e,t)}</div>
</details>`,NO=e=>{let t=e.wizard;if(t===void 0)return"";let r=$o(e);if(r===null)return"";let n=bn.slice(0,r).map((i,a)=>aK(e,`wizard-${a+1}`,sK[i])),o=t.gate!==null?TO(e,{active:!0}):IO(e),s=r>=bn.length?"":o;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${n.join("")}${s}</div>`}});var Fp,Zb=l(()=>{"use strict";MO();pp();Fp=e=>{if(e===null)return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=NO(e),r=nI(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var Qb,jO,DO,$p,HO,zp=l(()=>{"use strict";T();gt();Qb=new Map,jO=e=>{let t=new AbortController;return Qb.set(e,t),t.signal},DO=e=>{Qb.delete(e)},$p=e=>{Qb.get(e)?.abort()},HO=(e,t)=>{let r=ne(e,t);return r===null||r.wizard!==void 0?!1:(M(r.status)||(B(e,{...r,status:"stopped",errorMessage:yn,updatedAt:new Date().toISOString()}),$p(t)),!0)}});var $a,Up,FO,eP,$O,zO,UO,BO,tP=l(()=>{"use strict";$a=m(require("node:fs")),Up=m(require("node:path")),FO=e=>Up.default.join(Up.default.dirname(e),"prompt-optimizer-writer-ready.json"),eP=e=>{let t=FO(e);if(!$a.default.existsSync(t))return{};try{let r=JSON.parse($a.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},$O=(e,t)=>{$a.default.mkdirSync(Up.default.dirname(e),{recursive:!0}),$a.default.writeFileSync(FO(e),`${JSON.stringify(t,null,2)}
`)},zO=(e,t)=>eP(e)[t]?.message??null,UO=(e,t,r)=>{$O(e,{...eP(e),[t]:{message:r}})},BO=(e,t)=>{let r=eP(e);r[t]!==void 0&&$O(e,Object.fromEntries(Object.entries(r).filter(([n])=>n!==t)))}});var rP,Bp,Gp,GO,xe,En=l(()=>{"use strict";T();Ra();Jb();Ma();zp();tP();gt();rP=new Set,Bp={atMs:0,ids:[]},Gp=async()=>{if(Date.now()-Bp.atMs<3e4)return Bp.ids;let e=await ut({commands:ie({})});return Bp.atMs=Date.now(),Bp.ids=e.installedWriterIds,e.installedWriterIds},GO=async(e,t,r)=>{let n=ne(e,t);if(n===null||M(n.status)||n.status==="wizard_paused"||kt(n)||r.aborted)return;let o=await cO(n,i=>{BO(e,i)},r,i=>{ne(e,t)?.status==="stopped"||r.aborted||B(e,i)});ne(e,t)?.status==="stopped"||r.aborted||(B(e,o),M(o.status)||await GO(e,t,r))},xe=(e,t)=>{if(rP.has(t))return;let r=ne(e,t);if(r===null||M(r.status)||r.status==="wizard_paused"||kt(r))return;rP.add(t);let n=jO(t);GO(e,t,n).finally(()=>{rP.delete(t),DO(t)})}});var zo,Vp=l(()=>{"use strict";Xb();Zb();En();zo=(e,t)=>(xe(e,t.id),`${Dp(t)}${Fp(t)}`)});var VO,qO,KO=l(()=>{"use strict";VO=(e,t)=>e.revisions.find(n=>n.roundNumber===t)?.judgement?.score??null,qO=e=>e!==null&&e>0});var qp,JO,nP=l(()=>{"use strict";T();zp();qp=e=>($p(e.id),{...e,status:"stopped",errorMessage:BA,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null,phase:"complete"},updatedAt:new Date().toISOString()}),JO=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;$p(e.id);let r=t.currentModuleIndex,n=t.modules.map((o,s)=>s===r?{...o,status:"stopped"}:o);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:n,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var lK,YO,cK,XO,ZO=l(()=>{"use strict";T();Jb();Vp();gt();En();KO();nP();lK="Pick a revision scored above 0 before continuing to Separate.",YO=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),cK=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null})),XO=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",n=t.get("intent")??"";if(!n.startsWith("wizard-"))return!1;let o=t.get("cycleId")?.trim()??"",s=ne(e.storePath,o);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=ne(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(zo(e.storePath,d))};if(n==="wizard-stop-all"){let c=qp(s);return B(e.storePath,c),a(o),!0}if(n==="wizard-skip-module"){let c=JO(s);return B(e.storePath,c),a(o),!0}if(n==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(o),!0;let p=t.get("wizardStepInstructions")?.trim()??"",f=ub(s.wizard,d,c);f=pb(f,d),f={...f,pendingStepInstructions:p};let b={...s,status:"judging",wizard:{...f,gate:null},updatedAt:new Date().toISOString()};return B(e.storePath,b),xe(e.storePath,o),a(o),!0}if(n==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(o),!0;if(c==="generalize"){let p=(s.errorMessage?.trim().length??0)>0?YO(s):aO({...s,wizard:{...s.wizard,gate:null}});return B(e.storePath,p),xe(e.storePath,o),a(o),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),f=VO(s,p??-1);if(!qO(f)){let y={...s,errorMessage:lK,updatedAt:new Date().toISOString()};return B(e.storePath,y),a(o),!0}let b={...s.wizard,evaluateSelectedRound:p},h={...s,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...b,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()};return B(e.storePath,h),xe(e.storePath,o),a(o),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0){let y=YO(s);return B(e.storePath,y),xe(e.storePath,o),a(o),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",f=s.wizard.splitOptions.find(y=>y.id===p);if(f===void 0){let y={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return B(e.storePath,y),a(o),!0}let b=cK(f),h={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...s.wizard,gate:"optimize_modules",selectedSplitOptionId:p,selectedSplitTopology:f.topology,modules:b,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(s.wizard.parameterValues??{}).length>0?s.wizard.parameterValues??{}:Ea(s.wizard.variables)},updatedAt:new Date().toISOString()};return B(e.storePath,h),a(o),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(o),!0;let f=Lb({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!f.ok){let u={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return B(e.storePath,u),a(o),!0}let b={...s.wizard,parameterValues:f.parameterValues};if(p.status==="pending"){let u=lO({...s,wizard:{...b,gate:null}},d);return B(e.storePath,u),xe(e.storePath,o),a(o),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=ba(b),A={...s,status:u.terminalStatusSuggestion,wizard:{...b,gate:null,phase:"complete"},updatedAt:new Date().toISOString()};return B(e.storePath,A),a(o),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...b,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return B(e.storePath,y),a(o),!0}}return a(o),!0}});var dK,QO,uK,oP,pK,eN,tN=l(()=>{"use strict";Me();zp();nP();Fb();Lp();Ma();gt();dK="Add a score from 0 to 100 and the reason for it.",QO="Add a score from 1 to 100 and the reason for it.",uK="Write the next prompt.",oP="This step is not waiting for you.",pK=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},eN=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=ne(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(B(e.storePath,qp(a)),{kind:"saved",cycleId:i}):HO(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",n=ne(e.storePath,r);if(n===null||!kt(n))return n===null?{kind:"missing"}:{kind:"invalid",cycle:n,errorMessage:oP};if(t==="manual-judge"){if(n.judgeModel!==C)return{kind:"invalid",cycle:n,errorMessage:oP};let i=pK(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=n.wizard!==void 0&&(n.wizard.phase==="evaluate"||n.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:n,errorMessage:c?QO:dK};if(c&&i===0)return{kind:"invalid",cycle:n,errorMessage:QO};let d=n.revisions.find(f=>f.roundNumber===n.currentRound)?.run?.tokenReview??"",p=Rp(Oa(n,JSON.stringify({score:i,passed:i>=n.passScore,reasons:a})),d);return B(e.storePath,p),{kind:"saved",cycleId:n.id}}if(n.improverModel!==C)return{kind:"invalid",cycle:n,errorMessage:oP};let o=(e.posted.get("prompt")??"").trim();if(o.length===0)return{kind:"invalid",cycle:n,errorMessage:uK};let s=Ep(n,o);return B(e.storePath,s),{kind:"saved",cycleId:n.id}}});var rN,nN=l(()=>{"use strict";rN=`<script>
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
</script>`});var oN,sN=l(()=>{"use strict";oN=`<script>
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
    document.dispatchEvent(new CustomEvent("sdlc-live-restart"));
  };

  const formDataFromSubmit = (form, submitter) =>
    submitter instanceof HTMLElement
      ? new FormData(form, submitter)
      : new FormData(form);

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
      if (form.classList.contains("sdlc-form")) return;
      const body = formDataFromSubmit(form, event.submitter);
      const intent = body.get("intent");
      if (typeof intent !== "string" || !intent.startsWith("wizard-")) return;
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
  focusActiveWizardStep();
})();
</script>`});var iN,aN=l(()=>{"use strict";iN=`<script>
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
      if (details instanceof HTMLDetailsElement) details.open = true;
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
</script>`});var lN,cN=l(()=>{"use strict";T();qe();lN=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),n=t.wizard?.templatedPrompt.trim()??"",o=n.length>0?n:r?.promptText??e.prompt;return{goal:t.goal,prompt:o,folder:t.workingDirectory===void 0?e.folder:Lt(t.workingDirectory),passScore:String(t.passScore),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!M(t.status)}}});var Kp,sP=l(()=>{"use strict";Kp=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",n=r.length>0?r:"Untitled run";return n.length<=72?n:`${n.slice(0,71).trimEnd()}\u2026`}});var za,mK,gK,dN,uN=l(()=>{"use strict";sP();Hp();za=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mK=e=>{if(e.wizard===void 0)return`round ${e.currentRound}`;let t=$o(e);return t===null?`${e.status} \xB7 wizard`:t>=4?`${e.status} \xB7 Wizard complete`:`${e.status} \xB7 Wizard \xB7 Step ${t+1}`},gK=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${za(t)}">`;return`<li><div><a href="/prompt-optimizer?cycle=${za(e.id)}">${za(Kp(e.goal))}</a><p class="muted">${za(mK(e))}</p></div><form method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${za(e.id)}">${r}<button class="btn btn-secondary" type="submit">Delete</button></form></li>`},dN=(e,t)=>e.length===0?'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>':`<section class="card"><h2>History</h2><ul class="sdlc-history">${e.slice(0,20).map(n=>gK(n,t)).join("")}</ul></section>`});var iP,Jp,pN,fK,hK,aP,mN,lP=l(()=>{"use strict";iP=m(require("node:fs")),Jp=m(require("node:path"));qe();pN=/^[a-z0-9-]+$/,fK=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},hK=(e,t)=>{if(!pN.test(t))return null;let r=e.replace(/^\uFEFF/,""),n=t,o="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let f=fK(p[2]??"");p[1]==="name"&&f.length>0&&(n=f),p[1]==="description"&&(o=f)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:n,description:o,promptText:i}},aP=e=>{let t=wn(e);if(!t.ok)return[];let r=Jp.default.resolve(t.path,".cursor","skills"),n=[];try{n=iP.default.readdirSync(r)}catch{return[]}return n.filter(o=>pN.test(o)).flatMap(o=>{let s=Jp.default.resolve(r,o,"SKILL.md");if(!s.startsWith(`${r}${Jp.default.sep}`))return[];try{let i=hK(iP.default.readFileSync(s,"utf8"),o);return i===null?[]:[i]}catch{return[]}}).toSorted((o,s)=>o.fileName.localeCompare(s.fileName))},mN=(e,t)=>aP(e).find(r=>r.fileName===t)??null});var gN,Yp,cP=l(()=>{"use strict";T();gN=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,2}$/.test(t)||r<1||r>30?{ok:!1,errorMessage:`Round limit must be a whole number from 1 to ${30}.`}:{ok:!0,maxRounds:r}},Yp=e=>e?.trim()||String(10)});var fN,hN=l(()=>{"use strict";fN={goal:{title:"Goal",practice:"Write the outcome a reader can check. Name who it is for and what must stay true.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Pass score",practice:"The run passes at this score. 90 is the usual bar. Lower it when a useful prompt is enough.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var Ua,yK,SK,Se,Ln=l(()=>{"use strict";hN();Ua=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yK='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>',SK=e=>{let t=fN[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Ua(t.title)}" aria-describedby="${r}" aria-expanded="false">${yK}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Ua(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Ua(t.example)}</span></span></button>`},Se=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Ua(r)}"`}>${Ua(e)}</span>${SK(t)}</span>`});var yN,SN=l(()=>{"use strict";T();cP();Ln();yN=e=>{let t=Yp(e);return`<div class="field">${Se("Round limit","roundLimit")}<input class="input" type="number" name="maxRounds" min="1" max="${30}" step="1" value="${t}"><span class="muted">Stops after this many scored rounds. The usual limit is 10. The run also stops when the score has not risen for 3 rounds.</span></div>`}});var AK,bK,PK,AN,bN=l(()=>{"use strict";T();Ln();AK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bK=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=1&&t<=100?t:90},PK=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,AN=e=>{let t=bK(e),r=Math.floor(t/2),n=Math.max(r+1,t-20),o=fa(t).map(i=>i.label).join(" \xB7 "),s=`--sdlc-weak:${r}%;--sdlc-close:${n}%;--sdlc-pass:${t}%`;return`<div class="field sdlc-pass"><div class="sdlc-pass-head">${Se("Pass score","passScore","sdlc-pass-label")}<output class="sdlc-pass-value" data-sdlc-pass-value for="sdlc-pass">${t}</output></div><div class="sdlc-pass-scale" style="${s}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="sdlc-pass" class="sdlc-pass-range" type="range" name="passScore" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="sdlc-pass-label"><span class="sdlc-pass-mark" style="left:${PK(90)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${90}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${AK(o)}</p><p class="muted">The bar fades from a weak score to a pass. The mark is the usual ${90}.</p></div>`}});var PN,_K,_N,wN,vN=l(()=>{"use strict";Ln();PN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_K=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),_N=e=>{if(e.length===0)return`<div class="field">${Se("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${PN(r.fileName)}">${PN(r.fileName)}</option>`).join("");return`<div class="field">${Se("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${_K(e)}</script>`},wN=`<script>
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
</script>`});var Xp,wK,WN,EN=l(()=>{"use strict";sP();Hp();Xp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wK=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",WN=e=>{let t=e.wizard;if(t===void 0||t.gate===null)return"";let r=Kp(e.goal),n=wK(t.gate),o=$o(e),s=o===null||o>=4?"":` (step ${o+1} of 4)`;return`<section class="card sdlc-wizard-resume" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Xp(r)}</h2>
    <p class="lede">Paused at <strong>${Xp(n)}</strong>${Xp(s)}. Continue where you left off or open another run below.</p>
    <div class="actions">
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Xp(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Ba,LN,RN=l(()=>{"use strict";Ln();Ba=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),LN=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(o=>`<option value="${Ba(o.id)}"${o.id===e.runner?" selected":""}>${Ba(o.label)}</option>`).join(""),n=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Ba(e.runner)}">Checking ${Ba(e.writers.find(o=>o.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block">
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Se("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${n}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Se("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Ba(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var kN,CN=l(()=>{"use strict";kN=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard</th><th>Classic loop</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td><td>Every round</td></tr><tr><td>Improver</td><td>\u2014</td><td>Rewrites after each score</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td><td>\u2014</td></tr></tbody></table>'});var Uo,TN,xN,IN,ON,NN=l(()=>{"use strict";Ln();Uo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),TN=(e,t,r,n,o)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=n.map(c=>`<option value="${Uo(c.id)}"${c.id===r?" selected":""}>${Uo(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Uo(o)}</option>`;return`<div class="field">${Se(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},xN=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let n=r.find(o=>o.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Uo(t)}">Checking ${Uo(n)}\u2026</p>`},IN=(e,t,r,n,o)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Se(t,o)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Uo(r)}</textarea><span class="muted">${n}</span></div></details>`,ON=e=>{let t=`<div class="sdlc-writer">${TN("judge","Judge",e.judge,e.writers,"I'll score it")}${xN("judge",e.judge,e.writers)}${IN("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${TN("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${xN("improver",e.improver,e.writers)}${IN("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var Bo,MN,jN=l(()=>{"use strict";Ma();Xb();nN();sN();yp();aN();cN();uN();lP();SN();bN();vN();Ln();Zb();EN();RN();CN();NN();T();Bo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MN=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Bo(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Bo(e.skillNotice??"")}</div>`,n=`${dI}${uI}`,o=e.resumableWizardCycle??null,s=o===null?"":WN(o),i=Fp(e.cycle),a=e.cycle===null?"":Dp(e.cycle),c=e.cycle!==null&&kt(e.cycle),d=lN(e),p=c?"Waiting for you":d.running?"Running\u2026":"Run",f=ON({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),b=LN({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Classic loop skips the wizard. Instructions are optional.",y=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",A=`<section class="card sdlc-compose" id="prompt-optimizer-compose">
      <div class="sdlc-form-head">
        <a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>
      </div>
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${e.cycle!==null||d.running?"":" open"}>
        <summary class="sdlc-compose-summary"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</summary>
      <p class="lede">${h} ${Bo(e.modelNote)}</p>
      <form class="sdlc-form" method="POST" action="/prompt-optimizer">
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${y}
        <div class="sdlc-block">
          <p class="sdlc-block-title">Prompt and goal</p>
          <div class="field">
            ${Se("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${Bo(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Se("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Bo(d.prompt)}</textarea>
          </div>
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Folder</p>
          <div class="sdlc-folder">
          <div class="field">
            ${Se("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Bo(d.folder)}" onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${_N(aP(d.folder))}
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Judge and improver</p>
          ${f}
        </div>
        ${b}
        ${kN()}
        <details class="sdlc-classic-loop-options">
          <summary class="sdlc-block-title">Classic loop options</summary>
          <div class="sdlc-limits">
            ${AN(d.passScore)}
            ${yN(d.maxRounds)}
          </div>
        </details>
        <div class="sdlc-submit">
          <p class="muted sdlc-wizard-limits-callout">Wizard: pass score ${70}, up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <button class="btn btn-primary" type="submit" name="intent" value="run" data-sdlc-run data-can-run="${e.canRun?"true":"false"}" disabled>${p}</button>
          <button class="btn btn-secondary" type="submit" name="intent" value="run-classic" formnovalidate data-sdlc-run data-can-run="${e.canRun?"true":"false"}" disabled>Classic loop (90 / 10 rounds)</button>
          <p class="muted sdlc-run-hint" data-sdlc-run-hint hidden></p>
        </div>
        </fieldset>
      </form>
      </details>
    </section>`,S=`${""}${rN}${oN}${iN}${wN}`;return`${t}${r}${A}${s}${a}${i}${n}${dN(e.history,e.cycle?.id??null)}${S}`}});var Ga,dP=l(()=>{"use strict";jN();Ga=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:MN(t)}))}});var DN,HN=l(()=>{"use strict";tN();dP();gt();En();DN=async(e,t,r)=>{let n=t===null?{kind:"ignored"}:eN({posted:t,storePath:e.storePath});return n.kind==="ignored"?!1:n.kind==="saved"?(xe(e.storePath,n.cycleId),e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(n.cycleId)}`}),e.response.end(),!0):n.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Ga(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:n.cycle.judgeModel,improver:n.cycle.improverModel,folder:"~",passScore:String(n.cycle.passScore),maxRounds:String(n.cycle.maxRounds),canRun:r.canRun,errorMessage:n.errorMessage,skillNotice:null,cycle:n.cycle,history:Et(e.storePath),resumableWizardCycle:null}),!0)}});var FN,Zp,uP=l(()=>{"use strict";FN=m(require("node:os"));T();Zp=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??FN.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??90,maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var $N,zN=l(()=>{"use strict";$N=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var UN,Go,pP,BN,GN,Va=l(()=>{"use strict";T();Me();Ib();UN=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Go=e=>{let t=CI(e),r=vn(e).map(o=>({id:o,label:Wp[o]}));return{note:r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(o=>o.label).join(", ")}.`,canRun:!0,models:t,writers:r,judge:"",improver:"",runner:""}},pP=(e,t,r)=>t===C||t!==null&&e.writers.some(n=>n.id===t)?t:r,BN=(e,t,r,n=null)=>({judge:pP(e,t,e.judge),improver:pP(e,r,e.improver),runner:pP(e,n,e.runner)}),GN=e=>e===Sp?{goal:Ap,prompt:bp}:{goal:"",prompt:""}});var Qp,mP=l(()=>{"use strict";T();Me();cP();zN();qe();Va();Qp=e=>{let t=BN(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=e.posted?.get("passScore")??String(90),n=Yp(e.posted?.get("maxRounds")??null),o=e.posted?.get("judgeInstructions")?.trim()??"",s=e.posted?.get("improverInstructions")?.trim()??"",i=e.posted?.get("runnerInstructions")?.trim()??"",a=e.posted?.get("runner")??null,c=(S,g)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:S,passScore:r,maxRounds:n,errorMessage:g,judge:t.judge,improver:t.improver,judgeInstructions:o,improverInstructions:s,runner:t.runner,runnerInstructions:i});if(e.posted===null)return c(e.defaultFolder??_n,null);let d=e.posted.get("folder")??_n;if(e.posted.get("intent")==="choose-folder"){let S=e.pickFolder();return c(S===null?d:Lt(S),null)}let p=e.posted.get("intent")??"";if(p!=="run"&&p!=="run-classic")return c(d,null);let f=UN(e.goal,e.prompt);if(f!==null)return c(d,f);let b=TI(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(b===null)return c(d,"Choose a judge and an improver.");let h=wn(d);if(!h.ok)return c(d,h.errorMessage);let y=p!=="run-classic",u=y?{ok:!0,passScore:70}:$N(r);if(!u.ok)return c(d,u.errorMessage);let A=y?{ok:!0,maxRounds:5}:gN(n);if(!A.ok)return c(d,A.errorMessage);if(y){let S=xI(e.installedIds,a,b.judge);return S===null?c(d,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:h.path,passScore:u.passScore,maxRounds:A.maxRounds,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:o,improverInstructions:s,useWizard:!0,runner:S,runnerInstructions:i}}return{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:h.path,passScore:u.passScore,maxRounds:A.maxRounds,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:o,improverInstructions:s,useWizard:!1}}});var Vo,tm,WK,gP,VN,em,qN,EK,KN,fP,LK,RK,kK,hP,JN,YN,XN=l(()=>{"use strict";Vo=m(require("node:fs")),tm=m(require("node:path"));Me();qe();WK=["remember","choose-folder","run","run-classic"],gP=()=>({folder:_n,judge:"",improver:"",runner:""}),VN=e=>tm.default.join(tm.default.dirname(e),"prompt-optimizer-preferences.json"),em=e=>typeof e=="string"?e:"",qN=e=>{let t=VN(e);if(!Vo.default.existsSync(t))return gP();try{let r=JSON.parse(Vo.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return gP();let n=r,o=em(n.folder).trim();return{folder:o.length===0?_n:o,judge:em(n.judge),improver:em(n.improver),runner:em(n.runner)}}catch{return gP()}},EK=(e,t)=>{let r=VN(e);Vo.default.mkdirSync(tm.default.dirname(e),{recursive:!0});let n=`${r}.tmp`;Vo.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`),Vo.default.renameSync(n,r)},KN=(e,t)=>e===C||vn(t).some(r=>r===e),fP=(e,t,r)=>e===null?t:e.length===0?"":KN(e,r)?e:t,LK=(e,t)=>{if(e===null)return t;let r=wn(e);return r.ok?r.display:t},RK=e=>{let t=qN(e.storePath),r={folder:LK(e.folder,t.folder),judge:fP(e.judge,t.judge,e.installedIds),improver:fP(e.improver,t.improver,e.installedIds),runner:fP(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||EK(e.storePath,r)},kK=e=>{let t=wn(e);return t.ok?t.display:_n},hP=(e,t)=>KN(e,t)?e:"",JN=e=>{let t=qN(e.storePath);return{selection:{...e.selection,judge:hP(t.judge,e.installedIds),improver:hP(t.improver,e.installedIds),runner:hP(t.runner,e.installedIds)},defaultFolder:kK(t.folder)}},YN=e=>{let t=e.posted.get("intent")??"";if(!WK.includes(t))return;let r=e.posted.get("folder");RK({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var ZN,CK,TK,yP,xK,rm,nm=l(()=>{"use strict";ZN=m(require("node:os"));Me();tP();Ia();CK="Reply with the single word ok. Do not use tools.",TK=45e3,yP=async(e,t)=>{if(t===C)return{ok:!0,message:"You will do this step."};let r=zO(e,t);if(r!==null)return{ok:!0,message:r};let n=await Je({writerAgent:t,prompt:CK,workingDirectory:ZN.default.tmpdir(),timeoutMs:TK});if(!n.ok)return{ok:!1,message:n.errorMessage};let o=`${Ke(t)} is ready.`;return UO(e,t,o),{ok:!0,message:o}},xK=e=>[...new Set(e.filter(t=>t.length>0))],rm=async(e,t,r,n)=>{for(let o of xK([t,r,n??""])){let s=await yP(e,o);if(!s.ok)return s.message}return null}});var SP,QN=l(()=>{"use strict";SP=(e,t)=>{for(let r of e)if(!(r.wizard===void 0||r.status!=="wizard_paused")&&!(t!==null&&r.id===t))return r;return null}});var eM,tM=l(()=>{"use strict";ct();T();Vp();uP();mP();dP();gt();qe();XN();lP();nm();QN();En();eM=async e=>{let t=e.posted===null?JN({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Qp({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>br("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(YN({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Lt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let n=r.kind==="start"?await rm(e.route.storePath,r.judge,r.improver,r.useWizard?r.runner:void 0):null;if(r.kind==="start"&&n!==null){await Ga(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Lt(r.workingDirectory),passScore:String(r.passScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:n,skillNotice:e.skillNotice,cycle:null,history:Et(e.route.storePath),resumableWizardCycle:SP(Et(e.route.storePath),null)});return}if(r.kind==="start"){let s=mN(r.workingDirectory,r.sourceSkillFile),i=Zp({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,...r.useWizard?{wizard:{...cb(r.prompt),runnerInstructions:r.runnerInstructions},runnerModel:r.runner}:{},...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(B(e.route.storePath,i),xe(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"&&r.useWizard){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(zo(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let o=e.cycleId===null?null:ne(e.route.storePath,e.cycleId);o!==null&&xe(e.route.storePath,o.id),await Ga(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:o,history:Et(e.route.storePath),resumableWizardCycle:SP(Et(e.route.storePath),o?.id??null)})}});var rM,nM=l(()=>{"use strict";gt();rM=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";bI(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var oM,sM=l(()=>{"use strict";RI();ZO();HN();tM();nM();Va();En();oM=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Gp(),n=Go(r),o=e.method==="POST"?new URLSearchParams(await e.readBody(e.request)):null;if(XO({posted:o,storePath:e.storePath,response:e.response})||await DN(e,o,n))return;let s=GN(t.searchParams.get("example")),i=rM({posted:o,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=LI({posted:o,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await eM({route:e,posted:o,installedIds:r,selection:n,goal:o?.get("goal")??s.goal,prompt:o?.get("prompt")??s.prompt,skillNotice:EI(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var iM,aM=l(()=>{"use strict";Vp();gt();iM=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),n=r===null?null:ne(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(n===null?"":zo(e.storePath,n)),!0}});var IK,lM,cM=l(()=>{"use strict";Me();nm();IK=["claude-cli","codex","cursor","antigravity"],lM=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let n=t===C||IK.includes(t)?await yP(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(n)),!0}});var dM,uM=l(()=>{"use strict";T();dM=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:ha,page:ya,context:To,installedWriters:e,post:{method:"POST",url:ha,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${ha}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var AP,pM=l(()=>{"use strict";T();fp();AP=e=>{let t=e.revisions[e.revisions.length-1]??null,r=he(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null}))),n=M(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:n,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:Mo(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:To,page:`${ya}?cycle=${encodeURIComponent(e.id)}`}}});var Le,OK,mM,gM,fM=l(()=>{"use strict";Le=m(Ps());T();OK=(0,Le.isType)({goal:Le.isString,prompt:Le.isString,workingDirectory:Le.isString,judge:(0,Le.isUndefinedOr)(Le.isString),improver:(0,Le.isUndefinedOr)(Le.isString),passScore:(0,Le.isUndefinedOr)(Le.isNumber),maxRounds:(0,Le.isUndefinedOr)(Le.isNumber)}),mM=e=>{let t=e?.trim()??"";return t.length===0?null:t},gM=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return OK(t)?t.workingDirectory.trim().length===0?{ok:!1,error:ip}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:mM(t.judge),improver:mM(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:ip}}});var NK,hM,yM=l(()=>{"use strict";T();Me();mP();Va();NK=e=>e.map(t=>t.id).join(", "),hM=e=>{let t=Go(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,n=e.body.judge??r,o=e.body.improver??r;if(n===C||o===C)return{ok:!1,error:lb,installedWriters:t.writers};if(n===null||o===null){let a=NK(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run-classic",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,passScore:e.body.passScore??String(90),maxRounds:e.body.maxRounds??String(10),judge:n,improver:o}),i=Qp({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var SM,AM=l(()=>{"use strict";uP();uM();pM();Va();fM();yM();gt();SM=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=ne(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:AP(c)}}let r=await e.handlers.readInstalledIds(),n=Go(r);if(e.method==="GET")return{status:200,body:dM(n.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let o=gM(e.rawBody);if(!o.ok)return{status:400,body:{ok:!1,error:o.error,installedWriters:n.writers}};let s=hM({body:o.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:n.writers}};let a=Zp({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds});return B(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:AP(a)}}});var bM,PM=l(()=>{"use strict";En();nm();AM();bM=async e=>{let t=await SM({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Gp,readWritersReady:rm,startCycle:xe}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var MK,bP,_M=l(()=>{"use strict";gI();sM();aM();cM();PM();MK=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},bP=async e=>{let t=MK(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await bM(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:mI()})),!0):(await lM({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||iM({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await oM(e),!0)}});var wM=l(()=>{"use strict";_M()});var Rn,qa,jK,DK,HK,FK,vM,WM=l(()=>{"use strict";Rn=m(require("node:fs")),qa=m(require("node:path")),jK="prompt-optimizer-cycles.json",DK="prompt-optimizer-preferences.json",HK="prompt-sdlc-cycles.json",FK="prompt-sdlc-preferences.json",vM=e=>{let t=qa.default.join(e,jK),r=qa.default.join(e,HK);if(Rn.default.existsSync(t)||!Rn.default.existsSync(r))return t;try{Rn.default.renameSync(r,t)}catch{return r}let n=qa.default.join(e,FK),o=qa.default.join(e,DK);if(Rn.default.existsSync(n)&&!Rn.default.existsSync(o))try{Rn.default.renameSync(n,o)}catch{}return t}});var qo,$K,PP,EM=l(()=>{"use strict";qo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$K=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],PP=e=>{let t=$K.map(i=>`<option value="${qo(i.value)}">${qo(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${qo(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${qo(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${qo(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${qo(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Ka,kM,zK,CM,UK,BK,TM,sm,LM,RM,GK,VK,Kt,Ja,om,qK,im,_P,KK,wP,xM,vP,IM,JK,YK,XK,OM,NM,MM,Ya=l(()=>{"use strict";Ka=m(require("node:fs")),kM=m(require("node:path")),zK="estimate-history.ndjson",CM=100,UK=500,BK=2e4,TM=e=>kM.default.join(e,zK),sm=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,UK),LM=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,BK),RM=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,GK=e=>({...e,estimateTokens:RM(e.estimateTokens),actualTokens:RM(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),VK=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Kt=e=>{let t=TM(e);return Ka.default.existsSync(t)?Ka.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let n=r.trim();if(n.length===0)return[];try{let o=JSON.parse(n);return VK(o)?[GK(o)]:[]}catch{return[]}}):[]},Ja=(e,t)=>{Ka.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(n=>JSON.stringify(n)).join(`
`)}
`;Ka.default.writeFileSync(TM(e),r,"utf8")},om=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),qK=e=>{let t=e.filter(n=>n.actualSeconds!==null&&n.estimateSeconds!==null&&n.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(n=>`| ${om(n.task)} | ${om(n.writerLabel)} | ${n.estimateSeconds} | ${n.actualSeconds} |`)].join(`
`)},im=e=>{let t=Kt(e.reportsDir),r=sm(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:n?.actualSeconds??null,estimateTokens:n?.estimateTokens??null,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ja(e.reportsDir,[...s,o])},_P=e=>{let t=Kt(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),n=new Date().toISOString(),o=e.task!==void 0?sm(e.task):"",s={id:e.agentRunId,task:o.length>0?o:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:n,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Ja(e.reportsDir,[...i,s])},KK=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-CM),wP=e=>[...Kt(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),xM=e=>{let t=Kt(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),n=LM(e.input),o=LM(e.output),s=sm(n),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:n.length>0?n:r?.input??"",output:o.length>0?o:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Ja(e.reportsDir,[...c,a])},vP=(e,t)=>{let r=Kt(e).find(n=>n.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},IM=e=>({table:qK(KK(Kt(e))),embedding:null}),JK=e=>{let t=new Map;for(let n of e){if(n.actualTokens===null)continue;let o=n.writerLabel.trim()||"Writer",s=t.get(o)??[];s.push(n.actualTokens),t.set(o,s)}let r=new Set;for(let[n,o]of t){let s=[...o].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${n}:${i}`)}return e.filter(n=>{let o=n.writerLabel.trim()||"Writer";return!r.has(`${o}:${n.actualTokens}`)})},YK=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-CM),XK=e=>{let t=JK(YK(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let n=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",n.join(". ")+(n.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${om(s.task)} | ${om(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},OM=e=>{let t=Kt(e.reportsDir),r=sm(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:n?.writerLabel??"",estimateSeconds:n?.estimateSeconds??null,actualSeconds:n?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ja(e.reportsDir,[...s,o])},NM=e=>{let t=Kt(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),n=new Date().toISOString(),o={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:r?.completedAt??n,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ja(e.reportsDir,[...s,o])},MM=e=>XK(Kt(e))});var jM=l(()=>{"use strict";Ya()});var Jt,WP,ZK,EP,QK,e8,am,lm,t8,LP,DM=l(()=>{"use strict";jM();Jt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WP=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let n=Math.floor(t/60),o=t%60;return o===0?`${n} hr`:`${n} hr ${o} min`},ZK=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${WP(-r)} under`:`${WP(r)} over`},EP=e=>e.toLocaleString("en-US"),QK=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${EP(-r)} under`:`${EP(r)} over`},e8=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},am=e=>e===null?"\u2014":WP(e),lm=e=>e===null?"\u2014":EP(e),t8=`(function () {
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
})();`,LP=e=>{let r=wP(e.reportsDir).map((o,s)=>{let i=o.input.trim().length>0?o.input:o.task,a=o.output.trim().length>0?o.output:"\u2014",c=o.writerLabel.trim().length>0?o.writerLabel:"Writer",d=o.estimateSeconds===null||o.actualSeconds===null?"no estimate":ZK(o.estimateSeconds,o.actualSeconds),p=o.estimateTokens===null||o.actualTokens===null?"no estimate":QK(o.estimateTokens,o.actualTokens),f=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${f}">
        <td><button type="button" class="history-open">${Jt(e8(i))}</button></td>
        <td>${Jt(c)}</td>
        <td>${am(o.estimateSeconds)}</td>
        <td>${am(o.actualSeconds)}</td>
        <td>${Jt(d)}</td>
        <td>${lm(o.estimateTokens)}</td>
        <td>${lm(o.actualTokens)}</td>
        <td>${Jt(p)}</td>
      </tr>`,template:`<template id="${f}">
        <p class="eyebrow">${Jt(c)}</p>
        <h2>Input</h2>
        <pre>${Jt(i)}</pre>
        <h2>Output</h2>
        <pre>${Jt(a)}</pre>
        <p>Time: estimated ${am(o.estimateSeconds)} \xB7 actual ${am(o.actualSeconds)} \xB7 ${Jt(d)}</p>
        <p>Tokens: estimated ${lm(o.estimateTokens)} \xB7 actual ${lm(o.actualTokens)} \xB7 ${Jt(p)}</p>
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
        <script>${t8}</script>`}
    </section>`}});var HM=l(()=>{"use strict";EM();DM()});var Ko,r8,n8,RP,FM=l(()=>{"use strict";Ko=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),r8=(e,t,r)=>{let n=Ko(t),o=Ko(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${n}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${o}</pre>
</article>`},n8=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Ko(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((n,o)=>r8(o,n.userPrompt,n.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Ko(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Ko(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Ko(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},RP=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(n8).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var $M=l(()=>{"use strict";FM()});var Xa,zM,UM,kP,CP,TP,BM=l(()=>{"use strict";Xa=m(require("node:fs")),zM=m(require("node:path"));na();Vu();UM=(e,t,r)=>Lo({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,kP=(e,t,r)=>{let n=UM(e,t,r);if(n===null)return[];if(!Xa.default.existsSync(n))return[];let o=Xa.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},CP=e=>{let t=UM(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:qt(e.entry.prompt),output:qt(e.entry.output)};Xa.default.mkdirSync(zM.default.dirname(t),{recursive:!0}),Xa.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},TP=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var o8,s8,Za,cm,xP=l(()=>{"use strict";o8=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),s8=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Za=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let n=[],o=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=o8(i.assistantOutput),d=c.length>0?`Assistant: ${s8(c,t)}`:null,p=[a,d].filter(f=>f!==null).join(`

`);if(p.length!==0){if(o+p.length>r&&n.length>0)break;n.unshift(p),o+=p.length}}return n.join(`

`)},cm=e=>{let t=e.userMessage.trim(),r=Za({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Tt,Qa,NP,i8,a8,IP,l8,MP,dm,GM,VM,c8,Jo,jP,OP,qM,d8,KM,Yo,um,el,u8,tl,DP,pm,mm,JM=l(()=>{"use strict";Tt=m(require("node:fs")),Qa=m(require("node:path")),NP=require("node:crypto");xP();i8="writer-sessions",a8="active-index.json",IP=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),l8=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",MP=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},dm=e=>{let t=Qa.default.join(e.installDir,i8);return Tt.default.mkdirSync(t,{recursive:!0}),t},GM=e=>Qa.default.join(dm(e),a8),VM=(e,t)=>Qa.default.join(dm(e),`${t}.canonical.json`),c8=(e,t)=>Qa.default.join(dm(e),`${t}.continuation.json`),Jo=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,jP=e=>{let t=GM(e);if(!Tt.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Tt.default.readFileSync(t,"utf8"));if(!IP(r)||!Array.isArray(r.entries))return{entries:[]};let n=[];for(let o of r.entries){if(!IP(o)||typeof o.sessionId!="string")continue;let s=typeof o.writerAgent=="string"?o.writerAgent:"";if(!l8(s))continue;let i=typeof o.projectFolderPath=="string"?o.projectFolderPath:(o.projectFolderPath===null,null);n.push({writerAgent:s,projectFolderPath:i,sessionId:o.sessionId})}return{entries:n}}catch{return{entries:[]}}},OP=(e,t)=>{Tt.default.writeFileSync(GM(e),JSON.stringify(t,null,2))},qM=(e,t)=>{Tt.default.writeFileSync(VM(e,t.sessionId),JSON.stringify(t,null,2))},d8=(e,t)=>{Tt.default.writeFileSync(c8(e,t.sessionId),JSON.stringify(t,null,2))},KM=(e,t)=>{let r=Za({turns:t.turns});d8(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Yo=(e,t)=>{let r=VM(e,t);if(!Tt.default.existsSync(r))return null;try{let n=JSON.parse(Tt.default.readFileSync(r,"utf8"));return!IP(n)||typeof n.sessionId!="string"?null:n}catch{return null}},um=(e,t=20)=>{let r=dm(e),n=Tt.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),o=[];for(let s of n){let i=s.name.replace(/\.canonical\.json$/,""),a=Yo(e,i);a!==null&&o.push(a)}return o.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},el=(e,t,r)=>{let n=MP(r);return jP(e).entries.find(i=>Jo(i)===Jo({writerAgent:t,projectFolderPath:n}))?.sessionId??null},u8=(e,t,r,n)=>{let o=jP(e),s=Jo({writerAgent:t,projectFolderPath:r}),i=[...o.entries.filter(a=>Jo(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:n}];OP(e,{entries:i})},tl=(e,t,r)=>{let n=(0,NP.randomUUID)(),o=new Date().toISOString(),s=MP(r),i={sessionId:n,writerAgent:t,projectFolderPath:s,turns:[],createdAt:o,updatedAt:o};return qM(e,i),KM(e,i),u8(e,t,s,n),n},DP=(e,t,r)=>{let n=el(e,t,r);return n!==null?n:tl(e,t,r)},pm=(e,t,r)=>{let n=MP(r),o=jP(e);if(n===null&&r===void 0){OP(e,{entries:o.entries.filter(i=>i.writerAgent!==t)});return}let s=Jo({writerAgent:t,projectFolderPath:n});OP(e,{entries:o.entries.filter(i=>Jo(i)!==s)})},mm=e=>{let t=DP(e.layout,e.writerAgent,e.projectFolderPath),r=Yo(e.layout,t);if(r===null)return;let n={id:(0,NP.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},o={...r,turns:[...r.turns,n],updatedAt:n.createdAt};qM(e.layout,o),KM(e.layout,o)}});var p8,m8,gm,HP,YM=l(()=>{"use strict";p8=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",m8=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},gm=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",HP=e=>{let t=gm(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",n=p8(r,e.userPromptCharacterCount),o=m8({contextBudget:n,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:n,...o}}});var fm=l(()=>{"use strict";BM();JM();xP();YM()});var XM=l(()=>{"use strict";uh()});var je,f8,h8,FP,$P,zP,ZM=l(()=>{"use strict";ae();XM();je=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),f8=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},h8=(e,t,r)=>{let n=e[t]?.apiKey;if(n!==void 0&&n.length>0){let o=Ld(n);return`value="${je(o)}" placeholder="Paste a new key to replace"`}return`placeholder="${je(r)}"`},FP=(e,t,r,n,o)=>{let s=Hh[t];return`<label class="field">
          <span class="field-label">${je(n)} API key \u2014 ${je(f8(e,t))} \xB7 <a class="field-link" href="${je(s.href)}" target="_blank" rel="noopener noreferrer">${je(s.label)}</a></span>
          <input class="input mono" type="password" name="${je(r)}" autocomplete="off" ${h8(e,t,o)} />
        </label>`},$P=(e,t,r,n)=>{let o=ph(e[t]?.model),s=new Set(Ad[t].map(c=>c.value)),i=Ad[t].map(c=>{let d=c.value===o?" selected":"";return`<option value="${je(c.value)}"${d}>${je(c.label)}</option>`}).join(""),a=o!==Xr&&!s.has(o)?`<option value="${je(o)}" selected>${je(o)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${je(n)}</span>
          <select class="input mono" name="${je(r)}">${i}${a}</select>
        </label>`},zP=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${je(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",n=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${FP(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${$P(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${FP(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${$P(e.secrets,"openai","openaiModel","OpenAI model")}
        ${FP(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${$P(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var QM=l(()=>{"use strict";ZM()});var hm,ej,tj=l(()=>{"use strict";hm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ej=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${hm(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Console \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let n=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${hm(s.name)}</strong> <span class="muted mono">(${hm(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),o=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${hm(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${o}
      <ul class="harness-installed-set-list">${n}</ul>
    </section>`}});var y8,rj,nj,oj=l(()=>{"use strict";y8=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,rj=e=>e.kind==="folder",nj=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let d=s.children.get(a);if(d!==void 0&&rj(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=n=>{let o=[];for(let s of n.children.values()){if(rj(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(y8)};return r(t)}});var sj,UP,ij=l(()=>{"use strict";sj=m(require("node:path")),UP=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${UP(r.children,t)}</ul>
            </details>
          </li>`;let n=sj.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var aj,Er,S8,A8,rl,b8,BP,lj=l(()=>{"use strict";Xu();aj=m(require("node:path"));tj();oj();ij();Er=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),S8=()=>`(() => {
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

})();`,A8=()=>`(() => {
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
})();`,rl=e=>{let t=la({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=ej({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),n=e.flashError?`<div class="alert-error">${Er(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Er(e.flashMessage)}</div>`:"",o=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':b8(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Er(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Er(s)}" />
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
    <script>${S8()}</script>
    <script>${A8()}</script>`;return`${t}${r}${n}${c}${d}`},b8=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let d=nj(a.items.map(b=>({...b,relativePath:typeof b.relativePath=="string"&&b.relativePath.length>0?b.relativePath:aj.default.relative(a.sourceRoot,b.sourcePath).replaceAll("\\","/")}))),p=UP(d,Er),f=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Er(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Er(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${f} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Er(n)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},BP=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&o.set(d,p)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?o.get(d):void 0,f=e.get(`setName-${i}`)?.trim()??p??a,b=t.sets[i];if(b===void 0)continue;let h=a.length>0?a:b.proposedSlug,y=f.length>0?f:b.proposedName,u=r.has(i),A=b.items.map(S=>({id:S.id,kind:S.kind,title:S.title,sourcePath:S.sourcePath,include:u}));s.push({slug:h,name:y,items:A})}return s}});var cj=l(()=>{"use strict";lj()});var P8,GP,dj=l(()=>{"use strict";Ar();P8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Ne]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null||n.ok!==!0)return null;let o=n;return{counts:{harness:Number(o.counts?.harness??0),workflow:Number(o.counts?.workflow??0),agent:Number(o.counts?.agent??0)},items:Array.isArray(o.items)?o.items:[]}}catch{return null}},GP=P8});var _8,uj,pj=l(()=>{"use strict";Ar();_8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Ne]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let n=await r.json();return typeof n!="object"||n===null||n.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof n.promotedCount=="number"?n.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},uj=_8});var mj=l(()=>{"use strict"});var nl,w8,VP,gj=l(()=>{"use strict";Xu();nl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),w8=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,VP=e=>{let t=e.flashError?`<div class="alert-error">${nl(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${nl(e.flashMessage)}</div>`:"",r=la({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),n=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(o=>{let s=e.compositionCountsByProjectId?.[o.id],i=s!==void 0?`<span class="muted">${nl(w8(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(o.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(o.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(o.id)}">
                  <strong>${nl(o.name)}</strong>
                  <span class="muted mono">${nl(o.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${n}
    </section>`}});var fj=l(()=>{"use strict";mj();Vy();gj()});var ym,hj=l(()=>{"use strict";ym=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var yj,Yt,qP=l(()=>{"use strict";yj=m(require("node:path"));$t();St();U();ae();Ue();Yt=e=>{let t=H()?.layout.installDir??E();if(yj.default.basename(t)===Mr)return Ht;let r=H(),n=r!==null?we(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):Ht}});var KP,Sj=l(()=>{"use strict";Ue();qP();KP=async e=>{let t=_e(e.installDir),r=t?.bundleVersion??null,n=Yt(t);try{let o=await eo(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Gr(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var JP,Aj=l(()=>{"use strict";JP=e=>!e});var YP,Xo,XP=l(()=>{"use strict";U();YP=()=>`http://127.0.0.1:${uf()}/update/run`,Xo=async e=>{try{let t=await fetch(YP(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var v8,bj,ZP,Pj=l(()=>{"use strict";U();Q();XP();v8=()=>{jt({launchAgentLabel:te(),installDir:E()})},bj=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},ZP=async()=>{v8();let e=await Xo({force:!0});if(e.ok)return{ok:!0,message:bj(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:bj(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ue(),rL)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var QP=l(()=>{"use strict";MA();hj();qP();Sj();Aj();Pj();XP()});var _j,wj=l(()=>{"use strict";_j=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var vj,Wj,e_,t_,Ej=l(()=>{"use strict";vj=require("node:crypto"),Wj=m(require("node:fs"));ct();ae();ae();wj();e_=!1,t_=async e=>{if(e_)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!_j(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&Wj.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,vj.randomUUID)();e_=!0;try{if(await jy(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await ao({...r,workspace:o},e.writerAgent,t);return await ki(n,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{e_=!1}}});var Lj=l(()=>{"use strict";Ej()});var Ye,W8,Rj,kj,r_,n_,o_,s_,i_,a_,l_=l(()=>{"use strict";Ye=require("node:crypto"),W8=Buffer.from("302a300506032b6570032100","hex"),Rj=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},kj=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Ye.createPublicKey)({key:Buffer.concat([W8,t]),format:"der",type:"spki"})},r_=()=>{let{publicKey:e,privateKey:t}=(0,Ye.generateKeyPairSync)("ed25519");return{publicKeyRaw:Rj(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},n_=e=>(0,Ye.createPrivateKey)(e),o_=(e,t)=>(0,Ye.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),s_=(e,t,r)=>{try{let n=kj(e);return(0,Ye.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},i_=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,a_=()=>(0,Ye.randomBytes)(32).toString("base64url")});var Xt,Sm,Cj,E8,L8,Am,c_,d_,Tj=l(()=>{"use strict";Xt=m(require("node:fs")),Sm=m(require("node:path"));l_();U();St();Cj=e=>Sm.default.join(e.installDir,ar),E8=(e,t)=>{if(e.profileEmail===null||t===Cj(e)||Xt.default.existsSync(t))return;let r=Cj(e);Xt.default.existsSync(r)&&(Xt.default.mkdirSync(Sm.default.dirname(t),{recursive:!0}),Xt.default.renameSync(r,t))},L8=e=>{if(!Xt.default.existsSync(e))return null;try{let t=Xt.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Am=e=>{let t=qc(e);E8(e,t);let r=L8(t);if(r!==null)return r;let n=r_();return Xt.default.mkdirSync(Sm.default.dirname(t),{recursive:!0}),Xt.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},c_=e=>{let t=Am(e.layout),r=a_(),n=i_({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=n_(t.privateKeyPem),s=o_(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},d_=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return s_(e.serverPublicKey,t,e.serverAttestation)}});var u_=l(()=>{"use strict";Tj();l_()});var Nj,ol,g_,f_,xj,R8,p_,bm,oe,Mj,k8,m_,C8,T8,h_,le,Ae,Zt,x8,Ij,Oj,sl,il,jj=l(()=>{"use strict";Nj=m(require("node:http")),ol=m(require("node:fs")),g_=m(require("node:path"));Pm();ea();rx();ox();dx();So();cA();IA();$x();Ux();wM();WM();HM();$M();fm();QM();cj();nn();ct();Ar();dj();pj();fj();QP();Ue();Lj();ae();u_();f_=e=>XS(e)??"never",xj=48e3,R8=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,p_=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??tu(),reveal:t.reveal,installed:Sr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),bm=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:go(t,e)},oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mj=200,k8=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',m_=e=>{let t=e.trim().slice(0,Mj),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},C8=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${oe(t)}</div>`,T8=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${oe(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',h_={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},le=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...h_}),e.end(JSON.stringify(r))},Ae=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Zt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},x8=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=k8(e.healthBadge),n=e.status.wakeError?`<div class="alert-error">${oe(e.status.wakeError)}</div>`:"",o=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=JP(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${ta(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${oe(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${oe(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${oe(f_(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${oe(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${s}
    </section>`},Ij=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},Oj=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,Mj)},sl=e=>{let t=g_.default.join(e.layout.installDir,"link-code.txt"),r=()=>_e(e.layout.installDir),n=()=>{let h=r();return{installBundleVersion:ym(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},o=async h=>{let y=h.installVersion??r(),u=await i(),A=FA(u),S=h.updateFlash??null,g=$A(S),_=C8(S,h.updateError??null);return DA({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:Yt(y),installBundleVersionLabel:ym(y),prependBody:`${g}${_}${A}`,headerUpdateButtonHtml:HA(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await KP(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:m_("An update is already running.")}),h.end();return}c=!0;try{let u=await ZP(),A=u.ok?"/?update=ok":m_(u.message);h.writeHead(303,{Location:A}),h.end()}catch(u){let A=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:m_(A)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=n(),S=await o({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${oe(y)}</h1>
      <p>${oe(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(S)},f=()=>{if(ol.default.existsSync(t))return ol.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return ol.default.writeFileSync(t,h,"utf8"),h},b=Nj.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",A=h.method??"GET";if(A==="OPTIONS"){y.writeHead(204,h_),y.end();return}if(!await bP({method:A,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:vM(g_.default.dirname(e.layout.configPath)),readBody:Zt,sendHtml:Ae,renderShell:o})){if(A==="GET"&&u==="/health"){let S=e.controllers.getStatus(),g=n();le(y,200,{ok:!0,...S,installBundleVersion:g.installBundleVersion,installBundleUpdatedAt:g.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/status"){let S=n();le(y,200,{...e.controllers.getStatus(),linkCode:f(),installBundleVersion:S.installBundleVersion,installBundleUpdatedAt:S.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/traffic"){le(y,200,{entries:Zi(e.layout)});return}if(A==="DELETE"&&u==="/api/traffic"||A==="POST"&&u==="/api/traffic/clear"){if(eA(e.layout),A==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}le(y,200,{ok:!0});return}if(A==="GET"&&u==="/api/trace"){le(y,200,{entries:zu(e.layout)});return}if(A==="DELETE"&&u==="/api/trace"||A==="POST"&&u==="/api/trace/clear"){if(nA(e.layout),A==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}le(y,200,{ok:!0});return}if(A==="POST"&&u==="/api/errors/clear"){oA(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(A==="GET"&&u==="/api/knowledge"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(g.length>0){let _=await ko({layout:e.layout,query:g,limit:20});le(y,200,{chunks:_,query:g});return}le(y,200,{chunks:Ro(e.layout).slice(-50).reverse()});return}if(A==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(A==="GET"&&u==="/api/update-status"){let S=await i();le(y,200,{ok:!0,...S});return}if((A==="GET"||A==="POST")&&u==="/api/update"){await d(y);return}if(A==="GET"&&u==="/"){let S=e.controllers.getStatus(),g=n(),_=Sr(e.layout),w=Uu(e.layout.errorLogPath);Ae(y,await o({title:"Home",activePath:"/",installVersion:g.installVersion,updateFlash:Ij(h.url??void 0),updateError:Oj(h.url??void 0),body:zA({wsConnected:S.wsConnected,lastHeartbeatAt:S.lastHeartbeatAt,installBundleVersion:g.installBundleVersion,harnessSetCount:_.sets.length,knowledgeChunkCount:Ro(e.layout).length,trafficEntryCount:Zi(e.layout).length,wakeError:S.wakeError,errorLogByteSize:w.byteSize,errorLogExists:w.exists})}));return}if(A==="GET"&&u==="/task"){let S=e.controllers.getStatus(),g=n(),_=H(),w=new URL(h.url??"/",`http://127.0.0.1:${43347}`),W=w.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=w.searchParams.get("failed")==="1"?w.searchParams.get("error")?.trim()??"Task failed.":null,R=w.searchParams.get("runId");Ae(y,await o({title:"Task",activePath:"/task",installVersion:g.installVersion,body:PP({defaultWorkspace:_?.workspace??"",wsConnected:S.wsConnected,flashMessage:W,flashError:L,lastRunId:R})}));return}if(A==="POST"&&u==="/task/dispatch"){let S=await Zt(h),g=new URLSearchParams(S),_=g.get("prompt")?.trim()??"",w=g.get("writerAgent")?.trim()??"claude-cli",W=g.get("projectFolder")?.trim()??"",L=await t_({prompt:_,writerAgent:w,...W.length>0?{projectFolderPath:W}:{}}),R=new URLSearchParams;L.ok?R.set("ok","1"):(R.set("failed","1"),L.errorMessage!==void 0&&R.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&R.set("runId",L.agentRunId),y.writeHead(303,{Location:`/task?${R.toString()}`}),y.end();return}if(A==="GET"&&u==="/writer-sessions"){let S=n(),g=um(e.layout,12);Ae(y,await o({title:"Writer sessions",activePath:"/writer-sessions",installVersion:S.installVersion,updateFlash:Ij(h.url??void 0),updateError:Oj(h.url??void 0),body:RP({sessions:g})}));return}if(A==="GET"&&u==="/errors"){let S=n(),g=Uu(e.layout.errorLogPath);Ae(y,await o({title:"Errors",activePath:"/errors",installVersion:S.installVersion,body:iA({errorLogPath:e.layout.errorLogPath,content:g.content,exists:g.exists,truncated:g.truncated,byteSize:g.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&u==="/status"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=e.controllers.getStatus(),_=ge(e.layout),w=_!==null?Ce(_,12e4):dA(g.lastHeartbeatAt,12e4),W=uA({lastHeartbeatAt:g.lastHeartbeatAt,heartbeatIsStale:w}),L=n();Ae(y,await o({title:"Status",activePath:"/status",installVersion:L.installVersion,body:`${x8({status:g,healthBadge:W,revived:S.searchParams.get("revived")==="1",linkCode:f(),installBundleVersion:L.installBundleVersion,installBundleUpdatedAt:L.installBundleUpdatedAt})}${gA({installDir:e.layout.installDir})}${mA({entries:zu(e.layout)})}`}));return}if(A==="GET"&&u==="/traffic"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=Zi(e.layout),_=n(),w=g.map(R=>`<tr><td title="${oe(R.at)}">${oe(f_(R.at))}</td><td>${oe(R.direction)}</td><td><code>${oe(R.type)}</code></td><td>${oe(R.summary)}</td><td>${oe(R.action??"")}</td></tr>`).join(""),W=g.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${w}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',L=S.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ae(y,await o({title:"Traffic",activePath:"/traffic",installVersion:_.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${L}
              ${W}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&u==="/projects"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=n(),_=Yt(g.installVersion),w=await bm(e.layout),W=S.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,L=H(),R=L===null?null:Y({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),k=R===null?{}:Object.fromEntries((await Promise.all(w.projects.map(async x=>{let D=await GP(R,x.id);return[x.id,D?.counts??null]}))).filter(x=>x[1]!==null));Ae(y,await o({title:"Projects",activePath:"/projects",installVersion:g.installVersion,body:VP({projects:w.projects,compositionCountsByProjectId:k,cloudAppOrigin:_,syncMessage:w.message,syncOk:w.ok,flashMessage:null,flashError:W})}));return}if(A==="GET"&&u==="/projects/select-folder"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",_=H(),w=_===null?null:Y({wsUrl:_.wsUrl,pairingToken:_.pairingToken}),W=g.length>0&&w!==null?br():null;if(W===null||w===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if($e({projectFolderPath:W}),!await Ii(w,g,W)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(g)}&folderUpdated=1`}),y.end();return}if(A==="GET"&&u==="/project"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=S.searchParams.get("id")?.trim()??"",_=n(),w=await bm(e.layout),W=ln(w.projects,g);if(W===null){await p(y,"Project not found");return}let L=S.searchParams.get("linked")==="1"?S.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${S.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${S.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:S.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,R=S.searchParams.get("knowledgePromoted"),k=R!==null?`Marked ${R} lesson(s) as promoted in Agent Witch.`:null,x=S.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,D=S.searchParams.get("tab")?.trim()??"harness",ee=D==="workflows"||D==="agents"||D==="knowledge"?D:"harness",J=H(),V=J===null?null:Y({wsUrl:J.wsUrl,pairingToken:J.pairingToken}),ms=V===null?null:await GP(V,W.id),F=0;if(V!==null)try{let Ie=await fetch(`${V.appOrigin}/api/agent-witch/projects/${encodeURIComponent(W.id)}/knowledge`,{method:"GET",headers:{[Ne]:V.pairingToken},signal:AbortSignal.timeout(1e4)});if(Ie.ok){let Tr=await Ie.json();typeof Tr=="object"&&Tr!==null&&typeof Tr.candidateCount=="number"&&(F=Tr.candidateCount)}}catch{F=0}Ae(y,await o({title:W.name,activePath:"/projects",installVersion:_.installVersion,body:fo({project:W,installed:Sr(e.layout),linkedSetSlugs:hr(W.projectFolderPath),composition:ms,knowledgeCandidateCount:F,activeTab:ee,flashMessage:L??k,flashError:x})}));return}if(A==="POST"&&u==="/projects/pull-bound-harness"){let S=await Zt(h),g=await qy({rawBody:S,layout:e.layout});if(g.kind==="not_found"){await p(y,"Project not found");return}if(g.kind==="redirect"){y.writeHead(303,{Location:g.location}),y.end();return}let _=n();Ae(y,await o({title:g.title,activePath:"/projects",installVersion:_.installVersion,body:g.body}));return}if(A==="POST"&&u==="/projects/link-harness"){let S=await Zt(h),g=new URLSearchParams(S),_=g.get("projectId")?.trim()??"",w=await bm(e.layout),W=ln(w.projects,_);if(W===null){await p(y,"Project not found");return}let L=g.getAll("applySet").map(J=>String(J)),R=bi({layout:e.layout,projectFolderPath:W.projectFolderPath,setSlugs:L});if(!R.ok){let J=n();Ae(y,await o({title:W.name,activePath:"/projects",installVersion:J.installVersion,body:fo({project:W,installed:Sr(e.layout),linkedSetSlugs:hr(W.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:R.errorMessage})}));return}let k=H(),x=k===null?null:Y({wsUrl:k.wsUrl,pairingToken:k.pairingToken}),D=x===null?!1:await Ti(x,W.id,R.appliedSetSlugs),ee=new URLSearchParams({linked:"1",files:String(R.writtenFileCount),bindingsSynced:D?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${ee.toString()}`}),y.end();return}if(A==="POST"&&u==="/project/knowledge/promote-all"){let S=await Zt(h),_=new URLSearchParams(S).get("projectId")?.trim()??"",w=await bm(e.layout),W=ln(w.projects,_);if(W===null){await p(y,"Project not found");return}let L=H(),R=L===null?null:Y({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),k=R===null?{ok:!1,promotedCount:0}:await uj(R,W.id),x=new URLSearchParams({tab:"knowledge",...k.ok?{knowledgePromoted:String(k.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${x.toString()}`}),y.end();return}if(A==="GET"&&u==="/harness"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=n(),_=vi(e.layout),w=S.searchParams.get("submitted")==="1",W=w?S.searchParams.get("syncFailed")==="1"?`Local harness updated (${S.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:S.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${S.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":S.searchParams.get("stopped")==="1"?`Reveal stopped. ${_?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:S.searchParams.get("revealed")==="1"?`Reveal found ${_?.sets.length??0} set(s).`:null,L=_?.scanRoots[0]??tu(),R=R8(e.layout,{reveal:_,importQuery:S.searchParams.get("import")==="1",justSubmitted:w}),k=Yt(g.installVersion);Ae(y,await o({title:"Harness",activePath:"/harness",installVersion:g.installVersion,body:rl(p_(e.layout,{cloudAppOrigin:k,reveal:_,scanFolder:L,flashMessage:W,importSectionExpanded:R}))}));return}if(A==="POST"&&u==="/api/harness/pick-folder"){let S=br();if(S===null){le(y,200,{cancelled:!0});return}le(y,200,{path:S});return}if(A==="GET"&&u==="/api/harness/file-content"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",_=Ai(g);if(_===null){le(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let w=ol.default.readFileSync(_,"utf8"),W=w.length>xj?`${w.slice(0,xj)}
\u2026 (truncated)`:w;le(y,200,{content:W})}catch{le(y,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&u==="/api/harness/reveal/add-project"){let S=await Zt(h),g="";try{let W=JSON.parse(S);typeof W=="object"&&W!==null&&typeof W.projectPath=="string"&&(g=W.projectPath.trim())}catch{le(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(g.length===0){le(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let _=vi(e.layout),w=Ly({reveal:_,projectPath:g});if(w===null||w.sets.length===0){le(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}su(e.layout,w),le(y,200,{ok:!0,setCount:w.sets.length});return}if(A==="GET"&&u==="/api/harness/reveal/stream"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(g.length===0){le(y,400,{errorMessage:"Choose a folder to scan first."});return}let _=!1;h.on("close",()=>{_=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...h_});let w=Ry({scanRoot:g,response:y,shouldAbort:()=>_});su(e.layout,w),y.end();return}if(A==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&u==="/harness/submit"){let S=vi(e.layout);if(S===null){let k=n(),x=Yt(k.installVersion);Ae(y,await o({title:"Harness",activePath:"/harness",installVersion:k.installVersion,body:rl(p_(e.layout,{cloudAppOrigin:x,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let g=await Zt(h),_=new URLSearchParams(g),w=BP(_,S),W=Cy({layout:e.layout,sets:w});if(!W.ok){let k=n(),x=Yt(k.installVersion);Ae(y,await o({title:"Harness",activePath:"/harness",installVersion:k.installVersion,body:rl(p_(e.layout,{cloudAppOrigin:x,reveal:S,flashError:W.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}xy(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${W.writtenItemCount??0}${R}`}),y.end();return}if(A==="GET"&&u==="/writer-api"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=H()?.writerExecutionBackend??ve(void 0),w=me(e.layout.configPath),W=pr(w),L=S.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=n();Ae(y,await o({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:zP({writerExecutionBackend:_,secrets:W,flashMessage:L})}));return}if(A==="POST"&&u==="/writer-api"){let S=await Zt(h),g=new URLSearchParams(S),_=g.get("writerExecutionBackend")?.trim()??"cli";Dh({configPath:e.layout.configPath,writerExecutionBackend:ve(_),anthropicApiKey:g.get("anthropicApiKey")??void 0,anthropicModel:g.get("anthropicModel")??void 0,openaiApiKey:g.get("openaiApiKey")??void 0,openaiModel:g.get("openaiModel")??void 0,googleApiKey:g.get("googleApiKey")??void 0,googleModel:g.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(A==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(A==="GET"&&u==="/history"){let S=n();Ae(y,await o({title:"History",activePath:"/history",installVersion:S.installVersion,body:LP({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&u==="/knowledge"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",_=n(),w=PA({layout:e.layout}),W=vA(w),L=g.length>0?await ko({layout:e.layout,query:g,limit:20}):Ro(e.layout).slice(-50).reverse(),R=L.map(x=>{let D=wA(w,x.id),ee=D>0?` \xB7 used in ${D} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${oe(x.createdAt)}">${oe(f_(x.createdAt))}${x.source?` \xB7 ${oe(x.source)}`:""}${ee}</div><pre>${oe(x.text)}</pre></article>`}).join(""),k=W.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${W.map(x=>`<li><strong>P${x.priority}</strong> \u2014 ${oe(x.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Ae(y,await o({title:"Knowledge",activePath:"/knowledge",installVersion:_.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${oe(g)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${k}${R}${T8(g,L.length)}`}));return}A==="POST"&&await Zt(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return b.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),b.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Ft}`)}),b},il=e=>Am(e).publicKeyRaw});var Pm=l(()=>{"use strict";FT();$T();jj()});var Hj={};ht(Hj,{runAgentWitchExternalLiveCli:()=>O8});var y_,Dj,I8,O8,Fj=l(()=>{"use strict";y_=m(require("node:fs")),Dj=m(require("node:path"));So();U();Q();Pm();Q();I8=e=>{let t=Dj.default.join(e,"link-code.txt");if(!y_.default.existsSync(t))return null;let r=y_.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},O8=()=>{He("agent-witch-live");let e=E(),t=O(),r=I8(e),n=il(t);sl({layout:t,controllers:{getStatus:()=>{let o=ge(t);return{wsConnected:zi(t,{socketOpen:!0}),lastHeartbeatAt:o?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:n}},reviveWebSocket:()=>{$r(e)}}})}});var Qt=v((VPe,Uj)=>{"use strict";var $j=["nodebuffer","arraybuffer","fragments"],zj=typeof Blob<"u";zj&&$j.push("blob");Uj.exports={BINARY_TYPES:$j,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:zj,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var al=v((qPe,_m)=>{"use strict";var{EMPTY_BUFFER:N8}=Qt(),S_=Buffer[Symbol.species];function M8(e,t){if(e.length===0)return N8;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new S_(r.buffer,r.byteOffset,n):r}function Bj(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function Gj(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function j8(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function A_(e){if(A_.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new S_(e):ArrayBuffer.isView(e)?t=new S_(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),A_.readOnly=!1),t}_m.exports={concat:M8,mask:Bj,toArrayBuffer:j8,toBuffer:A_,unmask:Gj};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");_m.exports.mask=function(t,r,n,o,s){s<48?Bj(t,r,n,o,s):e.mask(t,r,n,o,s)},_m.exports.unmask=function(t,r){t.length<32?Gj(t,r):e.unmask(t,r)}}catch{}});var Kj=v((KPe,qj)=>{"use strict";var Vj=Symbol("kDone"),b_=Symbol("kRun"),P_=class{constructor(t){this[Vj]=()=>{this.pending--,this[b_]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[b_]()}[b_](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[Vj])}}};qj.exports=P_});var es=v((JPe,Zj)=>{"use strict";var ll=require("zlib"),Jj=al(),D8=Kj(),{kStatusCode:Yj}=Qt(),H8=Buffer[Symbol.species],F8=Buffer.from([0,0,255,255]),vm=Symbol("permessage-deflate"),er=Symbol("total-length"),Zo=Symbol("callback"),Lr=Symbol("buffers"),Qo=Symbol("error"),wm,__=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!wm){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;wm=new D8(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Zo];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){wm.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){wm.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?ll.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=ll.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[vm]=this,this._inflate[er]=0,this._inflate[Lr]=[],this._inflate.on("error",z8),this._inflate.on("data",Xj)}this._inflate[Zo]=n,this._inflate.write(t),r&&this._inflate.write(F8),this._inflate.flush(()=>{let s=this._inflate[Qo];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=Jj.concat(this._inflate[Lr],this._inflate[er]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[er]=0,this._inflate[Lr]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?ll.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=ll.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[er]=0,this._deflate[Lr]=[],this._deflate.on("data",$8)}this._deflate[Zo]=n,this._deflate.write(t),this._deflate.flush(ll.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=Jj.concat(this._deflate[Lr],this._deflate[er]);r&&(s=new H8(s.buffer,s.byteOffset,s.length-4)),this._deflate[Zo]=null,this._deflate[er]=0,this._deflate[Lr]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};Zj.exports=__;function $8(e){this[Lr].push(e),this[er]+=e.length}function Xj(e){if(this[er]+=e.length,this[vm]._maxPayload<1||this[er]<=this[vm]._maxPayload){this[Lr].push(e);return}this[Qo]=new RangeError("Max payload size exceeded"),this[Qo].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Qo][Yj]=1009,this.removeListener("data",Xj),this.reset()}function z8(e){if(this[vm]._inflate=null,this[Qo]){this[Zo](this[Qo]);return}e[Yj]=1007,this[Zo](e)}});var ts=v((YPe,Wm)=>{"use strict";var{isUtf8:Qj}=require("buffer"),{hasBlob:U8}=Qt(),B8=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function G8(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function w_(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function V8(e){return U8&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Wm.exports={isBlob:V8,isValidStatusCode:G8,isValidUTF8:w_,tokenChars:B8};if(Qj)Wm.exports.isValidUTF8=function(e){return e.length<24?w_(e):Qj(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Wm.exports.isValidUTF8=function(t){return t.length<32?w_(t):e(t)}}catch{}});var R_=v((XPe,iD)=>{"use strict";var{Writable:q8}=require("stream"),eD=es(),{BINARY_TYPES:K8,EMPTY_BUFFER:tD,kStatusCode:J8,kWebSocket:Y8}=Qt(),{concat:v_,toArrayBuffer:X8,unmask:Z8}=al(),{isValidStatusCode:Q8,isValidUTF8:rD}=ts(),Em=Buffer[Symbol.species],Xe=0,nD=1,oD=2,sD=3,W_=4,E_=5,Lm=6,L_=class extends q8{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||K8[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[Y8]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Xe}_write(t,r,n){if(this._opcode===8&&this._state==Xe)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Em(n.buffer,n.byteOffset+t,n.length-t),new Em(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new Em(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Xe:this.getInfo(t);break;case nD:this.getPayloadLength16(t);break;case oD:this.getPayloadLength64(t);break;case sD:this.getMask();break;case W_:this.getData(t);break;case E_:case Lm:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[eD.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=nD:this._payloadLength===127?this._state=oD:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=sD:this._state=W_}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=W_}getData(t){let r=tD;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&Z8(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=E_,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[eD.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Xe&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Xe;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=v_(n,r):this._binaryType==="arraybuffer"?o=X8(v_(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=Xe):(this._state=Lm,setImmediate(()=>{this.emit("message",o,!0),this._state=Xe,this.startLoop(t)}))}else{let o=v_(n,r);if(!this._skipUTF8Validation&&!rD(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===E_||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=Xe):(this._state=Lm,setImmediate(()=>{this.emit("message",o,!1),this._state=Xe,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,tD),this.end();else{let n=t.readUInt16BE(0);if(!Q8(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new Em(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!rD(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=Xe;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Xe):(this._state=Lm,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Xe,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[J8]=o,i}};iD.exports=L_});var T_=v((QPe,cD)=>{"use strict";var{Duplex:ZPe}=require("stream"),{randomFillSync:e3}=require("crypto"),{types:{isUint8Array:t3}}=require("util"),aD=es(),{EMPTY_BUFFER:r3,kWebSocket:n3,NOOP:o3}=Qt(),{isBlob:rs,isValidStatusCode:s3}=ts(),{mask:lD,toBuffer:kn}=al(),Ze=Symbol("kByteLength"),i3=Buffer.alloc(4),Rm=8*1024,Cn,ns=Rm,ft=0,a3=1,l3=2,k_=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=ft,this.onerror=o3,this[n3]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||i3,r.generateMask?r.generateMask(n):(ns===Rm&&(Cn===void 0&&(Cn=Buffer.alloc(Rm)),e3(Cn,0,Rm),ns=0),n[0]=Cn[ns++],n[1]=Cn[ns++],n[2]=Cn[ns++],n[3]=Cn[ns++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[Ze]!==void 0?a=r[Ze]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(o?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=n[0],d[s-3]=n[1],d[s-2]=n[2],d[s-1]=n[3],i?[d,t]:o?(lD(t,n,d,s,a),[d]):(lD(t,n,t,0,a),[d,t])):[d,t]}close(t,r,n,o){let s;if(t===void 0)s=r3;else{if(typeof t!="number"||!s3(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(t3(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Ze]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==ft?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):rs(t)?(o=t.size,s=!1):(t=kn(t),o=t.length,s=kn.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Ze]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};rs(t)?this._state!==ft?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ft?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):rs(t)?(o=t.size,s=!1):(t=kn(t),o=t.length,s=kn.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Ze]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};rs(t)?this._state!==ft?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ft?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[aD.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):rs(t)?(a=t.size,c=!1):(t=kn(t),a=t.length,c=kn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Ze]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};rs(t)?this._state!==ft?this.enqueue([this.getBlobData,t,this._compress,d,n]):this.getBlobData(t,this._compress,d,n):this._state!==ft?this.enqueue([this.dispatch,t,this._compress,d,n]):this.dispatch(t,this._compress,d,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[Ze],this._state=l3,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(C_,this,a,o);return}this._bufferedBytes-=n[Ze];let i=kn(s);r?this.dispatch(i,r,n,o):(this._state=ft,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(c3,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[aD.extensionName];this._bufferedBytes+=n[Ze],this._state=a3,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");C_(this,c,o);return}this._bufferedBytes-=n[Ze],this._state=ft,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===ft&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Ze],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Ze],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};cD.exports=k_;function C_(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function c3(e,t,r){C_(e,t,r),e.onerror(t)}});var SD=v((e_e,yD)=>{"use strict";var{kForOnEventAttribute:cl,kListener:x_}=Qt(),dD=Symbol("kCode"),uD=Symbol("kData"),pD=Symbol("kError"),mD=Symbol("kMessage"),gD=Symbol("kReason"),os=Symbol("kTarget"),fD=Symbol("kType"),hD=Symbol("kWasClean"),tr=class{constructor(t){this[os]=null,this[fD]=t}get target(){return this[os]}get type(){return this[fD]}};Object.defineProperty(tr.prototype,"target",{enumerable:!0});Object.defineProperty(tr.prototype,"type",{enumerable:!0});var Tn=class extends tr{constructor(t,r={}){super(t),this[dD]=r.code===void 0?0:r.code,this[gD]=r.reason===void 0?"":r.reason,this[hD]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[dD]}get reason(){return this[gD]}get wasClean(){return this[hD]}};Object.defineProperty(Tn.prototype,"code",{enumerable:!0});Object.defineProperty(Tn.prototype,"reason",{enumerable:!0});Object.defineProperty(Tn.prototype,"wasClean",{enumerable:!0});var ss=class extends tr{constructor(t,r={}){super(t),this[pD]=r.error===void 0?null:r.error,this[mD]=r.message===void 0?"":r.message}get error(){return this[pD]}get message(){return this[mD]}};Object.defineProperty(ss.prototype,"error",{enumerable:!0});Object.defineProperty(ss.prototype,"message",{enumerable:!0});var dl=class extends tr{constructor(t,r={}){super(t),this[uD]=r.data===void 0?null:r.data}get data(){return this[uD]}};Object.defineProperty(dl.prototype,"data",{enumerable:!0});var d3={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[cl]&&o[x_]===t&&!o[cl])return;let n;if(e==="message")n=function(s,i){let a=new dl("message",{data:i?s:s.toString()});a[os]=this,km(t,this,a)};else if(e==="close")n=function(s,i){let a=new Tn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[os]=this,km(t,this,a)};else if(e==="error")n=function(s){let i=new ss("error",{error:s,message:s.message});i[os]=this,km(t,this,i)};else if(e==="open")n=function(){let s=new tr("open");s[os]=this,km(t,this,s)};else return;n[cl]=!!r[cl],n[x_]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[x_]===t&&!r[cl]){this.removeListener(e,r);break}}};yD.exports={CloseEvent:Tn,ErrorEvent:ss,Event:tr,EventTarget:d3,MessageEvent:dl};function km(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Cm=v((t_e,AD)=>{"use strict";var{tokenChars:ul}=ts();function xt(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function u3(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,d=-1,p=-1,f=0;for(;f<e.length;f++)if(d=e.charCodeAt(f),i===void 0)if(p===-1&&ul[d]===1)c===-1&&(c=f);else if(f!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f);let h=e.slice(c,p);d===44?(xt(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${f}`);else if(a===void 0)if(p===-1&&ul[d]===1)c===-1&&(c=f);else if(d===32||d===9)p===-1&&c!==-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f),xt(r,e.slice(c,p),!0),d===44&&(xt(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,f),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${f}`);else if(o){if(ul[d]!==1)throw new SyntaxError(`Unexpected character at index ${f}`);c===-1?c=f:n||(n=!0),o=!1}else if(s)if(ul[d]===1)c===-1&&(c=f);else if(d===34&&c!==-1)s=!1,p=f;else if(d===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${f}`);else if(d===34&&e.charCodeAt(f-1)===61)s=!0;else if(p===-1&&ul[d]===1)c===-1&&(c=f);else if(c!==-1&&(d===32||d===9))p===-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f);let h=e.slice(c,p);n&&(h=h.replace(/\\/g,""),n=!1),xt(r,a,h),d===44&&(xt(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${f}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=f);let b=e.slice(c,p);return i===void 0?xt(t,b,r):(a===void 0?xt(r,b,!0):n?xt(r,a,b.replace(/\\/g,"")):xt(r,a,b),xt(t,i,r)),t}function p3(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}AD.exports={format:p3,parse:u3}});var Om=v((o_e,TD)=>{"use strict";var m3=require("events"),g3=require("https"),f3=require("http"),_D=require("net"),h3=require("tls"),{randomBytes:y3,createHash:S3}=require("crypto"),{Duplex:r_e,Readable:n_e}=require("stream"),{URL:I_}=require("url"),Rr=es(),A3=R_(),b3=T_(),{isBlob:P3}=ts(),{BINARY_TYPES:bD,CLOSE_TIMEOUT:_3,EMPTY_BUFFER:Tm,GUID:w3,kForOnEventAttribute:O_,kListener:v3,kStatusCode:W3,kWebSocket:pe,NOOP:wD}=Qt(),{EventTarget:{addEventListener:E3,removeEventListener:L3}}=SD(),{format:R3,parse:k3}=Cm(),{toBuffer:C3}=al(),vD=Symbol("kAborted"),N_=[8,13],rr=["CONNECTING","OPEN","CLOSING","CLOSED"],T3=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,q=class e extends m3{constructor(t,r,n){super(),this._binaryType=bD[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Tm,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),WD(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){bD.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new A3({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new b3(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[pe]=this,s[pe]=this,t[pe]=this,o.on("conclude",O3),o.on("drain",N3),o.on("error",M3),o.on("message",j3),o.on("ping",D3),o.on("pong",H3),s.onerror=F3,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",RD),t.on("data",Im),t.on("end",kD),t.on("error",CD),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Rr.extensionName]&&this._extensions[Rr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){ze(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),LD(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){M_(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Tm,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){M_(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Tm,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){M_(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Rr.extensionName]||(o.compress=!1),this._sender.send(t||Tm,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){ze(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(q,"CONNECTING",{enumerable:!0,value:rr.indexOf("CONNECTING")});Object.defineProperty(q.prototype,"CONNECTING",{enumerable:!0,value:rr.indexOf("CONNECTING")});Object.defineProperty(q,"OPEN",{enumerable:!0,value:rr.indexOf("OPEN")});Object.defineProperty(q.prototype,"OPEN",{enumerable:!0,value:rr.indexOf("OPEN")});Object.defineProperty(q,"CLOSING",{enumerable:!0,value:rr.indexOf("CLOSING")});Object.defineProperty(q.prototype,"CLOSING",{enumerable:!0,value:rr.indexOf("CLOSING")});Object.defineProperty(q,"CLOSED",{enumerable:!0,value:rr.indexOf("CLOSED")});Object.defineProperty(q.prototype,"CLOSED",{enumerable:!0,value:rr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(q.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(q.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[O_])return t[v3];return null},set(t){for(let r of this.listeners(e))if(r[O_]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[O_]:!0})}})});q.prototype.addEventListener=E3;q.prototype.removeEventListener=L3;TD.exports=q;function WD(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:_3,protocolVersion:N_[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!N_.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${N_.join(", ")})`);let s;if(t instanceof I_)s=t;else try{s=new I_(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;xm(e,u);return}let d=i?443:80,p=y3(16).toString("base64"),f=i?g3.request:f3.request,b=new Set,h;if(o.createConnection=o.createConnection||(i?I3:x3),o.defaultPort=o.defaultPort||d,o.port=s.port||d,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(h=new Rr({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=R3({[Rr.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!T3.test(u)||b.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");b.add(u)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let u=o.path.split(":");o.socketPath=u[0],o.path=u[1]}let y;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let u=n&&n.headers;if(n={...n,headers:{}},u)for(let[A,S]of Object.entries(u))n.headers[A.toLowerCase()]=S}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,u||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),y=e._req=f(o),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=f(o);o.timeout&&y.on("timeout",()=>{ze(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[vD]||(y=e._req=null,xm(e,u))}),y.on("response",u=>{let A=u.headers.location,S=u.statusCode;if(A&&o.followRedirects&&S>=300&&S<400){if(++e._redirects>o.maxRedirects){ze(e,y,"Maximum redirects exceeded");return}y.abort();let g;try{g=new I_(A,t)}catch{let w=new SyntaxError(`Invalid URL: ${A}`);xm(e,w);return}WD(e,g,r,n)}else e.emit("unexpected-response",y,u)||ze(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,A,S)=>{if(e.emit("upgrade",u),e.readyState!==q.CONNECTING)return;y=e._req=null;let g=u.headers.upgrade;if(g===void 0||g.toLowerCase()!=="websocket"){ze(e,A,"Invalid Upgrade header");return}let _=S3("sha1").update(p+w3).digest("base64");if(u.headers["sec-websocket-accept"]!==_){ze(e,A,"Invalid Sec-WebSocket-Accept header");return}let w=u.headers["sec-websocket-protocol"],W;if(w!==void 0?b.size?b.has(w)||(W="Server sent an invalid subprotocol"):W="Server sent a subprotocol but none was requested":b.size&&(W="Server sent no subprotocol"),W){ze(e,A,W);return}w&&(e._protocol=w);let L=u.headers["sec-websocket-extensions"];if(L!==void 0){if(!h){ze(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=k3(L)}catch{ze(e,A,"Invalid Sec-WebSocket-Extensions header");return}let k=Object.keys(R);if(k.length!==1||k[0]!==Rr.extensionName){ze(e,A,"Server indicated an extension that was not requested");return}try{h.accept(R[Rr.extensionName])}catch{ze(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Rr.extensionName]=h}e.setSocket(A,S,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(y,e):y.end()}function xm(e,t){e._readyState=q.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function x3(e){return e.path=e.socketPath,_D.connect(e)}function I3(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=_D.isIP(e.host)?"":e.host),h3.connect(e)}function ze(e,t,r){e._readyState=q.CLOSING;let n=new Error(r);Error.captureStackTrace(n,ze),t.setHeader?(t[vD]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(xm,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function M_(e,t,r){if(t){let n=P3(t)?t.size:C3(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${rr[e.readyState]})`);process.nextTick(r,n)}}function O3(e,t){let r=this[pe];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[pe]!==void 0&&(r._socket.removeListener("data",Im),process.nextTick(ED,r._socket),e===1005?r.close():r.close(e,t))}function N3(){let e=this[pe];e.isPaused||e._socket.resume()}function M3(e){let t=this[pe];t._socket[pe]!==void 0&&(t._socket.removeListener("data",Im),process.nextTick(ED,t._socket),t.close(e[W3])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function PD(){this[pe].emitClose()}function j3(e,t){this[pe].emit("message",e,t)}function D3(e){let t=this[pe];t._autoPong&&t.pong(e,!this._isServer,wD),t.emit("ping",e)}function H3(e){this[pe].emit("pong",e)}function ED(e){e.resume()}function F3(e){let t=this[pe];t.readyState!==q.CLOSED&&(t.readyState===q.OPEN&&(t._readyState=q.CLOSING,LD(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function LD(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function RD(){let e=this[pe];if(this.removeListener("close",RD),this.removeListener("data",Im),this.removeListener("end",kD),e._readyState=q.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[pe]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",PD),e._receiver.on("finish",PD))}function Im(e){this[pe]._receiver.write(e)||this.pause()}function kD(){let e=this[pe];e._readyState=q.CLOSING,e._receiver.end(),this.end()}function CD(){let e=this[pe];this.removeListener("error",CD),this.on("error",wD),e&&(e._readyState=q.CLOSING,this.destroy())}});var ND=v((i_e,OD)=>{"use strict";var s_e=Om(),{Duplex:$3}=require("stream");function xD(e){e.emit("close")}function z3(){!this.destroyed&&this._writableState.finished&&this.destroy()}function ID(e){this.removeListener("error",ID),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function U3(e,t){let r=!0,n=new $3({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(xD,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(xD,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",z3),n.on("error",ID),n}OD.exports=U3});var j_=v((a_e,MD)=>{"use strict";var{tokenChars:B3}=ts();function G3(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&B3[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}MD.exports={parse:G3}});var UD=v((c_e,zD)=>{"use strict";var V3=require("events"),Nm=require("http"),{Duplex:l_e}=require("stream"),{createHash:q3}=require("crypto"),jD=Cm(),xn=es(),K3=j_(),J3=Om(),{CLOSE_TIMEOUT:Y3,GUID:X3,kWebSocket:Z3}=Qt(),Q3=/^[+/0-9A-Za-z]{22}==$/,DD=0,HD=1,$D=2,D_=class extends V3{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:Y3,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:J3,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Nm.createServer((n,o)=>{let s=Nm.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=eJ(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=DD}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===$D){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(pl,this);return}if(t&&this.once("close",t),this._state!==HD)if(this._state=HD,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(pl,this):process.nextTick(pl,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{pl(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",FD);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){In(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){In(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!Q3.test(s)){In(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){In(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){ml(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=K3.parse(c)}catch{In(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],f={};if(this.options.perMessageDeflate&&p!==void 0){let b=new xn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=jD.parse(p);h[xn.extensionName]&&(b.accept(h[xn.extensionName]),f[xn.extensionName]=b)}catch{In(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let b={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(b,(h,y,u,A)=>{if(!h)return ml(r,y||401,u,A);this.completeUpgrade(f,s,d,t,r,n,o)});return}if(!this.options.verifyClient(b))return ml(r,401)}this.completeUpgrade(f,s,d,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[Z3])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>DD)return ml(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${q3("sha1").update(r+X3).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(n.size){let f=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;f&&(d.push(`Sec-WebSocket-Protocol: ${f}`),p._protocol=f)}if(t[xn.extensionName]){let f=t[xn.extensionName].params,b=jD.format({[xn.extensionName]:[f]});d.push(`Sec-WebSocket-Extensions: ${b}`),p._extensions=t}this.emit("headers",d,o),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",FD),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(pl,this)})),a(p,o)}};zD.exports=D_;function eJ(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function pl(e){e._state=$D,e.emit("close")}function FD(){this.destroy()}function ml(e,t,r,n){r=r||Nm.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Nm.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function In(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,In),e.emit("wsClientError",i,r,t)}else ml(r,n,o,s)}});var tJ,rJ,nJ,oJ,sJ,iJ,BD,aJ,gl,GD=l(()=>{tJ=m(ND(),1),rJ=m(Cm(),1),nJ=m(es(),1),oJ=m(R_(),1),sJ=m(T_(),1),iJ=m(j_(),1),BD=m(Om(),1),aJ=m(UD(),1),gl=BD.default});var H_,F_,$_=l(()=>{"use strict";H_="AGENT_WITCH_EXTERNAL_BRIDGE",F_="AGENT_WITCH_EXTERNAL_LIVE"});var z_,VD=l(()=>{"use strict";z_=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var lJ,U_,qD=l(()=>{"use strict";$_();VD();lJ=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",U_=(e={})=>{let t=e.env??process.env,r=z_(t[H_]),n=z_(t[F_]);return{mode:lJ(r,n),skipInProcessBridge:r,skipInProcessLive:n}}});var KD=l(()=>{"use strict";$_()});var JD=l(()=>{"use strict";qD();KD()});var B_=l(()=>{"use strict"});var nr,fl=l(()=>{"use strict";nr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var is,On,YD,dJ,G_,V_,XD,ZD,q_,QD,hl,K_=l(()=>{"use strict";is=m(require("node:fs")),On=m(require("node:os")),YD=m(require("node:path"));B_();fl();dJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G_=(e=On.default.hostname())=>YD.default.join(On.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),V_=e=>{if(!is.default.existsSync(e))return null;try{let t=JSON.parse(is.default.readFileSync(e,"utf8"));return!dJ(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},XD=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},ZD=(e,t)=>{is.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},q_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??G_(),n=V_(r);if(n!==null&&n.pid!==process.pid&&nr(n.pid)&&XD(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:On.default.hostname(),macOsUsername:On.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return ZD(r,o),{ok:!0}},QD=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??G_(),n=V_(r);return n!==null&&n.pid!==process.pid&&nr(n.pid)&&XD(n)?{ok:!1}:(ZD(r,{hostname:On.default.hostname(),macOsUsername:On.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},hl=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??G_();V_(r)?.pid===process.pid&&is.default.existsSync(r)&&is.default.unlinkSync(r)}});var J_,yl,uJ,pJ,mJ,gJ,Y_,eH=l(()=>{"use strict";J_=require("node:child_process"),yl=m(require("node:path"));fl();nd();uJ=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),pJ=(e,t)=>{if(uJ(e)||!/\bnode\b/.test(e))return!1;let r=yl.default.resolve(t),n=yl.default.join(r,"app",Is),o=yl.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Is||i==="agent-witch.ts")return e.includes(r);try{let a=yl.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},mJ=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,J_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},gJ=(e,t,r)=>{let n=mJ(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||pJ(d,t)&&o.push(c)}return o},Y_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,J_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=gJ(r,e.installDir,t),o=[];for(let s of n)if(nr(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var Sl,Al,tH,fJ,X_,rH=l(()=>{"use strict";Sl=m(require("node:fs")),Al=m(require("node:path"));Pe();tH=(e,t)=>{!Sl.default.existsSync(e)||Sl.default.existsSync(t)||(Sl.default.mkdirSync(Al.default.dirname(t),{recursive:!0}),Sl.default.renameSync(e,t))},fJ=e=>{if(e.profileEmail===null)return;let t=Al.default.join(e.installDir,et);tH(Al.default.join(t,$n),e.mainLogPath),tH(Al.default.join(t,zn),e.errorLogPath)},X_=e=>{let t=O();e!==void 0&&t.installDir!==e||fJ(t)}});var hJ,nH=l(()=>{"use strict";Ji();Fu();Fu();hJ={};!ot()&&Br(hJ.url)&&(async()=>{He("agent-witch-wake-server");let e=await pn(),t=Dt(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var oH=l(()=>{"use strict";nH()});var sH=l(()=>{"use strict";Ni()});var Z_,iH=l(()=>{"use strict";B_();oH();K_();sH();Z_=async(e={})=>{let t=e.skipInProcessBridge?null:await Hu();Su();let r=setInterval(()=>{Su()},6e4),n=setInterval(()=>{if(!QD().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t?.close()}}}});var bl,Mm,AJ,aH,lH,jm,cH,dH,Q_,uH,Dm,pH=l(()=>{"use strict";bl=m(require("node:fs")),Mm=m(require("node:path")),AJ="pending-run-inputs.json",aH=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lH=e=>{let t=e.profileEmail?Mm.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Mm.default.join(t,AJ)},jm=e=>{let t=lH(e);if(!bl.default.existsSync(t))return{};try{let r=JSON.parse(bl.default.readFileSync(t,"utf8"));return aH(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!aH(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},cH=(e,t)=>{let r=lH(e);bl.default.mkdirSync(Mm.default.dirname(r),{recursive:!0}),bl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},dH=e=>Object.values(jm(e)),Q_=(e,t)=>jm(e)[t]!==void 0,uH=(e,t)=>{let r=jm(e);r[t.agentRunId]=t,cH(e,r)},Dm=(e,t)=>{let r=jm(e);delete r[t],cH(e,r)}});var Hm=l(()=>{"use strict";ae()});var mH=l(()=>{"use strict";ae()});var Fm=l(()=>{"use strict";ae()});var $m=l(()=>{"use strict";ae()});var Pl=l(()=>{"use strict";ae()});var bJ,PJ,_l,ew=l(()=>{"use strict";it();Hm();mH();Fm();$m();Pl();bJ={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},PJ={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},_l=e=>{if(!se(e.writerAgent))return"the selected writer";let t=Fe(e.writerAgent);if(ve(e.writerExecutionBackend)==="api"&&t!==null){let r=Oe(me(e.configPath),t);if(r!==null&&r.apiKey.length>0){let n=ei(t,r.model);return`${PJ[t]} model ${n}`}}return bJ[e.writerAgent]}});var _J,wJ,gH,fH,hH=l(()=>{"use strict";_J=/"input_tokens"\s*:\s*(\d+)/,wJ=/"output_tokens"\s*:\s*(\d+)/,gH=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},fH=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=gH(_J.exec(t)),n=gH(wJ.exec(t));if(r===null||n===null)return null;let o=r+n;return o>=1?o:null}});var zm=l(()=>{"use strict";ct()});var wl,Um,vJ,tw,yH,SH,AH,rw,bH=l(()=>{"use strict";wl=m(require("node:fs")),Um=m(require("node:path"));zm();vJ="run-completion-outbox.json",tw=e=>{let t=e.profileEmail?Um.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Um.default.join(t,vJ)},yH=e=>{let t=tw(e);if(!wl.default.existsSync(t))return[];try{let r=JSON.parse(wl.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},SH=(e,t)=>{wl.default.mkdirSync(Um.default.dirname(tw(e)),{recursive:!0}),wl.default.writeFileSync(tw(e),JSON.stringify(t,null,2),"utf8")},AH=(e,t)=>{let r=[...yH(e).filter(n=>n.runId!==t.runId),t];SH(e,r)},rw=async e=>{if(e.cloudApi===null)return;let t=yH(e.layout);if(t.length===0)return;let r=[];for(let n of t)await ki(e.cloudApi,n.runId,n.exitCode,n.output,{estimateSeconds:n.estimateSeconds,actualSeconds:n.actualSeconds})||r.push(n);SH(e.layout,r)}});var PH=l(()=>{"use strict"});var nw,vl,EJ,Nn,_H=l(()=>{"use strict";PH();nw=new Map,vl=e=>{let t=nw.get(e);t!==void 0&&(clearInterval(t),nw.delete(e))},EJ=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},Nn=(e,t,r,n={})=>{vl(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){vl(t);return}let i=n.onTick?.()??{};EJ(e,t,o,i)};s(),nw.set(t,setInterval(s,15e3))}});var wH=l(()=>{"use strict";ct()});var vH,WH=l(()=>{"use strict";wH();vH=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Be(t)}});var ow,Wl,or,sw,It,EH,Bm=l(()=>{"use strict";ow=new Set,Wl=new Map,or=(e,t)=>{if(t.length===0)return;let r=Wl.get(e)??[];r.push(t),Wl.set(e,r)},sw=e=>{ow.add(e);let t=Wl.get(e)??[];return Wl.delete(e),t},It=e=>ow.has(e),EH=e=>{ow.delete(e),Wl.delete(e)}});var Gm,LH,LJ,RH,kH=l(()=>{"use strict";Gm=m(require("node:path")),LH=require("node:url");Vn();LJ={},RH=()=>{if(ot()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Gm.default.dirname(Gm.default.resolve(e))}return Gm.default.dirname((0,LH.fileURLToPath)(LJ.url))}});var CH,TH,xH,IH,De,as,OH,NH,ls,iw,aw,lw,MH,cw,jH,Vm=l(()=>{"use strict";CH=require("node:crypto"),TH=m(require("node:fs")),xH=m(require("node:path")),IH=require("node:url");fl();Vn();kH();De=new Map,OH=async()=>{if(as!==void 0)return as;try{if(ot()){let e=RH(),t=xH.default.join(e,"deps","node-pty","lib","index.js");if(TH.default.existsSync(t)){let r=await import((0,IH.pathToFileURL)(t).href);return as=r,r}}return as=await import("node-pty"),as}catch{return as=null,null}},NH=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},ls=(e,t,r)=>{let n=De.get(e);if(n!==void 0){De.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},iw=(e,t)=>{let r=De.get(e);return r===void 0?!1:(r.pty.write(t),!0)},aw=(e,t,r)=>{let n=De.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},lw=e=>{for(let t of De.values())if(!(t.mode!=="agent"||t.runId!==e))return nr(t.pty.pid);return!1},MH=e=>{for(let[t,r]of De.entries())if(!(r.mode!=="agent"||r.runId!==e)){De.delete(t);try{r.pty.kill()}catch{}return!0}return!1},cw=async e=>{let t=await OH();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;De.get(e.shellSessionId)!==void 0&&ls(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return De.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{NH(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{De.get(e.shellSessionId)?.pty===o&&(De.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},jH=async e=>{let t=e.shellSessionId??(0,CH.randomUUID)(),r=await OH();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return De.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{NH(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{De.get(t)?.pty===n&&(De.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var qm,DH,HH=l(()=>{"use strict";qm="[[AWAITING_INPUT]]",DH=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",qm,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var El,FH,Km=l(()=>{"use strict";HH();El=e=>{let t=e.indexOf(qm);if(t<0)return null;let n=e.slice(t+qm.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},FH=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",DH].join(`
`)});var $H,zH=l(()=>{"use strict";Bm();Vm();Km();$H=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(It(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}or(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await jH({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=El(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var UH,BH,GH,sr,Jm=l(()=>{"use strict";UH=require("node:child_process"),BH=m(require("node:fs")),GH=m(require("node:path"));nd();sr=(e,t)=>{let r=GH.default.join(e,"app",_E,"ensure-writer.sh");return BH.default.existsSync(r)?new Promise((n,o)=>{let s=(0,UH.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var VH,Mn,Rl,Ym,dw,Ll,Xm,Zm,uw,pw,RJ,cs,kJ,CJ,mw,gw=l(()=>{"use strict";VH=require("node:child_process");it();Jm();Fm();Hm();Pl();$m();Mn=new Map,Rl=e=>e==="cursor"||e==="antigravity",Ym=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",dw=e=>Mn.get(e)?.warmed===!0,Ll=e=>{let t=Mn.get(e);Mn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Xm=e=>Mn.get(e)?.conversationStarted===!0,Zm=e=>{let t=Mn.get(e);Mn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},uw=e=>{Mn.delete(e)},pw=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",RJ={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},cs=e=>`${RJ[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,kJ=(e,t,r,n)=>new Promise(o=>{let s=hd(t,r),i=[],a=(0,VH.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),n?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{o({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{o({exitCode:-1,output:d.message})})}),CJ=(e,t)=>{let r=cs(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},mw=async e=>{if(!se(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&ve(e.runConfig.writerExecutionBackend)==="api"){let r=Fe(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let n=me(e.runConfig.layout.configPath);return Oe(n,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Ll(e.writerAgent),{exitCode:0,output:cs(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await sr(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}Rl(e.writerAgent)&&Ll(e.writerAgent);let t=await kJ(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?CJ(e.writerAgent,t.output):cs(e.writerAgent)}}});var jn,fw=l(()=>{"use strict";jn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var qH,TJ,xJ,KH,IJ,hw,JH=l(()=>{"use strict";fw();qH=/you(?:'|')ve hit your session limit/i,TJ=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],xJ=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,KH=(e,t)=>{for(let r of e.split(/\r?\n/)){let n=r.trim();if(n.length>0&&t.test(n))return n}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},IJ=e=>{let t=xJ.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},hw=e=>{let t=e.trim();if(t.length===0)return null;if(qH.test(t))return{code:jn.SESSION_LIMIT,resetHint:IJ(t),matchedLine:KH(t,qH)};for(let r of TJ)if(r.test(t))return{code:jn.PROVIDER_QUOTA,resetHint:null,matchedLine:KH(t,r)};return null}});var Qm,eg,yw,Sw=l(()=>{"use strict";Qm="[[AGENT_RUN_WRITER_EXECUTION]]",eg="cli-writer-api-key-missing",yw="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var Aw=l(()=>{"use strict";Sw()});var YH=l(()=>{"use strict";Aw()});var tg=l(()=>{"use strict";fw();JH();Sw();Aw();YH()});var rg,XH=l(()=>{"use strict";rg={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var ZH,QH=l(()=>{"use strict";ZH="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var eF,tF=l(()=>{"use strict";tg();QH();eF=e=>e.code===jn.SESSION_LIMIT?ZH:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var rF,nF=l(()=>{"use strict";tg();XH();tF();rF=e=>{let t=hw(e.output);return t!==null?{status:rg.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:eF(t)}:{status:e.exitCode===0?rg.COMPLETED:rg.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var bw,yve,oF=l(()=>{"use strict";bw={OPEN:"open",APPROVAL:"approval"},yve=bw.APPROVAL});var ds,ng,sF,MJ,iF,aF,lF,kl,Pw,_w=l(()=>{"use strict";ds=m(require("node:fs")),ng=m(require("node:path")),sF="runs",MJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iF=e=>{let t=e.profileEmail!==null?ng.default.join(e.installDir,"profiles",e.profileEmail,sF):ng.default.join(e.installDir,sF);return ds.default.mkdirSync(t,{recursive:!0}),t},aF=(e,t)=>ng.default.join(iF(e),`${t}.json`),lF=(e,t)=>{ds.default.writeFileSync(aF(e,t.id),JSON.stringify(t,null,2))},kl=(e,t)=>{let r=aF(e,t);if(!ds.default.existsSync(r))return null;try{let n=JSON.parse(ds.default.readFileSync(r,"utf8"));return!MJ(n)||typeof n.id!="string"?null:n}catch{return null}},Pw=e=>{let t=iF(e),r=ds.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=kl(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var jJ,cF,dF=l(()=>{"use strict";nF();oF();_w();jJ=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",n=rF({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:n.status,dispatchPolicy:bw.OPEN,resultOutput:e.output,resultExitCode:n.resultExitCode,resultOutcomeCode:n.resultOutcomeCode,denialReason:n.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},cF=(e,t)=>{let r=jJ(t);return lF(e,r),r}});var uF=l(()=>{"use strict";fm()});var pF,mF=l(()=>{"use strict";tg();pF=()=>[Qm,`agentRunWriterExecutionBackend=${eg}`,`agentRunWriterExecutionReasonCode=${yw}`].join(`
`)});var kr,og=l(()=>{"use strict";kr=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var ww,DJ,HJ,gF,fF=l(()=>{"use strict";ww=e=>e.toLocaleString("en-US"),DJ=e=>e<.01?e.toFixed(4):e.toFixed(3),HJ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${DJ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${ww(e.inputTokens)} in / ${ww(e.outputTokens)} out (${ww(e.totalTokens)} total)`,t].join(`
`)},gF=(e,t)=>{if(t===void 0)return e;let r=HJ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var hF=l(()=>{"use strict";ae()});var SF,Cl,ce,vw,sg,yF,FJ,$J,AF,bF,PF,Tl,Ww,Ew,Lw,_F,zJ,Qe,xl,Cr,wF,UJ,BJ,ig,Rw,kw,Cw,vF=l(()=>{"use strict";SF=require("node:child_process");ae();it();pH();Ya();ew();hH();yd();bH();zm();_H();fl();WH();Bm();Vm();Km();zH();gw();dF();uF();mF();og();fF();Xn();hF();Pl();Ds();Km();Cl=new Map,ce=new Map,vw=new Set,sg=new Map,yF=e=>{e!==void 0&&!sg.has(e)&&sg.set(e,Date.now())},FJ=(e,t,r,n)=>{let o=n.endsWith(`
`)?n:`${n}
`;if(It(t)){Qe(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:o},requestId:r});return}or(t,o)},$J=(e,t,r,n,o)=>{if(!Fh(e,o))return;let s=`${pF()}
`;FJ(t,r,n,s);let i=ce.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},AF=130,bF=`

Stopped by user.`,PF=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:kr(e)},Tl=null,Ww=e=>{Tl=e},Ew=(e,t)=>{if(Tl===null)return;let r=vP(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||Dy(Tl,t,r)},Lw=async e=>{await rw({layout:e,cloudApi:Tl})},_F=e=>{let t=Cl.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:nr(t.pid)},zJ=e=>ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),Qe=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},xl=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Gn(s),c=ce.get(r);if(a!==null&&c!==void 0){let d=xE(a),p=_F(r)||lw(r);d!==null&&!p&&Cr(e,t,r,n,d.exitCode,d.output,c.originalPrompt)}return TE(a)}}),Cr=(e,t,r,n,o,s,i,a)=>{let c=oo(s,a),d=o,p=gF(c.output,c.llmUsage);if(r!==void 0){let b=sg.get(r);sg.delete(r),b!==void 0&&_P({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-b)/1e3))});let h=fH(c.llmUsage,p);h!==null&&NM({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&vw.has(r)&&(vw.delete(r),d=AF,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${bF}`:"Stopped by user.");let f=r!==void 0?vP(e.layout.reportsDir,r):null;if(r!==void 0){vl(r),li(e.layout,r),It(r)&&(Qe(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),EH(r));let b=ce.get(r);xM({reportsDir:e.layout.reportsDir,agentRunId:r,input:kr(i),output:p,...b!==void 0?{writerLabel:_l({writerAgent:b.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),b!==void 0&&mm({layout:e.layout,writerAgent:b.writerAgent,projectFolderPath:b.projectFolderPath,userPrompt:b.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),cF(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),AH(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{}}),rw({layout:e.layout,cloudApi:Tl}),ce.delete(r),Cl.delete(r),Dm(e.layout,r)}Qe(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:n}),qs(e.layout)},wF=(e,t,r,n,o,s,i)=>{let a=ce.get(r),c=a?.accumulatedOutput??s;uH(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),Nn(t,r,()=>Q_(e.layout,r),xl(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),Qe(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},UJ=(e,t,r,n,o,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(o===void 0||h.length===0)){if(It(o)){Qe(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:h},requestId:n});return}or(o,h)}};if(o!==void 0){let h=ce.get(o);Cl.set(o,t),ce.set(o,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),Qe(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),Nn(r,o,()=>_F(o),xl(e,r,o,n,h?.projectFolderPath,h?.reportKey))}let f=a==="claude-cli",b=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(f?b.push(y):(c.push(y),p(y)),d||o===void 0)return;let u=El(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let A=ce.get(o),S=[A?.accumulatedOutput??"",u.partialOutput].filter(g=>g.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=S),Cl.delete(o),wF(e,r,o,n,u.question,S,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;Zm(a);let y=o!==void 0?ce.get(o):void 0,u=f?oo(b.join("")):{output:c.join("").trim(),llmUsage:void 0},A=f?c.join("").trim():"",S=[u.output.trim(),A].filter(_=>_.length>0).join(`
`);f&&u.output.trim().length>0&&p(u.output);let g=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${S}`.trim():S;Cr(e,r,o,n,h??-1,g,s,u.llmUsage)}),t.on("error",h=>{d||Cr(e,r,o,n,-1,h.message,s)})},BJ=(e,t,r,n,o,s,i,a,c)=>{let d=PF(r,c);s!==void 0&&(ce.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),Qe(o,{type:"terminal.stream.start",payload:{runId:s},requestId:n}),Nn(o,s,()=>ce.has(s),xl(e,o,s,n,i,a))),oi(e,t,r,f=>{if(!(s===void 0||f.length===0)){if(It(s)){Qe(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:f},requestId:n});return}or(s,f)}}).then(f=>{Zm(t),Cr(e,o,s,n,f.exitCode,f.output,r,f.llmUsage)}).catch(f=>{let b=f instanceof Error?f.message:String(f);Cr(e,o,s,n,-1,b,r)})},ig=(e,t,r,n,o,s,i,a,c,d,p,f)=>{let b=PF(r,p);if(Vs(e.layout),Zr(e,t)){yF(s),BJ(e,t,r,n,o,s,c,d,b);return}let h=Pt(t,r,zJ(e),i);if(h===null){Cr(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}yF(s);let y=vH({workspace:e.workspace,projectFolderPath:c}),u=()=>{let A=(0,SF.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:f??process.env});UJ(e,A,o,n,s,r,b,t)};if(s===void 0){u();return}ce.set(s,{originalPrompt:r,userTranscriptPrompt:b,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:ce.get(s)?.accumulatedOutput??""}),$J(e,o,s,n,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&js({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Nn(o,s,()=>ce.has(s),xl(e,o,s,n,c,d)),$H({socket:o,sendMessage:Qe,requestId:n,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:f,originalPrompt:r,writerAgent:t,onInputRequired:A=>{a!==void 0&&ls(a,_=>{Qe(o,_)},n);let S=ce.get(s),g=[S?.accumulatedOutput??"",A.partialOutput].filter(_=>_.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=g),wF(e,o,s,n,A.question,g,r)},onFinished:(A,S)=>{Zm(t);let g=oo(S),_=ce.get(s),w=_!==void 0&&_.accumulatedOutput.length>0?`${_.accumulatedOutput}

${g.output}`.trim():g.output;Cr(e,o,s,n,A,w,r,g.llmUsage)}}).then(A=>{if(!A){u();return}Nn(o,s,()=>lw(s),xl(e,o,s,n,c,d))}).catch(A=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",A instanceof Error?A.message:A),u()})},Rw=(e,t,r,n)=>{Dm(e.layout,t.agentRunId),t.shellSessionId!==void 0&&Qe(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=FH(t),s=ce.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;ig(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},kw=(e,t)=>{for(let r of dH(e.layout))ce.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:kr(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Nn(t,r.agentRunId,()=>Q_(e.layout,r.agentRunId),{awaitingInput:!0}),Qe(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Cw=(e,t,r,n)=>{let o=ce.get(r);if(o===void 0)return!1;vw.add(r),vl(r);let s=Cl.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(MH(r))return!0;Dm(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${bF}`:"Stopped by user.";return Cr(e,t,r,n,AF,i,o.originalPrompt),!0}});var GJ,Tw,WF=l(()=>{"use strict";pi();GJ=()=>`http://127.0.0.1:${at()}/restart`,Tw=async()=>{try{let e=await fetch(GJ(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var EF=l(()=>{"use strict";ea()});var LF=l(()=>{"use strict";QP()});var RF,kF=l(()=>{"use strict";RF=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Il,VJ,xw,CF=l(()=>{"use strict";U();Q();EF();wS();LF();kF();Xn();Il=(e,t)=>{Pr(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},VJ=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(rh(),th)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},xw=async e=>{let t=_e(e.layout.installDir)?.bundleVersion??null;if(!RF({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(st(e.layout)){Ks({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Il(e.layout,{summary:r,action:"install-bundle-update-start"}),jt({launchAgentLabel:te(e.layout.installDir),installDir:e.layout.installDir});let n=await Xo({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),Il(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await VJ();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Il(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),Il(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),Il(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var qJ,Iw,TF=l(()=>{"use strict";qJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Iw=e=>{if(!qJ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Ow,Nw,xF=l(()=>{"use strict";nS();oS();Ow=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Mi({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},Nw=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Vt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var IF,KJ,JJ,YJ,Ol,OF=l(()=>{"use strict";IF=m(require("node:os"));Pe();KJ="Default",JJ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),YJ=e=>{let t=IF.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Ol=()=>{let e=O(),t=Vc(e),r=JJ(KJ);return`${YJ(t)}/${r.length>0?r:"project"}`}});var NF=l(()=>{"use strict";ea()});var MF,Mw,jF=l(()=>{"use strict";NF();MF=!1,Mw=e=>{MF||(MF=!0,process.on("uncaughtException",t=>{gn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;gn(e,{kind:"crash",message:r,stack:n})}))}});var DF,XJ,jw,HF=l(()=>{"use strict";DF=require("node:child_process");Jm();it();Fm();Hm();Pl();$m();XJ=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,DF.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},jw=async e=>{if(!se(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&ve(e.runConfig.writerExecutionBackend)==="api"){let r=Fe(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let n=me(e.layout.configPath),o=Oe(n,r),s=o!==null&&o.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await sr(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await XJ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var Dw,FF=l(()=>{"use strict";Dw=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var $F,Hw,zF=l(()=>{"use strict";$F=require("node:crypto"),Hw=()=>(0,$F.randomUUID)()});var us,UF,ag=l(()=>{"use strict";us="[[WORKING_ESTIMATE]]",UF=(e,t,r,n="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",us,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var BF,GF=l(()=>{"use strict";BF=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var ZJ,VF,qF=l(()=>{"use strict";ag();ZJ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,VF=e=>{if(!e.includes(us))return null;let t=null;for(let r of e.matchAll(ZJ)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var QJ,Fw,KF=l(()=>{"use strict";qF();QJ=/^(\d{1,6})\b/,Fw=e=>{let t=VF(e);if(t!==null)return t;let r=QJ.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return!Number.isFinite(n)||n<=0?null:n}});var e4,t4,r4,lg,$w=l(()=>{"use strict";it();Xi();e4="http://127.0.0.1:11434",t4=45e3,r4=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},lg=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||e4,n=t===void 0?(await ut({commands:ie({})})).estimateModel:t;if(n===null||n.trim().length===0)return null;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:n,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(t4)});return o.ok?r4(await o.json()):null}catch{return null}}});var zw,Uw,Bw,JF=l(()=>{"use strict";Ds();ag();og();GF();KF();Ya();$w();zw=async e=>{let t=kr(e.wrappedPrompt),r=IM(e.reportsDir);return{estimateOutput:await lg(UF(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},Uw=e=>{let t=Fw(e.estimateOutput);t!==null&&im({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},Bw=e=>{let t=Fw(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=BF(t);return Ms({reportKey:e.reportKey,agentRunId:e.agentRunId,status:At.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),im({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var cg,YF,Gw=l(()=>{"use strict";cg="[[WORKING_TOKEN_ESTIMATE]]",YF=(e,t,r,n="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",cg,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var XF,n4,ZF,QF=l(()=>{"use strict";Gw();XF=/^(\d{1,8})\b/,n4=e=>{let t=e.indexOf(cg);if(t<0)return null;let r=e.slice(t+cg.length).trim(),n=XF.exec(r);if(n===null)return null;let o=Number.parseInt(n[1]??"",10);return Number.isFinite(o)&&o>=1?o:null},ZF=e=>{let t=n4(e);if(t!==null)return t;let r=XF.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return Number.isFinite(n)&&n>=1?n:null}});var Vw,qw,e$=l(()=>{"use strict";Gw();og();QF();Ya();$w();Vw=async e=>{let t=kr(e.wrappedPrompt),r=MM(e.reportsDir);return{estimateOutput:await lg(YF(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},qw=e=>{let t=ZF(e.estimateOutput);return t===null?null:(OM({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var t$=l(()=>{"use strict";K_();eH();rH();iH();pi();vF();Jm();it();_w();Bm();WF();pS();CF();Xn();TF();xF();zm();OF();jF();HF();od();FF();zF();ag();Ds();JF();e$();ew();Xi();Vm();gw()});var r$={};ht(r$,{buildContinuationPromptWithContext:()=>i4});var o4,s4,i4,n$=l(()=>{"use strict";o4=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,s4=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),i4=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=s4(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${o4(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var o$={};ht(o$,{readHarnessExportSets:()=>l4});var Nl,Kw,dg,a4,l4,s$=l(()=>{"use strict";Nl=m(require("node:fs")),Kw=m(require("node:path"));Pe();dg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),a4=e=>{if(!Nl.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Nl.default.readFileSync(e.harnessManifestPath,"utf8"));if(dg(t))return t}catch{return null}return null},l4=(e,t)=>{let r=O(t),n=a4(r);if(n===null)return[];let o=dg(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!dg(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!dg(p))continue;let f=typeof p.path=="string"?p.path:void 0,b=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(f===void 0||b.length===0||h.length===0||y.length===0)continue;let u=f.startsWith("shared/")?Kw.default.join(r.harnessRootDir,f):Kw.default.join(r.harnessSetsDir,i,f);Nl.default.existsSync(u)&&d.push({id:b,kind:h,title:y,content:Nl.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var tv,Yw,ps,i$,c4,a$,l$,Jw,c$,Xw,Zw,Qw,K,z,ev,d4,Ml,u4,p4,m4,g4,f4,h4,y4,S4,jl,d$=l(()=>{"use strict";tv=require("node:child_process"),Yw=m(require("node:fs")),ps=m(require("node:os"));GD();U();Q();So();u_();JD();ae();Ue();ea();IA();Pm();fm();ct();nn();OS();$t();t$();i$=3e4,c4=3e4,a$=new Map,l$=new Map,Jw=new Map,c$=new Map,Xw=new Map,Zw=new Map,Qw=new Map,K=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),z=(e,t,r)=>{e.readyState===gl.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Pr(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),$u(r,"out",t)))},ev=e=>e,d4=e=>{if(!Yw.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Yw.default.readFileSync(e.harnessManifestPath,"utf8"));if(K(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Ml=(e,t)=>{let r=d4(t);r!==null&&z(e,{type:"harness.manifest.report",payload:{hostname:ps.default.hostname(),manifest:r}})},u4=async(e,t,r,n,o,s,i=!1,a,c,d,p,f)=>{let b=f?.trim()??"";if(!se(t)){z(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let h=_l({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await ut({commands:ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?zw({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=s!==void 0?Vw({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,S=Rl(t)&&!dw(t);if(S){try{await sr(e.layout.installDir,t)}catch(F){let Ie=F instanceof Error?F.message:String(F);z(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ie}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Ll(t)}else if(!Rl(t))try{await sr(e.layout.installDir,t)}catch(F){let Ie=F instanceof Error?F.message:String(F);z(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ie}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let g=ii(d,Ol,f);if(g===null){z(o,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:n});return}$e({projectFolderPath:g,...b.length>0?{projectId:b}:{}}),i||tl(e.layout,t,g);let _=gm({sessionContinuation:i,supportsWriterSessionContinuation:Ym(t),isWriterConversationStarted:Xm(t)}),w=i&&_==="first"?el(e.layout,t,g):null,W=w!==null?Yo(e.layout,w):null,L=W!==null&&W.turns.length>0,R=HP({sessionContinuation:i,supportsWriterSessionContinuation:Ym(t),isWriterConversationStarted:Xm(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:L,userPromptCharacterCount:r.length}),k=r;if(R.continuationStrategy==="source_run_seed"){let F=typeof c=="string"&&c.length>0?kl(e.layout,c):null;if(F!==null){let{buildContinuationPromptWithContext:Ie}=await Promise.resolve().then(()=>(n$(),r$));k=Ie({priorPrompt:F.prompt,priorOutput:F.resultOutput??"",userMessage:r})}}else R.continuationStrategy==="transcript_seed"&&W!==null&&W.turns.length>0&&(k=cm({priorTurns:W.turns,userMessage:r}));let x=R.ragLimit>0?await ko({layout:e.layout,query:k,limit:R.ragLimit,minScore:R.ragMinScore,projectFolderPath:g,...b.length>0?{projectId:b}:{}}):[],D=R.ragLimit>0&&g.trim().length>0?await TA({layout:e.layout,query:k,limit:2,minScore:.32,projectFolderPath:g,...b.length>0?{projectId:b}:{}}):[],ee=R.injectMemory?kP(e.layout,g,b.length>0?b:void 0):[],J=`${TP(ee,R.memoryEntryLimit)}${RA(x)}${xA(D)}${k}`,V=p?.trim()??(s!==void 0&&g.trim().length>0?Hw():void 0);if(s!==void 0&&V!==void 0&&V.length>0&&g.trim().length>0){js({reportKey:V,agentRunId:s,userSummary:"Working on your Mac\u2026"});let F=J;u!==null&&u.then(Ie=>{if(Ie===null)return;let Tr=Bw({estimateOutput:Ie.estimateOutput??"",reportKey:V,agentRunId:s,reportsDir:e.layout.reportsDir,task:Ie.task,writerLabel:Ie.writerLabel,embedding:Ie.embedding});if(Tr.estimateSeconds===null)return;Ew(e.layout.reportsDir,s);let nv=`${us}
${Tr.estimateSeconds}
`;if(It(s)){z(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:nv},requestId:n});return}or(s,nv)}).catch(()=>{}),J=Dw(F),J=Lf(J,{agentRunId:s,reportKey:V,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then(F=>{F!==null&&Uw({estimateOutput:F.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:F.task,writerLabel:F.writerLabel,embedding:F.embedding})}).catch(()=>{}),s!==void 0&&A!==null&&A.then(F=>{F!==null&&qw({estimateOutput:F.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:F.task,writerLabel:F.writerLabel})}).catch(()=>{});let ms=s!==void 0&&Qw.get(s)===!0;if(s!==void 0&&g.trim().length>0){let F=await hu(g);Zw.set(s,F),V!==void 0&&V.length>0&&Xw.set(s,V)}ig(e,t,J,n,ev(o),s,{sessionTurn:R.sessionTurn},a,g,V,r,Oh(e.layout,s,ms)),S&&s!==void 0&&z(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:pw(t)},requestId:n})},p4=async(e,t,r,n,o)=>{let s=(i,a)=>{z(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await mw({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,z(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:n})}}),c=se(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?cs(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},m4=(e,t,r)=>new Promise(n=>{if(!se(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=Pt(t,r,ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,tv.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),g4=async(e,t,r,n)=>{if(t.installMethod!=="deterministic-bundle")return!1;z(n,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let o=wt(t.bundle),s=K(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(o!==null)return o;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=we(e.wsUrl)??Ht,f=await by({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return f.ok?f.bundle:null})();if(i===null)return z(n,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=rn({bundle:i,layout:e.layout});return z(n,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Ml(n,e.layout),!0},f4=async(e,t,r,n)=>{if(await g4(e,t,r,n))return;let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(z(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){z(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!se(o)){z(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}Vs(e.layout);let i=await(async()=>{try{await sr(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return m4(e,o,s)})().finally(()=>{qs(e.layout)});z(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),Ml(n,e.layout)},h4=e=>{let t=1e3*2**e;return Math.min(c4,t)},y4=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(st(e.layout)){Kf(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,Tw().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1})}},n=(u,A="system.ack")=>{if(!t.selfUpdateInFlight){if(st(e.layout)){Ks({layout:e.layout,remoteBundleVersion:u,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,xw({layout:e.layout,remoteBundleVersion:u,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},o=()=>{let u=ge(e.layout);u!==null&&Ce(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===gl.OPEN||u.readyState===gl.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(o,i$)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=h4(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},f=u=>{s();let A=()=>{let S=zs(e.layout.installDir),g=at();z(u,{type:"agent.heartbeat",payload:{hostname:ps.default.hostname(),macOsUsername:ps.default.userInfo().username,wakeError:t.wakeError,wakePort:g,...e.email!==null?{email:e.email}:{},installBundleVersion:S}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,i$)},b=(u,A)=>{if(typeof u.type!="string")return;if(IS(u)){t.stopped=!0,s(),a(),c(),kS({layout:e.layout}).finally(()=>{hl(),process.exit(0)});return}Pr(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),$u(e.layout,"in",u);let S=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&K(u.payload)){let g=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",_=typeof u.payload.origin=="string"?u.payload.origin:"",w=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",W=typeof u.payload.challenge=="string"?u.payload.challenge:"",L=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!d_({serverPublicKey:g,origin:_,devicePublicKey:w,challenge:W,serverAttestation:L})){t.wakeError="Server attestation verification failed",Pr(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&K(u.payload)){let g=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Pr(e.layout,{direction:"local",type:"writer.ensure",summary:g,action:"ensure-writer"}),jw({layout:e.layout,writerAgent:g,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(_=>{z(A,{type:"writer.status",payload:_},e.layout)})}if(u.type==="install.bundle.update"&&K(u.payload)){let g=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";g.length>0&&n(g,"install.bundle.update")}if(u.type==="system.ack"){wu(e.layout,{wsUrl:e.wsUrl});let g=K(u.payload)?u.payload:null,_=Iw(g);_!==null&&n(_)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&K(u.payload)&&Ow(u.payload),u.type==="automations.run"&&K(u.payload)&&Nw(u.payload),u.type==="terminal.stream.accepted"&&K(u.payload)){let g=typeof u.payload.runId=="string"?u.payload.runId:"";if(g.length>0){let _=sw(g);for(let w of _)z(A,{type:"terminal.stream.chunk",payload:{runId:g,chunk:w},requestId:S})}}if(u.type==="agent.agentRun.list"&&z(A,{type:"dashboard.agentRun.list.result",payload:{runs:Pw(e.layout)},requestId:S}),u.type==="agent.agentRun.get"&&K(u.payload)){let g=typeof u.payload.runId=="string"?u.payload.runId:"",_=g.length>0?kl(e.layout,g):null;z(A,{type:"dashboard.agentRun.get.result",payload:{run:_},requestId:S})}if(u.type==="command.claude.run"&&K(u.payload)){let g=u.payload.prompt,_=typeof u.payload.writerAgent=="string"&&se(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",w=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,W=u.payload.sessionContinuation===!0,L=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,R=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,k=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,x=ii(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,Ol,k),D=Lh(u.payload.compositionSnapshot),ee=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof g=="string"&&g.trim().length>0){if(console.log(`[agent-witch] Running ${_} task (${W?"continue":"first"})\u2026`),x===null){z(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...w!==void 0?{agentRunId:w}:{}},requestId:S});return}if(D!==null){let J=kh(e.layout,D);if(J!==null){z(A,{type:"command.claude.result",payload:{exitCode:-1,output:J,...w!==void 0?{agentRunId:w}:{}},requestId:S});return}if(w!==void 0){let V=Th(e.layout,w,D);if(!V.ok){z(A,{type:"command.claude.result",payload:{exitCode:-1,output:V.errorMessage,...w!==void 0?{agentRunId:w}:{}},requestId:S});return}Qw.set(w,D.entries.some(ms=>ms.scope==="run"))}}w!==void 0&&R!==void 0&&a$.set(w,R),w!==void 0&&(l$.set(w,x),k!==void 0&&k.trim().length>0&&Jw.set(w,k.trim()),c$.set(w,g.trim()),$e({projectFolderPath:x,...k!==void 0&&k.trim().length>0?{projectId:k.trim()}:{}})),u4(e,_,g.trim(),S,A,w,W,R,L,x,ee,k)}}if(u.type==="shell.session.open"&&K(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.cols=="number"?u.payload.cols:120,w=typeof u.payload.rows=="number"?u.payload.rows:32;g.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),cw({shellSessionId:g,cwd:e.workspace,cols:_,rows:w,send:W=>{z(A,W)},requestId:S}))}if(u.type==="shell.session.close"&&K(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";g.length>0&&ls(g,_=>{z(A,_)},S)}if(u.type==="shell.input"&&K(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.data=="string"?u.payload.data:"";g.length>0&&_.length>0&&iw(g,_)}if(u.type==="shell.resize"&&K(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.cols=="number"?u.payload.cols:0,w=typeof u.payload.rows=="number"?u.payload.rows:0;g.length>0&&_>0&&w>0&&aw(g,_,w)}if(u.type==="command.writer.session.end"&&K(u.payload)){let g=u.payload.writerAgent;typeof g=="string"&&se(g)&&(uw(g),pm(e.layout,g))}if(u.type==="command.writer.session.start"&&K(u.payload)){let g=u.payload.writerAgent,_=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof g=="string"&&se(g)&&_.length>0&&(console.log(`[agent-witch] Starting ${g} session\u2026`),p4(e,g,_,S,A))}if(u.type==="command.claude.stop"&&K(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";g.length>0&&(console.log(`[agent-witch] Stopping run ${g}\u2026`),Cw(e,ev(A),g,S))}if(u.type==="command.claude.input_respond"&&K(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",_=typeof u.payload.response=="string"?u.payload.response.trim():"",w=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",W=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",L=typeof u.payload.question=="string"?u.payload.question:"";g.length>0&&_.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),Rw(e,{agentRunId:g,originalPrompt:w,partialOutput:W,question:L,response:_,shellSessionId:a$.get(g)},S,ev(A)))}if(u.type==="dispatch.approval.required"&&K(u.payload)){let g=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",_=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${g}: ${_}`),process.platform==="darwin"&&(0,tv.spawn)("osascript",["-e",`display notification "${_.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${g.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&K(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),f4(e,u.payload,S,A)),u.type==="harness.export.request"&&K(u.payload)){let g=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",_=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,w=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(W=>typeof W=="string"):[];g.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:W}=await Promise.resolve().then(()=>(s$(),o$)),L=W(w,e.email);z(A,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:g,..._!==void 0?{targetDeviceId:_}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:S})})()}if(u.type==="harness.manifest.request"&&Ml(A,e.layout),u.type==="command.claude.result"&&K(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,_=typeof u.payload.output=="string"?u.payload.output:"",w=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,W=ii(g!==void 0?l$.get(g):void 0,Ol),L=g!==void 0?Jw.get(g):void 0,R=g!==void 0?c$.get(g)??"":"",k=Ky({exitCode:w,output:_});if(k&&W!==null&&LA({layout:e.layout,text:_,source:g??"command.claude.result",projectFolderPath:W,...L!==void 0?{projectId:L}:{}}),w!=null&&w!==0&&_.trim().length>0&&W!==null&&(_A({layout:e.layout,errorText:_,projectFolderPath:W,...L!==void 0?{projectId:L}:{}}),CA({layout:e.layout,text:_,source:g??"command.claude.result.failure",projectFolderPath:W,...L!==void 0?{projectId:L}:{}})),k&&R.trim().length>0&&W!==null&&CP({layout:e.layout,projectFolderPath:W,...L!==void 0?{projectId:L}:{},entry:{id:`${Date.now()}-${g??"run"}`,...g!==void 0?{agentRunId:g}:{},prompt:R,output:_,createdAt:new Date().toISOString()}}),g!==void 0&&W!==null){let D=Xw.get(g),ee=Zw.get(g);D!==void 0&&ee!==void 0&&hu(W).then(J=>{let V=Jy({before:ee,after:J});Rf(D,V),Zw.delete(g),Xw.delete(g)})}if(k&&L!==void 0&&L.trim().length>0){let D=H(),ee=D===null?null:Y({wsUrl:D.wsUrl,pairingToken:D.pairingToken});ee!==null&&Xy(ee,L,{...g!==void 0?{sourceRunId:g}:{},lesson:Yy({prompt:R,output:_})})}g!==void 0&&(li(e.layout,g),Qw.delete(g),Jw.delete(g))}},h=()=>{if(t.stopped)return;a(),c();let u=new gl(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Ww(Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Lw(e.layout);let A=we(e.wsUrl)??"http://localhost:3000",S=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),g=c_({layout:e.layout,origin:A,...S!==void 0&&S.length>0?{claimToken:S}:{}});z(u,{type:"agent.register",payload:{role:"agent",hostname:ps.default.hostname(),macOsUsername:ps.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...g}},e.layout),Ml(u,e.layout),kw(e,u),f(u)}),u.on("message",A=>{let S=typeof A=="string"?A:A.toString("utf8");try{let g=JSON.parse(S);if(!K(g))return;b(g,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(A,S)=>{s(),t.socket=void 0,t.wsConnected=!1,aS(e.layout),t.reconnectAttempt+=1;let g=typeof S=="string"?S:S.toString("utf8");gn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:g}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",A=>{t.wakeError=A.message,gn(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return qf(()=>{let u=Jf();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&n(u.remoteBundleVersion,u.trigger);let A=Yf();A!==null&&r(A)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:zi(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:il(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Ml(u,e.layout),{ok:!0})}}},S4=async()=>{He("agent-witch");let e=U_(),t=E();q_().ok||(process.platform==="darwin"?(await $r(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),X_(t);let n=Y_({installDir:t});n.length>0&&console.log(`[agent-witch] Stopped ${n.length} sibling process(es): ${n.join(", ")}`),process.platform==="darwin"&&(jt({launchAgentLabel:te(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),ks());let o=await Uh(),s=o[0];s!==void 0&&Mw(s.layout);for(let h of o){let y=we(h.wsUrl)??Ht;Us(h.layout.installDir,y)}let i=o.map(h=>y4(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),hl(),process.exit(0));let c=()=>{o.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let A=ge(h.layout);lS(A,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=o[0]?.layout;h!==void 0&&(st(h)||Ui(h.installDir))},f=await Z_({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):sl({layout:o[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let b=Dt(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Cs(),d()});d=()=>{b(),f.stop(),hl(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},jl=S4});var rv=l(()=>{"use strict";d$()});var u$={};ht(u$,{startAgentWitchClient:()=>jl});var A4,p$=l(()=>{"use strict";rv();rv();Vn();kf();id();A4={};if(Br(A4.url)&&!ot()){let e=process.argv.indexOf("report");e>=0&&process.exit(sd(process.argv.slice(e))),jl()}});Wf();kf();id();var NE="20.x",ME="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var pG=e=>[`Node.js ${NE} or newer is required (found ${e}).`,ME].join(" "),jE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${pG(process.version)}
`),process.exit(1))};var w4={},b4=async()=>{He("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(rh(),th)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},P4=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(DC(),jC)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},_4=async()=>{if(!Br(w4.url))return;jE();let e=process.argv.indexOf("report");e>=0&&process.exit(sd(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await b4();return}if(t==="wake"){await P4();return}if(t==="bridge"){let{runAgentWitchBridgeCli:n}=await Promise.resolve().then(()=>(HT(),DT));await n();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:n}=await Promise.resolve().then(()=>(Fj(),Hj));n();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(p$(),u$));await r()};_4();
