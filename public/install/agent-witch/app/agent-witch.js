#!/usr/bin/env node
"use strict";var s$=Object.create;var ig=Object.defineProperty;var i$=Object.getOwnPropertyDescriptor;var a$=Object.getOwnPropertyNames;var l$=Object.getPrototypeOf,c$=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},ht=(e,t)=>{for(var r in t)ig(e,r,{get:t[r],enumerable:!0})},d$=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of a$(t))!c$.call(e,o)&&o!==r&&ig(e,o,{get:()=>t[o],enumerable:!(n=i$(t,o))||n.enumerable});return e};var m=(e,t,r)=>(r=e!=null?s$(l$(e)):{},d$(t||!e||!e.__esModule?ig(r,"default",{value:e,enumerable:!0}):r,e));var Nn=v(ag=>{"use strict";Object.defineProperty(ag,"__esModule",{value:!0});ag.stringify=u$;function u$(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var I=v(lg=>{"use strict";Object.defineProperty(lg,"__esModule",{value:!0});lg.generateTypeGuardError=p$;var ev=Nn();function p$(e,t,r){return(0,ev.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,ev.stringify)(e)}) to be "${r}"`}});var sr=v(Il=>{"use strict";Object.defineProperty(Il,"__esModule",{value:!0});Il.isNonNullObject=void 0;var m$=I(),g$=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,m$.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Il.isNonNullObject=g$});var yt=v(de=>{"use strict";Object.defineProperty(de,"__esModule",{value:!0});de.attachTypeGuardMeta=de.isArrayTypeGuard=de.isNestedObjectTypeGuard=de.getTypeGuardWrapperKind=de.getTypeGuardInnerGuard=de.getTypeGuardItemGuard=de.getTypeGuardSchema=void 0;var f$=e=>e.schema;de.getTypeGuardSchema=f$;var h$=e=>e.itemGuard;de.getTypeGuardItemGuard=h$;var y$=e=>e.innerGuard;de.getTypeGuardInnerGuard=y$;var S$=e=>e.wrapperKind;de.getTypeGuardWrapperKind=S$;var A$=e=>{if((0,de.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};de.isNestedObjectTypeGuard=A$;var b$=e=>{if((0,de.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};de.isArrayTypeGuard=b$;var P$=(e,t)=>Object.assign(e,t);de.attachTypeGuardMeta=P$});var us=v(Cr=>{"use strict";Object.defineProperty(Cr,"__esModule",{value:!0});Cr.getExpectedTypeName=Cr.getTypeGuardDisplayName=void 0;var tv=yt(),_$=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Cr.getTypeGuardDisplayName=_$;var w$=e=>{let t=(0,tv.getTypeGuardWrapperKind)(e),r=(0,tv.getTypeGuardInnerGuard)(e);if(t&&r){let o=(0,Cr.getExpectedTypeName)(r);if(t==="undefinedOr")return`${o} | undefined`;if(t==="nullOr")return`${o} | null`;if(t==="nilOr")return`${o} | null | undefined`}let n=e.name;if(n.startsWith("is")){let o=n.slice(2);return o.endsWith("Guard")&&(o=o.slice(0,-5)),o==="Type"||o==="Schema"?"object":o==="Array"?"Array":o.toLowerCase()}return"unknown"};Cr.getExpectedTypeName=w$});var xr=v(Ol=>{"use strict";Object.defineProperty(Ol,"__esModule",{value:!0});Ol.createValidationResult=void 0;var v$=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Ol.createValidationResult=v$});var Mn=v(Nl=>{"use strict";Object.defineProperty(Nl,"__esModule",{value:!0});Nl.createValidationError=void 0;var W$=(e,t,r,n)=>({path:e,expectedType:t,actualValue:r,message:n});Nl.createValidationError=W$});var jn=v(Ml=>{"use strict";Object.defineProperty(Ml,"__esModule",{value:!0});Ml.createTreeNode=void 0;var E$=(e,t,r,n)=>({valid:t,path:e,...r&&{expectedType:r},...n!==void 0&&{actualValue:n},children:{},errors:[]});Ml.createTreeNode=E$});var ps=v(jl=>{"use strict";Object.defineProperty(jl,"__esModule",{value:!0});jl.combineResults=void 0;var L$=xr(),R$=(e,t)=>{let r=e.every(s=>s.valid),n=e.flatMap(s=>s.errors),o={valid:r,path:t||"root",children:{},errors:n};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";o.children[i]=s.tree}}),(0,L$.createValidationResult)(r,n,o)};jl.combineResults=R$});var Hl=v(Dl=>{"use strict";Object.defineProperty(Dl,"__esModule",{value:!0});Dl.createSimplifiedTree=void 0;var rv=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,n])=>{t[r]=rv(n)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},k$=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let n={};Object.entries(e.children).forEach(([o,s])=>{n[o]=rv(s)}),r[t]={valid:e.valid,value:n}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Dl.createSimplifiedTree=k$});var gs=v($l=>{"use strict";Object.defineProperty($l,"__esModule",{value:!0});$l.validateObject=void 0;var T$=sr(),ms=xr(),C$=Mn(),Fl=jn(),x$=ps(),nv=Ul(),I$=(e,t,r)=>{let n=()=>{let i=(0,C$.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Fl.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,ms.createValidationResult)(!1,[],a):(0,ms.createValidationResult)(!1,[i],a)},o=()=>{let i=Object.keys(t);if(i.length===0)return(0,ms.createValidationResult)(!0,[],(0,Fl.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,f=d,b=t[f],h=e[f],y=(0,nv.validateProperty)(f,h,b,r);return y.valid?p.length===0?(0,ms.createValidationResult)(!0,[],(0,Fl.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,nv.validateProperty)(d,e[d],p,r)}),a=(0,x$.combineResults)(i,r.path),c=(0,Fl.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,ms.createValidationResult)(a.valid,a.errors,c)};return(0,T$.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?o():s():n()};$l.validateObject=I$});var sv=v(Gl=>{"use strict";Object.defineProperty(Gl,"__esModule",{value:!0});Gl.validateArray=void 0;var O$=Nn(),zl=xr(),ov=Mn(),Bl=jn(),N$=ps(),M$=gs(),j$=us(),D$=yt(),H$=(e,t,r)=>{let n=r.path;if(!Array.isArray(e)){let c=(0,ov.createValidationError)(n,"Array",e,`Expected ${n} (${JSON.stringify(e)}) to be "Array"`),d=(0,Bl.createTreeNode)(n,!1,"Array",e);return d.errors=[c],(0,zl.createValidationResult)(!1,[c],d)}let o=(0,D$.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${n}[${d}]`,f={path:p,config:r.config||null};if(o)return(0,M$.validateObject)(c,o,f);let b=t(c,null),h=(0,j$.getExpectedTypeName)(t),y=(0,O$.stringify)(c);if(b)return(0,zl.createValidationResult)(!0,[],(0,Bl.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,S=(0,ov.createValidationError)(p,h,c,u),A=(0,Bl.createTreeNode)(p,!1,h,c);return A.errors=[S],(0,zl.createValidationResult)(!1,[S],A)}),i=(0,N$.combineResults)(s,n),a=(0,Bl.createTreeNode)(n,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,zl.createValidationResult)(i.valid,i.errors,a)};Gl.validateArray=H$});var Ul=v(ql=>{"use strict";Object.defineProperty(ql,"__esModule",{value:!0});ql.validateProperty=void 0;var iv=xr(),F$=Mn(),av=jn(),$$=us(),Vl=yt(),U$=gs(),z$=sv(),B$=(e,t,r,n)=>{let o=`${n.path}.${e}`,s={path:o,config:n.config||null,...n.parentTree&&{parentTree:n.parentTree}},i=n.config?.errorMode||"multi",a=(0,Vl.getTypeGuardSchema)(r),c=(0,Vl.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,U$.validateObject)(t,a,s);if(c&&(0,Vl.isArrayTypeGuard)(r))return(0,z$.validateArray)(t,c,s)}let d=p=>{let f=r(t,p),b=(0,$$.getExpectedTypeName)(r);return f?(0,iv.createValidationResult)(!0,[],(0,av.createTreeNode)(o,!0,b,t)):(()=>{let h=(0,F$.createValidationError)(o,b,t,`Expected ${o} (${JSON.stringify(t)}) to be "${b}"`),y=(0,av.createTreeNode)(o,!1,b,t);return y.errors=[h],(0,iv.createValidationResult)(!1,[h],y)})()};if((0,Vl.isNestedObjectTypeGuard)(r)){let p=n.config?{...n.config,identifier:o}:null;return d(p)}return d(null)};ql.validateProperty=B$});var Jl=v(Kl=>{"use strict";Object.defineProperty(Kl,"__esModule",{value:!0});Kl.isNil=void 0;var G$=I(),V$=function(e,t){return e!=null?(t&&t.callbackOnError((0,G$.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Kl.isNil=V$});var cg=v(Yl=>{"use strict";Object.defineProperty(Yl,"__esModule",{value:!0});Yl.isDefined=void 0;var q$=I(),K$=Jl(),J$=function(e,t){return(0,K$.isNil)(e,null)?(t&&t.callbackOnError((0,q$.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Yl.isDefined=J$});var dg=v(Xl=>{"use strict";Object.defineProperty(Xl,"__esModule",{value:!0});Xl.reportValidationResults=void 0;var Y$=Hl(),lv=cg(),X$=Jl(),Z$=(e,t)=>{if(e.valid===!0||(0,X$.isNil)(t))return;let r=t.errorMode||"multi",n=(i,a)=>{(0,lv.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,Y$.createSimplifiedTree)(a),null,2))},o=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,lv.isDefined)(e.tree)?n(t,e.tree):r==="multi"?o(t):s(t)};Xl.reportValidationResults=Z$});var ug=v(X=>{"use strict";Object.defineProperty(X,"__esModule",{value:!0});X.Validation=X.reportValidationResults=X.validateObject=X.validateProperty=X.createSimplifiedTree=X.combineResults=X.createTreeNode=X.createValidationError=X.createValidationResult=X.getExpectedTypeName=void 0;var Q$=us();Object.defineProperty(X,"getExpectedTypeName",{enumerable:!0,get:function(){return Q$.getExpectedTypeName}});var e1=xr();Object.defineProperty(X,"createValidationResult",{enumerable:!0,get:function(){return e1.createValidationResult}});var t1=Mn();Object.defineProperty(X,"createValidationError",{enumerable:!0,get:function(){return t1.createValidationError}});var r1=jn();Object.defineProperty(X,"createTreeNode",{enumerable:!0,get:function(){return r1.createTreeNode}});var n1=ps();Object.defineProperty(X,"combineResults",{enumerable:!0,get:function(){return n1.combineResults}});var o1=Hl();Object.defineProperty(X,"createSimplifiedTree",{enumerable:!0,get:function(){return o1.createSimplifiedTree}});var s1=Ul();Object.defineProperty(X,"validateProperty",{enumerable:!0,get:function(){return s1.validateProperty}});var i1=gs();Object.defineProperty(X,"validateObject",{enumerable:!0,get:function(){return i1.validateObject}});var a1=dg();Object.defineProperty(X,"reportValidationResults",{enumerable:!0,get:function(){return a1.reportValidationResults}});var l1=xr(),c1=ps(),d1=Mn(),u1=jn(),p1=Ul(),m1=gs(),g1=dg(),f1=Hl();X.Validation={result:l1.createValidationResult,combine:c1.combineResults,error:d1.createValidationError,treeNode:u1.createTreeNode,property:p1.validateProperty,object:m1.validateObject,report:g1.reportValidationResults,createSimplifiedTree:f1.createSimplifiedTree}});var Zl=v(pg=>{"use strict";Object.defineProperty(pg,"__esModule",{value:!0});pg.isType=y1;var cv=sr(),dv=ug(),h1=yt();function y1(e){if(!(0,cv.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,n){let o=n?.errorMode||"multi";if(o==="multi"||o==="json"){let s={path:n?.identifier||"root",config:n||null},i=(0,dv.validateObject)(r,e,s);return(0,dv.reportValidationResults)(i,n||null),i.valid}return(0,cv.isNonNullObject)(r,n)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],n?{...n,identifier:`${n.identifier}.${s}`}:null)}):!1}return(0,h1.attachTypeGuardMeta)(t,{schema:e})}});var gv=v(Ir=>{"use strict";Object.defineProperty(Ir,"__esModule",{value:!0});Ir.isNestedType=Ir.isShape=void 0;Ir.isSchema=fs;var uv=sr(),pv=ug(),mv=yt();function fs(e){if(!(0,uv.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=A1(e);function r(n,o){let s=o?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:o?.identifier||"root",config:o||null},a=(0,pv.validateObject)(n,t,i);return(0,pv.reportValidationResults)(a,o||null),a.valid}return(0,uv.isNonNullObject)(n,o)?Object.keys(t).every(function(i){let a=t[i];return a?a(n[i],o?{...o,identifier:`${o.identifier}.${i}`}:null):!1}):!1}return(0,mv.attachTypeGuardMeta)(r,{schema:t})}function S1(e){return typeof e=="function"?e:Array.isArray(e)?b1(e):typeof e=="object"&&e!==null?fs(e):e}function A1(e){let t={};for(let[r,n]of Object.entries(e))t[r]=S1(n);return t}function b1(e){let t=e[0],r=fs(t);function n(o,s){return Array.isArray(o)?o.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,mv.attachTypeGuardMeta)(n,{itemGuard:r})}Ir.isShape=fs;Ir.isNestedType=fs});var fv=v(mg=>{"use strict";Object.defineProperty(mg,"__esModule",{value:!0});mg.isObjectWith=_1;var P1=Zl();function _1(e){return(0,P1.isType)(e)}});var hv=v(gg=>{"use strict";Object.defineProperty(gg,"__esModule",{value:!0});gg.isObject=v1;var w1=Zl();function v1(e){return(0,w1.isType)(e)}});var yv=v(fg=>{"use strict";Object.defineProperty(fg,"__esModule",{value:!0});fg.guardWithTolerance=W1;function W1(e,t,r){return t(e,r),e}});var Sv=v(hg=>{"use strict";Object.defineProperty(hg,"__esModule",{value:!0});hg.isBranded=L1;var E1=I();function L1(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,E1.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var Av=v(Ql=>{"use strict";Object.defineProperty(Ql,"__esModule",{value:!0});Ql.BrandSymbols=void 0;Ql.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var bv=v(ec=>{"use strict";Object.defineProperty(ec,"__esModule",{value:!0});ec.isAny=void 0;var R1=function(e){return!0};ec.isAny=R1});var hs=v(yg=>{"use strict";Object.defineProperty(yg,"__esModule",{value:!0});yg.reportTypeGuardError=T1;var k1=I();function T1(e,t,r){e&&e.callbackOnError((0,k1.generateTypeGuardError)(t,e.identifier,r))}});var Pv=v(tc=>{"use strict";Object.defineProperty(tc,"__esModule",{value:!0});tc.isBoolean=void 0;var C1=hs(),x1=function(t,r){return typeof t!="boolean"?((0,C1.reportTypeGuardError)(r,t,"boolean"),!1):!0};tc.isBoolean=x1});var _v=v(rc=>{"use strict";Object.defineProperty(rc,"__esModule",{value:!0});rc.isDate=void 0;var I1=I(),O1=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,I1.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};rc.isDate=O1});var Sg=v(nc=>{"use strict";Object.defineProperty(nc,"__esModule",{value:!0});nc.isNumber=void 0;var N1=hs(),M1=function(t,r){return typeof t!="number"||isNaN(t)?((0,N1.reportTypeGuardError)(r,t,"number"),!1):!0};nc.isNumber=M1});var wv=v(oc=>{"use strict";Object.defineProperty(oc,"__esModule",{value:!0});oc.isString=void 0;var j1=hs(),D1=function(t,r){return typeof t!="string"?((0,j1.reportTypeGuardError)(r,t,"string"),!1):!0};oc.isString=D1});var vv=v(sc=>{"use strict";Object.defineProperty(sc,"__esModule",{value:!0});sc.isUnknown=void 0;var H1=function(e){return!0};sc.isUnknown=H1});var Wv=v(ic=>{"use strict";Object.defineProperty(ic,"__esModule",{value:!0});ic.isFunction=void 0;var F1=I(),$1=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,F1.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};ic.isFunction=$1});var Lv=v(ac=>{"use strict";Object.defineProperty(ac,"__esModule",{value:!0});ac.isFile=void 0;var Ev=I(),U1=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,Ev.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,Ev.generateTypeGuardError)(e,t.identifier,"File")),!1)};ac.isFile=U1});var kv=v(lc=>{"use strict";Object.defineProperty(lc,"__esModule",{value:!0});lc.isFileList=void 0;var Rv=I(),z1=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,Rv.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,Rv.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};lc.isFileList=z1});var Cv=v(cc=>{"use strict";Object.defineProperty(cc,"__esModule",{value:!0});cc.isBlob=void 0;var Tv=I(),B1=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,Tv.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,Tv.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};cc.isBlob=B1});var Iv=v(dc=>{"use strict";Object.defineProperty(dc,"__esModule",{value:!0});dc.isFormData=void 0;var xv=I(),G1=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,xv.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,xv.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};dc.isFormData=G1});var Nv=v(uc=>{"use strict";Object.defineProperty(uc,"__esModule",{value:!0});uc.isURL=void 0;var Ov=I(),V1=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,Ov.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,Ov.generateTypeGuardError)(e,t.identifier,"URL")),!1)};uc.isURL=V1});var jv=v(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.isURLSearchParams=void 0;var Mv=I(),q1=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,Mv.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,Mv.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};pc.isURLSearchParams=q1});var Dv=v(mc=>{"use strict";Object.defineProperty(mc,"__esModule",{value:!0});mc.isMap=void 0;var K1=I(),J1=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,K1.generateTypeGuardError)(e,t.identifier,"Map")),!1)};mc.isMap=J1});var Hv=v(gc=>{"use strict";Object.defineProperty(gc,"__esModule",{value:!0});gc.isSet=void 0;var Y1=I(),X1=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,Y1.generateTypeGuardError)(e,t.identifier,"Set")),!1)};gc.isSet=X1});var Fv=v(Ag=>{"use strict";Object.defineProperty(Ag,"__esModule",{value:!0});Ag.isIndexSignature=Q1;var Z1=I();function Q1(e,t){return function(r,n){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return n&&n.callbackOnError((0,Z1.generateTypeGuardError)(r,n.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let f=s[d],b=e(d,n?{...n,identifier:`${n.identifier}[key:${p}]`}:null),h=t(f,n?{...n,identifier:`${n.identifier}[value:${p}]`}:null);return b&&h})}}});var $v=v(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.isError=void 0;var eU=hs(),tU=function(t,r){return t instanceof Error?!0:((0,eU.reportTypeGuardError)(r,t,"Error"),!1)};fc.isError=tU});var Pg=v(bg=>{"use strict";Object.defineProperty(bg,"__esModule",{value:!0});bg.isArrayWithEachItem=oU;var rU=I(),nU=yt();function oU(e){let t=function(r,n){return Array.isArray(r)?r.every((o,s)=>e(o,n?{...n,identifier:`${n.identifier}[${s}]`}:null)):(n&&n.callbackOnError((0,rU.generateTypeGuardError)(r,n.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,nU.attachTypeGuardMeta)(t,{itemGuard:e})}});var _g=v(hc=>{"use strict";Object.defineProperty(hc,"__esModule",{value:!0});hc.isNonEmptyArray=void 0;var sU=I(),iU=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,sU.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};hc.isNonEmptyArray=iU});var Uv=v(wg=>{"use strict";Object.defineProperty(wg,"__esModule",{value:!0});wg.isNonEmptyArrayWithEachItem=cU;var aU=Pg(),lU=_g();function cU(e){return function(t,r){return(0,aU.isArrayWithEachItem)(e)(t,r)&&(0,lU.isNonEmptyArray)(t,r)}}});var Bv=v(vg=>{"use strict";Object.defineProperty(vg,"__esModule",{value:!0});vg.isTuple=dU;var zv=I();function dU(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,zv.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((n,o)=>n(t[o],r?{...r,identifier:`${r.identifier}[${o}]`}:null)):(r&&r.callbackOnError((0,zv.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var Gv=v(Wg=>{"use strict";Object.defineProperty(Wg,"__esModule",{value:!0});Wg.isObjectWithEachItem=pU;var uU=I();function pU(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,uU.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var Vv=v(Eg=>{"use strict";Object.defineProperty(Eg,"__esModule",{value:!0});Eg.isPartialOf=gU;var mU=sr();function gU(e){return function(t,r){if(!(0,mU.isNonNullObject)(t,r))return!1;for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&Object.prototype.hasOwnProperty.call(t,n)){let o=e[n],s=t[n];if(o&&!o(s,r?{...r,identifier:`${r.identifier}.${n}`}:null))return!1}return!0}}});var qv=v(Lg=>{"use strict";Object.defineProperty(Lg,"__esModule",{value:!0});Lg.isPick=hU;var fU=sr();function hU(e,...t){return function(r,n){if(!(0,fU.isNonNullObject)(r,n))return!1;for(let o of t)if(!Object.prototype.hasOwnProperty.call(r,o))return n&&e(r,n),!1;return!0}}});var Kv=v(Rg=>{"use strict";Object.defineProperty(Rg,"__esModule",{value:!0});Rg.isOmit=SU;var yU=sr();function SU(e,...t){return function(r,n){if(!(0,yU.isNonNullObject)(r,n))return!1;let o=[],s=n?.identifier||"root",i=n?{...n,callbackOnError:d=>o.push(d)}:{identifier:s,callbackOnError:d=>o.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=o.filter(d=>{let p=d.slice(9),f=p.indexOf(" ("),b=f>=0?p.slice(0,f):p;if(a.has(b))return!1;let h=b.startsWith(s+".")&&b.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(n&&c.length>0)for(let d of c)n.callbackOnError(d);return c.length===0}}});var Jv=v(yc=>{"use strict";Object.defineProperty(yc,"__esModule",{value:!0});yc.isNonEmptyString=void 0;var AU=I(),bU=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,AU.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};yc.isNonEmptyString=bU});var Yv=v(Sc=>{"use strict";Object.defineProperty(Sc,"__esModule",{value:!0});Sc.isNonNegativeNumber=void 0;var PU=I(),_U=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,PU.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Sc.isNonNegativeNumber=_U});var Xv=v(Ac=>{"use strict";Object.defineProperty(Ac,"__esModule",{value:!0});Ac.isPositiveNumber=void 0;var wU=I(),vU=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,wU.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Ac.isPositiveNumber=vU});var Zv=v(bc=>{"use strict";Object.defineProperty(bc,"__esModule",{value:!0});bc.isNonPositiveNumber=void 0;var WU=I(),EU=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,WU.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};bc.isNonPositiveNumber=EU});var Qv=v(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.isNegativeNumber=void 0;var LU=I(),RU=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,LU.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Pc.isNegativeNumber=RU});var eW=v(_c=>{"use strict";Object.defineProperty(_c,"__esModule",{value:!0});_c.isInteger=void 0;var kU=I(),TU=Sg(),CU=function(e,t){return!(0,TU.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,kU.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};_c.isInteger=CU});var tW=v(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.isPositiveInteger=void 0;var xU=I(),IU=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,xU.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};wc.isPositiveInteger=IU});var rW=v(vc=>{"use strict";Object.defineProperty(vc,"__esModule",{value:!0});vc.isNegativeInteger=void 0;var OU=I(),NU=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,OU.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};vc.isNegativeInteger=NU});var nW=v(Wc=>{"use strict";Object.defineProperty(Wc,"__esModule",{value:!0});Wc.isNonNegativeInteger=void 0;var MU=I(),jU=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,MU.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Wc.isNonNegativeInteger=jU});var oW=v(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.isNonPositiveInteger=void 0;var DU=I(),HU=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,DU.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Ec.isNonPositiveInteger=HU});var sW=v(Rc=>{"use strict";Object.defineProperty(Rc,"__esModule",{value:!0});Rc.isNumeric=void 0;var Lc=I(),FU=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Lc.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Lc.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Lc.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Lc.generateTypeGuardError)(e,t.identifier,"number key")),!1};Rc.isNumeric=FU});var iW=v(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.isBooleanLike=void 0;var kg=I(),$U=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,kg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,kg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};kc.isBooleanLike=$U});var aW=v(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.isDateLike=void 0;var ys=I(),UU=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,ys.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,ys.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,ys.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,ys.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,ys.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Tc.isDateLike=UU});var lW=v(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.isBigInt=void 0;var zU=I(),BU=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,zU.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Cc.isBigInt=BU});var Cg=v(Tg=>{"use strict";Object.defineProperty(Tg,"__esModule",{value:!0});Tg.isOneOf=GU;var cW=Nn();function GU(...e){return function(t,r){let n=e.some(function(o){return t===o});return!n&&r&&r.callbackOnError(`${r.identifier} (${(0,cW.stringify)(t)}) must be one of following values ${e.map(cW.stringify).join(" | ")}`),n}}});var dW=v(xg=>{"use strict";Object.defineProperty(xg,"__esModule",{value:!0});xg.isOneOfTypes=KU;var VU=Nn(),qU=us();function KU(...e){return function(t,r){let n=e.map(s=>({typeGuard:s,isValid:s(t,null)})),o=n.some(s=>s.isValid);if(!o&&r){let s=(0,VU.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,qU.getTypeGuardDisplayName)(c)).join(" | ")}"`];n.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return o}}});var uW=v(Ig=>{"use strict";Object.defineProperty(Ig,"__esModule",{value:!0});Ig.isIntersectionOf=JU;function JU(...e){return function(t,r){for(let n of e)if(!n(t,r))return!1;return!0}}});var pW=v(Og=>{"use strict";Object.defineProperty(Og,"__esModule",{value:!0});Og.isExtensionOf=YU;function YU(e,t){return function(r,n){return e(r,n)?t(r,n):!1}}});var mW=v(Ng=>{"use strict";Object.defineProperty(Ng,"__esModule",{value:!0});Ng.isNullOr=ZU;var XU=yt();function ZU(e){function t(r,n){return r===null?!0:e(r,n)}return(0,XU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var gW=v(Mg=>{"use strict";Object.defineProperty(Mg,"__esModule",{value:!0});Mg.isUndefinedOr=ez;var QU=yt();function ez(e){function t(r,n){return r===void 0?!0:e(r,n)}return(0,QU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var fW=v(jg=>{"use strict";Object.defineProperty(jg,"__esModule",{value:!0});jg.isNilOr=rz;var tz=yt();function rz(e){function t(r,n){return r==null?!0:e(r,n)}return(0,tz.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var hW=v(Dg=>{"use strict";Object.defineProperty(Dg,"__esModule",{value:!0});Dg.isAsserted=nz;function nz(e){return!0}});var yW=v(Hg=>{"use strict";Object.defineProperty(Hg,"__esModule",{value:!0});Hg.isEnum=sz;var oz=Cg();function sz(e){return function(t,r){return(0,oz.isOneOf)(...Object.values(e))(t,r)}}});var SW=v(Fg=>{"use strict";Object.defineProperty(Fg,"__esModule",{value:!0});Fg.isEqualTo=lz;var iz=I(),az=Nn();function lz(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,iz.generateTypeGuardError)(t,r.identifier,`equal to ${(0,az.stringify)(e)}`)),!1):!0}}});var AW=v(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.isRegex=void 0;var cz=I(),dz=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,cz.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};xc.isRegex=dz});var PW=v($g=>{"use strict";Object.defineProperty($g,"__esModule",{value:!0});$g.isPattern=uz;var bW=I();function uz(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,n){return typeof r!="string"?(n&&n.callbackOnError((0,bW.generateTypeGuardError)(r,n.identifier,"string")),!1):t.test(r)?!0:(n&&n.callbackOnError((0,bW.generateTypeGuardError)(r,n.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var _W=v(Ug=>{"use strict";Object.defineProperty(Ug,"__esModule",{value:!0});Ug.by=pz;function pz(e){return function(t){return e(t,null)}}});var wW=v(zg=>{"use strict";Object.defineProperty(zg,"__esModule",{value:!0});zg.toNumber=mz;function mz(e){return typeof e=="number"?e:Number(e)}});var vW=v(Bg=>{"use strict";Object.defineProperty(Bg,"__esModule",{value:!0});Bg.toDate=gz;function gz(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var WW=v(Gg=>{"use strict";Object.defineProperty(Gg,"__esModule",{value:!0});Gg.toBoolean=fz;function fz(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var EW=v(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.isSymbol=void 0;var hz=I(),yz=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,hz.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Ic.isSymbol=yz});var Ss=v(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var Sz=Zl();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return Sz.isType}});var Vg=gv();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return Vg.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return Vg.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return Vg.isNestedType}});var Az=fv();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return Az.isObjectWith}});var bz=hv();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return bz.isObject}});var Pz=yv();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return Pz.guardWithTolerance}});var _z=Sv();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return _z.isBranded}});var wz=Av();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return wz.BrandSymbols}});var vz=bv();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return vz.isAny}});var Wz=Pv();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return Wz.isBoolean}});var Ez=_v();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return Ez.isDate}});var Lz=cg();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return Lz.isDefined}});var Rz=Jl();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return Rz.isNil}});var kz=Sg();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return kz.isNumber}});var Tz=wv();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return Tz.isString}});var Cz=vv();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return Cz.isUnknown}});var xz=Wv();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return xz.isFunction}});var Iz=Lv();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return Iz.isFile}});var Oz=kv();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return Oz.isFileList}});var Nz=Cv();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return Nz.isBlob}});var Mz=Iv();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return Mz.isFormData}});var jz=Nv();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return jz.isURL}});var Dz=jv();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return Dz.isURLSearchParams}});var Hz=Dv();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return Hz.isMap}});var Fz=Hv();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return Fz.isSet}});var $z=Fv();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return $z.isIndexSignature}});var Uz=$v();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return Uz.isError}});var zz=Pg();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return zz.isArrayWithEachItem}});var Bz=_g();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return Bz.isNonEmptyArray}});var Gz=Uv();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return Gz.isNonEmptyArrayWithEachItem}});var Vz=Bv();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return Vz.isTuple}});var qz=sr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return qz.isNonNullObject}});var Kz=Gv();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return Kz.isObjectWithEachItem}});var Jz=Vv();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return Jz.isPartialOf}});var Yz=qv();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return Yz.isPick}});var Xz=Kv();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return Xz.isOmit}});var Zz=Jv();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return Zz.isNonEmptyString}});var Qz=Yv();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return Qz.isNonNegativeNumber}});var eB=Xv();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return eB.isPositiveNumber}});var tB=Zv();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return tB.isNonPositiveNumber}});var rB=Qv();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return rB.isNegativeNumber}});var nB=eW();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return nB.isInteger}});var oB=tW();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return oB.isPositiveInteger}});var sB=rW();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return sB.isNegativeInteger}});var iB=nW();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return iB.isNonNegativeInteger}});var aB=oW();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return aB.isNonPositiveInteger}});var lB=sW();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return lB.isNumeric}});var cB=iW();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return cB.isBooleanLike}});var dB=aW();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return dB.isDateLike}});var uB=lW();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return uB.isBigInt}});var pB=Cg();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return pB.isOneOf}});var mB=dW();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return mB.isOneOfTypes}});var gB=uW();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return gB.isIntersectionOf}});var fB=pW();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return fB.isExtensionOf}});var hB=mW();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return hB.isNullOr}});var yB=gW();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return yB.isUndefinedOr}});var SB=fW();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return SB.isNilOr}});var AB=hW();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return AB.isAsserted}});var bB=yW();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return bB.isEnum}});var PB=SW();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return PB.isEqualTo}});var _B=AW();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return _B.isRegex}});var wB=PW();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return wB.isPattern}});var vB=I();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return vB.generateTypeGuardError}});var WB=_W();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return WB.by}});var EB=wW();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return EB.toNumber}});var LB=vW();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return LB.toDate}});var RB=WW();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return RB.toBoolean}});var kB=EW();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return kB.isSymbol}})});var As,LW,RW,Or,qg,$6,kW,Oc,Nr,bs,Kg,Jg,Yg,Xg,It,Zg,Nc,Mc,jc,Ps,Qe,Dn,Hn,Dc,ir,Qg,TW,St=l(()=>{"use strict";As={production:".agent-witch",localhost:".local-agent-witch"},LW={production:47892,localhost:47893},RW={production:"com.agent-witch",localhost:"com.local-agent-witch"},Or={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},qg="app",$6=`${qg}/agent-witch.js`,kW=`${qg}/command`,Oc={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Nr=As.production,bs=As.localhost,Kg=LW.production,Jg=LW.localhost,Yg=RW.production,Xg=RW.localhost,It="profiles",Zg=Or.activeProfile,Nc="harness",Mc="sets",jc="manifest.json",Ps=Oc.projectsDir,Qe=Oc.logsDir,Dn="agent-witch.log",Hn="agent-witch.error.log",Dc=Oc.reportsDir,ir=Oc.deviceKeypairJson,Qg=qg,TW="agent-witch.js"});var Hc,CW,CB,TB,xW,IW=l(()=>{"use strict";Hc=m(require("node:path")),CW=require("node:url"),CB={},TB=()=>!0,xW=()=>{if(TB()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Hc.default.dirname(Hc.default.resolve(e))}return Hc.default.dirname((0,CW.fileURLToPath)(CB.url))}});var ef,OW,N,NW,xB,ar,E,Fc,Ot,MW,$c,Fn,Uc,zc,te,et,tf,tt,rf,O,nf=l(()=>{"use strict";ef=m(require("node:fs")),OW=m(require("node:os")),N=m(require("node:path")),NW=m(Ss());St();IW();xB=xW(),ar=e=>e.trim().toLowerCase(),E=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return N.default.resolve(e);let t=N.default.resolve(xB),r=N.default.basename(t),n=N.default.basename(N.default.dirname(t));return r===Qg&&(n===Nr||n===bs)?N.default.dirname(t):r===Nr||r===bs?t:N.default.join(OW.default.homedir(),Nr)},Fc=(e=E())=>N.default.join(e,Qg),Ot=(e=E())=>N.default.join(Fc(e),TW),MW=(e,t,r)=>t!==null?N.default.join(e,It,t,r):N.default.join(e,r),$c=e=>MW(e.installDir,e.profileEmail,Ps),Fn=e=>MW(e.installDir,e.profileEmail,Qe),Uc=e=>e.profileEmail!==null?N.default.join(e.installDir,It,e.profileEmail,ir):N.default.join(e.installDir,ir),zc=e=>N.default.basename(e)===bs,te=(e=E())=>zc(e)?Xg:Yg,et=(e=E())=>zc(e)?Jg:Kg,tf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return ar(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?ar(t):null},tt=(e=E())=>{let t=N.default.join(e,Zg);if(!ef.default.existsSync(t))return null;try{let r=JSON.parse(ef.default.readFileSync(t,"utf8"));if((0,NW.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return ar(r.email)}catch{return null}return null},rf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?ar(r):null}let t=tf();return t!==null?t:tt()},O=e=>{let t=E(),r=Fc(t),n=Ot(t),o=rf(e);if(o!==null){let b=N.default.join(t,It,o),h=N.default.join(b,Nc),y=N.default.join(b,Ps),u=N.default.join(b,Qe),S=N.default.join(b,Dc),A=N.default.join(b,ir),g=N.default.join(b,Qe,Dn),_=N.default.join(b,Qe,Hn);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:y,logsDir:u,mainLogPath:g,errorLogPath:_,reportsDir:S,deviceKeypairPath:A,configPath:N.default.join(b,"config.json"),harnessRootDir:h,harnessManifestPath:N.default.join(h,jc),harnessSetsDir:N.default.join(h,Mc)}}let s=N.default.join(t,Nc),i=N.default.join(t,Ps),a=N.default.join(t,Qe),c=N.default.join(t,Dc),d=N.default.join(t,ir),p=N.default.join(t,Qe,Dn),f=N.default.join(t,Qe,Hn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:f,reportsDir:c,deviceKeypairPath:d,configPath:N.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:N.default.join(s,jc),harnessSetsDir:N.default.join(s,Mc)}}});var of,jW,IB,OB,DW,sf,HW=l(()=>{"use strict";of=m(require("node:fs")),jW=m(require("node:path"));St();nf();IB=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),OB=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,DW=e=>{let t=jW.default.join(e,Or.wakePort);if(!of.default.existsSync(t))return null;try{let r=JSON.parse(of.default.readFileSync(t,"utf8"));if(IB(r)&&OB(r.wakePort))return r.wakePort}catch{return null}return null},sf=(e=E())=>DW(e)??et(e)});var z=l(()=>{"use strict";nf();HW()});var _s,HB,FB,FW,$B,UB,$W=l(()=>{"use strict";z();_s=te(),HB=`${_s}-wake`,FB=`${_s}-live`,FW=`${_s}-watchdog`,$B=`${_s}-automation-scheduler`,UB=`${_s}-updater`});var af,lf,Bc=l(()=>{"use strict";af=new Set(["","loginwindow","_mbsetupuser","root"]),lf=5e3});var UW,zB,zW,cf,df=l(()=>{"use strict";UW=require("node:child_process");Bc();zB=e=>e.trim().toLowerCase(),zW=e=>e==null?!1:!af.has(zB(e)),cf=()=>{if(process.platform!=="darwin")return null;try{let t=(0,UW.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return zW(t)?t:null}catch{return null}}});var GW,BW,rt,ws=l(()=>{"use strict";GW=m(require("node:os"));df();BW=e=>e.trim().toLowerCase(),rt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?cf():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??GW.default.userInfo().username;return BW(r)===BW(n)}});var VW,qW,Mr,KW=l(()=>{"use strict";VW=require("node:child_process"),qW=m(require("node:fs"));z();ws();Mr=(e=E())=>{let t=Ot(e);if(!qW.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!rt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=tt(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,VW.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var JW,vs,Gc=l(()=>{"use strict";JW=require("node:child_process"),vs=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,JW.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Vc,uf,YW,Z,qc,Ws=l(()=>{"use strict";Vc=m(require("node:fs")),uf=m(require("node:path"));z();St();YW=e=>{let t=uf.default.join(e,It);return Vc.default.existsSync(t)?Vc.default.readdirSync(t).filter(r=>Vc.default.statSync(uf.default.join(t,r)).isDirectory()).map(r=>ar(r)).toSorted():[]},Z=(e=E())=>{let t=te(e);return[{profileEmail:YW(e)[0]??null,launchAgentLabel:t}]},qc=(e=E())=>YW(e)});var pf,XW,ZW,BB,Nt,Kc=l(()=>{"use strict";pf=m(require("node:fs")),XW=m(require("node:os")),ZW=m(require("node:path"));z();Ws();BB=()=>ZW.default.join(XW.default.homedir(),"Library","LaunchAgents"),Nt=(e=E())=>{let t=te(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of Z(e))r.add(o.launchAgentLabel);let n=BB();if(pf.default.existsSync(n))for(let o of pf.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var QW,Es,eE=l(()=>{"use strict";z();Gc();Kc();Ws();QW=(e=E())=>{let t=new Set(Z(e).map(r=>r.launchAgentLabel));return Nt(e).filter(r=>!t.has(r))},Es=(e=E())=>{for(let t of QW(e))vs(t)}});var Ls,mf=l(()=>{"use strict";z();Gc();Kc();Ls=(e=E())=>{for(let t of Nt(e))vs(t)}});var tE,rE,GB,jr,nE=l(()=>{"use strict";tE=require("node:child_process"),rE=require("node:util"),GB=(0,rE.promisify)(tE.execFile),jr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await GB("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Dr,VB,gf,ff=l(()=>{"use strict";Dr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VB=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,gf=e=>{let t=e.pathValue??VB(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${Dr(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${Dr(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${Dr(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${Dr(e.homeDir)}</string>
    <key>PATH</key>
    <string>${Dr(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${Dr(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${Dr(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Jc,hf=l(()=>{"use strict";Jc=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Hr,yf,Rs,qB,KB,JB,oE,Mt,Sf=l(()=>{"use strict";Hr=m(require("node:fs")),yf=m(require("node:os")),Rs=m(require("node:path"));St();z();ff();hf();qB=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),KB=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,JB=e=>{let t=Rs.default.join(e,Or.wakePort);if(!Hr.default.existsSync(t))return et(e);try{let r=JSON.parse(Hr.default.readFileSync(t,"utf8"));if(qB(r)&&KB(r.wakePort))return r.wakePort}catch{return et(e)}return et(e)},oE=(e,t=yf.default.homedir())=>Rs.default.join(t,"Library","LaunchAgents",`${e}.plist`),Mt=e=>{let t=e.installDir??E(),r=e.homeDir??yf.default.homedir(),n=oE(e.launchAgentLabel,r),o=Hr.default.existsSync(n)?Hr.default.readFileSync(n,"utf8"):null;if(o!==null&&Jc(o))return{ok:!0,rewritten:!1,plistPath:n};let s=gf({launchAgentLabel:e.launchAgentLabel,runPath:Rs.default.join(t,kW,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??JB(t)});if(!Jc(s))return{ok:!1,rewritten:!1,plistPath:n,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Hr.default.mkdirSync(Rs.default.dirname(n),{recursive:!0}),Hr.default.writeFileSync(n,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:n,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:n}}});var iE,aE,lE,ks,YB,XB,sE,be,Af=l(()=>{"use strict";iE=require("node:child_process"),aE=m(require("node:fs")),lE=require("node:util");z();Sf();ws();ks=(0,lE.promisify)(iE.execFile),YB=async e=>{try{return await ks("launchctl",["print",e]),!0}catch{return!1}},XB=async(e,t,r)=>{await YB(t)&&await ks("launchctl",["bootout",t]).catch(()=>{}),await ks("launchctl",["bootstrap",e,r]),await ks("launchctl",["enable",t])},sE=async e=>{try{return await ks("launchctl",["kickstart","-k",e]),!0}catch{return!1}},be=async(e,t=E())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!rt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let n=`gui/${r}`,o=`${n}/${e}`,s=Mt({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await sE(o))return{ok:!0};let i=s.plistPath;if(!aE.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await XB(n,o,i),await sE(o)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Fr,cE=l(()=>{"use strict";z();Af();Ws();Fr=async(e=E())=>{let t=[];for(let r of Z(e))(await be(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var He,jt,dE=l(()=>{"use strict";mf();ws();Bc();He=e=>{rt()||(Ls(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},jt=(e,t=lf)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{rt()||e()},t);return()=>{clearInterval(r)}}});var Q=l(()=>{"use strict";$W();KW();Gc();eE();mf();Kc();ws();nE();cE();Af();Sf();hf();ff();Ws();df();Bc();dE()});var bf=l(()=>{"use strict";Q()});var uE,pE,Yc,mE,$n,gE,fE,$r=l(()=>{"use strict";uE=".agent-witch",pE="memory",Yc="project.json",mE="chunks.ndjson",$n="runs.ndjson",gE="reports",fE=".json"});var hE=l(()=>{"use strict";$r()});var yE,Xc,Pf=l(()=>{"use strict";yE=m(require("node:path"));hE();Xc=(e,t)=>yE.default.join(e.trim(),`${t.trim()}${fE}`)});var Ts,SE,AE=l(()=>{"use strict";Ts="agent-witch.js",SE="command"});var Zc=l(()=>{"use strict";AE()});var Ur,bE,PE=l(()=>{"use strict";Zc();Ur=e=>`'${e.replace(/'/g,"'\\''")}'`,bE=e=>{let t=`${e.installDir.trim()}/${"app"}/${Ts}`,r=[Ur("node"),Ur(t),"report","write","--key",Ur(e.reportKey.trim()),"--agent-run-id",Ur(e.agentRunId.trim()),"--status",Ur(e.status),"--summary",Ur(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Ur(e.details.trim())),r.join(" ")}});var At,_E,ZB,_f,Qc=l(()=>{"use strict";Pf();PE();At={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},_E=e=>e===At.COMPLETED||e===At.FAILED,ZB=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),_f=(e,t)=>{let r=Xc(t.reportsDir,t.reportKey),n=bE({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:At.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${ZB({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var Pe=l(()=>{"use strict";St();z()});var xs,vE,wE,WE,QB,Un,eG,EE,Is,Os,wf,LE,RE,Ns=l(()=>{"use strict";xs=m(require("node:fs")),vE=m(require("node:path"));Qc();Pf();Pe();wE=50,WE=e=>{let t=O(),r=Xc(t.reportsDir,e);return xs.default.mkdirSync(vE.default.dirname(r),{recursive:!0}),r},QB=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Un=e=>{let t=WE(e);if(!xs.default.existsSync(t))return null;try{let r=JSON.parse(xs.default.readFileSync(t,"utf8"));return QB(r)?r:null}catch{return null}},eG=(e,t)=>{let r=[...e,t];return r.length>wE?r.slice(r.length-wE):r},EE=e=>{let t=WE(e.reportKey);xs.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Is=e=>{let t=Un(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:eG(t?.history??[],n)};return EE(o),o},Os=e=>{let t=Un(e.reportKey);return t!==null?t:Is({reportKey:e.reportKey,agentRunId:e.agentRunId,status:At.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},wf=(e,t)=>{let r=t.trim();if(r.length===0)return Un(e);let n=Un(e);if(n===null)return null;let o=n.details!==void 0&&n.details.trim().length>0?`${n.details.trim()}
${r}`:r,s={...n,updatedAt:new Date().toISOString(),details:o};return EE(s),s},LE=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},RE=e=>{if(e===null||!_E(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===At.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var tG,rG,Ms,kE,ed,vf=l(()=>{"use strict";Qc();Ns();tG=new Set(Object.values(At)),rG=e=>tG.has(e),Ms=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},kE=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},ed=e=>{if(e[0]!=="write")return kE(),1;let r=Ms(e,"--key"),n=Ms(e,"--agent-run-id"),o=Ms(e,"--status"),s=Ms(e,"--summary"),i=Ms(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!rG(o)?(kE(),1):(Is({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var nt,zn=l(()=>{"use strict";nt=()=>!0});var Wf,TE,zr,td=l(()=>{"use strict";Wf=m(require("node:path")),TE=require("node:url");zn();zr=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Wf.default.resolve(t);return nt()?r===Wf.default.resolve(__filename):r===(0,TE.fileURLToPath)(e)}});var rd,Bn,sG,U9,Gn=l(()=>{"use strict";rd="agent-witch.js",Bn="deps.tar.gz",sG="install.sh",U9={mainScript:`app/${rd}`,depsArchive:`app/${Bn}`,installShell:sG}});var OE=l(()=>{"use strict";Gn()});var NE=l(()=>{"use strict";Gn();OE()});var js,Lf,nd,iG,Ds,_e,qn,Hs,Fs,Br,Rf=l(()=>{"use strict";js=m(require("node:fs")),Lf=m(require("node:path"));NE();z();nd="install-version.json",iG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ds=(e=E())=>Lf.default.join(e,nd),_e=(e=E())=>{let t=Ds(e);if(!js.default.existsSync(t))return null;try{let r=JSON.parse(js.default.readFileSync(t,"utf8"));return!iG(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},qn=(e,t=E())=>{let r=Ds(t);js.default.mkdirSync(Lf.default.dirname(r),{recursive:!0}),js.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Hs=(e=E())=>_e(e)?.bundleVersion??"185",Fs=(e,t)=>{let r=_e(e);if(r!==null)return r;let n={bundleVersion:"185",appOrigin:t,updatedAt:new Date().toISOString()};return qn(n,e),n},Br=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var ME,Gr,kf,Tf,Cf,od,bt,Vr,xf=l(()=>{"use strict";ME=require("node:crypto"),Gr=m(require("node:fs")),kf=m(require("node:path"));z();Tf="self-update-log.ndjson",Cf=100,od=(e=E())=>{let t=O(),r=t.installDir===e?t.logsDir:Fn({installDir:e,profileEmail:t.profileEmail});return kf.default.join(r,Tf)},bt=(e,t=E())=>{let r={id:(0,ME.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=od(t);Gr.default.mkdirSync(kf.default.dirname(n),{recursive:!0});let o=Gr.default.existsSync(n)?Gr.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Cf+1)),JSON.stringify(r)];return Gr.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Vr=(e=20,t=E())=>{let r=od(t);if(!Gr.default.existsSync(r))return[];let n=Gr.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var If,sY,Of=l(()=>{"use strict";Gn();If="deps",sY=`${"app"}/${Bn}`});var jE=l(()=>{"use strict";Of()});var DE,lr,qr,HE,Nf,Mf,FE=l(()=>{"use strict";DE=require("node:child_process"),lr=m(require("node:fs")),qr=m(require("node:path"));Gn();Of();HE=e=>qr.default.join(e,"app",If),Nf=e=>{let t=qr.default.join(e,"app"),r=qr.default.join(t,Bn);lr.default.existsSync(r)&&(lr.default.rmSync(HE(e),{recursive:!0,force:!0}),lr.default.mkdirSync(t,{recursive:!0}),(0,DE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),lr.default.rmSync(r,{force:!0}))},Mf=e=>{lr.default.rmSync(qr.default.join(e,"node_modules"),{recursive:!0,force:!0}),lr.default.rmSync(qr.default.join(e,"package.json"),{force:!0}),lr.default.rmSync(qr.default.join(e,"package-lock.json"),{force:!0})}});var $E=l(()=>{"use strict";jE();FE()});var Dt,sd,UE=l(()=>{"use strict";Dt="https://www.agentwitch.com",sd="wss://www.agentwitch.com/api/agent-witch/ws"});var $s,Ht,zE=l(()=>{"use strict";$s="127.0.0.1",Ht=`http://${$s}:43347`});var Ft=l(()=>{"use strict";UE();zE()});var Us,id,BE,Df,aG,GE,$f,VE,ot,zs,Bs,Uf,Hf,Ff,Gs,zf,Bf,Gf,Kn=l(()=>{"use strict";Us=m(require("node:fs")),id=m(require("node:path")),BE="active-writer-work.json",Df=new Set,aG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GE=e=>e.profileEmail===null?id.default.join(e.installDir,BE):id.default.join(e.installDir,"profiles",e.profileEmail,BE),$f=e=>{let t=GE(e);if(!Us.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Us.default.readFileSync(t,"utf8"));return!aG(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},VE=(e,t)=>{let r=GE(e);Us.default.mkdirSync(id.default.dirname(r),{recursive:!0}),Us.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ot=e=>$f(e).activeCount>0,zs=e=>{let t=$f(e);VE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Bs=e=>{let t=$f(e),r=Math.max(0,t.activeCount-1);if(VE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let n of Df)n()},Uf=e=>(Df.add(e),()=>{Df.delete(e)}),Hf=null,Ff=null,Gs=e=>{Hf=e},zf=e=>{Ff=e},Bf=()=>{let e=Hf;return Hf=null,e},Gf=()=>{let e=Ff;return Ff=null,e}});var we,Vf=l(()=>{"use strict";we=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Jn,ad,Vs,qf=l(()=>{"use strict";Jn="qwen2.5:7b",ad="nomic-embed-text",Vs="Install Ollama from https://ollama.com/download"});var qs,qE,Kf=l(()=>{"use strict";qf();qs=()=>`
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
    echo "Ollama is missing. ${Vs}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Vs}" >&2
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
  agent_witch_ensure_ollama_model "${Jn}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${ad}" "\${pull_log}"
}
`,qE=()=>`
${qs()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var KE,lG,ld,Jf=l(()=>{"use strict";KE=require("node:child_process");z();Kf();lG=e=>new Promise(t=>{let r=(0,KE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:E()}}),n=[];r.stdout.on("data",o=>{n.push(o)}),r.stderr.on("data",o=>{n.push(o)}),r.on("error",o=>{t({exitCode:1,output:o.message})}),r.on("close",o=>{t({exitCode:o??1,output:Buffer.concat(n).toString("utf8").trim()})})}),ld=async(e=lG)=>{let t=`${qs()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var cr,cd,JE,cG,YE,Xn,dG,uG,pG,Yn,Kr,Jr,XE=l(()=>{"use strict";cr=m(require("node:fs")),cd=m(require("node:path"));$E();Q();z();Gn();Ft();Rf();Kn();Vf();xf();Jf();JE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cG=e=>{let t=tt(e),r=t===null?O():O(t);if(!cr.default.existsSync(r.configPath))return null;try{let n=JSON.parse(cr.default.readFileSync(r.configPath,"utf8"));return!JE(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},YE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!JE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},Xn=async e=>(await YE(e))?.bundleVersion??null,dG=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=cd.default.join(t,r);cr.default.mkdirSync(cd.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());cr.default.writeFileSync(o,s),r.endsWith(".js")&&cr.default.chmodSync(o,493)},uG=async()=>{Es(),await Fr()},pG=(e,t)=>e!==null?we(e):t??Dt,Yn=(e,t)=>({localBundleVersion:t,...e}),Kr=async e=>{let t=E(),r=_e(t),n=r?.bundleVersion??null,o=await ld();bt({event:"check_complete",ok:o.ok,message:o.message,localBundleVersion:n,remoteBundleVersion:null});let s=cG(t),i=pG(s,r?.appOrigin);if(i===null){let d=Yn({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return bt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}let a=await YE(i);if(a===null){let d=Yn({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return bt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}if(!(e?.force===!0||Br(n,a.bundleVersion))){let d=Yn({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},n);return bt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),d}try{for(let b of a.scripts)await dG(i,t,b);let d=cd.default.join(t,rd);cr.default.existsSync(d)&&cr.default.rmSync(d,{force:!0}),Nf(t),Mf(t),qn({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=O(tt(t));if(ot(p)){let b=Yn({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return bt({event:"update_applied",ok:!0,message:b.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),b}await uG();let f=Yn({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return bt({event:"update_applied",ok:!0,message:f.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),f}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",f=Yn({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},n);return bt({event:"update_failed",ok:!1,message:p,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),f}},Jr=()=>{let e=E();return{local:_e(e),logs:Vr(20,e)}}});var ZE={};ht(ZE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>nd,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Vs,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>ad,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>Jn,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Tf,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Cf,appendAgentWitchSelfUpdateLog:()=>bt,buildAgentWitchEnsureOllamaShell:()=>qs,buildAgentWitchInstallScriptOllama:()=>qE,buildAgentWitchSelfUpdateStatus:()=>Jr,ensureAgentWitchInstallVersionRecorded:()=>Fs,ensureAgentWitchOllamaInstalled:()=>ld,fetchAgentWitchRemoteInstallBundleVersion:()=>Xn,isRemoteAgentWitchBundleVersionNewer:()=>Br,readAgentWitchInstallVersion:()=>_e,readAgentWitchSelfUpdateLogs:()=>Vr,resolveAgentWitchAppOriginFromWsUrl:()=>we,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Hs,resolveAgentWitchInstallVersionPath:()=>Ds,resolveAgentWitchSelfUpdateLogPath:()=>od,runAgentWitchSelfUpdate:()=>Kr,writeAgentWitchInstallVersion:()=>qn});var ze=l(()=>{"use strict";Rf();xf();XE();Vf();qf();Kf();Jf()});var Yf={};ht(Yf,{buildAgentWitchSelfUpdateStatus:()=>Jr,fetchAgentWitchRemoteInstallBundleVersion:()=>Xn,runAgentWitchSelfUpdate:()=>Kr});var Xf=l(()=>{"use strict";ze()});function Zn(e){return(0,QE.createHash)("sha256").update(e.trim()).digest("hex")}var QE,Zf=l(()=>{"use strict";QE=require("node:crypto")});var Qn,Ks,mG,eL,Qf,tL=l(()=>{"use strict";Qn=m(require("node:fs")),Ks=m(require("node:path"));Zf();Pe();mG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eL=e=>{if(!Qn.default.existsSync(e))return null;try{let t=JSON.parse(Qn.default.readFileSync(e,"utf8"));return!mG(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Zn(t.pairingToken.trim())}catch{return null}},Qf=(e=E())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(eL(Ks.default.join(e,"config.json")));let o=Ks.default.join(e,It);if(!Qn.default.existsSync(o))return t;for(let s of Qn.default.readdirSync(o)){let i=Ks.default.join(o,s);Qn.default.statSync(i).isDirectory()&&n(eL(Ks.default.join(i,"config.json")))}return t}});var eh,rL,dd,Js,Ys,gG,fG,hG,nL,se,ie,ud,Pt,st=l(()=>{"use strict";eh=m(require("node:fs")),rL=m(require("node:os")),dd=m(require("node:path")),Js={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Ys=e=>e.trim().length>0,gG=e=>{let t=dd.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},fG=()=>{let e=rL.default.homedir(),t=dd.default.join(e,".local","bin","agent");if(eh.default.existsSync(t))return t;let r=dd.default.join(e,".local","bin","cursor-agent");return eh.default.existsSync(r)?r:Js.cursorCommand},hG=e=>{let t=e.trim();return!Ys(t)||t===Js.cursorCommand?fG():t},nL=(e,t)=>gG(e)?t:["agent",...t],se=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ie=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:Ys(t)?t.trim():Js.claudeCommand,codexCommand:Ys(r)?r.trim():Js.codexCommand,cursorCommand:hG(n),antigravityCommand:Ys(o)?o.trim():Js.antigravityCommand}},ud=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:nL(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Pt=(e,t,r,n)=>{let o=t.trim();if(!Ys(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:nL(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",o])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var dr,yG,eo,SG,to,pd=l(()=>{"use strict";dr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,yG=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([n,o])=>{if(typeof o!="object"||o===null)return{name:n,total:0};let s=o;return{name:n,total:dr(s.inputTokens)+dr(s.outputTokens)+dr(s.cacheReadInputTokens)+dr(s.cacheCreationInputTokens)}})].sort((n,o)=>o.total-n.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},eo=e=>{let t=e.trim(),r=t.indexOf("{"),n=t.lastIndexOf("}");if(r<0||n<=r)return null;let o;try{o=JSON.parse(t.slice(r,n+1))}catch{return null}if(typeof o!="object"||o===null)return null;let s=o;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=dr(a.input_tokens)+dr(a.cache_creation_input_tokens)+dr(a.cache_read_input_tokens),d=dr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:yG(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},SG=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),to=(e,t)=>{let r=eo(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??SG(r)}}});var th,AG,bG,rh,nh=l(()=>{"use strict";th=e=>e.toLocaleString("en-US"),AG=e=>e<.01?e.toFixed(4):e.toFixed(3),bG=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${AG(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${th(e.inputTokens)} in / ${th(e.outputTokens)} out (${th(e.totalTokens)} total)`,t].join(`
`)},rh=(e,t)=>{if(t===void 0)return e;let r=bG(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var md,oh=l(()=>{"use strict";md={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Yr,sh,gd,ih=l(()=>{"use strict";oh();Yr="auto",sh=e=>({value:Yr,label:`Auto (${md[e]})`}),gd={anthropic:[sh("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[sh("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[sh("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var ro,Xs,ah,Zs=l(()=>{"use strict";oh();ih();ro=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Yr))return t},Xs=(e,t)=>{let r=ro(t);return r===void 0?md[e]:r},ah=e=>{let t=ro(e);return t===void 0?Yr:t}});var fd,PG,_G,hd,oL=l(()=>{"use strict";fd={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},PG=e=>{let t=fd[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?fd["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?fd["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?fd["gemini-2.0-flash"]:null},_G=(e,t,r)=>{let n=PG(e);if(n===null)return null;let o=t/1e6*n.inputUsd,s=r/1e6*n.outputUsd;return o+s},hd=e=>{let t=_G(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var no,wG,vG,WG,yd,sL=l(()=>{"use strict";oL();no=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),wG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=no(r.input_tokens),o=no(r.output_tokens);return n===0&&o===0?null:hd({provider:"anthropic",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},vG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=no(r.prompt_tokens),o=no(r.completion_tokens);return n===0&&o===0?null:hd({provider:"openai",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},WG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let n=no(r.promptTokenCount),o=no(r.candidatesTokenCount);return n===0&&o===0?null:hd({provider:"google",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},yd=(e,t,r)=>e==="anthropic"?wG(t,r):e==="openai"?vG(t,r):WG(t,r)});var EG,lh,LG,RG,kG,TG,CG,ch,dh=l(()=>{"use strict";Zs();sL();EG=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let n=r;return n.type==="text"&&typeof n.text=="string"?n.text:""}).join(""):""},lh=(e,t,r)=>{let n=r?.trim()??"";return n.length>0?n:Xs(e,t.model)},LG=async e=>{let t=lh("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Anthropic API error (${String(r.status)})`};let o=EG(n);o.length>0&&e.onChunk?.(o);let s=yd("anthropic",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},RG=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.message;return typeof n?.content=="string"?n.content:""},kG=async e=>{let t=lh("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`OpenAI API error (${String(r.status)})`};let o=RG(n);o.length>0&&e.onChunk?.(o);let s=yd("openai",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},TG=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.content?.parts;return Array.isArray(n)?n.map(o=>{if(typeof o!="object"||o===null)return"";let s=o.text;return typeof s=="string"?s:""}).join(""):""},CG=async e=>{let t=lh("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,n=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),o=await n.json().catch(()=>null);if(!n.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Google API error (${String(n.status)})`};let s=TG(o);s.length>0&&e.onChunk?.(s);let i=yd("google",o,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},ch=async e=>{try{return e.provider==="anthropic"?await LG(e):e.provider==="openai"?await kG(e):await CG(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Fe,Qs=l(()=>{"use strict";Fe=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var iL,xG,Sd,uh=l(()=>{"use strict";iL=m(require("node:path")),xG="writer-api-secrets.json",Sd=e=>iL.default.join(e,xG)});var ph,aL,IG,ur,Oe,pr=l(()=>{"use strict";ph=m(require("node:fs"));Zs();uh();aL=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),IG=e=>{if(!aL(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,n=ro(r);return{apiKey:t,...n!==void 0?{model:n}:{}}},ur=e=>{let t=Sd(e);if(!ph.default.existsSync(t))return{};try{let r=JSON.parse(ph.default.readFileSync(t,"utf8"));if(!aL(r))return{};let n={},o=["anthropic","openai","google"];for(let s of o){let i=IG(r[s]);i!==null&&(n[s]=i)}return n}catch{return{}}},Oe=(e,t)=>ur(e)[t]??null});var ve,ei=l(()=>{"use strict";ve=e=>e==="api"?"api":"cli"});var lL,me,Xr,$t=l(()=>{"use strict";lL=m(require("node:path"));Qs();pr();ei();me=e=>lL.default.dirname(e),Xr=(e,t)=>{if(ve(e.writerExecutionBackend)!=="api")return!1;let r=Fe(t);if(r===null)return!1;let n=me(e.layout.configPath),o=Oe(n,r);return o!==null&&o.apiKey.length>0}});var ti,mh=l(()=>{"use strict";nh();dh();Qs();pr();$t();ti=async(e,t,r,n)=>{let o=r.trim();if(o.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Fe(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=me(e.layout.configPath),a=Oe(i,s);if(a===null){let d=Object.keys(ur(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await ch({provider:s,secret:a,prompt:o,onChunk:n});return{exitCode:c.exitCode,output:rh(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var cL,oo,gh=l(()=>{"use strict";cL=require("node:child_process");st();pd();mh();$t();oo=(e,t,r)=>new Promise(n=>{if(!se(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Xr(e,t)){ti(e,t,r).then(n);return}let o=Pt(t,r,ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,cL.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=to(i.join("")),p=a.join("").trim(),f=[d.output.trim(),p].filter(b=>b.length>0).join(`
`);n({exitCode:c??-1,output:f})}),s.on("error",c=>{n({exitCode:-1,output:c.message})})})});var dL=l(()=>{"use strict"});var uL=l(()=>{"use strict";nh();gh();dh();dL();pr();$t()});var pL,mL,gL,fL=l(()=>{"use strict";pL="claude",mL="codex",gL="cursor"});var hL,OG,fh,ri,Ad=l(()=>{"use strict";hL=m(require("node:path"));Ft();St();OG="ws://localhost:3000/api/agent-witch/ws",fh=e=>e.replace(/\/$/,""),ri=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return fh(t);let r=hL.default.basename(e.installDir);if(r===As.production)return sd;let n=e.configWsUrl?.trim()??"";return r===As.localhost?n.length>0?fh(n):OG:n.length>0?fh(n):sd}});var MG,hh,yh=l(()=>{"use strict";fL();Ad();ei();MG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hh=e=>{if(!MG(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=ri({installDir:e.layout.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??pL,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??mL,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??gL,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:n,workspace:o,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:ve(t.writerExecutionBackend),layout:e.layout}}}});var Sh,Ah,bh=l(()=>{"use strict";Sh=m(require("node:fs"));z();yh();Ah=e=>{let t=O(e);if(!Sh.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Sh.default.readFileSync(t.configPath,"utf8")),n=hh({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!n.ok){if(n.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return n.config}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}}});var ni,yL=l(()=>{"use strict";ni=(e,t,r)=>{let n=r?.trim()??"",o=e?.trim()??"";return n.length>0?o.length>0?o:null:o.length>0?o:t()}});var Ph,jG,_h,SL=l(()=>{"use strict";Ph=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jG=e=>{if(!Ph(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",n=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||n.length===0||!Array.isArray(e.entries))return null;let o=e.entries.flatMap(s=>{if(!Ph(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(f=>{if(!Ph(f))return[];let b=typeof f.itemKey=="string"?f.itemKey.trim():"",h=typeof f.relativePath=="string"?f.relativePath:"",y=typeof f.contentSha256=="string"?f.contentSha256.trim():"";return b.length===0||y.length===0?[]:[{itemKey:b,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:n,entries:o}},_h=jG});var AL,DG,bd,wh=l(()=>{"use strict";AL=m(require("node:path")),DG=(e,t)=>{let r=t.trim();return AL.default.join(e,"components","store",r.slice(0,2),r)},bd=DG});var bL,HG,vh,PL=l(()=>{"use strict";bL=m(require("node:fs"));wh();HG=(e,t)=>{let r=[];for(let n of t.entries)for(let o of n.items){let s=bd(e.installDir,o.contentSha256);bL.default.existsSync(s)||r.push(o.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},vh=HG});var oi,so,FG,Wh,$G,Eh,Lh=l(()=>{"use strict";oi=m(require("node:fs")),so=m(require("node:path"));wh();FG=(e,t)=>so.default.join(e.installDir,"runs",t,"overlay"),Wh=(e,t)=>so.default.join(FG(e,t),".cursor"),$G=(e,t,r)=>{let n=r.entries.filter(s=>s.scope==="run");if(n.length===0)return{ok:!0};let o=Wh(e,t);oi.default.mkdirSync(o,{recursive:!0});for(let s of n)for(let i of s.items){let a=bd(e.installDir,i.contentSha256);if(!oi.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?so.default.join(o,c):so.default.join(o,i.itemKey);oi.default.mkdirSync(so.default.dirname(d),{recursive:!0}),oi.default.copyFileSync(a,d)}return{ok:!0}},Eh=$G});var Rh,_L,UG,si,wL=l(()=>{"use strict";Rh=m(require("node:fs")),_L=m(require("node:path")),UG=(e,t)=>{let r=_L.default.join(e.installDir,"runs",t);Rh.default.existsSync(r)&&Rh.default.rmSync(r,{recursive:!0,force:!0})},si=UG});var zG,kh,vL=l(()=>{"use strict";Lh();zG=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let n=Wh(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:n}},kh=zG});var Th,BG,GG,VG,qG,KG,H,WL=l(()=>{"use strict";Th=m(require("node:fs"));Ad();z();ei();BG="claude",GG="codex",VG="cursor",qG="agy",KG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=O();if(!Th.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Th.default.readFileSync(e.configPath,"utf8"));if(!KG(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=ri({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,writerExecutionBackend:ve(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:BG,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:GG,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:VG,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:qG,pairingToken:s,layout:e}}catch{return null}}});var Pd,EL,LL=l(()=>{"use strict";Pd=m(require("node:fs"));uh();EL=(e,t)=>{let r=Sd(e);Pd.default.mkdirSync(e,{recursive:!0}),Pd.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Pd.default.chmodSync(r,384)}catch{}}});var _d,RL,Ch=l(()=>{"use strict";_d=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),n=t.slice(-4);return`${r}${"\u2022".repeat(12)}${n}`},RL=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===_d(t)}});var ii,JG,xh,Ih,kL=l(()=>{"use strict";ii=m(require("node:fs"));pr();LL();Ch();Zs();$t();JG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xh=(e,t,r,n)=>{let o=e[t],s=r?.trim()??"",i=RL(s,o?.apiKey)?"":s,a=i.length>0?i:o?.apiKey;if(a===void 0||a.length===0)return e;let c=n!==void 0?ro(n):o?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Ih=e=>{let t=me(e.configPath),r={};if(ii.default.existsSync(e.configPath))try{let o=JSON.parse(ii.default.readFileSync(e.configPath,"utf8"));JG(o)&&(r={...o})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,ii.default.mkdirSync(t,{recursive:!0}),ii.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let n=xh(xh(xh(ur(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);EL(t,n)}});var Oh,TL=l(()=>{"use strict";Oh={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var Nh,CL=l(()=>{"use strict";Qs();pr();$t();$t();Nh=(e,t)=>{if(Xr(e,t))return!1;let r=Fe(t);if(r===null)return!1;let n=me(e.layout.configPath),o=Oe(n,r);return o===null||o.apiKey.trim().length===0}});var xL,Mh,jh=l(()=>{"use strict";xL=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let n=e.readConfig(r);return n===null?[]:[n]})},Mh=async e=>{let t=xL(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=xL(e);if(o.length>0){r(o);return}setTimeout(n,e.pollIntervalMs)};n()}))}});var YG,Dh,IL=l(()=>{"use strict";Q();bh();jh();YG=1e4,Dh=()=>Mh({listProfileEmails:qc,readConfig:Ah,pollIntervalMs:YG,logWaiting:e=>{console.error(e)}})});var ae=l(()=>{"use strict";gh();uL();bh();Ad();yL();SL();PL();Lh();wL();vL();ei();WL();kL();pr();$t();Ch();Zs();TL();mh();$t();CL();Qs();pr();IL();yh();jh()});var wd,OL,XG,ZG,NL,vd,ai,Wd,li=l(()=>{"use strict";wd=m(require("node:fs")),OL=m(require("node:path")),XG="wake-port.json",ZG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),NL=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,vd=e=>OL.default.join(e,XG),ai=e=>{let t=vd(e);if(!wd.default.existsSync(t))return null;try{let r=JSON.parse(wd.default.readFileSync(t,"utf8"));if(ZG(r)&&NL(r.wakePort))return r.wakePort}catch{return null}return null},Wd=(e,t)=>{if(!NL(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=vd(e);wd.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var AQ,bQ,PQ,it,ML,ci=l(()=>{"use strict";li();Pe();li();AQ=et(),bQ=`${te()}-wake`,PQ=te(),it=()=>{let e=E(),t=ai(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return et()},ML=e=>{let t=E();ai(t)===null&&Wd(t,e)}});var jL=l(()=>{"use strict";Zf();Q();tL();ae();ci()});var Hh,di,ui,DL=l(()=>{"use strict";Hh=m(require("node:os"));jL();di=()=>{let e=Z();return{ok:!0,port:it(),hostname:Hh.default.hostname(),profileCount:e.length}},ui=()=>{let e=Z(),t=H()?.pairingToken.trim()??"",r=t.length>0?Zn(t):null,n=Qf();return{hostname:Hh.default.hostname(),port:it(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var Fh=l(()=>{"use strict";DL()});var HL,FL,$L,Ed,io=l(()=>{"use strict";HL="materialization.json",FL="backups",$L=".gitignore",Ed=e=>`harness-set:${e.trim()}`});var UL,zL,Ld,BL=l(()=>{"use strict";UL=m(require("node:crypto")),zL=m(require("node:fs")),Ld=e=>{try{let t=zL.default.readFileSync(e);return UL.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var mr,Zr,QG,GL,$h,VL=l(()=>{"use strict";mr=m(require("node:fs")),Zr=m(require("node:path"));BL();QG=(e,t,r,n)=>{let o=new Date().toISOString().replaceAll(":","-"),s=Zr.default.join(t,o,n);return mr.default.mkdirSync(Zr.default.dirname(s),{recursive:!0}),mr.default.copyFileSync(r,s),Zr.default.relative(e,s).replaceAll("\\","/")},GL=e=>{let t=Zr.default.join(e.repoRoot,e.repoRelativeDestination),r=Ld(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let n=e.ledger.entries[e.repoRelativeDestination];if(mr.default.existsSync(t)){let o=Ld(t);if(o===r)return{kind:"skipped_unchanged"};if(!(n!==void 0&&n.componentId===e.componentId)&&o!==null){let i=QG(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return mr.default.mkdirSync(Zr.default.dirname(t),{recursive:!0}),mr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return mr.default.mkdirSync(Zr.default.dirname(t),{recursive:!0}),mr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},$h=e=>{let t=Ld(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var Uh,qL,Rd,zh=l(()=>{"use strict";Uh=m(require("node:fs"));io();qL=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Rd=e=>{if(!Uh.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(Uh.default.readFileSync(e,"utf8"));if(qL(t)&&t.version===1&&qL(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var gr,kd,KL,JL=l(()=>{"use strict";gr=m(require("node:fs")),kd=m(require("node:path"));io();KL=e=>{let t=new Set(e.setSlugs.map(s=>Ed(s))),r=[],n=[],o={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){o[s]=i;continue}let a=kd.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=kd.default.join(e.repoRoot,i.backupPath);gr.default.existsSync(c)?(gr.default.mkdirSync(kd.default.dirname(a),{recursive:!0}),gr.default.copyFileSync(c,a),n.push(s)):gr.default.existsSync(a)&&gr.default.rmSync(a,{force:!0})}else gr.default.existsSync(a)&&gr.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:o},summary:{removedPaths:r,restoredPaths:n}}}});var Bh,Td,Gh=l(()=>{"use strict";Bh=m(require("node:path"));io();Td=e=>({ledgerFilePath:Bh.default.join(e.metaDirPath,HL),backupsDirPath:Bh.default.join(e.metaDirPath,FL)})});var Vh,YL,XL=l(()=>{"use strict";Vh=m(require("node:path")),YL=(e,t)=>{let n=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(n.length===0)return Vh.default.posix.join("rules",e,"file");let o=n[n.length-1]??"file",s=n[0]??"rules";return Vh.default.posix.join(s,e,o)}});var qh,ZL,Kh,QL=l(()=>{"use strict";qh=m(require("node:fs")),ZL=m(require("node:path")),Kh=(e,t)=>{qh.default.mkdirSync(ZL.default.dirname(e),{recursive:!0}),qh.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Jh,e2,Be,mi=l(()=>{"use strict";Jh=m(require("node:os")),e2=e=>{let t=e.trim();return t.startsWith("~/")?`${Jh.default.homedir()}${t.slice(1)}`:t==="~"?Jh.default.homedir():t},Be=e2});var Cd,eR,t2,tR,rR=l(()=>{"use strict";Cd=m(require("node:fs")),eR=m(require("node:path"));io();$r();t2=`*
!${Yc}
`,tR=e=>{let t=eR.default.join(e,$L);Cd.default.existsSync(t)||(Cd.default.mkdirSync(e,{recursive:!0}),Cd.default.writeFileSync(t,t2))}});var Qr,Ge,en=l(()=>{"use strict";Qr=m(require("node:path"));$r();mi();Ge=e=>{let t=Be(e),r=Qr.default.join(t,uE);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Qr.default.join(r,"rag"),memoryDirPath:Qr.default.join(r,pE),reportsDirPath:Qr.default.join(r,gE),metaFilePath:Qr.default.join(r,Yc),ragChunksFilePath:Qr.default.join(r,"rag",mE)}}});var _t,oR,r2,n2,$e,Yh=l(()=>{"use strict";_t=m(require("node:fs")),oR=m(require("node:path"));$r();rR();en();r2=(e,t)=>{if(_t.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};_t.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},n2=e=>{_t.default.existsSync(e.ragChunksFilePath)||_t.default.writeFileSync(e.ragChunksFilePath,"");let t=oR.default.join(e.memoryDirPath,$n);_t.default.existsSync(t)||_t.default.writeFileSync(t,"")},$e=e=>{let t=Ge(e.projectFolderPath);return _t.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),_t.default.mkdirSync(t.ragDirPath,{recursive:!0}),_t.default.mkdirSync(t.memoryDirPath,{recursive:!0}),tR(t.metaDirPath),r2(t,e),n2(t),{ok:!0,layout:t}}});var sR,iR,aR,lR,xd,Id=l(()=>{"use strict";sR="components",iR="store",aR="versions",lR="installed.json",xd=e=>`harness-set:${e.trim()}`});var Xh,cR,Od,Zh=l(()=>{"use strict";Xh=m(require("node:fs")),cR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Od=e=>{if(!Xh.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(Xh.default.readFileSync(e,"utf8"));if(cR(t)&&t.version===1&&cR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var gi,ao,Nd=l(()=>{"use strict";gi=m(require("node:path"));Id();ao=e=>{let t=gi.default.join(e,sR);return{componentsRootDir:t,storeDir:gi.default.join(t,iR),versionsDir:gi.default.join(t,aR),installedFilePath:gi.default.join(t,lR)}}});var Qh,dR,Md,jd,Dd=l(()=>{"use strict";Qh=m(require("node:crypto")),dR=m(require("node:fs")),Md=e=>Qh.default.createHash("sha256").update(e,"utf8").digest("hex"),jd=e=>{try{let t=dR.default.readFileSync(e);return Qh.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var ey,uR,pR,mR=l(()=>{"use strict";ey=m(require("node:fs")),uR=m(require("node:path")),pR=(e,t)=>{ey.default.mkdirSync(uR.default.dirname(e),{recursive:!0}),ey.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var ty,ry,gR,fR=l(()=>{"use strict";ty=m(require("node:fs")),ry=m(require("node:path")),gR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),n=ry.default.join(e,r),o=ry.default.join(n,`${t.versionId}.json`);ty.default.mkdirSync(n,{recursive:!0}),ty.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`)}});var Hd,hR,yR,SR=l(()=>{"use strict";Hd=m(require("node:fs")),hR=m(require("node:path"));Dd();yR=e=>{let t=Md(e.content),r=hR.default.join(e.storeDir,t);return Hd.default.existsSync(r)||(Hd.default.mkdirSync(e.storeDir,{recursive:!0}),Hd.default.writeFileSync(r,e.content)),t}});var ny,AR,o2,Fd,oy=l(()=>{"use strict";ny=m(require("node:fs")),AR=m(require("node:path"));Id();Zh();Nd();Dd();mR();fR();SR();o2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fd=e=>{let t=ao(e.installDir),r=xd(e.setSlug),n=String(e.setEntry.version),o=[];for(let i of e.setEntry.items){if(!o2(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=AR.default.join(e.harnessRootDir,a);if(!ny.default.existsSync(c))continue;let d=ny.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:jd(c);if(p!==null){if(Md(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);yR({storeDir:t.storeDir,content:d}),o.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(o.length===0)return;gR(t.versionsDir,{version:1,componentId:r,versionId:n,items:o,createdAt:new Date().toISOString()});let s=Od(t.installedFilePath);pR(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:n,installedAt:new Date().toISOString()}}})}});var iy,sy,bR,PR=l(()=>{"use strict";iy=m(require("node:fs"));oy();Zh();Nd();sy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bR=e=>{if(!iy.default.existsSync(e.harnessManifestPath))return;let t=ao(e.installDir),r=Od(t.installedFilePath);if(Object.keys(r.components).length>0)return;let n;try{n=JSON.parse(iy.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!sy(n)||n.version!==1||!sy(n.sets)))for(let[o,s]of Object.entries(n.sets)){if(!sy(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Fd({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:o,setEntry:{version:i,items:a}})}}});var ay,_R,wR,vR=l(()=>{"use strict";ay=m(require("node:fs")),_R=m(require("node:path")),wR=e=>{let t=e.componentId.replaceAll("/","_"),r=_R.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!ay.default.existsSync(r))return null;try{let n=JSON.parse(ay.default.readFileSync(r,"utf8"));if(typeof n=="object"&&n!==null&&n.version===1)return n}catch{return null}return null}});var $d,Ud,WR,ER=l(()=>{"use strict";$d=m(require("node:fs")),Ud=m(require("node:path"));Id();PR();vR();Nd();Dd();WR=e=>{bR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=ao(e.layout.installDir),r=xd(e.setSlug),n=wR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(n!==null){let i=n.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Ud.default.join(t.storeDir,i.contentSha256);if($d.default.existsSync(a)&&jd(a)===i.contentSha256)return a}}let o=e.manifestItemPath.trim();if(o.length===0)return null;let s=o.startsWith("shared/")?Ud.default.join(e.layout.harnessRootDir,o):Ud.default.join(e.layout.harnessSetsDir,e.setSlug,o);if(!$d.default.existsSync(s))return null;try{if(!$d.default.statSync(s).isFile())return null}catch{return null}return s}});var LR,s2,i2,fr,zd=l(()=>{"use strict";zh();Gh();en();LR="harness-set:",s2=e=>{let t=e.trim();if(!t.startsWith(LR))return null;let r=t.slice(LR.length).trim();return r.length>0?r:null},i2=e=>{let t=new Set;for(let r of Object.values(e.entries)){let n=s2(r.componentId);n!==null&&t.add(n)}return[...t].sort((r,n)=>r.localeCompare(n))},fr=e=>{let t=Ge(e),{ledgerFilePath:r}=Td(t),n=Rd(r);return i2(n)}});var Bd,ly,fi,a2,Ut,hi,lo=l(()=>{"use strict";Bd=m(require("node:fs")),ly=m(require("node:os")),fi=m(require("node:path")),a2=()=>Bd.default.realpathSync(fi.default.resolve(ly.default.homedir())),Ut=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?fi.default.join(ly.default.homedir(),t.slice(1)):t,n;try{n=Bd.default.realpathSync(fi.default.resolve(r))}catch{return null}let o=a2();return n===o||n.startsWith(`${o}${fi.default.sep}`)?n:null},hi=e=>{let t=Ut(e);if(t===null)return null;try{if(!Bd.default.statSync(t).isFile())return null}catch{return null}return t}});var cy,dy=l(()=>{"use strict";cy=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Vd,RR,Gd,l2,yi,uy=l(()=>{"use strict";Vd=m(require("node:fs")),RR=m(require("node:path"));io();VL();zh();JL();Gh();XL();QL();mi();Yh();ER();zd();lo();dy();Gd=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),l2=e=>{if(!Vd.default.existsSync(e))return null;try{let t=JSON.parse(Vd.default.readFileSync(e,"utf8"));if(Gd(t)&&t.version===1)return t}catch{return null}return null},yi=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=Be(e.projectFolderPath),n=Ut(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=Vd.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=$e({projectFolderPath:n}),{ledgerFilePath:i,backupsDirPath:a}=Td(s.layout),d=fr(n).filter(A=>!t.includes(A)),p=Rd(i),f=0;if(d.length>0){let A=KL({repoRoot:n,setSlugs:d,ledger:p});p=A.ledger,f=A.summary.removedPaths.length}if(t.length===0)return Kh(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:f,projectFolderPath:n,appliedSetSlugs:[]};let b=l2(e.layout.harnessManifestPath);if(b===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Gd(b.sets)?b.sets:{},y=0,u=0,S=0;for(let A of t){let g=h[A];if(!Gd(g))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let _=typeof g.version=="number"?String(g.version):"1",w=Ed(A),W=Array.isArray(g.items)?g.items:[];for(let L of W){if(!Gd(L))continue;let R=typeof L.path=="string"?L.path.trim():"";if(R.length===0)continue;let k=cy(R);if(k===null)continue;let C=YL(A,k),D=RR.default.posix.join(".cursor",C).replaceAll("\\","/"),ee=typeof L.id=="string"?L.id.trim():"",J=WR({layout:e.layout,setSlug:A,setVersion:typeof g.version=="number"?g.version:1,manifestItemPath:R,manifestItemId:ee});if(J===null)continue;let V=GL({repoRoot:n,backupsDir:a,repoRelativeDestination:D,sourceAbsolutePath:J,componentId:w,versionId:_,ledger:p});if(V.kind==="skipped_unchanged"){u+=1;continue}if(V.kind==="backed_up_user_file"){S+=1,y+=1,p={version:1,entries:{...p.entries,[D]:$h({componentId:w,versionId:_,sourceAbsolutePath:J,backupPath:V.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[D]:$h({componentId:w,versionId:_,sourceAbsolutePath:J})}}}}return y===0&&u===0&&f===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Kh(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:S,removedLedgerPathCount:f,projectFolderPath:n,appliedSetSlugs:t})}});var kR,qd,c2,d2,u2,p2,m2,g2,f2,h2,y2,Si,Kd=l(()=>{"use strict";kR=m(require("node:crypto")),qd=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},c2=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},d2=(e,t)=>{let r=c2(t),n=qd(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},u2=(e,t,r)=>{let n=d2(t,r);return`shared/items/${e}/${n}`},p2=["rules","skills","commands","instructions","agents"],m2=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),g2=(e,t)=>[...e.filter(n=>n.id!==t.id),t],f2=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},h2=e=>kR.default.createHash("sha256").update(e,"utf8").digest("hex"),y2=e=>({id:e.id,kind:e.kind,title:e.title,path:u2(e.id,e.kind,e.title),contentSha256:h2(e.content)}),Si=e=>{let t=new Date().toISOString(),r=e.existingManifest??m2(e.hostname,t),n=qd(e.bundle.slug),o=f2(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...p2.map(d=>`sets/${n}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let f=y2(p);return{files:[...d.files,{relativePath:f.path,content:p.content}],nextItems:g2(d.nextItems,f)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var hr,TR,Jd,S2,tn,py=l(()=>{"use strict";hr=m(require("node:fs")),TR=m(require("node:os")),Jd=m(require("node:path"));Kd();S2=e=>{if(!hr.default.existsSync(e))return null;try{let t=JSON.parse(hr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},tn=e=>{try{let t=S2(e.layout.harnessManifestPath),r=Si({bundle:e.bundle,hostname:TR.default.hostname(),existingManifest:t});hr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let n of r.directories)hr.default.mkdirSync(Jd.default.join(e.layout.harnessRootDir,n),{recursive:!0});for(let n of r.files){let o=Jd.default.join(e.layout.harnessRootDir,n.relativePath);hr.default.mkdirSync(Jd.default.dirname(o),{recursive:!0}),hr.default.writeFileSync(o,n.content)}return hr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var my,CR=l(()=>{"use strict";py();uy();my=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=tn({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return yi({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var xR,IR=l(()=>{"use strict";xR=["rule","skill","command","instruction","agent"]});var OR,A2,b2,wt,gy=l(()=>{"use strict";IR();OR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),A2=e=>typeof e=="string"&&xR.includes(e),b2=e=>{if(!OR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!A2(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},wt=e=>{if(!OR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=b2(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var NR,P2,fy,MR=l(()=>{"use strict";NR=require("node:zlib");gy();P2="x-agent-witch-token",fy=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[P2]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let n=r.headers.get("x-content-sha256")?.trim()??"";if(n.length>0&&n!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let o=Buffer.from(await r.arrayBuffer()),s=(0,NR.gunzipSync)(o).toString("utf8"),i=JSON.parse(s),a=wt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var yy,hy,yr,jR=l(()=>{"use strict";yy=m(require("node:fs")),hy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yr=e=>{if(!yy.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(yy.default.readFileSync(e.harnessManifestPath,"utf8"));if(!hy(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=hy(t.sets)?t.sets:{},o=Object.entries(n).map(([s,i])=>{if(!hy(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Yd,DR=l(()=>{"use strict";Yd=()=>"~"});var HR,FR,$R=l(()=>{"use strict";HR=require("node:crypto"),FR=e=>`local-${(0,HR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Sy,UR=l(()=>{"use strict";Sy=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Ai,Xd,Ay=l(()=>{"use strict";Ai=m(require("node:path")),Xd=e=>{let t=Ai.default.dirname(e),r=Ai.default.basename(t);return r==="agents"?Ai.default.basename(Ai.default.dirname(t)):r}});var bi,zt,zR,_2,w2,v2,Zd,BR,by=l(()=>{"use strict";bi=m(require("node:fs")),zt=m(require("node:path"));$R();UR();Ay();zR=new Set(["node_modules",".git","dist","build",".next","coverage"]),_2=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},w2=(e,t)=>{let r=zt.default.basename(t);if(e==="skill"){let n=t.split(zt.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},v2=e=>{let t=[],r=(o,s)=>{let i;try{i=bi.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&zR.has(a.name))continue;let c=zt.default.join(o,a.name),d=s?zt.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;Sy(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=zt.default.join(e,o);bi.default.existsSync(s)&&r(s,o)}let n=zt.default.join(e,"skills");return bi.default.existsSync(n)&&r(n,"skills"),t},Zd=e=>{let t=v2(e);if(t.length===0)return null;let r=zt.default.dirname(e),n=Xd(e),o=_2(n),s=t.map(i=>{let a=Sy(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:FR(i.absolutePath),kind:a,title:w2(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},BR=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=bi.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||zR.has(a.name))continue;let c=zt.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var GR,Py,W2,_y,VR=l(()=>{"use strict";GR=m(require("node:fs")),Py=m(require("node:path"));by();lo();W2=e=>{let t=Ut(e.trim());if(t===null)return null;if(Py.default.basename(t)===".cursor")return t;let r=Py.default.join(t,".cursor");try{if(GR.default.statSync(r).isDirectory())return Ut(r)}catch{return null}return null},_y=e=>{let t=W2(e.projectPath);if(t===null)return null;let r=Zd(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var qR,E2,Qd,wy,KR=l(()=>{"use strict";qR=m(require("node:path"));by();lo();Ay();E2=5,Qd=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},wy=e=>{let t=Ut(e.scanRoot.trim());if(t===null)return Qd(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of BR(t,E2,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=Ut(s);if(i===null)continue;let a=Xd(i);Qd(e.response,"folder",{cursorDir:i,groupName:a,repoPath:qR.default.dirname(i)});let c=Zd(i);c!==null&&(r.push(c),Qd(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Qd(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var JR,YR,XR=l(()=>{"use strict";JR=m(require("node:path")),YR=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:JR.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var Re,ZR,vy,L2,Wy,Ey,eu,Ly,Pi,QR=l(()=>{"use strict";Re=m(require("node:fs")),ZR=m(require("node:os")),vy=m(require("node:path"));Kd();oy();lo();XR();L2=e=>{if(!Re.default.existsSync(e))return null;try{let t=JSON.parse(Re.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Wy=e=>{let t=e.hostname??ZR.default.hostname(),r=L2(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let f=hi(p.sourcePath);if(f===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let b=Re.default.readFileSync(f,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:b,setSlugs:[i.slug]})}let d=Si({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)o.add(p);for(let p of d.files)s.push(p),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Re.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)Re.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=vy.default.join(e.layout.harnessRootDir,i.relativePath);Re.default.mkdirSync(vy.default.dirname(a),{recursive:!0}),Re.default.writeFileSync(a,i.content)}Re.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=qd(i.slug),d=r.sets[c];d!==void 0&&Fd({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},Ey="reveal-cache.json",eu=(e,t)=>{Re.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Re.default.writeFileSync(`${e.harnessRootDir}/${Ey}`,`${JSON.stringify(t,null,2)}
`)},Ly=e=>{let t=`${e.harnessRootDir}/${Ey}`;Re.default.existsSync(t)&&Re.default.unlinkSync(t)},Pi=e=>{let t=`${e.harnessRootDir}/${Ey}`;if(!Re.default.existsSync(t))return null;try{let r=JSON.parse(Re.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return YR(r)}catch{return null}return null}});var rn=l(()=>{"use strict";uy();CR();dy();py();MR();gy();Kd();jR();DR();VR();lo();KR();QR()});var Ry,ek=l(()=>{"use strict";rn();Pe();Ry=e=>{let t=O(e.profileEmail);return tn({bundle:e.bundle,layout:t})}});var tk=l(()=>{"use strict";ek();rn()});var R2,rk,k2,nk,nn,tu,ok=l(()=>{"use strict";R2=["agentwitch.com","www.agentwitch.com"],rk=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,k2=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},nk=e=>{let t=k2(e);return!!(R2.includes(t)||rk.test(e.trim().toLowerCase()))},nn=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return nk(r)?rk.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},tu=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:nn(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var _i=l(()=>{"use strict";ok()});var Bt,wi=l(()=>{"use strict";Bt=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var vi,sk=l(()=>{"use strict";tk();_i();wi();vi=e=>{if(!Bt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=wt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!nn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=Ry({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}}});var ky=l(()=>{"use strict";sk()});var T2,co,Ty=l(()=>{"use strict";T2=e=>e==="hourly"||e==="daily"||e==="weekdays",co=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!T2(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Wi,ru,ik,ak,Cy,at,nu,ou,su,iu,au=l(()=>{"use strict";Wi=m(require("node:fs")),ru=m(require("node:path"));Ty();ik="automations.json",ak=e=>e.profileEmail!==null?ru.default.join(e.installDir,"profiles",e.profileEmail,ik):ru.default.join(e.installDir,ik),Cy=()=>({version:1,automations:[]}),at=e=>{let t=ak(e);if(!Wi.default.existsSync(t))return Cy();try{let r=JSON.parse(Wi.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?Cy():{version:1,automations:r.automations.flatMap(o=>{let s=co(o);return s!==null?[s]:[]})}}catch{return Cy()}},nu=(e,t)=>{let r=ak(e);Wi.default.mkdirSync(ru.default.dirname(r),{recursive:!0}),Wi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ou=(e,t)=>{nu(e,{version:1,automations:t})},su=(e,t)=>{let n=at(e).automations.filter(o=>o.id!==t.id);nu(e,{version:1,automations:[...n,t]})},iu=(e,t)=>at(e).automations.find(r=>r.id===t)??null});var Ne,Sr=l(()=>{"use strict";Ne="x-agent-witch-token"});var Y,on,xy,Ei,Iy,C2,Oy,Li,Ri,Ny,ki=l(()=>{"use strict";Sr();ze();Y=e=>{let t=we(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},on=e=>({[Ne]:e,"Content-Type":"application/json"}),xy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:on(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Ei=async(e,t,r,n,o)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:on(e.pairingToken),body:JSON.stringify({exitCode:r,output:n,...typeof o?.estimateSeconds=="number"?{estimateSeconds:o.estimateSeconds}:{},...typeof o?.actualSeconds=="number"?{actualSeconds:o.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Iy=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:on(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},C2=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let n of t.projects){if(typeof n!="object"||n===null)continue;let o=n,s=typeof o.id=="string"?o.id.trim():"",i=typeof o.name=="string"?o.name.trim():"",a=typeof o.folderPath=="string"?o.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},Oy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:on(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n;if(o.ok!==!0||typeof o.project!="object")return null;let s=o.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Li=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:on(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return C2(r)}catch{return null}},Ri=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:on(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},Ny=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:on(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var sn,lk,ck,x2,My,dk,jy=l(()=>{"use strict";sn=m(require("node:fs")),lk=m(require("node:path")),ck=e=>lk.default.join(e.harnessRootDir,"projects-registry.json"),x2=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),My=e=>{let t=ck(e);if(!sn.default.existsSync(t))return[];try{let r=JSON.parse(sn.default.readFileSync(t,"utf8"));return x2(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string").map(n=>({id:n.id,name:n.name,projectFolderPath:n.projectFolderPath,addedAt:typeof n.addedAt=="string"?n.addedAt:new Date().toISOString(),...typeof n.cloudProjectId=="string"&&n.cloudProjectId.length>0?{cloudProjectId:n.cloudProjectId}:{}})):[]}catch{return[]}},dk=e=>{let t=ck(e);if(!sn.default.existsSync(t))return;let r=`${t}.migrated`;if(sn.default.existsSync(r)){sn.default.unlinkSync(t);return}sn.default.renameSync(t,r)}});var uk,I2,O2,pk,mk=l(()=>{"use strict";mi();uk=e=>Be(e),I2=e=>new Set(e.map(t=>uk(t.folderPath))),O2=e=>new Set(e.map(t=>t.id)),pk=(e,t)=>{let r=I2(t),n=O2(t),o=[],s=new Set;for(let i of e){let a=uk(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&n.has(i.cloudProjectId)||(s.add(a),o.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return o}});var Dy,Hy=l(()=>{"use strict";ki();jy();mk();Dy=async(e,t)=>{let r=My(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let n=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let o=await Li(n);if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=pk(r,o),i=r.length-s.length,a=0,c=0;for(let d of s)await Oy(n,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&dk(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var Fy,an,lu=l(()=>{"use strict";Fy=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),an=(e,t)=>e.find(r=>r.id===t)??null});var uo,cu=l(()=>{"use strict";ki();Hy();lu();uo=async(e,t)=>{t!==void 0&&await Dy(t,e);let r=Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let n=await Li(r);if(n===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let o=Fy(n);return{ok:!0,projects:o,message:o.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${o.length} project${o.length===1?"":"s"} from Agent Witch Console.`}}});var gk=l(()=>{"use strict"});var ke,fk,N2,M2,j2,D2,po,$y=l(()=>{"use strict";ke=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fk=(e,t)=>e.length===0?`<p class="empty">${ke(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${ke(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${ke(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,N2=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,M2=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${ke(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,j2=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?M2(e.project):N2();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(n=>`<li class="harness-installed-set">
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
      </form>`},D2=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${ke(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${ke(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},po=e=>{let t=e.flashError?`<div class="alert-error">${ke(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ke(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},n=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${ke(c)}</a>`,o=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=j2({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=fk(o,"No workflows installed for this project yet."):e.activeTab==="agents"?i=fk(s,"No agents installed for this project yet."):i=D2({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
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
    </section>`}});var H2,F2,hk,yk=l(()=>{"use strict";rn();Sr();H2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F2=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Ne]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();return!H2(n)||n.ok!==!0||!Array.isArray(n.bundles)?null:n.bundles.flatMap(o=>{let s=wt(o);return s===null?[]:[s]})}catch{return null}},hk=F2});var Sk,Uy,Ak=l(()=>{"use strict";ae();rn();$y();cu();yk();lu();zd();ki();Sk=e=>({kind:"page",title:e.project.name,body:po({project:e.project,installed:yr(e.layout),linkedSetSlugs:fr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),Uy=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let n=await uo(r,e.layout),o=an(n.projects,t);if(o===null)return{kind:"not_found"};let s=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await hk(s,o.id);if(i===null)return Sk({layout:e.layout,project:o,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=my({layout:e.layout,projectFolderPath:o.projectFolderPath,bundles:i});if(!a.ok)return Sk({layout:e.layout,project:o,errorMessage:a.errorMessage});let c=s===null?!1:await Ri(s,o.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(o.id)}&${d.toString()}`}}});var $2,zy,bk=l(()=>{"use strict";$2=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,zy=$2});var Pk,_k,U2,z2,du,uu,wk=l(()=>{"use strict";Pk=require("node:child_process"),_k=require("node:util"),U2=(0,_k.promisify)(Pk.execFile),z2=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},du=async(e,t)=>{try{let{stdout:r}=await U2("git",t,{cwd:e,env:z2(),maxBuffer:1048576});return r.trim()}catch{return null}},uu=async e=>{let t=await du(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await du(e,["rev-parse","--abbrev-ref","HEAD"]),n=await du(e,["status","--porcelain"]),o=await du(e,["diff","--shortstat","HEAD"]),s=n===null||n.length===0?0:n.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:o===null||o.length===0?null:o}}});var By,vk=l(()=>{"use strict";By=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",n=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,o=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${n}; ${o}; ${s}; ${i.join("; ")}.`}});var B2,Gy,Wk=l(()=>{"use strict";B2=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",n=r.length>0?r:t.length>0?t:"Lesson from completed run";return n.length<=280?n:`${n.slice(0,277)}\u2026`},Gy=B2});var G2,Vy,Ek=l(()=>{"use strict";Sr();G2=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Ne]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},Vy=G2});var Lk,Ar,Rk=l(()=>{"use strict";Lk=require("node:child_process"),Ar=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,n=(0,Lk.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return n.length>0?n:null}catch{return null}}});var kk=l(()=>{"use strict";cu()});var Ti,Tk=l(()=>{"use strict";Sr();Ti=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Ne]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var lt=l(()=>{"use strict";cu();lu();gk();mi();Yh();Ak();zd();bk();wk();vk();Wk();Ek();Rk();kk();Tk();Hy();jy();ki()});var pu,Ci,Ck,qy,ln,Ky=l(()=>{"use strict";pu=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},Ci=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=pu(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},Ck=e=>e>=1&&e<=5,qy=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return pu(t,"UTC")},ln=e=>{let t=e.from??new Date,r=pu(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Ci(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=Ci(r,e.timeZone,n,0),s=pu(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?Ci(qy(r),e.timeZone,n,0):o;if(!i&&Ck(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=qy(a),Ck(a.weekday))return Ci(a,e.timeZone,n,0);return Ci(qy(r),e.timeZone,n,0)}});var xk,Jy,Gt,Yy=l(()=>{"use strict";xk=require("node:crypto");ae();lt();Ky();au();Jy=!1,Gt=async e=>{if(Jy)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=iu(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};Jy=!0;let o=(0,xk.randomUUID)();try{let s=await oo(t,"claude-cli",n.prompt);await Ny(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=ln({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return su(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{Jy=!1}}});var mu,Ik=l(()=>{"use strict";ae();Yy();au();mu=async()=>{let e=H();if(e===null)return;let t=at(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await Gt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var xi=l(()=>{"use strict";au();Ik();Yy();Ky()});var Ok=l(()=>{"use strict";xi()});var Nk=l(()=>{"use strict";Ty()});var Mk=l(()=>{"use strict";Nk()});var Xy=l(()=>{"use strict";xi()});var V2,q2,Ii,Zy=l(()=>{"use strict";Ok();Mk();Xy();Pe();V2=e=>e!==void 0&&e.trim().length>0?O(e.trim()):O(),q2=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??ln({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??ln({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Ii=e=>{let t=V2(e.profileEmail),r=at(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=co(s);return i!==null?[q2(i,n.get(i.id))]:[]});return ou(t,o),{ok:!0,writtenCount:o.length}}});var Qy=l(()=>{"use strict";xi()});var jk=l(()=>{"use strict";ae()});var Dk=l(()=>{"use strict";Zy();Qy();Xy();jk()});var Hk,Oi,Ni,Mi,Fk=l(()=>{"use strict";Hk=m(require("node:os"));Dk();_i();wi();Oi=e=>{if(!Bt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!nn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=Ii({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},Ni=async e=>{if(!Bt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:nn(t)?Gt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Mi=()=>{let e=H(),t=e!==null?at(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Hk.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var eS=l(()=>{"use strict";Fk()});var gu=l(()=>{"use strict";Q()});var fu=l(()=>{"use strict";Q()});var hu,Uk,zk,$k,K2,J2,mo,tS=l(()=>{"use strict";hu=m(require("node:fs")),Uk=m(require("node:os")),zk=m(require("node:path"));gu();fu();li();Pe();$k=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},K2=e=>zk.default.join(Uk.default.homedir(),"Library","LaunchAgents",`${e}.plist`),J2=async e=>hu.default.existsSync(K2(e))?(await be(e)).ok:!1,mo=async(e=E())=>{let t=hu.default.existsSync(vd(e)),r=!hu.default.existsSync(Ot(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let n=ai(e);if(n===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await $k(n))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${te(e)}-wake`;await J2(i)&&s.push(i);for(let c of Z(e))(await be(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await $k(n);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var Bk=l(()=>{"use strict";Q()});var go,ji=l(()=>{"use strict";go="connection-health.json"});var cn,yu,Y2,Di,ge,rS,Su,Te,Au=l(()=>{"use strict";cn=m(require("node:fs")),yu=m(require("node:path"));ji();Y2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Di=e=>e.profileEmail===null?yu.default.join(e.installDir,go):yu.default.join(e.installDir,"profiles",e.profileEmail,go),ge=e=>{let t=Di(e);if(!cn.default.existsSync(t))return null;try{let r=JSON.parse(cn.default.readFileSync(t,"utf8"));return!Y2(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},rS=e=>{let t=Di(e);cn.default.existsSync(t)&&cn.default.rmSync(t,{force:!0})},Su=(e,t)=>{let r=Di(e),n=ge(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};cn.default.mkdirSync(yu.default.dirname(r),{recursive:!0}),cn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Te=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var Hi,Gk=l(()=>{"use strict";ji();Au();Hi=(e,t)=>{if(!t.socketOpen)return!1;let r=ge(e);return r===null?!1:!Te(r,t.staleAfterMs??12e4,t.nowMs)}});var nS,Vk=l(()=>{"use strict";Au();nS=(e,t)=>!(e!==null&&!Te(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var fo=l(()=>{"use strict";Au();Gk();Vk();ji()});var oS=l(()=>{"use strict";fo();Q()});var sS=l(()=>{"use strict";fo()});var iS=l(()=>{"use strict";Q()});var Kk,qk,Fi,aS=l(()=>{"use strict";Kk=m(require("node:fs"));Ft();gu();fu();Pe();qk=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Fi=async(e=E())=>{if(!Kk.default.existsSync(Ot(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await qk())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let n=[];for(let s of Z(e))(await be(s.launchAgentLabel)).ok&&n.push(s.launchAgentLabel);let o=await qk();return{ok:o||n.length>0,liveReachable:o,hollowInstall:!1,kickstartedLabels:n}}});var Jk=l(()=>{"use strict";Q()});var Yk,dn,lS,X2,Z2,Q2,Xk,e5,Zk,ho,bu=l(()=>{"use strict";Yk=require("node:crypto"),dn=m(require("node:fs")),lS=m(require("node:path"));Pe();X2="watchdog-log.ndjson",Z2=200,Q2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Xk=(e=E())=>{let t=O(),r=t.installDir===e?t.logsDir:Fn({installDir:e,profileEmail:t.profileEmail});return lS.default.join(r,X2)},e5=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Q2(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},Zk=(e,t=E())=>{let r={id:(0,Yk.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=Xk(t);dn.default.mkdirSync(lS.default.dirname(n),{recursive:!0});let o=dn.default.existsSync(n)?dn.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Z2+1)),JSON.stringify(r)];return dn.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},ho=(e=20,t=E())=>{let r=Xk(t);if(!dn.default.existsSync(r))return[];let n=dn.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=e5(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var cS,dS,uS,pS=l(()=>{"use strict";St();cS=Or.watchdogReinstallState,dS=900*1e3,uS=3e3});var Qk=l(()=>{"use strict";pS()});var eT={};ht(eT,{verifyAgentWitchReviveAfterKickstart:()=>r5});var t5,r5,tT=l(()=>{"use strict";Qk();sS();iS();Pe();t5=e=>new Promise(t=>{setTimeout(t,e)}),r5=async e=>{if(await t5(e.verifyDelayMs??uS),!await jr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?O():O(e.profileEmail),n=ge(r);return!Te(n,e.staleAfterMs)}});var $i,mS,n5,rT,nT,gS,fS,hS=l(()=>{"use strict";$i=m(require("node:fs")),mS=m(require("node:path"));z();pS();n5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rT=e=>mS.default.join(e,cS),nT=(e=E())=>{let t=rT(e);if(!$i.default.existsSync(t))return null;try{let r=JSON.parse($i.default.readFileSync(t,"utf8"));return!n5(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},gS=(e=E(),t=Date.now())=>{let r=nT(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=dS:!0},fS=(e=E(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=rT(e);return $i.default.mkdirSync(mS.default.dirname(n),{recursive:!0}),$i.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var yS,oT=l(()=>{"use strict";Q();hS();yS=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!gS())return{attempted:!1,ok:!1,targets:e};fS();let n=await t();if(!n.ok)return{attempted:!0,ok:!1,errorMessage:n.errorMessage,targets:e};let o=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await be(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:o.some(s=>s.revived||s.reason==="healthy"),targets:o}}});var sT=l(()=>{"use strict";hS();oT()});var SS=l(()=>{"use strict";ze()});var iT=l(()=>{"use strict";ze()});var aT,yo,lT,cT,dT,o5,s5,uT,i5,a5,pT,mT=l(()=>{"use strict";aT=require("node:child_process"),yo=m(require("node:fs")),lT=m(require("node:os")),cT=m(require("node:path")),dT=require("node:util");SS();iT();Pe();o5=(0,dT.promisify)(aT.execFile),s5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uT=e=>{let t=tt(e),r=t===null?O():O(t);if(!yo.default.existsSync(r.configPath))return null;try{let n=JSON.parse(yo.default.readFileSync(r.configPath,"utf8"));return!s5(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},i5=e=>uT(e)?.wsUrl??null,a5=e=>{let t=i5(e);return t!==null?we(t):_e(e)?.appOrigin??null},pT=async e=>{let t=e?.installDir??E(),r=uT(t),n=r!==null?we(r.wsUrl):a5(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=cT.default.join(lT.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{yo.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??tt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await o5("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{yo.default.existsSync(i)&&yo.default.unlinkSync(i)}}});var gT={};ht(gT,{attemptAgentWitchWatchdogReinstall:()=>l5});var l5,fT=l(()=>{"use strict";sT();mT();l5=async e=>yS(e,()=>pT())});var hT,yT,ST,c5,d5,u5,Ui,AS=l(()=>{"use strict";Bk();oS();sS();iS();aS();tS();gu();fu();Pe();Kn();Jk();bu();hT=e=>e===null?O():O(e),yT=async(e,t,r)=>{if(!await jr(e))return"not_running";let o=hT(t);if(ot(o))return"healthy";let s=ge(o);return Te(s,r)?"stale_connection":"healthy"},ST=async e=>{let t=e?.staleAfterMs??12e4,r=E(),n=Z(r);return Promise.all(n.map(async o=>{let s=await yT(o.launchAgentLabel,o.profileEmail,t),i=hT(o.profileEmail),a=ge(i),c=await jr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Te(a,t),needsRevive:s!=="healthy",reason:s}}))},c5=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},d5=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",u5=async e=>{let t=await be(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(tT(),eT)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Ui=async e=>{if(!rt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=E();await mo(r),await Fi(r);let n=Z(r),o=[];for(let p of n){let f=await yT(p.launchAgentLabel,p.profileEmail,t);if(f==="healthy"){o.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:f});continue}o.push(await u5({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:f,staleAfterMs:t}))}if(o.length===0){let p=Mr();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(fT(),gT)),f=await p(o);s=f.attempted,i=f.ok,a=f.errorMessage,c=[...f.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&Zk({event:d5(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:c5(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var AT,Pu,bT=l(()=>{"use strict";AT=m(require("node:os"));oS();bu();AS();Pu=async()=>{let e=await ST(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:AT.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:ho(1)[0]??null}}});var bS=l(()=>{"use strict";tS();AS();bT();bu()});var zi,Bi,Gi,PT=l(()=>{"use strict";Q();bS();zi=async()=>{await mo();let e=Z(),t=[];for(let r of e){let n=await be(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Mr();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Bi=Ui,Gi=Ui});var PS=l(()=>{"use strict";PT()});var wu,_u,_T,_S,wT,p5,m5,g5,f5,h5,vu,vT=l(()=>{"use strict";wu=require("node:child_process"),_u=m(require("node:fs")),_T=m(require("node:os")),_S=m(require("node:path")),wT=require("node:util");Q();z();p5=(0,wT.promisify)(wu.execFile),m5=()=>_S.default.join(_T.default.homedir(),"Library","LaunchAgents"),g5=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await p5("launchctl",["bootout",r]).catch(()=>{})},f5=e=>{let t=_S.default.join(m5(),`${e}.plist`);_u.default.existsSync(t)&&_u.default.unlinkSync(t)},h5=e=>{(0,wu.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},vu=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=E();if(!_u.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Nt(e);for(let r of t)await g5(r),f5(r);return h5(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var WT,Wu,ET,So,LT,y5,S5,A5,wS,b5,vS,RT=l(()=>{"use strict";WT=require("node:child_process"),Wu=m(require("node:fs")),ET=m(require("node:os")),So=m(require("node:path")),LT=require("node:util");Q();y5=(0,LT.promisify)(WT.execFile),S5=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],A5=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],wS=e=>{Wu.default.existsSync(e)&&Wu.default.rmSync(e,{force:!0})},b5=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await y5("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},vS=async e=>{let r=(e.listLaunchAgentLabels??Nt)(e.layout.installDir),n=e.launchAgentsDir??So.default.join(ET.default.homedir(),"Library","LaunchAgents"),o=e.bootoutLaunchAgent??b5;for(let i of r)await o(i),wS(So.default.join(n,`${i}.plist`));let s=So.default.dirname(e.layout.configPath);for(let i of S5)wS(So.default.join(s,i));for(let i of A5)wS(So.default.join(e.layout.installDir,i));return Wu.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var WS,kT=l(()=>{"use strict";WS={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var ES,TT=l(()=>{"use strict";ES="unknown_identity"});var LS=l(()=>{"use strict";kT();TT()});var P5,RS,CT=l(()=>{"use strict";LS();P5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RS=e=>e.type!=="system.error"||!P5(e.payload)?!1:e.payload.errorCode===ES});var kS=l(()=>{"use strict";vT();RT();CT()});var Eu=l(()=>{"use strict";Q();ze();kS();bS()});var Ao,Lu,Ru=l(()=>{"use strict";Eu();Ao=(e=20)=>ho(e),Lu=Pu});var ku,bo,Tu,Cu=l(()=>{"use strict";Eu();ku=Jr,bo=(e=20)=>Vr(e),Tu=e=>Kr(e)});var xu,TS=l(()=>{"use strict";Eu();xu=()=>vu()});var xT=l(()=>{"use strict";Fh();ky();eS();PS();Ru();Cu();TS()});var IT={};ht(IT,{buildAgentWitchAutomationStatusFromWakeServer:()=>Mi,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>ku,buildAgentWitchWakeHealthResponse:()=>di,buildAgentWitchWakeIdentityResponse:()=>ui,buildAgentWitchWatchdogStatus:()=>Lu,installHarnessFromWakeServer:()=>vi,readAgentWitchSelfUpdateLogEntries:()=>bo,readAgentWitchWatchdogLogEntries:()=>Ao,restartAgentWitchFromWakeServer:()=>Gi,reviveAgentWitchWebSocketFromWakeServer:()=>Bi,runAgentWitchSelfUpdateFromWakeServer:()=>Tu,runAgentWitchUninstallLocalFromWakeServer:()=>xu,runAutomationFromWakeServer:()=>Ni,syncAutomationsFromWakeServer:()=>Oi,wakeAgentWitchLaunchAgents:()=>zi});var OT=l(()=>{"use strict";xT()});var NT,MT,CS,xS,jT=l(()=>{"use strict";NT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),MT=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?NT(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?NT(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},CS=e=>{let t=e.watchdogLogs.map(MT).join(""),r=e.updateLogs.map(MT).join("");return`<!doctype html>
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
</html>`},xS=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var DT,HT,FT=l(()=>{"use strict";DT=m(require("node:net")),HT=()=>new Promise((e,t)=>{let r=DT.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var $T,_5,IS,UT=l(()=>{"use strict";$T=m(require("node:net"));FT();ci();li();Pe();_5=e=>new Promise(t=>{let r=$T.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),IS=async()=>{let e=E(),t=it();if(await _5(t))return ML(t),t;let r=await HT();return Wd(e,r),r}});var w5,OS,zT=l(()=>{"use strict";w5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),OS=e=>({force:w5(e)&&e.force===!0})});var Vi=l(()=>{"use strict";_i();jT();UT();zT();bf();td();zn()});var NS,j,MS,jS,qi,BT=l(()=>{"use strict";NS=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},MS=e=>{e.writeHead(403),e.end()},jS=e=>e.url?.split("?")[0]??"/",qi=(e,t,r=20,n=200)=>{let o=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(o.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,n):r}});var ct=l(()=>{"use strict";BT()});var v5,GT,VT=l(()=>{"use strict";eS();ct();v5=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},GT=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,Mi(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await v5(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let n=Oi(t);return j(e.response,n.ok?200:400,n,e.cors.headers),!0}let r=await Ni(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var W5,KT,qT,JT,DS,YT,HS=l(()=>{"use strict";W5=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],KT=e=>/embed|minilm|^bge-/i.test(e),qT=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),JT=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),DS=e=>e.filter(t=>t.trim().length>0&&!KT(t)),YT=(e,t)=>{let r=e.filter(o=>o.trim().length>0&&!KT(o)),n=t?.trim()??"";if(n.length>0){let o=r.find(s=>qT(s,n));if(o!==void 0)return o}for(let o of W5){let s=r.find(i=>qT(i,o));if(s!==void 0)return s}return r[0]??null}});var FS,QT,eC,Iu,tC,XT,ZT,E5,L5,R5,k5,T5,C5,dt,Ki=l(()=>{"use strict";FS=require("node:child_process"),QT=m(require("node:fs")),eC=m(require("node:os")),Iu=m(require("node:path"));ze();st();HS();tC=3e3,XT=["claude-cli","codex","cursor","antigravity"],ZT={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},E5=(e,t)=>new Promise(r=>{let n=(0,FS.spawn)(e,[...t],{stdio:"ignore"}),o=setTimeout(()=>{n.kill("SIGTERM"),r(!1)},tC);n.on("error",()=>{clearTimeout(o),r(!1)}),n.on("close",s=>{clearTimeout(o),r(s===0)})}),L5=()=>{let e=eC.default.homedir();return["ollama",Iu.default.join(e,".local","bin","ollama"),Iu.default.join(e,".agent-witch","ollama","ollama"),Iu.default.join(e,".local-agent-witch","ollama","ollama")]},R5=e=>new Promise(t=>{let r=(0,FS.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),n=[],o=setTimeout(()=>{r.kill("SIGTERM"),t(null)},tC);r.stdout.on("data",s=>{n.push(s)}),r.on("error",()=>{clearTimeout(o),t(null)}),r.on("close",s=>{if(clearTimeout(o),s!==0){t(null);return}t(JT(Buffer.concat(n).toString("utf8")))})}),k5=async()=>{for(let e of L5()){if(e!=="ollama"&&!QT.default.existsSync(e))continue;let t=await R5(e);if(t!==null)return t}return[]},T5=e=>{let t=e.installedWriterIds.map(s=>ZT[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,n=se(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${ZT[e.writerAgent]} is not installed.`:"",o=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[n,r,o].filter(s=>s.length>0).join(" ")},C5=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:Jn},dt=async e=>{let t=XT.map(i=>{let a=ud(i,e.commands);return E5(a.command,a.args)}),[r,...n]=await Promise.all([k5(),...t]),o=XT.flatMap((i,a)=>n[a]===!0?[i]:[]),s=YT(r,C5());return{ollamaModels:r,estimateModel:s,installedWriterIds:o,capabilityNote:T5({writerAgent:e.writerAgent??"",installedWriterIds:o,estimateModel:s})}}});var x5,I5,$S,rC=l(()=>{"use strict";x5="http://127.0.0.1:11434",I5=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},$S=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||x5;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return n.ok?I5(await n.json()):null}catch{return null}}});var US=l(()=>{"use strict";st();Ki();rC();HS()});var O5,nC,oC=l(()=>{"use strict";US();O5={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},nC=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:O5[t]})),ollamaModels:DS(e.ollamaModels)})});var N5,sC,iC=l(()=>{"use strict";US();ct();oC();N5=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},sC=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await dt({commands:ie({})});return j(e.response,200,{ok:!0,...nC({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await N5(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",n=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",o=await $S({model:r,prompt:n});return o===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:o},e.cors.headers),!0)}return!1}});var M5,aC,lC=l(()=>{"use strict";ky();ct();M5=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},aC=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await M5(e);if(t===null)return!0;let r=vi(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var cC=l(()=>{"use strict";lt()});var zS,dC=l(()=>{"use strict";cC();wi();zS=e=>{if(!Bt(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:$e({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var uC,BS,GS=l(()=>{"use strict";ae();lt();wi();uC=e=>{if(!Bt(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},BS=async e=>{let t=uC(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Ar("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let n=H();if(n===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let o=Y({wsUrl:n.wsUrl,pairingToken:n.pairingToken});return o===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:($e({projectFolderPath:r}),await Ti(o,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var pC=l(()=>{"use strict";dC();GS()});var mC,gC=l(()=>{"use strict";pC();GS();ct();mC=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=zS(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await BS(t),n=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,n,r,e.cors.headers),!0}return!1}});var fC,hC=l(()=>{"use strict";Vi();Cu();Ru();fC=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Ao(50),r=bo(50);return e.response.writeHead(200,xS()),e.response.end(CS({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var yC,SC=l(()=>{"use strict";Fh();ct();yC=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,di(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,ui(),e.cors.headers),!0):!1});var AC,bC=l(()=>{"use strict";TS();ct();AC=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await xu();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var PC,_C=l(()=>{"use strict";PS();ct();PC=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Bi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Gi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await zi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var wC,vC=l(()=>{"use strict";Vi();Cu();ct();wC=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=ku();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=qi(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:bo(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=OS(t),n=await Tu({force:r});return j(e.response,n.ok?200:503,n,e.cors.headers),!0}return!1}});var WC,EC=l(()=>{"use strict";Ru();ct();WC=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Lu();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=qi(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:Ao(t)},e.cors.headers),!0}return!1}});var LC,RC=l(()=>{"use strict";VT();iC();lC();gC();hC();SC();bC();_C();vC();EC();LC=[yC,fC,WC,PC,wC,AC,aC,mC,GT,sC]});var kC,TC=l(()=>{"use strict";RC();kC=async e=>{for(let t of LC)if(await t(e))return!0;return!1}});var j5,CC,xC=l(()=>{"use strict";_i();ct();TC();j5=(e,t,r,n)=>({request:e,response:t,wakePort:r,cors:n,pathname:jS(e),readJsonBody:()=>NS(e)}),CC=async(e,t,r)=>{let n=e.headers.origin,o=tu(n);try{if(n!==void 0&&n.length>0&&!o.allowed){MS(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=j5(e,t,r,o);if(await kC(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}}});var IC,un,Ou,Nu=l(()=>{"use strict";IC=m(require("node:http"));Vi();xC();un=async()=>{let e=await IS(),t=IC.default.createServer((r,n)=>{CC(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Ou=un});var OC={};ht(OC,{runAgentWitchBridgeCli:()=>D5});var D5,NC=l(()=>{"use strict";Q();Nu();D5=async()=>{He("agent-witch-bridge");let e=await un(),t=jt(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var MC=l(()=>{"use strict";Ft()});var Po,VS,jC=l(()=>{"use strict";Po=(e,t,r)=>e===1?t:r,VS=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${Po(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Po(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${Po(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Po(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Po(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${Po(p,"year","years")} ago`}});var pn,qS,H5,F5,KS,br,Ji,JS,DC=l(()=>{"use strict";pn=m(require("node:fs")),qS=m(require("node:path")),H5="local-ws-traffic.ndjson",F5=500,KS=e=>qS.default.join(e.logsDir,H5),br=(e,t)=>{let r=KS(e);pn.default.mkdirSync(qS.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});pn.default.appendFileSync(r,`${n}
`,"utf8")},Ji=(e,t=F5)=>{let r=KS(e);if(!pn.default.existsSync(r))return[];let o=pn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},JS=e=>{let t=KS(e);pn.default.existsSync(t)&&pn.default.writeFileSync(t,"","utf8")}});var $5,HC,FC,$C=l(()=>{"use strict";LS();$5=new Set(Object.values(WS)),HC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),FC=e=>{if(!HC(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!$5.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!HC(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var UC,zC=l(()=>{"use strict";UC=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var U5,z5,B5,Yi,BC=l(()=>{"use strict";zC();U5=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,z5=e=>U5.test(e),B5=e=>UC(e),Yi=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>Yi(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&z5(n)){r[n]=B5(o);continue}r[n]=Yi(o)}return r}});var vt,YS,G5,V5,q5,XS,GC,VC,qC,K5,Mu,mn,ju,ZS,KC=l(()=>{"use strict";vt=m(require("node:fs")),YS=m(require("node:path"));$C();BC();G5="local-ws-trace.ndjson",V5=1e4,q5=1440*60*1e3,XS=e=>YS.default.join(e.logsDir,G5),GC=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},VC=e=>{if(!vt.default.existsSync(e))return;let t=vt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-q5,o=t.filter(s=>{let i=GC(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-V5);vt.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},qC=(e,t)=>{let r=XS(e);vt.default.mkdirSync(YS.default.dirname(r),{recursive:!0}),vt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),VC(r)},K5=e=>e.parsed===null?{_empty:!0}:Yi(e.parsed),Mu=(e,t,r)=>{let n=FC(r);qC(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:K5(n)})},mn=(e,t)=>{qC(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Yi({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},ju=(e,t=80)=>{let r=XS(e);if(VC(r),!vt.default.existsSync(r))return[];let n=vt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let i=GC(s);i!==null&&o.push(i)}return o.reverse()},ZS=e=>{let t=XS(e);vt.default.existsSync(t)&&vt.default.writeFileSync(t,"","utf8")}});var Pr,JC,J5,QS,Du,YC=l(()=>{"use strict";Pr=m(require("node:fs")),JC=m(require("node:path")),J5=256e3,QS=e=>{Pr.default.mkdirSync(JC.default.dirname(e),{recursive:!0}),Pr.default.writeFileSync(e,"","utf8")},Du=(e,t=J5)=>{if(!Pr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Pr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=Pr.default.openSync(e,"r");try{Pr.default.readSync(a,i,0,s,o)}finally{Pr.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var Xi=l(()=>{"use strict";DC();KC();YC()});var eA,tA,XC=l(()=>{"use strict";eA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tA=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",n=e.exists&&e.content.length>0?`<pre class="error-log-view">${eA(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${eA(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${eA(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${n}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var ZC=l(()=>{"use strict";XC()});var rA,nA=l(()=>{"use strict";rA=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var oA=l(()=>{"use strict";ji()});var sA,iA,QC=l(()=>{"use strict";oA();sA=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e);return Number.isNaN(n)?!0:r-n>t},iA=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var ex=l(()=>{"use strict";nA();QC()});var tx,Zi,aA,Qi=l(()=>{"use strict";nA();tx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zi=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=tx(e),r=tx(rA(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},aA=`(function () {
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
})();`});var gn,Y5,lA,rx=l(()=>{"use strict";gn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y5=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},lA=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${gn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?gn(r.direction):gn(r.kind),i=`trace-body-${n}`,a=gn(Y5(r.body));return`<tr>
        <td title="${gn(r.at)}">${gn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${gn(r.command)}</code></td>
        <td>${o}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var ox,nx,cA,sx=l(()=>{"use strict";ox=m(require("node:path"));z();Ft();nx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cA=e=>{let t=te(e.installDir),n=`AW_HOME="$HOME/${ox.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${nx(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${nx(n)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var ix=l(()=>{"use strict";Qi();rx();sx();Qi()});var X5,Vt,ea=l(()=>{"use strict";X5=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Vt=X5});var ax,lx,cx,dx,ux,px,mx,_o=l(()=>{"use strict";ax="projects",lx="knowledge",cx="chunks.ndjson",dx="lessons.ndjson",ux="error-chunks.ndjson",px="usage-stats.json",mx="knowledge-location.json"});var Hu,Z5,Fu,dA=l(()=>{"use strict";Hu=m(require("node:path"));_o();Z5=(e,t)=>{let r=t.trim(),n=Hu.default.join(e.installDir,ax,r,lx);return{projectId:r,knowledgeDirPath:n,ragChunksFilePath:Hu.default.join(n,cx),memoryRunsFilePath:Hu.default.join(n,dx)}},Fu=Z5});var uA,Q5,gx,fx=l(()=>{"use strict";uA=m(require("node:fs"));_o();en();Q5=e=>{let t=Ge(e.projectFolderPath),r=`${t.metaDirPath}/${mx}`,n={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};uA.default.mkdirSync(t.metaDirPath,{recursive:!0}),uA.default.writeFileSync(r,`${JSON.stringify(n,null,2)}
`)},gx=Q5});var wo,yx,hx,eV,Sx,Ax=l(()=>{"use strict";wo=m(require("node:fs")),yx=m(require("node:path"));$r();en();dA();fx();hx=(e,t)=>{wo.default.existsSync(e)&&(wo.default.existsSync(t)&&wo.default.statSync(t).size>0||(wo.default.mkdirSync(yx.default.dirname(t),{recursive:!0}),wo.default.copyFileSync(e,t)))},eV=e=>{let t=Ge(e.projectFolderPath),r=Fu(e.layout,e.projectId),n=`${t.memoryDirPath}/${$n}`;hx(t.ragChunksFilePath,r.ragChunksFilePath),hx(n,r.memoryRunsFilePath),gx({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},Sx=eV});var pA,tV,bx,Px=l(()=>{"use strict";pA=m(require("node:fs"));en();tV=e=>{let t=Ge(e);if(!pA.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(pA.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let n=r;return{projectId:typeof n.projectId=="string"&&n.projectId.trim().length>0?n.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},bx=tV});var _x,rV,vo,$u=l(()=>{"use strict";_x=m(require("node:path"));$r();en();Ax();Px();dA();rV=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=bx(t),n=e.projectId?.trim()||r.projectId?.trim()||"";if(n.length>0){Sx({layout:e.layout,projectFolderPath:t,projectId:n});let s=Fu(e.layout,n);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:n}}let o=Ge(t);return{ragChunksFilePath:o.ragChunksFilePath,memoryRunsFilePath:_x.default.join(o.memoryDirPath,$n),projectId:null}},vo=rV});var Uu,oV,zu,mA=l(()=>{"use strict";Uu=m(require("node:fs"));_o();oV=(e,t=500)=>{if(!Uu.default.existsSync(e))return;let r=Uu.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let n=r.slice(r.length-t);Uu.default.writeFileSync(e,`${n.join(`
`)}
`)},zu=oV});var Bu,sV,fn,gA=l(()=>{"use strict";Bu=m(require("node:path"));_o();$u();sV=e=>{let t=vo(e);if(t===null)return null;let r=Bu.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Bu.default.join(r,px),errorChunksFilePath:Bu.default.join(r,ux)}},fn=sV});var vx,ta,Wx,wx,fA,Ex,lV,hA,Lx,yA,SA,AA,bA=l(()=>{"use strict";vx=require("node:crypto"),ta=m(require("node:fs")),Wx=m(require("node:path"));ea();_o();gA();wx=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),fA=e=>{if(!ta.default.existsSync(e))return wx();try{let t=JSON.parse(ta.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return wx()},Ex=(e,t)=>{ta.default.mkdirSync(Wx.default.dirname(e),{recursive:!0}),ta.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},lV=e=>{let t=Vt(e).trim(),n=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,vx.createHash)("sha256").update(n).digest("hex").slice(0,16)},hA=e=>{let t=fn(e);return t===null?null:fA(t.usageStatsFilePath)},Lx=e=>{if(e.chunkIds.length===0)return;let t=fn(e);if(t===null)return;let r=fA(t.usageStatsFilePath),n={...r.chunkRetrievalCounts};for(let o of e.chunkIds)n[o]=(n[o]??0)+1;Ex(t.usageStatsFilePath,{...r,chunkRetrievalCounts:n})},yA=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=fn(e);if(r===null)return null;let n=lV(t),o=fA(r.usageStatsFilePath),s=o.errorOccurrences[n],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return Ex(r.usageStatsFilePath,{...o,errorOccurrences:{...o.errorOccurrences,[n]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),n},SA=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,AA=e=>{if(e===null)return[];let t=[];for(let[r,n]of Object.entries(e.chunkRetrievalCounts))n<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:n,chunkId:r,message:`Knowledge chunk "${r}" was injected ${n} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,n]of Object.entries(e.errorOccurrences))n.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:n.count,errorFingerprint:r,message:`Error "${n.preview}" occurred ${n.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:n.count,errorFingerprint:r,message:`Same error (${n.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,n)=>r.priority-n.priority||n.hitCount-r.hitCount)}});var ra,Rx,cV,dV,kx,uV,PA,na,Wo,_A,Eo,wA,vA=l(()=>{"use strict";ra=m(require("node:fs")),Rx=m(require("node:path"));ea();$u();mA();bA();cV="http://127.0.0.1:11434",dV="nomic-embed-text",kx=(e,t,r)=>vo({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,uV=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},PA=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},na=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||cV,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||dV;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},Wo=(e,t,r)=>{let n=kx(e,t,r);if(n===null||!ra.default.existsSync(n))return[];let o=ra.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},_A=async e=>{let t=Vt(e.text),r=PA(t);if(r.length===0)return 0;let n=kx(e.layout,e.projectFolderPath,e.projectId);if(n===null)return 0;ra.default.mkdirSync(Rx.default.dirname(n),{recursive:!0});let o=0;for(let s of r){let i=await na(s);if(i===null)continue;let a={id:`${Date.now()}-${o}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};ra.default.appendFileSync(n,`${JSON.stringify(a)}
`,"utf8"),o+=1}return zu(n),o},Eo=async e=>{let t=await na(e.query);if(t===null)return[];let r=e.minScore??0,s=Wo(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:uV(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return Lx({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},wA=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var oa,Tx,pV,mV,WA,EA,LA,Cx=l(()=>{"use strict";oa=m(require("node:fs")),Tx=m(require("node:path"));ea();gA();mA();vA();pV=e=>{if(!oa.default.existsSync(e))return[];let t=oa.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let n of t)try{r.push(JSON.parse(n))}catch{}return r},mV=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},WA=async e=>{let t=fn(e);if(t===null)return 0;let r=Vt(e.text),n=PA(r,600);if(n.length===0)return 0;let o=t.errorChunksFilePath;oa.default.mkdirSync(Tx.default.dirname(o),{recursive:!0});let s=0;for(let i of n.slice(0,3)){let a=await na(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};oa.default.appendFileSync(o,`${JSON.stringify(c)}
`,"utf8"),s+=1}return zu(o,200),s},EA=async e=>{let t=fn(e);if(t===null)return[];let r=await na(e.query);if(r===null)return[];let n=e.minScore??.3;return pV(t.errorChunksFilePath).map(s=>({chunk:s,score:mV(r,s.embedding)})).filter(s=>s.score>=n).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},LA=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var RA=l(()=>{"use strict";vA();bA();Cx()});var kA,xx=l(()=>{"use strict";kA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var Ix=l(()=>{"use strict";xx()});var ue,TA,CA=l(()=>{"use strict";Ix();ue=kA,TA=`
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
.sdlc-tip:focus-visible .sdlc-tip-panel {
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
`.trim()});var gV,fV,xA,Ox,IA,Nx=l(()=>{"use strict";CA();Qi();gV=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,fV=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],xA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ox=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${gV}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,IA=e=>{let t=fV.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=xA(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"",o=xA(e.installBundleVersionLabel?.trim()??"unknown"),s=Ox("brand brand-in-sidebar",o),i=Ox("brand brand-in-header",o);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${xA(e.title)} \xB7 Agent Witch Local</title>
  <style>${TA}</style>
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
  <script>${aA}</script>
</body>
</html>`}});var Gu,sa,Vu=l(()=>{"use strict";Gu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sa=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Gu(e.syncMessage)}</p>`:"",n=Gu(e.manageHref),o=Gu(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Gu(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${n}" target="_blank" rel="noopener noreferrer">${o} \u2197</a></p>
    </div>`}});var OA,NA,MA,Mx=l(()=>{"use strict";OA=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,NA=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,MA=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var jx=l(()=>{"use strict";Nx();Vu();Mx()});var Lo,jA,Dx=l(()=>{"use strict";Qi();Lo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jA=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Lo(e.wakeError)}</div>`:"",a=Zi(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Lo(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Lo(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Lo(n)}</p>
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
        <p class="home-card-meta">${Lo(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Lo(o)}</p>
      </a>
    </div>`}});var Hx=l(()=>{"use strict";Dx()});var M,qu=l(()=>{"use strict";M=e=>e==="passed"||e==="stopped"||e==="failed"});var Fx,DA,hn,HA,Ku=l(()=>{"use strict";Fx="Stopped at the round limit. The best prompt is kept.",DA="Stopped because the score stopped rising. The best prompt is kept.",hn="Finished. The best prompt is the result.",HA="Wizard ended. Progress from finished steps is kept."});var ia,FA=l(()=>{"use strict";ia=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],n=e.instructions?.trim()??"",o=n.length===0?[]:["","Instructions:",n];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...o,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",n.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var hV,yV,aa,$x,Ju=l(()=>{"use strict";hV=/\n+|;\s+/,yV=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,aa=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let n=r.split(hV).map(o=>o.replace(/^[-*]\s*/,"").trim()).filter(o=>o.length>0).reduce((o,s)=>{if(t.length+o.length>=12)return o;let i=s.toLowerCase();return[...t,...o].some(c=>c.toLowerCase()===i)?o:[...o,yV(s)]},[]);return[...t,...n]},[]),$x=e=>{let t=aa(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var he,la=l(()=>{"use strict";he=e=>{let t=e.flatMap(o=>o.score===null?[]:[{roundNumber:o.roundNumber,promptText:o.promptText,score:o.score,reasons:o.reasons}]),[r,...n]=t;return r===void 0?null:n.reduce((o,s)=>s.score>o.score||s.score===o.score&&s.roundNumber>o.roundNumber?s:o,r)}});var ca,$A=l(()=>{"use strict";Ju();la();ca=e=>{let t=[...e.priorRounds,e.current],r=he(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},n=[...t].filter(o=>o.score<r.score).sort((o,s)=>s.roundNumber-o.roundNumber).map(o=>o.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:$x(n)}}});var UA,SV,AV,Ux,zx=l(()=>{"use strict";UA={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},SV=e=>{try{let t=JSON.parse(e.fragment);return{...UA,objects:[...e.objects,t]}}catch{return{...UA,objects:e.objects}}},AV=(e,t)=>{if(e.inString){let n=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:n}:t==="\\"?{...e,escaped:!0,fragment:n}:t==='"'?{...e,inString:!1,fragment:n}:{...e,fragment:n}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:SV(r)},Ux=e=>[...e].reduce(AV,UA).objects});var bV,zA,PV,Bx,BA=l(()=>{"use strict";zx();bV=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},zA=e=>{let t=Ux(e).filter(bV),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},PV=(e,t)=>({...e,passed:e.score>=t}),Bx=(e,t)=>{let r=zA(e);return r===null?null:PV(r,t)}});var GA,VA,Yu=l(()=>{"use strict";GA="The judge reply needs a score and a reason.",VA="The improver reply was empty."});var Gx,Vx=l(()=>{"use strict";Gx=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((n,o)=>o>n.best?{best:o,stall:0}:{best:n.best,stall:n.stall+1},{best:t,stall:0}).stall}});var qx,Kx=l(()=>{"use strict";qx=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((n,o)=>o.score>n.best?{best:o.score,reasons:[]}:{best:n.best,reasons:[...n.reasons,o.reasons]},{best:t.score,reasons:[]}).reasons}});var wV,Jx,Yx=l(()=>{"use strict";Vx();Kx();Ku();Ju();wV=e=>{let t=aa(e);return t.length===0?DA:`${DA} Avoid: ${t.join("; ")}.`},Jx=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:Fx};if(Gx(e.scores)>=3){let t=e.scores.map((r,n)=>({score:r,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:wV(qx(t))}}return null}});var _r,vV,qA,Xx,Xu=l(()=>{"use strict";_r=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},vV=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,qA=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",vV(e.tokens),`Delay: ${_r(e.delayMs)}`,"",n,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},Xx=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var WV,Zx,Qx=l(()=>{"use strict";BA();WV=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,Zx=e=>{let r=(WV.exec(e)?.[1]??e).trim();return r.length===0||zA(r)!==null?null:r}});var eI,Zu,tI=l(()=>{"use strict";Xu();Qx();Yu();eI=e=>({type:"call",role:"judge",choice:e.choice,prompt:Xx({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),Zu=e=>{let t=Zx(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:VA}}:{nextPrompt:t,continuation:eI({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var KA,rI=l(()=>{"use strict";FA();$A();BA();Yu();Ku();Yx();Yu();tI();KA=e=>{let t=Bx(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:GA}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],n=e.round??r.length,o=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=Jx({scores:o.map(a=>a.score),reasons:o.map(a=>a.reasons),round:n,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=ca({current:{roundNumber:n,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:ia({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var da,JA=l(()=>{"use strict";da=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var YA,nI=l(()=>{"use strict";YA=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",n,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var EV,XA,oI=l(()=>{"use strict";Xu();EV=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,XA=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",EV(e.tokens),`Delay: ${_r(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var LV,RV,kV,ZA,sI=l(()=>{"use strict";LV=/[A-Za-z0-9_./~-]{3,180}/g,RV=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,kV=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||RV.test(t)},ZA=(e,t=12)=>{let r=[];for(let n of e.matchAll(LV)){let o=n[0].replace(/\.+$/,"");if(!(!kV(o)||r.includes(o))&&(r.push(o),r.length>=t))break}return r}});var ua,iI=l(()=>{"use strict";ua=(e,t)=>e.flatMap(r=>{let n=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||n.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:n}]}).sort((r,n)=>r.roundNumber-n.roundNumber)});var Qu,QA,aI,pa,eb=l(()=>{"use strict";Qu=e=>Math.floor(e/2),QA=e=>Math.max(Qu(e)+1,e-20),aI=(e,t)=>e>=t?"passes":e>=QA(t)?"close":e>=Qu(t)?"weak":"bad",pa=e=>[{band:"bad",label:`0\u2013${Qu(e)-1} bad`},{band:"weak",label:`${Qu(e)}\u2013${QA(e)-1} weak`},{band:"close",label:`${QA(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var ep,tb=l(()=>{"use strict";eb();ep=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",n=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${aI(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),o=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...n,...o]}});var lI,cI=l(()=>{"use strict";lI=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var dI,uI=l(()=>{"use strict";dI=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var TV,CV,pI,mI=l(()=>{"use strict";qu();tb();cI();uI();TV=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],CV=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",pI=e=>{let t=e.wizard;if(t===void 0)return[];let r=lI(t),n=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),o=e.status==="wizard_paused",s=t.phase==="complete",i=TV.map((p,f)=>{let b=!s&&!o&&f===r?"active":"done";return{id:`wizard-${f+1}`,label:p,state:b,detail:null}}).filter((p,f)=>s?!0:f<=n),a=o&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=dI(t)&&(!o||a)?ep(e):[],d=M(e.status)?[{id:"end",label:CV(e),state:"done",detail:e.errorMessage}]:[];return[...i,...c,...d]}});var xV,rb,gI=l(()=>{"use strict";qu();tb();mI();xV=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",rb=e=>{if(e.wizard!==void 0)return pI(e);let t=ep(e),r=M(e.status)?[{id:"end",label:xV(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var fI=l(()=>{"use strict";Ft()});var hI,ma,ga,Ro,tp,nb,yI=l(()=>{"use strict";fI();hI="/prompt-optimizer/agent",ma=`${Ht}${hI}`,ga=`${Ht}/prompt-optimizer`,Ro="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",tp=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Ro}`,nb="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var ko=l(()=>{"use strict"});var SI,AI=l(()=>{"use strict";SI=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var ob,PI=l(()=>{"use strict";AI();ko();ob=e=>({schemaVersion:3,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:SI(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{}})});var sb,_I=l(()=>{"use strict";sb=e=>({...e,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null}))})});var ib,wI=l(()=>{"use strict";ko();ib=(e,t,r)=>{let n=r.trim();if(n.length===0)return e;let o=e.avoidByStep[t]??[],s=[n,...o].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var vI,ab,WI=l(()=>{"use strict";vI=["generalize","evaluate","separate","optimize_modules"],ab=(e,t)=>{let r=vI.indexOf(t);if(r===-1)return e;let n=vI.slice(r+1);return n.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:n.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:n.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:n.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:n.includes("separate")?null:e.selectedSplitTopology,modules:n.includes("optimize_modules")?[]:e.modules,currentModuleIndex:n.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:n.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var rp,lb=l(()=>{"use strict";Ju();rp=e=>{let t=aa(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var cb,EI=l(()=>{"use strict";lb();cb=e=>{let t=rp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,n,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(o=>o.length>0).join(`
`)}});var OV,NV,MV,LI,RI=l(()=>{"use strict";OV=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),NV=/^\{\{[a-zA-Z0-9_-]+\}\}$/,MV=(e,t)=>{let{masked:r,tokens:n}=t.reduce((o,s)=>{let i=s.sampleValue.trim();if(i.length===0)return o;let a=new RegExp(OV(i),"g"),c=[...o.tokens];return{masked:o.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return n.reduce((o,s,i)=>o.replace(`\0PO${i}\0`,s),r)},LI=(e,t)=>{let r=[...t].sort((o,s)=>s.sampleValue.length-o.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(o=>NV.test(o)?o:MV(o,r)).join("")}});var db,kI=l(()=>{"use strict";RI();db=(e,t)=>e.map(r=>({...r,modules:r.modules.map(n=>({...n,prompt:LI(n.prompt,t)}))}))});var jV,pb,TI=l(()=>{"use strict";ko();lb();jV=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),pb=e=>{let t=rp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,o=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=jV(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",o,r,n,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var mb,CI=l(()=>{"use strict";JA();mb=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",n=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),o=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...n,s].filter(a=>a.length>0).join(`
`);return da({promptText:e.promptText,instructions:`${i}${o.join(`
`)}`})}});var fa,gb=l(()=>{"use strict";la();fa=e=>{let t=e.revisions.map(o=>({roundNumber:o.roundNumber,score:o.judgement?.score??null,passed:o.judgement?.passed??null,runOutput:o.run?.output??null,tokens:o.run?.tokens??null})),r=he(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null}))),n=r===null?null:e.revisions.find(o=>o.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:n?.run?.output??null,rounds:t}}});var fb,xI=l(()=>{"use strict";gb();fb=e=>{let t=fa({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((n,o)=>o===e.moduleIndex?{...n,status:r,selectedRevisionRound:t.bestRound,statistics:t}:n)}}});var hb,II=l(()=>{"use strict";hb=(e,t)=>{if(e.selectedSplitTopology!=="chain"||t<=0)return null;let r=e.modules[t-1];if(r===void 0)return null;let n=r.statistics?.bestRunOutput?.trim()??"";return n.length>0?n:null}});var np,yb=l(()=>{"use strict";np=e=>{let t=e.trim(),n=t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t,o=n.indexOf("{"),s=n.lastIndexOf("}");if(o===-1||s<=o)throw new Error("No JSON object in reply.");return JSON.parse(n.slice(o,s+1))}});var ut,DV,Sb,OI=l(()=>{"use strict";ut=m(Ss());yb();DV=(0,ut.isType)({name:ut.isNonEmptyString,description:ut.isString,sampleValue:ut.isString}),Sb=e=>{let t=np(e);if(!(0,ut.isType)({templatedPrompt:ut.isNonEmptyString,variables:(0,ut.isArrayWithEachItem)(DV)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var re,HV,FV,Ab,NI=l(()=>{"use strict";re=m(Ss());ko();yb();HV=(0,re.isType)({id:re.isNonEmptyString,title:re.isNonEmptyString,prompt:re.isNonEmptyString,order:re.isNumber}),FV=(0,re.isType)({id:re.isNonEmptyString,title:re.isNonEmptyString,summary:re.isString,topology:(0,re.isOneOf)("chain","parallel"),modules:(0,re.isArrayWithEachItem)(HV),recommended:re.isBoolean}),Ab=e=>{let t=np(e);if(!(0,re.isType)({options:(0,re.isArrayWithEachItem)(FV)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),n=r.filter(o=>o.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return n!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var To,MI=l(()=>{"use strict";To=e=>{let t=e.wizard.attempts.filter(n=>n.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var $V,ha,bb=l(()=>{"use strict";$V=/\{\{([a-zA-Z0-9_-]+)\}\}/g,ha=(e,t)=>{let r=new Map(t.map(n=>[n.name,n.sampleValue]));return e.replace($V,(n,o)=>{let s=r.get(o);return s===void 0?n:s})}});var ya,Sa,jI=l(()=>{"use strict";la();bb();ya=e=>ha(e.templatedPrompt,e.variables),Sa=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(n=>n.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return he(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??ya(e.wizard)}});var UV,Aa,DI=l(()=>{"use strict";UV=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Aa=(e,t)=>e.replace(UV,(r,n)=>{let o=t[n];return o===void 0||o.trim()===""?r:o})});var zV,ba,Pb=l(()=>{"use strict";zV=/\{\{([a-zA-Z0-9_-]+)\}\}/g,ba=e=>{let t=new Set,r=[];for(let n of e.matchAll(zV)){let o=n[1];t.has(o)||(t.add(o),r.push(o))}return r}});var Pa,yn,HI=l(()=>{"use strict";Pa=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),yn=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var BV,op,_b,FI=l(()=>{"use strict";Pb();BV="wizardParam_",op=e=>`${BV}${e}`,_b=e=>{let t=ba(e.modulePrompt),r={...e.wizard.parameterValues},n=new Set(e.wizard.variables.map(o=>o.name));for(let o of t){let s=op(o),i=e.posted.get(s),a=i!==null?i.trim():r[o]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:n.has(o)?`Fill in {{${o}}} before running this module.`:`Fill in {{${o}}} (not listed in Step 1) before running this module.`};r[o]=a}return{ok:!0,parameterValues:r}}});var Sn,$I=l(()=>{"use strict";Sn=["generalize","evaluate","separate","optimize_modules"]});var x=l(()=>{"use strict";qu();Ku();rI();FA();Xu();JA();nI();oI();sI();$A();iI();la();gI();eb();yI();ko();PI();_I();wI();WI();EI();kI();TI();CI();gb();xI();II();OI();NI();MI();jI();bb();DI();Pb();HI();FI();$I()});var va=l(()=>{"use strict";st();Ki();pd()});var GV,GI,VI=l(()=>{"use strict";va();GV=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,GI=e=>{let t=eo(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(GV)],n=r[r.length-1];if(n===void 0)return null;let o=Number(n[1])+Number(n[2]);return Number.isFinite(o)&&o>=1?o:null}});var VV,qV,qI,wb,KV,JV,pt,KI,JI,An=l(()=>{"use strict";va();VI();VV="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",qV="The writer waited on terminal input and did not return a prompt.",qI=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,wb=e=>{let t=e.trim();if(t.length===0||t.length>=500||!qI.test(t))return null;let r=t.split(`
`).map(n=>n.trim()).find(n=>qI.test(n))??t;return r.length>280?`${r.slice(0,277)}...`:r},KV=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},JV=e=>wb(e.stdout)??wb(e.stderr)??(KV(e.replyFile)?wb(e.replyFile):null),pt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return VV;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?qV:null},KI=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],JI=e=>{let t=e.replyFileText?.trim()??"",r=pt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let n=JV({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(n!==null)return{ok:!1,errorMessage:n};let o=GI([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:o};if(e.writerAgent==="claude-cli"){let i=eo(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:o}:{ok:!1,errorMessage:"The writer did not reply."}}});var Wa,vb=l(()=>{"use strict";Wa=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var ip,Co,Wb=l(()=>{"use strict";vb();ip=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Co=e=>{let t=Wa(e.cycle);if(t.length===0&&e.cycle.revisions.length===0)return"";let r=t.length===0?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",n=e.caption===void 0?"":`<p class="muted">${ip(e.caption)}</p>`,o=e.cycle.revisions.map(s=>{let i=s.judgement?.score,a=i==null?`Round ${s.roundNumber} \u2014 not scored`:`Round ${s.roundNumber} \u2014 ${i}`,c=s.judgement?.reasons?.trim()??"",d=c.length===0?"":`<br><span class="muted">${ip(c)}</span>`;if(e.interactive){let p=e.selectedRound===s.roundNumber?" checked":"";return`<li><label><input type="radio" name="wizardRevisionRound" value="${s.roundNumber}"${p}> ${ip(a)}</label>${d}</li>`}return`<li>${ip(a)}${d}</li>`}).join("");return`${r}${n}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${o}</ul>`}});var Eb,YI,ap,XI,lp=l(()=>{"use strict";Eb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YI=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Eb(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Eb(t.prompt)}</pre></li>`).join("")}</ol>`,ap=e=>YI([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),XI=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(o=>o.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Eb(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${YI(t.modules.map(o=>({title:o.title,prompt:o.prompt})))}
  </section>`}});var We,YV,XV,ZV,QV,eq,tq,xo,cp=l(()=>{"use strict";x();Wb();lp();We=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YV=e=>{let t=e.wizard;if(t===void 0)return null;let n=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(n===void 0||typeof n.output!="object"||n.output===null)return null;let o=n.output.revisions;if(!Array.isArray(o))return null;let s=[];for(let i of o){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},XV=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.variables.length===0?'<p class="muted">No variables yet.</p>':`<ul class="sdlc-wizard-vars">${t.variables.map(a=>`<li><strong>{{${We(a.name)}}}</strong> \u2014 ${We(a.description)} (sample: ${We(a.sampleValue)})</li>`).join("")}</ul>`,n=t.templatedPrompt.trim(),o=n.length===0?'<p class="muted">No templated prompt yet.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${We(n)}</pre>`,s=ha(t.templatedPrompt,t.variables).trim(),i=s.length===0||s===n?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${We(s)}</pre>`;return`${r}${o}${i}`},ZV=(e,t)=>`<ul class="sdlc-wizard-revisions">${e.map(n=>{let o=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,s=t===n.roundNumber?" (selected)":"",i=n.reasons?.trim()??"",a=i.length===0?"":`<br><span class="muted">${We(i)}</span>`;return`<li>${We(o)}${s}${a}</li>`}).join("")}</ul>`,QV=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Co({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let n=YV(e);if(n!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${ZV(n,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let o=Sa({wizard:t,revisions:e.revisions.map(s=>({roundNumber:s.roundNumber,promptText:s.promptText,score:s.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${We(o)}</pre>`}return'<p class="muted">Evaluate has not run yet.</p>'},eq=e=>{let t=e.wizard;return t===void 0?"":t.splitOptions.length===0?'<p class="muted">No split options yet.</p>':`<ul class="sdlc-wizard-splits">${t.splitOptions.map(n=>{let o=n.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===n.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${We(n.title)}</strong>${o}${We(s)}<br><span class="muted">${We(n.summary)} (${We(n.topology)})</span>${ap(n)}</li>`}).join("")}</ul>`},tq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((o,s)=>{let i=s===t.currentModuleIndex?" \u2014 current":"";return`<li><strong>${We(o.title)}</strong> (${We(o.status)})${We(i)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${We(o.prompt)}</pre></li>`}).join(""),n=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Co({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ol class="sdlc-wizard-chunks">${r}</ol>${n}`},xo=(e,t)=>{switch(t){case"wizard-1":return XV(e);case"wizard-2":return QV(e);case"wizard-3":return eq(e);case"wizard-4":return tq(e);default:return""}}});var rq,ZI,QI,e0=l(()=>{"use strict";x();An();cp();rq=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},ZI=(e,t,r,n)=>{let o=pt(t);return{title:e,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:n,promptText:o===null?t:null,promptNote:o,bodyHtml:null}},QI=(e,t)=>{if(t.id.startsWith("wizard-")){let o=xo(e,t.id);return{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:o.trim().length===0?null:o}}if(t.id==="end"){let o=he(e.revisions.map(s=>({roundNumber:s.roundNumber,promptText:s.promptText,score:s.judgement?.score??null,reasons:s.judgement?.reasons??null})));return o===null?{title:t.label,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:ZI(t.label,o.promptText,o.score,o.reasons)}let r=t.id==="rewrite"?e.currentRound:rq(t.id),n=r===null?void 0:e.revisions.find(o=>o.roundNumber===r);return n===void 0?{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:ZI(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail)}});var Ea,t0,r0=l(()=>{"use strict";Ea=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),t0=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?'<p class="muted">Not scored yet.</p>':`<p class="muted">${Ea(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,n=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Ea(e.feedback.trim())}</p>`,o=e.promptNote!==null?`<div class="alert-error">${Ea(e.promptNote)}</div>`:e.promptText===null?"":`<h2>Saved prompt</h2><pre class="mono">${Ea(e.promptText)}</pre>`;return`<h2>${Ea(e.title)}</h2>${t}${r}${n}${o}`}});var dp,Io,up=l(()=>{"use strict";dp=e=>e.toLocaleString("en-US"),Io=(e,t)=>e.revisions.reduce((r,n)=>t!==void 0&&n.roundNumber>t?r:r+(n.writerTokens??0)+(n.run?.tokens??0)+(n.judgement?.tokens??0),0)});var Lb,nq,n0,pp,o0,s0,mp=l(()=>{"use strict";x();e0();r0();up();Lb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nq=(e,t)=>{let r=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',n=/^score-(\d+)$/.exec(e.id),o=e.state==="done"&&n!==null?Io(t,Number(n[1])):0,s=o>0?`<span class="sdlc-node-reason">${dp(o)} tokens so far</span>`:"",i=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Lb(e.detail)}</span>`:"",a=t0(QI(t,e));return`<li class="sdlc-node sdlc-node-${e.state}"><button type="button" class="sdlc-node-open" data-sdlc-node>${r}<span class="sdlc-node-label">${Lb(e.label)}${i}${s}</span></button><template>${a}</template></li>`},n0=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>nq(r,t)).join("")}</ol>`,pp=e=>`<div class="sdlc-score" aria-label="What the score means">${pa(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Lb(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,o0='<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog"><button class="btn btn-secondary" type="submit">Close</button></form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>',s0=`<script>
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
</script>`});var gp,fp,hp,i0,Rb=l(()=>{"use strict";gp="support-reply",fp="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",hp=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),i0=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var yp,a0,l0=l(()=>{"use strict";x();mp();Rb();yp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a0=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. <strong>Classic loop (90 / 10 rounds)</strong> skips the wizard: a judge scores the prompt in your folder, an improver rewrites under the pass score, and the loop stops when the score passes, you press Finish, the round limit is hit, or the score has not risen for 3 rounds. After each scored round the page shows tokens spent. The next rewrite starts from the highest scoring prompt; lower scores become an avoid list. The round limit starts at 10 on classic runs (wizard evaluate defaults differ). Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field. The pass score slider defaults to ${90} on classic runs.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>You set the pass score with the slider. The bar fades from a weak score to a pass. The mark is the usual ${90}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${pp(90)}
      <h2>Writers and folder</h2>
      <p>You choose the judge and the improver. Each one has an optional instructions field, used with the goal. Each round the judge runs the prompt in the folder you chose. If the prompt needs an input, put that input in the judge instructions. The judge then reads the git changes, or the files the prompt names, and scores those changes. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder. It does not guess a printed reply, and it does not score the prompt wording. A separate pass checks the tokens and suggests what to cut before the improver runs. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, and improver you last chose. The first visit uses your home directory and leaves the judge and improver blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot runs this loop itself before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a run in that folder. maxRounds is optional and defaults to 10. When only one writer is installed, that writer scores and rewrites. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${yp(fp)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${yp(hp)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${yp(i0)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${yp(gp)}">Run this sample</a>
      </div>
    </section>`});var kb,Sp,oq,c0,d0=l(()=>{"use strict";kb=m(require("node:fs")),Sp=m(require("node:path")),oq=e=>Sp.default.join(Sp.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),c0=(e,t)=>{let r=oq(e),n=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;kb.default.mkdirSync(Sp.default.dirname(r),{recursive:!0}),kb.default.appendFileSync(r,n,"utf8")}});var Oo,u0,sq,p0,iq,m0,Et,ne,g0,B,mt=l(()=>{"use strict";Oo=m(require("node:fs")),u0=m(require("node:path"));x();d0();sq=e=>e.wizard===void 0?e:{...e,wizard:sb(e.wizard)},p0=new Set,iq=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),m0=(e,t)=>{Oo.default.mkdirSync(u0.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Oo.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Oo.default.renameSync(r,e)},Et=e=>{if(!Oo.default.existsSync(e))return[];try{let t=JSON.parse(Oo.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(iq).map(sq):[]}catch{return[]}},ne=(e,t)=>Et(e).find(r=>r.id===t)??null,g0=(e,t)=>{p0.add(t);let r=Et(e).filter(n=>n.id!==t);m0(e,r)},B=(e,t)=>{if(p0.has(t.id))return;let r=Et(e),n=r.some(o=>o.id===t.id)?r.map(o=>o.id===t.id?t:o):[t,...r];m0(e,n),c0(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var f0,Ap,Tb,bn,Cb,Lt,Pn,Ee,Ve=l(()=>{"use strict";f0=m(require("node:fs")),Ap=m(require("node:os")),Tb=m(require("node:path"));lt();bn="~",Cb=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Lt=e=>{let t=Ap.default.homedir(),r=Cb(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Pn=e=>{let t=e.trim().length===0?"~":e.trim(),r=Be(t),n=Tb.default.isAbsolute(r)?Cb(r):Cb(Tb.default.resolve(Ap.default.homedir(),r));try{if(!f0.default.statSync(n).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:n,display:Lt(n)}},Ee=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Ap.default.homedir()});var No,Rt,La,h0,bp,aq,y0,S0,A0,xb=l(()=>{"use strict";No=m(require("node:fs")),Rt=m(require("node:path")),La=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},h0=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),bp=(e,t)=>{let r=La(e);return r.length>0?r:La(t)},aq=e=>{let t=bp(e.fileName,e.name),r=e.promptText.trim(),n=e.name.trim();if(t.length===0||r.length===0||n.length===0)return null;let o=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${h0(n)}`,...o.length>0?[`description: ${h0(o)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},y0=e=>`.cursor/skills/${e}/SKILL.md`,S0=(e,t)=>{let r=La(t);if(r.length===0)return!1;let n=Rt.default.resolve(e),o=Rt.default.resolve(n,".cursor","skills"),s=Rt.default.resolve(n,y0(r));return s.startsWith(`${o}${Rt.default.sep}`)?No.default.existsSync(s):!1},A0=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(bp(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Rt.default.resolve(e.workingDirectory);try{if(!No.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=aq({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let n=y0(r.slug),o=Rt.default.resolve(t,".cursor","skills"),s=Rt.default.resolve(t,n);if(!s.startsWith(`${o}${Rt.default.sep}`))return{ok:!1,errorCode:"path"};if(No.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{No.default.mkdirSync(Rt.default.dirname(s),{recursive:!0}),No.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:n}}});var lq,b0,P0,_0=l(()=>{"use strict";x();x();mt();Ve();An();xb();lq=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,b0=e=>{let t=e.get("savedSkill");return t!==null&&lq.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},P0=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=ne(e.storePath,t),n=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!M(r.status))return{kind:"redirect",location:n("skillError=working")};let o=he(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(o===null||pt(o.promptText)!==null)return{kind:"redirect",location:n("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=A0({workingDirectory:Ee(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:o.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:n(`skillError=${a}`)}}return{kind:"redirect",location:n(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var T,cq,Pp,qe,_n,v0,w0,W0,E0,Me=l(()=>{"use strict";T="manual",cq=["claude-cli","codex","cursor","antigravity"],Pp={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},qe=e=>e===T?"You":e in Pp?Pp[e]:e,_n=e=>cq.filter(t=>e.includes(t)),v0=e=>{let t=_n(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},w0=(e,t)=>t===T?T:e.find(r=>r===t)??null,W0=(e,t,r)=>{let n=_n(e),o=w0(n,t),s=w0(n,r);return o===null||s===null?null:{judge:o,improver:s}},E0=(e,t,r)=>{let n=_n(e);return t===null||t.trim()===""?r!==T?r:n[0]??null:t===T?null:n.find(o=>o===t)??null}});var Ib,L0,R0=l(()=>{"use strict";Ib={ok:!1,errorMessage:"Stopped.",stopped:!0},L0=(e,t,r)=>{if(t===void 0)return;let n=()=>{e.kill("SIGTERM"),r(Ib)};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var k0,Ra,T0,Ob,dq,uq,pq,Ke,ka=l(()=>{"use strict";k0=require("node:child_process"),Ra=m(require("node:fs")),T0=m(require("node:os")),Ob=m(require("node:path"));va();R0();An();dq=["claude-cli","codex","cursor","antigravity"],uq=18e4,pq=e=>dq.includes(e),Ke=e=>new Promise(t=>{if(e.signal?.aborted){t(Ib);return}if(!pq(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,n=Pt(r,e.prompt,ie({}));if(n===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!Ra.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let o=Ob.default.join(Ra.default.mkdtempSync(Ob.default.join(T0.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=KI({writerAgent:r,baseArgs:n.args,replyPath:o}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,k0.spawn)(n.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=f=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(f))};L0(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??uq),d.stdout.on("data",f=>{i.push(Buffer.from(f))}),d.stderr.on("data",f=>{a.push(Buffer.from(f))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let f=Ra.default.existsSync(o)?Ra.default.readFileSync(o,"utf8"):null;p(JI({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:f}))})})});var C0,mq,Ta,_p,wp=l(()=>{"use strict";x();Me();C0=e=>e===T?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},mq=(e,t,r,n,o,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:n,reasons:o,rawReply:t,tokens:s}}:i),Ta=(e,t,r=null)=>{let n=e.revisions.find(a=>a.roundNumber===e.currentRound),o=KA({raw:t,passScore:e.passScore,goal:e.goal,promptText:n?.promptText??"",improver:C0(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:ua(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=mq(e,t,o.verdict?.score??null,o.verdict?.passed??null,o.verdict?.reasons??null,r),i=new Date().toISOString();return o.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:o.continuation.type,errorMessage:o.continuation.type==="passed"?null:o.continuation.errorMessage,updatedAt:i}},_p=(e,t,r=null)=>{let n=Zu({raw:t,judge:C0(e.judgeModel),goal:e.goal,passScore:e.passScore}),o=new Date().toISOString();return n.nextPrompt===null?{...e,status:"failed",errorMessage:n.continuation.type==="failed"?n.continuation.errorMessage:"The improver reply was empty.",updatedAt:o}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:n.nextPrompt,judgement:null,writerTokens:r}],updatedAt:o}}});var vp,Nb=l(()=>{"use strict";vp=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let n=`Token review: ${r}`;return{...e,revisions:e.revisions.map(o=>{if(o.roundNumber!==e.currentRound)return o;let s=o.judgement?.reasons?.trim()??"";return{...o,run:o.run===void 0?o.run:{...o.run,tokenReview:r},judgement:o.judgement===null?o.judgement:{...o.judgement,reasons:s.length===0?n:`${s}

${n}`}}})}}});var O0,Wp,Ep,x0,I0,Mb,gq,N0,jb,fq,M0,hq,yq,j0,D0=l(()=>{"use strict";O0=require("node:child_process"),Wp=m(require("node:fs")),Ep=m(require("node:path"));x();x0=4e3,I0=12e3,Mb=(e,t)=>{let r=(0,O0.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},gq=e=>Mb(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",N0=e=>{let t=Mb(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(n=>{if(n.length<4)return[];let o=n.slice(3).trim();return[[(o.includes(" -> ")?o.split(" -> ").at(-1)??o:o).replaceAll('"',""),n]]});return Object.fromEntries(r)},jb=(e,t)=>{let r=Ep.default.resolve(e,t),n=Ep.default.relative(e,r);if(n.startsWith("..")||Ep.default.isAbsolute(n)||!Wp.default.existsSync(r)||!Wp.default.statSync(r).isFile())return null;let o=Wp.default.readFileSync(r,"utf8");return o.includes("\0")?"(binary file)":o.length>x0?`${o.slice(0,x0)}
\u2026truncated`:o},fq=e=>e.length>I0?`${e.slice(0,I0)}
\u2026truncated`:e,M0=e=>{let t=ZA(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(o=>[o,jb(e.workingDirectory,o)])),n=gq(e.workingDirectory);return{git:n,status:n?N0(e.workingDirectory):{},files:r,paths:t}},hq=(e,t)=>{let r=Mb(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let n=jb(e,t);return n===null?`${t} is missing.`:n},yq=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",j0=e=>{let t=e.before.git?N0(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),n=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=jb(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),o=r.map(a=>hq(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",o.length>0?`Changes since the run started:
${o.join(`
`)}`:"",n.length>0?`Files named in the prompt:
${n.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:yq(e.before.git,e.before.paths.length>0),evidence:fq(i.join(`

`))}}});var Fb,$,$b,ye,H0,Sq,Aq,F0,Mo,$0,jo,bq,Pq,Ca,Db,Hb,_q,U0,wq,vq,Wq,z0,Eq,B0,G0,Lq,Rq,V0,q0=l(()=>{"use strict";Fb=require("node:child_process"),$=m(require("node:fs")),$b=m(require("node:os")),ye=m(require("node:path")),H0=8e6,Sq=16e6,Aq=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],F0=(e,t)=>{let r=(0,Fb.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Mo=(e,t)=>(0,Fb.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,$0=e=>{let t=F0(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let n=r.slice(3).trim().replaceAll('"',"");return(n.includes(" -> ")?n.split(" -> "):[n]).map(s=>[s.trim(),r])}))},jo=(e,t)=>{let r=ye.default.resolve(e,t),n=ye.default.relative(e,r);return n.startsWith("..")||ye.default.isAbsolute(n)?null:r},bq=(e,t)=>{let r=jo(e,t);if(r===null||!$.default.existsSync(r))return null;let n=$.default.statSync(r);return!n.isFile()||n.size>H0?null:$.default.readFileSync(r)},Pq=(e,t,r)=>{let n=jo(e,t);n!==null&&($.default.mkdirSync(ye.default.dirname(n),{recursive:!0}),$.default.writeFileSync(n,r))},Ca=(e,t)=>{let r=jo(e,t);r===null||!$.default.existsSync(r)||$.default.rmSync(r,{recursive:!0,force:!0})},Db=(e,t)=>Mo(e,["cat-file","-e",`HEAD:${t}`]),Hb=e=>{let t=F0(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},_q=e=>ye.default.resolve(e)!==ye.default.resolve($b.default.homedir()),U0=e=>{if(!$.default.existsSync(e))return 0;let t=$.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?$.default.readdirSync(e).reduce((r,n)=>r+U0(ye.default.join(e,n)),0):0},wq=(e,t,r)=>{let n=jo(e,r);if(n===null||!$.default.existsSync(n))return{relativePath:r,existed:!1,copyDir:null};if(U0(n)>Sq)return{relativePath:r,existed:!0,copyDir:null};let o=ye.default.join(t,"cache",r);return $.default.mkdirSync(ye.default.dirname(o),{recursive:!0}),$.default.cpSync(n,o,{recursive:!0}),{relativePath:r,existed:!0,copyDir:o}},vq=400,Wq=32e6,z0=e=>{let t=[],r=0,n=!0,o=s=>{if(!(!n||!$.default.existsSync(s)))for(let i of $.default.readdirSync(s)){if(!n||i===".git"||i==="node_modules")continue;let a=ye.default.join(s,i),c=$.default.statSync(a);if(c.isDirectory()){o(a);continue}if(!(!c.isFile()||c.size>H0)){if(t.length>=vq||r+c.size>Wq){n=!1;return}r+=c.size,t.push(ye.default.relative(e,a))}}};return o(e),{paths:t,complete:n}},Eq=(e,t,r)=>{let n=jo(e,r);if(n===null||!$.default.existsSync(n))return null;let o=bq(e,r);if(o===null)return"skip";let s=ye.default.join(t,"files",r);return $.default.mkdirSync(ye.default.dirname(s),{recursive:!0}),$.default.writeFileSync(s,o),s},B0=e=>{let t=$.default.mkdtempSync(ye.default.join($b.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?$0(e.workingDirectory):{},n=e.git?{paths:[],complete:!0}:z0(e.workingDirectory),o=e.git?[...Object.keys(r),...e.namedPaths]:[...n.paths,...e.namedPaths],s=Object.fromEntries([...new Set(o)].map(i=>[i,Eq(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?Hb(e.workingDirectory):null,isolateCaches:_q(e.workingDirectory),complete:n.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:Aq.map(i=>wq(e.workingDirectory,t,i))}},G0=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Ca(e.workingDirectory,t);return}Pq(e.workingDirectory,t,$.default.readFileSync(r))}},Lq=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?G0(e,t):Db(e.workingDirectory,t)?Mo(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Ca(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",n=r.startsWith(" ")||r.startsWith("?");n&&Db(e.workingDirectory,t)&&Mo(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),n&&!Db(e.workingDirectory,t)&&Mo(e.workingDirectory,["reset","-q","HEAD","--",t])},Rq=(e,t)=>{let r=jo(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Ca(e.workingDirectory,t.relativePath),$.default.mkdirSync(ye.default.dirname(r),{recursive:!0}),$.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Ca(e.workingDirectory,t.relativePath);return}if($.default.existsSync(r))for(let n of $.default.readdirSync(r)){let o=ye.default.join(r,n);$.default.statSync(o).mtimeMs>=e.startedMs-1e3&&$.default.rmSync(o,{recursive:!0,force:!0})}}}},V0=e=>{try{if(e.git){if(Hb(e.workingDirectory)!==e.head&&(!(e.head===null?Mo(e.workingDirectory,["update-ref","-d","HEAD"]):Mo(e.workingDirectory,["reset","--hard",e.head]))||Hb(e.workingDirectory)!==e.head))throw new Error("head");let r=$0(e.workingDirectory);for(let n of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))Lq(e,n)}else{if(e.complete)for(let t of z0(e.workingDirectory).paths)e.files[t]===void 0&&Ca(e.workingDirectory,t);for(let t of Object.keys(e.files))G0(e,t)}for(let t of e.caches)Rq(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{$.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Lp,Rp,kq,Tq,Cq,xq,Iq,K0,Oq,J0,Y0=l(()=>{"use strict";x();wp();Nb();D0();q0();Me();Ve();ka();Lp=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),Rp=e=>({...e,status:"stopped",errorMessage:hn,judgePhase:void 0,updatedAt:new Date().toISOString()}),kq=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),Tq=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==T?t:e.improverModel!==T?e.improverModel:null}return e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null},Cq=async e=>{let t=Ee(e.cycle),r=M0({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),n=B0({workingDirectory:t,git:r.git,namedPaths:r.paths}),o=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?mb({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:hb(e.cycle.wizard,e.cycle.wizard.currentModuleIndex),moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):da({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await Ke({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?j0({workingDirectory:t,before:r,writerReply:i.text}):null,c=V0(n);return i.ok?!c.ok||a===null?{ok:!1,cycle:Lp(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-o,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Rp(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Lp(e.cycle,i.errorMessage)})},xq=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:Cq({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),Iq=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),K0=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let n=await Ke({writerAgent:e.reviewer,workingDirectory:Ee(e.cycle),prompt:XA({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return n.ok?{kind:"suggestion",text:n.text.trim(),tokens:n.tokens}:n.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Rp(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},Oq=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===T)return t;let n={...t,judgePhase:"scoring"};e.onProgress?.(n);let o=await Ke({writerAgent:t.judgeModel,workingDirectory:Ee(t),prompt:YA({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return o.ok?{...Ta(n,o.text,o.tokens),judgePhase:void 0}:o.stopped===!0||e.signal?.aborted===!0?Rp(n):(e.onWriterFailure?.(t.judgeModel),Lp(n,o.errorMessage))},J0=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return Oq(e);let n=Tq(t),o=await xq({cycle:t,revision:r,runner:n,signal:e.signal,onWriterFailure:e.onWriterFailure});if(o===null)return t;if(!o.ok)return o.cycle;let s=r.run===void 0?kq(t,o.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===T){let p=await K0({cycle:s,run:o.run,promptText:r.promptText,reviewer:n,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...Iq(s,p.text),judgePhase:void 0}}let i=await Ke({writerAgent:t.judgeModel,workingDirectory:Ee(t),prompt:qA({goal:t.goal,lookedAt:o.run.lookedAt??"the writer reply",evidence:o.run.evidence??o.run.output,tokens:o.run.tokens,delayMs:o.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Rp(s):(e.onWriterFailure?.(t.judgeModel),Lp(s,i.errorMessage));let a=await K0({cycle:s,run:o.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Ta(s,i.text,c);return vp(d,a.text)}});var kp,Ub=l(()=>{"use strict";x();kp=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t?.judgement?.score,n=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||n.length===0?null:ca({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:n},priorRounds:ua(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null})),e.currentRound)})}});var Tp,Nq,Mq,zb,X0=l(()=>{"use strict";x();wp();Y0();Ub();Me();Ve();ka();Tp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),Nq=e=>({...e,status:"stopped",errorMessage:hn,updatedAt:new Date().toISOString()}),Mq=(e,t,r,n,o)=>t.ok?null:t.stopped===!0||n?.aborted===!0?Nq(e):(o?.(r),Tp(e,t.errorMessage)),zb=async(e,t,r,n)=>{let o=e.revisions.find(c=>c.roundNumber===e.currentRound);if(o===void 0)return Tp(e,"This round has no prompt.");if(e.status==="judging")return J0({cycle:e,revision:o,onWriterFailure:t,signal:r,onProgress:n});if(e.status!=="improving")return Tp(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===T)return e;let s=kp(e);if(s===null)return Tp(e,"The improver needs the score and the reason.");let i=await Ke({writerAgent:e.improverModel,workingDirectory:Ee(e),prompt:ia({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=Mq(e,i,e.improverModel,r,t);return a!==null?a:_p(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var Ip,Cp,Z0,jq,Dq,xp,Q0,eO,Hq,Fq,tO,rO,nO,Bb=l(()=>{"use strict";x();Me();Ve();ka();X0();vb();Ip=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),Cp=(e,t,r)=>e.wizard===void 0||t===null?Ip(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},Z0=e=>{let t=e.wizard;return t===void 0||Wa(e).length===0?e:{...e,wizard:To({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},jq=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",Dq=e=>{let t=e.wizard;if(t===void 0)return e;let r=fa({revisions:e.revisions});if(r.rounds.length===0)return e;let n=t.modules[t.currentModuleIndex];return{...e,wizard:To({wizard:t,step:"optimize_modules",output:{moduleId:n?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},xp=(e,t)=>({...e,status:"wizard_paused",errorMessage:e.errorMessage,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),Q0=e=>e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null,eO=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let o=r.attempts.filter(s=>s.step===t).at(-1);return o===void 0?"":JSON.stringify(o.output)},Hq=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=Q0(e);if(o===null)return Ip(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??ya(n),i=cb({goal:e.goal,sourcePrompt:s,avoid:n.avoidByStep.generalize,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:eO(e,"generalize")}),a=await Ke({writerAgent:o,prompt:i,workingDirectory:Ee(e),signal:t});if(!a.ok)return r?.(o),Cp(e,"generalize",a.errorMessage);try{let c=Sb(a.text),d=To({wizard:{...n,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Pa(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return xp({...e,wizard:d},"generalize")}catch(c){return Cp(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},Fq=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=Q0(e);if(o===null)return Ip(e,"Choose a writer to suggest splits.");let s=Sa({wizard:n,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=pb({goal:e.goal,templatedPrompt:n.templatedPrompt,variables:n.variables,evaluatedPromptReference:s,avoid:n.avoidByStep.separate,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:eO(e,"separate")}),a=await Ke({writerAgent:o,prompt:i,workingDirectory:Ee(e),signal:t});if(!a.ok)return r?.(o),Cp(e,"separate",a.errorMessage);try{let c=Ab(a.text),d=db(c,n.variables),p=To({wizard:{...n,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return xp({...e,wizard:p},"separate")}catch(c){return Cp(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},tO=e=>{let t=e.wizard;if(t===void 0)return e;let r=ya(t),n=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:70,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:n}},rO=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let n=r.modules[t];if(n===void 0)return Ip(e,"This module is missing.");let o=yn(r),s=Aa(n.prompt,o),i=e.runnerModel!==void 0&&e.runnerModel!==T?e.runnerModel:e.judgeModel!==T?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:70,maxRounds:1,errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},nO=async(e,t,r,n)=>{let o=e.wizard;if(o===void 0)return zb(e,t,r,n);if(o.gate!==null||e.status==="wizard_paused")return e;if(o.phase==="generalize")return Hq(e,r,t);if(o.phase==="separate"&&o.splitOptions.length===0)return Fq(e,r,t);if(o.phase==="evaluate"||o.phase==="optimize_modules"){let s=await zb(e,t,r,n);if(M(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Wa(s).length===0)return s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let p=he(s.revisions.map(b=>({roundNumber:b.roundNumber,promptText:b.promptText,score:b.judgement?.score??0,reasons:b.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0,f=xp({...s,wizard:{...s.wizard,evaluateSelectedRound:p}},i);return i==="evaluate"?Z0(f):f}let a=xp(s,i),c=i==="optimize_modules"&&a.wizard!==void 0?(()=>{let d=fb({wizard:{...a.wizard,modules:a.wizard.modules.map((p,f)=>f===a.wizard.currentModuleIndex&&p.status==="running"?{...p,status:"paused"}:p)},moduleIndex:a.wizard.currentModuleIndex,revisions:a.revisions,cycleStatus:jq(s.status)});return{...a,wizard:d}})():a;return i==="evaluate"?Z0(c):Dq(c)}return s}return o.phase==="complete",e}});var wr,oO,$q,sO=l(()=>{"use strict";x();Ve();An();xb();wr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oO=e=>{if(!M(e.status))return"";let t=he(e.revisions.map(s=>({roundNumber:s.roundNumber,promptText:s.promptText,score:s.judgement?.score??null,reasons:s.judgement?.reasons??null})));if(t===null)return"";let r=pt(t.promptText),n=t.reasons===null||t.reasons.trim().length===0?"":`<p>${wr(t.reasons.trim())}</p>`,o=r===null?$q({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Ee(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${wr(r)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>Round ${t.roundNumber} \xB7 Score ${t.score} / 100</h2>${n}${o}</section>`},$q=e=>{let t=e.sourceSkill?.fileName??La(e.goal),r=e.sourceSkill?.name??t,n=e.sourceSkill?.description??e.goal,o=bp(t,r),s=o.length>0&&S0(e.workingDirectory,o),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${wr(o)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${wr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${wr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${wr(n)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${wr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${wr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var iO,aO=l(()=>{"use strict";x();Me();An();iO=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!M(e.status)){let t=e.judgeModel;return{title:`${qe(t)} is suggesting module splits.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!M(e.status)){let t=e.judgeModel;return{title:`${qe(t)} is generalizing your prompt.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===T?{title:`Score the prompt text for round ${e.currentRound+1}.`,detail:"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."}:e.judgePhase==="scoring"?{title:`${qe(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"No folder run in step 2. This panel keeps updating, so the page is not stuck."}:{title:`${qe(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"Wizard evaluate revises prompt wording before the runner executes in step 4."};if(e.status==="judging"&&e.judgeModel===T){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==T?{title:`${qe(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"You score the changes after this run."}:{title:`Score the changes from round ${e.currentRound+1}.`,detail:t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt."}}if(e.status==="judging"&&e.judgePhase==="reviewing")return{title:`${qe(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,detail:"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck."};if(e.status==="judging"&&e.judgePhase==="scoring")return{title:`${qe(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,detail:"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck."};if(e.status==="judging")return{title:`${qe(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck."};if(e.status==="improving"&&e.improverModel===T){let t=e.revisions.find(n=>n.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return{title:"Rewrite the prompt.",detail:t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`}}if(e.status==="improving")return{title:`${qe(e.improverModel)} is rewriting the prompt.`,detail:"That writer is working on this Mac. This panel keeps updating, so the page is not stuck."};if(e.status==="passed")return{title:"This prompt passed.",detail:""};if(e.status==="stopped"){let t=e.revisions.some(o=>pt(o.promptText)!==null),r=e.errorMessage?.trim()??"";return e.wizard!==void 0?{title:"Wizard ended.",detail:r.length>0?r:"Progress from finished steps is kept."}:{title:(e.errorMessage??"").startsWith("Finished")?"Finished.":"Stopped.",detail:r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept."}}return M(e.status)?{title:"This run stopped because a reply could not be used.",detail:""}:{title:"Working on this Mac.",detail:"This panel keeps updating."}}});var kt,xa=l(()=>{"use strict";Me();kt=e=>{if(e.status==="improving"&&e.improverModel===T)return!0;if(e.status!=="judging"||e.judgeModel!==T)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===T}});var lO,cO=l(()=>{"use strict";lO=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var vr,Uq,dO,uO=l(()=>{"use strict";x();vr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Uq=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${vr(r)}</p>`},dO=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${vr(e.cycleId)}">`,n=e.instructions?.trim()??"",o=n.length===0?"":`<p class="muted">Instructions</p><p>${vr(n)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${vr(a)}.</p>`}<pre class="mono">${vr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${_r(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${vr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${o}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",f=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${vr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${o}${Uq(e.score,e.reasons)}${f}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${vr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Ia,zq,pO,mO=l(()=>{"use strict";x();An();Ia=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zq=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,n=pt(t.promptText),o=t.judgement?.reasons?`<p class="muted">${Ia(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Ia(i)}.</p>`}<pre class="mono">${Ia(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${_r(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=n===null?`<pre class="mono">${Ia(d)}</pre>`:`<div class="alert-error">${Ia(n)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${o}${a}${p}</article>`},pO=e=>e.revisions.map(t=>zq(e,t)).join("")});var gO,fO=l(()=>{"use strict";x();gO=e=>{if(M(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Oa,Bq,Gq,Vq,hO,yO,Gb=l(()=>{"use strict";fO();Oa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bq=e=>`<form method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Oa(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,Gq=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions"><input type="hidden" name="cycleId" value="${Oa(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,Vq=e=>{let t=Oa(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Oa(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button>
    </form>
  </div>`},hO=e=>{let t=gO(e);return t==="none"?"":t==="classic"?Bq(e.id):t==="wizard_end_only"?Gq(e.id):Vq(e)},yO=e=>e.wizard===void 0||e.status!=="wizard_paused"?"":`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end"><input type="hidden" name="cycleId" value="${Oa(e.id)}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`});var Op,SO,AO=l(()=>{"use strict";x();cp();Op=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SO=e=>{let t=e.wizard;if(t===void 0||!M(e.status))return"";let r=e.status==="passed"?"Wizard complete":e.status==="stopped"?"Wizard ended":"Wizard stopped",n=t.modules.length===0?"":`<h3>Modules</h3><ol class="sdlc-wizard-outcome-modules">${t.modules.map(s=>`<li><strong>${Op(s.title)}</strong> \u2014 ${Op(s.status)}</li>`).join("")}</ol>`,o=["wizard-1","wizard-2","wizard-3","wizard-4"].map(s=>{let i=xo(e,s);return i.trim().length===0?"":`<details class="sdlc-wizard-outcome-step"><summary>${Op(s==="wizard-1"?"Step 1 \u2014 Generalize":s==="wizard-2"?"Step 2 \u2014 Evaluate":s==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules")}</summary><div class="sdlc-wizard-outcome-step-body">${i}</div></details>`}).join("");return`<section class="card sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><p class="eyebrow">Wizard outcome</p><h2>${Op(r)}</h2>${n}${o}</section>`}});var Na,Np,Vb=l(()=>{"use strict";x();mp();sO();aO();xa();cO();Ub();uO();mO();Gb();AO();up();Ve();Na=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Np=e=>{let t=!M(e.status)&&e.status!=="wizard_paused"&&!kt(e),r=iO(e),n=n0(rb(lO(e)),e),o=M(e.status)?"":hO(e),s=SO(e),i=oO(e),a=e.errorMessage===null?"":`<div class="alert-error">${Na(e.errorMessage)}</div>`,c=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",d=t?" Working for <span data-elapsed>0s</span>.":"",p=r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Na(r.detail)}${d}</p>`,f=e.revisions.find(ee=>ee.roundNumber===e.currentRound),b=e.status==="improving"?kp(e):null,h=Io(e),y=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),u=kt(e)?dO({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:b?.promptText??f?.promptText??"",score:b?.score??f?.judgement?.score??null,reasons:b?.reasons??f?.judgement?.reasons??null,avoid:b?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:y?1:0}):"",A=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules"?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${pp(e.passScore)}</div>`:"",g=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':M(e.status)?'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",_=t?c:'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',w=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Na(Lt(Ee(e)))}</li>`:"",h>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${dp(h)} so far</li>`:""].filter(ee=>ee.length>0),W=w.length===0?"":`<ul class="sdlc-run-meta">${w.join("")}</ul>`,L=o.length===0?"":`<div class="sdlc-run-actions">${o}</div>`,R=`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${n}</div>`,k=A.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${R}</div>`:`<div class="sdlc-run-grid">${R}${A}</div>`,C=pO(e),D=C.length===0?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${C}</div></section>`;return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Na(e.updatedAt)}" aria-busy="${t?"true":"false"}"><header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${g}</div><div class="sdlc-run-activity"><div class="sdlc-run-activity-icon">${_}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Na(r.title)}</h2>${p}</div></div>${W}${L}</header>${a}${k}${u}${s}${i}</section>${D}`}});var bO,PO,_O=l(()=>{"use strict";x();bO=e=>Sn.indexOf(e),PO=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||M(e.status)?Sn.length:t.gate!==null?bO(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?bO(t.phase):null}});var Do,wO,vO=l(()=>{"use strict";x();Do=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wO=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=ba(e.modulePrompt);if(r.length===0)return"";let n=yn(t);return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${r.map(s=>{let i=t.variables.find(f=>f.name===s),a=op(s),c=n[s]??"",d=i===void 0?`{{${s}}}`:`{{${s}}} \u2014 ${i.description}`,p=i===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Do(i.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Do(a)}">${Do(d)}</label>
        ${p}
        <input class="input" type="text" id="${Do(a)}" name="${Do(a)}" value="${Do(c)}" required>
      </div>`}).join("")}</div>`}});var gt,WO,EO=l(()=>{"use strict";x();vO();Wb();lp();Gb();gt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WO=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let n=r.gate,o=n==="generalize"?"Step 1 \u2014 Generalize":n==="evaluate"?"Step 2 \u2014 Evaluate":n==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=n==="generalize"?`<ul class="sdlc-wizard-vars">${r.variables.map(S=>`<li><strong>{{${gt(S.name)}}}</strong> \u2014 ${gt(S.description)} (sample: ${gt(S.sampleValue)})</li>`).join("")}</ul><pre class="sdlc-pre">${gt(r.templatedPrompt)}</pre>`:"",i=n==="evaluate"?Co({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",a=n==="separate"?`<ul class="sdlc-wizard-splits">${r.splitOptions.map(S=>{let A=S.recommended?' <span class="sdlc-badge">Recommended</span>':"",g=r.selectedSplitOptionId===S.id||r.selectedSplitOptionId===null&&S.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${gt(S.id)}" required${g}> <strong>${gt(S.title)}</strong>${A}<br><span class="muted">${gt(S.summary)} (${gt(S.topology)})</span></label>${ap(S)}</li>`}).join("")}</ul>`:"",c=r.modules[r.currentModuleIndex],d=c?.title??"Module",p=c?.prompt??"",f=c?.status==="pending",b=n==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${gt(d)}</p>${f?wO({cycle:e,modulePrompt:p}):""}<p class="muted">Test run prompt preview: ${gt(Aa(p,yn(r)))}</p>${c?.statistics===null||c?.statistics===void 0?"":`<p class="muted">Module stats: best ${c.statistics.bestScore??"\u2014"} / ${e.passScore} (round ${c.statistics.bestRound??"\u2014"}).</p>`}${Co({cycle:e,interactive:!1,caption:f?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${d}\u201D (runner + judge).`})}`:"",h=n==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":n==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":n==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":f?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",y=t?.active===!0?" sdlc-wizard-gate-active":"",u=t?.active===!0?' id="prompt-optimizer-wizard-active-step"':"";return`<section class="card sdlc-wizard-gate${y}"${u}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${o}</h2>
    <p class="sdlc-wizard-gate-lede">${h}</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${gt(e.id)}">
    ${s}
    ${i}
    ${a}
    ${b}
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
    ${yO(e)}
  </section>`}});var qq,LO,RO=l(()=>{"use strict";x();qq=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),LO=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||M(e.status))return"";if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>Suggesting module splits</h2>
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let r=t.currentModuleIndex,o=t.modules[r]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    <h2>Module ${r+1} of ${t.modules.length}: ${qq(o)}</h2>
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
  </section>`:""}});var Kq,Jq,Yq,kO,TO=l(()=>{"use strict";x();_O();EO();RO();cp();Kq={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},Jq=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Yq=(e,t,r)=>`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${Jq(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${xo(e,t)}</div>
</details>`,kO=e=>{let t=e.wizard;if(t===void 0)return"";let r=PO(e);if(r===null)return"";let n=Sn.slice(0,r).map((i,a)=>Yq(e,`wizard-${a+1}`,Kq[i])),o=t.gate!==null?WO(e,{active:!0}):LO(e),s=r>=Sn.length?"":o;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${n.join("")}${s}</div>`}});var Mp,qb=l(()=>{"use strict";TO();lp();Mp=e=>{if(e===null)return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=kO(e),r=XI(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var Kb,CO,xO,jp,IO,Dp=l(()=>{"use strict";x();mt();Kb=new Map,CO=e=>{let t=new AbortController;return Kb.set(e,t),t.signal},xO=e=>{Kb.delete(e)},jp=e=>{Kb.get(e)?.abort()},IO=(e,t)=>{let r=ne(e,t);return r===null||r.wizard!==void 0?!1:(M(r.status)||(B(e,{...r,status:"stopped",errorMessage:hn,updatedAt:new Date().toISOString()}),jp(t)),!0)}});var Ma,Hp,OO,Jb,NO,MO,jO,DO,Yb=l(()=>{"use strict";Ma=m(require("node:fs")),Hp=m(require("node:path")),OO=e=>Hp.default.join(Hp.default.dirname(e),"prompt-optimizer-writer-ready.json"),Jb=e=>{let t=OO(e);if(!Ma.default.existsSync(t))return{};try{let r=JSON.parse(Ma.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},NO=(e,t)=>{Ma.default.mkdirSync(Hp.default.dirname(e),{recursive:!0}),Ma.default.writeFileSync(OO(e),`${JSON.stringify(t,null,2)}
`)},MO=(e,t)=>Jb(e)[t]?.message??null,jO=(e,t,r)=>{NO(e,{...Jb(e),[t]:{message:r}})},DO=(e,t)=>{let r=Jb(e);r[t]!==void 0&&NO(e,Object.fromEntries(Object.entries(r).filter(([n])=>n!==t)))}});var Xb,Fp,$p,HO,xe,wn=l(()=>{"use strict";x();va();Bb();xa();Dp();Yb();mt();Xb=new Set,Fp={atMs:0,ids:[]},$p=async()=>{if(Date.now()-Fp.atMs<3e4)return Fp.ids;let e=await dt({commands:ie({})});return Fp.atMs=Date.now(),Fp.ids=e.installedWriterIds,e.installedWriterIds},HO=async(e,t,r)=>{let n=ne(e,t);if(n===null||M(n.status)||n.status==="wizard_paused"||kt(n)||r.aborted)return;let o=await nO(n,i=>{DO(e,i)},r,i=>{ne(e,t)?.status==="stopped"||r.aborted||B(e,i)});ne(e,t)?.status==="stopped"||r.aborted||(B(e,o),M(o.status)||await HO(e,t,r))},xe=(e,t)=>{if(Xb.has(t))return;let r=ne(e,t);if(r===null||M(r.status)||r.status==="wizard_paused"||kt(r))return;Xb.add(t);let n=CO(t);HO(e,t,n).finally(()=>{Xb.delete(t),xO(t)})}});var Ho,Up=l(()=>{"use strict";Vb();qb();wn();Ho=(e,t)=>(xe(e,t.id),`${Np(t)}${Mp(t)}`)});var FO,$O,UO=l(()=>{"use strict";FO=(e,t)=>e.revisions.find(n=>n.roundNumber===t)?.judgement?.score??null,$O=e=>e!==null&&e>0});var zp,zO,Zb=l(()=>{"use strict";x();Dp();zp=e=>(jp(e.id),{...e,status:"stopped",errorMessage:HA,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null,phase:"complete"},updatedAt:new Date().toISOString()}),zO=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;jp(e.id);let r=t.currentModuleIndex,n=t.modules.map((o,s)=>s===r?{...o,status:"stopped"}:o);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:n,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var Xq,BO,Zq,GO,VO=l(()=>{"use strict";x();Bb();Up();mt();wn();UO();Zb();Xq="Pick a revision scored above 0 before continuing to Separate.",BO=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),Zq=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null})),GO=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",n=t.get("intent")??"";if(!n.startsWith("wizard-"))return!1;let o=t.get("cycleId")?.trim()??"",s=ne(e.storePath,o);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=ne(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Ho(e.storePath,d))};if(n==="wizard-stop-all"){let c=zp(s);return B(e.storePath,c),a(o),!0}if(n==="wizard-skip-module"){let c=zO(s);return B(e.storePath,c),a(o),!0}if(n==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(o),!0;let p=t.get("wizardStepInstructions")?.trim()??"",f=ib(s.wizard,d,c);f=ab(f,d),f={...f,pendingStepInstructions:p};let b={...s,status:"judging",wizard:{...f,gate:null},updatedAt:new Date().toISOString()};return B(e.storePath,b),xe(e.storePath,o),a(o),!0}if(n==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(o),!0;if(c==="generalize"){let p=(s.errorMessage?.trim().length??0)>0?BO(s):tO({...s,wizard:{...s.wizard,gate:null}});return B(e.storePath,p),xe(e.storePath,o),a(o),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),f=FO(s,p??-1);if(!$O(f)){let y={...s,errorMessage:Xq,updatedAt:new Date().toISOString()};return B(e.storePath,y),a(o),!0}let b={...s.wizard,evaluateSelectedRound:p},h={...s,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...b,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()};return B(e.storePath,h),xe(e.storePath,o),a(o),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0){let y=BO(s);return B(e.storePath,y),xe(e.storePath,o),a(o),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",f=s.wizard.splitOptions.find(y=>y.id===p);if(f===void 0){let y={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return B(e.storePath,y),a(o),!0}let b=Zq(f),h={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...s.wizard,gate:"optimize_modules",selectedSplitOptionId:p,selectedSplitTopology:f.topology,modules:b,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(s.wizard.parameterValues??{}).length>0?s.wizard.parameterValues??{}:Pa(s.wizard.variables)},updatedAt:new Date().toISOString()};return B(e.storePath,h),a(o),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(o),!0;let f=_b({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!f.ok){let u={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return B(e.storePath,u),a(o),!0}let b={...s.wizard,parameterValues:f.parameterValues};if(p.status==="pending"){let u=rO({...s,wizard:{...b,gate:null}},d);return B(e.storePath,u),xe(e.storePath,o),a(o),!0}let h=d+1;if(h>=s.wizard.modules.length){let u={...s,status:"passed",wizard:{...b,gate:null,phase:"complete"},updatedAt:new Date().toISOString()};return B(e.storePath,u),a(o),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...b,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return B(e.storePath,y),a(o),!0}}return a(o),!0}});var Qq,qO,eK,Qb,tK,KO,JO=l(()=>{"use strict";Me();Dp();Zb();Nb();wp();xa();mt();Qq="Add a score from 0 to 100 and the reason for it.",qO="Add a score from 1 to 100 and the reason for it.",eK="Write the next prompt.",Qb="This step is not waiting for you.",tK=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},KO=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=ne(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(B(e.storePath,zp(a)),{kind:"saved",cycleId:i}):IO(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",n=ne(e.storePath,r);if(n===null||!kt(n))return n===null?{kind:"missing"}:{kind:"invalid",cycle:n,errorMessage:Qb};if(t==="manual-judge"){if(n.judgeModel!==T)return{kind:"invalid",cycle:n,errorMessage:Qb};let i=tK(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=n.wizard!==void 0&&(n.wizard.phase==="evaluate"||n.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:n,errorMessage:c?qO:Qq};if(c&&i===0)return{kind:"invalid",cycle:n,errorMessage:qO};let d=n.revisions.find(f=>f.roundNumber===n.currentRound)?.run?.tokenReview??"",p=vp(Ta(n,JSON.stringify({score:i,passed:i>=n.passScore,reasons:a})),d);return B(e.storePath,p),{kind:"saved",cycleId:n.id}}if(n.improverModel!==T)return{kind:"invalid",cycle:n,errorMessage:Qb};let o=(e.posted.get("prompt")??"").trim();if(o.length===0)return{kind:"invalid",cycle:n,errorMessage:eK};let s=_p(n,o);return B(e.storePath,s),{kind:"saved",cycleId:n.id}}});var YO,XO=l(()=>{"use strict";YO=`<script>
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
</script>`});var ZO,QO=l(()=>{"use strict";ZO=`<script>
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
</script>`});var eN,tN=l(()=>{"use strict";eN=`<script>
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
  document.querySelectorAll("[data-writer-select]").forEach((select) => {
    select.addEventListener("change", () => {
      rememberSelection();
      const slot = document.querySelector('[data-writer-status="' + select.dataset.writerSelect + '"]');
      if (!slot) return;
      slot.dataset.writer = select.value;
      void paintWriter(select.value);
    });
  });
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
</script>`});var rN,nN=l(()=>{"use strict";x();Ve();rN=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),n=t.wizard?.templatedPrompt.trim()??"",o=n.length>0?n:r?.promptText??e.prompt;return{goal:t.goal,prompt:o,folder:t.workingDirectory===void 0?e.folder:Lt(t.workingDirectory),passScore:String(t.passScore),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!M(t.status)}}});var Bp,eP=l(()=>{"use strict";Bp=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",n=r.length>0?r:"Untitled run";return n.length<=72?n:`${n.slice(0,71).trimEnd()}\u2026`}});var ja,rK,oN,sN=l(()=>{"use strict";eP();ja=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rK=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${ja(t)}">`;return`<li><div><a href="/prompt-optimizer?cycle=${ja(e.id)}">${ja(Bp(e.goal))}</a><p class="muted">${ja(e.status)} \xB7 round ${e.currentRound}</p></div><form method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${ja(e.id)}">${r}<button class="btn btn-secondary" type="submit">Delete</button></form></li>`},oN=(e,t)=>e.length===0?'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>':`<section class="card"><h2>History</h2><ul class="sdlc-history">${e.slice(0,20).map(n=>rK(n,t)).join("")}</ul></section>`});var tP,Gp,iN,nK,oK,rP,aN,nP=l(()=>{"use strict";tP=m(require("node:fs")),Gp=m(require("node:path"));Ve();iN=/^[a-z0-9-]+$/,nK=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},oK=(e,t)=>{if(!iN.test(t))return null;let r=e.replace(/^\uFEFF/,""),n=t,o="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let f=nK(p[2]??"");p[1]==="name"&&f.length>0&&(n=f),p[1]==="description"&&(o=f)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:n,description:o,promptText:i}},rP=e=>{let t=Pn(e);if(!t.ok)return[];let r=Gp.default.resolve(t.path,".cursor","skills"),n=[];try{n=tP.default.readdirSync(r)}catch{return[]}return n.filter(o=>iN.test(o)).flatMap(o=>{let s=Gp.default.resolve(r,o,"SKILL.md");if(!s.startsWith(`${r}${Gp.default.sep}`))return[];try{let i=oK(tP.default.readFileSync(s,"utf8"),o);return i===null?[]:[i]}catch{return[]}}).toSorted((o,s)=>o.fileName.localeCompare(s.fileName))},aN=(e,t)=>rP(e).find(r=>r.fileName===t)??null});var lN,Vp,oP=l(()=>{"use strict";x();lN=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,2}$/.test(t)||r<1||r>30?{ok:!1,errorMessage:`Round limit must be a whole number from 1 to ${30}.`}:{ok:!0,maxRounds:r}},Vp=e=>e?.trim()||String(10)});var cN,dN=l(()=>{"use strict";cN={goal:{title:"Goal",practice:"Write the outcome a reader can check. Name who it is for and what must stay true.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Pass score",practice:"The run passes at this score. 90 is the usual bar. Lower it when a useful prompt is enough.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var Da,sK,iK,Se,vn=l(()=>{"use strict";dN();Da=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sK='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>',iK=e=>{let t=cN[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Da(t.title)}" aria-describedby="${r}">${sK}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Da(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Da(t.example)}</span></span></button>`},Se=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Da(r)}"`}>${Da(e)}</span>${iK(t)}</span>`});var uN,pN=l(()=>{"use strict";x();oP();vn();uN=e=>{let t=Vp(e);return`<div class="field">${Se("Round limit","roundLimit")}<input class="input" type="number" name="maxRounds" min="1" max="${30}" step="1" value="${t}"><span class="muted">Stops after this many scored rounds. The usual limit is 10. The run also stops when the score has not risen for 3 rounds.</span></div>`}});var aK,lK,cK,mN,gN=l(()=>{"use strict";x();vn();aK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lK=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=1&&t<=100?t:90},cK=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,mN=e=>{let t=lK(e),r=Math.floor(t/2),n=Math.max(r+1,t-20),o=pa(t).map(i=>i.label).join(" \xB7 "),s=`--sdlc-weak:${r}%;--sdlc-close:${n}%;--sdlc-pass:${t}%`;return`<div class="field sdlc-pass"><div class="sdlc-pass-head">${Se("Pass score","passScore","sdlc-pass-label")}<output class="sdlc-pass-value" data-sdlc-pass-value for="sdlc-pass">${t}</output></div><div class="sdlc-pass-scale" style="${s}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="sdlc-pass" class="sdlc-pass-range" type="range" name="passScore" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="sdlc-pass-label"><span class="sdlc-pass-mark" style="left:${cK(90)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${90}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${aK(o)}</p><p class="muted">The bar fades from a weak score to a pass. The mark is the usual ${90}.</p></div>`}});var fN,dK,hN,yN,SN=l(()=>{"use strict";vn();fN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dK=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),hN=e=>{if(e.length===0)return`<div class="field">${Se("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${fN(r.fileName)}">${fN(r.fileName)}</option>`).join("");return`<div class="field">${Se("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${dK(e)}</script>`},yN=`<script>
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
</script>`});var sP,uK,AN,bN=l(()=>{"use strict";eP();sP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uK=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",AN=e=>{let t=e.wizard;if(t===void 0||t.gate===null)return"";let r=Bp(e.goal),n=uK(t.gate);return`<section class="card sdlc-wizard-resume" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${sP(r)}</h2>
    <p class="lede">Paused at <strong>${sP(n)}</strong>. Continue where you left off or open another run below.</p>
    <div class="actions">
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${sP(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Ha,PN,_N=l(()=>{"use strict";vn();Ha=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),PN=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(o=>`<option value="${Ha(o.id)}"${o.id===e.runner?" selected":""}>${Ha(o.label)}</option>`).join(""),n=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Ha(e.runner)}">Checking ${Ha(e.writers.find(o=>o.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block">
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Se("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${n}</div>
      <div class="field">${Se("Runner instructions","runnerInstructions")}<textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Ha(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div>
    </div>
  </div>`}});var Fo,wN,vN,WN,EN,LN=l(()=>{"use strict";vn();Fo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wN=(e,t,r,n,o)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=n.map(c=>`<option value="${Fo(c.id)}"${c.id===r?" selected":""}>${Fo(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Fo(o)}</option>`;return`<div class="field">${Se(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},vN=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let n=r.find(o=>o.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Fo(t)}">Checking ${Fo(n)}\u2026</p>`},WN=(e,t,r,n)=>`<div class="field">${Se(t,e==="judgeInstructions"?"judgeInstructions":"improverInstructions")}<textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Fo(r)}</textarea><span class="muted">${n}</span></div>`,EN=e=>{let t=`<div class="sdlc-writer">${wN("judge","Judge",e.judge,e.writers,"I'll score it")}${vN("judge",e.judge,e.writers)}${WN("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.")}</div>`,r=`<div class="sdlc-writer">${wN("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${vN("improver",e.improver,e.writers)}${WN("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var $o,RN,kN=l(()=>{"use strict";xa();Vb();XO();QO();mp();tN();nN();sN();nP();pN();gN();SN();vn();qb();bN();_N();LN();$o=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RN=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${$o(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${$o(e.skillNotice??"")}</div>`,n=`${o0}${s0}`,o=e.resumableWizardCycle??null,s=o===null?"":AN(o),i=Mp(e.cycle),a=e.cycle===null?"":Np(e.cycle),c=e.cycle!==null&&kt(e.cycle),d=rN(e),p=c?"Waiting for you":d.running?"Running\u2026":"Run",f=EN({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),b=PN({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Classic loop skips the wizard. Instructions are optional.",y=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",S=`<section class="card sdlc-compose" id="prompt-optimizer-compose">
      <div class="sdlc-form-head">
        <a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>
      </div>
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${d.running?"":" open"}>
        <summary class="sdlc-compose-summary"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</summary>
      <p class="lede">${h} ${$o(e.modelNote)}</p>
      <form class="sdlc-form" method="POST" action="/prompt-optimizer">
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${y}
        <div class="sdlc-block">
          <p class="sdlc-block-title">Prompt and goal</p>
          <div class="field">
            ${Se("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${$o(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Se("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${$o(d.prompt)}</textarea>
          </div>
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Folder</p>
          <div class="sdlc-folder">
          <div class="field">
            ${Se("Folder","folder")}
            <input class="input" type="text" name="folder" value="${$o(d.folder)}" onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${hN(rP(d.folder))}
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Judge and improver</p>
          ${f}
        </div>
        ${b}
        <div class="sdlc-block">
          <p class="sdlc-block-title">When to stop</p>
          <div class="sdlc-limits">
            ${mN(d.passScore)}
            ${uN(d.maxRounds)}
          </div>
        </div>
        <div class="sdlc-submit">
          <button class="btn btn-primary" type="submit" name="intent" value="run" data-sdlc-run data-can-run="${e.canRun?"true":"false"}" disabled>${p}</button>
          <button class="btn btn-secondary" type="submit" name="intent" value="run-classic" formnovalidate data-sdlc-run data-can-run="${e.canRun?"true":"false"}" disabled>Classic loop (90 / 10 rounds)</button>
          <p class="muted sdlc-run-hint" data-sdlc-run-hint hidden></p>
        </div>
        </fieldset>
      </form>
      </details>
    </section>`,A=`${""}${YO}${ZO}${eN}${yN}`;return`${t}${r}${S}${s}${a}${i}${n}${oN(e.history,e.cycle?.id??null)}${A}`}});var Fa,iP=l(()=>{"use strict";kN();Fa=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:RN(t)}))}});var TN,CN=l(()=>{"use strict";JO();iP();mt();wn();TN=async(e,t,r)=>{let n=t===null?{kind:"ignored"}:KO({posted:t,storePath:e.storePath});return n.kind==="ignored"?!1:n.kind==="saved"?(xe(e.storePath,n.cycleId),e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(n.cycleId)}`}),e.response.end(),!0):n.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Fa(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:n.cycle.judgeModel,improver:n.cycle.improverModel,folder:"~",passScore:String(n.cycle.passScore),maxRounds:String(n.cycle.maxRounds),canRun:r.canRun,errorMessage:n.errorMessage,skillNotice:null,cycle:n.cycle,history:Et(e.storePath),resumableWizardCycle:null}),!0)}});var xN,qp,aP=l(()=>{"use strict";xN=m(require("node:os"));x();qp=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??xN.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??90,maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var IN,ON=l(()=>{"use strict";IN=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var NN,Uo,lP,MN,jN,$a=l(()=>{"use strict";x();Me();Rb();NN=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Uo=e=>{let t=v0(e),r=_n(e).map(o=>({id:o,label:Pp[o]}));return{note:r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(o=>o.label).join(", ")}.`,canRun:!0,models:t,writers:r,judge:"",improver:"",runner:""}},lP=(e,t,r)=>t===T||t!==null&&e.writers.some(n=>n.id===t)?t:r,MN=(e,t,r,n=null)=>({judge:lP(e,t,e.judge),improver:lP(e,r,e.improver),runner:lP(e,n,e.runner)}),jN=e=>e===gp?{goal:fp,prompt:hp}:{goal:"",prompt:""}});var Kp,cP=l(()=>{"use strict";x();Me();oP();ON();Ve();$a();Kp=e=>{let t=MN(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=e.posted?.get("passScore")??String(90),n=Vp(e.posted?.get("maxRounds")??null),o=e.posted?.get("judgeInstructions")?.trim()??"",s=e.posted?.get("improverInstructions")?.trim()??"",i=e.posted?.get("runnerInstructions")?.trim()??"",a=e.posted?.get("runner")??null,c=(A,g)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:A,passScore:r,maxRounds:n,errorMessage:g,judge:t.judge,improver:t.improver,judgeInstructions:o,improverInstructions:s,runner:t.runner,runnerInstructions:i});if(e.posted===null)return c(e.defaultFolder??bn,null);let d=e.posted.get("folder")??bn;if(e.posted.get("intent")==="choose-folder"){let A=e.pickFolder();return c(A===null?d:Lt(A),null)}let p=e.posted.get("intent")??"";if(p!=="run"&&p!=="run-classic")return c(d,null);let f=NN(e.goal,e.prompt);if(f!==null)return c(d,f);let b=W0(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(b===null)return c(d,"Choose a judge and an improver.");let h=Pn(d);if(!h.ok)return c(d,h.errorMessage);let y=p!=="run-classic",u=y?{ok:!0,passScore:70}:IN(r);if(!u.ok)return c(d,u.errorMessage);let S=y?{ok:!0,maxRounds:5}:lN(n);if(!S.ok)return c(d,S.errorMessage);if(y){let A=E0(e.installedIds,a,b.judge);return A===null?c(d,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:h.path,passScore:u.passScore,maxRounds:S.maxRounds,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:o,improverInstructions:s,useWizard:!0,runner:A,runnerInstructions:i}}return{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:h.path,passScore:u.passScore,maxRounds:S.maxRounds,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:o,improverInstructions:s,useWizard:!1}}});var zo,Yp,mK,dP,DN,Jp,HN,gK,FN,uP,fK,hK,yK,pP,$N,UN,zN=l(()=>{"use strict";zo=m(require("node:fs")),Yp=m(require("node:path"));Me();Ve();mK=["remember","choose-folder","run","run-classic"],dP=()=>({folder:bn,judge:"",improver:"",runner:""}),DN=e=>Yp.default.join(Yp.default.dirname(e),"prompt-optimizer-preferences.json"),Jp=e=>typeof e=="string"?e:"",HN=e=>{let t=DN(e);if(!zo.default.existsSync(t))return dP();try{let r=JSON.parse(zo.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return dP();let n=r,o=Jp(n.folder).trim();return{folder:o.length===0?bn:o,judge:Jp(n.judge),improver:Jp(n.improver),runner:Jp(n.runner)}}catch{return dP()}},gK=(e,t)=>{let r=DN(e);zo.default.mkdirSync(Yp.default.dirname(e),{recursive:!0});let n=`${r}.tmp`;zo.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`),zo.default.renameSync(n,r)},FN=(e,t)=>e===T||_n(t).some(r=>r===e),uP=(e,t,r)=>e===null?t:e.length===0?"":FN(e,r)?e:t,fK=(e,t)=>{if(e===null)return t;let r=Pn(e);return r.ok?r.display:t},hK=e=>{let t=HN(e.storePath),r={folder:fK(e.folder,t.folder),judge:uP(e.judge,t.judge,e.installedIds),improver:uP(e.improver,t.improver,e.installedIds),runner:uP(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||gK(e.storePath,r)},yK=e=>{let t=Pn(e);return t.ok?t.display:bn},pP=(e,t)=>FN(e,t)?e:"",$N=e=>{let t=HN(e.storePath);return{selection:{...e.selection,judge:pP(t.judge,e.installedIds),improver:pP(t.improver,e.installedIds),runner:pP(t.runner,e.installedIds)},defaultFolder:yK(t.folder)}},UN=e=>{let t=e.posted.get("intent")??"";if(!mK.includes(t))return;let r=e.posted.get("folder");hK({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var BN,SK,AK,mP,bK,Xp,Zp=l(()=>{"use strict";BN=m(require("node:os"));Me();Yb();ka();SK="Reply with the single word ok. Do not use tools.",AK=45e3,mP=async(e,t)=>{if(t===T)return{ok:!0,message:"You will do this step."};let r=MO(e,t);if(r!==null)return{ok:!0,message:r};let n=await Ke({writerAgent:t,prompt:SK,workingDirectory:BN.default.tmpdir(),timeoutMs:AK});if(!n.ok)return{ok:!1,message:n.errorMessage};let o=`${qe(t)} is ready.`;return jO(e,t,o),{ok:!0,message:o}},bK=e=>[...new Set(e.filter(t=>t.length>0))],Xp=async(e,t,r,n)=>{for(let o of bK([t,r,n??""])){let s=await mP(e,o);if(!s.ok)return s.message}return null}});var gP,GN=l(()=>{"use strict";gP=(e,t)=>{for(let r of e)if(!(r.wizard===void 0||r.status!=="wizard_paused")&&!(t!==null&&r.id===t))return r;return null}});var VN,qN=l(()=>{"use strict";lt();x();Up();aP();cP();iP();mt();Ve();zN();nP();Zp();GN();wn();VN=async e=>{let t=e.posted===null?$N({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Kp({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Ar("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(UN({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Lt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let n=r.kind==="start"?await Xp(e.route.storePath,r.judge,r.improver,r.useWizard?r.runner:void 0):null;if(r.kind==="start"&&n!==null){await Fa(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Lt(r.workingDirectory),passScore:String(r.passScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:n,skillNotice:e.skillNotice,cycle:null,history:Et(e.route.storePath),resumableWizardCycle:gP(Et(e.route.storePath),null)});return}if(r.kind==="start"){let s=aN(r.workingDirectory,r.sourceSkillFile),i=qp({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,...r.useWizard?{wizard:{...ob(r.prompt),runnerInstructions:r.runnerInstructions},runnerModel:r.runner}:{},...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(B(e.route.storePath,i),xe(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"&&r.useWizard){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(Ho(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let o=e.cycleId===null?null:ne(e.route.storePath,e.cycleId);o!==null&&xe(e.route.storePath,o.id),await Fa(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:o,history:Et(e.route.storePath),resumableWizardCycle:gP(Et(e.route.storePath),o?.id??null)})}});var KN,JN=l(()=>{"use strict";mt();KN=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";g0(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var YN,XN=l(()=>{"use strict";_0();VO();CN();qN();JN();$a();wn();YN=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await $p(),n=Uo(r),o=e.method==="POST"?new URLSearchParams(await e.readBody(e.request)):null;if(GO({posted:o,storePath:e.storePath,response:e.response})||await TN(e,o,n))return;let s=jN(t.searchParams.get("example")),i=KN({posted:o,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=P0({posted:o,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await VN({route:e,posted:o,installedIds:r,selection:n,goal:o?.get("goal")??s.goal,prompt:o?.get("prompt")??s.prompt,skillNotice:b0(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var ZN,QN=l(()=>{"use strict";Up();mt();ZN=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),n=r===null?null:ne(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(n===null?"":Ho(e.storePath,n)),!0}});var PK,eM,tM=l(()=>{"use strict";Me();Zp();PK=["claude-cli","codex","cursor","antigravity"],eM=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let n=t===T||PK.includes(t)?await mP(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(n)),!0}});var rM,nM=l(()=>{"use strict";x();rM=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:ma,page:ga,context:Ro,installedWriters:e,post:{method:"POST",url:ma,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${ma}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var fP,oM=l(()=>{"use strict";x();up();fP=e=>{let t=e.revisions[e.revisions.length-1]??null,r=he(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null}))),n=M(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:n,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:Io(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:Ro,page:`${ga}?cycle=${encodeURIComponent(e.id)}`}}});var Le,_K,sM,iM,aM=l(()=>{"use strict";Le=m(Ss());x();_K=(0,Le.isType)({goal:Le.isString,prompt:Le.isString,workingDirectory:Le.isString,judge:(0,Le.isUndefinedOr)(Le.isString),improver:(0,Le.isUndefinedOr)(Le.isString),passScore:(0,Le.isUndefinedOr)(Le.isNumber),maxRounds:(0,Le.isUndefinedOr)(Le.isNumber)}),sM=e=>{let t=e?.trim()??"";return t.length===0?null:t},iM=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return _K(t)?t.workingDirectory.trim().length===0?{ok:!1,error:tp}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:sM(t.judge),improver:sM(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:tp}}});var wK,lM,cM=l(()=>{"use strict";x();Me();cP();$a();wK=e=>e.map(t=>t.id).join(", "),lM=e=>{let t=Uo(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,n=e.body.judge??r,o=e.body.improver??r;if(n===T||o===T)return{ok:!1,error:nb,installedWriters:t.writers};if(n===null||o===null){let a=wK(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run-classic",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,passScore:e.body.passScore??String(90),maxRounds:e.body.maxRounds??String(10),judge:n,improver:o}),i=Kp({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var dM,uM=l(()=>{"use strict";aP();nM();oM();$a();aM();cM();mt();dM=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=ne(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:fP(c)}}let r=await e.handlers.readInstalledIds(),n=Uo(r);if(e.method==="GET")return{status:200,body:rM(n.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let o=iM(e.rawBody);if(!o.ok)return{status:400,body:{ok:!1,error:o.error,installedWriters:n.writers}};let s=lM({body:o.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:n.writers}};let a=qp({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds});return B(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:fP(a)}}});var pM,mM=l(()=>{"use strict";wn();Zp();uM();pM=async e=>{let t=await dM({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:$p,readWritersReady:Xp,startCycle:xe}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var vK,hP,gM=l(()=>{"use strict";l0();XN();QN();tM();mM();vK=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},hP=async e=>{let t=vK(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await pM(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:a0()})),!0):(await eM({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||ZN({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await YN(e),!0)}});var fM=l(()=>{"use strict";gM()});var Wn,Ua,WK,EK,LK,RK,hM,yM=l(()=>{"use strict";Wn=m(require("node:fs")),Ua=m(require("node:path")),WK="prompt-optimizer-cycles.json",EK="prompt-optimizer-preferences.json",LK="prompt-sdlc-cycles.json",RK="prompt-sdlc-preferences.json",hM=e=>{let t=Ua.default.join(e,WK),r=Ua.default.join(e,LK);if(Wn.default.existsSync(t)||!Wn.default.existsSync(r))return t;try{Wn.default.renameSync(r,t)}catch{return r}let n=Ua.default.join(e,RK),o=Ua.default.join(e,EK);if(Wn.default.existsSync(n)&&!Wn.default.existsSync(o))try{Wn.default.renameSync(n,o)}catch{}return t}});var Bo,kK,yP,SM=l(()=>{"use strict";Bo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kK=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],yP=e=>{let t=kK.map(i=>`<option value="${Bo(i.value)}">${Bo(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Bo(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Bo(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Bo(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Bo(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var za,PM,TK,_M,CK,xK,wM,em,AM,bM,IK,OK,qt,Ba,Qp,NK,tm,SP,MK,AP,vM,bP,WM,jK,DK,HK,EM,LM,RM,Ga=l(()=>{"use strict";za=m(require("node:fs")),PM=m(require("node:path")),TK="estimate-history.ndjson",_M=100,CK=500,xK=2e4,wM=e=>PM.default.join(e,TK),em=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,CK),AM=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,xK),bM=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,IK=e=>({...e,estimateTokens:bM(e.estimateTokens),actualTokens:bM(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),OK=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},qt=e=>{let t=wM(e);return za.default.existsSync(t)?za.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let n=r.trim();if(n.length===0)return[];try{let o=JSON.parse(n);return OK(o)?[IK(o)]:[]}catch{return[]}}):[]},Ba=(e,t)=>{za.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(n=>JSON.stringify(n)).join(`
`)}
`;za.default.writeFileSync(wM(e),r,"utf8")},Qp=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),NK=e=>{let t=e.filter(n=>n.actualSeconds!==null&&n.estimateSeconds!==null&&n.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(n=>`| ${Qp(n.task)} | ${Qp(n.writerLabel)} | ${n.estimateSeconds} | ${n.actualSeconds} |`)].join(`
`)},tm=e=>{let t=qt(e.reportsDir),r=em(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:n?.actualSeconds??null,estimateTokens:n?.estimateTokens??null,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ba(e.reportsDir,[...s,o])},SP=e=>{let t=qt(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),n=new Date().toISOString(),o=e.task!==void 0?em(e.task):"",s={id:e.agentRunId,task:o.length>0?o:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:n,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Ba(e.reportsDir,[...i,s])},MK=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-_M),AP=e=>[...qt(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),vM=e=>{let t=qt(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),n=AM(e.input),o=AM(e.output),s=em(n),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:n.length>0?n:r?.input??"",output:o.length>0?o:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Ba(e.reportsDir,[...c,a])},bP=(e,t)=>{let r=qt(e).find(n=>n.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},WM=e=>({table:NK(MK(qt(e))),embedding:null}),jK=e=>{let t=new Map;for(let n of e){if(n.actualTokens===null)continue;let o=n.writerLabel.trim()||"Writer",s=t.get(o)??[];s.push(n.actualTokens),t.set(o,s)}let r=new Set;for(let[n,o]of t){let s=[...o].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${n}:${i}`)}return e.filter(n=>{let o=n.writerLabel.trim()||"Writer";return!r.has(`${o}:${n.actualTokens}`)})},DK=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-_M),HK=e=>{let t=jK(DK(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let n=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",n.join(". ")+(n.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${Qp(s.task)} | ${Qp(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},EM=e=>{let t=qt(e.reportsDir),r=em(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:n?.writerLabel??"",estimateSeconds:n?.estimateSeconds??null,actualSeconds:n?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ba(e.reportsDir,[...s,o])},LM=e=>{let t=qt(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),n=new Date().toISOString(),o={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:r?.completedAt??n,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ba(e.reportsDir,[...s,o])},RM=e=>HK(qt(e))});var kM=l(()=>{"use strict";Ga()});var Kt,PP,FK,_P,$K,UK,rm,nm,zK,wP,TM=l(()=>{"use strict";kM();Kt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),PP=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let n=Math.floor(t/60),o=t%60;return o===0?`${n} hr`:`${n} hr ${o} min`},FK=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${PP(-r)} under`:`${PP(r)} over`},_P=e=>e.toLocaleString("en-US"),$K=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${_P(-r)} under`:`${_P(r)} over`},UK=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},rm=e=>e===null?"\u2014":PP(e),nm=e=>e===null?"\u2014":_P(e),zK=`(function () {
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
})();`,wP=e=>{let r=AP(e.reportsDir).map((o,s)=>{let i=o.input.trim().length>0?o.input:o.task,a=o.output.trim().length>0?o.output:"\u2014",c=o.writerLabel.trim().length>0?o.writerLabel:"Writer",d=o.estimateSeconds===null||o.actualSeconds===null?"no estimate":FK(o.estimateSeconds,o.actualSeconds),p=o.estimateTokens===null||o.actualTokens===null?"no estimate":$K(o.estimateTokens,o.actualTokens),f=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${f}">
        <td><button type="button" class="history-open">${Kt(UK(i))}</button></td>
        <td>${Kt(c)}</td>
        <td>${rm(o.estimateSeconds)}</td>
        <td>${rm(o.actualSeconds)}</td>
        <td>${Kt(d)}</td>
        <td>${nm(o.estimateTokens)}</td>
        <td>${nm(o.actualTokens)}</td>
        <td>${Kt(p)}</td>
      </tr>`,template:`<template id="${f}">
        <p class="eyebrow">${Kt(c)}</p>
        <h2>Input</h2>
        <pre>${Kt(i)}</pre>
        <h2>Output</h2>
        <pre>${Kt(a)}</pre>
        <p>Time: estimated ${rm(o.estimateSeconds)} \xB7 actual ${rm(o.actualSeconds)} \xB7 ${Kt(d)}</p>
        <p>Tokens: estimated ${nm(o.estimateTokens)} \xB7 actual ${nm(o.actualTokens)} \xB7 ${Kt(p)}</p>
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
        <script>${zK}</script>`}
    </section>`}});var CM=l(()=>{"use strict";SM();TM()});var Go,BK,GK,vP,xM=l(()=>{"use strict";Go=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BK=(e,t,r)=>{let n=Go(t),o=Go(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${n}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${o}</pre>
</article>`},GK=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Go(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((n,o)=>BK(o,n.userPrompt,n.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Go(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Go(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Go(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},vP=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(GK).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var IM=l(()=>{"use strict";xM()});var Va,OM,NM,WP,EP,LP,MM=l(()=>{"use strict";Va=m(require("node:fs")),OM=m(require("node:path"));ea();$u();NM=(e,t,r)=>vo({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,WP=(e,t,r)=>{let n=NM(e,t,r);if(n===null)return[];if(!Va.default.existsSync(n))return[];let o=Va.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},EP=e=>{let t=NM(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Vt(e.entry.prompt),output:Vt(e.entry.output)};Va.default.mkdirSync(OM.default.dirname(t),{recursive:!0}),Va.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},LP=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var VK,qK,qa,om,RP=l(()=>{"use strict";VK=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),qK=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,qa=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let n=[],o=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=VK(i.assistantOutput),d=c.length>0?`Assistant: ${qK(c,t)}`:null,p=[a,d].filter(f=>f!==null).join(`

`);if(p.length!==0){if(o+p.length>r&&n.length>0)break;n.unshift(p),o+=p.length}}return n.join(`

`)},om=e=>{let t=e.userMessage.trim(),r=qa({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Tt,Ka,CP,KK,JK,kP,YK,xP,sm,jM,DM,XK,Vo,IP,TP,HM,ZK,FM,qo,im,Ja,QK,Ya,OP,am,lm,$M=l(()=>{"use strict";Tt=m(require("node:fs")),Ka=m(require("node:path")),CP=require("node:crypto");RP();KK="writer-sessions",JK="active-index.json",kP=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),YK=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",xP=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},sm=e=>{let t=Ka.default.join(e.installDir,KK);return Tt.default.mkdirSync(t,{recursive:!0}),t},jM=e=>Ka.default.join(sm(e),JK),DM=(e,t)=>Ka.default.join(sm(e),`${t}.canonical.json`),XK=(e,t)=>Ka.default.join(sm(e),`${t}.continuation.json`),Vo=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,IP=e=>{let t=jM(e);if(!Tt.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Tt.default.readFileSync(t,"utf8"));if(!kP(r)||!Array.isArray(r.entries))return{entries:[]};let n=[];for(let o of r.entries){if(!kP(o)||typeof o.sessionId!="string")continue;let s=typeof o.writerAgent=="string"?o.writerAgent:"";if(!YK(s))continue;let i=typeof o.projectFolderPath=="string"?o.projectFolderPath:(o.projectFolderPath===null,null);n.push({writerAgent:s,projectFolderPath:i,sessionId:o.sessionId})}return{entries:n}}catch{return{entries:[]}}},TP=(e,t)=>{Tt.default.writeFileSync(jM(e),JSON.stringify(t,null,2))},HM=(e,t)=>{Tt.default.writeFileSync(DM(e,t.sessionId),JSON.stringify(t,null,2))},ZK=(e,t)=>{Tt.default.writeFileSync(XK(e,t.sessionId),JSON.stringify(t,null,2))},FM=(e,t)=>{let r=qa({turns:t.turns});ZK(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},qo=(e,t)=>{let r=DM(e,t);if(!Tt.default.existsSync(r))return null;try{let n=JSON.parse(Tt.default.readFileSync(r,"utf8"));return!kP(n)||typeof n.sessionId!="string"?null:n}catch{return null}},im=(e,t=20)=>{let r=sm(e),n=Tt.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),o=[];for(let s of n){let i=s.name.replace(/\.canonical\.json$/,""),a=qo(e,i);a!==null&&o.push(a)}return o.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Ja=(e,t,r)=>{let n=xP(r);return IP(e).entries.find(i=>Vo(i)===Vo({writerAgent:t,projectFolderPath:n}))?.sessionId??null},QK=(e,t,r,n)=>{let o=IP(e),s=Vo({writerAgent:t,projectFolderPath:r}),i=[...o.entries.filter(a=>Vo(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:n}];TP(e,{entries:i})},Ya=(e,t,r)=>{let n=(0,CP.randomUUID)(),o=new Date().toISOString(),s=xP(r),i={sessionId:n,writerAgent:t,projectFolderPath:s,turns:[],createdAt:o,updatedAt:o};return HM(e,i),FM(e,i),QK(e,t,s,n),n},OP=(e,t,r)=>{let n=Ja(e,t,r);return n!==null?n:Ya(e,t,r)},am=(e,t,r)=>{let n=xP(r),o=IP(e);if(n===null&&r===void 0){TP(e,{entries:o.entries.filter(i=>i.writerAgent!==t)});return}let s=Vo({writerAgent:t,projectFolderPath:n});TP(e,{entries:o.entries.filter(i=>Vo(i)!==s)})},lm=e=>{let t=OP(e.layout,e.writerAgent,e.projectFolderPath),r=qo(e.layout,t);if(r===null)return;let n={id:(0,CP.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},o={...r,turns:[...r.turns,n],updatedAt:n.createdAt};HM(e.layout,o),FM(e.layout,o)}});var e8,t8,cm,NP,UM=l(()=>{"use strict";e8=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",t8=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},cm=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",NP=e=>{let t=cm(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",n=e8(r,e.userPromptCharacterCount),o=t8({contextBudget:n,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:n,...o}}});var dm=l(()=>{"use strict";MM();$M();RP();UM()});var zM=l(()=>{"use strict";ih()});var je,n8,o8,MP,jP,DP,BM=l(()=>{"use strict";ae();zM();je=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n8=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},o8=(e,t,r)=>{let n=e[t]?.apiKey;if(n!==void 0&&n.length>0){let o=_d(n);return`value="${je(o)}" placeholder="Paste a new key to replace"`}return`placeholder="${je(r)}"`},MP=(e,t,r,n,o)=>{let s=Oh[t];return`<label class="field">
          <span class="field-label">${je(n)} API key \u2014 ${je(n8(e,t))} \xB7 <a class="field-link" href="${je(s.href)}" target="_blank" rel="noopener noreferrer">${je(s.label)}</a></span>
          <input class="input mono" type="password" name="${je(r)}" autocomplete="off" ${o8(e,t,o)} />
        </label>`},jP=(e,t,r,n)=>{let o=ah(e[t]?.model),s=new Set(gd[t].map(c=>c.value)),i=gd[t].map(c=>{let d=c.value===o?" selected":"";return`<option value="${je(c.value)}"${d}>${je(c.label)}</option>`}).join(""),a=o!==Yr&&!s.has(o)?`<option value="${je(o)}" selected>${je(o)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${je(n)}</span>
          <select class="input mono" name="${je(r)}">${i}${a}</select>
        </label>`},DP=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${je(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",n=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${MP(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${jP(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${MP(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${jP(e.secrets,"openai","openaiModel","OpenAI model")}
        ${MP(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${jP(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var GM=l(()=>{"use strict";BM()});var um,VM,qM=l(()=>{"use strict";um=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VM=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${um(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Console \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let n=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${um(s.name)}</strong> <span class="muted mono">(${um(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),o=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${um(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${o}
      <ul class="harness-installed-set-list">${n}</ul>
    </section>`}});var s8,KM,JM,YM=l(()=>{"use strict";s8=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,KM=e=>e.kind==="folder",JM=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let d=s.children.get(a);if(d!==void 0&&KM(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=n=>{let o=[];for(let s of n.children.values()){if(KM(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(s8)};return r(t)}});var XM,HP,ZM=l(()=>{"use strict";XM=m(require("node:path")),HP=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${HP(r.children,t)}</ul>
            </details>
          </li>`;let n=XM.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var QM,Wr,i8,a8,Xa,l8,FP,ej=l(()=>{"use strict";Vu();QM=m(require("node:path"));qM();YM();ZM();Wr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),i8=()=>`(() => {
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

})();`,a8=()=>`(() => {
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
})();`,Xa=e=>{let t=sa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=VM({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),n=e.flashError?`<div class="alert-error">${Wr(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Wr(e.flashMessage)}</div>`:"",o=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':l8(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Wr(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Wr(s)}" />
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
    <script>${i8()}</script>
    <script>${a8()}</script>`;return`${t}${r}${n}${c}${d}`},l8=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let d=JM(a.items.map(b=>({...b,relativePath:typeof b.relativePath=="string"&&b.relativePath.length>0?b.relativePath:QM.default.relative(a.sourceRoot,b.sourcePath).replaceAll("\\","/")}))),p=HP(d,Wr),f=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Wr(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Wr(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${f} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Wr(n)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},FP=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&o.set(d,p)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?o.get(d):void 0,f=e.get(`setName-${i}`)?.trim()??p??a,b=t.sets[i];if(b===void 0)continue;let h=a.length>0?a:b.proposedSlug,y=f.length>0?f:b.proposedName,u=r.has(i),S=b.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:u}));s.push({slug:h,name:y,items:S})}return s}});var tj=l(()=>{"use strict";ej()});var c8,$P,rj=l(()=>{"use strict";Sr();c8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Ne]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null||n.ok!==!0)return null;let o=n;return{counts:{harness:Number(o.counts?.harness??0),workflow:Number(o.counts?.workflow??0),agent:Number(o.counts?.agent??0)},items:Array.isArray(o.items)?o.items:[]}}catch{return null}},$P=c8});var d8,nj,oj=l(()=>{"use strict";Sr();d8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Ne]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let n=await r.json();return typeof n!="object"||n===null||n.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof n.promotedCount=="number"?n.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},nj=d8});var sj=l(()=>{"use strict"});var Za,u8,UP,ij=l(()=>{"use strict";Vu();Za=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),u8=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,UP=e=>{let t=e.flashError?`<div class="alert-error">${Za(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Za(e.flashMessage)}</div>`:"",r=sa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),n=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(o=>{let s=e.compositionCountsByProjectId?.[o.id],i=s!==void 0?`<span class="muted">${Za(u8(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(o.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(o.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(o.id)}">
                  <strong>${Za(o.name)}</strong>
                  <span class="muted mono">${Za(o.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${n}
    </section>`}});var aj=l(()=>{"use strict";sj();$y();ij()});var pm,lj=l(()=>{"use strict";pm=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var cj,Jt,zP=l(()=>{"use strict";cj=m(require("node:path"));Ft();St();z();ae();ze();Jt=e=>{let t=H()?.layout.installDir??E();if(cj.default.basename(t)===Nr)return Dt;let r=H(),n=r!==null?we(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):Dt}});var BP,dj=l(()=>{"use strict";ze();zP();BP=async e=>{let t=_e(e.installDir),r=t?.bundleVersion??null,n=Jt(t);try{let o=await Xn(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Br(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var GP,uj=l(()=>{"use strict";GP=e=>!e});var VP,Ko,qP=l(()=>{"use strict";z();VP=()=>`http://127.0.0.1:${sf()}/update/run`,Ko=async e=>{try{let t=await fetch(VP(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var p8,pj,KP,mj=l(()=>{"use strict";z();Q();qP();p8=()=>{Mt({launchAgentLabel:te(),installDir:E()})},pj=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},KP=async()=>{p8();let e=await Ko({force:!0});if(e.ok)return{ok:!0,message:pj(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:pj(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(ze(),ZE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var JP=l(()=>{"use strict";CA();lj();zP();dj();uj();mj();qP()});var gj,fj=l(()=>{"use strict";gj=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var hj,yj,YP,XP,Sj=l(()=>{"use strict";hj=require("node:crypto"),yj=m(require("node:fs"));lt();ae();ae();fj();YP=!1,XP=async e=>{if(YP)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!gj(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&yj.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,hj.randomUUID)();YP=!0;try{if(await xy(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await oo({...r,workspace:o},e.writerAgent,t);return await Ei(n,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{YP=!1}}});var Aj=l(()=>{"use strict";Sj()});var Je,m8,bj,Pj,ZP,QP,e_,t_,r_,n_,o_=l(()=>{"use strict";Je=require("node:crypto"),m8=Buffer.from("302a300506032b6570032100","hex"),bj=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},Pj=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Je.createPublicKey)({key:Buffer.concat([m8,t]),format:"der",type:"spki"})},ZP=()=>{let{publicKey:e,privateKey:t}=(0,Je.generateKeyPairSync)("ed25519");return{publicKeyRaw:bj(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},QP=e=>(0,Je.createPrivateKey)(e),e_=(e,t)=>(0,Je.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),t_=(e,t,r)=>{try{let n=Pj(e);return(0,Je.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},r_=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,n_=()=>(0,Je.randomBytes)(32).toString("base64url")});var Yt,mm,_j,g8,f8,gm,s_,i_,wj=l(()=>{"use strict";Yt=m(require("node:fs")),mm=m(require("node:path"));o_();z();St();_j=e=>mm.default.join(e.installDir,ir),g8=(e,t)=>{if(e.profileEmail===null||t===_j(e)||Yt.default.existsSync(t))return;let r=_j(e);Yt.default.existsSync(r)&&(Yt.default.mkdirSync(mm.default.dirname(t),{recursive:!0}),Yt.default.renameSync(r,t))},f8=e=>{if(!Yt.default.existsSync(e))return null;try{let t=Yt.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},gm=e=>{let t=Uc(e);g8(e,t);let r=f8(t);if(r!==null)return r;let n=ZP();return Yt.default.mkdirSync(mm.default.dirname(t),{recursive:!0}),Yt.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},s_=e=>{let t=gm(e.layout),r=n_(),n=r_({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=QP(t.privateKeyPem),s=e_(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},i_=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return t_(e.serverPublicKey,t,e.serverAttestation)}});var a_=l(()=>{"use strict";wj();o_()});var Lj,Qa,d_,u_,vj,h8,l_,fm,oe,Rj,y8,c_,S8,A8,p_,le,Ae,Xt,b8,Wj,Ej,el,tl,kj=l(()=>{"use strict";Lj=m(require("node:http")),Qa=m(require("node:fs")),d_=m(require("node:path"));hm();Xi();ZC();ex();ix();fo();oA();RA();jx();Hx();fM();yM();CM();IM();dm();GM();tj();rn();lt();Sr();rj();oj();aj();JP();ze();Aj();ae();a_();u_=e=>VS(e)??"never",vj=48e3,h8=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,l_=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Yd(),reveal:t.reveal,installed:yr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),fm=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:uo(t,e)},oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rj=200,y8=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',c_=e=>{let t=e.trim().slice(0,Rj),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},S8=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${oe(t)}</div>`,A8=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${oe(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',p_={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},le=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...p_}),e.end(JSON.stringify(r))},Ae=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Xt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},b8=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=y8(e.healthBadge),n=e.status.wakeError?`<div class="alert-error">${oe(e.status.wakeError)}</div>`:"",o=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=GP(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Zi(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${oe(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${oe(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${oe(u_(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${oe(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${s}
    </section>`},Wj=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},Ej=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,Rj)},el=e=>{let t=d_.default.join(e.layout.installDir,"link-code.txt"),r=()=>_e(e.layout.installDir),n=()=>{let h=r();return{installBundleVersion:pm(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},o=async h=>{let y=h.installVersion??r(),u=await i(),S=NA(u),A=h.updateFlash??null,g=MA(A),_=S8(A,h.updateError??null);return IA({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:Jt(y),installBundleVersionLabel:pm(y),prependBody:`${g}${_}${S}`,headerUpdateButtonHtml:OA(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await BP(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:c_("An update is already running.")}),h.end();return}c=!0;try{let u=await KP(),S=u.ok?"/?update=ok":c_(u.message);h.writeHead(303,{Location:S}),h.end()}catch(u){let S=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:c_(S)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",S=n(),A=await o({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:S.installVersion,body:`<section class="card">
      <h1>${oe(y)}</h1>
      <p>${oe(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(A)},f=()=>{if(Qa.default.existsSync(t))return Qa.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return Qa.default.writeFileSync(t,h,"utf8"),h},b=Lj.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",S=h.method??"GET";if(S==="OPTIONS"){y.writeHead(204,p_),y.end();return}if(!await hP({method:S,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:hM(d_.default.dirname(e.layout.configPath)),readBody:Xt,sendHtml:Ae,renderShell:o})){if(S==="GET"&&u==="/health"){let A=e.controllers.getStatus(),g=n();le(y,200,{ok:!0,...A,installBundleVersion:g.installBundleVersion,installBundleUpdatedAt:g.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/status"){let A=n();le(y,200,{...e.controllers.getStatus(),linkCode:f(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/traffic"){le(y,200,{entries:Ji(e.layout)});return}if(S==="DELETE"&&u==="/api/traffic"||S==="POST"&&u==="/api/traffic/clear"){if(JS(e.layout),S==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}le(y,200,{ok:!0});return}if(S==="GET"&&u==="/api/trace"){le(y,200,{entries:ju(e.layout)});return}if(S==="DELETE"&&u==="/api/trace"||S==="POST"&&u==="/api/trace/clear"){if(ZS(e.layout),S==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}le(y,200,{ok:!0});return}if(S==="POST"&&u==="/api/errors/clear"){QS(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(S==="GET"&&u==="/api/knowledge"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(g.length>0){let _=await Eo({layout:e.layout,query:g,limit:20});le(y,200,{chunks:_,query:g});return}le(y,200,{chunks:Wo(e.layout).slice(-50).reverse()});return}if(S==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(S==="GET"&&u==="/api/update-status"){let A=await i();le(y,200,{ok:!0,...A});return}if((S==="GET"||S==="POST")&&u==="/api/update"){await d(y);return}if(S==="GET"&&u==="/"){let A=e.controllers.getStatus(),g=n(),_=yr(e.layout),w=Du(e.layout.errorLogPath);Ae(y,await o({title:"Home",activePath:"/",installVersion:g.installVersion,updateFlash:Wj(h.url??void 0),updateError:Ej(h.url??void 0),body:jA({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:g.installBundleVersion,harnessSetCount:_.sets.length,knowledgeChunkCount:Wo(e.layout).length,trafficEntryCount:Ji(e.layout).length,wakeError:A.wakeError,errorLogByteSize:w.byteSize,errorLogExists:w.exists})}));return}if(S==="GET"&&u==="/task"){let A=e.controllers.getStatus(),g=n(),_=H(),w=new URL(h.url??"/",`http://127.0.0.1:${43347}`),W=w.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=w.searchParams.get("failed")==="1"?w.searchParams.get("error")?.trim()??"Task failed.":null,R=w.searchParams.get("runId");Ae(y,await o({title:"Task",activePath:"/task",installVersion:g.installVersion,body:yP({defaultWorkspace:_?.workspace??"",wsConnected:A.wsConnected,flashMessage:W,flashError:L,lastRunId:R})}));return}if(S==="POST"&&u==="/task/dispatch"){let A=await Xt(h),g=new URLSearchParams(A),_=g.get("prompt")?.trim()??"",w=g.get("writerAgent")?.trim()??"claude-cli",W=g.get("projectFolder")?.trim()??"",L=await XP({prompt:_,writerAgent:w,...W.length>0?{projectFolderPath:W}:{}}),R=new URLSearchParams;L.ok?R.set("ok","1"):(R.set("failed","1"),L.errorMessage!==void 0&&R.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&R.set("runId",L.agentRunId),y.writeHead(303,{Location:`/task?${R.toString()}`}),y.end();return}if(S==="GET"&&u==="/writer-sessions"){let A=n(),g=im(e.layout,12);Ae(y,await o({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:Wj(h.url??void 0),updateError:Ej(h.url??void 0),body:vP({sessions:g})}));return}if(S==="GET"&&u==="/errors"){let A=n(),g=Du(e.layout.errorLogPath);Ae(y,await o({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:tA({errorLogPath:e.layout.errorLogPath,content:g.content,exists:g.exists,truncated:g.truncated,byteSize:g.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(S==="GET"&&u==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=e.controllers.getStatus(),_=ge(e.layout),w=_!==null?Te(_,12e4):sA(g.lastHeartbeatAt,12e4),W=iA({lastHeartbeatAt:g.lastHeartbeatAt,heartbeatIsStale:w}),L=n();Ae(y,await o({title:"Status",activePath:"/status",installVersion:L.installVersion,body:`${b8({status:g,healthBadge:W,revived:A.searchParams.get("revived")==="1",linkCode:f(),installBundleVersion:L.installBundleVersion,installBundleUpdatedAt:L.installBundleUpdatedAt})}${cA({installDir:e.layout.installDir})}${lA({entries:ju(e.layout)})}`}));return}if(S==="GET"&&u==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=Ji(e.layout),_=n(),w=g.map(R=>`<tr><td title="${oe(R.at)}">${oe(u_(R.at))}</td><td>${oe(R.direction)}</td><td><code>${oe(R.type)}</code></td><td>${oe(R.summary)}</td><td>${oe(R.action??"")}</td></tr>`).join(""),W=g.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${w}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',L=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ae(y,await o({title:"Traffic",activePath:"/traffic",installVersion:_.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${L}
              ${W}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(S==="GET"&&u==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=n(),_=Jt(g.installVersion),w=await fm(e.layout),W=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,L=H(),R=L===null?null:Y({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),k=R===null?{}:Object.fromEntries((await Promise.all(w.projects.map(async C=>{let D=await $P(R,C.id);return[C.id,D?.counts??null]}))).filter(C=>C[1]!==null));Ae(y,await o({title:"Projects",activePath:"/projects",installVersion:g.installVersion,body:UP({projects:w.projects,compositionCountsByProjectId:k,cloudAppOrigin:_,syncMessage:w.message,syncOk:w.ok,flashMessage:null,flashError:W})}));return}if(S==="GET"&&u==="/projects/select-folder"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",_=H(),w=_===null?null:Y({wsUrl:_.wsUrl,pairingToken:_.pairingToken}),W=g.length>0&&w!==null?Ar():null;if(W===null||w===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if($e({projectFolderPath:W}),!await Ti(w,g,W)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(g)}&folderUpdated=1`}),y.end();return}if(S==="GET"&&u==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=A.searchParams.get("id")?.trim()??"",_=n(),w=await fm(e.layout),W=an(w.projects,g);if(W===null){await p(y,"Project not found");return}let L=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,R=A.searchParams.get("knowledgePromoted"),k=R!==null?`Marked ${R} lesson(s) as promoted in Agent Witch.`:null,C=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,D=A.searchParams.get("tab")?.trim()??"harness",ee=D==="workflows"||D==="agents"||D==="knowledge"?D:"harness",J=H(),V=J===null?null:Y({wsUrl:J.wsUrl,pairingToken:J.pairingToken}),ds=V===null?null:await $P(V,W.id),F=0;if(V!==null)try{let Ie=await fetch(`${V.appOrigin}/api/agent-witch/projects/${encodeURIComponent(W.id)}/knowledge`,{method:"GET",headers:{[Ne]:V.pairingToken},signal:AbortSignal.timeout(1e4)});if(Ie.ok){let Tr=await Ie.json();typeof Tr=="object"&&Tr!==null&&typeof Tr.candidateCount=="number"&&(F=Tr.candidateCount)}}catch{F=0}Ae(y,await o({title:W.name,activePath:"/projects",installVersion:_.installVersion,body:po({project:W,installed:yr(e.layout),linkedSetSlugs:fr(W.projectFolderPath),composition:ds,knowledgeCandidateCount:F,activeTab:ee,flashMessage:L??k,flashError:C})}));return}if(S==="POST"&&u==="/projects/pull-bound-harness"){let A=await Xt(h),g=await Uy({rawBody:A,layout:e.layout});if(g.kind==="not_found"){await p(y,"Project not found");return}if(g.kind==="redirect"){y.writeHead(303,{Location:g.location}),y.end();return}let _=n();Ae(y,await o({title:g.title,activePath:"/projects",installVersion:_.installVersion,body:g.body}));return}if(S==="POST"&&u==="/projects/link-harness"){let A=await Xt(h),g=new URLSearchParams(A),_=g.get("projectId")?.trim()??"",w=await fm(e.layout),W=an(w.projects,_);if(W===null){await p(y,"Project not found");return}let L=g.getAll("applySet").map(J=>String(J)),R=yi({layout:e.layout,projectFolderPath:W.projectFolderPath,setSlugs:L});if(!R.ok){let J=n();Ae(y,await o({title:W.name,activePath:"/projects",installVersion:J.installVersion,body:po({project:W,installed:yr(e.layout),linkedSetSlugs:fr(W.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:R.errorMessage})}));return}let k=H(),C=k===null?null:Y({wsUrl:k.wsUrl,pairingToken:k.pairingToken}),D=C===null?!1:await Ri(C,W.id,R.appliedSetSlugs),ee=new URLSearchParams({linked:"1",files:String(R.writtenFileCount),bindingsSynced:D?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${ee.toString()}`}),y.end();return}if(S==="POST"&&u==="/project/knowledge/promote-all"){let A=await Xt(h),_=new URLSearchParams(A).get("projectId")?.trim()??"",w=await fm(e.layout),W=an(w.projects,_);if(W===null){await p(y,"Project not found");return}let L=H(),R=L===null?null:Y({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),k=R===null?{ok:!1,promotedCount:0}:await nj(R,W.id),C=new URLSearchParams({tab:"knowledge",...k.ok?{knowledgePromoted:String(k.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${C.toString()}`}),y.end();return}if(S==="GET"&&u==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=n(),_=Pi(e.layout),w=A.searchParams.get("submitted")==="1",W=w?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${_?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${_?.sets.length??0} set(s).`:null,L=_?.scanRoots[0]??Yd(),R=h8(e.layout,{reveal:_,importQuery:A.searchParams.get("import")==="1",justSubmitted:w}),k=Jt(g.installVersion);Ae(y,await o({title:"Harness",activePath:"/harness",installVersion:g.installVersion,body:Xa(l_(e.layout,{cloudAppOrigin:k,reveal:_,scanFolder:L,flashMessage:W,importSectionExpanded:R}))}));return}if(S==="POST"&&u==="/api/harness/pick-folder"){let A=Ar();if(A===null){le(y,200,{cancelled:!0});return}le(y,200,{path:A});return}if(S==="GET"&&u==="/api/harness/file-content"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",_=hi(g);if(_===null){le(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let w=Qa.default.readFileSync(_,"utf8"),W=w.length>vj?`${w.slice(0,vj)}
\u2026 (truncated)`:w;le(y,200,{content:W})}catch{le(y,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&u==="/api/harness/reveal/add-project"){let A=await Xt(h),g="";try{let W=JSON.parse(A);typeof W=="object"&&W!==null&&typeof W.projectPath=="string"&&(g=W.projectPath.trim())}catch{le(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(g.length===0){le(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let _=Pi(e.layout),w=_y({reveal:_,projectPath:g});if(w===null||w.sets.length===0){le(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}eu(e.layout,w),le(y,200,{ok:!0,setCount:w.sets.length});return}if(S==="GET"&&u==="/api/harness/reveal/stream"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(g.length===0){le(y,400,{errorMessage:"Choose a folder to scan first."});return}let _=!1;h.on("close",()=>{_=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...p_});let w=wy({scanRoot:g,response:y,shouldAbort:()=>_});eu(e.layout,w),y.end();return}if(S==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&u==="/harness/submit"){let A=Pi(e.layout);if(A===null){let k=n(),C=Jt(k.installVersion);Ae(y,await o({title:"Harness",activePath:"/harness",installVersion:k.installVersion,body:Xa(l_(e.layout,{cloudAppOrigin:C,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let g=await Xt(h),_=new URLSearchParams(g),w=FP(_,A),W=Wy({layout:e.layout,sets:w});if(!W.ok){let k=n(),C=Jt(k.installVersion);Ae(y,await o({title:"Harness",activePath:"/harness",installVersion:k.installVersion,body:Xa(l_(e.layout,{cloudAppOrigin:C,reveal:A,flashError:W.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}Ly(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${W.writtenItemCount??0}${R}`}),y.end();return}if(S==="GET"&&u==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=H()?.writerExecutionBackend??ve(void 0),w=me(e.layout.configPath),W=ur(w),L=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=n();Ae(y,await o({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:DP({writerExecutionBackend:_,secrets:W,flashMessage:L})}));return}if(S==="POST"&&u==="/writer-api"){let A=await Xt(h),g=new URLSearchParams(A),_=g.get("writerExecutionBackend")?.trim()??"cli";Ih({configPath:e.layout.configPath,writerExecutionBackend:ve(_),anthropicApiKey:g.get("anthropicApiKey")??void 0,anthropicModel:g.get("anthropicModel")??void 0,openaiApiKey:g.get("openaiApiKey")??void 0,openaiModel:g.get("openaiModel")??void 0,googleApiKey:g.get("googleApiKey")??void 0,googleModel:g.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(S==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(S==="GET"&&u==="/history"){let A=n();Ae(y,await o({title:"History",activePath:"/history",installVersion:A.installVersion,body:wP({reportsDir:e.layout.reportsDir})}));return}if(S==="GET"&&u==="/knowledge"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",_=n(),w=hA({layout:e.layout}),W=AA(w),L=g.length>0?await Eo({layout:e.layout,query:g,limit:20}):Wo(e.layout).slice(-50).reverse(),R=L.map(C=>{let D=SA(w,C.id),ee=D>0?` \xB7 used in ${D} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${oe(C.createdAt)}">${oe(u_(C.createdAt))}${C.source?` \xB7 ${oe(C.source)}`:""}${ee}</div><pre>${oe(C.text)}</pre></article>`}).join(""),k=W.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${W.map(C=>`<li><strong>P${C.priority}</strong> \u2014 ${oe(C.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Ae(y,await o({title:"Knowledge",activePath:"/knowledge",installVersion:_.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${oe(g)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${k}${R}${A8(g,L.length)}`}));return}S==="POST"&&await Xt(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return b.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),b.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Ht}`)}),b},tl=e=>gm(e).publicKeyRaw});var hm=l(()=>{"use strict";MC();jC();kj()});var Cj={};ht(Cj,{runAgentWitchExternalLiveCli:()=>_8});var m_,Tj,P8,_8,xj=l(()=>{"use strict";m_=m(require("node:fs")),Tj=m(require("node:path"));fo();z();Q();hm();Q();P8=e=>{let t=Tj.default.join(e,"link-code.txt");if(!m_.default.existsSync(t))return null;let r=m_.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},_8=()=>{He("agent-witch-live");let e=E(),t=O(),r=P8(e),n=tl(t);el({layout:t,controllers:{getStatus:()=>{let o=ge(t);return{wsConnected:Hi(t,{socketOpen:!0}),lastHeartbeatAt:o?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:n}},reviveWebSocket:()=>{Fr(e)}}})}});var Zt=v((_Pe,Nj)=>{"use strict";var Ij=["nodebuffer","arraybuffer","fragments"],Oj=typeof Blob<"u";Oj&&Ij.push("blob");Nj.exports={BINARY_TYPES:Ij,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:Oj,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var rl=v((wPe,ym)=>{"use strict";var{EMPTY_BUFFER:w8}=Zt(),g_=Buffer[Symbol.species];function v8(e,t){if(e.length===0)return w8;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new g_(r.buffer,r.byteOffset,n):r}function Mj(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function jj(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function W8(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function f_(e){if(f_.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new g_(e):ArrayBuffer.isView(e)?t=new g_(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),f_.readOnly=!1),t}ym.exports={concat:v8,mask:Mj,toArrayBuffer:W8,toBuffer:f_,unmask:jj};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");ym.exports.mask=function(t,r,n,o,s){s<48?Mj(t,r,n,o,s):e.mask(t,r,n,o,s)},ym.exports.unmask=function(t,r){t.length<32?jj(t,r):e.unmask(t,r)}}catch{}});var Fj=v((vPe,Hj)=>{"use strict";var Dj=Symbol("kDone"),h_=Symbol("kRun"),y_=class{constructor(t){this[Dj]=()=>{this.pending--,this[h_]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[h_]()}[h_](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[Dj])}}};Hj.exports=y_});var Xo=v((WPe,Bj)=>{"use strict";var nl=require("zlib"),$j=rl(),E8=Fj(),{kStatusCode:Uj}=Zt(),L8=Buffer[Symbol.species],R8=Buffer.from([0,0,255,255]),Am=Symbol("permessage-deflate"),Qt=Symbol("total-length"),Jo=Symbol("callback"),Er=Symbol("buffers"),Yo=Symbol("error"),Sm,S_=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Sm){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Sm=new E8(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Jo];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){Sm.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){Sm.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?nl.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=nl.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Am]=this,this._inflate[Qt]=0,this._inflate[Er]=[],this._inflate.on("error",T8),this._inflate.on("data",zj)}this._inflate[Jo]=n,this._inflate.write(t),r&&this._inflate.write(R8),this._inflate.flush(()=>{let s=this._inflate[Yo];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=$j.concat(this._inflate[Er],this._inflate[Qt]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Qt]=0,this._inflate[Er]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?nl.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=nl.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Qt]=0,this._deflate[Er]=[],this._deflate.on("data",k8)}this._deflate[Jo]=n,this._deflate.write(t),this._deflate.flush(nl.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=$j.concat(this._deflate[Er],this._deflate[Qt]);r&&(s=new L8(s.buffer,s.byteOffset,s.length-4)),this._deflate[Jo]=null,this._deflate[Qt]=0,this._deflate[Er]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};Bj.exports=S_;function k8(e){this[Er].push(e),this[Qt]+=e.length}function zj(e){if(this[Qt]+=e.length,this[Am]._maxPayload<1||this[Qt]<=this[Am]._maxPayload){this[Er].push(e);return}this[Yo]=new RangeError("Max payload size exceeded"),this[Yo].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Yo][Uj]=1009,this.removeListener("data",zj),this.reset()}function T8(e){if(this[Am]._inflate=null,this[Yo]){this[Jo](this[Yo]);return}e[Uj]=1007,this[Jo](e)}});var Zo=v((EPe,bm)=>{"use strict";var{isUtf8:Gj}=require("buffer"),{hasBlob:C8}=Zt(),x8=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function I8(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function A_(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function O8(e){return C8&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}bm.exports={isBlob:O8,isValidStatusCode:I8,isValidUTF8:A_,tokenChars:x8};if(Gj)bm.exports.isValidUTF8=function(e){return e.length<24?A_(e):Gj(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");bm.exports.isValidUTF8=function(t){return t.length<32?A_(t):e(t)}}catch{}});var v_=v((LPe,Zj)=>{"use strict";var{Writable:N8}=require("stream"),Vj=Xo(),{BINARY_TYPES:M8,EMPTY_BUFFER:qj,kStatusCode:j8,kWebSocket:D8}=Zt(),{concat:b_,toArrayBuffer:H8,unmask:F8}=rl(),{isValidStatusCode:$8,isValidUTF8:Kj}=Zo(),Pm=Buffer[Symbol.species],Ye=0,Jj=1,Yj=2,Xj=3,P_=4,__=5,_m=6,w_=class extends N8{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||M8[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[D8]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Ye}_write(t,r,n){if(this._opcode===8&&this._state==Ye)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Pm(n.buffer,n.byteOffset+t,n.length-t),new Pm(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new Pm(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Ye:this.getInfo(t);break;case Jj:this.getPayloadLength16(t);break;case Yj:this.getPayloadLength64(t);break;case Xj:this.getMask();break;case P_:this.getData(t);break;case __:case _m:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[Vj.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=Jj:this._payloadLength===127?this._state=Yj:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=Xj:this._state=P_}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=P_}getData(t){let r=qj;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&F8(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=__,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[Vj.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Ye&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Ye;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=b_(n,r):this._binaryType==="arraybuffer"?o=H8(b_(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=Ye):(this._state=_m,setImmediate(()=>{this.emit("message",o,!0),this._state=Ye,this.startLoop(t)}))}else{let o=b_(n,r);if(!this._skipUTF8Validation&&!Kj(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===__||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=Ye):(this._state=_m,setImmediate(()=>{this.emit("message",o,!1),this._state=Ye,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,qj),this.end();else{let n=t.readUInt16BE(0);if(!$8(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new Pm(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!Kj(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=Ye;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Ye):(this._state=_m,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Ye,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[j8]=o,i}};Zj.exports=w_});var L_=v((kPe,tD)=>{"use strict";var{Duplex:RPe}=require("stream"),{randomFillSync:U8}=require("crypto"),{types:{isUint8Array:z8}}=require("util"),Qj=Xo(),{EMPTY_BUFFER:B8,kWebSocket:G8,NOOP:V8}=Zt(),{isBlob:Qo,isValidStatusCode:q8}=Zo(),{mask:eD,toBuffer:En}=rl(),Xe=Symbol("kByteLength"),K8=Buffer.alloc(4),wm=8*1024,Ln,es=wm,ft=0,J8=1,Y8=2,W_=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=ft,this.onerror=V8,this[G8]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||K8,r.generateMask?r.generateMask(n):(es===wm&&(Ln===void 0&&(Ln=Buffer.alloc(wm)),U8(Ln,0,wm),es=0),n[0]=Ln[es++],n[1]=Ln[es++],n[2]=Ln[es++],n[3]=Ln[es++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[Xe]!==void 0?a=r[Xe]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(o?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=n[0],d[s-3]=n[1],d[s-2]=n[2],d[s-1]=n[3],i?[d,t]:o?(eD(t,n,d,s,a),[d]):(eD(t,n,t,0,a),[d,t])):[d,t]}close(t,r,n,o){let s;if(t===void 0)s=B8;else{if(typeof t!="number"||!q8(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(z8(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Xe]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==ft?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Qo(t)?(o=t.size,s=!1):(t=En(t),o=t.length,s=En.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Xe]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Qo(t)?this._state!==ft?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ft?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Qo(t)?(o=t.size,s=!1):(t=En(t),o=t.length,s=En.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Xe]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Qo(t)?this._state!==ft?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ft?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[Qj.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Qo(t)?(a=t.size,c=!1):(t=En(t),a=t.length,c=En.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Xe]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Qo(t)?this._state!==ft?this.enqueue([this.getBlobData,t,this._compress,d,n]):this.getBlobData(t,this._compress,d,n):this._state!==ft?this.enqueue([this.dispatch,t,this._compress,d,n]):this.dispatch(t,this._compress,d,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[Xe],this._state=Y8,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(E_,this,a,o);return}this._bufferedBytes-=n[Xe];let i=En(s);r?this.dispatch(i,r,n,o):(this._state=ft,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(X8,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[Qj.extensionName];this._bufferedBytes+=n[Xe],this._state=J8,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");E_(this,c,o);return}this._bufferedBytes-=n[Xe],this._state=ft,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===ft&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Xe],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Xe],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};tD.exports=W_;function E_(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function X8(e,t,r){E_(e,t,r),e.onerror(t)}});var dD=v((TPe,cD)=>{"use strict";var{kForOnEventAttribute:ol,kListener:R_}=Zt(),rD=Symbol("kCode"),nD=Symbol("kData"),oD=Symbol("kError"),sD=Symbol("kMessage"),iD=Symbol("kReason"),ts=Symbol("kTarget"),aD=Symbol("kType"),lD=Symbol("kWasClean"),er=class{constructor(t){this[ts]=null,this[aD]=t}get target(){return this[ts]}get type(){return this[aD]}};Object.defineProperty(er.prototype,"target",{enumerable:!0});Object.defineProperty(er.prototype,"type",{enumerable:!0});var Rn=class extends er{constructor(t,r={}){super(t),this[rD]=r.code===void 0?0:r.code,this[iD]=r.reason===void 0?"":r.reason,this[lD]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[rD]}get reason(){return this[iD]}get wasClean(){return this[lD]}};Object.defineProperty(Rn.prototype,"code",{enumerable:!0});Object.defineProperty(Rn.prototype,"reason",{enumerable:!0});Object.defineProperty(Rn.prototype,"wasClean",{enumerable:!0});var rs=class extends er{constructor(t,r={}){super(t),this[oD]=r.error===void 0?null:r.error,this[sD]=r.message===void 0?"":r.message}get error(){return this[oD]}get message(){return this[sD]}};Object.defineProperty(rs.prototype,"error",{enumerable:!0});Object.defineProperty(rs.prototype,"message",{enumerable:!0});var sl=class extends er{constructor(t,r={}){super(t),this[nD]=r.data===void 0?null:r.data}get data(){return this[nD]}};Object.defineProperty(sl.prototype,"data",{enumerable:!0});var Z8={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[ol]&&o[R_]===t&&!o[ol])return;let n;if(e==="message")n=function(s,i){let a=new sl("message",{data:i?s:s.toString()});a[ts]=this,vm(t,this,a)};else if(e==="close")n=function(s,i){let a=new Rn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[ts]=this,vm(t,this,a)};else if(e==="error")n=function(s){let i=new rs("error",{error:s,message:s.message});i[ts]=this,vm(t,this,i)};else if(e==="open")n=function(){let s=new er("open");s[ts]=this,vm(t,this,s)};else return;n[ol]=!!r[ol],n[R_]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[R_]===t&&!r[ol]){this.removeListener(e,r);break}}};cD.exports={CloseEvent:Rn,ErrorEvent:rs,Event:er,EventTarget:Z8,MessageEvent:sl};function vm(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Wm=v((CPe,uD)=>{"use strict";var{tokenChars:il}=Zo();function Ct(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function Q8(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,d=-1,p=-1,f=0;for(;f<e.length;f++)if(d=e.charCodeAt(f),i===void 0)if(p===-1&&il[d]===1)c===-1&&(c=f);else if(f!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f);let h=e.slice(c,p);d===44?(Ct(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${f}`);else if(a===void 0)if(p===-1&&il[d]===1)c===-1&&(c=f);else if(d===32||d===9)p===-1&&c!==-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f),Ct(r,e.slice(c,p),!0),d===44&&(Ct(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,f),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${f}`);else if(o){if(il[d]!==1)throw new SyntaxError(`Unexpected character at index ${f}`);c===-1?c=f:n||(n=!0),o=!1}else if(s)if(il[d]===1)c===-1&&(c=f);else if(d===34&&c!==-1)s=!1,p=f;else if(d===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${f}`);else if(d===34&&e.charCodeAt(f-1)===61)s=!0;else if(p===-1&&il[d]===1)c===-1&&(c=f);else if(c!==-1&&(d===32||d===9))p===-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f);let h=e.slice(c,p);n&&(h=h.replace(/\\/g,""),n=!1),Ct(r,a,h),d===44&&(Ct(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${f}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=f);let b=e.slice(c,p);return i===void 0?Ct(t,b,r):(a===void 0?Ct(r,b,!0):n?Ct(r,a,b.replace(/\\/g,"")):Ct(r,a,b),Ct(t,i,r)),t}function e3(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}uD.exports={format:e3,parse:Q8}});var km=v((OPe,wD)=>{"use strict";var t3=require("events"),r3=require("https"),n3=require("http"),gD=require("net"),o3=require("tls"),{randomBytes:s3,createHash:i3}=require("crypto"),{Duplex:xPe,Readable:IPe}=require("stream"),{URL:k_}=require("url"),Lr=Xo(),a3=v_(),l3=L_(),{isBlob:c3}=Zo(),{BINARY_TYPES:pD,CLOSE_TIMEOUT:d3,EMPTY_BUFFER:Em,GUID:u3,kForOnEventAttribute:T_,kListener:p3,kStatusCode:m3,kWebSocket:pe,NOOP:fD}=Zt(),{EventTarget:{addEventListener:g3,removeEventListener:f3}}=dD(),{format:h3,parse:y3}=Wm(),{toBuffer:S3}=rl(),hD=Symbol("kAborted"),C_=[8,13],tr=["CONNECTING","OPEN","CLOSING","CLOSED"],A3=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,q=class e extends t3{constructor(t,r,n){super(),this._binaryType=pD[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Em,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),yD(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){pD.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new a3({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new l3(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[pe]=this,s[pe]=this,t[pe]=this,o.on("conclude",_3),o.on("drain",w3),o.on("error",v3),o.on("message",W3),o.on("ping",E3),o.on("pong",L3),s.onerror=R3,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",bD),t.on("data",Rm),t.on("end",PD),t.on("error",_D),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Lr.extensionName]&&this._extensions[Lr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ue(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),AD(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){x_(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Em,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){x_(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Em,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){x_(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Lr.extensionName]||(o.compress=!1),this._sender.send(t||Em,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ue(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(q,"CONNECTING",{enumerable:!0,value:tr.indexOf("CONNECTING")});Object.defineProperty(q.prototype,"CONNECTING",{enumerable:!0,value:tr.indexOf("CONNECTING")});Object.defineProperty(q,"OPEN",{enumerable:!0,value:tr.indexOf("OPEN")});Object.defineProperty(q.prototype,"OPEN",{enumerable:!0,value:tr.indexOf("OPEN")});Object.defineProperty(q,"CLOSING",{enumerable:!0,value:tr.indexOf("CLOSING")});Object.defineProperty(q.prototype,"CLOSING",{enumerable:!0,value:tr.indexOf("CLOSING")});Object.defineProperty(q,"CLOSED",{enumerable:!0,value:tr.indexOf("CLOSED")});Object.defineProperty(q.prototype,"CLOSED",{enumerable:!0,value:tr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(q.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(q.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[T_])return t[p3];return null},set(t){for(let r of this.listeners(e))if(r[T_]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[T_]:!0})}})});q.prototype.addEventListener=g3;q.prototype.removeEventListener=f3;wD.exports=q;function yD(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:d3,protocolVersion:C_[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!C_.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${C_.join(", ")})`);let s;if(t instanceof k_)s=t;else try{s=new k_(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Lm(e,u);return}let d=i?443:80,p=s3(16).toString("base64"),f=i?r3.request:n3.request,b=new Set,h;if(o.createConnection=o.createConnection||(i?P3:b3),o.defaultPort=o.defaultPort||d,o.port=s.port||d,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(h=new Lr({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=h3({[Lr.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!A3.test(u)||b.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");b.add(u)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let u=o.path.split(":");o.socketPath=u[0],o.path=u[1]}let y;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let u=n&&n.headers;if(n={...n,headers:{}},u)for(let[S,A]of Object.entries(u))n.headers[S.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,u||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),y=e._req=f(o),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=f(o);o.timeout&&y.on("timeout",()=>{Ue(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[hD]||(y=e._req=null,Lm(e,u))}),y.on("response",u=>{let S=u.headers.location,A=u.statusCode;if(S&&o.followRedirects&&A>=300&&A<400){if(++e._redirects>o.maxRedirects){Ue(e,y,"Maximum redirects exceeded");return}y.abort();let g;try{g=new k_(S,t)}catch{let w=new SyntaxError(`Invalid URL: ${S}`);Lm(e,w);return}yD(e,g,r,n)}else e.emit("unexpected-response",y,u)||Ue(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,S,A)=>{if(e.emit("upgrade",u),e.readyState!==q.CONNECTING)return;y=e._req=null;let g=u.headers.upgrade;if(g===void 0||g.toLowerCase()!=="websocket"){Ue(e,S,"Invalid Upgrade header");return}let _=i3("sha1").update(p+u3).digest("base64");if(u.headers["sec-websocket-accept"]!==_){Ue(e,S,"Invalid Sec-WebSocket-Accept header");return}let w=u.headers["sec-websocket-protocol"],W;if(w!==void 0?b.size?b.has(w)||(W="Server sent an invalid subprotocol"):W="Server sent a subprotocol but none was requested":b.size&&(W="Server sent no subprotocol"),W){Ue(e,S,W);return}w&&(e._protocol=w);let L=u.headers["sec-websocket-extensions"];if(L!==void 0){if(!h){Ue(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=y3(L)}catch{Ue(e,S,"Invalid Sec-WebSocket-Extensions header");return}let k=Object.keys(R);if(k.length!==1||k[0]!==Lr.extensionName){Ue(e,S,"Server indicated an extension that was not requested");return}try{h.accept(R[Lr.extensionName])}catch{Ue(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Lr.extensionName]=h}e.setSocket(S,A,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(y,e):y.end()}function Lm(e,t){e._readyState=q.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function b3(e){return e.path=e.socketPath,gD.connect(e)}function P3(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=gD.isIP(e.host)?"":e.host),o3.connect(e)}function Ue(e,t,r){e._readyState=q.CLOSING;let n=new Error(r);Error.captureStackTrace(n,Ue),t.setHeader?(t[hD]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Lm,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function x_(e,t,r){if(t){let n=c3(t)?t.size:S3(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${tr[e.readyState]})`);process.nextTick(r,n)}}function _3(e,t){let r=this[pe];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[pe]!==void 0&&(r._socket.removeListener("data",Rm),process.nextTick(SD,r._socket),e===1005?r.close():r.close(e,t))}function w3(){let e=this[pe];e.isPaused||e._socket.resume()}function v3(e){let t=this[pe];t._socket[pe]!==void 0&&(t._socket.removeListener("data",Rm),process.nextTick(SD,t._socket),t.close(e[m3])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function mD(){this[pe].emitClose()}function W3(e,t){this[pe].emit("message",e,t)}function E3(e){let t=this[pe];t._autoPong&&t.pong(e,!this._isServer,fD),t.emit("ping",e)}function L3(e){this[pe].emit("pong",e)}function SD(e){e.resume()}function R3(e){let t=this[pe];t.readyState!==q.CLOSED&&(t.readyState===q.OPEN&&(t._readyState=q.CLOSING,AD(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function AD(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function bD(){let e=this[pe];if(this.removeListener("close",bD),this.removeListener("data",Rm),this.removeListener("end",PD),e._readyState=q.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[pe]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",mD),e._receiver.on("finish",mD))}function Rm(e){this[pe]._receiver.write(e)||this.pause()}function PD(){let e=this[pe];e._readyState=q.CLOSING,e._receiver.end(),this.end()}function _D(){let e=this[pe];this.removeListener("error",_D),this.on("error",fD),e&&(e._readyState=q.CLOSING,this.destroy())}});var LD=v((MPe,ED)=>{"use strict";var NPe=km(),{Duplex:k3}=require("stream");function vD(e){e.emit("close")}function T3(){!this.destroyed&&this._writableState.finished&&this.destroy()}function WD(e){this.removeListener("error",WD),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function C3(e,t){let r=!0,n=new k3({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(vD,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(vD,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",T3),n.on("error",WD),n}ED.exports=C3});var I_=v((jPe,RD)=>{"use strict";var{tokenChars:x3}=Zo();function I3(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&x3[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}RD.exports={parse:I3}});var ND=v((HPe,OD)=>{"use strict";var O3=require("events"),Tm=require("http"),{Duplex:DPe}=require("stream"),{createHash:N3}=require("crypto"),kD=Wm(),kn=Xo(),M3=I_(),j3=km(),{CLOSE_TIMEOUT:D3,GUID:H3,kWebSocket:F3}=Zt(),$3=/^[+/0-9A-Za-z]{22}==$/,TD=0,CD=1,ID=2,O_=class extends O3{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:D3,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:j3,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Tm.createServer((n,o)=>{let s=Tm.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=U3(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=TD}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===ID){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(al,this);return}if(t&&this.once("close",t),this._state!==CD)if(this._state=CD,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(al,this):process.nextTick(al,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{al(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",xD);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Tn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Tn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!$3.test(s)){Tn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Tn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){ll(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=M3.parse(c)}catch{Tn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],f={};if(this.options.perMessageDeflate&&p!==void 0){let b=new kn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=kD.parse(p);h[kn.extensionName]&&(b.accept(h[kn.extensionName]),f[kn.extensionName]=b)}catch{Tn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let b={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(b,(h,y,u,S)=>{if(!h)return ll(r,y||401,u,S);this.completeUpgrade(f,s,d,t,r,n,o)});return}if(!this.options.verifyClient(b))return ll(r,401)}this.completeUpgrade(f,s,d,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[F3])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>TD)return ll(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${N3("sha1").update(r+H3).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(n.size){let f=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;f&&(d.push(`Sec-WebSocket-Protocol: ${f}`),p._protocol=f)}if(t[kn.extensionName]){let f=t[kn.extensionName].params,b=kD.format({[kn.extensionName]:[f]});d.push(`Sec-WebSocket-Extensions: ${b}`),p._extensions=t}this.emit("headers",d,o),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",xD),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(al,this)})),a(p,o)}};OD.exports=O_;function U3(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function al(e){e._state=ID,e.emit("close")}function xD(){this.destroy()}function ll(e,t,r,n){r=r||Tm.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Tm.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function Tn(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,Tn),e.emit("wsClientError",i,r,t)}else ll(r,n,o,s)}});var z3,B3,G3,V3,q3,K3,MD,J3,cl,jD=l(()=>{z3=m(LD(),1),B3=m(Wm(),1),G3=m(Xo(),1),V3=m(v_(),1),q3=m(L_(),1),K3=m(I_(),1),MD=m(km(),1),J3=m(ND(),1),cl=MD.default});var N_,M_,j_=l(()=>{"use strict";N_="AGENT_WITCH_EXTERNAL_BRIDGE",M_="AGENT_WITCH_EXTERNAL_LIVE"});var D_,DD=l(()=>{"use strict";D_=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var Y3,H_,HD=l(()=>{"use strict";j_();DD();Y3=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",H_=(e={})=>{let t=e.env??process.env,r=D_(t[N_]),n=D_(t[M_]);return{mode:Y3(r,n),skipInProcessBridge:r,skipInProcessLive:n}}});var FD=l(()=>{"use strict";j_()});var $D=l(()=>{"use strict";HD();FD()});var F_=l(()=>{"use strict"});var rr,dl=l(()=>{"use strict";rr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var ns,Cn,UD,Z3,$_,U_,zD,BD,z_,GD,ul,B_=l(()=>{"use strict";ns=m(require("node:fs")),Cn=m(require("node:os")),UD=m(require("node:path"));F_();dl();Z3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$_=(e=Cn.default.hostname())=>UD.default.join(Cn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),U_=e=>{if(!ns.default.existsSync(e))return null;try{let t=JSON.parse(ns.default.readFileSync(e,"utf8"));return!Z3(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},zD=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},BD=(e,t)=>{ns.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},z_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??$_(),n=U_(r);if(n!==null&&n.pid!==process.pid&&rr(n.pid)&&zD(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:Cn.default.hostname(),macOsUsername:Cn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return BD(r,o),{ok:!0}},GD=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??$_(),n=U_(r);return n!==null&&n.pid!==process.pid&&rr(n.pid)&&zD(n)?{ok:!1}:(BD(r,{hostname:Cn.default.hostname(),macOsUsername:Cn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},ul=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??$_();U_(r)?.pid===process.pid&&ns.default.existsSync(r)&&ns.default.unlinkSync(r)}});var G_,pl,Q3,eJ,tJ,rJ,V_,VD=l(()=>{"use strict";G_=require("node:child_process"),pl=m(require("node:path"));dl();Zc();Q3=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),eJ=(e,t)=>{if(Q3(e)||!/\bnode\b/.test(e))return!1;let r=pl.default.resolve(t),n=pl.default.join(r,"app",Ts),o=pl.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Ts||i==="agent-witch.ts")return e.includes(r);try{let a=pl.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},tJ=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,G_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},rJ=(e,t,r)=>{let n=tJ(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||eJ(d,t)&&o.push(c)}return o},V_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,G_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=rJ(r,e.installDir,t),o=[];for(let s of n)if(rr(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var ml,gl,qD,nJ,q_,KD=l(()=>{"use strict";ml=m(require("node:fs")),gl=m(require("node:path"));Pe();qD=(e,t)=>{!ml.default.existsSync(e)||ml.default.existsSync(t)||(ml.default.mkdirSync(gl.default.dirname(t),{recursive:!0}),ml.default.renameSync(e,t))},nJ=e=>{if(e.profileEmail===null)return;let t=gl.default.join(e.installDir,Qe);qD(gl.default.join(t,Dn),e.mainLogPath),qD(gl.default.join(t,Hn),e.errorLogPath)},q_=e=>{let t=O();e!==void 0&&t.installDir!==e||nJ(t)}});var oJ,JD=l(()=>{"use strict";Vi();Nu();Nu();oJ={};!nt()&&zr(oJ.url)&&(async()=>{He("agent-witch-wake-server");let e=await un(),t=jt(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var YD=l(()=>{"use strict";JD()});var XD=l(()=>{"use strict";xi()});var K_,ZD=l(()=>{"use strict";F_();YD();B_();XD();K_=async(e={})=>{let t=e.skipInProcessBridge?null:await Ou();mu();let r=setInterval(()=>{mu()},6e4),n=setInterval(()=>{if(!GD().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t?.close()}}}});var fl,Cm,aJ,QD,eH,xm,tH,rH,J_,nH,Im,oH=l(()=>{"use strict";fl=m(require("node:fs")),Cm=m(require("node:path")),aJ="pending-run-inputs.json",QD=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eH=e=>{let t=e.profileEmail?Cm.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Cm.default.join(t,aJ)},xm=e=>{let t=eH(e);if(!fl.default.existsSync(t))return{};try{let r=JSON.parse(fl.default.readFileSync(t,"utf8"));return QD(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!QD(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},tH=(e,t)=>{let r=eH(e);fl.default.mkdirSync(Cm.default.dirname(r),{recursive:!0}),fl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},rH=e=>Object.values(xm(e)),J_=(e,t)=>xm(e)[t]!==void 0,nH=(e,t)=>{let r=xm(e);r[t.agentRunId]=t,tH(e,r)},Im=(e,t)=>{let r=xm(e);delete r[t],tH(e,r)}});var Om=l(()=>{"use strict";ae()});var sH=l(()=>{"use strict";ae()});var Nm=l(()=>{"use strict";ae()});var Mm=l(()=>{"use strict";ae()});var hl=l(()=>{"use strict";ae()});var lJ,cJ,yl,Y_=l(()=>{"use strict";st();Om();sH();Nm();Mm();hl();lJ={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},cJ={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},yl=e=>{if(!se(e.writerAgent))return"the selected writer";let t=Fe(e.writerAgent);if(ve(e.writerExecutionBackend)==="api"&&t!==null){let r=Oe(me(e.configPath),t);if(r!==null&&r.apiKey.length>0){let n=Xs(t,r.model);return`${cJ[t]} model ${n}`}}return lJ[e.writerAgent]}});var dJ,uJ,iH,aH,lH=l(()=>{"use strict";dJ=/"input_tokens"\s*:\s*(\d+)/,uJ=/"output_tokens"\s*:\s*(\d+)/,iH=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},aH=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=iH(dJ.exec(t)),n=iH(uJ.exec(t));if(r===null||n===null)return null;let o=r+n;return o>=1?o:null}});var jm=l(()=>{"use strict";lt()});var Sl,Dm,pJ,X_,cH,dH,uH,Z_,pH=l(()=>{"use strict";Sl=m(require("node:fs")),Dm=m(require("node:path"));jm();pJ="run-completion-outbox.json",X_=e=>{let t=e.profileEmail?Dm.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Dm.default.join(t,pJ)},cH=e=>{let t=X_(e);if(!Sl.default.existsSync(t))return[];try{let r=JSON.parse(Sl.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},dH=(e,t)=>{Sl.default.mkdirSync(Dm.default.dirname(X_(e)),{recursive:!0}),Sl.default.writeFileSync(X_(e),JSON.stringify(t,null,2),"utf8")},uH=(e,t)=>{let r=[...cH(e).filter(n=>n.runId!==t.runId),t];dH(e,r)},Z_=async e=>{if(e.cloudApi===null)return;let t=cH(e.layout);if(t.length===0)return;let r=[];for(let n of t)await Ei(e.cloudApi,n.runId,n.exitCode,n.output,{estimateSeconds:n.estimateSeconds,actualSeconds:n.actualSeconds})||r.push(n);dH(e.layout,r)}});var mH=l(()=>{"use strict"});var Q_,Al,gJ,xn,gH=l(()=>{"use strict";mH();Q_=new Map,Al=e=>{let t=Q_.get(e);t!==void 0&&(clearInterval(t),Q_.delete(e))},gJ=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},xn=(e,t,r,n={})=>{Al(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){Al(t);return}let i=n.onTick?.()??{};gJ(e,t,o,i)};s(),Q_.set(t,setInterval(s,15e3))}});var fH=l(()=>{"use strict";lt()});var hH,yH=l(()=>{"use strict";fH();hH=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Be(t)}});var ew,bl,nr,tw,xt,SH,Hm=l(()=>{"use strict";ew=new Set,bl=new Map,nr=(e,t)=>{if(t.length===0)return;let r=bl.get(e)??[];r.push(t),bl.set(e,r)},tw=e=>{ew.add(e);let t=bl.get(e)??[];return bl.delete(e),t},xt=e=>ew.has(e),SH=e=>{ew.delete(e),bl.delete(e)}});var Fm,AH,fJ,bH,PH=l(()=>{"use strict";Fm=m(require("node:path")),AH=require("node:url");zn();fJ={},bH=()=>{if(nt()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Fm.default.dirname(Fm.default.resolve(e))}return Fm.default.dirname((0,AH.fileURLToPath)(fJ.url))}});var _H,wH,vH,WH,De,os,EH,LH,ss,rw,nw,ow,RH,sw,kH,$m=l(()=>{"use strict";_H=require("node:crypto"),wH=m(require("node:fs")),vH=m(require("node:path")),WH=require("node:url");dl();zn();PH();De=new Map,EH=async()=>{if(os!==void 0)return os;try{if(nt()){let e=bH(),t=vH.default.join(e,"deps","node-pty","lib","index.js");if(wH.default.existsSync(t)){let r=await import((0,WH.pathToFileURL)(t).href);return os=r,r}}return os=await import("node-pty"),os}catch{return os=null,null}},LH=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},ss=(e,t,r)=>{let n=De.get(e);if(n!==void 0){De.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},rw=(e,t)=>{let r=De.get(e);return r===void 0?!1:(r.pty.write(t),!0)},nw=(e,t,r)=>{let n=De.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},ow=e=>{for(let t of De.values())if(!(t.mode!=="agent"||t.runId!==e))return rr(t.pty.pid);return!1},RH=e=>{for(let[t,r]of De.entries())if(!(r.mode!=="agent"||r.runId!==e)){De.delete(t);try{r.pty.kill()}catch{}return!0}return!1},sw=async e=>{let t=await EH();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;De.get(e.shellSessionId)!==void 0&&ss(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return De.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{LH(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{De.get(e.shellSessionId)?.pty===o&&(De.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},kH=async e=>{let t=e.shellSessionId??(0,_H.randomUUID)(),r=await EH();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return De.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{LH(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{De.get(t)?.pty===n&&(De.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var Um,TH,CH=l(()=>{"use strict";Um="[[AWAITING_INPUT]]",TH=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Um,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Pl,xH,zm=l(()=>{"use strict";CH();Pl=e=>{let t=e.indexOf(Um);if(t<0)return null;let n=e.slice(t+Um.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},xH=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",TH].join(`
`)});var IH,OH=l(()=>{"use strict";Hm();$m();zm();IH=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(xt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}nr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await kH({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=Pl(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var NH,MH,jH,or,Bm=l(()=>{"use strict";NH=require("node:child_process"),MH=m(require("node:fs")),jH=m(require("node:path"));Zc();or=(e,t)=>{let r=jH.default.join(e,"app",SE,"ensure-writer.sh");return MH.default.existsSync(r)?new Promise((n,o)=>{let s=(0,NH.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var DH,In,wl,Gm,iw,_l,Vm,qm,aw,lw,hJ,is,yJ,SJ,cw,dw=l(()=>{"use strict";DH=require("node:child_process");st();Bm();Nm();Om();hl();Mm();In=new Map,wl=e=>e==="cursor"||e==="antigravity",Gm=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",iw=e=>In.get(e)?.warmed===!0,_l=e=>{let t=In.get(e);In.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Vm=e=>In.get(e)?.conversationStarted===!0,qm=e=>{let t=In.get(e);In.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},aw=e=>{In.delete(e)},lw=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",hJ={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},is=e=>`${hJ[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,yJ=(e,t,r,n)=>new Promise(o=>{let s=ud(t,r),i=[],a=(0,DH.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),n?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{o({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{o({exitCode:-1,output:d.message})})}),SJ=(e,t)=>{let r=is(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},cw=async e=>{if(!se(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&ve(e.runConfig.writerExecutionBackend)==="api"){let r=Fe(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let n=me(e.runConfig.layout.configPath);return Oe(n,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),_l(e.writerAgent),{exitCode:0,output:is(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await or(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}wl(e.writerAgent)&&_l(e.writerAgent);let t=await yJ(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?SJ(e.writerAgent,t.output):is(e.writerAgent)}}});var On,uw=l(()=>{"use strict";On={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var HH,AJ,bJ,FH,PJ,pw,$H=l(()=>{"use strict";uw();HH=/you(?:'|')ve hit your session limit/i,AJ=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],bJ=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,FH=(e,t)=>{for(let r of e.split(/\r?\n/)){let n=r.trim();if(n.length>0&&t.test(n))return n}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},PJ=e=>{let t=bJ.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},pw=e=>{let t=e.trim();if(t.length===0)return null;if(HH.test(t))return{code:On.SESSION_LIMIT,resetHint:PJ(t),matchedLine:FH(t,HH)};for(let r of AJ)if(r.test(t))return{code:On.PROVIDER_QUOTA,resetHint:null,matchedLine:FH(t,r)};return null}});var Km,Jm,mw,gw=l(()=>{"use strict";Km="[[AGENT_RUN_WRITER_EXECUTION]]",Jm="cli-writer-api-key-missing",mw="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var fw=l(()=>{"use strict";gw()});var UH=l(()=>{"use strict";fw()});var Ym=l(()=>{"use strict";uw();$H();gw();fw();UH()});var Xm,zH=l(()=>{"use strict";Xm={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var BH,GH=l(()=>{"use strict";BH="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var VH,qH=l(()=>{"use strict";Ym();GH();VH=e=>e.code===On.SESSION_LIMIT?BH:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var KH,JH=l(()=>{"use strict";Ym();zH();qH();KH=e=>{let t=pw(e.output);return t!==null?{status:Xm.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:VH(t)}:{status:e.exitCode===0?Xm.COMPLETED:Xm.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var hw,qwe,YH=l(()=>{"use strict";hw={OPEN:"open",APPROVAL:"approval"},qwe=hw.APPROVAL});var as,Zm,XH,vJ,ZH,QH,eF,vl,yw,Sw=l(()=>{"use strict";as=m(require("node:fs")),Zm=m(require("node:path")),XH="runs",vJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ZH=e=>{let t=e.profileEmail!==null?Zm.default.join(e.installDir,"profiles",e.profileEmail,XH):Zm.default.join(e.installDir,XH);return as.default.mkdirSync(t,{recursive:!0}),t},QH=(e,t)=>Zm.default.join(ZH(e),`${t}.json`),eF=(e,t)=>{as.default.writeFileSync(QH(e,t.id),JSON.stringify(t,null,2))},vl=(e,t)=>{let r=QH(e,t);if(!as.default.existsSync(r))return null;try{let n=JSON.parse(as.default.readFileSync(r,"utf8"));return!vJ(n)||typeof n.id!="string"?null:n}catch{return null}},yw=e=>{let t=ZH(e),r=as.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=vl(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var WJ,tF,rF=l(()=>{"use strict";JH();YH();Sw();WJ=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",n=KH({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:n.status,dispatchPolicy:hw.OPEN,resultOutput:e.output,resultExitCode:n.resultExitCode,resultOutcomeCode:n.resultOutcomeCode,denialReason:n.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},tF=(e,t)=>{let r=WJ(t);return eF(e,r),r}});var nF=l(()=>{"use strict";dm()});var oF,sF=l(()=>{"use strict";Ym();oF=()=>[Km,`agentRunWriterExecutionBackend=${Jm}`,`agentRunWriterExecutionReasonCode=${mw}`].join(`
`)});var Rr,Qm=l(()=>{"use strict";Rr=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Aw,EJ,LJ,iF,aF=l(()=>{"use strict";Aw=e=>e.toLocaleString("en-US"),EJ=e=>e<.01?e.toFixed(4):e.toFixed(3),LJ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${EJ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Aw(e.inputTokens)} in / ${Aw(e.outputTokens)} out (${Aw(e.totalTokens)} total)`,t].join(`
`)},iF=(e,t)=>{if(t===void 0)return e;let r=LJ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var lF=l(()=>{"use strict";ae()});var dF,Wl,ce,bw,eg,cF,RJ,kJ,uF,pF,mF,El,Pw,_w,ww,gF,TJ,Ze,Ll,kr,fF,CJ,xJ,tg,vw,Ww,Ew,hF=l(()=>{"use strict";dF=require("node:child_process");ae();st();oH();Ga();Y_();lH();pd();pH();jm();gH();dl();yH();Hm();$m();zm();OH();dw();rF();nF();sF();Qm();aF();Kn();lF();hl();Ns();zm();Wl=new Map,ce=new Map,bw=new Set,eg=new Map,cF=e=>{e!==void 0&&!eg.has(e)&&eg.set(e,Date.now())},RJ=(e,t,r,n)=>{let o=n.endsWith(`
`)?n:`${n}
`;if(xt(t)){Ze(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:o},requestId:r});return}nr(t,o)},kJ=(e,t,r,n,o)=>{if(!Nh(e,o))return;let s=`${oF()}
`;RJ(t,r,n,s);let i=ce.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},uF=130,pF=`

Stopped by user.`,mF=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:Rr(e)},El=null,Pw=e=>{El=e},_w=(e,t)=>{if(El===null)return;let r=bP(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||Iy(El,t,r)},ww=async e=>{await Z_({layout:e,cloudApi:El})},gF=e=>{let t=Wl.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:rr(t.pid)},TJ=e=>ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),Ze=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Ll=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Un(s),c=ce.get(r);if(a!==null&&c!==void 0){let d=RE(a),p=gF(r)||ow(r);d!==null&&!p&&kr(e,t,r,n,d.exitCode,d.output,c.originalPrompt)}return LE(a)}}),kr=(e,t,r,n,o,s,i,a)=>{let c=to(s,a),d=o,p=iF(c.output,c.llmUsage);if(r!==void 0){let b=eg.get(r);eg.delete(r),b!==void 0&&SP({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-b)/1e3))});let h=aH(c.llmUsage,p);h!==null&&LM({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&bw.has(r)&&(bw.delete(r),d=uF,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${pF}`:"Stopped by user.");let f=r!==void 0?bP(e.layout.reportsDir,r):null;if(r!==void 0){Al(r),si(e.layout,r),xt(r)&&(Ze(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),SH(r));let b=ce.get(r);vM({reportsDir:e.layout.reportsDir,agentRunId:r,input:Rr(i),output:p,...b!==void 0?{writerLabel:yl({writerAgent:b.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),b!==void 0&&lm({layout:e.layout,writerAgent:b.writerAgent,projectFolderPath:b.projectFolderPath,userPrompt:b.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),tF(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),uH(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{}}),Z_({layout:e.layout,cloudApi:El}),ce.delete(r),Wl.delete(r),Im(e.layout,r)}Ze(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:n}),Bs(e.layout)},fF=(e,t,r,n,o,s,i)=>{let a=ce.get(r),c=a?.accumulatedOutput??s;nH(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),xn(t,r,()=>J_(e.layout,r),Ll(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),Ze(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},CJ=(e,t,r,n,o,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(o===void 0||h.length===0)){if(xt(o)){Ze(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:h},requestId:n});return}nr(o,h)}};if(o!==void 0){let h=ce.get(o);Wl.set(o,t),ce.set(o,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),Ze(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),xn(r,o,()=>gF(o),Ll(e,r,o,n,h?.projectFolderPath,h?.reportKey))}let f=a==="claude-cli",b=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(f?b.push(y):(c.push(y),p(y)),d||o===void 0)return;let u=Pl(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let S=ce.get(o),A=[S?.accumulatedOutput??"",u.partialOutput].filter(g=>g.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=A),Wl.delete(o),fF(e,r,o,n,u.question,A,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;qm(a);let y=o!==void 0?ce.get(o):void 0,u=f?to(b.join("")):{output:c.join("").trim(),llmUsage:void 0},S=f?c.join("").trim():"",A=[u.output.trim(),S].filter(_=>_.length>0).join(`
`);f&&u.output.trim().length>0&&p(u.output);let g=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;kr(e,r,o,n,h??-1,g,s,u.llmUsage)}),t.on("error",h=>{d||kr(e,r,o,n,-1,h.message,s)})},xJ=(e,t,r,n,o,s,i,a,c)=>{let d=mF(r,c);s!==void 0&&(ce.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),Ze(o,{type:"terminal.stream.start",payload:{runId:s},requestId:n}),xn(o,s,()=>ce.has(s),Ll(e,o,s,n,i,a))),ti(e,t,r,f=>{if(!(s===void 0||f.length===0)){if(xt(s)){Ze(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:f},requestId:n});return}nr(s,f)}}).then(f=>{qm(t),kr(e,o,s,n,f.exitCode,f.output,r,f.llmUsage)}).catch(f=>{let b=f instanceof Error?f.message:String(f);kr(e,o,s,n,-1,b,r)})},tg=(e,t,r,n,o,s,i,a,c,d,p,f)=>{let b=mF(r,p);if(zs(e.layout),Xr(e,t)){cF(s),xJ(e,t,r,n,o,s,c,d,b);return}let h=Pt(t,r,TJ(e),i);if(h===null){kr(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}cF(s);let y=hH({workspace:e.workspace,projectFolderPath:c}),u=()=>{let S=(0,dF.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:f??process.env});CJ(e,S,o,n,s,r,b,t)};if(s===void 0){u();return}ce.set(s,{originalPrompt:r,userTranscriptPrompt:b,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:ce.get(s)?.accumulatedOutput??""}),kJ(e,o,s,n,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Os({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),xn(o,s,()=>ce.has(s),Ll(e,o,s,n,c,d)),IH({socket:o,sendMessage:Ze,requestId:n,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:f,originalPrompt:r,writerAgent:t,onInputRequired:S=>{a!==void 0&&ss(a,_=>{Ze(o,_)},n);let A=ce.get(s),g=[A?.accumulatedOutput??"",S.partialOutput].filter(_=>_.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=g),fF(e,o,s,n,S.question,g,r)},onFinished:(S,A)=>{qm(t);let g=to(A),_=ce.get(s),w=_!==void 0&&_.accumulatedOutput.length>0?`${_.accumulatedOutput}

${g.output}`.trim():g.output;kr(e,o,s,n,S,w,r,g.llmUsage)}}).then(S=>{if(!S){u();return}xn(o,s,()=>ow(s),Ll(e,o,s,n,c,d))}).catch(S=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",S instanceof Error?S.message:S),u()})},vw=(e,t,r,n)=>{Im(e.layout,t.agentRunId),t.shellSessionId!==void 0&&Ze(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=xH(t),s=ce.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;tg(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},Ww=(e,t)=>{for(let r of rH(e.layout))ce.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:Rr(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),xn(t,r.agentRunId,()=>J_(e.layout,r.agentRunId),{awaitingInput:!0}),Ze(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Ew=(e,t,r,n)=>{let o=ce.get(r);if(o===void 0)return!1;bw.add(r),Al(r);let s=Wl.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(RH(r))return!0;Im(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${pF}`:"Stopped by user.";return kr(e,t,r,n,uF,i,o.originalPrompt),!0}});var IJ,Lw,yF=l(()=>{"use strict";ci();IJ=()=>`http://127.0.0.1:${it()}/restart`,Lw=async()=>{try{let e=await fetch(IJ(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var SF=l(()=>{"use strict";Xi()});var AF=l(()=>{"use strict";JP()});var bF,PF=l(()=>{"use strict";bF=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Rl,OJ,Rw,_F=l(()=>{"use strict";z();Q();SF();SS();AF();PF();Kn();Rl=(e,t)=>{br(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},OJ=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Xf(),Yf)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},Rw=async e=>{let t=_e(e.layout.installDir)?.bundleVersion??null;if(!bF({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(ot(e.layout)){Gs({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Rl(e.layout,{summary:r,action:"install-bundle-update-start"}),Mt({launchAgentLabel:te(e.layout.installDir),installDir:e.layout.installDir});let n=await Ko({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),Rl(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await OJ();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Rl(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),Rl(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),Rl(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var NJ,kw,wF=l(()=>{"use strict";NJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kw=e=>{if(!NJ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Tw,Cw,vF=l(()=>{"use strict";Zy();Qy();Tw=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Ii({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},Cw=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Gt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var WF,MJ,jJ,DJ,kl,EF=l(()=>{"use strict";WF=m(require("node:os"));Pe();MJ="Default",jJ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),DJ=e=>{let t=WF.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},kl=()=>{let e=O(),t=$c(e),r=jJ(MJ);return`${DJ(t)}/${r.length>0?r:"project"}`}});var LF=l(()=>{"use strict";Xi()});var RF,xw,kF=l(()=>{"use strict";LF();RF=!1,xw=e=>{RF||(RF=!0,process.on("uncaughtException",t=>{mn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;mn(e,{kind:"crash",message:r,stack:n})}))}});var TF,HJ,Iw,CF=l(()=>{"use strict";TF=require("node:child_process");Bm();st();Nm();Om();hl();Mm();HJ=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,TF.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},Iw=async e=>{if(!se(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&ve(e.runConfig.writerExecutionBackend)==="api"){let r=Fe(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let n=me(e.layout.configPath),o=Oe(n,r),s=o!==null&&o.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await or(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await HJ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var Ow,xF=l(()=>{"use strict";Ow=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var IF,Nw,OF=l(()=>{"use strict";IF=require("node:crypto"),Nw=()=>(0,IF.randomUUID)()});var ls,NF,rg=l(()=>{"use strict";ls="[[WORKING_ESTIMATE]]",NF=(e,t,r,n="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",ls,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var MF,jF=l(()=>{"use strict";MF=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var FJ,DF,HF=l(()=>{"use strict";rg();FJ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,DF=e=>{if(!e.includes(ls))return null;let t=null;for(let r of e.matchAll(FJ)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var $J,Mw,FF=l(()=>{"use strict";HF();$J=/^(\d{1,6})\b/,Mw=e=>{let t=DF(e);if(t!==null)return t;let r=$J.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return!Number.isFinite(n)||n<=0?null:n}});var UJ,zJ,BJ,ng,jw=l(()=>{"use strict";st();Ki();UJ="http://127.0.0.1:11434",zJ=45e3,BJ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},ng=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||UJ,n=t===void 0?(await dt({commands:ie({})})).estimateModel:t;if(n===null||n.trim().length===0)return null;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:n,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(zJ)});return o.ok?BJ(await o.json()):null}catch{return null}}});var Dw,Hw,Fw,$F=l(()=>{"use strict";Ns();rg();Qm();jF();FF();Ga();jw();Dw=async e=>{let t=Rr(e.wrappedPrompt),r=WM(e.reportsDir);return{estimateOutput:await ng(NF(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},Hw=e=>{let t=Mw(e.estimateOutput);t!==null&&tm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},Fw=e=>{let t=Mw(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=MF(t);return Is({reportKey:e.reportKey,agentRunId:e.agentRunId,status:At.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),tm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var og,UF,$w=l(()=>{"use strict";og="[[WORKING_TOKEN_ESTIMATE]]",UF=(e,t,r,n="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",og,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var zF,GJ,BF,GF=l(()=>{"use strict";$w();zF=/^(\d{1,8})\b/,GJ=e=>{let t=e.indexOf(og);if(t<0)return null;let r=e.slice(t+og.length).trim(),n=zF.exec(r);if(n===null)return null;let o=Number.parseInt(n[1]??"",10);return Number.isFinite(o)&&o>=1?o:null},BF=e=>{let t=GJ(e);if(t!==null)return t;let r=zF.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return Number.isFinite(n)&&n>=1?n:null}});var Uw,zw,VF=l(()=>{"use strict";$w();Qm();GF();Ga();jw();Uw=async e=>{let t=Rr(e.wrappedPrompt),r=RM(e.reportsDir);return{estimateOutput:await ng(UF(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},zw=e=>{let t=BF(e.estimateOutput);return t===null?null:(EM({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var qF=l(()=>{"use strict";B_();VD();KD();ZD();ci();hF();Bm();st();Sw();Hm();yF();aS();_F();Kn();wF();vF();jm();EF();kF();CF();Qc();xF();OF();rg();Ns();$F();VF();Y_();Ki();$m();dw()});var KF={};ht(KF,{buildContinuationPromptWithContext:()=>KJ});var VJ,qJ,KJ,JF=l(()=>{"use strict";VJ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,qJ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),KJ=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=qJ(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${VJ(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var YF={};ht(YF,{readHarnessExportSets:()=>YJ});var Tl,Bw,sg,JJ,YJ,XF=l(()=>{"use strict";Tl=m(require("node:fs")),Bw=m(require("node:path"));Pe();sg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JJ=e=>{if(!Tl.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Tl.default.readFileSync(e.harnessManifestPath,"utf8"));if(sg(t))return t}catch{return null}return null},YJ=(e,t)=>{let r=O(t),n=JJ(r);if(n===null)return[];let o=sg(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!sg(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!sg(p))continue;let f=typeof p.path=="string"?p.path:void 0,b=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(f===void 0||b.length===0||h.length===0||y.length===0)continue;let u=f.startsWith("shared/")?Bw.default.join(r.harnessRootDir,f):Bw.default.join(r.harnessSetsDir,i,f);Tl.default.existsSync(u)&&d.push({id:b,kind:h,title:y,content:Tl.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var Xw,Vw,cs,ZF,XJ,QF,e$,Gw,t$,qw,Kw,Jw,K,U,Yw,ZJ,Cl,QJ,e4,t4,r4,n4,o4,s4,i4,xl,r$=l(()=>{"use strict";Xw=require("node:child_process"),Vw=m(require("node:fs")),cs=m(require("node:os"));jD();z();Q();fo();a_();$D();ae();ze();Xi();RA();hm();dm();lt();rn();kS();Ft();qF();ZF=3e4,XJ=3e4,QF=new Map,e$=new Map,Gw=new Map,t$=new Map,qw=new Map,Kw=new Map,Jw=new Map,K=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),U=(e,t,r)=>{e.readyState===cl.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(br(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Mu(r,"out",t)))},Yw=e=>e,ZJ=e=>{if(!Vw.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Vw.default.readFileSync(e.harnessManifestPath,"utf8"));if(K(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Cl=(e,t)=>{let r=ZJ(t);r!==null&&U(e,{type:"harness.manifest.report",payload:{hostname:cs.default.hostname(),manifest:r}})},QJ=async(e,t,r,n,o,s,i=!1,a,c,d,p,f)=>{let b=f?.trim()??"";if(!se(t)){U(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let h=yl({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await dt({commands:ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?Dw({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,S=s!==void 0?Uw({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=wl(t)&&!iw(t);if(A){try{await or(e.layout.installDir,t)}catch(F){let Ie=F instanceof Error?F.message:String(F);U(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ie}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}_l(t)}else if(!wl(t))try{await or(e.layout.installDir,t)}catch(F){let Ie=F instanceof Error?F.message:String(F);U(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ie}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let g=ni(d,kl,f);if(g===null){U(o,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:n});return}$e({projectFolderPath:g,...b.length>0?{projectId:b}:{}}),i||Ya(e.layout,t,g);let _=cm({sessionContinuation:i,supportsWriterSessionContinuation:Gm(t),isWriterConversationStarted:Vm(t)}),w=i&&_==="first"?Ja(e.layout,t,g):null,W=w!==null?qo(e.layout,w):null,L=W!==null&&W.turns.length>0,R=NP({sessionContinuation:i,supportsWriterSessionContinuation:Gm(t),isWriterConversationStarted:Vm(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:L,userPromptCharacterCount:r.length}),k=r;if(R.continuationStrategy==="source_run_seed"){let F=typeof c=="string"&&c.length>0?vl(e.layout,c):null;if(F!==null){let{buildContinuationPromptWithContext:Ie}=await Promise.resolve().then(()=>(JF(),KF));k=Ie({priorPrompt:F.prompt,priorOutput:F.resultOutput??"",userMessage:r})}}else R.continuationStrategy==="transcript_seed"&&W!==null&&W.turns.length>0&&(k=om({priorTurns:W.turns,userMessage:r}));let C=R.ragLimit>0?await Eo({layout:e.layout,query:k,limit:R.ragLimit,minScore:R.ragMinScore,projectFolderPath:g,...b.length>0?{projectId:b}:{}}):[],D=R.ragLimit>0&&g.trim().length>0?await EA({layout:e.layout,query:k,limit:2,minScore:.32,projectFolderPath:g,...b.length>0?{projectId:b}:{}}):[],ee=R.injectMemory?WP(e.layout,g,b.length>0?b:void 0):[],J=`${LP(ee,R.memoryEntryLimit)}${wA(C)}${LA(D)}${k}`,V=p?.trim()??(s!==void 0&&g.trim().length>0?Nw():void 0);if(s!==void 0&&V!==void 0&&V.length>0&&g.trim().length>0){Os({reportKey:V,agentRunId:s,userSummary:"Working on your Mac\u2026"});let F=J;u!==null&&u.then(Ie=>{if(Ie===null)return;let Tr=Fw({estimateOutput:Ie.estimateOutput??"",reportKey:V,agentRunId:s,reportsDir:e.layout.reportsDir,task:Ie.task,writerLabel:Ie.writerLabel,embedding:Ie.embedding});if(Tr.estimateSeconds===null)return;_w(e.layout.reportsDir,s);let Qw=`${ls}
${Tr.estimateSeconds}
`;if(xt(s)){U(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Qw},requestId:n});return}nr(s,Qw)}).catch(()=>{}),J=Ow(F),J=_f(J,{agentRunId:s,reportKey:V,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then(F=>{F!==null&&Hw({estimateOutput:F.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:F.task,writerLabel:F.writerLabel,embedding:F.embedding})}).catch(()=>{}),s!==void 0&&S!==null&&S.then(F=>{F!==null&&zw({estimateOutput:F.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:F.task,writerLabel:F.writerLabel})}).catch(()=>{});let ds=s!==void 0&&Jw.get(s)===!0;if(s!==void 0&&g.trim().length>0){let F=await uu(g);Kw.set(s,F),V!==void 0&&V.length>0&&qw.set(s,V)}tg(e,t,J,n,Yw(o),s,{sessionTurn:R.sessionTurn},a,g,V,r,kh(e.layout,s,ds)),A&&s!==void 0&&U(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:lw(t)},requestId:n})},e4=async(e,t,r,n,o)=>{let s=(i,a)=>{U(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await cw({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,U(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:n})}}),c=se(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?is(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},t4=(e,t,r)=>new Promise(n=>{if(!se(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=Pt(t,r,ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,Xw.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),r4=async(e,t,r,n)=>{if(t.installMethod!=="deterministic-bundle")return!1;U(n,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let o=wt(t.bundle),s=K(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(o!==null)return o;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=we(e.wsUrl)??Dt,f=await fy({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return f.ok?f.bundle:null})();if(i===null)return U(n,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=tn({bundle:i,layout:e.layout});return U(n,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Cl(n,e.layout),!0},n4=async(e,t,r,n)=>{if(await r4(e,t,r,n))return;let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(U(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){U(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!se(o)){U(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}zs(e.layout);let i=await(async()=>{try{await or(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return t4(e,o,s)})().finally(()=>{Bs(e.layout)});U(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),Cl(n,e.layout)},o4=e=>{let t=1e3*2**e;return Math.min(XJ,t)},s4=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(ot(e.layout)){zf(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,Lw().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1})}},n=(u,S="system.ack")=>{if(!t.selfUpdateInFlight){if(ot(e.layout)){Gs({layout:e.layout,remoteBundleVersion:u,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,Rw({layout:e.layout,remoteBundleVersion:u,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},o=()=>{let u=ge(e.layout);u!==null&&Te(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===cl.OPEN||u.readyState===cl.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(o,ZF)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=o4(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},f=u=>{s();let S=()=>{let A=Hs(e.layout.installDir),g=it();U(u,{type:"agent.heartbeat",payload:{hostname:cs.default.hostname(),macOsUsername:cs.default.userInfo().username,wakeError:t.wakeError,wakePort:g,...e.email!==null?{email:e.email}:{},installBundleVersion:A}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,ZF)},b=(u,S)=>{if(typeof u.type!="string")return;if(RS(u)){t.stopped=!0,s(),a(),c(),vS({layout:e.layout}).finally(()=>{ul(),process.exit(0)});return}br(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),Mu(e.layout,"in",u);let A=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&K(u.payload)){let g=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",_=typeof u.payload.origin=="string"?u.payload.origin:"",w=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",W=typeof u.payload.challenge=="string"?u.payload.challenge:"",L=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!i_({serverPublicKey:g,origin:_,devicePublicKey:w,challenge:W,serverAttestation:L})){t.wakeError="Server attestation verification failed",br(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&K(u.payload)){let g=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";br(e.layout,{direction:"local",type:"writer.ensure",summary:g,action:"ensure-writer"}),Iw({layout:e.layout,writerAgent:g,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(_=>{U(S,{type:"writer.status",payload:_},e.layout)})}if(u.type==="install.bundle.update"&&K(u.payload)){let g=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";g.length>0&&n(g,"install.bundle.update")}if(u.type==="system.ack"){Su(e.layout,{wsUrl:e.wsUrl});let g=K(u.payload)?u.payload:null,_=kw(g);_!==null&&n(_)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&K(u.payload)&&Tw(u.payload),u.type==="automations.run"&&K(u.payload)&&Cw(u.payload),u.type==="terminal.stream.accepted"&&K(u.payload)){let g=typeof u.payload.runId=="string"?u.payload.runId:"";if(g.length>0){let _=tw(g);for(let w of _)U(S,{type:"terminal.stream.chunk",payload:{runId:g,chunk:w},requestId:A})}}if(u.type==="agent.agentRun.list"&&U(S,{type:"dashboard.agentRun.list.result",payload:{runs:yw(e.layout)},requestId:A}),u.type==="agent.agentRun.get"&&K(u.payload)){let g=typeof u.payload.runId=="string"?u.payload.runId:"",_=g.length>0?vl(e.layout,g):null;U(S,{type:"dashboard.agentRun.get.result",payload:{run:_},requestId:A})}if(u.type==="command.claude.run"&&K(u.payload)){let g=u.payload.prompt,_=typeof u.payload.writerAgent=="string"&&se(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",w=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,W=u.payload.sessionContinuation===!0,L=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,R=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,k=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,C=ni(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,kl,k),D=_h(u.payload.compositionSnapshot),ee=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof g=="string"&&g.trim().length>0){if(console.log(`[agent-witch] Running ${_} task (${W?"continue":"first"})\u2026`),C===null){U(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(D!==null){let J=vh(e.layout,D);if(J!==null){U(S,{type:"command.claude.result",payload:{exitCode:-1,output:J,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(w!==void 0){let V=Eh(e.layout,w,D);if(!V.ok){U(S,{type:"command.claude.result",payload:{exitCode:-1,output:V.errorMessage,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}Jw.set(w,D.entries.some(ds=>ds.scope==="run"))}}w!==void 0&&R!==void 0&&QF.set(w,R),w!==void 0&&(e$.set(w,C),k!==void 0&&k.trim().length>0&&Gw.set(w,k.trim()),t$.set(w,g.trim()),$e({projectFolderPath:C,...k!==void 0&&k.trim().length>0?{projectId:k.trim()}:{}})),QJ(e,_,g.trim(),A,S,w,W,R,L,C,ee,k)}}if(u.type==="shell.session.open"&&K(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.cols=="number"?u.payload.cols:120,w=typeof u.payload.rows=="number"?u.payload.rows:32;g.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),sw({shellSessionId:g,cwd:e.workspace,cols:_,rows:w,send:W=>{U(S,W)},requestId:A}))}if(u.type==="shell.session.close"&&K(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";g.length>0&&ss(g,_=>{U(S,_)},A)}if(u.type==="shell.input"&&K(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.data=="string"?u.payload.data:"";g.length>0&&_.length>0&&rw(g,_)}if(u.type==="shell.resize"&&K(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.cols=="number"?u.payload.cols:0,w=typeof u.payload.rows=="number"?u.payload.rows:0;g.length>0&&_>0&&w>0&&nw(g,_,w)}if(u.type==="command.writer.session.end"&&K(u.payload)){let g=u.payload.writerAgent;typeof g=="string"&&se(g)&&(aw(g),am(e.layout,g))}if(u.type==="command.writer.session.start"&&K(u.payload)){let g=u.payload.writerAgent,_=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof g=="string"&&se(g)&&_.length>0&&(console.log(`[agent-witch] Starting ${g} session\u2026`),e4(e,g,_,A,S))}if(u.type==="command.claude.stop"&&K(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";g.length>0&&(console.log(`[agent-witch] Stopping run ${g}\u2026`),Ew(e,Yw(S),g,A))}if(u.type==="command.claude.input_respond"&&K(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",_=typeof u.payload.response=="string"?u.payload.response.trim():"",w=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",W=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",L=typeof u.payload.question=="string"?u.payload.question:"";g.length>0&&_.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),vw(e,{agentRunId:g,originalPrompt:w,partialOutput:W,question:L,response:_,shellSessionId:QF.get(g)},A,Yw(S)))}if(u.type==="dispatch.approval.required"&&K(u.payload)){let g=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",_=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${g}: ${_}`),process.platform==="darwin"&&(0,Xw.spawn)("osascript",["-e",`display notification "${_.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${g.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&K(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),n4(e,u.payload,A,S)),u.type==="harness.export.request"&&K(u.payload)){let g=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",_=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,w=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(W=>typeof W=="string"):[];g.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:W}=await Promise.resolve().then(()=>(XF(),YF)),L=W(w,e.email);U(S,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:g,..._!==void 0?{targetDeviceId:_}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:A})})()}if(u.type==="harness.manifest.request"&&Cl(S,e.layout),u.type==="command.claude.result"&&K(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,_=typeof u.payload.output=="string"?u.payload.output:"",w=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,W=ni(g!==void 0?e$.get(g):void 0,kl),L=g!==void 0?Gw.get(g):void 0,R=g!==void 0?t$.get(g)??"":"",k=zy({exitCode:w,output:_});if(k&&W!==null&&_A({layout:e.layout,text:_,source:g??"command.claude.result",projectFolderPath:W,...L!==void 0?{projectId:L}:{}}),w!=null&&w!==0&&_.trim().length>0&&W!==null&&(yA({layout:e.layout,errorText:_,projectFolderPath:W,...L!==void 0?{projectId:L}:{}}),WA({layout:e.layout,text:_,source:g??"command.claude.result.failure",projectFolderPath:W,...L!==void 0?{projectId:L}:{}})),k&&R.trim().length>0&&W!==null&&EP({layout:e.layout,projectFolderPath:W,...L!==void 0?{projectId:L}:{},entry:{id:`${Date.now()}-${g??"run"}`,...g!==void 0?{agentRunId:g}:{},prompt:R,output:_,createdAt:new Date().toISOString()}}),g!==void 0&&W!==null){let D=qw.get(g),ee=Kw.get(g);D!==void 0&&ee!==void 0&&uu(W).then(J=>{let V=By({before:ee,after:J});wf(D,V),Kw.delete(g),qw.delete(g)})}if(k&&L!==void 0&&L.trim().length>0){let D=H(),ee=D===null?null:Y({wsUrl:D.wsUrl,pairingToken:D.pairingToken});ee!==null&&Vy(ee,L,{...g!==void 0?{sourceRunId:g}:{},lesson:Gy({prompt:R,output:_})})}g!==void 0&&(si(e.layout,g),Jw.delete(g),Gw.delete(g))}},h=()=>{if(t.stopped)return;a(),c();let u=new cl(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Pw(Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),ww(e.layout);let S=we(e.wsUrl)??"http://localhost:3000",A=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),g=s_({layout:e.layout,origin:S,...A!==void 0&&A.length>0?{claimToken:A}:{}});U(u,{type:"agent.register",payload:{role:"agent",hostname:cs.default.hostname(),macOsUsername:cs.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...g}},e.layout),Cl(u,e.layout),Ww(e,u),f(u)}),u.on("message",S=>{let A=typeof S=="string"?S:S.toString("utf8");try{let g=JSON.parse(A);if(!K(g))return;b(g,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(S,A)=>{s(),t.socket=void 0,t.wsConnected=!1,rS(e.layout),t.reconnectAttempt+=1;let g=typeof A=="string"?A:A.toString("utf8");mn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:g}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",S=>{t.wakeError=S.message,mn(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return Uf(()=>{let u=Bf();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&n(u.remoteBundleVersion,u.trigger);let S=Gf();S!==null&&r(S)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Hi(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:tl(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Cl(u,e.layout),{ok:!0})}}},i4=async()=>{He("agent-witch");let e=H_(),t=E();z_().ok||(process.platform==="darwin"?(await Fr(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),q_(t);let n=V_({installDir:t});n.length>0&&console.log(`[agent-witch] Stopped ${n.length} sibling process(es): ${n.join(", ")}`),process.platform==="darwin"&&(Mt({launchAgentLabel:te(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Es());let o=await Dh(),s=o[0];s!==void 0&&xw(s.layout);for(let h of o){let y=we(h.wsUrl)??Dt;Fs(h.layout.installDir,y)}let i=o.map(h=>s4(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),ul(),process.exit(0));let c=()=>{o.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let S=ge(h.layout);nS(S,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=o[0]?.layout;h!==void 0&&(ot(h)||Fi(h.installDir))},f=await K_({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):el({layout:o[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let b=jt(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Ls(),d()});d=()=>{b(),f.stop(),ul(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},xl=i4});var Zw=l(()=>{"use strict";r$()});var n$={};ht(n$,{startAgentWitchClient:()=>xl});var a4,o$=l(()=>{"use strict";Zw();Zw();zn();vf();td();a4={};if(zr(a4.url)&&!nt()){let e=process.argv.indexOf("report");e>=0&&process.exit(ed(process.argv.slice(e))),xl()}});bf();vf();td();var CE="20.x",xE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var oG=e=>[`Node.js ${CE} or newer is required (found ${e}).`,xE].join(" "),IE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${oG(process.version)}
`),process.exit(1))};var u4={},l4=async()=>{He("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Xf(),Yf)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},c4=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(OT(),IT)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},d4=async()=>{if(!zr(u4.url))return;IE();let e=process.argv.indexOf("report");e>=0&&process.exit(ed(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await l4();return}if(t==="wake"){await c4();return}if(t==="bridge"){let{runAgentWitchBridgeCli:n}=await Promise.resolve().then(()=>(NC(),OC));await n();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:n}=await Promise.resolve().then(()=>(xj(),Cj));n();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(o$(),n$));await r()};d4();
