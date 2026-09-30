#!/usr/bin/env node
"use strict";var yF=Object.create;var Wg=Object.defineProperty;var SF=Object.getOwnPropertyDescriptor;var AF=Object.getOwnPropertyNames;var bF=Object.getPrototypeOf,PF=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var W=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},St=(e,t)=>{for(var r in t)Wg(e,r,{get:t[r],enumerable:!0})},wF=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of AF(t))!PF.call(e,n)&&n!==r&&Wg(e,n,{get:()=>t[n],enumerable:!(o=SF(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?yF(bF(e)):{},wF(t||!e||!e.__esModule?Wg(r,"default",{value:e,enumerable:!0}):r,e));var Yo=W(Lg=>{"use strict";Object.defineProperty(Lg,"__esModule",{value:!0});Lg.stringify=_F;function _F(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=W(Eg=>{"use strict";Object.defineProperty(Eg,"__esModule",{value:!0});Eg.generateTypeGuardError=vF;var vv=Yo();function vF(e,t,r){return(0,vv.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,vv.stringify)(e)}) to be "${r}"`}});var ur=W(Zl=>{"use strict";Object.defineProperty(Zl,"__esModule",{value:!0});Zl.isNonNullObject=void 0;var WF=O(),LF=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,WF.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Zl.isNonNullObject=LF});var At=W(me=>{"use strict";Object.defineProperty(me,"__esModule",{value:!0});me.attachTypeGuardMeta=me.isArrayTypeGuard=me.isNestedObjectTypeGuard=me.getTypeGuardWrapperKind=me.getTypeGuardInnerGuard=me.getTypeGuardItemGuard=me.getTypeGuardSchema=void 0;var EF=e=>e.schema;me.getTypeGuardSchema=EF;var RF=e=>e.itemGuard;me.getTypeGuardItemGuard=RF;var CF=e=>e.innerGuard;me.getTypeGuardInnerGuard=CF;var kF=e=>e.wrapperKind;me.getTypeGuardWrapperKind=kF;var xF=e=>{if((0,me.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};me.isNestedObjectTypeGuard=xF;var TF=e=>{if((0,me.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};me.isArrayTypeGuard=TF;var IF=(e,t)=>Object.assign(e,t);me.attachTypeGuardMeta=IF});var Ls=W($r=>{"use strict";Object.defineProperty($r,"__esModule",{value:!0});$r.getExpectedTypeName=$r.getTypeGuardDisplayName=void 0;var Wv=At(),OF=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};$r.getTypeGuardDisplayName=OF;var MF=e=>{let t=(0,Wv.getTypeGuardWrapperKind)(e),r=(0,Wv.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,$r.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};$r.getExpectedTypeName=MF});var zr=W(Ql=>{"use strict";Object.defineProperty(Ql,"__esModule",{value:!0});Ql.createValidationResult=void 0;var NF=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Ql.createValidationResult=NF});var Xo=W(ec=>{"use strict";Object.defineProperty(ec,"__esModule",{value:!0});ec.createValidationError=void 0;var jF=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});ec.createValidationError=jF});var Zo=W(tc=>{"use strict";Object.defineProperty(tc,"__esModule",{value:!0});tc.createTreeNode=void 0;var DF=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});tc.createTreeNode=DF});var Es=W(rc=>{"use strict";Object.defineProperty(rc,"__esModule",{value:!0});rc.combineResults=void 0;var HF=zr(),$F=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,HF.createValidationResult)(r,o,n)};rc.combineResults=$F});var nc=W(oc=>{"use strict";Object.defineProperty(oc,"__esModule",{value:!0});oc.createSimplifiedTree=void 0;var Lv=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=Lv(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},zF=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=Lv(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};oc.createSimplifiedTree=zF});var Cs=W(ic=>{"use strict";Object.defineProperty(ic,"__esModule",{value:!0});ic.validateObject=void 0;var FF=ur(),Rs=zr(),UF=Xo(),sc=Zo(),BF=Es(),Ev=ac(),GF=(e,t,r)=>{let o=()=>{let i=(0,UF.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,sc.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Rs.createValidationResult)(!1,[],a):(0,Rs.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Rs.createValidationResult)(!0,[],(0,sc.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,S=t[g],h=e[g],y=(0,Ev.validateProperty)(g,h,S,r);return y.valid?p.length===0?(0,Rs.createValidationResult)(!0,[],(0,sc.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,Ev.validateProperty)(d,e[d],p,r)}),a=(0,BF.combineResults)(i,r.path),c=(0,sc.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,Rs.createValidationResult)(a.valid,a.errors,c)};return(0,FF.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};ic.validateObject=GF});var Cv=W(dc=>{"use strict";Object.defineProperty(dc,"__esModule",{value:!0});dc.validateArray=void 0;var VF=Yo(),lc=zr(),Rv=Xo(),cc=Zo(),qF=Es(),KF=Cs(),JF=Ls(),YF=At(),XF=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,Rv.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,cc.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,lc.createValidationResult)(!1,[c],d)}let n=(0,YF.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,g={path:p,config:r.config||null};if(n)return(0,KF.validateObject)(c,n,g);let S=t(c,null),h=(0,JF.getExpectedTypeName)(t),y=(0,VF.stringify)(c);if(S)return(0,lc.createValidationResult)(!0,[],(0,cc.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,A=(0,Rv.createValidationError)(p,h,c,u),b=(0,cc.createTreeNode)(p,!1,h,c);return b.errors=[A],(0,lc.createValidationResult)(!1,[A],b)}),i=(0,qF.combineResults)(s,o),a=(0,cc.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,lc.createValidationResult)(i.valid,i.errors,a)};dc.validateArray=XF});var ac=W(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.validateProperty=void 0;var kv=zr(),ZF=Xo(),xv=Zo(),QF=Ls(),uc=At(),e1=Cs(),t1=Cv(),r1=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,uc.getTypeGuardSchema)(r),c=(0,uc.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,e1.validateObject)(t,a,s);if(c&&(0,uc.isArrayTypeGuard)(r))return(0,t1.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),S=(0,QF.getExpectedTypeName)(r);return g?(0,kv.createValidationResult)(!0,[],(0,xv.createTreeNode)(n,!0,S,t)):(()=>{let h=(0,ZF.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,xv.createTreeNode)(n,!1,S,t);return y.errors=[h],(0,kv.createValidationResult)(!1,[h],y)})()};if((0,uc.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};pc.validateProperty=r1});var gc=W(mc=>{"use strict";Object.defineProperty(mc,"__esModule",{value:!0});mc.isNil=void 0;var o1=O(),n1=function(e,t){return e!=null?(t&&t.callbackOnError((0,o1.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};mc.isNil=n1});var Rg=W(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.isDefined=void 0;var s1=O(),i1=gc(),a1=function(e,t){return(0,i1.isNil)(e,null)?(t&&t.callbackOnError((0,s1.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};fc.isDefined=a1});var Cg=W(hc=>{"use strict";Object.defineProperty(hc,"__esModule",{value:!0});hc.reportValidationResults=void 0;var l1=nc(),Tv=Rg(),c1=gc(),d1=(e,t)=>{if(e.valid===!0||(0,c1.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,Tv.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,l1.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,Tv.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};hc.reportValidationResults=d1});var kg=W(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.Validation=Q.reportValidationResults=Q.validateObject=Q.validateProperty=Q.createSimplifiedTree=Q.combineResults=Q.createTreeNode=Q.createValidationError=Q.createValidationResult=Q.getExpectedTypeName=void 0;var u1=Ls();Object.defineProperty(Q,"getExpectedTypeName",{enumerable:!0,get:function(){return u1.getExpectedTypeName}});var p1=zr();Object.defineProperty(Q,"createValidationResult",{enumerable:!0,get:function(){return p1.createValidationResult}});var m1=Xo();Object.defineProperty(Q,"createValidationError",{enumerable:!0,get:function(){return m1.createValidationError}});var g1=Zo();Object.defineProperty(Q,"createTreeNode",{enumerable:!0,get:function(){return g1.createTreeNode}});var f1=Es();Object.defineProperty(Q,"combineResults",{enumerable:!0,get:function(){return f1.combineResults}});var h1=nc();Object.defineProperty(Q,"createSimplifiedTree",{enumerable:!0,get:function(){return h1.createSimplifiedTree}});var y1=ac();Object.defineProperty(Q,"validateProperty",{enumerable:!0,get:function(){return y1.validateProperty}});var S1=Cs();Object.defineProperty(Q,"validateObject",{enumerable:!0,get:function(){return S1.validateObject}});var A1=Cg();Object.defineProperty(Q,"reportValidationResults",{enumerable:!0,get:function(){return A1.reportValidationResults}});var b1=zr(),P1=Es(),w1=Xo(),_1=Zo(),v1=ac(),W1=Cs(),L1=Cg(),E1=nc();Q.Validation={result:b1.createValidationResult,combine:P1.combineResults,error:w1.createValidationError,treeNode:_1.createTreeNode,property:v1.validateProperty,object:W1.validateObject,report:L1.reportValidationResults,createSimplifiedTree:E1.createSimplifiedTree}});var yc=W(xg=>{"use strict";Object.defineProperty(xg,"__esModule",{value:!0});xg.isType=C1;var Iv=ur(),Ov=kg(),R1=At();function C1(e){if(!(0,Iv.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,Ov.validateObject)(r,e,s);return(0,Ov.reportValidationResults)(i,o||null),i.valid}return(0,Iv.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,R1.attachTypeGuardMeta)(t,{schema:e})}});var Dv=W(Fr=>{"use strict";Object.defineProperty(Fr,"__esModule",{value:!0});Fr.isNestedType=Fr.isShape=void 0;Fr.isSchema=ks;var Mv=ur(),Nv=kg(),jv=At();function ks(e){if(!(0,Mv.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=x1(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,Nv.validateObject)(o,t,i);return(0,Nv.reportValidationResults)(a,n||null),a.valid}return(0,Mv.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,jv.attachTypeGuardMeta)(r,{schema:t})}function k1(e){return typeof e=="function"?e:Array.isArray(e)?T1(e):typeof e=="object"&&e!==null?ks(e):e}function x1(e){let t={};for(let[r,o]of Object.entries(e))t[r]=k1(o);return t}function T1(e){let t=e[0],r=ks(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,jv.attachTypeGuardMeta)(o,{itemGuard:r})}Fr.isShape=ks;Fr.isNestedType=ks});var Hv=W(Tg=>{"use strict";Object.defineProperty(Tg,"__esModule",{value:!0});Tg.isObjectWith=O1;var I1=yc();function O1(e){return(0,I1.isType)(e)}});var $v=W(Ig=>{"use strict";Object.defineProperty(Ig,"__esModule",{value:!0});Ig.isObject=N1;var M1=yc();function N1(e){return(0,M1.isType)(e)}});var zv=W(Og=>{"use strict";Object.defineProperty(Og,"__esModule",{value:!0});Og.guardWithTolerance=j1;function j1(e,t,r){return t(e,r),e}});var Fv=W(Mg=>{"use strict";Object.defineProperty(Mg,"__esModule",{value:!0});Mg.isBranded=H1;var D1=O();function H1(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,D1.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var Uv=W(Sc=>{"use strict";Object.defineProperty(Sc,"__esModule",{value:!0});Sc.BrandSymbols=void 0;Sc.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var Bv=W(Ac=>{"use strict";Object.defineProperty(Ac,"__esModule",{value:!0});Ac.isAny=void 0;var $1=function(e){return!0};Ac.isAny=$1});var xs=W(Ng=>{"use strict";Object.defineProperty(Ng,"__esModule",{value:!0});Ng.reportTypeGuardError=F1;var z1=O();function F1(e,t,r){e&&e.callbackOnError((0,z1.generateTypeGuardError)(t,e.identifier,r))}});var Gv=W(bc=>{"use strict";Object.defineProperty(bc,"__esModule",{value:!0});bc.isBoolean=void 0;var U1=xs(),B1=function(t,r){return typeof t!="boolean"?((0,U1.reportTypeGuardError)(r,t,"boolean"),!1):!0};bc.isBoolean=B1});var Vv=W(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.isDate=void 0;var G1=O(),V1=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,G1.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Pc.isDate=V1});var jg=W(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.isNumber=void 0;var q1=xs(),K1=function(t,r){return typeof t!="number"||isNaN(t)?((0,q1.reportTypeGuardError)(r,t,"number"),!1):!0};wc.isNumber=K1});var qv=W(_c=>{"use strict";Object.defineProperty(_c,"__esModule",{value:!0});_c.isString=void 0;var J1=xs(),Y1=function(t,r){return typeof t!="string"?((0,J1.reportTypeGuardError)(r,t,"string"),!1):!0};_c.isString=Y1});var Kv=W(vc=>{"use strict";Object.defineProperty(vc,"__esModule",{value:!0});vc.isUnknown=void 0;var X1=function(e){return!0};vc.isUnknown=X1});var Jv=W(Wc=>{"use strict";Object.defineProperty(Wc,"__esModule",{value:!0});Wc.isFunction=void 0;var Z1=O(),Q1=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,Z1.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Wc.isFunction=Q1});var Xv=W(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.isFile=void 0;var Yv=O(),eU=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,Yv.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,Yv.generateTypeGuardError)(e,t.identifier,"File")),!1)};Lc.isFile=eU});var Qv=W(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.isFileList=void 0;var Zv=O(),tU=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,Zv.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,Zv.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Ec.isFileList=tU});var tW=W(Rc=>{"use strict";Object.defineProperty(Rc,"__esModule",{value:!0});Rc.isBlob=void 0;var eW=O(),rU=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,eW.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,eW.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Rc.isBlob=rU});var oW=W(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.isFormData=void 0;var rW=O(),oU=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,rW.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,rW.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Cc.isFormData=oU});var sW=W(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.isURL=void 0;var nW=O(),nU=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,nW.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,nW.generateTypeGuardError)(e,t.identifier,"URL")),!1)};kc.isURL=nU});var aW=W(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.isURLSearchParams=void 0;var iW=O(),sU=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,iW.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,iW.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};xc.isURLSearchParams=sU});var lW=W(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.isMap=void 0;var iU=O(),aU=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,iU.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Tc.isMap=aU});var cW=W(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.isSet=void 0;var lU=O(),cU=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,lU.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Ic.isSet=cU});var dW=W(Dg=>{"use strict";Object.defineProperty(Dg,"__esModule",{value:!0});Dg.isIndexSignature=uU;var dU=O();function uU(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,dU.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),h=t(g,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return S&&h})}}});var uW=W(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.isError=void 0;var pU=xs(),mU=function(t,r){return t instanceof Error?!0:((0,pU.reportTypeGuardError)(r,t,"Error"),!1)};Oc.isError=mU});var $g=W(Hg=>{"use strict";Object.defineProperty(Hg,"__esModule",{value:!0});Hg.isArrayWithEachItem=hU;var gU=O(),fU=At();function hU(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,gU.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,fU.attachTypeGuardMeta)(t,{itemGuard:e})}});var zg=W(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.isNonEmptyArray=void 0;var yU=O(),SU=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,yU.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Mc.isNonEmptyArray=SU});var pW=W(Fg=>{"use strict";Object.defineProperty(Fg,"__esModule",{value:!0});Fg.isNonEmptyArrayWithEachItem=PU;var AU=$g(),bU=zg();function PU(e){return function(t,r){return(0,AU.isArrayWithEachItem)(e)(t,r)&&(0,bU.isNonEmptyArray)(t,r)}}});var gW=W(Ug=>{"use strict";Object.defineProperty(Ug,"__esModule",{value:!0});Ug.isTuple=wU;var mW=O();function wU(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,mW.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,mW.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var fW=W(Bg=>{"use strict";Object.defineProperty(Bg,"__esModule",{value:!0});Bg.isObjectWithEachItem=vU;var _U=O();function vU(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,_U.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var hW=W(Gg=>{"use strict";Object.defineProperty(Gg,"__esModule",{value:!0});Gg.isPartialOf=LU;var WU=ur();function LU(e){return function(t,r){if(!(0,WU.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var yW=W(Vg=>{"use strict";Object.defineProperty(Vg,"__esModule",{value:!0});Vg.isPick=RU;var EU=ur();function RU(e,...t){return function(r,o){if(!(0,EU.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var SW=W(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.isOmit=kU;var CU=ur();function kU(e,...t){return function(r,o){if(!(0,CU.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),S=g>=0?p.slice(0,g):p;if(a.has(S))return!1;let h=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var AW=W(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.isNonEmptyString=void 0;var xU=O(),TU=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,xU.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Nc.isNonEmptyString=TU});var bW=W(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.isNonNegativeNumber=void 0;var IU=O(),OU=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,IU.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};jc.isNonNegativeNumber=OU});var PW=W(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.isPositiveNumber=void 0;var MU=O(),NU=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,MU.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Dc.isPositiveNumber=NU});var wW=W(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.isNonPositiveNumber=void 0;var jU=O(),DU=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,jU.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Hc.isNonPositiveNumber=DU});var _W=W($c=>{"use strict";Object.defineProperty($c,"__esModule",{value:!0});$c.isNegativeNumber=void 0;var HU=O(),$U=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,HU.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};$c.isNegativeNumber=$U});var vW=W(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.isInteger=void 0;var zU=O(),FU=jg(),UU=function(e,t){return!(0,FU.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,zU.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};zc.isInteger=UU});var WW=W(Fc=>{"use strict";Object.defineProperty(Fc,"__esModule",{value:!0});Fc.isPositiveInteger=void 0;var BU=O(),GU=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,BU.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Fc.isPositiveInteger=GU});var LW=W(Uc=>{"use strict";Object.defineProperty(Uc,"__esModule",{value:!0});Uc.isNegativeInteger=void 0;var VU=O(),qU=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,VU.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Uc.isNegativeInteger=qU});var EW=W(Bc=>{"use strict";Object.defineProperty(Bc,"__esModule",{value:!0});Bc.isNonNegativeInteger=void 0;var KU=O(),JU=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,KU.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Bc.isNonNegativeInteger=JU});var RW=W(Gc=>{"use strict";Object.defineProperty(Gc,"__esModule",{value:!0});Gc.isNonPositiveInteger=void 0;var YU=O(),XU=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,YU.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Gc.isNonPositiveInteger=XU});var CW=W(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.isNumeric=void 0;var Vc=O(),ZU=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Vc.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Vc.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Vc.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Vc.generateTypeGuardError)(e,t.identifier,"number key")),!1};qc.isNumeric=ZU});var kW=W(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.isBooleanLike=void 0;var Kg=O(),QU=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Kg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Kg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Kc.isBooleanLike=QU});var xW=W(Jc=>{"use strict";Object.defineProperty(Jc,"__esModule",{value:!0});Jc.isDateLike=void 0;var Ts=O(),eB=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Ts.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Ts.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Ts.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Ts.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Ts.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Jc.isDateLike=eB});var TW=W(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.isBigInt=void 0;var tB=O(),rB=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,tB.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Yc.isBigInt=rB});var Yg=W(Jg=>{"use strict";Object.defineProperty(Jg,"__esModule",{value:!0});Jg.isOneOf=oB;var IW=Yo();function oB(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,IW.stringify)(t)}) must be one of following values ${e.map(IW.stringify).join(" | ")}`),o}}});var OW=W(Xg=>{"use strict";Object.defineProperty(Xg,"__esModule",{value:!0});Xg.isOneOfTypes=iB;var nB=Yo(),sB=Ls();function iB(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,nB.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,sB.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var MW=W(Zg=>{"use strict";Object.defineProperty(Zg,"__esModule",{value:!0});Zg.isIntersectionOf=aB;function aB(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var NW=W(Qg=>{"use strict";Object.defineProperty(Qg,"__esModule",{value:!0});Qg.isExtensionOf=lB;function lB(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var jW=W(ef=>{"use strict";Object.defineProperty(ef,"__esModule",{value:!0});ef.isNullOr=dB;var cB=At();function dB(e){function t(r,o){return r===null?!0:e(r,o)}return(0,cB.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var DW=W(tf=>{"use strict";Object.defineProperty(tf,"__esModule",{value:!0});tf.isUndefinedOr=pB;var uB=At();function pB(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,uB.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var HW=W(rf=>{"use strict";Object.defineProperty(rf,"__esModule",{value:!0});rf.isNilOr=gB;var mB=At();function gB(e){function t(r,o){return r==null?!0:e(r,o)}return(0,mB.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var $W=W(of=>{"use strict";Object.defineProperty(of,"__esModule",{value:!0});of.isAsserted=fB;function fB(e){return!0}});var zW=W(nf=>{"use strict";Object.defineProperty(nf,"__esModule",{value:!0});nf.isEnum=yB;var hB=Yg();function yB(e){return function(t,r){return(0,hB.isOneOf)(...Object.values(e))(t,r)}}});var FW=W(sf=>{"use strict";Object.defineProperty(sf,"__esModule",{value:!0});sf.isEqualTo=bB;var SB=O(),AB=Yo();function bB(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,SB.generateTypeGuardError)(t,r.identifier,`equal to ${(0,AB.stringify)(e)}`)),!1):!0}}});var UW=W(Xc=>{"use strict";Object.defineProperty(Xc,"__esModule",{value:!0});Xc.isRegex=void 0;var PB=O(),wB=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,PB.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Xc.isRegex=wB});var GW=W(af=>{"use strict";Object.defineProperty(af,"__esModule",{value:!0});af.isPattern=_B;var BW=O();function _B(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,BW.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,BW.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var VW=W(lf=>{"use strict";Object.defineProperty(lf,"__esModule",{value:!0});lf.by=vB;function vB(e){return function(t){return e(t,null)}}});var qW=W(cf=>{"use strict";Object.defineProperty(cf,"__esModule",{value:!0});cf.toNumber=WB;function WB(e){return typeof e=="number"?e:Number(e)}});var KW=W(df=>{"use strict";Object.defineProperty(df,"__esModule",{value:!0});df.toDate=LB;function LB(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var JW=W(uf=>{"use strict";Object.defineProperty(uf,"__esModule",{value:!0});uf.toBoolean=EB;function EB(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var YW=W(Zc=>{"use strict";Object.defineProperty(Zc,"__esModule",{value:!0});Zc.isSymbol=void 0;var RB=O(),CB=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,RB.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Zc.isSymbol=CB});var Is=W(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var kB=yc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return kB.isType}});var pf=Dv();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return pf.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return pf.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return pf.isNestedType}});var xB=Hv();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return xB.isObjectWith}});var TB=$v();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return TB.isObject}});var IB=zv();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return IB.guardWithTolerance}});var OB=Fv();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return OB.isBranded}});var MB=Uv();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return MB.BrandSymbols}});var NB=Bv();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return NB.isAny}});var jB=Gv();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return jB.isBoolean}});var DB=Vv();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return DB.isDate}});var HB=Rg();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return HB.isDefined}});var $B=gc();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return $B.isNil}});var zB=jg();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return zB.isNumber}});var FB=qv();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return FB.isString}});var UB=Kv();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return UB.isUnknown}});var BB=Jv();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return BB.isFunction}});var GB=Xv();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return GB.isFile}});var VB=Qv();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return VB.isFileList}});var qB=tW();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return qB.isBlob}});var KB=oW();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return KB.isFormData}});var JB=sW();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return JB.isURL}});var YB=aW();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return YB.isURLSearchParams}});var XB=lW();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return XB.isMap}});var ZB=cW();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return ZB.isSet}});var QB=dW();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return QB.isIndexSignature}});var eG=uW();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return eG.isError}});var tG=$g();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return tG.isArrayWithEachItem}});var rG=zg();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return rG.isNonEmptyArray}});var oG=pW();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return oG.isNonEmptyArrayWithEachItem}});var nG=gW();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return nG.isTuple}});var sG=ur();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return sG.isNonNullObject}});var iG=fW();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return iG.isObjectWithEachItem}});var aG=hW();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return aG.isPartialOf}});var lG=yW();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return lG.isPick}});var cG=SW();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return cG.isOmit}});var dG=AW();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return dG.isNonEmptyString}});var uG=bW();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return uG.isNonNegativeNumber}});var pG=PW();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return pG.isPositiveNumber}});var mG=wW();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return mG.isNonPositiveNumber}});var gG=_W();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return gG.isNegativeNumber}});var fG=vW();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return fG.isInteger}});var hG=WW();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return hG.isPositiveInteger}});var yG=LW();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return yG.isNegativeInteger}});var SG=EW();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return SG.isNonNegativeInteger}});var AG=RW();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return AG.isNonPositiveInteger}});var bG=CW();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return bG.isNumeric}});var PG=kW();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return PG.isBooleanLike}});var wG=xW();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return wG.isDateLike}});var _G=TW();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return _G.isBigInt}});var vG=Yg();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return vG.isOneOf}});var WG=OW();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return WG.isOneOfTypes}});var LG=MW();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return LG.isIntersectionOf}});var EG=NW();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return EG.isExtensionOf}});var RG=jW();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return RG.isNullOr}});var CG=DW();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return CG.isUndefinedOr}});var kG=HW();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return kG.isNilOr}});var xG=$W();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return xG.isAsserted}});var TG=zW();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return TG.isEnum}});var IG=FW();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return IG.isEqualTo}});var OG=UW();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return OG.isRegex}});var MG=GW();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return MG.isPattern}});var NG=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return NG.generateTypeGuardError}});var jG=VW();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return jG.by}});var DG=qW();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return DG.toNumber}});var HG=KW();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return HG.toDate}});var $G=JW();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return $G.toBoolean}});var zG=YW();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return zG.isSymbol}})});var Os,XW,ZW,Ur,mf,d9,QW,Qc,Br,Ms,gf,ff,hf,yf,Nt,Sf,ed,td,rd,Ns,rt,Qo,en,od,pr,Af,eL,bt=l(()=>{"use strict";Os={production:".agent-witch",localhost:".local-agent-witch"},XW={production:47892,localhost:47893},ZW={production:"com.agent-witch",localhost:"com.local-agent-witch"},Ur={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},mf="app",d9=`${mf}/agent-witch.js`,QW=`${mf}/command`,Qc={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Br=Os.production,Ms=Os.localhost,gf=XW.production,ff=XW.localhost,hf=ZW.production,yf=ZW.localhost,Nt="profiles",Sf=Ur.activeProfile,ed="harness",td="sets",rd="manifest.json",Ns=Qc.projectsDir,rt=Qc.logsDir,Qo="agent-witch.log",en="agent-witch.error.log",od=Qc.reportsDir,pr=Qc.deviceKeypairJson,Af=mf,eL="agent-witch.js"});var nd,tL,UG,FG,rL,oL=l(()=>{"use strict";nd=m(require("node:path")),tL=require("node:url"),UG={},FG=()=>!0,rL=()=>{if(FG()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return nd.default.dirname(nd.default.resolve(e))}return nd.default.dirname((0,tL.fileURLToPath)(UG.url))}});var bf,nL,N,sL,BG,mr,E,sd,jt,iL,id,tn,ad,ld,oe,ot,Pf,nt,wf,M,_f=l(()=>{"use strict";bf=m(require("node:fs")),nL=m(require("node:os")),N=m(require("node:path")),sL=m(Is());bt();oL();BG=rL(),mr=e=>e.trim().toLowerCase(),E=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return N.default.resolve(e);let t=N.default.resolve(BG),r=N.default.basename(t),o=N.default.basename(N.default.dirname(t));return r===Af&&(o===Br||o===Ms)?N.default.dirname(t):r===Br||r===Ms?t:N.default.join(nL.default.homedir(),Br)},sd=(e=E())=>N.default.join(e,Af),jt=(e=E())=>N.default.join(sd(e),eL),iL=(e,t,r)=>t!==null?N.default.join(e,Nt,t,r):N.default.join(e,r),id=e=>iL(e.installDir,e.profileEmail,Ns),tn=e=>iL(e.installDir,e.profileEmail,rt),ad=e=>e.profileEmail!==null?N.default.join(e.installDir,Nt,e.profileEmail,pr):N.default.join(e.installDir,pr),ld=e=>N.default.basename(e)===Ms,oe=(e=E())=>ld(e)?yf:hf,ot=(e=E())=>ld(e)?ff:gf,Pf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return mr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?mr(t):null},nt=(e=E())=>{let t=N.default.join(e,Sf);if(!bf.default.existsSync(t))return null;try{let r=JSON.parse(bf.default.readFileSync(t,"utf8"));if((0,sL.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return mr(r.email)}catch{return null}return null},wf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?mr(r):null}let t=Pf();return t!==null?t:nt()},M=e=>{let t=E(),r=sd(t),o=jt(t),n=wf(e);if(n!==null){let S=N.default.join(t,Nt,n),h=N.default.join(S,ed),y=N.default.join(S,Ns),u=N.default.join(S,rt),A=N.default.join(S,od),b=N.default.join(S,pr),f=N.default.join(S,rt,Qo),w=N.default.join(S,rt,en);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:u,mainLogPath:f,errorLogPath:w,reportsDir:A,deviceKeypairPath:b,configPath:N.default.join(S,"config.json"),harnessRootDir:h,harnessManifestPath:N.default.join(h,rd),harnessSetsDir:N.default.join(h,td)}}let s=N.default.join(t,ed),i=N.default.join(t,Ns),a=N.default.join(t,rt),c=N.default.join(t,od),d=N.default.join(t,pr),p=N.default.join(t,rt,Qo),g=N.default.join(t,rt,en);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:g,reportsDir:c,deviceKeypairPath:d,configPath:N.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:N.default.join(s,rd),harnessSetsDir:N.default.join(s,td)}}});var vf,aL,GG,VG,lL,Wf,cL=l(()=>{"use strict";vf=m(require("node:fs")),aL=m(require("node:path"));bt();_f();GG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VG=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,lL=e=>{let t=aL.default.join(e,Ur.wakePort);if(!vf.default.existsSync(t))return null;try{let r=JSON.parse(vf.default.readFileSync(t,"utf8"));if(GG(r)&&VG(r.wakePort))return r.wakePort}catch{return null}return null},Wf=(e=E())=>lL(e)??ot(e)});var V=l(()=>{"use strict";_f();cL()});var js,XG,ZG,dL,QG,e2,uL=l(()=>{"use strict";V();js=oe(),XG=`${js}-wake`,ZG=`${js}-live`,dL=`${js}-watchdog`,QG=`${js}-automation-scheduler`,e2=`${js}-updater`});var Lf,Ef,cd=l(()=>{"use strict";Lf=new Set(["","loginwindow","_mbsetupuser","root"]),Ef=5e3});var pL,t2,mL,Rf,Cf=l(()=>{"use strict";pL=require("node:child_process");cd();t2=e=>e.trim().toLowerCase(),mL=e=>e==null?!1:!Lf.has(t2(e)),Rf=()=>{if(process.platform!=="darwin")return null;try{let t=(0,pL.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return mL(t)?t:null}catch{return null}}});var fL,gL,st,Ds=l(()=>{"use strict";fL=m(require("node:os"));Cf();gL=e=>e.trim().toLowerCase(),st=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Rf():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??fL.default.userInfo().username;return gL(r)===gL(o)}});var hL,yL,Gr,SL=l(()=>{"use strict";hL=require("node:child_process"),yL=m(require("node:fs"));V();Ds();Gr=(e=E())=>{let t=jt(e);if(!yL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!st())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=nt(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,hL.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var AL,Hs,dd=l(()=>{"use strict";AL=require("node:child_process"),Hs=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,AL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var ud,kf,bL,ee,pd,$s=l(()=>{"use strict";ud=m(require("node:fs")),kf=m(require("node:path"));V();bt();bL=e=>{let t=kf.default.join(e,Nt);return ud.default.existsSync(t)?ud.default.readdirSync(t).filter(r=>ud.default.statSync(kf.default.join(t,r)).isDirectory()).map(r=>mr(r)).toSorted():[]},ee=(e=E())=>{let t=oe(e);return[{profileEmail:bL(e)[0]??null,launchAgentLabel:t}]},pd=(e=E())=>bL(e)});var xf,PL,wL,r2,Dt,md=l(()=>{"use strict";xf=m(require("node:fs")),PL=m(require("node:os")),wL=m(require("node:path"));V();$s();r2=()=>wL.default.join(PL.default.homedir(),"Library","LaunchAgents"),Dt=(e=E())=>{let t=oe(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ee(e))r.add(n.launchAgentLabel);let o=r2();if(xf.default.existsSync(o))for(let n of xf.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var _L,zs,vL=l(()=>{"use strict";V();dd();md();$s();_L=(e=E())=>{let t=new Set(ee(e).map(r=>r.launchAgentLabel));return Dt(e).filter(r=>!t.has(r))},zs=(e=E())=>{for(let t of _L(e))Hs(t)}});var Fs,Tf=l(()=>{"use strict";V();dd();md();Fs=(e=E())=>{for(let t of Dt(e))Hs(t)}});var WL,LL,o2,Vr,EL=l(()=>{"use strict";WL=require("node:child_process"),LL=require("node:util"),o2=(0,LL.promisify)(WL.execFile),Vr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await o2("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var qr,n2,If,Of=l(()=>{"use strict";qr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n2=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,If=e=>{let t=e.pathValue??n2(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
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
`}});var gd,Mf=l(()=>{"use strict";gd=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Kr,Nf,Us,s2,i2,a2,RL,Ht,jf=l(()=>{"use strict";Kr=m(require("node:fs")),Nf=m(require("node:os")),Us=m(require("node:path"));bt();V();Of();Mf();s2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),i2=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,a2=e=>{let t=Us.default.join(e,Ur.wakePort);if(!Kr.default.existsSync(t))return ot(e);try{let r=JSON.parse(Kr.default.readFileSync(t,"utf8"));if(s2(r)&&i2(r.wakePort))return r.wakePort}catch{return ot(e)}return ot(e)},RL=(e,t=Nf.default.homedir())=>Us.default.join(t,"Library","LaunchAgents",`${e}.plist`),Ht=e=>{let t=e.installDir??E(),r=e.homeDir??Nf.default.homedir(),o=RL(e.launchAgentLabel,r),n=Kr.default.existsSync(o)?Kr.default.readFileSync(o,"utf8"):null;if(n!==null&&gd(n))return{ok:!0,rewritten:!1,plistPath:o};let s=If({launchAgentLabel:e.launchAgentLabel,runPath:Us.default.join(t,QW,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??a2(t)});if(!gd(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Kr.default.mkdirSync(Us.default.dirname(o),{recursive:!0}),Kr.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var kL,xL,TL,Bs,l2,c2,CL,ve,Df=l(()=>{"use strict";kL=require("node:child_process"),xL=m(require("node:fs")),TL=require("node:util");V();jf();Ds();Bs=(0,TL.promisify)(kL.execFile),l2=async e=>{try{return await Bs("launchctl",["print",e]),!0}catch{return!1}},c2=async(e,t,r)=>{await l2(t)&&await Bs("launchctl",["bootout",t]).catch(()=>{}),await Bs("launchctl",["bootstrap",e,r]),await Bs("launchctl",["enable",t])},CL=async e=>{try{return await Bs("launchctl",["kickstart","-k",e]),!0}catch{return!1}},ve=async(e,t=E())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!st())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Ht({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await CL(n))return{ok:!0};let i=s.plistPath;if(!xL.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await c2(o,n,i),await CL(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Jr,IL=l(()=>{"use strict";V();Df();$s();Jr=async(e=E())=>{let t=[];for(let r of ee(e))(await ve(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var ze,$t,OL=l(()=>{"use strict";Tf();Ds();cd();ze=e=>{st()||(Fs(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},$t=(e,t=Ef)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{st()||e()},t);return()=>{clearInterval(r)}}});var te=l(()=>{"use strict";uL();SL();dd();vL();Tf();md();Ds();EL();IL();Df();jf();Mf();Of();$s();Cf();cd();OL()});var Hf=l(()=>{"use strict";te()});var ML,NL,fd,jL,rn,DL,HL,Yr=l(()=>{"use strict";ML=".agent-witch",NL="memory",fd="project.json",jL="chunks.ndjson",rn="runs.ndjson",DL="reports",HL=".json"});var $L=l(()=>{"use strict";Yr()});var zL,hd,$f=l(()=>{"use strict";zL=m(require("node:path"));$L();hd=(e,t)=>zL.default.join(e.trim(),`${t.trim()}${HL}`)});var Gs,FL,UL=l(()=>{"use strict";Gs="agent-witch.js",FL="command"});var yd=l(()=>{"use strict";UL()});var Xr,BL,GL=l(()=>{"use strict";yd();Xr=e=>`'${e.replace(/'/g,"'\\''")}'`,BL=e=>{let t=`${e.installDir.trim()}/${"app"}/${Gs}`,r=[Xr("node"),Xr(t),"report","write","--key",Xr(e.reportKey.trim()),"--agent-run-id",Xr(e.agentRunId.trim()),"--status",Xr(e.status),"--summary",Xr(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Xr(e.details.trim())),r.join(" ")}});var Pt,VL,d2,zf,Sd=l(()=>{"use strict";$f();GL();Pt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},VL=e=>e===Pt.COMPLETED||e===Pt.FAILED,d2=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),zf=(e,t)=>{let r=hd(t.reportsDir,t.reportKey),o=BL({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Pt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${d2({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var We=l(()=>{"use strict";bt();V()});var qs,KL,qL,JL,u2,on,p2,YL,Ks,Js,Ff,XL,ZL,Ys=l(()=>{"use strict";qs=m(require("node:fs")),KL=m(require("node:path"));Sd();$f();We();qL=50,JL=e=>{let t=M(),r=hd(t.reportsDir,e);return qs.default.mkdirSync(KL.default.dirname(r),{recursive:!0}),r},u2=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},on=e=>{let t=JL(e);if(!qs.default.existsSync(t))return null;try{let r=JSON.parse(qs.default.readFileSync(t,"utf8"));return u2(r)?r:null}catch{return null}},p2=(e,t)=>{let r=[...e,t];return r.length>qL?r.slice(r.length-qL):r},YL=e=>{let t=JL(e.reportKey);qs.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Ks=e=>{let t=on(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:p2(t?.history??[],o)};return YL(n),n},Js=e=>{let t=on(e.reportKey);return t!==null?t:Ks({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Pt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Ff=(e,t)=>{let r=t.trim();if(r.length===0)return on(e);let o=on(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return YL(s),s},XL=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},ZL=e=>{if(e===null||!VL(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Pt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var m2,g2,Xs,QL,Ad,Uf=l(()=>{"use strict";Sd();Ys();m2=new Set(Object.values(Pt)),g2=e=>m2.has(e),Xs=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},QL=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Ad=e=>{if(e[0]!=="write")return QL(),1;let r=Xs(e,"--key"),o=Xs(e,"--agent-run-id"),n=Xs(e,"--status"),s=Xs(e,"--summary"),i=Xs(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!g2(n)?(QL(),1):(Ks({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var it,nn=l(()=>{"use strict";it=()=>!0});var Bf,eE,Zr,bd=l(()=>{"use strict";Bf=m(require("node:path")),eE=require("node:url");nn();Zr=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Bf.default.resolve(t);return it()?r===Bf.default.resolve(__filename):r===(0,eE.fileURLToPath)(e)}});var Pd,sn,y2,uX,an=l(()=>{"use strict";Pd="agent-witch.js",sn="deps.tar.gz",y2="install.sh",uX={mainScript:`app/${Pd}`,depsArchive:`app/${sn}`,installShell:y2}});var nE=l(()=>{"use strict";an()});var sE=l(()=>{"use strict";an();nE()});var Zs,Vf,wd,S2,Qs,Le,cn,ei,ti,Qr,qf=l(()=>{"use strict";Zs=m(require("node:fs")),Vf=m(require("node:path"));sE();V();wd="install-version.json",S2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qs=(e=E())=>Vf.default.join(e,wd),Le=(e=E())=>{let t=Qs(e);if(!Zs.default.existsSync(t))return null;try{let r=JSON.parse(Zs.default.readFileSync(t,"utf8"));return!S2(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},cn=(e,t=E())=>{let r=Qs(t);Zs.default.mkdirSync(Vf.default.dirname(r),{recursive:!0}),Zs.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},ei=(e=E())=>Le(e)?.bundleVersion??"213",ti=(e,t)=>{let r=Le(e);if(r!==null)return r;let o={bundleVersion:"213",appOrigin:t,updatedAt:new Date().toISOString()};return cn(o,e),o},Qr=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var iE,eo,Kf,Jf,Yf,_d,wt,to,Xf=l(()=>{"use strict";iE=require("node:crypto"),eo=m(require("node:fs")),Kf=m(require("node:path"));V();Jf="self-update-log.ndjson",Yf=100,_d=(e=E())=>{let t=M(),r=t.installDir===e?t.logsDir:tn({installDir:e,profileEmail:t.profileEmail});return Kf.default.join(r,Jf)},wt=(e,t=E())=>{let r={id:(0,iE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=_d(t);eo.default.mkdirSync(Kf.default.dirname(o),{recursive:!0});let n=eo.default.existsSync(o)?eo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Yf+1)),JSON.stringify(r)];return eo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},to=(e=20,t=E())=>{let r=_d(t);if(!eo.default.existsSync(r))return[];let o=eo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var Zf,RX,Qf=l(()=>{"use strict";an();Zf="deps",RX=`${"app"}/${sn}`});var aE=l(()=>{"use strict";Qf()});var lE,gr,ro,cE,eh,th,dE=l(()=>{"use strict";lE=require("node:child_process"),gr=m(require("node:fs")),ro=m(require("node:path"));an();Qf();cE=e=>ro.default.join(e,"app",Zf),eh=e=>{let t=ro.default.join(e,"app"),r=ro.default.join(t,sn);gr.default.existsSync(r)&&(gr.default.rmSync(cE(e),{recursive:!0,force:!0}),gr.default.mkdirSync(t,{recursive:!0}),(0,lE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),gr.default.rmSync(r,{force:!0}))},th=e=>{gr.default.rmSync(ro.default.join(e,"node_modules"),{recursive:!0,force:!0}),gr.default.rmSync(ro.default.join(e,"package.json"),{force:!0}),gr.default.rmSync(ro.default.join(e,"package-lock.json"),{force:!0})}});var uE=l(()=>{"use strict";aE();dE()});var zt,vd,pE=l(()=>{"use strict";zt="https://www.agentwitch.com",vd="wss://www.agentwitch.com/api/agent-witch/ws"});var ri,Ft,mE=l(()=>{"use strict";ri="127.0.0.1",Ft=`http://${ri}:43347`});var Ut=l(()=>{"use strict";pE();mE()});var oi,Wd,gE,oh,A2,fE,ih,hE,at,ni,si,ah,nh,sh,ii,lh,ch,dh,dn=l(()=>{"use strict";oi=m(require("node:fs")),Wd=m(require("node:path")),gE="active-writer-work.json",oh=new Set,A2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fE=e=>e.profileEmail===null?Wd.default.join(e.installDir,gE):Wd.default.join(e.installDir,"profiles",e.profileEmail,gE),ih=e=>{let t=fE(e);if(!oi.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(oi.default.readFileSync(t,"utf8"));return!A2(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},hE=(e,t)=>{let r=fE(e);oi.default.mkdirSync(Wd.default.dirname(r),{recursive:!0}),oi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},at=e=>ih(e).activeCount>0,ni=e=>{let t=ih(e);hE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},si=e=>{let t=ih(e),r=Math.max(0,t.activeCount-1);if(hE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of oh)o()},ah=e=>(oh.add(e),()=>{oh.delete(e)}),nh=null,sh=null,ii=e=>{nh=e},lh=e=>{sh=e},ch=()=>{let e=nh;return nh=null,e},dh=()=>{let e=sh;return sh=null,e}});var Ee,uh=l(()=>{"use strict";Ee=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var un,Ld,ai,ph=l(()=>{"use strict";un="qwen2.5:7b",Ld="nomic-embed-text",ai="Install Ollama from https://ollama.com/download"});var li,yE,mh=l(()=>{"use strict";ph();li=()=>`
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
    echo "Ollama is missing. ${ai}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${ai}" >&2
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
  agent_witch_ensure_ollama_model "${un}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Ld}" "\${pull_log}"
}
`,yE=()=>`
${li()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var SE,b2,Ed,gh=l(()=>{"use strict";SE=require("node:child_process");V();mh();b2=e=>new Promise(t=>{let r=(0,SE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:E()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Ed=async(e=b2)=>{let t=`${li()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var fr,Rd,AE,P2,bE,mn,w2,_2,v2,pn,oo,no,PE=l(()=>{"use strict";fr=m(require("node:fs")),Rd=m(require("node:path"));uE();te();V();an();Ut();qf();dn();uh();Xf();gh();AE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),P2=e=>{let t=nt(e),r=t===null?M():M(t);if(!fr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(fr.default.readFileSync(r.configPath,"utf8"));return!AE(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},bE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!AE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},mn=async e=>(await bE(e))?.bundleVersion??null,w2=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Rd.default.join(t,r);fr.default.mkdirSync(Rd.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());fr.default.writeFileSync(n,s),r.endsWith(".js")&&fr.default.chmodSync(n,493)},_2=async()=>{zs(),await Jr()},v2=(e,t)=>e!==null?Ee(e):t??zt,pn=(e,t)=>({localBundleVersion:t,...e}),oo=async e=>{let t=E(),r=Le(t),o=r?.bundleVersion??null,n=await Ed();wt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=P2(t),i=v2(s,r?.appOrigin);if(i===null){let d=pn({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return wt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await bE(i);if(a===null){let d=pn({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return wt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Qr(o,a.bundleVersion))){let d=pn({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return wt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await w2(i,t,S);let d=Rd.default.join(t,Pd);fr.default.existsSync(d)&&fr.default.rmSync(d,{force:!0}),eh(t),th(t),cn({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=M(nt(t));if(at(p)){let S=pn({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return wt({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await _2();let g=pn({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return wt({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=pn({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return wt({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},no=()=>{let e=E();return{local:Le(e),logs:to(20,e)}}});var wE={};St(wE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>wd,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>ai,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Ld,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>un,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Jf,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Yf,appendAgentWitchSelfUpdateLog:()=>wt,buildAgentWitchEnsureOllamaShell:()=>li,buildAgentWitchInstallScriptOllama:()=>yE,buildAgentWitchSelfUpdateStatus:()=>no,ensureAgentWitchInstallVersionRecorded:()=>ti,ensureAgentWitchOllamaInstalled:()=>Ed,fetchAgentWitchRemoteInstallBundleVersion:()=>mn,isRemoteAgentWitchBundleVersionNewer:()=>Qr,readAgentWitchInstallVersion:()=>Le,readAgentWitchSelfUpdateLogs:()=>to,resolveAgentWitchAppOriginFromWsUrl:()=>Ee,resolveAgentWitchHeartbeatInstallBundleVersion:()=>ei,resolveAgentWitchInstallVersionPath:()=>Qs,resolveAgentWitchSelfUpdateLogPath:()=>_d,runAgentWitchSelfUpdate:()=>oo,writeAgentWitchInstallVersion:()=>cn});var qe=l(()=>{"use strict";qf();Xf();PE();uh();ph();mh();gh()});var fh={};St(fh,{buildAgentWitchSelfUpdateStatus:()=>no,fetchAgentWitchRemoteInstallBundleVersion:()=>mn,runAgentWitchSelfUpdate:()=>oo});var hh=l(()=>{"use strict";qe()});function gn(e){return(0,_E.createHash)("sha256").update(e.trim()).digest("hex")}var _E,yh=l(()=>{"use strict";_E=require("node:crypto")});var fn,ci,W2,vE,Sh,WE=l(()=>{"use strict";fn=m(require("node:fs")),ci=m(require("node:path"));yh();We();W2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vE=e=>{if(!fn.default.existsSync(e))return null;try{let t=JSON.parse(fn.default.readFileSync(e,"utf8"));return!W2(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:gn(t.pairingToken.trim())}catch{return null}},Sh=(e=E())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(vE(ci.default.join(e,"config.json")));let n=ci.default.join(e,Nt);if(!fn.default.existsSync(n))return t;for(let s of fn.default.readdirSync(n)){let i=ci.default.join(n,s);fn.default.statSync(i).isDirectory()&&o(vE(ci.default.join(i,"config.json")))}return t}});var Ah,LE,Cd,di,ui,L2,E2,R2,EE,ie,ae,kd,_t,lt=l(()=>{"use strict";Ah=m(require("node:fs")),LE=m(require("node:os")),Cd=m(require("node:path")),di={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},ui=e=>e.trim().length>0,L2=e=>{let t=Cd.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},E2=()=>{let e=LE.default.homedir(),t=Cd.default.join(e,".local","bin","agent");if(Ah.default.existsSync(t))return t;let r=Cd.default.join(e,".local","bin","cursor-agent");return Ah.default.existsSync(r)?r:di.cursorCommand},R2=e=>{let t=e.trim();return!ui(t)||t===di.cursorCommand?E2():t},EE=(e,t)=>L2(e)?t:["agent",...t],ie=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ae=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:ui(t)?t.trim():di.claudeCommand,codexCommand:ui(r)?r.trim():di.codexCommand,cursorCommand:R2(o),antigravityCommand:ui(n)?n.trim():di.antigravityCommand}},kd=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:EE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},_t=(e,t,r,o)=>{let n=t.trim();if(!ui(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:EE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var hr,C2,hn,k2,yn,xd=l(()=>{"use strict";hr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,C2=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:hr(s.inputTokens)+hr(s.outputTokens)+hr(s.cacheReadInputTokens)+hr(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},hn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=hr(a.input_tokens)+hr(a.cache_creation_input_tokens)+hr(a.cache_read_input_tokens),d=hr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:C2(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},k2=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),yn=(e,t)=>{let r=hn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??k2(r)}}});var bh,x2,T2,Ph,wh=l(()=>{"use strict";bh=e=>e.toLocaleString("en-US"),x2=e=>e<.01?e.toFixed(4):e.toFixed(3),T2=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${x2(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${bh(e.inputTokens)} in / ${bh(e.outputTokens)} out (${bh(e.totalTokens)} total)`,t].join(`
`)},Ph=(e,t)=>{if(t===void 0)return e;let r=T2(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Td,_h=l(()=>{"use strict";Td={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var so,vh,Id,Wh=l(()=>{"use strict";_h();so="auto",vh=e=>({value:so,label:`Auto (${Td[e]})`}),Id={anthropic:[vh("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[vh("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[vh("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Sn,pi,Lh,mi=l(()=>{"use strict";_h();Wh();Sn=e=>{let t=e?.trim()??"";if(!(t.length===0||t===so))return t},pi=(e,t)=>{let r=Sn(t);return r===void 0?Td[e]:r},Lh=e=>{let t=Sn(e);return t===void 0?so:t}});var Od,I2,O2,Md,RE=l(()=>{"use strict";Od={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},I2=e=>{let t=Od[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Od["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Od["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Od["gemini-2.0-flash"]:null},O2=(e,t,r)=>{let o=I2(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Md=e=>{let t=O2(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var An,M2,N2,j2,Nd,CE=l(()=>{"use strict";RE();An=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),M2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=An(r.input_tokens),n=An(r.output_tokens);return o===0&&n===0?null:Md({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},N2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=An(r.prompt_tokens),n=An(r.completion_tokens);return o===0&&n===0?null:Md({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},j2=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=An(r.promptTokenCount),n=An(r.candidatesTokenCount);return o===0&&n===0?null:Md({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Nd=(e,t,r)=>e==="anthropic"?M2(t,r):e==="openai"?N2(t,r):j2(t,r)});var D2,Eh,H2,$2,z2,F2,U2,Rh,Ch=l(()=>{"use strict";mi();CE();D2=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},Eh=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:pi(e,t.model)},H2=async e=>{let t=Eh("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=D2(o);n.length>0&&e.onChunk?.(n);let s=Nd("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},$2=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},z2=async e=>{let t=Eh("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=$2(o);n.length>0&&e.onChunk?.(n);let s=Nd("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},F2=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},U2=async e=>{let t=Eh("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=F2(n);s.length>0&&e.onChunk?.(s);let i=Nd("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Rh=async e=>{try{return e.provider==="anthropic"?await H2(e):e.provider==="openai"?await z2(e):await U2(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Fe,gi=l(()=>{"use strict";Fe=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var kE,B2,jd,kh=l(()=>{"use strict";kE=m(require("node:path")),B2="writer-api-secrets.json",jd=e=>kE.default.join(e,B2)});var xh,xE,G2,yr,je,Sr=l(()=>{"use strict";xh=m(require("node:fs"));mi();kh();xE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G2=e=>{if(!xE(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Sn(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},yr=e=>{let t=jd(e);if(!xh.default.existsSync(t))return{};try{let r=JSON.parse(xh.default.readFileSync(t,"utf8"));if(!xE(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=G2(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},je=(e,t)=>yr(e)[t]??null});var Re,fi=l(()=>{"use strict";Re=e=>e==="api"?"api":"cli"});var TE,ye,io,Bt=l(()=>{"use strict";TE=m(require("node:path"));gi();Sr();fi();ye=e=>TE.default.dirname(e),io=(e,t)=>{if(Re(e.writerExecutionBackend)!=="api")return!1;let r=Fe(t);if(r===null)return!1;let o=ye(e.layout.configPath),n=je(o,r);return n!==null&&n.apiKey.length>0}});var hi,Th=l(()=>{"use strict";wh();Ch();gi();Sr();Bt();hi=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Fe(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=ye(e.layout.configPath),a=je(i,s);if(a===null){let d=Object.keys(yr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Rh({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Ph(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var IE,bn,Ih=l(()=>{"use strict";IE=require("node:child_process");lt();xd();Th();Bt();bn=(e,t,r)=>new Promise(o=>{if(!ie(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(io(e,t)){hi(e,t,r).then(o);return}let n=_t(t,r,ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,IE.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=yn(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var OE=l(()=>{"use strict"});var ME=l(()=>{"use strict";wh();Ih();Ch();OE();Sr();Bt()});var NE,jE,DE,HE=l(()=>{"use strict";NE="claude",jE="codex",DE="cursor"});var $E,V2,Oh,yi,Dd=l(()=>{"use strict";$E=m(require("node:path"));Ut();bt();V2="ws://localhost:3000/api/agent-witch/ws",Oh=e=>e.replace(/\/$/,""),yi=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Oh(t);let r=$E.default.basename(e.installDir);if(r===Os.production)return vd;let o=e.configWsUrl?.trim()??"";return r===Os.localhost?o.length>0?Oh(o):V2:o.length>0?Oh(o):vd}});var K2,Mh,Nh=l(()=>{"use strict";HE();Dd();fi();K2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Mh=e=>{if(!K2(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=yi({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??NE,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??jE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??DE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Re(t.writerExecutionBackend),layout:e.layout}}}});var jh,Dh,Hh=l(()=>{"use strict";jh=m(require("node:fs"));V();Nh();Dh=e=>{let t=M(e);if(!jh.default.existsSync(t.configPath))return null;try{let r=JSON.parse(jh.default.readFileSync(t.configPath,"utf8")),o=Mh({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Si,zE=l(()=>{"use strict";Si=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var $h,J2,zh,FE=l(()=>{"use strict";$h=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J2=e=>{if(!$h(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!$h(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!$h(g))return[];let S=typeof g.itemKey=="string"?g.itemKey.trim():"",h=typeof g.relativePath=="string"?g.relativePath:"",y=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},zh=J2});var UE,Y2,Hd,Fh=l(()=>{"use strict";UE=m(require("node:path")),Y2=(e,t)=>{let r=t.trim();return UE.default.join(e,"components","store",r.slice(0,2),r)},Hd=Y2});var BE,X2,Uh,GE=l(()=>{"use strict";BE=m(require("node:fs"));Fh();X2=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Hd(e.installDir,n.contentSha256);BE.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},Uh=X2});var Ai,Pn,Z2,Bh,Q2,Gh,Vh=l(()=>{"use strict";Ai=m(require("node:fs")),Pn=m(require("node:path"));Fh();Z2=(e,t)=>Pn.default.join(e.installDir,"runs",t,"overlay"),Bh=(e,t)=>Pn.default.join(Z2(e,t),".cursor"),Q2=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=Bh(e,t);Ai.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Hd(e.installDir,i.contentSha256);if(!Ai.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Pn.default.join(n,c):Pn.default.join(n,i.itemKey);Ai.default.mkdirSync(Pn.default.dirname(d),{recursive:!0}),Ai.default.copyFileSync(a,d)}return{ok:!0}},Gh=Q2});var qh,VE,e5,bi,qE=l(()=>{"use strict";qh=m(require("node:fs")),VE=m(require("node:path")),e5=(e,t)=>{let r=VE.default.join(e.installDir,"runs",t);qh.default.existsSync(r)&&qh.default.rmSync(r,{recursive:!0,force:!0})},bi=e5});var t5,Kh,KE=l(()=>{"use strict";Vh();t5=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=Bh(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},Kh=t5});var Jh,r5,o5,n5,s5,i5,z,JE=l(()=>{"use strict";Jh=m(require("node:fs"));Dd();V();fi();r5="claude",o5="codex",n5="cursor",s5="agy",i5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),z=()=>{let e=M();if(!Jh.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Jh.default.readFileSync(e.configPath,"utf8"));if(!i5(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=yi({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Re(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:r5,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:o5,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:n5,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:s5,pairingToken:s,layout:e}}catch{return null}}});var $d,YE,XE=l(()=>{"use strict";$d=m(require("node:fs"));kh();YE=(e,t)=>{let r=jd(e);$d.default.mkdirSync(e,{recursive:!0}),$d.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{$d.default.chmodSync(r,384)}catch{}}});var zd,ZE,Yh=l(()=>{"use strict";zd=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},ZE=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===zd(t)}});var Pi,a5,Xh,Zh,QE=l(()=>{"use strict";Pi=m(require("node:fs"));Sr();XE();Yh();mi();Bt();a5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Xh=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=ZE(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Sn(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Zh=e=>{let t=ye(e.configPath),r={};if(Pi.default.existsSync(e.configPath))try{let n=JSON.parse(Pi.default.readFileSync(e.configPath,"utf8"));a5(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Pi.default.mkdirSync(t,{recursive:!0}),Pi.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=Xh(Xh(Xh(yr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);YE(t,o)}});var Qh,eR=l(()=>{"use strict";Qh={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var ey,tR=l(()=>{"use strict";gi();Sr();Bt();Bt();ey=(e,t)=>{if(io(e,t))return!1;let r=Fe(t);if(r===null)return!1;let o=ye(e.layout.configPath),n=je(o,r);return n===null||n.apiKey.trim().length===0}});var rR,ty,ry=l(()=>{"use strict";rR=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},ty=async e=>{let t=rR(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=rR(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var l5,oy,oR=l(()=>{"use strict";te();Hh();ry();l5=1e4,oy=()=>ty({listProfileEmails:pd,readConfig:Dh,pollIntervalMs:l5,logWaiting:e=>{console.error(e)}})});var le=l(()=>{"use strict";Ih();ME();Hh();Dd();zE();FE();GE();Vh();qE();KE();fi();JE();QE();Sr();Bt();Yh();mi();eR();Th();Bt();tR();gi();Sr();oR();Nh();ry()});var Fd,nR,c5,d5,sR,Ud,wi,Bd,_i=l(()=>{"use strict";Fd=m(require("node:fs")),nR=m(require("node:path")),c5="wake-port.json",d5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sR=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Ud=e=>nR.default.join(e,c5),wi=e=>{let t=Ud(e);if(!Fd.default.existsSync(t))return null;try{let r=JSON.parse(Fd.default.readFileSync(t,"utf8"));if(d5(r)&&sR(r.wakePort))return r.wakePort}catch{return null}return null},Bd=(e,t)=>{if(!sR(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Ud(e);Fd.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Fee,Uee,Bee,ct,iR,vi=l(()=>{"use strict";_i();We();_i();Fee=ot(),Uee=`${oe()}-wake`,Bee=oe(),ct=()=>{let e=E(),t=wi(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return ot()},iR=e=>{let t=E();wi(t)===null&&Bd(t,e)}});var aR=l(()=>{"use strict";yh();te();WE();le();vi()});var ny,Wi,Li,lR=l(()=>{"use strict";ny=m(require("node:os"));aR();Wi=()=>{let e=ee();return{ok:!0,port:ct(),hostname:ny.default.hostname(),profileCount:e.length}},Li=()=>{let e=ee(),t=z()?.pairingToken.trim()??"",r=t.length>0?gn(t):null,o=Sh();return{hostname:ny.default.hostname(),port:ct(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var sy=l(()=>{"use strict";lR()});var cR,dR,uR,Gd,wn=l(()=>{"use strict";cR="materialization.json",dR="backups",uR=".gitignore",Gd=e=>`harness-set:${e.trim()}`});var pR,mR,Vd,gR=l(()=>{"use strict";pR=m(require("node:crypto")),mR=m(require("node:fs")),Vd=e=>{try{let t=mR.default.readFileSync(e);return pR.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Ar,ao,u5,fR,iy,hR=l(()=>{"use strict";Ar=m(require("node:fs")),ao=m(require("node:path"));gR();u5=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=ao.default.join(t,n,o);return Ar.default.mkdirSync(ao.default.dirname(s),{recursive:!0}),Ar.default.copyFileSync(r,s),ao.default.relative(e,s).replaceAll("\\","/")},fR=e=>{let t=ao.default.join(e.repoRoot,e.repoRelativeDestination),r=Vd(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Ar.default.existsSync(t)){let n=Vd(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=u5(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Ar.default.mkdirSync(ao.default.dirname(t),{recursive:!0}),Ar.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Ar.default.mkdirSync(ao.default.dirname(t),{recursive:!0}),Ar.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},iy=e=>{let t=Vd(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var ay,yR,qd,ly=l(()=>{"use strict";ay=m(require("node:fs"));wn();yR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qd=e=>{if(!ay.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(ay.default.readFileSync(e,"utf8"));if(yR(t)&&t.version===1&&yR(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var br,Kd,SR,AR=l(()=>{"use strict";br=m(require("node:fs")),Kd=m(require("node:path"));wn();SR=e=>{let t=new Set(e.setSlugs.map(s=>Gd(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=Kd.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Kd.default.join(e.repoRoot,i.backupPath);br.default.existsSync(c)?(br.default.mkdirSync(Kd.default.dirname(a),{recursive:!0}),br.default.copyFileSync(c,a),o.push(s)):br.default.existsSync(a)&&br.default.rmSync(a,{force:!0})}else br.default.existsSync(a)&&br.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var cy,Jd,dy=l(()=>{"use strict";cy=m(require("node:path"));wn();Jd=e=>({ledgerFilePath:cy.default.join(e.metaDirPath,cR),backupsDirPath:cy.default.join(e.metaDirPath,dR)})});var uy,bR,PR=l(()=>{"use strict";uy=m(require("node:path")),bR=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return uy.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return uy.default.posix.join(s,e,n)}});var py,wR,my,_R=l(()=>{"use strict";py=m(require("node:fs")),wR=m(require("node:path")),my=(e,t)=>{py.default.mkdirSync(wR.default.dirname(e),{recursive:!0}),py.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var gy,p5,Ke,Ri=l(()=>{"use strict";gy=m(require("node:os")),p5=e=>{let t=e.trim();return t.startsWith("~/")?`${gy.default.homedir()}${t.slice(1)}`:t==="~"?gy.default.homedir():t},Ke=p5});var Yd,vR,m5,WR,LR=l(()=>{"use strict";Yd=m(require("node:fs")),vR=m(require("node:path"));wn();Yr();m5=`*
!${fd}
`,WR=e=>{let t=vR.default.join(e,uR);Yd.default.existsSync(t)||(Yd.default.mkdirSync(e,{recursive:!0}),Yd.default.writeFileSync(t,m5))}});var lo,Je,co=l(()=>{"use strict";lo=m(require("node:path"));Yr();Ri();Je=e=>{let t=Ke(e),r=lo.default.join(t,ML);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:lo.default.join(r,"rag"),memoryDirPath:lo.default.join(r,NL),reportsDirPath:lo.default.join(r,DL),metaFilePath:lo.default.join(r,fd),ragChunksFilePath:lo.default.join(r,"rag",jL)}}});var vt,RR,g5,f5,Ue,fy=l(()=>{"use strict";vt=m(require("node:fs")),RR=m(require("node:path"));Yr();LR();co();g5=(e,t)=>{if(vt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};vt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},f5=e=>{vt.default.existsSync(e.ragChunksFilePath)||vt.default.writeFileSync(e.ragChunksFilePath,"");let t=RR.default.join(e.memoryDirPath,rn);vt.default.existsSync(t)||vt.default.writeFileSync(t,"")},Ue=e=>{let t=Je(e.projectFolderPath);return vt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),vt.default.mkdirSync(t.ragDirPath,{recursive:!0}),vt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),WR(t.metaDirPath),g5(t,e),f5(t),{ok:!0,layout:t}}});var CR,kR,xR,TR,Xd,Zd=l(()=>{"use strict";CR="components",kR="store",xR="versions",TR="installed.json",Xd=e=>`harness-set:${e.trim()}`});var hy,IR,Qd,yy=l(()=>{"use strict";hy=m(require("node:fs")),IR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qd=e=>{if(!hy.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(hy.default.readFileSync(e,"utf8"));if(IR(t)&&t.version===1&&IR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var Ci,_n,eu=l(()=>{"use strict";Ci=m(require("node:path"));Zd();_n=e=>{let t=Ci.default.join(e,CR);return{componentsRootDir:t,storeDir:Ci.default.join(t,kR),versionsDir:Ci.default.join(t,xR),installedFilePath:Ci.default.join(t,TR)}}});var Sy,OR,tu,ru,ou=l(()=>{"use strict";Sy=m(require("node:crypto")),OR=m(require("node:fs")),tu=e=>Sy.default.createHash("sha256").update(e,"utf8").digest("hex"),ru=e=>{try{let t=OR.default.readFileSync(e);return Sy.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Ay,MR,NR,jR=l(()=>{"use strict";Ay=m(require("node:fs")),MR=m(require("node:path")),NR=(e,t)=>{Ay.default.mkdirSync(MR.default.dirname(e),{recursive:!0}),Ay.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var by,Py,DR,HR=l(()=>{"use strict";by=m(require("node:fs")),Py=m(require("node:path")),DR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=Py.default.join(e,r),n=Py.default.join(o,`${t.versionId}.json`);by.default.mkdirSync(o,{recursive:!0}),by.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var nu,$R,zR,FR=l(()=>{"use strict";nu=m(require("node:fs")),$R=m(require("node:path"));ou();zR=e=>{let t=tu(e.content),r=$R.default.join(e.storeDir,t);return nu.default.existsSync(r)||(nu.default.mkdirSync(e.storeDir,{recursive:!0}),nu.default.writeFileSync(r,e.content)),t}});var wy,UR,h5,su,_y=l(()=>{"use strict";wy=m(require("node:fs")),UR=m(require("node:path"));Zd();yy();eu();ou();jR();HR();FR();h5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),su=e=>{let t=_n(e.installDir),r=Xd(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!h5(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=UR.default.join(e.harnessRootDir,a);if(!wy.default.existsSync(c))continue;let d=wy.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:ru(c);if(p!==null){if(tu(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);zR({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;DR(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Qd(t.installedFilePath);NR(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var Wy,vy,BR,GR=l(()=>{"use strict";Wy=m(require("node:fs"));_y();yy();eu();vy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BR=e=>{if(!Wy.default.existsSync(e.harnessManifestPath))return;let t=_n(e.installDir),r=Qd(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(Wy.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!vy(o)||o.version!==1||!vy(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!vy(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];su({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var Ly,VR,qR,KR=l(()=>{"use strict";Ly=m(require("node:fs")),VR=m(require("node:path")),qR=e=>{let t=e.componentId.replaceAll("/","_"),r=VR.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!Ly.default.existsSync(r))return null;try{let o=JSON.parse(Ly.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var iu,au,JR,YR=l(()=>{"use strict";iu=m(require("node:fs")),au=m(require("node:path"));Zd();GR();KR();eu();ou();JR=e=>{BR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=_n(e.layout.installDir),r=Xd(e.setSlug),o=qR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=au.default.join(t.storeDir,i.contentSha256);if(iu.default.existsSync(a)&&ru(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?au.default.join(e.layout.harnessRootDir,n):au.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!iu.default.existsSync(s))return null;try{if(!iu.default.statSync(s).isFile())return null}catch{return null}return s}});var XR,y5,S5,Pr,lu=l(()=>{"use strict";ly();dy();co();XR="harness-set:",y5=e=>{let t=e.trim();if(!t.startsWith(XR))return null;let r=t.slice(XR.length).trim();return r.length>0?r:null},S5=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=y5(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Pr=e=>{let t=Je(e),{ledgerFilePath:r}=Jd(t),o=qd(r);return S5(o)}});var cu,Ey,ki,A5,Gt,xi,vn=l(()=>{"use strict";cu=m(require("node:fs")),Ey=m(require("node:os")),ki=m(require("node:path")),A5=()=>cu.default.realpathSync(ki.default.resolve(Ey.default.homedir())),Gt=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?ki.default.join(Ey.default.homedir(),t.slice(1)):t,o;try{o=cu.default.realpathSync(ki.default.resolve(r))}catch{return null}let n=A5();return o===n||o.startsWith(`${n}${ki.default.sep}`)?o:null},xi=e=>{let t=Gt(e);if(t===null)return null;try{if(!cu.default.statSync(t).isFile())return null}catch{return null}return t}});var Ry,Cy=l(()=>{"use strict";Ry=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var uu,ZR,du,b5,Ti,ky=l(()=>{"use strict";uu=m(require("node:fs")),ZR=m(require("node:path"));wn();hR();ly();AR();dy();PR();_R();Ri();fy();YR();lu();vn();Cy();du=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),b5=e=>{if(!uu.default.existsSync(e))return null;try{let t=JSON.parse(uu.default.readFileSync(e,"utf8"));if(du(t)&&t.version===1)return t}catch{return null}return null},Ti=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=Ke(e.projectFolderPath),o=Gt(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=uu.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Ue({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Jd(s.layout),d=Pr(o).filter(b=>!t.includes(b)),p=qd(i),g=0;if(d.length>0){let b=SR({repoRoot:o,setSlugs:d,ledger:p});p=b.ledger,g=b.summary.removedPaths.length}if(t.length===0)return my(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let S=b5(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=du(S.sets)?S.sets:{},y=0,u=0,A=0;for(let b of t){let f=h[b];if(!du(f))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",_=Gd(b),v=Array.isArray(f.items)?f.items:[];for(let L of v){if(!du(L))continue;let R=typeof L.path=="string"?L.path.trim():"";if(R.length===0)continue;let x=Ry(R);if(x===null)continue;let I=bR(b,x),D=ZR.default.posix.join(".cursor",I).replaceAll("\\","/"),re=typeof L.id=="string"?L.id.trim():"",B=JR({layout:e.layout,setSlug:b,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:R,manifestItemId:re});if(B===null)continue;let q=fR({repoRoot:o,backupsDir:a,repoRelativeDestination:D,sourceAbsolutePath:B,componentId:_,versionId:w,ledger:p});if(q.kind==="skipped_unchanged"){u+=1;continue}if(q.kind==="backed_up_user_file"){A+=1,y+=1,p={version:1,entries:{...p.entries,[D]:iy({componentId:_,versionId:w,sourceAbsolutePath:B,backupPath:q.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[D]:iy({componentId:_,versionId:w,sourceAbsolutePath:B})}}}}return y===0&&u===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(my(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:A,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var QR,pu,P5,w5,_5,v5,W5,L5,E5,R5,C5,Ii,mu=l(()=>{"use strict";QR=m(require("node:crypto")),pu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},P5=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},w5=(e,t)=>{let r=P5(t),o=pu(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},_5=(e,t,r)=>{let o=w5(t,r);return`shared/items/${e}/${o}`},v5=["rules","skills","commands","instructions","agents"],W5=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),L5=(e,t)=>[...e.filter(o=>o.id!==t.id),t],E5=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},R5=e=>QR.default.createHash("sha256").update(e,"utf8").digest("hex"),C5=e=>({id:e.id,kind:e.kind,title:e.title,path:_5(e.id,e.kind,e.title),contentSha256:R5(e.content)}),Ii=e=>{let t=new Date().toISOString(),r=e.existingManifest??W5(e.hostname,t),o=pu(e.bundle.slug),n=E5(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...v5.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=C5(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:L5(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var wr,eC,gu,k5,uo,xy=l(()=>{"use strict";wr=m(require("node:fs")),eC=m(require("node:os")),gu=m(require("node:path"));mu();k5=e=>{if(!wr.default.existsSync(e))return null;try{let t=JSON.parse(wr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},uo=e=>{try{let t=k5(e.layout.harnessManifestPath),r=Ii({bundle:e.bundle,hostname:eC.default.hostname(),existingManifest:t});wr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)wr.default.mkdirSync(gu.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=gu.default.join(e.layout.harnessRootDir,o.relativePath);wr.default.mkdirSync(gu.default.dirname(n),{recursive:!0}),wr.default.writeFileSync(n,o.content)}return wr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var Ty,tC=l(()=>{"use strict";xy();ky();Ty=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=uo({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Ti({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var rC,oC=l(()=>{"use strict";rC=["rule","skill","command","instruction","agent"]});var nC,x5,T5,Wt,Iy=l(()=>{"use strict";oC();nC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),x5=e=>typeof e=="string"&&rC.includes(e),T5=e=>{if(!nC(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!x5(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Wt=e=>{if(!nC(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=T5(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var sC,I5,Oy,iC=l(()=>{"use strict";sC=require("node:zlib");Iy();I5="x-agent-witch-token",Oy=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[I5]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,sC.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Wt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var Ny,My,_r,aC=l(()=>{"use strict";Ny=m(require("node:fs")),My=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_r=e=>{if(!Ny.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Ny.default.readFileSync(e.harnessManifestPath,"utf8"));if(!My(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=My(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!My(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var fu,lC=l(()=>{"use strict";fu=()=>"~"});var cC,dC,uC=l(()=>{"use strict";cC=require("node:crypto"),dC=e=>`local-${(0,cC.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var jy,pC=l(()=>{"use strict";jy=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Oi,hu,Dy=l(()=>{"use strict";Oi=m(require("node:path")),hu=e=>{let t=Oi.default.dirname(e),r=Oi.default.basename(t);return r==="agents"?Oi.default.basename(Oi.default.dirname(t)):r}});var Mi,Vt,mC,O5,M5,N5,yu,gC,Hy=l(()=>{"use strict";Mi=m(require("node:fs")),Vt=m(require("node:path"));uC();pC();Dy();mC=new Set(["node_modules",".git","dist","build",".next","coverage"]),O5=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},M5=(e,t)=>{let r=Vt.default.basename(t);if(e==="skill"){let o=t.split(Vt.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},N5=e=>{let t=[],r=(n,s)=>{let i;try{i=Mi.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&mC.has(a.name))continue;let c=Vt.default.join(n,a.name),d=s?Vt.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;jy(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Vt.default.join(e,n);Mi.default.existsSync(s)&&r(s,n)}let o=Vt.default.join(e,"skills");return Mi.default.existsSync(o)&&r(o,"skills"),t},yu=e=>{let t=N5(e);if(t.length===0)return null;let r=Vt.default.dirname(e),o=hu(e),n=O5(o),s=t.map(i=>{let a=jy(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:dC(i.absolutePath),kind:a,title:M5(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},gC=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Mi.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||mC.has(a.name))continue;let c=Vt.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var fC,$y,j5,zy,hC=l(()=>{"use strict";fC=m(require("node:fs")),$y=m(require("node:path"));Hy();vn();j5=e=>{let t=Gt(e.trim());if(t===null)return null;if($y.default.basename(t)===".cursor")return t;let r=$y.default.join(t,".cursor");try{if(fC.default.statSync(r).isDirectory())return Gt(r)}catch{return null}return null},zy=e=>{let t=j5(e.projectPath);if(t===null)return null;let r=yu(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var yC,D5,Su,Fy,SC=l(()=>{"use strict";yC=m(require("node:path"));Hy();vn();Dy();D5=5,Su=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Fy=e=>{let t=Gt(e.scanRoot.trim());if(t===null)return Su(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of gC(t,D5,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Gt(s);if(i===null)continue;let a=hu(i);Su(e.response,"folder",{cursorDir:i,groupName:a,repoPath:yC.default.dirname(i)});let c=yu(i);c!==null&&(r.push(c),Su(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Su(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var AC,bC,PC=l(()=>{"use strict";AC=m(require("node:path")),bC=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:AC.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Te,wC,Uy,H5,By,Gy,Au,Vy,Ni,_C=l(()=>{"use strict";Te=m(require("node:fs")),wC=m(require("node:os")),Uy=m(require("node:path"));mu();_y();vn();PC();H5=e=>{if(!Te.default.existsSync(e))return null;try{let t=JSON.parse(Te.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},By=e=>{let t=e.hostname??wC.default.hostname(),r=H5(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=xi(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let S=Te.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:S,setSlugs:[i.slug]})}let d=Ii({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Te.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Te.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=Uy.default.join(e.layout.harnessRootDir,i.relativePath);Te.default.mkdirSync(Uy.default.dirname(a),{recursive:!0}),Te.default.writeFileSync(a,i.content)}Te.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=pu(i.slug),d=r.sets[c];d!==void 0&&su({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},Gy="reveal-cache.json",Au=(e,t)=>{Te.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Te.default.writeFileSync(`${e.harnessRootDir}/${Gy}`,`${JSON.stringify(t,null,2)}
`)},Vy=e=>{let t=`${e.harnessRootDir}/${Gy}`;Te.default.existsSync(t)&&Te.default.unlinkSync(t)},Ni=e=>{let t=`${e.harnessRootDir}/${Gy}`;if(!Te.default.existsSync(t))return null;try{let r=JSON.parse(Te.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return bC(r)}catch{return null}return null}});var po=l(()=>{"use strict";ky();tC();Cy();xy();iC();Iy();mu();aC();lC();hC();vn();SC();_C()});var qy,vC=l(()=>{"use strict";po();We();qy=e=>{let t=M(e.profileEmail);return uo({bundle:e.bundle,layout:t})}});var WC=l(()=>{"use strict";vC();po()});var $5,LC,z5,EC,mo,bu,RC=l(()=>{"use strict";$5=["agentwitch.com","www.agentwitch.com"],LC=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,z5=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},EC=e=>{let t=z5(e);return!!($5.includes(t)||LC.test(e.trim().toLowerCase()))},mo=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return EC(r)?LC.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},bu=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:mo(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var ji=l(()=>{"use strict";RC()});var qt,Di=l(()=>{"use strict";qt=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Hi,CC=l(()=>{"use strict";WC();ji();Di();Hi=e=>{if(!qt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Wt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!mo(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=qy({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var Ky=l(()=>{"use strict";CC()});var F5,Wn,Jy=l(()=>{"use strict";F5=e=>e==="hourly"||e==="daily"||e==="weekdays",Wn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!F5(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var $i,Pu,kC,xC,Yy,dt,wu,_u,vu,Wu,Lu=l(()=>{"use strict";$i=m(require("node:fs")),Pu=m(require("node:path"));Jy();kC="automations.json",xC=e=>e.profileEmail!==null?Pu.default.join(e.installDir,"profiles",e.profileEmail,kC):Pu.default.join(e.installDir,kC),Yy=()=>({version:1,automations:[]}),dt=e=>{let t=xC(e);if(!$i.default.existsSync(t))return Yy();try{let r=JSON.parse($i.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?Yy():{version:1,automations:r.automations.flatMap(n=>{let s=Wn(n);return s!==null?[s]:[]})}}catch{return Yy()}},wu=(e,t)=>{let r=xC(e);$i.default.mkdirSync(Pu.default.dirname(r),{recursive:!0}),$i.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},_u=(e,t)=>{wu(e,{version:1,automations:t})},vu=(e,t)=>{let o=dt(e).automations.filter(n=>n.id!==t.id);wu(e,{version:1,automations:[...o,t]})},Wu=(e,t)=>dt(e).automations.find(r=>r.id===t)??null});var De,vr=l(()=>{"use strict";De="x-agent-witch-token"});var Z,go,Xy,zi,Zy,U5,Qy,Fi,Ui,eS,Bi=l(()=>{"use strict";vr();qe();Z=e=>{let t=Ee(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},go=e=>({[De]:e,"Content-Type":"application/json"}),Xy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:go(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},zi=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:go(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Zy=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:go(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},U5=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},Qy=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:go(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Fi=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:go(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return U5(r)}catch{return null}},Ui=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:go(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},eS=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:go(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var fo,TC,IC,B5,tS,OC,rS=l(()=>{"use strict";fo=m(require("node:fs")),TC=m(require("node:path")),IC=e=>TC.default.join(e.harnessRootDir,"projects-registry.json"),B5=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),tS=e=>{let t=IC(e);if(!fo.default.existsSync(t))return[];try{let r=JSON.parse(fo.default.readFileSync(t,"utf8"));return B5(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},OC=e=>{let t=IC(e);if(!fo.default.existsSync(t))return;let r=`${t}.migrated`;if(fo.default.existsSync(r)){fo.default.unlinkSync(t);return}fo.default.renameSync(t,r)}});var MC,G5,V5,NC,jC=l(()=>{"use strict";Ri();MC=e=>Ke(e),G5=e=>new Set(e.map(t=>MC(t.folderPath))),V5=e=>new Set(e.map(t=>t.id)),NC=(e,t)=>{let r=G5(t),o=V5(t),n=[],s=new Set;for(let i of e){let a=MC(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var oS,nS=l(()=>{"use strict";Bi();rS();jC();oS=async(e,t)=>{let r=tS(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Fi(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=NC(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await Qy(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&OC(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var sS,ho,Eu=l(()=>{"use strict";sS=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),ho=(e,t)=>e.find(r=>r.id===t)??null});var Ln,Ru=l(()=>{"use strict";Bi();nS();Eu();Ln=async(e,t)=>{t!==void 0&&await oS(t,e);let r=Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Fi(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let n=sS(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Console.`}}});var DC=l(()=>{"use strict"});var Ie,HC,q5,K5,J5,Y5,En,iS=l(()=>{"use strict";Ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HC=(e,t)=>e.length===0?`<p class="empty">${Ie(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Ie(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Ie(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,q5=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,K5=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ie(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,J5=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?K5(e.project):q5();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Ie(o.slug)}"${t.size===0||t.has(o.slug)?" checked":""} />
            <span><strong>${Ie(o.name)}</strong> <span class="muted mono">(${Ie(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ie(e.project.id)}" />
        <p class="field-label">Installed</p>
        <p class="lede">Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.</p>
        ${r}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`},Y5=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Ie(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Ie(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},En=e=>{let t=e.flashError?`<div class="alert-error">${Ie(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ie(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${Ie(c)}</a>`,n=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=J5({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=HC(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=HC(s,"No agents installed for this project yet."):i=Y5({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Ie(e.project.name)}</h1>
      <p class="muted mono">${Ie(e.project.projectFolderPath)}</p>
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
    </section>`}});var X5,Z5,$C,zC=l(()=>{"use strict";po();vr();X5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Z5=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[De]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!X5(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Wt(n);return s===null?[]:[s]})}catch{return null}},$C=Z5});var FC,aS,UC=l(()=>{"use strict";le();po();iS();Ru();zC();Eu();lu();Bi();FC=e=>({kind:"page",title:e.project.name,body:En({project:e.project,installed:_r(e.layout),linkedSetSlugs:Pr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),aS=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=z();if(r===null)return{kind:"not_found"};let o=await Ln(r,e.layout),n=ho(o.projects,t);if(n===null)return{kind:"not_found"};let s=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await $C(s,n.id);if(i===null)return FC({layout:e.layout,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=Ty({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:i});if(!a.ok)return FC({layout:e.layout,project:n,errorMessage:a.errorMessage});let c=s===null?!1:await Ui(s,n.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${d.toString()}`}}});var Q5,lS,BC=l(()=>{"use strict";Q5=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,lS=Q5});var GC,VC,eV,tV,Cu,ku,qC=l(()=>{"use strict";GC=require("node:child_process"),VC=require("node:util"),eV=(0,VC.promisify)(GC.execFile),tV=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},Cu=async(e,t)=>{try{let{stdout:r}=await eV("git",t,{cwd:e,env:tV(),maxBuffer:1048576});return r.trim()}catch{return null}},ku=async e=>{let t=await Cu(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Cu(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Cu(e,["status","--porcelain"]),n=await Cu(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var cS,KC=l(()=>{"use strict";cS=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var rV,dS,JC=l(()=>{"use strict";rV=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},dS=rV});var oV,uS,YC=l(()=>{"use strict";vr();oV=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[De]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},uS=oV});var XC,Wr,ZC=l(()=>{"use strict";XC=require("node:child_process"),Wr=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,XC.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var QC=l(()=>{"use strict";Ru()});var Gi,ek=l(()=>{"use strict";vr();Gi=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[De]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var ut=l(()=>{"use strict";Ru();Eu();DC();Ri();fy();UC();lu();BC();qC();KC();JC();YC();ZC();QC();ek();nS();rS();Bi()});var xu,Vi,tk,pS,yo,mS=l(()=>{"use strict";xu=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Vi=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=xu(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},tk=e=>e>=1&&e<=5,pS=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return xu(t,"UTC")},yo=e=>{let t=e.from??new Date,r=xu(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Vi(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Vi(r,e.timeZone,o,0),s=xu(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Vi(pS(r),e.timeZone,o,0):n;if(!i&&tk(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=pS(a),tk(a.weekday))return Vi(a,e.timeZone,o,0);return Vi(pS(r),e.timeZone,o,0)}});var rk,gS,Kt,fS=l(()=>{"use strict";rk=require("node:crypto");le();ut();mS();Lu();gS=!1,Kt=async e=>{if(gS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=z();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=Wu(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};gS=!0;let n=(0,rk.randomUUID)();try{let s=await bn(t,"claude-cli",o.prompt);await eS(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=yo({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return vu(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{gS=!1}}});var Tu,ok=l(()=>{"use strict";le();fS();Lu();Tu=async()=>{let e=z();if(e===null)return;let t=dt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Kt(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var qi=l(()=>{"use strict";Lu();ok();fS();mS()});var nk=l(()=>{"use strict";qi()});var sk=l(()=>{"use strict";Jy()});var ik=l(()=>{"use strict";sk()});var hS=l(()=>{"use strict";qi()});var nV,sV,Ki,yS=l(()=>{"use strict";nk();ik();hS();We();nV=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),sV=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??yo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??yo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Ki=e=>{let t=nV(e.profileEmail),r=dt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Wn(s);return i!==null?[sV(i,o.get(i.id))]:[]});return _u(t,n),{ok:!0,writtenCount:n.length}}});var SS=l(()=>{"use strict";qi()});var ak=l(()=>{"use strict";le()});var lk=l(()=>{"use strict";yS();SS();hS();ak()});var ck,Ji,Yi,Xi,dk=l(()=>{"use strict";ck=m(require("node:os"));lk();ji();Di();Ji=e=>{if(!qt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!mo(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=Ki({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Yi=async e=>{if(!qt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:mo(t)?Kt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Xi=()=>{let e=z(),t=e!==null?dt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:ck.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var AS=l(()=>{"use strict";dk()});var Iu=l(()=>{"use strict";te()});var Ou=l(()=>{"use strict";te()});var Mu,pk,mk,uk,iV,aV,Rn,bS=l(()=>{"use strict";Mu=m(require("node:fs")),pk=m(require("node:os")),mk=m(require("node:path"));Iu();Ou();_i();We();uk=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},iV=e=>mk.default.join(pk.default.homedir(),"Library","LaunchAgents",`${e}.plist`),aV=async e=>Mu.default.existsSync(iV(e))?(await ve(e)).ok:!1,Rn=async(e=E())=>{let t=Mu.default.existsSync(Ud(e)),r=!Mu.default.existsSync(jt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=wi(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await uk(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${oe(e)}-wake`;await aV(i)&&s.push(i);for(let c of ee(e))(await ve(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await uk(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var gk=l(()=>{"use strict";te()});var Cn,Zi=l(()=>{"use strict";Cn="connection-health.json"});var So,Nu,lV,Qi,Se,PS,ju,Oe,Du=l(()=>{"use strict";So=m(require("node:fs")),Nu=m(require("node:path"));Zi();lV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qi=e=>e.profileEmail===null?Nu.default.join(e.installDir,Cn):Nu.default.join(e.installDir,"profiles",e.profileEmail,Cn),Se=e=>{let t=Qi(e);if(!So.default.existsSync(t))return null;try{let r=JSON.parse(So.default.readFileSync(t,"utf8"));return!lV(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},PS=e=>{let t=Qi(e);So.default.existsSync(t)&&So.default.rmSync(t,{force:!0})},ju=(e,t)=>{let r=Qi(e),o=Se(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};So.default.mkdirSync(Nu.default.dirname(r),{recursive:!0}),So.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Oe=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var ea,fk=l(()=>{"use strict";Zi();Du();ea=(e,t)=>{if(!t.socketOpen)return!1;let r=Se(e);return r===null?!1:!Oe(r,t.staleAfterMs??12e4,t.nowMs)}});var wS,hk=l(()=>{"use strict";Du();wS=(e,t)=>!(e!==null&&!Oe(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var kn=l(()=>{"use strict";Du();fk();hk();Zi()});var _S=l(()=>{"use strict";kn();te()});var vS=l(()=>{"use strict";kn()});var WS=l(()=>{"use strict";te()});var Sk,yk,ta,LS=l(()=>{"use strict";Sk=m(require("node:fs"));Ut();Iu();Ou();We();yk=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},ta=async(e=E())=>{if(!Sk.default.existsSync(jt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await yk())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ee(e))(await ve(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await yk();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var Ak=l(()=>{"use strict";te()});var bk,Ao,ES,cV,dV,uV,Pk,pV,wk,xn,Hu=l(()=>{"use strict";bk=require("node:crypto"),Ao=m(require("node:fs")),ES=m(require("node:path"));We();cV="watchdog-log.ndjson",dV=200,uV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pk=(e=E())=>{let t=M(),r=t.installDir===e?t.logsDir:tn({installDir:e,profileEmail:t.profileEmail});return ES.default.join(r,cV)},pV=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!uV(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},wk=(e,t=E())=>{let r={id:(0,bk.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=Pk(t);Ao.default.mkdirSync(ES.default.dirname(o),{recursive:!0});let n=Ao.default.existsSync(o)?Ao.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-dV+1)),JSON.stringify(r)];return Ao.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},xn=(e=20,t=E())=>{let r=Pk(t);if(!Ao.default.existsSync(r))return[];let o=Ao.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=pV(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var RS,CS,kS,xS=l(()=>{"use strict";bt();RS=Ur.watchdogReinstallState,CS=900*1e3,kS=3e3});var _k=l(()=>{"use strict";xS()});var vk={};St(vk,{verifyAgentWitchReviveAfterKickstart:()=>gV});var mV,gV,Wk=l(()=>{"use strict";_k();vS();WS();We();mV=e=>new Promise(t=>{setTimeout(t,e)}),gV=async e=>{if(await mV(e.verifyDelayMs??kS),!await Vr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),o=Se(r);return!Oe(o,e.staleAfterMs)}});var ra,TS,fV,Lk,Ek,IS,OS,MS=l(()=>{"use strict";ra=m(require("node:fs")),TS=m(require("node:path"));V();xS();fV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Lk=e=>TS.default.join(e,RS),Ek=(e=E())=>{let t=Lk(e);if(!ra.default.existsSync(t))return null;try{let r=JSON.parse(ra.default.readFileSync(t,"utf8"));return!fV(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},IS=(e=E(),t=Date.now())=>{let r=Ek(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=CS:!0},OS=(e=E(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=Lk(e);return ra.default.mkdirSync(TS.default.dirname(o),{recursive:!0}),ra.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var NS,Rk=l(()=>{"use strict";te();MS();NS=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!IS())return{attempted:!1,ok:!1,targets:e};OS();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await ve(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var Ck=l(()=>{"use strict";MS();Rk()});var jS=l(()=>{"use strict";qe()});var kk=l(()=>{"use strict";qe()});var xk,Tn,Tk,Ik,Ok,hV,yV,Mk,SV,AV,Nk,jk=l(()=>{"use strict";xk=require("node:child_process"),Tn=m(require("node:fs")),Tk=m(require("node:os")),Ik=m(require("node:path")),Ok=require("node:util");jS();kk();We();hV=(0,Ok.promisify)(xk.execFile),yV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Mk=e=>{let t=nt(e),r=t===null?M():M(t);if(!Tn.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Tn.default.readFileSync(r.configPath,"utf8"));return!yV(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},SV=e=>Mk(e)?.wsUrl??null,AV=e=>{let t=SV(e);return t!==null?Ee(t):Le(e)?.appOrigin??null},Nk=async e=>{let t=e?.installDir??E(),r=Mk(t),o=r!==null?Ee(r.wsUrl):AV(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=Ik.default.join(Tk.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Tn.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??nt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await hV("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Tn.default.existsSync(i)&&Tn.default.unlinkSync(i)}}});var Dk={};St(Dk,{attemptAgentWitchWatchdogReinstall:()=>bV});var bV,Hk=l(()=>{"use strict";Ck();jk();bV=async e=>NS(e,()=>Nk())});var $k,zk,Fk,PV,wV,_V,oa,DS=l(()=>{"use strict";gk();_S();vS();WS();LS();bS();Iu();Ou();We();dn();Ak();Hu();$k=e=>e===null?M():M(e),zk=async(e,t,r)=>{if(!await Vr(e))return"not_running";let n=$k(t);if(at(n))return"healthy";let s=Se(n);return Oe(s,r)?"stale_connection":"healthy"},Fk=async e=>{let t=e?.staleAfterMs??12e4,r=E(),o=ee(r);return Promise.all(o.map(async n=>{let s=await zk(n.launchAgentLabel,n.profileEmail,t),i=$k(n.profileEmail),a=Se(i),c=await Vr(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Oe(a,t),needsRevive:s!=="healthy",reason:s}}))},PV=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},wV=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",_V=async e=>{let t=await ve(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(Wk(),vk)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},oa=async e=>{if(!st())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=E();await Rn(r),await ta(r);let o=ee(r),n=[];for(let p of o){let g=await zk(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}n.push(await _V({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let p=Gr();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(Hk(),Dk)),g=await p(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&wk({event:wV(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:PV(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var Uk,$u,Bk=l(()=>{"use strict";Uk=m(require("node:os"));_S();Hu();DS();$u=async()=>{let e=await Fk(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:Uk.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:xn(1)[0]??null}}});var HS=l(()=>{"use strict";bS();DS();Bk();Hu()});var na,sa,ia,Gk=l(()=>{"use strict";te();HS();na=async()=>{await Rn();let e=ee(),t=[];for(let r of e){let o=await ve(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Gr();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},sa=oa,ia=oa});var $S=l(()=>{"use strict";Gk()});var Fu,zu,Vk,zS,qk,vV,WV,LV,EV,RV,Uu,Kk=l(()=>{"use strict";Fu=require("node:child_process"),zu=m(require("node:fs")),Vk=m(require("node:os")),zS=m(require("node:path")),qk=require("node:util");te();V();vV=(0,qk.promisify)(Fu.execFile),WV=()=>zS.default.join(Vk.default.homedir(),"Library","LaunchAgents"),LV=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await vV("launchctl",["bootout",r]).catch(()=>{})},EV=e=>{let t=zS.default.join(WV(),`${e}.plist`);zu.default.existsSync(t)&&zu.default.unlinkSync(t)},RV=e=>{(0,Fu.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Uu=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=E();if(!zu.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Dt(e);for(let r of t)await LV(r),EV(r);return RV(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var Jk,Bu,Yk,In,Xk,CV,kV,xV,FS,TV,US,Zk=l(()=>{"use strict";Jk=require("node:child_process"),Bu=m(require("node:fs")),Yk=m(require("node:os")),In=m(require("node:path")),Xk=require("node:util");te();CV=(0,Xk.promisify)(Jk.execFile),kV=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],xV=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],FS=e=>{Bu.default.existsSync(e)&&Bu.default.rmSync(e,{force:!0})},TV=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await CV("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},US=async e=>{let r=(e.listLaunchAgentLabels??Dt)(e.layout.installDir),o=e.launchAgentsDir??In.default.join(Yk.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??TV;for(let i of r)await n(i),FS(In.default.join(o,`${i}.plist`));let s=In.default.dirname(e.layout.configPath);for(let i of kV)FS(In.default.join(s,i));for(let i of xV)FS(In.default.join(e.layout.installDir,i));return Bu.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var BS,Qk=l(()=>{"use strict";BS={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var GS,ex=l(()=>{"use strict";GS="unknown_identity"});var VS=l(()=>{"use strict";Qk();ex()});var IV,qS,tx=l(()=>{"use strict";VS();IV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qS=e=>e.type!=="system.error"||!IV(e.payload)?!1:e.payload.errorCode===GS});var KS=l(()=>{"use strict";Kk();Zk();tx()});var Gu=l(()=>{"use strict";te();qe();KS();HS()});var On,Vu,qu=l(()=>{"use strict";Gu();On=(e=20)=>xn(e),Vu=$u});var Ku,Mn,Ju,Yu=l(()=>{"use strict";Gu();Ku=no,Mn=(e=20)=>to(e),Ju=e=>oo(e)});var Xu,JS=l(()=>{"use strict";Gu();Xu=()=>Uu()});var rx=l(()=>{"use strict";sy();Ky();AS();$S();qu();Yu();JS()});var ox={};St(ox,{buildAgentWitchAutomationStatusFromWakeServer:()=>Xi,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Ku,buildAgentWitchWakeHealthResponse:()=>Wi,buildAgentWitchWakeIdentityResponse:()=>Li,buildAgentWitchWatchdogStatus:()=>Vu,installHarnessFromWakeServer:()=>Hi,readAgentWitchSelfUpdateLogEntries:()=>Mn,readAgentWitchWatchdogLogEntries:()=>On,restartAgentWitchFromWakeServer:()=>ia,reviveAgentWitchWebSocketFromWakeServer:()=>sa,runAgentWitchSelfUpdateFromWakeServer:()=>Ju,runAgentWitchUninstallLocalFromWakeServer:()=>Xu,runAutomationFromWakeServer:()=>Yi,syncAutomationsFromWakeServer:()=>Ji,wakeAgentWitchLaunchAgents:()=>na});var nx=l(()=>{"use strict";rx()});var sx,ix,YS,XS,ax=l(()=>{"use strict";sx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),ix=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?sx(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?sx(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},YS=e=>{let t=e.watchdogLogs.map(ix).join(""),r=e.updateLogs.map(ix).join("");return`<!doctype html>
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
</html>`},XS=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var lx,cx,dx=l(()=>{"use strict";lx=m(require("node:net")),cx=()=>new Promise((e,t)=>{let r=lx.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var ux,OV,ZS,px=l(()=>{"use strict";ux=m(require("node:net"));dx();vi();_i();We();OV=e=>new Promise(t=>{let r=ux.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),ZS=async()=>{let e=E(),t=ct();if(await OV(t))return iR(t),t;let r=await cx();return Bd(e,r),r}});var MV,QS,mx=l(()=>{"use strict";MV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),QS=e=>({force:MV(e)&&e.force===!0})});var aa=l(()=>{"use strict";ji();ax();px();mx();Hf();bd();nn()});var eA,j,tA,rA,la,gx=l(()=>{"use strict";eA=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},tA=e=>{e.writeHead(403),e.end()},rA=e=>e.url?.split("?")[0]??"/",la=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var pt=l(()=>{"use strict";gx()});var NV,fx,hx=l(()=>{"use strict";AS();pt();NV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},fx=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,Xi(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await NV(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Ji(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Yi(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var jV,Sx,yx,Ax,oA,bx,nA=l(()=>{"use strict";jV=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],Sx=e=>/embed|minilm|^bge-/i.test(e),yx=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),Ax=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),oA=e=>e.filter(t=>t.trim().length>0&&!Sx(t)),bx=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!Sx(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>yx(s,o));if(n!==void 0)return n}for(let n of jV){let s=r.find(i=>yx(i,n));if(s!==void 0)return s}return r[0]??null}});var sA,_x,vx,Zu,Wx,Px,wx,DV,HV,$V,zV,FV,UV,mt,ca=l(()=>{"use strict";sA=require("node:child_process"),_x=m(require("node:fs")),vx=m(require("node:os")),Zu=m(require("node:path"));qe();lt();nA();Wx=3e3,Px=["claude-cli","codex","cursor","antigravity"],wx={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},DV=(e,t)=>new Promise(r=>{let o=(0,sA.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},Wx);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),HV=()=>{let e=vx.default.homedir();return["ollama",Zu.default.join(e,".local","bin","ollama"),Zu.default.join(e,".agent-witch","ollama","ollama"),Zu.default.join(e,".local-agent-witch","ollama","ollama")]},$V=e=>new Promise(t=>{let r=(0,sA.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},Wx);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(Ax(Buffer.concat(o).toString("utf8")))})}),zV=async()=>{for(let e of HV()){if(e!=="ollama"&&!_x.default.existsSync(e))continue;let t=await $V(e);if(t!==null)return t}return[]},FV=e=>{let t=e.installedWriterIds.map(s=>wx[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=ie(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${wx[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},UV=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:un},mt=async e=>{let t=Px.map(i=>{let a=kd(i,e.commands);return DV(a.command,a.args)}),[r,...o]=await Promise.all([zV(),...t]),n=Px.flatMap((i,a)=>o[a]===!0?[i]:[]),s=bx(r,UV());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:FV({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var BV,GV,iA,Lx=l(()=>{"use strict";BV="http://127.0.0.1:11434",GV=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},iA=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||BV;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?GV(await o.json()):null}catch{return null}}});var aA=l(()=>{"use strict";lt();ca();Lx();nA()});var VV,Ex,Rx=l(()=>{"use strict";aA();VV={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},Ex=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:VV[t]})),ollamaModels:oA(e.ollamaModels)})});var qV,Cx,kx=l(()=>{"use strict";aA();pt();Rx();qV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Cx=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await mt({commands:ae({})});return j(e.response,200,{ok:!0,...Ex({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await qV(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await iA({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var KV,xx,Tx=l(()=>{"use strict";Ky();pt();KV=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},xx=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await KV(e);if(t===null)return!0;let r=Hi(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var Ix=l(()=>{"use strict";ut()});var lA,Ox=l(()=>{"use strict";Ix();Di();lA=e=>{if(!qt(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Ue({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Mx,cA,dA=l(()=>{"use strict";le();ut();Di();Mx=e=>{if(!qt(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},cA=async e=>{let t=Mx(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Wr("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=z();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Z({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Ue({projectFolderPath:r}),await Gi(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var Nx=l(()=>{"use strict";Ox();dA()});var jx,Dx=l(()=>{"use strict";Nx();dA();pt();jx=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=lA(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await cA(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var Hx,$x=l(()=>{"use strict";aa();Yu();qu();Hx=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=On(50),r=Mn(50);return e.response.writeHead(200,XS()),e.response.end(YS({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var zx,Fx=l(()=>{"use strict";sy();pt();zx=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,Wi(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,Li(),e.cors.headers),!0):!1});var Ux,Bx=l(()=>{"use strict";JS();pt();Ux=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Xu();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var Gx,Vx=l(()=>{"use strict";$S();pt();Gx=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await sa();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await ia();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await na();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var qx,Kx=l(()=>{"use strict";aa();Yu();pt();qx=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Ku();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=la(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:Mn(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=QS(t),o=await Ju({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var Jx,Yx=l(()=>{"use strict";qu();pt();Jx=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Vu();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=la(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:On(t)},e.cors.headers),!0}return!1}});var Xx,Zx=l(()=>{"use strict";hx();kx();Tx();Dx();$x();Fx();Bx();Vx();Kx();Yx();Xx=[zx,Hx,Jx,Gx,qx,Ux,xx,jx,fx,Cx]});var Qx,eT=l(()=>{"use strict";Zx();Qx=async e=>{for(let t of Xx)if(await t(e))return!0;return!1}});var JV,tT,rT=l(()=>{"use strict";ji();pt();eT();JV=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:rA(e),readJsonBody:()=>eA(e)}),tT=async(e,t,r)=>{let o=e.headers.origin,n=bu(o);try{if(o!==void 0&&o.length>0&&!n.allowed){tA(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=JV(e,t,r,n);if(await Qx(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var oT,bo,Qu,ep=l(()=>{"use strict";oT=m(require("node:http"));aa();rT();bo=async()=>{let e=await ZS(),t=oT.default.createServer((r,o)=>{tT(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Qu=bo});var nT={};St(nT,{runAgentWitchBridgeCli:()=>YV});var YV,sT=l(()=>{"use strict";te();ep();YV=async()=>{ze("agent-witch-bridge");let e=await bo(),t=$t(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var iT=l(()=>{"use strict";Ut()});var Nn,uA,aT=l(()=>{"use strict";Nn=(e,t,r)=>e===1?t:r,uA=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Nn(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Nn(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Nn(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Nn(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Nn(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${Nn(p,"year","years")} ago`}});var Po,pA,XV,ZV,mA,Lr,da,gA,lT=l(()=>{"use strict";Po=m(require("node:fs")),pA=m(require("node:path")),XV="local-ws-traffic.ndjson",ZV=500,mA=e=>pA.default.join(e.logsDir,XV),Lr=(e,t)=>{let r=mA(e);Po.default.mkdirSync(pA.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Po.default.appendFileSync(r,`${o}
`,"utf8")},da=(e,t=ZV)=>{let r=mA(e);if(!Po.default.existsSync(r))return[];let n=Po.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},gA=e=>{let t=mA(e);Po.default.existsSync(t)&&Po.default.writeFileSync(t,"","utf8")}});var QV,cT,dT,uT=l(()=>{"use strict";VS();QV=new Set(Object.values(BS)),cT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dT=e=>{if(!cT(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!QV.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!cT(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var pT,mT=l(()=>{"use strict";pT=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var eq,tq,rq,ua,gT=l(()=>{"use strict";mT();eq=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,tq=e=>eq.test(e),rq=e=>pT(e),ua=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>ua(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&tq(o)){r[o]=rq(n);continue}r[o]=ua(n)}return r}});var Lt,fA,oq,nq,sq,hA,fT,hT,yT,iq,tp,wo,rp,yA,ST=l(()=>{"use strict";Lt=m(require("node:fs")),fA=m(require("node:path"));uT();gT();oq="local-ws-trace.ndjson",nq=1e4,sq=1440*60*1e3,hA=e=>fA.default.join(e.logsDir,oq),fT=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},hT=e=>{if(!Lt.default.existsSync(e))return;let t=Lt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-sq,n=t.filter(s=>{let i=fT(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-nq);Lt.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},yT=(e,t)=>{let r=hA(e);Lt.default.mkdirSync(fA.default.dirname(r),{recursive:!0}),Lt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),hT(r)},iq=e=>e.parsed===null?{_empty:!0}:ua(e.parsed),tp=(e,t,r)=>{let o=dT(r);yT(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:iq(o)})},wo=(e,t)=>{yT(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:ua({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},rp=(e,t=80)=>{let r=hA(e);if(hT(r),!Lt.default.existsSync(r))return[];let o=Lt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=fT(s);i!==null&&n.push(i)}return n.reverse()},yA=e=>{let t=hA(e);Lt.default.existsSync(t)&&Lt.default.writeFileSync(t,"","utf8")}});var Er,AT,aq,SA,op,bT=l(()=>{"use strict";Er=m(require("node:fs")),AT=m(require("node:path")),aq=256e3,SA=e=>{Er.default.mkdirSync(AT.default.dirname(e),{recursive:!0}),Er.default.writeFileSync(e,"","utf8")},op=(e,t=aq)=>{if(!Er.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Er.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Er.default.openSync(e,"r");try{Er.default.readSync(a,i,0,s,n)}finally{Er.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var pa=l(()=>{"use strict";lT();ST();bT()});var AA,bA,PT=l(()=>{"use strict";AA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bA=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${AA(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${AA(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${AA(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var wT=l(()=>{"use strict";PT()});var PA,wA=l(()=>{"use strict";PA=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var _A=l(()=>{"use strict";Zi()});var vA,WA,_T=l(()=>{"use strict";_A();vA=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},WA=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var vT=l(()=>{"use strict";wA();_T()});var WT,ma,LA,ga=l(()=>{"use strict";wA();WT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ma=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=WT(e),r=WT(PA(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},LA=`(function () {
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
})();`});var _o,lq,EA,LT=l(()=>{"use strict";_o=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lq=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},EA=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${_o(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?_o(r.direction):_o(r.kind),i=`trace-body-${o}`,a=_o(lq(r.body));return`<tr>
        <td title="${_o(r.at)}">${_o(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${_o(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var RT,ET,RA,CT=l(()=>{"use strict";RT=m(require("node:path"));V();Ut();ET=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RA=e=>{let t=oe(e.installDir),o=`AW_HOME="$HOME/${RT.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${ET(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${ET(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var kT=l(()=>{"use strict";ga();LT();CT();ga()});var cq,Jt,fa=l(()=>{"use strict";cq=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Jt=cq});var xT,TT,IT,OT,MT,NT,jT,jn=l(()=>{"use strict";xT="projects",TT="knowledge",IT="chunks.ndjson",OT="lessons.ndjson",MT="error-chunks.ndjson",NT="usage-stats.json",jT="knowledge-location.json"});var np,dq,sp,CA=l(()=>{"use strict";np=m(require("node:path"));jn();dq=(e,t)=>{let r=t.trim(),o=np.default.join(e.installDir,xT,r,TT);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:np.default.join(o,IT),memoryRunsFilePath:np.default.join(o,OT)}},sp=dq});var kA,uq,DT,HT=l(()=>{"use strict";kA=m(require("node:fs"));jn();co();uq=e=>{let t=Je(e.projectFolderPath),r=`${t.metaDirPath}/${jT}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};kA.default.mkdirSync(t.metaDirPath,{recursive:!0}),kA.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},DT=uq});var Dn,zT,$T,pq,FT,UT=l(()=>{"use strict";Dn=m(require("node:fs")),zT=m(require("node:path"));Yr();co();CA();HT();$T=(e,t)=>{Dn.default.existsSync(e)&&(Dn.default.existsSync(t)&&Dn.default.statSync(t).size>0||(Dn.default.mkdirSync(zT.default.dirname(t),{recursive:!0}),Dn.default.copyFileSync(e,t)))},pq=e=>{let t=Je(e.projectFolderPath),r=sp(e.layout,e.projectId),o=`${t.memoryDirPath}/${rn}`;$T(t.ragChunksFilePath,r.ragChunksFilePath),$T(o,r.memoryRunsFilePath),DT({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},FT=pq});var xA,mq,BT,GT=l(()=>{"use strict";xA=m(require("node:fs"));co();mq=e=>{let t=Je(e);if(!xA.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(xA.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},BT=mq});var VT,gq,Hn,ip=l(()=>{"use strict";VT=m(require("node:path"));Yr();co();UT();GT();CA();gq=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=BT(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){FT({layout:e.layout,projectFolderPath:t,projectId:o});let s=sp(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=Je(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:VT.default.join(n.memoryDirPath,rn),projectId:null}},Hn=gq});var ap,hq,lp,TA=l(()=>{"use strict";ap=m(require("node:fs"));jn();hq=(e,t=500)=>{if(!ap.default.existsSync(e))return;let r=ap.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);ap.default.writeFileSync(e,`${o.join(`
`)}
`)},lp=hq});var cp,yq,vo,IA=l(()=>{"use strict";cp=m(require("node:path"));jn();ip();yq=e=>{let t=Hn(e);if(t===null)return null;let r=cp.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:cp.default.join(r,NT),errorChunksFilePath:cp.default.join(r,MT)}},vo=yq});var KT,ha,JT,qT,OA,YT,bq,MA,XT,NA,jA,DA,HA=l(()=>{"use strict";KT=require("node:crypto"),ha=m(require("node:fs")),JT=m(require("node:path"));fa();jn();IA();qT=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),OA=e=>{if(!ha.default.existsSync(e))return qT();try{let t=JSON.parse(ha.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return qT()},YT=(e,t)=>{ha.default.mkdirSync(JT.default.dirname(e),{recursive:!0}),ha.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},bq=e=>{let t=Jt(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,KT.createHash)("sha256").update(o).digest("hex").slice(0,16)},MA=e=>{let t=vo(e);return t===null?null:OA(t.usageStatsFilePath)},XT=e=>{if(e.chunkIds.length===0)return;let t=vo(e);if(t===null)return;let r=OA(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;YT(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},NA=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=vo(e);if(r===null)return null;let o=bq(t),n=OA(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return YT(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},jA=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,DA=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var ya,ZT,Pq,wq,QT,_q,$A,Sa,$n,zA,zn,FA,UA=l(()=>{"use strict";ya=m(require("node:fs")),ZT=m(require("node:path"));fa();ip();TA();HA();Pq="http://127.0.0.1:11434",wq="nomic-embed-text",QT=(e,t,r)=>Hn({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,_q=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},$A=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Sa=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Pq,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||wq;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},$n=(e,t,r)=>{let o=QT(e,t,r);if(o===null||!ya.default.existsSync(o))return[];let n=ya.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},zA=async e=>{let t=Jt(e.text),r=$A(t);if(r.length===0)return 0;let o=QT(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;ya.default.mkdirSync(ZT.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Sa(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};ya.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return lp(o),n},zn=async e=>{let t=await Sa(e.query);if(t===null)return[];let r=e.minScore??0,s=$n(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:_q(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return XT({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},FA=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Aa,e0,vq,Wq,BA,GA,VA,t0=l(()=>{"use strict";Aa=m(require("node:fs")),e0=m(require("node:path"));fa();IA();TA();UA();vq=e=>{if(!Aa.default.existsSync(e))return[];let t=Aa.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},Wq=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},BA=async e=>{let t=vo(e);if(t===null)return 0;let r=Jt(e.text),o=$A(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Aa.default.mkdirSync(e0.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Sa(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Aa.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return lp(n,200),s},GA=async e=>{let t=vo(e);if(t===null)return[];let r=await Sa(e.query);if(r===null)return[];let o=e.minScore??.3;return vq(t.errorChunksFilePath).map(s=>({chunk:s,score:Wq(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},VA=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var qA=l(()=>{"use strict";UA();HA();t0()});var KA,r0=l(()=>{"use strict";KA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var o0=l(()=>{"use strict";r0()});var ge,JA,YA=l(()=>{"use strict";o0();ge=KA,JA=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${ge.gray50};
  --aw-zinc-100: ${ge.gray100};
  --aw-zinc-200: ${ge.gray200};
  --aw-zinc-400: ${ge.gray400};
  --aw-zinc-500: ${ge.gray500};
  --aw-zinc-600: ${ge.gray600};
  --aw-zinc-700: ${ge.gray700};
  --aw-zinc-800: ${ge.gray900};
  --aw-zinc-900: ${ge.gray900};
  --aw-brand-600: ${ge.brand600};
  --aw-brand-700: ${ge.brand700};
  --aw-brand-50: ${ge.brand50};
  --aw-emerald-50: ${ge.success50};
  --aw-emerald-700: ${ge.success700};
  --aw-amber-50: ${ge.warning50};
  --aw-amber-900: ${ge.warning900};
  --aw-red-50: ${ge.error50};
  --aw-red-700: ${ge.error700};
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
.sdlc-compose-step[data-sdlc-compose-step="4"] .sdlc-submit.sdlc-compose-step-actions {
  padding-top: 0.65rem;
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
`.trim()});var Lq,Eq,XA,n0,ZA,s0=l(()=>{"use strict";YA();ga();Lq=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,Eq=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],XA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n0=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${Lq}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,ZA=e=>{let t=Eq.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=XA(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=XA(e.installBundleVersionLabel?.trim()??"unknown"),s=n0("brand brand-in-sidebar",n),i=n0("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${XA(e.title)} \xB7 Agent Witch Local</title>
  <style>${JA}</style>
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
  <script>${LA}</script>
</body>
</html>`}});var dp,ba,up=l(()=>{"use strict";dp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ba=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${dp(e.syncMessage)}</p>`:"",o=dp(e.manageHref),n=dp(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${dp(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var QA,eb,tb,i0=l(()=>{"use strict";QA=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,eb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,tb=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var a0=l(()=>{"use strict";s0();up();i0()});var Fn,rb,l0=l(()=>{"use strict";ga();Fn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rb=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Fn(e.wakeError)}</div>`:"",a=ma(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Fn(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Fn(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Fn(o)}</p>
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
        <p class="home-card-meta">${Fn(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Fn(n)}</p>
      </a>
    </div>`}});var c0=l(()=>{"use strict";l0()});var pp,mp,gp,d0,ob=l(()=>{"use strict";pp="support-reply",mp="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",gp=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),d0=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var fp,u0,p0=l(()=>{"use strict";ob();fp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),u0=()=>`<section class="card">
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
      <p>${fp(mp)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${fp(gp)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${fp(d0)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${fp(pp)}">Run this sample</a>
      </div>
    </section>`});var C,hp=l(()=>{"use strict";C=e=>e==="passed"||e==="stopped"||e==="failed"});var m0,nb,Wo,sb,Pa=l(()=>{"use strict";m0="Stopped at the round limit. The best prompt is kept.",nb="Stopped because the score stopped rising. The best prompt is kept.",Wo="Finished. The best prompt is the result.",sb="Wizard ended. Progress from finished steps is kept."});var wa,ib=l(()=>{"use strict";wa=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var Rq,Cq,_a,g0,yp=l(()=>{"use strict";Rq=/\n+|;\s+/,Cq=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,_a=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(Rq).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,Cq(s)]},[]);return[...t,...o]},[]),g0=e=>{let t=_a(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ce,Un=l(()=>{"use strict";ce=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var va,ab=l(()=>{"use strict";yp();Un();va=e=>{let t=[...e.priorRounds,e.current],r=ce(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:g0(o)}}});var lb,kq,xq,Sp,cb=l(()=>{"use strict";lb={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},kq=e=>{try{let t=JSON.parse(e.fragment);return{...lb,objects:[...e.objects,t]}}catch{return{...lb,objects:e.objects}}},xq=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:kq(r)},Sp=e=>[...e].reduce(xq,lb).objects});var Tq,db,Iq,f0,ub=l(()=>{"use strict";cb();Tq=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},db=e=>{let t=Sp(e).filter(Tq),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},Iq=(e,t)=>({...e,passed:e.score>=t}),f0=(e,t)=>{let r=db(e);return r===null?null:Iq(r,t)}});var pb,mb,Ap=l(()=>{"use strict";pb="The judge reply needs a score and a reason.",mb="The improver reply was empty."});var h0,y0=l(()=>{"use strict";h0=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var S0,A0=l(()=>{"use strict";S0=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var Mq,b0,P0=l(()=>{"use strict";y0();A0();Pa();yp();Mq=e=>{let t=_a(e);return t.length===0?nb:`${nb} Avoid: ${t.join("; ")}.`},b0=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:m0};if(h0(e.scores)>=3){let t=e.scores.map((r,o)=>({score:r,reasons:e.reasons?.[o]??""}));return{type:"stopped",errorMessage:Mq(S0(t))}}return null}});var Rr,Nq,gb,w0,bp=l(()=>{"use strict";Rr=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},Nq=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,gb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",Nq(e.tokens),`Delay: ${Rr(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},w0=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var jq,_0,v0=l(()=>{"use strict";ub();jq=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,_0=e=>{let r=(jq.exec(e)?.[1]??e).trim();return r.length===0||db(r)!==null?null:r}});var W0,Pp,L0=l(()=>{"use strict";bp();v0();Ap();W0=e=>({type:"call",role:"judge",choice:e.choice,prompt:w0({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),Pp=e=>{let t=_0(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:mb}}:{nextPrompt:t,continuation:W0({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var fb,E0=l(()=>{"use strict";ib();ab();ub();Ap();Pa();P0();Ap();L0();fb=e=>{let t=f0(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:pb}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=b0({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=va({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:wa({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Wa,hb=l(()=>{"use strict";Wa=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var R0=l(()=>{"use strict"});var C0=l(()=>{"use strict"});var Dq,Hq,$q,k0,zq,La,wp=l(()=>{"use strict";cb();Dq=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},Hq=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},$q=e=>[...e].reduce(Hq,{out:"",inString:!1,escaped:!1}).out,k0=e=>{let t=Sp(e);return t.length===0?null:t[t.length-1]},zq=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},La=e=>{let t=Dq(e),r=k0(t);if(r!==null)return r;let o=$q(t),n=k0(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw zq(i)}}});var x0=l(()=>{"use strict";Pa();wp()});var T0=l(()=>{"use strict"});var I0=l(()=>{"use strict";T0()});var Sb,O0=l(()=>{"use strict";Sb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var Fq,Ab,M0=l(()=>{"use strict";bp();Fq=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Ab=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",Fq(e.tokens),`Delay: ${Rr(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var Uq,Bq,Gq,bb,N0=l(()=>{"use strict";Uq=/[A-Za-z0-9_./~-]{3,180}/g,Bq=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,Gq=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||Bq.test(t)},bb=(e,t=12)=>{let r=[];for(let o of e.matchAll(Uq)){let n=o[0].replace(/\.+$/,"");if(!(!Gq(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Ea,j0=l(()=>{"use strict";Ea=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var _p,Pb,D0,wb,_b=l(()=>{"use strict";_p=e=>Math.floor(e/2),Pb=e=>Math.max(_p(e)+1,e-20),D0=(e,t)=>e>=t?"passes":e>=Pb(t)?"close":e>=_p(t)?"weak":"bad",wb=e=>[{band:"bad",label:`0\u2013${_p(e)-1} bad`},{band:"weak",label:`${_p(e)}\u2013${Pb(e)-1} weak`},{band:"close",label:`${Pb(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var vp,vb=l(()=>{"use strict";_b();vp=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${D0(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var H0,$0=l(()=>{"use strict";H0=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var z0,F0=l(()=>{"use strict";z0=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var Vq,qq,U0,B0=l(()=>{"use strict";hp();vb();$0();F0();Vq=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],qq=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",U0=e=>{let t=e.wizard;if(t===void 0)return[];let r=H0(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=Vq.map((p,g)=>{let S=!s&&!n&&g===r?"active":"done";return{id:`wizard-${g+1}`,label:p,state:S,detail:null}}).filter((p,g)=>s?!0:g<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=z0(t)&&(!n||a)?vp(e):[],d=C(e.status)&&!s?[{id:"end",label:qq(e),state:"done",detail:e.errorMessage}]:[];return[...i,...c,...d]}});var Kq,Wb,G0=l(()=>{"use strict";hp();vb();B0();Kq=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",Wb=e=>{if(e.wizard!==void 0)return U0(e);let t=vp(e),r=C(e.status)?[{id:"end",label:Kq(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var V0=l(()=>{"use strict";Ut()});var q0,Ra,Ca,Gn,Wp,Lb,K0=l(()=>{"use strict";V0();q0="/prompt-optimizer/agent",Ra=`${Ft}${q0}`,Ca=`${Ft}/prompt-optimizer`,Gn="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Wp=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Gn}`,Lb="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Yt=l(()=>{"use strict"});var Eb,J0=l(()=>{"use strict";Eb="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var Y0,X0=l(()=>{"use strict";Y0=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var ka,Q0=l(()=>{"use strict";X0();Yt();ka=e=>({schemaVersion:3,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:Y0(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{}})});var Rb,eI=l(()=>{"use strict";Rb=e=>({...e,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null}))})});var Cb,tI=l(()=>{"use strict";Yt();Cb=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var rI,kb,oI=l(()=>{"use strict";rI=["generalize","evaluate","separate","optimize_modules"],kb=(e,t)=>{let r=rI.indexOf(t);if(r===-1)return e;let o=rI.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Lp,xb=l(()=>{"use strict";yp();Lp=e=>{let t=_a(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Tb,nI=l(()=>{"use strict";xb();Tb=e=>{let t=Lp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var Yq,Xq,Zq,sI,iI=l(()=>{"use strict";Yq=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Xq=/^\{\{[a-zA-Z0-9_-]+\}\}$/,Zq=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(Yq(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},sI=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>Xq.test(n)?n:Zq(n,r)).join("")}});var Ib,aI=l(()=>{"use strict";iI();Ib=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:sI(o.prompt,t)}))}))});var Qq,Mb,lI=l(()=>{"use strict";Yt();xb();Qq=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Mb=e=>{let t=Lp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=Qq(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Nb,cI=l(()=>{"use strict";hb();Nb=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Wa({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var xa,jb=l(()=>{"use strict";Un();xa=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var Db,dI=l(()=>{"use strict";jb();Db=e=>{let t=xa({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Ta,uI=l(()=>{"use strict";Ta=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var eK,tK,fe,Hb=l(()=>{"use strict";Yt();eK=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},tK=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,fe=e=>{let t=e.modules.map((s,i)=>({moduleId:s.moduleId,title:s.title,bestScore:s.statistics?.bestScore??null,tokens:eK(e,i),status:s.status})),r=t.length,o=t.filter((s,i)=>tK(e.modules[i])).length,n=r>0&&o===r?"passed":"stopped";return{passedModuleCount:o,totalModules:r,terminalStatusSuggestion:n,rows:t}}});var $b,pI=l(()=>{"use strict";Yt();Hb();$b=e=>{let t=fe(e.wizard),r=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${70})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(o=>`| ${o.title.replaceAll("|","\\|")} | ${o.bestScore??"\u2014"} | ${o.tokens??"\u2014"} | ${o.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&r.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((o,n)=>{let s=o.statistics?.bestRunOutput?.trim();s===void 0||s.length===0||r.push("",`## Module ${n+1}: ${o.title}`,"","```",s,"```")}),`${r.join(`
`)}
`}});var zb,mI=l(()=>{"use strict";zb=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var gt,rK,Fb,gI=l(()=>{"use strict";gt=m(Is());wp();rK=(0,gt.isType)({name:gt.isNonEmptyString,description:gt.isString,sampleValue:gt.isString}),Fb=e=>{let t=La(e);if(!(0,gt.isType)({templatedPrompt:gt.isNonEmptyString,variables:(0,gt.isArrayWithEachItem)(rK)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ne,oK,nK,Ub,fI=l(()=>{"use strict";ne=m(Is());Yt();wp();oK=(0,ne.isType)({id:ne.isNonEmptyString,title:ne.isNonEmptyString,prompt:ne.isNonEmptyString,order:ne.isNumber}),nK=(0,ne.isType)({id:ne.isNonEmptyString,title:ne.isNonEmptyString,summary:ne.isString,topology:(0,ne.isOneOf)("chain","parallel"),modules:(0,ne.isArrayWithEachItem)(oK),recommended:ne.isBoolean}),Ub=e=>{let t=La(e);if(!(0,ne.isType)({options:(0,ne.isArrayWithEachItem)(nK)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Vn,hI=l(()=>{"use strict";Vn=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var sK,Ia,Bb=l(()=>{"use strict";sK=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ia=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(sK,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Oa,Ma,yI=l(()=>{"use strict";Un();Bb();Oa=e=>Ia(e.templatedPrompt,e.variables),Ma=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ce(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Oa(e.wizard)}});var iK,Na,SI=l(()=>{"use strict";iK=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Na=(e,t)=>e.replace(iK,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var aK,Lo,Ep=l(()=>{"use strict";aK=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Lo=e=>{let t=new Set,r=[];for(let o of e.matchAll(aK)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var ja,AI=l(()=>{"use strict";Ep();ja=e=>e.variables.length>0||Lo(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var Gb,Vb=l(()=>{"use strict";Yt();Gb=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Da,bI=l(()=>{"use strict";Un();Vb();Da=e=>{let t=e.wizard.evaluateSelectedRound??ce(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:Gb(r.judgement)}});var Ha,PI=l(()=>{"use strict";Ha=e=>e.length===1&&e[0].modules.length===1});var qb,wI=l(()=>{"use strict";qb=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var $a,Eo,_I=l(()=>{"use strict";$a=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Eo=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var lK,Rp,Kb,vI=l(()=>{"use strict";Ep();lK="wizardParam_",Rp=e=>`${lK}${e}`,Kb=e=>{let t=Lo(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Rp(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Ro,WI=l(()=>{"use strict";Ro=["generalize","evaluate","separate","optimize_modules"]});var k=l(()=>{"use strict";hp();Pa();E0();ib();bp();hb();R0();C0();x0();I0();O0();M0();N0();ab();j0();Un();G0();_b();K0();Yt();J0();Q0();eI();tI();oI();nI();aI();lI();cI();jb();dI();uI();Hb();pI();mI();gI();fI();hI();yI();Bb();SI();Ep();AI();bI();PI();Vb();wI();_I();vI();WI()});var Jb,Cp,cK,CI,kI=l(()=>{"use strict";Jb=m(require("node:fs")),Cp=m(require("node:path")),cK=e=>Cp.default.join(Cp.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),CI=(e,t)=>{let r=cK(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;Jb.default.mkdirSync(Cp.default.dirname(r),{recursive:!0}),Jb.default.appendFileSync(r,o,"utf8")}});var qn,xI,dK,TI,uK,II,Et,J,OI,F,Be=l(()=>{"use strict";qn=m(require("node:fs")),xI=m(require("node:path"));k();kI();dK=e=>e.wizard===void 0?e:{...e,wizard:Rb(e.wizard)},TI=new Set,uK=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),II=(e,t)=>{qn.default.mkdirSync(xI.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;qn.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),qn.default.renameSync(r,e)},Et=e=>{if(!qn.default.existsSync(e))return[];try{let t=JSON.parse(qn.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(uK).map(dK):[]}catch{return[]}},J=(e,t)=>Et(e).find(r=>r.id===t)??null,OI=(e,t)=>{TI.add(t);let r=Et(e).filter(o=>o.id!==t);II(e,r)},F=(e,t)=>{if(TI.has(t.id))return;let r=Et(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];II(e,o),CI(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var MI,kp,Yb,ko,Xb,Rt,xo,Ce,Ye=l(()=>{"use strict";MI=m(require("node:fs")),kp=m(require("node:os")),Yb=m(require("node:path"));ut();ko="~",Xb=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Rt=e=>{let t=kp.default.homedir(),r=Xb(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},xo=e=>{let t=e.trim().length===0?"~":e.trim(),r=Ke(t),o=Yb.default.isAbsolute(r)?Xb(r):Xb(Yb.default.resolve(kp.default.homedir(),r));try{if(!MI.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:Rt(o)}},Ce=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:kp.default.homedir()});var za=l(()=>{"use strict";lt();ca();xd()});var pK,NI,jI=l(()=>{"use strict";za();pK=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,NI=e=>{let t=hn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(pK)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var mK,gK,DI,Zb,fK,hK,ft,HI,$I,To=l(()=>{"use strict";za();jI();mK="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",gK="The writer waited on terminal input and did not return a prompt.",DI=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Zb=e=>{let t=e.trim();if(t.length===0||t.length>=500||!DI.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>DI.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},fK=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},hK=e=>Zb(e.stdout)??Zb(e.stderr)??(fK(e.replyFile)?Zb(e.replyFile):null),ft=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return mK;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?gK:null},HI=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],$I=e=>{let t=e.replyFileText?.trim()??"",r=ft([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=hK({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null)return{ok:!1,errorMessage:o};let n=NI([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=hn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply."}}});var Kn,Ct,Fa,zI,xp,yK,FI,UI,BI,Qb=l(()=>{"use strict";Kn=m(require("node:fs")),Ct=m(require("node:path")),Fa=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},zI=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),xp=(e,t)=>{let r=Fa(e);return r.length>0?r:Fa(t)},yK=e=>{let t=xp(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${zI(o)}`,...n.length>0?[`description: ${zI(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},FI=e=>`.cursor/skills/${e}/SKILL.md`,UI=(e,t)=>{let r=Fa(t);if(r.length===0)return!1;let o=Ct.default.resolve(e),n=Ct.default.resolve(o,".cursor","skills"),s=Ct.default.resolve(o,FI(r));return s.startsWith(`${n}${Ct.default.sep}`)?Kn.default.existsSync(s):!1},BI=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(xp(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Ct.default.resolve(e.workingDirectory);try{if(!Kn.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=yK({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=FI(r.slug),n=Ct.default.resolve(t,".cursor","skills"),s=Ct.default.resolve(t,o);if(!s.startsWith(`${n}${Ct.default.sep}`))return{ok:!1,errorCode:"path"};if(Kn.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Kn.default.mkdirSync(Ct.default.dirname(s),{recursive:!0}),Kn.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var SK,GI,VI,qI=l(()=>{"use strict";k();k();Be();Ye();To();Qb();SK=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,GI=e=>{let t=e.get("savedSkill");return t!==null&&SK.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},VI=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=J(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!C(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ce(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||ft(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=BI({workingDirectory:Ce(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Jn,Tp=l(()=>{"use strict";k();Jn=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=qb(t);return{...e,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:$a(r.variables)},updatedAt:new Date().toISOString()}}});var Yn,Ip=l(()=>{"use strict";Yn=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var T,AK,Op,be,Io,JI,KI,YI,XI,Me=l(()=>{"use strict";T="manual",AK=["claude-cli","codex","cursor","antigravity"],Op={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},be=e=>e===T?"You":e in Op?Op[e]:e,Io=e=>AK.filter(t=>e.includes(t)),JI=e=>{let t=Io(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},KI=(e,t)=>t===T?T:e.find(r=>r===t)??null,YI=(e,t,r)=>{let o=Io(e),n=KI(o,t),s=KI(o,r);return n===null||s===null?null:{judge:n,improver:s}},XI=(e,t,r)=>{let o=Io(e);return t===null||t.trim()===""?r!==T?r:o[0]??null:t===T?null:o.find(n=>n===t)??null}});var eP,ZI,QI=l(()=>{"use strict";eP={ok:!1,errorMessage:"Stopped.",stopped:!0},ZI=(e,t,r)=>{if(t===void 0)return;let o=()=>{e.kill("SIGTERM"),r(eP)};if(t.aborted){o();return}t.addEventListener("abort",o,{once:!0})}});var eO,Ua,tO,tP,bK,PK,wK,Xe,Ba=l(()=>{"use strict";eO=require("node:child_process"),Ua=m(require("node:fs")),tO=m(require("node:os")),tP=m(require("node:path"));za();QI();To();bK=["claude-cli","codex","cursor","antigravity"],PK=18e4,wK=e=>bK.includes(e),Xe=e=>new Promise(t=>{if(e.signal?.aborted){t(eP);return}if(!wK(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,o=_t(r,e.prompt,ae({}));if(o===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!Ua.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=tP.default.join(Ua.default.mkdtempSync(tP.default.join(tO.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=HI({writerAgent:r,baseArgs:o.args,replyPath:n}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,eO.spawn)(o.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=g=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(g))};ZI(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??PK),d.stdout.on("data",g=>{i.push(Buffer.from(g))}),d.stderr.on("data",g=>{a.push(Buffer.from(g))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let g=Ua.default.existsSync(n)?Ua.default.readFileSync(n,"utf8"):null;p($I({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:g}))})})});var rO,_K,Ga,Mp,Np=l(()=>{"use strict";k();Me();rO=e=>e===T?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},_K=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Ga=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=fb({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:rO(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:Ea(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=_K(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i}},Mp=(e,t,r=null)=>{let o=Pp({raw:t,judge:rO(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var jp,rP=l(()=>{"use strict";jp=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var sO,Dp,Hp,oO,nO,oP,vK,iO,nP,WK,aO,LK,EK,lO,cO=l(()=>{"use strict";sO=require("node:child_process"),Dp=m(require("node:fs")),Hp=m(require("node:path"));k();oO=4e3,nO=12e3,oP=(e,t)=>{let r=(0,sO.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},vK=e=>oP(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",iO=e=>{let t=oP(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},nP=(e,t)=>{let r=Hp.default.resolve(e,t),o=Hp.default.relative(e,r);if(o.startsWith("..")||Hp.default.isAbsolute(o)||!Dp.default.existsSync(r)||!Dp.default.statSync(r).isFile())return null;let n=Dp.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>oO?`${n.slice(0,oO)}
\u2026truncated`:n},WK=e=>e.length>nO?`${e.slice(0,nO)}
\u2026truncated`:e,aO=e=>{let t=bb(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,nP(e.workingDirectory,n)])),o=vK(e.workingDirectory);return{git:o,status:o?iO(e.workingDirectory):{},files:r,paths:t}},LK=(e,t)=>{let r=oP(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=nP(e,t);return o===null?`${t} is missing.`:o},EK=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",lO=e=>{let t=e.before.git?iO(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=nP(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>LK(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:EK(e.before.git,e.before.paths.length>0),evidence:WK(i.join(`

`))}}});var aP,U,lP,Pe,dO,RK,CK,uO,Xn,pO,Zn,kK,xK,Va,sP,iP,TK,mO,IK,OK,MK,gO,NK,fO,hO,jK,DK,yO,SO=l(()=>{"use strict";aP=require("node:child_process"),U=m(require("node:fs")),lP=m(require("node:os")),Pe=m(require("node:path")),dO=8e6,RK=16e6,CK=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],uO=(e,t)=>{let r=(0,aP.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Xn=(e,t)=>(0,aP.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,pO=e=>{let t=uO(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},Zn=(e,t)=>{let r=Pe.default.resolve(e,t),o=Pe.default.relative(e,r);return o.startsWith("..")||Pe.default.isAbsolute(o)?null:r},kK=(e,t)=>{let r=Zn(e,t);if(r===null||!U.default.existsSync(r))return null;let o=U.default.statSync(r);return!o.isFile()||o.size>dO?null:U.default.readFileSync(r)},xK=(e,t,r)=>{let o=Zn(e,t);o!==null&&(U.default.mkdirSync(Pe.default.dirname(o),{recursive:!0}),U.default.writeFileSync(o,r))},Va=(e,t)=>{let r=Zn(e,t);r===null||!U.default.existsSync(r)||U.default.rmSync(r,{recursive:!0,force:!0})},sP=(e,t)=>Xn(e,["cat-file","-e",`HEAD:${t}`]),iP=e=>{let t=uO(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},TK=e=>Pe.default.resolve(e)!==Pe.default.resolve(lP.default.homedir()),mO=e=>{if(!U.default.existsSync(e))return 0;let t=U.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?U.default.readdirSync(e).reduce((r,o)=>r+mO(Pe.default.join(e,o)),0):0},IK=(e,t,r)=>{let o=Zn(e,r);if(o===null||!U.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(mO(o)>RK)return{relativePath:r,existed:!0,copyDir:null};let n=Pe.default.join(t,"cache",r);return U.default.mkdirSync(Pe.default.dirname(n),{recursive:!0}),U.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},OK=400,MK=32e6,gO=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!U.default.existsSync(s)))for(let i of U.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Pe.default.join(s,i),c=U.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>dO)){if(t.length>=OK||r+c.size>MK){o=!1;return}r+=c.size,t.push(Pe.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},NK=(e,t,r)=>{let o=Zn(e,r);if(o===null||!U.default.existsSync(o))return null;let n=kK(e,r);if(n===null)return"skip";let s=Pe.default.join(t,"files",r);return U.default.mkdirSync(Pe.default.dirname(s),{recursive:!0}),U.default.writeFileSync(s,n),s},fO=e=>{let t=U.default.mkdtempSync(Pe.default.join(lP.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?pO(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:gO(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,NK(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?iP(e.workingDirectory):null,isolateCaches:TK(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:CK.map(i=>IK(e.workingDirectory,t,i))}},hO=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Va(e.workingDirectory,t);return}xK(e.workingDirectory,t,U.default.readFileSync(r))}},jK=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?hO(e,t):sP(e.workingDirectory,t)?Xn(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Va(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&sP(e.workingDirectory,t)&&Xn(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!sP(e.workingDirectory,t)&&Xn(e.workingDirectory,["reset","-q","HEAD","--",t])},DK=(e,t)=>{let r=Zn(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Va(e.workingDirectory,t.relativePath),U.default.mkdirSync(Pe.default.dirname(r),{recursive:!0}),U.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Va(e.workingDirectory,t.relativePath);return}if(U.default.existsSync(r))for(let o of U.default.readdirSync(r)){let n=Pe.default.join(r,o);U.default.statSync(n).mtimeMs>=e.startedMs-1e3&&U.default.rmSync(n,{recursive:!0,force:!0})}}}},yO=e=>{try{if(e.git){if(iP(e.workingDirectory)!==e.head&&(!(e.head===null?Xn(e.workingDirectory,["update-ref","-d","HEAD"]):Xn(e.workingDirectory,["reset","--hard",e.head]))||iP(e.workingDirectory)!==e.head))throw new Error("head");let r=pO(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))jK(e,o)}else{if(e.complete)for(let t of gO(e.workingDirectory).paths)e.files[t]===void 0&&Va(e.workingDirectory,t);for(let t of Object.keys(e.files))hO(e,t)}for(let t of e.caches)DK(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{U.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var $p,zp,HK,$K,zK,FK,UK,AO,BK,bO,PO=l(()=>{"use strict";k();Np();rP();cO();SO();Me();Ye();Ba();$p=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),zp=e=>({...e,status:"stopped",errorMessage:Wo,judgePhase:void 0,updatedAt:new Date().toISOString()}),HK=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),$K=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==T?t:e.improverModel!==T?e.improverModel:null}return e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null},zK=async e=>{let t=Ce(e.cycle),r=aO({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=fO({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Nb({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Ta(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Wa({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await Xe({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?lO({workingDirectory:t,before:r,writerReply:i.text}):null,c=yO(o);return i.ok?!c.ok||a===null?{ok:!1,cycle:$p(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-n,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:zp(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:$p(e.cycle,i.errorMessage)})},FK=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:zK({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),UK=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),AO=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Xe({writerAgent:e.reviewer,workingDirectory:Ce(e.cycle),prompt:Ab({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:zp(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},BK=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===T)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Xe({writerAgent:t.judgeModel,workingDirectory:Ce(t),prompt:Sb({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Ga(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?zp(o):(e.onWriterFailure?.(t.judgeModel),$p(o,n.errorMessage))},bO=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return BK(e);let o=$K(t),n=await FK({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?HK(t,n.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===T){let p=await AO({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...UK(s,p.text),judgePhase:void 0}}let i=await Xe({writerAgent:t.judgeModel,workingDirectory:Ce(t),prompt:gb({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?zp(s):(e.onWriterFailure?.(t.judgeModel),$p(s,i.errorMessage));let a=await AO({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Ga(s,i.text,c);return jp(d,a.text)}});var Fp,cP=l(()=>{"use strict";k();Fp=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:va({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Ea(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var Up,GK,VK,dP,wO=l(()=>{"use strict";k();Np();PO();cP();Me();Ye();Ba();Up=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),GK=e=>({...e,status:"stopped",errorMessage:Wo,updatedAt:new Date().toISOString()}),VK=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?GK(e):(n?.(r),Up(e,t.errorMessage)),dP=async(e,t,r,o)=>{let n=e.revisions.find(c=>c.roundNumber===e.currentRound);if(n===void 0)return Up(e,"This round has no prompt.");if(e.status==="judging")return bO({cycle:e,revision:n,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Up(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===T)return e;let s=Fp(e);if(s===null)return Up(e,"The improver needs the score and the reason.");let i=await Xe({writerAgent:e.improverModel,workingDirectory:Ce(e),prompt:wa({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=VK(e,i,e.improverModel,r,t);return a!==null?a:Mp(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var qa,uP=l(()=>{"use strict";qa=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var Vp,Bp,_O,qK,KK,Gp,vO,WO,JK,YK,Ka,LO,EO,qp=l(()=>{"use strict";k();Tp();Ip();Me();Ye();Ba();wO();uP();Vp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),Bp=(e,t,r)=>e.wizard===void 0||t===null?Vp(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},_O=e=>{let t=e.wizard;return t===void 0||qa(e).length===0?e:{...e,wizard:Vn({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},qK=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",KK=e=>{let t=e.wizard;if(t===void 0)return e;let r=xa({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Vn({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Gp=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),vO=e=>e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null,WO=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},JK=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=vO(e);if(n===null)return Vp(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Oa(o),i=Tb({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:WO(e,"generalize")}),a=await Xe({writerAgent:n,prompt:i,workingDirectory:Ce(e),signal:t});if(!a.ok)return r?.(n),Bp(e,"generalize",a.errorMessage);try{let c=Fb(a.text),d=Vn({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:$a(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return ja(d)?Ka({...p,wizard:{...d,gate:null}}):Gp(p,"generalize")}catch(c){return Bp(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},YK=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=vO(e);if(n===null)return Vp(e,"Choose a writer to suggest splits.");let s=Ma({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Mb({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:WO(e,"separate")}),a=await Xe({writerAgent:n,prompt:i,workingDirectory:Ce(e),signal:t});if(!a.ok)return r?.(n),Bp(e,"separate",a.errorMessage);try{let c=Ub(a.text),d=Ib(c,o.variables),p=Vn({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:p};return Ha(d)?Jn(g,d[0]):Gp(g,"separate")}catch(c){return Bp(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},Ka=e=>{let t=e.wizard;if(t===void 0)return e;let r=Oa(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:70,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},LO=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Vp(e,"This module is missing.");let n=Eo(r),s=Na(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==T?e.runnerModel:e.judgeModel!==T?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:70,maxRounds:1,errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},EO=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return dP(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return JK(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return YK(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await dP(e,t,r,o);if(C(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&qa(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=ce(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&Da({revisions:a.revisions,wizard:a.wizard})){let p=_O(Gp(a,i));return Yn(p)}let c=Gp(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=Db({wizard:{...c.wizard,modules:c.wizard.modules.map((g,S)=>S===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:qK(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?_O(d):KK(d)}return s}return n.phase==="complete",e}});var Kp,Qn,pP=l(()=>{"use strict";uP();Kp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qn=e=>{let t=qa(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Kp(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let S=g.judgement?.score,h=S==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${S}`,y=g.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${Kp(y)}</span>`;if(e.interactive){let A=e.selectedRound===g.roundNumber?" checked":"";return`<li><label><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${A}> ${Kp(h)}</label>${u}</li>`}return`<li>${Kp(h)}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var mP,RO,Jp,CO,Yp=l(()=>{"use strict";mP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RO=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${mP(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${mP(t.prompt)}</pre></li>`).join("")}</ol>`,Jp=e=>RO([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),CO=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${mP(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${RO(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var de,XK,ZK,QK,e8,t8,r8,es,Xp=l(()=>{"use strict";k();pP();Yp();de=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),XK=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},ZK=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.variables.length===0?'<p class="muted">No variables yet.</p>':`<ul class="sdlc-wizard-vars">${t.variables.map(a=>`<li><strong>{{${de(a.name)}}}</strong> \u2014 ${de(a.description)} (sample: ${de(a.sampleValue)})</li>`).join("")}</ul>`,o=t.templatedPrompt.trim(),n=o.length===0?'<p class="muted">No templated prompt yet.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${de(o)}</pre>`,s=Ia(t.templatedPrompt,t.variables).trim(),i=s.length===0||s===o?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${de(s)}</pre>`;return`${r}${n}${i}`},QK=(e,t)=>`<ul class="sdlc-wizard-revisions">${e.map(o=>{let n=o.score===null?`Round ${o.roundNumber} \u2014 not scored`:`Round ${o.roundNumber} \u2014 ${o.score}`,s=t===o.roundNumber?" (selected)":"",i=o.reasons?.trim()??"",a=i.length===0?"":`<br><span class="muted">${de(i)}</span>`;return`<li>${de(n)}${s}${a}</li>`}).join("")}</ul>`,e8=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Qn({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=XK(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${QK(o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Ma({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${de(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${de(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},t8=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${de(n.title)}</strong> <span class="muted">(${de(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${de(o.title)}</strong>${n}${de(s)}<br><span class="muted">${de(o.summary)} (${de(o.topology)})</span>${Jp(o)}</li>`}).join("")}</ul>`},r8=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${de(i)}</span> <strong>${de(n.title)}</strong>${de(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${de(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Qn({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},es=(e,t)=>{switch(t){case"wizard-1":return ZK(e);case"wizard-2":return e8(e);case"wizard-3":return t8(e);case"wizard-4":return r8(e);default:return""}}});var o8,n8,kO,xO,TO=l(()=>{"use strict";k();To();Xp();o8=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},n8=e=>{let t=e.goal.trim();return t.length===0?null:t},kO=(e,t,r,o,n)=>{let s=ft(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},xO=(e,t)=>{let r=n8(e);if(t.id.startsWith("wizard-")){let s=es(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=ce(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null})));return s===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:kO(t.label,s.promptText,s.score,s.reasons,r)}let o=t.id==="rewrite"?e.currentRound:o8(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:kO(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var ts,IO,OO=l(()=>{"use strict";ts=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IO=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?'<p class="muted">Not scored yet.</p>':`<p class="muted">${ts(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${ts(e.feedback.trim())}</p>`,n=e.promptNote!==null?`<div class="alert-error">${ts(e.promptNote)}</div>`:e.promptText===null?"":`<h2>Saved prompt</h2><pre class="mono">${ts(e.promptText)}</pre>`,s=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${ts(e.goal)}</dd></div></dl>`;return`<h2>${ts(e.title)}</h2>${s}${t}${r}${o}${n}`}});var Oo,rs,Ja=l(()=>{"use strict";Oo=e=>e.toLocaleString("en-US"),rs=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Zp,s8,MO,NO,jO,DO,gP=l(()=>{"use strict";k();TO();OO();Ja();Zp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),s8=(e,t)=>{let r=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',o=/^score-(\d+)$/.exec(e.id),n=e.state==="done"&&o!==null?rs(t,Number(o[1])):0,s=n>0?`<span class="sdlc-node-reason">${Oo(n)} tokens so far</span>`:"",i=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Zp(e.detail)}</span>`:"",a=IO(xO(t,e)),c=t.wizard!==void 0&&t.wizard.phase==="complete"&&C(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Zp(e.id)}"`:"";return`<li class="sdlc-node sdlc-node-${e.state}"><button type="button" class="sdlc-node-open"${c} data-sdlc-node>${r}<span class="sdlc-node-label">${Zp(e.label)}${i}${s}</span></button><template>${a}</template></li>`},MO=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>s8(r,t)).join("")}</ol>`,NO=e=>`<div class="sdlc-score" aria-label="What the score means">${wb(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Zp(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,jO='<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog"><button class="btn btn-secondary" type="submit">Close</button></form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>',DO=`<script>
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
</script>`});var Cr,HO,i8,$O=l(()=>{"use strict";k();Ye();To();Qb();Cr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HO=e=>{if(!C(e.status))return"";let t=ce(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=ft(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Cr(t.reasons.trim())}</p>`,i=n===null?i8({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Ce(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${Cr(n)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${o}${s}${i}</section>`},i8=e=>{let t=e.sourceSkill?.fileName??Fa(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=xp(t,r),s=n.length>0&&UI(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Cr(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Cr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Cr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Cr(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Cr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Cr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var Qp,fP=l(()=>{"use strict";k();k();Me();To();Qp=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!C(e.status)){let t=e.judgeModel;return{title:`${be(t)} is suggesting module splits.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!C(e.status)){let t=e.judgeModel;return{title:`${be(t)} is generalizing your prompt.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===T?{title:`Score the prompt text for round ${e.currentRound+1}.`,detail:"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."}:e.judgePhase==="scoring"?{title:`${be(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"No folder run in step 2. This panel keeps updating, so the page is not stuck."}:{title:`${be(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"Wizard evaluate revises prompt wording before the runner executes in step 4."};if(e.status==="judging"&&e.judgeModel===T){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==T?{title:`${be(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"You score the changes after this run."}:{title:`Score the changes from round ${e.currentRound+1}.`,detail:t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt."}}if(e.status==="judging"&&e.judgePhase==="reviewing")return{title:`${be(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,detail:"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck."};if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length;return{title:`${be(r)} is scoring module ${o} of ${n}.`,detail:`Step 4 runs one trial per module (pass \u2265 ${70}). This panel keeps updating.`}}return{title:`${be(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,detail:"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck."}}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length;return{title:`${be(r)} is running module ${o} of ${n}.`,detail:`The runner executes the module prompt; the judge scores output (pass \u2265 ${70}). This panel keeps updating.`}}return{title:`${be(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck."}}if(e.status==="improving"&&e.improverModel===T){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return{title:"Rewrite the prompt.",detail:t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`}}if(e.status==="improving")return{title:`${be(e.improverModel)} is rewriting the prompt.`,detail:"That writer is working on this Mac. This panel keeps updating, so the page is not stuck."};if(e.status==="passed")return{title:"This prompt passed.",detail:""};if(e.status==="stopped"){let t=e.revisions.some(n=>ft(n.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let n=fe(e.wizard),s=n.totalModules>0&&(e.wizard.phase==="complete"||n.passedModuleCount>0||C(e.status));return{title:s&&n.totalModules>0?`Wizard finished \u2014 ${n.passedModuleCount}/${n.totalModules} modules passed`:"Wizard stopped before all steps finished",detail:r.length>0?r:s?"":"Progress from finished steps is kept."}}return{title:(e.errorMessage??"").startsWith("Finished")?"Finished.":"Stopped.",detail:r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept."}}return C(e.status)?{title:"This run stopped because a reply could not be used.",detail:""}:{title:"Working on this Mac.",detail:"This panel keeps updating."}}});var kt,Ya=l(()=>{"use strict";Me();kt=e=>{if(e.status==="improving"&&e.improverModel===T)return!0;if(e.status!=="judging"||e.judgeModel!==T)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===T}});var zO,FO=l(()=>{"use strict";zO=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var kr,a8,UO,BO=l(()=>{"use strict";k();kr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a8=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${kr(r)}</p>`},UO=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${kr(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${kr(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${kr(a)}.</p>`}<pre class="mono">${kr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Rr(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${kr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${kr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${a8(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${kr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Xa,l8,GO,VO=l(()=>{"use strict";k();To();Xa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),l8=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=ft(t.promptText),n=t.judgement?.reasons?`<p class="muted">${Xa(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Xa(i)}.</p>`}<pre class="mono">${Xa(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Rr(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${Xa(d)}</pre>`:`<div class="alert-error">${Xa(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},GO=e=>e.revisions.map(t=>l8(e,t)).join("")});var qO,KO=l(()=>{"use strict";k();qO=e=>{if(C(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var xt,c8,hP,d8,u8,p8,m8,JO,YO,yP=l(()=>{"use strict";KO();xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),c8="Stop this run? Writers will stop and the best prompt is kept.",hP="End the wizard? Writers will stop and progress from finished steps is kept.",d8="Skip this module and pause at the step gate?",u8=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${xt(c8)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${xt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,p8=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${xt(hP)}"><input type="hidden" name="cycleId" value="${xt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,m8=e=>{let t=xt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${xt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${xt(d8)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${xt(hP)}">End wizard</button>
    </form>
  </div>`},JO=e=>{let t=qO(e);return t==="none"?"":t==="classic"?u8(e.id):t==="wizard_end_only"?p8(e.id):m8(e)},YO=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=xt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${xt(hP)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var XO,ZO=l(()=>{"use strict";k();Ja();XO=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=fe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${Oo(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Oo(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${70}`}return""}});var QO,g8,eM,tM=l(()=>{"use strict";k();ZO();Xp();QO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g8=(e,t,r)=>{let o=es(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=XO(e,t),i=`${QO(n)} <span class="muted sdlc-wizard-outcome-step-hint">${QO(s)}</span>`,a=t==="wizard-4"&&r.phase==="complete"?" open":"",c=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step" id="${c}"${a}><summary aria-controls="${c}-body">${i}</summary><div class="sdlc-wizard-outcome-step-body" id="${c}-body">${o}</div></details>`},eM=e=>{let t=e.wizard;if(t===void 0||!C(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>g8(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var rM,oM,nM=l(()=>{"use strict";rM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oM=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${rM(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${rM(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var SP,sM,AP=l(()=>{"use strict";k();SP=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,sM=e=>{if(SP(e))return"Passed";let t=e.statistics?.bestScore;return t!=null&&t<70?`Below pass (${t})`:e.status}});var iM,aM=l(()=>{"use strict";k();iM=e=>{if(e.terminalStatusSuggestion==="passed")return"";let t=e.rows.filter(r=>r.bestScore!==null&&r.bestScore<70).length;return t>0&&t===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${t} module${t===1?"":"s"} scored below ${70}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${70}.`}});var em,lM,cM=l(()=>{"use strict";k();AP();AP();aM();em=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lM=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=fe(t),o=r.terminalStatusSuggestion==="passed"?"":iM(r),n=60,s=r.rows.map((a,c)=>{let d=t.modules[c],p=a.bestScore===null?"\u2014":`${a.bestScore} / \u2265${70}`,S=a.bestScore!==null&&a.bestScore>=n&&a.bestScore<70?' class="sdlc-score-near-pass"':"",h=d===void 0?a.status:sM(d),y=d!==void 0&&SP(d)?'<span aria-label="Passed">\u2713</span>':em(h);return`<tr${S}><td>${em(a.title)}</td><td>${em(p)}</td><td>${a.tokens??"\u2014"}</td><td>${y}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${o.length===0?"":`<p class="muted">${em(o)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${s}</tbody></table></div>`}});var f8,dM,uM=l(()=>{"use strict";k();k();nM();cM();f8=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dM=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!C(e.status)||t.modules.length===0)return"";let r=lM(e),o=oM(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=fe(t),i=s.passedModuleCount<s.totalModules?" open":"";return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${f8(n)}</pre></details>`}${r}${o}</section>`}});var Xt,Za=l(()=>{"use strict";Xt=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var xr,tm,bP=l(()=>{"use strict";k();gP();$O();fP();Ya();FO();cP();BO();VO();yP();tM();uM();Ja();Ye();Za();xr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tm=e=>{let t=!C(e.status)&&e.status!=="wizard_paused"&&!kt(e),r=Qp(e),o=MO(Wb(zO(e)),e),n=C(e.status)?"":JO(e),s=eM(e),i=dM(e),a=HO(e),c=e.errorMessage===null?"":`<div class="alert-error">${xr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?fe(e.wizard):null,S=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,h=!t&&e.wizard!==void 0&&C(e.status)&&(e.wizard.phase==="complete"||fe(e.wizard).passedModuleCount>0),y=h?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${xr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",A=r.detail.length===0&&u.length===0||r.detail.length===0?"":`<p class="sdlc-run-detail muted">${xr(r.detail)}${p}</p>`,b=e.revisions.find(Hr=>Hr.roundNumber===e.currentRound),f=e.status==="improving"?Fp(e):null,w=rs(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),v=kt(e)?UO({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:f?.promptText??b?.promptText??"",score:f?.score??b?.judgement?.score??null,reasons:f?.reasons??b?.judgement?.reasons??null,avoid:f?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:b?.run??null,minJudgeScore:_?1:0}):"",L=e.wizard!==void 0&&e.wizard.phase==="complete"&&C(e.status),R=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",x=e.wizard!==void 0&&!L?70:e.passScore,I=R?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${NO(x)}</div>`:"",D=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':C(e.status)?L&&g!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",re=t?d:h?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',B=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${xr(Rt(Ce(e)))}</li>`:"",w>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Oo(w)} so far</li>`:""].filter(Hr=>Hr.length>0),q=B.length===0?"":`<ul class="sdlc-run-meta">${B.join("")}</ul>`,Dr=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,$=L?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,_e=L?"":I.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${$}</div>`:`<div class="sdlc-run-grid">${$}${I}</div>`,yt=GO(e),Xl=e.wizard!==void 0&&C(e.status)&&e.revisions.every(Hr=>Hr.roundNumber===0&&(Hr.judgement===void 0||Hr.judgement===null)),pF=yt.length===0||Xl?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${yt}</div></section>`,mF=`<p class="sdlc-run-goal" title="${xr(e.goal.trim())}">${xr(Xt(e.goal))}</p>`,gF=L?`${c}${i}${s}${v}${a}`:`${c}${_e}${v}${s}${a}`,fF='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',hF=L?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${xr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${fF}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${D}</div>${mF}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${re}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${xr(r.title)}</h2>${A}${u}${hF}</div></div>${q}${Dr}</header>${gF}</section>${pF}`}});var pM,mM=l(()=>{"use strict";k();Ip();pM=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Da({revisions:e.revisions,wizard:t})?e:Yn(e)}});var gM,fM=l(()=>{"use strict";k();qp();gM=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!ja(t)?e:Ka({...e,wizard:{...t,gate:null}})}});var hM,yM=l(()=>{"use strict";k();Tp();hM=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Ha(t.splitOptions))return e;let r=t.splitOptions[0];return Jn(e,r)}});var h8,Mo,rm=l(()=>{"use strict";mM();fM();yM();Be();h8=e=>{let t=gM(e),r=pM(t);return hM(r)},Mo=(e,t)=>{let r=h8(t);return r!==t?(F(e,r),r):t}});var SM,No,om=l(()=>{"use strict";k();SM=e=>Ro.indexOf(e),No=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||C(e.status)?Ro.length:t.gate!==null?SM(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?SM(t.phase):null}});var AM,bM=l(()=>{"use strict";AM=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var jo,PM,wM=l(()=>{"use strict";k();bM();jo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),PM=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Ta(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${jo(AM(o))}</pre></div>`:"",s=Lo(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=Eo(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=Rp(c),g=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${jo(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${jo(p)}">${jo(S)}</label>
        ${h}
        <input class="input" type="text" id="${jo(p)}" name="${jo(p)}" value="${jo(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var Tt,_M,vM=l(()=>{"use strict";k();wM();pP();Yp();yP();Tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_M=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate,n=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=o==="generalize"?`<ul class="sdlc-wizard-vars">${r.variables.map(v=>`<li><strong>{{${Tt(v.name)}}}</strong> \u2014 ${Tt(v.description)} (sample: ${Tt(v.sampleValue)})</li>`).join("")}</ul><pre class="sdlc-pre">${Tt(r.templatedPrompt)}</pre>`:"",i=o==="evaluate"?Qn({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",c=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(v=>{let L=v.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',R=v.recommended?' <span class="sdlc-badge">Recommended</span>':"",x=r.selectedSplitOptionId===v.id||r.selectedSplitOptionId===null&&v.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${Tt(v.id)}" required${x}> <strong>${Tt(v.title)}</strong>${L}${R}<br><span class="muted">${Tt(v.summary)}</span></label>${Jp(v)}</li>`}).join("")}</ul>`:"",d=r.modules[r.currentModuleIndex],g=o==="optimize_modules"&&d?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",S=d?.title??"Module",h=d?.prompt??"",y=d?.status==="pending",u=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Tt(S)}</p>${y?PM({cycle:e,modulePrompt:h}):""}<p class="muted">Test run prompt preview: ${Tt(Na(h,Eo(r)))}</p>${d?.statistics===null||d?.statistics===void 0?"":`<p class="muted">Module stats: best ${d.statistics.bestScore??"\u2014"} / \u2265${70} (round ${d.statistics.bestRound??"\u2014"}).</p>`}${Qn({cycle:e,interactive:!1,caption:y?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${S}\u201D (runner + judge).`})}`:"",A=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":y?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",b=zb(r),f=b===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${b}</p>`,w=t?.active===!0?" sdlc-wizard-gate-active":"",_=t?.active===!0?' id="prompt-optimizer-wizard-active-step"':"";return`<section class="card sdlc-wizard-gate${w}"${_}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${n}</h2>
    <p class="sdlc-wizard-gate-lede">${A}</p>
    ${f}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Tt(e.id)}">
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
    ${YO(e)}
  </section>`}});var y8,WM,LM=l(()=>{"use strict";k();y8=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WM=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||C(e.status))return"";if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>Suggesting module splits</h2>
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let r=t.currentModuleIndex,n=t.modules[r]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    <h2>Module ${r+1} of ${t.modules.length}: ${y8(n)}</h2>
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
  </section>`:""}});var S8,A8,b8,EM,RM=l(()=>{"use strict";k();om();vM();LM();Xp();S8={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},A8=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b8=(e,t,r)=>`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${A8(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${es(e,t)}</div>
</details>`,EM=e=>{let t=e.wizard;if(t===void 0)return"";let r=No(e);if(r===null)return"";let o=Ro.slice(0,r).map((i,a)=>b8(e,`wizard-${a+1}`,S8[i])),n=t.gate!==null?_M(e,{active:!0}):WM(e),s=r>=Ro.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var nm,PP=l(()=>{"use strict";RM();Yp();k();nm=e=>{if(e===null||e.wizard!==void 0&&C(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=EM(e),r=CO(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var wP,CM,kM,sm,xM,im=l(()=>{"use strict";k();Be();wP=new Map,CM=e=>{let t=new AbortController;return wP.set(e,t),t.signal},kM=e=>{wP.delete(e)},sm=e=>{wP.get(e)?.abort()},xM=(e,t)=>{let r=J(e,t);return r===null||r.wizard!==void 0?!1:(C(r.status)||(F(e,{...r,status:"stopped",errorMessage:Wo,updatedAt:new Date().toISOString()}),sm(t)),!0)}});var Qa,am,TM,_P,IM,OM,MM,NM,vP=l(()=>{"use strict";Qa=m(require("node:fs")),am=m(require("node:path")),TM=e=>am.default.join(am.default.dirname(e),"prompt-optimizer-writer-ready.json"),_P=e=>{let t=TM(e);if(!Qa.default.existsSync(t))return{};try{let r=JSON.parse(Qa.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},IM=(e,t)=>{Qa.default.mkdirSync(am.default.dirname(e),{recursive:!0}),Qa.default.writeFileSync(TM(e),`${JSON.stringify(t,null,2)}
`)},OM=(e,t)=>_P(e)[t]?.message??null,MM=(e,t,r)=>{IM(e,{..._P(e),[t]:{message:r}})},NM=(e,t)=>{let r=_P(e);r[t]!==void 0&&IM(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var WP,lm,cm,jM,Ne,Do=l(()=>{"use strict";k();za();qp();Ya();im();vP();rm();Be();WP=new Set,lm={atMs:0,ids:[]},cm=async()=>{if(Date.now()-lm.atMs<3e4)return lm.ids;let e=await mt({commands:ae({})});return lm.atMs=Date.now(),lm.ids=e.installedWriterIds,e.installedWriterIds},jM=async(e,t,r)=>{let o=J(e,t);if(o===null||r.aborted)return;let n=Mo(e,o);if(C(n.status)||n.status==="wizard_paused"||kt(n))return;let s=await EO(n,a=>{NM(e,a)},r,a=>{J(e,t)?.status==="stopped"||r.aborted||F(e,a)});J(e,t)?.status==="stopped"||r.aborted||(F(e,s),C(s.status)||await jM(e,t,r))},Ne=(e,t)=>{if(WP.has(t))return;let r=J(e,t);if(r===null)return;let o=Mo(e,r);if(C(o.status)||o.status==="wizard_paused"||kt(o))return;WP.add(t);let n=CM(t);jM(e,t,n).finally(()=>{WP.delete(t),kM(t)})}});var Tr,el=l(()=>{"use strict";bP();rm();PP();Do();Tr=(e,t)=>{let r=Mo(e,t);return Ne(e,r.id),`${tm(r)}${nm(r)}`}});var DM,HM,$M=l(()=>{"use strict";DM=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,HM=e=>e!==null&&e>0});var dm,zM,LP=l(()=>{"use strict";k();im();dm=e=>(sm(e.id),{...e,status:"stopped",errorMessage:sb,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null,phase:"complete"},updatedAt:new Date().toISOString()}),zM=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;sm(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var P8,FM,UM,BM=l(()=>{"use strict";k();qp();Tp();Ip();el();Be();Do();$M();LP();P8="Pick a revision scored above 0 before continuing to Separate.",FM=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),UM=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=J(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=J(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Tr(e.storePath,d))};if(o==="wizard-stop-all"){let c=dm(s);return F(e.storePath,c),a(n),!0}if(o==="wizard-skip-module"){let c=zM(s);return F(e.storePath,c),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=Cb(s.wizard,d,c);g=kb(g,d),g={...g,pendingStepInstructions:p};let S={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return F(e.storePath,S),Ne(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?FM(s):Ka({...s,wizard:{...s.wizard,gate:null}});return F(e.storePath,g),Ne(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=DM(s,p??-1);if(!HM(g)){let h={...s,errorMessage:P8,updatedAt:new Date().toISOString()};return F(e.storePath,h),a(n),!0}let S=Yn({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return F(e.storePath,S),Ne(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=FM(s);return F(e.storePath,h),Ne(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(h=>h.id===p);if(g===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return F(e.storePath,h),a(n),!0}let S=Jn(s,g);return F(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(n),!0;let g=Kb({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!g.ok){let u={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return F(e.storePath,u),a(n),!0}let S={...s.wizard,parameterValues:g.parameterValues};if(p.status==="pending"){let u=LO({...s,wizard:{...S,gate:null}},d);return F(e.storePath,u),Ne(e.storePath,n),a(n),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=fe(S),A={...s,status:u.terminalStatusSuggestion,wizard:{...S,gate:null,phase:"complete"},updatedAt:new Date().toISOString()};return F(e.storePath,A),a(n),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...S,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return F(e.storePath,y),a(n),!0}}return a(n),!0}});var w8,GM,_8,EP,v8,VM,qM=l(()=>{"use strict";Me();im();LP();rP();Np();Ya();Be();w8="Add a score from 0 to 100 and the reason for it.",GM="Add a score from 1 to 100 and the reason for it.",_8="Write the next prompt.",EP="This step is not waiting for you.",v8=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},VM=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=J(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(F(e.storePath,dm(a)),{kind:"saved",cycleId:i}):xM(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=J(e.storePath,r);if(o===null||!kt(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:EP};if(t==="manual-judge"){if(o.judgeModel!==T)return{kind:"invalid",cycle:o,errorMessage:EP};let i=v8(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?GM:w8};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:GM};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",p=jp(Ga(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return F(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==T)return{kind:"invalid",cycle:o,errorMessage:EP};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:_8};let s=Mp(o,n);return F(e.storePath,s),{kind:"saved",cycleId:o.id}}});var KM,JM=l(()=>{"use strict";KM=`<script>
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
</script>`});var YM,XM=l(()=>{"use strict";YM=`<script>
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
</script>`});var ZM,QM=l(()=>{"use strict";ZM=`<script>
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
</script>`});var rN,oN=l(()=>{"use strict";k();Ye();rN=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Rt(t.workingDirectory),passScore:String(t.passScore),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!C(t.status)}}});var nN,sN=l(()=>{"use strict";k();om();nN=e=>{if(e.wizard===void 0)return C(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=No(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(C(e.status)){if(e.wizard.phase==="complete"){let r=fe(e.wizard),o=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),n=o===null?"":` \xB7 lowest ${o}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${n}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var iN,aN=l(()=>{"use strict";iN=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Zt,W8,L8,lN,cN=l(()=>{"use strict";sN();aN();Za();Zt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),W8=e=>e.wizard===void 0?"classic":"wizard",L8=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Zt(t)}">`,o=nN(e),n=iN(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Zt(o.badgeClass)}">${Zt(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Zt(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Zt(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${W8(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Zt(e.id)}">${Zt(Xt(e.goal))}</a><p class="muted">${Zt(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},lN=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>L8(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Zt(s)}</summary>${i}</details>`:i}});var RP,um,dN,E8,R8,CP,uN,kP=l(()=>{"use strict";RP=m(require("node:fs")),um=m(require("node:path"));Ye();dN=/^[a-z0-9-]+$/,E8=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},R8=(e,t)=>{if(!dN.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=E8(p[2]??"");p[1]==="name"&&g.length>0&&(o=g),p[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},CP=e=>{let t=xo(e);if(!t.ok)return[];let r=um.default.resolve(t.path,".cursor","skills"),o=[];try{o=RP.default.readdirSync(r)}catch{return[]}return o.filter(n=>dN.test(n)).flatMap(n=>{let s=um.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${um.default.sep}`))return[];try{let i=R8(RP.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},uN=(e,t)=>CP(e).find(r=>r.fileName===t)??null});var pN,mN=l(()=>{"use strict";pN={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Pass score",practice:"The run passes at this score. 90 is the usual bar. Lower it when a useful prompt is enough.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var tl,C8,k8,Ge,rl=l(()=>{"use strict";mN();tl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),C8='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>',k8=e=>{let t=pN[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${tl(t.title)}" aria-describedby="${r}" aria-expanded="false">${C8}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${tl(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${tl(t.example)}</span></span></button>`},Ge=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${tl(r)}"`}>${tl(e)}</span>${k8(t)}</span>`});var gN,x8,fN,hN,yN=l(()=>{"use strict";rl();gN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),x8=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),fN=e=>{if(e.length===0)return`<div class="field">${Ge("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${gN(r.fileName)}">${gN(r.fileName)}</option>`).join("");return`<div class="field">${Ge("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${x8(e)}</script>`},hN=`<script>
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
</script>`});var ke,SN,AN,T8,bN,PN,wN,_N=l(()=>{"use strict";k();fP();Me();Za();om();ke=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SN=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",AN=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,T8=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},bN=e=>e===T?"You":be(e),PN=e=>{let t=T8(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":be(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${ke(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${ke(t)}</dd></div>
      <div><dt>Judge</dt><dd>${ke(bN(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${ke(bN(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${ke(r)}</dd></div>
    </dl>
  </details>`},wN=e=>{let t=e.wizard;if(t===void 0)return"";let r=Xt(e.goal),o=e.status==="wizard_paused",n=!C(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=Qp(e),g=AN(t),S=g===null?"":SN(g),h=No(e),y=S.length===0?"":h===null||h>=4?` <strong>${ke(S)}</strong>`:` <strong>${ke(S)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${ke(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${ke(p.title)}${y}</p>
    <p class="muted">${ke(p.detail)}</p>
    <div class="actions">
      ${PN(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${ke(e.id)}">Open this run</a>
    </div>
  </section>`}let s=AN(t),i=s===null?"Wizard":SN(s),a=No(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${ke(r)}</h2>
    <p class="lede">Paused at <strong>${ke(i)}</strong>${ke(c)} (last updated ${ke(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${PN(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${ke(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var ol,vN,WN=l(()=>{"use strict";rl();ol=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vN=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${ol(n.id)}"${n.id===e.runner?" selected":""}>${ol(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${ol(e.runner)}">Checking ${ol(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Ge("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Ge("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${ol(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var LN,EN=l(()=>{"use strict";LN=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var os,RN,CN,kN,xN,TN=l(()=>{"use strict";rl();os=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RN=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${os(c.id)}"${c.id===r?" selected":""}>${os(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${os(n)}</option>`;return`<div class="field">${Ge(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},CN=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${os(t)}">Checking ${os(o)}\u2026</p>`},kN=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Ge(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${os(r)}</textarea><span class="muted">${o}</span></div></details>`,xN=e=>{let t=`<div class="sdlc-writer">${RN("judge","Judge",e.judge,e.writers,"I'll score it")}${CN("judge",e.judge,e.writers)}${kN("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${RN("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${CN("improver",e.improver,e.writers)}${kN("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var O8,Ho,IN,ON=l(()=>{"use strict";Ya();bP();JM();XM();gP();QM();tN();oN();cN();kP();yN();rl();PP();_N();Za();WN();EN();TN();k();O8=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Ho=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IN=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Ho(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Ho(e.skillNotice??"")}</div>`,o=`${jO}${DO}`,n=e.resumableWizardCycle??null,s=n===null?"":wN(n),i=nm(e.cycle),a=e.cycle===null?"":tm(e.cycle),c=e.cycle!==null&&kt(e.cycle),d=rN(e),p=O8(d.goal,d.prompt,e.canRun),g=xN({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=vN({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=Eb,y=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",u=e.cycle!==null&&C(e.cycle.status),A=d.running&&!u,b=u||A?"":" open",f=A?" sdlc-compose-run-focus":"",_=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${u?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,v=u?(()=>{let B=e.cycle!==null?Xt(e.cycle.goal):Xt(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Ho(B)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${_}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${_}</summary>`,L=u?" sdlc-compose-viewing-finished":"",R=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",x=c?"waiting":d.running?"running":"idle",I=d.running&&!c?' aria-busy="true"':"",D=`<section class="card sdlc-compose${L}${f}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${b}>
        ${v}
        <div class="sdlc-compose-details-body">
      <p class="lede">${h} ${Ho(e.modelNote)}</p>
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
            ${Ge("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Ho(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${fN(CP(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${Ge("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${Ho(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Ge("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Ho(d.prompt)}</textarea>
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
        ${LN()}
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
          <div class="sdlc-submit sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${x}" data-can-run="${p?"true":"false"}"${I}${d.running?" disabled":""}>${R}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,re=`${""}${KM}${YM}${eN}${hN}${ZM}`;return`${t}${r}${D}${s}${a}${i}${o}${lN(e.history,e.cycle?.id??null)}${re}`}});var nl,xP=l(()=>{"use strict";ON();nl=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:IN(t)}))}});var MN,NN=l(()=>{"use strict";qM();el();xP();Be();Do();MN=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:VM({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=J(e.storePath,o.cycleId);return Ne(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Tr(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await nl(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Et(e.storePath),resumableWizardCycle:null}),!0)}});var jN,pm,TP=l(()=>{"use strict";jN=m(require("node:os"));k();pm=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??jN.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??90,maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var DN,ns,IP,HN,$N,sl=l(()=>{"use strict";k();Me();ob();DN=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,ns=e=>{let t=JI(e),r=Io(e).map(s=>({id:s,label:Op[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},IP=(e,t,r)=>t===T||t!==null&&e.writers.some(o=>o.id===t)?t:r,HN=(e,t,r,o=null)=>({judge:IP(e,t,e.judge),improver:IP(e,r,e.improver),runner:IP(e,o,e.runner)}),$N=e=>e===pp?{goal:mp,prompt:gp}:{goal:"",prompt:""}});var mm,OP=l(()=>{"use strict";k();Me();Ye();sl();mm=e=>{let t=HN(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=String(70),o=String(5),n=e.posted?.get("judgeInstructions")?.trim()??"",s=e.posted?.get("improverInstructions")?.trim()??"",i=e.posted?.get("runnerInstructions")?.trim()??"",a=e.posted?.get("runner")??null,c=(u,A)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:u,passScore:r,maxRounds:o,errorMessage:A,judge:t.judge,improver:t.improver,judgeInstructions:n,improverInstructions:s,runner:t.runner,runnerInstructions:i});if(e.posted===null)return c(e.defaultFolder??ko,null);let d=e.posted.get("folder")??ko;if(e.posted.get("intent")==="choose-folder"){let u=e.pickFolder();return c(u===null?d:Rt(u),null)}if((e.posted.get("intent")??"")!=="run")return c(d,null);let g=DN(e.goal,e.prompt);if(g!==null)return c(d,g);let S=YI(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(S===null)return c(d,"Choose a judge and an improver.");let h=xo(d);if(!h.ok)return c(d,h.errorMessage);let y=XI(e.installedIds,a,S.judge);return y===null?c(d,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:S.judge,improver:S.improver,workingDirectory:h.path,passScore:70,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:n,improverInstructions:s,runner:y,runnerInstructions:i}}});var ss,fm,M8,MP,zN,gm,FN,N8,UN,NP,j8,D8,H8,jP,BN,GN,VN=l(()=>{"use strict";ss=m(require("node:fs")),fm=m(require("node:path"));Me();Ye();M8=["remember","choose-folder","run"],MP=()=>({folder:ko,judge:"",improver:"",runner:""}),zN=e=>fm.default.join(fm.default.dirname(e),"prompt-optimizer-preferences.json"),gm=e=>typeof e=="string"?e:"",FN=e=>{let t=zN(e);if(!ss.default.existsSync(t))return MP();try{let r=JSON.parse(ss.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return MP();let o=r,n=gm(o.folder).trim();return{folder:n.length===0?ko:n,judge:gm(o.judge),improver:gm(o.improver),runner:gm(o.runner)}}catch{return MP()}},N8=(e,t)=>{let r=zN(e);ss.default.mkdirSync(fm.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;ss.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),ss.default.renameSync(o,r)},UN=(e,t)=>e===T||Io(t).some(r=>r===e),NP=(e,t,r)=>e===null?t:e.length===0?"":UN(e,r)?e:t,j8=(e,t)=>{if(e===null)return t;let r=xo(e);return r.ok?r.display:t},D8=e=>{let t=FN(e.storePath),r={folder:j8(e.folder,t.folder),judge:NP(e.judge,t.judge,e.installedIds),improver:NP(e.improver,t.improver,e.installedIds),runner:NP(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||N8(e.storePath,r)},H8=e=>{let t=xo(e);return t.ok?t.display:ko},jP=(e,t)=>UN(e,t)?e:"",BN=e=>{let t=FN(e.storePath);return{selection:{...e.selection,judge:jP(t.judge,e.installedIds)||e.selection.judge,improver:jP(t.improver,e.installedIds)||e.selection.improver,runner:jP(t.runner,e.installedIds)||e.selection.runner},defaultFolder:H8(t.folder)}},GN=e=>{let t=e.posted.get("intent")??"";if(!M8.includes(t))return;let r=e.posted.get("folder");D8({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var qN,$8,z8,DP,F8,hm,ym=l(()=>{"use strict";qN=m(require("node:os"));Me();vP();Ba();$8="Reply with the single word ok. Do not use tools.",z8=45e3,DP=async(e,t)=>{if(t===T)return{ok:!0,message:"You will do this step."};let r=OM(e,t);if(r!==null)return{ok:!0,message:r};let o=await Xe({writerAgent:t,prompt:$8,workingDirectory:qN.default.tmpdir(),timeoutMs:z8});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${be(t)} is ready.`;return MM(e,t,n),{ok:!0,message:n}},F8=e=>[...new Set(e.filter(t=>t.length>0))],hm=async(e,t,r,o)=>{for(let n of F8([t,r,o??""])){let s=await DP(e,n);if(!s.ok)return s.message}return null}});var HP,KN=l(()=>{"use strict";k();HP=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!C(r.status)&&!(t!==null&&r.id===t))return r;return null}});var JN,YN=l(()=>{"use strict";ut();k();el();TP();OP();xP();Be();Ye();VN();kP();ym();KN();rm();Do();JN=async e=>{let t=e.posted===null?BN({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=mm({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Wr("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(GN({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Rt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await hm(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await nl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Rt(r.workingDirectory),passScore:String(r.passScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Et(e.route.storePath),resumableWizardCycle:HP(Et(e.route.storePath),null)});return}if(r.kind==="start"){let s=uN(r.workingDirectory,r.sourceSkillFile),i=pm({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,wizard:{...ka(r.prompt),runnerInstructions:r.runnerInstructions},runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(F(e.route.storePath,i),Ne(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(Tr(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:J(e.route.storePath,e.cycleId);n!==null&&(n=Mo(e.route.storePath,n),Ne(e.route.storePath,n.id)),await nl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Et(e.route.storePath),resumableWizardCycle:HP(Et(e.route.storePath),n?.id??null)})}});var XN,ZN=l(()=>{"use strict";Be();XN=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";OI(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var QN,ej=l(()=>{"use strict";QN=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var tj,rj=l(()=>{"use strict";qI();BM();NN();YN();ZN();sl();ej();Do();tj=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await cm(),o=ns(r),n=e.method==="POST"?QN(e.request.headers["content-type"],await e.readBody(e.request)):null;if(UM({posted:n,storePath:e.storePath,response:e.response})||await MN(e,n,o))return;let s=$N(t.searchParams.get("example")),i=XN({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=VI({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await JN({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:GI(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var U8,oj,nj=l(()=>{"use strict";k();Be();U8=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",oj=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=J(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!C(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=$b({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${U8(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var sj,ij=l(()=>{"use strict";el();Be();sj=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:J(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Tr(e.storePath,o)),!0}});var B8,aj,lj=l(()=>{"use strict";Me();ym();B8=["claude-cli","codex","cursor","antigravity"],aj=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===T||B8.includes(t)?await DP(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var cj,dj=l(()=>{"use strict";k();cj=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Ra,page:Ca,context:Gn,installedWriters:e,post:{method:"POST",url:Ra,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${Ra}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var $P,uj=l(()=>{"use strict";k();Ja();$P=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null}))),o=C(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:o,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:rs(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:Gn,page:`${Ca}?cycle=${encodeURIComponent(e.id)}`}}});var xe,G8,pj,mj,gj=l(()=>{"use strict";xe=m(Is());k();G8=(0,xe.isType)({goal:xe.isString,prompt:xe.isString,workingDirectory:xe.isString,judge:(0,xe.isUndefinedOr)(xe.isString),improver:(0,xe.isUndefinedOr)(xe.isString),passScore:(0,xe.isUndefinedOr)(xe.isNumber),maxRounds:(0,xe.isUndefinedOr)(xe.isNumber)}),pj=e=>{let t=e?.trim()??"";return t.length===0?null:t},mj=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return G8(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Wp}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:pj(t.judge),improver:pj(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:Wp}}});var V8,fj,hj=l(()=>{"use strict";k();Me();OP();sl();V8=e=>e.map(t=>t.id).join(", "),fj=e=>{let t=ns(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===T||n===T)return{ok:!1,error:Lb,installedWriters:t.writers};if(o===null||n===null){let a=V8(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o}),i=mm({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var yj,Sj=l(()=>{"use strict";k();TP();dj();uj();sl();gj();hj();Be();yj=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=J(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:$P(c)}}let r=await e.handlers.readInstalledIds(),o=ns(r);if(e.method==="GET")return{status:200,body:cj(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let n=mj(e.rawBody);if(!n.ok)return{status:400,body:{ok:!1,error:n.error,installedWriters:o.writers}};let s=fj({body:n.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:o.writers}};let a=pm({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:ka(s.prompt),runnerModel:s.runner});return F(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:$P(a)}}});var Aj,bj=l(()=>{"use strict";Do();ym();Sj();Aj=async e=>{let t=await yj({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:cm,readWritersReady:hm,startCycle:Ne}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var q8,zP,Pj=l(()=>{"use strict";p0();rj();nj();ij();lj();bj();q8=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},zP=async e=>{let t=q8(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await Aj(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:u0()})),!0):(await aj({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||oj({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||sj({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await tj(e),!0)}});var wj=l(()=>{"use strict";Pj()});var $o,il,K8,J8,Y8,X8,_j,vj=l(()=>{"use strict";$o=m(require("node:fs")),il=m(require("node:path")),K8="prompt-optimizer-cycles.json",J8="prompt-optimizer-preferences.json",Y8="prompt-sdlc-cycles.json",X8="prompt-sdlc-preferences.json",_j=e=>{let t=il.default.join(e,K8),r=il.default.join(e,Y8);if($o.default.existsSync(t)||!$o.default.existsSync(r))return t;try{$o.default.renameSync(r,t)}catch{return r}let o=il.default.join(e,X8),n=il.default.join(e,J8);if($o.default.existsSync(o)&&!$o.default.existsSync(n))try{$o.default.renameSync(o,n)}catch{}return t}});var is,Z8,FP,Wj=l(()=>{"use strict";is=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Z8=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],FP=e=>{let t=Z8.map(i=>`<option value="${is(i.value)}">${is(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${is(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${is(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${is(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${is(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var al,Rj,Q8,Cj,e3,t3,kj,Am,Lj,Ej,r3,o3,Qt,ll,Sm,n3,bm,UP,s3,BP,xj,GP,Tj,i3,a3,l3,Ij,Oj,Mj,cl=l(()=>{"use strict";al=m(require("node:fs")),Rj=m(require("node:path")),Q8="estimate-history.ndjson",Cj=100,e3=500,t3=2e4,kj=e=>Rj.default.join(e,Q8),Am=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,e3),Lj=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,t3),Ej=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,r3=e=>({...e,estimateTokens:Ej(e.estimateTokens),actualTokens:Ej(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),o3=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Qt=e=>{let t=kj(e);return al.default.existsSync(t)?al.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return o3(n)?[r3(n)]:[]}catch{return[]}}):[]},ll=(e,t)=>{al.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;al.default.writeFileSync(kj(e),r,"utf8")},Sm=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),n3=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${Sm(o.task)} | ${Sm(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},bm=e=>{let t=Qt(e.reportsDir),r=Am(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);ll(e.reportsDir,[...s,n])},UP=e=>{let t=Qt(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?Am(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);ll(e.reportsDir,[...i,s])},s3=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-Cj),BP=e=>[...Qt(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),xj=e=>{let t=Qt(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=Lj(e.input),n=Lj(e.output),s=Am(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);ll(e.reportsDir,[...c,a])},GP=(e,t)=>{let r=Qt(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},Tj=e=>({table:n3(s3(Qt(e))),embedding:null}),i3=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},a3=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-Cj),l3=e=>{let t=i3(a3(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${Sm(s.task)} | ${Sm(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},Ij=e=>{let t=Qt(e.reportsDir),r=Am(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);ll(e.reportsDir,[...s,n])},Oj=e=>{let t=Qt(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);ll(e.reportsDir,[...s,n])},Mj=e=>l3(Qt(e))});var Nj=l(()=>{"use strict";cl()});var er,VP,c3,qP,d3,u3,Pm,wm,p3,KP,jj=l(()=>{"use strict";Nj();er=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VP=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},c3=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${VP(-r)} under`:`${VP(r)} over`},qP=e=>e.toLocaleString("en-US"),d3=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${qP(-r)} under`:`${qP(r)} over`},u3=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},Pm=e=>e===null?"\u2014":VP(e),wm=e=>e===null?"\u2014":qP(e),p3=`(function () {
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
})();`,KP=e=>{let r=BP(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":c3(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":d3(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${er(u3(i))}</button></td>
        <td>${er(c)}</td>
        <td>${Pm(n.estimateSeconds)}</td>
        <td>${Pm(n.actualSeconds)}</td>
        <td>${er(d)}</td>
        <td>${wm(n.estimateTokens)}</td>
        <td>${wm(n.actualTokens)}</td>
        <td>${er(p)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${er(c)}</p>
        <h2>Input</h2>
        <pre>${er(i)}</pre>
        <h2>Output</h2>
        <pre>${er(a)}</pre>
        <p>Time: estimated ${Pm(n.estimateSeconds)} \xB7 actual ${Pm(n.actualSeconds)} \xB7 ${er(d)}</p>
        <p>Tokens: estimated ${wm(n.estimateTokens)} \xB7 actual ${wm(n.actualTokens)} \xB7 ${er(p)}</p>
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
        <script>${p3}</script>`}
    </section>`}});var Dj=l(()=>{"use strict";Wj();jj()});var as,m3,g3,JP,Hj=l(()=>{"use strict";as=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),m3=(e,t,r)=>{let o=as(t),n=as(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},g3=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${as(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>m3(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${as(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${as(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${as(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},JP=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(g3).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var $j=l(()=>{"use strict";Hj()});var dl,zj,Fj,YP,XP,ZP,Uj=l(()=>{"use strict";dl=m(require("node:fs")),zj=m(require("node:path"));fa();ip();Fj=(e,t,r)=>Hn({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,YP=(e,t,r)=>{let o=Fj(e,t,r);if(o===null)return[];if(!dl.default.existsSync(o))return[];let n=dl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},XP=e=>{let t=Fj(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Jt(e.entry.prompt),output:Jt(e.entry.output)};dl.default.mkdirSync(zj.default.dirname(t),{recursive:!0}),dl.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},ZP=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var f3,h3,ul,_m,QP=l(()=>{"use strict";f3=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),h3=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,ul=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=f3(i.assistantOutput),d=c.length>0?`Assistant: ${h3(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},_m=e=>{let t=e.userMessage.trim(),r=ul({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var It,pl,rw,y3,S3,ew,A3,ow,vm,Bj,Gj,b3,ls,nw,tw,Vj,P3,qj,cs,Wm,ml,w3,gl,sw,Lm,Em,Kj=l(()=>{"use strict";It=m(require("node:fs")),pl=m(require("node:path")),rw=require("node:crypto");QP();y3="writer-sessions",S3="active-index.json",ew=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),A3=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ow=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},vm=e=>{let t=pl.default.join(e.installDir,y3);return It.default.mkdirSync(t,{recursive:!0}),t},Bj=e=>pl.default.join(vm(e),S3),Gj=(e,t)=>pl.default.join(vm(e),`${t}.canonical.json`),b3=(e,t)=>pl.default.join(vm(e),`${t}.continuation.json`),ls=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,nw=e=>{let t=Bj(e);if(!It.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(It.default.readFileSync(t,"utf8"));if(!ew(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!ew(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!A3(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},tw=(e,t)=>{It.default.writeFileSync(Bj(e),JSON.stringify(t,null,2))},Vj=(e,t)=>{It.default.writeFileSync(Gj(e,t.sessionId),JSON.stringify(t,null,2))},P3=(e,t)=>{It.default.writeFileSync(b3(e,t.sessionId),JSON.stringify(t,null,2))},qj=(e,t)=>{let r=ul({turns:t.turns});P3(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},cs=(e,t)=>{let r=Gj(e,t);if(!It.default.existsSync(r))return null;try{let o=JSON.parse(It.default.readFileSync(r,"utf8"));return!ew(o)||typeof o.sessionId!="string"?null:o}catch{return null}},Wm=(e,t=20)=>{let r=vm(e),o=It.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=cs(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},ml=(e,t,r)=>{let o=ow(r);return nw(e).entries.find(i=>ls(i)===ls({writerAgent:t,projectFolderPath:o}))?.sessionId??null},w3=(e,t,r,o)=>{let n=nw(e),s=ls({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>ls(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];tw(e,{entries:i})},gl=(e,t,r)=>{let o=(0,rw.randomUUID)(),n=new Date().toISOString(),s=ow(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return Vj(e,i),qj(e,i),w3(e,t,s,o),o},sw=(e,t,r)=>{let o=ml(e,t,r);return o!==null?o:gl(e,t,r)},Lm=(e,t,r)=>{let o=ow(r),n=nw(e);if(o===null&&r===void 0){tw(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=ls({writerAgent:t,projectFolderPath:o});tw(e,{entries:n.entries.filter(i=>ls(i)!==s)})},Em=e=>{let t=sw(e.layout,e.writerAgent,e.projectFolderPath),r=cs(e.layout,t);if(r===null)return;let o={id:(0,rw.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};Vj(e.layout,n),qj(e.layout,n)}});var _3,v3,Rm,iw,Jj=l(()=>{"use strict";_3=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",v3=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},Rm=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",iw=e=>{let t=Rm(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=_3(r,e.userPromptCharacterCount),n=v3({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var Cm=l(()=>{"use strict";Uj();Kj();QP();Jj()});var Yj=l(()=>{"use strict";Wh()});var He,L3,E3,aw,lw,cw,Xj=l(()=>{"use strict";le();Yj();He=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),L3=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},E3=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=zd(o);return`value="${He(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${He(r)}"`},aw=(e,t,r,o,n)=>{let s=Qh[t];return`<label class="field">
          <span class="field-label">${He(o)} API key \u2014 ${He(L3(e,t))} \xB7 <a class="field-link" href="${He(s.href)}" target="_blank" rel="noopener noreferrer">${He(s.label)}</a></span>
          <input class="input mono" type="password" name="${He(r)}" autocomplete="off" ${E3(e,t,n)} />
        </label>`},lw=(e,t,r,o)=>{let n=Lh(e[t]?.model),s=new Set(Id[t].map(c=>c.value)),i=Id[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${He(c.value)}"${d}>${He(c.label)}</option>`}).join(""),a=n!==so&&!s.has(n)?`<option value="${He(n)}" selected>${He(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${He(o)}</span>
          <select class="input mono" name="${He(r)}">${i}${a}</select>
        </label>`},cw=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${He(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${aw(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${lw(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${aw(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${lw(e.secrets,"openai","openaiModel","OpenAI model")}
        ${aw(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${lw(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var Zj=l(()=>{"use strict";Xj()});var km,Qj,eD=l(()=>{"use strict";km=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qj=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${km(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Console \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${km(s.name)}</strong> <span class="muted mono">(${km(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${km(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var R3,tD,rD,oD=l(()=>{"use strict";R3=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,tD=e=>e.kind==="folder",rD=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&tD(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(tD(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(R3)};return r(t)}});var nD,dw,sD=l(()=>{"use strict";nD=m(require("node:path")),dw=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${dw(r.children,t)}</ul>
            </details>
          </li>`;let o=nD.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var iD,Ir,C3,k3,fl,x3,uw,aD=l(()=>{"use strict";up();iD=m(require("node:path"));eD();oD();sD();Ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),C3=()=>`(() => {
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

})();`,k3=()=>`(() => {
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
})();`,fl=e=>{let t=ba({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=Qj({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Ir(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ir(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':x3(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
    ${n}
    <script>${C3()}</script>
    <script>${k3()}</script>`;return`${t}${r}${o}${c}${d}`},x3=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=rD(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:iD.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),p=dw(d,Ir),g=a.items.length;return`<div class="harness-set-block">
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
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Ir(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},uw=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,S=t.sets[i];if(S===void 0)continue;let h=a.length>0?a:S.proposedSlug,y=g.length>0?g:S.proposedName,u=r.has(i),A=S.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:u}));s.push({slug:h,name:y,items:A})}return s}});var lD=l(()=>{"use strict";aD()});var T3,pw,cD=l(()=>{"use strict";vr();T3=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[De]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},pw=T3});var I3,dD,uD=l(()=>{"use strict";vr();I3=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[De]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},dD=I3});var pD=l(()=>{"use strict"});var hl,O3,mw,mD=l(()=>{"use strict";up();hl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),O3=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,mw=e=>{let t=e.flashError?`<div class="alert-error">${hl(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${hl(e.flashMessage)}</div>`:"",r=ba({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${hl(O3(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${hl(n.name)}</strong>
                  <span class="muted mono">${hl(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var gD=l(()=>{"use strict";pD();iS();mD()});var xm,fD=l(()=>{"use strict";xm=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var hD,tr,gw=l(()=>{"use strict";hD=m(require("node:path"));Ut();bt();V();le();qe();tr=e=>{let t=z()?.layout.installDir??E();if(hD.default.basename(t)===Br)return zt;let r=z(),o=r!==null?Ee(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):zt}});var fw,yD=l(()=>{"use strict";qe();gw();fw=async e=>{let t=Le(e.installDir),r=t?.bundleVersion??null,o=tr(t);try{let n=await mn(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Qr(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var hw,SD=l(()=>{"use strict";hw=e=>!e});var yw,ds,Sw=l(()=>{"use strict";V();yw=()=>`http://127.0.0.1:${Wf()}/update/run`,ds=async e=>{try{let t=await fetch(yw(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var M3,AD,Aw,bD=l(()=>{"use strict";V();te();Sw();M3=()=>{Ht({launchAgentLabel:oe(),installDir:E()})},AD=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Aw=async()=>{M3();let e=await ds({force:!0});if(e.ok)return{ok:!0,message:AD(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:AD(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(qe(),wE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var bw=l(()=>{"use strict";YA();fD();gw();yD();SD();bD();Sw()});var PD,wD=l(()=>{"use strict";PD=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var _D,vD,Pw,ww,WD=l(()=>{"use strict";_D=require("node:crypto"),vD=m(require("node:fs"));ut();le();le();wD();Pw=!1,ww=async e=>{if(Pw)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!PD(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=z();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&vD.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,_D.randomUUID)();Pw=!0;try{if(await Xy(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await bn({...r,workspace:n},e.writerAgent,t);return await zi(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Pw=!1}}});var LD=l(()=>{"use strict";WD()});var Ze,N3,ED,RD,_w,vw,Ww,Lw,Ew,Rw,Cw=l(()=>{"use strict";Ze=require("node:crypto"),N3=Buffer.from("302a300506032b6570032100","hex"),ED=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},RD=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Ze.createPublicKey)({key:Buffer.concat([N3,t]),format:"der",type:"spki"})},_w=()=>{let{publicKey:e,privateKey:t}=(0,Ze.generateKeyPairSync)("ed25519");return{publicKeyRaw:ED(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},vw=e=>(0,Ze.createPrivateKey)(e),Ww=(e,t)=>(0,Ze.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Lw=(e,t,r)=>{try{let o=RD(e);return(0,Ze.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Ew=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Rw=()=>(0,Ze.randomBytes)(32).toString("base64url")});var rr,Tm,CD,j3,D3,Im,kw,xw,kD=l(()=>{"use strict";rr=m(require("node:fs")),Tm=m(require("node:path"));Cw();V();bt();CD=e=>Tm.default.join(e.installDir,pr),j3=(e,t)=>{if(e.profileEmail===null||t===CD(e)||rr.default.existsSync(t))return;let r=CD(e);rr.default.existsSync(r)&&(rr.default.mkdirSync(Tm.default.dirname(t),{recursive:!0}),rr.default.renameSync(r,t))},D3=e=>{if(!rr.default.existsSync(e))return null;try{let t=rr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Im=e=>{let t=ad(e);j3(e,t);let r=D3(t);if(r!==null)return r;let o=_w();return rr.default.mkdirSync(Tm.default.dirname(t),{recursive:!0}),rr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},kw=e=>{let t=Im(e.layout),r=Rw(),o=Ew({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=vw(t.privateKeyPem),s=Ww(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},xw=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Lw(e.serverPublicKey,t,e.serverAttestation)}});var Tw=l(()=>{"use strict";kD();Cw()});var OD,yl,Mw,Nw,xD,H3,Iw,Om,se,MD,$3,Ow,z3,F3,jw,ue,we,or,U3,TD,ID,Sl,Al,ND=l(()=>{"use strict";OD=m(require("node:http")),yl=m(require("node:fs")),Mw=m(require("node:path"));Mm();pa();wT();vT();kT();kn();_A();qA();a0();c0();wj();vj();Dj();$j();Cm();Zj();lD();po();ut();vr();cD();uD();gD();bw();qe();LD();le();Tw();Nw=e=>uA(e)??"never",xD=48e3,H3=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,Iw=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??fu(),reveal:t.reveal,installed:_r(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Om=async e=>{let t=z();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:Ln(t,e)},se=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MD=200,$3=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Ow=e=>{let t=e.trim().slice(0,MD),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},z3=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${se(t)}</div>`,F3=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${se(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',jw={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},ue=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...jw}),e.end(JSON.stringify(r))},we=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},or=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},U3=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=$3(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${se(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=hw(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${ma(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${se(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${se(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${se(Nw(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${se(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},TD=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},ID=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,MD)},Sl=e=>{let t=Mw.default.join(e.layout.installDir,"link-code.txt"),r=()=>Le(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:xm(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),u=await i(),A=eb(u),b=h.updateFlash??null,f=tb(b),w=z3(b,h.updateError??null);return ZA({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:tr(y),installBundleVersionLabel:xm(y),prependBody:`${f}${w}${A}`,headerUpdateButtonHtml:QA(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await fw(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:Ow("An update is already running.")}),h.end();return}c=!0;try{let u=await Aw(),A=u.ok?"/?update=ok":Ow(u.message);h.writeHead(303,{Location:A}),h.end()}catch(u){let A=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:Ow(A)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${se(y)}</h1>
      <p>${se(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(b)},g=()=>{if(yl.default.existsSync(t))return yl.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return yl.default.writeFileSync(t,h,"utf8"),h},S=OD.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",A=h.method??"GET";if(A==="OPTIONS"){y.writeHead(204,jw),y.end();return}if(!await zP({method:A,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:_j(Mw.default.dirname(e.layout.configPath)),readBody:or,sendHtml:we,renderShell:n})){if(A==="GET"&&u==="/health"){let b=e.controllers.getStatus(),f=o();ue(y,200,{ok:!0,...b,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/status"){let b=o();ue(y,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/traffic"){ue(y,200,{entries:da(e.layout)});return}if(A==="DELETE"&&u==="/api/traffic"||A==="POST"&&u==="/api/traffic/clear"){if(gA(e.layout),A==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}ue(y,200,{ok:!0});return}if(A==="GET"&&u==="/api/trace"){ue(y,200,{entries:rp(e.layout)});return}if(A==="DELETE"&&u==="/api/trace"||A==="POST"&&u==="/api/trace/clear"){if(yA(e.layout),A==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}ue(y,200,{ok:!0});return}if(A==="POST"&&u==="/api/errors/clear"){SA(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(A==="GET"&&u==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let w=await zn({layout:e.layout,query:f,limit:20});ue(y,200,{chunks:w,query:f});return}ue(y,200,{chunks:$n(e.layout).slice(-50).reverse()});return}if(A==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(A==="GET"&&u==="/api/update-status"){let b=await i();ue(y,200,{ok:!0,...b});return}if((A==="GET"||A==="POST")&&u==="/api/update"){await d(y);return}if(A==="GET"&&u==="/"){let b=e.controllers.getStatus(),f=o(),w=_r(e.layout),_=op(e.layout.errorLogPath);we(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:TD(h.url??void 0),updateError:ID(h.url??void 0),body:rb({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:$n(e.layout).length,trafficEntryCount:da(e.layout).length,wakeError:b.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(A==="GET"&&u==="/task"){let b=e.controllers.getStatus(),f=o(),w=z(),_=new URL(h.url??"/",`http://127.0.0.1:${43347}`),v=_.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=_.searchParams.get("failed")==="1"?_.searchParams.get("error")?.trim()??"Task failed.":null,R=_.searchParams.get("runId");we(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:FP({defaultWorkspace:w?.workspace??"",wsConnected:b.wsConnected,flashMessage:v,flashError:L,lastRunId:R})}));return}if(A==="POST"&&u==="/task/dispatch"){let b=await or(h),f=new URLSearchParams(b),w=f.get("prompt")?.trim()??"",_=f.get("writerAgent")?.trim()??"claude-cli",v=f.get("projectFolder")?.trim()??"",L=await ww({prompt:w,writerAgent:_,...v.length>0?{projectFolderPath:v}:{}}),R=new URLSearchParams;L.ok?R.set("ok","1"):(R.set("failed","1"),L.errorMessage!==void 0&&R.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&R.set("runId",L.agentRunId),y.writeHead(303,{Location:`/task?${R.toString()}`}),y.end();return}if(A==="GET"&&u==="/writer-sessions"){let b=o(),f=Wm(e.layout,12);we(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:TD(h.url??void 0),updateError:ID(h.url??void 0),body:JP({sessions:f})}));return}if(A==="GET"&&u==="/errors"){let b=o(),f=op(e.layout.errorLogPath);we(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:bA({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&u==="/status"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),w=Se(e.layout),_=w!==null?Oe(w,12e4):vA(f.lastHeartbeatAt,12e4),v=WA({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:_}),L=o();we(y,await n({title:"Status",activePath:"/status",installVersion:L.installVersion,body:`${U3({status:f,healthBadge:v,revived:b.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:L.installBundleVersion,installBundleUpdatedAt:L.installBundleUpdatedAt})}${RA({installDir:e.layout.installDir})}${EA({entries:rp(e.layout)})}`}));return}if(A==="GET"&&u==="/traffic"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=da(e.layout),w=o(),_=f.map(R=>`<tr><td title="${se(R.at)}">${se(Nw(R.at))}</td><td>${se(R.direction)}</td><td><code>${se(R.type)}</code></td><td>${se(R.summary)}</td><td>${se(R.action??"")}</td></tr>`).join(""),v=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${_}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',L=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";we(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${L}
              ${v}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&u==="/projects"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=tr(f.installVersion),_=await Om(e.layout),v=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,L=z(),R=L===null?null:Z({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),x=R===null?{}:Object.fromEntries((await Promise.all(_.projects.map(async I=>{let D=await pw(R,I.id);return[I.id,D?.counts??null]}))).filter(I=>I[1]!==null));we(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:mw({projects:_.projects,compositionCountsByProjectId:x,cloudAppOrigin:w,syncMessage:_.message,syncOk:_.ok,flashMessage:null,flashError:v})}));return}if(A==="GET"&&u==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=z(),_=w===null?null:Z({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),v=f.length>0&&_!==null?Wr():null;if(v===null||_===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Ue({projectFolderPath:v}),!await Gi(_,f,v)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(A==="GET"&&u==="/project"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=b.searchParams.get("id")?.trim()??"",w=o(),_=await Om(e.layout),v=ho(_.projects,f);if(v===null){await p(y,"Project not found");return}let L=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,R=b.searchParams.get("knowledgePromoted"),x=R!==null?`Marked ${R} lesson(s) as promoted in Agent Witch.`:null,I=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,D=b.searchParams.get("tab")?.trim()??"harness",re=D==="workflows"||D==="agents"||D==="knowledge"?D:"harness",B=z(),q=B===null?null:Z({wsUrl:B.wsUrl,pairingToken:B.pairingToken}),Dr=q===null?null:await pw(q,v.id),$=0;if(q!==null)try{let _e=await fetch(`${q.appOrigin}/api/agent-witch/projects/${encodeURIComponent(v.id)}/knowledge`,{method:"GET",headers:{[De]:q.pairingToken},signal:AbortSignal.timeout(1e4)});if(_e.ok){let yt=await _e.json();typeof yt=="object"&&yt!==null&&typeof yt.candidateCount=="number"&&($=yt.candidateCount)}}catch{$=0}we(y,await n({title:v.name,activePath:"/projects",installVersion:w.installVersion,body:En({project:v,installed:_r(e.layout),linkedSetSlugs:Pr(v.projectFolderPath),composition:Dr,knowledgeCandidateCount:$,activeTab:re,flashMessage:L??x,flashError:I})}));return}if(A==="POST"&&u==="/projects/pull-bound-harness"){let b=await or(h),f=await aS({rawBody:b,layout:e.layout});if(f.kind==="not_found"){await p(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let w=o();we(y,await n({title:f.title,activePath:"/projects",installVersion:w.installVersion,body:f.body}));return}if(A==="POST"&&u==="/projects/link-harness"){let b=await or(h),f=new URLSearchParams(b),w=f.get("projectId")?.trim()??"",_=await Om(e.layout),v=ho(_.projects,w);if(v===null){await p(y,"Project not found");return}let L=f.getAll("applySet").map(B=>String(B)),R=Ti({layout:e.layout,projectFolderPath:v.projectFolderPath,setSlugs:L});if(!R.ok){let B=o();we(y,await n({title:v.name,activePath:"/projects",installVersion:B.installVersion,body:En({project:v,installed:_r(e.layout),linkedSetSlugs:Pr(v.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:R.errorMessage})}));return}let x=z(),I=x===null?null:Z({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),D=I===null?!1:await Ui(I,v.id,R.appliedSetSlugs),re=new URLSearchParams({linked:"1",files:String(R.writtenFileCount),bindingsSynced:D?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${re.toString()}`}),y.end();return}if(A==="POST"&&u==="/project/knowledge/promote-all"){let b=await or(h),w=new URLSearchParams(b).get("projectId")?.trim()??"",_=await Om(e.layout),v=ho(_.projects,w);if(v===null){await p(y,"Project not found");return}let L=z(),R=L===null?null:Z({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),x=R===null?{ok:!1,promotedCount:0}:await dD(R,v.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${I.toString()}`}),y.end();return}if(A==="GET"&&u==="/harness"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=Ni(e.layout),_=b.searchParams.get("submitted")==="1",v=_?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,L=w?.scanRoots[0]??fu(),R=H3(e.layout,{reveal:w,importQuery:b.searchParams.get("import")==="1",justSubmitted:_}),x=tr(f.installVersion);we(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:fl(Iw(e.layout,{cloudAppOrigin:x,reveal:w,scanFolder:L,flashMessage:v,importSectionExpanded:R}))}));return}if(A==="POST"&&u==="/api/harness/pick-folder"){let b=Wr();if(b===null){ue(y,200,{cancelled:!0});return}ue(y,200,{path:b});return}if(A==="GET"&&u==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=xi(f);if(w===null){ue(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=yl.default.readFileSync(w,"utf8"),v=_.length>xD?`${_.slice(0,xD)}
\u2026 (truncated)`:_;ue(y,200,{content:v})}catch{ue(y,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&u==="/api/harness/reveal/add-project"){let b=await or(h),f="";try{let v=JSON.parse(b);typeof v=="object"&&v!==null&&typeof v.projectPath=="string"&&(f=v.projectPath.trim())}catch{ue(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){ue(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=Ni(e.layout),_=zy({reveal:w,projectPath:f});if(_===null||_.sets.length===0){ue(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Au(e.layout,_),ue(y,200,{ok:!0,setCount:_.sets.length});return}if(A==="GET"&&u==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){ue(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...jw});let _=Fy({scanRoot:f,response:y,shouldAbort:()=>w});Au(e.layout,_),y.end();return}if(A==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&u==="/harness/submit"){let b=Ni(e.layout);if(b===null){let x=o(),I=tr(x.installVersion);we(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:fl(Iw(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await or(h),w=new URLSearchParams(f),_=uw(w,b),v=By({layout:e.layout,sets:_});if(!v.ok){let x=o(),I=tr(x.installVersion);we(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:fl(Iw(e.layout,{cloudAppOrigin:I,reveal:b,flashError:v.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}Vy(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${v.writtenItemCount??0}${R}`}),y.end();return}if(A==="GET"&&u==="/writer-api"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=z()?.writerExecutionBackend??Re(void 0),_=ye(e.layout.configPath),v=yr(_),L=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=o();we(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:cw({writerExecutionBackend:w,secrets:v,flashMessage:L})}));return}if(A==="POST"&&u==="/writer-api"){let b=await or(h),f=new URLSearchParams(b),w=f.get("writerExecutionBackend")?.trim()??"cli";Zh({configPath:e.layout.configPath,writerExecutionBackend:Re(w),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(A==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(A==="GET"&&u==="/history"){let b=o();we(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:KP({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&u==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),_=MA({layout:e.layout}),v=DA(_),L=f.length>0?await zn({layout:e.layout,query:f,limit:20}):$n(e.layout).slice(-50).reverse(),R=L.map(I=>{let D=jA(_,I.id),re=D>0?` \xB7 used in ${D} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${se(I.createdAt)}">${se(Nw(I.createdAt))}${I.source?` \xB7 ${se(I.source)}`:""}${re}</div><pre>${se(I.text)}</pre></article>`}).join(""),x=v.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${v.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${se(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";we(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${se(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${x}${R}${F3(f,L.length)}`}));return}A==="POST"&&await or(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return S.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Ft}`)}),S},Al=e=>Im(e).publicKeyRaw});var Mm=l(()=>{"use strict";iT();aT();ND()});var DD={};St(DD,{runAgentWitchExternalLiveCli:()=>G3});var Dw,jD,B3,G3,HD=l(()=>{"use strict";Dw=m(require("node:fs")),jD=m(require("node:path"));kn();V();te();Mm();te();B3=e=>{let t=jD.default.join(e,"link-code.txt");if(!Dw.default.existsSync(t))return null;let r=Dw.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},G3=()=>{ze("agent-witch-live");let e=E(),t=M(),r=B3(e),o=Al(t);Sl({layout:t,controllers:{getStatus:()=>{let n=Se(t);return{wsConnected:ea(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Jr(e)}}})}});var nr=W((Hve,FD)=>{"use strict";var $D=["nodebuffer","arraybuffer","fragments"],zD=typeof Blob<"u";zD&&$D.push("blob");FD.exports={BINARY_TYPES:$D,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:zD,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var bl=W(($ve,Nm)=>{"use strict";var{EMPTY_BUFFER:V3}=nr(),Hw=Buffer[Symbol.species];function q3(e,t){if(e.length===0)return V3;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new Hw(r.buffer,r.byteOffset,o):r}function UD(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function BD(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function K3(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function $w(e){if($w.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Hw(e):ArrayBuffer.isView(e)?t=new Hw(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),$w.readOnly=!1),t}Nm.exports={concat:q3,mask:UD,toArrayBuffer:K3,toBuffer:$w,unmask:BD};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Nm.exports.mask=function(t,r,o,n,s){s<48?UD(t,r,o,n,s):e.mask(t,r,o,n,s)},Nm.exports.unmask=function(t,r){t.length<32?BD(t,r):e.unmask(t,r)}}catch{}});var qD=W((zve,VD)=>{"use strict";var GD=Symbol("kDone"),zw=Symbol("kRun"),Fw=class{constructor(t){this[GD]=()=>{this.pending--,this[zw]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[zw]()}[zw](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[GD])}}};VD.exports=Fw});var ms=W((Fve,XD)=>{"use strict";var Pl=require("zlib"),KD=bl(),J3=qD(),{kStatusCode:JD}=nr(),Y3=Buffer[Symbol.species],X3=Buffer.from([0,0,255,255]),Dm=Symbol("permessage-deflate"),sr=Symbol("total-length"),us=Symbol("callback"),Or=Symbol("buffers"),ps=Symbol("error"),jm,Uw=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!jm){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;jm=new J3(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[us];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!n.client_max_window_bits));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){jm.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){jm.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Pl.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Pl.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Dm]=this,this._inflate[sr]=0,this._inflate[Or]=[],this._inflate.on("error",Q3),this._inflate.on("data",YD)}this._inflate[us]=o,this._inflate.write(t),r&&this._inflate.write(X3),this._inflate.flush(()=>{let s=this._inflate[ps];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=KD.concat(this._inflate[Or],this._inflate[sr]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[sr]=0,this._inflate[Or]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Pl.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Pl.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[sr]=0,this._deflate[Or]=[],this._deflate.on("data",Z3)}this._deflate[us]=o,this._deflate.write(t),this._deflate.flush(Pl.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=KD.concat(this._deflate[Or],this._deflate[sr]);r&&(s=new Y3(s.buffer,s.byteOffset,s.length-4)),this._deflate[us]=null,this._deflate[sr]=0,this._deflate[Or]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};XD.exports=Uw;function Z3(e){this[Or].push(e),this[sr]+=e.length}function YD(e){if(this[sr]+=e.length,this[Dm]._maxPayload<1||this[sr]<=this[Dm]._maxPayload){this[Or].push(e);return}this[ps]=new RangeError("Max payload size exceeded"),this[ps].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[ps][JD]=1009,this.removeListener("data",YD),this.reset()}function Q3(e){if(this[Dm]._inflate=null,this[ps]){this[us](this[ps]);return}e[JD]=1007,this[us](e)}});var gs=W((Uve,Hm)=>{"use strict";var{isUtf8:ZD}=require("buffer"),{hasBlob:e4}=nr(),t4=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function r4(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Bw(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function o4(e){return e4&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Hm.exports={isBlob:o4,isValidStatusCode:r4,isValidUTF8:Bw,tokenChars:t4};if(ZD)Hm.exports.isValidUTF8=function(e){return e.length<24?Bw(e):ZD(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Hm.exports.isValidUTF8=function(t){return t.length<32?Bw(t):e(t)}}catch{}});var Jw=W((Bve,sH)=>{"use strict";var{Writable:n4}=require("stream"),QD=ms(),{BINARY_TYPES:s4,EMPTY_BUFFER:eH,kStatusCode:i4,kWebSocket:a4}=nr(),{concat:Gw,toArrayBuffer:l4,unmask:c4}=bl(),{isValidStatusCode:d4,isValidUTF8:tH}=gs(),$m=Buffer[Symbol.species],Qe=0,rH=1,oH=2,nH=3,Vw=4,qw=5,zm=6,Kw=class extends n4{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||s4[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[a4]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Qe}_write(t,r,o){if(this._opcode===8&&this._state==Qe)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new $m(o.buffer,o.byteOffset+t,o.length-t),new $m(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new $m(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Qe:this.getInfo(t);break;case rH:this.getPayloadLength16(t);break;case oH:this.getPayloadLength64(t);break;case nH:this.getMask();break;case Vw:this.getData(t);break;case qw:case zm:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[QD.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=rH:this._payloadLength===127?this._state=oH:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=nH:this._state=Vw}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Vw}getData(t){let r=eH;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&c4(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=qw,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[QD.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Qe&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Qe;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=Gw(o,r):this._binaryType==="arraybuffer"?n=l4(Gw(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=Qe):(this._state=zm,setImmediate(()=>{this.emit("message",n,!0),this._state=Qe,this.startLoop(t)}))}else{let n=Gw(o,r);if(!this._skipUTF8Validation&&!tH(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===qw||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=Qe):(this._state=zm,setImmediate(()=>{this.emit("message",n,!1),this._state=Qe,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,eH),this.end();else{let o=t.readUInt16BE(0);if(!d4(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new $m(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!tH(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=Qe;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Qe):(this._state=zm,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Qe,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[i4]=n,i}};sH.exports=Kw});var Zw=W((Vve,lH)=>{"use strict";var{Duplex:Gve}=require("stream"),{randomFillSync:u4}=require("crypto"),{types:{isUint8Array:p4}}=require("util"),iH=ms(),{EMPTY_BUFFER:m4,kWebSocket:g4,NOOP:f4}=nr(),{isBlob:fs,isValidStatusCode:h4}=gs(),{mask:aH,toBuffer:zo}=bl(),et=Symbol("kByteLength"),y4=Buffer.alloc(4),Fm=8*1024,Fo,hs=Fm,ht=0,S4=1,A4=2,Yw=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=ht,this.onerror=f4,this[g4]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||y4,r.generateMask?r.generateMask(o):(hs===Fm&&(Fo===void 0&&(Fo=Buffer.alloc(Fm)),u4(Fo,0,Fm),hs=0),o[0]=Fo[hs++],o[1]=Fo[hs++],o[2]=Fo[hs++],o[3]=Fo[hs++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[et]!==void 0?a=r[et]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(aH(t,o,d,s,a),[d]):(aH(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=m4;else{if(typeof t!="number"||!h4(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(p4(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[et]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==ht?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):fs(t)?(n=t.size,s=!1):(t=zo(t),n=t.length,s=zo.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[et]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};fs(t)?this._state!==ht?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==ht?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):fs(t)?(n=t.size,s=!1):(t=zo(t),n=t.length,s=zo.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[et]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};fs(t)?this._state!==ht?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==ht?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[iH.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):fs(t)?(a=t.size,c=!1):(t=zo(t),a=t.length,c=zo.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[et]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};fs(t)?this._state!==ht?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==ht?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[et],this._state=A4,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(Xw,this,a,n);return}this._bufferedBytes-=o[et];let i=zo(s);r?this.dispatch(i,r,o,n):(this._state=ht,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(b4,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[iH.extensionName];this._bufferedBytes+=o[et],this._state=S4,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");Xw(this,c,n);return}this._bufferedBytes-=o[et],this._state=ht,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===ht&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][et],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][et],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};lH.exports=Yw;function Xw(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function b4(e,t,r){Xw(e,t,r),e.onerror(t)}});var yH=W((qve,hH)=>{"use strict";var{kForOnEventAttribute:wl,kListener:Qw}=nr(),cH=Symbol("kCode"),dH=Symbol("kData"),uH=Symbol("kError"),pH=Symbol("kMessage"),mH=Symbol("kReason"),ys=Symbol("kTarget"),gH=Symbol("kType"),fH=Symbol("kWasClean"),ir=class{constructor(t){this[ys]=null,this[gH]=t}get target(){return this[ys]}get type(){return this[gH]}};Object.defineProperty(ir.prototype,"target",{enumerable:!0});Object.defineProperty(ir.prototype,"type",{enumerable:!0});var Uo=class extends ir{constructor(t,r={}){super(t),this[cH]=r.code===void 0?0:r.code,this[mH]=r.reason===void 0?"":r.reason,this[fH]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[cH]}get reason(){return this[mH]}get wasClean(){return this[fH]}};Object.defineProperty(Uo.prototype,"code",{enumerable:!0});Object.defineProperty(Uo.prototype,"reason",{enumerable:!0});Object.defineProperty(Uo.prototype,"wasClean",{enumerable:!0});var Ss=class extends ir{constructor(t,r={}){super(t),this[uH]=r.error===void 0?null:r.error,this[pH]=r.message===void 0?"":r.message}get error(){return this[uH]}get message(){return this[pH]}};Object.defineProperty(Ss.prototype,"error",{enumerable:!0});Object.defineProperty(Ss.prototype,"message",{enumerable:!0});var _l=class extends ir{constructor(t,r={}){super(t),this[dH]=r.data===void 0?null:r.data}get data(){return this[dH]}};Object.defineProperty(_l.prototype,"data",{enumerable:!0});var P4={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[wl]&&n[Qw]===t&&!n[wl])return;let o;if(e==="message")o=function(s,i){let a=new _l("message",{data:i?s:s.toString()});a[ys]=this,Um(t,this,a)};else if(e==="close")o=function(s,i){let a=new Uo("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[ys]=this,Um(t,this,a)};else if(e==="error")o=function(s){let i=new Ss("error",{error:s,message:s.message});i[ys]=this,Um(t,this,i)};else if(e==="open")o=function(){let s=new ir("open");s[ys]=this,Um(t,this,s)};else return;o[wl]=!!r[wl],o[Qw]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[Qw]===t&&!r[wl]){this.removeListener(e,r);break}}};hH.exports={CloseEvent:Uo,ErrorEvent:Ss,Event:ir,EventTarget:P4,MessageEvent:_l};function Um(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Bm=W((Kve,SH)=>{"use strict";var{tokenChars:vl}=gs();function Ot(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function w4(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&vl[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);d===44?(Ot(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&vl[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),Ot(r,e.slice(c,p),!0),d===44&&(Ot(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(vl[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(vl[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&vl[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);o&&(h=h.replace(/\\/g,""),o=!1),Ot(r,a,h),d===44&&(Ot(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let S=e.slice(c,p);return i===void 0?Ot(t,S,r):(a===void 0?Ot(r,S,!0):o?Ot(r,a,S.replace(/\\/g,"")):Ot(r,a,S),Ot(t,i,r)),t}function _4(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}SH.exports={format:_4,parse:w4}});var Km=W((Xve,kH)=>{"use strict";var v4=require("events"),W4=require("https"),L4=require("http"),PH=require("net"),E4=require("tls"),{randomBytes:R4,createHash:C4}=require("crypto"),{Duplex:Jve,Readable:Yve}=require("stream"),{URL:e_}=require("url"),Mr=ms(),k4=Jw(),x4=Zw(),{isBlob:T4}=gs(),{BINARY_TYPES:AH,CLOSE_TIMEOUT:I4,EMPTY_BUFFER:Gm,GUID:O4,kForOnEventAttribute:t_,kListener:M4,kStatusCode:N4,kWebSocket:he,NOOP:wH}=nr(),{EventTarget:{addEventListener:j4,removeEventListener:D4}}=yH(),{format:H4,parse:$4}=Bm(),{toBuffer:z4}=bl(),_H=Symbol("kAborted"),r_=[8,13],ar=["CONNECTING","OPEN","CLOSING","CLOSED"],F4=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Y=class e extends v4{constructor(t,r,o){super(),this._binaryType=AH[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Gm,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,r=[]):r=[r]),vH(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){AH.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new k4({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new x4(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[he]=this,s[he]=this,t[he]=this,n.on("conclude",G4),n.on("drain",V4),n.on("error",q4),n.on("message",K4),n.on("ping",J4),n.on("pong",Y4),s.onerror=X4,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",EH),t.on("data",qm),t.on("end",RH),t.on("error",CH),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Mr.extensionName]&&this._extensions[Mr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ve(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),LH(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){o_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Gm,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){o_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Gm,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){o_(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Mr.extensionName]||(n.compress=!1),this._sender.send(t||Gm,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ve(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Y,"CONNECTING",{enumerable:!0,value:ar.indexOf("CONNECTING")});Object.defineProperty(Y.prototype,"CONNECTING",{enumerable:!0,value:ar.indexOf("CONNECTING")});Object.defineProperty(Y,"OPEN",{enumerable:!0,value:ar.indexOf("OPEN")});Object.defineProperty(Y.prototype,"OPEN",{enumerable:!0,value:ar.indexOf("OPEN")});Object.defineProperty(Y,"CLOSING",{enumerable:!0,value:ar.indexOf("CLOSING")});Object.defineProperty(Y.prototype,"CLOSING",{enumerable:!0,value:ar.indexOf("CLOSING")});Object.defineProperty(Y,"CLOSED",{enumerable:!0,value:ar.indexOf("CLOSED")});Object.defineProperty(Y.prototype,"CLOSED",{enumerable:!0,value:ar.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Y.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Y.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[t_])return t[M4];return null},set(t){for(let r of this.listeners(e))if(r[t_]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[t_]:!0})}})});Y.prototype.addEventListener=j4;Y.prototype.removeEventListener=D4;kH.exports=Y;function vH(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:I4,protocolVersion:r_[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!r_.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${r_.join(", ")})`);let s;if(t instanceof e_)s=t;else try{s=new e_(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Vm(e,u);return}let d=i?443:80,p=R4(16).toString("base64"),g=i?W4.request:L4.request,S=new Set,h;if(n.createConnection=n.createConnection||(i?B4:U4),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new Mr({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=H4({[Mr.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!F4.test(u)||S.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(u)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let u=n.path.split(":");n.socketPath=u[0],n.path=u[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let u=o&&o.headers;if(o={...o,headers:{}},u)for(let[A,b]of Object.entries(u))o.headers[A.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,u||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=g(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=g(n);n.timeout&&y.on("timeout",()=>{Ve(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[_H]||(y=e._req=null,Vm(e,u))}),y.on("response",u=>{let A=u.headers.location,b=u.statusCode;if(A&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){Ve(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new e_(A,t)}catch{let _=new SyntaxError(`Invalid URL: ${A}`);Vm(e,_);return}vH(e,f,r,o)}else e.emit("unexpected-response",y,u)||Ve(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,A,b)=>{if(e.emit("upgrade",u),e.readyState!==Y.CONNECTING)return;y=e._req=null;let f=u.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){Ve(e,A,"Invalid Upgrade header");return}let w=C4("sha1").update(p+O4).digest("base64");if(u.headers["sec-websocket-accept"]!==w){Ve(e,A,"Invalid Sec-WebSocket-Accept header");return}let _=u.headers["sec-websocket-protocol"],v;if(_!==void 0?S.size?S.has(_)||(v="Server sent an invalid subprotocol"):v="Server sent a subprotocol but none was requested":S.size&&(v="Server sent no subprotocol"),v){Ve(e,A,v);return}_&&(e._protocol=_);let L=u.headers["sec-websocket-extensions"];if(L!==void 0){if(!h){Ve(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=$4(L)}catch{Ve(e,A,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(R);if(x.length!==1||x[0]!==Mr.extensionName){Ve(e,A,"Server indicated an extension that was not requested");return}try{h.accept(R[Mr.extensionName])}catch{Ve(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Mr.extensionName]=h}e.setSocket(A,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Vm(e,t){e._readyState=Y.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function U4(e){return e.path=e.socketPath,PH.connect(e)}function B4(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=PH.isIP(e.host)?"":e.host),E4.connect(e)}function Ve(e,t,r){e._readyState=Y.CLOSING;let o=new Error(r);Error.captureStackTrace(o,Ve),t.setHeader?(t[_H]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Vm,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function o_(e,t,r){if(t){let o=T4(t)?t.size:z4(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${ar[e.readyState]})`);process.nextTick(r,o)}}function G4(e,t){let r=this[he];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[he]!==void 0&&(r._socket.removeListener("data",qm),process.nextTick(WH,r._socket),e===1005?r.close():r.close(e,t))}function V4(){let e=this[he];e.isPaused||e._socket.resume()}function q4(e){let t=this[he];t._socket[he]!==void 0&&(t._socket.removeListener("data",qm),process.nextTick(WH,t._socket),t.close(e[N4])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function bH(){this[he].emitClose()}function K4(e,t){this[he].emit("message",e,t)}function J4(e){let t=this[he];t._autoPong&&t.pong(e,!this._isServer,wH),t.emit("ping",e)}function Y4(e){this[he].emit("pong",e)}function WH(e){e.resume()}function X4(e){let t=this[he];t.readyState!==Y.CLOSED&&(t.readyState===Y.OPEN&&(t._readyState=Y.CLOSING,LH(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function LH(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function EH(){let e=this[he];if(this.removeListener("close",EH),this.removeListener("data",qm),this.removeListener("end",RH),e._readyState=Y.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[he]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",bH),e._receiver.on("finish",bH))}function qm(e){this[he]._receiver.write(e)||this.pause()}function RH(){let e=this[he];e._readyState=Y.CLOSING,e._receiver.end(),this.end()}function CH(){let e=this[he];this.removeListener("error",CH),this.on("error",wH),e&&(e._readyState=Y.CLOSING,this.destroy())}});var OH=W((Qve,IH)=>{"use strict";var Zve=Km(),{Duplex:Z4}=require("stream");function xH(e){e.emit("close")}function Q4(){!this.destroyed&&this._writableState.finished&&this.destroy()}function TH(e){this.removeListener("error",TH),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function e6(e,t){let r=!0,o=new Z4({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(xH,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(xH,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",Q4),o.on("error",TH),o}IH.exports=e6});var n_=W((eWe,MH)=>{"use strict";var{tokenChars:t6}=gs();function r6(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&t6[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}MH.exports={parse:r6}});var FH=W((rWe,zH)=>{"use strict";var o6=require("events"),Jm=require("http"),{Duplex:tWe}=require("stream"),{createHash:n6}=require("crypto"),NH=Bm(),Bo=ms(),s6=n_(),i6=Km(),{CLOSE_TIMEOUT:a6,GUID:l6,kWebSocket:c6}=nr(),d6=/^[+/0-9A-Za-z]{22}==$/,jH=0,DH=1,$H=2,s_=class extends o6{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:a6,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:i6,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Jm.createServer((o,n)=>{let s=Jm.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=u6(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=jH}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===$H){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Wl,this);return}if(t&&this.once("close",t),this._state!==DH)if(this._state=DH,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Wl,this):process.nextTick(Wl,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Wl(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",HH);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Go(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Go(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!d6.test(s)){Go(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Go(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Ll(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=s6.parse(c)}catch{Go(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let S=new Bo({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=NH.parse(p);h[Bo.extensionName]&&(S.accept(h[Bo.extensionName]),g[Bo.extensionName]=S)}catch{Go(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(h,y,u,A)=>{if(!h)return Ll(r,y||401,u,A);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return Ll(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[c6])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>jH)return Ll(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${n6("sha1").update(r+l6).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[Bo.extensionName]){let g=t[Bo.extensionName].params,S=NH.format({[Bo.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${S}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",HH),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Wl,this)})),a(p,n)}};zH.exports=s_;function u6(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Wl(e){e._state=$H,e.emit("close")}function HH(){this.destroy()}function Ll(e,t,r,o){r=r||Jm.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Jm.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Go(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Go),e.emit("wsClientError",i,r,t)}else Ll(r,o,n,s)}});var p6,m6,g6,f6,h6,y6,UH,S6,El,BH=l(()=>{p6=m(OH(),1),m6=m(Bm(),1),g6=m(ms(),1),f6=m(Jw(),1),h6=m(Zw(),1),y6=m(n_(),1),UH=m(Km(),1),S6=m(FH(),1),El=UH.default});var i_,a_,l_=l(()=>{"use strict";i_="AGENT_WITCH_EXTERNAL_BRIDGE",a_="AGENT_WITCH_EXTERNAL_LIVE"});var c_,GH=l(()=>{"use strict";c_=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var A6,d_,VH=l(()=>{"use strict";l_();GH();A6=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",d_=(e={})=>{let t=e.env??process.env,r=c_(t[i_]),o=c_(t[a_]);return{mode:A6(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var qH=l(()=>{"use strict";l_()});var KH=l(()=>{"use strict";VH();qH()});var u_=l(()=>{"use strict"});var lr,Rl=l(()=>{"use strict";lr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var As,Vo,JH,P6,p_,m_,YH,XH,g_,ZH,Cl,f_=l(()=>{"use strict";As=m(require("node:fs")),Vo=m(require("node:os")),JH=m(require("node:path"));u_();Rl();P6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),p_=(e=Vo.default.hostname())=>JH.default.join(Vo.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),m_=e=>{if(!As.default.existsSync(e))return null;try{let t=JSON.parse(As.default.readFileSync(e,"utf8"));return!P6(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},YH=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},XH=(e,t)=>{As.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},g_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??p_(),o=m_(r);if(o!==null&&o.pid!==process.pid&&lr(o.pid)&&YH(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Vo.default.hostname(),macOsUsername:Vo.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return XH(r,n),{ok:!0}},ZH=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??p_(),o=m_(r);return o!==null&&o.pid!==process.pid&&lr(o.pid)&&YH(o)?{ok:!1}:(XH(r,{hostname:Vo.default.hostname(),macOsUsername:Vo.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Cl=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??p_();m_(r)?.pid===process.pid&&As.default.existsSync(r)&&As.default.unlinkSync(r)}});var h_,kl,w6,_6,v6,W6,y_,QH=l(()=>{"use strict";h_=require("node:child_process"),kl=m(require("node:path"));Rl();yd();w6=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),_6=(e,t)=>{if(w6(e)||!/\bnode\b/.test(e))return!1;let r=kl.default.resolve(t),o=kl.default.join(r,"app",Gs),n=kl.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Gs||i==="agent-witch.ts")return e.includes(r);try{let a=kl.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},v6=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,h_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},W6=(e,t,r)=>{let o=v6(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||_6(d,t)&&n.push(c)}return n},y_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,h_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=W6(r,e.installDir,t),n=[];for(let s of o)if(lr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var xl,Tl,e$,L6,S_,t$=l(()=>{"use strict";xl=m(require("node:fs")),Tl=m(require("node:path"));We();e$=(e,t)=>{!xl.default.existsSync(e)||xl.default.existsSync(t)||(xl.default.mkdirSync(Tl.default.dirname(t),{recursive:!0}),xl.default.renameSync(e,t))},L6=e=>{if(e.profileEmail===null)return;let t=Tl.default.join(e.installDir,rt);e$(Tl.default.join(t,Qo),e.mainLogPath),e$(Tl.default.join(t,en),e.errorLogPath)},S_=e=>{let t=M();e!==void 0&&t.installDir!==e||L6(t)}});var E6,r$=l(()=>{"use strict";aa();ep();ep();E6={};!it()&&Zr(E6.url)&&(async()=>{ze("agent-witch-wake-server");let e=await bo(),t=$t(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var o$=l(()=>{"use strict";r$()});var n$=l(()=>{"use strict";qi()});var A_,s$=l(()=>{"use strict";u_();o$();f_();n$();A_=async(e={})=>{let t=e.skipInProcessBridge?null:await Qu();Tu();let r=setInterval(()=>{Tu()},6e4),o=setInterval(()=>{if(!ZH().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Il,Ym,k6,i$,a$,Xm,l$,c$,b_,d$,Zm,u$=l(()=>{"use strict";Il=m(require("node:fs")),Ym=m(require("node:path")),k6="pending-run-inputs.json",i$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),a$=e=>{let t=e.profileEmail?Ym.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Ym.default.join(t,k6)},Xm=e=>{let t=a$(e);if(!Il.default.existsSync(t))return{};try{let r=JSON.parse(Il.default.readFileSync(t,"utf8"));return i$(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!i$(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},l$=(e,t)=>{let r=a$(e);Il.default.mkdirSync(Ym.default.dirname(r),{recursive:!0}),Il.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},c$=e=>Object.values(Xm(e)),b_=(e,t)=>Xm(e)[t]!==void 0,d$=(e,t)=>{let r=Xm(e);r[t.agentRunId]=t,l$(e,r)},Zm=(e,t)=>{let r=Xm(e);delete r[t],l$(e,r)}});var Qm=l(()=>{"use strict";le()});var p$=l(()=>{"use strict";le()});var eg=l(()=>{"use strict";le()});var tg=l(()=>{"use strict";le()});var Ol=l(()=>{"use strict";le()});var x6,T6,Ml,P_=l(()=>{"use strict";lt();Qm();p$();eg();tg();Ol();x6={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},T6={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Ml=e=>{if(!ie(e.writerAgent))return"the selected writer";let t=Fe(e.writerAgent);if(Re(e.writerExecutionBackend)==="api"&&t!==null){let r=je(ye(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=pi(t,r.model);return`${T6[t]} model ${o}`}}return x6[e.writerAgent]}});var I6,O6,m$,g$,f$=l(()=>{"use strict";I6=/"input_tokens"\s*:\s*(\d+)/,O6=/"output_tokens"\s*:\s*(\d+)/,m$=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},g$=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=m$(I6.exec(t)),o=m$(O6.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var rg=l(()=>{"use strict";ut()});var Nl,og,M6,w_,h$,y$,S$,__,A$=l(()=>{"use strict";Nl=m(require("node:fs")),og=m(require("node:path"));rg();M6="run-completion-outbox.json",w_=e=>{let t=e.profileEmail?og.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return og.default.join(t,M6)},h$=e=>{let t=w_(e);if(!Nl.default.existsSync(t))return[];try{let r=JSON.parse(Nl.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},y$=(e,t)=>{Nl.default.mkdirSync(og.default.dirname(w_(e)),{recursive:!0}),Nl.default.writeFileSync(w_(e),JSON.stringify(t,null,2),"utf8")},S$=(e,t)=>{let r=[...h$(e).filter(o=>o.runId!==t.runId),t];y$(e,r)},__=async e=>{if(e.cloudApi===null)return;let t=h$(e.layout);if(t.length===0)return;let r=[];for(let o of t)await zi(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);y$(e.layout,r)}});var b$=l(()=>{"use strict"});var v_,jl,j6,qo,P$=l(()=>{"use strict";b$();v_=new Map,jl=e=>{let t=v_.get(e);t!==void 0&&(clearInterval(t),v_.delete(e))},j6=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},qo=(e,t,r,o={})=>{jl(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){jl(t);return}let i=o.onTick?.()??{};j6(e,t,n,i)};s(),v_.set(t,setInterval(s,15e3))}});var w$=l(()=>{"use strict";ut()});var _$,v$=l(()=>{"use strict";w$();_$=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Ke(t)}});var W_,Dl,cr,L_,Mt,W$,ng=l(()=>{"use strict";W_=new Set,Dl=new Map,cr=(e,t)=>{if(t.length===0)return;let r=Dl.get(e)??[];r.push(t),Dl.set(e,r)},L_=e=>{W_.add(e);let t=Dl.get(e)??[];return Dl.delete(e),t},Mt=e=>W_.has(e),W$=e=>{W_.delete(e),Dl.delete(e)}});var sg,L$,D6,E$,R$=l(()=>{"use strict";sg=m(require("node:path")),L$=require("node:url");nn();D6={},E$=()=>{if(it()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return sg.default.dirname(sg.default.resolve(e))}return sg.default.dirname((0,L$.fileURLToPath)(D6.url))}});var C$,k$,x$,T$,$e,bs,I$,O$,Ps,E_,R_,C_,M$,k_,N$,ig=l(()=>{"use strict";C$=require("node:crypto"),k$=m(require("node:fs")),x$=m(require("node:path")),T$=require("node:url");Rl();nn();R$();$e=new Map,I$=async()=>{if(bs!==void 0)return bs;try{if(it()){let e=E$(),t=x$.default.join(e,"deps","node-pty","lib","index.js");if(k$.default.existsSync(t)){let r=await import((0,T$.pathToFileURL)(t).href);return bs=r,r}}return bs=await import("node-pty"),bs}catch{return bs=null,null}},O$=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Ps=(e,t,r)=>{let o=$e.get(e);if(o!==void 0){$e.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},E_=(e,t)=>{let r=$e.get(e);return r===void 0?!1:(r.pty.write(t),!0)},R_=(e,t,r)=>{let o=$e.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},C_=e=>{for(let t of $e.values())if(!(t.mode!=="agent"||t.runId!==e))return lr(t.pty.pid);return!1},M$=e=>{for(let[t,r]of $e.entries())if(!(r.mode!=="agent"||r.runId!==e)){$e.delete(t);try{r.pty.kill()}catch{}return!0}return!1},k_=async e=>{let t=await I$();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;$e.get(e.shellSessionId)!==void 0&&Ps(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return $e.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{O$(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{$e.get(e.shellSessionId)?.pty===n&&($e.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},N$=async e=>{let t=e.shellSessionId??(0,C$.randomUUID)(),r=await I$();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return $e.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{O$(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{$e.get(t)?.pty===o&&($e.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var ag,j$,D$=l(()=>{"use strict";ag="[[AWAITING_INPUT]]",j$=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",ag,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Hl,H$,lg=l(()=>{"use strict";D$();Hl=e=>{let t=e.indexOf(ag);if(t<0)return null;let o=e.slice(t+ag.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},H$=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",j$].join(`
`)});var $$,z$=l(()=>{"use strict";ng();ig();lg();$$=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Mt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}cr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await N$({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Hl(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var F$,U$,B$,dr,cg=l(()=>{"use strict";F$=require("node:child_process"),U$=m(require("node:fs")),B$=m(require("node:path"));yd();dr=(e,t)=>{let r=B$.default.join(e,"app",FL,"ensure-writer.sh");return U$.default.existsSync(r)?new Promise((o,n)=>{let s=(0,F$.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var G$,Ko,zl,dg,x_,$l,ug,pg,T_,I_,H6,ws,$6,z6,O_,M_=l(()=>{"use strict";G$=require("node:child_process");lt();cg();eg();Qm();Ol();tg();Ko=new Map,zl=e=>e==="cursor"||e==="antigravity",dg=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",x_=e=>Ko.get(e)?.warmed===!0,$l=e=>{let t=Ko.get(e);Ko.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},ug=e=>Ko.get(e)?.conversationStarted===!0,pg=e=>{let t=Ko.get(e);Ko.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},T_=e=>{Ko.delete(e)},I_=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",H6={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ws=e=>`${H6[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,$6=(e,t,r,o)=>new Promise(n=>{let s=kd(t,r),i=[],a=(0,G$.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),z6=(e,t)=>{let r=ws(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},O_=async e=>{if(!ie(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=Fe(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=ye(e.runConfig.layout.configPath);return je(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),$l(e.writerAgent),{exitCode:0,output:ws(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await dr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}zl(e.writerAgent)&&$l(e.writerAgent);let t=await $6(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?z6(e.writerAgent,t.output):ws(e.writerAgent)}}});var Jo,N_=l(()=>{"use strict";Jo={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var V$,F6,U6,q$,B6,j_,K$=l(()=>{"use strict";N_();V$=/you(?:'|')ve hit your session limit/i,F6=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],U6=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,q$=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},B6=e=>{let t=U6.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},j_=e=>{let t=e.trim();if(t.length===0)return null;if(V$.test(t))return{code:Jo.SESSION_LIMIT,resetHint:B6(t),matchedLine:q$(t,V$)};for(let r of F6)if(r.test(t))return{code:Jo.PROVIDER_QUOTA,resetHint:null,matchedLine:q$(t,r)};return null}});var mg,gg,D_,H_=l(()=>{"use strict";mg="[[AGENT_RUN_WRITER_EXECUTION]]",gg="cli-writer-api-key-missing",D_="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var $_=l(()=>{"use strict";H_()});var J$=l(()=>{"use strict";$_()});var fg=l(()=>{"use strict";N_();K$();H_();$_();J$()});var hg,Y$=l(()=>{"use strict";hg={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var X$,Z$=l(()=>{"use strict";X$="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var Q$,ez=l(()=>{"use strict";fg();Z$();Q$=e=>e.code===Jo.SESSION_LIMIT?X$:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var tz,rz=l(()=>{"use strict";fg();Y$();ez();tz=e=>{let t=j_(e.output);return t!==null?{status:hg.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:Q$(t)}:{status:e.exitCode===0?hg.COMPLETED:hg.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var z_,dEe,oz=l(()=>{"use strict";z_={OPEN:"open",APPROVAL:"approval"},dEe=z_.APPROVAL});var _s,yg,nz,q6,sz,iz,az,Fl,F_,U_=l(()=>{"use strict";_s=m(require("node:fs")),yg=m(require("node:path")),nz="runs",q6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sz=e=>{let t=e.profileEmail!==null?yg.default.join(e.installDir,"profiles",e.profileEmail,nz):yg.default.join(e.installDir,nz);return _s.default.mkdirSync(t,{recursive:!0}),t},iz=(e,t)=>yg.default.join(sz(e),`${t}.json`),az=(e,t)=>{_s.default.writeFileSync(iz(e,t.id),JSON.stringify(t,null,2))},Fl=(e,t)=>{let r=iz(e,t);if(!_s.default.existsSync(r))return null;try{let o=JSON.parse(_s.default.readFileSync(r,"utf8"));return!q6(o)||typeof o.id!="string"?null:o}catch{return null}},F_=e=>{let t=sz(e),r=_s.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Fl(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var K6,lz,cz=l(()=>{"use strict";rz();oz();U_();K6=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=tz({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:z_.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},lz=(e,t)=>{let r=K6(t);return az(e,r),r}});var dz=l(()=>{"use strict";Cm()});var uz,pz=l(()=>{"use strict";fg();uz=()=>[mg,`agentRunWriterExecutionBackend=${gg}`,`agentRunWriterExecutionReasonCode=${D_}`].join(`
`)});var Nr,Sg=l(()=>{"use strict";Nr=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var B_,J6,Y6,mz,gz=l(()=>{"use strict";B_=e=>e.toLocaleString("en-US"),J6=e=>e<.01?e.toFixed(4):e.toFixed(3),Y6=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${J6(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${B_(e.inputTokens)} in / ${B_(e.outputTokens)} out (${B_(e.totalTokens)} total)`,t].join(`
`)},mz=(e,t)=>{if(t===void 0)return e;let r=Y6(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var fz=l(()=>{"use strict";le()});var yz,Ul,pe,G_,Ag,hz,X6,Z6,Sz,Az,bz,Bl,V_,q_,K_,Pz,Q6,tt,Gl,jr,wz,eJ,tJ,bg,J_,Y_,X_,_z=l(()=>{"use strict";yz=require("node:child_process");le();lt();u$();cl();P_();f$();xd();A$();rg();P$();Rl();v$();ng();ig();lg();z$();M_();cz();dz();pz();Sg();gz();dn();fz();Ol();Ys();lg();Ul=new Map,pe=new Map,G_=new Set,Ag=new Map,hz=e=>{e!==void 0&&!Ag.has(e)&&Ag.set(e,Date.now())},X6=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Mt(t)){tt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}cr(t,n)},Z6=(e,t,r,o,n)=>{if(!ey(e,n))return;let s=`${uz()}
`;X6(t,r,o,s);let i=pe.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},Sz=130,Az=`

Stopped by user.`,bz=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:Nr(e)},Bl=null,V_=e=>{Bl=e},q_=(e,t)=>{if(Bl===null)return;let r=GP(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||Zy(Bl,t,r)},K_=async e=>{await __({layout:e,cloudApi:Bl})},Pz=e=>{let t=Ul.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:lr(t.pid)},Q6=e=>ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),tt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Gl=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=on(s),c=pe.get(r);if(a!==null&&c!==void 0){let d=ZL(a),p=Pz(r)||C_(r);d!==null&&!p&&jr(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return XL(a)}}),jr=(e,t,r,o,n,s,i,a)=>{let c=yn(s,a),d=n,p=mz(c.output,c.llmUsage);if(r!==void 0){let S=Ag.get(r);Ag.delete(r),S!==void 0&&UP({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let h=g$(c.llmUsage,p);h!==null&&Oj({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&G_.has(r)&&(G_.delete(r),d=Sz,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${Az}`:"Stopped by user.");let g=r!==void 0?GP(e.layout.reportsDir,r):null;if(r!==void 0){jl(r),bi(e.layout,r),Mt(r)&&(tt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),W$(r));let S=pe.get(r);xj({reportsDir:e.layout.reportsDir,agentRunId:r,input:Nr(i),output:p,...S!==void 0?{writerLabel:Ml({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&Em({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),lz(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),S$(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),__({layout:e.layout,cloudApi:Bl}),pe.delete(r),Ul.delete(r),Zm(e.layout,r)}tt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),si(e.layout)},wz=(e,t,r,o,n,s,i)=>{let a=pe.get(r),c=a?.accumulatedOutput??s;d$(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),qo(t,r,()=>b_(e.layout,r),Gl(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),tt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},eJ=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(n===void 0||h.length===0)){if(Mt(n)){tt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}cr(n,h)}};if(n!==void 0){let h=pe.get(n);Ul.set(n,t),pe.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),tt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),qo(r,n,()=>Pz(n),Gl(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let g=a==="claude-cli",S=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(g?S.push(y):(c.push(y),p(y)),d||n===void 0)return;let u=Hl(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let A=pe.get(n),b=[A?.accumulatedOutput??"",u.partialOutput].filter(f=>f.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=b),Ul.delete(n),wz(e,r,n,o,u.question,b,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;pg(a);let y=n!==void 0?pe.get(n):void 0,u=g?yn(S.join("")):{output:c.join("").trim(),llmUsage:void 0},A=g?c.join("").trim():"",b=[u.output.trim(),A].filter(w=>w.length>0).join(`
`);g&&u.output.trim().length>0&&p(u.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;jr(e,r,n,o,h??-1,f,s,u.llmUsage)}),t.on("error",h=>{d||jr(e,r,n,o,-1,h.message,s)})},tJ=(e,t,r,o,n,s,i,a,c)=>{let d=bz(r,c);s!==void 0&&(pe.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),tt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),qo(n,s,()=>pe.has(s),Gl(e,n,s,o,i,a))),hi(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Mt(s)){tt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}cr(s,g)}}).then(g=>{pg(t),jr(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let S=g instanceof Error?g.message:String(g);jr(e,n,s,o,-1,S,r)})},bg=(e,t,r,o,n,s,i,a,c,d,p,g)=>{let S=bz(r,p);if(ni(e.layout),io(e,t)){hz(s),tJ(e,t,r,o,n,s,c,d,S);return}let h=_t(t,r,Q6(e),i);if(h===null){jr(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}hz(s);let y=_$({workspace:e.workspace,projectFolderPath:c}),u=()=>{let A=(0,yz.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:g??process.env});eJ(e,A,n,o,s,r,S,t)};if(s===void 0){u();return}pe.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:pe.get(s)?.accumulatedOutput??""}),Z6(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Js({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),qo(n,s,()=>pe.has(s),Gl(e,n,s,o,c,d)),$$({socket:n,sendMessage:tt,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:A=>{a!==void 0&&Ps(a,w=>{tt(n,w)},o);let b=pe.get(s),f=[b?.accumulatedOutput??"",A.partialOutput].filter(w=>w.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=f),wz(e,n,s,o,A.question,f,r)},onFinished:(A,b)=>{pg(t);let f=yn(b),w=pe.get(s),_=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${f.output}`.trim():f.output;jr(e,n,s,o,A,_,r,f.llmUsage)}}).then(A=>{if(!A){u();return}qo(n,s,()=>C_(s),Gl(e,n,s,o,c,d))}).catch(A=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",A instanceof Error?A.message:A),u()})},J_=(e,t,r,o)=>{Zm(e.layout,t.agentRunId),t.shellSessionId!==void 0&&tt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=H$(t),s=pe.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;bg(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},Y_=(e,t)=>{for(let r of c$(e.layout))pe.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:Nr(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),qo(t,r.agentRunId,()=>b_(e.layout,r.agentRunId),{awaitingInput:!0}),tt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},X_=(e,t,r,o)=>{let n=pe.get(r);if(n===void 0)return!1;G_.add(r),jl(r);let s=Ul.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(M$(r))return!0;Zm(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${Az}`:"Stopped by user.";return jr(e,t,r,o,Sz,i,n.originalPrompt),!0}});var rJ,Z_,vz=l(()=>{"use strict";vi();rJ=()=>`http://127.0.0.1:${ct()}/restart`,Z_=async()=>{try{let e=await fetch(rJ(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Wz=l(()=>{"use strict";pa()});var Lz=l(()=>{"use strict";bw()});var Ez,Rz=l(()=>{"use strict";Ez=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Vl,oJ,Q_,Cz=l(()=>{"use strict";V();te();Wz();jS();Lz();Rz();dn();Vl=(e,t)=>{Lr(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},oJ=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(hh(),fh)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},Q_=async e=>{let t=Le(e.layout.installDir)?.bundleVersion??null;if(!Ez({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(at(e.layout)){ii({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Vl(e.layout,{summary:r,action:"install-bundle-update-start"}),Ht({launchAgentLabel:oe(e.layout.installDir),installDir:e.layout.installDir});let o=await ds({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Vl(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await oJ();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Vl(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Vl(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Vl(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var nJ,ev,kz=l(()=>{"use strict";nJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ev=e=>{if(!nJ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var tv,rv,xz=l(()=>{"use strict";yS();SS();tv=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Ki({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},rv=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Kt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var Tz,sJ,iJ,aJ,ql,Iz=l(()=>{"use strict";Tz=m(require("node:os"));We();sJ="Default",iJ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),aJ=e=>{let t=Tz.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},ql=()=>{let e=M(),t=id(e),r=iJ(sJ);return`${aJ(t)}/${r.length>0?r:"project"}`}});var Oz=l(()=>{"use strict";pa()});var Mz,ov,Nz=l(()=>{"use strict";Oz();Mz=!1,ov=e=>{Mz||(Mz=!0,process.on("uncaughtException",t=>{wo(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;wo(e,{kind:"crash",message:r,stack:o})}))}});var jz,lJ,nv,Dz=l(()=>{"use strict";jz=require("node:child_process");cg();lt();eg();Qm();Ol();tg();lJ=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,jz.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},nv=async e=>{if(!ie(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=Fe(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=ye(e.layout.configPath),n=je(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await dr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await lJ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var sv,Hz=l(()=>{"use strict";sv=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var $z,iv,zz=l(()=>{"use strict";$z=require("node:crypto"),iv=()=>(0,$z.randomUUID)()});var vs,Fz,Pg=l(()=>{"use strict";vs="[[WORKING_ESTIMATE]]",Fz=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",vs,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var Uz,Bz=l(()=>{"use strict";Uz=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var cJ,Gz,Vz=l(()=>{"use strict";Pg();cJ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,Gz=e=>{if(!e.includes(vs))return null;let t=null;for(let r of e.matchAll(cJ)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var dJ,av,qz=l(()=>{"use strict";Vz();dJ=/^(\d{1,6})\b/,av=e=>{let t=Gz(e);if(t!==null)return t;let r=dJ.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var uJ,pJ,mJ,wg,lv=l(()=>{"use strict";lt();ca();uJ="http://127.0.0.1:11434",pJ=45e3,mJ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},wg=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||uJ,o=t===void 0?(await mt({commands:ae({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(pJ)});return n.ok?mJ(await n.json()):null}catch{return null}}});var cv,dv,uv,Kz=l(()=>{"use strict";Ys();Pg();Sg();Bz();qz();cl();lv();cv=async e=>{let t=Nr(e.wrappedPrompt),r=Tj(e.reportsDir);return{estimateOutput:await wg(Fz(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},dv=e=>{let t=av(e.estimateOutput);t!==null&&bm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},uv=e=>{let t=av(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=Uz(t);return Ks({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Pt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),bm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var _g,Jz,pv=l(()=>{"use strict";_g="[[WORKING_TOKEN_ESTIMATE]]",Jz=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",_g,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var Yz,gJ,Xz,Zz=l(()=>{"use strict";pv();Yz=/^(\d{1,8})\b/,gJ=e=>{let t=e.indexOf(_g);if(t<0)return null;let r=e.slice(t+_g.length).trim(),o=Yz.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},Xz=e=>{let t=gJ(e);if(t!==null)return t;let r=Yz.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var mv,gv,Qz=l(()=>{"use strict";pv();Sg();Zz();cl();lv();mv=async e=>{let t=Nr(e.wrappedPrompt),r=Mj(e.reportsDir);return{estimateOutput:await wg(Jz(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},gv=e=>{let t=Xz(e.estimateOutput);return t===null?null:(Ij({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var eF=l(()=>{"use strict";f_();QH();t$();s$();vi();_z();cg();lt();U_();ng();vz();LS();Cz();dn();kz();xz();rg();Iz();Nz();Dz();Sd();Hz();zz();Pg();Ys();Kz();Qz();P_();ca();ig();M_()});var tF={};St(tF,{buildContinuationPromptWithContext:()=>yJ});var fJ,hJ,yJ,rF=l(()=>{"use strict";fJ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,hJ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),yJ=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=hJ(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${fJ(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var oF={};St(oF,{readHarnessExportSets:()=>AJ});var Kl,fv,vg,SJ,AJ,nF=l(()=>{"use strict";Kl=m(require("node:fs")),fv=m(require("node:path"));We();vg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),SJ=e=>{if(!Kl.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Kl.default.readFileSync(e.harnessManifestPath,"utf8"));if(vg(t))return t}catch{return null}return null},AJ=(e,t)=>{let r=M(t),o=SJ(r);if(o===null)return[];let n=vg(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!vg(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!vg(p))continue;let g=typeof p.path=="string"?p.path:void 0,S=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(g===void 0||S.length===0||h.length===0||y.length===0)continue;let u=g.startsWith("shared/")?fv.default.join(r.harnessRootDir,g):fv.default.join(r.harnessSetsDir,i,g);Kl.default.existsSync(u)&&d.push({id:S,kind:h,title:y,content:Kl.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var wv,yv,Ws,sF,bJ,iF,aF,hv,lF,Sv,Av,bv,X,G,Pv,PJ,Jl,wJ,_J,vJ,WJ,LJ,EJ,RJ,CJ,Yl,cF=l(()=>{"use strict";wv=require("node:child_process"),yv=m(require("node:fs")),Ws=m(require("node:os"));BH();V();te();kn();Tw();KH();le();qe();pa();qA();Mm();Cm();ut();po();KS();Ut();eF();sF=3e4,bJ=3e4,iF=new Map,aF=new Map,hv=new Map,lF=new Map,Sv=new Map,Av=new Map,bv=new Map,X=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G=(e,t,r)=>{e.readyState===El.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Lr(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),tp(r,"out",t)))},Pv=e=>e,PJ=e=>{if(!yv.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(yv.default.readFileSync(e.harnessManifestPath,"utf8"));if(X(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Jl=(e,t)=>{let r=PJ(t);r!==null&&G(e,{type:"harness.manifest.report",payload:{hostname:Ws.default.hostname(),manifest:r}})},wJ=async(e,t,r,o,n,s,i=!1,a,c,d,p,g)=>{let S=g?.trim()??"";if(!ie(t)){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=Ml({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await mt({commands:ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?cv({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=s!==void 0?mv({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=zl(t)&&!x_(t);if(b){try{await dr(e.layout.installDir,t)}catch($){let _e=$ instanceof Error?$.message:String($);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_e}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}$l(t)}else if(!zl(t))try{await dr(e.layout.installDir,t)}catch($){let _e=$ instanceof Error?$.message:String($);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_e}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Si(d,ql,g);if(f===null){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Ue({projectFolderPath:f,...S.length>0?{projectId:S}:{}}),i||gl(e.layout,t,f);let w=Rm({sessionContinuation:i,supportsWriterSessionContinuation:dg(t),isWriterConversationStarted:ug(t)}),_=i&&w==="first"?ml(e.layout,t,f):null,v=_!==null?cs(e.layout,_):null,L=v!==null&&v.turns.length>0,R=iw({sessionContinuation:i,supportsWriterSessionContinuation:dg(t),isWriterConversationStarted:ug(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:L,userPromptCharacterCount:r.length}),x=r;if(R.continuationStrategy==="source_run_seed"){let $=typeof c=="string"&&c.length>0?Fl(e.layout,c):null;if($!==null){let{buildContinuationPromptWithContext:_e}=await Promise.resolve().then(()=>(rF(),tF));x=_e({priorPrompt:$.prompt,priorOutput:$.resultOutput??"",userMessage:r})}}else R.continuationStrategy==="transcript_seed"&&v!==null&&v.turns.length>0&&(x=_m({priorTurns:v.turns,userMessage:r}));let I=R.ragLimit>0?await zn({layout:e.layout,query:x,limit:R.ragLimit,minScore:R.ragMinScore,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],D=R.ragLimit>0&&f.trim().length>0?await GA({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],re=R.injectMemory?YP(e.layout,f,S.length>0?S:void 0):[],B=`${ZP(re,R.memoryEntryLimit)}${FA(I)}${VA(D)}${x}`,q=p?.trim()??(s!==void 0&&f.trim().length>0?iv():void 0);if(s!==void 0&&q!==void 0&&q.length>0&&f.trim().length>0){Js({reportKey:q,agentRunId:s,userSummary:"Working on your Mac\u2026"});let $=B;u!==null&&u.then(_e=>{if(_e===null)return;let yt=uv({estimateOutput:_e.estimateOutput??"",reportKey:q,agentRunId:s,reportsDir:e.layout.reportsDir,task:_e.task,writerLabel:_e.writerLabel,embedding:_e.embedding});if(yt.estimateSeconds===null)return;q_(e.layout.reportsDir,s);let Xl=`${vs}
${yt.estimateSeconds}
`;if(Mt(s)){G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Xl},requestId:o});return}cr(s,Xl)}).catch(()=>{}),B=sv($),B=zf(B,{agentRunId:s,reportKey:q,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then($=>{$!==null&&dv({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel,embedding:$.embedding})}).catch(()=>{}),s!==void 0&&A!==null&&A.then($=>{$!==null&&gv({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel})}).catch(()=>{});let Dr=s!==void 0&&bv.get(s)===!0;if(s!==void 0&&f.trim().length>0){let $=await ku(f);Av.set(s,$),q!==void 0&&q.length>0&&Sv.set(s,q)}bg(e,t,B,o,Pv(n),s,{sessionTurn:R.sessionTurn},a,f,q,r,Kh(e.layout,s,Dr)),b&&s!==void 0&&G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:I_(t)},requestId:o})},_J=async(e,t,r,o,n)=>{let s=(i,a)=>{G(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await O_({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,G(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=ie(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?ws(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},vJ=(e,t,r)=>new Promise(o=>{if(!ie(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=_t(t,r,ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,wv.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),WJ=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;G(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Wt(t.bundle),s=X(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=Ee(e.wsUrl)??zt,g=await Oy({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=uo({bundle:i,layout:e.layout});return G(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Jl(o,e.layout),!0},LJ=async(e,t,r,o)=>{if(await WJ(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(G(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!ie(n)){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}ni(e.layout);let i=await(async()=>{try{await dr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return vJ(e,n,s)})().finally(()=>{si(e.layout)});G(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),Jl(o,e.layout)},EJ=e=>{let t=1e3*2**e;return Math.min(bJ,t)},RJ=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(at(e.layout)){lh(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,Z_().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(u,A="system.ack")=>{if(!t.selfUpdateInFlight){if(at(e.layout)){ii({layout:e.layout,remoteBundleVersion:u,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,Q_({layout:e.layout,remoteBundleVersion:u,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let u=Se(e.layout);u!==null&&Oe(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===El.OPEN||u.readyState===El.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,sF)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=EJ(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},g=u=>{s();let A=()=>{let b=ei(e.layout.installDir),f=ct();G(u,{type:"agent.heartbeat",payload:{hostname:Ws.default.hostname(),macOsUsername:Ws.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,sF)},S=(u,A)=>{if(typeof u.type!="string")return;if(qS(u)){t.stopped=!0,s(),a(),c(),US({layout:e.layout}).finally(()=>{Cl(),process.exit(0)});return}Lr(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),tp(e.layout,"in",u);let b=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&X(u.payload)){let f=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",_=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",v=typeof u.payload.challenge=="string"?u.payload.challenge:"",L=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!xw({serverPublicKey:f,origin:w,devicePublicKey:_,challenge:v,serverAttestation:L})){t.wakeError="Server attestation verification failed",Lr(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&X(u.payload)){let f=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Lr(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),nv({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{G(A,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&X(u.payload)){let f=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(u.type==="system.ack"){ju(e.layout,{wsUrl:e.wsUrl});let f=X(u.payload)?u.payload:null,w=ev(f);w!==null&&o(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&X(u.payload)&&tv(u.payload),u.type==="automations.run"&&X(u.payload)&&rv(u.payload),u.type==="terminal.stream.accepted"&&X(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"";if(f.length>0){let w=L_(f);for(let _ of w)G(A,{type:"terminal.stream.chunk",payload:{runId:f,chunk:_},requestId:b})}}if(u.type==="agent.agentRun.list"&&G(A,{type:"dashboard.agentRun.list.result",payload:{runs:F_(e.layout)},requestId:b}),u.type==="agent.agentRun.get"&&X(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"",w=f.length>0?Fl(e.layout,f):null;G(A,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:b})}if(u.type==="command.claude.run"&&X(u.payload)){let f=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&ie(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",_=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,v=u.payload.sessionContinuation===!0,L=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,R=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,x=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=Si(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,ql,x),D=zh(u.payload.compositionSnapshot),re=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${v?"continue":"first"})\u2026`),I===null){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(D!==null){let B=Uh(e.layout,D);if(B!==null){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:B,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(_!==void 0){let q=Gh(e.layout,_,D);if(!q.ok){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:q.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}bv.set(_,D.entries.some(Dr=>Dr.scope==="run"))}}_!==void 0&&R!==void 0&&iF.set(_,R),_!==void 0&&(aF.set(_,I),x!==void 0&&x.trim().length>0&&hv.set(_,x.trim()),lF.set(_,f.trim()),Ue({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),wJ(e,w,f.trim(),b,A,_,v,R,L,I,re,x)}}if(u.type==="shell.session.open"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,_=typeof u.payload.rows=="number"?u.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),k_({shellSessionId:f,cwd:e.workspace,cols:w,rows:_,send:v=>{G(A,v)},requestId:b}))}if(u.type==="shell.session.close"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";f.length>0&&Ps(f,w=>{G(A,w)},b)}if(u.type==="shell.input"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";f.length>0&&w.length>0&&E_(f,w)}if(u.type==="shell.resize"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,_=typeof u.payload.rows=="number"?u.payload.rows:0;f.length>0&&w>0&&_>0&&R_(f,w,_)}if(u.type==="command.writer.session.end"&&X(u.payload)){let f=u.payload.writerAgent;typeof f=="string"&&ie(f)&&(T_(f),Lm(e.layout,f))}if(u.type==="command.writer.session.start"&&X(u.payload)){let f=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof f=="string"&&ie(f)&&w.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),_J(e,f,w,b,A))}if(u.type==="command.claude.stop"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),X_(e,Pv(A),f,b))}if(u.type==="command.claude.input_respond"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",_=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",v=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",L=typeof u.payload.question=="string"?u.payload.question:"";f.length>0&&w.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),J_(e,{agentRunId:f,originalPrompt:_,partialOutput:v,question:L,response:w,shellSessionId:iF.get(f)},b,Pv(A)))}if(u.type==="dispatch.approval.required"&&X(u.payload)){let f=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${w}`),process.platform==="darwin"&&(0,wv.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&X(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),LJ(e,u.payload,b,A)),u.type==="harness.export.request"&&X(u.payload)){let f=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,_=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(v=>typeof v=="string"):[];f.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:v}=await Promise.resolve().then(()=>(nF(),oF)),L=v(_,e.email);G(A,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:f,...w!==void 0?{targetDeviceId:w}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(u.type==="harness.manifest.request"&&Jl(A,e.layout),u.type==="command.claude.result"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",_=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,v=Si(f!==void 0?aF.get(f):void 0,ql),L=f!==void 0?hv.get(f):void 0,R=f!==void 0?lF.get(f)??"":"",x=lS({exitCode:_,output:w});if(x&&v!==null&&zA({layout:e.layout,text:w,source:f??"command.claude.result",projectFolderPath:v,...L!==void 0?{projectId:L}:{}}),_!=null&&_!==0&&w.trim().length>0&&v!==null&&(NA({layout:e.layout,errorText:w,projectFolderPath:v,...L!==void 0?{projectId:L}:{}}),BA({layout:e.layout,text:w,source:f??"command.claude.result.failure",projectFolderPath:v,...L!==void 0?{projectId:L}:{}})),x&&R.trim().length>0&&v!==null&&XP({layout:e.layout,projectFolderPath:v,...L!==void 0?{projectId:L}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:R,output:w,createdAt:new Date().toISOString()}}),f!==void 0&&v!==null){let D=Sv.get(f),re=Av.get(f);D!==void 0&&re!==void 0&&ku(v).then(B=>{let q=cS({before:re,after:B});Ff(D,q),Av.delete(f),Sv.delete(f)})}if(x&&L!==void 0&&L.trim().length>0){let D=z(),re=D===null?null:Z({wsUrl:D.wsUrl,pairingToken:D.pairingToken});re!==null&&uS(re,L,{...f!==void 0?{sourceRunId:f}:{},lesson:dS({prompt:R,output:w})})}f!==void 0&&(bi(e.layout,f),bv.delete(f),hv.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let u=new El(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),V_(Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),K_(e.layout);let A=Ee(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=kw({layout:e.layout,origin:A,...b!==void 0&&b.length>0?{claimToken:b}:{}});G(u,{type:"agent.register",payload:{role:"agent",hostname:Ws.default.hostname(),macOsUsername:Ws.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),Jl(u,e.layout),Y_(e,u),g(u)}),u.on("message",A=>{let b=typeof A=="string"?A:A.toString("utf8");try{let f=JSON.parse(b);if(!X(f))return;S(f,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(A,b)=>{s(),t.socket=void 0,t.wsConnected=!1,PS(e.layout),t.reconnectAttempt+=1;let f=typeof b=="string"?b:b.toString("utf8");wo(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:f}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",A=>{t.wakeError=A.message,wo(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return ah(()=>{let u=ch();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&o(u.remoteBundleVersion,u.trigger);let A=dh();A!==null&&r(A)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:ea(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Al(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Jl(u,e.layout),{ok:!0})}}},CJ=async()=>{ze("agent-witch");let e=d_(),t=E();g_().ok||(process.platform==="darwin"?(await Jr(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),S_(t);let o=y_({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(Ht({launchAgentLabel:oe(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),zs());let n=await oy(),s=n[0];s!==void 0&&ov(s.layout);for(let h of n){let y=Ee(h.wsUrl)??zt;ti(h.layout.installDir,y)}let i=n.map(h=>RJ(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Cl(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let A=Se(h.layout);wS(A,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(at(h)||ta(h.installDir))},g=await A_({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):Sl({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=$t(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Fs(),d()});d=()=>{S(),g.stop(),Cl(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Yl=CJ});var _v=l(()=>{"use strict";cF()});var dF={};St(dF,{startAgentWitchClient:()=>Yl});var kJ,uF=l(()=>{"use strict";_v();_v();nn();Uf();bd();kJ={};if(Zr(kJ.url)&&!it()){let e=process.argv.indexOf("report");e>=0&&process.exit(Ad(process.argv.slice(e))),Yl()}});Hf();Uf();bd();var tE="20.x",rE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var h2=e=>[`Node.js ${tE} or newer is required (found ${e}).`,rE].join(" "),oE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${h2(process.version)}
`),process.exit(1))};var OJ={},xJ=async()=>{ze("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(hh(),fh)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},TJ=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(nx(),ox)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},IJ=async()=>{if(!Zr(OJ.url))return;oE();let e=process.argv.indexOf("report");e>=0&&process.exit(Ad(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await xJ();return}if(t==="wake"){await TJ();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(sT(),nT));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(HD(),DD));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(uF(),dF));await r()};IJ();
