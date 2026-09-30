#!/usr/bin/env node
"use strict";var CF=Object.create;var ug=Object.defineProperty;var TF=Object.getOwnPropertyDescriptor;var xF=Object.getOwnPropertyNames;var IF=Object.getPrototypeOf,OF=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},St=(e,t)=>{for(var r in t)ug(e,r,{get:t[r],enumerable:!0})},NF=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of xF(t))!OF.call(e,o)&&o!==r&&ug(e,o,{get:()=>t[o],enumerable:!(n=TF(t,o))||n.enumerable});return e};var m=(e,t,r)=>(r=e!=null?CF(IF(e)):{},NF(t||!e||!e.__esModule?ug(r,"default",{value:e,enumerable:!0}):r,e));var Un=v(pg=>{"use strict";Object.defineProperty(pg,"__esModule",{value:!0});pg.stringify=MF;function MF(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=v(mg=>{"use strict";Object.defineProperty(mg,"__esModule",{value:!0});mg.generateTypeGuardError=jF;var av=Un();function jF(e,t,r){return(0,av.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,av.stringify)(e)}) to be "${r}"`}});var dr=v($l=>{"use strict";Object.defineProperty($l,"__esModule",{value:!0});$l.isNonNullObject=void 0;var DF=O(),HF=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,DF.generateTypeGuardError)(e,t.identifier,"non-null object")),r};$l.isNonNullObject=HF});var At=v(de=>{"use strict";Object.defineProperty(de,"__esModule",{value:!0});de.attachTypeGuardMeta=de.isArrayTypeGuard=de.isNestedObjectTypeGuard=de.getTypeGuardWrapperKind=de.getTypeGuardInnerGuard=de.getTypeGuardItemGuard=de.getTypeGuardSchema=void 0;var $F=e=>e.schema;de.getTypeGuardSchema=$F;var FF=e=>e.itemGuard;de.getTypeGuardItemGuard=FF;var zF=e=>e.innerGuard;de.getTypeGuardInnerGuard=zF;var UF=e=>e.wrapperKind;de.getTypeGuardWrapperKind=UF;var BF=e=>{if((0,de.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};de.isNestedObjectTypeGuard=BF;var GF=e=>{if((0,de.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};de.isArrayTypeGuard=GF;var VF=(e,t)=>Object.assign(e,t);de.attachTypeGuardMeta=VF});var Ss=v(Dr=>{"use strict";Object.defineProperty(Dr,"__esModule",{value:!0});Dr.getExpectedTypeName=Dr.getTypeGuardDisplayName=void 0;var lv=At(),qF=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Dr.getTypeGuardDisplayName=qF;var KF=e=>{let t=(0,lv.getTypeGuardWrapperKind)(e),r=(0,lv.getTypeGuardInnerGuard)(e);if(t&&r){let o=(0,Dr.getExpectedTypeName)(r);if(t==="undefinedOr")return`${o} | undefined`;if(t==="nullOr")return`${o} | null`;if(t==="nilOr")return`${o} | null | undefined`}let n=e.name;if(n.startsWith("is")){let o=n.slice(2);return o.endsWith("Guard")&&(o=o.slice(0,-5)),o==="Type"||o==="Schema"?"object":o==="Array"?"Array":o.toLowerCase()}return"unknown"};Dr.getExpectedTypeName=KF});var Hr=v(Fl=>{"use strict";Object.defineProperty(Fl,"__esModule",{value:!0});Fl.createValidationResult=void 0;var JF=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Fl.createValidationResult=JF});var Bn=v(zl=>{"use strict";Object.defineProperty(zl,"__esModule",{value:!0});zl.createValidationError=void 0;var YF=(e,t,r,n)=>({path:e,expectedType:t,actualValue:r,message:n});zl.createValidationError=YF});var Gn=v(Ul=>{"use strict";Object.defineProperty(Ul,"__esModule",{value:!0});Ul.createTreeNode=void 0;var XF=(e,t,r,n)=>({valid:t,path:e,...r&&{expectedType:r},...n!==void 0&&{actualValue:n},children:{},errors:[]});Ul.createTreeNode=XF});var As=v(Bl=>{"use strict";Object.defineProperty(Bl,"__esModule",{value:!0});Bl.combineResults=void 0;var ZF=Hr(),QF=(e,t)=>{let r=e.every(s=>s.valid),n=e.flatMap(s=>s.errors),o={valid:r,path:t||"root",children:{},errors:n};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";o.children[i]=s.tree}}),(0,ZF.createValidationResult)(r,n,o)};Bl.combineResults=QF});var Vl=v(Gl=>{"use strict";Object.defineProperty(Gl,"__esModule",{value:!0});Gl.createSimplifiedTree=void 0;var cv=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,n])=>{t[r]=cv(n)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},e1=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let n={};Object.entries(e.children).forEach(([o,s])=>{n[o]=cv(s)}),r[t]={valid:e.valid,value:n}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Gl.createSimplifiedTree=e1});var Ps=v(Kl=>{"use strict";Object.defineProperty(Kl,"__esModule",{value:!0});Kl.validateObject=void 0;var t1=dr(),bs=Hr(),r1=Bn(),ql=Gn(),n1=As(),dv=Jl(),o1=(e,t,r)=>{let n=()=>{let i=(0,r1.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,ql.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,bs.createValidationResult)(!1,[],a):(0,bs.createValidationResult)(!1,[i],a)},o=()=>{let i=Object.keys(t);if(i.length===0)return(0,bs.createValidationResult)(!0,[],(0,ql.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,f=d,b=t[f],h=e[f],y=(0,dv.validateProperty)(f,h,b,r);return y.valid?p.length===0?(0,bs.createValidationResult)(!0,[],(0,ql.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,dv.validateProperty)(d,e[d],p,r)}),a=(0,n1.combineResults)(i,r.path),c=(0,ql.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,bs.createValidationResult)(a.valid,a.errors,c)};return(0,t1.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?o():s():n()};Kl.validateObject=o1});var pv=v(Zl=>{"use strict";Object.defineProperty(Zl,"__esModule",{value:!0});Zl.validateArray=void 0;var s1=Un(),Yl=Hr(),uv=Bn(),Xl=Gn(),i1=As(),a1=Ps(),l1=Ss(),c1=At(),d1=(e,t,r)=>{let n=r.path;if(!Array.isArray(e)){let c=(0,uv.createValidationError)(n,"Array",e,`Expected ${n} (${JSON.stringify(e)}) to be "Array"`),d=(0,Xl.createTreeNode)(n,!1,"Array",e);return d.errors=[c],(0,Yl.createValidationResult)(!1,[c],d)}let o=(0,c1.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${n}[${d}]`,f={path:p,config:r.config||null};if(o)return(0,a1.validateObject)(c,o,f);let b=t(c,null),h=(0,l1.getExpectedTypeName)(t),y=(0,s1.stringify)(c);if(b)return(0,Yl.createValidationResult)(!0,[],(0,Xl.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,S=(0,uv.createValidationError)(p,h,c,u),A=(0,Xl.createTreeNode)(p,!1,h,c);return A.errors=[S],(0,Yl.createValidationResult)(!1,[S],A)}),i=(0,i1.combineResults)(s,n),a=(0,Xl.createTreeNode)(n,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Yl.createValidationResult)(i.valid,i.errors,a)};Zl.validateArray=d1});var Jl=v(ec=>{"use strict";Object.defineProperty(ec,"__esModule",{value:!0});ec.validateProperty=void 0;var mv=Hr(),u1=Bn(),gv=Gn(),p1=Ss(),Ql=At(),m1=Ps(),g1=pv(),f1=(e,t,r,n)=>{let o=`${n.path}.${e}`,s={path:o,config:n.config||null,...n.parentTree&&{parentTree:n.parentTree}},i=n.config?.errorMode||"multi",a=(0,Ql.getTypeGuardSchema)(r),c=(0,Ql.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,m1.validateObject)(t,a,s);if(c&&(0,Ql.isArrayTypeGuard)(r))return(0,g1.validateArray)(t,c,s)}let d=p=>{let f=r(t,p),b=(0,p1.getExpectedTypeName)(r);return f?(0,mv.createValidationResult)(!0,[],(0,gv.createTreeNode)(o,!0,b,t)):(()=>{let h=(0,u1.createValidationError)(o,b,t,`Expected ${o} (${JSON.stringify(t)}) to be "${b}"`),y=(0,gv.createTreeNode)(o,!1,b,t);return y.errors=[h],(0,mv.createValidationResult)(!1,[h],y)})()};if((0,Ql.isNestedObjectTypeGuard)(r)){let p=n.config?{...n.config,identifier:o}:null;return d(p)}return d(null)};ec.validateProperty=f1});var rc=v(tc=>{"use strict";Object.defineProperty(tc,"__esModule",{value:!0});tc.isNil=void 0;var h1=O(),y1=function(e,t){return e!=null?(t&&t.callbackOnError((0,h1.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};tc.isNil=y1});var gg=v(nc=>{"use strict";Object.defineProperty(nc,"__esModule",{value:!0});nc.isDefined=void 0;var S1=O(),A1=rc(),b1=function(e,t){return(0,A1.isNil)(e,null)?(t&&t.callbackOnError((0,S1.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};nc.isDefined=b1});var fg=v(oc=>{"use strict";Object.defineProperty(oc,"__esModule",{value:!0});oc.reportValidationResults=void 0;var P1=Vl(),fv=gg(),_1=rc(),w1=(e,t)=>{if(e.valid===!0||(0,_1.isNil)(t))return;let r=t.errorMode||"multi",n=(i,a)=>{(0,fv.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,P1.createSimplifiedTree)(a),null,2))},o=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,fv.isDefined)(e.tree)?n(t,e.tree):r==="multi"?o(t):s(t)};oc.reportValidationResults=w1});var hg=v(Z=>{"use strict";Object.defineProperty(Z,"__esModule",{value:!0});Z.Validation=Z.reportValidationResults=Z.validateObject=Z.validateProperty=Z.createSimplifiedTree=Z.combineResults=Z.createTreeNode=Z.createValidationError=Z.createValidationResult=Z.getExpectedTypeName=void 0;var v1=Ss();Object.defineProperty(Z,"getExpectedTypeName",{enumerable:!0,get:function(){return v1.getExpectedTypeName}});var W1=Hr();Object.defineProperty(Z,"createValidationResult",{enumerable:!0,get:function(){return W1.createValidationResult}});var L1=Bn();Object.defineProperty(Z,"createValidationError",{enumerable:!0,get:function(){return L1.createValidationError}});var E1=Gn();Object.defineProperty(Z,"createTreeNode",{enumerable:!0,get:function(){return E1.createTreeNode}});var R1=As();Object.defineProperty(Z,"combineResults",{enumerable:!0,get:function(){return R1.combineResults}});var k1=Vl();Object.defineProperty(Z,"createSimplifiedTree",{enumerable:!0,get:function(){return k1.createSimplifiedTree}});var C1=Jl();Object.defineProperty(Z,"validateProperty",{enumerable:!0,get:function(){return C1.validateProperty}});var T1=Ps();Object.defineProperty(Z,"validateObject",{enumerable:!0,get:function(){return T1.validateObject}});var x1=fg();Object.defineProperty(Z,"reportValidationResults",{enumerable:!0,get:function(){return x1.reportValidationResults}});var I1=Hr(),O1=As(),N1=Bn(),M1=Gn(),j1=Jl(),D1=Ps(),H1=fg(),$1=Vl();Z.Validation={result:I1.createValidationResult,combine:O1.combineResults,error:N1.createValidationError,treeNode:M1.createTreeNode,property:j1.validateProperty,object:D1.validateObject,report:H1.reportValidationResults,createSimplifiedTree:$1.createSimplifiedTree}});var sc=v(yg=>{"use strict";Object.defineProperty(yg,"__esModule",{value:!0});yg.isType=z1;var hv=dr(),yv=hg(),F1=At();function z1(e){if(!(0,hv.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,n){let o=n?.errorMode||"multi";if(o==="multi"||o==="json"){let s={path:n?.identifier||"root",config:n||null},i=(0,yv.validateObject)(r,e,s);return(0,yv.reportValidationResults)(i,n||null),i.valid}return(0,hv.isNonNullObject)(r,n)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],n?{...n,identifier:`${n.identifier}.${s}`}:null)}):!1}return(0,F1.attachTypeGuardMeta)(t,{schema:e})}});var Pv=v($r=>{"use strict";Object.defineProperty($r,"__esModule",{value:!0});$r.isNestedType=$r.isShape=void 0;$r.isSchema=_s;var Sv=dr(),Av=hg(),bv=At();function _s(e){if(!(0,Sv.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=B1(e);function r(n,o){let s=o?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:o?.identifier||"root",config:o||null},a=(0,Av.validateObject)(n,t,i);return(0,Av.reportValidationResults)(a,o||null),a.valid}return(0,Sv.isNonNullObject)(n,o)?Object.keys(t).every(function(i){let a=t[i];return a?a(n[i],o?{...o,identifier:`${o.identifier}.${i}`}:null):!1}):!1}return(0,bv.attachTypeGuardMeta)(r,{schema:t})}function U1(e){return typeof e=="function"?e:Array.isArray(e)?G1(e):typeof e=="object"&&e!==null?_s(e):e}function B1(e){let t={};for(let[r,n]of Object.entries(e))t[r]=U1(n);return t}function G1(e){let t=e[0],r=_s(t);function n(o,s){return Array.isArray(o)?o.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,bv.attachTypeGuardMeta)(n,{itemGuard:r})}$r.isShape=_s;$r.isNestedType=_s});var _v=v(Sg=>{"use strict";Object.defineProperty(Sg,"__esModule",{value:!0});Sg.isObjectWith=q1;var V1=sc();function q1(e){return(0,V1.isType)(e)}});var wv=v(Ag=>{"use strict";Object.defineProperty(Ag,"__esModule",{value:!0});Ag.isObject=J1;var K1=sc();function J1(e){return(0,K1.isType)(e)}});var vv=v(bg=>{"use strict";Object.defineProperty(bg,"__esModule",{value:!0});bg.guardWithTolerance=Y1;function Y1(e,t,r){return t(e,r),e}});var Wv=v(Pg=>{"use strict";Object.defineProperty(Pg,"__esModule",{value:!0});Pg.isBranded=Z1;var X1=O();function Z1(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,X1.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var Lv=v(ic=>{"use strict";Object.defineProperty(ic,"__esModule",{value:!0});ic.BrandSymbols=void 0;ic.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var Ev=v(ac=>{"use strict";Object.defineProperty(ac,"__esModule",{value:!0});ac.isAny=void 0;var Q1=function(e){return!0};ac.isAny=Q1});var ws=v(_g=>{"use strict";Object.defineProperty(_g,"__esModule",{value:!0});_g.reportTypeGuardError=tz;var ez=O();function tz(e,t,r){e&&e.callbackOnError((0,ez.generateTypeGuardError)(t,e.identifier,r))}});var Rv=v(lc=>{"use strict";Object.defineProperty(lc,"__esModule",{value:!0});lc.isBoolean=void 0;var rz=ws(),nz=function(t,r){return typeof t!="boolean"?((0,rz.reportTypeGuardError)(r,t,"boolean"),!1):!0};lc.isBoolean=nz});var kv=v(cc=>{"use strict";Object.defineProperty(cc,"__esModule",{value:!0});cc.isDate=void 0;var oz=O(),sz=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,oz.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};cc.isDate=sz});var wg=v(dc=>{"use strict";Object.defineProperty(dc,"__esModule",{value:!0});dc.isNumber=void 0;var iz=ws(),az=function(t,r){return typeof t!="number"||isNaN(t)?((0,iz.reportTypeGuardError)(r,t,"number"),!1):!0};dc.isNumber=az});var Cv=v(uc=>{"use strict";Object.defineProperty(uc,"__esModule",{value:!0});uc.isString=void 0;var lz=ws(),cz=function(t,r){return typeof t!="string"?((0,lz.reportTypeGuardError)(r,t,"string"),!1):!0};uc.isString=cz});var Tv=v(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.isUnknown=void 0;var dz=function(e){return!0};pc.isUnknown=dz});var xv=v(mc=>{"use strict";Object.defineProperty(mc,"__esModule",{value:!0});mc.isFunction=void 0;var uz=O(),pz=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,uz.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};mc.isFunction=pz});var Ov=v(gc=>{"use strict";Object.defineProperty(gc,"__esModule",{value:!0});gc.isFile=void 0;var Iv=O(),mz=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,Iv.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,Iv.generateTypeGuardError)(e,t.identifier,"File")),!1)};gc.isFile=mz});var Mv=v(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.isFileList=void 0;var Nv=O(),gz=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,Nv.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,Nv.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};fc.isFileList=gz});var Dv=v(hc=>{"use strict";Object.defineProperty(hc,"__esModule",{value:!0});hc.isBlob=void 0;var jv=O(),fz=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,jv.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,jv.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};hc.isBlob=fz});var $v=v(yc=>{"use strict";Object.defineProperty(yc,"__esModule",{value:!0});yc.isFormData=void 0;var Hv=O(),hz=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,Hv.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,Hv.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};yc.isFormData=hz});var zv=v(Sc=>{"use strict";Object.defineProperty(Sc,"__esModule",{value:!0});Sc.isURL=void 0;var Fv=O(),yz=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,Fv.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,Fv.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Sc.isURL=yz});var Bv=v(Ac=>{"use strict";Object.defineProperty(Ac,"__esModule",{value:!0});Ac.isURLSearchParams=void 0;var Uv=O(),Sz=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,Uv.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,Uv.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Ac.isURLSearchParams=Sz});var Gv=v(bc=>{"use strict";Object.defineProperty(bc,"__esModule",{value:!0});bc.isMap=void 0;var Az=O(),bz=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,Az.generateTypeGuardError)(e,t.identifier,"Map")),!1)};bc.isMap=bz});var Vv=v(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.isSet=void 0;var Pz=O(),_z=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,Pz.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Pc.isSet=_z});var qv=v(vg=>{"use strict";Object.defineProperty(vg,"__esModule",{value:!0});vg.isIndexSignature=vz;var wz=O();function vz(e,t){return function(r,n){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return n&&n.callbackOnError((0,wz.generateTypeGuardError)(r,n.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let f=s[d],b=e(d,n?{...n,identifier:`${n.identifier}[key:${p}]`}:null),h=t(f,n?{...n,identifier:`${n.identifier}[value:${p}]`}:null);return b&&h})}}});var Kv=v(_c=>{"use strict";Object.defineProperty(_c,"__esModule",{value:!0});_c.isError=void 0;var Wz=ws(),Lz=function(t,r){return t instanceof Error?!0:((0,Wz.reportTypeGuardError)(r,t,"Error"),!1)};_c.isError=Lz});var Lg=v(Wg=>{"use strict";Object.defineProperty(Wg,"__esModule",{value:!0});Wg.isArrayWithEachItem=kz;var Ez=O(),Rz=At();function kz(e){let t=function(r,n){return Array.isArray(r)?r.every((o,s)=>e(o,n?{...n,identifier:`${n.identifier}[${s}]`}:null)):(n&&n.callbackOnError((0,Ez.generateTypeGuardError)(r,n.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,Rz.attachTypeGuardMeta)(t,{itemGuard:e})}});var Eg=v(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.isNonEmptyArray=void 0;var Cz=O(),Tz=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,Cz.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};wc.isNonEmptyArray=Tz});var Jv=v(Rg=>{"use strict";Object.defineProperty(Rg,"__esModule",{value:!0});Rg.isNonEmptyArrayWithEachItem=Oz;var xz=Lg(),Iz=Eg();function Oz(e){return function(t,r){return(0,xz.isArrayWithEachItem)(e)(t,r)&&(0,Iz.isNonEmptyArray)(t,r)}}});var Xv=v(kg=>{"use strict";Object.defineProperty(kg,"__esModule",{value:!0});kg.isTuple=Nz;var Yv=O();function Nz(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,Yv.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((n,o)=>n(t[o],r?{...r,identifier:`${r.identifier}[${o}]`}:null)):(r&&r.callbackOnError((0,Yv.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var Zv=v(Cg=>{"use strict";Object.defineProperty(Cg,"__esModule",{value:!0});Cg.isObjectWithEachItem=jz;var Mz=O();function jz(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,Mz.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var Qv=v(Tg=>{"use strict";Object.defineProperty(Tg,"__esModule",{value:!0});Tg.isPartialOf=Hz;var Dz=dr();function Hz(e){return function(t,r){if(!(0,Dz.isNonNullObject)(t,r))return!1;for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&Object.prototype.hasOwnProperty.call(t,n)){let o=e[n],s=t[n];if(o&&!o(s,r?{...r,identifier:`${r.identifier}.${n}`}:null))return!1}return!0}}});var eW=v(xg=>{"use strict";Object.defineProperty(xg,"__esModule",{value:!0});xg.isPick=Fz;var $z=dr();function Fz(e,...t){return function(r,n){if(!(0,$z.isNonNullObject)(r,n))return!1;for(let o of t)if(!Object.prototype.hasOwnProperty.call(r,o))return n&&e(r,n),!1;return!0}}});var tW=v(Ig=>{"use strict";Object.defineProperty(Ig,"__esModule",{value:!0});Ig.isOmit=Uz;var zz=dr();function Uz(e,...t){return function(r,n){if(!(0,zz.isNonNullObject)(r,n))return!1;let o=[],s=n?.identifier||"root",i=n?{...n,callbackOnError:d=>o.push(d)}:{identifier:s,callbackOnError:d=>o.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=o.filter(d=>{let p=d.slice(9),f=p.indexOf(" ("),b=f>=0?p.slice(0,f):p;if(a.has(b))return!1;let h=b.startsWith(s+".")&&b.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(n&&c.length>0)for(let d of c)n.callbackOnError(d);return c.length===0}}});var rW=v(vc=>{"use strict";Object.defineProperty(vc,"__esModule",{value:!0});vc.isNonEmptyString=void 0;var Bz=O(),Gz=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,Bz.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};vc.isNonEmptyString=Gz});var nW=v(Wc=>{"use strict";Object.defineProperty(Wc,"__esModule",{value:!0});Wc.isNonNegativeNumber=void 0;var Vz=O(),qz=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,Vz.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Wc.isNonNegativeNumber=qz});var oW=v(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.isPositiveNumber=void 0;var Kz=O(),Jz=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,Kz.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Lc.isPositiveNumber=Jz});var sW=v(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.isNonPositiveNumber=void 0;var Yz=O(),Xz=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,Yz.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Ec.isNonPositiveNumber=Xz});var iW=v(Rc=>{"use strict";Object.defineProperty(Rc,"__esModule",{value:!0});Rc.isNegativeNumber=void 0;var Zz=O(),Qz=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,Zz.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Rc.isNegativeNumber=Qz});var aW=v(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.isInteger=void 0;var eU=O(),tU=wg(),rU=function(e,t){return!(0,tU.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,eU.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};kc.isInteger=rU});var lW=v(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.isPositiveInteger=void 0;var nU=O(),oU=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,nU.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Cc.isPositiveInteger=oU});var cW=v(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.isNegativeInteger=void 0;var sU=O(),iU=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,sU.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Tc.isNegativeInteger=iU});var dW=v(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.isNonNegativeInteger=void 0;var aU=O(),lU=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,aU.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};xc.isNonNegativeInteger=lU});var uW=v(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.isNonPositiveInteger=void 0;var cU=O(),dU=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,cU.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Ic.isNonPositiveInteger=dU});var pW=v(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.isNumeric=void 0;var Oc=O(),uU=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Oc.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Oc.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Oc.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Oc.generateTypeGuardError)(e,t.identifier,"number key")),!1};Nc.isNumeric=uU});var mW=v(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.isBooleanLike=void 0;var Og=O(),pU=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Og.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Og.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Mc.isBooleanLike=pU});var gW=v(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.isDateLike=void 0;var vs=O(),mU=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,vs.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,vs.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,vs.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,vs.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,vs.generateTypeGuardError)(e,t.identifier,"date-like")),!1};jc.isDateLike=mU});var fW=v(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.isBigInt=void 0;var gU=O(),fU=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,gU.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Dc.isBigInt=fU});var Mg=v(Ng=>{"use strict";Object.defineProperty(Ng,"__esModule",{value:!0});Ng.isOneOf=hU;var hW=Un();function hU(...e){return function(t,r){let n=e.some(function(o){return t===o});return!n&&r&&r.callbackOnError(`${r.identifier} (${(0,hW.stringify)(t)}) must be one of following values ${e.map(hW.stringify).join(" | ")}`),n}}});var yW=v(jg=>{"use strict";Object.defineProperty(jg,"__esModule",{value:!0});jg.isOneOfTypes=AU;var yU=Un(),SU=Ss();function AU(...e){return function(t,r){let n=e.map(s=>({typeGuard:s,isValid:s(t,null)})),o=n.some(s=>s.isValid);if(!o&&r){let s=(0,yU.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,SU.getTypeGuardDisplayName)(c)).join(" | ")}"`];n.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return o}}});var SW=v(Dg=>{"use strict";Object.defineProperty(Dg,"__esModule",{value:!0});Dg.isIntersectionOf=bU;function bU(...e){return function(t,r){for(let n of e)if(!n(t,r))return!1;return!0}}});var AW=v(Hg=>{"use strict";Object.defineProperty(Hg,"__esModule",{value:!0});Hg.isExtensionOf=PU;function PU(e,t){return function(r,n){return e(r,n)?t(r,n):!1}}});var bW=v($g=>{"use strict";Object.defineProperty($g,"__esModule",{value:!0});$g.isNullOr=wU;var _U=At();function wU(e){function t(r,n){return r===null?!0:e(r,n)}return(0,_U.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var PW=v(Fg=>{"use strict";Object.defineProperty(Fg,"__esModule",{value:!0});Fg.isUndefinedOr=WU;var vU=At();function WU(e){function t(r,n){return r===void 0?!0:e(r,n)}return(0,vU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var _W=v(zg=>{"use strict";Object.defineProperty(zg,"__esModule",{value:!0});zg.isNilOr=EU;var LU=At();function EU(e){function t(r,n){return r==null?!0:e(r,n)}return(0,LU.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var wW=v(Ug=>{"use strict";Object.defineProperty(Ug,"__esModule",{value:!0});Ug.isAsserted=RU;function RU(e){return!0}});var vW=v(Bg=>{"use strict";Object.defineProperty(Bg,"__esModule",{value:!0});Bg.isEnum=CU;var kU=Mg();function CU(e){return function(t,r){return(0,kU.isOneOf)(...Object.values(e))(t,r)}}});var WW=v(Gg=>{"use strict";Object.defineProperty(Gg,"__esModule",{value:!0});Gg.isEqualTo=IU;var TU=O(),xU=Un();function IU(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,TU.generateTypeGuardError)(t,r.identifier,`equal to ${(0,xU.stringify)(e)}`)),!1):!0}}});var LW=v(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.isRegex=void 0;var OU=O(),NU=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,OU.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Hc.isRegex=NU});var RW=v(Vg=>{"use strict";Object.defineProperty(Vg,"__esModule",{value:!0});Vg.isPattern=MU;var EW=O();function MU(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,n){return typeof r!="string"?(n&&n.callbackOnError((0,EW.generateTypeGuardError)(r,n.identifier,"string")),!1):t.test(r)?!0:(n&&n.callbackOnError((0,EW.generateTypeGuardError)(r,n.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var kW=v(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.by=jU;function jU(e){return function(t){return e(t,null)}}});var CW=v(Kg=>{"use strict";Object.defineProperty(Kg,"__esModule",{value:!0});Kg.toNumber=DU;function DU(e){return typeof e=="number"?e:Number(e)}});var TW=v(Jg=>{"use strict";Object.defineProperty(Jg,"__esModule",{value:!0});Jg.toDate=HU;function HU(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var xW=v(Yg=>{"use strict";Object.defineProperty(Yg,"__esModule",{value:!0});Yg.toBoolean=$U;function $U(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var IW=v($c=>{"use strict";Object.defineProperty($c,"__esModule",{value:!0});$c.isSymbol=void 0;var FU=O(),zU=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,FU.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};$c.isSymbol=zU});var Ws=v(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var UU=sc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return UU.isType}});var Xg=Pv();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return Xg.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return Xg.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return Xg.isNestedType}});var BU=_v();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return BU.isObjectWith}});var GU=wv();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return GU.isObject}});var VU=vv();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return VU.guardWithTolerance}});var qU=Wv();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return qU.isBranded}});var KU=Lv();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return KU.BrandSymbols}});var JU=Ev();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return JU.isAny}});var YU=Rv();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return YU.isBoolean}});var XU=kv();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return XU.isDate}});var ZU=gg();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return ZU.isDefined}});var QU=rc();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return QU.isNil}});var eB=wg();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return eB.isNumber}});var tB=Cv();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return tB.isString}});var rB=Tv();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return rB.isUnknown}});var nB=xv();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return nB.isFunction}});var oB=Ov();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return oB.isFile}});var sB=Mv();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return sB.isFileList}});var iB=Dv();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return iB.isBlob}});var aB=$v();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return aB.isFormData}});var lB=zv();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return lB.isURL}});var cB=Bv();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return cB.isURLSearchParams}});var dB=Gv();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return dB.isMap}});var uB=Vv();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return uB.isSet}});var pB=qv();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return pB.isIndexSignature}});var mB=Kv();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return mB.isError}});var gB=Lg();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return gB.isArrayWithEachItem}});var fB=Eg();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return fB.isNonEmptyArray}});var hB=Jv();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return hB.isNonEmptyArrayWithEachItem}});var yB=Xv();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return yB.isTuple}});var SB=dr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return SB.isNonNullObject}});var AB=Zv();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return AB.isObjectWithEachItem}});var bB=Qv();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return bB.isPartialOf}});var PB=eW();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return PB.isPick}});var _B=tW();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return _B.isOmit}});var wB=rW();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return wB.isNonEmptyString}});var vB=nW();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return vB.isNonNegativeNumber}});var WB=oW();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return WB.isPositiveNumber}});var LB=sW();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return LB.isNonPositiveNumber}});var EB=iW();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return EB.isNegativeNumber}});var RB=aW();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return RB.isInteger}});var kB=lW();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return kB.isPositiveInteger}});var CB=cW();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return CB.isNegativeInteger}});var TB=dW();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return TB.isNonNegativeInteger}});var xB=uW();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return xB.isNonPositiveInteger}});var IB=pW();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return IB.isNumeric}});var OB=mW();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return OB.isBooleanLike}});var NB=gW();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return NB.isDateLike}});var MB=fW();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return MB.isBigInt}});var jB=Mg();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return jB.isOneOf}});var DB=yW();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return DB.isOneOfTypes}});var HB=SW();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return HB.isIntersectionOf}});var $B=AW();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return $B.isExtensionOf}});var FB=bW();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return FB.isNullOr}});var zB=PW();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return zB.isUndefinedOr}});var UB=_W();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return UB.isNilOr}});var BB=wW();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return BB.isAsserted}});var GB=vW();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return GB.isEnum}});var VB=WW();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return VB.isEqualTo}});var qB=LW();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return qB.isRegex}});var KB=RW();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return KB.isPattern}});var JB=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return JB.generateTypeGuardError}});var YB=kW();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return YB.by}});var XB=CW();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return XB.toNumber}});var ZB=TW();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return ZB.toDate}});var QB=xW();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return QB.toBoolean}});var eG=IW();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return eG.isSymbol}})});var Ls,OW,NW,Fr,Zg,A7,MW,Fc,zr,Es,Qg,ef,tf,rf,jt,nf,zc,Uc,Bc,Rs,nt,Vn,qn,Gc,ur,of,jW,bt=l(()=>{"use strict";Ls={production:".agent-witch",localhost:".local-agent-witch"},OW={production:47892,localhost:47893},NW={production:"com.agent-witch",localhost:"com.local-agent-witch"},Fr={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Zg="app",A7=`${Zg}/agent-witch.js`,MW=`${Zg}/command`,Fc={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},zr=Ls.production,Es=Ls.localhost,Qg=OW.production,ef=OW.localhost,tf=NW.production,rf=NW.localhost,jt="profiles",nf=Fr.activeProfile,zc="harness",Uc="sets",Bc="manifest.json",Rs=Fc.projectsDir,nt=Fc.logsDir,Vn="agent-witch.log",qn="agent-witch.error.log",Gc=Fc.reportsDir,ur=Fc.deviceKeypairJson,of=Zg,jW="agent-witch.js"});var Vc,DW,rG,tG,HW,$W=l(()=>{"use strict";Vc=m(require("node:path")),DW=require("node:url"),rG={},tG=()=>!0,HW=()=>{if(tG()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Vc.default.dirname(Vc.default.resolve(e))}return Vc.default.dirname((0,DW.fileURLToPath)(rG.url))}});var sf,FW,M,zW,nG,pr,L,qc,Dt,UW,Kc,Kn,Jc,Yc,te,ot,af,st,lf,N,cf=l(()=>{"use strict";sf=m(require("node:fs")),FW=m(require("node:os")),M=m(require("node:path")),zW=m(Ws());bt();$W();nG=HW(),pr=e=>e.trim().toLowerCase(),L=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return M.default.resolve(e);let t=M.default.resolve(nG),r=M.default.basename(t),n=M.default.basename(M.default.dirname(t));return r===of&&(n===zr||n===Es)?M.default.dirname(t):r===zr||r===Es?t:M.default.join(FW.default.homedir(),zr)},qc=(e=L())=>M.default.join(e,of),Dt=(e=L())=>M.default.join(qc(e),jW),UW=(e,t,r)=>t!==null?M.default.join(e,jt,t,r):M.default.join(e,r),Kc=e=>UW(e.installDir,e.profileEmail,Rs),Kn=e=>UW(e.installDir,e.profileEmail,nt),Jc=e=>e.profileEmail!==null?M.default.join(e.installDir,jt,e.profileEmail,ur):M.default.join(e.installDir,ur),Yc=e=>M.default.basename(e)===Es,te=(e=L())=>Yc(e)?rf:tf,ot=(e=L())=>Yc(e)?ef:Qg,af=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return pr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?pr(t):null},st=(e=L())=>{let t=M.default.join(e,nf);if(!sf.default.existsSync(t))return null;try{let r=JSON.parse(sf.default.readFileSync(t,"utf8"));if((0,zW.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return pr(r.email)}catch{return null}return null},lf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?pr(r):null}let t=af();return t!==null?t:st()},N=e=>{let t=L(),r=qc(t),n=Dt(t),o=lf(e);if(o!==null){let b=M.default.join(t,jt,o),h=M.default.join(b,zc),y=M.default.join(b,Rs),u=M.default.join(b,nt),S=M.default.join(b,Gc),A=M.default.join(b,ur),g=M.default.join(b,nt,Vn),_=M.default.join(b,nt,qn);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:y,logsDir:u,mainLogPath:g,errorLogPath:_,reportsDir:S,deviceKeypairPath:A,configPath:M.default.join(b,"config.json"),harnessRootDir:h,harnessManifestPath:M.default.join(h,Bc),harnessSetsDir:M.default.join(h,Uc)}}let s=M.default.join(t,zc),i=M.default.join(t,Rs),a=M.default.join(t,nt),c=M.default.join(t,Gc),d=M.default.join(t,ur),p=M.default.join(t,nt,Vn),f=M.default.join(t,nt,qn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:f,reportsDir:c,deviceKeypairPath:d,configPath:M.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:M.default.join(s,Bc),harnessSetsDir:M.default.join(s,Uc)}}});var df,BW,oG,sG,GW,uf,VW=l(()=>{"use strict";df=m(require("node:fs")),BW=m(require("node:path"));bt();cf();oG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sG=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,GW=e=>{let t=BW.default.join(e,Fr.wakePort);if(!df.default.existsSync(t))return null;try{let r=JSON.parse(df.default.readFileSync(t,"utf8"));if(oG(r)&&sG(r.wakePort))return r.wakePort}catch{return null}return null},uf=(e=L())=>GW(e)??ot(e)});var U=l(()=>{"use strict";cf();VW()});var ks,dG,uG,qW,pG,mG,KW=l(()=>{"use strict";U();ks=te(),dG=`${ks}-wake`,uG=`${ks}-live`,qW=`${ks}-watchdog`,pG=`${ks}-automation-scheduler`,mG=`${ks}-updater`});var pf,mf,Xc=l(()=>{"use strict";pf=new Set(["","loginwindow","_mbsetupuser","root"]),mf=5e3});var JW,gG,YW,gf,ff=l(()=>{"use strict";JW=require("node:child_process");Xc();gG=e=>e.trim().toLowerCase(),YW=e=>e==null?!1:!pf.has(gG(e)),gf=()=>{if(process.platform!=="darwin")return null;try{let t=(0,JW.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return YW(t)?t:null}catch{return null}}});var ZW,XW,it,Cs=l(()=>{"use strict";ZW=m(require("node:os"));ff();XW=e=>e.trim().toLowerCase(),it=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?gf():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??ZW.default.userInfo().username;return XW(r)===XW(n)}});var QW,eL,Ur,tL=l(()=>{"use strict";QW=require("node:child_process"),eL=m(require("node:fs"));U();Cs();Ur=(e=L())=>{let t=Dt(e);if(!eL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!it())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=st(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,QW.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var rL,Ts,Zc=l(()=>{"use strict";rL=require("node:child_process"),Ts=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,rL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Qc,hf,nL,Q,ed,xs=l(()=>{"use strict";Qc=m(require("node:fs")),hf=m(require("node:path"));U();bt();nL=e=>{let t=hf.default.join(e,jt);return Qc.default.existsSync(t)?Qc.default.readdirSync(t).filter(r=>Qc.default.statSync(hf.default.join(t,r)).isDirectory()).map(r=>pr(r)).toSorted():[]},Q=(e=L())=>{let t=te(e);return[{profileEmail:nL(e)[0]??null,launchAgentLabel:t}]},ed=(e=L())=>nL(e)});var yf,oL,sL,fG,Ht,td=l(()=>{"use strict";yf=m(require("node:fs")),oL=m(require("node:os")),sL=m(require("node:path"));U();xs();fG=()=>sL.default.join(oL.default.homedir(),"Library","LaunchAgents"),Ht=(e=L())=>{let t=te(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of Q(e))r.add(o.launchAgentLabel);let n=fG();if(yf.default.existsSync(n))for(let o of yf.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var iL,Is,aL=l(()=>{"use strict";U();Zc();td();xs();iL=(e=L())=>{let t=new Set(Q(e).map(r=>r.launchAgentLabel));return Ht(e).filter(r=>!t.has(r))},Is=(e=L())=>{for(let t of iL(e))Ts(t)}});var Os,Sf=l(()=>{"use strict";U();Zc();td();Os=(e=L())=>{for(let t of Ht(e))Ts(t)}});var lL,cL,hG,Br,dL=l(()=>{"use strict";lL=require("node:child_process"),cL=require("node:util"),hG=(0,cL.promisify)(lL.execFile),Br=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await hG("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Gr,yG,Af,bf=l(()=>{"use strict";Gr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yG=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,Af=e=>{let t=e.pathValue??yG(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${Gr(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${Gr(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${Gr(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${Gr(e.homeDir)}</string>
    <key>PATH</key>
    <string>${Gr(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${Gr(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${Gr(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var rd,Pf=l(()=>{"use strict";rd=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Vr,_f,Ns,SG,AG,bG,uL,$t,wf=l(()=>{"use strict";Vr=m(require("node:fs")),_f=m(require("node:os")),Ns=m(require("node:path"));bt();U();bf();Pf();SG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),AG=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,bG=e=>{let t=Ns.default.join(e,Fr.wakePort);if(!Vr.default.existsSync(t))return ot(e);try{let r=JSON.parse(Vr.default.readFileSync(t,"utf8"));if(SG(r)&&AG(r.wakePort))return r.wakePort}catch{return ot(e)}return ot(e)},uL=(e,t=_f.default.homedir())=>Ns.default.join(t,"Library","LaunchAgents",`${e}.plist`),$t=e=>{let t=e.installDir??L(),r=e.homeDir??_f.default.homedir(),n=uL(e.launchAgentLabel,r),o=Vr.default.existsSync(n)?Vr.default.readFileSync(n,"utf8"):null;if(o!==null&&rd(o))return{ok:!0,rewritten:!1,plistPath:n};let s=Af({launchAgentLabel:e.launchAgentLabel,runPath:Ns.default.join(t,MW,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??bG(t)});if(!rd(s))return{ok:!1,rewritten:!1,plistPath:n,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Vr.default.mkdirSync(Ns.default.dirname(n),{recursive:!0}),Vr.default.writeFileSync(n,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:n,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:n}}});var mL,gL,fL,Ms,PG,_G,pL,be,vf=l(()=>{"use strict";mL=require("node:child_process"),gL=m(require("node:fs")),fL=require("node:util");U();wf();Cs();Ms=(0,fL.promisify)(mL.execFile),PG=async e=>{try{return await Ms("launchctl",["print",e]),!0}catch{return!1}},_G=async(e,t,r)=>{await PG(t)&&await Ms("launchctl",["bootout",t]).catch(()=>{}),await Ms("launchctl",["bootstrap",e,r]),await Ms("launchctl",["enable",t])},pL=async e=>{try{return await Ms("launchctl",["kickstart","-k",e]),!0}catch{return!1}},be=async(e,t=L())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!it())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let n=`gui/${r}`,o=`${n}/${e}`,s=$t({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await pL(o))return{ok:!0};let i=s.plistPath;if(!gL.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await _G(n,o,i),await pL(o)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var qr,hL=l(()=>{"use strict";U();vf();xs();qr=async(e=L())=>{let t=[];for(let r of Q(e))(await be(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Fe,Ft,yL=l(()=>{"use strict";Sf();Cs();Xc();Fe=e=>{it()||(Os(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Ft=(e,t=mf)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{it()||e()},t);return()=>{clearInterval(r)}}});var ee=l(()=>{"use strict";KW();tL();Zc();aL();Sf();td();Cs();dL();hL();vf();wf();Pf();bf();xs();ff();Xc();yL()});var Wf=l(()=>{"use strict";ee()});var SL,AL,nd,bL,Jn,PL,_L,Kr=l(()=>{"use strict";SL=".agent-witch",AL="memory",nd="project.json",bL="chunks.ndjson",Jn="runs.ndjson",PL="reports",_L=".json"});var wL=l(()=>{"use strict";Kr()});var vL,od,Lf=l(()=>{"use strict";vL=m(require("node:path"));wL();od=(e,t)=>vL.default.join(e.trim(),`${t.trim()}${_L}`)});var js,WL,LL=l(()=>{"use strict";js="agent-witch.js",WL="command"});var sd=l(()=>{"use strict";LL()});var Jr,EL,RL=l(()=>{"use strict";sd();Jr=e=>`'${e.replace(/'/g,"'\\''")}'`,EL=e=>{let t=`${e.installDir.trim()}/${"app"}/${js}`,r=[Jr("node"),Jr(t),"report","write","--key",Jr(e.reportKey.trim()),"--agent-run-id",Jr(e.agentRunId.trim()),"--status",Jr(e.status),"--summary",Jr(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Jr(e.details.trim())),r.join(" ")}});var Pt,kL,wG,Ef,id=l(()=>{"use strict";Lf();RL();Pt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},kL=e=>e===Pt.COMPLETED||e===Pt.FAILED,wG=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Ef=(e,t)=>{let r=od(t.reportsDir,t.reportKey),n=EL({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Pt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${wG({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var Pe=l(()=>{"use strict";bt();U()});var Hs,TL,CL,xL,vG,Yn,WG,IL,$s,Fs,Rf,OL,NL,zs=l(()=>{"use strict";Hs=m(require("node:fs")),TL=m(require("node:path"));id();Lf();Pe();CL=50,xL=e=>{let t=N(),r=od(t.reportsDir,e);return Hs.default.mkdirSync(TL.default.dirname(r),{recursive:!0}),r},vG=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Yn=e=>{let t=xL(e);if(!Hs.default.existsSync(t))return null;try{let r=JSON.parse(Hs.default.readFileSync(t,"utf8"));return vG(r)?r:null}catch{return null}},WG=(e,t)=>{let r=[...e,t];return r.length>CL?r.slice(r.length-CL):r},IL=e=>{let t=xL(e.reportKey);Hs.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},$s=e=>{let t=Yn(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:WG(t?.history??[],n)};return IL(o),o},Fs=e=>{let t=Yn(e.reportKey);return t!==null?t:$s({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Pt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Rf=(e,t)=>{let r=t.trim();if(r.length===0)return Yn(e);let n=Yn(e);if(n===null)return null;let o=n.details!==void 0&&n.details.trim().length>0?`${n.details.trim()}
${r}`:r,s={...n,updatedAt:new Date().toISOString(),details:o};return IL(s),s},OL=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},NL=e=>{if(e===null||!kL(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Pt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var LG,EG,Us,ML,ad,kf=l(()=>{"use strict";id();zs();LG=new Set(Object.values(Pt)),EG=e=>LG.has(e),Us=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},ML=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},ad=e=>{if(e[0]!=="write")return ML(),1;let r=Us(e,"--key"),n=Us(e,"--agent-run-id"),o=Us(e,"--status"),s=Us(e,"--summary"),i=Us(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!EG(o)?(ML(),1):($s({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var at,Xn=l(()=>{"use strict";at=()=>!0});var Cf,jL,Yr,ld=l(()=>{"use strict";Cf=m(require("node:path")),jL=require("node:url");Xn();Yr=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Cf.default.resolve(t);return at()?r===Cf.default.resolve(__filename):r===(0,jL.fileURLToPath)(e)}});var cd,Zn,CG,bY,Qn=l(()=>{"use strict";cd="agent-witch.js",Zn="deps.tar.gz",CG="install.sh",bY={mainScript:`app/${cd}`,depsArchive:`app/${Zn}`,installShell:CG}});var FL=l(()=>{"use strict";Qn()});var zL=l(()=>{"use strict";Qn();FL()});var Bs,xf,dd,TG,Gs,_e,to,Vs,qs,Xr,If=l(()=>{"use strict";Bs=m(require("node:fs")),xf=m(require("node:path"));zL();U();dd="install-version.json",TG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Gs=(e=L())=>xf.default.join(e,dd),_e=(e=L())=>{let t=Gs(e);if(!Bs.default.existsSync(t))return null;try{let r=JSON.parse(Bs.default.readFileSync(t,"utf8"));return!TG(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},to=(e,t=L())=>{let r=Gs(t);Bs.default.mkdirSync(xf.default.dirname(r),{recursive:!0}),Bs.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Vs=(e=L())=>_e(e)?.bundleVersion??"191",qs=(e,t)=>{let r=_e(e);if(r!==null)return r;let n={bundleVersion:"191",appOrigin:t,updatedAt:new Date().toISOString()};return to(n,e),n},Xr=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var UL,Zr,Of,Nf,Mf,ud,_t,Qr,jf=l(()=>{"use strict";UL=require("node:crypto"),Zr=m(require("node:fs")),Of=m(require("node:path"));U();Nf="self-update-log.ndjson",Mf=100,ud=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Kn({installDir:e,profileEmail:t.profileEmail});return Of.default.join(r,Nf)},_t=(e,t=L())=>{let r={id:(0,UL.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=ud(t);Zr.default.mkdirSync(Of.default.dirname(n),{recursive:!0});let o=Zr.default.existsSync(n)?Zr.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Mf+1)),JSON.stringify(r)];return Zr.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Qr=(e=20,t=L())=>{let r=ud(t);if(!Zr.default.existsSync(r))return[];let n=Zr.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var Df,jY,Hf=l(()=>{"use strict";Qn();Df="deps",jY=`${"app"}/${Zn}`});var BL=l(()=>{"use strict";Hf()});var GL,mr,en,VL,$f,Ff,qL=l(()=>{"use strict";GL=require("node:child_process"),mr=m(require("node:fs")),en=m(require("node:path"));Qn();Hf();VL=e=>en.default.join(e,"app",Df),$f=e=>{let t=en.default.join(e,"app"),r=en.default.join(t,Zn);mr.default.existsSync(r)&&(mr.default.rmSync(VL(e),{recursive:!0,force:!0}),mr.default.mkdirSync(t,{recursive:!0}),(0,GL.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),mr.default.rmSync(r,{force:!0}))},Ff=e=>{mr.default.rmSync(en.default.join(e,"node_modules"),{recursive:!0,force:!0}),mr.default.rmSync(en.default.join(e,"package.json"),{force:!0}),mr.default.rmSync(en.default.join(e,"package-lock.json"),{force:!0})}});var KL=l(()=>{"use strict";BL();qL()});var zt,pd,JL=l(()=>{"use strict";zt="https://www.agentwitch.com",pd="wss://www.agentwitch.com/api/agent-witch/ws"});var Ks,Ut,YL=l(()=>{"use strict";Ks="127.0.0.1",Ut=`http://${Ks}:43347`});var Bt=l(()=>{"use strict";JL();YL()});var Js,md,XL,Uf,xG,ZL,Vf,QL,lt,Ys,Xs,qf,Bf,Gf,Zs,Kf,Jf,Yf,ro=l(()=>{"use strict";Js=m(require("node:fs")),md=m(require("node:path")),XL="active-writer-work.json",Uf=new Set,xG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ZL=e=>e.profileEmail===null?md.default.join(e.installDir,XL):md.default.join(e.installDir,"profiles",e.profileEmail,XL),Vf=e=>{let t=ZL(e);if(!Js.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Js.default.readFileSync(t,"utf8"));return!xG(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},QL=(e,t)=>{let r=ZL(e);Js.default.mkdirSync(md.default.dirname(r),{recursive:!0}),Js.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},lt=e=>Vf(e).activeCount>0,Ys=e=>{let t=Vf(e);QL(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Xs=e=>{let t=Vf(e),r=Math.max(0,t.activeCount-1);if(QL(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let n of Uf)n()},qf=e=>(Uf.add(e),()=>{Uf.delete(e)}),Bf=null,Gf=null,Zs=e=>{Bf=e},Kf=e=>{Gf=e},Jf=()=>{let e=Bf;return Bf=null,e},Yf=()=>{let e=Gf;return Gf=null,e}});var we,Xf=l(()=>{"use strict";we=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var no,gd,Qs,Zf=l(()=>{"use strict";no="qwen2.5:7b",gd="nomic-embed-text",Qs="Install Ollama from https://ollama.com/download"});var ei,eE,Qf=l(()=>{"use strict";Zf();ei=()=>`
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
    echo "Ollama is missing. ${Qs}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Qs}" >&2
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
  agent_witch_ensure_ollama_model "${no}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${gd}" "\${pull_log}"
}
`,eE=()=>`
${ei()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var tE,IG,fd,eh=l(()=>{"use strict";tE=require("node:child_process");U();Qf();IG=e=>new Promise(t=>{let r=(0,tE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:L()}}),n=[];r.stdout.on("data",o=>{n.push(o)}),r.stderr.on("data",o=>{n.push(o)}),r.on("error",o=>{t({exitCode:1,output:o.message})}),r.on("close",o=>{t({exitCode:o??1,output:Buffer.concat(n).toString("utf8").trim()})})}),fd=async(e=IG)=>{let t=`${ei()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var gr,hd,rE,OG,nE,so,NG,MG,jG,oo,tn,rn,oE=l(()=>{"use strict";gr=m(require("node:fs")),hd=m(require("node:path"));KL();ee();U();Qn();Bt();If();ro();Xf();jf();eh();rE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),OG=e=>{let t=st(e),r=t===null?N():N(t);if(!gr.default.existsSync(r.configPath))return null;try{let n=JSON.parse(gr.default.readFileSync(r.configPath,"utf8"));return!rE(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},nE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!rE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},so=async e=>(await nE(e))?.bundleVersion??null,NG=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=hd.default.join(t,r);gr.default.mkdirSync(hd.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());gr.default.writeFileSync(o,s),r.endsWith(".js")&&gr.default.chmodSync(o,493)},MG=async()=>{Is(),await qr()},jG=(e,t)=>e!==null?we(e):t??zt,oo=(e,t)=>({localBundleVersion:t,...e}),tn=async e=>{let t=L(),r=_e(t),n=r?.bundleVersion??null,o=await fd();_t({event:"check_complete",ok:o.ok,message:o.message,localBundleVersion:n,remoteBundleVersion:null});let s=OG(t),i=jG(s,r?.appOrigin);if(i===null){let d=oo({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return _t({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}let a=await nE(i);if(a===null){let d=oo({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return _t({event:"update_failed",ok:!1,message:d.message,localBundleVersion:n,remoteBundleVersion:null}),d}if(!(e?.force===!0||Xr(n,a.bundleVersion))){let d=oo({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},n);return _t({event:"check_complete",ok:!0,message:d.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),d}try{for(let b of a.scripts)await NG(i,t,b);let d=hd.default.join(t,cd);gr.default.existsSync(d)&&gr.default.rmSync(d,{force:!0}),$f(t),Ff(t),to({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=N(st(t));if(lt(p)){let b=oo({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return _t({event:"update_applied",ok:!0,message:b.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),b}await MG();let f=oo({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return _t({event:"update_applied",ok:!0,message:f.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),f}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",f=oo({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},n);return _t({event:"update_failed",ok:!1,message:p,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),f}},rn=()=>{let e=L();return{local:_e(e),logs:Qr(20,e)}}});var sE={};St(sE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>dd,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Qs,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>gd,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>no,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Nf,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Mf,appendAgentWitchSelfUpdateLog:()=>_t,buildAgentWitchEnsureOllamaShell:()=>ei,buildAgentWitchInstallScriptOllama:()=>eE,buildAgentWitchSelfUpdateStatus:()=>rn,ensureAgentWitchInstallVersionRecorded:()=>qs,ensureAgentWitchOllamaInstalled:()=>fd,fetchAgentWitchRemoteInstallBundleVersion:()=>so,isRemoteAgentWitchBundleVersionNewer:()=>Xr,readAgentWitchInstallVersion:()=>_e,readAgentWitchSelfUpdateLogs:()=>Qr,resolveAgentWitchAppOriginFromWsUrl:()=>we,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Vs,resolveAgentWitchInstallVersionPath:()=>Gs,resolveAgentWitchSelfUpdateLogPath:()=>ud,runAgentWitchSelfUpdate:()=>tn,writeAgentWitchInstallVersion:()=>to});var Ve=l(()=>{"use strict";If();jf();oE();Xf();Zf();Qf();eh()});var th={};St(th,{buildAgentWitchSelfUpdateStatus:()=>rn,fetchAgentWitchRemoteInstallBundleVersion:()=>so,runAgentWitchSelfUpdate:()=>tn});var rh=l(()=>{"use strict";Ve()});function io(e){return(0,iE.createHash)("sha256").update(e.trim()).digest("hex")}var iE,nh=l(()=>{"use strict";iE=require("node:crypto")});var ao,ti,DG,aE,oh,lE=l(()=>{"use strict";ao=m(require("node:fs")),ti=m(require("node:path"));nh();Pe();DG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aE=e=>{if(!ao.default.existsSync(e))return null;try{let t=JSON.parse(ao.default.readFileSync(e,"utf8"));return!DG(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:io(t.pairingToken.trim())}catch{return null}},oh=(e=L())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(aE(ti.default.join(e,"config.json")));let o=ti.default.join(e,jt);if(!ao.default.existsSync(o))return t;for(let s of ao.default.readdirSync(o)){let i=ti.default.join(o,s);ao.default.statSync(i).isDirectory()&&n(aE(ti.default.join(i,"config.json")))}return t}});var sh,cE,yd,ri,ni,HG,$G,FG,dE,se,ie,Sd,wt,ct=l(()=>{"use strict";sh=m(require("node:fs")),cE=m(require("node:os")),yd=m(require("node:path")),ri={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},ni=e=>e.trim().length>0,HG=e=>{let t=yd.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},$G=()=>{let e=cE.default.homedir(),t=yd.default.join(e,".local","bin","agent");if(sh.default.existsSync(t))return t;let r=yd.default.join(e,".local","bin","cursor-agent");return sh.default.existsSync(r)?r:ri.cursorCommand},FG=e=>{let t=e.trim();return!ni(t)||t===ri.cursorCommand?$G():t},dE=(e,t)=>HG(e)?t:["agent",...t],se=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ie=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:ni(t)?t.trim():ri.claudeCommand,codexCommand:ni(r)?r.trim():ri.codexCommand,cursorCommand:FG(n),antigravityCommand:ni(o)?o.trim():ri.antigravityCommand}},Sd=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:dE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},wt=(e,t,r,n)=>{let o=t.trim();if(!ni(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:dE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",o])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var fr,zG,lo,UG,co,Ad=l(()=>{"use strict";fr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,zG=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([n,o])=>{if(typeof o!="object"||o===null)return{name:n,total:0};let s=o;return{name:n,total:fr(s.inputTokens)+fr(s.outputTokens)+fr(s.cacheReadInputTokens)+fr(s.cacheCreationInputTokens)}})].sort((n,o)=>o.total-n.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},lo=e=>{let t=e.trim(),r=t.indexOf("{"),n=t.lastIndexOf("}");if(r<0||n<=r)return null;let o;try{o=JSON.parse(t.slice(r,n+1))}catch{return null}if(typeof o!="object"||o===null)return null;let s=o;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=fr(a.input_tokens)+fr(a.cache_creation_input_tokens)+fr(a.cache_read_input_tokens),d=fr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:zG(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},UG=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),co=(e,t)=>{let r=lo(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??UG(r)}}});var ih,BG,GG,ah,lh=l(()=>{"use strict";ih=e=>e.toLocaleString("en-US"),BG=e=>e<.01?e.toFixed(4):e.toFixed(3),GG=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${BG(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${ih(e.inputTokens)} in / ${ih(e.outputTokens)} out (${ih(e.totalTokens)} total)`,t].join(`
`)},ah=(e,t)=>{if(t===void 0)return e;let r=GG(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var bd,ch=l(()=>{"use strict";bd={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var nn,dh,Pd,uh=l(()=>{"use strict";ch();nn="auto",dh=e=>({value:nn,label:`Auto (${bd[e]})`}),Pd={anthropic:[dh("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[dh("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[dh("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var uo,oi,ph,si=l(()=>{"use strict";ch();uh();uo=e=>{let t=e?.trim()??"";if(!(t.length===0||t===nn))return t},oi=(e,t)=>{let r=uo(t);return r===void 0?bd[e]:r},ph=e=>{let t=uo(e);return t===void 0?nn:t}});var _d,VG,qG,wd,uE=l(()=>{"use strict";_d={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},VG=e=>{let t=_d[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?_d["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?_d["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?_d["gemini-2.0-flash"]:null},qG=(e,t,r)=>{let n=VG(e);if(n===null)return null;let o=t/1e6*n.inputUsd,s=r/1e6*n.outputUsd;return o+s},wd=e=>{let t=qG(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var po,KG,JG,YG,vd,pE=l(()=>{"use strict";uE();po=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),KG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=po(r.input_tokens),o=po(r.output_tokens);return n===0&&o===0?null:wd({provider:"anthropic",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},JG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=po(r.prompt_tokens),o=po(r.completion_tokens);return n===0&&o===0?null:wd({provider:"openai",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},YG=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let n=po(r.promptTokenCount),o=po(r.candidatesTokenCount);return n===0&&o===0?null:wd({provider:"google",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},vd=(e,t,r)=>e==="anthropic"?KG(t,r):e==="openai"?JG(t,r):YG(t,r)});var XG,mh,ZG,QG,e2,t2,r2,gh,fh=l(()=>{"use strict";si();pE();XG=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let n=r;return n.type==="text"&&typeof n.text=="string"?n.text:""}).join(""):""},mh=(e,t,r)=>{let n=r?.trim()??"";return n.length>0?n:oi(e,t.model)},ZG=async e=>{let t=mh("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Anthropic API error (${String(r.status)})`};let o=XG(n);o.length>0&&e.onChunk?.(o);let s=vd("anthropic",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},QG=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.message;return typeof n?.content=="string"?n.content:""},e2=async e=>{let t=mh("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`OpenAI API error (${String(r.status)})`};let o=QG(n);o.length>0&&e.onChunk?.(o);let s=vd("openai",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},t2=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.content?.parts;return Array.isArray(n)?n.map(o=>{if(typeof o!="object"||o===null)return"";let s=o.text;return typeof s=="string"?s:""}).join(""):""},r2=async e=>{let t=mh("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,n=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),o=await n.json().catch(()=>null);if(!n.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Google API error (${String(n.status)})`};let s=t2(o);s.length>0&&e.onChunk?.(s);let i=vd("google",o,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},gh=async e=>{try{return e.provider==="anthropic"?await ZG(e):e.provider==="openai"?await e2(e):await r2(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var ze,ii=l(()=>{"use strict";ze=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var mE,n2,Wd,hh=l(()=>{"use strict";mE=m(require("node:path")),n2="writer-api-secrets.json",Wd=e=>mE.default.join(e,n2)});var yh,gE,o2,hr,Ne,yr=l(()=>{"use strict";yh=m(require("node:fs"));si();hh();gE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),o2=e=>{if(!gE(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,n=uo(r);return{apiKey:t,...n!==void 0?{model:n}:{}}},hr=e=>{let t=Wd(e);if(!yh.default.existsSync(t))return{};try{let r=JSON.parse(yh.default.readFileSync(t,"utf8"));if(!gE(r))return{};let n={},o=["anthropic","openai","google"];for(let s of o){let i=o2(r[s]);i!==null&&(n[s]=i)}return n}catch{return{}}},Ne=(e,t)=>hr(e)[t]??null});var ve,ai=l(()=>{"use strict";ve=e=>e==="api"?"api":"cli"});var fE,me,on,Gt=l(()=>{"use strict";fE=m(require("node:path"));ii();yr();ai();me=e=>fE.default.dirname(e),on=(e,t)=>{if(ve(e.writerExecutionBackend)!=="api")return!1;let r=ze(t);if(r===null)return!1;let n=me(e.layout.configPath),o=Ne(n,r);return o!==null&&o.apiKey.length>0}});var li,Sh=l(()=>{"use strict";lh();fh();ii();yr();Gt();li=async(e,t,r,n)=>{let o=r.trim();if(o.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=ze(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=me(e.layout.configPath),a=Ne(i,s);if(a===null){let d=Object.keys(hr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await gh({provider:s,secret:a,prompt:o,onChunk:n});return{exitCode:c.exitCode,output:ah(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var hE,mo,Ah=l(()=>{"use strict";hE=require("node:child_process");ct();Ad();Sh();Gt();mo=(e,t,r)=>new Promise(n=>{if(!se(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(on(e,t)){li(e,t,r).then(n);return}let o=wt(t,r,ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,hE.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=co(i.join("")),p=a.join("").trim(),f=[d.output.trim(),p].filter(b=>b.length>0).join(`
`);n({exitCode:c??-1,output:f})}),s.on("error",c=>{n({exitCode:-1,output:c.message})})})});var yE=l(()=>{"use strict"});var SE=l(()=>{"use strict";lh();Ah();fh();yE();yr();Gt()});var AE,bE,PE,_E=l(()=>{"use strict";AE="claude",bE="codex",PE="cursor"});var wE,s2,bh,ci,Ld=l(()=>{"use strict";wE=m(require("node:path"));Bt();bt();s2="ws://localhost:3000/api/agent-witch/ws",bh=e=>e.replace(/\/$/,""),ci=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return bh(t);let r=wE.default.basename(e.installDir);if(r===Ls.production)return pd;let n=e.configWsUrl?.trim()??"";return r===Ls.localhost?n.length>0?bh(n):s2:n.length>0?bh(n):pd}});var a2,Ph,_h=l(()=>{"use strict";_E();Ld();ai();a2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ph=e=>{if(!a2(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=ci({installDir:e.layout.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??AE,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??bE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??PE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:n,workspace:o,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:ve(t.writerExecutionBackend),layout:e.layout}}}});var wh,vh,Wh=l(()=>{"use strict";wh=m(require("node:fs"));U();_h();vh=e=>{let t=N(e);if(!wh.default.existsSync(t.configPath))return null;try{let r=JSON.parse(wh.default.readFileSync(t.configPath,"utf8")),n=Ph({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!n.ok){if(n.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return n.config}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}}});var di,vE=l(()=>{"use strict";di=(e,t,r)=>{let n=r?.trim()??"",o=e?.trim()??"";return n.length>0?o.length>0?o:null:o.length>0?o:t()}});var Lh,l2,Eh,WE=l(()=>{"use strict";Lh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),l2=e=>{if(!Lh(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",n=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||n.length===0||!Array.isArray(e.entries))return null;let o=e.entries.flatMap(s=>{if(!Lh(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(f=>{if(!Lh(f))return[];let b=typeof f.itemKey=="string"?f.itemKey.trim():"",h=typeof f.relativePath=="string"?f.relativePath:"",y=typeof f.contentSha256=="string"?f.contentSha256.trim():"";return b.length===0||y.length===0?[]:[{itemKey:b,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:n,entries:o}},Eh=l2});var LE,c2,Ed,Rh=l(()=>{"use strict";LE=m(require("node:path")),c2=(e,t)=>{let r=t.trim();return LE.default.join(e,"components","store",r.slice(0,2),r)},Ed=c2});var EE,d2,kh,RE=l(()=>{"use strict";EE=m(require("node:fs"));Rh();d2=(e,t)=>{let r=[];for(let n of t.entries)for(let o of n.items){let s=Ed(e.installDir,o.contentSha256);EE.default.existsSync(s)||r.push(o.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},kh=d2});var ui,go,u2,Ch,p2,Th,xh=l(()=>{"use strict";ui=m(require("node:fs")),go=m(require("node:path"));Rh();u2=(e,t)=>go.default.join(e.installDir,"runs",t,"overlay"),Ch=(e,t)=>go.default.join(u2(e,t),".cursor"),p2=(e,t,r)=>{let n=r.entries.filter(s=>s.scope==="run");if(n.length===0)return{ok:!0};let o=Ch(e,t);ui.default.mkdirSync(o,{recursive:!0});for(let s of n)for(let i of s.items){let a=Ed(e.installDir,i.contentSha256);if(!ui.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?go.default.join(o,c):go.default.join(o,i.itemKey);ui.default.mkdirSync(go.default.dirname(d),{recursive:!0}),ui.default.copyFileSync(a,d)}return{ok:!0}},Th=p2});var Ih,kE,m2,pi,CE=l(()=>{"use strict";Ih=m(require("node:fs")),kE=m(require("node:path")),m2=(e,t)=>{let r=kE.default.join(e.installDir,"runs",t);Ih.default.existsSync(r)&&Ih.default.rmSync(r,{recursive:!0,force:!0})},pi=m2});var g2,Oh,TE=l(()=>{"use strict";xh();g2=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let n=Ch(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:n}},Oh=g2});var Nh,f2,h2,y2,S2,A2,H,xE=l(()=>{"use strict";Nh=m(require("node:fs"));Ld();U();ai();f2="claude",h2="codex",y2="cursor",S2="agy",A2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=N();if(!Nh.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Nh.default.readFileSync(e.configPath,"utf8"));if(!A2(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=ci({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,writerExecutionBackend:ve(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:f2,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:h2,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:y2,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:S2,pairingToken:s,layout:e}}catch{return null}}});var Rd,IE,OE=l(()=>{"use strict";Rd=m(require("node:fs"));hh();IE=(e,t)=>{let r=Wd(e);Rd.default.mkdirSync(e,{recursive:!0}),Rd.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Rd.default.chmodSync(r,384)}catch{}}});var kd,NE,Mh=l(()=>{"use strict";kd=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),n=t.slice(-4);return`${r}${"\u2022".repeat(12)}${n}`},NE=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===kd(t)}});var mi,b2,jh,Dh,ME=l(()=>{"use strict";mi=m(require("node:fs"));yr();OE();Mh();si();Gt();b2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jh=(e,t,r,n)=>{let o=e[t],s=r?.trim()??"",i=NE(s,o?.apiKey)?"":s,a=i.length>0?i:o?.apiKey;if(a===void 0||a.length===0)return e;let c=n!==void 0?uo(n):o?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Dh=e=>{let t=me(e.configPath),r={};if(mi.default.existsSync(e.configPath))try{let o=JSON.parse(mi.default.readFileSync(e.configPath,"utf8"));b2(o)&&(r={...o})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,mi.default.mkdirSync(t,{recursive:!0}),mi.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let n=jh(jh(jh(hr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);IE(t,n)}});var Hh,jE=l(()=>{"use strict";Hh={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var $h,DE=l(()=>{"use strict";ii();yr();Gt();Gt();$h=(e,t)=>{if(on(e,t))return!1;let r=ze(t);if(r===null)return!1;let n=me(e.layout.configPath),o=Ne(n,r);return o===null||o.apiKey.trim().length===0}});var HE,Fh,zh=l(()=>{"use strict";HE=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let n=e.readConfig(r);return n===null?[]:[n]})},Fh=async e=>{let t=HE(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=HE(e);if(o.length>0){r(o);return}setTimeout(n,e.pollIntervalMs)};n()}))}});var P2,Uh,$E=l(()=>{"use strict";ee();Wh();zh();P2=1e4,Uh=()=>Fh({listProfileEmails:ed,readConfig:vh,pollIntervalMs:P2,logWaiting:e=>{console.error(e)}})});var ae=l(()=>{"use strict";Ah();SE();Wh();Ld();vE();WE();RE();xh();CE();TE();ai();xE();ME();yr();Gt();Mh();si();jE();Sh();Gt();DE();ii();yr();$E();_h();zh()});var Cd,FE,_2,w2,zE,Td,gi,xd,fi=l(()=>{"use strict";Cd=m(require("node:fs")),FE=m(require("node:path")),_2="wake-port.json",w2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zE=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Td=e=>FE.default.join(e,_2),gi=e=>{let t=Td(e);if(!Cd.default.existsSync(t))return null;try{let r=JSON.parse(Cd.default.readFileSync(t,"utf8"));if(w2(r)&&zE(r.wakePort))return r.wakePort}catch{return null}return null},xd=(e,t)=>{if(!zE(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Td(e);Cd.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var XQ,ZQ,QQ,dt,UE,hi=l(()=>{"use strict";fi();Pe();fi();XQ=ot(),ZQ=`${te()}-wake`,QQ=te(),dt=()=>{let e=L(),t=gi(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return ot()},UE=e=>{let t=L();gi(t)===null&&xd(t,e)}});var BE=l(()=>{"use strict";nh();ee();lE();ae();hi()});var Bh,yi,Si,GE=l(()=>{"use strict";Bh=m(require("node:os"));BE();yi=()=>{let e=Q();return{ok:!0,port:dt(),hostname:Bh.default.hostname(),profileCount:e.length}},Si=()=>{let e=Q(),t=H()?.pairingToken.trim()??"",r=t.length>0?io(t):null,n=oh();return{hostname:Bh.default.hostname(),port:dt(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var Gh=l(()=>{"use strict";GE()});var VE,qE,KE,Id,fo=l(()=>{"use strict";VE="materialization.json",qE="backups",KE=".gitignore",Id=e=>`harness-set:${e.trim()}`});var JE,YE,Od,XE=l(()=>{"use strict";JE=m(require("node:crypto")),YE=m(require("node:fs")),Od=e=>{try{let t=YE.default.readFileSync(e);return JE.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Sr,sn,v2,ZE,Vh,QE=l(()=>{"use strict";Sr=m(require("node:fs")),sn=m(require("node:path"));XE();v2=(e,t,r,n)=>{let o=new Date().toISOString().replaceAll(":","-"),s=sn.default.join(t,o,n);return Sr.default.mkdirSync(sn.default.dirname(s),{recursive:!0}),Sr.default.copyFileSync(r,s),sn.default.relative(e,s).replaceAll("\\","/")},ZE=e=>{let t=sn.default.join(e.repoRoot,e.repoRelativeDestination),r=Od(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let n=e.ledger.entries[e.repoRelativeDestination];if(Sr.default.existsSync(t)){let o=Od(t);if(o===r)return{kind:"skipped_unchanged"};if(!(n!==void 0&&n.componentId===e.componentId)&&o!==null){let i=v2(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Sr.default.mkdirSync(sn.default.dirname(t),{recursive:!0}),Sr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Sr.default.mkdirSync(sn.default.dirname(t),{recursive:!0}),Sr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},Vh=e=>{let t=Od(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var qh,eR,Nd,Kh=l(()=>{"use strict";qh=m(require("node:fs"));fo();eR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nd=e=>{if(!qh.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(qh.default.readFileSync(e,"utf8"));if(eR(t)&&t.version===1&&eR(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Ar,Md,tR,rR=l(()=>{"use strict";Ar=m(require("node:fs")),Md=m(require("node:path"));fo();tR=e=>{let t=new Set(e.setSlugs.map(s=>Id(s))),r=[],n=[],o={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){o[s]=i;continue}let a=Md.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Md.default.join(e.repoRoot,i.backupPath);Ar.default.existsSync(c)?(Ar.default.mkdirSync(Md.default.dirname(a),{recursive:!0}),Ar.default.copyFileSync(c,a),n.push(s)):Ar.default.existsSync(a)&&Ar.default.rmSync(a,{force:!0})}else Ar.default.existsSync(a)&&Ar.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:o},summary:{removedPaths:r,restoredPaths:n}}}});var Jh,jd,Yh=l(()=>{"use strict";Jh=m(require("node:path"));fo();jd=e=>({ledgerFilePath:Jh.default.join(e.metaDirPath,VE),backupsDirPath:Jh.default.join(e.metaDirPath,qE)})});var Xh,nR,oR=l(()=>{"use strict";Xh=m(require("node:path")),nR=(e,t)=>{let n=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(n.length===0)return Xh.default.posix.join("rules",e,"file");let o=n[n.length-1]??"file",s=n[0]??"rules";return Xh.default.posix.join(s,e,o)}});var Zh,sR,Qh,iR=l(()=>{"use strict";Zh=m(require("node:fs")),sR=m(require("node:path")),Qh=(e,t)=>{Zh.default.mkdirSync(sR.default.dirname(e),{recursive:!0}),Zh.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var ey,W2,qe,bi=l(()=>{"use strict";ey=m(require("node:os")),W2=e=>{let t=e.trim();return t.startsWith("~/")?`${ey.default.homedir()}${t.slice(1)}`:t==="~"?ey.default.homedir():t},qe=W2});var Dd,aR,L2,lR,cR=l(()=>{"use strict";Dd=m(require("node:fs")),aR=m(require("node:path"));fo();Kr();L2=`*
!${nd}
`,lR=e=>{let t=aR.default.join(e,KE);Dd.default.existsSync(t)||(Dd.default.mkdirSync(e,{recursive:!0}),Dd.default.writeFileSync(t,L2))}});var an,Ke,ln=l(()=>{"use strict";an=m(require("node:path"));Kr();bi();Ke=e=>{let t=qe(e),r=an.default.join(t,SL);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:an.default.join(r,"rag"),memoryDirPath:an.default.join(r,AL),reportsDirPath:an.default.join(r,PL),metaFilePath:an.default.join(r,nd),ragChunksFilePath:an.default.join(r,"rag",bL)}}});var vt,uR,E2,R2,Ue,ty=l(()=>{"use strict";vt=m(require("node:fs")),uR=m(require("node:path"));Kr();cR();ln();E2=(e,t)=>{if(vt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};vt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},R2=e=>{vt.default.existsSync(e.ragChunksFilePath)||vt.default.writeFileSync(e.ragChunksFilePath,"");let t=uR.default.join(e.memoryDirPath,Jn);vt.default.existsSync(t)||vt.default.writeFileSync(t,"")},Ue=e=>{let t=Ke(e.projectFolderPath);return vt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),vt.default.mkdirSync(t.ragDirPath,{recursive:!0}),vt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),lR(t.metaDirPath),E2(t,e),R2(t),{ok:!0,layout:t}}});var pR,mR,gR,fR,Hd,$d=l(()=>{"use strict";pR="components",mR="store",gR="versions",fR="installed.json",Hd=e=>`harness-set:${e.trim()}`});var ry,hR,Fd,ny=l(()=>{"use strict";ry=m(require("node:fs")),hR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fd=e=>{if(!ry.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(ry.default.readFileSync(e,"utf8"));if(hR(t)&&t.version===1&&hR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var Pi,ho,zd=l(()=>{"use strict";Pi=m(require("node:path"));$d();ho=e=>{let t=Pi.default.join(e,pR);return{componentsRootDir:t,storeDir:Pi.default.join(t,mR),versionsDir:Pi.default.join(t,gR),installedFilePath:Pi.default.join(t,fR)}}});var oy,yR,Ud,Bd,Gd=l(()=>{"use strict";oy=m(require("node:crypto")),yR=m(require("node:fs")),Ud=e=>oy.default.createHash("sha256").update(e,"utf8").digest("hex"),Bd=e=>{try{let t=yR.default.readFileSync(e);return oy.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var sy,SR,AR,bR=l(()=>{"use strict";sy=m(require("node:fs")),SR=m(require("node:path")),AR=(e,t)=>{sy.default.mkdirSync(SR.default.dirname(e),{recursive:!0}),sy.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var iy,ay,PR,_R=l(()=>{"use strict";iy=m(require("node:fs")),ay=m(require("node:path")),PR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),n=ay.default.join(e,r),o=ay.default.join(n,`${t.versionId}.json`);iy.default.mkdirSync(n,{recursive:!0}),iy.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`)}});var Vd,wR,vR,WR=l(()=>{"use strict";Vd=m(require("node:fs")),wR=m(require("node:path"));Gd();vR=e=>{let t=Ud(e.content),r=wR.default.join(e.storeDir,t);return Vd.default.existsSync(r)||(Vd.default.mkdirSync(e.storeDir,{recursive:!0}),Vd.default.writeFileSync(r,e.content)),t}});var ly,LR,k2,qd,cy=l(()=>{"use strict";ly=m(require("node:fs")),LR=m(require("node:path"));$d();ny();zd();Gd();bR();_R();WR();k2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qd=e=>{let t=ho(e.installDir),r=Hd(e.setSlug),n=String(e.setEntry.version),o=[];for(let i of e.setEntry.items){if(!k2(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=LR.default.join(e.harnessRootDir,a);if(!ly.default.existsSync(c))continue;let d=ly.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Bd(c);if(p!==null){if(Ud(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);vR({storeDir:t.storeDir,content:d}),o.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(o.length===0)return;PR(t.versionsDir,{version:1,componentId:r,versionId:n,items:o,createdAt:new Date().toISOString()});let s=Fd(t.installedFilePath);AR(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:n,installedAt:new Date().toISOString()}}})}});var uy,dy,ER,RR=l(()=>{"use strict";uy=m(require("node:fs"));cy();ny();zd();dy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ER=e=>{if(!uy.default.existsSync(e.harnessManifestPath))return;let t=ho(e.installDir),r=Fd(t.installedFilePath);if(Object.keys(r.components).length>0)return;let n;try{n=JSON.parse(uy.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!dy(n)||n.version!==1||!dy(n.sets)))for(let[o,s]of Object.entries(n.sets)){if(!dy(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];qd({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:o,setEntry:{version:i,items:a}})}}});var py,kR,CR,TR=l(()=>{"use strict";py=m(require("node:fs")),kR=m(require("node:path")),CR=e=>{let t=e.componentId.replaceAll("/","_"),r=kR.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!py.default.existsSync(r))return null;try{let n=JSON.parse(py.default.readFileSync(r,"utf8"));if(typeof n=="object"&&n!==null&&n.version===1)return n}catch{return null}return null}});var Kd,Jd,xR,IR=l(()=>{"use strict";Kd=m(require("node:fs")),Jd=m(require("node:path"));$d();RR();TR();zd();Gd();xR=e=>{ER({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=ho(e.layout.installDir),r=Hd(e.setSlug),n=CR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(n!==null){let i=n.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Jd.default.join(t.storeDir,i.contentSha256);if(Kd.default.existsSync(a)&&Bd(a)===i.contentSha256)return a}}let o=e.manifestItemPath.trim();if(o.length===0)return null;let s=o.startsWith("shared/")?Jd.default.join(e.layout.harnessRootDir,o):Jd.default.join(e.layout.harnessSetsDir,e.setSlug,o);if(!Kd.default.existsSync(s))return null;try{if(!Kd.default.statSync(s).isFile())return null}catch{return null}return s}});var OR,C2,T2,br,Yd=l(()=>{"use strict";Kh();Yh();ln();OR="harness-set:",C2=e=>{let t=e.trim();if(!t.startsWith(OR))return null;let r=t.slice(OR.length).trim();return r.length>0?r:null},T2=e=>{let t=new Set;for(let r of Object.values(e.entries)){let n=C2(r.componentId);n!==null&&t.add(n)}return[...t].sort((r,n)=>r.localeCompare(n))},br=e=>{let t=Ke(e),{ledgerFilePath:r}=jd(t),n=Nd(r);return T2(n)}});var Xd,my,_i,x2,Vt,wi,yo=l(()=>{"use strict";Xd=m(require("node:fs")),my=m(require("node:os")),_i=m(require("node:path")),x2=()=>Xd.default.realpathSync(_i.default.resolve(my.default.homedir())),Vt=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?_i.default.join(my.default.homedir(),t.slice(1)):t,n;try{n=Xd.default.realpathSync(_i.default.resolve(r))}catch{return null}let o=x2();return n===o||n.startsWith(`${o}${_i.default.sep}`)?n:null},wi=e=>{let t=Vt(e);if(t===null)return null;try{if(!Xd.default.statSync(t).isFile())return null}catch{return null}return t}});var gy,fy=l(()=>{"use strict";gy=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Qd,NR,Zd,I2,vi,hy=l(()=>{"use strict";Qd=m(require("node:fs")),NR=m(require("node:path"));fo();QE();Kh();rR();Yh();oR();iR();bi();ty();IR();Yd();yo();fy();Zd=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),I2=e=>{if(!Qd.default.existsSync(e))return null;try{let t=JSON.parse(Qd.default.readFileSync(e,"utf8"));if(Zd(t)&&t.version===1)return t}catch{return null}return null},vi=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=qe(e.projectFolderPath),n=Vt(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=Qd.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Ue({projectFolderPath:n}),{ledgerFilePath:i,backupsDirPath:a}=jd(s.layout),d=br(n).filter(A=>!t.includes(A)),p=Nd(i),f=0;if(d.length>0){let A=tR({repoRoot:n,setSlugs:d,ledger:p});p=A.ledger,f=A.summary.removedPaths.length}if(t.length===0)return Qh(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:f,projectFolderPath:n,appliedSetSlugs:[]};let b=I2(e.layout.harnessManifestPath);if(b===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Zd(b.sets)?b.sets:{},y=0,u=0,S=0;for(let A of t){let g=h[A];if(!Zd(g))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let _=typeof g.version=="number"?String(g.version):"1",w=Id(A),W=Array.isArray(g.items)?g.items:[];for(let E of W){if(!Zd(E))continue;let R=typeof E.path=="string"?E.path.trim():"";if(R.length===0)continue;let C=gy(R);if(C===null)continue;let I=nR(A,C),D=NR.default.posix.join(".cursor",I).replaceAll("\\","/"),oe=typeof E.id=="string"?E.id.trim():"",q=xR({layout:e.layout,setSlug:A,setVersion:typeof g.version=="number"?g.version:1,manifestItemPath:R,manifestItemId:oe});if(q===null)continue;let G=ZE({repoRoot:n,backupsDir:a,repoRelativeDestination:D,sourceAbsolutePath:q,componentId:w,versionId:_,ledger:p});if(G.kind==="skipped_unchanged"){u+=1;continue}if(G.kind==="backed_up_user_file"){S+=1,y+=1,p={version:1,entries:{...p.entries,[D]:Vh({componentId:w,versionId:_,sourceAbsolutePath:q,backupPath:G.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[D]:Vh({componentId:w,versionId:_,sourceAbsolutePath:q})}}}}return y===0&&u===0&&f===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Qh(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:S,removedLedgerPathCount:f,projectFolderPath:n,appliedSetSlugs:t})}});var MR,eu,O2,N2,M2,j2,D2,H2,$2,F2,z2,Wi,tu=l(()=>{"use strict";MR=m(require("node:crypto")),eu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},O2=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},N2=(e,t)=>{let r=O2(t),n=eu(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},M2=(e,t,r)=>{let n=N2(t,r);return`shared/items/${e}/${n}`},j2=["rules","skills","commands","instructions","agents"],D2=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),H2=(e,t)=>[...e.filter(n=>n.id!==t.id),t],$2=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},F2=e=>MR.default.createHash("sha256").update(e,"utf8").digest("hex"),z2=e=>({id:e.id,kind:e.kind,title:e.title,path:M2(e.id,e.kind,e.title),contentSha256:F2(e.content)}),Wi=e=>{let t=new Date().toISOString(),r=e.existingManifest??D2(e.hostname,t),n=eu(e.bundle.slug),o=$2(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...j2.map(d=>`sets/${n}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let f=z2(p);return{files:[...d.files,{relativePath:f.path,content:p.content}],nextItems:H2(d.nextItems,f)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var Pr,jR,ru,U2,cn,yy=l(()=>{"use strict";Pr=m(require("node:fs")),jR=m(require("node:os")),ru=m(require("node:path"));tu();U2=e=>{if(!Pr.default.existsSync(e))return null;try{let t=JSON.parse(Pr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},cn=e=>{try{let t=U2(e.layout.harnessManifestPath),r=Wi({bundle:e.bundle,hostname:jR.default.hostname(),existingManifest:t});Pr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let n of r.directories)Pr.default.mkdirSync(ru.default.join(e.layout.harnessRootDir,n),{recursive:!0});for(let n of r.files){let o=ru.default.join(e.layout.harnessRootDir,n.relativePath);Pr.default.mkdirSync(ru.default.dirname(o),{recursive:!0}),Pr.default.writeFileSync(o,n.content)}return Pr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var Sy,DR=l(()=>{"use strict";yy();hy();Sy=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=cn({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return vi({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var HR,$R=l(()=>{"use strict";HR=["rule","skill","command","instruction","agent"]});var FR,B2,G2,Wt,Ay=l(()=>{"use strict";$R();FR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B2=e=>typeof e=="string"&&HR.includes(e),G2=e=>{if(!FR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!B2(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Wt=e=>{if(!FR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=G2(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var zR,V2,by,UR=l(()=>{"use strict";zR=require("node:zlib");Ay();V2="x-agent-witch-token",by=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[V2]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let n=r.headers.get("x-content-sha256")?.trim()??"";if(n.length>0&&n!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let o=Buffer.from(await r.arrayBuffer()),s=(0,zR.gunzipSync)(o).toString("utf8"),i=JSON.parse(s),a=Wt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var _y,Py,_r,BR=l(()=>{"use strict";_y=m(require("node:fs")),Py=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_r=e=>{if(!_y.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(_y.default.readFileSync(e.harnessManifestPath,"utf8"));if(!Py(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=Py(t.sets)?t.sets:{},o=Object.entries(n).map(([s,i])=>{if(!Py(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var nu,GR=l(()=>{"use strict";nu=()=>"~"});var VR,qR,KR=l(()=>{"use strict";VR=require("node:crypto"),qR=e=>`local-${(0,VR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var wy,JR=l(()=>{"use strict";wy=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Li,ou,vy=l(()=>{"use strict";Li=m(require("node:path")),ou=e=>{let t=Li.default.dirname(e),r=Li.default.basename(t);return r==="agents"?Li.default.basename(Li.default.dirname(t)):r}});var Ei,qt,YR,q2,K2,J2,su,XR,Wy=l(()=>{"use strict";Ei=m(require("node:fs")),qt=m(require("node:path"));KR();JR();vy();YR=new Set(["node_modules",".git","dist","build",".next","coverage"]),q2=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},K2=(e,t)=>{let r=qt.default.basename(t);if(e==="skill"){let n=t.split(qt.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},J2=e=>{let t=[],r=(o,s)=>{let i;try{i=Ei.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&YR.has(a.name))continue;let c=qt.default.join(o,a.name),d=s?qt.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;wy(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=qt.default.join(e,o);Ei.default.existsSync(s)&&r(s,o)}let n=qt.default.join(e,"skills");return Ei.default.existsSync(n)&&r(n,"skills"),t},su=e=>{let t=J2(e);if(t.length===0)return null;let r=qt.default.dirname(e),n=ou(e),o=q2(n),s=t.map(i=>{let a=wy(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:qR(i.absolutePath),kind:a,title:K2(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},XR=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=Ei.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||YR.has(a.name))continue;let c=qt.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var ZR,Ly,Y2,Ey,QR=l(()=>{"use strict";ZR=m(require("node:fs")),Ly=m(require("node:path"));Wy();yo();Y2=e=>{let t=Vt(e.trim());if(t===null)return null;if(Ly.default.basename(t)===".cursor")return t;let r=Ly.default.join(t,".cursor");try{if(ZR.default.statSync(r).isDirectory())return Vt(r)}catch{return null}return null},Ey=e=>{let t=Y2(e.projectPath);if(t===null)return null;let r=su(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var ek,X2,iu,Ry,tk=l(()=>{"use strict";ek=m(require("node:path"));Wy();yo();vy();X2=5,iu=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Ry=e=>{let t=Vt(e.scanRoot.trim());if(t===null)return iu(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of XR(t,X2,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=Vt(s);if(i===null)continue;let a=ou(i);iu(e.response,"folder",{cursorDir:i,groupName:a,repoPath:ek.default.dirname(i)});let c=su(i);c!==null&&(r.push(c),iu(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return iu(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var rk,nk,ok=l(()=>{"use strict";rk=m(require("node:path")),nk=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:rk.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var ke,sk,ky,Z2,Cy,Ty,au,xy,Ri,ik=l(()=>{"use strict";ke=m(require("node:fs")),sk=m(require("node:os")),ky=m(require("node:path"));tu();cy();yo();ok();Z2=e=>{if(!ke.default.existsSync(e))return null;try{let t=JSON.parse(ke.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Cy=e=>{let t=e.hostname??sk.default.hostname(),r=Z2(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let f=wi(p.sourcePath);if(f===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let b=ke.default.readFileSync(f,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:b,setSlugs:[i.slug]})}let d=Wi({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)o.add(p);for(let p of d.files)s.push(p),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{ke.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)ke.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=ky.default.join(e.layout.harnessRootDir,i.relativePath);ke.default.mkdirSync(ky.default.dirname(a),{recursive:!0}),ke.default.writeFileSync(a,i.content)}ke.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=eu(i.slug),d=r.sets[c];d!==void 0&&qd({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},Ty="reveal-cache.json",au=(e,t)=>{ke.default.mkdirSync(e.harnessRootDir,{recursive:!0}),ke.default.writeFileSync(`${e.harnessRootDir}/${Ty}`,`${JSON.stringify(t,null,2)}
`)},xy=e=>{let t=`${e.harnessRootDir}/${Ty}`;ke.default.existsSync(t)&&ke.default.unlinkSync(t)},Ri=e=>{let t=`${e.harnessRootDir}/${Ty}`;if(!ke.default.existsSync(t))return null;try{let r=JSON.parse(ke.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return nk(r)}catch{return null}return null}});var dn=l(()=>{"use strict";hy();DR();fy();yy();UR();Ay();tu();BR();GR();QR();yo();tk();ik()});var Iy,ak=l(()=>{"use strict";dn();Pe();Iy=e=>{let t=N(e.profileEmail);return cn({bundle:e.bundle,layout:t})}});var lk=l(()=>{"use strict";ak();dn()});var Q2,ck,e5,dk,un,lu,uk=l(()=>{"use strict";Q2=["agentwitch.com","www.agentwitch.com"],ck=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,e5=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},dk=e=>{let t=e5(e);return!!(Q2.includes(t)||ck.test(e.trim().toLowerCase()))},un=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return dk(r)?ck.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},lu=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:un(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var ki=l(()=>{"use strict";uk()});var Kt,Ci=l(()=>{"use strict";Kt=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Ti,pk=l(()=>{"use strict";lk();ki();Ci();Ti=e=>{if(!Kt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Wt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!un(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=Iy({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}}});var Oy=l(()=>{"use strict";pk()});var t5,So,Ny=l(()=>{"use strict";t5=e=>e==="hourly"||e==="daily"||e==="weekdays",So=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!t5(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var xi,cu,mk,gk,My,ut,du,uu,pu,mu,gu=l(()=>{"use strict";xi=m(require("node:fs")),cu=m(require("node:path"));Ny();mk="automations.json",gk=e=>e.profileEmail!==null?cu.default.join(e.installDir,"profiles",e.profileEmail,mk):cu.default.join(e.installDir,mk),My=()=>({version:1,automations:[]}),ut=e=>{let t=gk(e);if(!xi.default.existsSync(t))return My();try{let r=JSON.parse(xi.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?My():{version:1,automations:r.automations.flatMap(o=>{let s=So(o);return s!==null?[s]:[]})}}catch{return My()}},du=(e,t)=>{let r=gk(e);xi.default.mkdirSync(cu.default.dirname(r),{recursive:!0}),xi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},uu=(e,t)=>{du(e,{version:1,automations:t})},pu=(e,t)=>{let n=ut(e).automations.filter(o=>o.id!==t.id);du(e,{version:1,automations:[...n,t]})},mu=(e,t)=>ut(e).automations.find(r=>r.id===t)??null});var Me,wr=l(()=>{"use strict";Me="x-agent-witch-token"});var X,pn,jy,Ii,Dy,r5,Hy,Oi,Ni,$y,Mi=l(()=>{"use strict";wr();Ve();X=e=>{let t=we(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},pn=e=>({[Me]:e,"Content-Type":"application/json"}),jy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:pn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Ii=async(e,t,r,n,o)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:pn(e.pairingToken),body:JSON.stringify({exitCode:r,output:n,...typeof o?.estimateSeconds=="number"?{estimateSeconds:o.estimateSeconds}:{},...typeof o?.actualSeconds=="number"?{actualSeconds:o.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Dy=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:pn(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},r5=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let n of t.projects){if(typeof n!="object"||n===null)continue;let o=n,s=typeof o.id=="string"?o.id.trim():"",i=typeof o.name=="string"?o.name.trim():"",a=typeof o.folderPath=="string"?o.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},Hy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:pn(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n;if(o.ok!==!0||typeof o.project!="object")return null;let s=o.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Oi=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:pn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return r5(r)}catch{return null}},Ni=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:pn(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},$y=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:pn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var mn,fk,hk,n5,Fy,yk,zy=l(()=>{"use strict";mn=m(require("node:fs")),fk=m(require("node:path")),hk=e=>fk.default.join(e.harnessRootDir,"projects-registry.json"),n5=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),Fy=e=>{let t=hk(e);if(!mn.default.existsSync(t))return[];try{let r=JSON.parse(mn.default.readFileSync(t,"utf8"));return n5(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string").map(n=>({id:n.id,name:n.name,projectFolderPath:n.projectFolderPath,addedAt:typeof n.addedAt=="string"?n.addedAt:new Date().toISOString(),...typeof n.cloudProjectId=="string"&&n.cloudProjectId.length>0?{cloudProjectId:n.cloudProjectId}:{}})):[]}catch{return[]}},yk=e=>{let t=hk(e);if(!mn.default.existsSync(t))return;let r=`${t}.migrated`;if(mn.default.existsSync(r)){mn.default.unlinkSync(t);return}mn.default.renameSync(t,r)}});var Sk,o5,s5,Ak,bk=l(()=>{"use strict";bi();Sk=e=>qe(e),o5=e=>new Set(e.map(t=>Sk(t.folderPath))),s5=e=>new Set(e.map(t=>t.id)),Ak=(e,t)=>{let r=o5(t),n=s5(t),o=[],s=new Set;for(let i of e){let a=Sk(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&n.has(i.cloudProjectId)||(s.add(a),o.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return o}});var Uy,By=l(()=>{"use strict";Mi();zy();bk();Uy=async(e,t)=>{let r=Fy(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let n=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let o=await Oi(n);if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=Ak(r,o),i=r.length-s.length,a=0,c=0;for(let d of s)await Hy(n,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&yk(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var Gy,gn,fu=l(()=>{"use strict";Gy=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),gn=(e,t)=>e.find(r=>r.id===t)??null});var Ao,hu=l(()=>{"use strict";Mi();By();fu();Ao=async(e,t)=>{t!==void 0&&await Uy(t,e);let r=X({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let n=await Oi(r);if(n===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let o=Gy(n);return{ok:!0,projects:o,message:o.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${o.length} project${o.length===1?"":"s"} from Agent Witch Console.`}}});var Pk=l(()=>{"use strict"});var Ce,_k,i5,a5,l5,c5,bo,Vy=l(()=>{"use strict";Ce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_k=(e,t)=>e.length===0?`<p class="empty">${Ce(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Ce(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Ce(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,i5=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,a5=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ce(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,l5=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?a5(e.project):i5();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(n=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Ce(n.slug)}"${t.size===0||t.has(n.slug)?" checked":""} />
            <span><strong>${Ce(n.name)}</strong> <span class="muted mono">(${Ce(n.slug)})</span></span>
          </label>
          <p class="muted">${n.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ce(e.project.id)}" />
        <p class="field-label">Installed</p>
        <p class="lede">Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.</p>
        ${r}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`},c5=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Ce(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Ce(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},bo=e=>{let t=e.flashError?`<div class="alert-error">${Ce(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ce(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},n=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${Ce(c)}</a>`,o=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=l5({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=_k(o,"No workflows installed for this project yet."):e.activeTab==="agents"?i=_k(s,"No agents installed for this project yet."):i=c5({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Ce(e.project.name)}</h1>
      <p class="muted mono">${Ce(e.project.projectFolderPath)}</p>
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
    </section>`}});var d5,u5,wk,vk=l(()=>{"use strict";dn();wr();d5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),u5=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();return!d5(n)||n.ok!==!0||!Array.isArray(n.bundles)?null:n.bundles.flatMap(o=>{let s=Wt(o);return s===null?[]:[s]})}catch{return null}},wk=u5});var Wk,qy,Lk=l(()=>{"use strict";ae();dn();Vy();hu();vk();fu();Yd();Mi();Wk=e=>({kind:"page",title:e.project.name,body:bo({project:e.project,installed:_r(e.layout),linkedSetSlugs:br(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),qy=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let n=await Ao(r,e.layout),o=gn(n.projects,t);if(o===null)return{kind:"not_found"};let s=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await wk(s,o.id);if(i===null)return Wk({layout:e.layout,project:o,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=Sy({layout:e.layout,projectFolderPath:o.projectFolderPath,bundles:i});if(!a.ok)return Wk({layout:e.layout,project:o,errorMessage:a.errorMessage});let c=s===null?!1:await Ni(s,o.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(o.id)}&${d.toString()}`}}});var p5,Ky,Ek=l(()=>{"use strict";p5=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,Ky=p5});var Rk,kk,m5,g5,yu,Su,Ck=l(()=>{"use strict";Rk=require("node:child_process"),kk=require("node:util"),m5=(0,kk.promisify)(Rk.execFile),g5=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},yu=async(e,t)=>{try{let{stdout:r}=await m5("git",t,{cwd:e,env:g5(),maxBuffer:1048576});return r.trim()}catch{return null}},Su=async e=>{let t=await yu(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await yu(e,["rev-parse","--abbrev-ref","HEAD"]),n=await yu(e,["status","--porcelain"]),o=await yu(e,["diff","--shortstat","HEAD"]),s=n===null||n.length===0?0:n.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:o===null||o.length===0?null:o}}});var Jy,Tk=l(()=>{"use strict";Jy=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",n=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,o=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${n}; ${o}; ${s}; ${i.join("; ")}.`}});var f5,Yy,xk=l(()=>{"use strict";f5=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",n=r.length>0?r:t.length>0?t:"Lesson from completed run";return n.length<=280?n:`${n.slice(0,277)}\u2026`},Yy=f5});var h5,Xy,Ik=l(()=>{"use strict";wr();h5=async(e,t,r)=>{try{let n=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Me]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!n.ok)return!1;let o=await n.json();return typeof o=="object"&&o!==null&&o.ok===!0}catch{return!1}},Xy=h5});var Ok,vr,Nk=l(()=>{"use strict";Ok=require("node:child_process"),vr=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,n=(0,Ok.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return n.length>0?n:null}catch{return null}}});var Mk=l(()=>{"use strict";hu()});var ji,jk=l(()=>{"use strict";wr();ji=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Me]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var pt=l(()=>{"use strict";hu();fu();Pk();bi();ty();Lk();Yd();Ek();Ck();Tk();xk();Ik();Nk();Mk();jk();By();zy();Mi()});var Au,Di,Dk,Zy,fn,Qy=l(()=>{"use strict";Au=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},Di=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=Au(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},Dk=e=>e>=1&&e<=5,Zy=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Au(t,"UTC")},fn=e=>{let t=e.from??new Date,r=Au(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Di(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=Di(r,e.timeZone,n,0),s=Au(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?Di(Zy(r),e.timeZone,n,0):o;if(!i&&Dk(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=Zy(a),Dk(a.weekday))return Di(a,e.timeZone,n,0);return Di(Zy(r),e.timeZone,n,0)}});var Hk,eS,Jt,tS=l(()=>{"use strict";Hk=require("node:crypto");ae();pt();Qy();gu();eS=!1,Jt=async e=>{if(eS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=mu(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};eS=!0;let o=(0,Hk.randomUUID)();try{let s=await mo(t,"claude-cli",n.prompt);await $y(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=fn({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return pu(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{eS=!1}}});var bu,$k=l(()=>{"use strict";ae();tS();gu();bu=async()=>{let e=H();if(e===null)return;let t=ut(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await Jt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var Hi=l(()=>{"use strict";gu();$k();tS();Qy()});var Fk=l(()=>{"use strict";Hi()});var zk=l(()=>{"use strict";Ny()});var Uk=l(()=>{"use strict";zk()});var rS=l(()=>{"use strict";Hi()});var y5,S5,$i,nS=l(()=>{"use strict";Fk();Uk();rS();Pe();y5=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),S5=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??fn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??fn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},$i=e=>{let t=y5(e.profileEmail),r=ut(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=So(s);return i!==null?[S5(i,n.get(i.id))]:[]});return uu(t,o),{ok:!0,writtenCount:o.length}}});var oS=l(()=>{"use strict";Hi()});var Bk=l(()=>{"use strict";ae()});var Gk=l(()=>{"use strict";nS();oS();rS();Bk()});var Vk,Fi,zi,Ui,qk=l(()=>{"use strict";Vk=m(require("node:os"));Gk();ki();Ci();Fi=e=>{if(!Kt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!un(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=$i({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},zi=async e=>{if(!Kt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:un(t)?Jt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Ui=()=>{let e=H(),t=e!==null?ut(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Vk.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var sS=l(()=>{"use strict";qk()});var Pu=l(()=>{"use strict";ee()});var _u=l(()=>{"use strict";ee()});var wu,Jk,Yk,Kk,A5,b5,Po,iS=l(()=>{"use strict";wu=m(require("node:fs")),Jk=m(require("node:os")),Yk=m(require("node:path"));Pu();_u();fi();Pe();Kk=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},A5=e=>Yk.default.join(Jk.default.homedir(),"Library","LaunchAgents",`${e}.plist`),b5=async e=>wu.default.existsSync(A5(e))?(await be(e)).ok:!1,Po=async(e=L())=>{let t=wu.default.existsSync(Td(e)),r=!wu.default.existsSync(Dt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let n=gi(e);if(n===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await Kk(n))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${te(e)}-wake`;await b5(i)&&s.push(i);for(let c of Q(e))(await be(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await Kk(n);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var Xk=l(()=>{"use strict";ee()});var _o,Bi=l(()=>{"use strict";_o="connection-health.json"});var hn,vu,P5,Gi,ge,aS,Wu,Te,Lu=l(()=>{"use strict";hn=m(require("node:fs")),vu=m(require("node:path"));Bi();P5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Gi=e=>e.profileEmail===null?vu.default.join(e.installDir,_o):vu.default.join(e.installDir,"profiles",e.profileEmail,_o),ge=e=>{let t=Gi(e);if(!hn.default.existsSync(t))return null;try{let r=JSON.parse(hn.default.readFileSync(t,"utf8"));return!P5(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},aS=e=>{let t=Gi(e);hn.default.existsSync(t)&&hn.default.rmSync(t,{force:!0})},Wu=(e,t)=>{let r=Gi(e),n=ge(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};hn.default.mkdirSync(vu.default.dirname(r),{recursive:!0}),hn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Te=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var Vi,Zk=l(()=>{"use strict";Bi();Lu();Vi=(e,t)=>{if(!t.socketOpen)return!1;let r=ge(e);return r===null?!1:!Te(r,t.staleAfterMs??12e4,t.nowMs)}});var lS,Qk=l(()=>{"use strict";Lu();lS=(e,t)=>!(e!==null&&!Te(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var wo=l(()=>{"use strict";Lu();Zk();Qk();Bi()});var cS=l(()=>{"use strict";wo();ee()});var dS=l(()=>{"use strict";wo()});var uS=l(()=>{"use strict";ee()});var tC,eC,qi,pS=l(()=>{"use strict";tC=m(require("node:fs"));Bt();Pu();_u();Pe();eC=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},qi=async(e=L())=>{if(!tC.default.existsSync(Dt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await eC())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let n=[];for(let s of Q(e))(await be(s.launchAgentLabel)).ok&&n.push(s.launchAgentLabel);let o=await eC();return{ok:o||n.length>0,liveReachable:o,hollowInstall:!1,kickstartedLabels:n}}});var rC=l(()=>{"use strict";ee()});var nC,yn,mS,_5,w5,v5,oC,W5,sC,vo,Eu=l(()=>{"use strict";nC=require("node:crypto"),yn=m(require("node:fs")),mS=m(require("node:path"));Pe();_5="watchdog-log.ndjson",w5=200,v5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),oC=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Kn({installDir:e,profileEmail:t.profileEmail});return mS.default.join(r,_5)},W5=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!v5(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},sC=(e,t=L())=>{let r={id:(0,nC.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=oC(t);yn.default.mkdirSync(mS.default.dirname(n),{recursive:!0});let o=yn.default.existsSync(n)?yn.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-w5+1)),JSON.stringify(r)];return yn.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},vo=(e=20,t=L())=>{let r=oC(t);if(!yn.default.existsSync(r))return[];let n=yn.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=W5(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var gS,fS,hS,yS=l(()=>{"use strict";bt();gS=Fr.watchdogReinstallState,fS=900*1e3,hS=3e3});var iC=l(()=>{"use strict";yS()});var aC={};St(aC,{verifyAgentWitchReviveAfterKickstart:()=>E5});var L5,E5,lC=l(()=>{"use strict";iC();dS();uS();Pe();L5=e=>new Promise(t=>{setTimeout(t,e)}),E5=async e=>{if(await L5(e.verifyDelayMs??hS),!await Br(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),n=ge(r);return!Te(n,e.staleAfterMs)}});var Ki,SS,R5,cC,dC,AS,bS,PS=l(()=>{"use strict";Ki=m(require("node:fs")),SS=m(require("node:path"));U();yS();R5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cC=e=>SS.default.join(e,gS),dC=(e=L())=>{let t=cC(e);if(!Ki.default.existsSync(t))return null;try{let r=JSON.parse(Ki.default.readFileSync(t,"utf8"));return!R5(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},AS=(e=L(),t=Date.now())=>{let r=dC(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=fS:!0},bS=(e=L(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=cC(e);return Ki.default.mkdirSync(SS.default.dirname(n),{recursive:!0}),Ki.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var _S,uC=l(()=>{"use strict";ee();PS();_S=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!AS())return{attempted:!1,ok:!1,targets:e};bS();let n=await t();if(!n.ok)return{attempted:!0,ok:!1,errorMessage:n.errorMessage,targets:e};let o=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await be(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:o.some(s=>s.revived||s.reason==="healthy"),targets:o}}});var pC=l(()=>{"use strict";PS();uC()});var wS=l(()=>{"use strict";Ve()});var mC=l(()=>{"use strict";Ve()});var gC,Wo,fC,hC,yC,k5,C5,SC,T5,x5,AC,bC=l(()=>{"use strict";gC=require("node:child_process"),Wo=m(require("node:fs")),fC=m(require("node:os")),hC=m(require("node:path")),yC=require("node:util");wS();mC();Pe();k5=(0,yC.promisify)(gC.execFile),C5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),SC=e=>{let t=st(e),r=t===null?N():N(t);if(!Wo.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Wo.default.readFileSync(r.configPath,"utf8"));return!C5(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},T5=e=>SC(e)?.wsUrl??null,x5=e=>{let t=T5(e);return t!==null?we(t):_e(e)?.appOrigin??null},AC=async e=>{let t=e?.installDir??L(),r=SC(t),n=r!==null?we(r.wsUrl):x5(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=hC.default.join(fC.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Wo.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??st(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await k5("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Wo.default.existsSync(i)&&Wo.default.unlinkSync(i)}}});var PC={};St(PC,{attemptAgentWitchWatchdogReinstall:()=>I5});var I5,_C=l(()=>{"use strict";pC();bC();I5=async e=>_S(e,()=>AC())});var wC,vC,WC,O5,N5,M5,Ji,vS=l(()=>{"use strict";Xk();cS();dS();uS();pS();iS();Pu();_u();Pe();ro();rC();Eu();wC=e=>e===null?N():N(e),vC=async(e,t,r)=>{if(!await Br(e))return"not_running";let o=wC(t);if(lt(o))return"healthy";let s=ge(o);return Te(s,r)?"stale_connection":"healthy"},WC=async e=>{let t=e?.staleAfterMs??12e4,r=L(),n=Q(r);return Promise.all(n.map(async o=>{let s=await vC(o.launchAgentLabel,o.profileEmail,t),i=wC(o.profileEmail),a=ge(i),c=await Br(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Te(a,t),needsRevive:s!=="healthy",reason:s}}))},O5=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},N5=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",M5=async e=>{let t=await be(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(lC(),aC)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Ji=async e=>{if(!it())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=L();await Po(r),await qi(r);let n=Q(r),o=[];for(let p of n){let f=await vC(p.launchAgentLabel,p.profileEmail,t);if(f==="healthy"){o.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:f});continue}o.push(await M5({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:f,staleAfterMs:t}))}if(o.length===0){let p=Ur();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(_C(),PC)),f=await p(o);s=f.attempted,i=f.ok,a=f.errorMessage,c=[...f.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&sC({event:N5(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:O5(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var LC,Ru,EC=l(()=>{"use strict";LC=m(require("node:os"));cS();Eu();vS();Ru=async()=>{let e=await WC(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:LC.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:vo(1)[0]??null}}});var WS=l(()=>{"use strict";iS();vS();EC();Eu()});var Yi,Xi,Zi,RC=l(()=>{"use strict";ee();WS();Yi=async()=>{await Po();let e=Q(),t=[];for(let r of e){let n=await be(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Ur();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Xi=Ji,Zi=Ji});var LS=l(()=>{"use strict";RC()});var Cu,ku,kC,ES,CC,j5,D5,H5,$5,F5,Tu,TC=l(()=>{"use strict";Cu=require("node:child_process"),ku=m(require("node:fs")),kC=m(require("node:os")),ES=m(require("node:path")),CC=require("node:util");ee();U();j5=(0,CC.promisify)(Cu.execFile),D5=()=>ES.default.join(kC.default.homedir(),"Library","LaunchAgents"),H5=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await j5("launchctl",["bootout",r]).catch(()=>{})},$5=e=>{let t=ES.default.join(D5(),`${e}.plist`);ku.default.existsSync(t)&&ku.default.unlinkSync(t)},F5=e=>{(0,Cu.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Tu=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=L();if(!ku.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Ht(e);for(let r of t)await H5(r),$5(r);return F5(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var xC,xu,IC,Lo,OC,z5,U5,B5,RS,G5,kS,NC=l(()=>{"use strict";xC=require("node:child_process"),xu=m(require("node:fs")),IC=m(require("node:os")),Lo=m(require("node:path")),OC=require("node:util");ee();z5=(0,OC.promisify)(xC.execFile),U5=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],B5=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],RS=e=>{xu.default.existsSync(e)&&xu.default.rmSync(e,{force:!0})},G5=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await z5("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},kS=async e=>{let r=(e.listLaunchAgentLabels??Ht)(e.layout.installDir),n=e.launchAgentsDir??Lo.default.join(IC.default.homedir(),"Library","LaunchAgents"),o=e.bootoutLaunchAgent??G5;for(let i of r)await o(i),RS(Lo.default.join(n,`${i}.plist`));let s=Lo.default.dirname(e.layout.configPath);for(let i of U5)RS(Lo.default.join(s,i));for(let i of B5)RS(Lo.default.join(e.layout.installDir,i));return xu.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var CS,MC=l(()=>{"use strict";CS={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var TS,jC=l(()=>{"use strict";TS="unknown_identity"});var xS=l(()=>{"use strict";MC();jC()});var V5,IS,DC=l(()=>{"use strict";xS();V5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),IS=e=>e.type!=="system.error"||!V5(e.payload)?!1:e.payload.errorCode===TS});var OS=l(()=>{"use strict";TC();NC();DC()});var Iu=l(()=>{"use strict";ee();Ve();OS();WS()});var Eo,Ou,Nu=l(()=>{"use strict";Iu();Eo=(e=20)=>vo(e),Ou=Ru});var Mu,Ro,ju,Du=l(()=>{"use strict";Iu();Mu=rn,Ro=(e=20)=>Qr(e),ju=e=>tn(e)});var Hu,NS=l(()=>{"use strict";Iu();Hu=()=>Tu()});var HC=l(()=>{"use strict";Gh();Oy();sS();LS();Nu();Du();NS()});var $C={};St($C,{buildAgentWitchAutomationStatusFromWakeServer:()=>Ui,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Mu,buildAgentWitchWakeHealthResponse:()=>yi,buildAgentWitchWakeIdentityResponse:()=>Si,buildAgentWitchWatchdogStatus:()=>Ou,installHarnessFromWakeServer:()=>Ti,readAgentWitchSelfUpdateLogEntries:()=>Ro,readAgentWitchWatchdogLogEntries:()=>Eo,restartAgentWitchFromWakeServer:()=>Zi,reviveAgentWitchWebSocketFromWakeServer:()=>Xi,runAgentWitchSelfUpdateFromWakeServer:()=>ju,runAgentWitchUninstallLocalFromWakeServer:()=>Hu,runAutomationFromWakeServer:()=>zi,syncAutomationsFromWakeServer:()=>Fi,wakeAgentWitchLaunchAgents:()=>Yi});var FC=l(()=>{"use strict";HC()});var zC,UC,MS,jS,BC=l(()=>{"use strict";zC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),UC=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?zC(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?zC(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},MS=e=>{let t=e.watchdogLogs.map(UC).join(""),r=e.updateLogs.map(UC).join("");return`<!doctype html>
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
</html>`},jS=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var GC,VC,qC=l(()=>{"use strict";GC=m(require("node:net")),VC=()=>new Promise((e,t)=>{let r=GC.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var KC,q5,DS,JC=l(()=>{"use strict";KC=m(require("node:net"));qC();hi();fi();Pe();q5=e=>new Promise(t=>{let r=KC.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),DS=async()=>{let e=L(),t=dt();if(await q5(t))return UE(t),t;let r=await VC();return xd(e,r),r}});var K5,HS,YC=l(()=>{"use strict";K5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),HS=e=>({force:K5(e)&&e.force===!0})});var Qi=l(()=>{"use strict";ki();BC();JC();YC();Wf();ld();Xn()});var $S,j,FS,zS,ea,XC=l(()=>{"use strict";$S=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},FS=e=>{e.writeHead(403),e.end()},zS=e=>e.url?.split("?")[0]??"/",ea=(e,t,r=20,n=200)=>{let o=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(o.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,n):r}});var mt=l(()=>{"use strict";XC()});var J5,ZC,QC=l(()=>{"use strict";sS();mt();J5=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},ZC=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,Ui(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await J5(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let n=Fi(t);return j(e.response,n.ok?200:400,n,e.cors.headers),!0}let r=await zi(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var Y5,tT,eT,rT,US,nT,BS=l(()=>{"use strict";Y5=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],tT=e=>/embed|minilm|^bge-/i.test(e),eT=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),rT=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),US=e=>e.filter(t=>t.trim().length>0&&!tT(t)),nT=(e,t)=>{let r=e.filter(o=>o.trim().length>0&&!tT(o)),n=t?.trim()??"";if(n.length>0){let o=r.find(s=>eT(s,n));if(o!==void 0)return o}for(let o of Y5){let s=r.find(i=>eT(i,o));if(s!==void 0)return s}return r[0]??null}});var GS,iT,aT,$u,lT,oT,sT,X5,Z5,Q5,eV,tV,rV,gt,ta=l(()=>{"use strict";GS=require("node:child_process"),iT=m(require("node:fs")),aT=m(require("node:os")),$u=m(require("node:path"));Ve();ct();BS();lT=3e3,oT=["claude-cli","codex","cursor","antigravity"],sT={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},X5=(e,t)=>new Promise(r=>{let n=(0,GS.spawn)(e,[...t],{stdio:"ignore"}),o=setTimeout(()=>{n.kill("SIGTERM"),r(!1)},lT);n.on("error",()=>{clearTimeout(o),r(!1)}),n.on("close",s=>{clearTimeout(o),r(s===0)})}),Z5=()=>{let e=aT.default.homedir();return["ollama",$u.default.join(e,".local","bin","ollama"),$u.default.join(e,".agent-witch","ollama","ollama"),$u.default.join(e,".local-agent-witch","ollama","ollama")]},Q5=e=>new Promise(t=>{let r=(0,GS.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),n=[],o=setTimeout(()=>{r.kill("SIGTERM"),t(null)},lT);r.stdout.on("data",s=>{n.push(s)}),r.on("error",()=>{clearTimeout(o),t(null)}),r.on("close",s=>{if(clearTimeout(o),s!==0){t(null);return}t(rT(Buffer.concat(n).toString("utf8")))})}),eV=async()=>{for(let e of Z5()){if(e!=="ollama"&&!iT.default.existsSync(e))continue;let t=await Q5(e);if(t!==null)return t}return[]},tV=e=>{let t=e.installedWriterIds.map(s=>sT[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,n=se(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${sT[e.writerAgent]} is not installed.`:"",o=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[n,r,o].filter(s=>s.length>0).join(" ")},rV=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:no},gt=async e=>{let t=oT.map(i=>{let a=Sd(i,e.commands);return X5(a.command,a.args)}),[r,...n]=await Promise.all([eV(),...t]),o=oT.flatMap((i,a)=>n[a]===!0?[i]:[]),s=nT(r,rV());return{ollamaModels:r,estimateModel:s,installedWriterIds:o,capabilityNote:tV({writerAgent:e.writerAgent??"",installedWriterIds:o,estimateModel:s})}}});var nV,oV,VS,cT=l(()=>{"use strict";nV="http://127.0.0.1:11434",oV=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},VS=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||nV;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return n.ok?oV(await n.json()):null}catch{return null}}});var qS=l(()=>{"use strict";ct();ta();cT();BS()});var sV,dT,uT=l(()=>{"use strict";qS();sV={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},dT=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:sV[t]})),ollamaModels:US(e.ollamaModels)})});var iV,pT,mT=l(()=>{"use strict";qS();mt();uT();iV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},pT=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await gt({commands:ie({})});return j(e.response,200,{ok:!0,...dT({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await iV(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",n=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",o=await VS({model:r,prompt:n});return o===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:o},e.cors.headers),!0)}return!1}});var aV,gT,fT=l(()=>{"use strict";Oy();mt();aV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},gT=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await aV(e);if(t===null)return!0;let r=Ti(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var hT=l(()=>{"use strict";pt()});var KS,yT=l(()=>{"use strict";hT();Ci();KS=e=>{if(!Kt(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Ue({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var ST,JS,YS=l(()=>{"use strict";ae();pt();Ci();ST=e=>{if(!Kt(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},JS=async e=>{let t=ST(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=vr("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let n=H();if(n===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let o=X({wsUrl:n.wsUrl,pairingToken:n.pairingToken});return o===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Ue({projectFolderPath:r}),await ji(o,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var AT=l(()=>{"use strict";yT();YS()});var bT,PT=l(()=>{"use strict";AT();YS();mt();bT=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=KS(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await JS(t),n=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,n,r,e.cors.headers),!0}return!1}});var _T,wT=l(()=>{"use strict";Qi();Du();Nu();_T=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Eo(50),r=Ro(50);return e.response.writeHead(200,jS()),e.response.end(MS({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var vT,WT=l(()=>{"use strict";Gh();mt();vT=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,yi(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,Si(),e.cors.headers),!0):!1});var LT,ET=l(()=>{"use strict";NS();mt();LT=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Hu();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var RT,kT=l(()=>{"use strict";LS();mt();RT=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Xi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Zi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Yi();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var CT,TT=l(()=>{"use strict";Qi();Du();mt();CT=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Mu();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=ea(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:Ro(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=HS(t),n=await ju({force:r});return j(e.response,n.ok?200:503,n,e.cors.headers),!0}return!1}});var xT,IT=l(()=>{"use strict";Nu();mt();xT=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Ou();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=ea(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:Eo(t)},e.cors.headers),!0}return!1}});var OT,NT=l(()=>{"use strict";QC();mT();fT();PT();wT();WT();ET();kT();TT();IT();OT=[vT,_T,xT,RT,CT,LT,gT,bT,ZC,pT]});var MT,jT=l(()=>{"use strict";NT();MT=async e=>{for(let t of OT)if(await t(e))return!0;return!1}});var lV,DT,HT=l(()=>{"use strict";ki();mt();jT();lV=(e,t,r,n)=>({request:e,response:t,wakePort:r,cors:n,pathname:zS(e),readJsonBody:()=>$S(e)}),DT=async(e,t,r)=>{let n=e.headers.origin,o=lu(n);try{if(n!==void 0&&n.length>0&&!o.allowed){FS(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=lV(e,t,r,o);if(await MT(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}}});var $T,Sn,Fu,zu=l(()=>{"use strict";$T=m(require("node:http"));Qi();HT();Sn=async()=>{let e=await DS(),t=$T.default.createServer((r,n)=>{DT(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Fu=Sn});var FT={};St(FT,{runAgentWitchBridgeCli:()=>cV});var cV,zT=l(()=>{"use strict";ee();zu();cV=async()=>{Fe("agent-witch-bridge");let e=await Sn(),t=Ft(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var UT=l(()=>{"use strict";Bt()});var ko,XS,BT=l(()=>{"use strict";ko=(e,t,r)=>e===1?t:r,XS=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${ko(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${ko(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${ko(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${ko(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${ko(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${ko(p,"year","years")} ago`}});var An,ZS,dV,uV,QS,Wr,ra,eA,GT=l(()=>{"use strict";An=m(require("node:fs")),ZS=m(require("node:path")),dV="local-ws-traffic.ndjson",uV=500,QS=e=>ZS.default.join(e.logsDir,dV),Wr=(e,t)=>{let r=QS(e);An.default.mkdirSync(ZS.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});An.default.appendFileSync(r,`${n}
`,"utf8")},ra=(e,t=uV)=>{let r=QS(e);if(!An.default.existsSync(r))return[];let o=An.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},eA=e=>{let t=QS(e);An.default.existsSync(t)&&An.default.writeFileSync(t,"","utf8")}});var pV,VT,qT,KT=l(()=>{"use strict";xS();pV=new Set(Object.values(CS)),VT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qT=e=>{if(!VT(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!pV.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!VT(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var JT,YT=l(()=>{"use strict";JT=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var mV,gV,fV,na,XT=l(()=>{"use strict";YT();mV=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,gV=e=>mV.test(e),fV=e=>JT(e),na=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>na(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&gV(n)){r[n]=fV(o);continue}r[n]=na(o)}return r}});var Lt,tA,hV,yV,SV,rA,ZT,QT,ex,AV,Uu,bn,Bu,nA,tx=l(()=>{"use strict";Lt=m(require("node:fs")),tA=m(require("node:path"));KT();XT();hV="local-ws-trace.ndjson",yV=1e4,SV=1440*60*1e3,rA=e=>tA.default.join(e.logsDir,hV),ZT=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},QT=e=>{if(!Lt.default.existsSync(e))return;let t=Lt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-SV,o=t.filter(s=>{let i=ZT(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-yV);Lt.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},ex=(e,t)=>{let r=rA(e);Lt.default.mkdirSync(tA.default.dirname(r),{recursive:!0}),Lt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),QT(r)},AV=e=>e.parsed===null?{_empty:!0}:na(e.parsed),Uu=(e,t,r)=>{let n=qT(r);ex(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:AV(n)})},bn=(e,t)=>{ex(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:na({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Bu=(e,t=80)=>{let r=rA(e);if(QT(r),!Lt.default.existsSync(r))return[];let n=Lt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let i=ZT(s);i!==null&&o.push(i)}return o.reverse()},nA=e=>{let t=rA(e);Lt.default.existsSync(t)&&Lt.default.writeFileSync(t,"","utf8")}});var Lr,rx,bV,oA,Gu,nx=l(()=>{"use strict";Lr=m(require("node:fs")),rx=m(require("node:path")),bV=256e3,oA=e=>{Lr.default.mkdirSync(rx.default.dirname(e),{recursive:!0}),Lr.default.writeFileSync(e,"","utf8")},Gu=(e,t=bV)=>{if(!Lr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Lr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=Lr.default.openSync(e,"r");try{Lr.default.readSync(a,i,0,s,o)}finally{Lr.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var oa=l(()=>{"use strict";GT();tx();nx()});var sA,iA,ox=l(()=>{"use strict";sA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),iA=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",n=e.exists&&e.content.length>0?`<pre class="error-log-view">${sA(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${sA(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
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
    </section>`}});var sx=l(()=>{"use strict";ox()});var aA,lA=l(()=>{"use strict";aA=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var cA=l(()=>{"use strict";Bi()});var dA,uA,ix=l(()=>{"use strict";cA();dA=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e);return Number.isNaN(n)?!0:r-n>t},uA=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var ax=l(()=>{"use strict";lA();ix()});var lx,sa,pA,ia=l(()=>{"use strict";lA();lx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sa=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=lx(e),r=lx(aA(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},pA=`(function () {
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
})();`});var Pn,PV,mA,cx=l(()=>{"use strict";Pn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),PV=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},mA=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Pn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Pn(r.direction):Pn(r.kind),i=`trace-body-${n}`,a=Pn(PV(r.body));return`<tr>
        <td title="${Pn(r.at)}">${Pn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Pn(r.command)}</code></td>
        <td>${o}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var ux,dx,gA,px=l(()=>{"use strict";ux=m(require("node:path"));U();Bt();dx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gA=e=>{let t=te(e.installDir),n=`AW_HOME="$HOME/${ux.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${dx(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${dx(n)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var mx=l(()=>{"use strict";ia();cx();px();ia()});var _V,Yt,aa=l(()=>{"use strict";_V=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Yt=_V});var gx,fx,hx,yx,Sx,Ax,bx,Co=l(()=>{"use strict";gx="projects",fx="knowledge",hx="chunks.ndjson",yx="lessons.ndjson",Sx="error-chunks.ndjson",Ax="usage-stats.json",bx="knowledge-location.json"});var Vu,wV,qu,fA=l(()=>{"use strict";Vu=m(require("node:path"));Co();wV=(e,t)=>{let r=t.trim(),n=Vu.default.join(e.installDir,gx,r,fx);return{projectId:r,knowledgeDirPath:n,ragChunksFilePath:Vu.default.join(n,hx),memoryRunsFilePath:Vu.default.join(n,yx)}},qu=wV});var hA,vV,Px,_x=l(()=>{"use strict";hA=m(require("node:fs"));Co();ln();vV=e=>{let t=Ke(e.projectFolderPath),r=`${t.metaDirPath}/${bx}`,n={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};hA.default.mkdirSync(t.metaDirPath,{recursive:!0}),hA.default.writeFileSync(r,`${JSON.stringify(n,null,2)}
`)},Px=vV});var To,vx,wx,WV,Wx,Lx=l(()=>{"use strict";To=m(require("node:fs")),vx=m(require("node:path"));Kr();ln();fA();_x();wx=(e,t)=>{To.default.existsSync(e)&&(To.default.existsSync(t)&&To.default.statSync(t).size>0||(To.default.mkdirSync(vx.default.dirname(t),{recursive:!0}),To.default.copyFileSync(e,t)))},WV=e=>{let t=Ke(e.projectFolderPath),r=qu(e.layout,e.projectId),n=`${t.memoryDirPath}/${Jn}`;wx(t.ragChunksFilePath,r.ragChunksFilePath),wx(n,r.memoryRunsFilePath),Px({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},Wx=WV});var yA,LV,Ex,Rx=l(()=>{"use strict";yA=m(require("node:fs"));ln();LV=e=>{let t=Ke(e);if(!yA.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(yA.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let n=r;return{projectId:typeof n.projectId=="string"&&n.projectId.trim().length>0?n.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Ex=LV});var kx,EV,xo,Ku=l(()=>{"use strict";kx=m(require("node:path"));Kr();ln();Lx();Rx();fA();EV=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Ex(t),n=e.projectId?.trim()||r.projectId?.trim()||"";if(n.length>0){Wx({layout:e.layout,projectFolderPath:t,projectId:n});let s=qu(e.layout,n);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:n}}let o=Ke(t);return{ragChunksFilePath:o.ragChunksFilePath,memoryRunsFilePath:kx.default.join(o.memoryDirPath,Jn),projectId:null}},xo=EV});var Ju,kV,Yu,SA=l(()=>{"use strict";Ju=m(require("node:fs"));Co();kV=(e,t=500)=>{if(!Ju.default.existsSync(e))return;let r=Ju.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let n=r.slice(r.length-t);Ju.default.writeFileSync(e,`${n.join(`
`)}
`)},Yu=kV});var Xu,CV,_n,AA=l(()=>{"use strict";Xu=m(require("node:path"));Co();Ku();CV=e=>{let t=xo(e);if(t===null)return null;let r=Xu.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Xu.default.join(r,Ax),errorChunksFilePath:Xu.default.join(r,Sx)}},_n=CV});var Tx,la,xx,Cx,bA,Ix,IV,PA,Ox,_A,wA,vA,WA=l(()=>{"use strict";Tx=require("node:crypto"),la=m(require("node:fs")),xx=m(require("node:path"));aa();Co();AA();Cx=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),bA=e=>{if(!la.default.existsSync(e))return Cx();try{let t=JSON.parse(la.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return Cx()},Ix=(e,t)=>{la.default.mkdirSync(xx.default.dirname(e),{recursive:!0}),la.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},IV=e=>{let t=Yt(e).trim(),n=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,Tx.createHash)("sha256").update(n).digest("hex").slice(0,16)},PA=e=>{let t=_n(e);return t===null?null:bA(t.usageStatsFilePath)},Ox=e=>{if(e.chunkIds.length===0)return;let t=_n(e);if(t===null)return;let r=bA(t.usageStatsFilePath),n={...r.chunkRetrievalCounts};for(let o of e.chunkIds)n[o]=(n[o]??0)+1;Ix(t.usageStatsFilePath,{...r,chunkRetrievalCounts:n})},_A=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=_n(e);if(r===null)return null;let n=IV(t),o=bA(r.usageStatsFilePath),s=o.errorOccurrences[n],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return Ix(r.usageStatsFilePath,{...o,errorOccurrences:{...o.errorOccurrences,[n]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),n},wA=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,vA=e=>{if(e===null)return[];let t=[];for(let[r,n]of Object.entries(e.chunkRetrievalCounts))n<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:n,chunkId:r,message:`Knowledge chunk "${r}" was injected ${n} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,n]of Object.entries(e.errorOccurrences))n.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:n.count,errorFingerprint:r,message:`Error "${n.preview}" occurred ${n.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:n.count,errorFingerprint:r,message:`Same error (${n.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,n)=>r.priority-n.priority||n.hitCount-r.hitCount)}});var ca,Nx,OV,NV,Mx,MV,LA,da,Io,EA,Oo,RA,kA=l(()=>{"use strict";ca=m(require("node:fs")),Nx=m(require("node:path"));aa();Ku();SA();WA();OV="http://127.0.0.1:11434",NV="nomic-embed-text",Mx=(e,t,r)=>xo({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,MV=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},LA=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},da=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||OV,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||NV;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},Io=(e,t,r)=>{let n=Mx(e,t,r);if(n===null||!ca.default.existsSync(n))return[];let o=ca.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},EA=async e=>{let t=Yt(e.text),r=LA(t);if(r.length===0)return 0;let n=Mx(e.layout,e.projectFolderPath,e.projectId);if(n===null)return 0;ca.default.mkdirSync(Nx.default.dirname(n),{recursive:!0});let o=0;for(let s of r){let i=await da(s);if(i===null)continue;let a={id:`${Date.now()}-${o}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};ca.default.appendFileSync(n,`${JSON.stringify(a)}
`,"utf8"),o+=1}return Yu(n),o},Oo=async e=>{let t=await da(e.query);if(t===null)return[];let r=e.minScore??0,s=Io(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:MV(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return Ox({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},RA=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var ua,jx,jV,DV,CA,TA,xA,Dx=l(()=>{"use strict";ua=m(require("node:fs")),jx=m(require("node:path"));aa();AA();SA();kA();jV=e=>{if(!ua.default.existsSync(e))return[];let t=ua.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let n of t)try{r.push(JSON.parse(n))}catch{}return r},DV=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},CA=async e=>{let t=_n(e);if(t===null)return 0;let r=Yt(e.text),n=LA(r,600);if(n.length===0)return 0;let o=t.errorChunksFilePath;ua.default.mkdirSync(jx.default.dirname(o),{recursive:!0});let s=0;for(let i of n.slice(0,3)){let a=await da(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};ua.default.appendFileSync(o,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Yu(o,200),s},TA=async e=>{let t=_n(e);if(t===null)return[];let r=await da(e.query);if(r===null)return[];let n=e.minScore??.3;return jV(t.errorChunksFilePath).map(s=>({chunk:s,score:DV(r,s.embedding)})).filter(s=>s.score>=n).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},xA=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var IA=l(()=>{"use strict";kA();WA();Dx()});var OA,Hx=l(()=>{"use strict";OA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var $x=l(()=>{"use strict";Hx()});var ue,NA,MA=l(()=>{"use strict";$x();ue=OA,NA=`
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
.sdlc-compose-viewing-finished .sdlc-compose-summary-collapsed {
  min-height: 3rem;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--aw-zinc-200);
  border-radius: var(--aw-radius-lg);
  background: var(--aw-zinc-50);
}
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
.sdlc-history-badge-viewing { background: #eff6ff; color: #1d4ed8; }
.sdlc-history-item-viewing { background: var(--aw-zinc-50); border-radius: var(--aw-radius-lg); padding: 0.35rem 0.5rem; margin: 0 -0.5rem; }
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
`.trim()});var HV,$V,jA,Fx,DA,zx=l(()=>{"use strict";MA();ia();HV=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,$V=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],jA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Fx=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${HV}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,DA=e=>{let t=$V.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=jA(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"",o=jA(e.installBundleVersionLabel?.trim()??"unknown"),s=Fx("brand brand-in-sidebar",o),i=Fx("brand brand-in-header",o);return`<!DOCTYPE html>
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
</html>`}});var Zu,pa,Qu=l(()=>{"use strict";Zu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pa=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Zu(e.syncMessage)}</p>`:"",n=Zu(e.manageHref),o=Zu(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Zu(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${n}" target="_blank" rel="noopener noreferrer">${o} \u2197</a></p>
    </div>`}});var HA,$A,FA,Ux=l(()=>{"use strict";HA=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
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
    </section>`,FA=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Bx=l(()=>{"use strict";zx();Qu();Ux()});var No,zA,Gx=l(()=>{"use strict";ia();No=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zA=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${No(e.wakeError)}</div>`:"",a=sa(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${No(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${No(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${No(n)}</p>
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
        <p class="home-card-meta">${No(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${No(o)}</p>
      </a>
    </div>`}});var Vx=l(()=>{"use strict";Gx()});var k,ep=l(()=>{"use strict";k=e=>e==="passed"||e==="stopped"||e==="failed"});var qx,UA,wn,BA,tp=l(()=>{"use strict";qx="Stopped at the round limit. The best prompt is kept.",UA="Stopped because the score stopped rising. The best prompt is kept.",wn="Finished. The best prompt is the result.",BA="Wizard ended. Progress from finished steps is kept."});var ma,GA=l(()=>{"use strict";ma=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],n=e.instructions?.trim()??"",o=n.length===0?[]:["","Instructions:",n];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...o,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",n.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var FV,zV,ga,Kx,rp=l(()=>{"use strict";FV=/\n+|;\s+/,zV=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,ga=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let n=r.split(FV).map(o=>o.replace(/^[-*]\s*/,"").trim()).filter(o=>o.length>0).reduce((o,s)=>{if(t.length+o.length>=12)return o;let i=s.toLowerCase();return[...t,...o].some(c=>c.toLowerCase()===i)?o:[...o,zV(s)]},[]);return[...t,...n]},[]),Kx=e=>{let t=ga(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var he,fa=l(()=>{"use strict";he=e=>{let t=e.flatMap(o=>o.score===null?[]:[{roundNumber:o.roundNumber,promptText:o.promptText,score:o.score,reasons:o.reasons}]),[r,...n]=t;return r===void 0?null:n.reduce((o,s)=>s.score>o.score||s.score===o.score&&s.roundNumber>o.roundNumber?s:o,r)}});var ha,VA=l(()=>{"use strict";rp();fa();ha=e=>{let t=[...e.priorRounds,e.current],r=he(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},n=[...t].filter(o=>o.score<r.score).sort((o,s)=>s.roundNumber-o.roundNumber).map(o=>o.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:Kx(n)}}});var qA,UV,BV,Jx,Yx=l(()=>{"use strict";qA={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},UV=e=>{try{let t=JSON.parse(e.fragment);return{...qA,objects:[...e.objects,t]}}catch{return{...qA,objects:e.objects}}},BV=(e,t)=>{if(e.inString){let n=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:n}:t==="\\"?{...e,escaped:!0,fragment:n}:t==='"'?{...e,inString:!1,fragment:n}:{...e,fragment:n}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:UV(r)},Jx=e=>[...e].reduce(BV,qA).objects});var GV,KA,VV,Xx,JA=l(()=>{"use strict";Yx();GV=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},KA=e=>{let t=Jx(e).filter(GV),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},VV=(e,t)=>({...e,passed:e.score>=t}),Xx=(e,t)=>{let r=KA(e);return r===null?null:VV(r,t)}});var YA,XA,np=l(()=>{"use strict";YA="The judge reply needs a score and a reason.",XA="The improver reply was empty."});var Zx,Qx=l(()=>{"use strict";Zx=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((n,o)=>o>n.best?{best:o,stall:0}:{best:n.best,stall:n.stall+1},{best:t,stall:0}).stall}});var e0,t0=l(()=>{"use strict";e0=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((n,o)=>o.score>n.best?{best:o.score,reasons:[]}:{best:n.best,reasons:[...n.reasons,o.reasons]},{best:t.score,reasons:[]}).reasons}});var KV,r0,n0=l(()=>{"use strict";Qx();t0();tp();rp();KV=e=>{let t=ga(e);return t.length===0?UA:`${UA} Avoid: ${t.join("; ")}.`},r0=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:qx};if(Zx(e.scores)>=3){let t=e.scores.map((r,n)=>({score:r,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:KV(e0(t))}}return null}});var Er,JV,ZA,o0,op=l(()=>{"use strict";Er=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},JV=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,ZA=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",JV(e.tokens),`Delay: ${Er(e.delayMs)}`,"",n,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},o0=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var YV,s0,i0=l(()=>{"use strict";JA();YV=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,s0=e=>{let r=(YV.exec(e)?.[1]??e).trim();return r.length===0||KA(r)!==null?null:r}});var a0,sp,l0=l(()=>{"use strict";op();i0();np();a0=e=>({type:"call",role:"judge",choice:e.choice,prompt:o0({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),sp=e=>{let t=s0(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:XA}}:{nextPrompt:t,continuation:a0({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var QA,c0=l(()=>{"use strict";GA();VA();JA();np();tp();n0();np();l0();QA=e=>{let t=Xx(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:YA}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],n=e.round??r.length,o=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=r0({scores:o.map(a=>a.score),reasons:o.map(a=>a.reasons),round:n,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=ha({current:{roundNumber:n,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:ma({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var ya,eb=l(()=>{"use strict";ya=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var tb,d0=l(()=>{"use strict";tb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],n=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",n,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var XV,rb,u0=l(()=>{"use strict";op();XV=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,rb=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",XV(e.tokens),`Delay: ${Er(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var ZV,QV,eq,nb,p0=l(()=>{"use strict";ZV=/[A-Za-z0-9_./~-]{3,180}/g,QV=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,eq=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||QV.test(t)},nb=(e,t=12)=>{let r=[];for(let n of e.matchAll(ZV)){let o=n[0].replace(/\.+$/,"");if(!(!eq(o)||r.includes(o))&&(r.push(o),r.length>=t))break}return r}});var Sa,m0=l(()=>{"use strict";Sa=(e,t)=>e.flatMap(r=>{let n=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||n.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:n}]}).sort((r,n)=>r.roundNumber-n.roundNumber)});var ip,ob,g0,Aa,sb=l(()=>{"use strict";ip=e=>Math.floor(e/2),ob=e=>Math.max(ip(e)+1,e-20),g0=(e,t)=>e>=t?"passes":e>=ob(t)?"close":e>=ip(t)?"weak":"bad",Aa=e=>[{band:"bad",label:`0\u2013${ip(e)-1} bad`},{band:"weak",label:`${ip(e)}\u2013${ob(e)-1} weak`},{band:"close",label:`${ob(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var ap,ib=l(()=>{"use strict";sb();ap=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",n=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${g0(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),o=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...n,...o]}});var f0,h0=l(()=>{"use strict";f0=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var y0,S0=l(()=>{"use strict";y0=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var tq,rq,A0,b0=l(()=>{"use strict";ep();ib();h0();S0();tq=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],rq=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",A0=e=>{let t=e.wizard;if(t===void 0)return[];let r=f0(t),n=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),o=e.status==="wizard_paused",s=t.phase==="complete",i=tq.map((p,f)=>{let b=!s&&!o&&f===r?"active":"done";return{id:`wizard-${f+1}`,label:p,state:b,detail:null}}).filter((p,f)=>s?!0:f<=n),a=o&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=y0(t)&&(!o||a)?ap(e):[],d=k(e.status)&&!s?[{id:"end",label:rq(e),state:"done",detail:e.errorMessage}]:[];return[...i,...c,...d]}});var nq,ab,P0=l(()=>{"use strict";ep();ib();b0();nq=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",ab=e=>{if(e.wizard!==void 0)return A0(e);let t=ap(e),r=k(e.status)?[{id:"end",label:nq(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var _0=l(()=>{"use strict";Bt()});var w0,ba,Pa,Mo,lp,lb,v0=l(()=>{"use strict";_0();w0="/prompt-optimizer/agent",ba=`${Ut}${w0}`,Pa=`${Ut}/prompt-optimizer`,Mo="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",lp=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Mo}`,lb="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Rr=l(()=>{"use strict"});var W0,L0=l(()=>{"use strict";W0=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var cb,R0=l(()=>{"use strict";L0();Rr();cb=e=>({schemaVersion:3,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:W0(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{}})});var db,k0=l(()=>{"use strict";db=e=>({...e,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null}))})});var ub,C0=l(()=>{"use strict";Rr();ub=(e,t,r)=>{let n=r.trim();if(n.length===0)return e;let o=e.avoidByStep[t]??[],s=[n,...o].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var T0,pb,x0=l(()=>{"use strict";T0=["generalize","evaluate","separate","optimize_modules"],pb=(e,t)=>{let r=T0.indexOf(t);if(r===-1)return e;let n=T0.slice(r+1);return n.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:n.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:n.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:n.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:n.includes("separate")?null:e.selectedSplitTopology,modules:n.includes("optimize_modules")?[]:e.modules,currentModuleIndex:n.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:n.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var cp,mb=l(()=>{"use strict";rp();cp=e=>{let t=ga(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var gb,I0=l(()=>{"use strict";mb();gb=e=>{let t=cp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,n,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(o=>o.length>0).join(`
`)}});var sq,iq,aq,O0,N0=l(()=>{"use strict";sq=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),iq=/^\{\{[a-zA-Z0-9_-]+\}\}$/,aq=(e,t)=>{let{masked:r,tokens:n}=t.reduce((o,s)=>{let i=s.sampleValue.trim();if(i.length===0)return o;let a=new RegExp(sq(i),"g"),c=[...o.tokens];return{masked:o.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return n.reduce((o,s,i)=>o.replace(`\0PO${i}\0`,s),r)},O0=(e,t)=>{let r=[...t].sort((o,s)=>s.sampleValue.length-o.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(o=>iq.test(o)?o:aq(o,r)).join("")}});var fb,M0=l(()=>{"use strict";N0();fb=(e,t)=>e.map(r=>({...r,modules:r.modules.map(n=>({...n,prompt:O0(n.prompt,t)}))}))});var lq,yb,j0=l(()=>{"use strict";Rr();mb();lq=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),yb=e=>{let t=cp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,n=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,o=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=lq(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",o,r,n,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Sb,D0=l(()=>{"use strict";eb();Sb=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",n=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),o=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...n,s].filter(a=>a.length>0).join(`
`);return ya({promptText:e.promptText,instructions:`${i}${o.join(`
`)}`})}});var _a,Ab=l(()=>{"use strict";fa();_a=e=>{let t=e.revisions.map(o=>({roundNumber:o.roundNumber,score:o.judgement?.score??null,passed:o.judgement?.passed??null,runOutput:o.run?.output??null,tokens:o.run?.tokens??null})),r=he(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null}))),n=r===null?null:e.revisions.find(o=>o.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:n?.run?.output??null,rounds:t}}});var bb,H0=l(()=>{"use strict";Ab();bb=e=>{let t=_a({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((n,o)=>o===e.moduleIndex?{...n,status:r,selectedRevisionRound:t.bestRound,statistics:t}:n)}}});var wa,$0=l(()=>{"use strict";wa=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let n=r.statistics?.bestRunOutput?.trim()??"";return n.length>0?{output:n,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var cq,dq,Be,Pb=l(()=>{"use strict";Rr();cq=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let n=r.rounds.reduce((o,s)=>o+(s.tokens??0),0);return n>0?n:null},dq=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,Be=e=>{let t=e.modules.map((s,i)=>({moduleId:s.moduleId,title:s.title,bestScore:s.statistics?.bestScore??null,tokens:cq(e,i),status:s.status})),r=t.length,n=t.filter((s,i)=>dq(e.modules[i])).length,o=r>0&&n===r?"passed":"stopped";return{passedModuleCount:n,totalModules:r,terminalStatusSuggestion:o,rows:t}}});var _b,F0=l(()=>{"use strict";Rr();Pb();_b=e=>{let t=Be(e.wizard),r=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${70})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&r.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,o)=>{let s=n.statistics?.bestRunOutput?.trim();s===void 0||s.length===0||r.push("",`## Module ${o+1}: ${n.title}`,"","```",s,"```")}),`${r.join(`
`)}
`}});var wb,z0=l(()=>{"use strict";wb=e=>{let t=e.modules.reduce((r,n)=>{let o=n.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+o},0);return t>0?t:null}});var dp,vb=l(()=>{"use strict";dp=e=>{let t=e.trim(),n=t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t,o=n.indexOf("{"),s=n.lastIndexOf("}");if(o===-1||s<=o)throw new Error("No JSON object in reply.");return JSON.parse(n.slice(o,s+1))}});var ft,uq,Wb,U0=l(()=>{"use strict";ft=m(Ws());vb();uq=(0,ft.isType)({name:ft.isNonEmptyString,description:ft.isString,sampleValue:ft.isString}),Wb=e=>{let t=dp(e);if(!(0,ft.isType)({templatedPrompt:ft.isNonEmptyString,variables:(0,ft.isArrayWithEachItem)(uq)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var re,pq,mq,Lb,B0=l(()=>{"use strict";re=m(Ws());Rr();vb();pq=(0,re.isType)({id:re.isNonEmptyString,title:re.isNonEmptyString,prompt:re.isNonEmptyString,order:re.isNumber}),mq=(0,re.isType)({id:re.isNonEmptyString,title:re.isNonEmptyString,summary:re.isString,topology:(0,re.isOneOf)("chain","parallel"),modules:(0,re.isArrayWithEachItem)(pq),recommended:re.isBoolean}),Lb=e=>{let t=dp(e);if(!(0,re.isType)({options:(0,re.isArrayWithEachItem)(mq)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),n=r.filter(o=>o.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return n!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var jo,G0=l(()=>{"use strict";jo=e=>{let t=e.wizard.attempts.filter(n=>n.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var gq,va,Eb=l(()=>{"use strict";gq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,va=(e,t)=>{let r=new Map(t.map(n=>[n.name,n.sampleValue]));return e.replace(gq,(n,o)=>{let s=r.get(o);return s===void 0?n:s})}});var Wa,La,V0=l(()=>{"use strict";fa();Eb();Wa=e=>va(e.templatedPrompt,e.variables),La=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(n=>n.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return he(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Wa(e.wizard)}});var fq,Ea,q0=l(()=>{"use strict";fq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ea=(e,t)=>e.replace(fq,(r,n)=>{let o=t[n];return o===void 0||o.trim()===""?r:o})});var hq,Ra,Rb=l(()=>{"use strict";hq=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ra=e=>{let t=new Set,r=[];for(let n of e.matchAll(hq)){let o=n[1];t.has(o)||(t.add(o),r.push(o))}return r}});var ka,vn,K0=l(()=>{"use strict";ka=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),vn=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var yq,up,kb,J0=l(()=>{"use strict";Rb();yq="wizardParam_",up=e=>`${yq}${e}`,kb=e=>{let t=Ra(e.modulePrompt),r={...e.wizard.parameterValues},n=new Set(e.wizard.variables.map(o=>o.name));for(let o of t){let s=up(o),i=e.posted.get(s),a=i!==null?i.trim():r[o]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:n.has(o)?`Fill in {{${o}}} before running this module.`:`Fill in {{${o}}} (not listed in Step 1) before running this module.`};r[o]=a}return{ok:!0,parameterValues:r}}});var Wn,Y0=l(()=>{"use strict";Wn=["generalize","evaluate","separate","optimize_modules"]});var T=l(()=>{"use strict";ep();tp();c0();GA();op();eb();d0();u0();p0();VA();m0();fa();P0();sb();v0();Rr();R0();k0();C0();x0();I0();M0();j0();D0();Ab();H0();$0();Pb();F0();z0();U0();B0();G0();V0();Eb();q0();Rb();K0();J0();Y0()});var Ta=l(()=>{"use strict";ct();ta();Ad()});var Sq,eI,tI=l(()=>{"use strict";Ta();Sq=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,eI=e=>{let t=lo(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(Sq)],n=r[r.length-1];if(n===void 0)return null;let o=Number(n[1])+Number(n[2]);return Number.isFinite(o)&&o>=1?o:null}});var Aq,bq,rI,Cb,Pq,_q,ht,nI,oI,Ln=l(()=>{"use strict";Ta();tI();Aq="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",bq="The writer waited on terminal input and did not return a prompt.",rI=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Cb=e=>{let t=e.trim();if(t.length===0||t.length>=500||!rI.test(t))return null;let r=t.split(`
`).map(n=>n.trim()).find(n=>rI.test(n))??t;return r.length>280?`${r.slice(0,277)}...`:r},Pq=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},_q=e=>Cb(e.stdout)??Cb(e.stderr)??(Pq(e.replyFile)?Cb(e.replyFile):null),ht=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return Aq;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?bq:null},nI=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],oI=e=>{let t=e.replyFileText?.trim()??"",r=ht([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let n=_q({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(n!==null)return{ok:!1,errorMessage:n};let o=eI([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:o};if(e.writerAgent==="claude-cli"){let i=lo(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:o}:{ok:!1,errorMessage:"The writer did not reply."}}});var xa,Tb=l(()=>{"use strict";xa=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var pp,Ho,xb=l(()=>{"use strict";Tb();pp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ho=e=>{let t=xa(e.cycle);if(t.length===0&&e.cycle.revisions.length===0)return"";let r=t.length===0?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",n=e.caption===void 0?"":`<p class="muted">${pp(e.caption)}</p>`,o=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",s=a=>o&&a===0?"Trial run":`Round ${a}`,i=e.cycle.revisions.map(a=>{let c=a.judgement?.score,d=c==null?`${s(a.roundNumber)} \u2014 not scored`:`${s(a.roundNumber)} \u2014 ${c}`,p=a.judgement?.reasons?.trim()??"",f=p.length===0?"":`<br><span class="muted">${pp(p)}</span>`;if(e.interactive){let b=e.selectedRound===a.roundNumber?" checked":"";return`<li><label><input type="radio" name="wizardRevisionRound" value="${a.roundNumber}"${b}> ${pp(d)}</label>${f}</li>`}return`<li>${pp(d)}${f}</li>`}).join("");return`${r}${n}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${i}</ul>`}});var Ib,sI,mp,iI,gp=l(()=>{"use strict";Ib=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sI=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Ib(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Ib(t.prompt)}</pre></li>`).join("")}</ol>`,mp=e=>sI([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),iI=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(o=>o.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Ib(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${sI(t.modules.map(o=>({title:o.title,prompt:o.prompt})))}
  </section>`}});var Le,wq,vq,Wq,Lq,Eq,Rq,$o,fp=l(()=>{"use strict";T();xb();gp();Le=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wq=e=>{let t=e.wizard;if(t===void 0)return null;let n=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(n===void 0||typeof n.output!="object"||n.output===null)return null;let o=n.output.revisions;if(!Array.isArray(o))return null;let s=[];for(let i of o){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},vq=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.variables.length===0?'<p class="muted">No variables yet.</p>':`<ul class="sdlc-wizard-vars">${t.variables.map(a=>`<li><strong>{{${Le(a.name)}}}</strong> \u2014 ${Le(a.description)} (sample: ${Le(a.sampleValue)})</li>`).join("")}</ul>`,n=t.templatedPrompt.trim(),o=n.length===0?'<p class="muted">No templated prompt yet.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Le(n)}</pre>`,s=va(t.templatedPrompt,t.variables).trim(),i=s.length===0||s===n?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Le(s)}</pre>`;return`${r}${o}${i}`},Wq=(e,t)=>`<ul class="sdlc-wizard-revisions">${e.map(n=>{let o=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,s=t===n.roundNumber?" (selected)":"",i=n.reasons?.trim()??"",a=i.length===0?"":`<br><span class="muted">${Le(i)}</span>`;return`<li>${Le(o)}${s}${a}</li>`}).join("")}</ul>`,Lq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Ho({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let n=wq(e);if(n!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${Wq(n,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let o=La({wizard:t,revisions:e.revisions.map(s=>({roundNumber:s.roundNumber,promptText:s.promptText,score:s.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Le(o)}</pre>`}return'<p class="muted">Evaluate has not run yet.</p>'},Eq=e=>{let t=e.wizard;return t===void 0?"":t.splitOptions.length===0?'<p class="muted">No split options yet.</p>':`<ul class="sdlc-wizard-splits">${t.splitOptions.map(n=>{let o=n.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===n.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Le(n.title)}</strong>${o}${Le(s)}<br><span class="muted">${Le(n.summary)} (${Le(n.topology)})</span>${mp(n)}</li>`}).join("")}</ul>`},Rq=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((o,s)=>{let i=s===t.currentModuleIndex?" \u2014 current":"";return`<li><strong>${Le(o.title)}</strong> (${Le(o.status)})${Le(i)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Le(o.prompt)}</pre></li>`}).join(""),n=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Ho({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ol class="sdlc-wizard-chunks">${r}</ol>${n}`},$o=(e,t)=>{switch(t){case"wizard-1":return vq(e);case"wizard-2":return Lq(e);case"wizard-3":return Eq(e);case"wizard-4":return Rq(e);default:return""}}});var kq,aI,lI,cI=l(()=>{"use strict";T();Ln();fp();kq=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},aI=(e,t,r,n)=>{let o=ht(t);return{title:e,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:n,promptText:o===null?t:null,promptNote:o,bodyHtml:null}},lI=(e,t)=>{if(t.id.startsWith("wizard-")){let o=$o(e,t.id);return{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:o.trim().length===0?null:o}}if(t.id==="end"){let o=he(e.revisions.map(s=>({roundNumber:s.roundNumber,promptText:s.promptText,score:s.judgement?.score??null,reasons:s.judgement?.reasons??null})));return o===null?{title:t.label,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:aI(t.label,o.promptText,o.score,o.reasons)}let r=t.id==="rewrite"?e.currentRound:kq(t.id),n=r===null?void 0:e.revisions.find(o=>o.roundNumber===r);return n===void 0?{title:t.label,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:aI(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail)}});var Ia,dI,uI=l(()=>{"use strict";Ia=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dI=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?'<p class="muted">Not scored yet.</p>':`<p class="muted">${Ia(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,n=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Ia(e.feedback.trim())}</p>`,o=e.promptNote!==null?`<div class="alert-error">${Ia(e.promptNote)}</div>`:e.promptText===null?"":`<h2>Saved prompt</h2><pre class="mono">${Ia(e.promptText)}</pre>`;return`<h2>${Ia(e.title)}</h2>${t}${r}${n}${o}`}});var hp,Fo,yp=l(()=>{"use strict";hp=e=>e.toLocaleString("en-US"),Fo=(e,t)=>e.revisions.reduce((r,n)=>t!==void 0&&n.roundNumber>t?r:r+(n.writerTokens??0)+(n.run?.tokens??0)+(n.judgement?.tokens??0),0)});var Ob,Cq,pI,Sp,mI,gI,Ap=l(()=>{"use strict";T();cI();uI();yp();Ob=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cq=(e,t)=>{let r=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',n=/^score-(\d+)$/.exec(e.id),o=e.state==="done"&&n!==null?Fo(t,Number(n[1])):0,s=o>0?`<span class="sdlc-node-reason">${hp(o)} tokens so far</span>`:"",i=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Ob(e.detail)}</span>`:"",a=dI(lI(t,e));return`<li class="sdlc-node sdlc-node-${e.state}"><button type="button" class="sdlc-node-open" data-sdlc-node>${r}<span class="sdlc-node-label">${Ob(e.label)}${i}${s}</span></button><template>${a}</template></li>`},pI=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>Cq(r,t)).join("")}</ol>`,Sp=e=>`<div class="sdlc-score" aria-label="What the score means">${Aa(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Ob(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,mI='<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog"><button class="btn btn-secondary" type="submit">Close</button></form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>',gI=`<script>
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
</script>`});var bp,Pp,_p,fI,Nb=l(()=>{"use strict";bp="support-reply",Pp="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",_p=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),fI=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var wp,hI,yI=l(()=>{"use strict";T();Ap();Nb();wp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hI=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. <strong>Classic loop (90 / 10 rounds)</strong> skips the wizard: a judge scores the prompt in your folder, an improver rewrites under the pass score, and the loop stops when the score passes, you press Stop run, the round limit is hit, or the score has not risen for 3 rounds. After each scored round the page shows tokens spent. The next rewrite starts from the highest scoring prompt; lower scores become an avoid list. The round limit starts at 10 on classic runs (wizard evaluate defaults differ). Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field. The pass score slider defaults to ${90} on classic runs.</p>
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
      <pre class="mono">${wp(fI)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${wp(bp)}">Run this sample</a>
      </div>
    </section>`});var Mb,vp,Tq,SI,AI=l(()=>{"use strict";Mb=m(require("node:fs")),vp=m(require("node:path")),Tq=e=>vp.default.join(vp.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),SI=(e,t)=>{let r=Tq(e),n=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;Mb.default.mkdirSync(vp.default.dirname(r),{recursive:!0}),Mb.default.appendFileSync(r,n,"utf8")}});var zo,bI,xq,PI,Iq,_I,Rt,K,wI,B,Je=l(()=>{"use strict";zo=m(require("node:fs")),bI=m(require("node:path"));T();AI();xq=e=>e.wizard===void 0?e:{...e,wizard:db(e.wizard)},PI=new Set,Iq=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),_I=(e,t)=>{zo.default.mkdirSync(bI.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;zo.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),zo.default.renameSync(r,e)},Rt=e=>{if(!zo.default.existsSync(e))return[];try{let t=JSON.parse(zo.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(Iq).map(xq):[]}catch{return[]}},K=(e,t)=>Rt(e).find(r=>r.id===t)??null,wI=(e,t)=>{PI.add(t);let r=Rt(e).filter(n=>n.id!==t);_I(e,r)},B=(e,t)=>{if(PI.has(t.id))return;let r=Rt(e),n=r.some(o=>o.id===t.id)?r.map(o=>o.id===t.id?t:o):[t,...r];_I(e,n),SI(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var vI,Wp,jb,En,Db,kt,Rn,Ee,Ye=l(()=>{"use strict";vI=m(require("node:fs")),Wp=m(require("node:os")),jb=m(require("node:path"));pt();En="~",Db=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,kt=e=>{let t=Wp.default.homedir(),r=Db(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Rn=e=>{let t=e.trim().length===0?"~":e.trim(),r=qe(t),n=jb.default.isAbsolute(r)?Db(r):Db(jb.default.resolve(Wp.default.homedir(),r));try{if(!vI.default.statSync(n).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:n,display:kt(n)}},Ee=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Wp.default.homedir()});var Uo,Ct,Oa,WI,Lp,Oq,LI,EI,RI,Hb=l(()=>{"use strict";Uo=m(require("node:fs")),Ct=m(require("node:path")),Oa=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},WI=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Lp=(e,t)=>{let r=Oa(e);return r.length>0?r:Oa(t)},Oq=e=>{let t=Lp(e.fileName,e.name),r=e.promptText.trim(),n=e.name.trim();if(t.length===0||r.length===0||n.length===0)return null;let o=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${WI(n)}`,...o.length>0?[`description: ${WI(o)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},LI=e=>`.cursor/skills/${e}/SKILL.md`,EI=(e,t)=>{let r=Oa(t);if(r.length===0)return!1;let n=Ct.default.resolve(e),o=Ct.default.resolve(n,".cursor","skills"),s=Ct.default.resolve(n,LI(r));return s.startsWith(`${o}${Ct.default.sep}`)?Uo.default.existsSync(s):!1},RI=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Lp(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Ct.default.resolve(e.workingDirectory);try{if(!Uo.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=Oq({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let n=LI(r.slug),o=Ct.default.resolve(t,".cursor","skills"),s=Ct.default.resolve(t,n);if(!s.startsWith(`${o}${Ct.default.sep}`))return{ok:!1,errorCode:"path"};if(Uo.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Uo.default.mkdirSync(Ct.default.dirname(s),{recursive:!0}),Uo.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:n}}});var Nq,kI,CI,TI=l(()=>{"use strict";T();T();Je();Ye();Ln();Hb();Nq=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,kI=e=>{let t=e.get("savedSkill");return t!==null&&Nq.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},CI=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=K(e.storePath,t),n=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!k(r.status))return{kind:"redirect",location:n("skillError=working")};let o=he(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(o===null||ht(o.promptText)!==null)return{kind:"redirect",location:n("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=RI({workingDirectory:Ee(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:o.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:n(`skillError=${a}`)}}return{kind:"redirect",location:n(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var x,Mq,Ep,Xe,kn,II,xI,OI,NI,je=l(()=>{"use strict";x="manual",Mq=["claude-cli","codex","cursor","antigravity"],Ep={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Xe=e=>e===x?"You":e in Ep?Ep[e]:e,kn=e=>Mq.filter(t=>e.includes(t)),II=e=>{let t=kn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},xI=(e,t)=>t===x?x:e.find(r=>r===t)??null,OI=(e,t,r)=>{let n=kn(e),o=xI(n,t),s=xI(n,r);return o===null||s===null?null:{judge:o,improver:s}},NI=(e,t,r)=>{let n=kn(e);return t===null||t.trim()===""?r!==x?r:n[0]??null:t===x?null:n.find(o=>o===t)??null}});var $b,MI,jI=l(()=>{"use strict";$b={ok:!1,errorMessage:"Stopped.",stopped:!0},MI=(e,t,r)=>{if(t===void 0)return;let n=()=>{e.kill("SIGTERM"),r($b)};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var DI,Na,HI,Fb,jq,Dq,Hq,Ze,Ma=l(()=>{"use strict";DI=require("node:child_process"),Na=m(require("node:fs")),HI=m(require("node:os")),Fb=m(require("node:path"));Ta();jI();Ln();jq=["claude-cli","codex","cursor","antigravity"],Dq=18e4,Hq=e=>jq.includes(e),Ze=e=>new Promise(t=>{if(e.signal?.aborted){t($b);return}if(!Hq(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,n=wt(r,e.prompt,ie({}));if(n===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!Na.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let o=Fb.default.join(Na.default.mkdtempSync(Fb.default.join(HI.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=nI({writerAgent:r,baseArgs:n.args,replyPath:o}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,DI.spawn)(n.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=f=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(f))};MI(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??Dq),d.stdout.on("data",f=>{i.push(Buffer.from(f))}),d.stderr.on("data",f=>{a.push(Buffer.from(f))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let f=Na.default.existsSync(o)?Na.default.readFileSync(o,"utf8"):null;p(oI({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:f}))})})});var $I,$q,ja,Rp,kp=l(()=>{"use strict";T();je();$I=e=>e===x?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},$q=(e,t,r,n,o,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:n,reasons:o,rawReply:t,tokens:s}}:i),ja=(e,t,r=null)=>{let n=e.revisions.find(a=>a.roundNumber===e.currentRound),o=QA({raw:t,passScore:e.passScore,goal:e.goal,promptText:n?.promptText??"",improver:$I(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:Sa(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=$q(e,t,o.verdict?.score??null,o.verdict?.passed??null,o.verdict?.reasons??null,r),i=new Date().toISOString();return o.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:o.continuation.type,errorMessage:o.continuation.type==="passed"?null:o.continuation.errorMessage,updatedAt:i}},Rp=(e,t,r=null)=>{let n=sp({raw:t,judge:$I(e.judgeModel),goal:e.goal,passScore:e.passScore}),o=new Date().toISOString();return n.nextPrompt===null?{...e,status:"failed",errorMessage:n.continuation.type==="failed"?n.continuation.errorMessage:"The improver reply was empty.",updatedAt:o}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:n.nextPrompt,judgement:null,writerTokens:r}],updatedAt:o}}});var Cp,zb=l(()=>{"use strict";Cp=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let n=`Token review: ${r}`;return{...e,revisions:e.revisions.map(o=>{if(o.roundNumber!==e.currentRound)return o;let s=o.judgement?.reasons?.trim()??"";return{...o,run:o.run===void 0?o.run:{...o.run,tokenReview:r},judgement:o.judgement===null?o.judgement:{...o.judgement,reasons:s.length===0?n:`${s}

${n}`}}})}}});var UI,Tp,xp,FI,zI,Ub,Fq,BI,Bb,zq,GI,Uq,Bq,VI,qI=l(()=>{"use strict";UI=require("node:child_process"),Tp=m(require("node:fs")),xp=m(require("node:path"));T();FI=4e3,zI=12e3,Ub=(e,t)=>{let r=(0,UI.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Fq=e=>Ub(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",BI=e=>{let t=Ub(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(n=>{if(n.length<4)return[];let o=n.slice(3).trim();return[[(o.includes(" -> ")?o.split(" -> ").at(-1)??o:o).replaceAll('"',""),n]]});return Object.fromEntries(r)},Bb=(e,t)=>{let r=xp.default.resolve(e,t),n=xp.default.relative(e,r);if(n.startsWith("..")||xp.default.isAbsolute(n)||!Tp.default.existsSync(r)||!Tp.default.statSync(r).isFile())return null;let o=Tp.default.readFileSync(r,"utf8");return o.includes("\0")?"(binary file)":o.length>FI?`${o.slice(0,FI)}
\u2026truncated`:o},zq=e=>e.length>zI?`${e.slice(0,zI)}
\u2026truncated`:e,GI=e=>{let t=nb(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(o=>[o,Bb(e.workingDirectory,o)])),n=Fq(e.workingDirectory);return{git:n,status:n?BI(e.workingDirectory):{},files:r,paths:t}},Uq=(e,t)=>{let r=Ub(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let n=Bb(e,t);return n===null?`${t} is missing.`:n},Bq=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",VI=e=>{let t=e.before.git?BI(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),n=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Bb(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),o=r.map(a=>Uq(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",o.length>0?`Changes since the run started:
${o.join(`
`)}`:"",n.length>0?`Files named in the prompt:
${n.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:Bq(e.before.git,e.before.paths.length>0),evidence:zq(i.join(`

`))}}});var qb,F,Kb,ye,KI,Gq,Vq,JI,Bo,YI,Go,qq,Kq,Da,Gb,Vb,Jq,XI,Yq,Xq,Zq,ZI,Qq,QI,eO,eK,tK,tO,rO=l(()=>{"use strict";qb=require("node:child_process"),F=m(require("node:fs")),Kb=m(require("node:os")),ye=m(require("node:path")),KI=8e6,Gq=16e6,Vq=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],JI=(e,t)=>{let r=(0,qb.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Bo=(e,t)=>(0,qb.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,YI=e=>{let t=JI(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let n=r.slice(3).trim().replaceAll('"',"");return(n.includes(" -> ")?n.split(" -> "):[n]).map(s=>[s.trim(),r])}))},Go=(e,t)=>{let r=ye.default.resolve(e,t),n=ye.default.relative(e,r);return n.startsWith("..")||ye.default.isAbsolute(n)?null:r},qq=(e,t)=>{let r=Go(e,t);if(r===null||!F.default.existsSync(r))return null;let n=F.default.statSync(r);return!n.isFile()||n.size>KI?null:F.default.readFileSync(r)},Kq=(e,t,r)=>{let n=Go(e,t);n!==null&&(F.default.mkdirSync(ye.default.dirname(n),{recursive:!0}),F.default.writeFileSync(n,r))},Da=(e,t)=>{let r=Go(e,t);r===null||!F.default.existsSync(r)||F.default.rmSync(r,{recursive:!0,force:!0})},Gb=(e,t)=>Bo(e,["cat-file","-e",`HEAD:${t}`]),Vb=e=>{let t=JI(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},Jq=e=>ye.default.resolve(e)!==ye.default.resolve(Kb.default.homedir()),XI=e=>{if(!F.default.existsSync(e))return 0;let t=F.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?F.default.readdirSync(e).reduce((r,n)=>r+XI(ye.default.join(e,n)),0):0},Yq=(e,t,r)=>{let n=Go(e,r);if(n===null||!F.default.existsSync(n))return{relativePath:r,existed:!1,copyDir:null};if(XI(n)>Gq)return{relativePath:r,existed:!0,copyDir:null};let o=ye.default.join(t,"cache",r);return F.default.mkdirSync(ye.default.dirname(o),{recursive:!0}),F.default.cpSync(n,o,{recursive:!0}),{relativePath:r,existed:!0,copyDir:o}},Xq=400,Zq=32e6,ZI=e=>{let t=[],r=0,n=!0,o=s=>{if(!(!n||!F.default.existsSync(s)))for(let i of F.default.readdirSync(s)){if(!n||i===".git"||i==="node_modules")continue;let a=ye.default.join(s,i),c=F.default.statSync(a);if(c.isDirectory()){o(a);continue}if(!(!c.isFile()||c.size>KI)){if(t.length>=Xq||r+c.size>Zq){n=!1;return}r+=c.size,t.push(ye.default.relative(e,a))}}};return o(e),{paths:t,complete:n}},Qq=(e,t,r)=>{let n=Go(e,r);if(n===null||!F.default.existsSync(n))return null;let o=qq(e,r);if(o===null)return"skip";let s=ye.default.join(t,"files",r);return F.default.mkdirSync(ye.default.dirname(s),{recursive:!0}),F.default.writeFileSync(s,o),s},QI=e=>{let t=F.default.mkdtempSync(ye.default.join(Kb.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?YI(e.workingDirectory):{},n=e.git?{paths:[],complete:!0}:ZI(e.workingDirectory),o=e.git?[...Object.keys(r),...e.namedPaths]:[...n.paths,...e.namedPaths],s=Object.fromEntries([...new Set(o)].map(i=>[i,Qq(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?Vb(e.workingDirectory):null,isolateCaches:Jq(e.workingDirectory),complete:n.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:Vq.map(i=>Yq(e.workingDirectory,t,i))}},eO=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Da(e.workingDirectory,t);return}Kq(e.workingDirectory,t,F.default.readFileSync(r))}},eK=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?eO(e,t):Gb(e.workingDirectory,t)?Bo(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Da(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",n=r.startsWith(" ")||r.startsWith("?");n&&Gb(e.workingDirectory,t)&&Bo(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),n&&!Gb(e.workingDirectory,t)&&Bo(e.workingDirectory,["reset","-q","HEAD","--",t])},tK=(e,t)=>{let r=Go(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Da(e.workingDirectory,t.relativePath),F.default.mkdirSync(ye.default.dirname(r),{recursive:!0}),F.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Da(e.workingDirectory,t.relativePath);return}if(F.default.existsSync(r))for(let n of F.default.readdirSync(r)){let o=ye.default.join(r,n);F.default.statSync(o).mtimeMs>=e.startedMs-1e3&&F.default.rmSync(o,{recursive:!0,force:!0})}}}},tO=e=>{try{if(e.git){if(Vb(e.workingDirectory)!==e.head&&(!(e.head===null?Bo(e.workingDirectory,["update-ref","-d","HEAD"]):Bo(e.workingDirectory,["reset","--hard",e.head]))||Vb(e.workingDirectory)!==e.head))throw new Error("head");let r=YI(e.workingDirectory);for(let n of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))eK(e,n)}else{if(e.complete)for(let t of ZI(e.workingDirectory).paths)e.files[t]===void 0&&Da(e.workingDirectory,t);for(let t of Object.keys(e.files))eO(e,t)}for(let t of e.caches)tK(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{F.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Ip,Op,rK,nK,oK,sK,iK,nO,aK,oO,sO=l(()=>{"use strict";T();kp();zb();qI();rO();je();Ye();Ma();Ip=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),Op=e=>({...e,status:"stopped",errorMessage:wn,judgePhase:void 0,updatedAt:new Date().toISOString()}),rK=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),nK=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==x?t:e.improverModel!==x?e.improverModel:null}return e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null},oK=async e=>{let t=Ee(e.cycle),r=GI({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),n=QI({workingDirectory:t,git:r.git,namedPaths:r.paths}),o=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Sb({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:wa(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):ya({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await Ze({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?VI({workingDirectory:t,before:r,writerReply:i.text}):null,c=tO(n);return i.ok?!c.ok||a===null?{ok:!1,cycle:Ip(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-o,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Op(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Ip(e.cycle,i.errorMessage)})},sK=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:oK({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),iK=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),nO=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let n=await Ze({writerAgent:e.reviewer,workingDirectory:Ee(e.cycle),prompt:rb({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return n.ok?{kind:"suggestion",text:n.text.trim(),tokens:n.tokens}:n.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Op(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},aK=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===x)return t;let n={...t,judgePhase:"scoring"};e.onProgress?.(n);let o=await Ze({writerAgent:t.judgeModel,workingDirectory:Ee(t),prompt:tb({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return o.ok?{...ja(n,o.text,o.tokens),judgePhase:void 0}:o.stopped===!0||e.signal?.aborted===!0?Op(n):(e.onWriterFailure?.(t.judgeModel),Ip(n,o.errorMessage))},oO=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return aK(e);let n=nK(t),o=await sK({cycle:t,revision:r,runner:n,signal:e.signal,onWriterFailure:e.onWriterFailure});if(o===null)return t;if(!o.ok)return o.cycle;let s=r.run===void 0?rK(t,o.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===x){let p=await nO({cycle:s,run:o.run,promptText:r.promptText,reviewer:n,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...iK(s,p.text),judgePhase:void 0}}let i=await Ze({writerAgent:t.judgeModel,workingDirectory:Ee(t),prompt:ZA({goal:t.goal,lookedAt:o.run.lookedAt??"the writer reply",evidence:o.run.evidence??o.run.output,tokens:o.run.tokens,delayMs:o.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Op(s):(e.onWriterFailure?.(t.judgeModel),Ip(s,i.errorMessage));let a=await nO({cycle:s,run:o.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=ja(s,i.text,c);return Cp(d,a.text)}});var Np,Jb=l(()=>{"use strict";T();Np=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t?.judgement?.score,n=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||n.length===0?null:ha({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:n},priorRounds:Sa(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null})),e.currentRound)})}});var Mp,lK,cK,Yb,iO=l(()=>{"use strict";T();kp();sO();Jb();je();Ye();Ma();Mp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),lK=e=>({...e,status:"stopped",errorMessage:wn,updatedAt:new Date().toISOString()}),cK=(e,t,r,n,o)=>t.ok?null:t.stopped===!0||n?.aborted===!0?lK(e):(o?.(r),Mp(e,t.errorMessage)),Yb=async(e,t,r,n)=>{let o=e.revisions.find(c=>c.roundNumber===e.currentRound);if(o===void 0)return Mp(e,"This round has no prompt.");if(e.status==="judging")return oO({cycle:e,revision:o,onWriterFailure:t,signal:r,onProgress:n});if(e.status!=="improving")return Mp(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===x)return e;let s=Np(e);if(s===null)return Mp(e,"The improver needs the score and the reason.");let i=await Ze({writerAgent:e.improverModel,workingDirectory:Ee(e),prompt:ma({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=cK(e,i,e.improverModel,r,t);return a!==null?a:Rp(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var Hp,jp,aO,dK,uK,Dp,lO,cO,pK,mK,dO,uO,pO,Xb=l(()=>{"use strict";T();je();Ye();Ma();iO();Tb();Hp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),jp=(e,t,r)=>e.wizard===void 0||t===null?Hp(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},aO=e=>{let t=e.wizard;return t===void 0||xa(e).length===0?e:{...e,wizard:jo({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},dK=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",uK=e=>{let t=e.wizard;if(t===void 0)return e;let r=_a({revisions:e.revisions});if(r.rounds.length===0)return e;let n=t.modules[t.currentModuleIndex];return{...e,wizard:jo({wizard:t,step:"optimize_modules",output:{moduleId:n?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Dp=(e,t)=>({...e,status:"wizard_paused",errorMessage:e.errorMessage,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),lO=e=>e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null,cO=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let o=r.attempts.filter(s=>s.step===t).at(-1);return o===void 0?"":JSON.stringify(o.output)},pK=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=lO(e);if(o===null)return Hp(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Wa(n),i=gb({goal:e.goal,sourcePrompt:s,avoid:n.avoidByStep.generalize,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:cO(e,"generalize")}),a=await Ze({writerAgent:o,prompt:i,workingDirectory:Ee(e),signal:t});if(!a.ok)return r?.(o),jp(e,"generalize",a.errorMessage);try{let c=Wb(a.text),d=jo({wizard:{...n,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:ka(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return Dp({...e,wizard:d},"generalize")}catch(c){return jp(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},mK=async(e,t,r)=>{let n=e.wizard;if(n===void 0)return e;let o=lO(e);if(o===null)return Hp(e,"Choose a writer to suggest splits.");let s=La({wizard:n,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=yb({goal:e.goal,templatedPrompt:n.templatedPrompt,variables:n.variables,evaluatedPromptReference:s,avoid:n.avoidByStep.separate,stepInstructions:n.pendingStepInstructions,lastAttemptSummary:cO(e,"separate")}),a=await Ze({writerAgent:o,prompt:i,workingDirectory:Ee(e),signal:t});if(!a.ok)return r?.(o),jp(e,"separate",a.errorMessage);try{let c=Lb(a.text),d=fb(c,n.variables),p=jo({wizard:{...n,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:n.pendingStepInstructions.trim().length===0?null:n.pendingStepInstructions});return Dp({...e,wizard:p},"separate")}catch(c){return jp(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},dO=e=>{let t=e.wizard;if(t===void 0)return e;let r=Wa(t),n=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:70,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:n}},uO=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let n=r.modules[t];if(n===void 0)return Hp(e,"This module is missing.");let o=vn(r),s=Ea(n.prompt,o),i=e.runnerModel!==void 0&&e.runnerModel!==x?e.runnerModel:e.judgeModel!==x?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:70,maxRounds:1,errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},pO=async(e,t,r,n)=>{let o=e.wizard;if(o===void 0)return Yb(e,t,r,n);if(o.gate!==null||e.status==="wizard_paused")return e;if(o.phase==="generalize")return pK(e,r,t);if(o.phase==="separate"&&o.splitOptions.length===0)return mK(e,r,t);if(o.phase==="evaluate"||o.phase==="optimize_modules"){let s=await Yb(e,t,r,n);if(k(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&xa(s).length===0)return s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let p=he(s.revisions.map(b=>({roundNumber:b.roundNumber,promptText:b.promptText,score:b.judgement?.score??0,reasons:b.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0,f=Dp({...s,wizard:{...s.wizard,evaluateSelectedRound:p}},i);return i==="evaluate"?aO(f):f}let a=Dp(s,i),c=i==="optimize_modules"&&a.wizard!==void 0?(()=>{let d=bb({wizard:{...a.wizard,modules:a.wizard.modules.map((p,f)=>f===a.wizard.currentModuleIndex&&p.status==="running"?{...p,status:"paused"}:p)},moduleIndex:a.wizard.currentModuleIndex,revisions:a.revisions,cycleStatus:dK(s.status)});return{...a,wizard:d}})():a;return i==="evaluate"?aO(c):uK(c)}return s}return o.phase==="complete",e}});var kr,mO,gK,gO=l(()=>{"use strict";T();Ye();Ln();Hb();kr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mO=e=>{if(!k(e.status))return"";let t=he(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,n=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",o=ht(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${kr(t.reasons.trim())}</p>`,i=o===null?gK({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Ee(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${kr(o)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${n}${s}${i}</section>`},gK=e=>{let t=e.sourceSkill?.fileName??Oa(e.goal),r=e.sourceSkill?.name??t,n=e.sourceSkill?.description??e.goal,o=Lp(t,r),s=o.length>0&&EI(e.workingDirectory,o),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${kr(o)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${kr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${kr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${kr(n)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${kr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${kr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var fO,hO=l(()=>{"use strict";T();je();Ln();fO=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!k(e.status)){let t=e.judgeModel;return{title:`${Xe(t)} is suggesting module splits.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!k(e.status)){let t=e.judgeModel;return{title:`${Xe(t)} is generalizing your prompt.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===x?{title:`Score the prompt text for round ${e.currentRound+1}.`,detail:"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."}:e.judgePhase==="scoring"?{title:`${Xe(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"No folder run in step 2. This panel keeps updating, so the page is not stuck."}:{title:`${Xe(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"Wizard evaluate revises prompt wording before the runner executes in step 4."};if(e.status==="judging"&&e.judgeModel===x){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==x?{title:`${Xe(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"You score the changes after this run."}:{title:`Score the changes from round ${e.currentRound+1}.`,detail:t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt."}}if(e.status==="judging"&&e.judgePhase==="reviewing")return{title:`${Xe(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,detail:"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck."};if(e.status==="judging"&&e.judgePhase==="scoring")return{title:`${Xe(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,detail:"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck."};if(e.status==="judging")return{title:`${Xe(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck."};if(e.status==="improving"&&e.improverModel===x){let t=e.revisions.find(n=>n.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return{title:"Rewrite the prompt.",detail:t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`}}if(e.status==="improving")return{title:`${Xe(e.improverModel)} is rewriting the prompt.`,detail:"That writer is working on this Mac. This panel keeps updating, so the page is not stuck."};if(e.status==="passed")return{title:"This prompt passed.",detail:""};if(e.status==="stopped"){let t=e.revisions.some(o=>ht(o.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let o=Be(e.wizard),s=o.totalModules>0&&(e.wizard.phase==="complete"||o.passedModuleCount>0||k(e.status));return{title:s&&o.totalModules>0?`Wizard finished \u2014 ${o.passedModuleCount}/${o.totalModules} modules passed`:"Wizard stopped before all steps finished",detail:r.length>0?r:s?"":"Progress from finished steps is kept."}}return{title:(e.errorMessage??"").startsWith("Finished")?"Finished.":"Stopped.",detail:r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept."}}return k(e.status)?{title:"This run stopped because a reply could not be used.",detail:""}:{title:"Working on this Mac.",detail:"This panel keeps updating."}}});var Tt,Ha=l(()=>{"use strict";je();Tt=e=>{if(e.status==="improving"&&e.improverModel===x)return!0;if(e.status!=="judging"||e.judgeModel!==x)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===x}});var yO,SO=l(()=>{"use strict";yO=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Cr,fK,AO,bO=l(()=>{"use strict";T();Cr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fK=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Cr(r)}</p>`},AO=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Cr(e.cycleId)}">`,n=e.instructions?.trim()??"",o=n.length===0?"":`<p class="muted">Instructions</p><p>${Cr(n)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Cr(a)}.</p>`}<pre class="mono">${Cr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Er(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Cr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${o}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",f=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Cr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${o}${fK(e.score,e.reasons)}${f}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Cr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var $a,hK,PO,_O=l(()=>{"use strict";T();Ln();$a=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hK=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,n=ht(t.promptText),o=t.judgement?.reasons?`<p class="muted">${$a(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${$a(i)}.</p>`}<pre class="mono">${$a(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Er(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=n===null?`<pre class="mono">${$a(d)}</pre>`:`<div class="alert-error">${$a(n)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${o}${a}${p}</article>`},PO=e=>e.revisions.map(t=>hK(e,t)).join("")});var wO,vO=l(()=>{"use strict";T();wO=e=>{if(k(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var xt,yK,Zb,SK,AK,bK,PK,WO,LO,Qb=l(()=>{"use strict";vO();xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yK="Stop this run? Writers will stop and the best prompt is kept.",Zb="End the wizard? Writers will stop and progress from finished steps is kept.",SK="Skip this module and pause at the step gate?",AK=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${xt(yK)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${xt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,bK=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${xt(Zb)}"><input type="hidden" name="cycleId" value="${xt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,PK=e=>{let t=xt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${xt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${xt(SK)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${xt(Zb)}">End wizard</button>
    </form>
  </div>`},WO=e=>{let t=wO(e);return t==="none"?"":t==="classic"?AK(e.id):t==="wizard_end_only"?bK(e.id):PK(e)},LO=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=xt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${xt(Zb)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var EO,RO=l(()=>{"use strict";T();EO=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let n=r.variables.length;return r.templatedPrompt.trim().length>0?n>0?`Templated prompt \xB7 ${n} variable${n===1?"":"s"}`:"Templated prompt ready":n>0?`${n} variable${n===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let n=e.revisions.filter(o=>o.judgement!==null&&o.judgement!==void 0).length;if(n>0){let o=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return o===null?`${n} scored revision${n===1?"":"s"}`:`Best score ${o} \xB7 ${n} revision${n===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let n=r.modules.length>0?r.modules.length:r.splitOptions.length;return n>0?`${n} module${n===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let n=Be(r);return`${n.passedModuleCount}/${n.totalModules} passed \xB7 \u2265 ${70}`}return""}});var Fa,_K,kO,CO=l(()=>{"use strict";T();RO();fp();Fa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_K=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=Be(t),n=r.terminalStatusSuggestion==="passed"?`${r.passedModuleCount} of ${r.totalModules} modules passed (score \u2265 ${70}).`:`${r.passedModuleCount} of ${r.totalModules} modules passed. Some modules were skipped, stopped, or below ${70}.`,o=r.rows.map(s=>`<tr><td>${Fa(s.title)}</td><td>${s.bestScore??"\u2014"}</td><td>${s.tokens??"\u2014"}</td><td>${Fa(s.status)}</td></tr>`).join("");return`<h3>Modules</h3><p class="muted">${Fa(n)}</p><table class="sdlc-wizard-outcome-table"><thead><tr><th>Module</th><th>Best score</th><th>Tokens</th><th>Status</th></tr></thead><tbody>${o}</tbody></table>`},kO=e=>{if(e.wizard===void 0||!k(e.status))return"";let r=_K(e),n=["wizard-1","wizard-2","wizard-3","wizard-4"].map(o=>{let s=$o(e,o);if(s.trim().length===0)return"";let i=o==="wizard-1"?"Step 1 \u2014 Generalize":o==="wizard-2"?"Step 2 \u2014 Evaluate":o==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",a=EO(e,o);return`<details class="sdlc-wizard-outcome-step"><summary>${`${Fa(i)} <span class="muted sdlc-wizard-outcome-step-hint">${Fa(a)}</span>`}</summary><div class="sdlc-wizard-outcome-step-body">${s}</div></details>`}).join("");return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><h3 class="sdlc-run-panel-title">Step details</h3>${r}${n}</div>`}});var Vo,$p,eP=l(()=>{"use strict";T();Ap();gO();hO();Ha();SO();Jb();bO();_O();Qb();CO();yp();Ye();Vo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$p=e=>{let t=!k(e.status)&&e.status!=="wizard_paused"&&!Tt(e),r=fO(e),n=pI(ab(yO(e)),e),o=k(e.status)?"":WO(e),s=kO(e),i=mO(e),a=e.errorMessage===null?"":`<div class="alert-error">${Vo(e.errorMessage)}</div>`,c=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",d=t?" Working for <span data-elapsed>0s</span>.":"",p=!t&&e.wizard!==void 0&&k(e.status)&&(e.wizard.phase==="complete"||Be(e.wizard).passedModuleCount>0),f=p&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Vo(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last settings">Re-run same settings</button></p>`:"",b=r.detail.length===0&&f.length===0||r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Vo(r.detail)}${d}</p>`,h=e.revisions.find($e=>$e.roundNumber===e.currentRound),y=e.status==="improving"?Np(e):null,u=Fo(e),S=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),A=Tt(e)?AO({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:y?.promptText??h?.promptText??"",score:y?.score??h?.judgement?.score??null,reasons:y?.reasons??h?.judgement?.reasons??null,avoid:y?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:h?.run??null,minJudgeScore:S?1:0}):"",_=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules"?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${Sp(e.passScore)}</div>`:"",w=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':k(e.status)?'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",W=t?c:p?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',E=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Vo(kt(Ee(e)))}</li>`:"",u>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${hp(u)} so far</li>`:""].filter($e=>$e.length>0),R=E.length===0?"":`<ul class="sdlc-run-meta">${E.join("")}</ul>`,C=o.length===0?"":`<div class="sdlc-run-actions">${o}</div>`,I=`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${n}</div>`,D=_.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${I}</div>`:`<div class="sdlc-run-grid">${I}${_}</div>`,oe=PO(e),q=e.wizard!==void 0&&k(e.status)&&e.revisions.every($e=>$e.roundNumber===0&&($e.judgement===void 0||$e.judgement===null)),G=oe.length===0||q?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${oe}</div></section>`;return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Vo(e.updatedAt)}" aria-busy="${t?"true":"false"}"><header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${w}</div><div class="sdlc-run-activity${p?" sdlc-run-activity-success":""}"${p?' role="status"':""}><div class="sdlc-run-activity-icon">${W}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Vo(r.title)}</h2>${b}${f}</div></div>${R}${C}</header>${a}${D}${A}${s}${i}</section>${G}`}});var TO,qo,Fp=l(()=>{"use strict";T();TO=e=>Wn.indexOf(e),qo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||k(e.status)?Wn.length:t.gate!==null?TO(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?TO(t.phase):null}});var xO,IO=l(()=>{"use strict";xO=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Cn,OO,NO=l(()=>{"use strict";T();IO();Cn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OO=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,n=wa(t,r),o=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Cn(xO(n))}</pre></div>`:"",s=Ra(e.modulePrompt);if(s.length===0)return o.length>0?`<div class="sdlc-wizard-module-params">${o}</div>`:"";let i=vn(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=up(c),f=i[c]??"",b=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Cn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Cn(p)}">${Cn(b)}</label>
        ${h}
        <input class="input" type="text" id="${Cn(p)}" name="${Cn(p)}" value="${Cn(f)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${o}${a}</div>`}});var It,MO,jO=l(()=>{"use strict";T();NO();xb();gp();Qb();It=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MO=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let n=r.gate,o=n==="generalize"?"Step 1 \u2014 Generalize":n==="evaluate"?"Step 2 \u2014 Evaluate":n==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=n==="generalize"?`<ul class="sdlc-wizard-vars">${r.variables.map(_=>`<li><strong>{{${It(_.name)}}}</strong> \u2014 ${It(_.description)} (sample: ${It(_.sampleValue)})</li>`).join("")}</ul><pre class="sdlc-pre">${It(r.templatedPrompt)}</pre>`:"",i=n==="evaluate"?Ho({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",c=n==="separate"?`${n==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(_=>{let w=_.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',W=_.recommended?' <span class="sdlc-badge">Recommended</span>':"",E=r.selectedSplitOptionId===_.id||r.selectedSplitOptionId===null&&_.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${It(_.id)}" required${E}> <strong>${It(_.title)}</strong>${w}${W}<br><span class="muted">${It(_.summary)}</span></label>${mp(_)}</li>`}).join("")}</ul>`:"",d=r.modules[r.currentModuleIndex],p=d?.title??"Module",f=d?.prompt??"",b=d?.status==="pending",h=n==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${It(p)}</p>${b?OO({cycle:e,modulePrompt:f}):""}<p class="muted">Test run prompt preview: ${It(Ea(f,vn(r)))}</p>${d?.statistics===null||d?.statistics===void 0?"":`<p class="muted">Module stats: best ${d.statistics.bestScore??"\u2014"} / ${e.passScore} (round ${d.statistics.bestRound??"\u2014"}).</p>`}${Ho({cycle:e,interactive:!1,caption:b?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${p}\u201D (runner + judge).`})}`:"",y=n==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":n==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":n==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":b?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",u=wb(r),S=u===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${u}</p>`,A=t?.active===!0?" sdlc-wizard-gate-active":"",g=t?.active===!0?' id="prompt-optimizer-wizard-active-step"':"";return`<section class="card sdlc-wizard-gate${A}"${g}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${o}</h2>
    <p class="sdlc-wizard-gate-lede">${y}</p>
    ${S}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${It(e.id)}">
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
    ${LO(e)}
  </section>`}});var wK,DO,HO=l(()=>{"use strict";T();wK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DO=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||k(e.status))return"";if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>Suggesting module splits</h2>
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let r=t.currentModuleIndex,o=t.modules[r]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    <h2>Module ${r+1} of ${t.modules.length}: ${wK(o)}</h2>
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
  </section>`:""}});var vK,WK,LK,$O,FO=l(()=>{"use strict";T();Fp();jO();HO();fp();vK={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},WK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),LK=(e,t,r)=>`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${WK(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${$o(e,t)}</div>
</details>`,$O=e=>{let t=e.wizard;if(t===void 0)return"";let r=qo(e);if(r===null)return"";let n=Wn.slice(0,r).map((i,a)=>LK(e,`wizard-${a+1}`,vK[i])),o=t.gate!==null?MO(e,{active:!0}):DO(e),s=r>=Wn.length?"":o;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${n.join("")}${s}</div>`}});var zp,tP=l(()=>{"use strict";FO();gp();T();zp=e=>{if(e===null||e.wizard!==void 0&&k(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=$O(e),r=iI(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var rP,zO,UO,Up,BO,Bp=l(()=>{"use strict";T();Je();rP=new Map,zO=e=>{let t=new AbortController;return rP.set(e,t),t.signal},UO=e=>{rP.delete(e)},Up=e=>{rP.get(e)?.abort()},BO=(e,t)=>{let r=K(e,t);return r===null||r.wizard!==void 0?!1:(k(r.status)||(B(e,{...r,status:"stopped",errorMessage:wn,updatedAt:new Date().toISOString()}),Up(t)),!0)}});var za,Gp,GO,nP,VO,qO,KO,JO,oP=l(()=>{"use strict";za=m(require("node:fs")),Gp=m(require("node:path")),GO=e=>Gp.default.join(Gp.default.dirname(e),"prompt-optimizer-writer-ready.json"),nP=e=>{let t=GO(e);if(!za.default.existsSync(t))return{};try{let r=JSON.parse(za.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},VO=(e,t)=>{za.default.mkdirSync(Gp.default.dirname(e),{recursive:!0}),za.default.writeFileSync(GO(e),`${JSON.stringify(t,null,2)}
`)},qO=(e,t)=>nP(e)[t]?.message??null,KO=(e,t,r)=>{VO(e,{...nP(e),[t]:{message:r}})},JO=(e,t)=>{let r=nP(e);r[t]!==void 0&&VO(e,Object.fromEntries(Object.entries(r).filter(([n])=>n!==t)))}});var sP,Vp,qp,YO,Ie,Tn=l(()=>{"use strict";T();Ta();Xb();Ha();Bp();oP();Je();sP=new Set,Vp={atMs:0,ids:[]},qp=async()=>{if(Date.now()-Vp.atMs<3e4)return Vp.ids;let e=await gt({commands:ie({})});return Vp.atMs=Date.now(),Vp.ids=e.installedWriterIds,e.installedWriterIds},YO=async(e,t,r)=>{let n=K(e,t);if(n===null||k(n.status)||n.status==="wizard_paused"||Tt(n)||r.aborted)return;let o=await pO(n,i=>{JO(e,i)},r,i=>{K(e,t)?.status==="stopped"||r.aborted||B(e,i)});K(e,t)?.status==="stopped"||r.aborted||(B(e,o),k(o.status)||await YO(e,t,r))},Ie=(e,t)=>{if(sP.has(t))return;let r=K(e,t);if(r===null||k(r.status)||r.status==="wizard_paused"||Tt(r))return;sP.add(t);let n=zO(t);YO(e,t,n).finally(()=>{sP.delete(t),UO(t)})}});var Tr,Ua=l(()=>{"use strict";eP();tP();Tn();Tr=(e,t)=>(Ie(e,t.id),`${$p(t)}${zp(t)}`)});var XO,ZO,QO=l(()=>{"use strict";XO=(e,t)=>e.revisions.find(n=>n.roundNumber===t)?.judgement?.score??null,ZO=e=>e!==null&&e>0});var Kp,eN,iP=l(()=>{"use strict";T();Bp();Kp=e=>(Up(e.id),{...e,status:"stopped",errorMessage:BA,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null,phase:"complete"},updatedAt:new Date().toISOString()}),eN=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;Up(e.id);let r=t.currentModuleIndex,n=t.modules.map((o,s)=>s===r?{...o,status:"stopped"}:o);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:n,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var EK,tN,RK,rN,nN=l(()=>{"use strict";T();Xb();Ua();Je();Tn();QO();iP();EK="Pick a revision scored above 0 before continuing to Separate.",tN=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),RK=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null})),rN=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",n=t.get("intent")??"";if(!n.startsWith("wizard-"))return!1;let o=t.get("cycleId")?.trim()??"",s=K(e.storePath,o);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=K(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Tr(e.storePath,d))};if(n==="wizard-stop-all"){let c=Kp(s);return B(e.storePath,c),a(o),!0}if(n==="wizard-skip-module"){let c=eN(s);return B(e.storePath,c),a(o),!0}if(n==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(o),!0;let p=t.get("wizardStepInstructions")?.trim()??"",f=ub(s.wizard,d,c);f=pb(f,d),f={...f,pendingStepInstructions:p};let b={...s,status:"judging",wizard:{...f,gate:null},updatedAt:new Date().toISOString()};return B(e.storePath,b),Ie(e.storePath,o),a(o),!0}if(n==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(o),!0;if(c==="generalize"){let p=(s.errorMessage?.trim().length??0)>0?tN(s):dO({...s,wizard:{...s.wizard,gate:null}});return B(e.storePath,p),Ie(e.storePath,o),a(o),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),f=XO(s,p??-1);if(!ZO(f)){let y={...s,errorMessage:EK,updatedAt:new Date().toISOString()};return B(e.storePath,y),a(o),!0}let b={...s.wizard,evaluateSelectedRound:p},h={...s,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...b,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()};return B(e.storePath,h),Ie(e.storePath,o),a(o),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0){let y=tN(s);return B(e.storePath,y),Ie(e.storePath,o),a(o),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",f=s.wizard.splitOptions.find(y=>y.id===p);if(f===void 0){let y={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return B(e.storePath,y),a(o),!0}let b=RK(f),h={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...s.wizard,gate:"optimize_modules",selectedSplitOptionId:p,selectedSplitTopology:f.topology,modules:b,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(s.wizard.parameterValues??{}).length>0?s.wizard.parameterValues??{}:ka(s.wizard.variables)},updatedAt:new Date().toISOString()};return B(e.storePath,h),a(o),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(o),!0;let f=kb({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!f.ok){let u={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return B(e.storePath,u),a(o),!0}let b={...s.wizard,parameterValues:f.parameterValues};if(p.status==="pending"){let u=uO({...s,wizard:{...b,gate:null}},d);return B(e.storePath,u),Ie(e.storePath,o),a(o),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=Be(b),S={...s,status:u.terminalStatusSuggestion,wizard:{...b,gate:null,phase:"complete"},updatedAt:new Date().toISOString()};return B(e.storePath,S),a(o),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...b,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return B(e.storePath,y),a(o),!0}}return a(o),!0}});var kK,oN,CK,aP,TK,sN,iN=l(()=>{"use strict";je();Bp();iP();zb();kp();Ha();Je();kK="Add a score from 0 to 100 and the reason for it.",oN="Add a score from 1 to 100 and the reason for it.",CK="Write the next prompt.",aP="This step is not waiting for you.",TK=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},sN=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=K(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(B(e.storePath,Kp(a)),{kind:"saved",cycleId:i}):BO(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",n=K(e.storePath,r);if(n===null||!Tt(n))return n===null?{kind:"missing"}:{kind:"invalid",cycle:n,errorMessage:aP};if(t==="manual-judge"){if(n.judgeModel!==x)return{kind:"invalid",cycle:n,errorMessage:aP};let i=TK(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=n.wizard!==void 0&&(n.wizard.phase==="evaluate"||n.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:n,errorMessage:c?oN:kK};if(c&&i===0)return{kind:"invalid",cycle:n,errorMessage:oN};let d=n.revisions.find(f=>f.roundNumber===n.currentRound)?.run?.tokenReview??"",p=Cp(ja(n,JSON.stringify({score:i,passed:i>=n.passScore,reasons:a})),d);return B(e.storePath,p),{kind:"saved",cycleId:n.id}}if(n.improverModel!==x)return{kind:"invalid",cycle:n,errorMessage:aP};let o=(e.posted.get("prompt")??"").trim();if(o.length===0)return{kind:"invalid",cycle:n,errorMessage:CK};let s=Rp(n,o);return B(e.storePath,s),{kind:"saved",cycleId:n.id}}});var aN,lN=l(()=>{"use strict";aN=`<script>
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
</script>`});var cN,dN=l(()=>{"use strict";cN=`<script>
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
  focusActiveWizardStep();
})();
</script>`});var uN,pN=l(()=>{"use strict";uN=`<script>
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
</script>`});var mN,gN=l(()=>{"use strict";mN=`<script>
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
</script>`});var fN,hN=l(()=>{"use strict";T();Ye();fN=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),n=t.wizard?.templatedPrompt.trim()??"",o=n.length>0?n:r?.promptText??e.prompt;return{goal:t.goal,prompt:o,folder:t.workingDirectory===void 0?e.folder:kt(t.workingDirectory),passScore:String(t.passScore),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!k(t.status)}}});var yN,SN=l(()=>{"use strict";T();Fp();yN=e=>{if(e.wizard===void 0)return k(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=qo(e);return e.status==="wizard_paused"&&t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`}:k(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var AN,bN=l(()=>{"use strict";AN=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return"Just now";let o=Math.floor(n/60);if(o<60)return`${o} min ago`;let s=Math.floor(o/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Jp,lP=l(()=>{"use strict";Jp=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",n=r.length>0?r:"Untitled run";return n.length<=72?n:`${n.slice(0,71).trimEnd()}\u2026`}});var Xt,xK,IK,PN,_N=l(()=>{"use strict";SN();bN();lP();Xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xK=e=>e.wizard===void 0?"classic":"wizard",IK=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Xt(t)}">`,n=yN(e),o=AN(e.updatedAt),s=o.length===0?n.subtitle:`${n.subtitle} \xB7 ${o}`,i=t!==null&&e.id===t?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",a=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Xt(e.id)}">Resume</a>`:"";return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${xK(e)}"><div class="sdlc-history-row-main">${i}<span class="${Xt(n.badgeClass)}">${Xt(n.badgeLabel)}</span><div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Xt(e.id)}">${Xt(Jp(e.goal))}</a><p class="muted">${Xt(s)}</p></div></div><div class="sdlc-history-row-actions">${a}<form method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Xt(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form></div></li>`},PN=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>IK(a,t)).join(""),n=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="classic" aria-pressed="false">Classic</button>
  </div>`,o=Math.min(e.length,20),s=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${n}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history"><summary class="sdlc-history-details-summary"><span class="eyebrow">Past runs</span> ${Xt(s)}</summary>${i}</details>`:i}});var cP,Yp,wN,OK,NK,dP,vN,uP=l(()=>{"use strict";cP=m(require("node:fs")),Yp=m(require("node:path"));Ye();wN=/^[a-z0-9-]+$/,OK=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},NK=(e,t)=>{if(!wN.test(t))return null;let r=e.replace(/^\uFEFF/,""),n=t,o="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let f=OK(p[2]??"");p[1]==="name"&&f.length>0&&(n=f),p[1]==="description"&&(o=f)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:n,description:o,promptText:i}},dP=e=>{let t=Rn(e);if(!t.ok)return[];let r=Yp.default.resolve(t.path,".cursor","skills"),n=[];try{n=cP.default.readdirSync(r)}catch{return[]}return n.filter(o=>wN.test(o)).flatMap(o=>{let s=Yp.default.resolve(r,o,"SKILL.md");if(!s.startsWith(`${r}${Yp.default.sep}`))return[];try{let i=NK(cP.default.readFileSync(s,"utf8"),o);return i===null?[]:[i]}catch{return[]}}).toSorted((o,s)=>o.fileName.localeCompare(s.fileName))},vN=(e,t)=>dP(e).find(r=>r.fileName===t)??null});var WN,Xp,pP=l(()=>{"use strict";T();WN=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,2}$/.test(t)||r<1||r>30?{ok:!1,errorMessage:`Round limit must be a whole number from 1 to ${30}.`}:{ok:!0,maxRounds:r}},Xp=e=>e?.trim()||String(10)});var LN,EN=l(()=>{"use strict";LN={goal:{title:"Goal",practice:"Write the outcome a reader can check. Name who it is for and what must stay true.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Pass score",practice:"The run passes at this score. 90 is the usual bar. Lower it when a useful prompt is enough.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var Ba,MK,jK,Se,xn=l(()=>{"use strict";EN();Ba=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MK='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>',jK=e=>{let t=LN[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Ba(t.title)}" aria-describedby="${r}" aria-expanded="false">${MK}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Ba(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Ba(t.example)}</span></span></button>`},Se=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Ba(r)}"`}>${Ba(e)}</span>${jK(t)}</span>`});var RN,kN=l(()=>{"use strict";T();pP();xn();RN=e=>{let t=Xp(e);return`<div class="field">${Se("Round limit","roundLimit")}<input class="input" type="number" name="maxRounds" min="1" max="${30}" step="1" value="${t}"><span class="muted">Stops after this many scored rounds. The usual limit is 10. The run also stops when the score has not risen for 3 rounds.</span></div>`}});var DK,HK,$K,CN,TN=l(()=>{"use strict";T();xn();DK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HK=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=1&&t<=100?t:90},$K=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,CN=e=>{let t=HK(e),r=Math.floor(t/2),n=Math.max(r+1,t-20),o=Aa(t).map(i=>i.label).join(" \xB7 "),s=`--sdlc-weak:${r}%;--sdlc-close:${n}%;--sdlc-pass:${t}%`;return`<div class="field sdlc-pass"><div class="sdlc-pass-head">${Se("Pass score","passScore","sdlc-pass-label")}<output class="sdlc-pass-value" data-sdlc-pass-value for="sdlc-pass">${t}</output></div><div class="sdlc-pass-scale" style="${s}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="sdlc-pass" class="sdlc-pass-range" type="range" name="passScore" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="sdlc-pass-label"><span class="sdlc-pass-mark" style="left:${$K(90)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${90}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${DK(o)}</p><p class="muted">The bar fades from a weak score to a pass. The mark is the usual ${90}.</p></div>`}});var xN,FK,IN,ON,NN=l(()=>{"use strict";xn();xN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FK=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),IN=e=>{if(e.length===0)return`<div class="field">${Se("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${xN(r.fileName)}">${xN(r.fileName)}</option>`).join("");return`<div class="field">${Se("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${FK(e)}</script>`},ON=`<script>
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
</script>`});var Ga,zK,MN,jN=l(()=>{"use strict";lP();Fp();Ga=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zK=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",MN=e=>{let t=e.wizard;if(t===void 0||t.gate===null)return"";let r=Jp(e.goal),n=zK(t.gate),o=qo(e),s=o===null||o>=4?"":` (step ${o+1} of 4)`,i=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ga(r)}</h2>
    <p class="lede">Paused at <strong>${Ga(n)}</strong>${Ga(s)} (last updated ${Ga(i)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ga(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Va,DN,HN=l(()=>{"use strict";xn();Va=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DN=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(o=>`<option value="${Va(o.id)}"${o.id===e.runner?" selected":""}>${Va(o.label)}</option>`).join(""),n=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Va(e.runner)}">Checking ${Va(e.writers.find(o=>o.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Se("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${n}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Se("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Va(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var $N,FN=l(()=>{"use strict";$N=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard</th><th>Classic loop</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td><td>Every round</td></tr><tr><td>Improver</td><td>\u2014</td><td>Rewrites after each score</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td><td>\u2014</td></tr></tbody></table>'});var Ko,zN,UN,BN,GN,VN=l(()=>{"use strict";xn();Ko=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zN=(e,t,r,n,o)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=n.map(c=>`<option value="${Ko(c.id)}"${c.id===r?" selected":""}>${Ko(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Ko(o)}</option>`;return`<div class="field">${Se(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},UN=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let n=r.find(o=>o.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Ko(t)}">Checking ${Ko(n)}\u2026</p>`},BN=(e,t,r,n,o)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Se(t,o)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Ko(r)}</textarea><span class="muted">${n}</span></div></details>`,GN=e=>{let t=`<div class="sdlc-writer">${zN("judge","Judge",e.judge,e.writers,"I'll score it")}${UN("judge",e.judge,e.writers)}${BN("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${zN("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${UN("improver",e.improver,e.writers)}${BN("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var Jo,qN,KN=l(()=>{"use strict";Ha();eP();lN();dN();Ap();pN();gN();hN();_N();uP();kN();TN();NN();xn();tP();jN();HN();FN();VN();T();Jo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qN=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Jo(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Jo(e.skillNotice??"")}</div>`,n=`${mI}${gI}`,o=e.resumableWizardCycle??null,s=o===null?"":MN(o),i=zp(e.cycle),a=e.cycle===null?"":$p(e.cycle),c=e.cycle!==null&&Tt(e.cycle),d=fN(e),p=c?"Waiting for you":d.running?"Running\u2026":"Run",f=GN({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),b=DN({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Classic loop skips the wizard. Instructions are optional.",y=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",u=e.cycle!==null||d.running?"":" open",S=e.cycle!==null&&k(e.cycle.status),W=`<section class="card sdlc-compose${S?" sdlc-compose-viewing-finished":""}" id="prompt-optimizer-compose">
      <div class="sdlc-form-head">
        <div class="sdlc-compose-mode" role="group" aria-label="Run mode">
        <button type="button" class="btn btn-secondary" data-sdlc-compose-mode="wizard" aria-pressed="true">Wizard</button>
        <button type="button" class="btn btn-secondary" data-sdlc-compose-mode="classic" aria-pressed="false">Classic loop</button>
      </div>
        ${S?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':`<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>
        <a class="btn btn-secondary" href="/prompt-optimizer?example=wizard-verification">Load wizard verification example</a>`}
      </div>
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${u}>
        ${S?'<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Collapsed \u2014 expand to edit goal and prompt</span></summary>':'<summary class="sdlc-compose-summary"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</summary>'}
      <p class="lede">${h} ${Jo(e.modelNote)}</p>
      <form class="sdlc-form" method="POST" action="/prompt-optimizer">
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${y}
        <div class="sdlc-block">
          <p class="sdlc-block-title">Prompt and goal</p>
          <div class="field">
            ${Se("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${Jo(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Se("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Jo(d.prompt)}</textarea>
          </div>
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Folder</p>
          <div class="sdlc-folder">
          <div class="field">
            ${Se("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Jo(d.folder)}" onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${IN(dP(d.folder))}
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Judge and improver</p>
          ${f}
        </div>
        ${b}
        <div data-sdlc-wizard-only>${$N()}</div>
        <details class="sdlc-classic-loop-options">
          <summary class="sdlc-block-title">Classic loop options</summary>
          <div class="sdlc-limits">
            ${CN(d.passScore)}
            ${RN(d.maxRounds)}
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
    </section>`,E=`${""}${aN}${cN}${mN}${ON}${uN}`;return`${t}${r}${W}${s}${a}${i}${n}${PN(e.history,e.cycle?.id??null)}${E}`}});var qa,mP=l(()=>{"use strict";KN();qa=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:qN(t)}))}});var JN,YN=l(()=>{"use strict";iN();Ua();mP();Je();Tn();JN=async(e,t,r)=>{let n=t===null?{kind:"ignored"}:sN({posted:t,storePath:e.storePath});if(n.kind==="ignored")return!1;if(n.kind==="saved"){let o=K(e.storePath,n.cycleId);return Ie(e.storePath,n.cycleId),t?.get("liveFragment")==="1"&&o!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":o.id}),e.response.end(Tr(e.storePath,o)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(n.cycleId)}`}),e.response.end(),!0)}return n.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await qa(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:n.cycle.judgeModel,improver:n.cycle.improverModel,folder:"~",passScore:String(n.cycle.passScore),maxRounds:String(n.cycle.maxRounds),canRun:r.canRun,errorMessage:n.errorMessage,skillNotice:null,cycle:n.cycle,history:Rt(e.storePath),resumableWizardCycle:null}),!0)}});var XN,Zp,gP=l(()=>{"use strict";XN=m(require("node:os"));T();Zp=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??XN.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??90,maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var ZN,QN=l(()=>{"use strict";ZN=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var eM,tM,rM,nM=l(()=>{"use strict";eM="wizard-verification",tM="Produce a reusable skill template that teaches how to verify Prompt SDLC wizard steps 1\u20134 on Agent Witch Live (bundle 172+): generalize with {{variables}}, evaluate scored revisions (no score 0 continue), separate into module chunks, optimize each module with runner+judge round logs visible at step 4.",rM=`You help users test the prompt optimizer wizard on Agent Witch Live.
Explain the four steps when asked. Sometimes skip evaluate or separate.
Mention round scores at step 4 only if you remember.
Use placeholders like {{thing}} without defining them.
Do not describe install bundle self-update or production bundle version checks.`});var oM,Yo,fP,sM,iM,Ka=l(()=>{"use strict";T();je();Nb();nM();oM=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Yo=e=>{let t=II(e),r=kn(e).map(o=>({id:o,label:Ep[o]}));return{note:r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(o=>o.label).join(", ")}.`,canRun:!0,models:t,writers:r,judge:"",improver:"",runner:""}},fP=(e,t,r)=>t===x||t!==null&&e.writers.some(n=>n.id===t)?t:r,sM=(e,t,r,n=null)=>({judge:fP(e,t,e.judge),improver:fP(e,r,e.improver),runner:fP(e,n,e.runner)}),iM=e=>e===eM?{goal:tM,prompt:rM}:e===bp?{goal:Pp,prompt:_p}:{goal:"",prompt:""}});var Qp,hP=l(()=>{"use strict";T();je();pP();QN();Ye();Ka();Qp=e=>{let t=sM(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=e.posted?.get("passScore")??String(90),n=Xp(e.posted?.get("maxRounds")??null),o=e.posted?.get("judgeInstructions")?.trim()??"",s=e.posted?.get("improverInstructions")?.trim()??"",i=e.posted?.get("runnerInstructions")?.trim()??"",a=e.posted?.get("runner")??null,c=(A,g)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:A,passScore:r,maxRounds:n,errorMessage:g,judge:t.judge,improver:t.improver,judgeInstructions:o,improverInstructions:s,runner:t.runner,runnerInstructions:i});if(e.posted===null)return c(e.defaultFolder??En,null);let d=e.posted.get("folder")??En;if(e.posted.get("intent")==="choose-folder"){let A=e.pickFolder();return c(A===null?d:kt(A),null)}let p=e.posted.get("intent")??"";if(p!=="run"&&p!=="run-classic")return c(d,null);let f=oM(e.goal,e.prompt);if(f!==null)return c(d,f);let b=OI(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(b===null)return c(d,"Choose a judge and an improver.");let h=Rn(d);if(!h.ok)return c(d,h.errorMessage);let y=p!=="run-classic",u=y?{ok:!0,passScore:70}:ZN(r);if(!u.ok)return c(d,u.errorMessage);let S=y?{ok:!0,maxRounds:5}:WN(n);if(!S.ok)return c(d,S.errorMessage);if(y){let A=NI(e.installedIds,a,b.judge);return A===null?c(d,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:h.path,passScore:u.passScore,maxRounds:S.maxRounds,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:o,improverInstructions:s,useWizard:!0,runner:A,runnerInstructions:i}}return{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:h.path,passScore:u.passScore,maxRounds:S.maxRounds,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:o,improverInstructions:s,useWizard:!1}}});var Xo,tm,BK,yP,aM,em,lM,GK,cM,SP,VK,qK,KK,AP,dM,uM,pM=l(()=>{"use strict";Xo=m(require("node:fs")),tm=m(require("node:path"));je();Ye();BK=["remember","choose-folder","run","run-classic"],yP=()=>({folder:En,judge:"",improver:"",runner:""}),aM=e=>tm.default.join(tm.default.dirname(e),"prompt-optimizer-preferences.json"),em=e=>typeof e=="string"?e:"",lM=e=>{let t=aM(e);if(!Xo.default.existsSync(t))return yP();try{let r=JSON.parse(Xo.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return yP();let n=r,o=em(n.folder).trim();return{folder:o.length===0?En:o,judge:em(n.judge),improver:em(n.improver),runner:em(n.runner)}}catch{return yP()}},GK=(e,t)=>{let r=aM(e);Xo.default.mkdirSync(tm.default.dirname(e),{recursive:!0});let n=`${r}.tmp`;Xo.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`),Xo.default.renameSync(n,r)},cM=(e,t)=>e===x||kn(t).some(r=>r===e),SP=(e,t,r)=>e===null?t:e.length===0?"":cM(e,r)?e:t,VK=(e,t)=>{if(e===null)return t;let r=Rn(e);return r.ok?r.display:t},qK=e=>{let t=lM(e.storePath),r={folder:VK(e.folder,t.folder),judge:SP(e.judge,t.judge,e.installedIds),improver:SP(e.improver,t.improver,e.installedIds),runner:SP(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||GK(e.storePath,r)},KK=e=>{let t=Rn(e);return t.ok?t.display:En},AP=(e,t)=>cM(e,t)?e:"",dM=e=>{let t=lM(e.storePath);return{selection:{...e.selection,judge:AP(t.judge,e.installedIds),improver:AP(t.improver,e.installedIds),runner:AP(t.runner,e.installedIds)},defaultFolder:KK(t.folder)}},uM=e=>{let t=e.posted.get("intent")??"";if(!BK.includes(t))return;let r=e.posted.get("folder");qK({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var mM,JK,YK,bP,XK,rm,nm=l(()=>{"use strict";mM=m(require("node:os"));je();oP();Ma();JK="Reply with the single word ok. Do not use tools.",YK=45e3,bP=async(e,t)=>{if(t===x)return{ok:!0,message:"You will do this step."};let r=qO(e,t);if(r!==null)return{ok:!0,message:r};let n=await Ze({writerAgent:t,prompt:JK,workingDirectory:mM.default.tmpdir(),timeoutMs:YK});if(!n.ok)return{ok:!1,message:n.errorMessage};let o=`${Xe(t)} is ready.`;return KO(e,t,o),{ok:!0,message:o}},XK=e=>[...new Set(e.filter(t=>t.length>0))],rm=async(e,t,r,n)=>{for(let o of XK([t,r,n??""])){let s=await bP(e,o);if(!s.ok)return s.message}return null}});var PP,gM=l(()=>{"use strict";PP=(e,t)=>{for(let r of e)if(!(r.wizard===void 0||r.status!=="wizard_paused")&&!(t!==null&&r.id===t))return r;return null}});var fM,hM=l(()=>{"use strict";pt();T();Ua();gP();hP();mP();Je();Ye();pM();uP();nm();gM();Tn();fM=async e=>{let t=e.posted===null?dM({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Qp({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>vr("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(uM({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?kt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let n=r.kind==="start"?await rm(e.route.storePath,r.judge,r.improver,r.useWizard?r.runner:void 0):null;if(r.kind==="start"&&n!==null){await qa(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:kt(r.workingDirectory),passScore:String(r.passScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:n,skillNotice:e.skillNotice,cycle:null,history:Rt(e.route.storePath),resumableWizardCycle:PP(Rt(e.route.storePath),null)});return}if(r.kind==="start"){let s=vN(r.workingDirectory,r.sourceSkillFile),i=Zp({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,...r.useWizard?{wizard:{...cb(r.prompt),runnerInstructions:r.runnerInstructions},runnerModel:r.runner}:{},...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(B(e.route.storePath,i),Ie(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"&&r.useWizard){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(Tr(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let o=e.cycleId===null?null:K(e.route.storePath,e.cycleId);o!==null&&Ie(e.route.storePath,o.id),await qa(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:o,history:Rt(e.route.storePath),resumableWizardCycle:PP(Rt(e.route.storePath),o?.id??null)})}});var yM,SM=l(()=>{"use strict";Je();yM=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";wI(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var AM,bM=l(()=>{"use strict";TI();nN();YN();hM();SM();Ka();Tn();AM=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await qp(),n=Yo(r),o=e.method==="POST"?new URLSearchParams(await e.readBody(e.request)):null;if(rN({posted:o,storePath:e.storePath,response:e.response})||await JN(e,o,n))return;let s=iM(t.searchParams.get("example")),i=yM({posted:o,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=CI({posted:o,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await fM({route:e,posted:o,installedIds:r,selection:n,goal:o?.get("goal")??s.goal,prompt:o?.get("prompt")??s.prompt,skillNotice:kI(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var ZK,PM,_M=l(()=>{"use strict";T();Je();ZK=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",PM=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let n=K(e.storePath,r);if(n===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(n.wizard===void 0||!k(n.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let o=_b({goal:n.goal,cycleStatus:n.status,wizard:n.wizard}),s=`prompt-optimizer-wizard-${ZK(n.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(o),!0}});var wM,vM=l(()=>{"use strict";Ua();Je();wM=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),n=r===null?null:K(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(n===null?"":Tr(e.storePath,n)),!0}});var QK,WM,LM=l(()=>{"use strict";je();nm();QK=["claude-cli","codex","cursor","antigravity"],WM=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let n=t===x||QK.includes(t)?await bP(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(n)),!0}});var EM,RM=l(()=>{"use strict";T();EM=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:ba,page:Pa,context:Mo,installedWriters:e,post:{method:"POST",url:ba,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${ba}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var _P,kM=l(()=>{"use strict";T();yp();_P=e=>{let t=e.revisions[e.revisions.length-1]??null,r=he(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:o.judgement?.reasons??null}))),n=k(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:n,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:Fo(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:Mo,page:`${Pa}?cycle=${encodeURIComponent(e.id)}`}}});var Re,e8,CM,TM,xM=l(()=>{"use strict";Re=m(Ws());T();e8=(0,Re.isType)({goal:Re.isString,prompt:Re.isString,workingDirectory:Re.isString,judge:(0,Re.isUndefinedOr)(Re.isString),improver:(0,Re.isUndefinedOr)(Re.isString),passScore:(0,Re.isUndefinedOr)(Re.isNumber),maxRounds:(0,Re.isUndefinedOr)(Re.isNumber)}),CM=e=>{let t=e?.trim()??"";return t.length===0?null:t},TM=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return e8(t)?t.workingDirectory.trim().length===0?{ok:!1,error:lp}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:CM(t.judge),improver:CM(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:lp}}});var t8,IM,OM=l(()=>{"use strict";T();je();hP();Ka();t8=e=>e.map(t=>t.id).join(", "),IM=e=>{let t=Yo(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,n=e.body.judge??r,o=e.body.improver??r;if(n===x||o===x)return{ok:!1,error:lb,installedWriters:t.writers};if(n===null||o===null){let a=t8(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run-classic",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,passScore:e.body.passScore??String(90),maxRounds:e.body.maxRounds??String(10),judge:n,improver:o}),i=Qp({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var NM,MM=l(()=>{"use strict";gP();RM();kM();Ka();xM();OM();Je();NM=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=K(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:_P(c)}}let r=await e.handlers.readInstalledIds(),n=Yo(r);if(e.method==="GET")return{status:200,body:EM(n.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let o=TM(e.rawBody);if(!o.ok)return{status:400,body:{ok:!1,error:o.error,installedWriters:n.writers}};let s=IM({body:o.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:n.writers}};let a=Zp({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds});return B(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:_P(a)}}});var jM,DM=l(()=>{"use strict";Tn();nm();MM();jM=async e=>{let t=await NM({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:qp,readWritersReady:rm,startCycle:Ie}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var r8,wP,HM=l(()=>{"use strict";yI();bM();_M();vM();LM();DM();r8=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},wP=async e=>{let t=r8(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await jM(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:hI()})),!0):(await WM({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||PM({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||wM({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await AM(e),!0)}});var $M=l(()=>{"use strict";HM()});var In,Ja,n8,o8,s8,i8,FM,zM=l(()=>{"use strict";In=m(require("node:fs")),Ja=m(require("node:path")),n8="prompt-optimizer-cycles.json",o8="prompt-optimizer-preferences.json",s8="prompt-sdlc-cycles.json",i8="prompt-sdlc-preferences.json",FM=e=>{let t=Ja.default.join(e,n8),r=Ja.default.join(e,s8);if(In.default.existsSync(t)||!In.default.existsSync(r))return t;try{In.default.renameSync(r,t)}catch{return r}let n=Ja.default.join(e,i8),o=Ja.default.join(e,o8);if(In.default.existsSync(n)&&!In.default.existsSync(o))try{In.default.renameSync(n,o)}catch{}return t}});var Zo,a8,vP,UM=l(()=>{"use strict";Zo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a8=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],vP=e=>{let t=a8.map(i=>`<option value="${Zo(i.value)}">${Zo(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Zo(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Zo(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Zo(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Zo(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Ya,VM,l8,qM,c8,d8,KM,sm,BM,GM,u8,p8,Zt,Xa,om,m8,im,WP,g8,LP,JM,EP,YM,f8,h8,y8,XM,ZM,QM,Za=l(()=>{"use strict";Ya=m(require("node:fs")),VM=m(require("node:path")),l8="estimate-history.ndjson",qM=100,c8=500,d8=2e4,KM=e=>VM.default.join(e,l8),sm=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,c8),BM=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,d8),GM=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,u8=e=>({...e,estimateTokens:GM(e.estimateTokens),actualTokens:GM(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),p8=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Zt=e=>{let t=KM(e);return Ya.default.existsSync(t)?Ya.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let n=r.trim();if(n.length===0)return[];try{let o=JSON.parse(n);return p8(o)?[u8(o)]:[]}catch{return[]}}):[]},Xa=(e,t)=>{Ya.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(n=>JSON.stringify(n)).join(`
`)}
`;Ya.default.writeFileSync(KM(e),r,"utf8")},om=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),m8=e=>{let t=e.filter(n=>n.actualSeconds!==null&&n.estimateSeconds!==null&&n.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(n=>`| ${om(n.task)} | ${om(n.writerLabel)} | ${n.estimateSeconds} | ${n.actualSeconds} |`)].join(`
`)},im=e=>{let t=Zt(e.reportsDir),r=sm(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:n?.actualSeconds??null,estimateTokens:n?.estimateTokens??null,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Xa(e.reportsDir,[...s,o])},WP=e=>{let t=Zt(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),n=new Date().toISOString(),o=e.task!==void 0?sm(e.task):"",s={id:e.agentRunId,task:o.length>0?o:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:n,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Xa(e.reportsDir,[...i,s])},g8=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-qM),LP=e=>[...Zt(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),JM=e=>{let t=Zt(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),n=BM(e.input),o=BM(e.output),s=sm(n),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:n.length>0?n:r?.input??"",output:o.length>0?o:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Xa(e.reportsDir,[...c,a])},EP=(e,t)=>{let r=Zt(e).find(n=>n.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},YM=e=>({table:m8(g8(Zt(e))),embedding:null}),f8=e=>{let t=new Map;for(let n of e){if(n.actualTokens===null)continue;let o=n.writerLabel.trim()||"Writer",s=t.get(o)??[];s.push(n.actualTokens),t.set(o,s)}let r=new Set;for(let[n,o]of t){let s=[...o].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${n}:${i}`)}return e.filter(n=>{let o=n.writerLabel.trim()||"Writer";return!r.has(`${o}:${n.actualTokens}`)})},h8=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-qM),y8=e=>{let t=f8(h8(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let n=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",n.join(". ")+(n.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${om(s.task)} | ${om(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},XM=e=>{let t=Zt(e.reportsDir),r=sm(e.task),n=t.find(i=>i.id===e.agentRunId),o={id:e.agentRunId,task:r.length>0?r:n?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:n?.writerLabel??"",estimateSeconds:n?.estimateSeconds??null,actualSeconds:n?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:n?.actualTokens??null,input:n?.input??"",output:n?.output??"",startedAt:n?.startedAt??new Date().toISOString(),completedAt:n?.completedAt??null,embedding:n?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Xa(e.reportsDir,[...s,o])},ZM=e=>{let t=Zt(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),n=new Date().toISOString(),o={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??n,completedAt:r?.completedAt??n,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Xa(e.reportsDir,[...s,o])},QM=e=>y8(Zt(e))});var ej=l(()=>{"use strict";Za()});var Qt,RP,S8,kP,A8,b8,am,lm,P8,CP,tj=l(()=>{"use strict";ej();Qt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RP=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let n=Math.floor(t/60),o=t%60;return o===0?`${n} hr`:`${n} hr ${o} min`},S8=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${RP(-r)} under`:`${RP(r)} over`},kP=e=>e.toLocaleString("en-US"),A8=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${kP(-r)} under`:`${kP(r)} over`},b8=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},am=e=>e===null?"\u2014":RP(e),lm=e=>e===null?"\u2014":kP(e),P8=`(function () {
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
})();`,CP=e=>{let r=LP(e.reportsDir).map((o,s)=>{let i=o.input.trim().length>0?o.input:o.task,a=o.output.trim().length>0?o.output:"\u2014",c=o.writerLabel.trim().length>0?o.writerLabel:"Writer",d=o.estimateSeconds===null||o.actualSeconds===null?"no estimate":S8(o.estimateSeconds,o.actualSeconds),p=o.estimateTokens===null||o.actualTokens===null?"no estimate":A8(o.estimateTokens,o.actualTokens),f=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${f}">
        <td><button type="button" class="history-open">${Qt(b8(i))}</button></td>
        <td>${Qt(c)}</td>
        <td>${am(o.estimateSeconds)}</td>
        <td>${am(o.actualSeconds)}</td>
        <td>${Qt(d)}</td>
        <td>${lm(o.estimateTokens)}</td>
        <td>${lm(o.actualTokens)}</td>
        <td>${Qt(p)}</td>
      </tr>`,template:`<template id="${f}">
        <p class="eyebrow">${Qt(c)}</p>
        <h2>Input</h2>
        <pre>${Qt(i)}</pre>
        <h2>Output</h2>
        <pre>${Qt(a)}</pre>
        <p>Time: estimated ${am(o.estimateSeconds)} \xB7 actual ${am(o.actualSeconds)} \xB7 ${Qt(d)}</p>
        <p>Tokens: estimated ${lm(o.estimateTokens)} \xB7 actual ${lm(o.actualTokens)} \xB7 ${Qt(p)}</p>
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
        <script>${P8}</script>`}
    </section>`}});var rj=l(()=>{"use strict";UM();tj()});var Qo,_8,w8,TP,nj=l(()=>{"use strict";Qo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_8=(e,t,r)=>{let n=Qo(t),o=Qo(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${n}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${o}</pre>
</article>`},w8=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Qo(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((n,o)=>_8(o,n.userPrompt,n.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Qo(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Qo(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Qo(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},TP=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(w8).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var oj=l(()=>{"use strict";nj()});var Qa,sj,ij,xP,IP,OP,aj=l(()=>{"use strict";Qa=m(require("node:fs")),sj=m(require("node:path"));aa();Ku();ij=(e,t,r)=>xo({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,xP=(e,t,r)=>{let n=ij(e,t,r);if(n===null)return[];if(!Qa.default.existsSync(n))return[];let o=Qa.default.readFileSync(n,"utf8").split(`
`).filter(Boolean),s=[];for(let i of o)try{s.push(JSON.parse(i))}catch{}return s},IP=e=>{let t=ij(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Yt(e.entry.prompt),output:Yt(e.entry.output)};Qa.default.mkdirSync(sj.default.dirname(t),{recursive:!0}),Qa.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},OP=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var v8,W8,el,cm,NP=l(()=>{"use strict";v8=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),W8=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,el=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let n=[],o=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=v8(i.assistantOutput),d=c.length>0?`Assistant: ${W8(c,t)}`:null,p=[a,d].filter(f=>f!==null).join(`

`);if(p.length!==0){if(o+p.length>r&&n.length>0)break;n.unshift(p),o+=p.length}}return n.join(`

`)},cm=e=>{let t=e.userMessage.trim(),r=el({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Ot,tl,DP,L8,E8,MP,R8,HP,dm,lj,cj,k8,es,$P,jP,dj,C8,uj,ts,um,rl,T8,nl,FP,pm,mm,pj=l(()=>{"use strict";Ot=m(require("node:fs")),tl=m(require("node:path")),DP=require("node:crypto");NP();L8="writer-sessions",E8="active-index.json",MP=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),R8=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",HP=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},dm=e=>{let t=tl.default.join(e.installDir,L8);return Ot.default.mkdirSync(t,{recursive:!0}),t},lj=e=>tl.default.join(dm(e),E8),cj=(e,t)=>tl.default.join(dm(e),`${t}.canonical.json`),k8=(e,t)=>tl.default.join(dm(e),`${t}.continuation.json`),es=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,$P=e=>{let t=lj(e);if(!Ot.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Ot.default.readFileSync(t,"utf8"));if(!MP(r)||!Array.isArray(r.entries))return{entries:[]};let n=[];for(let o of r.entries){if(!MP(o)||typeof o.sessionId!="string")continue;let s=typeof o.writerAgent=="string"?o.writerAgent:"";if(!R8(s))continue;let i=typeof o.projectFolderPath=="string"?o.projectFolderPath:(o.projectFolderPath===null,null);n.push({writerAgent:s,projectFolderPath:i,sessionId:o.sessionId})}return{entries:n}}catch{return{entries:[]}}},jP=(e,t)=>{Ot.default.writeFileSync(lj(e),JSON.stringify(t,null,2))},dj=(e,t)=>{Ot.default.writeFileSync(cj(e,t.sessionId),JSON.stringify(t,null,2))},C8=(e,t)=>{Ot.default.writeFileSync(k8(e,t.sessionId),JSON.stringify(t,null,2))},uj=(e,t)=>{let r=el({turns:t.turns});C8(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},ts=(e,t)=>{let r=cj(e,t);if(!Ot.default.existsSync(r))return null;try{let n=JSON.parse(Ot.default.readFileSync(r,"utf8"));return!MP(n)||typeof n.sessionId!="string"?null:n}catch{return null}},um=(e,t=20)=>{let r=dm(e),n=Ot.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),o=[];for(let s of n){let i=s.name.replace(/\.canonical\.json$/,""),a=ts(e,i);a!==null&&o.push(a)}return o.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},rl=(e,t,r)=>{let n=HP(r);return $P(e).entries.find(i=>es(i)===es({writerAgent:t,projectFolderPath:n}))?.sessionId??null},T8=(e,t,r,n)=>{let o=$P(e),s=es({writerAgent:t,projectFolderPath:r}),i=[...o.entries.filter(a=>es(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:n}];jP(e,{entries:i})},nl=(e,t,r)=>{let n=(0,DP.randomUUID)(),o=new Date().toISOString(),s=HP(r),i={sessionId:n,writerAgent:t,projectFolderPath:s,turns:[],createdAt:o,updatedAt:o};return dj(e,i),uj(e,i),T8(e,t,s,n),n},FP=(e,t,r)=>{let n=rl(e,t,r);return n!==null?n:nl(e,t,r)},pm=(e,t,r)=>{let n=HP(r),o=$P(e);if(n===null&&r===void 0){jP(e,{entries:o.entries.filter(i=>i.writerAgent!==t)});return}let s=es({writerAgent:t,projectFolderPath:n});jP(e,{entries:o.entries.filter(i=>es(i)!==s)})},mm=e=>{let t=FP(e.layout,e.writerAgent,e.projectFolderPath),r=ts(e.layout,t);if(r===null)return;let n={id:(0,DP.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},o={...r,turns:[...r.turns,n],updatedAt:n.createdAt};dj(e.layout,o),uj(e.layout,o)}});var x8,I8,gm,zP,mj=l(()=>{"use strict";x8=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",I8=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},gm=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",zP=e=>{let t=gm(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",n=x8(r,e.userPromptCharacterCount),o=I8({contextBudget:n,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:n,...o}}});var fm=l(()=>{"use strict";aj();pj();NP();mj()});var gj=l(()=>{"use strict";uh()});var De,N8,M8,UP,BP,GP,fj=l(()=>{"use strict";ae();gj();De=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),N8=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},M8=(e,t,r)=>{let n=e[t]?.apiKey;if(n!==void 0&&n.length>0){let o=kd(n);return`value="${De(o)}" placeholder="Paste a new key to replace"`}return`placeholder="${De(r)}"`},UP=(e,t,r,n,o)=>{let s=Hh[t];return`<label class="field">
          <span class="field-label">${De(n)} API key \u2014 ${De(N8(e,t))} \xB7 <a class="field-link" href="${De(s.href)}" target="_blank" rel="noopener noreferrer">${De(s.label)}</a></span>
          <input class="input mono" type="password" name="${De(r)}" autocomplete="off" ${M8(e,t,o)} />
        </label>`},BP=(e,t,r,n)=>{let o=ph(e[t]?.model),s=new Set(Pd[t].map(c=>c.value)),i=Pd[t].map(c=>{let d=c.value===o?" selected":"";return`<option value="${De(c.value)}"${d}>${De(c.label)}</option>`}).join(""),a=o!==nn&&!s.has(o)?`<option value="${De(o)}" selected>${De(o)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${De(n)}</span>
          <select class="input mono" name="${De(r)}">${i}${a}</select>
        </label>`},GP=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${De(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",n=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${UP(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${BP(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${UP(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${BP(e.secrets,"openai","openaiModel","OpenAI model")}
        ${UP(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${BP(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var hj=l(()=>{"use strict";fj()});var hm,yj,Sj=l(()=>{"use strict";hm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yj=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${hm(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
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
    </section>`}});var j8,Aj,bj,Pj=l(()=>{"use strict";j8=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,Aj=e=>e.kind==="folder",bj=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let d=s.children.get(a);if(d!==void 0&&Aj(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=n=>{let o=[];for(let s of n.children.values()){if(Aj(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(j8)};return r(t)}});var _j,VP,wj=l(()=>{"use strict";_j=m(require("node:path")),VP=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${VP(r.children,t)}</ul>
            </details>
          </li>`;let n=_j.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var vj,xr,D8,H8,ol,$8,qP,Wj=l(()=>{"use strict";Qu();vj=m(require("node:path"));Sj();Pj();wj();xr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),D8=()=>`(() => {
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

})();`,H8=()=>`(() => {
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
})();`,ol=e=>{let t=pa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=yj({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),n=e.flashError?`<div class="alert-error">${xr(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${xr(e.flashMessage)}</div>`:"",o=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':$8(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${xr(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${xr(s)}" />
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
    <script>${D8()}</script>
    <script>${H8()}</script>`;return`${t}${r}${n}${c}${d}`},$8=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let d=bj(a.items.map(b=>({...b,relativePath:typeof b.relativePath=="string"&&b.relativePath.length>0?b.relativePath:vj.default.relative(a.sourceRoot,b.sourcePath).replaceAll("\\","/")}))),p=VP(d,xr),f=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${xr(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${xr(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${f} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${xr(n)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},qP=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&o.set(d,p)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?o.get(d):void 0,f=e.get(`setName-${i}`)?.trim()??p??a,b=t.sets[i];if(b===void 0)continue;let h=a.length>0?a:b.proposedSlug,y=f.length>0?f:b.proposedName,u=r.has(i),S=b.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:u}));s.push({slug:h,name:y,items:S})}return s}});var Lj=l(()=>{"use strict";Wj()});var F8,KP,Ej=l(()=>{"use strict";wr();F8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null||n.ok!==!0)return null;let o=n;return{counts:{harness:Number(o.counts?.harness??0),workflow:Number(o.counts?.workflow??0),agent:Number(o.counts?.agent??0)},items:Array.isArray(o.items)?o.items:[]}}catch{return null}},KP=F8});var z8,Rj,kj=l(()=>{"use strict";wr();z8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let n=await r.json();return typeof n!="object"||n===null||n.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof n.promotedCount=="number"?n.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},Rj=z8});var Cj=l(()=>{"use strict"});var sl,U8,JP,Tj=l(()=>{"use strict";Qu();sl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),U8=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,JP=e=>{let t=e.flashError?`<div class="alert-error">${sl(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${sl(e.flashMessage)}</div>`:"",r=pa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),n=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(o=>{let s=e.compositionCountsByProjectId?.[o.id],i=s!==void 0?`<span class="muted">${sl(U8(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(o.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(o.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(o.id)}">
                  <strong>${sl(o.name)}</strong>
                  <span class="muted mono">${sl(o.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${n}
    </section>`}});var xj=l(()=>{"use strict";Cj();Vy();Tj()});var ym,Ij=l(()=>{"use strict";ym=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var Oj,er,YP=l(()=>{"use strict";Oj=m(require("node:path"));Bt();bt();U();ae();Ve();er=e=>{let t=H()?.layout.installDir??L();if(Oj.default.basename(t)===zr)return zt;let r=H(),n=r!==null?we(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):zt}});var XP,Nj=l(()=>{"use strict";Ve();YP();XP=async e=>{let t=_e(e.installDir),r=t?.bundleVersion??null,n=er(t);try{let o=await so(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Xr(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var ZP,Mj=l(()=>{"use strict";ZP=e=>!e});var QP,rs,e_=l(()=>{"use strict";U();QP=()=>`http://127.0.0.1:${uf()}/update/run`,rs=async e=>{try{let t=await fetch(QP(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var B8,jj,t_,Dj=l(()=>{"use strict";U();ee();e_();B8=()=>{$t({launchAgentLabel:te(),installDir:L()})},jj=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},t_=async()=>{B8();let e=await rs({force:!0});if(e.ok)return{ok:!0,message:jj(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:jj(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ve(),sE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var r_=l(()=>{"use strict";MA();Ij();YP();Nj();Mj();Dj();e_()});var Hj,$j=l(()=>{"use strict";Hj=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var Fj,zj,n_,o_,Uj=l(()=>{"use strict";Fj=require("node:crypto"),zj=m(require("node:fs"));pt();ae();ae();$j();n_=!1,o_=async e=>{if(n_)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!Hj(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&zj.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,Fj.randomUUID)();n_=!0;try{if(await jy(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await mo({...r,workspace:o},e.writerAgent,t);return await Ii(n,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{n_=!1}}});var Bj=l(()=>{"use strict";Uj()});var Qe,G8,Gj,Vj,s_,i_,a_,l_,c_,d_,u_=l(()=>{"use strict";Qe=require("node:crypto"),G8=Buffer.from("302a300506032b6570032100","hex"),Gj=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},Vj=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Qe.createPublicKey)({key:Buffer.concat([G8,t]),format:"der",type:"spki"})},s_=()=>{let{publicKey:e,privateKey:t}=(0,Qe.generateKeyPairSync)("ed25519");return{publicKeyRaw:Gj(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},i_=e=>(0,Qe.createPrivateKey)(e),a_=(e,t)=>(0,Qe.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),l_=(e,t,r)=>{try{let n=Vj(e);return(0,Qe.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},c_=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,d_=()=>(0,Qe.randomBytes)(32).toString("base64url")});var tr,Sm,qj,V8,q8,Am,p_,m_,Kj=l(()=>{"use strict";tr=m(require("node:fs")),Sm=m(require("node:path"));u_();U();bt();qj=e=>Sm.default.join(e.installDir,ur),V8=(e,t)=>{if(e.profileEmail===null||t===qj(e)||tr.default.existsSync(t))return;let r=qj(e);tr.default.existsSync(r)&&(tr.default.mkdirSync(Sm.default.dirname(t),{recursive:!0}),tr.default.renameSync(r,t))},q8=e=>{if(!tr.default.existsSync(e))return null;try{let t=tr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Am=e=>{let t=Jc(e);V8(e,t);let r=q8(t);if(r!==null)return r;let n=s_();return tr.default.mkdirSync(Sm.default.dirname(t),{recursive:!0}),tr.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},p_=e=>{let t=Am(e.layout),r=d_(),n=c_({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=i_(t.privateKeyPem),s=a_(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},m_=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return l_(e.serverPublicKey,t,e.serverAttestation)}});var g_=l(()=>{"use strict";Kj();u_()});var Zj,il,y_,S_,Jj,K8,f_,bm,ne,Qj,J8,h_,Y8,X8,A_,le,Ae,rr,Z8,Yj,Xj,al,ll,eD=l(()=>{"use strict";Zj=m(require("node:http")),il=m(require("node:fs")),y_=m(require("node:path"));Pm();oa();sx();ax();mx();wo();cA();IA();Bx();Vx();$M();zM();rj();oj();fm();hj();Lj();dn();pt();wr();Ej();kj();xj();r_();Ve();Bj();ae();g_();S_=e=>XS(e)??"never",Jj=48e3,K8=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,f_=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??nu(),reveal:t.reveal,installed:_r(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),bm=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:Ao(t,e)},ne=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qj=200,J8=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',h_=e=>{let t=e.trim().slice(0,Qj),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},Y8=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ne(t)}</div>`,X8=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ne(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',A_={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},le=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...A_}),e.end(JSON.stringify(r))},Ae=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},rr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},Z8=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=J8(e.healthBadge),n=e.status.wakeError?`<div class="alert-error">${ne(e.status.wakeError)}</div>`:"",o=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=ZP(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${sa(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ne(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ne(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ne(S_(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ne(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${s}
    </section>`},Yj=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},Xj=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,Qj)},al=e=>{let t=y_.default.join(e.layout.installDir,"link-code.txt"),r=()=>_e(e.layout.installDir),n=()=>{let h=r();return{installBundleVersion:ym(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},o=async h=>{let y=h.installVersion??r(),u=await i(),S=$A(u),A=h.updateFlash??null,g=FA(A),_=Y8(A,h.updateError??null);return DA({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:er(y),installBundleVersionLabel:ym(y),prependBody:`${g}${_}${S}`,headerUpdateButtonHtml:HA(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await XP(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:h_("An update is already running.")}),h.end();return}c=!0;try{let u=await t_(),S=u.ok?"/?update=ok":h_(u.message);h.writeHead(303,{Location:S}),h.end()}catch(u){let S=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:h_(S)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",S=n(),A=await o({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:S.installVersion,body:`<section class="card">
      <h1>${ne(y)}</h1>
      <p>${ne(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(A)},f=()=>{if(il.default.existsSync(t))return il.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return il.default.writeFileSync(t,h,"utf8"),h},b=Zj.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",S=h.method??"GET";if(S==="OPTIONS"){y.writeHead(204,A_),y.end();return}if(!await wP({method:S,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:FM(y_.default.dirname(e.layout.configPath)),readBody:rr,sendHtml:Ae,renderShell:o})){if(S==="GET"&&u==="/health"){let A=e.controllers.getStatus(),g=n();le(y,200,{ok:!0,...A,installBundleVersion:g.installBundleVersion,installBundleUpdatedAt:g.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/status"){let A=n();le(y,200,{...e.controllers.getStatus(),linkCode:f(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/traffic"){le(y,200,{entries:ra(e.layout)});return}if(S==="DELETE"&&u==="/api/traffic"||S==="POST"&&u==="/api/traffic/clear"){if(eA(e.layout),S==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}le(y,200,{ok:!0});return}if(S==="GET"&&u==="/api/trace"){le(y,200,{entries:Bu(e.layout)});return}if(S==="DELETE"&&u==="/api/trace"||S==="POST"&&u==="/api/trace/clear"){if(nA(e.layout),S==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}le(y,200,{ok:!0});return}if(S==="POST"&&u==="/api/errors/clear"){oA(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(S==="GET"&&u==="/api/knowledge"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(g.length>0){let _=await Oo({layout:e.layout,query:g,limit:20});le(y,200,{chunks:_,query:g});return}le(y,200,{chunks:Io(e.layout).slice(-50).reverse()});return}if(S==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(S==="GET"&&u==="/api/update-status"){let A=await i();le(y,200,{ok:!0,...A});return}if((S==="GET"||S==="POST")&&u==="/api/update"){await d(y);return}if(S==="GET"&&u==="/"){let A=e.controllers.getStatus(),g=n(),_=_r(e.layout),w=Gu(e.layout.errorLogPath);Ae(y,await o({title:"Home",activePath:"/",installVersion:g.installVersion,updateFlash:Yj(h.url??void 0),updateError:Xj(h.url??void 0),body:zA({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:g.installBundleVersion,harnessSetCount:_.sets.length,knowledgeChunkCount:Io(e.layout).length,trafficEntryCount:ra(e.layout).length,wakeError:A.wakeError,errorLogByteSize:w.byteSize,errorLogExists:w.exists})}));return}if(S==="GET"&&u==="/task"){let A=e.controllers.getStatus(),g=n(),_=H(),w=new URL(h.url??"/",`http://127.0.0.1:${43347}`),W=w.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,E=w.searchParams.get("failed")==="1"?w.searchParams.get("error")?.trim()??"Task failed.":null,R=w.searchParams.get("runId");Ae(y,await o({title:"Task",activePath:"/task",installVersion:g.installVersion,body:vP({defaultWorkspace:_?.workspace??"",wsConnected:A.wsConnected,flashMessage:W,flashError:E,lastRunId:R})}));return}if(S==="POST"&&u==="/task/dispatch"){let A=await rr(h),g=new URLSearchParams(A),_=g.get("prompt")?.trim()??"",w=g.get("writerAgent")?.trim()??"claude-cli",W=g.get("projectFolder")?.trim()??"",E=await o_({prompt:_,writerAgent:w,...W.length>0?{projectFolderPath:W}:{}}),R=new URLSearchParams;E.ok?R.set("ok","1"):(R.set("failed","1"),E.errorMessage!==void 0&&R.set("error",E.errorMessage.slice(0,240))),E.agentRunId!==void 0&&R.set("runId",E.agentRunId),y.writeHead(303,{Location:`/task?${R.toString()}`}),y.end();return}if(S==="GET"&&u==="/writer-sessions"){let A=n(),g=um(e.layout,12);Ae(y,await o({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:Yj(h.url??void 0),updateError:Xj(h.url??void 0),body:TP({sessions:g})}));return}if(S==="GET"&&u==="/errors"){let A=n(),g=Gu(e.layout.errorLogPath);Ae(y,await o({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:iA({errorLogPath:e.layout.errorLogPath,content:g.content,exists:g.exists,truncated:g.truncated,byteSize:g.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(S==="GET"&&u==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=e.controllers.getStatus(),_=ge(e.layout),w=_!==null?Te(_,12e4):dA(g.lastHeartbeatAt,12e4),W=uA({lastHeartbeatAt:g.lastHeartbeatAt,heartbeatIsStale:w}),E=n();Ae(y,await o({title:"Status",activePath:"/status",installVersion:E.installVersion,body:`${Z8({status:g,healthBadge:W,revived:A.searchParams.get("revived")==="1",linkCode:f(),installBundleVersion:E.installBundleVersion,installBundleUpdatedAt:E.installBundleUpdatedAt})}${gA({installDir:e.layout.installDir})}${mA({entries:Bu(e.layout)})}`}));return}if(S==="GET"&&u==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=ra(e.layout),_=n(),w=g.map(R=>`<tr><td title="${ne(R.at)}">${ne(S_(R.at))}</td><td>${ne(R.direction)}</td><td><code>${ne(R.type)}</code></td><td>${ne(R.summary)}</td><td>${ne(R.action??"")}</td></tr>`).join(""),W=g.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${w}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',E=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ae(y,await o({title:"Traffic",activePath:"/traffic",installVersion:_.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${E}
              ${W}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(S==="GET"&&u==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=n(),_=er(g.installVersion),w=await bm(e.layout),W=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,E=H(),R=E===null?null:X({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),C=R===null?{}:Object.fromEntries((await Promise.all(w.projects.map(async I=>{let D=await KP(R,I.id);return[I.id,D?.counts??null]}))).filter(I=>I[1]!==null));Ae(y,await o({title:"Projects",activePath:"/projects",installVersion:g.installVersion,body:JP({projects:w.projects,compositionCountsByProjectId:C,cloudAppOrigin:_,syncMessage:w.message,syncOk:w.ok,flashMessage:null,flashError:W})}));return}if(S==="GET"&&u==="/projects/select-folder"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",_=H(),w=_===null?null:X({wsUrl:_.wsUrl,pairingToken:_.pairingToken}),W=g.length>0&&w!==null?vr():null;if(W===null||w===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Ue({projectFolderPath:W}),!await ji(w,g,W)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(g)}&folderUpdated=1`}),y.end();return}if(S==="GET"&&u==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=A.searchParams.get("id")?.trim()??"",_=n(),w=await bm(e.layout),W=gn(w.projects,g);if(W===null){await p(y,"Project not found");return}let E=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,R=A.searchParams.get("knowledgePromoted"),C=R!==null?`Marked ${R} lesson(s) as promoted in Agent Witch.`:null,I=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,D=A.searchParams.get("tab")?.trim()??"harness",oe=D==="workflows"||D==="agents"||D==="knowledge"?D:"harness",q=H(),G=q===null?null:X({wsUrl:q.wsUrl,pairingToken:q.pairingToken}),$e=G===null?null:await KP(G,W.id),$=0;if(G!==null)try{let Oe=await fetch(`${G.appOrigin}/api/agent-witch/projects/${encodeURIComponent(W.id)}/knowledge`,{method:"GET",headers:{[Me]:G.pairingToken},signal:AbortSignal.timeout(1e4)});if(Oe.ok){let jr=await Oe.json();typeof jr=="object"&&jr!==null&&typeof jr.candidateCount=="number"&&($=jr.candidateCount)}}catch{$=0}Ae(y,await o({title:W.name,activePath:"/projects",installVersion:_.installVersion,body:bo({project:W,installed:_r(e.layout),linkedSetSlugs:br(W.projectFolderPath),composition:$e,knowledgeCandidateCount:$,activeTab:oe,flashMessage:E??C,flashError:I})}));return}if(S==="POST"&&u==="/projects/pull-bound-harness"){let A=await rr(h),g=await qy({rawBody:A,layout:e.layout});if(g.kind==="not_found"){await p(y,"Project not found");return}if(g.kind==="redirect"){y.writeHead(303,{Location:g.location}),y.end();return}let _=n();Ae(y,await o({title:g.title,activePath:"/projects",installVersion:_.installVersion,body:g.body}));return}if(S==="POST"&&u==="/projects/link-harness"){let A=await rr(h),g=new URLSearchParams(A),_=g.get("projectId")?.trim()??"",w=await bm(e.layout),W=gn(w.projects,_);if(W===null){await p(y,"Project not found");return}let E=g.getAll("applySet").map(q=>String(q)),R=vi({layout:e.layout,projectFolderPath:W.projectFolderPath,setSlugs:E});if(!R.ok){let q=n();Ae(y,await o({title:W.name,activePath:"/projects",installVersion:q.installVersion,body:bo({project:W,installed:_r(e.layout),linkedSetSlugs:br(W.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:R.errorMessage})}));return}let C=H(),I=C===null?null:X({wsUrl:C.wsUrl,pairingToken:C.pairingToken}),D=I===null?!1:await Ni(I,W.id,R.appliedSetSlugs),oe=new URLSearchParams({linked:"1",files:String(R.writtenFileCount),bindingsSynced:D?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${oe.toString()}`}),y.end();return}if(S==="POST"&&u==="/project/knowledge/promote-all"){let A=await rr(h),_=new URLSearchParams(A).get("projectId")?.trim()??"",w=await bm(e.layout),W=gn(w.projects,_);if(W===null){await p(y,"Project not found");return}let E=H(),R=E===null?null:X({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),C=R===null?{ok:!1,promotedCount:0}:await Rj(R,W.id),I=new URLSearchParams({tab:"knowledge",...C.ok?{knowledgePromoted:String(C.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${I.toString()}`}),y.end();return}if(S==="GET"&&u==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),g=n(),_=Ri(e.layout),w=A.searchParams.get("submitted")==="1",W=w?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${_?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${_?.sets.length??0} set(s).`:null,E=_?.scanRoots[0]??nu(),R=K8(e.layout,{reveal:_,importQuery:A.searchParams.get("import")==="1",justSubmitted:w}),C=er(g.installVersion);Ae(y,await o({title:"Harness",activePath:"/harness",installVersion:g.installVersion,body:ol(f_(e.layout,{cloudAppOrigin:C,reveal:_,scanFolder:E,flashMessage:W,importSectionExpanded:R}))}));return}if(S==="POST"&&u==="/api/harness/pick-folder"){let A=vr();if(A===null){le(y,200,{cancelled:!0});return}le(y,200,{path:A});return}if(S==="GET"&&u==="/api/harness/file-content"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",_=wi(g);if(_===null){le(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let w=il.default.readFileSync(_,"utf8"),W=w.length>Jj?`${w.slice(0,Jj)}
\u2026 (truncated)`:w;le(y,200,{content:W})}catch{le(y,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&u==="/api/harness/reveal/add-project"){let A=await rr(h),g="";try{let W=JSON.parse(A);typeof W=="object"&&W!==null&&typeof W.projectPath=="string"&&(g=W.projectPath.trim())}catch{le(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(g.length===0){le(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let _=Ri(e.layout),w=Ey({reveal:_,projectPath:g});if(w===null||w.sets.length===0){le(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}au(e.layout,w),le(y,200,{ok:!0,setCount:w.sets.length});return}if(S==="GET"&&u==="/api/harness/reveal/stream"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(g.length===0){le(y,400,{errorMessage:"Choose a folder to scan first."});return}let _=!1;h.on("close",()=>{_=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...A_});let w=Ry({scanRoot:g,response:y,shouldAbort:()=>_});au(e.layout,w),y.end();return}if(S==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&u==="/harness/submit"){let A=Ri(e.layout);if(A===null){let C=n(),I=er(C.installVersion);Ae(y,await o({title:"Harness",activePath:"/harness",installVersion:C.installVersion,body:ol(f_(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let g=await rr(h),_=new URLSearchParams(g),w=qP(_,A),W=Cy({layout:e.layout,sets:w});if(!W.ok){let C=n(),I=er(C.installVersion);Ae(y,await o({title:"Harness",activePath:"/harness",installVersion:C.installVersion,body:ol(f_(e.layout,{cloudAppOrigin:I,reveal:A,flashError:W.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}xy(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${W.writtenItemCount??0}${R}`}),y.end();return}if(S==="GET"&&u==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=H()?.writerExecutionBackend??ve(void 0),w=me(e.layout.configPath),W=hr(w),E=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=n();Ae(y,await o({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:GP({writerExecutionBackend:_,secrets:W,flashMessage:E})}));return}if(S==="POST"&&u==="/writer-api"){let A=await rr(h),g=new URLSearchParams(A),_=g.get("writerExecutionBackend")?.trim()??"cli";Dh({configPath:e.layout.configPath,writerExecutionBackend:ve(_),anthropicApiKey:g.get("anthropicApiKey")??void 0,anthropicModel:g.get("anthropicModel")??void 0,openaiApiKey:g.get("openaiApiKey")??void 0,openaiModel:g.get("openaiModel")??void 0,googleApiKey:g.get("googleApiKey")??void 0,googleModel:g.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(S==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(S==="GET"&&u==="/history"){let A=n();Ae(y,await o({title:"History",activePath:"/history",installVersion:A.installVersion,body:CP({reportsDir:e.layout.reportsDir})}));return}if(S==="GET"&&u==="/knowledge"){let g=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",_=n(),w=PA({layout:e.layout}),W=vA(w),E=g.length>0?await Oo({layout:e.layout,query:g,limit:20}):Io(e.layout).slice(-50).reverse(),R=E.map(I=>{let D=wA(w,I.id),oe=D>0?` \xB7 used in ${D} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ne(I.createdAt)}">${ne(S_(I.createdAt))}${I.source?` \xB7 ${ne(I.source)}`:""}${oe}</div><pre>${ne(I.text)}</pre></article>`}).join(""),C=W.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${W.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ne(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Ae(y,await o({title:"Knowledge",activePath:"/knowledge",installVersion:_.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ne(g)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${C}${R}${X8(g,E.length)}`}));return}S==="POST"&&await rr(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return b.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),b.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Ut}`)}),b},ll=e=>Am(e).publicKeyRaw});var Pm=l(()=>{"use strict";UT();BT();eD()});var rD={};St(rD,{runAgentWitchExternalLiveCli:()=>e4});var b_,tD,Q8,e4,nD=l(()=>{"use strict";b_=m(require("node:fs")),tD=m(require("node:path"));wo();U();ee();Pm();ee();Q8=e=>{let t=tD.default.join(e,"link-code.txt");if(!b_.default.existsSync(t))return null;let r=b_.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},e4=()=>{Fe("agent-witch-live");let e=L(),t=N(),r=Q8(e),n=ll(t);al({layout:t,controllers:{getStatus:()=>{let o=ge(t);return{wsConnected:Vi(t,{socketOpen:!0}),lastHeartbeatAt:o?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:n}},reviveWebSocket:()=>{qr(e)}}})}});var nr=v((O_e,iD)=>{"use strict";var oD=["nodebuffer","arraybuffer","fragments"],sD=typeof Blob<"u";sD&&oD.push("blob");iD.exports={BINARY_TYPES:oD,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:sD,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var cl=v((N_e,_m)=>{"use strict";var{EMPTY_BUFFER:t4}=nr(),P_=Buffer[Symbol.species];function r4(e,t){if(e.length===0)return t4;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new P_(r.buffer,r.byteOffset,n):r}function aD(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function lD(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function n4(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function __(e){if(__.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new P_(e):ArrayBuffer.isView(e)?t=new P_(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),__.readOnly=!1),t}_m.exports={concat:r4,mask:aD,toArrayBuffer:n4,toBuffer:__,unmask:lD};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");_m.exports.mask=function(t,r,n,o,s){s<48?aD(t,r,n,o,s):e.mask(t,r,n,o,s)},_m.exports.unmask=function(t,r){t.length<32?lD(t,r):e.unmask(t,r)}}catch{}});var uD=v((M_e,dD)=>{"use strict";var cD=Symbol("kDone"),w_=Symbol("kRun"),v_=class{constructor(t){this[cD]=()=>{this.pending--,this[w_]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[w_]()}[w_](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[cD])}}};dD.exports=v_});var ss=v((j_e,fD)=>{"use strict";var dl=require("zlib"),pD=cl(),o4=uD(),{kStatusCode:mD}=nr(),s4=Buffer[Symbol.species],i4=Buffer.from([0,0,255,255]),vm=Symbol("permessage-deflate"),or=Symbol("total-length"),ns=Symbol("callback"),Ir=Symbol("buffers"),os=Symbol("error"),wm,W_=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!wm){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;wm=new o4(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[ns];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){wm.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){wm.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?dl.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=dl.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[vm]=this,this._inflate[or]=0,this._inflate[Ir]=[],this._inflate.on("error",l4),this._inflate.on("data",gD)}this._inflate[ns]=n,this._inflate.write(t),r&&this._inflate.write(i4),this._inflate.flush(()=>{let s=this._inflate[os];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=pD.concat(this._inflate[Ir],this._inflate[or]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[or]=0,this._inflate[Ir]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?dl.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=dl.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[or]=0,this._deflate[Ir]=[],this._deflate.on("data",a4)}this._deflate[ns]=n,this._deflate.write(t),this._deflate.flush(dl.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=pD.concat(this._deflate[Ir],this._deflate[or]);r&&(s=new s4(s.buffer,s.byteOffset,s.length-4)),this._deflate[ns]=null,this._deflate[or]=0,this._deflate[Ir]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};fD.exports=W_;function a4(e){this[Ir].push(e),this[or]+=e.length}function gD(e){if(this[or]+=e.length,this[vm]._maxPayload<1||this[or]<=this[vm]._maxPayload){this[Ir].push(e);return}this[os]=new RangeError("Max payload size exceeded"),this[os].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[os][mD]=1009,this.removeListener("data",gD),this.reset()}function l4(e){if(this[vm]._inflate=null,this[os]){this[ns](this[os]);return}e[mD]=1007,this[ns](e)}});var is=v((D_e,Wm)=>{"use strict";var{isUtf8:hD}=require("buffer"),{hasBlob:c4}=nr(),d4=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function u4(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function L_(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function p4(e){return c4&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Wm.exports={isBlob:p4,isValidStatusCode:u4,isValidUTF8:L_,tokenChars:d4};if(hD)Wm.exports.isValidUTF8=function(e){return e.length<24?L_(e):hD(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Wm.exports.isValidUTF8=function(t){return t.length<32?L_(t):e(t)}}catch{}});var T_=v((H_e,wD)=>{"use strict";var{Writable:m4}=require("stream"),yD=ss(),{BINARY_TYPES:g4,EMPTY_BUFFER:SD,kStatusCode:f4,kWebSocket:h4}=nr(),{concat:E_,toArrayBuffer:y4,unmask:S4}=cl(),{isValidStatusCode:A4,isValidUTF8:AD}=is(),Lm=Buffer[Symbol.species],et=0,bD=1,PD=2,_D=3,R_=4,k_=5,Em=6,C_=class extends m4{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||g4[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[h4]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=et}_write(t,r,n){if(this._opcode===8&&this._state==et)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Lm(n.buffer,n.byteOffset+t,n.length-t),new Lm(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new Lm(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case et:this.getInfo(t);break;case bD:this.getPayloadLength16(t);break;case PD:this.getPayloadLength64(t);break;case _D:this.getMask();break;case R_:this.getData(t);break;case k_:case Em:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[yD.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=bD:this._payloadLength===127?this._state=PD:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=_D:this._state=R_}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=R_}getData(t){let r=SD;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&S4(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=k_,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[yD.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===et&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=et;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=E_(n,r):this._binaryType==="arraybuffer"?o=y4(E_(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=et):(this._state=Em,setImmediate(()=>{this.emit("message",o,!0),this._state=et,this.startLoop(t)}))}else{let o=E_(n,r);if(!this._skipUTF8Validation&&!AD(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===k_||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=et):(this._state=Em,setImmediate(()=>{this.emit("message",o,!1),this._state=et,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,SD),this.end();else{let n=t.readUInt16BE(0);if(!A4(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new Lm(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!AD(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=et;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=et):(this._state=Em,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=et,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[f4]=o,i}};wD.exports=C_});var O_=v((F_e,LD)=>{"use strict";var{Duplex:$_e}=require("stream"),{randomFillSync:b4}=require("crypto"),{types:{isUint8Array:P4}}=require("util"),vD=ss(),{EMPTY_BUFFER:_4,kWebSocket:w4,NOOP:v4}=nr(),{isBlob:as,isValidStatusCode:W4}=is(),{mask:WD,toBuffer:On}=cl(),tt=Symbol("kByteLength"),L4=Buffer.alloc(4),Rm=8*1024,Nn,ls=Rm,yt=0,E4=1,R4=2,x_=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=yt,this.onerror=v4,this[w4]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||L4,r.generateMask?r.generateMask(n):(ls===Rm&&(Nn===void 0&&(Nn=Buffer.alloc(Rm)),b4(Nn,0,Rm),ls=0),n[0]=Nn[ls++],n[1]=Nn[ls++],n[2]=Nn[ls++],n[3]=Nn[ls++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[tt]!==void 0?a=r[tt]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(o?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=n[0],d[s-3]=n[1],d[s-2]=n[2],d[s-1]=n[3],i?[d,t]:o?(WD(t,n,d,s,a),[d]):(WD(t,n,t,0,a),[d,t])):[d,t]}close(t,r,n,o){let s;if(t===void 0)s=_4;else{if(typeof t!="number"||!W4(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(P4(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[tt]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==yt?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):as(t)?(o=t.size,s=!1):(t=On(t),o=t.length,s=On.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[tt]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};as(t)?this._state!==yt?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==yt?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):as(t)?(o=t.size,s=!1):(t=On(t),o=t.length,s=On.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[tt]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};as(t)?this._state!==yt?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==yt?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[vD.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):as(t)?(a=t.size,c=!1):(t=On(t),a=t.length,c=On.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[tt]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};as(t)?this._state!==yt?this.enqueue([this.getBlobData,t,this._compress,d,n]):this.getBlobData(t,this._compress,d,n):this._state!==yt?this.enqueue([this.dispatch,t,this._compress,d,n]):this.dispatch(t,this._compress,d,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[tt],this._state=R4,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(I_,this,a,o);return}this._bufferedBytes-=n[tt];let i=On(s);r?this.dispatch(i,r,n,o):(this._state=yt,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(k4,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[vD.extensionName];this._bufferedBytes+=n[tt],this._state=E4,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");I_(this,c,o);return}this._bufferedBytes-=n[tt],this._state=yt,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===yt&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][tt],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][tt],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};LD.exports=x_;function I_(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function k4(e,t,r){I_(e,t,r),e.onerror(t)}});var ND=v((z_e,OD)=>{"use strict";var{kForOnEventAttribute:ul,kListener:N_}=nr(),ED=Symbol("kCode"),RD=Symbol("kData"),kD=Symbol("kError"),CD=Symbol("kMessage"),TD=Symbol("kReason"),cs=Symbol("kTarget"),xD=Symbol("kType"),ID=Symbol("kWasClean"),sr=class{constructor(t){this[cs]=null,this[xD]=t}get target(){return this[cs]}get type(){return this[xD]}};Object.defineProperty(sr.prototype,"target",{enumerable:!0});Object.defineProperty(sr.prototype,"type",{enumerable:!0});var Mn=class extends sr{constructor(t,r={}){super(t),this[ED]=r.code===void 0?0:r.code,this[TD]=r.reason===void 0?"":r.reason,this[ID]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[ED]}get reason(){return this[TD]}get wasClean(){return this[ID]}};Object.defineProperty(Mn.prototype,"code",{enumerable:!0});Object.defineProperty(Mn.prototype,"reason",{enumerable:!0});Object.defineProperty(Mn.prototype,"wasClean",{enumerable:!0});var ds=class extends sr{constructor(t,r={}){super(t),this[kD]=r.error===void 0?null:r.error,this[CD]=r.message===void 0?"":r.message}get error(){return this[kD]}get message(){return this[CD]}};Object.defineProperty(ds.prototype,"error",{enumerable:!0});Object.defineProperty(ds.prototype,"message",{enumerable:!0});var pl=class extends sr{constructor(t,r={}){super(t),this[RD]=r.data===void 0?null:r.data}get data(){return this[RD]}};Object.defineProperty(pl.prototype,"data",{enumerable:!0});var C4={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[ul]&&o[N_]===t&&!o[ul])return;let n;if(e==="message")n=function(s,i){let a=new pl("message",{data:i?s:s.toString()});a[cs]=this,km(t,this,a)};else if(e==="close")n=function(s,i){let a=new Mn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[cs]=this,km(t,this,a)};else if(e==="error")n=function(s){let i=new ds("error",{error:s,message:s.message});i[cs]=this,km(t,this,i)};else if(e==="open")n=function(){let s=new sr("open");s[cs]=this,km(t,this,s)};else return;n[ul]=!!r[ul],n[N_]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[N_]===t&&!r[ul]){this.removeListener(e,r);break}}};OD.exports={CloseEvent:Mn,ErrorEvent:ds,Event:sr,EventTarget:C4,MessageEvent:pl};function km(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Cm=v((U_e,MD)=>{"use strict";var{tokenChars:ml}=is();function Nt(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function T4(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,d=-1,p=-1,f=0;for(;f<e.length;f++)if(d=e.charCodeAt(f),i===void 0)if(p===-1&&ml[d]===1)c===-1&&(c=f);else if(f!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f);let h=e.slice(c,p);d===44?(Nt(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${f}`);else if(a===void 0)if(p===-1&&ml[d]===1)c===-1&&(c=f);else if(d===32||d===9)p===-1&&c!==-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f),Nt(r,e.slice(c,p),!0),d===44&&(Nt(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,f),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${f}`);else if(o){if(ml[d]!==1)throw new SyntaxError(`Unexpected character at index ${f}`);c===-1?c=f:n||(n=!0),o=!1}else if(s)if(ml[d]===1)c===-1&&(c=f);else if(d===34&&c!==-1)s=!1,p=f;else if(d===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${f}`);else if(d===34&&e.charCodeAt(f-1)===61)s=!0;else if(p===-1&&ml[d]===1)c===-1&&(c=f);else if(c!==-1&&(d===32||d===9))p===-1&&(p=f);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${f}`);p===-1&&(p=f);let h=e.slice(c,p);n&&(h=h.replace(/\\/g,""),n=!1),Nt(r,a,h),d===44&&(Nt(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${f}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=f);let b=e.slice(c,p);return i===void 0?Nt(t,b,r):(a===void 0?Nt(r,b,!0):n?Nt(r,a,b.replace(/\\/g,"")):Nt(r,a,b),Nt(t,i,r)),t}function x4(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}MD.exports={format:x4,parse:T4}});var Om=v((V_e,KD)=>{"use strict";var I4=require("events"),O4=require("https"),N4=require("http"),HD=require("net"),M4=require("tls"),{randomBytes:j4,createHash:D4}=require("crypto"),{Duplex:B_e,Readable:G_e}=require("stream"),{URL:M_}=require("url"),Or=ss(),H4=T_(),$4=O_(),{isBlob:F4}=is(),{BINARY_TYPES:jD,CLOSE_TIMEOUT:z4,EMPTY_BUFFER:Tm,GUID:U4,kForOnEventAttribute:j_,kListener:B4,kStatusCode:G4,kWebSocket:pe,NOOP:$D}=nr(),{EventTarget:{addEventListener:V4,removeEventListener:q4}}=ND(),{format:K4,parse:J4}=Cm(),{toBuffer:Y4}=cl(),FD=Symbol("kAborted"),D_=[8,13],ir=["CONNECTING","OPEN","CLOSING","CLOSED"],X4=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,J=class e extends I4{constructor(t,r,n){super(),this._binaryType=jD[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Tm,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),zD(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){jD.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new H4({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new $4(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[pe]=this,s[pe]=this,t[pe]=this,o.on("conclude",e3),o.on("drain",t3),o.on("error",r3),o.on("message",n3),o.on("ping",o3),o.on("pong",s3),s.onerror=i3,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",GD),t.on("data",Im),t.on("end",VD),t.on("error",qD),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Or.extensionName]&&this._extensions[Or.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ge(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),BD(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){H_(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Tm,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){H_(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Tm,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){H_(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Or.extensionName]||(o.compress=!1),this._sender.send(t||Tm,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ge(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(J,"CONNECTING",{enumerable:!0,value:ir.indexOf("CONNECTING")});Object.defineProperty(J.prototype,"CONNECTING",{enumerable:!0,value:ir.indexOf("CONNECTING")});Object.defineProperty(J,"OPEN",{enumerable:!0,value:ir.indexOf("OPEN")});Object.defineProperty(J.prototype,"OPEN",{enumerable:!0,value:ir.indexOf("OPEN")});Object.defineProperty(J,"CLOSING",{enumerable:!0,value:ir.indexOf("CLOSING")});Object.defineProperty(J.prototype,"CLOSING",{enumerable:!0,value:ir.indexOf("CLOSING")});Object.defineProperty(J,"CLOSED",{enumerable:!0,value:ir.indexOf("CLOSED")});Object.defineProperty(J.prototype,"CLOSED",{enumerable:!0,value:ir.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(J.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(J.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[j_])return t[B4];return null},set(t){for(let r of this.listeners(e))if(r[j_]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[j_]:!0})}})});J.prototype.addEventListener=V4;J.prototype.removeEventListener=q4;KD.exports=J;function zD(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:z4,protocolVersion:D_[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!D_.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${D_.join(", ")})`);let s;if(t instanceof M_)s=t;else try{s=new M_(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;xm(e,u);return}let d=i?443:80,p=j4(16).toString("base64"),f=i?O4.request:N4.request,b=new Set,h;if(o.createConnection=o.createConnection||(i?Q4:Z4),o.defaultPort=o.defaultPort||d,o.port=s.port||d,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(h=new Or({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=K4({[Or.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!X4.test(u)||b.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");b.add(u)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let u=o.path.split(":");o.socketPath=u[0],o.path=u[1]}let y;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let u=n&&n.headers;if(n={...n,headers:{}},u)for(let[S,A]of Object.entries(u))n.headers[S.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,u||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),y=e._req=f(o),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=f(o);o.timeout&&y.on("timeout",()=>{Ge(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[FD]||(y=e._req=null,xm(e,u))}),y.on("response",u=>{let S=u.headers.location,A=u.statusCode;if(S&&o.followRedirects&&A>=300&&A<400){if(++e._redirects>o.maxRedirects){Ge(e,y,"Maximum redirects exceeded");return}y.abort();let g;try{g=new M_(S,t)}catch{let w=new SyntaxError(`Invalid URL: ${S}`);xm(e,w);return}zD(e,g,r,n)}else e.emit("unexpected-response",y,u)||Ge(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,S,A)=>{if(e.emit("upgrade",u),e.readyState!==J.CONNECTING)return;y=e._req=null;let g=u.headers.upgrade;if(g===void 0||g.toLowerCase()!=="websocket"){Ge(e,S,"Invalid Upgrade header");return}let _=D4("sha1").update(p+U4).digest("base64");if(u.headers["sec-websocket-accept"]!==_){Ge(e,S,"Invalid Sec-WebSocket-Accept header");return}let w=u.headers["sec-websocket-protocol"],W;if(w!==void 0?b.size?b.has(w)||(W="Server sent an invalid subprotocol"):W="Server sent a subprotocol but none was requested":b.size&&(W="Server sent no subprotocol"),W){Ge(e,S,W);return}w&&(e._protocol=w);let E=u.headers["sec-websocket-extensions"];if(E!==void 0){if(!h){Ge(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=J4(E)}catch{Ge(e,S,"Invalid Sec-WebSocket-Extensions header");return}let C=Object.keys(R);if(C.length!==1||C[0]!==Or.extensionName){Ge(e,S,"Server indicated an extension that was not requested");return}try{h.accept(R[Or.extensionName])}catch{Ge(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Or.extensionName]=h}e.setSocket(S,A,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(y,e):y.end()}function xm(e,t){e._readyState=J.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function Z4(e){return e.path=e.socketPath,HD.connect(e)}function Q4(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=HD.isIP(e.host)?"":e.host),M4.connect(e)}function Ge(e,t,r){e._readyState=J.CLOSING;let n=new Error(r);Error.captureStackTrace(n,Ge),t.setHeader?(t[FD]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(xm,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function H_(e,t,r){if(t){let n=F4(t)?t.size:Y4(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${ir[e.readyState]})`);process.nextTick(r,n)}}function e3(e,t){let r=this[pe];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[pe]!==void 0&&(r._socket.removeListener("data",Im),process.nextTick(UD,r._socket),e===1005?r.close():r.close(e,t))}function t3(){let e=this[pe];e.isPaused||e._socket.resume()}function r3(e){let t=this[pe];t._socket[pe]!==void 0&&(t._socket.removeListener("data",Im),process.nextTick(UD,t._socket),t.close(e[G4])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function DD(){this[pe].emitClose()}function n3(e,t){this[pe].emit("message",e,t)}function o3(e){let t=this[pe];t._autoPong&&t.pong(e,!this._isServer,$D),t.emit("ping",e)}function s3(e){this[pe].emit("pong",e)}function UD(e){e.resume()}function i3(e){let t=this[pe];t.readyState!==J.CLOSED&&(t.readyState===J.OPEN&&(t._readyState=J.CLOSING,BD(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function BD(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function GD(){let e=this[pe];if(this.removeListener("close",GD),this.removeListener("data",Im),this.removeListener("end",VD),e._readyState=J.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[pe]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",DD),e._receiver.on("finish",DD))}function Im(e){this[pe]._receiver.write(e)||this.pause()}function VD(){let e=this[pe];e._readyState=J.CLOSING,e._receiver.end(),this.end()}function qD(){let e=this[pe];this.removeListener("error",qD),this.on("error",$D),e&&(e._readyState=J.CLOSING,this.destroy())}});var ZD=v((K_e,XD)=>{"use strict";var q_e=Om(),{Duplex:a3}=require("stream");function JD(e){e.emit("close")}function l3(){!this.destroyed&&this._writableState.finished&&this.destroy()}function YD(e){this.removeListener("error",YD),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function c3(e,t){let r=!0,n=new a3({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(JD,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(JD,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",l3),n.on("error",YD),n}XD.exports=c3});var $_=v((J_e,QD)=>{"use strict";var{tokenChars:d3}=is();function u3(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&d3[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}QD.exports={parse:u3}});var iH=v((X_e,sH)=>{"use strict";var p3=require("events"),Nm=require("http"),{Duplex:Y_e}=require("stream"),{createHash:m3}=require("crypto"),eH=Cm(),jn=ss(),g3=$_(),f3=Om(),{CLOSE_TIMEOUT:h3,GUID:y3,kWebSocket:S3}=nr(),A3=/^[+/0-9A-Za-z]{22}==$/,tH=0,rH=1,oH=2,F_=class extends p3{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:h3,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:f3,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Nm.createServer((n,o)=>{let s=Nm.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=b3(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=tH}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===oH){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(gl,this);return}if(t&&this.once("close",t),this._state!==rH)if(this._state=rH,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(gl,this):process.nextTick(gl,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{gl(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",nH);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Dn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Dn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!A3.test(s)){Dn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Dn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){fl(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=g3.parse(c)}catch{Dn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],f={};if(this.options.perMessageDeflate&&p!==void 0){let b=new jn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=eH.parse(p);h[jn.extensionName]&&(b.accept(h[jn.extensionName]),f[jn.extensionName]=b)}catch{Dn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let b={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(b,(h,y,u,S)=>{if(!h)return fl(r,y||401,u,S);this.completeUpgrade(f,s,d,t,r,n,o)});return}if(!this.options.verifyClient(b))return fl(r,401)}this.completeUpgrade(f,s,d,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[S3])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>tH)return fl(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${m3("sha1").update(r+y3).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(n.size){let f=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;f&&(d.push(`Sec-WebSocket-Protocol: ${f}`),p._protocol=f)}if(t[jn.extensionName]){let f=t[jn.extensionName].params,b=eH.format({[jn.extensionName]:[f]});d.push(`Sec-WebSocket-Extensions: ${b}`),p._extensions=t}this.emit("headers",d,o),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",nH),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(gl,this)})),a(p,o)}};sH.exports=F_;function b3(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function gl(e){e._state=oH,e.emit("close")}function nH(){this.destroy()}function fl(e,t,r,n){r=r||Nm.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Nm.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function Dn(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,Dn),e.emit("wsClientError",i,r,t)}else fl(r,n,o,s)}});var P3,_3,w3,v3,W3,L3,aH,E3,hl,lH=l(()=>{P3=m(ZD(),1),_3=m(Cm(),1),w3=m(ss(),1),v3=m(T_(),1),W3=m(O_(),1),L3=m($_(),1),aH=m(Om(),1),E3=m(iH(),1),hl=aH.default});var z_,U_,B_=l(()=>{"use strict";z_="AGENT_WITCH_EXTERNAL_BRIDGE",U_="AGENT_WITCH_EXTERNAL_LIVE"});var G_,cH=l(()=>{"use strict";G_=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var R3,V_,dH=l(()=>{"use strict";B_();cH();R3=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",V_=(e={})=>{let t=e.env??process.env,r=G_(t[z_]),n=G_(t[U_]);return{mode:R3(r,n),skipInProcessBridge:r,skipInProcessLive:n}}});var uH=l(()=>{"use strict";B_()});var pH=l(()=>{"use strict";dH();uH()});var q_=l(()=>{"use strict"});var ar,yl=l(()=>{"use strict";ar=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var us,Hn,mH,C3,K_,J_,gH,fH,Y_,hH,Sl,X_=l(()=>{"use strict";us=m(require("node:fs")),Hn=m(require("node:os")),mH=m(require("node:path"));q_();yl();C3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),K_=(e=Hn.default.hostname())=>mH.default.join(Hn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),J_=e=>{if(!us.default.existsSync(e))return null;try{let t=JSON.parse(us.default.readFileSync(e,"utf8"));return!C3(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},gH=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},fH=(e,t)=>{us.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Y_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??K_(),n=J_(r);if(n!==null&&n.pid!==process.pid&&ar(n.pid)&&gH(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:Hn.default.hostname(),macOsUsername:Hn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return fH(r,o),{ok:!0}},hH=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??K_(),n=J_(r);return n!==null&&n.pid!==process.pid&&ar(n.pid)&&gH(n)?{ok:!1}:(fH(r,{hostname:Hn.default.hostname(),macOsUsername:Hn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Sl=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??K_();J_(r)?.pid===process.pid&&us.default.existsSync(r)&&us.default.unlinkSync(r)}});var Z_,Al,T3,x3,I3,O3,Q_,yH=l(()=>{"use strict";Z_=require("node:child_process"),Al=m(require("node:path"));yl();sd();T3=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),x3=(e,t)=>{if(T3(e)||!/\bnode\b/.test(e))return!1;let r=Al.default.resolve(t),n=Al.default.join(r,"app",js),o=Al.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===js||i==="agent-witch.ts")return e.includes(r);try{let a=Al.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},I3=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,Z_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},O3=(e,t,r)=>{let n=I3(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||x3(d,t)&&o.push(c)}return o},Q_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Z_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=O3(r,e.installDir,t),o=[];for(let s of n)if(ar(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var bl,Pl,SH,N3,ew,AH=l(()=>{"use strict";bl=m(require("node:fs")),Pl=m(require("node:path"));Pe();SH=(e,t)=>{!bl.default.existsSync(e)||bl.default.existsSync(t)||(bl.default.mkdirSync(Pl.default.dirname(t),{recursive:!0}),bl.default.renameSync(e,t))},N3=e=>{if(e.profileEmail===null)return;let t=Pl.default.join(e.installDir,nt);SH(Pl.default.join(t,Vn),e.mainLogPath),SH(Pl.default.join(t,qn),e.errorLogPath)},ew=e=>{let t=N();e!==void 0&&t.installDir!==e||N3(t)}});var M3,bH=l(()=>{"use strict";Qi();zu();zu();M3={};!at()&&Yr(M3.url)&&(async()=>{Fe("agent-witch-wake-server");let e=await Sn(),t=Ft(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var PH=l(()=>{"use strict";bH()});var _H=l(()=>{"use strict";Hi()});var tw,wH=l(()=>{"use strict";q_();PH();X_();_H();tw=async(e={})=>{let t=e.skipInProcessBridge?null:await Fu();bu();let r=setInterval(()=>{bu()},6e4),n=setInterval(()=>{if(!hH().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t?.close()}}}});var _l,Mm,H3,vH,WH,jm,LH,EH,rw,RH,Dm,kH=l(()=>{"use strict";_l=m(require("node:fs")),Mm=m(require("node:path")),H3="pending-run-inputs.json",vH=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),WH=e=>{let t=e.profileEmail?Mm.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Mm.default.join(t,H3)},jm=e=>{let t=WH(e);if(!_l.default.existsSync(t))return{};try{let r=JSON.parse(_l.default.readFileSync(t,"utf8"));return vH(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!vH(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},LH=(e,t)=>{let r=WH(e);_l.default.mkdirSync(Mm.default.dirname(r),{recursive:!0}),_l.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},EH=e=>Object.values(jm(e)),rw=(e,t)=>jm(e)[t]!==void 0,RH=(e,t)=>{let r=jm(e);r[t.agentRunId]=t,LH(e,r)},Dm=(e,t)=>{let r=jm(e);delete r[t],LH(e,r)}});var Hm=l(()=>{"use strict";ae()});var CH=l(()=>{"use strict";ae()});var $m=l(()=>{"use strict";ae()});var Fm=l(()=>{"use strict";ae()});var wl=l(()=>{"use strict";ae()});var $3,F3,vl,nw=l(()=>{"use strict";ct();Hm();CH();$m();Fm();wl();$3={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},F3={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},vl=e=>{if(!se(e.writerAgent))return"the selected writer";let t=ze(e.writerAgent);if(ve(e.writerExecutionBackend)==="api"&&t!==null){let r=Ne(me(e.configPath),t);if(r!==null&&r.apiKey.length>0){let n=oi(t,r.model);return`${F3[t]} model ${n}`}}return $3[e.writerAgent]}});var z3,U3,TH,xH,IH=l(()=>{"use strict";z3=/"input_tokens"\s*:\s*(\d+)/,U3=/"output_tokens"\s*:\s*(\d+)/,TH=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},xH=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=TH(z3.exec(t)),n=TH(U3.exec(t));if(r===null||n===null)return null;let o=r+n;return o>=1?o:null}});var zm=l(()=>{"use strict";pt()});var Wl,Um,B3,ow,OH,NH,MH,sw,jH=l(()=>{"use strict";Wl=m(require("node:fs")),Um=m(require("node:path"));zm();B3="run-completion-outbox.json",ow=e=>{let t=e.profileEmail?Um.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Um.default.join(t,B3)},OH=e=>{let t=ow(e);if(!Wl.default.existsSync(t))return[];try{let r=JSON.parse(Wl.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},NH=(e,t)=>{Wl.default.mkdirSync(Um.default.dirname(ow(e)),{recursive:!0}),Wl.default.writeFileSync(ow(e),JSON.stringify(t,null,2),"utf8")},MH=(e,t)=>{let r=[...OH(e).filter(n=>n.runId!==t.runId),t];NH(e,r)},sw=async e=>{if(e.cloudApi===null)return;let t=OH(e.layout);if(t.length===0)return;let r=[];for(let n of t)await Ii(e.cloudApi,n.runId,n.exitCode,n.output,{estimateSeconds:n.estimateSeconds,actualSeconds:n.actualSeconds})||r.push(n);NH(e.layout,r)}});var DH=l(()=>{"use strict"});var iw,Ll,V3,$n,HH=l(()=>{"use strict";DH();iw=new Map,Ll=e=>{let t=iw.get(e);t!==void 0&&(clearInterval(t),iw.delete(e))},V3=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},$n=(e,t,r,n={})=>{Ll(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){Ll(t);return}let i=n.onTick?.()??{};V3(e,t,o,i)};s(),iw.set(t,setInterval(s,15e3))}});var $H=l(()=>{"use strict";pt()});var FH,zH=l(()=>{"use strict";$H();FH=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:qe(t)}});var aw,El,lr,lw,Mt,UH,Bm=l(()=>{"use strict";aw=new Set,El=new Map,lr=(e,t)=>{if(t.length===0)return;let r=El.get(e)??[];r.push(t),El.set(e,r)},lw=e=>{aw.add(e);let t=El.get(e)??[];return El.delete(e),t},Mt=e=>aw.has(e),UH=e=>{aw.delete(e),El.delete(e)}});var Gm,BH,q3,GH,VH=l(()=>{"use strict";Gm=m(require("node:path")),BH=require("node:url");Xn();q3={},GH=()=>{if(at()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Gm.default.dirname(Gm.default.resolve(e))}return Gm.default.dirname((0,BH.fileURLToPath)(q3.url))}});var qH,KH,JH,YH,He,ps,XH,ZH,ms,cw,dw,uw,QH,pw,e$,Vm=l(()=>{"use strict";qH=require("node:crypto"),KH=m(require("node:fs")),JH=m(require("node:path")),YH=require("node:url");yl();Xn();VH();He=new Map,XH=async()=>{if(ps!==void 0)return ps;try{if(at()){let e=GH(),t=JH.default.join(e,"deps","node-pty","lib","index.js");if(KH.default.existsSync(t)){let r=await import((0,YH.pathToFileURL)(t).href);return ps=r,r}}return ps=await import("node-pty"),ps}catch{return ps=null,null}},ZH=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},ms=(e,t,r)=>{let n=He.get(e);if(n!==void 0){He.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},cw=(e,t)=>{let r=He.get(e);return r===void 0?!1:(r.pty.write(t),!0)},dw=(e,t,r)=>{let n=He.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},uw=e=>{for(let t of He.values())if(!(t.mode!=="agent"||t.runId!==e))return ar(t.pty.pid);return!1},QH=e=>{for(let[t,r]of He.entries())if(!(r.mode!=="agent"||r.runId!==e)){He.delete(t);try{r.pty.kill()}catch{}return!0}return!1},pw=async e=>{let t=await XH();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;He.get(e.shellSessionId)!==void 0&&ms(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return He.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{ZH(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{He.get(e.shellSessionId)?.pty===o&&(He.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},e$=async e=>{let t=e.shellSessionId??(0,qH.randomUUID)(),r=await XH();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return He.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{ZH(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{He.get(t)?.pty===n&&(He.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var qm,t$,r$=l(()=>{"use strict";qm="[[AWAITING_INPUT]]",t$=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",qm,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Rl,n$,Km=l(()=>{"use strict";r$();Rl=e=>{let t=e.indexOf(qm);if(t<0)return null;let n=e.slice(t+qm.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},n$=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",t$].join(`
`)});var o$,s$=l(()=>{"use strict";Bm();Vm();Km();o$=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(Mt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}lr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await e$({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=Rl(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var i$,a$,l$,cr,Jm=l(()=>{"use strict";i$=require("node:child_process"),a$=m(require("node:fs")),l$=m(require("node:path"));sd();cr=(e,t)=>{let r=l$.default.join(e,"app",WL,"ensure-writer.sh");return a$.default.existsSync(r)?new Promise((n,o)=>{let s=(0,i$.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var c$,Fn,Cl,Ym,mw,kl,Xm,Zm,gw,fw,K3,gs,J3,Y3,hw,yw=l(()=>{"use strict";c$=require("node:child_process");ct();Jm();$m();Hm();wl();Fm();Fn=new Map,Cl=e=>e==="cursor"||e==="antigravity",Ym=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",mw=e=>Fn.get(e)?.warmed===!0,kl=e=>{let t=Fn.get(e);Fn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Xm=e=>Fn.get(e)?.conversationStarted===!0,Zm=e=>{let t=Fn.get(e);Fn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},gw=e=>{Fn.delete(e)},fw=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",K3={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},gs=e=>`${K3[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,J3=(e,t,r,n)=>new Promise(o=>{let s=Sd(t,r),i=[],a=(0,c$.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),n?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{o({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{o({exitCode:-1,output:d.message})})}),Y3=(e,t)=>{let r=gs(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},hw=async e=>{if(!se(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&ve(e.runConfig.writerExecutionBackend)==="api"){let r=ze(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let n=me(e.runConfig.layout.configPath);return Ne(n,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),kl(e.writerAgent),{exitCode:0,output:gs(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await cr(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}Cl(e.writerAgent)&&kl(e.writerAgent);let t=await J3(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?Y3(e.writerAgent,t.output):gs(e.writerAgent)}}});var zn,Sw=l(()=>{"use strict";zn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var d$,X3,Z3,u$,Q3,Aw,p$=l(()=>{"use strict";Sw();d$=/you(?:'|')ve hit your session limit/i,X3=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],Z3=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,u$=(e,t)=>{for(let r of e.split(/\r?\n/)){let n=r.trim();if(n.length>0&&t.test(n))return n}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},Q3=e=>{let t=Z3.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},Aw=e=>{let t=e.trim();if(t.length===0)return null;if(d$.test(t))return{code:zn.SESSION_LIMIT,resetHint:Q3(t),matchedLine:u$(t,d$)};for(let r of X3)if(r.test(t))return{code:zn.PROVIDER_QUOTA,resetHint:null,matchedLine:u$(t,r)};return null}});var Qm,eg,bw,Pw=l(()=>{"use strict";Qm="[[AGENT_RUN_WRITER_EXECUTION]]",eg="cli-writer-api-key-missing",bw="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var _w=l(()=>{"use strict";Pw()});var m$=l(()=>{"use strict";_w()});var tg=l(()=>{"use strict";Sw();p$();Pw();_w();m$()});var rg,g$=l(()=>{"use strict";rg={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var f$,h$=l(()=>{"use strict";f$="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var y$,S$=l(()=>{"use strict";tg();h$();y$=e=>e.code===zn.SESSION_LIMIT?f$:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var A$,b$=l(()=>{"use strict";tg();g$();S$();A$=e=>{let t=Aw(e.output);return t!==null?{status:rg.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:y$(t)}:{status:e.exitCode===0?rg.COMPLETED:rg.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var ww,sWe,P$=l(()=>{"use strict";ww={OPEN:"open",APPROVAL:"approval"},sWe=ww.APPROVAL});var fs,ng,_$,rJ,w$,v$,W$,Tl,vw,Ww=l(()=>{"use strict";fs=m(require("node:fs")),ng=m(require("node:path")),_$="runs",rJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),w$=e=>{let t=e.profileEmail!==null?ng.default.join(e.installDir,"profiles",e.profileEmail,_$):ng.default.join(e.installDir,_$);return fs.default.mkdirSync(t,{recursive:!0}),t},v$=(e,t)=>ng.default.join(w$(e),`${t}.json`),W$=(e,t)=>{fs.default.writeFileSync(v$(e,t.id),JSON.stringify(t,null,2))},Tl=(e,t)=>{let r=v$(e,t);if(!fs.default.existsSync(r))return null;try{let n=JSON.parse(fs.default.readFileSync(r,"utf8"));return!rJ(n)||typeof n.id!="string"?null:n}catch{return null}},vw=e=>{let t=w$(e),r=fs.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=Tl(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var nJ,L$,E$=l(()=>{"use strict";b$();P$();Ww();nJ=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",n=A$({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:n.status,dispatchPolicy:ww.OPEN,resultOutput:e.output,resultExitCode:n.resultExitCode,resultOutcomeCode:n.resultOutcomeCode,denialReason:n.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},L$=(e,t)=>{let r=nJ(t);return W$(e,r),r}});var R$=l(()=>{"use strict";fm()});var k$,C$=l(()=>{"use strict";tg();k$=()=>[Qm,`agentRunWriterExecutionBackend=${eg}`,`agentRunWriterExecutionReasonCode=${bw}`].join(`
`)});var Nr,og=l(()=>{"use strict";Nr=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Lw,oJ,sJ,T$,x$=l(()=>{"use strict";Lw=e=>e.toLocaleString("en-US"),oJ=e=>e<.01?e.toFixed(4):e.toFixed(3),sJ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${oJ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Lw(e.inputTokens)} in / ${Lw(e.outputTokens)} out (${Lw(e.totalTokens)} total)`,t].join(`
`)},T$=(e,t)=>{if(t===void 0)return e;let r=sJ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var I$=l(()=>{"use strict";ae()});var N$,xl,ce,Ew,sg,O$,iJ,aJ,M$,j$,D$,Il,Rw,kw,Cw,H$,lJ,rt,Ol,Mr,$$,cJ,dJ,ig,Tw,xw,Iw,F$=l(()=>{"use strict";N$=require("node:child_process");ae();ct();kH();Za();nw();IH();Ad();jH();zm();HH();yl();zH();Bm();Vm();Km();s$();yw();E$();R$();C$();og();x$();ro();I$();wl();zs();Km();xl=new Map,ce=new Map,Ew=new Set,sg=new Map,O$=e=>{e!==void 0&&!sg.has(e)&&sg.set(e,Date.now())},iJ=(e,t,r,n)=>{let o=n.endsWith(`
`)?n:`${n}
`;if(Mt(t)){rt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:o},requestId:r});return}lr(t,o)},aJ=(e,t,r,n,o)=>{if(!$h(e,o))return;let s=`${k$()}
`;iJ(t,r,n,s);let i=ce.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},M$=130,j$=`

Stopped by user.`,D$=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:Nr(e)},Il=null,Rw=e=>{Il=e},kw=(e,t)=>{if(Il===null)return;let r=EP(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||Dy(Il,t,r)},Cw=async e=>{await sw({layout:e,cloudApi:Il})},H$=e=>{let t=xl.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:ar(t.pid)},lJ=e=>ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),rt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Ol=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Yn(s),c=ce.get(r);if(a!==null&&c!==void 0){let d=NL(a),p=H$(r)||uw(r);d!==null&&!p&&Mr(e,t,r,n,d.exitCode,d.output,c.originalPrompt)}return OL(a)}}),Mr=(e,t,r,n,o,s,i,a)=>{let c=co(s,a),d=o,p=T$(c.output,c.llmUsage);if(r!==void 0){let b=sg.get(r);sg.delete(r),b!==void 0&&WP({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-b)/1e3))});let h=xH(c.llmUsage,p);h!==null&&ZM({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&Ew.has(r)&&(Ew.delete(r),d=M$,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${j$}`:"Stopped by user.");let f=r!==void 0?EP(e.layout.reportsDir,r):null;if(r!==void 0){Ll(r),pi(e.layout,r),Mt(r)&&(rt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),UH(r));let b=ce.get(r);JM({reportsDir:e.layout.reportsDir,agentRunId:r,input:Nr(i),output:p,...b!==void 0?{writerLabel:vl({writerAgent:b.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),b!==void 0&&mm({layout:e.layout,writerAgent:b.writerAgent,projectFolderPath:b.projectFolderPath,userPrompt:b.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),L$(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),MH(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{}}),sw({layout:e.layout,cloudApi:Il}),ce.delete(r),xl.delete(r),Dm(e.layout,r)}rt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:n}),Xs(e.layout)},$$=(e,t,r,n,o,s,i)=>{let a=ce.get(r),c=a?.accumulatedOutput??s;RH(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),$n(t,r,()=>rw(e.layout,r),Ol(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),rt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},cJ=(e,t,r,n,o,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(o===void 0||h.length===0)){if(Mt(o)){rt(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:h},requestId:n});return}lr(o,h)}};if(o!==void 0){let h=ce.get(o);xl.set(o,t),ce.set(o,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),rt(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),$n(r,o,()=>H$(o),Ol(e,r,o,n,h?.projectFolderPath,h?.reportKey))}let f=a==="claude-cli",b=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(f?b.push(y):(c.push(y),p(y)),d||o===void 0)return;let u=Rl(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let S=ce.get(o),A=[S?.accumulatedOutput??"",u.partialOutput].filter(g=>g.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=A),xl.delete(o),$$(e,r,o,n,u.question,A,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;Zm(a);let y=o!==void 0?ce.get(o):void 0,u=f?co(b.join("")):{output:c.join("").trim(),llmUsage:void 0},S=f?c.join("").trim():"",A=[u.output.trim(),S].filter(_=>_.length>0).join(`
`);f&&u.output.trim().length>0&&p(u.output);let g=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;Mr(e,r,o,n,h??-1,g,s,u.llmUsage)}),t.on("error",h=>{d||Mr(e,r,o,n,-1,h.message,s)})},dJ=(e,t,r,n,o,s,i,a,c)=>{let d=D$(r,c);s!==void 0&&(ce.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),rt(o,{type:"terminal.stream.start",payload:{runId:s},requestId:n}),$n(o,s,()=>ce.has(s),Ol(e,o,s,n,i,a))),li(e,t,r,f=>{if(!(s===void 0||f.length===0)){if(Mt(s)){rt(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:f},requestId:n});return}lr(s,f)}}).then(f=>{Zm(t),Mr(e,o,s,n,f.exitCode,f.output,r,f.llmUsage)}).catch(f=>{let b=f instanceof Error?f.message:String(f);Mr(e,o,s,n,-1,b,r)})},ig=(e,t,r,n,o,s,i,a,c,d,p,f)=>{let b=D$(r,p);if(Ys(e.layout),on(e,t)){O$(s),dJ(e,t,r,n,o,s,c,d,b);return}let h=wt(t,r,lJ(e),i);if(h===null){Mr(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}O$(s);let y=FH({workspace:e.workspace,projectFolderPath:c}),u=()=>{let S=(0,N$.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:f??process.env});cJ(e,S,o,n,s,r,b,t)};if(s===void 0){u();return}ce.set(s,{originalPrompt:r,userTranscriptPrompt:b,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:ce.get(s)?.accumulatedOutput??""}),aJ(e,o,s,n,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Fs({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),$n(o,s,()=>ce.has(s),Ol(e,o,s,n,c,d)),o$({socket:o,sendMessage:rt,requestId:n,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:f,originalPrompt:r,writerAgent:t,onInputRequired:S=>{a!==void 0&&ms(a,_=>{rt(o,_)},n);let A=ce.get(s),g=[A?.accumulatedOutput??"",S.partialOutput].filter(_=>_.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=g),$$(e,o,s,n,S.question,g,r)},onFinished:(S,A)=>{Zm(t);let g=co(A),_=ce.get(s),w=_!==void 0&&_.accumulatedOutput.length>0?`${_.accumulatedOutput}

${g.output}`.trim():g.output;Mr(e,o,s,n,S,w,r,g.llmUsage)}}).then(S=>{if(!S){u();return}$n(o,s,()=>uw(s),Ol(e,o,s,n,c,d))}).catch(S=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",S instanceof Error?S.message:S),u()})},Tw=(e,t,r,n)=>{Dm(e.layout,t.agentRunId),t.shellSessionId!==void 0&&rt(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=n$(t),s=ce.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;ig(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},xw=(e,t)=>{for(let r of EH(e.layout))ce.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:Nr(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),$n(t,r.agentRunId,()=>rw(e.layout,r.agentRunId),{awaitingInput:!0}),rt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Iw=(e,t,r,n)=>{let o=ce.get(r);if(o===void 0)return!1;Ew.add(r),Ll(r);let s=xl.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(QH(r))return!0;Dm(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${j$}`:"Stopped by user.";return Mr(e,t,r,n,M$,i,o.originalPrompt),!0}});var uJ,Ow,z$=l(()=>{"use strict";hi();uJ=()=>`http://127.0.0.1:${dt()}/restart`,Ow=async()=>{try{let e=await fetch(uJ(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var U$=l(()=>{"use strict";oa()});var B$=l(()=>{"use strict";r_()});var G$,V$=l(()=>{"use strict";G$=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Nl,pJ,Nw,q$=l(()=>{"use strict";U();ee();U$();wS();B$();V$();ro();Nl=(e,t)=>{Wr(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},pJ=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(rh(),th)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},Nw=async e=>{let t=_e(e.layout.installDir)?.bundleVersion??null;if(!G$({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(lt(e.layout)){Zs({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Nl(e.layout,{summary:r,action:"install-bundle-update-start"}),$t({launchAgentLabel:te(e.layout.installDir),installDir:e.layout.installDir});let n=await rs({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),Nl(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await pJ();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Nl(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),Nl(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),Nl(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var mJ,Mw,K$=l(()=>{"use strict";mJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Mw=e=>{if(!mJ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var jw,Dw,J$=l(()=>{"use strict";nS();oS();jw=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=$i({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},Dw=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Jt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var Y$,gJ,fJ,hJ,Ml,X$=l(()=>{"use strict";Y$=m(require("node:os"));Pe();gJ="Default",fJ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),hJ=e=>{let t=Y$.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Ml=()=>{let e=N(),t=Kc(e),r=fJ(gJ);return`${hJ(t)}/${r.length>0?r:"project"}`}});var Z$=l(()=>{"use strict";oa()});var Q$,Hw,eF=l(()=>{"use strict";Z$();Q$=!1,Hw=e=>{Q$||(Q$=!0,process.on("uncaughtException",t=>{bn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;bn(e,{kind:"crash",message:r,stack:n})}))}});var tF,yJ,$w,rF=l(()=>{"use strict";tF=require("node:child_process");Jm();ct();$m();Hm();wl();Fm();yJ=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,tF.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},$w=async e=>{if(!se(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&ve(e.runConfig.writerExecutionBackend)==="api"){let r=ze(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let n=me(e.layout.configPath),o=Ne(n,r),s=o!==null&&o.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await cr(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await yJ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var Fw,nF=l(()=>{"use strict";Fw=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var oF,zw,sF=l(()=>{"use strict";oF=require("node:crypto"),zw=()=>(0,oF.randomUUID)()});var hs,iF,ag=l(()=>{"use strict";hs="[[WORKING_ESTIMATE]]",iF=(e,t,r,n="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",hs,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var aF,lF=l(()=>{"use strict";aF=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var SJ,cF,dF=l(()=>{"use strict";ag();SJ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,cF=e=>{if(!e.includes(hs))return null;let t=null;for(let r of e.matchAll(SJ)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var AJ,Uw,uF=l(()=>{"use strict";dF();AJ=/^(\d{1,6})\b/,Uw=e=>{let t=cF(e);if(t!==null)return t;let r=AJ.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return!Number.isFinite(n)||n<=0?null:n}});var bJ,PJ,_J,lg,Bw=l(()=>{"use strict";ct();ta();bJ="http://127.0.0.1:11434",PJ=45e3,_J=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},lg=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||bJ,n=t===void 0?(await gt({commands:ie({})})).estimateModel:t;if(n===null||n.trim().length===0)return null;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:n,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(PJ)});return o.ok?_J(await o.json()):null}catch{return null}}});var Gw,Vw,qw,pF=l(()=>{"use strict";zs();ag();og();lF();uF();Za();Bw();Gw=async e=>{let t=Nr(e.wrappedPrompt),r=YM(e.reportsDir);return{estimateOutput:await lg(iF(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},Vw=e=>{let t=Uw(e.estimateOutput);t!==null&&im({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},qw=e=>{let t=Uw(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=aF(t);return $s({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Pt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),im({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var cg,mF,Kw=l(()=>{"use strict";cg="[[WORKING_TOKEN_ESTIMATE]]",mF=(e,t,r,n="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...n.trim().length>0?[n.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",cg,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var gF,wJ,fF,hF=l(()=>{"use strict";Kw();gF=/^(\d{1,8})\b/,wJ=e=>{let t=e.indexOf(cg);if(t<0)return null;let r=e.slice(t+cg.length).trim(),n=gF.exec(r);if(n===null)return null;let o=Number.parseInt(n[1]??"",10);return Number.isFinite(o)&&o>=1?o:null},fF=e=>{let t=wJ(e);if(t!==null)return t;let r=gF.exec(e.trim());if(r===null)return null;let n=Number.parseInt(r[1]??"",10);return Number.isFinite(n)&&n>=1?n:null}});var Jw,Yw,yF=l(()=>{"use strict";Kw();og();hF();Za();Bw();Jw=async e=>{let t=Nr(e.wrappedPrompt),r=QM(e.reportsDir);return{estimateOutput:await lg(mF(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},Yw=e=>{let t=fF(e.estimateOutput);return t===null?null:(XM({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var SF=l(()=>{"use strict";X_();yH();AH();wH();hi();F$();Jm();ct();Ww();Bm();z$();pS();q$();ro();K$();J$();zm();X$();eF();rF();id();nF();sF();ag();zs();pF();yF();nw();ta();Vm();yw()});var AF={};St(AF,{buildContinuationPromptWithContext:()=>LJ});var vJ,WJ,LJ,bF=l(()=>{"use strict";vJ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,WJ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),LJ=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=WJ(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${vJ(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var PF={};St(PF,{readHarnessExportSets:()=>RJ});var jl,Xw,dg,EJ,RJ,_F=l(()=>{"use strict";jl=m(require("node:fs")),Xw=m(require("node:path"));Pe();dg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),EJ=e=>{if(!jl.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(jl.default.readFileSync(e.harnessManifestPath,"utf8"));if(dg(t))return t}catch{return null}return null},RJ=(e,t)=>{let r=N(t),n=EJ(r);if(n===null)return[];let o=dg(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!dg(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!dg(p))continue;let f=typeof p.path=="string"?p.path:void 0,b=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(f===void 0||b.length===0||h.length===0||y.length===0)continue;let u=f.startsWith("shared/")?Xw.default.join(r.harnessRootDir,f):Xw.default.join(r.harnessSetsDir,i,f);jl.default.existsSync(u)&&d.push({id:b,kind:h,title:y,content:jl.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var ov,Qw,ys,wF,kJ,vF,WF,Zw,LF,ev,tv,rv,Y,z,nv,CJ,Dl,TJ,xJ,IJ,OJ,NJ,MJ,jJ,DJ,Hl,EF=l(()=>{"use strict";ov=require("node:child_process"),Qw=m(require("node:fs")),ys=m(require("node:os"));lH();U();ee();wo();g_();pH();ae();Ve();oa();IA();Pm();fm();pt();dn();OS();Bt();SF();wF=3e4,kJ=3e4,vF=new Map,WF=new Map,Zw=new Map,LF=new Map,ev=new Map,tv=new Map,rv=new Map,Y=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),z=(e,t,r)=>{e.readyState===hl.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Wr(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Uu(r,"out",t)))},nv=e=>e,CJ=e=>{if(!Qw.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Qw.default.readFileSync(e.harnessManifestPath,"utf8"));if(Y(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Dl=(e,t)=>{let r=CJ(t);r!==null&&z(e,{type:"harness.manifest.report",payload:{hostname:ys.default.hostname(),manifest:r}})},TJ=async(e,t,r,n,o,s,i=!1,a,c,d,p,f)=>{let b=f?.trim()??"";if(!se(t)){z(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let h=vl({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await gt({commands:ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?Gw({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,S=s!==void 0?Jw({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=Cl(t)&&!mw(t);if(A){try{await cr(e.layout.installDir,t)}catch($){let Oe=$ instanceof Error?$.message:String($);z(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Oe}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}kl(t)}else if(!Cl(t))try{await cr(e.layout.installDir,t)}catch($){let Oe=$ instanceof Error?$.message:String($);z(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Oe}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let g=di(d,Ml,f);if(g===null){z(o,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Ue({projectFolderPath:g,...b.length>0?{projectId:b}:{}}),i||nl(e.layout,t,g);let _=gm({sessionContinuation:i,supportsWriterSessionContinuation:Ym(t),isWriterConversationStarted:Xm(t)}),w=i&&_==="first"?rl(e.layout,t,g):null,W=w!==null?ts(e.layout,w):null,E=W!==null&&W.turns.length>0,R=zP({sessionContinuation:i,supportsWriterSessionContinuation:Ym(t),isWriterConversationStarted:Xm(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:E,userPromptCharacterCount:r.length}),C=r;if(R.continuationStrategy==="source_run_seed"){let $=typeof c=="string"&&c.length>0?Tl(e.layout,c):null;if($!==null){let{buildContinuationPromptWithContext:Oe}=await Promise.resolve().then(()=>(bF(),AF));C=Oe({priorPrompt:$.prompt,priorOutput:$.resultOutput??"",userMessage:r})}}else R.continuationStrategy==="transcript_seed"&&W!==null&&W.turns.length>0&&(C=cm({priorTurns:W.turns,userMessage:r}));let I=R.ragLimit>0?await Oo({layout:e.layout,query:C,limit:R.ragLimit,minScore:R.ragMinScore,projectFolderPath:g,...b.length>0?{projectId:b}:{}}):[],D=R.ragLimit>0&&g.trim().length>0?await TA({layout:e.layout,query:C,limit:2,minScore:.32,projectFolderPath:g,...b.length>0?{projectId:b}:{}}):[],oe=R.injectMemory?xP(e.layout,g,b.length>0?b:void 0):[],q=`${OP(oe,R.memoryEntryLimit)}${RA(I)}${xA(D)}${C}`,G=p?.trim()??(s!==void 0&&g.trim().length>0?zw():void 0);if(s!==void 0&&G!==void 0&&G.length>0&&g.trim().length>0){Fs({reportKey:G,agentRunId:s,userSummary:"Working on your Mac\u2026"});let $=q;u!==null&&u.then(Oe=>{if(Oe===null)return;let jr=qw({estimateOutput:Oe.estimateOutput??"",reportKey:G,agentRunId:s,reportsDir:e.layout.reportsDir,task:Oe.task,writerLabel:Oe.writerLabel,embedding:Oe.embedding});if(jr.estimateSeconds===null)return;kw(e.layout.reportsDir,s);let iv=`${hs}
${jr.estimateSeconds}
`;if(Mt(s)){z(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:iv},requestId:n});return}lr(s,iv)}).catch(()=>{}),q=Fw($),q=Ef(q,{agentRunId:s,reportKey:G,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then($=>{$!==null&&Vw({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel,embedding:$.embedding})}).catch(()=>{}),s!==void 0&&S!==null&&S.then($=>{$!==null&&Yw({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel})}).catch(()=>{});let $e=s!==void 0&&rv.get(s)===!0;if(s!==void 0&&g.trim().length>0){let $=await Su(g);tv.set(s,$),G!==void 0&&G.length>0&&ev.set(s,G)}ig(e,t,q,n,nv(o),s,{sessionTurn:R.sessionTurn},a,g,G,r,Oh(e.layout,s,$e)),A&&s!==void 0&&z(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:fw(t)},requestId:n})},xJ=async(e,t,r,n,o)=>{let s=(i,a)=>{z(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await hw({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,z(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:n})}}),c=se(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?gs(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},IJ=(e,t,r)=>new Promise(n=>{if(!se(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=wt(t,r,ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,ov.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),OJ=async(e,t,r,n)=>{if(t.installMethod!=="deterministic-bundle")return!1;z(n,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let o=Wt(t.bundle),s=Y(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(o!==null)return o;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=we(e.wsUrl)??zt,f=await by({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return f.ok?f.bundle:null})();if(i===null)return z(n,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=cn({bundle:i,layout:e.layout});return z(n,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Dl(n,e.layout),!0},NJ=async(e,t,r,n)=>{if(await OJ(e,t,r,n))return;let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(z(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){z(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!se(o)){z(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}Ys(e.layout);let i=await(async()=>{try{await cr(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return IJ(e,o,s)})().finally(()=>{Xs(e.layout)});z(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),Dl(n,e.layout)},MJ=e=>{let t=1e3*2**e;return Math.min(kJ,t)},jJ=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(lt(e.layout)){Kf(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,Ow().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1})}},n=(u,S="system.ack")=>{if(!t.selfUpdateInFlight){if(lt(e.layout)){Zs({layout:e.layout,remoteBundleVersion:u,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,Nw({layout:e.layout,remoteBundleVersion:u,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},o=()=>{let u=ge(e.layout);u!==null&&Te(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===hl.OPEN||u.readyState===hl.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(o,wF)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=MJ(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},f=u=>{s();let S=()=>{let A=Vs(e.layout.installDir),g=dt();z(u,{type:"agent.heartbeat",payload:{hostname:ys.default.hostname(),macOsUsername:ys.default.userInfo().username,wakeError:t.wakeError,wakePort:g,...e.email!==null?{email:e.email}:{},installBundleVersion:A}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,wF)},b=(u,S)=>{if(typeof u.type!="string")return;if(IS(u)){t.stopped=!0,s(),a(),c(),kS({layout:e.layout}).finally(()=>{Sl(),process.exit(0)});return}Wr(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),Uu(e.layout,"in",u);let A=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&Y(u.payload)){let g=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",_=typeof u.payload.origin=="string"?u.payload.origin:"",w=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",W=typeof u.payload.challenge=="string"?u.payload.challenge:"",E=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!m_({serverPublicKey:g,origin:_,devicePublicKey:w,challenge:W,serverAttestation:E})){t.wakeError="Server attestation verification failed",Wr(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&Y(u.payload)){let g=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Wr(e.layout,{direction:"local",type:"writer.ensure",summary:g,action:"ensure-writer"}),$w({layout:e.layout,writerAgent:g,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(_=>{z(S,{type:"writer.status",payload:_},e.layout)})}if(u.type==="install.bundle.update"&&Y(u.payload)){let g=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";g.length>0&&n(g,"install.bundle.update")}if(u.type==="system.ack"){Wu(e.layout,{wsUrl:e.wsUrl});let g=Y(u.payload)?u.payload:null,_=Mw(g);_!==null&&n(_)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&Y(u.payload)&&jw(u.payload),u.type==="automations.run"&&Y(u.payload)&&Dw(u.payload),u.type==="terminal.stream.accepted"&&Y(u.payload)){let g=typeof u.payload.runId=="string"?u.payload.runId:"";if(g.length>0){let _=lw(g);for(let w of _)z(S,{type:"terminal.stream.chunk",payload:{runId:g,chunk:w},requestId:A})}}if(u.type==="agent.agentRun.list"&&z(S,{type:"dashboard.agentRun.list.result",payload:{runs:vw(e.layout)},requestId:A}),u.type==="agent.agentRun.get"&&Y(u.payload)){let g=typeof u.payload.runId=="string"?u.payload.runId:"",_=g.length>0?Tl(e.layout,g):null;z(S,{type:"dashboard.agentRun.get.result",payload:{run:_},requestId:A})}if(u.type==="command.claude.run"&&Y(u.payload)){let g=u.payload.prompt,_=typeof u.payload.writerAgent=="string"&&se(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",w=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,W=u.payload.sessionContinuation===!0,E=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,R=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,C=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=di(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,Ml,C),D=Eh(u.payload.compositionSnapshot),oe=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof g=="string"&&g.trim().length>0){if(console.log(`[agent-witch] Running ${_} task (${W?"continue":"first"})\u2026`),I===null){z(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(D!==null){let q=kh(e.layout,D);if(q!==null){z(S,{type:"command.claude.result",payload:{exitCode:-1,output:q,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(w!==void 0){let G=Th(e.layout,w,D);if(!G.ok){z(S,{type:"command.claude.result",payload:{exitCode:-1,output:G.errorMessage,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}rv.set(w,D.entries.some($e=>$e.scope==="run"))}}w!==void 0&&R!==void 0&&vF.set(w,R),w!==void 0&&(WF.set(w,I),C!==void 0&&C.trim().length>0&&Zw.set(w,C.trim()),LF.set(w,g.trim()),Ue({projectFolderPath:I,...C!==void 0&&C.trim().length>0?{projectId:C.trim()}:{}})),TJ(e,_,g.trim(),A,S,w,W,R,E,I,oe,C)}}if(u.type==="shell.session.open"&&Y(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.cols=="number"?u.payload.cols:120,w=typeof u.payload.rows=="number"?u.payload.rows:32;g.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),pw({shellSessionId:g,cwd:e.workspace,cols:_,rows:w,send:W=>{z(S,W)},requestId:A}))}if(u.type==="shell.session.close"&&Y(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";g.length>0&&ms(g,_=>{z(S,_)},A)}if(u.type==="shell.input"&&Y(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.data=="string"?u.payload.data:"";g.length>0&&_.length>0&&cw(g,_)}if(u.type==="shell.resize"&&Y(u.payload)){let g=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",_=typeof u.payload.cols=="number"?u.payload.cols:0,w=typeof u.payload.rows=="number"?u.payload.rows:0;g.length>0&&_>0&&w>0&&dw(g,_,w)}if(u.type==="command.writer.session.end"&&Y(u.payload)){let g=u.payload.writerAgent;typeof g=="string"&&se(g)&&(gw(g),pm(e.layout,g))}if(u.type==="command.writer.session.start"&&Y(u.payload)){let g=u.payload.writerAgent,_=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof g=="string"&&se(g)&&_.length>0&&(console.log(`[agent-witch] Starting ${g} session\u2026`),xJ(e,g,_,A,S))}if(u.type==="command.claude.stop"&&Y(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";g.length>0&&(console.log(`[agent-witch] Stopping run ${g}\u2026`),Iw(e,nv(S),g,A))}if(u.type==="command.claude.input_respond"&&Y(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",_=typeof u.payload.response=="string"?u.payload.response.trim():"",w=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",W=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",E=typeof u.payload.question=="string"?u.payload.question:"";g.length>0&&_.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),Tw(e,{agentRunId:g,originalPrompt:w,partialOutput:W,question:E,response:_,shellSessionId:vF.get(g)},A,nv(S)))}if(u.type==="dispatch.approval.required"&&Y(u.payload)){let g=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",_=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${g}: ${_}`),process.platform==="darwin"&&(0,ov.spawn)("osascript",["-e",`display notification "${_.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${g.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&Y(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),NJ(e,u.payload,A,S)),u.type==="harness.export.request"&&Y(u.payload)){let g=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",_=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,w=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(W=>typeof W=="string"):[];g.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:W}=await Promise.resolve().then(()=>(_F(),PF)),E=W(w,e.email);z(S,{type:"harness.export.result",payload:{success:E.length>0,borrowerUserId:g,..._!==void 0?{targetDeviceId:_}:{},sets:E,errorMessage:E.length>0?void 0:"No readable harness sets were found on this machine."},requestId:A})})()}if(u.type==="harness.manifest.request"&&Dl(S,e.layout),u.type==="command.claude.result"&&Y(u.payload)){let g=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,_=typeof u.payload.output=="string"?u.payload.output:"",w=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,W=di(g!==void 0?WF.get(g):void 0,Ml),E=g!==void 0?Zw.get(g):void 0,R=g!==void 0?LF.get(g)??"":"",C=Ky({exitCode:w,output:_});if(C&&W!==null&&EA({layout:e.layout,text:_,source:g??"command.claude.result",projectFolderPath:W,...E!==void 0?{projectId:E}:{}}),w!=null&&w!==0&&_.trim().length>0&&W!==null&&(_A({layout:e.layout,errorText:_,projectFolderPath:W,...E!==void 0?{projectId:E}:{}}),CA({layout:e.layout,text:_,source:g??"command.claude.result.failure",projectFolderPath:W,...E!==void 0?{projectId:E}:{}})),C&&R.trim().length>0&&W!==null&&IP({layout:e.layout,projectFolderPath:W,...E!==void 0?{projectId:E}:{},entry:{id:`${Date.now()}-${g??"run"}`,...g!==void 0?{agentRunId:g}:{},prompt:R,output:_,createdAt:new Date().toISOString()}}),g!==void 0&&W!==null){let D=ev.get(g),oe=tv.get(g);D!==void 0&&oe!==void 0&&Su(W).then(q=>{let G=Jy({before:oe,after:q});Rf(D,G),tv.delete(g),ev.delete(g)})}if(C&&E!==void 0&&E.trim().length>0){let D=H(),oe=D===null?null:X({wsUrl:D.wsUrl,pairingToken:D.pairingToken});oe!==null&&Xy(oe,E,{...g!==void 0?{sourceRunId:g}:{},lesson:Yy({prompt:R,output:_})})}g!==void 0&&(pi(e.layout,g),rv.delete(g),Zw.delete(g))}},h=()=>{if(t.stopped)return;a(),c();let u=new hl(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Rw(X({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Cw(e.layout);let S=we(e.wsUrl)??"http://localhost:3000",A=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),g=p_({layout:e.layout,origin:S,...A!==void 0&&A.length>0?{claimToken:A}:{}});z(u,{type:"agent.register",payload:{role:"agent",hostname:ys.default.hostname(),macOsUsername:ys.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...g}},e.layout),Dl(u,e.layout),xw(e,u),f(u)}),u.on("message",S=>{let A=typeof S=="string"?S:S.toString("utf8");try{let g=JSON.parse(A);if(!Y(g))return;b(g,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(S,A)=>{s(),t.socket=void 0,t.wsConnected=!1,aS(e.layout),t.reconnectAttempt+=1;let g=typeof A=="string"?A:A.toString("utf8");bn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:g}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",S=>{t.wakeError=S.message,bn(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return qf(()=>{let u=Jf();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&n(u.remoteBundleVersion,u.trigger);let S=Yf();S!==null&&r(S)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Vi(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:ll(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Dl(u,e.layout),{ok:!0})}}},DJ=async()=>{Fe("agent-witch");let e=V_(),t=L();Y_().ok||(process.platform==="darwin"?(await qr(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),ew(t);let n=Q_({installDir:t});n.length>0&&console.log(`[agent-witch] Stopped ${n.length} sibling process(es): ${n.join(", ")}`),process.platform==="darwin"&&($t({launchAgentLabel:te(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Is());let o=await Uh(),s=o[0];s!==void 0&&Hw(s.layout);for(let h of o){let y=we(h.wsUrl)??zt;qs(h.layout.installDir,y)}let i=o.map(h=>jJ(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Sl(),process.exit(0));let c=()=>{o.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let S=ge(h.layout);lS(S,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=o[0]?.layout;h!==void 0&&(lt(h)||qi(h.installDir))},f=await tw({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):al({layout:o[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let b=Ft(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Os(),d()});d=()=>{b(),f.stop(),Sl(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Hl=DJ});var sv=l(()=>{"use strict";EF()});var RF={};St(RF,{startAgentWitchClient:()=>Hl});var HJ,kF=l(()=>{"use strict";sv();sv();Xn();kf();ld();HJ={};if(Yr(HJ.url)&&!at()){let e=process.argv.indexOf("report");e>=0&&process.exit(ad(process.argv.slice(e))),Hl()}});Wf();kf();ld();var DL="20.x",HL="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var kG=e=>[`Node.js ${DL} or newer is required (found ${e}).`,HL].join(" "),$L=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${kG(process.version)}
`),process.exit(1))};var UJ={},$J=async()=>{Fe("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(rh(),th)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},FJ=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(FC(),$C)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},zJ=async()=>{if(!Yr(UJ.url))return;$L();let e=process.argv.indexOf("report");e>=0&&process.exit(ad(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await $J();return}if(t==="wake"){await FJ();return}if(t==="bridge"){let{runAgentWitchBridgeCli:n}=await Promise.resolve().then(()=>(zT(),FT));await n();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:n}=await Promise.resolve().then(()=>(nD(),rD));n();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(kF(),RF));await r()};zJ();
