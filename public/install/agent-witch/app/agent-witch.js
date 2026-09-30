#!/usr/bin/env node
"use strict";var W$=Object.create;var pg=Object.defineProperty;var L$=Object.getOwnPropertyDescriptor;var E$=Object.getOwnPropertyNames;var R$=Object.getPrototypeOf,k$=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var W=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},yt=(e,t)=>{for(var r in t)pg(e,r,{get:t[r],enumerable:!0})},C$=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of E$(t))!k$.call(e,o)&&o!==r&&pg(e,o,{get:()=>t[o],enumerable:!(n=L$(t,o))||n.enumerable});return e};var m=(e,t,r)=>(r=e!=null?W$(R$(e)):{},C$(t||!e||!e.__esModule?pg(r,"default",{value:e,enumerable:!0}):r,e));var $n=W(mg=>{"use strict";Object.defineProperty(mg,"__esModule",{value:!0});mg.stringify=T$;function T$(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=W(gg=>{"use strict";Object.defineProperty(gg,"__esModule",{value:!0});gg.generateTypeGuardError=x$;var iv=$n();function x$(e,t,r){return(0,iv.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,iv.stringify)(e)}) to be "${r}"`}});var ar=W(Hl=>{"use strict";Object.defineProperty(Hl,"__esModule",{value:!0});Hl.isNonNullObject=void 0;var I$=O(),O$=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,I$.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Hl.isNonNullObject=O$});var St=W(de=>{"use strict";Object.defineProperty(de,"__esModule",{value:!0});de.attachTypeGuardMeta=de.isArrayTypeGuard=de.isNestedObjectTypeGuard=de.getTypeGuardWrapperKind=de.getTypeGuardInnerGuard=de.getTypeGuardItemGuard=de.getTypeGuardSchema=void 0;var N$=e=>e.schema;de.getTypeGuardSchema=N$;var M$=e=>e.itemGuard;de.getTypeGuardItemGuard=M$;var j$=e=>e.innerGuard;de.getTypeGuardInnerGuard=j$;var D$=e=>e.wrapperKind;de.getTypeGuardWrapperKind=D$;var H$=e=>{if((0,de.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};de.isNestedObjectTypeGuard=H$;var F$=e=>{if((0,de.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};de.isArrayTypeGuard=F$;var $$=(e,t)=>Object.assign(e,t);de.attachTypeGuardMeta=$$});var ys=W(Nr=>{"use strict";Object.defineProperty(Nr,"__esModule",{value:!0});Nr.getExpectedTypeName=Nr.getTypeGuardDisplayName=void 0;var av=St(),z$=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Nr.getTypeGuardDisplayName=z$;var U$=e=>{let t=(0,av.getTypeGuardWrapperKind)(e),r=(0,av.getTypeGuardInnerGuard)(e);if(t&&r){let o=(0,Nr.getExpectedTypeName)(r);if(t==="undefinedOr")return`${o} | undefined`;if(t==="nullOr")return`${o} | null`;if(t==="nilOr")return`${o} | null | undefined`}let n=e.name;if(n.startsWith("is")){let o=n.slice(2);return o.endsWith("Guard")&&(o=o.slice(0,-5)),o==="Type"||o==="Schema"?"object":o==="Array"?"Array":o.toLowerCase()}return"unknown"};Nr.getExpectedTypeName=U$});var Mr=W(Fl=>{"use strict";Object.defineProperty(Fl,"__esModule",{value:!0});Fl.createValidationResult=void 0;var B$=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Fl.createValidationResult=B$});var zn=W($l=>{"use strict";Object.defineProperty($l,"__esModule",{value:!0});$l.createValidationError=void 0;var G$=(e,t,r,n)=>({path:e,expectedType:t,actualValue:r,message:n});$l.createValidationError=G$});var Un=W(zl=>{"use strict";Object.defineProperty(zl,"__esModule",{value:!0});zl.createTreeNode=void 0;var V$=(e,t,r,n)=>({valid:t,path:e,...r&&{expectedType:r},...n!==void 0&&{actualValue:n},children:{},errors:[]});zl.createTreeNode=V$});var Ss=W(Ul=>{"use strict";Object.defineProperty(Ul,"__esModule",{value:!0});Ul.combineResults=void 0;var q$=Mr(),K$=(e,t)=>{let r=e.every(s=>s.valid),n=e.flatMap(s=>s.errors),o={valid:r,path:t||"root",children:{},errors:n};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";o.children[i]=s.tree}}),(0,q$.createValidationResult)(r,n,o)};Ul.combineResults=K$});var Gl=W(Bl=>{"use strict";Object.defineProperty(Bl,"__esModule",{value:!0});Bl.createSimplifiedTree=void 0;var lv=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,n])=>{t[r]=lv(n)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},J$=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let n={};Object.entries(e.children).forEach(([o,s])=>{n[o]=lv(s)}),r[t]={valid:e.valid,value:n}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Bl.createSimplifiedTree=J$});var bs=W(ql=>{"use strict";Object.defineProperty(ql,"__esModule",{value:!0});ql.validateObject=void 0;var Y$=ar(),As=Mr(),X$=zn(),Vl=Un(),Z$=Ss(),cv=Kl(),Q$=(e,t,r)=>{let n=()=>{let i=(0,X$.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Vl.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,As.createValidationResult)(!1,[],a):(0,As.createValidationResult)(!1,[i],a)},o=()=>{let i=Object.keys(t);if(i.length===0)return(0,As.createValidationResult)(!0,[],(0,Vl.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,f=d,b=t[f],h=e[f],y=(0,cv.validateProperty)(f,h,b,r);return y.valid?p.length===0?(0,As.createValidationResult)(!0,[],(0,Vl.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,cv.validateProperty)(d,e[d],p,r)}),a=(0,Z$.combineResults)(i,r.path),c=(0,Vl.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,As.createValidationResult)(a.valid,a.errors,c)};return(0,Y$.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?o():s():n()};ql.validateObject=Q$});var uv=W(Xl=>{"use strict";Object.defineProperty(Xl,"__esModule",{value:!0});Xl.validateArray=void 0;var e1=$n(),Jl=Mr(),dv=zn(),Yl=Un(),t1=Ss(),r1=bs(),n1=ys(),o1=St(),s1=(e,t,r)=>{let n=r.path;if(!Array.isArray(e)){let c=(0,dv.createValidationError)(n,"Array",e,`Expected ${n} (${JSON.stringify(e)}) to be "Array"`),d=(0,Yl.createTreeNode)(n,!1,"Array",e);return d.errors=[c],(0,Jl.createValidationResult)(!1,[c],d)}let o=(0,o1.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${n}[${d}]`,f={path:p,config:r.config||null};if(o)return(0,r1.validateObject)(c,o,f);let b=t(c,null),h=(0,n1.getExpectedTypeName)(t),y=(0,e1.stringify)(c);if(b)return(0,Jl.createValidationResult)(!0,[],(0,Yl.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,A=(0,dv.createValidationError)(p,h,c,u),S=(0,Yl.createTreeNode)(p,!1,h,c);return S.errors=[A],(0,Jl.createValidationResult)(!1,[A],S)}),i=(0,t1.combineResults)(s,n),a=(0,Yl.createTreeNode)(n,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Jl.createValidationResult)(i.valid,i.errors,a)};Xl.validateArray=s1});var Kl=W(Ql=>{"use strict";Object.defineProperty(Ql,"__esModule",{value:!0});Ql.validateProperty=void 0;var pv=Mr(),i1=zn(),mv=Un(),a1=ys(),Zl=St(),l1=bs(),c1=uv(),d1=(e,t,r,n)=>{let o=`${n.path}.${e}`,s={path:o,config:n.config||null,...n.parentTree&&{parentTree:n.parentTree}},i=n.config?.errorMode||"multi",a=(0,Zl.getTypeGuardSchema)(r),c=(0,Zl.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,l1.validateObject)(t,a,s);if(c&&(0,Zl.isArrayTypeGuard)(r))return(0,c1.validateArray)(t,c,s)}let d=p=>{let f=r(t,p),b=(0,a1.getExpectedTypeName)(r);return f?(0,pv.createValidationResult)(!0,[],(0,mv.createTreeNode)(o,!0,b,t)):(()=>{let h=(0,i1.createValidationError)(o,b,t,`Expected ${o} (${JSON.stringify(t)}) to be "${b}"`),y=(0,mv.createTreeNode)(o,!1,b,t);return y.errors=[h],(0,pv.createValidationResult)(!1,[h],y)})()};if((0,Zl.isNestedObjectTypeGuard)(r)){let p=n.config?{...n.config,identifier:o}:null;return d(p)}return d(null)};Ql.validateProperty=d1});var tc=W(ec=>{"use strict";Object.defineProperty(ec,"__esModule",{value:!0});ec.isNil=void 0;var u1=O(),p1=function(e,t){return e!=null?(t&&t.callbackOnError((0,u1.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};ec.isNil=p1});var fg=W(rc=>{"use strict";Object.defineProperty(rc,"__esModule",{value:!0});rc.isDefined=void 0;var m1=O(),g1=tc(),f1=function(e,t){return(0,g1.isNil)(e,null)?(t&&t.callbackOnError((0,m1.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};rc.isDefined=f1});var hg=W(nc=>{"use strict";Object.defineProperty(nc,"__esModule",{value:!0});nc.reportValidationResults=void 0;var h1=Gl(),gv=fg(),y1=tc(),S1=(e,t)=>{if(e.valid===!0||(0,y1.isNil)(t))return;let r=t.errorMode||"multi",n=(i,a)=>{(0,gv.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,h1.createSimplifiedTree)(a),null,2))},o=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,gv.isDefined)(e.tree)?n(t,e.tree):r==="multi"?o(t):s(t)};nc.reportValidationResults=S1});var yg=W(Z=>{"use strict";Object.defineProperty(Z,"__esModule",{value:!0});Z.Validation=Z.reportValidationResults=Z.validateObject=Z.validateProperty=Z.createSimplifiedTree=Z.combineResults=Z.createTreeNode=Z.createValidationError=Z.createValidationResult=Z.getExpectedTypeName=void 0;var A1=ys();Object.defineProperty(Z,"getExpectedTypeName",{enumerable:!0,get:function(){return A1.getExpectedTypeName}});var b1=Mr();Object.defineProperty(Z,"createValidationResult",{enumerable:!0,get:function(){return b1.createValidationResult}});var P1=zn();Object.defineProperty(Z,"createValidationError",{enumerable:!0,get:function(){return P1.createValidationError}});var _1=Un();Object.defineProperty(Z,"createTreeNode",{enumerable:!0,get:function(){return _1.createTreeNode}});var w1=Ss();Object.defineProperty(Z,"combineResults",{enumerable:!0,get:function(){return w1.combineResults}});var v1=Gl();Object.defineProperty(Z,"createSimplifiedTree",{enumerable:!0,get:function(){return v1.createSimplifiedTree}});var W1=Kl();Object.defineProperty(Z,"validateProperty",{enumerable:!0,get:function(){return W1.validateProperty}});var L1=bs();Object.defineProperty(Z,"validateObject",{enumerable:!0,get:function(){return L1.validateObject}});var E1=hg();Object.defineProperty(Z,"reportValidationResults",{enumerable:!0,get:function(){return E1.reportValidationResults}});var R1=Mr(),k1=Ss(),C1=zn(),T1=Un(),x1=Kl(),I1=bs(),O1=hg(),N1=Gl();Z.Validation={result:R1.createValidationResult,combine:k1.combineResults,error:C1.createValidationError,treeNode:T1.createTreeNode,property:x1.validateProperty,object:I1.validateObject,report:O1.reportValidationResults,createSimplifiedTree:N1.createSimplifiedTree}});var oc=W(Sg=>{"use strict";Object.defineProperty(Sg,"__esModule",{value:!0});Sg.isType=j1;var fv=ar(),hv=yg(),M1=St();function j1(e){if(!(0,fv.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,n){let o=n?.errorMode||"multi";if(o==="multi"||o==="json"){let s={path:n?.identifier||"root",config:n||null},i=(0,hv.validateObject)(r,e,s);return(0,hv.reportValidationResults)(i,n||null),i.valid}return(0,fv.isNonNullObject)(r,n)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],n?{...n,identifier:`${n.identifier}.${s}`}:null)}):!1}return(0,M1.attachTypeGuardMeta)(t,{schema:e})}});var bv=W(jr=>{"use strict";Object.defineProperty(jr,"__esModule",{value:!0});jr.isNestedType=jr.isShape=void 0;jr.isSchema=Ps;var yv=ar(),Sv=yg(),Av=St();function Ps(e){if(!(0,yv.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=H1(e);function r(n,o){let s=o?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:o?.identifier||"root",config:o||null},a=(0,Sv.validateObject)(n,t,i);return(0,Sv.reportValidationResults)(a,o||null),a.valid}return(0,yv.isNonNullObject)(n,o)?Object.keys(t).every(function(i){let a=t[i];return a?a(n[i],o?{...o,identifier:`${o.identifier}.${i}`}:null):!1}):!1}return(0,Av.attachTypeGuardMeta)(r,{schema:t})}function D1(e){return typeof e=="function"?e:Array.isArray(e)?F1(e):typeof e=="object"&&e!==null?Ps(e):e}function H1(e){let t={};for(let[r,n]of Object.entries(e))t[r]=D1(n);return t}function F1(e){let t=e[0],r=Ps(t);function n(o,s){return Array.isArray(o)?o.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,Av.attachTypeGuardMeta)(n,{itemGuard:r})}jr.isShape=Ps;jr.isNestedType=Ps});var Pv=W(Ag=>{"use strict";Object.defineProperty(Ag,"__esModule",{value:!0});Ag.isObjectWith=z1;var $1=oc();function z1(e){return(0,$1.isType)(e)}});var _v=W(bg=>{"use strict";Object.defineProperty(bg,"__esModule",{value:!0});bg.isObject=B1;var U1=oc();function B1(e){return(0,U1.isType)(e)}});var wv=W(Pg=>{"use strict";Object.defineProperty(Pg,"__esModule",{value:!0});Pg.guardWithTolerance=G1;function G1(e,t,r){return t(e,r),e}});var vv=W(_g=>{"use strict";Object.defineProperty(_g,"__esModule",{value:!0});_g.isBranded=q1;var V1=O();function q1(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,V1.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var Wv=W(sc=>{"use strict";Object.defineProperty(sc,"__esModule",{value:!0});sc.BrandSymbols=void 0;sc.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var Lv=W(ic=>{"use strict";Object.defineProperty(ic,"__esModule",{value:!0});ic.isAny=void 0;var K1=function(e){return!0};ic.isAny=K1});var _s=W(wg=>{"use strict";Object.defineProperty(wg,"__esModule",{value:!0});wg.reportTypeGuardError=Y1;var J1=O();function Y1(e,t,r){e&&e.callbackOnError((0,J1.generateTypeGuardError)(t,e.identifier,r))}});var Ev=W(ac=>{"use strict";Object.defineProperty(ac,"__esModule",{value:!0});ac.isBoolean=void 0;var X1=_s(),Z1=function(t,r){return typeof t!="boolean"?((0,X1.reportTypeGuardError)(r,t,"boolean"),!1):!0};ac.isBoolean=Z1});var Rv=W(lc=>{"use strict";Object.defineProperty(lc,"__esModule",{value:!0});lc.isDate=void 0;var Q1=O(),ez=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,Q1.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};lc.isDate=ez});var vg=W(cc=>{"use strict";Object.defineProperty(cc,"__esModule",{value:!0});cc.isNumber=void 0;var tz=_s(),rz=function(t,r){return typeof t!="number"||isNaN(t)?((0,tz.reportTypeGuardError)(r,t,"number"),!1):!0};cc.isNumber=rz});var kv=W(dc=>{"use strict";Object.defineProperty(dc,"__esModule",{value:!0});dc.isString=void 0;var nz=_s(),oz=function(t,r){return typeof t!="string"?((0,nz.reportTypeGuardError)(r,t,"string"),!1):!0};dc.isString=oz});var Cv=W(uc=>{"use strict";Object.defineProperty(uc,"__esModule",{value:!0});uc.isUnknown=void 0;var sz=function(e){return!0};uc.isUnknown=sz});var Tv=W(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.isFunction=void 0;var iz=O(),az=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,iz.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};pc.isFunction=az});var Iv=W(mc=>{"use strict";Object.defineProperty(mc,"__esModule",{value:!0});mc.isFile=void 0;var xv=O(),lz=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,xv.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,xv.generateTypeGuardError)(e,t.identifier,"File")),!1)};mc.isFile=lz});var Nv=W(gc=>{"use strict";Object.defineProperty(gc,"__esModule",{value:!0});gc.isFileList=void 0;var Ov=O(),cz=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,Ov.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,Ov.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};gc.isFileList=cz});var jv=W(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.isBlob=void 0;var Mv=O(),dz=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,Mv.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,Mv.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};fc.isBlob=dz});var Hv=W(hc=>{"use strict";Object.defineProperty(hc,"__esModule",{value:!0});hc.isFormData=void 0;var Dv=O(),uz=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,Dv.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,Dv.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};hc.isFormData=uz});var $v=W(yc=>{"use strict";Object.defineProperty(yc,"__esModule",{value:!0});yc.isURL=void 0;var Fv=O(),pz=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,Fv.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,Fv.generateTypeGuardError)(e,t.identifier,"URL")),!1)};yc.isURL=pz});var Uv=W(Sc=>{"use strict";Object.defineProperty(Sc,"__esModule",{value:!0});Sc.isURLSearchParams=void 0;var zv=O(),mz=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,zv.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,zv.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Sc.isURLSearchParams=mz});var Bv=W(Ac=>{"use strict";Object.defineProperty(Ac,"__esModule",{value:!0});Ac.isMap=void 0;var gz=O(),fz=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,gz.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Ac.isMap=fz});var Gv=W(bc=>{"use strict";Object.defineProperty(bc,"__esModule",{value:!0});bc.isSet=void 0;var hz=O(),yz=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,hz.generateTypeGuardError)(e,t.identifier,"Set")),!1)};bc.isSet=yz});var Vv=W(Wg=>{"use strict";Object.defineProperty(Wg,"__esModule",{value:!0});Wg.isIndexSignature=Az;var Sz=O();function Az(e,t){return function(r,n){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return n&&n.callbackOnError((0,Sz.generateTypeGuardError)(r,n.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let f=s[d],b=e(d,n?{...n,identifier:`${n.identifier}[key:${p}]`}:null),h=t(f,n?{...n,identifier:`${n.identifier}[value:${p}]`}:null);return b&&h})}}});var qv=W(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.isError=void 0;var bz=_s(),Pz=function(t,r){return t instanceof Error?!0:((0,bz.reportTypeGuardError)(r,t,"Error"),!1)};Pc.isError=Pz});var Eg=W(Lg=>{"use strict";Object.defineProperty(Lg,"__esModule",{value:!0});Lg.isArrayWithEachItem=vz;var _z=O(),wz=St();function vz(e){let t=function(r,n){return Array.isArray(r)?r.every((o,s)=>e(o,n?{...n,identifier:`${n.identifier}[${s}]`}:null)):(n&&n.callbackOnError((0,_z.generateTypeGuardError)(r,n.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,wz.attachTypeGuardMeta)(t,{itemGuard:e})}});var Rg=W(_c=>{"use strict";Object.defineProperty(_c,"__esModule",{value:!0});_c.isNonEmptyArray=void 0;var Wz=O(),Lz=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,Wz.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};_c.isNonEmptyArray=Lz});var Kv=W(kg=>{"use strict";Object.defineProperty(kg,"__esModule",{value:!0});kg.isNonEmptyArrayWithEachItem=kz;var Ez=Eg(),Rz=Rg();function kz(e){return function(t,r){return(0,Ez.isArrayWithEachItem)(e)(t,r)&&(0,Rz.isNonEmptyArray)(t,r)}}});var Yv=W(Cg=>{"use strict";Object.defineProperty(Cg,"__esModule",{value:!0});Cg.isTuple=Cz;var Jv=O();function Cz(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,Jv.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((n,o)=>n(t[o],r?{...r,identifier:`${r.identifier}[${o}]`}:null)):(r&&r.callbackOnError((0,Jv.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var Xv=W(Tg=>{"use strict";Object.defineProperty(Tg,"__esModule",{value:!0});Tg.isObjectWithEachItem=xz;var Tz=O();function xz(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,Tz.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var Zv=W(xg=>{"use strict";Object.defineProperty(xg,"__esModule",{value:!0});xg.isPartialOf=Oz;var Iz=ar();function Oz(e){return function(t,r){if(!(0,Iz.isNonNullObject)(t,r))return!1;for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&Object.prototype.hasOwnProperty.call(t,n)){let o=e[n],s=t[n];if(o&&!o(s,r?{...r,identifier:`${r.identifier}.${n}`}:null))return!1}return!0}}});var Qv=W(Ig=>{"use strict";Object.defineProperty(Ig,"__esModule",{value:!0});Ig.isPick=Mz;var Nz=ar();function Mz(e,...t){return function(r,n){if(!(0,Nz.isNonNullObject)(r,n))return!1;for(let o of t)if(!Object.prototype.hasOwnProperty.call(r,o))return n&&e(r,n),!1;return!0}}});var eW=W(Og=>{"use strict";Object.defineProperty(Og,"__esModule",{value:!0});Og.isOmit=Dz;var jz=ar();function Dz(e,...t){return function(r,n){if(!(0,jz.isNonNullObject)(r,n))return!1;let o=[],s=n?.identifier||"root",i=n?{...n,callbackOnError:d=>o.push(d)}:{identifier:s,callbackOnError:d=>o.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=o.filter(d=>{let p=d.slice(9),f=p.indexOf(" ("),b=f>=0?p.slice(0,f):p;if(a.has(b))return!1;let h=b.startsWith(s+".")&&b.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(n&&c.length>0)for(let d of c)n.callbackOnError(d);return c.length===0}}});var tW=W(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.isNonEmptyString=void 0;var Hz=O(),Fz=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,Hz.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};wc.isNonEmptyString=Fz});var rW=W(vc=>{"use strict";Object.defineProperty(vc,"__esModule",{value:!0});vc.isNonNegativeNumber=void 0;var $z=O(),zz=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,$z.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};vc.isNonNegativeNumber=zz});var nW=W(Wc=>{"use strict";Object.defineProperty(Wc,"__esModule",{value:!0});Wc.isPositiveNumber=void 0;var Uz=O(),Bz=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,Uz.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Wc.isPositiveNumber=Bz});var oW=W(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.isNonPositiveNumber=void 0;var Gz=O(),Vz=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,Gz.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Lc.isNonPositiveNumber=Vz});var sW=W(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.isNegativeNumber=void 0;var qz=O(),Kz=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,qz.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Ec.isNegativeNumber=Kz});var iW=W(Rc=>{"use strict";Object.defineProperty(Rc,"__esModule",{value:!0});Rc.isInteger=void 0;var Jz=O(),Yz=vg(),Xz=function(e,t){return!(0,Yz.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Jz.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Rc.isInteger=Xz});var aW=W(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.isPositiveInteger=void 0;var Zz=O(),Qz=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Zz.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};kc.isPositiveInteger=Qz});var lW=W(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.isNegativeInteger=void 0;var eU=O(),tU=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,eU.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Cc.isNegativeInteger=tU});var cW=W(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.isNonNegativeInteger=void 0;var rU=O(),nU=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,rU.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Tc.isNonNegativeInteger=nU});var dW=W(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.isNonPositiveInteger=void 0;var oU=O(),sU=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,oU.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};xc.isNonPositiveInteger=sU});var uW=W(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.isNumeric=void 0;var Ic=O(),iU=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Ic.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Ic.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Ic.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Ic.generateTypeGuardError)(e,t.identifier,"number key")),!1};Oc.isNumeric=iU});var pW=W(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.isBooleanLike=void 0;var Ng=O(),aU=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Ng.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Ng.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Nc.isBooleanLike=aU});var mW=W(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.isDateLike=void 0;var ws=O(),lU=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,ws.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,ws.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,ws.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,ws.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,ws.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Mc.isDateLike=lU});var gW=W(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.isBigInt=void 0;var cU=O(),dU=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,cU.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};jc.isBigInt=dU});var jg=W(Mg=>{"use strict";Object.defineProperty(Mg,"__esModule",{value:!0});Mg.isOneOf=uU;var fW=$n();function uU(...e){return function(t,r){let n=e.some(function(o){return t===o});return!n&&r&&r.callbackOnError(`${r.identifier} (${(0,fW.stringify)(t)}) must be one of following values ${e.map(fW.stringify).join(" | ")}`),n}}});var hW=W(Dg=>{"use strict";Object.defineProperty(Dg,"__esModule",{value:!0});Dg.isOneOfTypes=gU;var pU=$n(),mU=ys();function gU(...e){return function(t,r){let n=e.map(s=>({typeGuard:s,isValid:s(t,null)})),o=n.some(s=>s.isValid);if(!o&&r){let s=(0,pU.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,mU.getTypeGuardDisplayName)(c)).join(" | ")}"`];n.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return o}}});var yW=W(Hg=>{"use strict";Object.defineProperty(Hg,"__esModule",{value:!0});Hg.isIntersectionOf=fU;function fU(...e){return function(t,r){for(let n of e)if(!n(t,r))return!1;return!0}}});var SW=W(Fg=>{"use strict";Object.defineProperty(Fg,"__esModule",{value:!0});Fg.isExtensionOf=hU;function hU(e,t){return function(r,n){return e(r,n)?t(r,n):!1}}});var AW=W($g=>{"use strict";Object.defineProperty($g,"__esModule",{value:!0});$g.isNullOr=SU;var yU=St();function SU(e){function t(r,n){return r===null?!0:e(r,n)}return(0,yU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var bW=W(zg=>{"use strict";Object.defineProperty(zg,"__esModule",{value:!0});zg.isUndefinedOr=bU;var AU=St();function bU(e){function t(r,n){return r===void 0?!0:e(r,n)}return(0,AU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var PW=W(Ug=>{"use strict";Object.defineProperty(Ug,"__esModule",{value:!0});Ug.isNilOr=_U;var PU=St();function _U(e){function t(r,n){return r==null?!0:e(r,n)}return(0,PU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var _W=W(Bg=>{"use strict";Object.defineProperty(Bg,"__esModule",{value:!0});Bg.isAsserted=wU;function wU(e){return!0}});var wW=W(Gg=>{"use strict";Object.defineProperty(Gg,"__esModule",{value:!0});Gg.isEnum=WU;var vU=jg();function WU(e){return function(t,r){return(0,vU.isOneOf)(...Object.values(e))(t,r)}}});var vW=W(Vg=>{"use strict";Object.defineProperty(Vg,"__esModule",{value:!0});Vg.isEqualTo=RU;var LU=O(),EU=$n();function RU(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,LU.generateTypeGuardError)(t,r.identifier,`equal to ${(0,EU.stringify)(e)}`)),!1):!0}}});var WW=W(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.isRegex=void 0;var kU=O(),CU=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,kU.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Dc.isRegex=CU});var EW=W(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.isPattern=TU;var LW=O();function TU(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,n){return typeof r!="string"?(n&&n.callbackOnError((0,LW.generateTypeGuardError)(r,n.identifier,"string")),!1):t.test(r)?!0:(n&&n.callbackOnError((0,LW.generateTypeGuardError)(r,n.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var RW=W(Kg=>{"use strict";Object.defineProperty(Kg,"__esModule",{value:!0});Kg.by=xU;function xU(e){return function(t){return e(t,null)}}});var kW=W(Jg=>{"use strict";Object.defineProperty(Jg,"__esModule",{value:!0});Jg.toNumber=IU;function IU(e){return typeof e=="number"?e:Number(e)}});var CW=W(Yg=>{"use strict";Object.defineProperty(Yg,"__esModule",{value:!0});Yg.toDate=OU;function OU(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var TW=W(Xg=>{"use strict";Object.defineProperty(Xg,"__esModule",{value:!0});Xg.toBoolean=NU;function NU(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var xW=W(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.isSymbol=void 0;var MU=O(),jU=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,MU.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Hc.isSymbol=jU});var vs=W(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var DU=oc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return DU.isType}});var Zg=bv();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return Zg.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return Zg.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return Zg.isNestedType}});var HU=Pv();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return HU.isObjectWith}});var FU=_v();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return FU.isObject}});var $U=wv();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return $U.guardWithTolerance}});var zU=vv();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return zU.isBranded}});var UU=Wv();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return UU.BrandSymbols}});var BU=Lv();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return BU.isAny}});var GU=Ev();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return GU.isBoolean}});var VU=Rv();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return VU.isDate}});var qU=fg();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return qU.isDefined}});var KU=tc();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return KU.isNil}});var JU=vg();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return JU.isNumber}});var YU=kv();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return YU.isString}});var XU=Cv();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return XU.isUnknown}});var ZU=Tv();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return ZU.isFunction}});var QU=Iv();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return QU.isFile}});var eB=Nv();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return eB.isFileList}});var tB=jv();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return tB.isBlob}});var rB=Hv();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return rB.isFormData}});var nB=$v();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return nB.isURL}});var oB=Uv();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return oB.isURLSearchParams}});var sB=Bv();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return sB.isMap}});var iB=Gv();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return iB.isSet}});var aB=Vv();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return aB.isIndexSignature}});var lB=qv();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return lB.isError}});var cB=Eg();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return cB.isArrayWithEachItem}});var dB=Rg();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return dB.isNonEmptyArray}});var uB=Kv();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return uB.isNonEmptyArrayWithEachItem}});var pB=Yv();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return pB.isTuple}});var mB=ar();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return mB.isNonNullObject}});var gB=Xv();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return gB.isObjectWithEachItem}});var fB=Zv();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return fB.isPartialOf}});var hB=Qv();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return hB.isPick}});var yB=eW();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return yB.isOmit}});var SB=tW();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return SB.isNonEmptyString}});var AB=rW();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return AB.isNonNegativeNumber}});var bB=nW();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return bB.isPositiveNumber}});var PB=oW();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return PB.isNonPositiveNumber}});var _B=sW();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return _B.isNegativeNumber}});var wB=iW();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return wB.isInteger}});var vB=aW();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return vB.isPositiveInteger}});var WB=lW();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return WB.isNegativeInteger}});var LB=cW();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return LB.isNonNegativeInteger}});var EB=dW();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return EB.isNonPositiveInteger}});var RB=uW();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return RB.isNumeric}});var kB=pW();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return kB.isBooleanLike}});var CB=mW();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return CB.isDateLike}});var TB=gW();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return TB.isBigInt}});var xB=jg();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return xB.isOneOf}});var IB=hW();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return IB.isOneOfTypes}});var OB=yW();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return OB.isIntersectionOf}});var NB=SW();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return NB.isExtensionOf}});var MB=AW();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return MB.isNullOr}});var jB=bW();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return jB.isUndefinedOr}});var DB=PW();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return DB.isNilOr}});var HB=_W();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return HB.isAsserted}});var FB=wW();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return FB.isEnum}});var $B=vW();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return $B.isEqualTo}});var zB=WW();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return zB.isRegex}});var UB=EW();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return UB.isPattern}});var BB=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return BB.generateTypeGuardError}});var GB=RW();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return GB.by}});var VB=kW();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return VB.toNumber}});var qB=CW();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return qB.toDate}});var KB=TW();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return KB.toBoolean}});var JB=xW();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return JB.isSymbol}})});var Ws,IW,OW,Dr,Qg,p7,NW,Fc,Hr,Ls,ef,tf,rf,nf,Nt,of,$c,zc,Uc,Es,rt,Bn,Gn,Bc,lr,sf,MW,At=l(()=>{"use strict";Ws={production:".agent-witch",localhost:".local-agent-witch"},IW={production:47892,localhost:47893},OW={production:"com.agent-witch",localhost:"com.local-agent-witch"},Dr={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Qg="app",p7=`${Qg}/agent-witch.js`,NW=`${Qg}/command`,Fc={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Hr=Ws.production,Ls=Ws.localhost,ef=IW.production,tf=IW.localhost,rf=OW.production,nf=OW.localhost,Nt="profiles",of=Dr.activeProfile,$c="harness",zc="sets",Uc="manifest.json",Es=Fc.projectsDir,rt=Fc.logsDir,Bn="agent-witch.log",Gn="agent-witch.error.log",Bc=Fc.reportsDir,lr=Fc.deviceKeypairJson,sf=Qg,MW="agent-witch.js"});var Gc,jW,XB,YB,DW,HW=l(()=>{"use strict";Gc=m(require("node:path")),jW=require("node:url"),XB={},YB=()=>!0,DW=()=>{if(YB()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Gc.default.dirname(Gc.default.resolve(e))}return Gc.default.dirname((0,jW.fileURLToPath)(XB.url))}});var af,FW,M,$W,ZB,cr,L,Vc,Mt,zW,qc,Vn,Kc,Jc,te,nt,lf,ot,cf,N,df=l(()=>{"use strict";af=m(require("node:fs")),FW=m(require("node:os")),M=m(require("node:path")),$W=m(vs());At();HW();ZB=DW(),cr=e=>e.trim().toLowerCase(),L=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return M.default.resolve(e);let t=M.default.resolve(ZB),r=M.default.basename(t),n=M.default.basename(M.default.dirname(t));return r===sf&&(n===Hr||n===Ls)?M.default.dirname(t):r===Hr||r===Ls?t:M.default.join(FW.default.homedir(),Hr)},Vc=(e=L())=>M.default.join(e,sf),Mt=(e=L())=>M.default.join(Vc(e),MW),zW=(e,t,r)=>t!==null?M.default.join(e,Nt,t,r):M.default.join(e,r),qc=e=>zW(e.installDir,e.profileEmail,Es),Vn=e=>zW(e.installDir,e.profileEmail,rt),Kc=e=>e.profileEmail!==null?M.default.join(e.installDir,Nt,e.profileEmail,lr):M.default.join(e.installDir,lr),Jc=e=>M.default.basename(e)===Ls,te=(e=L())=>Jc(e)?nf:rf,nt=(e=L())=>Jc(e)?tf:ef,lf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return cr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?cr(t):null},ot=(e=L())=>{let t=M.default.join(e,of);if(!af.default.existsSync(t))return null;try{let r=JSON.parse(af.default.readFileSync(t,"utf8"));if((0,$W.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return cr(r.email)}catch{return null}return null},cf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?cr(r):null}let t=lf();return t!==null?t:ot()},N=e=>{let t=L(),r=Vc(t),n=Mt(t),o=cf(e);if(o!==null){let b=M.default.join(t,Nt,o),h=M.default.join(b,$c),y=M.default.join(b,Es),u=M.default.join(b,rt),A=M.default.join(b,Bc),S=M.default.join(b,lr),g=M.default.join(b,rt,Bn),_=M.default.join(b,rt,Gn);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:y,logsDir:u,mainLogPath:g,errorLogPath:_,reportsDir:A,deviceKeypairPath:S,configPath:M.default.join(b,"config.json"),harnessRootDir:h,harnessManifestPath:M.default.join(h,Uc),harnessSetsDir:M.default.join(h,zc)}}let s=M.default.join(t,$c),i=M.default.join(t,Es),a=M.default.join(t,rt),c=M.default.join(t,Bc),d=M.default.join(t,lr),p=M.default.join(t,rt,Bn),f=M.default.join(t,rt,Gn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:f,reportsDir:c,deviceKeypairPath:d,configPath:M.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:M.default.join(s,Uc),harnessSetsDir:M.default.join(s,zc)}}});var uf,UW,QB,eG,BW,pf,GW=l(()=>{"use strict";uf=m(require("node:fs")),UW=m(require("node:path"));At();df();QB=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eG=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,BW=e=>{let t=UW.default.join(e,Dr.wakePort);if(!uf.default.existsSync(t))return null;try{let r=JSON.parse(uf.default.readFileSync(t,"utf8"));if(QB(r)&&eG(r.wakePort))return r.wakePort}catch{return null}return null},pf=(e=L())=>BW(e)??nt(e)});var B=l(()=>{"use strict";df();GW()});var Rs,sG,iG,VW,aG,lG,qW=l(()=>{"use strict";B();Rs=te(),sG=`${Rs}-wake`,iG=`${Rs}-live`,VW=`${Rs}-watchdog`,aG=`${Rs}-automation-scheduler`,lG=`${Rs}-updater`});var mf,gf,Yc=l(()=>{"use strict";mf=new Set(["","loginwindow","_mbsetupuser","root"]),gf=5e3});var KW,cG,JW,ff,hf=l(()=>{"use strict";KW=require("node:child_process");Yc();cG=e=>e.trim().toLowerCase(),JW=e=>e==null?!1:!mf.has(cG(e)),ff=()=>{if(process.platform!=="darwin")return null;try{let t=(0,KW.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return JW(t)?t:null}catch{return null}}});var XW,YW,st,ks=l(()=>{"use strict";XW=m(require("node:os"));hf();YW=e=>e.trim().toLowerCase(),st=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?ff():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??XW.default.userInfo().username;return YW(r)===YW(n)}});var ZW,QW,Fr,eL=l(()=>{"use strict";ZW=require("node:child_process"),QW=m(require("node:fs"));B();ks();Fr=(e=L())=>{let t=Mt(e);if(!QW.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!st())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=ot(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,ZW.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var tL,Cs,Xc=l(()=>{"use strict";tL=require("node:child_process"),Cs=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,tL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Zc,yf,rL,Q,Qc,Ts=l(()=>{"use strict";Zc=m(require("node:fs")),yf=m(require("node:path"));B();At();rL=e=>{let t=yf.default.join(e,Nt);return Zc.default.existsSync(t)?Zc.default.readdirSync(t).filter(r=>Zc.default.statSync(yf.default.join(t,r)).isDirectory()).map(r=>cr(r)).toSorted():[]},Q=(e=L())=>{let t=te(e);return[{profileEmail:rL(e)[0]??null,launchAgentLabel:t}]},Qc=(e=L())=>rL(e)});var Sf,nL,oL,dG,jt,ed=l(()=>{"use strict";Sf=m(require("node:fs")),nL=m(require("node:os")),oL=m(require("node:path"));B();Ts();dG=()=>oL.default.join(nL.default.homedir(),"Library","LaunchAgents"),jt=(e=L())=>{let t=te(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of Q(e))r.add(o.launchAgentLabel);let n=dG();if(Sf.default.existsSync(n))for(let o of Sf.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var sL,xs,iL=l(()=>{"use strict";B();Xc();ed();Ts();sL=(e=L())=>{let t=new Set(Q(e).map(r=>r.launchAgentLabel));return jt(e).filter(r=>!t.has(r))},xs=(e=L())=>{for(let t of sL(e))Cs(t)}});var Is,Af=l(()=>{"use strict";B();Xc();ed();Is=(e=L())=>{for(let t of jt(e))Cs(t)}});var aL,lL,uG,$r,cL=l(()=>{"use strict";aL=require("node:child_process"),lL=require("node:util"),uG=(0,lL.promisify)(aL.execFile),$r=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await uG("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var zr,pG,bf,Pf=l(()=>{"use strict";zr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pG=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,bf=e=>{let t=e.pathValue??pG(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${zr(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${zr(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${zr(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${zr(e.homeDir)}</string>
    <key>PATH</key>
    <string>${zr(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${zr(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${zr(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var td,_f=l(()=>{"use strict";td=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Ur,wf,Os,mG,gG,fG,dL,Dt,vf=l(()=>{"use strict";Ur=m(require("node:fs")),wf=m(require("node:os")),Os=m(require("node:path"));At();B();Pf();_f();mG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gG=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,fG=e=>{let t=Os.default.join(e,Dr.wakePort);if(!Ur.default.existsSync(t))return nt(e);try{let r=JSON.parse(Ur.default.readFileSync(t,"utf8"));if(mG(r)&&gG(r.wakePort))return r.wakePort}catch{return nt(e)}return nt(e)},dL=(e,t=wf.default.homedir())=>Os.default.join(t,"Library","LaunchAgents",`${e}.plist`),Dt=e=>{let t=e.installDir??L(),r=e.homeDir??wf.default.homedir(),n=dL(e.launchAgentLabel,r),o=Ur.default.existsSync(n)?Ur.default.readFileSync(n,"utf8"):null;if(o!==null&&td(o))return{ok:!0,rewritten:!1,plistPath:n};let s=bf({launchAgentLabel:e.launchAgentLabel,runPath:Os.default.join(t,NW,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??fG(t)});if(!td(s))return{ok:!1,rewritten:!1,plistPath:n,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Ur.default.mkdirSync(Os.default.dirname(n),{recursive:!0}),Ur.default.writeFileSync(n,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:n,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:n}}});var pL,mL,gL,Ns,hG,yG,uL,be,Wf=l(()=>{"use strict";pL=require("node:child_process"),mL=m(require("node:fs")),gL=require("node:util");B();vf();ks();Ns=(0,gL.promisify)(pL.execFile),hG=async e=>{try{return await Ns("launchctl",["print",e]),!0}catch{return!1}},yG=async(e,t,r)=>{await hG(t)&&await Ns("launchctl",["bootout",t]).catch(()=>{}),await Ns("launchctl",["bootstrap",e,r]),await Ns("launchctl",["enable",t])},uL=async e=>{try{return await Ns("launchctl",["kickstart","-k",e]),!0}catch{return!1}},be=async(e,t=L())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!st())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let n=`gui/${r}`,o=`${n}/${e}`,s=Dt({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await uL(o))return{ok:!0};let i=s.plistPath;if(!mL.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await yG(n,o,i),await uL(o)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Br,fL=l(()=>{"use strict";B();Wf();Ts();Br=async(e=L())=>{let t=[];for(let r of Q(e))(await be(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var $e,Ht,hL=l(()=>{"use strict";Af();ks();Yc();$e=e=>{st()||(Is(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Ht=(e,t=gf)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{st()||e()},t);return()=>{clearInterval(r)}}});var ee=l(()=>{"use strict";qW();eL();Xc();iL();Af();ed();ks();cL();fL();Wf();vf();_f();Pf();Ts();hf();Yc();hL()});var Lf=l(()=>{"use strict";ee()});var yL,SL,rd,AL,qn,bL,PL,Gr=l(()=>{"use strict";yL=".agent-witch",SL="memory",rd="project.json",AL="chunks.ndjson",qn="runs.ndjson",bL="reports",PL=".json"});var _L=l(()=>{"use strict";Gr()});var wL,nd,Ef=l(()=>{"use strict";wL=m(require("node:path"));_L();nd=(e,t)=>wL.default.join(e.trim(),`${t.trim()}${PL}`)});var Ms,vL,WL=l(()=>{"use strict";Ms="agent-witch.js",vL="command"});var od=l(()=>{"use strict";WL()});var Vr,LL,EL=l(()=>{"use strict";od();Vr=e=>`'${e.replace(/'/g,"'\\''")}'`,LL=e=>{let t=`${e.installDir.trim()}/${"app"}/${Ms}`,r=[Vr("node"),Vr(t),"report","write","--key",Vr(e.reportKey.trim()),"--agent-run-id",Vr(e.agentRunId.trim()),"--status",Vr(e.status),"--summary",Vr(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Vr(e.details.trim())),r.join(" ")}});var bt,RL,SG,Rf,sd=l(()=>{"use strict";Ef();EL();bt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},RL=e=>e===bt.COMPLETED||e===bt.FAILED,SG=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Rf=(e,t)=>{let r=nd(t.reportsDir,t.reportKey),n=LL({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:bt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${SG({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var Pe=l(()=>{"use strict";At();B()});var Ds,CL,kL,TL,AG,Kn,bG,xL,Hs,Fs,kf,IL,OL,$s=l(()=>{"use strict";Ds=m(require("node:fs")),CL=m(require("node:path"));sd();Ef();Pe();kL=50,TL=e=>{let t=N(),r=nd(t.reportsDir,e);return Ds.default.mkdirSync(CL.default.dirname(r),{recursive:!0}),r},AG=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Kn=e=>{let t=TL(e);if(!Ds.default.existsSync(t))return null;try{let r=JSON.parse(Ds.default.readFileSync(t,"utf8"));return AG(r)?r:null}catch{return null}},bG=(e,t)=>{let r=[...e,t];return r.length>kL?r.slice(r.length-kL):r},xL=e=>{let t=TL(e.reportKey);Ds.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Hs=e=>{let t=Kn(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:bG(t?.history??[],n)};return xL(o),o},Fs=e=>{let t=Kn(e.reportKey);return t!==null?t:Hs({reportKey:e.reportKey,agentRunId:e.agentRunId,status:bt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},kf=(e,t)=>{let r=t.trim();if(r.length===0)return Kn(e);let n=Kn(e);if(n===null)return null;let o=n.details!==void 0&&n.details.trim().length>0?`${n.details.trim()}
${r}`:r,s={...n,updatedAt:new Date().toISOString(),details:o};return xL(s),s},IL=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},OL=e=>{if(e===null||!RL(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===bt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var PG,_G,zs,NL,id,Cf=l(()=>{"use strict";sd();$s();PG=new Set(Object.values(bt)),_G=e=>PG.has(e),zs=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},NL=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},id=e=>{if(e[0]!=="write")return NL(),1;let r=zs(e,"--key"),n=zs(e,"--agent-run-id"),o=zs(e,"--status"),s=zs(e,"--summary"),i=zs(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!_G(o)?(NL(),1):(Hs({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var it,Jn=l(()=>{"use strict";it=()=>!0});var Tf,ML,qr,ad=l(()=>{"use strict";Tf=m(require("node:path")),ML=require("node:url");Jn();qr=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Tf.default.resolve(t);return it()?r===Tf.default.resolve(__filename):r===(0,ML.fileURLToPath)(e)}});var ld,Yn,WG,mY,Xn=l(()=>{"use strict";ld="agent-witch.js",Yn="deps.tar.gz",WG="install.sh",mY={mainScript:`app/${ld}`,depsArchive:`app/${Yn}`,installShell:WG}});var FL=l(()=>{"use strict";Xn()});var $L=l(()=>{"use strict";Xn();FL()});var Us,If,cd,LG,Bs,_e,Qn,Gs,Vs,Kr,Of=l(()=>{"use strict";Us=m(require("node:fs")),If=m(require("node:path"));$L();B();cd="install-version.json",LG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Bs=(e=L())=>If.default.join(e,cd),_e=(e=L())=>{let t=Bs(e);if(!Us.default.existsSync(t))return null;try{let r=JSON.parse(Us.default.readFileSync(t,"utf8"));return!LG(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Qn=(e,t=L())=>{let r=Bs(t);Us.default.mkdirSync(If.default.dirname(r),{recursive:!0}),Us.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Gs=(e=L())=>_e(e)?.bundleVersion??"190",Vs=(e,t)=>{let r=_e(e);if(r!==null)return r;let n={bundleVersion:"190",appOrigin:t,updatedAt:new Date().toISOString()};return Qn(n,e),n},Kr=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var zL,Jr,Nf,Mf,jf,dd,Pt,Yr,Df=l(()=>{"use strict";zL=require("node:crypto"),Jr=m(require("node:fs")),Nf=m(require("node:path"));B();Mf="self-update-log.ndjson",jf=100,dd=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Vn({installDir:e,profileEmail:t.profileEmail});return Nf.default.join(r,Mf)},Pt=(e,t=L())=>{let r={id:(0,zL.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=dd(t);Jr.default.mkdirSync(Nf.default.dirname(n),{recursive:!0});let o=Jr.default.existsSync(n)?Jr.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-jf+1)),JSON.stringify(r)];return Jr.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Yr=(e=20,t=L())=>{let r=dd(t);if(!Jr.default.existsSync(r))return[];let n=Jr.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var Hf,CY,Ff=l(()=>{"use strict";Xn();Hf="deps",CY=`${"app"}/${Yn}`});var UL=l(()=>{"use strict";Ff()});var BL,dr,Xr,GL,$f,zf,VL=l(()=>{"use strict";BL=require("node:child_process"),dr=m(require("node:fs")),Xr=m(require("node:path"));Xn();Ff();GL=e=>Xr.default.join(e,"app",Hf),$f=e=>{let t=Xr.default.join(e,"app"),r=Xr.default.join(t,Yn);dr.default.existsSync(r)&&(dr.default.rmSync(GL(e),{recursive:!0,force:!0}),dr.default.mkdirSync(t,{recursive:!0}),(0,BL.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),dr.default.rmSync(r,{force:!0}))},zf=e=>{dr.default.rmSync(Xr.default.join(e,"node_modules"),{recursive:!0,force:!0}),dr.default.rmSync(Xr.default.join(e,"package.json"),{force:!0}),dr.default.rmSync(Xr.default.join(e,"package-lock.json"),{force:!0})}});var qL=l(()=>{"use strict";UL();VL()});var Ft,ud,KL=l(()=>{"use strict";Ft="https://www.agentwitch.com",ud="wss://www.agentwitch.com/api/agent-witch/ws"});var qs,$t,JL=l(()=>{"use strict";qs="127.0.0.1",$t=`http://${qs}:43347`});var zt=l(()=>{"use strict";KL();JL()});var Ks,pd,YL,Bf,EG,XL,qf,ZL,at,Js,Ys,Kf,Gf,Vf,Xs,Jf,Yf,Xf,eo=l(()=>{"use strict";Ks=m(require("node:fs")),pd=m(require("node:path")),YL="active-writer-work.json",Bf=new Set,EG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),XL=e=>e.profileEmail===null?pd.default.join(e.installDir,YL):pd.default.join(e.installDir,"profiles",e.profileEmail,YL),qf=e=>{let t=XL(e);if(!Ks.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Ks.default.readFileSync(t,"utf8"));return!EG(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},ZL=(e,t)=>{let r=XL(e);Ks.default.mkdirSync(pd.default.dirname(r),{recursive:!0}),Ks.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},at=e=>qf(e).activeCount>0,Js=e=>{let t=qf(e);ZL(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Ys=e=>{let t=qf(e),r=Math.max(0,t.activeCount-1);if(ZL(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let n of Bf)n()},Kf=e=>(Bf.add(e),()=>{Bf.delete(e)}),Gf=null,Vf=null,Xs=e=>{Gf=e},Jf=e=>{Vf=e},Yf=()=>{let e=Gf;return Gf=null,e},Xf=()=>{let e=Vf;return Vf=null,e}});var we,Zf=l(()=>{"use strict";we=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var to,md,Zs,Qf=l(()=>{"use strict";to="qwen2.5:7b",md="nomic-embed-text",Zs="Install Ollama from https://ollama.com/download"});var Qs,QL,eh=l(()=>{"use strict";Qf();Qs=()=>`
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
    echo "Ollama is missing. ${Zs}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Zs}" >&2
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
  agent_witch_ensure_ollama_model "${to}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${md}" "\${pull_log}"
}
`,QL=()=>`
${Qs()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var eE,RG,gd,th=l(()=>{"use strict";eE=require("node:child_process");B();eh();RG=e=>new Promise(t=>{let r=(0,eE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:L()}}),n=[];r.stdout.on("data",o=>{n.push(o)}),r.stderr.on("data",o=>{n.push(o)}),r.on("error",o=>{t({exitCode:1,output:o.message})}),r.on("close",o=>{t({exitCode:o??1,output:Buffer.concat(n).toString("utf8").trim()})})}),gd=async(e=RG)=>{let t=`${Qs()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var ur,fd,tE,kG,rE,no,CG,TG,xG,ro,Zr,Qr,nE=l(()=>{"use strict";ur=m(require("node:fs")),fd=m(require("node:path"));qL();ee();B();Xn();zt();Of();eo();Zf();Df();th();tE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kG=e=>{let t=ot(e),r=t===null?N():N(t);if(!ur.default.existsSync(r.configPath))return null;try{let n=JSON.parse(ur.default.readFileSync(r.configPath,"utf8"));return!tE(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},rE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!tE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},no=async e=>(await rE(e))?.bundleVersion??null,CG=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=fd.default.join(t,r);ur.default.mkdirSync(fd.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());ur.default.writeFileSync(o,s),r.endsWith(".js")&&ur.default.chmodSync(o,493)},TG=async()=>{xs(),await Br()},xG=(e,t)=>e!==null?we(e):t??Ft,ro=(e,t)=>({localBundleVersion:t,...e}),Zr=async e=>{let t=L(),r=_e(t),n=r?.bundleVersion??null,o=await gd();Pt({event:"check_complete",ok:o.ok,message:o.message,localBundleVersion:n,remoteBundleVersion:null});let s=kG(t),i=xG(s,r?.appOrigin);if(i===null){let d=ro({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return Pt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}let a=await rE(i);if(a===null){let d=ro({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return Pt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}if(!(e?.force===!0||Kr(n,a.bundleVersion))){let d=ro({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},n);return Pt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),d}try{for(let b of a.scripts)await CG(i,t,b);let d=fd.default.join(t,ld);ur.default.existsSync(d)&&ur.default.rmSync(d,{force:!0}),$f(t),zf(t),Qn({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=N(ot(t));if(at(p)){let b=ro({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Pt({event:"update_applied",ok:!0,message:b.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),b}await TG();let f=ro({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Pt({event:"update_applied",ok:!0,message:f.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),f}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",f=ro({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},n);return Pt({event:"update_failed",ok:!1,message:p,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),f}},Qr=()=>{let e=L();return{local:_e(e),logs:Yr(20,e)}}});var oE={};yt(oE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>cd,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Zs,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>md,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>to,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Mf,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>jf,appendAgentWitchSelfUpdateLog:()=>Pt,buildAgentWitchEnsureOllamaShell:()=>Qs,buildAgentWitchInstallScriptOllama:()=>QL,buildAgentWitchSelfUpdateStatus:()=>Qr,ensureAgentWitchInstallVersionRecorded:()=>Vs,ensureAgentWitchOllamaInstalled:()=>gd,fetchAgentWitchRemoteInstallBundleVersion:()=>no,isRemoteAgentWitchBundleVersionNewer:()=>Kr,readAgentWitchInstallVersion:()=>_e,readAgentWitchSelfUpdateLogs:()=>Yr,resolveAgentWitchAppOriginFromWsUrl:()=>we,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Gs,resolveAgentWitchInstallVersionPath:()=>Bs,resolveAgentWitchSelfUpdateLogPath:()=>dd,runAgentWitchSelfUpdate:()=>Zr,writeAgentWitchInstallVersion:()=>Qn});var Ge=l(()=>{"use strict";Of();Df();nE();Zf();Qf();eh();th()});var rh={};yt(rh,{buildAgentWitchSelfUpdateStatus:()=>Qr,fetchAgentWitchRemoteInstallBundleVersion:()=>no,runAgentWitchSelfUpdate:()=>Zr});var nh=l(()=>{"use strict";Ge()});function oo(e){return(0,sE.createHash)("sha256").update(e.trim()).digest("hex")}var sE,oh=l(()=>{"use strict";sE=require("node:crypto")});var so,ei,IG,iE,sh,aE=l(()=>{"use strict";so=m(require("node:fs")),ei=m(require("node:path"));oh();Pe();IG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iE=e=>{if(!so.default.existsSync(e))return null;try{let t=JSON.parse(so.default.readFileSync(e,"utf8"));return!IG(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:oo(t.pairingToken.trim())}catch{return null}},sh=(e=L())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(iE(ei.default.join(e,"config.json")));let o=ei.default.join(e,Nt);if(!so.default.existsSync(o))return t;for(let s of so.default.readdirSync(o)){let i=ei.default.join(o,s);so.default.statSync(i).isDirectory()&&n(iE(ei.default.join(i,"config.json")))}return t}});var ih,lE,hd,ti,ri,OG,NG,MG,cE,oe,se,yd,_t,lt=l(()=>{"use strict";ih=m(require("node:fs")),lE=m(require("node:os")),hd=m(require("node:path")),ti={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},ri=e=>e.trim().length>0,OG=e=>{let t=hd.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},NG=()=>{let e=lE.default.homedir(),t=hd.default.join(e,".local","bin","agent");if(ih.default.existsSync(t))return t;let r=hd.default.join(e,".local","bin","cursor-agent");return ih.default.existsSync(r)?r:ti.cursorCommand},MG=e=>{let t=e.trim();return!ri(t)||t===ti.cursorCommand?NG():t},cE=(e,t)=>OG(e)?t:["agent",...t],oe=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",se=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:ri(t)?t.trim():ti.claudeCommand,codexCommand:ri(r)?r.trim():ti.codexCommand,cursorCommand:MG(n),antigravityCommand:ri(o)?o.trim():ti.antigravityCommand}},yd=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:cE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},_t=(e,t,r,n)=>{let o=t.trim();if(!ri(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:cE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",o])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var pr,jG,io,DG,ao,Sd=l(()=>{"use strict";pr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,jG=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([n,o])=>{if(typeof o!="object"||o===null)return{name:n,total:0};let s=o;return{name:n,total:pr(s.inputTokens)+pr(s.outputTokens)+pr(s.cacheReadInputTokens)+pr(s.cacheCreationInputTokens)}})].sort((n,o)=>o.total-n.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},io=e=>{let t=e.trim(),r=t.indexOf("{"),n=t.lastIndexOf("}");if(r<0||n<=r)return null;let o;try{o=JSON.parse(t.slice(r,n+1))}catch{return null}if(typeof o!="object"||o===null)return null;let s=o;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=pr(a.input_tokens)+pr(a.cache_creation_input_tokens)+pr(a.cache_read_input_tokens),d=pr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:jG(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},DG=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),ao=(e,t)=>{let r=io(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??DG(r)}}});var ah,HG,FG,lh,ch=l(()=>{"use strict";ah=e=>e.toLocaleString("en-US"),HG=e=>e<.01?e.toFixed(4):e.toFixed(3),FG=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${HG(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${ah(e.inputTokens)} in / ${ah(e.outputTokens)} out (${ah(e.totalTokens)} total)`,t].join(`
`)},lh=(e,t)=>{if(t===void 0)return e;let r=FG(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var Ad,dh=l(()=>{"use strict";Ad={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var en,uh,bd,ph=l(()=>{"use strict";dh();en="auto",uh=e=>({value:en,label:`Auto (${Ad[e]})`}),bd={anthropic:[uh("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[uh("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[uh("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var lo,ni,mh,oi=l(()=>{"use strict";dh();ph();lo=e=>{let t=e?.trim()??"";if(!(t.length===0||t===en))return t},ni=(e,t)=>{let r=lo(t);return r===void 0?Ad[e]:r},mh=e=>{let t=lo(e);return t===void 0?en:t}});var Pd,$G,zG,_d,dE=l(()=>{"use strict";Pd={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},$G=e=>{let t=Pd[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Pd["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Pd["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Pd["gemini-2.0-flash"]:null},zG=(e,t,r)=>{let n=$G(e);if(n===null)return null;let o=t/1e6*n.inputUsd,s=r/1e6*n.outputUsd;return o+s},_d=e=>{let t=zG(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var co,UG,BG,GG,wd,uE=l(()=>{"use strict";dE();co=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),UG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=co(r.input_tokens),o=co(r.output_tokens);return n===0&&o===0?null:_d({provider:"anthropic",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},BG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=co(r.prompt_tokens),o=co(r.completion_tokens);return n===0&&o===0?null:_d({provider:"openai",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},GG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let n=co(r.promptTokenCount),o=co(r.candidatesTokenCount);return n===0&&o===0?null:_d({provider:"google",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},wd=(e,t,r)=>e==="anthropic"?UG(t,r):e==="openai"?BG(t,r):GG(t,r)});var VG,gh,qG,KG,JG,YG,XG,fh,hh=l(()=>{"use strict";oi();uE();VG=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let n=r;return n.type==="text"&&typeof n.text=="string"?n.text:""}).join(""):""},gh=(e,t,r)=>{let n=r?.trim()??"";return n.length>0?n:ni(e,t.model)},qG=async e=>{let t=gh("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Anthropic API error (${String(r.status)})`};let o=VG(n);o.length>0&&e.onChunk?.(o);let s=wd("anthropic",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},KG=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.message;return typeof n?.content=="string"?n.content:""},JG=async e=>{let t=gh("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`OpenAI API error (${String(r.status)})`};let o=KG(n);o.length>0&&e.onChunk?.(o);let s=wd("openai",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},YG=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.content?.parts;return Array.isArray(n)?n.map(o=>{if(typeof o!="object"||o===null)return"";let s=o.text;return typeof s=="string"?s:""}).join(""):""},XG=async e=>{let t=gh("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,n=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),o=await n.json().catch(()=>null);if(!n.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Google API error (${String(n.status)})`};let s=YG(o);s.length>0&&e.onChunk?.(s);let i=wd("google",o,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},fh=async e=>{try{return e.provider==="anthropic"?await qG(e):e.provider==="openai"?await JG(e):await XG(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var ze,si=l(()=>{"use strict";ze=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var pE,ZG,vd,yh=l(()=>{"use strict";pE=m(require("node:path")),ZG="writer-api-secrets.json",vd=e=>pE.default.join(e,ZG)});var Sh,mE,QG,mr,Ne,gr=l(()=>{"use strict";Sh=m(require("node:fs"));oi();yh();mE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),QG=e=>{if(!mE(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,n=lo(r);return{apiKey:t,...n!==void 0?{model:n}:{}}},mr=e=>{let t=vd(e);if(!Sh.default.existsSync(t))return{};try{let r=JSON.parse(Sh.default.readFileSync(t,"utf8"));if(!mE(r))return{};let n={},o=["anthropic","openai","google"];for(let s of o){let i=QG(r[s]);i!==null&&(n[s]=i)}return n}catch{return{}}},Ne=(e,t)=>mr(e)[t]??null});var ve,ii=l(()=>{"use strict";ve=e=>e==="api"?"api":"cli"});var gE,me,tn,Ut=l(()=>{"use strict";gE=m(require("node:path"));si();gr();ii();me=e=>gE.default.dirname(e),tn=(e,t)=>{if(ve(e.writerExecutionBackend)!=="api")return!1;let r=ze(t);if(r===null)return!1;let n=me(e.layout.configPath),o=Ne(n,r);return o!==null&&o.apiKey.length>0}});var ai,Ah=l(()=>{"use strict";ch();hh();si();gr();Ut();ai=async(e,t,r,n)=>{let o=r.trim();if(o.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=ze(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=me(e.layout.configPath),a=Ne(i,s);if(a===null){let d=Object.keys(mr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await fh({provider:s,secret:a,prompt:o,onChunk:n});return{exitCode:c.exitCode,output:lh(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var fE,uo,bh=l(()=>{"use strict";fE=require("node:child_process");lt();Sd();Ah();Ut();uo=(e,t,r)=>new Promise(n=>{if(!oe(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(tn(e,t)){ai(e,t,r).then(n);return}let o=_t(t,r,se({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,fE.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=ao(i.join("")),p=a.join("").trim(),f=[d.output.trim(),p].filter(b=>b.length>0).join(`
`);n({exitCode:c??-1,output:f})}),s.on("error",c=>{n({exitCode:-1,output:c.message})})})});var hE=l(()=>{"use strict"});var yE=l(()=>{"use strict";ch();bh();hh();hE();gr();Ut()});var SE,AE,bE,PE=l(()=>{"use strict";SE="claude",AE="codex",bE="cursor"});var _E,e2,Ph,li,Wd=l(()=>{"use strict";_E=m(require("node:path"));zt();At();e2="ws://localhost:3000/api/agent-witch/ws",Ph=e=>e.replace(/\/$/,""),li=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Ph(t);let r=_E.default.basename(e.installDir);if(r===Ws.production)return ud;let n=e.configWsUrl?.trim()??"";return r===Ws.localhost?n.length>0?Ph(n):e2:n.length>0?Ph(n):ud}});var r2,_h,wh=l(()=>{"use strict";PE();Wd();ii();r2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_h=e=>{if(!r2(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=li({installDir:e.layout.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??SE,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??AE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??bE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:n,workspace:o,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:ve(t.writerExecutionBackend),layout:e.layout}}}});var vh,Wh,Lh=l(()=>{"use strict";vh=m(require("node:fs"));B();wh();Wh=e=>{let t=N(e);if(!vh.default.existsSync(t.configPath))return null;try{let r=JSON.parse(vh.default.readFileSync(t.configPath,"utf8")),n=_h({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!n.ok){if(n.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return n.config}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}}});var ci,wE=l(()=>{"use strict";ci=(e,t,r)=>{let n=r?.trim()??"",o=e?.trim()??"";return n.length>0?o.length>0?o:null:o.length>0?o:t()}});var Eh,n2,Rh,vE=l(()=>{"use strict";Eh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),n2=e=>{if(!Eh(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",n=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||n.length===0||!Array.isArray(e.entries))return null;let o=e.entries.flatMap(s=>{if(!Eh(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(f=>{if(!Eh(f))return[];let b=typeof f.itemKey=="string"?f.itemKey.trim():"",h=typeof f.relativePath=="string"?f.relativePath:"",y=typeof f.contentSha256=="string"?f.contentSha256.trim():"";return b.length===0||y.length===0?[]:[{itemKey:b,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:n,entries:o}},Rh=n2});var WE,o2,Ld,kh=l(()=>{"use strict";WE=m(require("node:path")),o2=(e,t)=>{let r=t.trim();return WE.default.join(e,"components","store",r.slice(0,2),r)},Ld=o2});var LE,s2,Ch,EE=l(()=>{"use strict";LE=m(require("node:fs"));kh();s2=(e,t)=>{let r=[];for(let n of t.entries)for(let o of n.items){let s=Ld(e.installDir,o.contentSha256);LE.default.existsSync(s)||r.push(o.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},Ch=s2});var di,po,i2,Th,a2,xh,Ih=l(()=>{"use strict";di=m(require("node:fs")),po=m(require("node:path"));kh();i2=(e,t)=>po.default.join(e.installDir,"runs",t,"overlay"),Th=(e,t)=>po.default.join(i2(e,t),".cursor"),a2=(e,t,r)=>{let n=r.entries.filter(s=>s.scope==="run");if(n.length===0)return{ok:!0};let o=Th(e,t);di.default.mkdirSync(o,{recursive:!0});for(let s of n)for(let i of s.items){let a=Ld(e.installDir,i.contentSha256);if(!di.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?po.default.join(o,c):po.default.join(o,i.itemKey);di.default.mkdirSync(po.default.dirname(d),{recursive:!0}),di.default.copyFileSync(a,d)}return{ok:!0}},xh=a2});var Oh,RE,l2,ui,kE=l(()=>{"use strict";Oh=m(require("node:fs")),RE=m(require("node:path")),l2=(e,t)=>{let r=RE.default.join(e.installDir,"runs",t);Oh.default.existsSync(r)&&Oh.default.rmSync(r,{recursive:!0,force:!0})},ui=l2});var c2,Nh,CE=l(()=>{"use strict";Ih();c2=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let n=Th(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:n}},Nh=c2});var Mh,d2,u2,p2,m2,g2,F,TE=l(()=>{"use strict";Mh=m(require("node:fs"));Wd();B();ii();d2="claude",u2="codex",p2="cursor",m2="agy",g2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F=()=>{let e=N();if(!Mh.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Mh.default.readFileSync(e.configPath,"utf8"));if(!g2(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=li({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,writerExecutionBackend:ve(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:d2,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:u2,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:p2,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:m2,pairingToken:s,layout:e}}catch{return null}}});var Ed,xE,IE=l(()=>{"use strict";Ed=m(require("node:fs"));yh();xE=(e,t)=>{let r=vd(e);Ed.default.mkdirSync(e,{recursive:!0}),Ed.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Ed.default.chmodSync(r,384)}catch{}}});var Rd,OE,jh=l(()=>{"use strict";Rd=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),n=t.slice(-4);return`${r}${"\u2022".repeat(12)}${n}`},OE=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Rd(t)}});var pi,f2,Dh,Hh,NE=l(()=>{"use strict";pi=m(require("node:fs"));gr();IE();jh();oi();Ut();f2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Dh=(e,t,r,n)=>{let o=e[t],s=r?.trim()??"",i=OE(s,o?.apiKey)?"":s,a=i.length>0?i:o?.apiKey;if(a===void 0||a.length===0)return e;let c=n!==void 0?lo(n):o?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Hh=e=>{let t=me(e.configPath),r={};if(pi.default.existsSync(e.configPath))try{let o=JSON.parse(pi.default.readFileSync(e.configPath,"utf8"));f2(o)&&(r={...o})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,pi.default.mkdirSync(t,{recursive:!0}),pi.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let n=Dh(Dh(Dh(mr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);xE(t,n)}});var Fh,ME=l(()=>{"use strict";Fh={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var $h,jE=l(()=>{"use strict";si();gr();Ut();Ut();$h=(e,t)=>{if(tn(e,t))return!1;let r=ze(t);if(r===null)return!1;let n=me(e.layout.configPath),o=Ne(n,r);return o===null||o.apiKey.trim().length===0}});var DE,zh,Uh=l(()=>{"use strict";DE=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let n=e.readConfig(r);return n===null?[]:[n]})},zh=async e=>{let t=DE(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=DE(e);if(o.length>0){r(o);return}setTimeout(n,e.pollIntervalMs)};n()}))}});var h2,Bh,HE=l(()=>{"use strict";ee();Lh();Uh();h2=1e4,Bh=()=>zh({listProfileEmails:Qc,readConfig:Wh,pollIntervalMs:h2,logWaiting:e=>{console.error(e)}})});var ie=l(()=>{"use strict";bh();yE();Lh();Wd();wE();vE();EE();Ih();kE();CE();ii();TE();NE();gr();Ut();jh();oi();ME();Ah();Ut();jE();si();gr();HE();wh();Uh()});var kd,FE,y2,S2,$E,Cd,mi,Td,gi=l(()=>{"use strict";kd=m(require("node:fs")),FE=m(require("node:path")),y2="wake-port.json",S2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$E=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Cd=e=>FE.default.join(e,y2),mi=e=>{let t=Cd(e);if(!kd.default.existsSync(t))return null;try{let r=JSON.parse(kd.default.readFileSync(t,"utf8"));if(S2(r)&&$E(r.wakePort))return r.wakePort}catch{return null}return null},Td=(e,t)=>{if(!$E(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Cd(e);kd.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var BQ,GQ,VQ,ct,zE,fi=l(()=>{"use strict";gi();Pe();gi();BQ=nt(),GQ=`${te()}-wake`,VQ=te(),ct=()=>{let e=L(),t=mi(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return nt()},zE=e=>{let t=L();mi(t)===null&&Td(t,e)}});var UE=l(()=>{"use strict";oh();ee();aE();ie();fi()});var Gh,hi,yi,BE=l(()=>{"use strict";Gh=m(require("node:os"));UE();hi=()=>{let e=Q();return{ok:!0,port:ct(),hostname:Gh.default.hostname(),profileCount:e.length}},yi=()=>{let e=Q(),t=F()?.pairingToken.trim()??"",r=t.length>0?oo(t):null,n=sh();return{hostname:Gh.default.hostname(),port:ct(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var Vh=l(()=>{"use strict";BE()});var GE,VE,qE,xd,mo=l(()=>{"use strict";GE="materialization.json",VE="backups",qE=".gitignore",xd=e=>`harness-set:${e.trim()}`});var KE,JE,Id,YE=l(()=>{"use strict";KE=m(require("node:crypto")),JE=m(require("node:fs")),Id=e=>{try{let t=JE.default.readFileSync(e);return KE.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var fr,rn,A2,XE,qh,ZE=l(()=>{"use strict";fr=m(require("node:fs")),rn=m(require("node:path"));YE();A2=(e,t,r,n)=>{let o=new Date().toISOString().replaceAll(":","-"),s=rn.default.join(t,o,n);return fr.default.mkdirSync(rn.default.dirname(s),{recursive:!0}),fr.default.copyFileSync(r,s),rn.default.relative(e,s).replaceAll("\\","/")},XE=e=>{let t=rn.default.join(e.repoRoot,e.repoRelativeDestination),r=Id(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let n=e.ledger.entries[e.repoRelativeDestination];if(fr.default.existsSync(t)){let o=Id(t);if(o===r)return{kind:"skipped_unchanged"};if(!(n!==void 0&&n.componentId===e.componentId)&&o!==null){let i=A2(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return fr.default.mkdirSync(rn.default.dirname(t),{recursive:!0}),fr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return fr.default.mkdirSync(rn.default.dirname(t),{recursive:!0}),fr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},qh=e=>{let t=Id(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var Kh,QE,Od,Jh=l(()=>{"use strict";Kh=m(require("node:fs"));mo();QE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Od=e=>{if(!Kh.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(Kh.default.readFileSync(e,"utf8"));if(QE(t)&&t.version===1&&QE(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var hr,Nd,eR,tR=l(()=>{"use strict";hr=m(require("node:fs")),Nd=m(require("node:path"));mo();eR=e=>{let t=new Set(e.setSlugs.map(s=>xd(s))),r=[],n=[],o={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){o[s]=i;continue}let a=Nd.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Nd.default.join(e.repoRoot,i.backupPath);hr.default.existsSync(c)?(hr.default.mkdirSync(Nd.default.dirname(a),{recursive:!0}),hr.default.copyFileSync(c,a),n.push(s)):hr.default.existsSync(a)&&hr.default.rmSync(a,{force:!0})}else hr.default.existsSync(a)&&hr.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:o},summary:{removedPaths:r,restoredPaths:n}}}});var Yh,Md,Xh=l(()=>{"use strict";Yh=m(require("node:path"));mo();Md=e=>({ledgerFilePath:Yh.default.join(e.metaDirPath,GE),backupsDirPath:Yh.default.join(e.metaDirPath,VE)})});var Zh,rR,nR=l(()=>{"use strict";Zh=m(require("node:path")),rR=(e,t)=>{let n=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(n.length===0)return Zh.default.posix.join("rules",e,"file");let o=n[n.length-1]??"file",s=n[0]??"rules";return Zh.default.posix.join(s,e,o)}});var Qh,oR,ey,sR=l(()=>{"use strict";Qh=m(require("node:fs")),oR=m(require("node:path")),ey=(e,t)=>{Qh.default.mkdirSync(oR.default.dirname(e),{recursive:!0}),Qh.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var ty,b2,Ve,Ai=l(()=>{"use strict";ty=m(require("node:os")),b2=e=>{let t=e.trim();return t.startsWith("~/")?`${ty.default.homedir()}${t.slice(1)}`:t==="~"?ty.default.homedir():t},Ve=b2});var jd,iR,P2,aR,lR=l(()=>{"use strict";jd=m(require("node:fs")),iR=m(require("node:path"));mo();Gr();P2=`*
!${rd}
`,aR=e=>{let t=iR.default.join(e,qE);jd.default.existsSync(t)||(jd.default.mkdirSync(e,{recursive:!0}),jd.default.writeFileSync(t,P2))}});var nn,qe,on=l(()=>{"use strict";nn=m(require("node:path"));Gr();Ai();qe=e=>{let t=Ve(e),r=nn.default.join(t,yL);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:nn.default.join(r,"rag"),memoryDirPath:nn.default.join(r,SL),reportsDirPath:nn.default.join(r,bL),metaFilePath:nn.default.join(r,rd),ragChunksFilePath:nn.default.join(r,"rag",AL)}}});var wt,dR,_2,w2,Ue,ry=l(()=>{"use strict";wt=m(require("node:fs")),dR=m(require("node:path"));Gr();lR();on();_2=(e,t)=>{if(wt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};wt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},w2=e=>{wt.default.existsSync(e.ragChunksFilePath)||wt.default.writeFileSync(e.ragChunksFilePath,"");let t=dR.default.join(e.memoryDirPath,qn);wt.default.existsSync(t)||wt.default.writeFileSync(t,"")},Ue=e=>{let t=qe(e.projectFolderPath);return wt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),wt.default.mkdirSync(t.ragDirPath,{recursive:!0}),wt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),aR(t.metaDirPath),_2(t,e),w2(t),{ok:!0,layout:t}}});var uR,pR,mR,gR,Dd,Hd=l(()=>{"use strict";uR="components",pR="store",mR="versions",gR="installed.json",Dd=e=>`harness-set:${e.trim()}`});var ny,fR,Fd,oy=l(()=>{"use strict";ny=m(require("node:fs")),fR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fd=e=>{if(!ny.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(ny.default.readFileSync(e,"utf8"));if(fR(t)&&t.version===1&&fR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var bi,go,$d=l(()=>{"use strict";bi=m(require("node:path"));Hd();go=e=>{let t=bi.default.join(e,uR);return{componentsRootDir:t,storeDir:bi.default.join(t,pR),versionsDir:bi.default.join(t,mR),installedFilePath:bi.default.join(t,gR)}}});var sy,hR,zd,Ud,Bd=l(()=>{"use strict";sy=m(require("node:crypto")),hR=m(require("node:fs")),zd=e=>sy.default.createHash("sha256").update(e,"utf8").digest("hex"),Ud=e=>{try{let t=hR.default.readFileSync(e);return sy.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var iy,yR,SR,AR=l(()=>{"use strict";iy=m(require("node:fs")),yR=m(require("node:path")),SR=(e,t)=>{iy.default.mkdirSync(yR.default.dirname(e),{recursive:!0}),iy.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var ay,ly,bR,PR=l(()=>{"use strict";ay=m(require("node:fs")),ly=m(require("node:path")),bR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),n=ly.default.join(e,r),o=ly.default.join(n,`${t.versionId}.json`);ay.default.mkdirSync(n,{recursive:!0}),ay.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`)}});var Gd,_R,wR,vR=l(()=>{"use strict";Gd=m(require("node:fs")),_R=m(require("node:path"));Bd();wR=e=>{let t=zd(e.content),r=_R.default.join(e.storeDir,t);return Gd.default.existsSync(r)||(Gd.default.mkdirSync(e.storeDir,{recursive:!0}),Gd.default.writeFileSync(r,e.content)),t}});var cy,WR,v2,Vd,dy=l(()=>{"use strict";cy=m(require("node:fs")),WR=m(require("node:path"));Hd();oy();$d();Bd();AR();PR();vR();v2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vd=e=>{let t=go(e.installDir),r=Dd(e.setSlug),n=String(e.setEntry.version),o=[];for(let i of e.setEntry.items){if(!v2(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=WR.default.join(e.harnessRootDir,a);if(!cy.default.existsSync(c))continue;let d=cy.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Ud(c);if(p!==null){if(zd(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);wR({storeDir:t.storeDir,content:d}),o.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(o.length===0)return;bR(t.versionsDir,{version:1,componentId:r,versionId:n,items:o,createdAt:new Date().toISOString()});let s=Fd(t.installedFilePath);SR(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:n,installedAt:new Date().toISOString()}}})}});var py,uy,LR,ER=l(()=>{"use strict";py=m(require("node:fs"));dy();oy();$d();uy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),LR=e=>{if(!py.default.existsSync(e.harnessManifestPath))return;let t=go(e.installDir),r=Fd(t.installedFilePath);if(Object.keys(r.components).length>0)return;let n;try{n=JSON.parse(py.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!uy(n)||n.version!==1||!uy(n.sets)))for(let[o,s]of Object.entries(n.sets)){if(!uy(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Vd({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:o,setEntry:{version:i,items:a}})}}});var my,RR,kR,CR=l(()=>{"use strict";my=m(require("node:fs")),RR=m(require("node:path")),kR=e=>{let t=e.componentId.replaceAll("/","_"),r=RR.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!my.default.existsSync(r))return null;try{let n=JSON.parse(my.default.readFileSync(r,"utf8"));if(typeof n=="object"&&n!==null&&n.version===1)return n}catch{return null}return null}});var qd,Kd,TR,xR=l(()=>{"use strict";qd=m(require("node:fs")),Kd=m(require("node:path"));Hd();ER();CR();$d();Bd();TR=e=>{LR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=go(e.layout.installDir),r=Dd(e.setSlug),n=kR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(n!==null){let i=n.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Kd.default.join(t.storeDir,i.contentSha256);if(qd.default.existsSync(a)&&Ud(a)===i.contentSha256)return a}}let o=e.manifestItemPath.trim();if(o.length===0)return null;let s=o.startsWith("shared/")?Kd.default.join(e.layout.harnessRootDir,o):Kd.default.join(e.layout.harnessSetsDir,e.setSlug,o);if(!qd.default.existsSync(s))return null;try{if(!qd.default.statSync(s).isFile())return null}catch{return null}return s}});var IR,W2,L2,yr,Jd=l(()=>{"use strict";Jh();Xh();on();IR="harness-set:",W2=e=>{let t=e.trim();if(!t.startsWith(IR))return null;let r=t.slice(IR.length).trim();return r.length>0?r:null},L2=e=>{let t=new Set;for(let r of Object.values(e.entries)){let n=W2(r.componentId);n!==null&&t.add(n)}return[...t].sort((r,n)=>r.localeCompare(n))},yr=e=>{let t=qe(e),{ledgerFilePath:r}=Md(t),n=Od(r);return L2(n)}});var Yd,gy,Pi,E2,Bt,_i,fo=l(()=>{"use strict";Yd=m(require("node:fs")),gy=m(require("node:os")),Pi=m(require("node:path")),E2=()=>Yd.default.realpathSync(Pi.default.resolve(gy.default.homedir())),Bt=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Pi.default.join(gy.default.homedir(),t.slice(1)):t,n;try{n=Yd.default.realpathSync(Pi.default.resolve(r))}catch{return null}let o=E2();return n===o||n.startsWith(`${o}${Pi.default.sep}`)?n:null},_i=e=>{let t=Bt(e);if(t===null)return null;try{if(!Yd.default.statSync(t).isFile())return null}catch{return null}return t}});var fy,hy=l(()=>{"use strict";fy=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Zd,OR,Xd,R2,wi,yy=l(()=>{"use strict";Zd=m(require("node:fs")),OR=m(require("node:path"));mo();ZE();Jh();tR();Xh();nR();sR();Ai();ry();xR();Jd();fo();hy();Xd=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),R2=e=>{if(!Zd.default.existsSync(e))return null;try{let t=JSON.parse(Zd.default.readFileSync(e,"utf8"));if(Xd(t)&&t.version===1)return t}catch{return null}return null},wi=e=>{let t=[...new Set(e.setSlugs.map(S=>S.trim()).filter(S=>S.length>0))],r=Ve(e.projectFolderPath),n=Bt(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=Zd.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Ue({projectFolderPath:n}),{ledgerFilePath:i,backupsDirPath:a}=Md(s.layout),d=yr(n).filter(S=>!t.includes(S)),p=Od(i),f=0;if(d.length>0){let S=eR({repoRoot:n,setSlugs:d,ledger:p});p=S.ledger,f=S.summary.removedPaths.length}if(t.length===0)return ey(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:f,projectFolderPath:n,appliedSetSlugs:[]};let b=R2(e.layout.harnessManifestPath);if(b===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Xd(b.sets)?b.sets:{},y=0,u=0,A=0;for(let S of t){let g=h[S];if(!Xd(g))return{ok:!1,errorMessage:`Harness set "${S}" is not installed locally.`};let _=typeof g.version=="number"?String(g.version):"1",w=xd(S),v=Array.isArray(g.items)?g.items:[];for(let E of v){if(!Xd(E))continue;let R=typeof E.path=="string"?E.path.trim():"";if(R.length===0)continue;let C=fy(R);if(C===null)continue;let I=rR(S,C),D=OR.default.posix.join(".cursor",I).replaceAll("\\","/"),ae=typeof E.id=="string"?E.id.trim():"",q=TR({layout:e.layout,setSlug:S,setVersion:typeof g.version=="number"?g.version:1,manifestItemPath:R,manifestItemId:ae});if(q===null)continue;let H=XE({repoRoot:n,backupsDir:a,repoRelativeDestination:D,sourceAbsolutePath:q,componentId:w,versionId:_,ledger:p});if(H.kind==="skipped_unchanged"){u+=1;continue}if(H.kind==="backed_up_user_file"){A+=1,y+=1,p={version:1,entries:{...p.entries,[D]:qh({componentId:w,versionId:_,sourceAbsolutePath:q,backupPath:H.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[D]:qh({componentId:w,versionId:_,sourceAbsolutePath:q})}}}}return y===0&&u===0&&f===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(ey(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:A,removedLedgerPathCount:f,projectFolderPath:n,appliedSetSlugs:t})}});var NR,Qd,k2,C2,T2,x2,I2,O2,N2,M2,j2,vi,eu=l(()=>{"use strict";NR=m(require("node:crypto")),Qd=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},k2=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},C2=(e,t)=>{let r=k2(t),n=Qd(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},T2=(e,t,r)=>{let n=C2(t,r);return`shared/items/${e}/${n}`},x2=["rules","skills","commands","instructions","agents"],I2=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),O2=(e,t)=>[...e.filter(n=>n.id!==t.id),t],N2=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},M2=e=>NR.default.createHash("sha256").update(e,"utf8").digest("hex"),j2=e=>({id:e.id,kind:e.kind,title:e.title,path:T2(e.id,e.kind,e.title),contentSha256:M2(e.content)}),vi=e=>{let t=new Date().toISOString(),r=e.existingManifest??I2(e.hostname,t),n=Qd(e.bundle.slug),o=N2(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...x2.map(d=>`sets/${n}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let f=j2(p);return{files:[...d.files,{relativePath:f.path,content:p.content}],nextItems:O2(d.nextItems,f)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var Sr,MR,tu,D2,sn,Sy=l(()=>{"use strict";Sr=m(require("node:fs")),MR=m(require("node:os")),tu=m(require("node:path"));eu();D2=e=>{if(!Sr.default.existsSync(e))return null;try{let t=JSON.parse(Sr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},sn=e=>{try{let t=D2(e.layout.harnessManifestPath),r=vi({bundle:e.bundle,hostname:MR.default.hostname(),existingManifest:t});Sr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let n of r.directories)Sr.default.mkdirSync(tu.default.join(e.layout.harnessRootDir,n),{recursive:!0});for(let n of r.files){let o=tu.default.join(e.layout.harnessRootDir,n.relativePath);Sr.default.mkdirSync(tu.default.dirname(o),{recursive:!0}),Sr.default.writeFileSync(o,n.content)}return Sr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var Ay,jR=l(()=>{"use strict";Sy();yy();Ay=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=sn({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return wi({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var DR,HR=l(()=>{"use strict";DR=["rule","skill","command","instruction","agent"]});var FR,H2,F2,vt,by=l(()=>{"use strict";HR();FR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H2=e=>typeof e=="string"&&DR.includes(e),F2=e=>{if(!FR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!H2(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},vt=e=>{if(!FR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=F2(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var $R,$2,Py,zR=l(()=>{"use strict";$R=require("node:zlib");by();$2="x-agent-witch-token",Py=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[$2]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let n=r.headers.get("x-content-sha256")?.trim()??"";if(n.length>0&&n!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let o=Buffer.from(await r.arrayBuffer()),s=(0,$R.gunzipSync)(o).toString("utf8"),i=JSON.parse(s),a=vt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var wy,_y,Ar,UR=l(()=>{"use strict";wy=m(require("node:fs")),_y=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ar=e=>{if(!wy.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(wy.default.readFileSync(e.harnessManifestPath,"utf8"));if(!_y(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=_y(t.sets)?t.sets:{},o=Object.entries(n).map(([s,i])=>{if(!_y(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var ru,BR=l(()=>{"use strict";ru=()=>"~"});var GR,VR,qR=l(()=>{"use strict";GR=require("node:crypto"),VR=e=>`local-${(0,GR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var vy,KR=l(()=>{"use strict";vy=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Wi,nu,Wy=l(()=>{"use strict";Wi=m(require("node:path")),nu=e=>{let t=Wi.default.dirname(e),r=Wi.default.basename(t);return r==="agents"?Wi.default.basename(Wi.default.dirname(t)):r}});var Li,Gt,JR,z2,U2,B2,ou,YR,Ly=l(()=>{"use strict";Li=m(require("node:fs")),Gt=m(require("node:path"));qR();KR();Wy();JR=new Set(["node_modules",".git","dist","build",".next","coverage"]),z2=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},U2=(e,t)=>{let r=Gt.default.basename(t);if(e==="skill"){let n=t.split(Gt.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},B2=e=>{let t=[],r=(o,s)=>{let i;try{i=Li.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&JR.has(a.name))continue;let c=Gt.default.join(o,a.name),d=s?Gt.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;vy(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=Gt.default.join(e,o);Li.default.existsSync(s)&&r(s,o)}let n=Gt.default.join(e,"skills");return Li.default.existsSync(n)&&r(n,"skills"),t},ou=e=>{let t=B2(e);if(t.length===0)return null;let r=Gt.default.dirname(e),n=nu(e),o=z2(n),s=t.map(i=>{let a=vy(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:VR(i.absolutePath),kind:a,title:U2(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},YR=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=Li.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||JR.has(a.name))continue;let c=Gt.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var XR,Ey,G2,Ry,ZR=l(()=>{"use strict";XR=m(require("node:fs")),Ey=m(require("node:path"));Ly();fo();G2=e=>{let t=Bt(e.trim());if(t===null)return null;if(Ey.default.basename(t)===".cursor")return t;let r=Ey.default.join(t,".cursor");try{if(XR.default.statSync(r).isDirectory())return Bt(r)}catch{return null}return null},Ry=e=>{let t=G2(e.projectPath);if(t===null)return null;let r=ou(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var QR,V2,su,ky,ek=l(()=>{"use strict";QR=m(require("node:path"));Ly();fo();Wy();V2=5,su=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},ky=e=>{let t=Bt(e.scanRoot.trim());if(t===null)return su(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of YR(t,V2,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=Bt(s);if(i===null)continue;let a=nu(i);su(e.response,"folder",{cursorDir:i,groupName:a,repoPath:QR.default.dirname(i)});let c=ou(i);c!==null&&(r.push(c),su(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return su(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var tk,rk,nk=l(()=>{"use strict";tk=m(require("node:path")),rk=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:tk.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var Re,ok,Cy,q2,Ty,xy,iu,Iy,Ei,sk=l(()=>{"use strict";Re=m(require("node:fs")),ok=m(require("node:os")),Cy=m(require("node:path"));eu();dy();fo();nk();q2=e=>{if(!Re.default.existsSync(e))return null;try{let t=JSON.parse(Re.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Ty=e=>{let t=e.hostname??ok.default.hostname(),r=q2(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let f=_i(p.sourcePath);if(f===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let b=Re.default.readFileSync(f,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:b,setSlugs:[i.slug]})}let d=vi({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)o.add(p);for(let p of d.files)s.push(p),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Re.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)Re.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=Cy.default.join(e.layout.harnessRootDir,i.relativePath);Re.default.mkdirSync(Cy.default.dirname(a),{recursive:!0}),Re.default.writeFileSync(a,i.content)}Re.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=Qd(i.slug),d=r.sets[c];d!==void 0&&Vd({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},xy="reveal-cache.json",iu=(e,t)=>{Re.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Re.default.writeFileSync(`${e.harnessRootDir}/${xy}`,`${JSON.stringify(t,null,2)}
`)},Iy=e=>{let t=`${e.harnessRootDir}/${xy}`;Re.default.existsSync(t)&&Re.default.unlinkSync(t)},Ei=e=>{let t=`${e.harnessRootDir}/${xy}`;if(!Re.default.existsSync(t))return null;try{let r=JSON.parse(Re.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return rk(r)}catch{return null}return null}});var an=l(()=>{"use strict";yy();jR();hy();Sy();zR();by();eu();UR();BR();ZR();fo();ek();sk()});var Oy,ik=l(()=>{"use strict";an();Pe();Oy=e=>{let t=N(e.profileEmail);return sn({bundle:e.bundle,layout:t})}});var ak=l(()=>{"use strict";ik();an()});var K2,lk,J2,ck,ln,au,dk=l(()=>{"use strict";K2=["agentwitch.com","www.agentwitch.com"],lk=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,J2=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},ck=e=>{let t=J2(e);return!!(K2.includes(t)||lk.test(e.trim().toLowerCase()))},ln=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return ck(r)?lk.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},au=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:ln(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Ri=l(()=>{"use strict";dk()});var Vt,ki=l(()=>{"use strict";Vt=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Ci,uk=l(()=>{"use strict";ak();Ri();ki();Ci=e=>{if(!Vt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=vt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!ln(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=Oy({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}}});var Ny=l(()=>{"use strict";uk()});var Y2,ho,My=l(()=>{"use strict";Y2=e=>e==="hourly"||e==="daily"||e==="weekdays",ho=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!Y2(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Ti,lu,pk,mk,jy,dt,cu,du,uu,pu,mu=l(()=>{"use strict";Ti=m(require("node:fs")),lu=m(require("node:path"));My();pk="automations.json",mk=e=>e.profileEmail!==null?lu.default.join(e.installDir,"profiles",e.profileEmail,pk):lu.default.join(e.installDir,pk),jy=()=>({version:1,automations:[]}),dt=e=>{let t=mk(e);if(!Ti.default.existsSync(t))return jy();try{let r=JSON.parse(Ti.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?jy():{version:1,automations:r.automations.flatMap(o=>{let s=ho(o);return s!==null?[s]:[]})}}catch{return jy()}},cu=(e,t)=>{let r=mk(e);Ti.default.mkdirSync(lu.default.dirname(r),{recursive:!0}),Ti.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},du=(e,t)=>{cu(e,{version:1,automations:t})},uu=(e,t)=>{let n=dt(e).automations.filter(o=>o.id!==t.id);cu(e,{version:1,automations:[...n,t]})},pu=(e,t)=>dt(e).automations.find(r=>r.id===t)??null});var Me,br=l(()=>{"use strict";Me="x-agent-witch-token"});var Y,cn,Dy,xi,Hy,X2,Fy,Ii,Oi,$y,Ni=l(()=>{"use strict";br();Ge();Y=e=>{let t=we(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},cn=e=>({[Me]:e,"Content-Type":"application/json"}),Dy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:cn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},xi=async(e,t,r,n,o)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:cn(e.pairingToken),body:JSON.stringify({exitCode:r,output:n,...typeof o?.estimateSeconds=="number"?{estimateSeconds:o.estimateSeconds}:{},...typeof o?.actualSeconds=="number"?{actualSeconds:o.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Hy=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:cn(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},X2=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let n of t.projects){if(typeof n!="object"||n===null)continue;let o=n,s=typeof o.id=="string"?o.id.trim():"",i=typeof o.name=="string"?o.name.trim():"",a=typeof o.folderPath=="string"?o.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},Fy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:cn(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n;if(o.ok!==!0||typeof o.project!="object")return null;let s=o.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Ii=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:cn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return X2(r)}catch{return null}},Oi=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:cn(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},$y=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:cn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var dn,gk,fk,Z2,zy,hk,Uy=l(()=>{"use strict";dn=m(require("node:fs")),gk=m(require("node:path")),fk=e=>gk.default.join(e.harnessRootDir,"projects-registry.json"),Z2=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),zy=e=>{let t=fk(e);if(!dn.default.existsSync(t))return[];try{let r=JSON.parse(dn.default.readFileSync(t,"utf8"));return Z2(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string").map(n=>({id:n.id,name:n.name,projectFolderPath:n.projectFolderPath,addedAt:typeof n.addedAt=="string"?n.addedAt:new Date().toISOString(),...typeof n.cloudProjectId=="string"&&n.cloudProjectId.length>0?{cloudProjectId:n.cloudProjectId}:{}})):[]}catch{return[]}},hk=e=>{let t=fk(e);if(!dn.default.existsSync(t))return;let r=`${t}.migrated`;if(dn.default.existsSync(r)){dn.default.unlinkSync(t);return}dn.default.renameSync(t,r)}});var yk,Q2,e5,Sk,Ak=l(()=>{"use strict";Ai();yk=e=>Ve(e),Q2=e=>new Set(e.map(t=>yk(t.folderPath))),e5=e=>new Set(e.map(t=>t.id)),Sk=(e,t)=>{let r=Q2(t),n=e5(t),o=[],s=new Set;for(let i of e){let a=yk(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&n.has(i.cloudProjectId)||(s.add(a),o.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return o}});var By,Gy=l(()=>{"use strict";Ni();Uy();Ak();By=async(e,t)=>{let r=zy(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let n=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let o=await Ii(n);if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=Sk(r,o),i=r.length-s.length,a=0,c=0;for(let d of s)await Fy(n,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&hk(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var Vy,un,gu=l(()=>{"use strict";Vy=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),un=(e,t)=>e.find(r=>r.id===t)??null});var yo,fu=l(()=>{"use strict";Ni();Gy();gu();yo=async(e,t)=>{t!==void 0&&await By(t,e);let r=Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let n=await Ii(r);if(n===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let o=Vy(n);return{ok:!0,projects:o,message:o.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${o.length} project${o.length===1?"":"s"} from Agent Witch Console.`}}});var bk=l(()=>{"use strict"});var ke,Pk,t5,r5,n5,o5,So,qy=l(()=>{"use strict";ke=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Pk=(e,t)=>e.length===0?`<p class="empty">${ke(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${ke(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${ke(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,t5=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,r5=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${ke(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,n5=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?r5(e.project):t5();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(n=>`<li class="harness-installed-set">
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
      </form>`},o5=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${ke(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${ke(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},So=e=>{let t=e.flashError?`<div class="alert-error">${ke(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ke(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},n=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${ke(c)}</a>`,o=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=n5({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=Pk(o,"No workflows installed for this project yet."):e.activeTab==="agents"?i=Pk(s,"No agents installed for this project yet."):i=o5({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
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
    </section>`}});var s5,i5,_k,wk=l(()=>{"use strict";an();br();s5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),i5=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();return!s5(n)||n.ok!==!0||!Array.isArray(n.bundles)?null:n.bundles.flatMap(o=>{let s=vt(o);return s===null?[]:[s]})}catch{return null}},_k=i5});var vk,Ky,Wk=l(()=>{"use strict";ie();an();qy();fu();wk();gu();Jd();Ni();vk=e=>({kind:"page",title:e.project.name,body:So({project:e.project,installed:Ar(e.layout),linkedSetSlugs:yr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),Ky=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=F();if(r===null)return{kind:"not_found"};let n=await yo(r,e.layout),o=un(n.projects,t);if(o===null)return{kind:"not_found"};let s=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await _k(s,o.id);if(i===null)return vk({layout:e.layout,project:o,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=Ay({layout:e.layout,projectFolderPath:o.projectFolderPath,bundles:i});if(!a.ok)return vk({layout:e.layout,project:o,errorMessage:a.errorMessage});let c=s===null?!1:await Oi(s,o.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(o.id)}&${d.toString()}`}}});var a5,Jy,Lk=l(()=>{"use strict";a5=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,Jy=a5});var Ek,Rk,l5,c5,hu,yu,kk=l(()=>{"use strict";Ek=require("node:child_process"),Rk=require("node:util"),l5=(0,Rk.promisify)(Ek.execFile),c5=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},hu=async(e,t)=>{try{let{stdout:r}=await l5("git",t,{cwd:e,env:c5(),maxBuffer:1048576});return r.trim()}catch{return null}},yu=async e=>{let t=await hu(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await hu(e,["rev-parse","--abbrev-ref","HEAD"]),n=await hu(e,["status","--porcelain"]),o=await hu(e,["diff","--shortstat","HEAD"]),s=n===null||n.length===0?0:n.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:o===null||o.length===0?null:o}}});var Yy,Ck=l(()=>{"use strict";Yy=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",n=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,o=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${n}; ${o}; ${s}; ${i.join("; ")}.`}});var d5,Xy,Tk=l(()=>{"use strict";d5=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",n=r.length>0?r:t.length>0?t:"Lesson from completed run";return n.length<=280?n:`${n.slice(0,277)}\u2026`},Xy=d5});var u5,Zy,xk=l(()=>{"use strict";br();u5=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Me]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},Zy=u5});var Ik,Pr,Ok=l(()=>{"use strict";Ik=require("node:child_process"),Pr=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,n=(0,Ik.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return n.length>0?n:null}catch{return null}}});var Nk=l(()=>{"use strict";fu()});var Mi,Mk=l(()=>{"use strict";br();Mi=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Me]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var ut=l(()=>{"use strict";fu();gu();bk();Ai();ry();Wk();Jd();Lk();kk();Ck();Tk();xk();Ok();Nk();Mk();Gy();Uy();Ni()});var Su,ji,jk,Qy,pn,eS=l(()=>{"use strict";Su=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},ji=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=Su(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},jk=e=>e>=1&&e<=5,Qy=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Su(t,"UTC")},pn=e=>{let t=e.from??new Date,r=Su(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return ji(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=ji(r,e.timeZone,n,0),s=Su(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?ji(Qy(r),e.timeZone,n,0):o;if(!i&&jk(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=Qy(a),jk(a.weekday))return ji(a,e.timeZone,n,0);return ji(Qy(r),e.timeZone,n,0)}});var Dk,tS,qt,rS=l(()=>{"use strict";Dk=require("node:crypto");ie();ut();eS();mu();tS=!1,qt=async e=>{if(tS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=F();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=pu(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};tS=!0;let o=(0,Dk.randomUUID)();try{let s=await uo(t,"claude-cli",n.prompt);await $y(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=pn({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return uu(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{tS=!1}}});var Au,Hk=l(()=>{"use strict";ie();rS();mu();Au=async()=>{let e=F();if(e===null)return;let t=dt(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await qt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var Di=l(()=>{"use strict";mu();Hk();rS();eS()});var Fk=l(()=>{"use strict";Di()});var $k=l(()=>{"use strict";My()});var zk=l(()=>{"use strict";$k()});var nS=l(()=>{"use strict";Di()});var p5,m5,Hi,oS=l(()=>{"use strict";Fk();zk();nS();Pe();p5=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),m5=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??pn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??pn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Hi=e=>{let t=p5(e.profileEmail),r=dt(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=ho(s);return i!==null?[m5(i,n.get(i.id))]:[]});return du(t,o),{ok:!0,writtenCount:o.length}}});var sS=l(()=>{"use strict";Di()});var Uk=l(()=>{"use strict";ie()});var Bk=l(()=>{"use strict";oS();sS();nS();Uk()});var Gk,Fi,$i,zi,Vk=l(()=>{"use strict";Gk=m(require("node:os"));Bk();Ri();ki();Fi=e=>{if(!Vt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!ln(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=Hi({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},$i=async e=>{if(!Vt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:ln(t)?qt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},zi=()=>{let e=F(),t=e!==null?dt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Gk.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var iS=l(()=>{"use strict";Vk()});var bu=l(()=>{"use strict";ee()});var Pu=l(()=>{"use strict";ee()});var _u,Kk,Jk,qk,g5,f5,Ao,aS=l(()=>{"use strict";_u=m(require("node:fs")),Kk=m(require("node:os")),Jk=m(require("node:path"));bu();Pu();gi();Pe();qk=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},g5=e=>Jk.default.join(Kk.default.homedir(),"Library","LaunchAgents",`${e}.plist`),f5=async e=>_u.default.existsSync(g5(e))?(await be(e)).ok:!1,Ao=async(e=L())=>{let t=_u.default.existsSync(Cd(e)),r=!_u.default.existsSync(Mt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let n=mi(e);if(n===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await qk(n))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${te(e)}-wake`;await f5(i)&&s.push(i);for(let c of Q(e))(await be(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await qk(n);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var Yk=l(()=>{"use strict";ee()});var bo,Ui=l(()=>{"use strict";bo="connection-health.json"});var mn,wu,h5,Bi,ge,lS,vu,Ce,Wu=l(()=>{"use strict";mn=m(require("node:fs")),wu=m(require("node:path"));Ui();h5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Bi=e=>e.profileEmail===null?wu.default.join(e.installDir,bo):wu.default.join(e.installDir,"profiles",e.profileEmail,bo),ge=e=>{let t=Bi(e);if(!mn.default.existsSync(t))return null;try{let r=JSON.parse(mn.default.readFileSync(t,"utf8"));return!h5(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},lS=e=>{let t=Bi(e);mn.default.existsSync(t)&&mn.default.rmSync(t,{force:!0})},vu=(e,t)=>{let r=Bi(e),n=ge(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};mn.default.mkdirSync(wu.default.dirname(r),{recursive:!0}),mn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Ce=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var Gi,Xk=l(()=>{"use strict";Ui();Wu();Gi=(e,t)=>{if(!t.socketOpen)return!1;let r=ge(e);return r===null?!1:!Ce(r,t.staleAfterMs??12e4,t.nowMs)}});var cS,Zk=l(()=>{"use strict";Wu();cS=(e,t)=>!(e!==null&&!Ce(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Po=l(()=>{"use strict";Wu();Xk();Zk();Ui()});var dS=l(()=>{"use strict";Po();ee()});var uS=l(()=>{"use strict";Po()});var pS=l(()=>{"use strict";ee()});var eC,Qk,Vi,mS=l(()=>{"use strict";eC=m(require("node:fs"));zt();bu();Pu();Pe();Qk=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Vi=async(e=L())=>{if(!eC.default.existsSync(Mt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await Qk())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let n=[];for(let s of Q(e))(await be(s.launchAgentLabel)).ok&&n.push(s.launchAgentLabel);let o=await Qk();return{ok:o||n.length>0,liveReachable:o,hollowInstall:!1,kickstartedLabels:n}}});var tC=l(()=>{"use strict";ee()});var rC,gn,gS,y5,S5,A5,nC,b5,oC,_o,Lu=l(()=>{"use strict";rC=require("node:crypto"),gn=m(require("node:fs")),gS=m(require("node:path"));Pe();y5="watchdog-log.ndjson",S5=200,A5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nC=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Vn({installDir:e,profileEmail:t.profileEmail});return gS.default.join(r,y5)},b5=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!A5(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},oC=(e,t=L())=>{let r={id:(0,rC.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=nC(t);gn.default.mkdirSync(gS.default.dirname(n),{recursive:!0});let o=gn.default.existsSync(n)?gn.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-S5+1)),JSON.stringify(r)];return gn.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},_o=(e=20,t=L())=>{let r=nC(t);if(!gn.default.existsSync(r))return[];let n=gn.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=b5(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var fS,hS,yS,SS=l(()=>{"use strict";At();fS=Dr.watchdogReinstallState,hS=900*1e3,yS=3e3});var sC=l(()=>{"use strict";SS()});var iC={};yt(iC,{verifyAgentWitchReviveAfterKickstart:()=>_5});var P5,_5,aC=l(()=>{"use strict";sC();uS();pS();Pe();P5=e=>new Promise(t=>{setTimeout(t,e)}),_5=async e=>{if(await P5(e.verifyDelayMs??yS),!await $r(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),n=ge(r);return!Ce(n,e.staleAfterMs)}});var qi,AS,w5,lC,cC,bS,PS,_S=l(()=>{"use strict";qi=m(require("node:fs")),AS=m(require("node:path"));B();SS();w5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lC=e=>AS.default.join(e,fS),cC=(e=L())=>{let t=lC(e);if(!qi.default.existsSync(t))return null;try{let r=JSON.parse(qi.default.readFileSync(t,"utf8"));return!w5(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},bS=(e=L(),t=Date.now())=>{let r=cC(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=hS:!0},PS=(e=L(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=lC(e);return qi.default.mkdirSync(AS.default.dirname(n),{recursive:!0}),qi.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var wS,dC=l(()=>{"use strict";ee();_S();wS=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!bS())return{attempted:!1,ok:!1,targets:e};PS();let n=await t();if(!n.ok)return{attempted:!0,ok:!1,errorMessage:n.errorMessage,targets:e};let o=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await be(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:o.some(s=>s.revived||s.reason==="healthy"),targets:o}}});var uC=l(()=>{"use strict";_S();dC()});var vS=l(()=>{"use strict";Ge()});var pC=l(()=>{"use strict";Ge()});var mC,wo,gC,fC,hC,v5,W5,yC,L5,E5,SC,AC=l(()=>{"use strict";mC=require("node:child_process"),wo=m(require("node:fs")),gC=m(require("node:os")),fC=m(require("node:path")),hC=require("node:util");vS();pC();Pe();v5=(0,hC.promisify)(mC.execFile),W5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yC=e=>{let t=ot(e),r=t===null?N():N(t);if(!wo.default.existsSync(r.configPath))return null;try{let n=JSON.parse(wo.default.readFileSync(r.configPath,"utf8"));return!W5(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},L5=e=>yC(e)?.wsUrl??null,E5=e=>{let t=L5(e);return t!==null?we(t):_e(e)?.appOrigin??null},SC=async e=>{let t=e?.installDir??L(),r=yC(t),n=r!==null?we(r.wsUrl):E5(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=fC.default.join(gC.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{wo.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??ot(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await v5("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{wo.default.existsSync(i)&&wo.default.unlinkSync(i)}}});var bC={};yt(bC,{attemptAgentWitchWatchdogReinstall:()=>R5});var R5,PC=l(()=>{"use strict";uC();AC();R5=async e=>wS(e,()=>SC())});var _C,wC,vC,k5,C5,T5,Ki,WS=l(()=>{"use strict";Yk();dS();uS();pS();mS();aS();bu();Pu();Pe();eo();tC();Lu();_C=e=>e===null?N():N(e),wC=async(e,t,r)=>{if(!await $r(e))return"not_running";let o=_C(t);if(at(o))return"healthy";let s=ge(o);return Ce(s,r)?"stale_connection":"healthy"},vC=async e=>{let t=e?.staleAfterMs??12e4,r=L(),n=Q(r);return Promise.all(n.map(async o=>{let s=await wC(o.launchAgentLabel,o.profileEmail,t),i=_C(o.profileEmail),a=ge(i),c=await $r(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Ce(a,t),needsRevive:s!=="healthy",reason:s}}))},k5=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},C5=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",T5=async e=>{let t=await be(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(aC(),iC)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Ki=async e=>{if(!st())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=L();await Ao(r),await Vi(r);let n=Q(r),o=[];for(let p of n){let f=await wC(p.launchAgentLabel,p.profileEmail,t);if(f==="healthy"){o.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:f});continue}o.push(await T5({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:f,staleAfterMs:t}))}if(o.length===0){let p=Fr();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(PC(),bC)),f=await p(o);s=f.attempted,i=f.ok,a=f.errorMessage,c=[...f.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&oC({event:C5(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:k5(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var WC,Eu,LC=l(()=>{"use strict";WC=m(require("node:os"));dS();Lu();WS();Eu=async()=>{let e=await vC(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:WC.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:_o(1)[0]??null}}});var LS=l(()=>{"use strict";aS();WS();LC();Lu()});var Ji,Yi,Xi,EC=l(()=>{"use strict";ee();LS();Ji=async()=>{await Ao();let e=Q(),t=[];for(let r of e){let n=await be(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Fr();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Yi=Ki,Xi=Ki});var ES=l(()=>{"use strict";EC()});var ku,Ru,RC,RS,kC,x5,I5,O5,N5,M5,Cu,CC=l(()=>{"use strict";ku=require("node:child_process"),Ru=m(require("node:fs")),RC=m(require("node:os")),RS=m(require("node:path")),kC=require("node:util");ee();B();x5=(0,kC.promisify)(ku.execFile),I5=()=>RS.default.join(RC.default.homedir(),"Library","LaunchAgents"),O5=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await x5("launchctl",["bootout",r]).catch(()=>{})},N5=e=>{let t=RS.default.join(I5(),`${e}.plist`);Ru.default.existsSync(t)&&Ru.default.unlinkSync(t)},M5=e=>{(0,ku.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Cu=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=L();if(!Ru.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=jt(e);for(let r of t)await O5(r),N5(r);return M5(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var TC,Tu,xC,vo,IC,j5,D5,H5,kS,F5,CS,OC=l(()=>{"use strict";TC=require("node:child_process"),Tu=m(require("node:fs")),xC=m(require("node:os")),vo=m(require("node:path")),IC=require("node:util");ee();j5=(0,IC.promisify)(TC.execFile),D5=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],H5=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],kS=e=>{Tu.default.existsSync(e)&&Tu.default.rmSync(e,{force:!0})},F5=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await j5("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},CS=async e=>{let r=(e.listLaunchAgentLabels??jt)(e.layout.installDir),n=e.launchAgentsDir??vo.default.join(xC.default.homedir(),"Library","LaunchAgents"),o=e.bootoutLaunchAgent??F5;for(let i of r)await o(i),kS(vo.default.join(n,`${i}.plist`));let s=vo.default.dirname(e.layout.configPath);for(let i of D5)kS(vo.default.join(s,i));for(let i of H5)kS(vo.default.join(e.layout.installDir,i));return Tu.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var TS,NC=l(()=>{"use strict";TS={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var xS,MC=l(()=>{"use strict";xS="unknown_identity"});var IS=l(()=>{"use strict";NC();MC()});var $5,OS,jC=l(()=>{"use strict";IS();$5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),OS=e=>e.type!=="system.error"||!$5(e.payload)?!1:e.payload.errorCode===xS});var NS=l(()=>{"use strict";CC();OC();jC()});var xu=l(()=>{"use strict";ee();Ge();NS();LS()});var Wo,Iu,Ou=l(()=>{"use strict";xu();Wo=(e=20)=>_o(e),Iu=Eu});var Nu,Lo,Mu,ju=l(()=>{"use strict";xu();Nu=Qr,Lo=(e=20)=>Yr(e),Mu=e=>Zr(e)});var Du,MS=l(()=>{"use strict";xu();Du=()=>Cu()});var DC=l(()=>{"use strict";Vh();Ny();iS();ES();Ou();ju();MS()});var HC={};yt(HC,{buildAgentWitchAutomationStatusFromWakeServer:()=>zi,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Nu,buildAgentWitchWakeHealthResponse:()=>hi,buildAgentWitchWakeIdentityResponse:()=>yi,buildAgentWitchWatchdogStatus:()=>Iu,installHarnessFromWakeServer:()=>Ci,readAgentWitchSelfUpdateLogEntries:()=>Lo,readAgentWitchWatchdogLogEntries:()=>Wo,restartAgentWitchFromWakeServer:()=>Xi,reviveAgentWitchWebSocketFromWakeServer:()=>Yi,runAgentWitchSelfUpdateFromWakeServer:()=>Mu,runAgentWitchUninstallLocalFromWakeServer:()=>Du,runAutomationFromWakeServer:()=>$i,syncAutomationsFromWakeServer:()=>Fi,wakeAgentWitchLaunchAgents:()=>Ji});var FC=l(()=>{"use strict";DC()});var $C,zC,jS,DS,UC=l(()=>{"use strict";$C=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),zC=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?$C(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?$C(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},jS=e=>{let t=e.watchdogLogs.map(zC).join(""),r=e.updateLogs.map(zC).join("");return`<!doctype html>
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
</html>`},DS=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var BC,GC,VC=l(()=>{"use strict";BC=m(require("node:net")),GC=()=>new Promise((e,t)=>{let r=BC.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var qC,z5,HS,KC=l(()=>{"use strict";qC=m(require("node:net"));VC();fi();gi();Pe();z5=e=>new Promise(t=>{let r=qC.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),HS=async()=>{let e=L(),t=ct();if(await z5(t))return zE(t),t;let r=await GC();return Td(e,r),r}});var U5,FS,JC=l(()=>{"use strict";U5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),FS=e=>({force:U5(e)&&e.force===!0})});var Zi=l(()=>{"use strict";Ri();UC();KC();JC();Lf();ad();Jn()});var $S,j,zS,US,Qi,YC=l(()=>{"use strict";$S=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},zS=e=>{e.writeHead(403),e.end()},US=e=>e.url?.split("?")[0]??"/",Qi=(e,t,r=20,n=200)=>{let o=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(o.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,n):r}});var pt=l(()=>{"use strict";YC()});var B5,XC,ZC=l(()=>{"use strict";iS();pt();B5=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},XC=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,zi(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await B5(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let n=Fi(t);return j(e.response,n.ok?200:400,n,e.cors.headers),!0}let r=await $i(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var G5,eT,QC,tT,BS,rT,GS=l(()=>{"use strict";G5=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],eT=e=>/embed|minilm|^bge-/i.test(e),QC=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),tT=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),BS=e=>e.filter(t=>t.trim().length>0&&!eT(t)),rT=(e,t)=>{let r=e.filter(o=>o.trim().length>0&&!eT(o)),n=t?.trim()??"";if(n.length>0){let o=r.find(s=>QC(s,n));if(o!==void 0)return o}for(let o of G5){let s=r.find(i=>QC(i,o));if(s!==void 0)return s}return r[0]??null}});var VS,sT,iT,Hu,aT,nT,oT,V5,q5,K5,J5,Y5,X5,mt,ea=l(()=>{"use strict";VS=require("node:child_process"),sT=m(require("node:fs")),iT=m(require("node:os")),Hu=m(require("node:path"));Ge();lt();GS();aT=3e3,nT=["claude-cli","codex","cursor","antigravity"],oT={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},V5=(e,t)=>new Promise(r=>{let n=(0,VS.spawn)(e,[...t],{stdio:"ignore"}),o=setTimeout(()=>{n.kill("SIGTERM"),r(!1)},aT);n.on("error",()=>{clearTimeout(o),r(!1)}),n.on("close",s=>{clearTimeout(o),r(s===0)})}),q5=()=>{let e=iT.default.homedir();return["ollama",Hu.default.join(e,".local","bin","ollama"),Hu.default.join(e,".agent-witch","ollama","ollama"),Hu.default.join(e,".local-agent-witch","ollama","ollama")]},K5=e=>new Promise(t=>{let r=(0,VS.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),n=[],o=setTimeout(()=>{r.kill("SIGTERM"),t(null)},aT);r.stdout.on("data",s=>{n.push(s)}),r.on("error",()=>{clearTimeout(o),t(null)}),r.on("close",s=>{if(clearTimeout(o),s!==0){t(null);return}t(tT(Buffer.concat(n).toString("utf8")))})}),J5=async()=>{for(let e of q5()){if(e!=="ollama"&&!sT.default.existsSync(e))continue;let t=await K5(e);if(t!==null)return t}return[]},Y5=e=>{let t=e.installedWriterIds.map(s=>oT[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,n=oe(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${oT[e.writerAgent]} is not installed.`:"",o=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[n,r,o].filter(s=>s.length>0).join(" ")},X5=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:to},mt=async e=>{let t=nT.map(i=>{let a=yd(i,e.commands);return V5(a.command,a.args)}),[r,...n]=await Promise.all([J5(),...t]),o=nT.flatMap((i,a)=>n[a]===!0?[i]:[]),s=rT(r,X5());return{ollamaModels:r,estimateModel:s,installedWriterIds:o,capabilityNote:Y5({writerAgent:e.writerAgent??"",installedWriterIds:o,estimateModel:s})}}});var Z5,Q5,qS,lT=l(()=>{"use strict";Z5="http://127.0.0.1:11434",Q5=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},qS=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Z5;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return n.ok?Q5(await n.json()):null}catch{return null}}});var KS=l(()=>{"use strict";lt();ea();lT();GS()});var eV,cT,dT=l(()=>{"use strict";KS();eV={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},cT=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:eV[t]})),ollamaModels:BS(e.ollamaModels)})});var tV,uT,pT=l(()=>{"use strict";KS();pt();dT();tV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},uT=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await mt({commands:se({})});return j(e.response,200,{ok:!0,...cT({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await tV(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",n=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",o=await qS({model:r,prompt:n});return o===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:o},e.cors.headers),!0)}return!1}});var rV,mT,gT=l(()=>{"use strict";Ny();pt();rV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},mT=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await rV(e);if(t===null)return!0;let r=Ci(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var fT=l(()=>{"use strict";ut()});var JS,hT=l(()=>{"use strict";fT();ki();JS=e=>{if(!Vt(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Ue({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var yT,YS,XS=l(()=>{"use strict";ie();ut();ki();yT=e=>{if(!Vt(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},YS=async e=>{let t=yT(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Pr("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let n=F();if(n===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let o=Y({wsUrl:n.wsUrl,pairingToken:n.pairingToken});return o===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Ue({projectFolderPath:r}),await Mi(o,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var ST=l(()=>{"use strict";hT();XS()});var AT,bT=l(()=>{"use strict";ST();XS();pt();AT=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=JS(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await YS(t),n=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,n,r,e.cors.headers),!0}return!1}});var PT,_T=l(()=>{"use strict";Zi();ju();Ou();PT=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Wo(50),r=Lo(50);return e.response.writeHead(200,DS()),e.response.end(jS({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var wT,vT=l(()=>{"use strict";Vh();pt();wT=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,hi(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,yi(),e.cors.headers),!0):!1});var WT,LT=l(()=>{"use strict";MS();pt();WT=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Du();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var ET,RT=l(()=>{"use strict";ES();pt();ET=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Yi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Xi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Ji();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var kT,CT=l(()=>{"use strict";Zi();ju();pt();kT=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Nu();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Qi(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:Lo(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=FS(t),n=await Mu({force:r});return j(e.response,n.ok?200:503,n,e.cors.headers),!0}return!1}});var TT,xT=l(()=>{"use strict";Ou();pt();TT=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Iu();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Qi(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:Wo(t)},e.cors.headers),!0}return!1}});var IT,OT=l(()=>{"use strict";ZC();pT();gT();bT();_T();vT();LT();RT();CT();xT();IT=[wT,PT,TT,ET,kT,WT,mT,AT,XC,uT]});var NT,MT=l(()=>{"use strict";OT();NT=async e=>{for(let t of IT)if(await t(e))return!0;return!1}});var nV,jT,DT=l(()=>{"use strict";Ri();pt();MT();nV=(e,t,r,n)=>({request:e,response:t,wakePort:r,cors:n,pathname:US(e),readJsonBody:()=>$S(e)}),jT=async(e,t,r)=>{let n=e.headers.origin,o=au(n);try{if(n!==void 0&&n.length>0&&!o.allowed){zS(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=nV(e,t,r,o);if(await NT(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}}});var HT,fn,Fu,$u=l(()=>{"use strict";HT=m(require("node:http"));Zi();DT();fn=async()=>{let e=await HS(),t=HT.default.createServer((r,n)=>{jT(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Fu=fn});var FT={};yt(FT,{runAgentWitchBridgeCli:()=>oV});var oV,$T=l(()=>{"use strict";ee();$u();oV=async()=>{$e("agent-witch-bridge");let e=await fn(),t=Ht(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var zT=l(()=>{"use strict";zt()});var Eo,ZS,UT=l(()=>{"use strict";Eo=(e,t,r)=>e===1?t:r,ZS=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${Eo(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Eo(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${Eo(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Eo(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Eo(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${Eo(p,"year","years")} ago`}});var hn,QS,sV,iV,eA,_r,ta,tA,BT=l(()=>{"use strict";hn=m(require("node:fs")),QS=m(require("node:path")),sV="local-ws-traffic.ndjson",iV=500,eA=e=>QS.default.join(e.logsDir,sV),_r=(e,t)=>{let r=eA(e);hn.default.mkdirSync(QS.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});hn.default.appendFileSync(r,`${n}
`,"utf8")},ta=(e,t=iV)=>{let r=eA(e);if(!hn.default.existsSync(r))return[];let o=hn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},tA=e=>{let t=eA(e);hn.default.existsSync(t)&&hn.default.writeFileSync(t,"","utf8")}});var aV,GT,VT,qT=l(()=>{"use strict";IS();aV=new Set(Object.values(TS)),GT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VT=e=>{if(!GT(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!aV.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!GT(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var KT,JT=l(()=>{"use strict";KT=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var lV,cV,dV,ra,YT=l(()=>{"use strict";JT();lV=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,cV=e=>lV.test(e),dV=e=>KT(e),ra=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>ra(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&cV(n)){r[n]=dV(o);continue}r[n]=ra(o)}return r}});var Wt,rA,uV,pV,mV,nA,XT,ZT,QT,gV,zu,yn,Uu,oA,ex=l(()=>{"use strict";Wt=m(require("node:fs")),rA=m(require("node:path"));qT();YT();uV="local-ws-trace.ndjson",pV=1e4,mV=1440*60*1e3,nA=e=>rA.default.join(e.logsDir,uV),XT=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},ZT=e=>{if(!Wt.default.existsSync(e))return;let t=Wt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-mV,o=t.filter(s=>{let i=XT(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-pV);Wt.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},QT=(e,t)=>{let r=nA(e);Wt.default.mkdirSync(rA.default.dirname(r),{recursive:!0}),Wt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),ZT(r)},gV=e=>e.parsed===null?{_empty:!0}:ra(e.parsed),zu=(e,t,r)=>{let n=VT(r);QT(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:gV(n)})},yn=(e,t)=>{QT(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:ra({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Uu=(e,t=80)=>{let r=nA(e);if(ZT(r),!Wt.default.existsSync(r))return[];let n=Wt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let i=XT(s);i!==null&&o.push(i)}return o.reverse()},oA=e=>{let t=nA(e);Wt.default.existsSync(t)&&Wt.default.writeFileSync(t,"","utf8")}});var wr,tx,fV,sA,Bu,rx=l(()=>{"use strict";wr=m(require("node:fs")),tx=m(require("node:path")),fV=256e3,sA=e=>{wr.default.mkdirSync(tx.default.dirname(e),{recursive:!0}),wr.default.writeFileSync(e,"","utf8")},Bu=(e,t=fV)=>{if(!wr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=wr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=wr.default.openSync(e,"r");try{wr.default.readSync(a,i,0,s,o)}finally{wr.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var na=l(()=>{"use strict";BT();ex();rx()});var iA,aA,nx=l(()=>{"use strict";iA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aA=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",n=e.exists&&e.content.length>0?`<pre class="error-log-view">${iA(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${iA(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
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
    </section>`}});var ox=l(()=>{"use strict";nx()});var lA,cA=l(()=>{"use strict";lA=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var dA=l(()=>{"use strict";Ui()});var uA,pA,sx=l(()=>{"use strict";dA();uA=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e);return Number.isNaN(n)?!0:r-n>t},pA=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var ix=l(()=>{"use strict";cA();sx()});var ax,oa,mA,sa=l(()=>{"use strict";cA();ax=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oa=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=ax(e),r=ax(lA(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},mA=`(function () {
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
})();`});var Sn,hV,gA,lx=l(()=>{"use strict";Sn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hV=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},gA=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Sn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Sn(r.direction):Sn(r.kind),i=`trace-body-${n}`,a=Sn(hV(r.body));return`<tr>
        <td title="${Sn(r.at)}">${Sn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Sn(r.command)}</code></td>
        <td>${o}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var dx,cx,fA,ux=l(()=>{"use strict";dx=m(require("node:path"));B();zt();cx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fA=e=>{let t=te(e.installDir),n=`AW_HOME="$HOME/${dx.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${cx(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${cx(n)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var px=l(()=>{"use strict";sa();lx();ux();sa()});var yV,Kt,ia=l(()=>{"use strict";yV=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Kt=yV});var mx,gx,fx,hx,yx,Sx,Ax,Ro=l(()=>{"use strict";mx="projects",gx="knowledge",fx="chunks.ndjson",hx="lessons.ndjson",yx="error-chunks.ndjson",Sx="usage-stats.json",Ax="knowledge-location.json"});var Gu,SV,Vu,hA=l(()=>{"use strict";Gu=m(require("node:path"));Ro();SV=(e,t)=>{let r=t.trim(),n=Gu.default.join(e.installDir,mx,r,gx);return{projectId:r,knowledgeDirPath:n,ragChunksFilePath:Gu.default.join(n,fx),memoryRunsFilePath:Gu.default.join(n,hx)}},Vu=SV});var yA,AV,bx,Px=l(()=>{"use strict";yA=m(require("node:fs"));Ro();on();AV=e=>{let t=qe(e.projectFolderPath),r=`${t.metaDirPath}/${Ax}`,n={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};yA.default.mkdirSync(t.metaDirPath,{recursive:!0}),yA.default.writeFileSync(r,`${JSON.stringify(n,null,2)}
`)},bx=AV});var ko,wx,_x,bV,vx,Wx=l(()=>{"use strict";ko=m(require("node:fs")),wx=m(require("node:path"));Gr();on();hA();Px();_x=(e,t)=>{ko.default.existsSync(e)&&(ko.default.existsSync(t)&&ko.default.statSync(t).size>0||(ko.default.mkdirSync(wx.default.dirname(t),{recursive:!0}),ko.default.copyFileSync(e,t)))},bV=e=>{let t=qe(e.projectFolderPath),r=Vu(e.layout,e.projectId),n=`${t.memoryDirPath}/${qn}`;_x(t.ragChunksFilePath,r.ragChunksFilePath),_x(n,r.memoryRunsFilePath),bx({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},vx=bV});var SA,PV,Lx,Ex=l(()=>{"use strict";SA=m(require("node:fs"));on();PV=e=>{let t=qe(e);if(!SA.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(SA.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let n=r;return{projectId:typeof n.projectId=="string"&&n.projectId.trim().length>0?n.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Lx=PV});var Rx,_V,Co,qu=l(()=>{"use strict";Rx=m(require("node:path"));Gr();on();Wx();Ex();hA();_V=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Lx(t),n=e.projectId?.trim()||r.projectId?.trim()||"";if(n.length>0){vx({layout:e.layout,projectFolderPath:t,projectId:n});let s=Vu(e.layout,n);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:n}}let o=qe(t);return{ragChunksFilePath:o.ragChunksFilePath,memoryRunsFilePath:Rx.default.join(o.memoryDirPath,qn),projectId:null}},Co=_V});var Ku,vV,Ju,AA=l(()=>{"use strict";Ku=m(require("node:fs"));Ro();vV=(e,t=500)=>{if(!Ku.default.existsSync(e))return;let r=Ku.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let n=r.slice(r.length-t);Ku.default.writeFileSync(e,`${n.join(`
`)}
`)},Ju=vV});var Yu,WV,An,bA=l(()=>{"use strict";Yu=m(require("node:path"));Ro();qu();WV=e=>{let t=Co(e);if(t===null)return null;let r=Yu.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Yu.default.join(r,Sx),errorChunksFilePath:Yu.default.join(r,yx)}},An=WV});var Cx,aa,Tx,kx,PA,xx,RV,_A,Ix,wA,vA,WA,LA=l(()=>{"use strict";Cx=require("node:crypto"),aa=m(require("node:fs")),Tx=m(require("node:path"));ia();Ro();bA();kx=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),PA=e=>{if(!aa.default.existsSync(e))return kx();try{let t=JSON.parse(aa.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return kx()},xx=(e,t)=>{aa.default.mkdirSync(Tx.default.dirname(e),{recursive:!0}),aa.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},RV=e=>{let t=Kt(e).trim(),n=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,Cx.createHash)("sha256").update(n).digest("hex").slice(0,16)},_A=e=>{let t=An(e);return t===null?null:PA(t.usageStatsFilePath)},Ix=e=>{if(e.chunkIds.length===0)return;let t=An(e);if(t===null)return;let r=PA(t.usageStatsFilePath),n={...r.chunkRetrievalCounts};for(let o of e.chunkIds)n[o]=(n[o]??0)+1;xx(t.usageStatsFilePath,{...r,chunkRetrievalCounts:n})},wA=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=An(e);if(r===null)return null;let n=RV(t),o=PA(r.usageStatsFilePath),s=o.errorOccurrences[n],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return xx(r.usageStatsFilePath,{...o,errorOccurrences:{...o.errorOccurrences,[n]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),n},vA=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,WA=e=>{if(e===null)return[];let t=[];for(let[r,n]of Object.entries(e.chunkRetrievalCounts))n<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:n,chunkId:r,message:`Knowledge chunk "${r}" was injected ${n} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,n]of Object.entries(e.errorOccurrences))n.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:n.count,errorFingerprint:r,message:`Error "${n.preview}" occurred ${n.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:n.count,errorFingerprint:r,message:`Same error (${n.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,n)=>r.priority-n.priority||n.hitCount-r.hitCount)}});var la,Ox,kV,CV,Nx,TV,EA,ca,To,RA,xo,kA,CA=l(()=>{"use strict";la=m(require("node:fs")),Ox=m(require("node:path"));ia();qu();AA();LA();kV="http://127.0.0.1:11434",CV="nomic-embed-text",Nx=(e,t,r)=>Co({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,TV=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},EA=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},ca=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||kV,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||CV;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},To=(e,t,r)=>{let n=Nx(e,t,r);if(n===null||!la.default.existsSync(n))return[];let o=la.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},RA=async e=>{let t=Kt(e.text),r=EA(t);if(r.length===0)return 0;let n=Nx(e.layout,e.projectFolderPath,e.projectId);if(n===null)return 0;la.default.mkdirSync(Ox.default.dirname(n),{recursive:!0});let o=0;for(let s of r){let i=await ca(s);if(i===null)continue;let a={id:`${Date.now()}-${o}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};la.default.appendFileSync(n,`${JSON.stringify(a)}
`,"utf8"),o+=1}return Ju(n),o},xo=async e=>{let t=await ca(e.query);if(t===null)return[];let r=e.minScore??0,s=To(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:TV(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return Ix({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},kA=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var da,Mx,xV,IV,TA,xA,IA,jx=l(()=>{"use strict";da=m(require("node:fs")),Mx=m(require("node:path"));ia();bA();AA();CA();xV=e=>{if(!da.default.existsSync(e))return[];let t=da.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let n of t)try{r.push(JSON.parse(n))}catch{}return r},IV=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},TA=async e=>{let t=An(e);if(t===null)return 0;let r=Kt(e.text),n=EA(r,600);if(n.length===0)return 0;let o=t.errorChunksFilePath;da.default.mkdirSync(Mx.default.dirname(o),{recursive:!0});let s=0;for(let i of n.slice(0,3)){let a=await ca(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};da.default.appendFileSync(o,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Ju(o,200),s},xA=async e=>{let t=An(e);if(t===null)return[];let r=await ca(e.query);if(r===null)return[];let n=e.minScore??.3;return xV(t.errorChunksFilePath).map(s=>({chunk:s,score:IV(r,s.embedding)})).filter(s=>s.score>=n).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},IA=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var OA=l(()=>{"use strict";CA();LA();jx()});var NA,Dx=l(()=>{"use strict";NA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var Hx=l(()=>{"use strict";Dx()});var ue,MA,jA=l(()=>{"use strict";Hx();ue=NA,MA=`
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
.sdlc-compose-mode { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-right: auto; }
.sdlc-compose-mode [aria-pressed="true"] {
  background: var(--aw-zinc-100);
  outline: 2px solid var(--accent, #2563eb);
}
.sdlc-compose-viewing-result [data-writer-status] { display: none; }
.sdlc-compose-viewing-finished .sdlc-compose-mode { display: none; }
.sdlc-compose-viewing-finished .sdlc-compose-summary::after {
  content: "\u25B8";
  color: var(--aw-zinc-500);
  font-size: 1rem;
  margin-left: auto;
}
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
`.trim()});var OV,NV,DA,Fx,HA,$x=l(()=>{"use strict";jA();sa();OV=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,NV=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],DA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Fx=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${OV}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,HA=e=>{let t=NV.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=DA(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"",o=DA(e.installBundleVersionLabel?.trim()??"unknown"),s=Fx("brand brand-in-sidebar",o),i=Fx("brand brand-in-header",o);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${DA(e.title)} \xB7 Agent Witch Local</title>
  <style>${MA}</style>
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
</html>`}});var Xu,ua,Zu=l(()=>{"use strict";Xu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ua=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Xu(e.syncMessage)}</p>`:"",n=Xu(e.manageHref),o=Xu(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Xu(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${n}" target="_blank" rel="noopener noreferrer">${o} \u2197</a></p>
    </div>`}});var FA,$A,zA,zx=l(()=>{"use strict";FA=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,$A=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,zA=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Ux=l(()=>{"use strict";$x();Zu();zx()});var Io,UA,Bx=l(()=>{"use strict";sa();Io=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UA=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Io(e.wakeError)}</div>`:"",a=oa(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Io(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Io(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Io(n)}</p>
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
        <p class="home-card-meta">${Io(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Io(o)}</p>
      </a>
    </div>`}});var Gx=l(()=>{"use strict";Bx()});var k,Qu=l(()=>{"use strict";k=e=>e==="passed"||e==="stopped"||e==="failed"});var Vx,BA,bn,GA,ep=l(()=>{"use strict";Vx="Stopped at the round limit. The best prompt is kept.",BA="Stopped because the score stopped rising. The best prompt is kept.",bn="Finished. The best prompt is the result.",GA="Wizard ended. Progress from finished steps is kept."});var pa,VA=l(()=>{"use strict";pa=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],n=e.instructions?.trim()??"",o=n.length===0?[]:["","Instructions:",n];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...o,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",n.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var MV,jV,ma,qx,tp=l(()=>{"use strict";MV=/\n+|;\s+/,jV=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,ma=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let n=r.split(MV).map(o=>o.replace(/^[-*]\s*/,"").trim()).filter(o=>o.length>0).reduce((o,s)=>{if(t.length+o.length>=12)return o;let i=s.toLowerCase();return[...t,...o].some(c=>c.toLowerCase()===i)?o:[...o,jV(s)]},[]);return[...t,...n]},[]),qx=e=>{let t=ma(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var he,ga=l(()=>{"use strict";he=e=>{let t=e.flatMap(o=>o.score===null?[]:[{roundNumber:o.roundNumber,promptText:o.promptText,score:o.score,reasons:o.reasons}]),[r,...n]=t;return r===void 0?null:n.reduce((o,s)=>s.score>o.score||s.score===o.score&&s.roundNumber>o.roundNumber?s:o,r)}});var fa,qA=l(()=>{"use strict";tp();ga();fa=e=>{let t=[...e.priorRounds,e.current],r=he(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},n=[...t].filter(o=>o.score<r.score).sort((o,s)=>s.roundNumber-o.roundNumber).map(o=>o.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:qx(n)}}});var KA,DV,HV,Kx,Jx=l(()=>{"use strict";KA={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},DV=e=>{try{let t=JSON.parse(e.fragment);return{...KA,objects:[...e.objects,t]}}catch{return{...KA,objects:e.objects}}},HV=(e,t)=>{if(e.inString){let n=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:n}:t==="\\"?{...e,escaped:!0,fragment:n}:t==='"'?{...e,inString:!1,fragment:n}:{...e,fragment:n}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:DV(r)},Kx=e=>[...e].reduce(HV,KA).objects});var FV,JA,$V,Yx,YA=l(()=>{"use strict";Jx();FV=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},JA=e=>{let t=Kx(e).filter(FV),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},$V=(e,t)=>({...e,passed:e.score>=t}),Yx=(e,t)=>{let r=JA(e);return r===null?null:$V(r,t)}});var XA,ZA,rp=l(()=>{"use strict";XA="The judge reply needs a score and a reason.",ZA="The improver reply was empty."});var Xx,Zx=l(()=>{"use strict";Xx=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((n,o)=>o>n.best?{best:o,stall:0}:{best:n.best,stall:n.stall+1},{best:t,stall:0}).stall}});var Qx,e0=l(()=>{"use strict";Qx=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((n,o)=>o.score>n.best?{best:o.score,reasons:[]}:{best:n.best,reasons:[...n.reasons,o.reasons]},{best:t.score,reasons:[]}).reasons}});var UV,t0,r0=l(()=>{"use strict";Zx();e0();ep();tp();UV=e=>{let t=ma(e);return t.length===0?BA:`${BA} Avoid: ${t.join("; ")}.`},t0=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:Vx};if(Xx(e.scores)>=3){let t=e.scores.map((r,n)=>({score:r,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:UV(Qx(t))}}return null}});var vr,BV,QA,n0,np=l(()=>{"use strict";vr=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},BV=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,QA=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",BV(e.tokens),`Delay: ${vr(e.delayMs)}`,"",n,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},n0=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var GV,o0,s0=l(()=>{"use strict";YA();GV=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,o0=e=>{let r=(GV.exec(e)?.[1]??e).trim();return r.length===0||JA(r)!==null?null:r}});var i0,op,a0=l(()=>{"use strict";np();s0();rp();i0=e=>({type:"call",role:"judge",choice:e.choice,prompt:n0({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),op=e=>{let t=o0(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:ZA}}:{nextPrompt:t,continuation:i0({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var eb,l0=l(()=>{"use strict";VA();qA();YA();rp();ep();r0();rp();a0();eb=e=>{let t=Yx(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:XA}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],n=e.round??r.length,o=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=t0({scores:o.map(a=>a.score),reasons:o.map(a=>a.reasons),round:n,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=fa({current:{roundNumber:n,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:pa({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var ha,tb=l(()=>{"use strict";ha=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var rb,c0=l(()=>{"use strict";rb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",n,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var VV,nb,d0=l(()=>{"use strict";np();VV=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,nb=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",VV(e.tokens),`Delay: ${vr(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var qV,KV,JV,ob,u0=l(()=>{"use strict";qV=/[A-Za-z0-9_./~-]{3,180}/g,KV=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,JV=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||KV.test(t)},ob=(e,t=12)=>{let r=[];for(let n of e.matchAll(qV)){let o=n[0].replace(/\.+$/,"");if(!(!JV(o)||r.includes(o))&&(r.push(o),r.length>=t))break}return r}});var ya,p0=l(()=>{"use strict";ya=(e,t)=>e.flatMap(r=>{let n=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||n.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:n}]}).sort((r,n)=>r.roundNumber-n.roundNumber)});var sp,sb,m0,Sa,ib=l(()=>{"use strict";sp=e=>Math.floor(e/2),sb=e=>Math.max(sp(e)+1,e-20),m0=(e,t)=>e>=t?"passes":e>=sb(t)?"close":e>=sp(t)?"weak":"bad",Sa=e=>[{band:"bad",label:`0\u2013${sp(e)-1} bad`},{band:"weak",label:`${sp(e)}\u2013${sb(e)-1} weak`},{band:"close",label:`${sb(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var ip,ab=l(()=>{"use strict";ib();ip=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",n=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${m0(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),o=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...n,...o]}});var g0,f0=l(()=>{"use strict";g0=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var h0,y0=l(()=>{"use strict";h0=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var Wr=l(()=>{"use strict"});var YV,XV,je,ap=l(()=>{"use strict";Wr();YV=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let n=r.rounds.reduce((o,s)=>o+(s.tokens??0),0);return n>0?n:null},XV=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,je=e=>{let t=e.modules.map((s,i)=>({moduleId:s.moduleId,title:s.title,bestScore:s.statistics?.bestScore??null,tokens:YV(e,i),status:s.status})),r=t.length,n=t.filter((s,i)=>XV(e.modules[i])).length,o=r>0&&n===r?"passed":"stopped";return{passedModuleCount:n,totalModules:r,terminalStatusSuggestion:o,rows:t}}});var ZV,QV,S0,A0=l(()=>{"use strict";Qu();ab();f0();y0();ap();ZV=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],QV=e=>{if(e.wizard!==void 0&&e.wizard.phase==="complete")return"Finished";if(e.status==="passed")return"Passed";if(e.status==="stopped"){if(e.wizard!==void 0){let t=je(e.wizard);if(t.totalModules>0&&t.passedModuleCount===t.totalModules)return"Finished"}return(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped"}return"Failed"},S0=e=>{let t=e.wizard;if(t===void 0)return[];let r=g0(t),n=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),o=e.status==="wizard_paused",s=t.phase==="complete",i=ZV.map((p,f)=>{let b=!s&&!o&&f===r?"active":"done";return{id:`wizard-${f+1}`,label:p,state:b,detail:null}}).filter((p,f)=>s?!0:f<=n),a=o&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=h0(t)&&(!o||a)?ip(e):[],d=k(e.status)&&!s?[{id:"end",label:QV(e),state:"done",detail:e.errorMessage}]:[];return[...i,...c,...d]}});var eq,lb,b0=l(()=>{"use strict";Qu();ab();A0();eq=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",lb=e=>{if(e.wizard!==void 0)return S0(e);let t=ip(e),r=k(e.status)?[{id:"end",label:eq(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var P0=l(()=>{"use strict";zt()});var _0,Aa,ba,Oo,lp,cb,w0=l(()=>{"use strict";P0();_0="/prompt-optimizer/agent",Aa=`${$t}${_0}`,ba=`${$t}/prompt-optimizer`,Oo="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",lp=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Oo}`,cb="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var v0,W0=l(()=>{"use strict";v0=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var db,E0=l(()=>{"use strict";W0();Wr();db=e=>({schemaVersion:3,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:v0(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{}})});var ub,R0=l(()=>{"use strict";ub=e=>({...e,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null}))})});var pb,k0=l(()=>{"use strict";Wr();pb=(e,t,r)=>{let n=r.trim();if(n.length===0)return e;let o=e.avoidByStep[t]??[],s=[n,...o].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var C0,mb,T0=l(()=>{"use strict";C0=["generalize","evaluate","separate","optimize_modules"],mb=(e,t)=>{let r=C0.indexOf(t);if(r===-1)return e;let n=C0.slice(r+1);return n.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:n.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:n.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:n.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:n.includes("separate")?null:e.selectedSplitTopology,modules:n.includes("optimize_modules")?[]:e.modules,currentModuleIndex:n.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:n.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var cp,gb=l(()=>{"use strict";tp();cp=e=>{let t=ma(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var fb,x0=l(()=>{"use strict";gb();fb=e=>{let t=cp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,n,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(o=>o.length>0).join(`
`)}});var rq,nq,oq,I0,O0=l(()=>{"use strict";rq=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),nq=/^\{\{[a-zA-Z0-9_-]+\}\}$/,oq=(e,t)=>{let{masked:r,tokens:n}=t.reduce((o,s)=>{let i=s.sampleValue.trim();if(i.length===0)return o;let a=new RegExp(rq(i),"g"),c=[...o.tokens];return{masked:o.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return n.reduce((o,s,i)=>o.replace(`\0PO${i}\0`,s),r)},I0=(e,t)=>{let r=[...t].sort((o,s)=>s.sampleValue.length-o.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(o=>nq.test(o)?o:oq(o,r)).join("")}});var hb,N0=l(()=>{"use strict";O0();hb=(e,t)=>e.map(r=>({...r,modules:r.modules.map(n=>({...n,prompt:I0(n.prompt,t)}))}))});var sq,Sb,M0=l(()=>{"use strict";Wr();gb();sq=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Sb=e=>{let t=cp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,o=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=sq(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",o,r,n,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Ab,j0=l(()=>{"use strict";tb();Ab=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",n=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),o=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...n,s].filter(a=>a.length>0).join(`
`);return ha({promptText:e.promptText,instructions:`${i}${o.join(`
`)}`})}});var Pa,bb=l(()=>{"use strict";ga();Pa=e=>{let t=e.revisions.map(o=>({roundNumber:o.roundNumber,score:o.judgement?.score??null,passed:o.judgement?.passed??null,runOutput:o.run?.output??null,tokens:o.run?.tokens??null})),r=he(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null}))),n=r===null?null:e.revisions.find(o=>o.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:n?.run?.output??null,rounds:t}}});var Pb,D0=l(()=>{"use strict";bb();Pb=e=>{let t=Pa({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((n,o)=>o===e.moduleIndex?{...n,status:r,selectedRevisionRound:t.bestRound,statistics:t}:n)}}});var _a,H0=l(()=>{"use strict";_a=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let n=r.statistics?.bestRunOutput?.trim()??"";return n.length>0?{output:n,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var _b,F0=l(()=>{"use strict";Wr();ap();_b=e=>{let t=je(e.wizard),r=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${70})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&r.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,o)=>{let s=n.statistics?.bestRunOutput?.trim();s===void 0||s.length===0||r.push("",`## Module ${o+1}: ${n.title}`,"","```",s,"```")}),`${r.join(`
`)}
`}});var wb,$0=l(()=>{"use strict";wb=e=>{let t=e.modules.reduce((r,n)=>{let o=n.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+o},0);return t>0?t:null}});var dp,vb=l(()=>{"use strict";dp=e=>{let t=e.trim(),n=t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t,o=n.indexOf("{"),s=n.lastIndexOf("}");if(o===-1||s<=o)throw new Error("No JSON object in reply.");return JSON.parse(n.slice(o,s+1))}});var gt,iq,Wb,z0=l(()=>{"use strict";gt=m(vs());vb();iq=(0,gt.isType)({name:gt.isNonEmptyString,description:gt.isString,sampleValue:gt.isString}),Wb=e=>{let t=dp(e);if(!(0,gt.isType)({templatedPrompt:gt.isNonEmptyString,variables:(0,gt.isArrayWithEachItem)(iq)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var re,aq,lq,Lb,U0=l(()=>{"use strict";re=m(vs());Wr();vb();aq=(0,re.isType)({id:re.isNonEmptyString,title:re.isNonEmptyString,prompt:re.isNonEmptyString,order:re.isNumber}),lq=(0,re.isType)({id:re.isNonEmptyString,title:re.isNonEmptyString,summary:re.isString,topology:(0,re.isOneOf)("chain","parallel"),modules:(0,re.isArrayWithEachItem)(aq),recommended:re.isBoolean}),Lb=e=>{let t=dp(e);if(!(0,re.isType)({options:(0,re.isArrayWithEachItem)(lq)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),n=r.filter(o=>o.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return n!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var No,B0=l(()=>{"use strict";No=e=>{let t=e.wizard.attempts.filter(n=>n.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var cq,wa,Eb=l(()=>{"use strict";cq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,wa=(e,t)=>{let r=new Map(t.map(n=>[n.name,n.sampleValue]));return e.replace(cq,(n,o)=>{let s=r.get(o);return s===void 0?n:s})}});var va,Wa,G0=l(()=>{"use strict";ga();Eb();va=e=>wa(e.templatedPrompt,e.variables),Wa=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(n=>n.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return he(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??va(e.wizard)}});var dq,La,V0=l(()=>{"use strict";dq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,La=(e,t)=>e.replace(dq,(r,n)=>{let o=t[n];return o===void 0||o.trim()===""?r:o})});var uq,Ea,Rb=l(()=>{"use strict";uq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ea=e=>{let t=new Set,r=[];for(let n of e.matchAll(uq)){let o=n[1];t.has(o)||(t.add(o),r.push(o))}return r}});var Ra,Pn,q0=l(()=>{"use strict";Ra=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Pn=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var pq,up,kb,K0=l(()=>{"use strict";Rb();pq="wizardParam_",up=e=>`${pq}${e}`,kb=e=>{let t=Ea(e.modulePrompt),r={...e.wizard.parameterValues},n=new Set(e.wizard.variables.map(o=>o.name));for(let o of t){let s=up(o),i=e.posted.get(s),a=i!==null?i.trim():r[o]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:n.has(o)?`Fill in {{${o}}} before running this module.`:`Fill in {{${o}}} (not listed in Step 1) before running this module.`};r[o]=a}return{ok:!0,parameterValues:r}}});var _n,J0=l(()=>{"use strict";_n=["generalize","evaluate","separate","optimize_modules"]});var T=l(()=>{"use strict";Qu();ep();l0();VA();np();tb();c0();d0();u0();qA();p0();ga();b0();ib();w0();Wr();E0();R0();k0();T0();x0();N0();M0();j0();bb();D0();H0();ap();F0();$0();z0();U0();B0();G0();Eb();V0();Rb();q0();K0();J0()});var Ca=l(()=>{"use strict";lt();ea();Sd()});var mq,Q0,eI=l(()=>{"use strict";Ca();mq=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,Q0=e=>{let t=io(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(mq)],n=r[r.length-1];if(n===void 0)return null;let o=Number(n[1])+Number(n[2]);return Number.isFinite(o)&&o>=1?o:null}});var gq,fq,tI,Cb,hq,yq,ft,rI,nI,wn=l(()=>{"use strict";Ca();eI();gq="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",fq="The writer waited on terminal input and did not return a prompt.",tI=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Cb=e=>{let t=e.trim();if(t.length===0||t.length>=500||!tI.test(t))return null;let r=t.split(`
`).map(n=>n.trim()).find(n=>tI.test(n))??t;return r.length>280?`${r.slice(0,277)}...`:r},hq=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},yq=e=>Cb(e.stdout)??Cb(e.stderr)??(hq(e.replyFile)?Cb(e.replyFile):null),ft=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return gq;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?fq:null},rI=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],nI=e=>{let t=e.replyFileText?.trim()??"",r=ft([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let n=yq({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(n!==null)return{ok:!1,errorMessage:n};let o=Q0([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:o};if(e.writerAgent==="claude-cli"){let i=io(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:o}:{ok:!1,errorMessage:"The writer did not reply."}}});var Ta,Tb=l(()=>{"use strict";Ta=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var pp,jo,xb=l(()=>{"use strict";Tb();pp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jo=e=>{let t=Ta(e.cycle);if(t.length===0&&e.cycle.revisions.length===0)return"";let r=t.length===0?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",n=e.caption===void 0?"":`<p class="muted">${pp(e.caption)}</p>`,o=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",s=a=>o&&a===0?"Trial run":`Round ${a}`,i=e.cycle.revisions.map(a=>{let c=a.judgement?.score,d=c==null?`${s(a.roundNumber)} \u2014 not scored`:`${s(a.roundNumber)} \u2014 ${c}`,p=a.judgement?.reasons?.trim()??"",f=p.length===0?"":`<br><span class="muted">${pp(p)}</span>`;if(e.interactive){let b=e.selectedRound===a.roundNumber?" checked":"";return`<li><label><input type="radio" name="wizardRevisionRound" value="${a.roundNumber}"${b}> ${pp(d)}</label>${f}</li>`}return`<li>${pp(d)}${f}</li>`}).join("");return`${r}${n}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${i}</ul>`}});var Ib,oI,mp,sI,gp=l(()=>{"use strict";Ib=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oI=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Ib(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Ib(t.prompt)}</pre></li>`).join("")}</ol>`,mp=e=>oI([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),sI=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(o=>o.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Ib(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${oI(t.modules.map(o=>({title:o.title,prompt:o.prompt})))}
  </section>`}});var We,Sq,Aq,bq,Pq,_q,wq,Do,fp=l(()=>{"use strict";T();xb();gp();We=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Sq=e=>{let t=e.wizard;if(t===void 0)return null;let n=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(n===void 0||typeof n.output!="object"||n.output===null)return null;let o=n.output.revisions;if(!Array.isArray(o))return null;let s=[];for(let i of o){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},Aq=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.variables.length===0?'<p class="muted">No variables yet.</p>':`<ul class="sdlc-wizard-vars">${t.variables.map(a=>`<li><strong>{{${We(a.name)}}}</strong> \u2014 ${We(a.description)} (sample: ${We(a.sampleValue)})</li>`).join("")}</ul>`,n=t.templatedPrompt.trim(),o=n.length===0?'<p class="muted">No templated prompt yet.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${We(n)}</pre>`,s=wa(t.templatedPrompt,t.variables).trim(),i=s.length===0||s===n?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${We(s)}</pre>`;return`${r}${o}${i}`},bq=(e,t)=>`<ul class="sdlc-wizard-revisions">${e.map(n=>{let o=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,s=t===n.roundNumber?" (selected)":"",i=n.reasons?.trim()??"",a=i.length===0?"":`<br><span class="muted">${We(i)}</span>`;return`<li>${We(o)}${s}${a}</li>`}).join("")}</ul>`,Pq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return jo({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let n=Sq(e);if(n!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${bq(n,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let o=Wa({wizard:t,revisions:e.revisions.map(s=>({roundNumber:s.roundNumber,promptText:s.promptText,score:s.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${We(o)}</pre>`}return'<p class="muted">Evaluate has not run yet.</p>'},_q=e=>{let t=e.wizard;return t===void 0?"":t.splitOptions.length===0?'<p class="muted">No split options yet.</p>':`<ul class="sdlc-wizard-splits">${t.splitOptions.map(n=>{let o=n.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===n.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${We(n.title)}</strong>${o}${We(s)}<br><span class="muted">${We(n.summary)} (${We(n.topology)})</span>${mp(n)}</li>`}).join("")}</ul>`},wq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((o,s)=>{let i=s===t.currentModuleIndex?" \u2014 current":"";return`<li><strong>${We(o.title)}</strong> (${We(o.status)})${We(i)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${We(o.prompt)}</pre></li>`}).join(""),n=t.phase==="optimize_modules"||t.gate==="optimize_modules"?jo({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ol class="sdlc-wizard-chunks">${r}</ol>${n}`},Do=(e,t)=>{switch(t){case"wizard-1":return Aq(e);case"wizard-2":return Pq(e);case"wizard-3":return _q(e);case"wizard-4":return wq(e);default:return""}}});var vq,iI,aI,lI=l(()=>{"use strict";T();wn();fp();vq=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},iI=(e,t,r,n)=>{let o=ft(t);return{title:e,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:n,promptText:o===null?t:null,promptNote:o,bodyHtml:null}},aI=(e,t)=>{if(t.id.startsWith("wizard-")){let o=Do(e,t.id);return{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:o.trim().length===0?null:o}}if(t.id==="end"){let o=he(e.revisions.map(s=>({roundNumber:s.roundNumber,promptText:s.promptText,score:s.judgement?.score??null,reasons:s.judgement?.reasons??null})));return o===null?{title:t.label,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:iI(t.label,o.promptText,o.score,o.reasons)}let r=t.id==="rewrite"?e.currentRound:vq(t.id),n=r===null?void 0:e.revisions.find(o=>o.roundNumber===r);return n===void 0?{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:iI(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail)}});var xa,cI,dI=l(()=>{"use strict";xa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cI=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?'<p class="muted">Not scored yet.</p>':`<p class="muted">${xa(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,n=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${xa(e.feedback.trim())}</p>`,o=e.promptNote!==null?`<div class="alert-error">${xa(e.promptNote)}</div>`:e.promptText===null?"":`<h2>Saved prompt</h2><pre class="mono">${xa(e.promptText)}</pre>`;return`<h2>${xa(e.title)}</h2>${t}${r}${n}${o}`}});var hp,Ho,yp=l(()=>{"use strict";hp=e=>e.toLocaleString("en-US"),Ho=(e,t)=>e.revisions.reduce((r,n)=>t!==void 0&&n.roundNumber>t?r:r+(n.writerTokens??0)+(n.run?.tokens??0)+(n.judgement?.tokens??0),0)});var Ob,Wq,uI,Sp,pI,mI,Ap=l(()=>{"use strict";T();lI();dI();yp();Ob=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wq=(e,t)=>{let r=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',n=/^score-(\d+)$/.exec(e.id),o=e.state==="done"&&n!==null?Ho(t,Number(n[1])):0,s=o>0?`<span class="sdlc-node-reason">${hp(o)} tokens so far</span>`:"",i=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Ob(e.detail)}</span>`:"",a=cI(aI(t,e));return`<li class="sdlc-node sdlc-node-${e.state}"><button type="button" class="sdlc-node-open" data-sdlc-node>${r}<span class="sdlc-node-label">${Ob(e.label)}${i}${s}</span></button><template>${a}</template></li>`},uI=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>Wq(r,t)).join("")}</ol>`,Sp=e=>`<div class="sdlc-score" aria-label="What the score means">${Sa(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Ob(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,pI='<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog"><button class="btn btn-secondary" type="submit">Close</button></form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>',mI=`<script>
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
</script>`});var bp,Pp,_p,gI,Nb=l(()=>{"use strict";bp="support-reply",Pp="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",_p=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),gI=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var wp,fI,hI=l(()=>{"use strict";T();Ap();Nb();wp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fI=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. <strong>Classic loop (90 / 10 rounds)</strong> skips the wizard: a judge scores the prompt in your folder, an improver rewrites under the pass score, and the loop stops when the score passes, you press Finish, the round limit is hit, or the score has not risen for 3 rounds. After each scored round the page shows tokens spent. The next rewrite starts from the highest scoring prompt; lower scores become an avoid list. The round limit starts at 10 on classic runs (wizard evaluate defaults differ). Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field. The pass score slider defaults to ${90} on classic runs.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>You set the pass score with the slider. The bar fades from a weak score to a pass. The mark is the usual ${90}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${Sp(90)}
      <h2>Writers and folder</h2>
      <p>You choose the judge and the improver. Each one has an optional instructions field, used with the goal. Each round the judge runs the prompt in the folder you chose. If the prompt needs an input, put that input in the judge instructions. The judge then reads the git changes, or the files the prompt names, and scores those changes. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder. It does not guess a printed reply, and it does not score the prompt wording. A separate pass checks the tokens and suggests what to cut before the improver runs. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, and improver you last chose. The first visit uses your home directory and leaves the judge and improver blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot runs this loop itself before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a run in that folder. maxRounds is optional and defaults to 10. When only one writer is installed, that writer scores and rewrites. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${wp(Pp)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${wp(_p)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${wp(gI)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${wp(bp)}">Run this sample</a>
      </div>
    </section>`});var Mb,vp,Lq,yI,SI=l(()=>{"use strict";Mb=m(require("node:fs")),vp=m(require("node:path")),Lq=e=>vp.default.join(vp.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),yI=(e,t)=>{let r=Lq(e),n=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;Mb.default.mkdirSync(vp.default.dirname(r),{recursive:!0}),Mb.default.appendFileSync(r,n,"utf8")}});var Fo,AI,Eq,bI,Rq,PI,Et,X,_I,G,Ke=l(()=>{"use strict";Fo=m(require("node:fs")),AI=m(require("node:path"));T();SI();Eq=e=>e.wizard===void 0?e:{...e,wizard:ub(e.wizard)},bI=new Set,Rq=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),PI=(e,t)=>{Fo.default.mkdirSync(AI.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Fo.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Fo.default.renameSync(r,e)},Et=e=>{if(!Fo.default.existsSync(e))return[];try{let t=JSON.parse(Fo.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(Rq).map(Eq):[]}catch{return[]}},X=(e,t)=>Et(e).find(r=>r.id===t)??null,_I=(e,t)=>{bI.add(t);let r=Et(e).filter(n=>n.id!==t);PI(e,r)},G=(e,t)=>{if(bI.has(t.id))return;let r=Et(e),n=r.some(o=>o.id===t.id)?r.map(o=>o.id===t.id?t:o):[t,...r];PI(e,n),yI(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var wI,Wp,jb,vn,Db,Rt,Wn,Le,Je=l(()=>{"use strict";wI=m(require("node:fs")),Wp=m(require("node:os")),jb=m(require("node:path"));ut();vn="~",Db=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Rt=e=>{let t=Wp.default.homedir(),r=Db(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Wn=e=>{let t=e.trim().length===0?"~":e.trim(),r=Ve(t),n=jb.default.isAbsolute(r)?Db(r):Db(jb.default.resolve(Wp.default.homedir(),r));try{if(!wI.default.statSync(n).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:n,display:Rt(n)}},Le=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Wp.default.homedir()});var $o,kt,Ia,vI,Lp,kq,WI,LI,EI,Hb=l(()=>{"use strict";$o=m(require("node:fs")),kt=m(require("node:path")),Ia=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},vI=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Lp=(e,t)=>{let r=Ia(e);return r.length>0?r:Ia(t)},kq=e=>{let t=Lp(e.fileName,e.name),r=e.promptText.trim(),n=e.name.trim();if(t.length===0||r.length===0||n.length===0)return null;let o=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${vI(n)}`,...o.length>0?[`description: ${vI(o)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},WI=e=>`.cursor/skills/${e}/SKILL.md`,LI=(e,t)=>{let r=Ia(t);if(r.length===0)return!1;let n=kt.default.resolve(e),o=kt.default.resolve(n,".cursor","skills"),s=kt.default.resolve(n,WI(r));return s.startsWith(`${o}${kt.default.sep}`)?$o.default.existsSync(s):!1},EI=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Lp(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=kt.default.resolve(e.workingDirectory);try{if(!$o.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=kq({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let n=WI(r.slug),o=kt.default.resolve(t,".cursor","skills"),s=kt.default.resolve(t,n);if(!s.startsWith(`${o}${kt.default.sep}`))return{ok:!1,errorCode:"path"};if($o.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{$o.default.mkdirSync(kt.default.dirname(s),{recursive:!0}),$o.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:n}}});var Cq,RI,kI,CI=l(()=>{"use strict";T();T();Ke();Je();wn();Hb();Cq=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,RI=e=>{let t=e.get("savedSkill");return t!==null&&Cq.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},kI=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=X(e.storePath,t),n=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!k(r.status))return{kind:"redirect",location:n("skillError=working")};let o=he(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(o===null||ft(o.promptText)!==null)return{kind:"redirect",location:n("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=EI({workingDirectory:Le(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:o.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:n(`skillError=${a}`)}}return{kind:"redirect",location:n(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var x,Tq,Ep,Ye,Ln,xI,TI,II,OI,De=l(()=>{"use strict";x="manual",Tq=["claude-cli","codex","cursor","antigravity"],Ep={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Ye=e=>e===x?"You":e in Ep?Ep[e]:e,Ln=e=>Tq.filter(t=>e.includes(t)),xI=e=>{let t=Ln(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},TI=(e,t)=>t===x?x:e.find(r=>r===t)??null,II=(e,t,r)=>{let n=Ln(e),o=TI(n,t),s=TI(n,r);return o===null||s===null?null:{judge:o,improver:s}},OI=(e,t,r)=>{let n=Ln(e);return t===null||t.trim()===""?r!==x?r:n[0]??null:t===x?null:n.find(o=>o===t)??null}});var Fb,NI,MI=l(()=>{"use strict";Fb={ok:!1,errorMessage:"Stopped.",stopped:!0},NI=(e,t,r)=>{if(t===void 0)return;let n=()=>{e.kill("SIGTERM"),r(Fb)};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var jI,Oa,DI,$b,xq,Iq,Oq,Xe,Na=l(()=>{"use strict";jI=require("node:child_process"),Oa=m(require("node:fs")),DI=m(require("node:os")),$b=m(require("node:path"));Ca();MI();wn();xq=["claude-cli","codex","cursor","antigravity"],Iq=18e4,Oq=e=>xq.includes(e),Xe=e=>new Promise(t=>{if(e.signal?.aborted){t(Fb);return}if(!Oq(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,n=_t(r,e.prompt,se({}));if(n===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!Oa.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let o=$b.default.join(Oa.default.mkdtempSync($b.default.join(DI.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=rI({writerAgent:r,baseArgs:n.args,replyPath:o}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,jI.spawn)(n.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=f=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(f))};NI(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??Iq),d.stdout.on("data",f=>{i.push(Buffer.from(f))}),d.stderr.on("data",f=>{a.push(Buffer.from(f))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let f=Oa.default.existsSync(o)?Oa.default.readFileSync(o,"utf8"):null;p(nI({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:f}))})})});var HI,Nq,Ma,Rp,kp=l(()=>{"use strict";T();De();HI=e=>e===x?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},Nq=(e,t,r,n,o,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:n,reasons:o,rawReply:t,tokens:s}}:i),Ma=(e,t,r=null)=>{let n=e.revisions.find(a=>a.roundNumber===e.currentRound),o=eb({raw:t,passScore:e.passScore,goal:e.goal,promptText:n?.promptText??"",improver:HI(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:ya(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=Nq(e,t,o.verdict?.score??null,o.verdict?.passed??null,o.verdict?.reasons??null,r),i=new Date().toISOString();return o.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:o.continuation.type,errorMessage:o.continuation.type==="passed"?null:o.continuation.errorMessage,updatedAt:i}},Rp=(e,t,r=null)=>{let n=op({raw:t,judge:HI(e.judgeModel),goal:e.goal,passScore:e.passScore}),o=new Date().toISOString();return n.nextPrompt===null?{...e,status:"failed",errorMessage:n.continuation.type==="failed"?n.continuation.errorMessage:"The improver reply was empty.",updatedAt:o}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:n.nextPrompt,judgement:null,writerTokens:r}],updatedAt:o}}});var Cp,zb=l(()=>{"use strict";Cp=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let n=`Token review: ${r}`;return{...e,revisions:e.revisions.map(o=>{if(o.roundNumber!==e.currentRound)return o;let s=o.judgement?.reasons?.trim()??"";return{...o,run:o.run===void 0?o.run:{...o.run,tokenReview:r},judgement:o.judgement===null?o.judgement:{...o.judgement,reasons:s.length===0?n:`${s}

${n}`}}})}}});var zI,Tp,xp,FI,$I,Ub,Mq,UI,Bb,jq,BI,Dq,Hq,GI,VI=l(()=>{"use strict";zI=require("node:child_process"),Tp=m(require("node:fs")),xp=m(require("node:path"));T();FI=4e3,$I=12e3,Ub=(e,t)=>{let r=(0,zI.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Mq=e=>Ub(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",UI=e=>{let t=Ub(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(n=>{if(n.length<4)return[];let o=n.slice(3).trim();return[[(o.includes(" -> ")?o.split(" -> ").at(-1)??o:o).replaceAll('"',""),n]]});return Object.fromEntries(r)},Bb=(e,t)=>{let r=xp.default.resolve(e,t),n=xp.default.relative(e,r);if(n.startsWith("..")||xp.default.isAbsolute(n)||!Tp.default.existsSync(r)||!Tp.default.statSync(r).isFile())return null;let o=Tp.default.readFileSync(r,"utf8");return o.includes("\0")?"(binary file)":o.length>FI?`${o.slice(0,FI)}
\u2026truncated`:o},jq=e=>e.length>$I?`${e.slice(0,$I)}
\u2026truncated`:e,BI=e=>{let t=ob(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(o=>[o,Bb(e.workingDirectory,o)])),n=Mq(e.workingDirectory);return{git:n,status:n?UI(e.workingDirectory):{},files:r,paths:t}},Dq=(e,t)=>{let r=Ub(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let n=Bb(e,t);return n===null?`${t} is missing.`:n},Hq=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",GI=e=>{let t=e.before.git?UI(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),n=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Bb(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),o=r.map(a=>Dq(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",o.length>0?`Changes since the run started:
${o.join(`
`)}`:"",n.length>0?`Files named in the prompt:
${n.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:Hq(e.before.git,e.before.paths.length>0),evidence:jq(i.join(`

`))}}});var qb,z,Kb,ye,qI,Fq,$q,KI,zo,JI,Uo,zq,Uq,ja,Gb,Vb,Bq,YI,Gq,Vq,qq,XI,Kq,ZI,QI,Jq,Yq,eO,tO=l(()=>{"use strict";qb=require("node:child_process"),z=m(require("node:fs")),Kb=m(require("node:os")),ye=m(require("node:path")),qI=8e6,Fq=16e6,$q=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],KI=(e,t)=>{let r=(0,qb.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},zo=(e,t)=>(0,qb.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,JI=e=>{let t=KI(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let n=r.slice(3).trim().replaceAll('"',"");return(n.includes(" -> ")?n.split(" -> "):[n]).map(s=>[s.trim(),r])}))},Uo=(e,t)=>{let r=ye.default.resolve(e,t),n=ye.default.relative(e,r);return n.startsWith("..")||ye.default.isAbsolute(n)?null:r},zq=(e,t)=>{let r=Uo(e,t);if(r===null||!z.default.existsSync(r))return null;let n=z.default.statSync(r);return!n.isFile()||n.size>qI?null:z.default.readFileSync(r)},Uq=(e,t,r)=>{let n=Uo(e,t);n!==null&&(z.default.mkdirSync(ye.default.dirname(n),{recursive:!0}),z.default.writeFileSync(n,r))},ja=(e,t)=>{let r=Uo(e,t);r===null||!z.default.existsSync(r)||z.default.rmSync(r,{recursive:!0,force:!0})},Gb=(e,t)=>zo(e,["cat-file","-e",`HEAD:${t}`]),Vb=e=>{let t=KI(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},Bq=e=>ye.default.resolve(e)!==ye.default.resolve(Kb.default.homedir()),YI=e=>{if(!z.default.existsSync(e))return 0;let t=z.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?z.default.readdirSync(e).reduce((r,n)=>r+YI(ye.default.join(e,n)),0):0},Gq=(e,t,r)=>{let n=Uo(e,r);if(n===null||!z.default.existsSync(n))return{relativePath:r,existed:!1,copyDir:null};if(YI(n)>Fq)return{relativePath:r,existed:!0,copyDir:null};let o=ye.default.join(t,"cache",r);return z.default.mkdirSync(ye.default.dirname(o),{recursive:!0}),z.default.cpSync(n,o,{recursive:!0}),{relativePath:r,existed:!0,copyDir:o}},Vq=400,qq=32e6,XI=e=>{let t=[],r=0,n=!0,o=s=>{if(!(!n||!z.default.existsSync(s)))for(let i of z.default.readdirSync(s)){if(!n||i===".git"||i==="node_modules")continue;let a=ye.default.join(s,i),c=z.default.statSync(a);if(c.isDirectory()){o(a);continue}if(!(!c.isFile()||c.size>qI)){if(t.length>=Vq||r+c.size>qq){n=!1;return}r+=c.size,t.push(ye.default.relative(e,a))}}};return o(e),{paths:t,complete:n}},Kq=(e,t,r)=>{let n=Uo(e,r);if(n===null||!z.default.existsSync(n))return null;let o=zq(e,r);if(o===null)return"skip";let s=ye.default.join(t,"files",r);return z.default.mkdirSync(ye.default.dirname(s),{recursive:!0}),z.default.writeFileSync(s,o),s},ZI=e=>{let t=z.default.mkdtempSync(ye.default.join(Kb.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?JI(e.workingDirectory):{},n=e.git?{paths:[],complete:!0}:XI(e.workingDirectory),o=e.git?[...Object.keys(r),...e.namedPaths]:[...n.paths,...e.namedPaths],s=Object.fromEntries([...new Set(o)].map(i=>[i,Kq(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?Vb(e.workingDirectory):null,isolateCaches:Bq(e.workingDirectory),complete:n.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:$q.map(i=>Gq(e.workingDirectory,t,i))}},QI=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){ja(e.workingDirectory,t);return}Uq(e.workingDirectory,t,z.default.readFileSync(r))}},Jq=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?QI(e,t):Gb(e.workingDirectory,t)?zo(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):ja(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",n=r.startsWith(" ")||r.startsWith("?");n&&Gb(e.workingDirectory,t)&&zo(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),n&&!Gb(e.workingDirectory,t)&&zo(e.workingDirectory,["reset","-q","HEAD","--",t])},Yq=(e,t)=>{let r=Uo(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){ja(e.workingDirectory,t.relativePath),z.default.mkdirSync(ye.default.dirname(r),{recursive:!0}),z.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){ja(e.workingDirectory,t.relativePath);return}if(z.default.existsSync(r))for(let n of z.default.readdirSync(r)){let o=ye.default.join(r,n);z.default.statSync(o).mtimeMs>=e.startedMs-1e3&&z.default.rmSync(o,{recursive:!0,force:!0})}}}},eO=e=>{try{if(e.git){if(Vb(e.workingDirectory)!==e.head&&(!(e.head===null?zo(e.workingDirectory,["update-ref","-d","HEAD"]):zo(e.workingDirectory,["reset","--hard",e.head]))||Vb(e.workingDirectory)!==e.head))throw new Error("head");let r=JI(e.workingDirectory);for(let n of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))Jq(e,n)}else{if(e.complete)for(let t of XI(e.workingDirectory).paths)e.files[t]===void 0&&ja(e.workingDirectory,t);for(let t of Object.keys(e.files))QI(e,t)}for(let t of e.caches)Yq(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{z.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Ip,Op,Xq,Zq,Qq,eK,tK,rO,rK,nO,oO=l(()=>{"use strict";T();kp();zb();VI();tO();De();Je();Na();Ip=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),Op=e=>({...e,status:"stopped",errorMessage:bn,judgePhase:void 0,updatedAt:new Date().toISOString()}),Xq=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),Zq=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==x?t:e.improverModel!==x?e.improverModel:null}return e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null},Qq=async e=>{let t=Le(e.cycle),r=BI({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),n=ZI({workingDirectory:t,git:r.git,namedPaths:r.paths}),o=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Ab({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:_a(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):ha({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await Xe({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?GI({workingDirectory:t,before:r,writerReply:i.text}):null,c=eO(n);return i.ok?!c.ok||a===null?{ok:!1,cycle:Ip(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-o,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Op(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Ip(e.cycle,i.errorMessage)})},eK=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:Qq({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),tK=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),rO=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let n=await Xe({writerAgent:e.reviewer,workingDirectory:Le(e.cycle),prompt:nb({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return n.ok?{kind:"suggestion",text:n.text.trim(),tokens:n.tokens}:n.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Op(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},rK=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===x)return t;let n={...t,judgePhase:"scoring"};e.onProgress?.(n);let o=await Xe({writerAgent:t.judgeModel,workingDirectory:Le(t),prompt:rb({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return o.ok?{...Ma(n,o.text,o.tokens),judgePhase:void 0}:o.stopped===!0||e.signal?.aborted===!0?Op(n):(e.onWriterFailure?.(t.judgeModel),Ip(n,o.errorMessage))},nO=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return rK(e);let n=Zq(t),o=await eK({cycle:t,revision:r,runner:n,signal:e.signal,onWriterFailure:e.onWriterFailure});if(o===null)return t;if(!o.ok)return o.cycle;let s=r.run===void 0?Xq(t,o.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===x){let p=await rO({cycle:s,run:o.run,promptText:r.promptText,reviewer:n,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...tK(s,p.text),judgePhase:void 0}}let i=await Xe({writerAgent:t.judgeModel,workingDirectory:Le(t),prompt:QA({goal:t.goal,lookedAt:o.run.lookedAt??"the writer reply",evidence:o.run.evidence??o.run.output,tokens:o.run.tokens,delayMs:o.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Op(s):(e.onWriterFailure?.(t.judgeModel),Ip(s,i.errorMessage));let a=await rO({cycle:s,run:o.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Ma(s,i.text,c);return Cp(d,a.text)}});var Np,Jb=l(()=>{"use strict";T();Np=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t?.judgement?.score,n=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||n.length===0?null:fa({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:n},priorRounds:ya(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null})),e.currentRound)})}});var Mp,nK,oK,Yb,sO=l(()=>{"use strict";T();kp();oO();Jb();De();Je();Na();Mp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),nK=e=>({...e,status:"stopped",errorMessage:bn,updatedAt:new Date().toISOString()}),oK=(e,t,r,n,o)=>t.ok?null:t.stopped===!0||n?.aborted===!0?nK(e):(o?.(r),Mp(e,t.errorMessage)),Yb=async(e,t,r,n)=>{let o=e.revisions.find(c=>c.roundNumber===e.currentRound);if(o===void 0)return Mp(e,"This round has no prompt.");if(e.status==="judging")return nO({cycle:e,revision:o,onWriterFailure:t,signal:r,onProgress:n});if(e.status!=="improving")return Mp(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===x)return e;let s=Np(e);if(s===null)return Mp(e,"The improver needs the score and the reason.");let i=await Xe({writerAgent:e.improverModel,workingDirectory:Le(e),prompt:pa({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=oK(e,i,e.improverModel,r,t);return a!==null?a:Rp(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var Hp,jp,iO,sK,iK,Dp,aO,lO,aK,lK,cO,dO,uO,Xb=l(()=>{"use strict";T();De();Je();Na();sO();Tb();Hp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),jp=(e,t,r)=>e.wizard===void 0||t===null?Hp(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},iO=e=>{let t=e.wizard;return t===void 0||Ta(e).length===0?e:{...e,wizard:No({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},sK=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",iK=e=>{let t=e.wizard;if(t===void 0)return e;let r=Pa({revisions:e.revisions});if(r.rounds.length===0)return e;let n=t.modules[t.currentModuleIndex];return{...e,wizard:No({wizard:t,step:"optimize_modules",output:{moduleId:n?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Dp=(e,t)=>({...e,status:"wizard_paused",errorMessage:e.errorMessage,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),aO=e=>e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null,lO=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let o=r.attempts.filter(s=>s.step===t).at(-1);return o===void 0?"":JSON.stringify(o.output)},aK=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=aO(e);if(o===null)return Hp(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??va(n),i=fb({goal:e.goal,sourcePrompt:s,avoid:n.avoidByStep.generalize,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:lO(e,"generalize")}),a=await Xe({writerAgent:o,prompt:i,workingDirectory:Le(e),signal:t});if(!a.ok)return r?.(o),jp(e,"generalize",a.errorMessage);try{let c=Wb(a.text),d=No({wizard:{...n,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Ra(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return Dp({...e,wizard:d},"generalize")}catch(c){return jp(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},lK=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=aO(e);if(o===null)return Hp(e,"Choose a writer to suggest splits.");let s=Wa({wizard:n,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Sb({goal:e.goal,templatedPrompt:n.templatedPrompt,variables:n.variables,evaluatedPromptReference:s,avoid:n.avoidByStep.separate,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:lO(e,"separate")}),a=await Xe({writerAgent:o,prompt:i,workingDirectory:Le(e),signal:t});if(!a.ok)return r?.(o),jp(e,"separate",a.errorMessage);try{let c=Lb(a.text),d=hb(c,n.variables),p=No({wizard:{...n,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return Dp({...e,wizard:p},"separate")}catch(c){return jp(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},cO=e=>{let t=e.wizard;if(t===void 0)return e;let r=va(t),n=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:70,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:n}},dO=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let n=r.modules[t];if(n===void 0)return Hp(e,"This module is missing.");let o=Pn(r),s=La(n.prompt,o),i=e.runnerModel!==void 0&&e.runnerModel!==x?e.runnerModel:e.judgeModel!==x?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:70,maxRounds:1,errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},uO=async(e,t,r,n)=>{let o=e.wizard;if(o===void 0)return Yb(e,t,r,n);if(o.gate!==null||e.status==="wizard_paused")return e;if(o.phase==="generalize")return aK(e,r,t);if(o.phase==="separate"&&o.splitOptions.length===0)return lK(e,r,t);if(o.phase==="evaluate"||o.phase==="optimize_modules"){let s=await Yb(e,t,r,n);if(k(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Ta(s).length===0)return s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let p=he(s.revisions.map(b=>({roundNumber:b.roundNumber,promptText:b.promptText,score:b.judgement?.score??0,reasons:b.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0,f=Dp({...s,wizard:{...s.wizard,evaluateSelectedRound:p}},i);return i==="evaluate"?iO(f):f}let a=Dp(s,i),c=i==="optimize_modules"&&a.wizard!==void 0?(()=>{let d=Pb({wizard:{...a.wizard,modules:a.wizard.modules.map((p,f)=>f===a.wizard.currentModuleIndex&&p.status==="running"?{...p,status:"paused"}:p)},moduleIndex:a.wizard.currentModuleIndex,revisions:a.revisions,cycleStatus:sK(s.status)});return{...a,wizard:d}})():a;return i==="evaluate"?iO(c):iK(c)}return s}return o.phase==="complete",e}});var Lr,pO,cK,mO=l(()=>{"use strict";T();Je();wn();Hb();Lr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pO=e=>{if(!k(e.status))return"";let t=he(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,n=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",o=ft(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Lr(t.reasons.trim())}</p>`,i=o===null?cK({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Le(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${Lr(o)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${n}${s}${i}</section>`},cK=e=>{let t=e.sourceSkill?.fileName??Ia(e.goal),r=e.sourceSkill?.name??t,n=e.sourceSkill?.description??e.goal,o=Lp(t,r),s=o.length>0&&LI(e.workingDirectory,o),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Lr(o)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Lr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Lr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Lr(n)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Lr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Lr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var gO,fO=l(()=>{"use strict";T();De();wn();gO=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!k(e.status)){let t=e.judgeModel;return{title:`${Ye(t)} is suggesting module splits.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!k(e.status)){let t=e.judgeModel;return{title:`${Ye(t)} is generalizing your prompt.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===x?{title:`Score the prompt text for round ${e.currentRound+1}.`,detail:"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."}:e.judgePhase==="scoring"?{title:`${Ye(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"No folder run in step 2. This panel keeps updating, so the page is not stuck."}:{title:`${Ye(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"Wizard evaluate revises prompt wording before the runner executes in step 4."};if(e.status==="judging"&&e.judgeModel===x){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==x?{title:`${Ye(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"You score the changes after this run."}:{title:`Score the changes from round ${e.currentRound+1}.`,detail:t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt."}}if(e.status==="judging"&&e.judgePhase==="reviewing")return{title:`${Ye(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,detail:"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck."};if(e.status==="judging"&&e.judgePhase==="scoring")return{title:`${Ye(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,detail:"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck."};if(e.status==="judging")return{title:`${Ye(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck."};if(e.status==="improving"&&e.improverModel===x){let t=e.revisions.find(n=>n.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return{title:"Rewrite the prompt.",detail:t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`}}if(e.status==="improving")return{title:`${Ye(e.improverModel)} is rewriting the prompt.`,detail:"That writer is working on this Mac. This panel keeps updating, so the page is not stuck."};if(e.status==="passed")return{title:"This prompt passed.",detail:""};if(e.status==="stopped"){let t=e.revisions.some(o=>ft(o.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let o=je(e.wizard),s=o.totalModules>0&&(e.wizard.phase==="complete"||o.passedModuleCount>0||k(e.status));return{title:s&&o.totalModules>0?`Wizard finished \u2014 ${o.passedModuleCount}/${o.totalModules} modules passed`:"Wizard stopped before all steps finished",detail:r.length>0?r:s?"Use Download report below for a Markdown summary.":"Progress from finished steps is kept."}}return{title:(e.errorMessage??"").startsWith("Finished")?"Finished.":"Stopped.",detail:r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept."}}return k(e.status)?{title:"This run stopped because a reply could not be used.",detail:""}:{title:"Working on this Mac.",detail:"This panel keeps updating."}}});var Ct,Da=l(()=>{"use strict";De();Ct=e=>{if(e.status==="improving"&&e.improverModel===x)return!0;if(e.status!=="judging"||e.judgeModel!==x)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===x}});var hO,yO=l(()=>{"use strict";hO=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Er,dK,SO,AO=l(()=>{"use strict";T();Er=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dK=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Er(r)}</p>`},SO=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Er(e.cycleId)}">`,n=e.instructions?.trim()??"",o=n.length===0?"":`<p class="muted">Instructions</p><p>${Er(n)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Er(a)}.</p>`}<pre class="mono">${Er(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${vr(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Er(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${o}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",f=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Er(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${o}${dK(e.score,e.reasons)}${f}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Er(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Ha,uK,bO,PO=l(()=>{"use strict";T();wn();Ha=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uK=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,n=ft(t.promptText),o=t.judgement?.reasons?`<p class="muted">${Ha(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Ha(i)}.</p>`}<pre class="mono">${Ha(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${vr(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=n===null?`<pre class="mono">${Ha(d)}</pre>`:`<div class="alert-error">${Ha(n)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${o}${a}${p}</article>`},bO=e=>e.revisions.map(t=>uK(e,t)).join("")});var _O,wO=l(()=>{"use strict";T();_O=e=>{if(k(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Fa,pK,mK,gK,vO,WO,Zb=l(()=>{"use strict";wO();Fa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pK=e=>`<form method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Fa(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,mK=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions"><input type="hidden" name="cycleId" value="${Fa(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,gK=e=>{let t=Fa(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Fa(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button>
    </form>
  </div>`},vO=e=>{let t=_O(e);return t==="none"?"":t==="classic"?pK(e.id):t==="wizard_end_only"?mK(e.id):gK(e)},WO=e=>e.wizard===void 0||e.status!=="wizard_paused"?"":`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end"><input type="hidden" name="cycleId" value="${Fa(e.id)}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`});var En,fK,LO,EO=l(()=>{"use strict";T();fp();En=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fK=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=je(t),n=r.terminalStatusSuggestion==="passed"?`${r.passedModuleCount} of ${r.totalModules} modules passed (score \u2265 ${70}).`:`${r.passedModuleCount} of ${r.totalModules} modules passed. Some modules were skipped, stopped, or below ${70}.`,o=r.rows.map(s=>`<tr><td>${En(s.title)}</td><td>${s.bestScore??"\u2014"}</td><td>${s.tokens??"\u2014"}</td><td>${En(s.status)}</td></tr>`).join("");return`<h3>Modules</h3><p class="muted">${En(n)}</p><table class="sdlc-wizard-outcome-table"><thead><tr><th>Module</th><th>Best score</th><th>Tokens</th><th>Status</th></tr></thead><tbody>${o}</tbody></table>`},LO=e=>{let t=e.wizard;if(t===void 0||!k(e.status))return"";let r=fK(e),n=i=>{if(i==="wizard-4"&&t.modules.length>0){let a=je(t);return`${a.passedModuleCount}/${a.totalModules} modules \xB7 pass \u2265 ${70}`}return i==="wizard-1"&&t.templatedPrompt.trim().length>0?"Templated prompt ready":""},o=["wizard-1","wizard-2","wizard-3","wizard-4"].map(i=>{let a=Do(e,i);if(a.trim().length===0)return"";let c=i==="wizard-1"?"Step 1 \u2014 Generalize":i==="wizard-2"?"Step 2 \u2014 Evaluate":i==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",d=n(i);return`<details class="sdlc-wizard-outcome-step"><summary>${d.length===0?En(c):`${En(c)} <span class="muted sdlc-wizard-outcome-step-hint">${En(d)}</span>`}</summary><div class="sdlc-wizard-outcome-step-body">${a}</div></details>`}).join("");return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><h3 class="sdlc-run-panel-title">Wizard result</h3>${`<p class="actions sdlc-wizard-outcome-actions"><a class="btn btn-secondary" href="/prompt-optimizer?cycle=${En(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><button type="button" class="btn btn-secondary" data-sdlc-start-new-run>Run again</button></p>`}${r}${o}</div>`}});var $a,Fp,Qb=l(()=>{"use strict";T();Ap();mO();fO();Da();yO();Jb();AO();PO();Zb();EO();yp();Je();$a=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Fp=e=>{let t=!k(e.status)&&e.status!=="wizard_paused"&&!Ct(e),r=gO(e),n=uI(lb(hO(e)),e),o=k(e.status)?"":vO(e),s=LO(e),i=pO(e),a=e.errorMessage===null?"":`<div class="alert-error">${$a(e.errorMessage)}</div>`,c=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",d=t?" Working for <span data-elapsed>0s</span>.":"",p=r.detail.length===0?"":`<p class="sdlc-run-detail muted">${$a(r.detail)}${d}</p>`,f=e.revisions.find(H=>H.roundNumber===e.currentRound),b=e.status==="improving"?Np(e):null,h=Ho(e),y=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),u=Ct(e)?SO({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:b?.promptText??f?.promptText??"",score:b?.score??f?.judgement?.score??null,reasons:b?.reasons??f?.judgement?.reasons??null,avoid:b?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:y?1:0}):"",S=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules"?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${Sp(e.passScore)}</div>`:"",g=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':k(e.status)?'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",_=!t&&e.wizard!==void 0&&k(e.status)&&(e.wizard.phase==="complete"||je(e.wizard).passedModuleCount>0),w=t?c:_?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',v=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${$a(Rt(Le(e)))}</li>`:"",h>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${hp(h)} so far</li>`:""].filter(H=>H.length>0),E=v.length===0?"":`<ul class="sdlc-run-meta">${v.join("")}</ul>`,R=o.length===0?"":`<div class="sdlc-run-actions">${o}</div>`,C=`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${n}</div>`,I=S.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${C}</div>`:`<div class="sdlc-run-grid">${C}${S}</div>`,D=bO(e),ae=e.wizard!==void 0&&k(e.status)&&e.revisions.every(H=>H.roundNumber===0&&(H.judgement===void 0||H.judgement===null)),q=D.length===0||ae?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${D}</div></section>`;return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${$a(e.updatedAt)}" aria-busy="${t?"true":"false"}"><header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${g}</div><div class="sdlc-run-activity${_?" sdlc-run-activity-success":""}"><div class="sdlc-run-activity-icon">${w}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${$a(r.title)}</h2>${p}</div></div>${E}${R}</header>${a}${I}${u}${s}${i}</section>${q}`}});var RO,Bo,$p=l(()=>{"use strict";T();RO=e=>_n.indexOf(e),Bo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||k(e.status)?_n.length:t.gate!==null?RO(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?RO(t.phase):null}});var kO,CO=l(()=>{"use strict";kO=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Rn,TO,xO=l(()=>{"use strict";T();CO();Rn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),TO=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,n=_a(t,r),o=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Rn(kO(n))}</pre></div>`:"",s=Ea(e.modulePrompt);if(s.length===0)return o.length>0?`<div class="sdlc-wizard-module-params">${o}</div>`:"";let i=Pn(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=up(c),f=i[c]??"",b=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Rn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Rn(p)}">${Rn(b)}</label>
        ${h}
        <input class="input" type="text" id="${Rn(p)}" name="${Rn(p)}" value="${Rn(f)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${o}${a}</div>`}});var Tt,IO,OO=l(()=>{"use strict";T();xO();xb();gp();Zb();Tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IO=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let n=r.gate,o=n==="generalize"?"Step 1 \u2014 Generalize":n==="evaluate"?"Step 2 \u2014 Evaluate":n==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=n==="generalize"?`<ul class="sdlc-wizard-vars">${r.variables.map(_=>`<li><strong>{{${Tt(_.name)}}}</strong> \u2014 ${Tt(_.description)} (sample: ${Tt(_.sampleValue)})</li>`).join("")}</ul><pre class="sdlc-pre">${Tt(r.templatedPrompt)}</pre>`:"",i=n==="evaluate"?jo({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",c=n==="separate"?`${n==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(_=>{let w=_.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',v=_.recommended?' <span class="sdlc-badge">Recommended</span>':"",E=r.selectedSplitOptionId===_.id||r.selectedSplitOptionId===null&&_.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${Tt(_.id)}" required${E}> <strong>${Tt(_.title)}</strong>${w}${v}<br><span class="muted">${Tt(_.summary)}</span></label>${mp(_)}</li>`}).join("")}</ul>`:"",d=r.modules[r.currentModuleIndex],p=d?.title??"Module",f=d?.prompt??"",b=d?.status==="pending",h=n==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Tt(p)}</p>${b?TO({cycle:e,modulePrompt:f}):""}<p class="muted">Test run prompt preview: ${Tt(La(f,Pn(r)))}</p>${d?.statistics===null||d?.statistics===void 0?"":`<p class="muted">Module stats: best ${d.statistics.bestScore??"\u2014"} / ${e.passScore} (round ${d.statistics.bestRound??"\u2014"}).</p>`}${jo({cycle:e,interactive:!1,caption:b?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${p}\u201D (runner + judge).`})}`:"",y=n==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":n==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":n==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":b?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",u=wb(r),A=u===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${u}</p>`,S=t?.active===!0?" sdlc-wizard-gate-active":"",g=t?.active===!0?' id="prompt-optimizer-wizard-active-step"':"";return`<section class="card sdlc-wizard-gate${S}"${g}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${o}</h2>
    <p class="sdlc-wizard-gate-lede">${y}</p>
    ${A}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Tt(e.id)}">
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
    ${WO(e)}
  </section>`}});var hK,NO,MO=l(()=>{"use strict";T();hK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),NO=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||k(e.status))return"";if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>Suggesting module splits</h2>
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let r=t.currentModuleIndex,o=t.modules[r]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    <h2>Module ${r+1} of ${t.modules.length}: ${hK(o)}</h2>
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
  </section>`:""}});var yK,SK,AK,jO,DO=l(()=>{"use strict";T();$p();OO();MO();fp();yK={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},SK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AK=(e,t,r)=>`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${SK(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${Do(e,t)}</div>
</details>`,jO=e=>{let t=e.wizard;if(t===void 0)return"";let r=Bo(e);if(r===null)return"";let n=_n.slice(0,r).map((i,a)=>AK(e,`wizard-${a+1}`,yK[i])),o=t.gate!==null?IO(e,{active:!0}):NO(e),s=r>=_n.length?"":o;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${n.join("")}${s}</div>`}});var zp,eP=l(()=>{"use strict";DO();gp();T();zp=e=>{if(e===null||e.wizard!==void 0&&k(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=jO(e),r=sI(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var tP,HO,FO,Up,$O,Bp=l(()=>{"use strict";T();Ke();tP=new Map,HO=e=>{let t=new AbortController;return tP.set(e,t),t.signal},FO=e=>{tP.delete(e)},Up=e=>{tP.get(e)?.abort()},$O=(e,t)=>{let r=X(e,t);return r===null||r.wizard!==void 0?!1:(k(r.status)||(G(e,{...r,status:"stopped",errorMessage:bn,updatedAt:new Date().toISOString()}),Up(t)),!0)}});var za,Gp,zO,rP,UO,BO,GO,VO,nP=l(()=>{"use strict";za=m(require("node:fs")),Gp=m(require("node:path")),zO=e=>Gp.default.join(Gp.default.dirname(e),"prompt-optimizer-writer-ready.json"),rP=e=>{let t=zO(e);if(!za.default.existsSync(t))return{};try{let r=JSON.parse(za.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},UO=(e,t)=>{za.default.mkdirSync(Gp.default.dirname(e),{recursive:!0}),za.default.writeFileSync(zO(e),`${JSON.stringify(t,null,2)}
`)},BO=(e,t)=>rP(e)[t]?.message??null,GO=(e,t,r)=>{UO(e,{...rP(e),[t]:{message:r}})},VO=(e,t)=>{let r=rP(e);r[t]!==void 0&&UO(e,Object.fromEntries(Object.entries(r).filter(([n])=>n!==t)))}});var oP,Vp,qp,qO,Ie,kn=l(()=>{"use strict";T();Ca();Xb();Da();Bp();nP();Ke();oP=new Set,Vp={atMs:0,ids:[]},qp=async()=>{if(Date.now()-Vp.atMs<3e4)return Vp.ids;let e=await mt({commands:se({})});return Vp.atMs=Date.now(),Vp.ids=e.installedWriterIds,e.installedWriterIds},qO=async(e,t,r)=>{let n=X(e,t);if(n===null||k(n.status)||n.status==="wizard_paused"||Ct(n)||r.aborted)return;let o=await uO(n,i=>{VO(e,i)},r,i=>{X(e,t)?.status==="stopped"||r.aborted||G(e,i)});X(e,t)?.status==="stopped"||r.aborted||(G(e,o),k(o.status)||await qO(e,t,r))},Ie=(e,t)=>{if(oP.has(t))return;let r=X(e,t);if(r===null||k(r.status)||r.status==="wizard_paused"||Ct(r))return;oP.add(t);let n=HO(t);qO(e,t,n).finally(()=>{oP.delete(t),FO(t)})}});var Go,Kp=l(()=>{"use strict";Qb();eP();kn();Go=(e,t)=>(Ie(e,t.id),`${Fp(t)}${zp(t)}`)});var KO,JO,YO=l(()=>{"use strict";KO=(e,t)=>e.revisions.find(n=>n.roundNumber===t)?.judgement?.score??null,JO=e=>e!==null&&e>0});var Jp,XO,sP=l(()=>{"use strict";T();Bp();Jp=e=>(Up(e.id),{...e,status:"stopped",errorMessage:GA,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null,phase:"complete"},updatedAt:new Date().toISOString()}),XO=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;Up(e.id);let r=t.currentModuleIndex,n=t.modules.map((o,s)=>s===r?{...o,status:"stopped"}:o);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:n,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var bK,ZO,PK,QO,eN=l(()=>{"use strict";T();Xb();Kp();Ke();kn();YO();sP();bK="Pick a revision scored above 0 before continuing to Separate.",ZO=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),PK=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null})),QO=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",n=t.get("intent")??"";if(!n.startsWith("wizard-"))return!1;let o=t.get("cycleId")?.trim()??"",s=X(e.storePath,o);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=X(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Go(e.storePath,d))};if(n==="wizard-stop-all"){let c=Jp(s);return G(e.storePath,c),a(o),!0}if(n==="wizard-skip-module"){let c=XO(s);return G(e.storePath,c),a(o),!0}if(n==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(o),!0;let p=t.get("wizardStepInstructions")?.trim()??"",f=pb(s.wizard,d,c);f=mb(f,d),f={...f,pendingStepInstructions:p};let b={...s,status:"judging",wizard:{...f,gate:null},updatedAt:new Date().toISOString()};return G(e.storePath,b),Ie(e.storePath,o),a(o),!0}if(n==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(o),!0;if(c==="generalize"){let p=(s.errorMessage?.trim().length??0)>0?ZO(s):cO({...s,wizard:{...s.wizard,gate:null}});return G(e.storePath,p),Ie(e.storePath,o),a(o),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),f=KO(s,p??-1);if(!JO(f)){let y={...s,errorMessage:bK,updatedAt:new Date().toISOString()};return G(e.storePath,y),a(o),!0}let b={...s.wizard,evaluateSelectedRound:p},h={...s,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...b,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()};return G(e.storePath,h),Ie(e.storePath,o),a(o),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0){let y=ZO(s);return G(e.storePath,y),Ie(e.storePath,o),a(o),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",f=s.wizard.splitOptions.find(y=>y.id===p);if(f===void 0){let y={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return G(e.storePath,y),a(o),!0}let b=PK(f),h={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...s.wizard,gate:"optimize_modules",selectedSplitOptionId:p,selectedSplitTopology:f.topology,modules:b,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(s.wizard.parameterValues??{}).length>0?s.wizard.parameterValues??{}:Ra(s.wizard.variables)},updatedAt:new Date().toISOString()};return G(e.storePath,h),a(o),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(o),!0;let f=kb({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!f.ok){let u={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return G(e.storePath,u),a(o),!0}let b={...s.wizard,parameterValues:f.parameterValues};if(p.status==="pending"){let u=dO({...s,wizard:{...b,gate:null}},d);return G(e.storePath,u),Ie(e.storePath,o),a(o),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=je(b),A={...s,status:u.terminalStatusSuggestion,wizard:{...b,gate:null,phase:"complete"},updatedAt:new Date().toISOString()};return G(e.storePath,A),a(o),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...b,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return G(e.storePath,y),a(o),!0}}return a(o),!0}});var _K,tN,wK,iP,vK,rN,nN=l(()=>{"use strict";De();Bp();sP();zb();kp();Da();Ke();_K="Add a score from 0 to 100 and the reason for it.",tN="Add a score from 1 to 100 and the reason for it.",wK="Write the next prompt.",iP="This step is not waiting for you.",vK=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},rN=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=X(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(G(e.storePath,Jp(a)),{kind:"saved",cycleId:i}):$O(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",n=X(e.storePath,r);if(n===null||!Ct(n))return n===null?{kind:"missing"}:{kind:"invalid",cycle:n,errorMessage:iP};if(t==="manual-judge"){if(n.judgeModel!==x)return{kind:"invalid",cycle:n,errorMessage:iP};let i=vK(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=n.wizard!==void 0&&(n.wizard.phase==="evaluate"||n.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:n,errorMessage:c?tN:_K};if(c&&i===0)return{kind:"invalid",cycle:n,errorMessage:tN};let d=n.revisions.find(f=>f.roundNumber===n.currentRound)?.run?.tokenReview??"",p=Cp(Ma(n,JSON.stringify({score:i,passed:i>=n.passScore,reasons:a})),d);return G(e.storePath,p),{kind:"saved",cycleId:n.id}}if(n.improverModel!==x)return{kind:"invalid",cycle:n,errorMessage:iP};let o=(e.posted.get("prompt")??"").trim();if(o.length===0)return{kind:"invalid",cycle:n,errorMessage:wK};let s=Rp(n,o);return G(e.storePath,s),{kind:"saved",cycleId:n.id}}});var oN,sN=l(()=>{"use strict";oN=`<script>
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
</script>`});var iN,aN=l(()=>{"use strict";iN=`<script>
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
  document.querySelectorAll("[data-sdlc-start-new-run]").forEach((btn) => {
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
</script>`});var pN,mN=l(()=>{"use strict";T();Je();pN=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),n=t.wizard?.templatedPrompt.trim()??"",o=n.length>0?n:r?.promptText??e.prompt;return{goal:t.goal,prompt:o,folder:t.workingDirectory===void 0?e.folder:Rt(t.workingDirectory),passScore:String(t.passScore),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!k(t.status)}}});var gN,fN=l(()=>{"use strict";T();$p();gN=e=>{if(e.wizard===void 0)return k(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=Bo(e);return e.status==="wizard_paused"&&t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`}:k(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var Yp,aP=l(()=>{"use strict";Yp=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",n=r.length>0?r:"Untitled run";return n.length<=72?n:`${n.slice(0,71).trimEnd()}\u2026`}});var Rr,WK,LK,hN,yN=l(()=>{"use strict";fN();aP();Rr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WK=e=>e.wizard===void 0?"classic":"wizard",LK=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Rr(t)}">`,n=gN(e);return`<li data-sdlc-history-kind="${WK(e)}"><div class="sdlc-history-row-main"><span class="${Rr(n.badgeClass)}">${Rr(n.badgeLabel)}</span><div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Rr(e.id)}">${Rr(Yp(e.goal))}</a><p class="muted">${Rr(n.subtitle)}</p></div></div><form method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Rr(e.id)}">${r}<button class="btn btn-secondary" type="submit">Delete</button></form></li>`},hN=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>LK(a,t)).join(""),n=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="classic" aria-pressed="false">Classic</button>
  </div>`,o=Math.min(e.length,20),s=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${n}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history"><summary class="sdlc-history-details-summary"><span class="eyebrow">Past runs</span> ${Rr(s)}</summary>${i}</details>`:i}});var lP,Xp,SN,EK,RK,cP,AN,dP=l(()=>{"use strict";lP=m(require("node:fs")),Xp=m(require("node:path"));Je();SN=/^[a-z0-9-]+$/,EK=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},RK=(e,t)=>{if(!SN.test(t))return null;let r=e.replace(/^\uFEFF/,""),n=t,o="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let f=EK(p[2]??"");p[1]==="name"&&f.length>0&&(n=f),p[1]==="description"&&(o=f)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:n,description:o,promptText:i}},cP=e=>{let t=Wn(e);if(!t.ok)return[];let r=Xp.default.resolve(t.path,".cursor","skills"),n=[];try{n=lP.default.readdirSync(r)}catch{return[]}return n.filter(o=>SN.test(o)).flatMap(o=>{let s=Xp.default.resolve(r,o,"SKILL.md");if(!s.startsWith(`${r}${Xp.default.sep}`))return[];try{let i=RK(lP.default.readFileSync(s,"utf8"),o);return i===null?[]:[i]}catch{return[]}}).toSorted((o,s)=>o.fileName.localeCompare(s.fileName))},AN=(e,t)=>cP(e).find(r=>r.fileName===t)??null});var bN,Zp,uP=l(()=>{"use strict";T();bN=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,2}$/.test(t)||r<1||r>30?{ok:!1,errorMessage:`Round limit must be a whole number from 1 to ${30}.`}:{ok:!0,maxRounds:r}},Zp=e=>e?.trim()||String(10)});var PN,_N=l(()=>{"use strict";PN={goal:{title:"Goal",practice:"Write the outcome a reader can check. Name who it is for and what must stay true.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Pass score",practice:"The run passes at this score. 90 is the usual bar. Lower it when a useful prompt is enough.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var Ua,kK,CK,Se,Cn=l(()=>{"use strict";_N();Ua=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kK='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>',CK=e=>{let t=PN[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Ua(t.title)}" aria-describedby="${r}" aria-expanded="false">${kK}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Ua(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Ua(t.example)}</span></span></button>`},Se=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Ua(r)}"`}>${Ua(e)}</span>${CK(t)}</span>`});var wN,vN=l(()=>{"use strict";T();uP();Cn();wN=e=>{let t=Zp(e);return`<div class="field">${Se("Round limit","roundLimit")}<input class="input" type="number" name="maxRounds" min="1" max="${30}" step="1" value="${t}"><span class="muted">Stops after this many scored rounds. The usual limit is 10. The run also stops when the score has not risen for 3 rounds.</span></div>`}});var TK,xK,IK,WN,LN=l(()=>{"use strict";T();Cn();TK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xK=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=1&&t<=100?t:90},IK=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,WN=e=>{let t=xK(e),r=Math.floor(t/2),n=Math.max(r+1,t-20),o=Sa(t).map(i=>i.label).join(" \xB7 "),s=`--sdlc-weak:${r}%;--sdlc-close:${n}%;--sdlc-pass:${t}%`;return`<div class="field sdlc-pass"><div class="sdlc-pass-head">${Se("Pass score","passScore","sdlc-pass-label")}<output class="sdlc-pass-value" data-sdlc-pass-value for="sdlc-pass">${t}</output></div><div class="sdlc-pass-scale" style="${s}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="sdlc-pass" class="sdlc-pass-range" type="range" name="passScore" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="sdlc-pass-label"><span class="sdlc-pass-mark" style="left:${IK(90)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${90}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${TK(o)}</p><p class="muted">The bar fades from a weak score to a pass. The mark is the usual ${90}.</p></div>`}});var EN,OK,RN,kN,CN=l(()=>{"use strict";Cn();EN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OK=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),RN=e=>{if(e.length===0)return`<div class="field">${Se("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${EN(r.fileName)}">${EN(r.fileName)}</option>`).join("");return`<div class="field">${Se("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${OK(e)}</script>`},kN=`<script>
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
</script>`});var Ba,NK,TN,xN=l(()=>{"use strict";aP();$p();Ba=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),NK=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",TN=e=>{let t=e.wizard;if(t===void 0||t.gate===null)return"";let r=Yp(e.goal),n=NK(t.gate),o=Bo(e),s=o===null||o>=4?"":` (step ${o+1} of 4)`,i=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ba(r)}</h2>
    <p class="lede">Paused at <strong>${Ba(n)}</strong>${Ba(s)} (last updated ${Ba(i)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ba(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Ga,IN,ON=l(()=>{"use strict";Cn();Ga=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IN=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(o=>`<option value="${Ga(o.id)}"${o.id===e.runner?" selected":""}>${Ga(o.label)}</option>`).join(""),n=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Ga(e.runner)}">Checking ${Ga(e.writers.find(o=>o.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Se("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${n}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Se("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Ga(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var NN,MN=l(()=>{"use strict";NN=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard</th><th>Classic loop</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td><td>Every round</td></tr><tr><td>Improver</td><td>\u2014</td><td>Rewrites after each score</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td><td>\u2014</td></tr></tbody></table>'});var Vo,jN,DN,HN,FN,$N=l(()=>{"use strict";Cn();Vo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jN=(e,t,r,n,o)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=n.map(c=>`<option value="${Vo(c.id)}"${c.id===r?" selected":""}>${Vo(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Vo(o)}</option>`;return`<div class="field">${Se(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},DN=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let n=r.find(o=>o.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Vo(t)}">Checking ${Vo(n)}\u2026</p>`},HN=(e,t,r,n,o)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Se(t,o)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Vo(r)}</textarea><span class="muted">${n}</span></div></details>`,FN=e=>{let t=`<div class="sdlc-writer">${jN("judge","Judge",e.judge,e.writers,"I'll score it")}${DN("judge",e.judge,e.writers)}${HN("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${jN("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${DN("improver",e.improver,e.writers)}${HN("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var qo,zN,UN=l(()=>{"use strict";Da();Qb();sN();aN();Ap();cN();uN();mN();yN();dP();vN();LN();CN();Cn();eP();xN();ON();MN();$N();T();qo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zN=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${qo(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${qo(e.skillNotice??"")}</div>`,n=`${pI}${mI}`,o=e.resumableWizardCycle??null,s=o===null?"":TN(o),i=zp(e.cycle),a=e.cycle===null?"":Fp(e.cycle),c=e.cycle!==null&&Ct(e.cycle),d=pN(e),p=c?"Waiting for you":d.running?"Running\u2026":"Run",f=FN({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),b=IN({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Classic loop skips the wizard. Instructions are optional.",y=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",u=e.cycle!==null||d.running?"":" open",A=e.cycle!==null&&k(e.cycle.status),w=`<section class="card sdlc-compose${A?" sdlc-compose-viewing-finished":""}" id="prompt-optimizer-compose">
      <div class="sdlc-form-head">
        <div class="sdlc-compose-mode" role="group" aria-label="Run mode">
        <button type="button" class="btn btn-secondary" data-sdlc-compose-mode="wizard" aria-pressed="true">Wizard</button>
        <button type="button" class="btn btn-secondary" data-sdlc-compose-mode="classic" aria-pressed="false">Classic loop</button>
      </div>
        ${A?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run>Start new run</button>':`<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>
        <a class="btn btn-secondary" href="/prompt-optimizer?example=wizard-verification">Load wizard verification example</a>`}
      </div>
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${u}>
        <summary class="sdlc-compose-summary"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</summary>
      <p class="lede">${h} ${qo(e.modelNote)}</p>
      <form class="sdlc-form" method="POST" action="/prompt-optimizer">
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${y}
        <div class="sdlc-block">
          <p class="sdlc-block-title">Prompt and goal</p>
          <div class="field">
            ${Se("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${qo(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Se("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${qo(d.prompt)}</textarea>
          </div>
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Folder</p>
          <div class="sdlc-folder">
          <div class="field">
            ${Se("Folder","folder")}
            <input class="input" type="text" name="folder" value="${qo(d.folder)}" onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${RN(cP(d.folder))}
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Judge and improver</p>
          ${f}
        </div>
        ${b}
        <div data-sdlc-wizard-only>${NN()}</div>
        <details class="sdlc-classic-loop-options">
          <summary class="sdlc-block-title">Classic loop options</summary>
          <div class="sdlc-limits">
            ${WN(d.passScore)}
            ${wN(d.maxRounds)}
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
    </section>`,v=`${""}${oN}${iN}${dN}${kN}${lN}`;return`${t}${r}${w}${s}${a}${i}${n}${hN(e.history,e.cycle?.id??null)}${v}`}});var Va,pP=l(()=>{"use strict";UN();Va=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:zN(t)}))}});var BN,GN=l(()=>{"use strict";nN();pP();Ke();kn();BN=async(e,t,r)=>{let n=t===null?{kind:"ignored"}:rN({posted:t,storePath:e.storePath});return n.kind==="ignored"?!1:n.kind==="saved"?(Ie(e.storePath,n.cycleId),e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(n.cycleId)}`}),e.response.end(),!0):n.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Va(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:n.cycle.judgeModel,improver:n.cycle.improverModel,folder:"~",passScore:String(n.cycle.passScore),maxRounds:String(n.cycle.maxRounds),canRun:r.canRun,errorMessage:n.errorMessage,skillNotice:null,cycle:n.cycle,history:Et(e.storePath),resumableWizardCycle:null}),!0)}});var VN,Qp,mP=l(()=>{"use strict";VN=m(require("node:os"));T();Qp=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??VN.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??90,maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var qN,KN=l(()=>{"use strict";qN=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var JN,YN,XN,ZN=l(()=>{"use strict";JN="wizard-verification",YN="Produce a reusable skill template that teaches how to verify Prompt SDLC wizard steps 1\u20134 on Agent Witch Live (bundle 172+): generalize with {{variables}}, evaluate scored revisions (no score 0 continue), separate into module chunks, optimize each module with runner+judge round logs visible at step 4.",XN=`You help users test the prompt optimizer wizard on Agent Witch Live.
Explain the four steps when asked. Sometimes skip evaluate or separate.
Mention round scores at step 4 only if you remember.
Use placeholders like {{thing}} without defining them.
Do not describe install bundle self-update or production bundle version checks.`});var QN,Ko,gP,eM,tM,qa=l(()=>{"use strict";T();De();Nb();ZN();QN=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Ko=e=>{let t=xI(e),r=Ln(e).map(o=>({id:o,label:Ep[o]}));return{note:r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(o=>o.label).join(", ")}.`,canRun:!0,models:t,writers:r,judge:"",improver:"",runner:""}},gP=(e,t,r)=>t===x||t!==null&&e.writers.some(n=>n.id===t)?t:r,eM=(e,t,r,n=null)=>({judge:gP(e,t,e.judge),improver:gP(e,r,e.improver),runner:gP(e,n,e.runner)}),tM=e=>e===JN?{goal:YN,prompt:XN}:e===bp?{goal:Pp,prompt:_p}:{goal:"",prompt:""}});var em,fP=l(()=>{"use strict";T();De();uP();KN();Je();qa();em=e=>{let t=eM(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=e.posted?.get("passScore")??String(90),n=Zp(e.posted?.get("maxRounds")??null),o=e.posted?.get("judgeInstructions")?.trim()??"",s=e.posted?.get("improverInstructions")?.trim()??"",i=e.posted?.get("runnerInstructions")?.trim()??"",a=e.posted?.get("runner")??null,c=(S,g)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:S,passScore:r,maxRounds:n,errorMessage:g,judge:t.judge,improver:t.improver,judgeInstructions:o,improverInstructions:s,runner:t.runner,runnerInstructions:i});if(e.posted===null)return c(e.defaultFolder??vn,null);let d=e.posted.get("folder")??vn;if(e.posted.get("intent")==="choose-folder"){let S=e.pickFolder();return c(S===null?d:Rt(S),null)}let p=e.posted.get("intent")??"";if(p!=="run"&&p!=="run-classic")return c(d,null);let f=QN(e.goal,e.prompt);if(f!==null)return c(d,f);let b=II(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(b===null)return c(d,"Choose a judge and an improver.");let h=Wn(d);if(!h.ok)return c(d,h.errorMessage);let y=p!=="run-classic",u=y?{ok:!0,passScore:70}:qN(r);if(!u.ok)return c(d,u.errorMessage);let A=y?{ok:!0,maxRounds:5}:bN(n);if(!A.ok)return c(d,A.errorMessage);if(y){let S=OI(e.installedIds,a,b.judge);return S===null?c(d,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:h.path,passScore:u.passScore,maxRounds:A.maxRounds,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:o,improverInstructions:s,useWizard:!0,runner:S,runnerInstructions:i}}return{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:h.path,passScore:u.passScore,maxRounds:A.maxRounds,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:o,improverInstructions:s,useWizard:!1}}});var Jo,rm,jK,hP,rM,tm,nM,DK,oM,yP,HK,FK,$K,SP,sM,iM,aM=l(()=>{"use strict";Jo=m(require("node:fs")),rm=m(require("node:path"));De();Je();jK=["remember","choose-folder","run","run-classic"],hP=()=>({folder:vn,judge:"",improver:"",runner:""}),rM=e=>rm.default.join(rm.default.dirname(e),"prompt-optimizer-preferences.json"),tm=e=>typeof e=="string"?e:"",nM=e=>{let t=rM(e);if(!Jo.default.existsSync(t))return hP();try{let r=JSON.parse(Jo.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return hP();let n=r,o=tm(n.folder).trim();return{folder:o.length===0?vn:o,judge:tm(n.judge),improver:tm(n.improver),runner:tm(n.runner)}}catch{return hP()}},DK=(e,t)=>{let r=rM(e);Jo.default.mkdirSync(rm.default.dirname(e),{recursive:!0});let n=`${r}.tmp`;Jo.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`),Jo.default.renameSync(n,r)},oM=(e,t)=>e===x||Ln(t).some(r=>r===e),yP=(e,t,r)=>e===null?t:e.length===0?"":oM(e,r)?e:t,HK=(e,t)=>{if(e===null)return t;let r=Wn(e);return r.ok?r.display:t},FK=e=>{let t=nM(e.storePath),r={folder:HK(e.folder,t.folder),judge:yP(e.judge,t.judge,e.installedIds),improver:yP(e.improver,t.improver,e.installedIds),runner:yP(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||DK(e.storePath,r)},$K=e=>{let t=Wn(e);return t.ok?t.display:vn},SP=(e,t)=>oM(e,t)?e:"",sM=e=>{let t=nM(e.storePath);return{selection:{...e.selection,judge:SP(t.judge,e.installedIds),improver:SP(t.improver,e.installedIds),runner:SP(t.runner,e.installedIds)},defaultFolder:$K(t.folder)}},iM=e=>{let t=e.posted.get("intent")??"";if(!jK.includes(t))return;let r=e.posted.get("folder");FK({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var lM,zK,UK,AP,BK,nm,om=l(()=>{"use strict";lM=m(require("node:os"));De();nP();Na();zK="Reply with the single word ok. Do not use tools.",UK=45e3,AP=async(e,t)=>{if(t===x)return{ok:!0,message:"You will do this step."};let r=BO(e,t);if(r!==null)return{ok:!0,message:r};let n=await Xe({writerAgent:t,prompt:zK,workingDirectory:lM.default.tmpdir(),timeoutMs:UK});if(!n.ok)return{ok:!1,message:n.errorMessage};let o=`${Ye(t)} is ready.`;return GO(e,t,o),{ok:!0,message:o}},BK=e=>[...new Set(e.filter(t=>t.length>0))],nm=async(e,t,r,n)=>{for(let o of BK([t,r,n??""])){let s=await AP(e,o);if(!s.ok)return s.message}return null}});var bP,cM=l(()=>{"use strict";bP=(e,t)=>{for(let r of e)if(!(r.wizard===void 0||r.status!=="wizard_paused")&&!(t!==null&&r.id===t))return r;return null}});var dM,uM=l(()=>{"use strict";ut();T();Kp();mP();fP();pP();Ke();Je();aM();dP();om();cM();kn();dM=async e=>{let t=e.posted===null?sM({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=em({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Pr("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(iM({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Rt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let n=r.kind==="start"?await nm(e.route.storePath,r.judge,r.improver,r.useWizard?r.runner:void 0):null;if(r.kind==="start"&&n!==null){await Va(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Rt(r.workingDirectory),passScore:String(r.passScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:n,skillNotice:e.skillNotice,cycle:null,history:Et(e.route.storePath),resumableWizardCycle:bP(Et(e.route.storePath),null)});return}if(r.kind==="start"){let s=AN(r.workingDirectory,r.sourceSkillFile),i=Qp({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,...r.useWizard?{wizard:{...db(r.prompt),runnerInstructions:r.runnerInstructions},runnerModel:r.runner}:{},...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(G(e.route.storePath,i),Ie(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"&&r.useWizard){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(Go(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let o=e.cycleId===null?null:X(e.route.storePath,e.cycleId);o!==null&&Ie(e.route.storePath,o.id),await Va(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:o,history:Et(e.route.storePath),resumableWizardCycle:bP(Et(e.route.storePath),o?.id??null)})}});var pM,mM=l(()=>{"use strict";Ke();pM=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";_I(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var gM,fM=l(()=>{"use strict";CI();eN();GN();uM();mM();qa();kn();gM=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await qp(),n=Ko(r),o=e.method==="POST"?new URLSearchParams(await e.readBody(e.request)):null;if(QO({posted:o,storePath:e.storePath,response:e.response})||await BN(e,o,n))return;let s=tM(t.searchParams.get("example")),i=pM({posted:o,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=kI({posted:o,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await dM({route:e,posted:o,installedIds:r,selection:n,goal:o?.get("goal")??s.goal,prompt:o?.get("prompt")??s.prompt,skillNotice:RI(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var GK,hM,yM=l(()=>{"use strict";T();Ke();GK=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",hM=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let n=X(e.storePath,r);if(n===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(n.wizard===void 0||!k(n.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let o=_b({goal:n.goal,cycleStatus:n.status,wizard:n.wizard}),s=`prompt-optimizer-wizard-${GK(n.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(o),!0}});var SM,AM=l(()=>{"use strict";Kp();Ke();SM=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),n=r===null?null:X(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(n===null?"":Go(e.storePath,n)),!0}});var VK,bM,PM=l(()=>{"use strict";De();om();VK=["claude-cli","codex","cursor","antigravity"],bM=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let n=t===x||VK.includes(t)?await AP(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(n)),!0}});var _M,wM=l(()=>{"use strict";T();_M=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Aa,page:ba,context:Oo,installedWriters:e,post:{method:"POST",url:Aa,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${Aa}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var PP,vM=l(()=>{"use strict";T();yp();PP=e=>{let t=e.revisions[e.revisions.length-1]??null,r=he(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null}))),n=k(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:n,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:Ho(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:Oo,page:`${ba}?cycle=${encodeURIComponent(e.id)}`}}});var Ee,qK,WM,LM,EM=l(()=>{"use strict";Ee=m(vs());T();qK=(0,Ee.isType)({goal:Ee.isString,prompt:Ee.isString,workingDirectory:Ee.isString,judge:(0,Ee.isUndefinedOr)(Ee.isString),improver:(0,Ee.isUndefinedOr)(Ee.isString),passScore:(0,Ee.isUndefinedOr)(Ee.isNumber),maxRounds:(0,Ee.isUndefinedOr)(Ee.isNumber)}),WM=e=>{let t=e?.trim()??"";return t.length===0?null:t},LM=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return qK(t)?t.workingDirectory.trim().length===0?{ok:!1,error:lp}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:WM(t.judge),improver:WM(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:lp}}});var KK,RM,kM=l(()=>{"use strict";T();De();fP();qa();KK=e=>e.map(t=>t.id).join(", "),RM=e=>{let t=Ko(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,n=e.body.judge??r,o=e.body.improver??r;if(n===x||o===x)return{ok:!1,error:cb,installedWriters:t.writers};if(n===null||o===null){let a=KK(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run-classic",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,passScore:e.body.passScore??String(90),maxRounds:e.body.maxRounds??String(10),judge:n,improver:o}),i=em({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var CM,TM=l(()=>{"use strict";mP();wM();vM();qa();EM();kM();Ke();CM=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=X(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:PP(c)}}let r=await e.handlers.readInstalledIds(),n=Ko(r);if(e.method==="GET")return{status:200,body:_M(n.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let o=LM(e.rawBody);if(!o.ok)return{status:400,body:{ok:!1,error:o.error,installedWriters:n.writers}};let s=RM({body:o.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:n.writers}};let a=Qp({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds});return G(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:PP(a)}}});var xM,IM=l(()=>{"use strict";kn();om();TM();xM=async e=>{let t=await CM({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:qp,readWritersReady:nm,startCycle:Ie}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var JK,_P,OM=l(()=>{"use strict";hI();fM();yM();AM();PM();IM();JK=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},_P=async e=>{let t=JK(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await xM(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:fI()})),!0):(await bM({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||hM({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||SM({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await gM(e),!0)}});var NM=l(()=>{"use strict";OM()});var Tn,Ka,YK,XK,ZK,QK,MM,jM=l(()=>{"use strict";Tn=m(require("node:fs")),Ka=m(require("node:path")),YK="prompt-optimizer-cycles.json",XK="prompt-optimizer-preferences.json",ZK="prompt-sdlc-cycles.json",QK="prompt-sdlc-preferences.json",MM=e=>{let t=Ka.default.join(e,YK),r=Ka.default.join(e,ZK);if(Tn.default.existsSync(t)||!Tn.default.existsSync(r))return t;try{Tn.default.renameSync(r,t)}catch{return r}let n=Ka.default.join(e,QK),o=Ka.default.join(e,XK);if(Tn.default.existsSync(n)&&!Tn.default.existsSync(o))try{Tn.default.renameSync(n,o)}catch{}return t}});var Yo,e8,wP,DM=l(()=>{"use strict";Yo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e8=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],wP=e=>{let t=e8.map(i=>`<option value="${Yo(i.value)}">${Yo(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Yo(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Yo(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Yo(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Yo(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Ja,$M,t8,zM,r8,n8,UM,im,HM,FM,o8,s8,Jt,Ya,sm,i8,am,vP,a8,WP,BM,LP,GM,l8,c8,d8,VM,qM,KM,Xa=l(()=>{"use strict";Ja=m(require("node:fs")),$M=m(require("node:path")),t8="estimate-history.ndjson",zM=100,r8=500,n8=2e4,UM=e=>$M.default.join(e,t8),im=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,r8),HM=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,n8),FM=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,o8=e=>({...e,estimateTokens:FM(e.estimateTokens),actualTokens:FM(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),s8=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Jt=e=>{let t=UM(e);return Ja.default.existsSync(t)?Ja.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let n=r.trim();if(n.length===0)return[];try{let o=JSON.parse(n);return s8(o)?[o8(o)]:[]}catch{return[]}}):[]},Ya=(e,t)=>{Ja.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(n=>JSON.stringify(n)).join(`
`)}
`;Ja.default.writeFileSync(UM(e),r,"utf8")},sm=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),i8=e=>{let t=e.filter(n=>n.actualSeconds!==null&&n.estimateSeconds!==null&&n.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(n=>`| ${sm(n.task)} | ${sm(n.writerLabel)} | ${n.estimateSeconds} | ${n.actualSeconds} |`)].join(`
`)},am=e=>{let t=Jt(e.reportsDir),r=im(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:n?.actualSeconds??null,estimateTokens:n?.estimateTokens??null,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ya(e.reportsDir,[...s,o])},vP=e=>{let t=Jt(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),n=new Date().toISOString(),o=e.task!==void 0?im(e.task):"",s={id:e.agentRunId,task:o.length>0?o:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:n,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Ya(e.reportsDir,[...i,s])},a8=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-zM),WP=e=>[...Jt(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),BM=e=>{let t=Jt(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),n=HM(e.input),o=HM(e.output),s=im(n),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:n.length>0?n:r?.input??"",output:o.length>0?o:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Ya(e.reportsDir,[...c,a])},LP=(e,t)=>{let r=Jt(e).find(n=>n.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},GM=e=>({table:i8(a8(Jt(e))),embedding:null}),l8=e=>{let t=new Map;for(let n of e){if(n.actualTokens===null)continue;let o=n.writerLabel.trim()||"Writer",s=t.get(o)??[];s.push(n.actualTokens),t.set(o,s)}let r=new Set;for(let[n,o]of t){let s=[...o].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${n}:${i}`)}return e.filter(n=>{let o=n.writerLabel.trim()||"Writer";return!r.has(`${o}:${n.actualTokens}`)})},c8=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-zM),d8=e=>{let t=l8(c8(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let n=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",n.join(". ")+(n.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${sm(s.task)} | ${sm(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},VM=e=>{let t=Jt(e.reportsDir),r=im(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:n?.writerLabel??"",estimateSeconds:n?.estimateSeconds??null,actualSeconds:n?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ya(e.reportsDir,[...s,o])},qM=e=>{let t=Jt(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),n=new Date().toISOString(),o={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:r?.completedAt??n,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ya(e.reportsDir,[...s,o])},KM=e=>d8(Jt(e))});var JM=l(()=>{"use strict";Xa()});var Yt,EP,u8,RP,p8,m8,lm,cm,g8,kP,YM=l(()=>{"use strict";JM();Yt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),EP=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let n=Math.floor(t/60),o=t%60;return o===0?`${n} hr`:`${n} hr ${o} min`},u8=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${EP(-r)} under`:`${EP(r)} over`},RP=e=>e.toLocaleString("en-US"),p8=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${RP(-r)} under`:`${RP(r)} over`},m8=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},lm=e=>e===null?"\u2014":EP(e),cm=e=>e===null?"\u2014":RP(e),g8=`(function () {
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
})();`,kP=e=>{let r=WP(e.reportsDir).map((o,s)=>{let i=o.input.trim().length>0?o.input:o.task,a=o.output.trim().length>0?o.output:"\u2014",c=o.writerLabel.trim().length>0?o.writerLabel:"Writer",d=o.estimateSeconds===null||o.actualSeconds===null?"no estimate":u8(o.estimateSeconds,o.actualSeconds),p=o.estimateTokens===null||o.actualTokens===null?"no estimate":p8(o.estimateTokens,o.actualTokens),f=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${f}">
        <td><button type="button" class="history-open">${Yt(m8(i))}</button></td>
        <td>${Yt(c)}</td>
        <td>${lm(o.estimateSeconds)}</td>
        <td>${lm(o.actualSeconds)}</td>
        <td>${Yt(d)}</td>
        <td>${cm(o.estimateTokens)}</td>
        <td>${cm(o.actualTokens)}</td>
        <td>${Yt(p)}</td>
      </tr>`,template:`<template id="${f}">
        <p class="eyebrow">${Yt(c)}</p>
        <h2>Input</h2>
        <pre>${Yt(i)}</pre>
        <h2>Output</h2>
        <pre>${Yt(a)}</pre>
        <p>Time: estimated ${lm(o.estimateSeconds)} \xB7 actual ${lm(o.actualSeconds)} \xB7 ${Yt(d)}</p>
        <p>Tokens: estimated ${cm(o.estimateTokens)} \xB7 actual ${cm(o.actualTokens)} \xB7 ${Yt(p)}</p>
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
        <script>${g8}</script>`}
    </section>`}});var XM=l(()=>{"use strict";DM();YM()});var Xo,f8,h8,CP,ZM=l(()=>{"use strict";Xo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),f8=(e,t,r)=>{let n=Xo(t),o=Xo(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${n}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${o}</pre>
</article>`},h8=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Xo(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((n,o)=>f8(o,n.userPrompt,n.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Xo(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Xo(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Xo(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},CP=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(h8).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var QM=l(()=>{"use strict";ZM()});var Za,ej,tj,TP,xP,IP,rj=l(()=>{"use strict";Za=m(require("node:fs")),ej=m(require("node:path"));ia();qu();tj=(e,t,r)=>Co({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,TP=(e,t,r)=>{let n=tj(e,t,r);if(n===null)return[];if(!Za.default.existsSync(n))return[];let o=Za.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},xP=e=>{let t=tj(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Kt(e.entry.prompt),output:Kt(e.entry.output)};Za.default.mkdirSync(ej.default.dirname(t),{recursive:!0}),Za.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},IP=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var y8,S8,Qa,dm,OP=l(()=>{"use strict";y8=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),S8=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Qa=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let n=[],o=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=y8(i.assistantOutput),d=c.length>0?`Assistant: ${S8(c,t)}`:null,p=[a,d].filter(f=>f!==null).join(`

`);if(p.length!==0){if(o+p.length>r&&n.length>0)break;n.unshift(p),o+=p.length}}return n.join(`

`)},dm=e=>{let t=e.userMessage.trim(),r=Qa({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var xt,el,jP,A8,b8,NP,P8,DP,um,nj,oj,_8,Zo,HP,MP,sj,w8,ij,Qo,pm,tl,v8,rl,FP,mm,gm,aj=l(()=>{"use strict";xt=m(require("node:fs")),el=m(require("node:path")),jP=require("node:crypto");OP();A8="writer-sessions",b8="active-index.json",NP=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),P8=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",DP=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},um=e=>{let t=el.default.join(e.installDir,A8);return xt.default.mkdirSync(t,{recursive:!0}),t},nj=e=>el.default.join(um(e),b8),oj=(e,t)=>el.default.join(um(e),`${t}.canonical.json`),_8=(e,t)=>el.default.join(um(e),`${t}.continuation.json`),Zo=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,HP=e=>{let t=nj(e);if(!xt.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(xt.default.readFileSync(t,"utf8"));if(!NP(r)||!Array.isArray(r.entries))return{entries:[]};let n=[];for(let o of r.entries){if(!NP(o)||typeof o.sessionId!="string")continue;let s=typeof o.writerAgent=="string"?o.writerAgent:"";if(!P8(s))continue;let i=typeof o.projectFolderPath=="string"?o.projectFolderPath:(o.projectFolderPath===null,null);n.push({writerAgent:s,projectFolderPath:i,sessionId:o.sessionId})}return{entries:n}}catch{return{entries:[]}}},MP=(e,t)=>{xt.default.writeFileSync(nj(e),JSON.stringify(t,null,2))},sj=(e,t)=>{xt.default.writeFileSync(oj(e,t.sessionId),JSON.stringify(t,null,2))},w8=(e,t)=>{xt.default.writeFileSync(_8(e,t.sessionId),JSON.stringify(t,null,2))},ij=(e,t)=>{let r=Qa({turns:t.turns});w8(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Qo=(e,t)=>{let r=oj(e,t);if(!xt.default.existsSync(r))return null;try{let n=JSON.parse(xt.default.readFileSync(r,"utf8"));return!NP(n)||typeof n.sessionId!="string"?null:n}catch{return null}},pm=(e,t=20)=>{let r=um(e),n=xt.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),o=[];for(let s of n){let i=s.name.replace(/\.canonical\.json$/,""),a=Qo(e,i);a!==null&&o.push(a)}return o.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},tl=(e,t,r)=>{let n=DP(r);return HP(e).entries.find(i=>Zo(i)===Zo({writerAgent:t,projectFolderPath:n}))?.sessionId??null},v8=(e,t,r,n)=>{let o=HP(e),s=Zo({writerAgent:t,projectFolderPath:r}),i=[...o.entries.filter(a=>Zo(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:n}];MP(e,{entries:i})},rl=(e,t,r)=>{let n=(0,jP.randomUUID)(),o=new Date().toISOString(),s=DP(r),i={sessionId:n,writerAgent:t,projectFolderPath:s,turns:[],createdAt:o,updatedAt:o};return sj(e,i),ij(e,i),v8(e,t,s,n),n},FP=(e,t,r)=>{let n=tl(e,t,r);return n!==null?n:rl(e,t,r)},mm=(e,t,r)=>{let n=DP(r),o=HP(e);if(n===null&&r===void 0){MP(e,{entries:o.entries.filter(i=>i.writerAgent!==t)});return}let s=Zo({writerAgent:t,projectFolderPath:n});MP(e,{entries:o.entries.filter(i=>Zo(i)!==s)})},gm=e=>{let t=FP(e.layout,e.writerAgent,e.projectFolderPath),r=Qo(e.layout,t);if(r===null)return;let n={id:(0,jP.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},o={...r,turns:[...r.turns,n],updatedAt:n.createdAt};sj(e.layout,o),ij(e.layout,o)}});var W8,L8,fm,$P,lj=l(()=>{"use strict";W8=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",L8=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},fm=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",$P=e=>{let t=fm(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",n=W8(r,e.userPromptCharacterCount),o=L8({contextBudget:n,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:n,...o}}});var hm=l(()=>{"use strict";rj();aj();OP();lj()});var cj=l(()=>{"use strict";ph()});var He,R8,k8,zP,UP,BP,dj=l(()=>{"use strict";ie();cj();He=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),R8=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},k8=(e,t,r)=>{let n=e[t]?.apiKey;if(n!==void 0&&n.length>0){let o=Rd(n);return`value="${He(o)}" placeholder="Paste a new key to replace"`}return`placeholder="${He(r)}"`},zP=(e,t,r,n,o)=>{let s=Fh[t];return`<label class="field">
          <span class="field-label">${He(n)} API key \u2014 ${He(R8(e,t))} \xB7 <a class="field-link" href="${He(s.href)}" target="_blank" rel="noopener noreferrer">${He(s.label)}</a></span>
          <input class="input mono" type="password" name="${He(r)}" autocomplete="off" ${k8(e,t,o)} />
        </label>`},UP=(e,t,r,n)=>{let o=mh(e[t]?.model),s=new Set(bd[t].map(c=>c.value)),i=bd[t].map(c=>{let d=c.value===o?" selected":"";return`<option value="${He(c.value)}"${d}>${He(c.label)}</option>`}).join(""),a=o!==en&&!s.has(o)?`<option value="${He(o)}" selected>${He(o)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${He(n)}</span>
          <select class="input mono" name="${He(r)}">${i}${a}</select>
        </label>`},BP=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${He(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",n=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${zP(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${UP(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${zP(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${UP(e.secrets,"openai","openaiModel","OpenAI model")}
        ${zP(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${UP(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var uj=l(()=>{"use strict";dj()});var ym,pj,mj=l(()=>{"use strict";ym=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pj=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${ym(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
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
    </section>`}});var C8,gj,fj,hj=l(()=>{"use strict";C8=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,gj=e=>e.kind==="folder",fj=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let d=s.children.get(a);if(d!==void 0&&gj(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=n=>{let o=[];for(let s of n.children.values()){if(gj(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(C8)};return r(t)}});var yj,GP,Sj=l(()=>{"use strict";yj=m(require("node:path")),GP=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${GP(r.children,t)}</ul>
            </details>
          </li>`;let n=yj.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var Aj,kr,T8,x8,nl,I8,VP,bj=l(()=>{"use strict";Zu();Aj=m(require("node:path"));mj();hj();Sj();kr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),T8=()=>`(() => {
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

})();`,x8=()=>`(() => {
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
})();`,nl=e=>{let t=ua({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=pj({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),n=e.flashError?`<div class="alert-error">${kr(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${kr(e.flashMessage)}</div>`:"",o=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':I8(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${kr(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${kr(s)}" />
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
    <script>${T8()}</script>
    <script>${x8()}</script>`;return`${t}${r}${n}${c}${d}`},I8=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let d=fj(a.items.map(b=>({...b,relativePath:typeof b.relativePath=="string"&&b.relativePath.length>0?b.relativePath:Aj.default.relative(a.sourceRoot,b.sourcePath).replaceAll("\\","/")}))),p=GP(d,kr),f=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${kr(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${kr(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${f} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${kr(n)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},VP=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&o.set(d,p)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?o.get(d):void 0,f=e.get(`setName-${i}`)?.trim()??p??a,b=t.sets[i];if(b===void 0)continue;let h=a.length>0?a:b.proposedSlug,y=f.length>0?f:b.proposedName,u=r.has(i),A=b.items.map(S=>({id:S.id,kind:S.kind,title:S.title,sourcePath:S.sourcePath,include:u}));s.push({slug:h,name:y,items:A})}return s}});var Pj=l(()=>{"use strict";bj()});var O8,qP,_j=l(()=>{"use strict";br();O8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null||n.ok!==!0)return null;let o=n;return{counts:{harness:Number(o.counts?.harness??0),workflow:Number(o.counts?.workflow??0),agent:Number(o.counts?.agent??0)},items:Array.isArray(o.items)?o.items:[]}}catch{return null}},qP=O8});var N8,wj,vj=l(()=>{"use strict";br();N8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let n=await r.json();return typeof n!="object"||n===null||n.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof n.promotedCount=="number"?n.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},wj=N8});var Wj=l(()=>{"use strict"});var ol,M8,KP,Lj=l(()=>{"use strict";Zu();ol=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),M8=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,KP=e=>{let t=e.flashError?`<div class="alert-error">${ol(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ol(e.flashMessage)}</div>`:"",r=ua({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),n=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(o=>{let s=e.compositionCountsByProjectId?.[o.id],i=s!==void 0?`<span class="muted">${ol(M8(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(o.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(o.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(o.id)}">
                  <strong>${ol(o.name)}</strong>
                  <span class="muted mono">${ol(o.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${n}
    </section>`}});var Ej=l(()=>{"use strict";Wj();qy();Lj()});var Sm,Rj=l(()=>{"use strict";Sm=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var kj,Xt,JP=l(()=>{"use strict";kj=m(require("node:path"));zt();At();B();ie();Ge();Xt=e=>{let t=F()?.layout.installDir??L();if(kj.default.basename(t)===Hr)return Ft;let r=F(),n=r!==null?we(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):Ft}});var YP,Cj=l(()=>{"use strict";Ge();JP();YP=async e=>{let t=_e(e.installDir),r=t?.bundleVersion??null,n=Xt(t);try{let o=await no(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Kr(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var XP,Tj=l(()=>{"use strict";XP=e=>!e});var ZP,es,QP=l(()=>{"use strict";B();ZP=()=>`http://127.0.0.1:${pf()}/update/run`,es=async e=>{try{let t=await fetch(ZP(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var j8,xj,e_,Ij=l(()=>{"use strict";B();ee();QP();j8=()=>{Dt({launchAgentLabel:te(),installDir:L()})},xj=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},e_=async()=>{j8();let e=await es({force:!0});if(e.ok)return{ok:!0,message:xj(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:xj(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ge(),oE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var t_=l(()=>{"use strict";jA();Rj();JP();Cj();Tj();Ij();QP()});var Oj,Nj=l(()=>{"use strict";Oj=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var Mj,jj,r_,n_,Dj=l(()=>{"use strict";Mj=require("node:crypto"),jj=m(require("node:fs"));ut();ie();ie();Nj();r_=!1,n_=async e=>{if(r_)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!Oj(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=F();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&jj.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,Mj.randomUUID)();r_=!0;try{if(await Dy(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await uo({...r,workspace:o},e.writerAgent,t);return await xi(n,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{r_=!1}}});var Hj=l(()=>{"use strict";Dj()});var Ze,D8,Fj,$j,o_,s_,i_,a_,l_,c_,d_=l(()=>{"use strict";Ze=require("node:crypto"),D8=Buffer.from("302a300506032b6570032100","hex"),Fj=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},$j=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Ze.createPublicKey)({key:Buffer.concat([D8,t]),format:"der",type:"spki"})},o_=()=>{let{publicKey:e,privateKey:t}=(0,Ze.generateKeyPairSync)("ed25519");return{publicKeyRaw:Fj(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},s_=e=>(0,Ze.createPrivateKey)(e),i_=(e,t)=>(0,Ze.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),a_=(e,t,r)=>{try{let n=$j(e);return(0,Ze.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},l_=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,c_=()=>(0,Ze.randomBytes)(32).toString("base64url")});var Zt,Am,zj,H8,F8,bm,u_,p_,Uj=l(()=>{"use strict";Zt=m(require("node:fs")),Am=m(require("node:path"));d_();B();At();zj=e=>Am.default.join(e.installDir,lr),H8=(e,t)=>{if(e.profileEmail===null||t===zj(e)||Zt.default.existsSync(t))return;let r=zj(e);Zt.default.existsSync(r)&&(Zt.default.mkdirSync(Am.default.dirname(t),{recursive:!0}),Zt.default.renameSync(r,t))},F8=e=>{if(!Zt.default.existsSync(e))return null;try{let t=Zt.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},bm=e=>{let t=Kc(e);H8(e,t);let r=F8(t);if(r!==null)return r;let n=o_();return Zt.default.mkdirSync(Am.default.dirname(t),{recursive:!0}),Zt.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},u_=e=>{let t=bm(e.layout),r=c_(),n=l_({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=s_(t.privateKeyPem),s=i_(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},p_=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return a_(e.serverPublicKey,t,e.serverAttestation)}});var m_=l(()=>{"use strict";Uj();d_()});var qj,sl,h_,y_,Bj,$8,g_,Pm,ne,Kj,z8,f_,U8,B8,S_,le,Ae,Qt,G8,Gj,Vj,il,al,Jj=l(()=>{"use strict";qj=m(require("node:http")),sl=m(require("node:fs")),h_=m(require("node:path"));_m();na();ox();ix();px();Po();dA();OA();Ux();Gx();NM();jM();XM();QM();hm();uj();Pj();an();ut();br();_j();vj();Ej();t_();Ge();Hj();ie();m_();y_=e=>ZS(e)??"never",Bj=48e3,$8=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,g_=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??ru(),reveal:t.reveal,installed:Ar(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Pm=async e=>{let t=F();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:yo(t,e)},ne=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Kj=200,z8=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',f_=e=>{let t=e.trim().slice(0,Kj),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},U8=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ne(t)}</div>`,B8=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ne(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',S_={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},le=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...S_}),e.end(JSON.stringify(r))},Ae=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Qt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},G8=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=z8(e.healthBadge),n=e.status.wakeError?`<div class="alert-error">${ne(e.status.wakeError)}</div>`:"",o=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=XP(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${oa(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ne(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ne(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ne(y_(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ne(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${s}
    </section>`},Gj=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},Vj=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,Kj)},il=e=>{let t=h_.default.join(e.layout.installDir,"link-code.txt"),r=()=>_e(e.layout.installDir),n=()=>{let h=r();return{installBundleVersion:Sm(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},o=async h=>{let y=h.installVersion??r(),u=await i(),A=$A(u),S=h.updateFlash??null,g=zA(S),_=U8(S,h.updateError??null);return HA({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:Xt(y),installBundleVersionLabel:Sm(y),prependBody:`${g}${_}${A}`,headerUpdateButtonHtml:FA(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await YP(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:f_("An update is already running.")}),h.end();return}c=!0;try{let u=await e_(),A=u.ok?"/?update=ok":f_(u.message);h.writeHead(303,{Location:A}),h.end()}catch(u){let A=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:f_(A)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=n(),S=await o({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${ne(y)}</h1>
      <p>${ne(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(S)},f=()=>{if(sl.default.existsSync(t))return sl.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return sl.default.writeFileSync(t,h,"utf8"),h},b=qj.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",A=h.method??"GET";if(A==="OPTIONS"){y.writeHead(204,S_),y.end();return}if(!await _P({method:A,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:MM(h_.default.dirname(e.layout.configPath)),readBody:Qt,sendHtml:Ae,renderShell:o})){if(A==="GET"&&u==="/health"){let S=e.controllers.getStatus(),g=n();le(y,200,{ok:!0,...S,installBundleVersion:g.installBundleVersion,installBundleUpdatedAt:g.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/status"){let S=n();le(y,200,{...e.controllers.getStatus(),linkCode:f(),installBundleVersion:S.installBundleVersion,installBundleUpdatedAt:S.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/traffic"){le(y,200,{entries:ta(e.layout)});return}if(A==="DELETE"&&u==="/api/traffic"||A==="POST"&&u==="/api/traffic/clear"){if(tA(e.layout),A==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}le(y,200,{ok:!0});return}if(A==="GET"&&u==="/api/trace"){le(y,200,{entries:Uu(e.layout)});return}if(A==="DELETE"&&u==="/api/trace"||A==="POST"&&u==="/api/trace/clear"){if(oA(e.layout),A==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}le(y,200,{ok:!0});return}if(A==="POST"&&u==="/api/errors/clear"){sA(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(A==="GET"&&u==="/api/knowledge"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(g.length>0){let _=await xo({layout:e.layout,query:g,limit:20});le(y,200,{chunks:_,query:g});return}le(y,200,{chunks:To(e.layout).slice(-50).reverse()});return}if(A==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(A==="GET"&&u==="/api/update-status"){let S=await i();le(y,200,{ok:!0,...S});return}if((A==="GET"||A==="POST")&&u==="/api/update"){await d(y);return}if(A==="GET"&&u==="/"){let S=e.controllers.getStatus(),g=n(),_=Ar(e.layout),w=Bu(e.layout.errorLogPath);Ae(y,await o({title:"Home",activePath:"/",installVersion:g.installVersion,updateFlash:Gj(h.url??void 0),updateError:Vj(h.url??void 0),body:UA({wsConnected:S.wsConnected,lastHeartbeatAt:S.lastHeartbeatAt,installBundleVersion:g.installBundleVersion,harnessSetCount:_.sets.length,knowledgeChunkCount:To(e.layout).length,trafficEntryCount:ta(e.layout).length,wakeError:S.wakeError,errorLogByteSize:w.byteSize,errorLogExists:w.exists})}));return}if(A==="GET"&&u==="/task"){let S=e.controllers.getStatus(),g=n(),_=F(),w=new URL(h.url??"/",`http://127.0.0.1:${43347}`),v=w.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,E=w.searchParams.get("failed")==="1"?w.searchParams.get("error")?.trim()??"Task failed.":null,R=w.searchParams.get("runId");Ae(y,await o({title:"Task",activePath:"/task",installVersion:g.installVersion,body:wP({defaultWorkspace:_?.workspace??"",wsConnected:S.wsConnected,flashMessage:v,flashError:E,lastRunId:R})}));return}if(A==="POST"&&u==="/task/dispatch"){let S=await Qt(h),g=new URLSearchParams(S),_=g.get("prompt")?.trim()??"",w=g.get("writerAgent")?.trim()??"claude-cli",v=g.get("projectFolder")?.trim()??"",E=await n_({prompt:_,writerAgent:w,...v.length>0?{projectFolderPath:v}:{}}),R=new URLSearchParams;E.ok?R.set("ok","1"):(R.set("failed","1"),E.errorMessage!==void 0&&R.set("error",E.errorMessage.slice(0,240))),E.agentRunId!==void 0&&R.set("runId",E.agentRunId),y.writeHead(303,{Location:`/task?${R.toString()}`}),y.end();return}if(A==="GET"&&u==="/writer-sessions"){let S=n(),g=pm(e.layout,12);Ae(y,await o({title:"Writer sessions",activePath:"/writer-sessions",installVersion:S.installVersion,updateFlash:Gj(h.url??void 0),updateError:Vj(h.url??void 0),body:CP({sessions:g})}));return}if(A==="GET"&&u==="/errors"){let S=n(),g=Bu(e.layout.errorLogPath);Ae(y,await o({title:"Errors",activePath:"/errors",installVersion:S.installVersion,body:aA({errorLogPath:e.layout.errorLogPath,content:g.content,exists:g.exists,truncated:g.truncated,byteSize:g.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&u==="/status"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=e.controllers.getStatus(),_=ge(e.layout),w=_!==null?Ce(_,12e4):uA(g.lastHeartbeatAt,12e4),v=pA({lastHeartbeatAt:g.lastHeartbeatAt,heartbeatIsStale:w}),E=n();Ae(y,await o({title:"Status",activePath:"/status",installVersion:E.installVersion,body:`${G8({status:g,healthBadge:v,revived:S.searchParams.get("revived")==="1",linkCode:f(),installBundleVersion:E.installBundleVersion,installBundleUpdatedAt:E.installBundleUpdatedAt})}${fA({installDir:e.layout.installDir})}${gA({entries:Uu(e.layout)})}`}));return}if(A==="GET"&&u==="/traffic"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=ta(e.layout),_=n(),w=g.map(R=>`<tr><td title="${ne(R.at)}">${ne(y_(R.at))}</td><td>${ne(R.direction)}</td><td><code>${ne(R.type)}</code></td><td>${ne(R.summary)}</td><td>${ne(R.action??"")}</td></tr>`).join(""),v=g.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${w}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',E=S.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ae(y,await o({title:"Traffic",activePath:"/traffic",installVersion:_.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${E}
              ${v}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&u==="/projects"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=n(),_=Xt(g.installVersion),w=await Pm(e.layout),v=S.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,E=F(),R=E===null?null:Y({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),C=R===null?{}:Object.fromEntries((await Promise.all(w.projects.map(async I=>{let D=await qP(R,I.id);return[I.id,D?.counts??null]}))).filter(I=>I[1]!==null));Ae(y,await o({title:"Projects",activePath:"/projects",installVersion:g.installVersion,body:KP({projects:w.projects,compositionCountsByProjectId:C,cloudAppOrigin:_,syncMessage:w.message,syncOk:w.ok,flashMessage:null,flashError:v})}));return}if(A==="GET"&&u==="/projects/select-folder"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",_=F(),w=_===null?null:Y({wsUrl:_.wsUrl,pairingToken:_.pairingToken}),v=g.length>0&&w!==null?Pr():null;if(v===null||w===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Ue({projectFolderPath:v}),!await Mi(w,g,v)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(g)}&folderUpdated=1`}),y.end();return}if(A==="GET"&&u==="/project"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=S.searchParams.get("id")?.trim()??"",_=n(),w=await Pm(e.layout),v=un(w.projects,g);if(v===null){await p(y,"Project not found");return}let E=S.searchParams.get("linked")==="1"?S.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${S.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${S.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:S.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,R=S.searchParams.get("knowledgePromoted"),C=R!==null?`Marked ${R} lesson(s) as promoted in Agent Witch.`:null,I=S.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,D=S.searchParams.get("tab")?.trim()??"harness",ae=D==="workflows"||D==="agents"||D==="knowledge"?D:"harness",q=F(),H=q===null?null:Y({wsUrl:q.wsUrl,pairingToken:q.pairingToken}),hs=H===null?null:await qP(H,v.id),$=0;if(H!==null)try{let Oe=await fetch(`${H.appOrigin}/api/agent-witch/projects/${encodeURIComponent(v.id)}/knowledge`,{method:"GET",headers:{[Me]:H.pairingToken},signal:AbortSignal.timeout(1e4)});if(Oe.ok){let Or=await Oe.json();typeof Or=="object"&&Or!==null&&typeof Or.candidateCount=="number"&&($=Or.candidateCount)}}catch{$=0}Ae(y,await o({title:v.name,activePath:"/projects",installVersion:_.installVersion,body:So({project:v,installed:Ar(e.layout),linkedSetSlugs:yr(v.projectFolderPath),composition:hs,knowledgeCandidateCount:$,activeTab:ae,flashMessage:E??C,flashError:I})}));return}if(A==="POST"&&u==="/projects/pull-bound-harness"){let S=await Qt(h),g=await Ky({rawBody:S,layout:e.layout});if(g.kind==="not_found"){await p(y,"Project not found");return}if(g.kind==="redirect"){y.writeHead(303,{Location:g.location}),y.end();return}let _=n();Ae(y,await o({title:g.title,activePath:"/projects",installVersion:_.installVersion,body:g.body}));return}if(A==="POST"&&u==="/projects/link-harness"){let S=await Qt(h),g=new URLSearchParams(S),_=g.get("projectId")?.trim()??"",w=await Pm(e.layout),v=un(w.projects,_);if(v===null){await p(y,"Project not found");return}let E=g.getAll("applySet").map(q=>String(q)),R=wi({layout:e.layout,projectFolderPath:v.projectFolderPath,setSlugs:E});if(!R.ok){let q=n();Ae(y,await o({title:v.name,activePath:"/projects",installVersion:q.installVersion,body:So({project:v,installed:Ar(e.layout),linkedSetSlugs:yr(v.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:R.errorMessage})}));return}let C=F(),I=C===null?null:Y({wsUrl:C.wsUrl,pairingToken:C.pairingToken}),D=I===null?!1:await Oi(I,v.id,R.appliedSetSlugs),ae=new URLSearchParams({linked:"1",files:String(R.writtenFileCount),bindingsSynced:D?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${ae.toString()}`}),y.end();return}if(A==="POST"&&u==="/project/knowledge/promote-all"){let S=await Qt(h),_=new URLSearchParams(S).get("projectId")?.trim()??"",w=await Pm(e.layout),v=un(w.projects,_);if(v===null){await p(y,"Project not found");return}let E=F(),R=E===null?null:Y({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),C=R===null?{ok:!1,promotedCount:0}:await wj(R,v.id),I=new URLSearchParams({tab:"knowledge",...C.ok?{knowledgePromoted:String(C.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${I.toString()}`}),y.end();return}if(A==="GET"&&u==="/harness"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=n(),_=Ei(e.layout),w=S.searchParams.get("submitted")==="1",v=w?S.searchParams.get("syncFailed")==="1"?`Local harness updated (${S.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:S.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${S.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":S.searchParams.get("stopped")==="1"?`Reveal stopped. ${_?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:S.searchParams.get("revealed")==="1"?`Reveal found ${_?.sets.length??0} set(s).`:null,E=_?.scanRoots[0]??ru(),R=$8(e.layout,{reveal:_,importQuery:S.searchParams.get("import")==="1",justSubmitted:w}),C=Xt(g.installVersion);Ae(y,await o({title:"Harness",activePath:"/harness",installVersion:g.installVersion,body:nl(g_(e.layout,{cloudAppOrigin:C,reveal:_,scanFolder:E,flashMessage:v,importSectionExpanded:R}))}));return}if(A==="POST"&&u==="/api/harness/pick-folder"){let S=Pr();if(S===null){le(y,200,{cancelled:!0});return}le(y,200,{path:S});return}if(A==="GET"&&u==="/api/harness/file-content"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",_=_i(g);if(_===null){le(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let w=sl.default.readFileSync(_,"utf8"),v=w.length>Bj?`${w.slice(0,Bj)}
\u2026 (truncated)`:w;le(y,200,{content:v})}catch{le(y,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&u==="/api/harness/reveal/add-project"){let S=await Qt(h),g="";try{let v=JSON.parse(S);typeof v=="object"&&v!==null&&typeof v.projectPath=="string"&&(g=v.projectPath.trim())}catch{le(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(g.length===0){le(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let _=Ei(e.layout),w=Ry({reveal:_,projectPath:g});if(w===null||w.sets.length===0){le(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}iu(e.layout,w),le(y,200,{ok:!0,setCount:w.sets.length});return}if(A==="GET"&&u==="/api/harness/reveal/stream"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(g.length===0){le(y,400,{errorMessage:"Choose a folder to scan first."});return}let _=!1;h.on("close",()=>{_=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...S_});let w=ky({scanRoot:g,response:y,shouldAbort:()=>_});iu(e.layout,w),y.end();return}if(A==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&u==="/harness/submit"){let S=Ei(e.layout);if(S===null){let C=n(),I=Xt(C.installVersion);Ae(y,await o({title:"Harness",activePath:"/harness",installVersion:C.installVersion,body:nl(g_(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let g=await Qt(h),_=new URLSearchParams(g),w=VP(_,S),v=Ty({layout:e.layout,sets:w});if(!v.ok){let C=n(),I=Xt(C.installVersion);Ae(y,await o({title:"Harness",activePath:"/harness",installVersion:C.installVersion,body:nl(g_(e.layout,{cloudAppOrigin:I,reveal:S,flashError:v.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}Iy(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${v.writtenItemCount??0}${R}`}),y.end();return}if(A==="GET"&&u==="/writer-api"){let S=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=F()?.writerExecutionBackend??ve(void 0),w=me(e.layout.configPath),v=mr(w),E=S.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=n();Ae(y,await o({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:BP({writerExecutionBackend:_,secrets:v,flashMessage:E})}));return}if(A==="POST"&&u==="/writer-api"){let S=await Qt(h),g=new URLSearchParams(S),_=g.get("writerExecutionBackend")?.trim()??"cli";Hh({configPath:e.layout.configPath,writerExecutionBackend:ve(_),anthropicApiKey:g.get("anthropicApiKey")??void 0,anthropicModel:g.get("anthropicModel")??void 0,openaiApiKey:g.get("openaiApiKey")??void 0,openaiModel:g.get("openaiModel")??void 0,googleApiKey:g.get("googleApiKey")??void 0,googleModel:g.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(A==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(A==="GET"&&u==="/history"){let S=n();Ae(y,await o({title:"History",activePath:"/history",installVersion:S.installVersion,body:kP({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&u==="/knowledge"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",_=n(),w=_A({layout:e.layout}),v=WA(w),E=g.length>0?await xo({layout:e.layout,query:g,limit:20}):To(e.layout).slice(-50).reverse(),R=E.map(I=>{let D=vA(w,I.id),ae=D>0?` \xB7 used in ${D} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ne(I.createdAt)}">${ne(y_(I.createdAt))}${I.source?` \xB7 ${ne(I.source)}`:""}${ae}</div><pre>${ne(I.text)}</pre></article>`}).join(""),C=v.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${v.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ne(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Ae(y,await o({title:"Knowledge",activePath:"/knowledge",installVersion:_.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ne(g)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${C}${R}${B8(g,E.length)}`}));return}A==="POST"&&await Qt(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return b.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),b.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${$t}`)}),b},al=e=>bm(e).publicKeyRaw});var _m=l(()=>{"use strict";zT();UT();Jj()});var Xj={};yt(Xj,{runAgentWitchExternalLiveCli:()=>q8});var A_,Yj,V8,q8,Zj=l(()=>{"use strict";A_=m(require("node:fs")),Yj=m(require("node:path"));Po();B();ee();_m();ee();V8=e=>{let t=Yj.default.join(e,"link-code.txt");if(!A_.default.existsSync(t))return null;let r=A_.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},q8=()=>{$e("agent-witch-live");let e=L(),t=N(),r=V8(e),n=al(t);il({layout:t,controllers:{getStatus:()=>{let o=ge(t);return{wsConnected:Gi(t,{socketOpen:!0}),lastHeartbeatAt:o?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:n}},reviveWebSocket:()=>{Br(e)}}})}});var er=W((__e,tD)=>{"use strict";var Qj=["nodebuffer","arraybuffer","fragments"],eD=typeof Blob<"u";eD&&Qj.push("blob");tD.exports={BINARY_TYPES:Qj,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:eD,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var ll=W((w_e,wm)=>{"use strict";var{EMPTY_BUFFER:K8}=er(),b_=Buffer[Symbol.species];function J8(e,t){if(e.length===0)return K8;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new b_(r.buffer,r.byteOffset,n):r}function rD(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function nD(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function Y8(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function P_(e){if(P_.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new b_(e):ArrayBuffer.isView(e)?t=new b_(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),P_.readOnly=!1),t}wm.exports={concat:J8,mask:rD,toArrayBuffer:Y8,toBuffer:P_,unmask:nD};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");wm.exports.mask=function(t,r,n,o,s){s<48?rD(t,r,n,o,s):e.mask(t,r,n,o,s)},wm.exports.unmask=function(t,r){t.length<32?nD(t,r):e.unmask(t,r)}}catch{}});var iD=W((v_e,sD)=>{"use strict";var oD=Symbol("kDone"),__=Symbol("kRun"),w_=class{constructor(t){this[oD]=()=>{this.pending--,this[__]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[__]()}[__](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[oD])}}};sD.exports=w_});var ns=W((W_e,dD)=>{"use strict";var cl=require("zlib"),aD=ll(),X8=iD(),{kStatusCode:lD}=er(),Z8=Buffer[Symbol.species],Q8=Buffer.from([0,0,255,255]),Wm=Symbol("permessage-deflate"),tr=Symbol("total-length"),ts=Symbol("callback"),Cr=Symbol("buffers"),rs=Symbol("error"),vm,v_=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!vm){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;vm=new X8(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[ts];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){vm.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){vm.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?cl.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=cl.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Wm]=this,this._inflate[tr]=0,this._inflate[Cr]=[],this._inflate.on("error",t4),this._inflate.on("data",cD)}this._inflate[ts]=n,this._inflate.write(t),r&&this._inflate.write(Q8),this._inflate.flush(()=>{let s=this._inflate[rs];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=aD.concat(this._inflate[Cr],this._inflate[tr]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[tr]=0,this._inflate[Cr]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?cl.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=cl.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[tr]=0,this._deflate[Cr]=[],this._deflate.on("data",e4)}this._deflate[ts]=n,this._deflate.write(t),this._deflate.flush(cl.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=aD.concat(this._deflate[Cr],this._deflate[tr]);r&&(s=new Z8(s.buffer,s.byteOffset,s.length-4)),this._deflate[ts]=null,this._deflate[tr]=0,this._deflate[Cr]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};dD.exports=v_;function e4(e){this[Cr].push(e),this[tr]+=e.length}function cD(e){if(this[tr]+=e.length,this[Wm]._maxPayload<1||this[tr]<=this[Wm]._maxPayload){this[Cr].push(e);return}this[rs]=new RangeError("Max payload size exceeded"),this[rs].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[rs][lD]=1009,this.removeListener("data",cD),this.reset()}function t4(e){if(this[Wm]._inflate=null,this[rs]){this[ts](this[rs]);return}e[lD]=1007,this[ts](e)}});var os=W((L_e,Lm)=>{"use strict";var{isUtf8:uD}=require("buffer"),{hasBlob:r4}=er(),n4=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function o4(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function W_(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function s4(e){return r4&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Lm.exports={isBlob:s4,isValidStatusCode:o4,isValidUTF8:W_,tokenChars:n4};if(uD)Lm.exports.isValidUTF8=function(e){return e.length<24?W_(e):uD(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Lm.exports.isValidUTF8=function(t){return t.length<32?W_(t):e(t)}}catch{}});var C_=W((E_e,SD)=>{"use strict";var{Writable:i4}=require("stream"),pD=ns(),{BINARY_TYPES:a4,EMPTY_BUFFER:mD,kStatusCode:l4,kWebSocket:c4}=er(),{concat:L_,toArrayBuffer:d4,unmask:u4}=ll(),{isValidStatusCode:p4,isValidUTF8:gD}=os(),Em=Buffer[Symbol.species],Qe=0,fD=1,hD=2,yD=3,E_=4,R_=5,Rm=6,k_=class extends i4{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||a4[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[c4]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Qe}_write(t,r,n){if(this._opcode===8&&this._state==Qe)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Em(n.buffer,n.byteOffset+t,n.length-t),new Em(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new Em(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Qe:this.getInfo(t);break;case fD:this.getPayloadLength16(t);break;case hD:this.getPayloadLength64(t);break;case yD:this.getMask();break;case E_:this.getData(t);break;case R_:case Rm:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[pD.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=fD:this._payloadLength===127?this._state=hD:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=yD:this._state=E_}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=E_}getData(t){let r=mD;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&u4(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=R_,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[pD.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Qe&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Qe;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=L_(n,r):this._binaryType==="arraybuffer"?o=d4(L_(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=Qe):(this._state=Rm,setImmediate(()=>{this.emit("message",o,!0),this._state=Qe,this.startLoop(t)}))}else{let o=L_(n,r);if(!this._skipUTF8Validation&&!gD(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===R_||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=Qe):(this._state=Rm,setImmediate(()=>{this.emit("message",o,!1),this._state=Qe,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,mD),this.end();else{let n=t.readUInt16BE(0);if(!p4(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new Em(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!gD(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=Qe;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Qe):(this._state=Rm,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Qe,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[l4]=o,i}};SD.exports=k_});var I_=W((k_e,PD)=>{"use strict";var{Duplex:R_e}=require("stream"),{randomFillSync:m4}=require("crypto"),{types:{isUint8Array:g4}}=require("util"),AD=ns(),{EMPTY_BUFFER:f4,kWebSocket:h4,NOOP:y4}=er(),{isBlob:ss,isValidStatusCode:S4}=os(),{mask:bD,toBuffer:xn}=ll(),et=Symbol("kByteLength"),A4=Buffer.alloc(4),km=8*1024,In,is=km,ht=0,b4=1,P4=2,T_=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=ht,this.onerror=y4,this[h4]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||A4,r.generateMask?r.generateMask(n):(is===km&&(In===void 0&&(In=Buffer.alloc(km)),m4(In,0,km),is=0),n[0]=In[is++],n[1]=In[is++],n[2]=In[is++],n[3]=In[is++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[et]!==void 0?a=r[et]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(o?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=n[0],d[s-3]=n[1],d[s-2]=n[2],d[s-1]=n[3],i?[d,t]:o?(bD(t,n,d,s,a),[d]):(bD(t,n,t,0,a),[d,t])):[d,t]}close(t,r,n,o){let s;if(t===void 0)s=f4;else{if(typeof t!="number"||!S4(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(g4(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[et]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==ht?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):ss(t)?(o=t.size,s=!1):(t=xn(t),o=t.length,s=xn.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[et]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};ss(t)?this._state!==ht?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ht?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):ss(t)?(o=t.size,s=!1):(t=xn(t),o=t.length,s=xn.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[et]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};ss(t)?this._state!==ht?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ht?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[AD.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):ss(t)?(a=t.size,c=!1):(t=xn(t),a=t.length,c=xn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[et]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};ss(t)?this._state!==ht?this.enqueue([this.getBlobData,t,this._compress,d,n]):this.getBlobData(t,this._compress,d,n):this._state!==ht?this.enqueue([this.dispatch,t,this._compress,d,n]):this.dispatch(t,this._compress,d,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[et],this._state=P4,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(x_,this,a,o);return}this._bufferedBytes-=n[et];let i=xn(s);r?this.dispatch(i,r,n,o):(this._state=ht,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(_4,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[AD.extensionName];this._bufferedBytes+=n[et],this._state=b4,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");x_(this,c,o);return}this._bufferedBytes-=n[et],this._state=ht,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===ht&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][et],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][et],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};PD.exports=T_;function x_(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function _4(e,t,r){x_(e,t,r),e.onerror(t)}});var CD=W((C_e,kD)=>{"use strict";var{kForOnEventAttribute:dl,kListener:O_}=er(),_D=Symbol("kCode"),wD=Symbol("kData"),vD=Symbol("kError"),WD=Symbol("kMessage"),LD=Symbol("kReason"),as=Symbol("kTarget"),ED=Symbol("kType"),RD=Symbol("kWasClean"),rr=class{constructor(t){this[as]=null,this[ED]=t}get target(){return this[as]}get type(){return this[ED]}};Object.defineProperty(rr.prototype,"target",{enumerable:!0});Object.defineProperty(rr.prototype,"type",{enumerable:!0});var On=class extends rr{constructor(t,r={}){super(t),this[_D]=r.code===void 0?0:r.code,this[LD]=r.reason===void 0?"":r.reason,this[RD]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[_D]}get reason(){return this[LD]}get wasClean(){return this[RD]}};Object.defineProperty(On.prototype,"code",{enumerable:!0});Object.defineProperty(On.prototype,"reason",{enumerable:!0});Object.defineProperty(On.prototype,"wasClean",{enumerable:!0});var ls=class extends rr{constructor(t,r={}){super(t),this[vD]=r.error===void 0?null:r.error,this[WD]=r.message===void 0?"":r.message}get error(){return this[vD]}get message(){return this[WD]}};Object.defineProperty(ls.prototype,"error",{enumerable:!0});Object.defineProperty(ls.prototype,"message",{enumerable:!0});var ul=class extends rr{constructor(t,r={}){super(t),this[wD]=r.data===void 0?null:r.data}get data(){return this[wD]}};Object.defineProperty(ul.prototype,"data",{enumerable:!0});var w4={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[dl]&&o[O_]===t&&!o[dl])return;let n;if(e==="message")n=function(s,i){let a=new ul("message",{data:i?s:s.toString()});a[as]=this,Cm(t,this,a)};else if(e==="close")n=function(s,i){let a=new On("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[as]=this,Cm(t,this,a)};else if(e==="error")n=function(s){let i=new ls("error",{error:s,message:s.message});i[as]=this,Cm(t,this,i)};else if(e==="open")n=function(){let s=new rr("open");s[as]=this,Cm(t,this,s)};else return;n[dl]=!!r[dl],n[O_]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[O_]===t&&!r[dl]){this.removeListener(e,r);break}}};kD.exports={CloseEvent:On,ErrorEvent:ls,Event:rr,EventTarget:w4,MessageEvent:ul};function Cm(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Tm=W((T_e,TD)=>{"use strict";var{tokenChars:pl}=os();function It(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function v4(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,d=-1,p=-1,f=0;for(;f<e.length;f++)if(d=e.charCodeAt(f),i===void 0)if(p===-1&&pl[d]===1)c===-1&&(c=f);else if(f!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f);let h=e.slice(c,p);d===44?(It(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${f}`);else if(a===void 0)if(p===-1&&pl[d]===1)c===-1&&(c=f);else if(d===32||d===9)p===-1&&c!==-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f),It(r,e.slice(c,p),!0),d===44&&(It(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,f),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${f}`);else if(o){if(pl[d]!==1)throw new SyntaxError(`Unexpected character at index ${f}`);c===-1?c=f:n||(n=!0),o=!1}else if(s)if(pl[d]===1)c===-1&&(c=f);else if(d===34&&c!==-1)s=!1,p=f;else if(d===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${f}`);else if(d===34&&e.charCodeAt(f-1)===61)s=!0;else if(p===-1&&pl[d]===1)c===-1&&(c=f);else if(c!==-1&&(d===32||d===9))p===-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f);let h=e.slice(c,p);n&&(h=h.replace(/\\/g,""),n=!1),It(r,a,h),d===44&&(It(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${f}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=f);let b=e.slice(c,p);return i===void 0?It(t,b,r):(a===void 0?It(r,b,!0):n?It(r,a,b.replace(/\\/g,"")):It(r,a,b),It(t,i,r)),t}function W4(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}TD.exports={format:W4,parse:v4}});var Nm=W((O_e,UD)=>{"use strict";var L4=require("events"),E4=require("https"),R4=require("http"),OD=require("net"),k4=require("tls"),{randomBytes:C4,createHash:T4}=require("crypto"),{Duplex:x_e,Readable:I_e}=require("stream"),{URL:N_}=require("url"),Tr=ns(),x4=C_(),I4=I_(),{isBlob:O4}=os(),{BINARY_TYPES:xD,CLOSE_TIMEOUT:N4,EMPTY_BUFFER:xm,GUID:M4,kForOnEventAttribute:M_,kListener:j4,kStatusCode:D4,kWebSocket:pe,NOOP:ND}=er(),{EventTarget:{addEventListener:H4,removeEventListener:F4}}=CD(),{format:$4,parse:z4}=Tm(),{toBuffer:U4}=ll(),MD=Symbol("kAborted"),j_=[8,13],nr=["CONNECTING","OPEN","CLOSING","CLOSED"],B4=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,K=class e extends L4{constructor(t,r,n){super(),this._binaryType=xD[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=xm,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),jD(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){xD.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new x4({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new I4(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[pe]=this,s[pe]=this,t[pe]=this,o.on("conclude",q4),o.on("drain",K4),o.on("error",J4),o.on("message",Y4),o.on("ping",X4),o.on("pong",Z4),s.onerror=Q4,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",FD),t.on("data",Om),t.on("end",$D),t.on("error",zD),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Tr.extensionName]&&this._extensions[Tr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Be(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),HD(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){D_(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||xm,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){D_(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||xm,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){D_(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Tr.extensionName]||(o.compress=!1),this._sender.send(t||xm,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Be(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(K,"CONNECTING",{enumerable:!0,value:nr.indexOf("CONNECTING")});Object.defineProperty(K.prototype,"CONNECTING",{enumerable:!0,value:nr.indexOf("CONNECTING")});Object.defineProperty(K,"OPEN",{enumerable:!0,value:nr.indexOf("OPEN")});Object.defineProperty(K.prototype,"OPEN",{enumerable:!0,value:nr.indexOf("OPEN")});Object.defineProperty(K,"CLOSING",{enumerable:!0,value:nr.indexOf("CLOSING")});Object.defineProperty(K.prototype,"CLOSING",{enumerable:!0,value:nr.indexOf("CLOSING")});Object.defineProperty(K,"CLOSED",{enumerable:!0,value:nr.indexOf("CLOSED")});Object.defineProperty(K.prototype,"CLOSED",{enumerable:!0,value:nr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(K.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(K.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[M_])return t[j4];return null},set(t){for(let r of this.listeners(e))if(r[M_]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[M_]:!0})}})});K.prototype.addEventListener=H4;K.prototype.removeEventListener=F4;UD.exports=K;function jD(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:N4,protocolVersion:j_[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!j_.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${j_.join(", ")})`);let s;if(t instanceof N_)s=t;else try{s=new N_(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Im(e,u);return}let d=i?443:80,p=C4(16).toString("base64"),f=i?E4.request:R4.request,b=new Set,h;if(o.createConnection=o.createConnection||(i?V4:G4),o.defaultPort=o.defaultPort||d,o.port=s.port||d,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(h=new Tr({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=$4({[Tr.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!B4.test(u)||b.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");b.add(u)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let u=o.path.split(":");o.socketPath=u[0],o.path=u[1]}let y;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let u=n&&n.headers;if(n={...n,headers:{}},u)for(let[A,S]of Object.entries(u))n.headers[A.toLowerCase()]=S}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,u||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),y=e._req=f(o),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=f(o);o.timeout&&y.on("timeout",()=>{Be(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[MD]||(y=e._req=null,Im(e,u))}),y.on("response",u=>{let A=u.headers.location,S=u.statusCode;if(A&&o.followRedirects&&S>=300&&S<400){if(++e._redirects>o.maxRedirects){Be(e,y,"Maximum redirects exceeded");return}y.abort();let g;try{g=new N_(A,t)}catch{let w=new SyntaxError(`Invalid URL: ${A}`);Im(e,w);return}jD(e,g,r,n)}else e.emit("unexpected-response",y,u)||Be(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,A,S)=>{if(e.emit("upgrade",u),e.readyState!==K.CONNECTING)return;y=e._req=null;let g=u.headers.upgrade;if(g===void 0||g.toLowerCase()!=="websocket"){Be(e,A,"Invalid Upgrade header");return}let _=T4("sha1").update(p+M4).digest("base64");if(u.headers["sec-websocket-accept"]!==_){Be(e,A,"Invalid Sec-WebSocket-Accept header");return}let w=u.headers["sec-websocket-protocol"],v;if(w!==void 0?b.size?b.has(w)||(v="Server sent an invalid subprotocol"):v="Server sent a subprotocol but none was requested":b.size&&(v="Server sent no subprotocol"),v){Be(e,A,v);return}w&&(e._protocol=w);let E=u.headers["sec-websocket-extensions"];if(E!==void 0){if(!h){Be(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=z4(E)}catch{Be(e,A,"Invalid Sec-WebSocket-Extensions header");return}let C=Object.keys(R);if(C.length!==1||C[0]!==Tr.extensionName){Be(e,A,"Server indicated an extension that was not requested");return}try{h.accept(R[Tr.extensionName])}catch{Be(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Tr.extensionName]=h}e.setSocket(A,S,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(y,e):y.end()}function Im(e,t){e._readyState=K.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function G4(e){return e.path=e.socketPath,OD.connect(e)}function V4(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=OD.isIP(e.host)?"":e.host),k4.connect(e)}function Be(e,t,r){e._readyState=K.CLOSING;let n=new Error(r);Error.captureStackTrace(n,Be),t.setHeader?(t[MD]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Im,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function D_(e,t,r){if(t){let n=O4(t)?t.size:U4(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${nr[e.readyState]})`);process.nextTick(r,n)}}function q4(e,t){let r=this[pe];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[pe]!==void 0&&(r._socket.removeListener("data",Om),process.nextTick(DD,r._socket),e===1005?r.close():r.close(e,t))}function K4(){let e=this[pe];e.isPaused||e._socket.resume()}function J4(e){let t=this[pe];t._socket[pe]!==void 0&&(t._socket.removeListener("data",Om),process.nextTick(DD,t._socket),t.close(e[D4])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function ID(){this[pe].emitClose()}function Y4(e,t){this[pe].emit("message",e,t)}function X4(e){let t=this[pe];t._autoPong&&t.pong(e,!this._isServer,ND),t.emit("ping",e)}function Z4(e){this[pe].emit("pong",e)}function DD(e){e.resume()}function Q4(e){let t=this[pe];t.readyState!==K.CLOSED&&(t.readyState===K.OPEN&&(t._readyState=K.CLOSING,HD(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function HD(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function FD(){let e=this[pe];if(this.removeListener("close",FD),this.removeListener("data",Om),this.removeListener("end",$D),e._readyState=K.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[pe]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",ID),e._receiver.on("finish",ID))}function Om(e){this[pe]._receiver.write(e)||this.pause()}function $D(){let e=this[pe];e._readyState=K.CLOSING,e._receiver.end(),this.end()}function zD(){let e=this[pe];this.removeListener("error",zD),this.on("error",ND),e&&(e._readyState=K.CLOSING,this.destroy())}});var qD=W((M_e,VD)=>{"use strict";var N_e=Nm(),{Duplex:e3}=require("stream");function BD(e){e.emit("close")}function t3(){!this.destroyed&&this._writableState.finished&&this.destroy()}function GD(e){this.removeListener("error",GD),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function r3(e,t){let r=!0,n=new e3({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(BD,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(BD,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",t3),n.on("error",GD),n}VD.exports=r3});var H_=W((j_e,KD)=>{"use strict";var{tokenChars:n3}=os();function o3(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&n3[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}KD.exports={parse:o3}});var tH=W((H_e,eH)=>{"use strict";var s3=require("events"),Mm=require("http"),{Duplex:D_e}=require("stream"),{createHash:i3}=require("crypto"),JD=Tm(),Nn=ns(),a3=H_(),l3=Nm(),{CLOSE_TIMEOUT:c3,GUID:d3,kWebSocket:u3}=er(),p3=/^[+/0-9A-Za-z]{22}==$/,YD=0,XD=1,QD=2,F_=class extends s3{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:c3,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:l3,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Mm.createServer((n,o)=>{let s=Mm.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=m3(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=YD}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===QD){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(ml,this);return}if(t&&this.once("close",t),this._state!==XD)if(this._state=XD,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(ml,this):process.nextTick(ml,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{ml(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",ZD);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Mn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Mn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!p3.test(s)){Mn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Mn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){gl(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=a3.parse(c)}catch{Mn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],f={};if(this.options.perMessageDeflate&&p!==void 0){let b=new Nn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=JD.parse(p);h[Nn.extensionName]&&(b.accept(h[Nn.extensionName]),f[Nn.extensionName]=b)}catch{Mn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let b={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(b,(h,y,u,A)=>{if(!h)return gl(r,y||401,u,A);this.completeUpgrade(f,s,d,t,r,n,o)});return}if(!this.options.verifyClient(b))return gl(r,401)}this.completeUpgrade(f,s,d,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[u3])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>YD)return gl(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${i3("sha1").update(r+d3).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(n.size){let f=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;f&&(d.push(`Sec-WebSocket-Protocol: ${f}`),p._protocol=f)}if(t[Nn.extensionName]){let f=t[Nn.extensionName].params,b=JD.format({[Nn.extensionName]:[f]});d.push(`Sec-WebSocket-Extensions: ${b}`),p._extensions=t}this.emit("headers",d,o),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",ZD),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(ml,this)})),a(p,o)}};eH.exports=F_;function m3(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function ml(e){e._state=QD,e.emit("close")}function ZD(){this.destroy()}function gl(e,t,r,n){r=r||Mm.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Mm.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function Mn(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,Mn),e.emit("wsClientError",i,r,t)}else gl(r,n,o,s)}});var g3,f3,h3,y3,S3,A3,rH,b3,fl,nH=l(()=>{g3=m(qD(),1),f3=m(Tm(),1),h3=m(ns(),1),y3=m(C_(),1),S3=m(I_(),1),A3=m(H_(),1),rH=m(Nm(),1),b3=m(tH(),1),fl=rH.default});var $_,z_,U_=l(()=>{"use strict";$_="AGENT_WITCH_EXTERNAL_BRIDGE",z_="AGENT_WITCH_EXTERNAL_LIVE"});var B_,oH=l(()=>{"use strict";B_=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var P3,G_,sH=l(()=>{"use strict";U_();oH();P3=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",G_=(e={})=>{let t=e.env??process.env,r=B_(t[$_]),n=B_(t[z_]);return{mode:P3(r,n),skipInProcessBridge:r,skipInProcessLive:n}}});var iH=l(()=>{"use strict";U_()});var aH=l(()=>{"use strict";sH();iH()});var V_=l(()=>{"use strict"});var or,hl=l(()=>{"use strict";or=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var cs,jn,lH,w3,q_,K_,cH,dH,J_,uH,yl,Y_=l(()=>{"use strict";cs=m(require("node:fs")),jn=m(require("node:os")),lH=m(require("node:path"));V_();hl();w3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),q_=(e=jn.default.hostname())=>lH.default.join(jn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),K_=e=>{if(!cs.default.existsSync(e))return null;try{let t=JSON.parse(cs.default.readFileSync(e,"utf8"));return!w3(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},cH=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},dH=(e,t)=>{cs.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},J_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??q_(),n=K_(r);if(n!==null&&n.pid!==process.pid&&or(n.pid)&&cH(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:jn.default.hostname(),macOsUsername:jn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return dH(r,o),{ok:!0}},uH=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??q_(),n=K_(r);return n!==null&&n.pid!==process.pid&&or(n.pid)&&cH(n)?{ok:!1}:(dH(r,{hostname:jn.default.hostname(),macOsUsername:jn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},yl=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??q_();K_(r)?.pid===process.pid&&cs.default.existsSync(r)&&cs.default.unlinkSync(r)}});var X_,Sl,v3,W3,L3,E3,Z_,pH=l(()=>{"use strict";X_=require("node:child_process"),Sl=m(require("node:path"));hl();od();v3=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),W3=(e,t)=>{if(v3(e)||!/\bnode\b/.test(e))return!1;let r=Sl.default.resolve(t),n=Sl.default.join(r,"app",Ms),o=Sl.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Ms||i==="agent-witch.ts")return e.includes(r);try{let a=Sl.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},L3=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,X_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},E3=(e,t,r)=>{let n=L3(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||W3(d,t)&&o.push(c)}return o},Z_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,X_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=E3(r,e.installDir,t),o=[];for(let s of n)if(or(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var Al,bl,mH,R3,Q_,gH=l(()=>{"use strict";Al=m(require("node:fs")),bl=m(require("node:path"));Pe();mH=(e,t)=>{!Al.default.existsSync(e)||Al.default.existsSync(t)||(Al.default.mkdirSync(bl.default.dirname(t),{recursive:!0}),Al.default.renameSync(e,t))},R3=e=>{if(e.profileEmail===null)return;let t=bl.default.join(e.installDir,rt);mH(bl.default.join(t,Bn),e.mainLogPath),mH(bl.default.join(t,Gn),e.errorLogPath)},Q_=e=>{let t=N();e!==void 0&&t.installDir!==e||R3(t)}});var k3,fH=l(()=>{"use strict";Zi();$u();$u();k3={};!it()&&qr(k3.url)&&(async()=>{$e("agent-witch-wake-server");let e=await fn(),t=Ht(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var hH=l(()=>{"use strict";fH()});var yH=l(()=>{"use strict";Di()});var ew,SH=l(()=>{"use strict";V_();hH();Y_();yH();ew=async(e={})=>{let t=e.skipInProcessBridge?null:await Fu();Au();let r=setInterval(()=>{Au()},6e4),n=setInterval(()=>{if(!uH().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t?.close()}}}});var Pl,jm,x3,AH,bH,Dm,PH,_H,tw,wH,Hm,vH=l(()=>{"use strict";Pl=m(require("node:fs")),jm=m(require("node:path")),x3="pending-run-inputs.json",AH=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bH=e=>{let t=e.profileEmail?jm.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return jm.default.join(t,x3)},Dm=e=>{let t=bH(e);if(!Pl.default.existsSync(t))return{};try{let r=JSON.parse(Pl.default.readFileSync(t,"utf8"));return AH(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!AH(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},PH=(e,t)=>{let r=bH(e);Pl.default.mkdirSync(jm.default.dirname(r),{recursive:!0}),Pl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},_H=e=>Object.values(Dm(e)),tw=(e,t)=>Dm(e)[t]!==void 0,wH=(e,t)=>{let r=Dm(e);r[t.agentRunId]=t,PH(e,r)},Hm=(e,t)=>{let r=Dm(e);delete r[t],PH(e,r)}});var Fm=l(()=>{"use strict";ie()});var WH=l(()=>{"use strict";ie()});var $m=l(()=>{"use strict";ie()});var zm=l(()=>{"use strict";ie()});var _l=l(()=>{"use strict";ie()});var I3,O3,wl,rw=l(()=>{"use strict";lt();Fm();WH();$m();zm();_l();I3={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},O3={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},wl=e=>{if(!oe(e.writerAgent))return"the selected writer";let t=ze(e.writerAgent);if(ve(e.writerExecutionBackend)==="api"&&t!==null){let r=Ne(me(e.configPath),t);if(r!==null&&r.apiKey.length>0){let n=ni(t,r.model);return`${O3[t]} model ${n}`}}return I3[e.writerAgent]}});var N3,M3,LH,EH,RH=l(()=>{"use strict";N3=/"input_tokens"\s*:\s*(\d+)/,M3=/"output_tokens"\s*:\s*(\d+)/,LH=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},EH=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=LH(N3.exec(t)),n=LH(M3.exec(t));if(r===null||n===null)return null;let o=r+n;return o>=1?o:null}});var Um=l(()=>{"use strict";ut()});var vl,Bm,j3,nw,kH,CH,TH,ow,xH=l(()=>{"use strict";vl=m(require("node:fs")),Bm=m(require("node:path"));Um();j3="run-completion-outbox.json",nw=e=>{let t=e.profileEmail?Bm.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Bm.default.join(t,j3)},kH=e=>{let t=nw(e);if(!vl.default.existsSync(t))return[];try{let r=JSON.parse(vl.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},CH=(e,t)=>{vl.default.mkdirSync(Bm.default.dirname(nw(e)),{recursive:!0}),vl.default.writeFileSync(nw(e),JSON.stringify(t,null,2),"utf8")},TH=(e,t)=>{let r=[...kH(e).filter(n=>n.runId!==t.runId),t];CH(e,r)},ow=async e=>{if(e.cloudApi===null)return;let t=kH(e.layout);if(t.length===0)return;let r=[];for(let n of t)await xi(e.cloudApi,n.runId,n.exitCode,n.output,{estimateSeconds:n.estimateSeconds,actualSeconds:n.actualSeconds})||r.push(n);CH(e.layout,r)}});var IH=l(()=>{"use strict"});var sw,Wl,H3,Dn,OH=l(()=>{"use strict";IH();sw=new Map,Wl=e=>{let t=sw.get(e);t!==void 0&&(clearInterval(t),sw.delete(e))},H3=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},Dn=(e,t,r,n={})=>{Wl(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){Wl(t);return}let i=n.onTick?.()??{};H3(e,t,o,i)};s(),sw.set(t,setInterval(s,15e3))}});var NH=l(()=>{"use strict";ut()});var MH,jH=l(()=>{"use strict";NH();MH=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Ve(t)}});var iw,Ll,sr,aw,Ot,DH,Gm=l(()=>{"use strict";iw=new Set,Ll=new Map,sr=(e,t)=>{if(t.length===0)return;let r=Ll.get(e)??[];r.push(t),Ll.set(e,r)},aw=e=>{iw.add(e);let t=Ll.get(e)??[];return Ll.delete(e),t},Ot=e=>iw.has(e),DH=e=>{iw.delete(e),Ll.delete(e)}});var Vm,HH,F3,FH,$H=l(()=>{"use strict";Vm=m(require("node:path")),HH=require("node:url");Jn();F3={},FH=()=>{if(it()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Vm.default.dirname(Vm.default.resolve(e))}return Vm.default.dirname((0,HH.fileURLToPath)(F3.url))}});var zH,UH,BH,GH,Fe,ds,VH,qH,us,lw,cw,dw,KH,uw,JH,qm=l(()=>{"use strict";zH=require("node:crypto"),UH=m(require("node:fs")),BH=m(require("node:path")),GH=require("node:url");hl();Jn();$H();Fe=new Map,VH=async()=>{if(ds!==void 0)return ds;try{if(it()){let e=FH(),t=BH.default.join(e,"deps","node-pty","lib","index.js");if(UH.default.existsSync(t)){let r=await import((0,GH.pathToFileURL)(t).href);return ds=r,r}}return ds=await import("node-pty"),ds}catch{return ds=null,null}},qH=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},us=(e,t,r)=>{let n=Fe.get(e);if(n!==void 0){Fe.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},lw=(e,t)=>{let r=Fe.get(e);return r===void 0?!1:(r.pty.write(t),!0)},cw=(e,t,r)=>{let n=Fe.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},dw=e=>{for(let t of Fe.values())if(!(t.mode!=="agent"||t.runId!==e))return or(t.pty.pid);return!1},KH=e=>{for(let[t,r]of Fe.entries())if(!(r.mode!=="agent"||r.runId!==e)){Fe.delete(t);try{r.pty.kill()}catch{}return!0}return!1},uw=async e=>{let t=await VH();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;Fe.get(e.shellSessionId)!==void 0&&us(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Fe.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{qH(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{Fe.get(e.shellSessionId)?.pty===o&&(Fe.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},JH=async e=>{let t=e.shellSessionId??(0,zH.randomUUID)(),r=await VH();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return Fe.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{qH(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{Fe.get(t)?.pty===n&&(Fe.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var Km,YH,XH=l(()=>{"use strict";Km="[[AWAITING_INPUT]]",YH=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Km,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var El,ZH,Jm=l(()=>{"use strict";XH();El=e=>{let t=e.indexOf(Km);if(t<0)return null;let n=e.slice(t+Km.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},ZH=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",YH].join(`
`)});var QH,eF=l(()=>{"use strict";Gm();qm();Jm();QH=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(Ot(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}sr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await JH({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=El(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var tF,rF,nF,ir,Ym=l(()=>{"use strict";tF=require("node:child_process"),rF=m(require("node:fs")),nF=m(require("node:path"));od();ir=(e,t)=>{let r=nF.default.join(e,"app",vL,"ensure-writer.sh");return rF.default.existsSync(r)?new Promise((n,o)=>{let s=(0,tF.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var oF,Hn,kl,Xm,pw,Rl,Zm,Qm,mw,gw,$3,ps,z3,U3,fw,hw=l(()=>{"use strict";oF=require("node:child_process");lt();Ym();$m();Fm();_l();zm();Hn=new Map,kl=e=>e==="cursor"||e==="antigravity",Xm=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",pw=e=>Hn.get(e)?.warmed===!0,Rl=e=>{let t=Hn.get(e);Hn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Zm=e=>Hn.get(e)?.conversationStarted===!0,Qm=e=>{let t=Hn.get(e);Hn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},mw=e=>{Hn.delete(e)},gw=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",$3={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ps=e=>`${$3[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,z3=(e,t,r,n)=>new Promise(o=>{let s=yd(t,r),i=[],a=(0,oF.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),n?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{o({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{o({exitCode:-1,output:d.message})})}),U3=(e,t)=>{let r=ps(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},fw=async e=>{if(!oe(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&ve(e.runConfig.writerExecutionBackend)==="api"){let r=ze(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let n=me(e.runConfig.layout.configPath);return Ne(n,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Rl(e.writerAgent),{exitCode:0,output:ps(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await ir(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}kl(e.writerAgent)&&Rl(e.writerAgent);let t=await z3(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?U3(e.writerAgent,t.output):ps(e.writerAgent)}}});var Fn,yw=l(()=>{"use strict";Fn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var sF,B3,G3,iF,V3,Sw,aF=l(()=>{"use strict";yw();sF=/you(?:'|')ve hit your session limit/i,B3=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],G3=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,iF=(e,t)=>{for(let r of e.split(/\r?\n/)){let n=r.trim();if(n.length>0&&t.test(n))return n}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},V3=e=>{let t=G3.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},Sw=e=>{let t=e.trim();if(t.length===0)return null;if(sF.test(t))return{code:Fn.SESSION_LIMIT,resetHint:V3(t),matchedLine:iF(t,sF)};for(let r of B3)if(r.test(t))return{code:Fn.PROVIDER_QUOTA,resetHint:null,matchedLine:iF(t,r)};return null}});var eg,tg,Aw,bw=l(()=>{"use strict";eg="[[AGENT_RUN_WRITER_EXECUTION]]",tg="cli-writer-api-key-missing",Aw="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var Pw=l(()=>{"use strict";bw()});var lF=l(()=>{"use strict";Pw()});var rg=l(()=>{"use strict";yw();aF();bw();Pw();lF()});var ng,cF=l(()=>{"use strict";ng={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var dF,uF=l(()=>{"use strict";dF="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var pF,mF=l(()=>{"use strict";rg();uF();pF=e=>e.code===Fn.SESSION_LIMIT?dF:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var gF,fF=l(()=>{"use strict";rg();cF();mF();gF=e=>{let t=Sw(e.output);return t!==null?{status:ng.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:pF(t)}:{status:e.exitCode===0?ng.COMPLETED:ng.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var _w,qve,hF=l(()=>{"use strict";_w={OPEN:"open",APPROVAL:"approval"},qve=_w.APPROVAL});var ms,og,yF,J3,SF,AF,bF,Cl,ww,vw=l(()=>{"use strict";ms=m(require("node:fs")),og=m(require("node:path")),yF="runs",J3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),SF=e=>{let t=e.profileEmail!==null?og.default.join(e.installDir,"profiles",e.profileEmail,yF):og.default.join(e.installDir,yF);return ms.default.mkdirSync(t,{recursive:!0}),t},AF=(e,t)=>og.default.join(SF(e),`${t}.json`),bF=(e,t)=>{ms.default.writeFileSync(AF(e,t.id),JSON.stringify(t,null,2))},Cl=(e,t)=>{let r=AF(e,t);if(!ms.default.existsSync(r))return null;try{let n=JSON.parse(ms.default.readFileSync(r,"utf8"));return!J3(n)||typeof n.id!="string"?null:n}catch{return null}},ww=e=>{let t=SF(e),r=ms.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=Cl(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var Y3,PF,_F=l(()=>{"use strict";fF();hF();vw();Y3=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",n=gF({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:n.status,dispatchPolicy:_w.OPEN,resultOutput:e.output,resultExitCode:n.resultExitCode,resultOutcomeCode:n.resultOutcomeCode,denialReason:n.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},PF=(e,t)=>{let r=Y3(t);return bF(e,r),r}});var wF=l(()=>{"use strict";hm()});var vF,WF=l(()=>{"use strict";rg();vF=()=>[eg,`agentRunWriterExecutionBackend=${tg}`,`agentRunWriterExecutionReasonCode=${Aw}`].join(`
`)});var xr,sg=l(()=>{"use strict";xr=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Ww,X3,Z3,LF,EF=l(()=>{"use strict";Ww=e=>e.toLocaleString("en-US"),X3=e=>e<.01?e.toFixed(4):e.toFixed(3),Z3=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${X3(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Ww(e.inputTokens)} in / ${Ww(e.outputTokens)} out (${Ww(e.totalTokens)} total)`,t].join(`
`)},LF=(e,t)=>{if(t===void 0)return e;let r=Z3(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var RF=l(()=>{"use strict";ie()});var CF,Tl,ce,Lw,ig,kF,Q3,eJ,TF,xF,IF,xl,Ew,Rw,kw,OF,tJ,tt,Il,Ir,NF,rJ,nJ,ag,Cw,Tw,xw,MF=l(()=>{"use strict";CF=require("node:child_process");ie();lt();vH();Xa();rw();RH();Sd();xH();Um();OH();hl();jH();Gm();qm();Jm();eF();hw();_F();wF();WF();sg();EF();eo();RF();_l();$s();Jm();Tl=new Map,ce=new Map,Lw=new Set,ig=new Map,kF=e=>{e!==void 0&&!ig.has(e)&&ig.set(e,Date.now())},Q3=(e,t,r,n)=>{let o=n.endsWith(`
`)?n:`${n}
`;if(Ot(t)){tt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:o},requestId:r});return}sr(t,o)},eJ=(e,t,r,n,o)=>{if(!$h(e,o))return;let s=`${vF()}
`;Q3(t,r,n,s);let i=ce.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},TF=130,xF=`

Stopped by user.`,IF=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:xr(e)},xl=null,Ew=e=>{xl=e},Rw=(e,t)=>{if(xl===null)return;let r=LP(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||Hy(xl,t,r)},kw=async e=>{await ow({layout:e,cloudApi:xl})},OF=e=>{let t=Tl.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:or(t.pid)},tJ=e=>se({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),tt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Il=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Kn(s),c=ce.get(r);if(a!==null&&c!==void 0){let d=OL(a),p=OF(r)||dw(r);d!==null&&!p&&Ir(e,t,r,n,d.exitCode,d.output,c.originalPrompt)}return IL(a)}}),Ir=(e,t,r,n,o,s,i,a)=>{let c=ao(s,a),d=o,p=LF(c.output,c.llmUsage);if(r!==void 0){let b=ig.get(r);ig.delete(r),b!==void 0&&vP({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-b)/1e3))});let h=EH(c.llmUsage,p);h!==null&&qM({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&Lw.has(r)&&(Lw.delete(r),d=TF,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${xF}`:"Stopped by user.");let f=r!==void 0?LP(e.layout.reportsDir,r):null;if(r!==void 0){Wl(r),ui(e.layout,r),Ot(r)&&(tt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),DH(r));let b=ce.get(r);BM({reportsDir:e.layout.reportsDir,agentRunId:r,input:xr(i),output:p,...b!==void 0?{writerLabel:wl({writerAgent:b.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),b!==void 0&&gm({layout:e.layout,writerAgent:b.writerAgent,projectFolderPath:b.projectFolderPath,userPrompt:b.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),PF(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),TH(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{}}),ow({layout:e.layout,cloudApi:xl}),ce.delete(r),Tl.delete(r),Hm(e.layout,r)}tt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:n}),Ys(e.layout)},NF=(e,t,r,n,o,s,i)=>{let a=ce.get(r),c=a?.accumulatedOutput??s;wH(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),Dn(t,r,()=>tw(e.layout,r),Il(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),tt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},rJ=(e,t,r,n,o,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(o===void 0||h.length===0)){if(Ot(o)){tt(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:h},requestId:n});return}sr(o,h)}};if(o!==void 0){let h=ce.get(o);Tl.set(o,t),ce.set(o,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),tt(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),Dn(r,o,()=>OF(o),Il(e,r,o,n,h?.projectFolderPath,h?.reportKey))}let f=a==="claude-cli",b=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(f?b.push(y):(c.push(y),p(y)),d||o===void 0)return;let u=El(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let A=ce.get(o),S=[A?.accumulatedOutput??"",u.partialOutput].filter(g=>g.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=S),Tl.delete(o),NF(e,r,o,n,u.question,S,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;Qm(a);let y=o!==void 0?ce.get(o):void 0,u=f?ao(b.join("")):{output:c.join("").trim(),llmUsage:void 0},A=f?c.join("").trim():"",S=[u.output.trim(),A].filter(_=>_.length>0).join(`
`);f&&u.output.trim().length>0&&p(u.output);let g=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${S}`.trim():S;Ir(e,r,o,n,h??-1,g,s,u.llmUsage)}),t.on("error",h=>{d||Ir(e,r,o,n,-1,h.message,s)})},nJ=(e,t,r,n,o,s,i,a,c)=>{let d=IF(r,c);s!==void 0&&(ce.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),tt(o,{type:"terminal.stream.start",payload:{runId:s},requestId:n}),Dn(o,s,()=>ce.has(s),Il(e,o,s,n,i,a))),ai(e,t,r,f=>{if(!(s===void 0||f.length===0)){if(Ot(s)){tt(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:f},requestId:n});return}sr(s,f)}}).then(f=>{Qm(t),Ir(e,o,s,n,f.exitCode,f.output,r,f.llmUsage)}).catch(f=>{let b=f instanceof Error?f.message:String(f);Ir(e,o,s,n,-1,b,r)})},ag=(e,t,r,n,o,s,i,a,c,d,p,f)=>{let b=IF(r,p);if(Js(e.layout),tn(e,t)){kF(s),nJ(e,t,r,n,o,s,c,d,b);return}let h=_t(t,r,tJ(e),i);if(h===null){Ir(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}kF(s);let y=MH({workspace:e.workspace,projectFolderPath:c}),u=()=>{let A=(0,CF.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:f??process.env});rJ(e,A,o,n,s,r,b,t)};if(s===void 0){u();return}ce.set(s,{originalPrompt:r,userTranscriptPrompt:b,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:ce.get(s)?.accumulatedOutput??""}),eJ(e,o,s,n,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Fs({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Dn(o,s,()=>ce.has(s),Il(e,o,s,n,c,d)),QH({socket:o,sendMessage:tt,requestId:n,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:f,originalPrompt:r,writerAgent:t,onInputRequired:A=>{a!==void 0&&us(a,_=>{tt(o,_)},n);let S=ce.get(s),g=[S?.accumulatedOutput??"",A.partialOutput].filter(_=>_.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=g),NF(e,o,s,n,A.question,g,r)},onFinished:(A,S)=>{Qm(t);let g=ao(S),_=ce.get(s),w=_!==void 0&&_.accumulatedOutput.length>0?`${_.accumulatedOutput}

${g.output}`.trim():g.output;Ir(e,o,s,n,A,w,r,g.llmUsage)}}).then(A=>{if(!A){u();return}Dn(o,s,()=>dw(s),Il(e,o,s,n,c,d))}).catch(A=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",A instanceof Error?A.message:A),u()})},Cw=(e,t,r,n)=>{Hm(e.layout,t.agentRunId),t.shellSessionId!==void 0&&tt(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=ZH(t),s=ce.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;ag(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},Tw=(e,t)=>{for(let r of _H(e.layout))ce.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:xr(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Dn(t,r.agentRunId,()=>tw(e.layout,r.agentRunId),{awaitingInput:!0}),tt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},xw=(e,t,r,n)=>{let o=ce.get(r);if(o===void 0)return!1;Lw.add(r),Wl(r);let s=Tl.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(KH(r))return!0;Hm(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${xF}`:"Stopped by user.";return Ir(e,t,r,n,TF,i,o.originalPrompt),!0}});var oJ,Iw,jF=l(()=>{"use strict";fi();oJ=()=>`http://127.0.0.1:${ct()}/restart`,Iw=async()=>{try{let e=await fetch(oJ(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var DF=l(()=>{"use strict";na()});var HF=l(()=>{"use strict";t_()});var FF,$F=l(()=>{"use strict";FF=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Ol,sJ,Ow,zF=l(()=>{"use strict";B();ee();DF();vS();HF();$F();eo();Ol=(e,t)=>{_r(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},sJ=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(nh(),rh)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},Ow=async e=>{let t=_e(e.layout.installDir)?.bundleVersion??null;if(!FF({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(at(e.layout)){Xs({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Ol(e.layout,{summary:r,action:"install-bundle-update-start"}),Dt({launchAgentLabel:te(e.layout.installDir),installDir:e.layout.installDir});let n=await es({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),Ol(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await sJ();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Ol(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),Ol(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),Ol(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var iJ,Nw,UF=l(()=>{"use strict";iJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nw=e=>{if(!iJ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Mw,jw,BF=l(()=>{"use strict";oS();sS();Mw=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Hi({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},jw=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await qt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var GF,aJ,lJ,cJ,Nl,VF=l(()=>{"use strict";GF=m(require("node:os"));Pe();aJ="Default",lJ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),cJ=e=>{let t=GF.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Nl=()=>{let e=N(),t=qc(e),r=lJ(aJ);return`${cJ(t)}/${r.length>0?r:"project"}`}});var qF=l(()=>{"use strict";na()});var KF,Dw,JF=l(()=>{"use strict";qF();KF=!1,Dw=e=>{KF||(KF=!0,process.on("uncaughtException",t=>{yn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;yn(e,{kind:"crash",message:r,stack:n})}))}});var YF,dJ,Hw,XF=l(()=>{"use strict";YF=require("node:child_process");Ym();lt();$m();Fm();_l();zm();dJ=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,YF.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},Hw=async e=>{if(!oe(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&ve(e.runConfig.writerExecutionBackend)==="api"){let r=ze(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let n=me(e.layout.configPath),o=Ne(n,r),s=o!==null&&o.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await ir(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await dJ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var Fw,ZF=l(()=>{"use strict";Fw=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var QF,$w,e$=l(()=>{"use strict";QF=require("node:crypto"),$w=()=>(0,QF.randomUUID)()});var gs,t$,lg=l(()=>{"use strict";gs="[[WORKING_ESTIMATE]]",t$=(e,t,r,n="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",gs,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var r$,n$=l(()=>{"use strict";r$=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var uJ,o$,s$=l(()=>{"use strict";lg();uJ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,o$=e=>{if(!e.includes(gs))return null;let t=null;for(let r of e.matchAll(uJ)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var pJ,zw,i$=l(()=>{"use strict";s$();pJ=/^(\d{1,6})\b/,zw=e=>{let t=o$(e);if(t!==null)return t;let r=pJ.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return!Number.isFinite(n)||n<=0?null:n}});var mJ,gJ,fJ,cg,Uw=l(()=>{"use strict";lt();ea();mJ="http://127.0.0.1:11434",gJ=45e3,fJ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},cg=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||mJ,n=t===void 0?(await mt({commands:se({})})).estimateModel:t;if(n===null||n.trim().length===0)return null;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:n,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(gJ)});return o.ok?fJ(await o.json()):null}catch{return null}}});var Bw,Gw,Vw,a$=l(()=>{"use strict";$s();lg();sg();n$();i$();Xa();Uw();Bw=async e=>{let t=xr(e.wrappedPrompt),r=GM(e.reportsDir);return{estimateOutput:await cg(t$(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},Gw=e=>{let t=zw(e.estimateOutput);t!==null&&am({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},Vw=e=>{let t=zw(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=r$(t);return Hs({reportKey:e.reportKey,agentRunId:e.agentRunId,status:bt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),am({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var dg,l$,qw=l(()=>{"use strict";dg="[[WORKING_TOKEN_ESTIMATE]]",l$=(e,t,r,n="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",dg,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var c$,hJ,d$,u$=l(()=>{"use strict";qw();c$=/^(\d{1,8})\b/,hJ=e=>{let t=e.indexOf(dg);if(t<0)return null;let r=e.slice(t+dg.length).trim(),n=c$.exec(r);if(n===null)return null;let o=Number.parseInt(n[1]??"",10);return Number.isFinite(o)&&o>=1?o:null},d$=e=>{let t=hJ(e);if(t!==null)return t;let r=c$.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return Number.isFinite(n)&&n>=1?n:null}});var Kw,Jw,p$=l(()=>{"use strict";qw();sg();u$();Xa();Uw();Kw=async e=>{let t=xr(e.wrappedPrompt),r=KM(e.reportsDir);return{estimateOutput:await cg(l$(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},Jw=e=>{let t=d$(e.estimateOutput);return t===null?null:(VM({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var m$=l(()=>{"use strict";Y_();pH();gH();SH();fi();MF();Ym();lt();vw();Gm();jF();mS();zF();eo();UF();BF();Um();VF();JF();XF();sd();ZF();e$();lg();$s();a$();p$();rw();ea();qm();hw()});var g$={};yt(g$,{buildContinuationPromptWithContext:()=>AJ});var yJ,SJ,AJ,f$=l(()=>{"use strict";yJ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,SJ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),AJ=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=SJ(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${yJ(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var h$={};yt(h$,{readHarnessExportSets:()=>PJ});var Ml,Yw,ug,bJ,PJ,y$=l(()=>{"use strict";Ml=m(require("node:fs")),Yw=m(require("node:path"));Pe();ug=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bJ=e=>{if(!Ml.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Ml.default.readFileSync(e.harnessManifestPath,"utf8"));if(ug(t))return t}catch{return null}return null},PJ=(e,t)=>{let r=N(t),n=bJ(r);if(n===null)return[];let o=ug(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!ug(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!ug(p))continue;let f=typeof p.path=="string"?p.path:void 0,b=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(f===void 0||b.length===0||h.length===0||y.length===0)continue;let u=f.startsWith("shared/")?Yw.default.join(r.harnessRootDir,f):Yw.default.join(r.harnessSetsDir,i,f);Ml.default.existsSync(u)&&d.push({id:b,kind:h,title:y,content:Ml.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var nv,Zw,fs,S$,_J,A$,b$,Xw,P$,Qw,ev,tv,J,U,rv,wJ,jl,vJ,WJ,LJ,EJ,RJ,kJ,CJ,TJ,Dl,_$=l(()=>{"use strict";nv=require("node:child_process"),Zw=m(require("node:fs")),fs=m(require("node:os"));nH();B();ee();Po();m_();aH();ie();Ge();na();OA();_m();hm();ut();an();NS();zt();m$();S$=3e4,_J=3e4,A$=new Map,b$=new Map,Xw=new Map,P$=new Map,Qw=new Map,ev=new Map,tv=new Map,J=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),U=(e,t,r)=>{e.readyState===fl.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(_r(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),zu(r,"out",t)))},rv=e=>e,wJ=e=>{if(!Zw.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Zw.default.readFileSync(e.harnessManifestPath,"utf8"));if(J(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},jl=(e,t)=>{let r=wJ(t);r!==null&&U(e,{type:"harness.manifest.report",payload:{hostname:fs.default.hostname(),manifest:r}})},vJ=async(e,t,r,n,o,s,i=!1,a,c,d,p,f)=>{let b=f?.trim()??"";if(!oe(t)){U(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let h=wl({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await mt({commands:se({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?Bw({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=s!==void 0?Kw({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,S=kl(t)&&!pw(t);if(S){try{await ir(e.layout.installDir,t)}catch($){let Oe=$ instanceof Error?$.message:String($);U(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Oe}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Rl(t)}else if(!kl(t))try{await ir(e.layout.installDir,t)}catch($){let Oe=$ instanceof Error?$.message:String($);U(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Oe}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let g=ci(d,Nl,f);if(g===null){U(o,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Ue({projectFolderPath:g,...b.length>0?{projectId:b}:{}}),i||rl(e.layout,t,g);let _=fm({sessionContinuation:i,supportsWriterSessionContinuation:Xm(t),isWriterConversationStarted:Zm(t)}),w=i&&_==="first"?tl(e.layout,t,g):null,v=w!==null?Qo(e.layout,w):null,E=v!==null&&v.turns.length>0,R=$P({sessionContinuation:i,supportsWriterSessionContinuation:Xm(t),isWriterConversationStarted:Zm(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:E,userPromptCharacterCount:r.length}),C=r;if(R.continuationStrategy==="source_run_seed"){let $=typeof c=="string"&&c.length>0?Cl(e.layout,c):null;if($!==null){let{buildContinuationPromptWithContext:Oe}=await Promise.resolve().then(()=>(f$(),g$));C=Oe({priorPrompt:$.prompt,priorOutput:$.resultOutput??"",userMessage:r})}}else R.continuationStrategy==="transcript_seed"&&v!==null&&v.turns.length>0&&(C=dm({priorTurns:v.turns,userMessage:r}));let I=R.ragLimit>0?await xo({layout:e.layout,query:C,limit:R.ragLimit,minScore:R.ragMinScore,projectFolderPath:g,...b.length>0?{projectId:b}:{}}):[],D=R.ragLimit>0&&g.trim().length>0?await xA({layout:e.layout,query:C,limit:2,minScore:.32,projectFolderPath:g,...b.length>0?{projectId:b}:{}}):[],ae=R.injectMemory?TP(e.layout,g,b.length>0?b:void 0):[],q=`${IP(ae,R.memoryEntryLimit)}${kA(I)}${IA(D)}${C}`,H=p?.trim()??(s!==void 0&&g.trim().length>0?$w():void 0);if(s!==void 0&&H!==void 0&&H.length>0&&g.trim().length>0){Fs({reportKey:H,agentRunId:s,userSummary:"Working on your Mac\u2026"});let $=q;u!==null&&u.then(Oe=>{if(Oe===null)return;let Or=Vw({estimateOutput:Oe.estimateOutput??"",reportKey:H,agentRunId:s,reportsDir:e.layout.reportsDir,task:Oe.task,writerLabel:Oe.writerLabel,embedding:Oe.embedding});if(Or.estimateSeconds===null)return;Rw(e.layout.reportsDir,s);let sv=`${gs}
${Or.estimateSeconds}
`;if(Ot(s)){U(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:sv},requestId:n});return}sr(s,sv)}).catch(()=>{}),q=Fw($),q=Rf(q,{agentRunId:s,reportKey:H,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then($=>{$!==null&&Gw({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel,embedding:$.embedding})}).catch(()=>{}),s!==void 0&&A!==null&&A.then($=>{$!==null&&Jw({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel})}).catch(()=>{});let hs=s!==void 0&&tv.get(s)===!0;if(s!==void 0&&g.trim().length>0){let $=await yu(g);ev.set(s,$),H!==void 0&&H.length>0&&Qw.set(s,H)}ag(e,t,q,n,rv(o),s,{sessionTurn:R.sessionTurn},a,g,H,r,Nh(e.layout,s,hs)),S&&s!==void 0&&U(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:gw(t)},requestId:n})},WJ=async(e,t,r,n,o)=>{let s=(i,a)=>{U(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await fw({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:se({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,U(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:n})}}),c=oe(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?ps(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},LJ=(e,t,r)=>new Promise(n=>{if(!oe(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=_t(t,r,se({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,nv.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),EJ=async(e,t,r,n)=>{if(t.installMethod!=="deterministic-bundle")return!1;U(n,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let o=vt(t.bundle),s=J(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(o!==null)return o;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=we(e.wsUrl)??Ft,f=await Py({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return f.ok?f.bundle:null})();if(i===null)return U(n,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=sn({bundle:i,layout:e.layout});return U(n,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&jl(n,e.layout),!0},RJ=async(e,t,r,n)=>{if(await EJ(e,t,r,n))return;let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(U(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){U(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!oe(o)){U(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}Js(e.layout);let i=await(async()=>{try{await ir(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return LJ(e,o,s)})().finally(()=>{Ys(e.layout)});U(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),jl(n,e.layout)},kJ=e=>{let t=1e3*2**e;return Math.min(_J,t)},CJ=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(at(e.layout)){Jf(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,Iw().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1})}},n=(u,A="system.ack")=>{if(!t.selfUpdateInFlight){if(at(e.layout)){Xs({layout:e.layout,remoteBundleVersion:u,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,Ow({layout:e.layout,remoteBundleVersion:u,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},o=()=>{let u=ge(e.layout);u!==null&&Ce(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===fl.OPEN||u.readyState===fl.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(o,S$)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=kJ(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},f=u=>{s();let A=()=>{let S=Gs(e.layout.installDir),g=ct();U(u,{type:"agent.heartbeat",payload:{hostname:fs.default.hostname(),macOsUsername:fs.default.userInfo().username,wakeError:t.wakeError,wakePort:g,...e.email!==null?{email:e.email}:{},installBundleVersion:S}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,S$)},b=(u,A)=>{if(typeof u.type!="string")return;if(OS(u)){t.stopped=!0,s(),a(),c(),CS({layout:e.layout}).finally(()=>{yl(),process.exit(0)});return}_r(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),zu(e.layout,"in",u);let S=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&J(u.payload)){let g=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",_=typeof u.payload.origin=="string"?u.payload.origin:"",w=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",v=typeof u.payload.challenge=="string"?u.payload.challenge:"",E=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!p_({serverPublicKey:g,origin:_,devicePublicKey:w,challenge:v,serverAttestation:E})){t.wakeError="Server attestation verification failed",_r(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&J(u.payload)){let g=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";_r(e.layout,{direction:"local",type:"writer.ensure",summary:g,action:"ensure-writer"}),Hw({layout:e.layout,writerAgent:g,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(_=>{U(A,{type:"writer.status",payload:_},e.layout)})}if(u.type==="install.bundle.update"&&J(u.payload)){let g=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";g.length>0&&n(g,"install.bundle.update")}if(u.type==="system.ack"){vu(e.layout,{wsUrl:e.wsUrl});let g=J(u.payload)?u.payload:null,_=Nw(g);_!==null&&n(_)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&J(u.payload)&&Mw(u.payload),u.type==="automations.run"&&J(u.payload)&&jw(u.payload),u.type==="terminal.stream.accepted"&&J(u.payload)){let g=typeof u.payload.runId=="string"?u.payload.runId:"";if(g.length>0){let _=aw(g);for(let w of _)U(A,{type:"terminal.stream.chunk",payload:{runId:g,chunk:w},requestId:S})}}if(u.type==="agent.agentRun.list"&&U(A,{type:"dashboard.agentRun.list.result",payload:{runs:ww(e.layout)},requestId:S}),u.type==="agent.agentRun.get"&&J(u.payload)){let g=typeof u.payload.runId=="string"?u.payload.runId:"",_=g.length>0?Cl(e.layout,g):null;U(A,{type:"dashboard.agentRun.get.result",payload:{run:_},requestId:S})}if(u.type==="command.claude.run"&&J(u.payload)){let g=u.payload.prompt,_=typeof u.payload.writerAgent=="string"&&oe(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",w=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,v=u.payload.sessionContinuation===!0,E=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,R=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,C=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=ci(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,Nl,C),D=Rh(u.payload.compositionSnapshot),ae=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof g=="string"&&g.trim().length>0){if(console.log(`[agent-witch] Running ${_} task (${v?"continue":"first"})\u2026`),I===null){U(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...w!==void 0?{agentRunId:w}:{}},requestId:S});return}if(D!==null){let q=Ch(e.layout,D);if(q!==null){U(A,{type:"command.claude.result",payload:{exitCode:-1,output:q,...w!==void 0?{agentRunId:w}:{}},requestId:S});return}if(w!==void 0){let H=xh(e.layout,w,D);if(!H.ok){U(A,{type:"command.claude.result",payload:{exitCode:-1,output:H.errorMessage,...w!==void 0?{agentRunId:w}:{}},requestId:S});return}tv.set(w,D.entries.some(hs=>hs.scope==="run"))}}w!==void 0&&R!==void 0&&A$.set(w,R),w!==void 0&&(b$.set(w,I),C!==void 0&&C.trim().length>0&&Xw.set(w,C.trim()),P$.set(w,g.trim()),Ue({projectFolderPath:I,...C!==void 0&&C.trim().length>0?{projectId:C.trim()}:{}})),vJ(e,_,g.trim(),S,A,w,v,R,E,I,ae,C)}}if(u.type==="shell.session.open"&&J(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.cols=="number"?u.payload.cols:120,w=typeof u.payload.rows=="number"?u.payload.rows:32;g.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),uw({shellSessionId:g,cwd:e.workspace,cols:_,rows:w,send:v=>{U(A,v)},requestId:S}))}if(u.type==="shell.session.close"&&J(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";g.length>0&&us(g,_=>{U(A,_)},S)}if(u.type==="shell.input"&&J(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.data=="string"?u.payload.data:"";g.length>0&&_.length>0&&lw(g,_)}if(u.type==="shell.resize"&&J(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.cols=="number"?u.payload.cols:0,w=typeof u.payload.rows=="number"?u.payload.rows:0;g.length>0&&_>0&&w>0&&cw(g,_,w)}if(u.type==="command.writer.session.end"&&J(u.payload)){let g=u.payload.writerAgent;typeof g=="string"&&oe(g)&&(mw(g),mm(e.layout,g))}if(u.type==="command.writer.session.start"&&J(u.payload)){let g=u.payload.writerAgent,_=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof g=="string"&&oe(g)&&_.length>0&&(console.log(`[agent-witch] Starting ${g} session\u2026`),WJ(e,g,_,S,A))}if(u.type==="command.claude.stop"&&J(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";g.length>0&&(console.log(`[agent-witch] Stopping run ${g}\u2026`),xw(e,rv(A),g,S))}if(u.type==="command.claude.input_respond"&&J(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",_=typeof u.payload.response=="string"?u.payload.response.trim():"",w=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",v=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",E=typeof u.payload.question=="string"?u.payload.question:"";g.length>0&&_.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),Cw(e,{agentRunId:g,originalPrompt:w,partialOutput:v,question:E,response:_,shellSessionId:A$.get(g)},S,rv(A)))}if(u.type==="dispatch.approval.required"&&J(u.payload)){let g=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",_=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${g}: ${_}`),process.platform==="darwin"&&(0,nv.spawn)("osascript",["-e",`display notification "${_.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${g.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&J(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),RJ(e,u.payload,S,A)),u.type==="harness.export.request"&&J(u.payload)){let g=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",_=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,w=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(v=>typeof v=="string"):[];g.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:v}=await Promise.resolve().then(()=>(y$(),h$)),E=v(w,e.email);U(A,{type:"harness.export.result",payload:{success:E.length>0,borrowerUserId:g,..._!==void 0?{targetDeviceId:_}:{},sets:E,errorMessage:E.length>0?void 0:"No readable harness sets were found on this machine."},requestId:S})})()}if(u.type==="harness.manifest.request"&&jl(A,e.layout),u.type==="command.claude.result"&&J(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,_=typeof u.payload.output=="string"?u.payload.output:"",w=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,v=ci(g!==void 0?b$.get(g):void 0,Nl),E=g!==void 0?Xw.get(g):void 0,R=g!==void 0?P$.get(g)??"":"",C=Jy({exitCode:w,output:_});if(C&&v!==null&&RA({layout:e.layout,text:_,source:g??"command.claude.result",projectFolderPath:v,...E!==void 0?{projectId:E}:{}}),w!=null&&w!==0&&_.trim().length>0&&v!==null&&(wA({layout:e.layout,errorText:_,projectFolderPath:v,...E!==void 0?{projectId:E}:{}}),TA({layout:e.layout,text:_,source:g??"command.claude.result.failure",projectFolderPath:v,...E!==void 0?{projectId:E}:{}})),C&&R.trim().length>0&&v!==null&&xP({layout:e.layout,projectFolderPath:v,...E!==void 0?{projectId:E}:{},entry:{id:`${Date.now()}-${g??"run"}`,...g!==void 0?{agentRunId:g}:{},prompt:R,output:_,createdAt:new Date().toISOString()}}),g!==void 0&&v!==null){let D=Qw.get(g),ae=ev.get(g);D!==void 0&&ae!==void 0&&yu(v).then(q=>{let H=Yy({before:ae,after:q});kf(D,H),ev.delete(g),Qw.delete(g)})}if(C&&E!==void 0&&E.trim().length>0){let D=F(),ae=D===null?null:Y({wsUrl:D.wsUrl,pairingToken:D.pairingToken});ae!==null&&Zy(ae,E,{...g!==void 0?{sourceRunId:g}:{},lesson:Xy({prompt:R,output:_})})}g!==void 0&&(ui(e.layout,g),tv.delete(g),Xw.delete(g))}},h=()=>{if(t.stopped)return;a(),c();let u=new fl(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Ew(Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),kw(e.layout);let A=we(e.wsUrl)??"http://localhost:3000",S=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),g=u_({layout:e.layout,origin:A,...S!==void 0&&S.length>0?{claimToken:S}:{}});U(u,{type:"agent.register",payload:{role:"agent",hostname:fs.default.hostname(),macOsUsername:fs.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...g}},e.layout),jl(u,e.layout),Tw(e,u),f(u)}),u.on("message",A=>{let S=typeof A=="string"?A:A.toString("utf8");try{let g=JSON.parse(S);if(!J(g))return;b(g,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(A,S)=>{s(),t.socket=void 0,t.wsConnected=!1,lS(e.layout),t.reconnectAttempt+=1;let g=typeof S=="string"?S:S.toString("utf8");yn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:g}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",A=>{t.wakeError=A.message,yn(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return Kf(()=>{let u=Yf();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&n(u.remoteBundleVersion,u.trigger);let A=Xf();A!==null&&r(A)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Gi(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:al(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(jl(u,e.layout),{ok:!0})}}},TJ=async()=>{$e("agent-witch");let e=G_(),t=L();J_().ok||(process.platform==="darwin"?(await Br(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),Q_(t);let n=Z_({installDir:t});n.length>0&&console.log(`[agent-witch] Stopped ${n.length} sibling process(es): ${n.join(", ")}`),process.platform==="darwin"&&(Dt({launchAgentLabel:te(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),xs());let o=await Bh(),s=o[0];s!==void 0&&Dw(s.layout);for(let h of o){let y=we(h.wsUrl)??Ft;Vs(h.layout.installDir,y)}let i=o.map(h=>CJ(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),yl(),process.exit(0));let c=()=>{o.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let A=ge(h.layout);cS(A,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=o[0]?.layout;h!==void 0&&(at(h)||Vi(h.installDir))},f=await ew({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):il({layout:o[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let b=Ht(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Is(),d()});d=()=>{b(),f.stop(),yl(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Dl=TJ});var ov=l(()=>{"use strict";_$()});var w$={};yt(w$,{startAgentWitchClient:()=>Dl});var xJ,v$=l(()=>{"use strict";ov();ov();Jn();Cf();ad();xJ={};if(qr(xJ.url)&&!it()){let e=process.argv.indexOf("report");e>=0&&process.exit(id(process.argv.slice(e))),Dl()}});Lf();Cf();ad();var jL="20.x",DL="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var vG=e=>[`Node.js ${jL} or newer is required (found ${e}).`,DL].join(" "),HL=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${vG(process.version)}
`),process.exit(1))};var MJ={},IJ=async()=>{$e("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(nh(),rh)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},OJ=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(FC(),HC)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},NJ=async()=>{if(!qr(MJ.url))return;HL();let e=process.argv.indexOf("report");e>=0&&process.exit(id(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await IJ();return}if(t==="wake"){await OJ();return}if(t==="bridge"){let{runAgentWitchBridgeCli:n}=await Promise.resolve().then(()=>($T(),FT));await n();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:n}=await Promise.resolve().then(()=>(Zj(),Xj));n();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(v$(),w$));await r()};NJ();
